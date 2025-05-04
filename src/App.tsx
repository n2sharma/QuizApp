import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';
import QuizListPage from './pages/QuizListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz/:id" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/quizzes" element={<QuizListPage />} />
    </Routes>
  );
}

export default App;
