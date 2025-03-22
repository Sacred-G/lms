// Vercel Serverless Function for API
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Import routes
const authRoutes = require('../dist/routes/auth.routes');
const courseRoutes = require('../dist/routes/course.routes');
const sectionRoutes = require('../dist/routes/section.routes');
const quizRoutes = require('../dist/routes/quiz.routes');
const progressRoutes = require('../dist/routes/progress.routes');
const interactiveRoutes = require('../dist/routes/interactive.routes');
const uploadRoutes = require('../dist/routes/upload.routes');
const adminRoutes = require('../dist/routes/admin.routes');
const userRoutes = require('../dist/routes/user.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/interactive', interactiveRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Export the Express API
module.exports = app;
