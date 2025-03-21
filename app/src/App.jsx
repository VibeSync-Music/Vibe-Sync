import { useState } from "react";
import CurrentMoodForm from "./Components/CurrentMoodForm";
import TracksContainer from "./Components/TracksContainer";
import "./App.css";

const App = () => {
  const [mood, setMood] = useState("");
  return (
    <div>
      <header className="main-header">
        <div className="brand-logo">
          <img src="/logo-icon.svg" alt="VibeSync icon" className="logo-icon" />
          <h1 className="gradient-logo">VibeSync</h1>
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#favorites">Favorites</a>
          <a href="#about">About</a>
        </nav>
      </header>
      <CurrentMoodForm setMood={setMood} />
      <br />
      <TracksContainer mood={mood} /> {/* STYLE THIS TO BE A GRID */}
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} VibeSync. Curate your vibe. Sync your
          soul. 🔮
        </p>
      </footer>
    </div>
  );
};

export default App;
