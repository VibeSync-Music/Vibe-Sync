import { useState } from "react";

const moodToKeyword = {
  happy: "feel good hits",
  sad: "sad songs",
  energetic: "workout motivation",
  chill: "relaxing vibes",
  romantic: "love songs",
  nostalgic: "throwback hits",
  party: "party anthems",
  calm: "soft instrumental",
  focus: "deep focus",
};

const emojiMap = {
  happy: "😊",
  sad: "😢",
  energetic: "⚡",
  chill: "😌",
  romantic: "❤️",
  nostalgic: "🎵",
  party: "🎉",
  calm: "🌿",
  focus: "🎧",
};

const CurrentMoodForm = ({ setMood }) => {
  const [moodValue, setMoodValue] = useState("");

  const handleChange = (event) => {
    setMoodValue(event.target.value);
  };

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
