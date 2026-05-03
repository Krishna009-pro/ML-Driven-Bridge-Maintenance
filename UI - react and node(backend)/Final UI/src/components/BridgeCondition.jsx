import React from "react";
import { Clock, Shield, Hammer, AlertCircle } from "lucide-react";
import CircularProgressChart from "./CircularProgressChart";

const BridgeCondition = ({lifespan, maintenance, durability}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <AlertCircle className="text-sky-500" size={24} />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            Structural Condition Analysis
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Remaining Lifespan Card */}
        <div className="group relative p-8 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock size={120} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-sky-500/10 text-sky-500 rounded-xl">
                    <Clock size={22} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">Est. Lifespan</h3>
            </div>
            
            <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{lifespan}</span>
                <span className="text-slate-400 dark:text-slate-500 font-medium pb-1">Years</span>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Calculated structural longevity based on atmospheric degradation and current stress loads.
            </p>

            <div className="mt-auto flex justify-center">
              <CircularProgressChart type={"Remaining Life Span"} value={lifespan} maxValue={50} color={"#0ea5e9"} />
            </div>
          </div>
        </div>

        {/* Durability Card */}
        <div className="group relative p-8 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={120} />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <Shield size={22} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">Durability Index</h3>
            </div>

            <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white uppercase">High</span>
                <span className="text-emerald-500 font-bold pb-1 text-sm">{Number(durability).toFixed(1)}%</span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Resistance level against environmental corrosion and repetitive traffic-induced vibration.
            </p>

            <div className="mt-auto flex justify-center">
              <CircularProgressChart type={"Durability"} value={Number(durability).toFixed(2)} maxValue={100} color={"#10b981"} />
            </div>
          </div>
        </div>

        {/* Maintenance Required Card */}
        <div className="group relative p-8 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Hammer size={120} />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
                    <Hammer size={22} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">Refurbishment Scope</h3>
            </div>

            <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white uppercase">{maintenance > 70 ? 'Urgent' : maintenance > 30 ? 'Moderate' : 'Low'}</span>
                <span className="text-amber-500 font-bold pb-1 text-sm">{maintenance}%</span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Immediate maintenance urgency rating derived from fracture-point AI analysis.
            </p>

            <div className="mt-auto flex justify-center">
              <CircularProgressChart type={"Maintenance"} value={maintenance} maxValue={100} color={"#f59e0b"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeCondition;