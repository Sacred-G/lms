import { Request, Response } from 'express';
import Quiz from '../models/quiz.model';
import Section from '../models/section.model';
import Course from '../models/course.model';
import Progress from '../models/progress.model';

// Get a quiz by section ID
export const getQuizBySection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionId } = req.params;
    
    // Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    // Find quiz for this section
    const quiz = await Quiz.findOne({ section: sectionId });
    
    if (!quiz) {
      res.status(404).json({ message: 'No quiz found for this section' });
      return;
    }
    
    res.status(200).json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a quiz by ID
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    
    res.status(200).json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new quiz
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, sectionId, questions, passingScore } = req.body;
    
    // Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    // Get the course to check authorization
    const course = await Course.findById(section.course);
    
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if user is the creator of the course or an admin
    if (course.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to create a quiz for this section' });
      return;
    }
    
    // Create quiz
    const quiz = await Quiz.create({
      title,
      description,
      section: sectionId,
      questions,
      passingScore: passingScore || 70,
    });
    
    // Update section with quiz reference
    section.quiz = quiz._id;
    await section.save();
    
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, questions, passingScore } = req.body;
    
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    
    // Get the section and course to check authorization
    const section = await Section.findById(quiz.section);
    
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    const course = await Course.findById(section.course);
    
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if user is the creator of the course or an admin
    if (course.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to update this quiz' });
      return;
    }
    
    // Update quiz fields
    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;
    quiz.questions = questions || quiz.questions;
    quiz.passingScore = passingScore !== undefined ? passingScore : quiz.passingScore;
    
    const updatedQuiz = await quiz.save();
    
    res.status(200).json(updatedQuiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    
    // Get the section and course to check authorization
    const section = await Section.findById(quiz.section);
    
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    const course = await Course.findById(section.course);
    
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if user is the creator of the course or an admin
    if (course.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to delete this quiz' });
      return;
    }
    
    // Remove quiz reference from section
    section.quiz = null as any; // Cast to any to bypass TypeScript check
    await section.save();
    
    // Delete the quiz
    await quiz.deleteOne();
    
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a quiz attempt
export const submitQuizAttempt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    
    // Calculate score
    let correctAnswers = 0;
    
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    // Get section and course
    const section = await Section.findById(quiz.section);
    
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    // Update user progress
    let progress = await Progress.findOne({
      user: req.user?.id,
      course: section.course,
    });
    
    if (!progress) {
      // Create new progress if it doesn't exist
      progress = await Progress.create({
        user: req.user?.id,
        course: section.course,
        sectionsProgress: [],
      });
    }
    
    // Find section progress or create it
    let sectionProgress = progress.sectionsProgress.find(
      (sp) => sp.section.toString() === section._id.toString()
    );
    
    if (!sectionProgress) {
      progress.sectionsProgress.push({
        section: section._id,
        completed: false,
        videoWatched: false,
        audioListened: false,
        contentRead: false,
        quizAttempts: [],
      });
      
      sectionProgress = progress.sectionsProgress[progress.sectionsProgress.length - 1];
    }
    
    // Add quiz attempt
    sectionProgress.quizAttempts.push({
      quiz: quiz._id,
      score,
      passed,
      attemptedAt: new Date(),
    });
    
    // Check if section is completed
    if (
      passed &&
      sectionProgress.videoWatched &&
      sectionProgress.audioListened &&
      sectionProgress.contentRead
    ) {
      sectionProgress.completed = true;
      sectionProgress.completedAt = new Date();
    }
    
    // Check if course is completed
    const allSectionsCompleted = progress.sectionsProgress.every((sp) => sp.completed);
    
    if (allSectionsCompleted) {
      progress.completed = true;
      progress.completedAt = new Date();
    }
    
    await progress.save();
    
    res.status(200).json({
      score,
      passed,
      correctAnswers,
      totalQuestions: quiz.questions.length,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
