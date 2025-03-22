export interface Question {
  _id?: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Alias QuizQuestion to Question for backward compatibility
export type QuizQuestion = Question;

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  section: string;
  questions: Question[];
  passingScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizSubmission {
  answers: {
    questionId: string;
    answer: string;
  }[];
}

export interface QuizResult {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
}
