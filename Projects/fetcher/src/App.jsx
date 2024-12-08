import React, { useEffect } from "react";

const App = () => {
  const urls = [
    "https://whiskerwingsleaderboard.onrender.com/leaderboard",
    "https://bergfreunde-webshop-mob2.onrender.com/products",
    "https://mobdev-1-opdracht-2-lennert-van-geert-api.onrender.com/login",
  ];
  useEffect(() => {
    // Function to make a GET request to a URL
    const fetchUrl = async (url) => {
      try {
        console.log(`Fetching: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${url} - Status: ${response.status}`
          );
        }
        console.log(`Successfully fetched: ${url}`);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
      }
    };

    // Function to schedule periodic fetching
    const scheduleFetching = () => {
      urls.forEach((url) => {
        const interval = Math.random() * 5 * 60 * 1000; // Random interval under 5 mins
        setTimeout(() => {
          fetchUrl(url);
          scheduleFetching(); // Reschedule the same URL
        }, interval);
        console.log(
          `Scheduled fetch for ${url} in ${(interval / 1000).toFixed(
            2
          )} seconds.`
        );
      });
    };

    scheduleFetching(); // Start fetching on mount
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default App;
