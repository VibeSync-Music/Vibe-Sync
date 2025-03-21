import { useState, useEffect } from "react";
import { analyzeMoodWithAI } from "../adapters/aiMoodAnalyzer";
import { fetchTracksWithDeezerPreviews } from "../adapters/moodAdapter";
import { addSong } from "../adapters/localStorage";

const TracksContainer = ({ mood }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");
  const [savedTrackId, setSavedTrackId] = useState(null);

  const handleSave = (track, index) => {
    addSong(track);
    setSavedTrackId(index);
    setTimeout(() => setSavedTrackId(null), 2000); // reset message
  };

  useEffect(() => {
    const fetchSongsByMood = async () => {
      if (!mood) return;
      setError("");
      setTracks([]);

      try {
        const genres = await analyzeMoodWithAI(mood);
        if (!genres.length) {
          setError("AI couldn't understand the mood. Try again.");
          return;
        }

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

  if (!tracks.length && !error) {
    return (
      <div className="track-list loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="track-card skeleton-card">
            <div className="skeleton-image shimmer" />
            <div className="skeleton-text shimmer short" />
            <div className="skeleton-text shimmer long" />
            <div className="skeleton-audio shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="track-section">
      <h3 className="section-title">🎵 Your AI-Generated Mood Playlist</h3>
      {error && <p className="error">⚠️ {error}</p>}

      <ul className="track-list">
        {tracks.map((track, index) => (
          <li key={index} className="track-card">
            <img
              src={track.image}
              alt={`Album cover for ${track.title}`}
              className="track-image"
            />
            <p className="track-title">
              {track.title}
              <span className="track-artist"> — {track.artist}</span>
            </p>

            {track.preview ? (
              <audio controls className="track-audio">
                <source src={track.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="no-preview">🚫 No preview available</p>
            )}

            <a href={track.url} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>

            <button
              onClick={() => handleSave(track, index)}
              className="save-button"
            >
              Save
            </button>

            {savedTrackId === index && (
              <p className="track-saved-msg">💾 Saved!</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TracksContainer;
