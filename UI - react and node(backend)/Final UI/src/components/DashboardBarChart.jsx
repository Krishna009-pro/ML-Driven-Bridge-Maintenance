import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { BarChart3 } from "lucide-react";

const data = [
  { condition: "Excellent", count: 15, color: "#10b981" }, // Emerald 500
  { condition: "Good", count: 30, color: "#22c55e" },      // Green 500
  { condition: "Fair", count: 25, color: "#f59e0b" },      // Amber 500
  { condition: "Poor", count: 20, color: "#f97316" },      // Orange 500
  { condition: "Critical", count: 10, color: "#ef4444" },  // Red 500
];

const DashboardBarChart = () => {
  return (
    <div className="w-full h-full font-inter font-medium">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.1} />
            <XAxis 
                dataKey="condition" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
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
                itemStyle={{ fontWeight: 'bold' }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;