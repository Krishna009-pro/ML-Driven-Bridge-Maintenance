import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const CorrosionLevels = ({ min, avg, max }) => {
  // Theme-aware colors: Emerald for Low, Amber for Moderate, Rose for High
  const COLORS = ['#10b981', '#f59e0b', '#f43f5e'];

  const data = [
    { name: 'Normal', value: avg || 60 },
    { name: 'Moderate', value: min || 20 },
    { name: 'Extreme', value: max || 10 },
  ];
  
  return (
    <div className="w-full h-full font-inter">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              border: '1px solid rgba(51, 65, 85, 0.5)',
              borderRadius: '12px',
              fontSize: '10px',
              color: '#fff'
            }}
            itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value) => (
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight ml-1">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CorrosionLevels;