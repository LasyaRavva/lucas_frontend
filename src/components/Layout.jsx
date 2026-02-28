import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/practice', label: 'Practice' },
  { to: '/profile', label: 'Profile' },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 shadow-soft py-3 px-6 flex gap-6 items-center">
        <span className="font-display text-xl text-coral font-bold tracking-tight">Lucas</span>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1 rounded-xl font-medium transition-colors ${pathname === link.to ? 'bg-coral/10 text-coral' : 'text-ink/70 hover:bg-mist'}`}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex-1" />
        <Link to="/login" className="text-sm text-sea font-semibold hover:underline">Sign Out</Link>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  )
}
