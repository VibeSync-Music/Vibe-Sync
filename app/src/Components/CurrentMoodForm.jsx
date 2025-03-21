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
    <form onSubmit={handleSubmit} className="mood-form">
      <legend className="form-title">🧠 How Are You Feeling Today?</legend>
      <input
        type="text"
        className="mood-input"
        value={moodInput}
        onChange={handleChange}
        placeholder="e.g. Reflective, nostalgic about summer..."
      />
      <button type="submit" disabled={!moodInput} className="mood-submit">
        🎵 Curate My Vibe
      </button>
    </form>
  );
};

export default CurrentMoodForm;
