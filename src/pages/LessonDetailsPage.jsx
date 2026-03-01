import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lessonService } from '../services/lessonService';
import { Card, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function LessonDetailsPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const data = await lessonService.getLessonById(lessonId);
        setLesson(data);
      } catch (err) {
        setError('Failed to load lesson details');
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [lessonId]);

  if (loading) return <div className="text-center py-10">Loading lesson...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!lesson) return null;

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
      <Card>
        <CardTitle className="text-2xl sm:text-3xl p-4 sm:p-6">{lesson.title}</CardTitle>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="sea" className="text-xs">{lesson.level}</Badge>
            {lesson.topics && lesson.topics.map((topic, i) => (
              <Badge key={i} variant="coral" className="text-xs">{topic}</Badge>
            ))}
          </div>
          <div className="mb-4 text-sm sm:text-base text-ink/80">{lesson.content?.text}</div>
          {lesson.learning_practices && (
            <div className="mt-4">
              <h2 className="font-semibold text-lg sm:text-xl mb-2">Practice</h2>
              <div className="text-xs sm:text-sm">{lesson.learning_practices.practice}</div>
            </div>
          )}
          {lesson.learning_tips && (
            <div className="mt-6 p-3 sm:p-4 bg-moss/10 rounded-lg border border-moss/30">
              <h3 className="font-semibold text-sm sm:text-base text-moss mb-1">Learning Tip</h3>
              <div className="text-xs sm:text-sm text-moss/90">{lesson.learning_tips}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
