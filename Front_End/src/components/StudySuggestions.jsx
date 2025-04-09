import React from 'react';

const StudySuggestions = ({ topicsCompleted, allTopics }) => {
  const remainingTopics = allTopics.filter(topic => !topicsCompleted.includes(topic));

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Gợi Ý Ôn Tập</h2>
      {remainingTopics.length > 0 ? (
        <ul>
          {remainingTopics.map((topic, index) => (
            <li key={index} className="text-lg text-blue-600">
              {topic}
            </li>
          ))}
        </ul>
      ) : (
        <p>Tất cả các chủ đề đã được hoàn thành!</p>
      )}
    </div>
  );
};

export default StudySuggestions;
