import { fetchData } from "./handleFetch"; // Import your fetch helper

const clientId = "1504ea323a934f8abf107c92e7481eea";
const clientSecret = "403d8c5aa33045889c6b425434c1cefa";

// Convert client credentials to Base64 (required for Spotify authentication)
const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

export const fetchSpotifyTracks = async (searchTerm) => {
  if (!searchTerm) {
    console.error("Error: No search term provided.");
    return null;
  }

  // Step 1: Get Spotify Access Token (Ensuring Proper POST Request)
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

  // Step 2: Search for the top 10 tracks on Spotify
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

  // Extract relevant data for the top 10 results
  return data.tracks.items.map((track) => ({
    title: track.name,
    artist: track.artists[0].name,
    preview: track.preview_url, // 30-sec preview URL
    image:
      track.album.images[2]?.url ||
      track.album.images[1]?.url ||
      track.album.images[0]?.url, // Smallest available image
    url: track.external_urls.spotify, // Spotify song link
  }));
};

export default fetchSpotifyTracks;
