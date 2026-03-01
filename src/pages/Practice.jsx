import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

export default function Practice() {
  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <h1 className="font-display text-2xl sm:text-3xl mb-4 sm:mb-6">Practice Activities</h1>
      <div className="grid gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Quiz: Vocabulary</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm">Test your Spanish vocabulary with quick quizzes.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Speaking Practice</CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm">Practice pronunciation and get instant feedback.</CardContent>
        </Card>
      </div>
    </div>
  )
}
