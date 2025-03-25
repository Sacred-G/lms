import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Section from '../models/section.model';
import Quiz from '../models/quiz.model';
import { quizzes } from '../../quizzes';
import { Quiz as QuizData, QuizQuestion, QuizOption } from '../../quizzes/types';

// Load environment variables
dotenv.config();

// Map quiz keys to section titles
const quizToSectionMap: Record<string, string> = {
  introToCaregiving: 'Introduction to the Role',
  safetyProtocols: 'Emergency Procedures and Crisis Management',
  communicationBasics: 'Communication and Professionalism',
  personalCareTechniques: 'Key Responsibilities of Support Staff',
  introductionToTheRole: 'Introduction to the Role',
  understandingClientNeeds: 'Understanding Client Needs and Preferences',
  keyResponsibilities: 'Key Responsibilities of Support Staff',
  infectionControl: 'Infection Control and Hygiene Practices',
  emergencyProcedures: 'Emergency Procedures and Crisis Management',
  clientRights: 'Client Rights',
  masterSupportStaff: 'Master Being a Support Staff'
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB for importing quizzes');
    importQuizzes();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const importQuizzes = async () => {
  try {
    console.log('Starting quiz import process...');
    
    // Get all sections
    const sections = await Section.find({});
    console.log(`Found ${sections.length} sections`);
    
    // Process each quiz
    for (const [quizKey, quizData] of Object.entries(quizzes)) {
      // Find matching section by title
      const sectionTitle = quizToSectionMap[quizKey];
      if (!sectionTitle) {
        console.log(`No section mapping found for quiz: ${quizKey}`);
        continue;
      }
      
      const section = sections.find(s => s.title === sectionTitle);
      if (!section) {
        console.log(`No section found with title: ${sectionTitle}`);
        continue;
      }
      
      console.log(`Processing quiz "${quizData.id}" for section "${section.title}"`);
      
      // Format questions for our model
      const formattedQuestions = quizData.questions.map((q: QuizQuestion) => {
        // Find the correct answer
        const correctOptionIndex = q.options.findIndex((opt: QuizOption) => opt.is_correct);
        
        return {
          text: q.text,
          options: q.options.map((opt: QuizOption) => opt.text),
          correctAnswer: correctOptionIndex,
          explanation: q.explanation
        };
      });
      
      // Check if a quiz already exists for this section
      let quiz = await Quiz.findOne({ section: section._id });
      
      if (quiz) {
        // Update existing quiz
        console.log(`Updating existing quiz for section: ${section.title}`);
        quiz.title = `${section.title} Quiz`;
        quiz.description = `Test your knowledge of ${section.title.toLowerCase()}`;
        quiz.questions = formattedQuestions;
        quiz.passingScore = quizData.passing_score;
        await quiz.save();
      } else {
        // Create new quiz
        console.log(`Creating new quiz for section: ${section.title}`);
        quiz = await Quiz.create({
          title: `${section.title} Quiz`,
          description: `Test your knowledge of ${section.title.toLowerCase()}`,
          section: section._id,
          questions: formattedQuestions,
          passingScore: quizData.passing_score
        });
        
        // Update section with quiz reference
        section.quiz = quiz._id;
        await section.save();
      }
    }
    
    console.log('Quiz import completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing quizzes:', error);
    process.exit(1);
  }
};
