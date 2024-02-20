const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
let twoFourHour = localStorage.getItem("twoFourHour") === "true";
const inputone = document.getElementById("inputone");
const inputtwo = document.getElementById("inputtwo");
const inputthree = document.getElementById("inputthree");
const firstloc = document.getElementById("firstloc");
const secondloc = document.getElementById("secondloc");
const thirdloc = document.getElementById("thirdloc");


document.getElementById("btn").addEventListener("click", () => {
  twoFourHour = !twoFourHour;
  localStorage.setItem("twoFourHour", twoFourHour);
  formatTime();
  updateTime();
});

initLocalStorage = () => {
  inputone.value = localStorage.getItem("inputone") ?? "Europe/London";
  inputtwo.value = localStorage.getItem("inputtwo") ?? "America/New_York";
  inputthree.value = localStorage.getItem("inputthree") ?? "Asia/Tokyo";
};

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

inputone.addEventListener("change", () => {
  localStorage.setItem("inputone", inputone.value);
  updateTime();
});

inputtwo.addEventListener("change", () => {
  localStorage.setItem("inputtwo", inputtwo.value);
  updateTime();
});

inputthree.addEventListener("change", () => {
  localStorage.setItem("inputthree", inputthree.value);
  updateTime();
});

const replaceUnderScore = (string) => {
  return string.replace("_", " ");
}


const updateTime = () => {
  const now = new Date();
  
  initLocalStorage();
  const firstTime = formatTime(now, inputone.value);
  const secondTime = formatTime(now, inputtwo.value);
  const thirdTime = formatTime(now, inputthree.value);

  firstloc.innerHTML = replaceUnderScore(inputone.value.split("/")[inputone.value.split("/").length - 1]);
  secondloc.innerHTML = replaceUnderScore(inputtwo.value.split("/")[inputtwo.value.split("/").length - 1]);
  thirdloc.innerHTML = replaceUnderScore(inputthree.value.split("/")[inputthree.value.split("/").length - 1]);
  first.innerHTML = `<h2>${firstTime}</h2>`;
  second.innerHTML = `<h2>${secondTime}</h2>`;
  third.innerHTML = `<h2>${thirdTime}</h2>`;

};

updateTime();
setInterval(updateTime, 1000);
