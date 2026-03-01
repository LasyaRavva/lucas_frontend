import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function QuizTakePage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressUpdated, setProgressUpdated] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/quizzes/${quizId}/questions`);
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [quizId]);

  const handleAnswer = (idx) => {
    setSelected(idx);
    if (idx === questions[current].correct_option) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
      } else {
        setShowResult(true);
        // Update XP/progress after quiz completion
        if (user && !progressUpdated) {
          apiClient.post('/auth/progress/complete', {
            userId: user.id,
            type: 'quiz',
            itemId: quizId,
          }).finally(() => setProgressUpdated(true));
        }
      }
    }, 900);
  };

  if (loading) return <div className="text-center py-10">Loading quiz...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!questions.length) return <div className="text-center py-10">No questions found.</div>;

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto py-6 sm:py-10 px-3 sm:px-4 text-center">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-4">Quiz Complete!</h1>
        <div className="text-base sm:text-lg mb-6">Your Score: {score} / {questions.length}</div>
        <Button onClick={() => navigate('/quizzes')} className="text-sm sm:text-base">Back to Quizzes</Button>
      </div>
    );
  }

  const q = questions[current];
  const options = Array.isArray(q.options) ? q.options : JSON.parse(q.options);

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Question {current + 1} of {questions.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 font-semibold text-xs sm:text-sm">{q.question}</div>
          <div className="flex flex-col gap-2 sm:gap-3">
            {options.map((opt, idx) => (
              <Button
                key={idx}
                variant={selected === null ? 'outline' : idx === q.correct_option ? 'moss' : selected === idx ? 'coral' : 'outline'}
                disabled={selected !== null}
                onClick={() => handleAnswer(idx)}
                className="text-xs sm:text-sm h-auto py-2 sm:py-3"
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
