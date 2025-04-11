import api from './api';

export const adminService = {
  // User management
  getAllUsers: async () => {
    const { data } = await api.get('/admin/users');
    return data;
  },
  
  updateUserRole: async (userId: string, role: string) => {
    const { data } = await api.patch(`/admin/users/${userId}/role`, { role });
    return data;
  },
  
  // Progress management
  deleteProgressForDeletedUsers: async () => {
    const { data } = await api.delete('/admin/progress/deleted-users');
    return data;
  },
  
  getAllProgress: async (filters?: { userId?: string; courseId?: string; completed?: boolean }) => {
    const queryParams = new URLSearchParams();
    
    if (filters?.userId) {
      queryParams.append('userId', filters.userId);
    }
    
    if (filters?.courseId) {
      queryParams.append('courseId', filters.courseId);
    }
    
    if (filters?.completed !== undefined) {
      queryParams.append('completed', filters.completed.toString());
    }
    
    const queryString = queryParams.toString();
    const url = queryString ? `/admin/progress?${queryString}` : '/admin/progress';
    
    const { data } = await api.get(url);
    return data;
  },
  
  // Statistics
  getStatistics: async () => {
    const { data } = await api.get('/admin/statistics');
    return data;
  }
};
