import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/index'

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await userService.getDashboard(user.id);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    // Listen for profile updates from PracticePage
    const handler = () => fetchProfile();
    window.addEventListener('profileUpdated', handler);
    return () => window.removeEventListener('profileUpdated', handler);
  }, [user]);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div>
                <div className="text-3xl sm:text-4xl font-bold">{profile?.progress ?? 0}%</div>
                <div className="text-xs sm:text-sm text-ink/60">Overall Course Completion</div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant="coral" className="w-fit text-xs sm:text-sm">Streak: {profile?.streak ?? 0} days</Badge>
                <Badge variant="sea" className="w-fit text-xs sm:text-sm">XP: {profile?.xp ?? 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Daily Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-semibold mb-2">15 min</div>
            <Badge variant="moss" className="text-xs sm:text-sm">On Track</Badge>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Quick Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-ink/80">
              <li>Review 10 flashcards</li>
              <li>Take a vocabulary quiz</li>
              <li>Practice a conversation</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Upcoming Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-xs sm:text-sm text-ink/80">
              <li>Spanish Idioms</li>
              <li>Ordering at a Restaurant</li>
              <li>Business Spanish Basics</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
