import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { RolePlayExercise } from '../models/interactive.model';
import Section from '../models/section.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    addRolePlayExercise();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const addRolePlayExercise = async () => {
  try {
    // Find the Introduction to the Role section
    const introductionSection = await Section.findOne({ title: 'Introduction to the Role' });
    
    if (!introductionSection) {
      console.error('Introduction to the Role section not found');
      process.exit(1);
    }

    // Create a new role play exercise
    const rolePlayExercise = await RolePlayExercise.create({
      title: 'First Day Support Staff Scenario',
      description: 'Practice your role as a new support staff member meeting a client for the first time. This exercise will help you apply the principles of dignity, respect, and client autonomy in a realistic scenario.',
      section: introductionSection._id,
      scenario: "You are starting your first day as a support staff member at Centered Support Services. You are meeting your client, Mr. James Wilson, a 68-year-old man recovering from a stroke who needs assistance with daily activities. This is your first meeting, and you need to establish rapport while discussing how you'll be supporting him with his daily routine.",
      roles: [
        {
          name: 'Support Staff',
          description: 'You are a new support staff member who wants to provide excellent care while respecting Mr. Wilson\'s independence and dignity.',
          keyPoints: [
            'Introduce yourself professionally and explain your role',
            'Ask about Mr. Wilson\'s preferences rather than making assumptions',
            'Emphasize that your goal is to support his independence, not take over tasks',
            'Listen actively to his concerns and preferences',
            'Maintain a respectful tone and body language throughout the interaction',
            'Explain how you can assist with daily activities while respecting his autonomy'
          ]
        },
        {
          name: 'Mr. Wilson (Client)',
          description: 'You are James Wilson, a 68-year-old retired teacher who recently had a stroke. You value your independence and are somewhat apprehensive about having someone in your home helping you.',
          keyPoints: [
            'Express your concerns about losing independence',
            'Ask questions about how things will work',
            'Share your preferences for your daily routine',
            'Mention that you prefer to do as much as you can for yourself',
            'Express appreciation when the support staff respects your autonomy',
            'Raise a concern about privacy during personal care activities'
          ]
        }
      ],
      evaluationCriteria: [
        {
          criterion: 'Professional Introduction',
          weight: 1
        },
        {
          criterion: 'Respect for Client Autonomy',
          weight: 2
        },
        {
          criterion: 'Active Listening Skills',
          weight: 2
        },
        {
          criterion: 'Clear Communication',
          weight: 1
        },
        {
          criterion: 'Addressing Client Concerns',
          weight: 2
        },
        {
          criterion: 'Maintaining Dignity and Respect',
          weight: 2
        }
      ]
    });

    // Save the role play exercise
    await rolePlayExercise.save();
    
    console.log('Role play exercise added successfully to Introduction to the Role section');
    process.exit(0);
  } catch (error) {
    console.error('Error adding role play exercise:', error);
    process.exit(1);
  }
};
