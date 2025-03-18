import { useState, useEffect } from "react";
import fetchTracksWithDeezerPreviews from "../adapters/moodAdapter"; // Import function

const TracksContainer = ({ mood }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTracksByMood = async () => {
      setError("");
      setTracks([]);

      try {
        const result = await fetchTracksWithDeezerPreviews(mood);
        if (result && result.length > 0) {
          setTracks(result);
        } else {
          setError("No songs with previews found for this mood.");
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
      <h3>🎵 Top Songs for "{mood}"</h3>
      {tracks.length === 0 ? <p>No previews available.</p> : null}

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
