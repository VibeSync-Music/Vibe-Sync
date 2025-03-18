import { useState } from "react";
import { moodToKeyword, emojiMap } from "../moodToGenre";

const CurrentMoodForm = ({ setMood }) => {
  const [moodValue, setMoodValue] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setMoodValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (moodValue) {
      setMood(moodValue); // Update parent state in App.jsx
      setMoodValue(""); // ✅ Reset the form after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Mood selection form">
      <fieldset role="radiogroup">
        <legend>Select Your Mood:</legend>

        {Object.keys(moodToKeyword).map((mood) => (
          <label key={mood} style={{ display: "block", margin: "5px 0" }}>
            <input
              type="radio"
              name="mood"
              value={mood}
              checked={moodValue === mood}
              onChange={handleChange}
            />
            {emojiMap[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </label>
        ))}

        <button type="submit" disabled={!moodValue}>
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default CurrentMoodForm;
