import {
  amount,
  category,
  currentQuestion,
  difficulty,
  score,
} from "../../components/Quiz";

export const setStorage = () => {
  localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));

  localStorage.setItem("score", JSON.stringify(score));

  localStorage.setItem("category", JSON.stringify(category));

  localStorage.setItem("amount", JSON.stringify(amount));

  localStorage.setItem("difficulty", JSON.stringify(difficulty));
};

export const removeQuizStorage = () => {
  localStorage.removeItem("quiz");
  localStorage.removeItem("score");
  localStorage.removeItem("currentQuestion");
};
export const removeSettingsStorage = () => {
  localStorage.removeItem("difficulty");
  localStorage.removeItem("category");
  localStorage.removeItem("amount");
};
