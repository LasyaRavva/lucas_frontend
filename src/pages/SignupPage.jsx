import { useState } from 'react'
import { BookOpen, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'

export function SignupPage({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !fullName || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      await signup(email, password, fullName)
      onSuccess?.()
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-3 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <BookOpen className="h-8 sm:h-10 w-8 sm:w-10 text-coral" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Lucas</h1>
          <p className="text-xs sm:text-sm text-ink/60">Start your language learning journey</p>
        </div>

        <Card className="border-0 shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Create Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {error && (
              <div className="flex gap-3 rounded-lg bg-coral/15 p-3 text-xs sm:text-sm text-coral">
                <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-ink/40" />
                  <Input
                    placeholder="Lucas Oliveira"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-ink/40" />
                  <Input
                    type="email"
                    placeholder="lucas@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-ink/40" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-ink/70">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-ink/40" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full text-sm" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="flex items-center gap-2 text-xs text-ink/50">
              <div className="flex-1 border-b border-ink/10" />
              <span>OR</span>
              <div className="flex-1 border-b border-ink/10" />
            </div>

            <p className="text-center text-xs sm:text-sm text-ink/60">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSuccess}
                className="font-semibold text-sea hover:text-sea/80"
              >
                Sign in
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
