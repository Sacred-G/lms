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
    // This is a placeholder - in a real implementation, you would have an endpoint
    // that returns a list of available audio files
    return [
      '/audio/introduction_to_the_role.wav',
      '/audio/Direct Support Staff_ Key Responsibilities.wav',
      '/audio/Mastering Client Rights_ Support Staff Guide.wav'
    ];
  },
  
  // Get list of available video files
  getVideoFiles: async (): Promise<string[]> => {
    // This is a placeholder - in a real implementation, you would have an endpoint
    // that returns a list of available video files
    return [
      'https://youtu.be/cQW6vgsVjY8',
      'https://youtu.be/TAXr3rWMYxQ',
      'https://youtu.be/fWWNTxrGAWw'
    ];
  }
};
