import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import placementQuestions from '../data/testinput'; // ✅ Cập nhật import mới

const PlacementTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAnswerChange = (event, questionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: event.target.value,
    }));
    setErrorMessage('');
  };

  const handleNextQuestion = () => {
    if (!userAnswers[currentQuestionIndex]) {
      setErrorMessage('⚠️ Please select an answer before proceeding.');
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    placementQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResults(true);

    const getLevel = (score) => {
      if (score <= 10) return 'A1';
      if (score <= 15) return 'A2';
      if (score <= 20) return 'B1';
      if (score <= 25) return 'B2';
      return 'C1';
    };

    const level = getLevel(calculatedScore);
    localStorage.setItem('userLevel', level);

    try {
      const userInfo = localStorage.getItem('userInfo');
      const token = JSON.parse(userInfo)?.token;
      console.log(token)
      if (!token) throw new Error('Token not found');

      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log(token);
      await axios.patch(
        'http://localhost:5000/api/users/updateLevel',
        { level },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ User level updated successfully');
    } catch (error) {
      console.error(
        '❌ Failed to update level:',
        error.response?.data?.message || error.message
      );
    }

    setTimeout(() => {
      navigate('/learning-path');
    }, 2000);
  };

  const progress = ((currentQuestionIndex + 1) / placementQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">English Level Test</h1>

      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            Your Score: {score} / {placementQuestions.length}
          </h2>
          <h3 className="text-xl font-medium mt-4">
            Your Level: <span className="text-blue-500">{localStorage.getItem('userLevel')}</span>
          </h3>
        </div>
      ) : (
        <div>
          <div className="relative w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-xl font-medium mb-4">
              {placementQuestions[currentQuestionIndex].question}
            </h2>
            <div className="space-y-2">
              {placementQuestions[currentQuestionIndex].options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    onChange={(e) => handleAnswerChange(e, currentQuestionIndex)}
                    checked={userAnswers[currentQuestionIndex] === option}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>

          <div className="mt-6 flex justify-between">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Previous
              </button>
            )}

            {currentQuestionIndex < placementQuestions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className={`px-6 py-2 rounded-lg transition ${
                  userAnswers[currentQuestionIndex]
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                disabled={!userAnswers[currentQuestionIndex]}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementTest;
