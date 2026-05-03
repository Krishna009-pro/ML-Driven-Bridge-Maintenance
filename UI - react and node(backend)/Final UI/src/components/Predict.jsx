import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ArrowRight } from 'lucide-react';

const Predict = () => {
  const [bridges, setBridges] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:5000/api/Data')
      .then((response) => setBridges(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredBridges = bridges.filter(bridge =>
    (bridge["Name"]?.toString().toLowerCase() || "").includes(filter.toLowerCase()) ||
    (bridge["Status"]?.toString().toLowerCase() || "").includes(filter.toLowerCase())
  );

  const indexOfLastBridge = currentPage * itemsPerPage;
  const indexOfFirstBridge = indexOfLastBridge - itemsPerPage;
  const currentBridges = filteredBridges.slice(indexOfFirstBridge, indexOfLastBridge);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Predictive Analysis</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Select a bridge to perform advanced maintenance predictions.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
          <input
            type="text"
            className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
            placeholder="Search bridges by name or status..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <Link
          to="/AddBridge"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all font-medium text-sm"
        >
          <Plus size={18} />
          <span>Add New Bridge</span>
        </Link>
      </div>

      <div className="glass-panel overflow-hidden p-4 rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Asset designation</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Telemetry (Lat)</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Vital Status</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Engineering</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Logic Type</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {currentBridges.length > 0 ? (
                currentBridges.map((bridge) => (
                  <tr key={bridge.ID} className="hover:bg-slate-50/80 dark:hover:bg-sky-500/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-base uppercase italic leading-none">{bridge["Name"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-base text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest">{bridge["Lattitude"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${bridge["Status"]?.toLowerCase() === 'working'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                        {bridge["Status"]}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-slate-800 dark:text-slate-200 font-bold uppercase tracking-tight">{bridge["Construction Date"]?.split('T')[0] || bridge["Construction Date"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-black uppercase tracking-tighter">{bridge["Design Type"]}</div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        to={`/PredictMaintenance?id=${bridge["ID"]}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                      >
                        Predict <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 italic">
                    No bridges found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{indexOfFirstBridge + 1}</span> to <span className="font-semibold text-slate-900 dark:text-white">{Math.min(indexOfLastBridge, filteredBridges.length)}</span> of <span className="font-semibold text-slate-900 dark:text-white">{filteredBridges.length}</span> results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredBridges.length / itemsPerPage), prev + 1))}
            disabled={currentPage * itemsPerPage >= filteredBridges.length}
            className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Predict;
