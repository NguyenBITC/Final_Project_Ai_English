import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressReport = () => {
  const data = [
    { name: 'Grammar', value: 70 },
    { name: 'Vocabulary', value: 50 },
  ];

  const COLORS = ['#4ade80', '#60a5fa'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Progress Report</h2>
      <p className="text-gray-600 mb-6">
        Here’s a summary of your learning progress. Keep going — you're doing great! 🚀
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        {/* Pie Chart Section */}
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Details Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
            📘 <strong>Grammar:</strong> 70% completed
          </div>
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">
            🧠 <strong>Vocabulary:</strong> 50% completed
          </div>
          <p className="text-sm text-gray-500 italic mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
