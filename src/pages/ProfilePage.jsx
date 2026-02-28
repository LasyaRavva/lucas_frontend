import { useEffect, useState } from 'react'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../context/AuthContext'

export function ProfilePage({ onBack }) {
  const { user, updateProfile } = useAuth()
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [learningLanguage, setLearningLanguage] = useState(user?.learningLanguage || 'Spanish')
  const [level, setLevel] = useState(user?.level || 'beginner')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
        <div className="mx-auto max-w-2xl px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl font-bold text-ink">Profile Settings</h1>
          <p className="text-ink/60">Manage your learning preferences</p>
        </div>

        <Card className="border-0">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex gap-3 rounded-lg bg-coral/15 p-4 text-sm text-coral">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex gap-3 rounded-lg bg-moss/15 p-4 text-sm text-moss">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Full Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">
                  Learning Language
                </label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="h-11 w-full rounded-lg border border-ink/20 bg-white/60 px-4 py-2 text-sm transition focus:border-sea/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sea/20"
                >
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Italian">Italian</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mandarin">Mandarin Chinese</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Proficiency Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="h-11 w-full rounded-lg border border-ink/20 bg-white/60 px-4 py-2 text-sm transition focus:border-sea/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sea/20"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="fluent">Fluent</option>
                </select>
              </div>

              <Button type="submit" disabled={loading} className="w-full flex items-center gap-2">
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <Card className="mt-8 border-0">
          <CardHeader>
            <CardTitle>Learning Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-lg bg-coral/5 p-4">
              <Badge variant="coral">Current</Badge>
              <p className="text-sm text-ink/60">Learning Language</p>
              <p className="text-lg font-semibold text-ink">{learningLanguage}</p>
            </div>
            <div className="space-y-2 rounded-lg bg-sea/5 p-4">
              <Badge variant="sea">Current</Badge>
              <p className="text-sm text-ink/60">Proficiency Level</p>
              <p className="text-lg font-semibold text-ink capitalize">{level}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ProfilePage
