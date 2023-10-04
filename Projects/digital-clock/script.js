const getBrussels = document.getElementById("brussels");
const getNewYork = document.getElementById("newyork");
const tokyo = document.getElementById("tokyo");

const updateTime = () => {
  const brusselsTime = [
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds(),
  ];
  const newYorkTime = [
    new Date().getHours() - 6,
    new Date().getMinutes(),
    new Date().getSeconds(),
  ];
  const tokyoTime = [
    new Date().getHours() + 7,
    new Date().getMinutes(),
    new Date().getSeconds(),
  ];

  const padTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };
  const maxTime = (time) => {
    return time > 23 ? `${time - 24}` : `${time}`;
  };
  const minTime = (time) => {
    return time < 0 ? `${time + 24}` : `${time}`;
  }

  const giveTime = () => {
    getBrussels.innerHTML = `<h2>${maxTime(padTime(brusselsTime[0]))}:${padTime(
      brusselsTime[1]
    )}:${padTime(brusselsTime[2])}</h2>`;
    getNewYork.innerHTML = `<h2>${minTime(maxTime(padTime(newYorkTime[0])))}:${padTime(
      newYorkTime[1]
    )}:${padTime(newYorkTime[2])}</h2>`;
    tokyo.innerHTML = `<h2>${minTime(maxTime(padTime(tokyoTime[0])))}:${padTime(
      tokyoTime[1]
    )}:${padTime(tokyoTime[2])}</h2>`;
  };
  giveTime();
};
updateTime();
setInterval(() => {
  updateTime();
}, 1000);
