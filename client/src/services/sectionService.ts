import api from './api';
import { Section } from '../types/section';

// Section service object with all methods
export const sectionService = {
  // Get all sections for a course
  getSectionsByCourse: async (courseId: string): Promise<Section[]> => {
    const response = await api.get(`/sections/course/${courseId}`);
    return response.data;
  },

  // Get section by ID
  getSectionById: async (sectionId: string): Promise<Section> => {
    const response = await api.get(`/sections/${sectionId}`);
    return response.data;
  },

  // Get all sections (admin only)
  getAllSections: async (): Promise<Section[]> => {
    const response = await api.get('/sections');
    return response.data;
  },

  // Update section details
  updateSection: async (
    sectionId: string,
    sectionData: {
      title?: string;
      description?: string;
      content?: string;
      videoUrl?: string;
      audioUrl?: string;
      order?: number;
    }
  ): Promise<Section> => {
    const response = await api.put(`/sections/${sectionId}`, sectionData);
    return response.data;
  },

  // Update section progress (mark video watched, audio listened, content read)
  updateSectionProgress: async (
    courseId: string,
    sectionId: string,
    progressData: {
      videoWatched?: boolean;
      audioListened?: boolean;
      contentRead?: boolean;
    }
  ): Promise<any> => {
    const response = await api.put(
      `/progress/course/${courseId}/section/${sectionId}`,
      progressData
    );
    return response.data;
  }
};
