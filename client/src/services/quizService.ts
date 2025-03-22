import api from './api';
import { Quiz, QuizSubmission, QuizResult } from '../types/quiz';

// Quiz service object with all methods
export const quizService = {
  // Get quiz by ID
  getQuizById: async (quizId: string): Promise<Quiz> => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  // Get quiz for a section
  getSectionQuiz: async (sectionId: string): Promise<Quiz> => {
    const response = await api.get(`/quizzes/section/${sectionId}`);
    return response.data;
  },

  // Submit quiz
  submitQuiz: async (
    quizId: string, 
    submission: QuizSubmission
  ): Promise<QuizResult> => {
    const response = await api.post(`/quizzes/${quizId}/submit`, submission);
    return response.data;
  }
};
