import apiClient from './apiClient'

export const lessonService = {
  getAllLessons: async (language = 'Spanish', level = 'beginner') => {
    const response = await apiClient.get(`/lesson?language=${language}&level=${level}`)
    return response.data
  },

  getLessonById: async (lessonId) => {
    const response = await apiClient.get(`/lesson/${lessonId}`)
    return response.data
  },

  getQuizzes: async (lessonId) => {
    const response = await apiClient.get(`/lesson/${lessonId}/quizzes`)
    return response.data
  },

  submitQuiz: async (quizId, answers) => {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, { answers })
    return response.data
  },

  getFlashcards: async (language = 'Spanish') => {
    const response = await apiClient.get(`/flashcards?language=${language}`)
    return response.data
  },

  updateFlashcardProgress: async (flashcardId, correct) => {
    const response = await apiClient.put(`/flashcards/${flashcardId}`, { correct })
    return response.data
  },
}
