// src/pages/AdminPage.tsx

import React from 'react';
import QuizForm from '../components/QuizForm';

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Create New Quiz</h1>
      <QuizForm />
    </div>
  );
};

export default AdminPage;
