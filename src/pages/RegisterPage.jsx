import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { authService } from '../services/authService'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email) => /@gmail\.com$/.test(email)
  const validatePassword = (pw) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }
    if (!validateEmail(email)) {
      setError('Email must be a valid @gmail.com address')
      return
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, include a letter, a number, and a special character')
      return
    }
    try {
      setLoading(true)
      await authService.signup(email, password, name)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-3 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-md px-4 sm:px-8 py-6 sm:py-8 rounded-2xl shadow-card bg-white/90">
        <h1 className="font-display text-xl sm:text-2xl mb-6 sm:mb-8 text-center">Create Your Account</h1>
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-coral text-xs sm:text-sm mb-2">{error}</div>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-ink/10 focus:border-sea focus:outline-none text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-ink/10 focus:border-sea focus:outline-none text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-ink/10 focus:border-sea focus:outline-none text-sm"
          />
          <Button className="w-full mt-2 text-sm" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </div>
    </div>
  )
}
