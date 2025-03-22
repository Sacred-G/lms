import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// All user routes require authentication
router.use(protect);

// Routes will be implemented as needed for user management

export default router;
