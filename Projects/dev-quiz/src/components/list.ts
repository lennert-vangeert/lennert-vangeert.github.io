//imports
import { Question } from "../modules/quiz/types";
import { $answers, $question } from "./Quiz";

//answerItem functie (maakt de antwoorden aan)
export const answerItem = (question: Question) => {
  let html: string = "";
  for (let [key, value] of Object.entries(question.answers)) {
    if (value) {
      const correctAnswerKey = `${key}_correct`;
      value = textReplacer(value);

      const correctAnswer =
        (question.correct_answers as any)[correctAnswerKey] || "";
      html += `<button class="answer-card" id="answer-button"data-type="${correctAnswer}">${value}</button> `;
    }
  }
  return html;
};

//cleaner functie (maakt de vraag en antwoorden leeg)
export const cleaner = () => {
  if ($answers && $question) {
    $answers.innerHTML = "";
    $question.innerHTML = "";
  }
};

export const textReplacer = (text: string) => {
  text = text
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace("<!--", "&lt;!--")
    .replace("-->", "--&gt;")
    .replace("'", "&apos;");
  return text;
};
