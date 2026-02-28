
import { useEffect, useState } from 'react'
import { conversationService } from '../services/conversationService'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import apiClient from '../services/api'

export default function ConversationPage() {
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Track status for each scenario (must be before any return)
  const [status, setStatus] = useState({})

  useEffect(() => {
    async function fetchScenarios() {
      try {
        setLoading(true)
        const { data } = await conversationService.getAll();
        setScenarios(data);
      } catch {
        setError('Failed to load scenarios')
      } finally {
        setLoading(false)
      }
    }
    fetchScenarios()
  }, [])

  if (loading) return <div className="text-center py-10">Loading scenarios...</div>
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>

  // Utility to get userId from localStorage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.id
  }

  // Handler to mark conversation practice as complete
  const handlePractice = async (scenarioId) => {
    const userId = getUserId()
    if (!userId) {
      setStatus((prev) => ({ ...prev, [scenarioId]: 'No user' }))
      return
    }
    setStatus((prev) => ({ ...prev, [scenarioId]: 'loading' }))
    try {
      const { data } = await apiClient.post('/auth/progress/complete', {
        userId,
        type: 'conversation',
        itemId: scenarioId,
      })
      // Update user profile in localStorage if present
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        localStorage.setItem('user', JSON.stringify({ ...user, ...data }))
        window.dispatchEvent(new Event('profileUpdated'))
      }
      setStatus((prev) => ({ ...prev, [scenarioId]: 'done' }))
      setTimeout(() => setStatus((prev) => ({ ...prev, [scenarioId]: undefined })), 2000)
    } catch {
      setStatus((prev) => ({ ...prev, [scenarioId]: 'error' }))
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl md:text-4xl mb-6">Conversation Scenarios</h1>
      <div className="grid grid-cols-1 gap-6">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{scenario.title}</CardTitle>
                <Badge variant={scenario.badge}>Scenario</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-mist rounded-lg p-3 text-ink/80 mb-2 whitespace-pre-line">{scenario.script}</pre>
              <button
                className="mt-2 px-4 py-2 rounded-xl bg-clay text-white font-semibold hover:bg-clay/80"
                onClick={() => handlePractice(scenario.id)}
                disabled={status[scenario.id] === 'loading'}
              >
                {status[scenario.id] === 'loading' ? 'Updating...' : status[scenario.id] === 'done' ? 'Progress Updated!' : 'Practice'}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}