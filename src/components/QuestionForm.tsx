// src/components/QuestionForm.tsx

import React, { useState } from 'react';
import { Question } from '../types/quiz';

interface QuestionFormProps {
  onAdd: (question: Question) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (
      text.trim() === '' ||
      options.some((opt) => opt.trim() === '') ||
      correctIndex === null
    ) {
      alert(
        'Please fill in the question, all options, and select the correct answer.'
      );
      return;
    }

    const question: Question = {
      text,
      options: options.map((opt) => ({ text: opt })),
      correctAnswerIndex: correctIndex,
    };
    console.log('NAman --> question: ', question);
    onAdd(question);

    // Reset form
    setText('');
    setOptions(['', '', '', '']);
    setCorrectIndex(null);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-800 text-white space-y-4">
      <h2 className="text-xl font-semibold">Add Question</h2>
      <input
        type="text"
        value={text}
        placeholder="Enter question"
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 rounded text-black"
      />
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <input
            type="radio"
            checked={correctIndex === idx}
            onChange={() => setCorrectIndex(idx)}
          />
          <input
            type="text"
            value={opt}
            placeholder={`Option ${idx + 1}`}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            className="flex-1 p-2 rounded text-black"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm;
