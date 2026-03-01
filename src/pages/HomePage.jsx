import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, BookOpen, Headphones, Users, Target, TrendingUp } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user, navigate])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-12 sm:py-20 text-center">
        <div className="mb-6 sm:mb-8 inline-block">
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-coral to-clay flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink mb-4 sm:mb-6 leading-tight">
          Master Languages the <span className="text-coral">Interactive Way</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-ink/60 max-w-2xl mx-auto mb-8 sm:mb-12 font-body">
          Like Lucas, transform your language learning journey with immersive lessons, real-time
          feedback, and engaging practice activities. Stay motivated and achieve fluency.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">Get Started Free</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-20">
          {[
            {
              icon: BookOpen,
              title: 'Comprehensive Lessons',
              description: 'Structured lessons covering vocabulary, grammar, and idioms at all skill levels.',
            },
            {
              icon: Headphones,
              title: 'Speaking Practice',
              description: 'Practice pronunciation with AI-powered feedback on your accent and fluency.',
            },
            {
              icon: Target,
              title: 'Personalized Path',
              description: 'AI adapts to your learning speed and adjusts difficulty for optimal progress.',
            },
          ].map((feature, i) => (
            <Card key={i} className="hover:shadow-card transition">
              <CardHeader>
                <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-coral mb-3" />
                <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm">{feature.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-12 sm:py-16">
        <Card className="bg-gradient-to-br from-sea/10 to-moss/10 text-center p-6 sm:p-12">
          <CardTitle className="text-xl sm:text-2xl mb-4">Ready to Start Learning?</CardTitle>
          <CardContent className="mb-6 text-xs sm:text-sm">
            Join thousands of learners transforming their language skills with Lucas.
          </CardContent>
          <Link to="/signup">
            <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto">Begin Your Journey</Button>
          </Link>
        </Card>
      </section>
    </div>
  )
}
