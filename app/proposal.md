# VibeSync 🎧🔥</h1>

Created by Juan Felipe Garcia, and Luis Abreu.

---

### 🚀 Mission Statement

VibeSync is a mood-based music recommendation app designed to help users discover songs that match their emotions and vibes. Whether you’re feeling happy, sad, chill, or energetic, VibeSync curates a personalized list of music using data from Last.fm and Deezer APIs. Users can select their mood and instantly receive music recommendations that resonate with how they feel.

---

### 🛠️ API & React Router

This application uses the Last.fm API and Deezer API for fetching song recommendations based on mood. Below are the documentation links, specific API endpoints, and the frontend pages that will interact with them.

---

### 📜 API Documentation

- **Last.fm API Docs:** [https://www.last.fm/api/](https://www.last.fm/api/)
- **Deezer API Docs:** [https://developers.deezer.com/](https://developers.deezer.com/)

---

## 🔗 API Endpoints

### **1️⃣ Last.fm: Get Top Songs by Mood**

**Endpoint:**

```sh
https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag={mood}&api_key={API_KEY}&format=json
```

Description: Fetches the top songs that match the selected mood.
Data Used: track.name, track.artist.name, track.url

### **2️⃣ Deezer: Search for Tracks**

**Endpoint:**

```sh
https://api.deezer.com/search?q={mood}
```

Description: Returns a list of tracks that match the mood keyword.
Data Used: data.title, data.artist.name, data.preview

### **3️⃣ Deezer: Get Song Preview**

Endpoint:

```sh
https://api.deezer.com/track/{id}
```

Description: Fetches details and a 30-second song preview for a track.
Data Used: title, artist.name, preview, album.cover

**Note:** The Last.fm API requires an API key for authentication.

### 👩‍💻 MVP User Stories & Frontend Routes

The application will include the following core features and frontend routes:

**🔹 Pages & Features**

- Homepage (/) – Users can select their mood from a dropdown list.
- Results Page (/results) – Displays recommended songs based on the selected mood.
- Song Details Page (/song/:id) – Shows details of a song and provides a 30-second preview.

---

**Example User Flow**

- 1️⃣ A user visits / and selects a mood (e.g., "Happy").
- 2️⃣ The app fetches matching songs and redirects to /results, displaying a list of recommended tracks.
- 3️⃣ Clicking on a song redirects to /song/:id, showing more details and a playable preview.

---

### 🤔 Stretch User Stories

If time permits, we will add the following extra features:

- Allow users to favorite songs and save them for later.

- Enable dark mode & light mode switching for a better user experience.

- Integrate AI-powered mood detection using sentiment analysis (future update 🚀).

---

### 📆 Timeline for Reaching MVP in 1 Week

**Day 1 (Planning & Setup)**

- Create project repository & initialize React
- Setup API keys for Last.fm & Deezer
- Design wireframes for UI

**Day 2 (Basic Functionality)**

- Implement homepage (/) with mood selection
- Fetch and display mood-based songs from Last.fm API
- Implement /results page

**Day 3 (MVP Completion & Testing)**

- Implement /song/:id page with song preview
- Test API integration and UI responsiveness
- Ensure smooth navigation using React Router

**Day 4 (Improvements & Features)**

- Add search functionality for users to find specific songs
- Style UI with CSS & animations
- Add error handling for API failures

**Day 5 (Final Testing & Deployment)**

- Test user experience & fix bugs
- Deploy
