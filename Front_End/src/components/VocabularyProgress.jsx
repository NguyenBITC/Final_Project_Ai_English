import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const VocabularyProgress = ({ learnedWords, totalWords }) => {
  const data = [
    { name: 'Learned', value: learnedWords },
    { name: 'Remaining', value: totalWords - learnedWords }
  ];

  const COLORS = ['#3b82f6', '#e0e0e0'];

  return (
    <div className="text-center mt-6">
      <h2 className="text-xl font-medium mb-4">Tiến Độ Học Từ Vựng</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="60%"
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p>Đã học {learnedWords} từ vựng trên tổng số {totalWords}</p>
    </div>
  );
};

export default VocabularyProgress;
