import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";

const TrafficTrends = ({ data = [
  { name: "AVG NO", sales: 4000 },
  { name: "AVG SO2", sales: 3000 },
  { name: "AVG CO", sales: 5000 },
  { name: "AVG CO2", sales: 2000 }
] }) => {
  // Theme-aware colors derived from our design system
  const colors = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899'];

  return (
    <div className="w-full h-full font-inter">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              border: '1px solid rgba(51, 65, 85, 0.5)',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#fff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
          />
          <Bar 
            dataKey="sales" 
            radius={[6, 6, 0, 0]}
            barSize={40}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficTrends;