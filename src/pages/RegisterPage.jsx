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
    <div className="min-h-screen flex items-center justify-center bg-mist">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-card bg-white/90">
        <h1 className="font-display text-2xl mb-6 text-center">Create Your Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-coral text-sm mb-2">{error}</div>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink/10 focus:border-sea focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink/10 focus:border-sea focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink/10 focus:border-sea focus:outline-none"
          />
          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </div>
    </div>
  )
}
