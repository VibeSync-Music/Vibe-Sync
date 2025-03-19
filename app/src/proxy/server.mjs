import express from "express"; // A lightweight web framework for handling HTTP requests
import cors from "cors"; // allow cross-origin requests from the frontend
import fetch from "node-fetch";
/*This code sets up a simple Node.js Express proxy server to fetch track data from the Deezer API while bypassing CORS restrictions*/
const app = express();
const PORT = process.env.PORT || 5000;
const DEEZER_API_BASE = "https://api.deezer.com/search?q=";

app.use(cors());
app.use(express.json());

//  Route to fetch Deezer tracks through the proxy
app.get("/deezer/:query", async (req, res) => {
  // Defines an API endpoint at /deezer/:query to forward search queries to Deezer.
  try {
    const query = req.params.query;
    const response = await fetch(`${DEEZER_API_BASE}${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch Deezer data" });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`)); // starts the express server on the specified port
