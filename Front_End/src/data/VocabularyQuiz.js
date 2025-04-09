import React, { useState } from 'react';
import { vocabularyList } from './vocabularyData';

const VocabularyQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === vocabularyList[currentIndex].meaning.toLowerCase()) {
      setFeedback("✅ Đúng rồi!");
    } else {
      setFeedback(`❌ Sai! Đáp án đúng là: ${vocabularyList[currentIndex].meaning}`);
    }
  };

  const nextQuestion = () => {
    setUserAnswer("");
    setFeedback("");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Kiểm Tra Từ Vựng</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold">{vocabularyList[currentIndex].word}</h2>
        <input
          type="text"
          placeholder="Nhập nghĩa tiếng Việt..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="border p-2 mt-4 w-full text-center"
        />
        <button
          onClick={checkAnswer}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kiểm tra
        </button>
        {feedback && <p className="mt-4">{feedback}</p>}
        <button
          onClick={nextQuestion}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Câu tiếp theo
        </button>
      </div>
    </div>
  );
};

export default VocabularyQuiz;
