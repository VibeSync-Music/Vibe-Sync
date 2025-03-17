import { useState, useEffect } from "react";
import fetchSpotifyTracks from "../adapters/moodAdapter"; // Import the function

const TracksContainer = ({ mood }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTracksByMood = async () => {
      setError(""); // Reset errors
      setTracks([]); // Clear previous tracks

      try {
        const result = await fetchSpotifyTracks(mood);
        if (result && result.length > 0) {
          setTracks(result);
        } else {
          setError("No songs found for this mood.");
        }
      } catch (err) {
        setError("Error fetching tracks. Please try again later.");
      }
    };

    if (mood) fetchTracksByMood();
  }, [mood]);

  if (error) return <p style={{ color: "red" }}>⚠️ {error}</p>;
  if (!tracks.length)
    return <p>🔄 Searching for songs that match "{mood}"...</p>;

  return (
    <div>
      <h3>🎵 Top 10 Songs for "{mood}"</h3>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <p>
              {track.title} - {track.artist}
            </p>
            <a href={track.url} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
            <img src={track.image} alt={`Album cover for ${track.title}`} />

            {track.preview ? (
              <audio controls>
                <source src={track.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>🚫 No preview available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TracksContainer;
