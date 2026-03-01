import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

export default function Profile() {
  return (
    <div className="max-w-xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <h1 className="font-display text-2xl sm:text-3xl mb-4 sm:mb-6">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Lucas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs sm:text-sm">
          <div>Email: lucas@email.com</div>
          <div>Level: Intermediate</div>
          <div>Streak: 7 days</div>
        </CardContent>
      </Card>
    </div>
  )
}
