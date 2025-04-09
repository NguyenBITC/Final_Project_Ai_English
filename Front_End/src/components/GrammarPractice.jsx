import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GrammarPractice = () => {
  const [questions, setQuestions] = useState([]); // Danh sách câu hỏi
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lỗi nếu có
  const [userLevel, setUserLevel] = useState(null); // Trình độ người dùng
  const [answers, setAnswers] = useState({}); // Đáp án người dùng chọn
  const [submitted, setSubmitted] = useState(false); // Trạng thái đã nộp bài hay chưa

  const [questionCount, setQuestionCount] = useState(5); // Số câu hỏi muốn làm
  const [selectedTypes, setSelectedTypes] = useState(["multiple_choice"]); // Dạng bài tập được chọn

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const level = JSON.parse(userInfo)?.user.level;
    setUserLevel(level);
  }, []);

  const getData = async () => {
    try {
      if (!userLevel) return;
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Ghép dạng bài tập thành chuỗi
      const typeDescriptions = selectedTypes
        .map((type) => {
          switch (type) {
            case "multiple_choice":
              return "Trắc nghiệm (multiple_choice)";
            case "fill_blank":
              return "Điền từ vào chỗ trống (fill_blank)";
            case "dropdown":
              return "Chọn đáp án từ danh sách (dropdown)";
            case "rewrite":
              return "Viết lại câu (rewrite)";
            case "error_identify":
              return "Tìm lỗi sai (error_identify)";
            case "reading":
              return "Đọc hiểu (reading)";
            default:
              return "";
          }
        })
        .join("\n   - ");

      const prompt = `Bạn là một giáo viên tiếng Anh thông minh. Hãy tạo ra ${questionCount} câu hỏi ngữ pháp đa dạng phù hợp với trình độ học viên là ${userLevel} (A1–C1), theo các yêu cầu sau:

1. Chỉ sử dụng kiến thức ngữ pháp phù hợp với trình độ ${userLevel}, không quá dễ, không quá khó.
2. Chỉ bao gồm các dạng bài tập sau:
   - ${typeDescriptions}
3. Mỗi câu hỏi cần có:
   - id
   - type
   - question
   - question_hint
   - options:  (dạng A, B, C, D)
   - correct_answer (dạng A, B, C, D)
   - explanation
4. Các tình huống thực tế: đời sống, công việc, học tập, sở thích...
5. Sử dụng tiếng Anh tự nhiên, không dùng tiếng mẹ đẻ.
6. Trả về dưới dạng JSON.
`;

      const response = await model.generateContent(prompt);
      if (!response || !response.response)
        throw new Error("Invalid API response");

      const responseText = response.response.text();
      const jsonStart = responseText.indexOf("[");
      const jsonEnd = responseText.lastIndexOf("]") + 1;
      const jsonData = JSON.parse(responseText.slice(jsonStart, jsonEnd));

      setQuestions(jsonData);
      setAnswers({});
      setSubmitted(false);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      setError("Không thể tải câu hỏi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelection = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const allAnswered = questions.every((q) => answers[q.id]);
    if (!allAnswered) {
      alert("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài.");
      return;
    }
    setSubmitted(true);
    // TODO: Gửi kết quả lên server nếu cần thiết
  };
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };
  const handleRetry = () => {
    getData();
  };

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Luyện Tập Ngữ Pháp Theo Trình Độ ({userLevel || "..."})
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6 max-w-2xl mx-auto">
        <label className="block mb-2 font-semibold">Số câu hỏi muốn làm:</label>
        <input
          type="number"
          className="border p-2 rounded w-full mb-4"
          min={1}
          max={20}
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        />

        <label className="block mb-2 font-semibold">Chọn dạng bài tập:</label>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes("rewrite")}
              onChange={() => handleCheckboxChange("rewrite")}
            />{" "}
            ✏️ Viết lại câu
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes("error_identify")}
              onChange={() => handleCheckboxChange("error_identify")}
            />{" "}
            ❌ Tìm lỗi sai
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes("fill_blank")}
              onChange={() => handleCheckboxChange("fill_blank")}
            />{" "}
            🔲 Điền vào chỗ trống
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes("multiple_choice")}
              onChange={() => handleCheckboxChange("multiple_choice")}
            />{" "}
            ✅ Trắc nghiệm
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes("dropdown")}
              onChange={() => handleCheckboxChange("dropdown")}
            />{" "}
            📂 Chọn từ danh sách
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes("reading")}
              onChange={() => handleCheckboxChange("reading")}
            />{" "}
            📖 Đọc hiểu
          </label>
        </div>

        <button
          onClick={getData}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Bắt đầu làm bài
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Đang tải câu hỏi...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {questions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <h2 className="text-lg font-bold mb-2">
                Câu {index + 1}: {q.question}
              </h2>
              <p className="text-sm italic text-gray-500 mb-2">
                {q.type.replace("_", " ")} | {q.question_hint}
              </p>

              {q.type === "multiple_choice" && q.options ? (
                <div className="flex flex-col gap-2">
                  {Object.entries(q.options).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelection(q.id, key)}
                      disabled={submitted}
                      className={`py-2 px-4 rounded text-left transition-all duration-200 ${
                        answers[q.id] === key
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-blue-400"
                      }`}
                    >
                      <strong>{key}.</strong> {value}
                    </button>
                  ))}
                </div>
              ) : q.type === "dropdown" && q.options ? (
                <select
                  disabled={submitted}
                  onChange={(e) => handleAnswerSelection(q.id, e.target.value)}
                  className="w-full p-2 border rounded mt-2"
                  value={answers[q.id] || ""}
                >
                  <option value="" disabled>
                    Chọn đáp án
                  </option>
                  {Object.entries(q.options).map(([key, value]) => (
                    <option key={key} value={key}>
                      {key}. {value}
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  disabled={submitted}
                  className="w-full p-2 border rounded mt-2"
                  rows={3}
                  onChange={(e) => handleAnswerSelection(q.id, e.target.value)}
                  placeholder="Nhập câu trả lời của bạn tại đây..."
                />
              )}

              {submitted && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
                  <p className="mb-2">
                    <strong>Đáp án bạn chọn:</strong>{" "}
                    <span
                      className={`font-bold ${
                        answers[q.id] === q.correct_answer
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {answers[q.id] || "Chưa chọn"}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Đáp án đúng:</strong>{" "}
                    <span className="font-bold text-blue-600">
                      {q.correct_answer}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Giải thích:</strong> {q.explanation}
                  </p>
                  <p
                    className={`font-semibold ${
                      answers[q.id] === q.correct_answer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {answers[q.id] === q.correct_answer
                      ? "✅ Bạn đã chọn đúng!"
                      : "❌ Bạn đã chọn sai!"}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 flex space-x-4">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Làm lại
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarPractice;
