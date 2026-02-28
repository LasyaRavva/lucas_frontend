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
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8 inline-block">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-clay flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-ink mb-6 leading-tight">
          Master Languages the <span className="text-coral">Interactive Way</span>
        </h1>
        <p className="text-xl text-ink/60 max-w-2xl mx-auto mb-8 font-body">
          Like Lucas, transform your language learning journey with immersive lessons, real-time
          feedback, and engaging practice activities. Stay motivated and achieve fluency.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link to="/signup">
            <Button size="lg">Get Started Free</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
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
                <feature.icon className="w-8 h-8 text-coral mb-3" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>{feature.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-sea/10 to-moss/10 text-center p-12">
          <CardTitle className="text-2xl mb-4">Ready to Start Learning?</CardTitle>
          <CardContent className="mb-6">
            Join thousands of learners transforming their language skills with Lucas.
          </CardContent>
          <Link to="/signup">
            <Button size="lg">Begin Your Journey</Button>
          </Link>
        </Card>
      </section>
    </div>
  )
}
