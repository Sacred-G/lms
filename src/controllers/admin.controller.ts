import { Request, Response } from 'express';
import User from '../models/user.model';
import Course from '../models/course.model';
import Section from '../models/section.model';
import Progress from '../models/progress.model';
import mongoose from 'mongoose';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['admin', 'instructor', 'student'].includes(role)) {
      res.status(400).json({ message: 'Invalid role' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete progress records for deleted users
export const deleteProgressForDeletedUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find all progress records
    const allProgress = await Progress.find().populate('user', '_id');
    
    // Filter progress records where user is null (deleted)
    const deletedUserProgressIds = allProgress
      .filter(record => !record.user)
      .map(record => record._id);
    
    if (deletedUserProgressIds.length === 0) {
      res.status(200).json({ message: 'No progress records for deleted users found' });
      return;
    }
    
    // Delete all progress records for deleted users
    const result = await Progress.deleteMany({ _id: { $in: deletedUserProgressIds } });
    
    res.status(200).json({ 
      message: `Successfully removed ${result.deletedCount} progress records for deleted users`,
      deletedCount: result.deletedCount
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all progress records (with optional filtering)
export const getAllProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId, completed } = req.query;
    
    // Build filter object based on query parameters
    const filter: any = {};
    
    if (userId) {
      filter.user = userId;
    }
    
    if (courseId) {
      filter.course = courseId;
    }
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    // Get the raw progress records
    const progress = await Progress.find(filter)
      .populate('user', 'name email')
      .populate('course', 'title')
      .populate('sectionsProgress.section', 'title');
    
    // Process the progress records to handle missing references
    const processedProgress = progress.map(record => {
      const recordObj = record.toObject();
      
      // Create a new object with the necessary properties
      const processedRecord = {
        ...recordObj,
        user: recordObj.user || { 
          _id: record._id, // Use the progress record ID as a fallback
          name: 'Deleted User',
          email: 'deleted@example.com'
        },
        course: recordObj.course || {
          _id: record._id, // Use the progress record ID as a fallback
          title: 'Deleted Course'
        }
      };
      
      // Handle missing section references in sectionsProgress
      if (processedRecord.sectionsProgress) {
        processedRecord.sectionsProgress = processedRecord.sectionsProgress.map((sectionProgress: any) => {
          if (!sectionProgress.section) {
            return {
              ...sectionProgress,
              section: {
                _id: record._id, // Use the progress record ID as a fallback
                title: 'Deleted Section'
              }
            };
          }
          return sectionProgress;
        });
      }
      
      return processedRecord;
    });
    
    res.status(200).json(processedProgress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get summary statistics
export const getStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
      totalCourses,
      totalSections,
      completedCourses
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Section.countDocuments(),
      Progress.countDocuments({ completed: true })
    ]);
    
    // Get user counts by role
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    // Format user role counts
    const roleStats = usersByRole.reduce((acc: any, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});
    
    res.status(200).json({
      users: {
        total: totalUsers,
        byRole: roleStats
      },
      courses: {
        total: totalCourses
      },
      sections: {
        total: totalSections
      },
      progress: {
        completedCourses
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
