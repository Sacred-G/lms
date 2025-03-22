import express from 'express';
import { protect } from '../middleware/auth.middleware';
import {
  getSectionScenarios,
  getScenarioById,
  submitScenarioAttempt,
  getSectionDragDropExercises,
  getDragDropExerciseById,
  submitDragDropAttempt,
  getSectionRolePlayExercises,
  getRolePlayExerciseById,
  submitRolePlayEvaluation
} from '../controllers/interactive.controller';

const router = express.Router();

// All interactive routes require authentication
router.use(protect);

// Scenario routes
router.get('/scenarios/section/:sectionId', getSectionScenarios);
router.get('/scenarios/:scenarioId', getScenarioById);
router.post('/scenarios/:scenarioId/attempt', submitScenarioAttempt);

// Drag & Drop routes
router.get('/dragdrop/section/:sectionId', getSectionDragDropExercises);
router.get('/dragdrop/:exerciseId', getDragDropExerciseById);
router.post('/dragdrop/:exerciseId/attempt', submitDragDropAttempt);

// Role Play routes
router.get('/roleplay/section/:sectionId', getSectionRolePlayExercises);
router.get('/roleplay/:exerciseId', getRolePlayExerciseById);
router.post('/roleplay/:exerciseId/evaluation', submitRolePlayEvaluation);

export default router;
