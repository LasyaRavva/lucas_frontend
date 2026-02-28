import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function LessonsPage() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true)
        const { data } = await apiClient.get('/lessons')
        setLessons(data)
      } catch (err) {
        setError('Failed to load lessons')
      } finally {
        setLoading(false)
      }
    }
    fetchLessons()
  }, [])

  if (loading) return <div className="text-center py-10">Loading lessons...</div>
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl md:text-4xl mb-6">Lesson Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="hover:shadow-card transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/lessons/${lesson.id}`)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{lesson.title}</CardTitle>
                {lesson.level && <Badge variant="sea">{lesson.level}</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-ink/80">
                {lesson.topics?.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <Badge variant="coral">XP +50</Badge>
                <Badge variant="moss">Complete</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
