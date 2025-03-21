import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./routes/Home";
import Favorites from "./routes/Favorites";
import "./App.css";

const App = () => {
  const [mood, setMood] = useState("");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
