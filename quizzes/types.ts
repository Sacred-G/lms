// Define the Quiz type for the quiz files
export interface Quiz {
  id: string;
  lesson_id: string;
  questions: QuizQuestion[];
  passing_score: number;
  allow_retake: boolean;
  time_limit: number;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  text: string;
  explanation: string;
  order_index: number;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  question_id: string;
  text: string;
  is_correct: boolean;
  order_index: number;
}
