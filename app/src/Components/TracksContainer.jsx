import { useState, useEffect } from "react";
import { analyzeMoodWithAI } from "../adapters/aiMoodAnalyzer";
import { fetchTracksWithDeezerPreviews } from "../adapters/moodAdapter";

const TracksContainer = ({ mood }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");
  const [playingTrack, setPlayingTrack] = useState(null);

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

  // ✅ Handles track playback
  const handlePlayTrack = (track) => {
    if (playingTrack && playingTrack.audio) {
      playingTrack.audio.pause();
    }

    const newAudio = new Audio(track.preview);
    newAudio.play();
    setPlayingTrack({ ...track, audio: newAudio });
  };

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
            <img src={track.image} alt={`Album cover for ${track.title}`} />

            {/* ✅ Replaces button with an audio player */}
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
