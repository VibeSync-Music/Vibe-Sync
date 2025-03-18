import { useState } from "react";
import { moodToKeyword, emojiMap } from "../moodToGenre";

const CurrentMoodForm = ({ setMood }) => {
  // takes setter function prop that updates the state of mood's value in app.jsx
  const [moodValue, setMoodValue] = useState("");

  // every time a radio button is checked we'll call this fiunction to update the state of mood within the scope of CurrentMoodForm component
  const handleChange = (event) => {
    setMoodValue(event.target.value);
  };

  // whenever we submit the form we update the value of mood using the setter function we took as a prop in app.jsx
  const handleSubmit = (event) => {
    event.preventDefault();
    if (moodValue) {
      setMood(moodValue); // Update the parent state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Select Your Mood:</legend>

        {Object.keys(moodToKeyword).map((mood) => (
          <label key={mood}>
            <input
              type="radio"
              name="mood"
              value={moodToKeyword.mood}
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
