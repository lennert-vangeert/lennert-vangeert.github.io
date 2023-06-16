let turnOn = document.getElementById('turnOn');
let turnOff = document.getElementById('turnOff');
let btndiv = document.getElementById('btn-div');
let lamp = document.getElementById('lamp');
let bg = document.querySelector('body');
const audio = new Audio('audio/switch_04-43153.mp3');

function lightOn() {
    lamp.classList.remove("dark");
    lamp.classList.add ("light");
    bg.classList.remove("body-bg-dark");
    bg.classList.add("body-bg-light");
    turnOn.style.backgroundColor = "rgb(234,233,71)"
    turnOff.style.backgroundColor = "rgb(200, 194, 194)"
    btndiv.style.opacity = "100%"
    console.log("Light on");
}

function lightOff() {
    lamp.classList.remove("light");
    lamp.classList.add ("dark");
    bg.classList.remove("body-bg-light");
    bg.classList.add("body-bg-dark");
    turnOff.style.backgroundColor = "rgb(234,233,71)"
    turnOn.style.backgroundColor = "rgb(200, 194, 194)"
    btndiv.style.opacity = "25%"
    console.log("Light off");
}

function sound() {
    audio.play();
}

turnOn.addEventListener('click', lightOn);
turnOff.addEventListener('click', lightOff);
