import { fetchData } from "./handleFetch"; // Import your fetch helper

// Fetch tracks from your backend's /tracks/search route
export const fetchTracksWithDeezerPreviews = async (searchTerm) => {
  if (!searchTerm) return [];

  try {
    const res = await fetch(
      `/tracks/search?q=${encodeURIComponent(searchTerm)}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tracks.");
    }

    const tracks = await res.json();
    return tracks;
  } catch (err) {
    console.error("Error fetching tracks:", err);
    return [];
  }
};
