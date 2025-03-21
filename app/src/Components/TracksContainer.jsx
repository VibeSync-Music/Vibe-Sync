import { useState, useEffect } from "react";
import { analyzeMoodWithAI } from "../adapters/aiMoodAnalyzer";
import { fetchTracksWithDeezerPreviews } from "../adapters/moodAdapter";
import { getSongs, addSong } from "../adapters/localStorage";

const TracksContainer = ({ mood }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSongsByMood = async () => {
      if (!mood) return;
      setError("");
      setTracks([]);

      try {
        // ✅ Step 1: AI analyzes mood and suggests genres
        const genres = await analyzeMoodWithAI(mood);
        if (!genres.length) {
          setError("AI couldn't understand the mood. Try again.");
          return;
        }

        // ✅ Step 2: Fetch songs based on AI’s generated genres
        const songs = await fetchTracksWithDeezerPreviews(genres.join(" "));
        if (!songs || songs.length === 0) {
          setError("No songs found for this mood.");
        } else {
          setTracks(songs);
        }
      } catch (err) {
        setError("Error fetching songs. Try again.");
      }
    };

    fetchSongsByMood();
  }, [mood]);

  return (
    <div>
      <h3>🎵 Your AI-Generated Mood Playlist</h3>
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <p>
              {track.title} - {track.artist}
            </p>
            <img src={track.image} alt={track.title} />
            {track.preview ? (
              <audio controls>
                <source src={track.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>🚫 No preview available</p>
            )}
            <a href={track.url} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
            <button onClick={() => addSong(track)}>save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TracksContainer;
