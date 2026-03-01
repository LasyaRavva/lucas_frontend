import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../context/AuthContext'
import apiClient from '../services/api'

export function ProfilePage({ onBack }) {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(user?.full_name || user?.fullName || '')
  const [learningLanguage, setLearningLanguage] = useState(user?.learning_language || user?.learningLanguage || 'Spanish')
  const [level, setLevel] = useState(user?.level || 'beginner')
  const [languageOptions, setLanguageOptions] = useState([
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Japanese',
    'Mandarin Chinese',
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function fetchProfileAndLanguages() {
      if (!user?.id) return
      try {
        const [{ data: profile }, { data: lessons }] = await Promise.all([
          apiClient.get('/auth/profile', { params: { id: user.id } }),
          apiClient.get('/lessons'),
        ])

        setFullName(profile?.full_name || profile?.fullName || '')
        setLearningLanguage(profile?.learning_language || profile?.learningLanguage || 'Spanish')
        setLevel(profile?.level || 'beginner')

        const dynamicLanguages = Array.from(
          new Set(
            (lessons || [])
              .map((lesson) => lesson?.language || lesson?.learning_language || lesson?.target_language)
              .filter(Boolean)
          )
        )

        if (dynamicLanguages.length > 0) {
          const merged = Array.from(new Set([...dynamicLanguages, 'Spanish', 'French', 'German']))
          setLanguageOptions(merged)
        }
      } catch {
        // Keep defaults if data loading fails
      }
    }

    fetchProfileAndLanguages()
  }, [user?.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!fullName.trim()) {
      setError('Full name is required')
      return
    }

    try {
      setLoading(true)
      await updateProfile(fullName, learningLanguage, level)
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-ink/10 bg-white/40 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:py-4">
          <button
            onClick={onBack || (() => navigate('/'))}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 space-y-2">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Profile Settings</h1>
          <p className="text-xs sm:text-sm text-ink/60">Manage your learning preferences</p>
        </div>

        <Card className="border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {error && (
              <div className="flex gap-3 rounded-lg bg-coral/15 p-3 sm:p-4 text-xs sm:text-sm text-coral">
                <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex gap-3 rounded-lg bg-moss/15 p-3 sm:p-4 text-xs sm:text-sm text-moss">
                <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 mt-0.5" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Full Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">
                  Learning Language
                </label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="h-10 sm:h-11 w-full rounded-lg border border-ink/20 bg-white/60 px-4 py-2 text-xs sm:text-sm transition focus:border-sea/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sea/20"
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Proficiency Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="h-10 sm:h-11 w-full rounded-lg border border-ink/20 bg-white/60 px-4 py-2 text-xs sm:text-sm transition focus:border-sea/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sea/20"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="fluent">Fluent</option>
                </select>
              </div>

              <Button type="submit" disabled={loading} className="w-full flex items-center gap-2 text-sm">
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <Card className="mt-6 sm:mt-8 border-0">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Learning Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-lg bg-coral/5 p-3 sm:p-4">
              <Badge variant="coral" className="text-xs">Current</Badge>
              <p className="text-xs sm:text-sm text-ink/60">Learning Language</p>
              <p className="text-base sm:text-lg font-semibold text-ink">{learningLanguage}</p>
            </div>
            <div className="space-y-2 rounded-lg bg-sea/5 p-3 sm:p-4">
              <Badge variant="sea" className="text-xs">Current</Badge>
              <p className="text-xs sm:text-sm text-ink/60">Proficiency Level</p>
              <p className="text-base sm:text-lg font-semibold text-ink capitalize">{level}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ProfilePage
