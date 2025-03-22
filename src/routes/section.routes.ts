import express from 'express';
import {
  getAllSections,
  getSectionsByCourse,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} from '../controllers/section.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// Get all sections (admin only)
router.get('/', protect, restrictTo('admin'), getAllSections);

// Get all sections for a course (public)
router.get('/course/:courseId', getSectionsByCourse);

// Get a single section by ID (public)
router.get('/:id', getSectionById);

// Protected routes (require authentication)
router.use(protect);

// Create a new section (admin and instructor only)
router.post('/', restrictTo('admin', 'instructor'), createSection);

// Update a section
router.put('/:id', updateSection);

// Delete a section
router.delete('/:id', deleteSection);

export default router;
