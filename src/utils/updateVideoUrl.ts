import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Section from '../models/section.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB for updating video URL');
    updateVideoUrl();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const updateVideoUrl = async () => {
  try {
    // Find the section by title
    const section = await Section.findOne({ title: 'Understanding Client Needs and Preferences' });
    
    if (!section) {
      console.log('Section not found');
      process.exit(1);
    }
    
    // Update the video URL
    section.videoUrl = 'https://youtu.be/TAXr3rWMYxQ';
    
    // Save the changes
    await section.save();
    
    console.log('Video URL updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating video URL:', error);
    process.exit(1);
  }
};
