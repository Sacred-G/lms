import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Section from '../models/section.model';

// Load environment variables
dotenv.config();

console.log('Starting script to update Key Responsibilities audio URL');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    updateAudioUrl();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const updateAudioUrl = async () => {
  try {
    console.log('Searching for Key Responsibilities section...');
    
    // Find the Key Responsibilities section
    const section = await Section.findOne({ title: 'Key Responsibilities of Support Staff' });
    
    if (!section) {
      console.error('Key Responsibilities section not found');
      
      // List all sections to help debug
      console.log('Available sections:');
      const allSections = await Section.find({}, 'title');
      allSections.forEach(s => console.log(`- ${s.title}`));
      
      process.exit(1);
    }
    
    console.log(`Found section: ${section.title}`);
    console.log(`Current audioUrl: ${section.audioUrl}`);
    
    // Update the audioUrl to point to the new audio file
    const newAudioUrl = '/audio/Direct Support Staff_ Key Responsibilities.wav';
    section.audioUrl = newAudioUrl;
    await section.save();
    
    console.log(`Successfully updated Key Responsibilities section audio URL to: ${newAudioUrl}`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating audio URL:', error);
    process.exit(1);
  }
};
