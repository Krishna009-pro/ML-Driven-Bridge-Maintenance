import React from 'react';
import { Ruler, Layers, Weight, CheckCircle2, AlertTriangle, BadgeCheck } from 'lucide-react';

const StructuralDetails = ({slab, beams, load}) => {
  const specs = [
    {
      label: "Slab Thickness",
      value: `${slab} m`,
      icon: <Ruler size={18} />,
      progress: 75,
      status: "Critical",
      statusColor: "text-amber-600 bg-amber-100/50 dark:bg-amber-500/10 dark:text-amber-400",
      statusIcon: <AlertTriangle size={12} />
    },
    {
      label: "Number of Beams",
      value: beams,
      icon: <Layers size={18} />,
      progress: 60,
      status: "Stable",
      statusColor: "text-emerald-600 bg-emerald-100/50 dark:bg-emerald-500/10 dark:text-emerald-400",
      statusIcon: <CheckCircle2 size={12} />
    },
    {
      label: "Load Capacity",
      value: `${load} tons`,
      icon: <Weight size={18} />,
      progress: 90,
      status: "Optimal",
      statusColor: "text-sky-600 bg-sky-100/50 dark:bg-sky-500/10 dark:text-sky-400",
      statusIcon: <BadgeCheck size={12} />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-inter">
      {specs.map((spec, index) => (
        <div 
          key={index} 
          className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-sky-500/30 shadow-sm"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{spec.label}</span>
              <div className="text-sky-500">
                {spec.icon}
              </div>
            </div>
            
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {spec.value}
            </div>

            <div className="space-y-2">
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-sky-500 rounded-full transition-all duration-1000" 
                        style={{ width: `${spec.progress}%` }} 
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-medium">Utilization: {spec.progress}%</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${spec.statusColor}`}>
                        {spec.statusIcon}
                        {spec.status}
                    </span>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StructuralDetails;