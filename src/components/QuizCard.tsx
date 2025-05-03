// src/components/QuizCard.tsx
import { Link } from 'react-router-dom';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, description }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={`/quiz/${id}`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Quiz
        </button>
      </Link>
    </div>
  );
};

export default QuizCard;
