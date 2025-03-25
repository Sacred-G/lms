import { Request, Response } from 'express';
import Course from '../models/course.model';
import Section from '../models/section.model';

// Get all courses
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    let courses = await Course.find().populate('createdBy', 'name');
    
    // Filter out supervisor course if user is not a supervisor
    if (req.user && req.user.role !== 'admin' && req.user.role !== 'instructor') {
      courses = courses.filter(course => course.title !== 'Supervisor Training');
    }
    
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single course by ID
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate({
        path: 'sections',
        options: { sort: { order: 1 } },
      });
    
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
    
    res.status(200).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new course
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, coverImage } = req.body;
    
    const course = await Course.create({
      title,
      description,
      coverImage,
      createdBy: req.user?.id,
    });
    
    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, coverImage } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if user is the creator of the course or an admin
    if (course.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to update this course' });
      return;
    }
    
    course.title = title || course.title;
    course.description = description || course.description;
    course.coverImage = coverImage || course.coverImage;
    
    const updatedCourse = await course.save();
    
    res.status(200).json(updatedCourse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    
    // Check if user is the creator of the course or an admin
    if (course.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to delete this course' });
      return;
    }
    
    // Delete all sections associated with this course
    await Section.deleteMany({ course: course._id });
    
    // Delete the course
    await course.deleteOne();
    
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
