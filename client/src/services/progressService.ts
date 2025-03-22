import api from './api';
import { Progress, CourseProgress, SectionProgress } from '../types/progress';

// Progress service object with all methods
export const progressService = {
  // Get user progress for all courses
  getUserProgress: async (): Promise<Progress[]> => {
    const response = await api.get('/progress');
    return response.data as Progress[];
  },

  // Get user progress for a specific course
  getUserCourseProgress: async (courseId: string): Promise<CourseProgress> => {
    const response = await api.get(`/progress/course/${courseId}`);
    return response.data as CourseProgress;
  },

  // Get progress for a specific section
  getSectionProgress: async (courseId: string, sectionId: string): Promise<SectionProgress> => {
    const response = await api.get(`/progress/course/${courseId}/section/${sectionId}`);
    return response.data as SectionProgress;
  },

  // Mark a section as completed
  markSectionCompleted: async (courseId: string, sectionId: string): Promise<SectionProgress> => {
    const response = await api.put(`/progress/course/${courseId}/section/${sectionId}`, {
      videoWatched: true,
      audioListened: true,
      contentRead: true
    });
    return response.data as SectionProgress;
  }
};
