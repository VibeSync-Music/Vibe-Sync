// 📦 Import dependencies
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

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

  if (!moodText) {
    return res.status(400).json({ error: "No mood provided." });
  }

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

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          max_tokens: 50,
        }),
      }
    );

    const data = await openaiRes.json();
    const genres = data.choices?.[0]?.message?.content.trim().split(", ") || [];

    res.json({ genres });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to fetch genres." });
  }
});

/* --------------------------------------------
   🎧 Spotify + Deezer Track Search: /tracks/search
--------------------------------------------- */
app.get("/tracks/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing search term" });

  try {
    // 🔐 Get Spotify Access Token
    const base64Creds = Buffer.from(
      `${process.env.VITE_SPOTIFY_CLIENT_ID}:${process.env.VITE_SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Creds}`,
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) throw new Error("Missing Spotify token");

    // 🔍 Search for tracks on Spotify
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=10`;

    const spotifyRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const spotifyData = await spotifyRes.json();
    const tracks = spotifyData?.tracks?.items || [];

    // 🔁 Fill in missing previews using Deezer
    const updatedTracks = await Promise.all(
      tracks.map(async (track) => {
        let preview = track.preview_url;

        // Fallback to Deezer if Spotify preview is missing
        if (!preview) {
          const deezerRes = await fetch(
            `https://api.deezer.com/search?q=${encodeURIComponent(
              `${track.name} ${track.artists[0].name}`
            )}`
          );
          const deezerData = await deezerRes.json();
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

    // ✅ Send only tracks with valid previews
    res.json(updatedTracks.filter((track) => track.preview));
  } catch (error) {
    console.error("Track fetch error:", error);
    res.status(500).json({ error: "Error fetching music tracks." });
  }
});

/* --------------------------------------------
   📦 Catch-all route (For React Router SPA)
--------------------------------------------- */
app.get("*", (req, res) => {
  res.sendFile(path.join(filepath, "index.html"));
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
