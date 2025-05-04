// src/pages/HomePage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../types/quiz';
import QuizCard from '../components/QuizCard';

const HomePage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('quizzes');
    if (stored) {
      setQuizzes(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Welcome to the Quiz App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.length === 0 ? (
          <p className="text-white text-center">No quizzes available.</p>
        ) : (
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
            />
          ))
        )}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/admin')}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          ➕ Create a Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
