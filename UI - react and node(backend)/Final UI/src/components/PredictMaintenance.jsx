import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gauge, Radar, Activity, Hammer, Upload, ArrowRight } from "lucide-react";

function PredictMaintenance({ setImages }) {
  const [formData, setFormData] = useState({
    UT: "",
    GPR: "",
    AE: "",
    SHT: "",
    images: [],
    id: new URLSearchParams(window.location.search).get("id") || "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({...formData, images: Array.from(files)});
    setImages(Array.from(files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Loading", { state: { formData } }); 
  };

  const inputFields = [
    { label: "Ultrasonic Testing (UT)", name: "UT", icon: <Gauge size={18} />, placeholder: "Enter UT value" },
    { label: "Ground Penetrating Radar (GPR)", name: "GPR", icon: <Radar size={18} />, placeholder: "Enter GPR value" },
    { label: "Acoustic Emission (AE) Testing", name: "AE", icon: <Activity size={18} />, placeholder: "Enter AE value" },
    { label: "Rebound Hammer Test (SHT)", name: "SHT", icon: <Hammer size={18} />, placeholder: "Enter SHT value" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bridge Health Assessment</h1>
        <p className="text-slate-500 dark:text-slate-400">Input structural test data and images for machine learning prediction.</p>
      </div>

      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="p-1 px-8 bg-gradient-to-r from-sky-500 to-indigo-600"></div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field, idx) => (
              <div key={idx} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-sky-500">{field.icon}</span>
                  {field.label}
                </label>
                <input 
                  type="number" 
                  name={field.name} 
                  step="any" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                  placeholder={field.placeholder}
                  onChange={handleInputChange} 
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Upload size={18} className="text-sky-500" />
              Upload Crack Analysis Images
            </label>
            <div className="relative group">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                name="bimage" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handleFileChange} 
                required
              />
              <div className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center group-hover:border-sky-500 group-hover:bg-sky-500/5 transition-all">
                <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20 group-hover:text-sky-500 transition-colors">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {formData.images.length > 0 
                    ? `${formData.images.length} images selected` 
                    : "Drop images here or click to browse"}
                </p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG or JPEG allowed (Multiple)</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg group"
            >
              Analyze & Predict 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PredictMaintenance;
