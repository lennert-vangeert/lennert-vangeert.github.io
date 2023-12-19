const getBrussels = document.getElementById("brussels");
const getNewYork = document.getElementById("newyork");
const getTokyo = document.getElementById("tokyo");
let twoFourHour = localStorage.getItem("twoFourHour") === "true";

document.getElementById("btn").addEventListener("click", () => {
  twoFourHour = !twoFourHour;
  localStorage.setItem("twoFourHour", twoFourHour);
  formatTime();
  updateTime();
});

const formatTime = (date, timeZone) => {
  let options;
  if (twoFourHour) {
    options = {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
  } else {
    options = {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
  }
  return new Intl.DateTimeFormat("en-UK", options).format(date);
};

const updateTime = () => {
  const now = new Date();

  const brusselsTime = formatTime(now, "Europe/Brussels");
  const newYorkTime = formatTime(now, "America/New_York");
  const tokyoTime = formatTime(now, "Asia/Tokyo");

  getBrussels.innerHTML = `<h2>${brusselsTime}</h2>`;
  getNewYork.innerHTML = `<h2>${newYorkTime}</h2>`;
  getTokyo.innerHTML = `<h2>${tokyoTime}</h2>`;
};

updateTime();
setInterval(updateTime, 1000);
