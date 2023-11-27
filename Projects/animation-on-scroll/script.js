// Add your JavaScript code here
const $screen = document.getElementById("screen");
const $btn = document.getElementById("btn");
const $head = document.querySelector("head");
let scrollPercent = 0;

const initHead = () => {
  for (let i = 0; i < 201; i++) {
    const $link = document.createElement("link");
    $link.rel = "preload";
    $link.href = `frames/${i}.png`;
    $link.as = "image";
    $head.appendChild($link);
  }
};
initHead();

if (localStorage.getItem("scrollPercent")) {
  window.scrollTo(0, localStorage.getItem("scrollPercent"));
} else {
  window.scrollTo(0, 0);
}

const getScrollPercent = () => {
  const h = document.documentElement;
  const b = document.body;
  const st = "scrollTop";
  const sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

const setFrame = () => {
  $screen.style.backgroundImage = `url(frames/${Math.floor(
    scrollPercent * 2
  )}.png)`;
  console.log(scrollPercent * 2);
};

const autoScroll = () => {
  clearTimeout();
  for (let i = 0; i < 1500; i++) {
    setTimeout(() => {
      window.scrollTo(0, i * 2);
    }, 4 * i);
  }
};

$btn.addEventListener("click", () => {
  autoScroll();
});

window.addEventListener("scroll", () => {
  scrollPercent = Math.round(getScrollPercent());
  localStorage.setItem("scrollPercent", scrollPercent);
  setFrame();
});
