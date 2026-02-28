import { useEffect, useState } from 'react'
import apiClient from '../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { useAuth } from '../context/AuthContext'

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [learned, setLearned] = useState({})
  const { user } = useAuth()

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        setLoading(true)
        const { data } = await apiClient.get('/flashcards')
        setFlashcards(data)
      } catch (err) {
        setError('Failed to load flashcards')
      } finally {
        setLoading(false)
      }
    }
    fetchFlashcards()
  }, [])

  if (loading) return <div className="text-center py-10">Loading flashcards...</div>
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>

  const handleLearned = async (cardId) => {
    if (!user) return;
    setLearned((prev) => ({ ...prev, [cardId]: 'loading' }));
    try {
      await apiClient.post('/auth/progress/complete', {
        userId: user.id,
        type: 'flashcard',
        itemId: cardId,
      });
      setLearned((prev) => ({ ...prev, [cardId]: 'done' }));
    } catch {
      setLearned((prev) => ({ ...prev, [cardId]: 'error' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl md:text-4xl mb-6">Flashcards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flashcards.map((card) => (
          <Card key={card.id} className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{card.front}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-ink/80 mb-2">{card.back}</div>
              <Badge variant="sea">Lesson: {card.lesson_id?.slice(0, 6) || 'N/A'}</Badge>
              <div className="mt-4">
                <Button
                  variant={learned[card.id] === 'done' ? 'moss' : 'outline'}
                  disabled={learned[card.id] === 'done' || learned[card.id] === 'loading'}
                  onClick={() => handleLearned(card.id)}
                >
                  {learned[card.id] === 'done' ? 'Learned!' : learned[card.id] === 'loading' ? 'Marking...' : 'Mark as Learned'}
                </Button>
                {learned[card.id] === 'error' && <span className="text-coral ml-2">Error! Try again.</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
