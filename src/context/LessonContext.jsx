import { createContext, useContext, useState, useCallback } from 'react'

const LessonContext = createContext(null)

export function LessonProvider({ children }) {
  const [lessons, setLessons] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [progress, setProgress] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const updateProgress = useCallback((lessonId, progressData) => {
    setProgress((prev) => ({
      ...prev,
      [lessonId]: { ...prev[lessonId], ...progressData },
    }))
  }, [])

  return (
    <LessonContext.Provider
      value={{
        lessons,
        setLessons,
        currentLesson,
        setCurrentLesson,
        progress,
        updateProgress,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LessonContext.Provider>
  )
}

export const useLesson = () => {
  const context = useContext(LessonContext)
  if (!context) throw new Error('useLesson must be used within LessonProvider')
  return context
}
