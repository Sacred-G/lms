import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import {
  getAllUsers,
  updateUserRole,
  getAllProgress,
  getStatistics,
  deleteProgressForDeletedUsers
} from '../controllers/admin.controller';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin'));

// User management routes
router.get('/users', getAllUsers);
router.patch('/users/:userId/role', updateUserRole);

// Progress management routes
router.get('/progress', getAllProgress);
router.delete('/progress/deleted-users', deleteProgressForDeletedUsers);

// Statistics routes
router.get('/statistics', getStatistics);

export default router;
