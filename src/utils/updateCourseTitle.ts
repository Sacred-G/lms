import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/course.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB for updating course title');
    updateCourseTitle();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const updateCourseTitle = async () => {
  try {
    // Find the course with the old title
    const course = await Course.findOne({ title: 'Home Health Support Staff Training' });
    
    if (!course) {
      console.log('Course not found');
      process.exit(0);
    }
    
    // Update the title
    course.title = 'Support Staff Training';
    await course.save();
    
    console.log('Course title updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating course title:', error);
    process.exit(1);
  }
};
