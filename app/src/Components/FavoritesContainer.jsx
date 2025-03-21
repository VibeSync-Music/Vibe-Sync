import { useState } from "react";
import { getSongs, deleteSongById } from "../adapters/localStorage";

const FavoritesContainer = () => {
  const [tracks, setTracks] = useState(getSongs());
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);

    // Wait for animation before removing
    setTimeout(() => {
      deleteSongById(id);
      setTracks(getSongs());
      setDeletingId(null);
    }, 400); // should match the fadeOut animation duration
  };

  const hasTracks = Object.values(tracks).length > 0;

  return (
    <div className="favorites-section">
      <h3>🎵 Your Favorite Songs!</h3>

      {hasTracks ? (
        <ul className="favorites-list">
          {Object.values(tracks).map((song, index) => (
            <li
              key={index}
              className={`favorite-card ${
                deletingId === song.id ? "fade-out" : ""
              }`}
            >
              <p>
                {song.title} — <span>{song.artist}</span>
              </p>
              <img src={song.image} alt={song.title} />
              {song.preview ? (
                <audio controls>
                  <source src={song.preview} type="audio/mpeg" />
                </audio>
              ) : (
                <p>🚫 No preview available</p>
              )}
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">
          📭 You haven’t saved any favorite songs yet.<br />
          Go explore and vibe ✨
        </p>
      )}
    </div>
  );
};

export default FavoritesContainer;
