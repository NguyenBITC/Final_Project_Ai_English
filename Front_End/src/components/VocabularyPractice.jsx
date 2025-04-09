import React, { useState, useEffect } from 'react';
import { vocabularyData } from '../data/vocabularyData';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaVolumeUp } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/progress'; // Cập nhật URL backend của bạn
const USER_ID = '12345'; // Giả sử userId, bạn có thể lấy từ hệ thống đăng nhập

const VocabularyPractice = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/${USER_ID}`)
      .then((res) => res.json())
      .then((data) => setProgress(data || {}))
      .catch((err) => console.error('Error fetching progress:', err));
  }, []);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextWord = () => {
    if (!selectedTopic) return;
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabularyData[selectedTopic].length);
  };

  const prevWord = () => {
    if (!selectedTopic) return;
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? vocabularyData[selectedTopic].length - 1 : prevIndex - 1
    );
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const markProgress = (status) => {
    if (!selectedTopic) return;
    const word = vocabularyData[selectedTopic][currentIndex].word;
    const updatedProgress = { ...progress, [word]: status };
    setProgress(updatedProgress);
    
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: USER_ID, progress: updatedProgress })
    }).catch((err) => console.error('Error saving progress:', err));
    
    nextWord();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-1/4 bg-white shadow-xl rounded-lg p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-4">📚 Chọn Chủ Đề</h2>
        <div className="flex flex-col gap-2">
          {Object.keys(vocabularyData).map((topic) => (
            <button
              key={topic}
              onClick={() => handleSelectTopic(topic)}
              className={`px-4 py-2 rounded-lg shadow-md transition-all ${
                selectedTopic === topic ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 flex flex-col items-center justify-center">
        {selectedTopic ? (
          <>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedTopic}</h2>
            <motion.div 
              className="w-96 h-64 perspective cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div 
                className={`relative w-full h-full bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center text-center transition-transform transform ${isFlipped ? 'rotate-y-180' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {!isFlipped ? (
                  <div className="absolute w-full h-full flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{vocabularyData[selectedTopic][currentIndex].word}</h2>
                    <button 
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                      onClick={(e) => { e.stopPropagation(); speakWord(vocabularyData[selectedTopic][currentIndex].word); }}
                    >
                      <FaVolumeUp /> Phát âm
                    </button>
                  </div>
                ) : (
                  <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-2xl rotate-y-180">
                    <p className="text-lg text-gray-700">{vocabularyData[selectedTopic][currentIndex].meaning}</p>
                    <p className="text-gray-500 italic mt-2">"{vocabularyData[selectedTopic][currentIndex].example}"</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
            <div className="mt-6 flex items-center gap-4">
              <button onClick={() => markProgress('forgot')} className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600">❌ Chưa nhớ</button>
              <button onClick={() => markProgress('remembered')} className="bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600">✅ Đã nhớ</button>
            </div>
            <div className="mt-6 flex items-center gap-6">
              <button onClick={prevWord} className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition-all flex items-center justify-center">
                <FaArrowLeft size={24} />
              </button>
              <button onClick={nextWord} className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center">
                <FaArrowRight size={24} />
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-xl">Hãy chọn một chủ đề để bắt đầu học 📖</p>
        )}
      </div>
    </div>
  );
};

export default VocabularyPractice;
// This code is a React component for a vocabulary practice application. It allows users to select a topic and view words with their meanings and examples. Users can also mark their progress and hear the pronunciation of words.
// The component uses the Framer Motion library for animations and the SpeechSynthesis API for text-to-speech functionality. The vocabulary data is imported from a separate file, and progress is saved to a backend server using fetch requests.