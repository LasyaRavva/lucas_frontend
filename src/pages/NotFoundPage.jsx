export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-4 py-6 sm:py-12">
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">404</h1>
        <p className="text-sm sm:text-lg md:text-xl text-ink/60 mb-6">Page not found</p>
        <a href="/" className="text-coral font-semibold hover:underline text-sm sm:text-base">Go Home</a>
      </div>
    </div>
  )
}
