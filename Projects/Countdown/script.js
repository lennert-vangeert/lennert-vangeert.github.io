const dateInput = document.getElementById("date");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const btn = document.getElementById("btn");
const alert = document.getElementById("alert");
const currentDate = new Date();
let countdownInterval;

dateInput.value =
  localStorage.getItem("date") || currentDate.toISOString().slice(0, 10);

const setData = () => {
  const date = new Date(dateInput.value);
  console.log(`Selected Date: ${date.toLocaleString()}`);
};

const countdown = () => {
  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const newDate = new Date(dateInput.value);
    const timeLeft = newDate - currentDate;
    if (timeLeft < 0 || isNaN(timeLeft)) {
      clearInterval(countdownInterval);
      alert.innerHTML = "<p>Please select a valid date<p>";
      days.innerHTML = " ";
      hours.innerHTML = " ";
      minutes.innerHTML = " ";
      seconds.innerHTML = " ";
      return;
    }

    const s = Math.floor(timeLeft / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);

    days.innerHTML = d;
    hours.innerHTML = h % 24;
    minutes.innerHTML = m % 60;
    seconds.innerHTML = s % 60;

    // console.log(
    //   `${d} days ${h % 24} hours ${m % 60} minutes ${s % 60} seconds`
    // );
  }, 1000);
};

const start = () => {
  clearInterval(countdownInterval);
  setData();
  countdown();
  localStorage.setItem("date", dateInput.value);
};

if (localStorage.getItem("date")) {
  start();
}

dateInput.addEventListener("change", start);
