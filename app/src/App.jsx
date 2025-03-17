import { useState } from "react";
import CurrentMoodForm from "./Components/CurrentMoodForm";
import TracksContainer from "./Components/TracksContainer";
import "./App.css";

const App = () => {
  const [mood, setMood] = useState("");
  return (
    <div>
      <CurrentMoodForm setMood={setMood} />
      <br />
      <TracksContainer mood={mood} /> {/* STYLE THIS TO BE A GRID */}
    </div>
  );
};

export default App;
