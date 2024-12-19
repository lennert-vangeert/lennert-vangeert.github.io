import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Handle GET request and trigger fetch
app.get("/", async (req, res) => {
  console.log("Received a GET request!");

  // Triggering the fetch function
  try {
    const fetchResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    ); // Replace this URL with your target API
    const data = await fetchResponse.json();

    console.log("Fetched data:", data); // Logs fetched data to your server console

    // Respond to the original GET request
    res.json({
      message: "Fetch triggered and data retrieved successfully!",
    });
  } catch (error) {
    console.error("Error during fetch:", error);
    res.status(500).json({
      message: "Error fetching data from the target API.",
      error: error.message,
    });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
