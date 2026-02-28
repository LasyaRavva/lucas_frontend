export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mist">
      <div className="text-center">
        <h1 className="font-display text-6xl mb-4">404</h1>
        <p className="text-xl text-ink/60 mb-6">Page not found</p>
        <a href="/" className="text-coral font-semibold hover:underline">Go Home</a>
      </div>
    </div>
  )
}
