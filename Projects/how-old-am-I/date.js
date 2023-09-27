const output = document.getElementById("output");
const small = document.getElementById("small");

const calculateAgeInDays = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
  return ageInDays;
};

output.innerHTML = `<h1> I am <span>${calculateAgeInDays(
  "2004-10-19"
)}</span> days old</h1> 
<small id="small"> born on 19th October 2004 </small>`;

ifBirthday = () => {
  if (new Date().getMonth() === 9 && new Date().getDate() === 19) {
    const birthdayText = (output.innerHTML += `<big> 
       <span id="one">T</span>
       <span id="two">o</span>
       <span id="three">d</span>
       <span id="four">a</span>
       <span id="five">y'</span>
       <span id="six">s </span> 
       <span id="seven">m</span>
       <span id="eight">y </span> 
       <span id="nine">b</span>
       <span id="ten">i</span>
       <span id="eleven">r</span>
       <span id="twelve">t</span>
       <span id="thirteen">h</span>
       <span id="fourteen">d</span>
       <span id="fifteen">a</span>
       <span id="sixteen">y</span>
       <span id="seventeen">! </span>
       </big>`);
    console.log("Today's my birthday!");
    return birthdayText;
  }
};

ifBirthday();

console.log(calculateAgeInDays("2004-10-19"));
