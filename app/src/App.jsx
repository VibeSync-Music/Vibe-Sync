import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FavoritesPage } from "./pages/FavoritesPage";
import CurrentMoodForm from "./components/CurrentMoodForm";
import TracksContainer from "./components/TracksContainer";

const App = () => {
  const [mood, setMood] = useState("");

  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <CurrentMoodForm setMood={setMood} />
              <TracksContainer mood={mood} />
            </>
          }
        />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>

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
