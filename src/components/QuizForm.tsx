// src/components/QuizForm.tsx

import React, { useState } from 'react';
import { Quiz, Question } from '../types/quiz';
import QuestionForm from './QuestionForm';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const QuizForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleSubmit = () => {
    const newQuiz: Quiz = {
      id: uuidv4(),
      title,
      description,
      questions,
    };

    const existing = JSON.parse(localStorage.getItem('quizzes') || '[]');
    localStorage.setItem('quizzes', JSON.stringify([...existing, newQuiz]));

    navigate('/admin/quizzes');
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded"
      />
      <QuestionForm onAdd={handleAddQuestion} />
      <button
        onClick={handleSubmit}
        disabled={!title || questions.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizForm;
