import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Section from '../models/section.model';
import Course from '../models/course.model';
import Quiz from '../models/quiz.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    checkMasterSupportStaffSection();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const checkMasterSupportStaffSection = async () => {
  try {
    // Find the section
    const section = await Section.findOne({ title: 'Master Being a Support Staff' });
    
    if (!section) {
      console.error('Section "Master Being a Support Staff" not found');
      process.exit(1);
    }
    
    console.log('Found section:', section);
    
    // Check if the section is in the course
    const course = await Course.findOne({ sections: section._id });
    
    if (!course) {
      console.error('Section not found in any course');
      process.exit(1);
    }
    
    console.log('Section is in course:', course.title);
    
    // Check if the quiz exists
    const quiz = await Quiz.findOne({ section: section._id });
    
    if (!quiz) {
      console.log('No quiz found for this section');
    } else {
      console.log('Found quiz:', quiz.title);
      console.log('Quiz has', quiz.questions.length, 'questions');
    }
    
    console.log('Check completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error checking Master Being a Support Staff section:', error);
    process.exit(1);
  }
};
