import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Mail, Lock, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      // Redirect to dashboard after successful login
      if (typeof navigate === 'function') {
        navigate('/')
      } else {
        window.location.href = '/'
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Demo credentials
  const fillDemo = () => {
    setEmail('demo@lucas.com')
    setPassword('demo123')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-3 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <BookOpen className="h-8 sm:h-10 w-8 sm:w-10 text-coral" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Lucas</h1>
          <p className="text-xs sm:text-sm text-ink/60">Learn languages, embrace cultures</p>
        </div>

        <Card className="border-0 shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg sm:text-xl">Welcome Back</CardTitle>
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
                <label className="text-xs font-semibold uppercase text-ink/70">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-ink/40" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
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

              <Button type="submit" className="w-full text-sm" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="space-y-2 border-t border-ink/10 pt-3 sm:pt-4">
              <p className="text-center text-xs sm:text-sm text-ink/60">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-semibold text-sea hover:text-sea/80"
                >
                  Sign up
                </button>
              </p>

              {/* Demo Account button removed */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// default export moved above
