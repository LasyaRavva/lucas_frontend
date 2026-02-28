import apiClient from './api'

export const authService = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  logout: () => apiClient.post('/auth/logout'),
}

export const lessonService = {
  getLessons: (params) => apiClient.get('/lessons', { params }),
  getLesson: (id) => apiClient.get(`/lessons/${id}`),
  getProgress: () => apiClient.get('/lessons/progress'),
  completeLesson: (id) => apiClient.post(`/lessons/${id}/complete`),
}

export const practiceService = {
  getExercises: (params) => apiClient.get('/practice/exercises', { params }),
  submitAnswer: (exerciseId, data) => apiClient.post(`/practice/exercises/${exerciseId}/submit`, data),
  getStats: () => apiClient.get('/practice/stats'),
}

export const flashcardService = {
  getFlashcards: (params) => apiClient.get('/flashcards', { params }),
  reviewFlashcard: (id, data) => apiClient.post(`/flashcards/${id}/review`, data),
  getReviewStats: () => apiClient.get('/flashcards/stats'),
}

export const userService = {
  getDashboard: (userId) => apiClient.get('/users/dashboard', { params: { userId } }),
  getStreaks: () => apiClient.get('/users/streaks'),
  getAchievements: () => apiClient.get('/users/achievements'),
}
