import { fetchData } from "./handleFetch"; // Import your fetch helper

// Use your own self-hosted proxy for Deezer (instead of `cors-anywhere`)
const LOCAL_PROXY = "http://localhost:5000/deezer/";

// Store Spotify token in memory to avoid unnecessary API calls
let spotifyAccessToken = null;

// Function to get a new Spotify Access Token (Only fetch when needed)
const getSpotifyAccessToken = async () => {
  if (spotifyAccessToken) return spotifyAccessToken; // ✅ Use stored token if available

  // Spotify API Authorization
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: "grant_type=client_credentials",
  };

  const [authData, authError] = await fetchData(tokenUrl, requestOptions);

  if (authError || !authData?.access_token) {
    console.error("Error fetching Spotify access token:", authError);
    return null;
  }

  spotifyAccessToken = authData.access_token; // Store token for reuse
  return spotifyAccessToken;
};

// Fetch tracks from Spotify
const fetchSpotifyTracks = async (searchTerm) => {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return [];

  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    searchTerm
  )}&type=track&limit=10`;
  const [data, error] = await fetchData(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (error || !data?.tracks?.items?.length) {
    console.error(`Error fetching Spotify tracks for ${searchTerm}:`, error);
    return [];
  }

  return data.tracks.items.map((track) => ({
    title: track.name,
    artist: track.artists[0].name,
    preview: track.preview_url, //  Use Spotify preview if available
    image: track.album.images[1]?.url || track.album.images[0]?.url,
    url: track.external_urls.spotify,
  }));
};

//  Fetch Deezer preview (using your own local proxy instead of cors-anywhere)
const fetchDeezerPreview = async (trackName, artistName) => {
  const query = encodeURIComponent(`${trackName} ${artistName}`);
  const url = `${LOCAL_PROXY}${query}`;

  const [deezerData, deezerError] = await fetchData(url);

  if (deezerError || !deezerData?.data?.length) {
    console.warn(
      `No preview found on Deezer for: ${trackName} - ${artistName}`
    );
    return null;
  }

  return deezerData.data[0]?.preview || null;
};

//  Main function: Fetch Spotify tracks & get Deezer previews if needed
export const fetchTracksWithDeezerPreviews = async (searchTerm) => {
  if (!searchTerm) {
    console.error("Error: No search term provided.");
    return [];
  }

  // Step 1: Fetch tracks from Spotify
  const spotifyTracks = await fetchSpotifyTracks(searchTerm);

  //  Step 2: Get only tracks that need previews from Deezer (batch instead of individual calls)
  const tracksNeedingPreviews = spotifyTracks.filter((track) => !track.preview);
  const deezerPreviews = await Promise.all(
    tracksNeedingPreviews.map(async (track) => ({
      ...track,
      preview: await fetchDeezerPreview(track.title, track.artist),
    }))
  );

  //  Step 3: Merge updated Deezer previews back into the original track list
  const finalTracks = spotifyTracks.map((track) => {
    const deezerTrack = deezerPreviews.find(
      (dTrack) => dTrack.title === track.title
    );
    return deezerTrack?.preview
      ? { ...track, preview: deezerTrack.preview }
      : track;
  });

  return finalTracks.filter((track) => track.preview); // ✅ Only return tracks that have previews
};
