# **VibeSync 🎧🔥**

**Created by Juan Felipe Garcia & Luis Abreu**

---

## 🚀 **Mission Statement**

VibeSync is a **mood-driven music discovery app** that uses AI and APIs to **curate a playlist** that matches the user’s mood state. Whether the user feels like **coding at a cafe, becoming a mariachi, going all out in a rave, or going to a zumba class**, users can **input their mood** and instantly receive **a personalized playlist** of songs.

We utilize **AI-powered mood analysis**, along with the **Last.fm and Deezer APIs**, to fetch music recommendations. Users can **listen to previews**, explore song details, and **discover new music effortlessly**.

---

## 🛠️ **Technology Stack**

- **Frontend**: React (Vite) + React Router
- **APIs**: OpenAI (for AI mood analysis), Last.fm, Deezer, Spotify
- **Proxy Server**: Node.js + Express (for handling Deezer CORS restrictions)

---

## 📜 **APIs & Documentation**

| **API**     | **Purpose**                                         | **Documentation**                                                   |
| ----------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| **Last.fm** | Fetches top songs based on mood tags                | [Last.fm API](https://www.last.fm/api/)                             |
| **Deezer**  | Fetches tracks & song previews                      | [Deezer API](https://developers.deezer.com/)                        |
| **Spotify** | Provides song metadata & album covers               | [Spotify API](https://developer.spotify.com/documentation/web-api/) |
| **OpenAI**  | AI-powered mood analysis for better recommendations | [OpenAI API](https://platform.openai.com/)                          |

---

## 🔗 **API Endpoints Used**

### **1️⃣ Last.fm: Get Top Songs by Mood**

**Endpoint:**

```sh
https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag={mood}&api_key={API_KEY}&format=json
```

**Description:** Fetches the top songs that match the selected mood.
**Data Used:** track.name, track.artist.name, track.url.

## 2️⃣ Deezer: Search for Tracks

Endpoint:

```sh
https://api.deezer.com/search?q={mood}
```

**Description:** Returns a list of tracks based on mood.
**Data Used:** data.title, data.artist.name, data.preview, data.album.cover.

## 3️⃣ Deezer: Get Song Preview

**Endpoint:**

```sh
https://api.deezer.com/track/{id}
```

**Description:** Fetches details & 30-sec song preview for a track.
**Data Used:** title, artist.name, preview, album.cover.

## 4️⃣ OpenAI: AI-Powered Mood Analysis

**Endpoint:**

```sh
https://api.openai.com/v1/completions
```

**Description:** Uses AI to analyze a user's mood input and suggests music genres.
**Data Used:** AI-generated list of mood keywords.

## 👩‍💻 MVP User Stories & Frontend Routes

The application will include the following core features and routes:

**Feature Description**

- Homepage (/) Users submits a mood using a form
- AI Mood Analysis AI analyzes the user's mood and suggests genres
- Results Page (/results) Displays top recommended songs & previews
- Song Details Page (/song/:id) Provides more details + embedded audio preview
- Mood-based Playlists Users can browse curated mood-based playlists

## 💡 Example User Flow

- 1️⃣ User enters a mood (e.g., "Codig late at night") on the homepage.
- 2️⃣ AI analyzes the mood and finds matching genres.
- 3️⃣ The app fetches songs from Last.fm, Deezer, and Spotify APIs.
- 4️⃣ The results page (/results) displays a playlist of matching songs.
- 5️⃣ Clicking a song redirects to /song/:id, where users can listen to a 30-sec preview and view details.

## 🤔 Stretch Goals & Extra Features

🚀 If time permits, we plan to expand VibeSync with additional features:

**Feature Description**

- 🎶 Favoriting Songs Users can save songs to a favorites list
- 🌙 Dark Mode & Light Mode Toggle between themes for better UX
- 🎛️ Custom Playlists Users can create personalized playlists
- 🎤 Lyrics Integration Display song lyrics for users to read while listening
- 📆 Timeline for Reaching MVP in 1 Week

## Day Tasks

- Day 1 (Setup & Planning) Create GitHub repo, initialize React (Vite), install dependencies, design UI wireframes
- Day 2 (Basic Functionality) Implement homepage (/) with mood selection, integrate OpenAI API for mood analysis
- Day 3 (Music API Integration) Fetch Last.fm + Deezer data, render top tracks on /results page
- Day 4 (Enhancements & Testing) Implement song details page, allow users to play previews, add styling
- Day 5 (Final Features & Deployment) Fix bugs, optimize UI, deploy to Netlify/Vercel

## 🔥 Why VibeSync?

- ✅ AI-Powered Recommendations: Uses machine learning to match moods with music genres
- ✅ Multi-API Integration: Fetches music from multiple sources for best recommendations
- ✅ Embedded Audio Previews: Users can listen without switching apps
- ✅ Modern UI/UX: Clean, responsive React + Vite design
