import { Zap, BookOpen, MessageSquare, Trophy, Settings, LogOut, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui'
import { useState } from 'react'

export function Navbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-ink/10 bg-parchment/80">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-clay flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-ink group-hover:text-coral transition hidden sm:inline">
            Lucas
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-ink/70 hover:text-ink transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
          <Link
            to="/lessons"
            className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden lg:inline">Lessons</span>
          </Link>
          <Link
            to="/practice"
            className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden lg:inline">Practice</span>
          </Link>
          <Link to="/profile">
            <Button variant="secondary" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Profile</span>
            </Button>
          </Link>
          <button onClick={handleLogout} className="text-ink/60 hover:text-coral transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-parchment/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition py-2"
            >
              <BookOpen className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/lessons"
              onClick={closeMobileMenu}
              className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition py-2"
            >
              <Trophy className="w-4 h-4" />
              Lessons
            </Link>
            <Link
              to="/practice"
              onClick={closeMobileMenu}
              className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition py-2"
            >
              <MessageSquare className="w-4 h-4" />
              Practice
            </Link>
            <Link 
              to="/profile"
              onClick={closeMobileMenu}
              className="text-ink/70 hover:text-ink font-body flex items-center gap-2 transition py-2"
            >
              <Settings className="w-4 h-4" />
              Profile
            </Link>
            <button 
              onClick={() => {
                handleLogout()
                closeMobileMenu()
              }} 
              className="text-ink/60 hover:text-coral transition flex items-center gap-2 py-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
