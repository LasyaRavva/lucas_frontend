
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import apiClient from '../services/api'

export default function PracticePage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState({})

  // Utility to get userId from localStorage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.id
  }

  // Handler to mark practice as complete and update progress
  const handleComplete = async (type) => {
    const userId = getUserId()
    if (!userId) {
      setStatus((prev) => ({ ...prev, [type]: 'No user' }))
      return
    }
    setStatus((prev) => ({ ...prev, [type]: 'loading' }))
    try {
      const { data } = await apiClient.post('/auth/progress/complete', {
        userId,
        type,
        itemId: null,
      })
      // Update user profile in localStorage if present
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        localStorage.setItem('user', JSON.stringify({ ...user, ...data }))
        // Broadcast a custom event so DashboardPage can listen and update
        window.dispatchEvent(new Event('profileUpdated'))
      }
      setStatus((prev) => ({ ...prev, [type]: 'done' }))
      setTimeout(() => setStatus((prev) => ({ ...prev, [type]: undefined })), 2000)
    } catch {
      setStatus((prev) => ({ ...prev, [type]: 'error' }))
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl md:text-4xl mb-6">Practice Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flashcards */}
        <Card className="hover:shadow-card transition-shadow duration-300 cursor-pointer">
          <CardHeader onClick={() => navigate('/flashcards')} style={{ cursor: 'pointer' }}>
            <CardTitle>Flashcards</CardTitle>
            <Badge variant="coral">Spaced Repetition</Badge>
          </CardHeader>
          <CardContent>
            <p>Review vocabulary using spaced repetition flashcards.</p>
            {/* Mark Complete button removed */}
          </CardContent>
        </Card>
        {/* Quizzes */}
        <Card className="hover:shadow-card transition-shadow duration-300 cursor-pointer">
          <CardHeader onClick={() => navigate('/quizzes')} style={{ cursor: 'pointer' }}>
            <CardTitle>Quizzes</CardTitle>
            <Badge variant="sea">Instant Feedback</Badge>
          </CardHeader>
          <CardContent>
            <p>Test your knowledge with interactive quizzes and mini-games.</p>
            {/* Mark Complete button removed */}
          </CardContent>
        </Card>
        {/* Pronunciation */}
        <Card className="hover:shadow-card transition-shadow duration-300 cursor-pointer">
          <CardHeader onClick={() => navigate('/pronunciation')} style={{ cursor: 'pointer' }}>
            <CardTitle>Pronunciation</CardTitle>
            <Badge variant="moss">Voice Practice</Badge>
          </CardHeader>
          <CardContent>
            <p>Practice speaking and get instant feedback on your accent.</p>
            {/* Mark Complete button removed */}
          </CardContent>
        </Card>
        {/* Conversation */}
        <Card className="hover:shadow-card transition-shadow duration-300 cursor-pointer">
          <CardHeader onClick={() => navigate('/conversation')} style={{ cursor: 'pointer' }}>
            <CardTitle>Conversation Scenarios</CardTitle>
            <Badge variant="clay">Real World</Badge>
          </CardHeader>
          <CardContent>
            <p>Engage in real-world dialogues and practice your skills.</p>
            {/* Mark Complete button removed */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
