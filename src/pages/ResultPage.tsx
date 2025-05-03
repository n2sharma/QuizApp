import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  if (score === undefined || total === undefined) {
    return (
      <div className="text-center text-white mt-10">
        <p>Invalid Access. Please take the quiz first.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#242424] flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] rounded-2xl p-6 text-white max-w-md w-full text-center shadow-xl space-y-4">
        <h2 className="text-2xl font-bold">Quiz Result</h2>
        <p className="text-lg">
          You scored{' '}
          <span className="text-green-400 font-semibold">{score}</span> out of{' '}
          <span className="text-blue-400 font-semibold">{total}</span>
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
