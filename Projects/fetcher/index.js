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

function scheduleFetchCalls(urlArray) {
  urlArray.forEach((url) => {
    const randomInterval = Math.random() * 5 * 60 * 1000;
    setTimeout(() => {
      fetchUrl(url);
      scheduleFetchCalls([url]);
    }, randomInterval);
    console.log(
      `Scheduled fetch for ${url} in ${(randomInterval / 1000).toFixed(
        2
      )} seconds.`
    );
  });
}

const urls = [
  "https://whiskerwingsleaderboard.onrender.com/leaderboard",
  "https://bergfreunde-webshop-mob2.onrender.com/products",
  "https://mobdev-1-opdracht-2-lennert-van-geert-api.onrender.com/login",
];

scheduleFetchCalls(urls);
