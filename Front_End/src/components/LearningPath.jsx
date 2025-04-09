import React from 'react';
import { Link } from 'react-router-dom';

const LearningPath = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Lộ Trình Học Tập Cá Nhân Hóa</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Ngữ pháp cơ bản</h2>
          <p className="text-sm text-gray-600">Học các ngữ pháp cơ bản để xây dựng nền tảng ngôn ngữ.</p>
          <Link to="/learning-path/grammar">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Bắt đầu
            </button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Từ vựng hàng ngày</h2>
          <p className="text-sm text-gray-600">Học từ vựng hàng ngày để giao tiếp cơ bản.</p>
          <Link to="/vocabulary-practice">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Bắt đầu
            </button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Kỹ năng nghe</h2>
          <p className="text-sm text-gray-600">Học nghe qua các bài hát, phim ngắn và tin tức.</p>
          <Link to="/listenskill-practice">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              Bắt đầu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
