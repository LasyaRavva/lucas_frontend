import api from './api'

const pronunciationService = {
  // Get all pronunciation exercises
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams()
    if (params.language) queryParams.append('language', params.language)
    if (params.difficulty) queryParams.append('difficulty', params.difficulty)
    if (params.lessonId) queryParams.append('lessonId', params.lessonId)
    
    const queryString = queryParams.toString()
    const endpoint = queryString ? `/pronunciation?${queryString}` : '/pronunciation'
    
    const response = await api.get(endpoint)
    return response.data
  },

  // Get single pronunciation exercise by ID
  getById: async (id) => {
    const response = await api.get(`/pronunciation/${id}`)
    return response.data
  },

  // Create new pronunciation exercise
  create: async (pronunciationData) => {
    const response = await api.post('/pronunciation', pronunciationData)
    return response.data
  },

  // Update pronunciation exercise
  update: async (id, pronunciationData) => {
    const response = await api.put(`/pronunciation/${id}`, pronunciationData)
    return response.data
  },

  // Delete pronunciation exercise
  delete: async (id) => {
    const response = await api.delete(`/pronunciation/${id}`)
    return response.data
  }
}

export default pronunciationService
