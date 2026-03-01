import { Zap, BookOpen, MessageSquare, Trophy, Settings, LogOut, Menu, X, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-ink/10 bg-parchment/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-coral to-clay flex items-center justify-center">
            <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
          </div>
          <span className="font-display text-base sm:text-lg font-semibold text-ink group-hover:text-coral transition">
            Lucas
          </span>
        </Link>

        {/* Mobile Menu Button - Shows only on mobile */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink/70 hover:text-ink transition"
          aria-label="Toggle menu"
          
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop Navigation - Hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-xs lg:text-sm text-ink/70 hover:text-ink font-body flex items-center gap-2 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
              <Link
                to="/lessons"
                className="text-xs lg:text-sm text-ink/70 hover:text-ink font-body flex items-center gap-2 transition"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden lg:inline">Lessons</span>
              </Link>
              <Link
                to="/practice"
                className="text-xs lg:text-sm text-ink/70 hover:text-ink font-body flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden lg:inline">Practice</span>
              </Link>
              <Link to="/profile" className="flex-shrink-0">
                <Button variant="secondary" size="sm" className="text-xs">
                  <Settings className="w-4 h-4 mr-1" />
                  <span className="hidden lg:inline">Profile</span>
                </Button>
              </Link>
              <button onClick={handleLogout} className="text-ink/60 hover:text-coral transition flex items-center gap-2" aria-label="Logout">
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">Sign Out</span>
              </button>
            </>
          )}
          
          {!user && (
            <>
              <Link to="/login" className="flex-shrink-0">
                <Button variant="secondary" size="sm" className="text-xs flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Full width dropdown on mobile only */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-parchment/95 backdrop-blur-md">
          <div className="px-3 sm:px-4 py-4 flex flex-col gap-2">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="text-sm text-ink/70 hover:text-ink font-body flex items-center gap-3 transition py-3 px-2 hover:bg-white/30 rounded-lg"
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/lessons"
                  onClick={closeMobileMenu}
                  className="text-sm text-ink/70 hover:text-ink font-body flex items-center gap-3 transition py-3 px-2 hover:bg-white/30 rounded-lg"
                >
                  <Trophy className="w-5 h-5 flex-shrink-0" />
                  <span>Lessons</span>
                </Link>
                <Link
                  to="/practice"
                  onClick={closeMobileMenu}
                  className="text-sm text-ink/70 hover:text-ink font-body flex items-center gap-3 transition py-3 px-2 hover:bg-white/30 rounded-lg"
                >
                  <MessageSquare className="w-5 h-5 flex-shrink-0" />
                  <span>Practice</span>
                </Link>
                <Link 
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="text-sm text-ink/70 hover:text-ink font-body flex items-center gap-3 transition py-3 px-2 hover:bg-white/30 rounded-lg"
                >
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  <span>Profile</span>
                </Link>
                <hr className="my-2 border-ink/10" />
                <button 
                  onClick={() => {
                    handleLogout()
                    closeMobileMenu()
                  }} 
                  className="text-sm text-ink/60 hover:text-coral transition flex items-center gap-3 py-3 px-2 hover:bg-white/30 rounded-lg w-full text-left"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
            
            {!user && (
              <>
                <Link 
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-sm text-ink/70 hover:text-ink font-body flex items-center gap-3 transition py-3 px-2 hover:bg-white/30 rounded-lg"
                >
                  <LogIn className="w-5 h-5 flex-shrink-0" />
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
