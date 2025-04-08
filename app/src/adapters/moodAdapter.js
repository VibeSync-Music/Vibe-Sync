import fetchData from "./handleFetch";

// Proxy to your own backend instead of direct Spotify/Deezer calls
const BACKEND_BASE = ""; // leave empty if frontend and backend are same domain

// 🔍 Call your backend's /tracks/search
export const fetchTracksWithDeezerPreviews = async (searchTerm) => {
  if (!searchTerm) return [];

  const [tracks, error] = await fetchData(
    `${BACKEND_BASE}/tracks/search?q=${encodeURIComponent(searchTerm)}`
  );

  if (error || !Array.isArray(tracks)) {
    console.error("Error fetching tracks:", error);
    return [];
  }

  return tracks;
};
