import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

export default function Practice() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-display text-3xl mb-6">Practice Activities</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz: Vocabulary</CardTitle>
          </CardHeader>
          <CardContent>Test your Spanish vocabulary with quick quizzes.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Speaking Practice</CardTitle>
          </CardHeader>
          <CardContent>Practice pronunciation and get instant feedback.</CardContent>
        </Card>
      </div>
    </div>
  )
}
