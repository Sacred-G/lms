import api from './api';

export const uploadService = {
  // Upload audio file
  uploadAudio: async (file: File): Promise<{ url: string; fileName: string; originalName: string }> => {
    const formData = new FormData();
    formData.append('audio', file);
    
    const response = await api.post('/upload/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // Register external audio URL (like Google Drive)
  registerExternalAudioUrl: async (url: string, fileName: string): Promise<{ url: string; fileName: string; originalName: string }> => {
    const response = await api.post('/upload/external-audio', {
      url,
      fileName
    });
    
    return response.data;
  },
  
  // Upload video file
  uploadVideo: async (file: File): Promise<{ url: string; fileName: string; originalName: string }> => {
    const formData = new FormData();
    formData.append('video', file);
    
    const response = await api.post('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // Register external video URL (like Google Drive)
  registerExternalVideoUrl: async (url: string, fileName: string): Promise<{ url: string; fileName: string; originalName: string }> => {
    const response = await api.post('/upload/external-video', {
      url,
      fileName
    });
    
    return response.data;
  },
  
  // Get list of available audio files
  getAudioFiles: async (): Promise<string[]> => {
    try {
      const response = await api.get('/upload/audio-files');
      return response.data.files || [];
    } catch (error) {
      console.error('Error fetching audio files:', error);
      return [];
    }
  },
  
  // Get list of available video files
  getVideoFiles: async (): Promise<string[]> => {
    try {
      const response = await api.get('/upload/video-files');
      return response.data.files || [];
    } catch (error) {
      console.error('Error fetching video files:', error);
      return [];
    }
  }
};
