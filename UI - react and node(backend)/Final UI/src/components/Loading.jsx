import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Zap, Brain, ShieldCheck, Database } from "lucide-react";

function Loading({imagesmain}) {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};
  const [statusIndex, setStatusIndex] = useState(0);

  const loadingStatuses = [
    { text: "Optimizing sensor data...", icon: <Database size={20} /> },
    { text: "Performing ultrasonic structural analysis...", icon: <Zap size={20} /> },
    { text: "Running neural network crack detection...", icon: <Brain size={20} /> },
    { text: "Validating structural safety parameters...", icon: <ShieldCheck size={20} /> },
    { text: "Generating final recommendation report...", icon: <Loader2 size={20} /> }
  ];

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % loadingStatuses.length);
    }, 1500);

    const sendDataToServlet = async () => {
      if (!formData.id) {
        console.error("❌ ERROR: ID is missing in formData.");
        return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      if (formData.UT) formDataToSend.append("UT", formData.UT);
      if (formData.GPR) formDataToSend.append("GPR", formData.GPR);
      if (formData.AE) formDataToSend.append("AE", formData.AE);
      if (formData.SHT) formDataToSend.append("SHT", formData.SHT);
      
      imagesmain.forEach((image) => {
        formDataToSend.append('images', image);
      });

      try {
        const response = await fetch("http://localhost:8080/Bridge%20Maintenance/PredictionAPI", {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const text = await response.text();
        if (!text) throw new Error("Server returned empty response.");

        const data = JSON.parse(text);
        console.log("✅ Analysis Complete:", data);
        
        // Brief artificial delay for smooth transition
        setTimeout(() => {
            navigate(`/Report?id=${formData.id}`, { state: { data } });
        }, 1000);

      } catch (error) {
        console.error("❌ Error uploading data:", error.message);
      }
    };

    sendDataToServlet();
    return () => clearInterval(statusInterval);
  }, [formData, navigate, imagesmain, loadingStatuses.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full animate-in fade-in duration-1000">
      <div className="relative mb-12">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-sky-500/20 blur-[80px] rounded-full animate-pulse"></div>
        
        {/* Main Spinner */}
        <div className="relative flex items-center justify-center">
            <Loader2 size={80} className="text-sky-500 animate-spin transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={32} className="text-sky-600 dark:text-sky-400 animate-bounce" />
            </div>
        </div>
      </div>

      <div className="text-center space-y-4 relative z-10 max-w-md px-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          AI Analysis in Progress
        </h1>
        
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm animate-in slide-in-from-bottom-2">
            <span className="text-sky-500 animate-pulse">
                {loadingStatuses[statusIndex].icon}
            </span>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {loadingStatuses[statusIndex].text}
            </p>
        </div>

        <div className="w-full max-w-[240px] h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden mt-6">
            <div className="h-full bg-sky-500 animate-infinite-loading transition-all duration-300" style={{ width: '40%' }}></div>
        </div>
        
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-[0.2em] pt-4">
          Deep Learning Pipeline v4.0.2
        </p>
      </div>

      {/* Styled inline keyframes for the loading bar since it's a bit custom */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes infinite-loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-infinite-loading {
          animation: infinite-loading 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}

export default Loading;
