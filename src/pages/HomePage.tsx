// src/pages/HomePage.tsx
import { quizzes } from '../constants/quizData';
import QuizCard from '../components/QuizCard';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to the Quiz App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
