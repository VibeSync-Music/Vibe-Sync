// 📦 Import dependencies
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fetchData = require("./src/handleFetch"); // ✅ Your custom fetch wrapper

// 🔐 Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// 🗂 Absolute path to Vite's build output (frontend)
const filepath = path.join(__dirname, "../app/dist");

// 📄 Serve static frontend assets
app.use(express.static(filepath));

// ✅ Parse JSON bodies
app.use(express.json());

/* --------------------------------------------
   🔗 OpenAI Endpoint: /analyze-mood
--------------------------------------------- */
app.post("/analyze-mood", async (req, res) => {
  const moodText = req.body.mood;
  if (!moodText) return res.status(400).json({ error: "No mood provided." });

  const messages = [
    {
      role: "system",
      content: "You are an AI that suggests music genres based on mood.",
    },
    {
      role: "user",
      content: `A user describes their mood: "${moodText}". Suggest 3-5 music genres or keywords that match this mood. Return the result as a comma-separated list.`,
    },
  ];

  const body = {
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 50,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const [data, error] = await fetchData(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  if (error || !data?.choices?.[0]?.message?.content) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: "Failed to fetch genres." });
  }

  const genres = data.choices[0].message.content.trim().split(", ");
  res.json({ genres });
});

/* --------------------------------------------
   🎧 Spotify + Deezer Track Search: /tracks/search
--------------------------------------------- */
app.get("/tracks/search", async (req, res) => {
  const query = req.query.q;
  console.log(query);
  if (!query) return res.status(400).json({ error: "Missing search term" });

  // 🔐 Get Spotify Access Token
  const tokenBody = "grant_type=client_credentials";
  const base64Creds = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const [tokenData, tokenErr] = await fetchData(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Creds}`,
      },
      body: tokenBody,
    }
  );

  if (tokenErr || !tokenData?.access_token) {
    console.error("Spotify Auth Error:", tokenErr);
    return res.status(500).json({ error: "Failed to authenticate Spotify." });
  }

  const accessToken = tokenData.access_token;

  // 🔍 Search for tracks on Spotify
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=track&limit=10`;

  const [spotifyData, spotifyErr] = await fetchData(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (spotifyErr || !spotifyData?.tracks?.items) {
    console.error("Spotify Fetch Error:", spotifyErr);
    return res.status(500).json({ error: "Failed to fetch Spotify tracks." });
  }

  // 🧠 Update with Deezer previews if missing
  const updatedTracks = await Promise.all(
    spotifyData.tracks.items.map(async (track) => {
      let preview = track.preview_url;

      if (!preview) {
        const deezerQuery = encodeURIComponent(
          `${track.name} ${track.artists[0].name}`
        );
        const deezerUrl = `https://api.deezer.com/search?q=${deezerQuery}`;

        const [deezerData, deezerErr] = await fetchData(deezerUrl);

        preview = deezerData?.data?.[0]?.preview || null;
      }

      return {
        title: track.name,
        artist: track.artists[0].name,
        preview,
        image: track.album.images[1]?.url || track.album.images[0]?.url,
        url: track.external_urls.spotify,
        id: track.id,
      };
    })
  );

  res.json(updatedTracks.filter((track) => track.preview));
});

// 📦 Catch-all route (for React Router support on refresh)
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: filepath });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
