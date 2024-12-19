import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 4000;

const targetUrls = [
  "https://whiskerwingsleaderboard.onrender.com/leaderboard",
  "https://bergfreunde-webshop-mob2.onrender.com/products",
  "https://mobdev-1-opdracht-2-lennert-van-geert-api.onrender.com/login",
  "https://testing-fetch-1.onrender.com"
]; // Replace with your actual array of URLs

app.get("/", async (req, res) => {
  console.log("Received a GET request!");

  try {
    const fetchPromises = targetUrls.map((url) =>
      fetch(url).then((res) => res.json())
    );

    const results = await Promise.all(fetchPromises);

    console.log("Fetched data:", results); // Logs all fetched data to your server console

    res.json({
      message: "Fetches triggered and data retrieved successfully!",
      fetchedData: results,
    });
  } catch (error) {
    console.error("Error during fetches:", error);
    res.status(500).json({
      message: "Error fetching data from the target APIs.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
