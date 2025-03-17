import { fetchData } from "./handleFetch";

const lastFmAPIKey = "3000ac0e07306f0a193f35ecd07ff549";

export const getSongByMood = async (mood) => {
  // Fetch data using fetchData helper
  const [response, error] = await fetchData(
    `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${mood}&api_key=${lastFmAPIKey}&format=json`
  );

  // Error handling
  if (error) {
    console.error("Error fetching the tracks based on mood tag", error);
    return [];
  }

  // Check if responseData contains expected data
  if (!response.tracks || !response.tracks.track) {
    console.error("Invalid response format:", response);
    return [];
  }

  // Extract top 3 songs safely
  const topTracksBasedOnMood = response.tracks.track
    .slice(0, Math.min(3, response.tracks.track.length)) // Get only available tracks
    .map((track) => ({
      title: track.name,
      artist: track.artist.name,
      url: track.url,
      listeners: track.listeners,
      image: track.image.length > 0 ? track.image[1]["#text"] : null, // Use the "large" image
    }));

  console.log(topTracksBasedOnMood);
  return topTracksBasedOnMood;
};
