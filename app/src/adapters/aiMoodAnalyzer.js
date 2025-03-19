const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const moodCache = new Map(); //  Store AI-generated genres in memory
let lastRequestTime = 0; // Track last request time

export const analyzeMoodWithAI = async (moodText) => {
  if (!moodText) return [];

  // Step 1: Check if this mood was already analyzed (cache)
  if (moodCache.has(moodText)) {
    console.log("⚡ Using cached AI response...");
    return moodCache.get(moodText); // Return cached result
  }

  // Step 2: Enforce a delay (avoid 429 Too Many Requests)
  const now = Date.now(); // returns current date and time
  if (now - lastRequestTime < 2000) {
    // if user tries to make consecutive requests before a span of two seconds throw him a warning
    console.warn("⏳ Too many requests! Waiting before sending another...");
    return []; // Return empty array instead of making an API call
  }
  lastRequestTime = now; // Update last request time

  // Step 3: Make OpenAI API request
  const messages = [
    {
      // The system role tells ChatGPT that it should recommend music genres based on mood .
      role: "system",
      content: "You are an AI that suggests music genres based on mood.",
    },
    {
      role: "user",
      content: `A user describes their mood: "${moodText}". Suggest 3-5 music genres or keywords that match this mood. Return the result as a comma-separated list.`,
    },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Ai model in use
        messages: messages,
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    const genres = data.choices?.[0]?.message?.content.trim().split(", ") || [];
    console.log(genres);
    // ✅ Step 4: Store response in cache to avoid repeated API calls
    moodCache.set(moodText, genres);
    return genres;
  } catch (error) {
    console.error("🚨 Error fetching from OpenAI:", error);
    return [];
  }
};
