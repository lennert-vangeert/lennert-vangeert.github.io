import { earth } from "./Earth.js";
import { heart } from "./Heart.js";

let currentScene;

const heartBtn = document.getElementById("heart");
const earthBtn = document.getElementById("earth");

const Launch = () => {
  if (!localStorage.getItem("currentScene")) {
    currentScene = "heart";
  } else {
    currentScene = localStorage.getItem("currentScene");
  }

  console.log(currentScene);

  if (currentScene === "heart") {
    heart();
  } else if (currentScene === "earth") {
    earth();
  }
};

Launch();

heartBtn.addEventListener("click", () => {
  heart();
});
earthBtn.addEventListener("click", () => {
  earth();
});

//localstorage
