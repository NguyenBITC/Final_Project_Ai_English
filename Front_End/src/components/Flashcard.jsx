import React, { useState } from 'react';

const Flashcard = ({ word, meaning, example }) => {
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-xl font-bold">{word}</h2>
      {showMeaning ? (
        <>
          <p className="text-gray-700 mt-2">{meaning}</p>
          <p className="text-gray-500 mt-1 italic">"{example}"</p>
        </>
      ) : (
        <button
          onClick={() => setShowMeaning(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Hiển thị nghĩa
        </button>
      )}
    </div>
  );
};

export default Flashcard;
