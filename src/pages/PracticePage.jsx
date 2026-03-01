
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import apiClient from '../services/api'

export default function PracticePage() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({
    flashcards: 0,
    quizzes: 0,
    conversation: 0,
    pronunciation: 0,
  })
  const [learningLanguage, setLearningLanguage] = useState('Spanish')

  useEffect(() => {
    async function fetchDynamicPracticeData() {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        const userId = storedUser?.id

        const requests = [
          apiClient.get('/lessons'),
          apiClient.get('/flashcards'),
          apiClient.get('/quizzes'),
          apiClient.get('/conversation'),
        ]

        if (userId) {
          requests.unshift(apiClient.get('/auth/profile', { params: { id: userId } }))
        }

        const responses = await Promise.all(requests)

        const profileData = userId ? responses[0].data : null
        const lessons = (userId ? responses[1].data : responses[0].data) || []
        const flashcards = (userId ? responses[2].data : responses[1].data) || []
        const quizzes = (userId ? responses[3].data : responses[2].data) || []
        const conversations = (userId ? responses[4].data : responses[3].data) || []

        const selectedLanguage =
          profileData?.learning_language ||
          profileData?.learningLanguage ||
          storedUser?.learning_language ||
          storedUser?.learningLanguage ||
          'Spanish'
        setLearningLanguage(selectedLanguage)

        const languageLessonIds = lessons
          .filter((lesson) => {
            const lessonLanguage = lesson?.language || lesson?.learning_language || lesson?.target_language
            return lessonLanguage ? lessonLanguage === selectedLanguage : true
          })
          .map((lesson) => lesson.id)

        const hasLanguageTaggedLessons = lessons.some(
          (lesson) => lesson?.language || lesson?.learning_language || lesson?.target_language
        )

        const isInSelectedLessons = (lessonId) => {
          if (!lessonId) return !hasLanguageTaggedLessons
          return languageLessonIds.includes(lessonId)
        }

        const flashcardsCount = flashcards.filter((item) => isInSelectedLessons(item.lesson_id)).length
        const quizzesCount = quizzes.filter((item) => isInSelectedLessons(item.lesson_id)).length
        const conversationCount = conversations.filter((item) => isInSelectedLessons(item.lesson_id)).length
        const pronunciationCount = languageLessonIds.length

        setCounts({
          flashcards: flashcardsCount,
          quizzes: quizzesCount,
          conversation: conversationCount,
          pronunciation: pronunciationCount,
        })
      } catch {
        setCounts({ flashcards: 0, quizzes: 0, conversation: 0, pronunciation: 0 })
      }
    }

    fetchDynamicPracticeData()
  }, [])

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
            <p className="text-sm text-ink/60 mt-2">
              {counts.flashcards} flashcards available for {learningLanguage}.
            </p>
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
            <p className="text-sm text-ink/60 mt-2">
              {counts.quizzes} quizzes available for {learningLanguage}.
            </p>
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
            <p className="text-sm text-ink/60 mt-2">
              {counts.pronunciation} pronunciation prompts linked to {learningLanguage} lessons.
            </p>
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
            <p className="text-sm text-ink/60 mt-2">
              {counts.conversation} scenarios available for {learningLanguage}.
            </p>
            {/* Mark Complete button removed */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
