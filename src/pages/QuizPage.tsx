import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswerIndex: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswerIndex: 1,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      'Charles Dickens',
      'William Shakespeare',
      'Mark Twain',
      'Leo Tolstoy',
    ],
    correctAnswerIndex: 1,
  },
];

const QuizPage = () => {
  const { id } = useParams(); // <-- Get the :id from URL
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      navigate('/result', { state: { score, total: quizData.length } });
    }
  };

  return (
    <div className="min-h-screen bg-[#242424] text-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#1e1e1e] rounded-2xl p-6 shadow-lg space-y-6">
        <h2 className="text-sm text-gray-400">Quiz ID: {id}</h2>
        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full py-3 px-4 rounded-lg border transition-colors duration-200 
                ${
                  selectedOption === index
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedOption !== null && (
          <button
            onClick={handleNextQuestion}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
            disabled={selectedOption === null}
          >
            {currentQuestionIndex < quizData.length - 1 ? 'Next' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
