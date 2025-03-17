import { fetchData } from "./handleFetch";

const lastFmAPIKey = "3000ac0e07306f0a193f35ecd07ff549";

export const getSongByMood = (mood) => {
  return fetchData(
    `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${mood}&api_key=${lastFmAPIKey}&format=json`
  );
};
