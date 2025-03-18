import { fetchData } from "./handleFetch"; // Import your fetch helper

// Spotify API Authorization
const clientId = "1504ea323a934f8abf107c92e7481eea";
const clientSecret = "403d8c5aa33045889c6b425434c1cefa";

// Convert client credentials to Base64 (required for Spotify authentication)
const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
/* Base64 is a format that is safe for transmission over text based protocols (like HTTP) */

// Deezer CORS Proxy
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const deezerApiUrl = `${CORS_PROXY}https://api.deezer.com/search?q=`;

const fetchTracksWithDeezerPreviews = async (searchTerm) => {
  if (!searchTerm) {
    console.error("Error: No search term provided.");
    return null;
  }

  // Step 1: Get Spotify Access Token
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: "grant_type=client_credentials",
  };

  const [authData, authError] = await fetchData(tokenUrl, requestOptions);

  if (authError || !authData?.access_token) {
    console.error("Error fetching Spotify access token:", authError);
    return null;
  }

  const accessToken = authData.access_token;

  // Step 2: Fetch Top 10 Tracks from Spotify
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    searchTerm
  )}&type=track&limit=10`;
  const [data, error] = await fetchData(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (error || !data?.tracks?.items?.length) {
    console.error(`Error fetching Spotify tracks for ${searchTerm}:`, error);
    return null;
  }

  // Step 3: Try to get previews from Deezer
  const tracks = await Promise.all(
    data.tracks.items.map(async (track) => {
      const deezerSearchUrl = `${deezerApiUrl}${encodeURIComponent(
        track.name
      )} ${encodeURIComponent(track.artists[0].name)}`;
      const [deezerData, deezerError] = await fetchData(deezerSearchUrl);

      return {
        title: track.name,
        artist: track.artists[0].name,
        preview: deezerData?.data?.[0]?.preview || null, // ✅ Use Deezer preview if available
        image:
          track.album.images[2]?.url ||
          track.album.images[1]?.url ||
          track.album.images[0]?.url,
        url: track.external_urls.spotify,
      };
    })
  );

  // Remove songs without previews
  const filteredTracks = tracks.filter((track) => track.preview);

  return filteredTracks.length > 0 ? filteredTracks : null;
};

export default fetchTracksWithDeezerPreviews;
