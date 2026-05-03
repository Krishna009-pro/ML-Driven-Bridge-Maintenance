import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Plus, Sparkles, ArrowRight } from 'lucide-react';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:5000/api/BridgeRecommendation')
      .then((response) => setRecommendations(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredBridges = recommendations.filter(bridge =>
    (bridge["Bridge Name"]?.toString().toLowerCase() || "").includes(filter.toLowerCase()) ||
    (bridge["BridgeId"]?.toString().toLowerCase() || "").includes(filter.toLowerCase())
  );

  const indexOfLastBridge = currentPage * itemsPerPage;
  const indexOfFirstBridge = indexOfLastBridge - itemsPerPage;
  const currentBridges = filteredBridges.slice(indexOfFirstBridge, indexOfLastBridge);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Sparkles className="text-amber-500" size={32} />
          Maintenance Recommendations
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">AI-driven prioritisation of bridge structures requiring immediate attention.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative group flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
            placeholder="Search recommended bridges..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <Link
          to="/AddBridge"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all font-medium text-sm"
        >
          <Plus size={18} />
          <span>Add New Bridge</span>
        </Link>
      </div>

      <div className="glass-panel overflow-hidden p-4 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Reference ID</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Asset designation</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Durability Score</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Lifespan Forecast</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {currentBridges.length > 0 ? (
                currentBridges.map((bridge) => (
                  <tr key={bridge.RecId} className="hover:bg-slate-50/80 dark:hover:bg-sky-500/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-mono text-slate-400">#{bridge["RecId"]}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors uppercase text-base italic leading-none">{bridge["Bridge Name"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-grow max-w-[100px] h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${bridge["Durability"] < 40 ? 'bg-rose-500' : bridge["Durability"] < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${bridge["Durability"]}%` }}
                          />
                        </div>
                        <span className={`text-base font-black ${bridge["Durability"] < 40 ? 'text-rose-500' : bridge["Durability"] < 70 ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {bridge["Durability"]}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-800 dark:text-slate-200 italic">{bridge["Remaining Lifespan"]}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-black tracking-tight">years remaining</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        to={`/PredictMaintenance?id=${bridge["BridgeId"]}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm hover:shadow-amber-500/30"
                      >
                        Recalculate <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 italic">
                    No recommendations found.
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

export default Recommendation;
