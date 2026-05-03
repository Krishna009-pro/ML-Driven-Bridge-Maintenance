import React from "react";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const CircularProgressChart = ({ type, value, maxValue, color }) => {
  // Handle specific logic from original code
  const displayValue = value;
  const chartValue = value === "\"No\"" ? 100 : value;

  const data = {
    datasets: [
      {
        data: [chartValue, maxValue - chartValue],
        backgroundColor: [
          color, 
          "rgba(var(--bg-slate-200), 0.1)" // Fallback if using standard tailwind logic
        ],
        borderWidth: 0,
        borderRadius: 10,
      },
    ],
  };

  // Improved theme-aware background color for the empty part of the chart
  // We'll use a semi-transparent gray that works in both light and dark
  data.datasets[0].backgroundColor[1] = "rgba(148, 163, 184, 0.1)"; // Slate 400 with low opacity

  const options = {
    cutout: "82%", // Thinner ring for a more modern look
    plugins: {
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="relative w-[180px] h-[180px] group transition-transform duration-500 hover:scale-105">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
          {type}
        </span>
        <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {displayValue}
        </span>
      </div>
      
      {/* Decorative pulse for the center if needed */}
      <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700`} 
           style={{ backgroundColor: color }}>
      </div>
    </div>
  );
};

export default CircularProgressChart;