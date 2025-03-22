import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// Get all courses (public)
router.get('/', getAllCourses);

// Get a single course by ID (public)
router.get('/:id', getCourseById);

// Protected routes (require authentication)
router.use(protect);

// Create a new course (admin and instructor only)
router.post('/', restrictTo('admin', 'instructor'), createCourse);

// Update a course
router.put('/:id', updateCourse);

// Delete a course
router.delete('/:id', deleteCourse);

export default router;
