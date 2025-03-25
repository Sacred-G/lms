import { Request, Response } from 'express';
import Progress from '../models/progress.model';
import Course from '../models/course.model';
import Section from '../models/section.model';

// Get user progress for all courses
export const getUserProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    let progress = await Progress.find({ user: req.user?.id })
      .populate('course', 'title description')
      .populate('sectionsProgress.section', 'title');
    
    // Filter out progress for supervisor course if user doesn't have appropriate role
    if (req.user && req.user.role !== 'admin' && req.user.role !== 'instructor') {
      progress = progress.filter(p => {
        if (p.course && typeof p.course === 'object' && 'title' in p.course) {
          return p.course.title !== 'Supervisor Training';
        }
        return true;
      });
    }
    
    res.status(200).json(progress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get progress for a specific section
export const getSectionProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId, sectionId } = req.params;
    
    // Check if course and section exist
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      res.status(403).json({ message: 'Not authorized to access this course' });
      return;
    }
    
    const section = await Section.findOne({
      _id: sectionId,
      course: courseId,
    });
    
    if (!section) {
      res.status(404).json({ message: 'Section not found in this course' });
      return;
    }
    
    // Get or create progress
    let progress = await Progress.findOne({
      user: req.user?.id,
      course: courseId,
    });
    
    if (!progress) {
      // Create new progress
      progress = await Progress.create({
        user: req.user?.id,
        course: courseId,
        sectionsProgress: [],
        completed: false,
      });
    }
    
    // Find section progress or create it
    let sectionProgress = progress.sectionsProgress.find(
      (sp) => sp.section.toString() === sectionId
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
      await progress.save();
    }
    
    res.status(200).json(sectionProgress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get user progress for a specific course
export const getUserCourseProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      res.status(403).json({ message: 'Not authorized to access this course' });
      return;
    }
    
    // Get or create progress
    let progress = await Progress.findOne({
      user: req.user?.id,
      course: courseId,
    }).populate('sectionsProgress.section', 'title order');
    
    if (!progress) {
      // Get all sections for the course
      const sections = await Section.find({ course: courseId });
      
      // Create empty progress record
      progress = await Progress.create({
        user: req.user?.id,
        course: courseId,
        sectionsProgress: sections.map(section => ({
          section: section._id,
          completed: false,
          videoWatched: false,
          audioListened: false,
          contentRead: false,
          quizAttempts: [],
        })),
        completed: false,
      });
      
      // Populate section data
      progress = await Progress.findById(progress._id).populate('sectionsProgress.section', 'title order');
    }
    
    res.status(200).json(progress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update section progress (mark video watched, audio listened, content read)
export const updateSectionProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId, sectionId } = req.params;
    const { videoWatched, audioListened, contentRead } = req.body;
    
    // Check if course and section exist
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      res.status(403).json({ message: 'Not authorized to access this course' });
      return;
    }
    
    const section = await Section.findOne({
      _id: sectionId,
      course: courseId,
    });
    
    if (!section) {
      res.status(404).json({ message: 'Section not found in this course' });
      return;
    }
    
    // Get or create progress
    let progress = await Progress.findOne({
      user: req.user?.id,
      course: courseId,
    });
    
    if (!progress) {
      // Create new progress
      progress = await Progress.create({
        user: req.user?.id,
        course: courseId,
        sectionsProgress: [],
        completed: false,
      });
    }
    
    // Find section progress or create it
    let sectionProgress = progress.sectionsProgress.find(
      (sp) => sp.section.toString() === sectionId
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
    
    // Update progress fields
    if (videoWatched !== undefined) {
      sectionProgress.videoWatched = videoWatched;
    }
    
    if (audioListened !== undefined) {
      sectionProgress.audioListened = audioListened;
    }
    
    if (contentRead !== undefined) {
      sectionProgress.contentRead = contentRead;
    }
    
    // Check if section is completed (all items completed or explicitly marked as completed)
    const quizPassed = sectionProgress.quizAttempts.some((attempt) => attempt.passed);
    const allContentCompleted = sectionProgress.videoWatched && sectionProgress.audioListened && sectionProgress.contentRead;
    
    // Mark as completed if all content is completed (quiz passing is optional)
    if (allContentCompleted) {
      sectionProgress.completed = true;
      sectionProgress.completedAt = new Date();
    }
    
    // Check if course is completed
    const allSectionsCompleted = progress.sectionsProgress.every((sp) => sp.completed);
    
    if (allSectionsCompleted && progress.sectionsProgress.length > 0) {
      progress.completed = true;
      progress.completedAt = new Date();
    }
    
    await progress.save();
    
    res.status(200).json(sectionProgress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
