import React from 'react'
import { useLocation } from "react-router-dom";
import BridgeDetails from './BridgeDetails'

const Report = () => {
    const location = useLocation();
    const { data } = location.state || {}; 
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get("id");

    if (!data) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Analysis Results Unavailable</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">We couldn't retrieve the prediction data for this bridge.</p>
            <a href="/Predict" className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors">Return to Predictions</a>
        </div>
      );
    }

    const d = JSON.stringify(data, null, 2);
    
    if (typeof d !== "string") {
        return <div className="p-8 text-rose-500 font-bold">Invalid analysis data format.</div>;
    }

    const d1 = d.replace('{', '');
    const d2 = d1.replace('}', '');
    const d3 = d2.split(',');

    if (d3.length < 3) {
        return <div className="p-8 text-rose-500 font-bold">Incomplete analysis signature received.</div>;
    }

    // Clean up the string values from JSON.stringify
    const PredictedLifespan = d3[0]?.split(':')[1]?.replace(/"/g, '').trim() || "N/A";
    const MaintenanceRequired = d3[1]?.split(':')[1]?.replace(/"/g, '').trim() || "N/A";
    const PredictedDurability = d3[2]?.split(':')[1]?.replace(/"/g, '').trim() || "N/A";

    return (
        <div className="pb-20">
            <BridgeDetails 
                lifespan={PredictedLifespan} 
                maintenance={MaintenanceRequired} 
                durability={PredictedDurability} 
                id={id} 
            />
        </div>
    )
}

export default Report;
