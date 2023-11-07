const output = document.getElementById("output");
const small = document.getElementById("small");

const calculateAgeInDays = (date) => {
  const today = new Date(); // get today's date
  const birthDate = new Date(date); // get birthdate
  const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24)); // calculate age in days
   // calculate age in years
  return ageInDays // return age in days and in years
};

output.innerHTML = `<h1> I am <span>${calculateAgeInDays(
  "2004-10-19"
)}</span> days old</h1> 
<small id="small"> born on 19th October 2004 </small>`; //add text to output

ifBirthday = () => {
  if (new Date().getMonth() + 1 === 10 && new Date().getDate() === 19) {
    const birthdayText = (output.innerHTML += `<big> 
       <span id="one">T</span>
       <span id="two">o</span>
       <span id="three">d</span>
       <span id="four">a</span>
       <span id="five">y'</span>
       <span id="six">s </span> 
       <br>
       <span id="seven">m</span>
       <span id="eight">y </span> 
       <br>
       <span id="nine">b</span>
       <span id="ten">i</span>
       <span id="eleven">r</span>
       <span id="twelve">t</span>
       <span id="thirteen">h</span>
       <span id="fourteen">d</span>
       <span id="fifteen">a</span>
       <span id="sixteen">y</span>
       <span id="seventeen">! </span>
       </big>`); // add text to output
    console.log("Today's my birthday!"); // log to console
    return birthdayText; // return text
  }
};
ifDeath = () => {
  if (new Date().getFullYear() >= 2104) {
    console.log("I'm dead probably :(")
    const birthdayText = (output.innerHTML = `<big> 
       <span id="one">I'</span>
       <span id="two">m </span>
       <span id="three">d</span>
       <span id="four">e</span>
       <span id="five">a</span>
       <span id="six">d </span> 
       <span id="seven">p</span>
       <span id="eight">r</span> 
       <span id="nine">o</span>
       <span id="ten">b</span>
       <span id="eleven">a</span>
       <span id="twelve">b</span>
       <span id="thirteen">l</span>
       <span id="fourteen">y</span>
       <span id="fifteen">:</span>
       <span id="sixteen">(</span>
       </big>`); // add text to output
  }
}

runFunction = () => {
  if (new Date().getFullYear() >= 2104) {
    ifDeath(); // run function if year equals or is greater than 2104
  } else {
    ifBirthday(); // run function if year is less than 2104
  }
}

runFunction(); // run function

