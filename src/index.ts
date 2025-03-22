import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// Routes
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import sectionRoutes from './routes/section.routes';
import userRoutes from './routes/user.routes';
import quizRoutes from './routes/quiz.routes';
import progressRoutes from './routes/progress.routes';
import interactiveRoutes from './routes/interactive.routes';
import adminRoutes from './routes/admin.routes';
import uploadRoutes from './routes/upload.routes';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/interactive', interactiveRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Home Health Agency LMS API is running');
});

// Start the server without requiring MongoDB connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Try to connect to MongoDB, but don't block server startup
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      console.log('Server running in limited mode - database features will not work');
    });
});

export default app;
