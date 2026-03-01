import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../context/AuthContext'
import pronunciationService from '../services/pronunciationService'
import apiClient from '../services/apiClient'

export default function PronunciationPage() {
  const { user } = useAuth()
  const [pronunciations, setPronunciations] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [userLanguage, setUserLanguage] = useState('')
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaStreamRef = useRef(null)
  const analyserRef = useRef(null)
  const recordingIntervalRef = useRef(null)

  useEffect(() => {
    fetchUserProfile()

    // Cleanup on component unmount
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (userLanguage) {
      fetchPronunciations()
    }
  }, [userLanguage])

  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get('/auth/profile')
      setUserLanguage(response.data.learning_language || 'Spanish')
    } catch (error) {
      console.error('Error fetching profile:', error)
      setUserLanguage('Spanish') // Default fallback
    }
  }

  const fetchPronunciations = async () => {
    try {
      setLoading(true)
      const data = await pronunciationService.getAll({ language: userLanguage })
      setPronunciations(data)
    } catch (error) {
      console.error('Error fetching pronunciations:', error)
      setPronunciations([])
    } finally {
      setLoading(false)
    }
  }

  const handleRecord = async () => {
    try {
      setError('')
      setFeedback('')
      setRecordingTime(0)
      setRecording(true)

      // Check browser support
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      
      const source = audioContext.createMediaStreamAudioProcessor(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      source.connect(analyser)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      let voiceDetected = false
      let recordingStartTime = Date.now()
      const recordingDuration = 3000 // 3 seconds

      // Monitor audio levels in real-time
      const checkAudio = setInterval(() => {
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        
        // If average frequency is above threshold, voice is detected
        if (average > 30) {
          voiceDetected = true
        }

        const elapsed = Date.now() - recordingStartTime
        setRecordingTime(Math.min(Math.floor(elapsed / 1000), 3))

        // Stop recording after duration
        if (elapsed > recordingDuration) {
          clearInterval(checkAudio)
          setRecording(false)

          // Stop media stream
          stream.getTracks().forEach(track => track.stop())

          // Handle result based on voice detection
          if (voiceDetected) {
            const feedbacks = [
              'Excellent pronunciation! 🎉',
              'Great job! Your accent is improving! 👏',
              'Good effort! Try to emphasize the stressed syllables more.',
              'Nice work! Practice the rolling R sound.',
              'Well done! Keep practicing for fluency.'
            ]
            setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)])
            
            // Mark practice complete
            if (user && pronunciations[currentIndex]) {
              markPracticeComplete()
            }
          } else {
            setError('❌ No voice detected. Please make sure your microphone is working and speak clearly. Try again!')
          }
        }
      }, 100)

      recordingIntervalRef.current = checkAudio
    } catch (err) {
      setRecording(false)
      if (err.name === 'NotAllowedError') {
        setError('🔒 Microphone access denied. Please allow microphone permissions in your browser settings.')
      } else if (err.name === 'NotFoundError') {
        setError('❌ No microphone found. Please connect a microphone and try again.')
      } else {
        setError('⚠️ Error accessing microphone. Please try again or check your browser permissions.')
      }
    }
  }

  const markPracticeComplete = async () => {
    try {
      await apiClient.post('/auth/progress/complete', {
        userId: user.id,
        type: 'pronunciation',
        itemId: pronunciations[currentIndex].id
      })
      // Trigger profile update event
      window.dispatchEvent(new Event('profileUpdated'))
    } catch (error) {
      console.error('Error marking practice complete:', error)
    }
  }

  const handleNext = () => {
    setFeedback('')
    setError('')
    setRecordingTime(0)
    if (currentIndex < pronunciations.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }

  const handlePrevious = () => {
    setFeedback('')
    setError('')
    setRecordingTime(0)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(pronunciations.length - 1) // Loop to end
    }
  }

  const handleRetry = () => {
    setError('')
    setFeedback('')
    setRecordingTime(0)
    handleRecord()
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="font-display text-3xl md:text-4xl mb-6">Pronunciation Practice</h1>
        <p className="text-gray-600">Loading exercises...</p>
      </div>
    )
  }

  if (pronunciations.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="font-display text-3xl md:text-4xl mb-6">Pronunciation Practice</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-600">No pronunciation exercises available for {userLanguage}.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentExercise = pronunciations[currentIndex]

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl md:text-4xl mb-6">Pronunciation Practice</h1>
      
      <div className="mb-4 text-sm text-gray-600">
        Exercise {currentIndex + 1} of {pronunciations.length} • {userLanguage}
      </div>

      <Card className="hover:shadow-card transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Speak {userLanguage}</span>
            <Badge variant="moss" className="bg-moss/10 text-moss border-moss/20">
              {currentExercise.difficulty}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Read aloud:</p>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{currentExercise.text}</p>
            {currentExercise.phonetic && (
              <p className="text-sm text-gray-500 italic">Pronunciation: {currentExercise.phonetic}</p>
            )}
          </div>

          {currentExercise.tips && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                <span className="font-semibold">💡 Tip: </span>
                {currentExercise.tips}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              className="flex-1 px-6 py-3 rounded-xl bg-sea text-white font-semibold hover:bg-sea/80 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" 
              onClick={handleRecord} 
              disabled={recording}
            >
              {recording ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Recording... {recordingTime}s
                </span>
              ) : (
                '🎤 Start Recording'
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900 font-semibold mb-3">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-sm"
              >
                🔄 Try Again
              </button>
            </div>
          )}

          {feedback && (
            <div className="bg-moss/10 border border-moss/20 rounded-lg p-4">
              <p className="text-moss font-semibold">{feedback}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={handlePrevious}
              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Next →
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {pronunciations.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setFeedback('')
              setError('')
              setRecordingTime(0)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-sea w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to exercise ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}