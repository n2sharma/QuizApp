import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Question } from '../types/quiz';

const quizDataLocal = [
  {
    text: 'What is the capital of France?',
    options: [
      { text: 'Berlin' },
      { text: 'Madrid' },
      { text: 'Paris' },
      { text: 'Rome' },
    ],
    correctAnswerIndex: 2,
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Earth' },
      { text: 'Mars' },
      { text: 'Jupiter' },
      { text: 'Venus' },
    ],
    correctAnswerIndex: 1,
  },
  {
    text: "Who wrote 'Hamlet'?",
    options: [
      { text: 'Charles Dickens' },
      { text: 'William Shakespeare' },
      { text: 'Mark Twain' },
      { text: 'Leo Tolstoy' },
    ],
    correctAnswerIndex: 1,
  },
];

const QuizPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState<Question[]>([]);

  useEffect(() => {
    if (location.state?.quiz) {
      setQuizData(location.state.quiz.questions);
    } else {
      const stored = localStorage.getItem('quizzes');
      if (stored && id) {
        const quizzes = JSON.parse(stored);
        console.log('quizzes: ', quizzes);
        const found = quizzes.find((q) => String(q.id) === id);
        if (found) {
          setQuizData(found.questions);
        } else {
          setQuizData(quizDataLocal); // fallback if ID not found
        }
      }
    }
  }, [id, location.state]);

  console.log('quizData: ', quizData);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    console.log('Index: ', index);
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

  if (!currentQuestion) {
    return <div className="text-white">No questions available.</div>;
  }

  console.log('currentQuestion', currentQuestion);
  console.log('currentQuestion.text', currentQuestion.text);

  if (!quizData.length) return <p className="text-white">Loading quiz...</p>;

  return (
    <div className="min-h-screen bg-[#242424] text-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#1e1e1e] rounded-2xl p-6 shadow-lg space-y-6">
        <h2 className="text-sm text-gray-400">Quiz ID: {id}</h2>
        <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>

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
              {option.text}
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
