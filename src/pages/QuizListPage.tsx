// src/pages/QuizListPage.tsx

import React, { useEffect, useState } from 'react';
import { Quiz } from '../types/quiz';
import { useNavigate } from 'react-router-dom';

const QuizListPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('quizzes');
    if (stored) {
      setQuizzes(JSON.parse(stored));
    }
  }, []);

  const handleStartQuiz = (quiz: Quiz) => {
    navigate(`/quiz/${quiz.id}`, { state: { quiz } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Available Quizzes</h1>
      {quizzes.length === 0 ? (
        <p className="text-white">No quizzes available.</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="p-4 border border-gray-600 rounded-lg bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => handleStartQuiz(quiz)}
            >
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-sm text-gray-400">{quiz.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizListPage;
