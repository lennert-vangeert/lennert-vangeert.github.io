//types
export type Answer = string | null;
export type AnswerCorrect = "true" | "false";
export type Question = {
  id: number;
  question: string;
  answers: {
    answer_a: Answer;
    answer_b: Answer;
    answer_c: Answer;
    answer_d: Answer;
    answer_e: Answer;
    answer_f: Answer;
  };
  multiple_correct_answers: string;
  correct_answers: {
    answer_a_correct: AnswerCorrect;
    answer_b_correct: AnswerCorrect;
    answer_c_correct: AnswerCorrect;
    answer_d_correct: AnswerCorrect;
    answer_e_correct: AnswerCorrect;
    answer_f_correct: AnswerCorrect;
  };
  correct_answer: string;
  explanation: string | null;
  tags: {
    name: string;
  }[];
  category: string;
  difficulty: string;
};
