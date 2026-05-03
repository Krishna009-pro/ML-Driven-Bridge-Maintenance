import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardBarChart from './DashboardBarChart';
import { Building2, CircleAlert, TriangleAlert, CircleCheckBig, LayoutDashboard, TrendingUp, Bell } from 'lucide-react';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [attentionCount, setAttentionCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboardCount')
      .then((response) => setCount(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboardAttentionCount')
      .then((response) => setAttentionCount(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const stats = [
    {
      label: 'Total Assets',
      value: count,
      icon: <Building2 size={24} />,
      color: 'text-sky-500',
      shadow: 'shadow-sky-500/10',
      progress: 100
    },
    {
      label: 'Critical Status',
      value: 2,
      icon: <CircleAlert size={24} />,
      color: 'text-rose-500',
      shadow: 'shadow-rose-500/10',
      progress: (2 / (count || 1)) * 100
    },
    {
      label: 'Maintenance Pending',
      value: attentionCount,
      icon: <TriangleAlert size={24} />,
      color: 'text-amber-500',
      shadow: 'shadow-amber-500/10',
      progress: (attentionCount / (count || 1)) * 100
    },
    {
      label: 'Operational Health',
      value: count - attentionCount,
      icon: <CircleCheckBig size={24} />,
      color: 'text-emerald-500',
      shadow: 'shadow-emerald-500/10',
      progress: ((count - attentionCount) / (count || 1)) * 100
    }
  ];

  return (
    <div className="space-y-10 animate-slow-fade">
      {/* Header with quick stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="text-sky-600 dark:text-sky-400" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Global Overview</span>
            </div>
            <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none">
                Command <span className="text-sky-600">Center</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-3 font-semibold italic">Real-time telemetry and structural health orchestration.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold uppercase transition-all hover:scale-105">
                <TrendingUp size={14} />
                System Nominal
            </div>
            <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative hover:text-sky-500 transition-colors">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group glass-panel relative p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${stat.shadow}`}
          >
            {/* Background Decorative Icon */}
            <div className={`absolute -right-2 -bottom-2 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity duration-700 ${stat.color}`}>
                <div className="scale-[4]">
                    {stat.icon}
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                    <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-none">
                        {stat.label}
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">System Load</span>
                        <span className={`text-[10px] font-black ${stat.color}`}>{Math.round(stat.progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${stat.color.replace('text', 'bg')} transition-all duration-1000 ease-out`}
                            style={{ width: `${stat.progress}%` }}
                        />
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="glass-panel p-10 lg:p-14 rounded-[2.5rem]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Maintenance Distribution</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-bold">Predictive stratification across the active bridge network.</p>
            </div>
            <div className="flex items-center gap-6 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Critical</span>
                </div>
            </div>
        </div>
        
        <div className="h-[450px] w-full relative">
            <DashboardBarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
