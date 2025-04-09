import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center text-white pt-20">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Học Tiếng Anh Cá Nhân Hóa Với AI</h1>
        <p className="text-lg">Cải thiện ngữ pháp và từ vựng hiệu quả với công nghệ AI.</p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold mb-2">Bài Kiểm Tra Đầu Vào</h2>
          <p className="text-sm mb-4">Kiểm tra trình độ của bạn và nhận lộ trình phù hợp.</p>
          <Link to="/placement-test">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Bắt đầu
            </button>
          </Link>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold mb-2">Lộ Trình Học Tập</h2>
          <p className="text-sm mb-4">Khám phá lộ trình học tập cá nhân hóa để đạt mục tiêu.</p>
          <Link to="/learning-path">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Khám phá
            </button>
          </Link>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold mb-2">Bài Tập Ngữ Pháp</h2>
          <p className="text-sm mb-4">Luyện tập các bài tập ngữ pháp để nâng cao kỹ năng.</p>
          <Link to="/grammar-practice">
            <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
              Luyện tập
            </button>
          </Link>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold mb-2">Báo Cáo Tiến Độ</h2>
          <p className="text-sm mb-4">Xem tiến độ học tập qua biểu đồ và báo cáo chi tiết.</p>
          <Link to="/progress-report">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              Xem báo cáo
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
