let input = document.getElementById("toggleswitch");
let btndiv = document.getElementById("btn-div");
let lamp = document.getElementById("lamp");
let bg = document.querySelector("body");
const audio = new Audio("audio/switch_04-43153.mp3");

input.addEventListener("change", function () {
  if (this.checked) {
    audio.play();
    lamp.classList.remove("dark");
    lamp.classList.add("light");
    bg.classList.remove("body-bg-dark");
    bg.classList.add("body-bg-light");
    btndiv.style.opacity = "100%";
    console.log("Light on");
  } else {
    audio.play();
    lamp.classList.remove("light");
    lamp.classList.add("dark");
    bg.classList.remove("body-bg-light");
    bg.classList.add("body-bg-dark");
    btndiv.style.opacity = "25%";
    console.log("Light off");
  }
});

function sound() {
  audio.play();
}
