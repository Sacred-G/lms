import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DragDropExercise } from '../models/interactive.model';
import Section from '../models/section.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    addDragDropExercise();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const addDragDropExercise = async () => {
  try {
    // Find the Understanding Client Needs section
    const clientNeedsSection = await Section.findOne({ title: 'Understanding Client Needs' });
    
    if (!clientNeedsSection) {
      console.error('Understanding Client Needs section not found');
      process.exit(1);
    }

    // Create a new drag and drop exercise
    const dragDropExercise = await DragDropExercise.create({
      title: 'Categorizing Client Needs and Support Approaches',
      description: 'Drag each item to the appropriate category. This exercise will help you understand different types of client needs and how to address them appropriately.',
      section: clientNeedsSection._id,
      passingScore: 70,
      zones: [
        {
          name: 'Physical Needs',
          description: 'Needs related to the client\'s body, mobility, and physical health'
        },
        {
          name: 'Emotional Needs',
          description: 'Needs related to the client\'s feelings, mental wellbeing, and social connections'
        },
        {
          name: 'Autonomy & Dignity',
          description: 'Needs related to the client\'s independence, choices, and personal dignity'
        },
        {
          name: 'Communication Needs',
          description: 'Needs related to how clients express themselves and understand information'
        }
      ],
      items: [
        {
          text: 'Assisting with bathing and personal hygiene',
          category: 'Personal Care',
          correctZone: 'Physical Needs'
        },
        {
          text: 'Helping with mobility using walkers or canes',
          category: 'Mobility Assistance',
          correctZone: 'Physical Needs'
        },
        {
          text: 'Preparing meals according to dietary restrictions',
          category: 'Nutrition',
          correctZone: 'Physical Needs'
        },
        {
          text: 'Medication reminders (not administration)',
          category: 'Health Management',
          correctZone: 'Physical Needs'
        },
        {
          text: 'Providing companionship and conversation',
          category: 'Social Support',
          correctZone: 'Emotional Needs'
        },
        {
          text: 'Engaging in familiar activities like music or hobbies',
          category: 'Engagement',
          correctZone: 'Emotional Needs'
        },
        {
          text: 'Offering reassurance during stressful situations',
          category: 'Emotional Support',
          correctZone: 'Emotional Needs'
        },
        {
          text: 'Maintaining a positive and respectful attitude',
          category: 'Relationship Building',
          correctZone: 'Emotional Needs'
        },
        {
          text: 'Asking for preferences before providing assistance',
          category: 'Respect',
          correctZone: 'Autonomy & Dignity'
        },
        {
          text: 'Encouraging clients to do as much as they can independently',
          category: 'Independence',
          correctZone: 'Autonomy & Dignity'
        },
        {
          text: 'Respecting privacy during personal care tasks',
          category: 'Privacy',
          correctZone: 'Autonomy & Dignity'
        },
        {
          text: 'Involving clients in decisions about their care',
          category: 'Self-determination',
          correctZone: 'Autonomy & Dignity'
        },
        {
          text: 'Using clear, simple language when giving instructions',
          category: 'Clear Communication',
          correctZone: 'Communication Needs'
        },
        {
          text: 'Listening actively to client concerns and requests',
          category: 'Active Listening',
          correctZone: 'Communication Needs'
        },
        {
          text: 'Using visual aids for clients with hearing difficulties',
          category: 'Adaptive Communication',
          correctZone: 'Communication Needs'
        },
        {
          text: 'Documenting and sharing important information with the care team',
          category: 'Information Sharing',
          correctZone: 'Communication Needs'
        }
      ]
    });

    // Save the drag and drop exercise
    await dragDropExercise.save();
    
    console.log('Drag and drop exercise added successfully to Understanding Client Needs section');
    process.exit(0);
  } catch (error) {
    console.error('Error adding drag and drop exercise:', error);
    process.exit(1);
  }
};
