import fetchData from "./handleFetch";

const moodCache = new Map();
let lastRequestTime = 0;

export const analyzeMoodWithAI = async (moodText) => {
  if (!moodText) return [];

  if (moodCache.has(moodText)) {
    console.log("⚡ Using cached AI response...");
    return moodCache.get(moodText);
  }

  const now = Date.now();
  if (now - lastRequestTime < 2000) {
    console.warn("⏳ Too many requests! Waiting...");
    return [];
  }
  lastRequestTime = now;

  const [data, error] = await fetchData("/analyze-mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood: moodText }),
  });

  if (error || !data?.genres) {
    console.error("Error from backend AI analyzer:", error);
    return [];
  }

  moodCache.set(moodText, data.genres);
  return data.genres;
};
