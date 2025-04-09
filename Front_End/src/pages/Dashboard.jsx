import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login"); // Chuyển hướng nếu chưa đăng nhập
    } else {
      setUser(JSON.parse(userInfo)); // Lấy thông tin người dùng
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎯 Chào mừng, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Đây là trang tổng quan cá nhân của bạn. Hãy tiếp tục học tập nhé! 🚀
        </p>

        {/* Tiến độ học tập */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800">📚 Bài học gần đây</h2>
            <ul className="mt-2 text-gray-700">
              <li>🔹 Ngữ pháp: Câu điều kiện loại 1</li>
              <li>🔹 Từ vựng: Chủ đề công nghệ</li>
              <li>🔹 Bài kiểm tra: Kiểm tra từ vựng tuần này</li>
            </ul>
          </div>

          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800">📊 Tiến độ học tập</h2>
            <p className="mt-2 text-gray-700">Bạn đã hoàn thành <b>65%</b> lộ trình học 🎉</p>
          </div>
        </div>

        {/* Menu điều hướng */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/learning-path")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Xem lộ trình học
          </button>
          <button
            onClick={() => navigate("/progress-report")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Báo cáo tiến độ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// Compare this snippet from src/pages/Register.jsx: