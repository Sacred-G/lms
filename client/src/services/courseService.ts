import api from './api';
import { Course, CourseDetails } from '../types/course';
import { Section } from '../types/section';

// Course service object with all methods
export const courseService = {
  // Get all courses
  getCourses: async (): Promise<Course[]> => {
    const response = await api.get('/courses');
    return response.data;
  },

  // Get course by ID
  getCourseById: async (courseId: string): Promise<CourseDetails> => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  // Get course sections
  getCourseSections: async (courseId: string): Promise<Section[]> => {
    const response = await api.get(`/sections/course/${courseId}`);
    return response.data;
  },

  // Create a new course (admin/instructor only)
  createCourse: async (courseData: Partial<Course>): Promise<Course> => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  // Update a course
  updateCourse: async (courseId: string, courseData: Partial<Course>): Promise<Course> => {
    const response = await api.put(`/courses/${courseId}`, courseData);
    return response.data;
  },

  // Delete a course
  deleteCourse: async (courseId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  }
};
