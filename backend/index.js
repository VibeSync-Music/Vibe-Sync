// Import dependecies
const express = require("express");
const app = express();

// The path module is useful for constructing relative filepaths
const path = require("path");

// the filepath is to the entire assets folder
const filepath = path.join(__dirname, "../app/dist");

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// Other controllers "v"

// Listen for requests on port 8080
const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
