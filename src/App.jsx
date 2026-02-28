import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LessonsPage from './pages/LessonsPage'
import LessonDetailsPage from './pages/LessonDetailsPage'
import PracticePage from './pages/PracticePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './components/Layout'
import FlashcardsPage from './pages/FlashcardsPage'
import QuizzesPage from './pages/QuizzesPage'
import QuizTakePage from './pages/QuizTakePage'
import PronunciationPage from './pages/PronunciationPage'
import ConversationPage from './pages/ConversationPage'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:lessonId" element={<LessonDetailsPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/quizzes/:quizId" element={<QuizTakePage />} />
          <Route path="/pronunciation" element={<PronunciationPage />} />
          <Route path="/conversation" element={<ConversationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
