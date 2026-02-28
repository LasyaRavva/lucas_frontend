import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl mb-6">Welcome back, Lucas!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="coral">7 days</Badge>
            <div className="mt-2 text-ink/60">Keep your streak alive!</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-3 w-full bg-mist rounded-full overflow-hidden">
              <div className="h-full bg-sea rounded-full" style={{ width: '62%' }} />
            </div>
            <div className="mt-2 text-ink/60">62% to next milestone</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
