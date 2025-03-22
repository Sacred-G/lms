import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user profile
router.get('/me', protect, getCurrentUser);

export default router;
