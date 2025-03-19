import { useState } from "react";

const CurrentMoodForm = ({ setMood }) => {
  const [moodInput, setMoodInput] = useState("");

  const handleChange = (event) => {
    setMoodInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (moodInput) {
      setMood(moodInput); // Pass the user's mood input to the parent (App.jsx)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>How do you feel?</legend>
        <input
          type="text"
          value={moodInput}
          onChange={handleChange}
          placeholder="Type your mood (e.g., 'Feeling nostalgic about summer')"
        />
        <button type="submit" disabled={!moodInput}>
          🎵 Get Songs
        </button>
      </fieldset>
    </form>
  );
};

export default CurrentMoodForm;
