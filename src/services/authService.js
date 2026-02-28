import apiClient from './apiClient'

export const authService = {
  signup: async (email, password, fullName) => {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      fullName,
    })
    return response.data
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  logout: async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  getProfile: async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.id) throw new Error('No user ID found')
    const response = await apiClient.get('/auth/profile', { params: { id: user.id } })
    return response.data
  },

  updateProfile: async (fullName, learningLanguage, level) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.id) throw new Error('No user ID found')
    const response = await apiClient.put('/auth/profile', {
      id: user.id,
      fullName,
      learningLanguage,
      level,
    })
    return response.data
  },
}
