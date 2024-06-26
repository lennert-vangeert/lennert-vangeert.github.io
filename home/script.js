// const $btn = document.querySelectorAll(".button");

// $btn.forEach(($btn) => {
//   const originalText = $btn.innerHTML;
//   $btn.addEventListener("mouseenter", (e) => {
//     e.currentTarget.innerHTML = "Click me!";
//     e.currentTarget.style.fontWeight = "bold";
//   });
//   $btn.addEventListener("mouseout", (e) => {
//     e.currentTarget.innerHTML = originalText;
//     e.currentTarget.style.fontWeight = "normal";
//   });
// });

// const mouseLocation = (e) => {
//   const mouseX = e.pageX - 25;
//   const mouseY = e.pageY - 25;
//   const blob = document.querySelector(".blob");
//   blob.style.left = `${mouseX}px`;
//   blob.style.top = `${mouseY}px`;
// };

// document.addEventListener("mousemove", mouseLocation);

let nonResponsiveElements = document.querySelectorAll(".NR");
let apiElements = document.querySelectorAll(".API");
console.log(nonResponsiveElements);
const nonResponsiveInfo = document.querySelector(".NRinfo");
const apiInfo = document.querySelector(".APIinfo");

for (let i = 0; i < nonResponsiveElements.length; i++) {
  nonResponsiveElements[i].addEventListener("mouseover", () => {
    nonResponsiveInfo.style.opacity = "100%";
  });
  nonResponsiveElements[i].addEventListener("mouseout", () => {
    nonResponsiveInfo.style.opacity = "0%";
  });
}

for (let i = 0; i < apiElements.length; i++) {
  apiElements[i].addEventListener("mouseover", () => {
    apiInfo.style.opacity = "100%";
  });
  apiElements[i].addEventListener("mouseout", () => {
    apiInfo.style.opacity = "0%";
  });
}
