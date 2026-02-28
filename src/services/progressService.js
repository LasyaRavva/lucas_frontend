import apiClient from './apiClient'

export const progressService = {
  getProgress: async () => {
    const response = await apiClient.get('/progress')
    return response.data
  },

  getStreakData: async () => {
    const response = await apiClient.get('/progress/streak')
    return response.data
  },

  updateDailyGoal: async (minutesCompleted) => {
    const response = await apiClient.put('/progress/daily-goal', { minutesCompleted })
    return response.data
  },

  getMilestones: async () => {
    const response = await apiClient.get('/progress/milestones')
    return response.data
  },

  getStats: async () => {
    const response = await apiClient.get('/progress/stats')
    return response.data
  },
}
