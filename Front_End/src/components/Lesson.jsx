import React from "react";
import { useParams, Link } from "react-router-dom";

const lessonContents = {
  A1: ["Ngữ pháp cơ bản", "Từ vựng thường dùng", "Câu giao tiếp đơn giản"],
  A2: ["Hiện tại tiếp diễn", "Thì quá khứ đơn", "Câu so sánh"],
  B1: ["Hiện tại hoàn thành", "Câu bị động", "Câu tường thuật"],
  C1: ["Câu điều kiện nâng cao", "Thì hoàn thành tiếp diễn", "Cách diễn đạt học thuật"],
};

const Lesson = () => {
  const { level, lessonId } = useParams();
  const lesson = lessonContents[level]?.[lessonId];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Bài học: {lesson}</h1>
      <p className="text-gray-700">Nội dung bài học sẽ được cập nhật tại đây.</p>
      <Link to="/learning-path">
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
          Quay lại lộ trình
        </button>
      </Link>
    </div>
  );
};

export default Lesson;
