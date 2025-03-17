import { useState } from "react";
import { getSongByMood } from "./adapters/moodAdapter";
import "./App.css";

const App = () => {
  getSongByMood();
  return <></>;
};

export default App;
