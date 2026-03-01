import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function QuizzesPage() {
  // Only use hooks at the top level, never conditionally
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        setLoading(true)
        const { data } = await apiClient.get('/quizzes')
        setQuizzes(data)
      } catch {
        setError('Failed to load quizzes')
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  if (loading) return <div className="text-center py-10">Loading quizzes...</div>
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Quizzes</h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-lg sm:text-xl">{quiz.title}</CardTitle>
                <Badge variant={quiz.badge || 'coral'} className="text-xs">{quiz.title.includes('Vocabulary') ? 'Words' : 'Grammar'}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs sm:text-sm text-ink/80 mb-2">{quiz.description}</div>
              <button
                className="mt-2 px-4 py-2 rounded-xl bg-coral text-white text-xs sm:text-sm font-semibold hover:bg-coral/80 transition"
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
              >
                Start Quiz
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}