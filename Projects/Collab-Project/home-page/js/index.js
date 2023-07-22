let w = document.documentElement.clientWidth || window.innerWidth;
let navbutton = document.getElementById("navbutton");
let navbutton2 = document.getElementById("navbutton2");
let navbutton3 = document.getElementById("navbutton3");
let headerdiv = document.getElementById("headerdiv");
let mobilemenu = document.getElementById("mobilemenu");
let btncheck = document.getElementById("mainbutton");

if (w <= 900) {
  navbutton.remove();
  navbutton2.remove();
  navbutton3.remove();
  let img = document.createElement("img");
  img.src = "home-page/images/nav.svg";
  img.id = "mainbutton";
  headerdiv.appendChild(img);
} else {
  document.createElement("navbutton");
  headerdiv.appendChild(navbutton);
  document.createElement("navbutton2");
  headerdiv.appendChild(navbutton2);
  document.createElement("navbutton3");
  headerdiv.appendChild(navbutton3);
}

// function createMenu() {
//   if (mobilemenu.className === "mobilemenu hidden") {
//     mobilemenu.className = "mobilemenu";
//   } else {
//     mobilemenu.className = "mobilemenu hidden";
//   }
// }

// btncheck.addEventListener("click", createMenu);
