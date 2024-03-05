//imports
import { Question } from "../modules/quiz/types";
import { answerItem, textReplacer } from "./list";
import { fetchQuiz } from "../modules/quiz/api";
import {
  setStorage,
  removeQuizStorage,
  removeSettingsStorage,
} from "../modules/quiz/storage";

//variabelen
const $settings = document.getElementById("settings");
const $quiz = document.getElementById("quiz");
const $result = document.getElementById("result");
const $startQuiz = document.getElementById("start-button");
const correct = new Audio("src/audio/correct.mp3");
const incorrect = new Audio("src/audio/incorrect.mp3");
const $answers = document.getElementById("answers");
const $question = document.getElementById("question");
const $timer = document.getElementById("timer");
const $questionNumber = document.getElementById("questionnumber");
let time = 10;
let questions: Question[] | null = null;
let score: number = 0;
let currentQuestion: number = 0;
let currentView: "quiz" | "result" | "settings" = "settings";

export { score, currentQuestion, currentView, $answers, $question };

//init functie (start de app en start storage functie)
const init = () => {
  if (
    localStorage.getItem("quiz") !== null &&
    localStorage.getItem("score") !== null &&
    localStorage.getItem("currentQuestion") !== null
  ) {
    currentView = "quiz";
    questions = JSON.parse(localStorage.getItem("quiz") || "");
    score = parseInt(localStorage.getItem("score") || "");
    currentQuestion = parseInt(localStorage.getItem("currentQuestion") || "");
  }
  if (currentQuestion > 0 && currentQuestion >= questions!.length) {
    currentView = "result";
  }
  showUI();
};

//showUI functie (laat de juiste UI zien en start de nodige functies)

const showUI = () => {
  if (currentView === "quiz") {
    $quiz?.classList.remove("hidden");
    $settings?.classList.add("hidden");
    $result?.classList.add("hidden");
    showQuiz();
  } else if (currentView === "settings") {
    $quiz?.classList.add("hidden");
    $settings?.classList.remove("hidden");
    $result?.classList.add("hidden");
  } else if (currentView === "result") {
    $quiz?.classList.add("hidden");
    $settings?.classList.add("hidden");
    $result?.classList.remove("hidden");
    resultBuilder(questions?.length.toString() || "");
  }
};

//startQuiz functie (start de quiz en haalt de nodige data op) en setSettings functie
const $difficulty = document.getElementById("difficulty") as HTMLSelectElement;
const $category = document.getElementById("category") as HTMLSelectElement;
const $amount = document.getElementById(
  "amount-questions"
) as HTMLSelectElement;

let difficulty = $difficulty.value;
let category = $category.value;
let amount = parseInt($amount.value);
export { difficulty, category, amount };

//setSettings functie (veranderd de input velden in de dom naar de opgeslagen waardes indien deze bestaan)
const setSettings = () => {
  if (
    localStorage.getItem("difficulty") !== null &&
    localStorage.getItem("category") !== null &&
    localStorage.getItem("amount") !== null
  ) {
    $difficulty.value = JSON.parse(localStorage.getItem("difficulty") || "");
    $category.value = JSON.parse(localStorage.getItem("category") || "");
    $amount.value = JSON.parse(localStorage.getItem("amount") || "");
  }
};
setSettings();

const onStartQuiz = () => {
  time = 10;
  if (
    localStorage.getItem("difficulty") !== null &&
    localStorage.getItem("category") !== null &&
    localStorage.getItem("amount") !== null
  ) {
    difficulty = JSON.parse(localStorage.getItem("difficulty") || "");
    category = JSON.parse(localStorage.getItem("category") || "");
    amount = parseInt(localStorage.getItem("amount") || "");
  } else {
    difficulty = $difficulty.value;
    category = $category.value;
    amount = parseInt($amount.value);
  }
  removeSettingsStorage();
  difficulty = $difficulty.value;
  category = $category.value;
  amount = parseInt($amount.value);
  fetchQuiz(difficulty, category, amount).then((result) => {
    questions = result;
    currentView = "quiz";
    showUI();
  });
  setStorage();
  setTimer();
  setQuestionNumber();
};
export { $difficulty, $category, $amount };

const setQuestionNumber = () => {
  if ($questionNumber) {
    $questionNumber.innerHTML = `${currentQuestion + 1}/${questions!.length}`;
  }
};

//timer functie (start de timer en zorgt ervoor dat de volgende vraag getoond wordt wanneer de de tijd om is)

const setTimer = () => {
  const timer = setInterval(() => {
    time--;
    if (time === 0) {
      incorrect.play();
      if (currentQuestion === questions!.length) {
        clearInterval(timer);
        currentView = "result";
        showUI();
      } else {
        currentQuestion++;
        showQuiz();
        time = 10;
      }
    }
    $timer!.innerHTML = `${time}`;
    if (currentQuestion === questions!.length) {
      clearInterval(timer);
      $timer!.innerHTML = `last question ;)`;
    }
    if (currentView === "result") {
      clearInterval(timer);
    }
  }, 1000);
};

//eventlistener voor de startknop
$startQuiz?.addEventListener("click", onStartQuiz);

//showQuiz functie maakt de vraag en antwoorden
const showQuiz = () => {
  if ($question && $answers && questions) {
    const question = questions[currentQuestion];
    question.question = textReplacer(question.question);
    $question.innerHTML = "";

    $question.innerHTML += `<div class="question">${question.question}</div>`;
    if ($answers) {
      $answers.innerHTML = "";
      $answers.innerHTML += answerItem(question);
    }
    setQuestionNumber();
  }

  //eventlistener voor de antwoordknoppen
  const $answerButtons = document.querySelectorAll(".answer-card");
  $answerButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.dataset.type === "true") {
        score++;
        currentQuestion++;
        correct.play();
        console.log(correct);
      } else {
        currentQuestion++;
        incorrect.play();
        console.log(incorrect);
      }
      if (currentQuestion < questions!.length) {
        showQuiz();
      } else {
        currentView = "result";
      }
      showUI();

      setStorage();
      setQuestionNumber();
      time = 10;
    });
  });
};

//stopQuiz functie (stopt de quiz en verwijdert de data uit de local storage)
const $stopButton = document.getElementById("stop-button");
$stopButton?.addEventListener("click", () => {
  stopQuiz();
});

const stopQuiz = () => {
  currentView = "result";
  removeQuizStorage();
  removeSettingsStorage();
  showUI();
};

//resultBuilder functie (bouwt de resultaten pagina)
const resultBuilder = (limit: string) => {
  const $result = document.getElementById("result");
  if ($result) {
    $result.innerHTML = "";
    $result.innerHTML += `<div class="result-text">Je hebt een score van: ${score}/${limit}</div> <button class="try-again-button start-button" id="try-again-button">Play another</button>`;
    if (score / parseInt(limit) >= 0.5) {
      $result.innerHTML += `<img src="./images/good-job.gif" alt="good job">`;
    } else {
      $result.innerHTML += `<img src="./images/not-so-good-job.gif" alt="bruh">`;
    }
  }
  //eventlistener voor de try again knop
  const $tryAgain = document.getElementById("try-again-button");
  $tryAgain?.addEventListener("click", () => {
    currentView = "settings";
    removeQuizStorage();
    currentQuestion = 0;
    questions = null;
    score = 0;
    showUI();
  });
};

export { init };
