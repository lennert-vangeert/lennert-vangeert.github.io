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
// initializes the head and preloads all the images


if (localStorage.getItem("scrollPercent")) {
  window.scrollTo(0, localStorage.getItem("scrollPercent"));
} else {
  window.scrollTo(0, 0);
}
// if the user has scrolled before, scroll to that position, otherwise scroll to the top

const getScrollPercent = () => {
  const h = document.documentElement;
  const b = document.body;
  const st = "scrollTop";
  const sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};
// gets the scroll percentage of the page

const setFrame = () => {
  $screen.style.backgroundImage = `url(frames/${Math.floor(
    scrollPercent * 2
  )}.png)`;
  console.log(scrollPercent * 2);
};
// sets the frame of the animation according to the scroll percentage

const autoScroll = () => {
  clearTimeout();
  window.scrollTo(0, 0);
  for (let i = 0; i < 1500; i++) {
    setTimeout(() => {
      window.scrollTo(0, i * 2);
    }, 4 * i);
  }
};
// sets the scrolllocation to 0, 0 and scrolls the page to the bottom

$btn.addEventListener("click", () => {
  autoScroll();
});
// event listener for the button

window.addEventListener("scroll", () => {
  scrollPercent = Math.round(getScrollPercent());
  localStorage.setItem("scrollPercent", scrollPercent);
  setFrame();
});


// event listener for the scroll
