import { useState, useEffect } from "react";
import { getSongByMood } from "../adapters/moodAdapter";

const CurrentMoodForm = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await getSongByMood();
      if (data) setTracks(data);
      if (error) setError(error);
    };
    doFetch();
  }, [tracks]);

  const handleClick = async () => {
    const [data, error] = await getSongByMood();
    if (data) setTracks(data);
    if (error) setError(error);
  }

  if (error) return <p>{error.message}</p>

  return ();
};
