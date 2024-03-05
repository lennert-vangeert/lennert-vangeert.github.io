//imports
import { Question } from "./types";
import { cleaner } from "../../components/list";

//fetchQuiz functie (haalt de quiz op van de API)
export const fetchQuiz = async (
  difficulty: string,
  category: string,
  limit: number
): Promise<Question[]> => {
  const link = `https://quizapi.io/api/v1/questions?apiKey=CebxaRbsf7hjjrPq74DcKVVEEaVIa7bzYz3UqxdV&difficulty=${difficulty}&category=${category}&limit=${limit}`;
  const response = await fetch(link);
  if (response.ok) {
    const result: Question[] = await response.json();
    console.log(result);
    localStorage.setItem("quiz", JSON.stringify(result));
    cleaner();
    return result;
  }
  throw new Error(`Failed to fetch quiz with status ${response.status}`);
};
