import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { lessonService } from '../services/lessonService';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true);
        const data = await lessonService.getAllLessons();
        setLessons(data);
      } catch (err) {
        setError('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    }
    fetchLessons();
  }, []);

  if (loading) return <div className="text-center py-10">Loading lessons...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <h1 className="font-display text-2xl sm:text-3xl mb-4 sm:mb-6">Lessons</h1>
      <div className="grid gap-4 sm:gap-6">
        {lessons.map(lesson => (
          <Card key={lesson.id} className="hover:shadow-card transition-shadow duration-300 cursor-pointer" onClick={() => navigate(`/lessons/${lesson.id}`)}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm">{lesson.content?.text || lesson.description || ''}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
