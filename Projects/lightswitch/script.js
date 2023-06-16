let turnOn = document.getElementById('turnOn');
let turnOff = document.getElementById('turnOff');
let lamp = document.getElementById('lamp');
let bg = document.querySelector('body');
const audio = new Audio('audio/switch_04-43153.mp3');

function lightOn() {
    lamp.classList.remove("dark");
    lamp.classList.add ("light");
    bg.classList.remove("body-bg-dark");
    bg.classList.add("body-bg-light");
}

function lightOff() {
    lamp.classList.remove("light");
    lamp.classList.add ("dark");
    bg.classList.remove("body-bg-light");
    bg.classList.add("body-bg-dark");
}

function sound() {
    audio.play();
}

turnOn.addEventListener('click', lightOn);
turnOff.addEventListener('click', lightOff);
