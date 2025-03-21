import { useState, useEffect } from "react";
import { getSongs, deleteSongById } from "../adapters/localStorage";

const FavoritesContainer = () => {
  const [tracks, setTracks] = useState(getSongs());

  //   setTracks()
  //   tracks = getSongs()

  return (
    <div>
      <h3>🎵 Your Favorite Songs!</h3>

      <ul>
        {Object.values(tracks).map((song, index) => (
          <li key={index}>
            <p>
              {song.title} - {song.artist}
            </p>
            <img src={song.image} alt={song.title} />
            {song.preview ? (
              <audio controls>
                <source src={song.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>🚫 No preview available</p>
            )}
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
            <button
              onClick={() => {
                deleteSongById(song.id);
                setTracks(getSongs());
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesContainer;
