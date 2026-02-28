import apiClient from './api';

export const conversationService = {
  getAll: (lessonId) => apiClient.get('/conversation', { params: lessonId ? { lessonId } : {} }),
  getById: (id) => apiClient.get(`/conversation/${id}`),
};
