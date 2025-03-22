import express from 'express';
import {
  getUserProgress,
  getUserCourseProgress,
  updateSectionProgress,
  getSectionProgress,
} from '../controllers/progress.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All progress routes require authentication
router.use(protect);

// Get user progress for all courses
router.get('/', getUserProgress);

// Get user progress for a specific course
router.get('/course/:courseId', getUserCourseProgress);

// Get progress for a specific section
router.get('/course/:courseId/section/:sectionId', getSectionProgress);

// Update section progress
router.put('/course/:courseId/section/:sectionId', updateSectionProgress);

export default router;
