import { Request, Response } from 'express';
import Section from '../models/section.model';
import Course from '../models/course.model';
import Quiz from '../models/quiz.model';

// Get all sections
export const getAllSections = async (req: Request, res: Response): Promise<void> => {
  try {
    let sections = await Section.find()
      .sort({ course: 1, order: 1 })
      .populate('course', 'title')
      .populate('quiz');
    
    // Filter out sections from supervisor course if user doesn't have appropriate role
    if (req.user && req.user.role !== 'admin' && req.user.role !== 'instructor') {
      sections = sections.filter(section => {
        if (section.course && typeof section.course === 'object' && 'title' in section.course) {
          return section.course.title !== 'Supervisor Training';
        }
        return true;
      });
    }
    
    res.status(200).json(sections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sections for a course
export const getSectionsByCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    
    // Check if this is the supervisor course
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
    
    const sections = await Section.find({ course: courseId })
      .sort({ order: 1 })
      .populate('quiz');
    
    res.status(200).json(sections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single section by ID
export const getSectionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await Section.findById(req.params.id).populate('quiz');
    
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    // Check if this section belongs to the supervisor course
    const course = await Course.findById(section.course);
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
      res.status(403).json({ message: 'Not authorized to access this section' });
      return;
    }
    
    res.status(200).json(section);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new section
export const createSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, content, videoUrl, audioUrl, order, courseId } = req.body;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Create section
    const section = await Section.create({
      title,
      description,
      content,
      videoUrl,
      audioUrl,
      order,
      course: courseId,
    });
    
    // Add section to course
    course.sections.push(section._id);
    await course.save();
    
    res.status(201).json(section);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a section
export const updateSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, content, videoUrl, audioUrl, order } = req.body;
    
    const section = await Section.findById(req.params.id);
    
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
      res.status(403).json({ message: 'Not authorized to update this section' });
      return;
    }
    
    // Update section fields
    section.title = title || section.title;
    section.description = description || section.description;
    section.content = content || section.content;
    section.videoUrl = videoUrl || section.videoUrl;
    section.audioUrl = audioUrl || section.audioUrl;
    section.order = order !== undefined ? order : section.order;
    
    const updatedSection = await section.save();
    
    res.status(200).json(updatedSection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a section
export const deleteSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await Section.findById(req.params.id);
    
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }
    
    // Get the course to check authorization and update sections array
    const course = await Course.findById(section.course);
    
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if user is the creator of the course or an admin
    if (course.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to delete this section' });
      return;
    }
    
    // Delete associated quiz if exists
    if (section.quiz) {
      await Quiz.findByIdAndDelete(section.quiz);
    }
    
    // Remove section from course
    course.sections = course.sections.filter(
      (sectionId) => sectionId.toString() !== section._id.toString()
    );
    await course.save();
    
    // Delete the section
    await section.deleteOne();
    
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
