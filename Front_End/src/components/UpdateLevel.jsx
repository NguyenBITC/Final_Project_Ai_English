import React, { useState } from 'react';
import testA1 from '../data/testA1';

const UpdateLevel = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let feedbackList = [];
    
    testA1.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      } else {
        feedbackList.push(`Câu ${q.id}: ${q.explanation}`);
      }
    });
    
    const totalQuestions = testA1.length;
    const percentage = (correctCount / totalQuestions) * 100;
    setScore(percentage);
    setFeedback(feedbackList);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Bài Kiểm Tra Nâng Cấp Cấp Độ</h1>
      {score === null ? (
        <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
          {testA1.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-medium">{q.question}</p>
              {q.options.map((option) => (
                <label key={option} className="block">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Nộp bài
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold">Kết quả: {score}%</h2>
          {score >= 70 ? (
            <p className="text-green-600">Chúc mừng! Bạn đã lên cấp!</p>
          ) : (
            <div>
              <p className="text-red-600">Bạn chưa đạt. Hãy cải thiện các lỗi sau:</p>
              <ul className="text-left mt-2">
                {feedback.map((f, index) => (
                  <li key={index} className="text-sm text-gray-700">{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateLevel;