import express from 'express';
import {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getQuizBySection,
} from '../controllers/quiz.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// All quiz routes require authentication
router.use(protect);

// Get a quiz by section ID
router.get('/section/:sectionId', getQuizBySection);

// Get a quiz by ID
router.get('/:id', getQuizById);

// Create a new quiz (admin and instructor only)
router.post('/', restrictTo('admin', 'instructor'), createQuiz);

// Update a quiz
router.put('/:id', updateQuiz);

// Delete a quiz
router.delete('/:id', deleteQuiz);

// Submit a quiz attempt
router.post('/:quizId/submit', submitQuizAttempt);

export default router;
