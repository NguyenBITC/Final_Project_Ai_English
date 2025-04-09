// Import các thư viện cần thiết
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const GrammarQuiz = () => {
  // Lấy thông tin bài học được truyền qua route
  const location = useLocation();
  const navigate = useNavigate();
  const lesson = location.state?.lesson;

  // Khai báo các state quản lý dữ liệu và UI
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previousQuestions, setPreviousQuestions] = useState(new Set());
  const [userAnswers, setUserAnswers] = useState([]);

  // Fetch dữ liệu câu hỏi từ Gemini API
  useEffect(() => {
    if (!lesson) return;

    const fetchQuestions = async () => {
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are an expert in English grammar. Generate 10 unique multiple-choice questions based on the lesson titled: "${lesson.title}". 

        Requirements:  
        - Each question must have 4 options labeled A, B, C, D  
        - Indicate the correct answer  
        - Give a detailed explanation  
        - No duplicates  
        Format (JSON array):  
        [
          {
            "question": "Example?",
            "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
            "correct_answer": "B",
            "explanation": "..."
          }
        ]`;

        const response = await model.generateContent(prompt);
        const responseText = await response.response.text();
        const jsonData = JSON.parse(responseText.match(/\[.*\]/s)?.[0] || "[]");

        const filteredQuestions = jsonData.filter(q => !previousQuestions.has(q.question));
        setPreviousQuestions(new Set([...previousQuestions, ...filteredQuestions.map(q => q.question)]));
        setQuestions(filteredQuestions);
        setLoading(false);
      } catch (err) {
        console.error("Error generating questions:", err);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lesson]);

  // Xử lý khi người dùng chọn đáp án
  const handleAnswer = (optionKey) => {
    if (selectedAnswer) return;
    setSelectedAnswer(optionKey);

    const currentQ = questions[currentQuestion];
    const isCorrect = optionKey === currentQ.correct_answer;
    if (isCorrect) setScore(score + 1);

    const answerObj = {
      question: currentQ.question,
      selected: optionKey,
      correct: currentQ.correct_answer,
      explanation: currentQ.explanation,
    };

    setUserAnswers((prev) => [...prev, answerObj]);
  };

  // Chuyển sang câu hỏi tiếp theo
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Làm lại bài kiểm tra
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  // Hiển thị loading khi đang fetch dữ liệu
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-sky-200 to-indigo-300">
        <ClipLoader color="#333" size={50} />
      </div>
    );
  }

  // Trường hợp không có câu hỏi nào được tạo
  if (!lesson || questions.length === 0) return <p>No questions available.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 text-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">
          📚 Quiz: {lesson.title}
        </h1>

        {!quizCompleted ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} / {questions.length}
            </h2>

            <div className="bg-gray-100 p-4 rounded-xl mb-6">
              <p className="text-lg">{questions[currentQuestion].question}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(questions[currentQuestion].options).map(([key, value]) => {
                const isCorrect = key === questions[currentQuestion].correct_answer;
                const isSelected = key === selectedAnswer;

                let optionClass = "bg-white border hover:bg-blue-100 text-gray-900";
                if (selectedAnswer) {
                  if (isCorrect) optionClass = "bg-green-100 border-green-500";
                  else if (isSelected) optionClass = "bg-red-100 border-red-500";
                  else optionClass = "bg-gray-100 text-gray-400";
                }

                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(key)}
                    className={`p-4 rounded-lg border text-left font-medium ${optionClass}`}
                    disabled={!!selectedAnswer}
                  >
                    {key}. {value}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-between">
              {currentQuestion > 0 && (
                <button
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-sm"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  ⬅ Previous
                </button>
              )}
              {selectedAnswer && (
                <button
                  className="ml-auto px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={nextQuestion}
                >
                  Next ➡
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">🎉 Quiz Completed!</h2>
              <p className="text-lg">Your score: {score} / {questions.length}</p>
            </div>

            <div className="mt-6 space-y-4">
              {userAnswers.map((answer, index) => (
                <div key={index} className="bg-gray-100 rounded-xl p-4">
                  <p className="font-semibold">
                    {index + 1}. {answer.question}
                  </p>
                  <p>
                    Your answer:{" "}
                    <span className={answer.selected === answer.correct ? "text-green-600" : "text-red-600"}>
                      {answer.selected}
                    </span>
                  </p>
                  <p>
                    ✅ Correct answer: <span className="text-green-700 font-semibold">{answer.correct}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    💡 <strong>Explanation:</strong> {answer.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                🔄 Try Again
              </button>
              <button
                onClick={() => navigate("/learning-path/grammar")}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                🔙 Back to Lesson
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GrammarQuiz;
