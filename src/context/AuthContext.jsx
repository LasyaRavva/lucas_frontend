import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('authToken')
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }, [])

  const signup = async (email, password, fullName) => {
    try {
      setError(null)
      const { user, token } = await authService.signup(email, password, fullName)
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      return user
    } catch (err) {
      const message = err.response?.data?.message || err.message
      setError(message)
      throw err
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const { user, token } = await authService.login(email, password)
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      return user
    } catch (err) {
      const message = err.response?.data?.message || err.message
      setError(message)
      throw err
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const updateProfile = async (fullName, learningLanguage, level) => {
    try {
      setError(null)
      const updatedUser = await authService.updateProfile(fullName, learningLanguage, level)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      return updatedUser
    } catch (err) {
      const message = err.response?.data?.message || err.message
      setError(message)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
