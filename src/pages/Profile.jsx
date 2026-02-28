import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

export default function Profile() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl mb-6">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lucas</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Email: lucas@email.com</div>
          <div>Level: Intermediate</div>
          <div>Streak: 7 days</div>
        </CardContent>
      </Card>
    </div>
  )
}
