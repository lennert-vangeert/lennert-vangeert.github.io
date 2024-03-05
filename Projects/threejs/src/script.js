import { earth } from "./Earth.js";
import { heart } from "./Heart.js";

let currentScene;

const select = document.getElementById("dropdown");

select.value = localStorage.getItem("currentScene");
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

select.addEventListener("change", (e) => {
  localStorage.setItem("currentScene", e.target.value);
  currentScene = localStorage.getItem("currentScene");
  Launch();
});

//localstorage
