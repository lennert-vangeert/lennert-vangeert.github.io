import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Array of URLs to fetch
const urls = [
  "https://whiskerwingsleaderboard.onrender.com/leaderboard",
  "https://bergfreunde-webshop-mob2.onrender.com/products",
  "https://mobdev-1-opdracht-2-lennert-van-geert-api.onrender.com/login",
];

// Function to fetch a URL
async function fetchUrl(url) {
  try {
    console.log(`Fetching URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url} - Status: ${response.status}`);
    }
    console.log(`Fetched ${url} successfully!`);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
  }
}

// Function to schedule fetch calls for each URL
function scheduleFetches() {
  urls.forEach((url) => {
    const scheduleTask = () => {
      const randomInterval = Math.random() * 5 * 60 * 1000; // Random interval up to 5 minutes
      setTimeout(() => {
        fetchUrl(url);
        scheduleTask(); // Reschedule after fetch
      }, randomInterval);
      console.log(
        `Scheduled fetch for ${url} in ${(randomInterval / 1000).toFixed(
          2
        )} seconds.`
      );
    };

    scheduleTask(); // Start the scheduling loop for each URL
  });
}

// Start scheduling fetches
scheduleFetches();

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
