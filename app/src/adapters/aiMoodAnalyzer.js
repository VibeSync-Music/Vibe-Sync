const moodCache = new Map();
let lastRequestTime = 0;

export const analyzeMoodWithAI = async (moodText) => {
  if (!moodText) return [];

  if (moodCache.has(moodText)) {
    return moodCache.get(moodText);
  }

  const now = Date.now();
  if (now - lastRequestTime < 2000) {
    console.warn("⏳ Too many requests! Try again in a few seconds.");
    return [];
  }

  lastRequestTime = now;

  try {
    const res = await fetch("/analyze-mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: moodText }),
    });

    if (!res.ok) {
      console.error("❌ Server error:", res.statusText);
      return [];
    }

    const data = await res.json();
    const genres = data.genres || [];

    moodCache.set(moodText, genres);
    return genres;
  } catch (err) {
    console.error("🚨 Network error:", err);
    return [];
  }
};
