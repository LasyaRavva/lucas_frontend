import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function PronunciationPage() {
  const [recording, setRecording] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleRecord = () => {
    setRecording(true)
    setTimeout(() => {
      setRecording(false)
      setFeedback('Good pronunciation! Try to stress the syllables more.')
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl md:text-4xl mb-6">Pronunciation Practice</h1>
      <Card className="hover:shadow-card transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Speak Spanish</CardTitle>
          <Badge variant="moss">Voice Recognition</Badge>
        </CardHeader>
        <CardContent>
          <div className="mb-4">Read aloud: <span className="font-semibold">Hola, ¿cómo estás?</span></div>
          <button className="px-4 py-2 rounded-xl bg-sea text-white font-semibold hover:bg-sea/80" onClick={handleRecord} disabled={recording}>
            {recording ? 'Recording...' : 'Start Recording'}
          </button>
          {feedback && <div className="mt-4 text-moss font-semibold">{feedback}</div>}
        </CardContent>
      </Card>
    </div>
  )
}