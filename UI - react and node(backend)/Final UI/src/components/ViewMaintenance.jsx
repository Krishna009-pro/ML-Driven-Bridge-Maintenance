import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, History, CheckCircle2, Clock } from 'lucide-react';

const ViewMaintenance = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:5000/api/AssignedMaintenance')
      .then((response) => setMaintenanceRecords(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredBridges = maintenanceRecords.filter(bridge =>
    (bridge["bridge name"]?.toString().toLowerCase() || "").includes(filter.toLowerCase()) ||
    (bridge["assign user name"]?.toString().toLowerCase() || "").includes(filter.toLowerCase())
  );

  const indexOfLastBridge = currentPage * itemsPerPage;
  const indexOfFirstBridge = indexOfLastBridge - itemsPerPage;
  const currentBridges = filteredBridges.slice(indexOfFirstBridge, indexOfLastBridge);

  const handleUpdate = async (id, status) => {
    if (status.toLowerCase() === "pending") {
      try {
        await axios.put(`http://localhost:5000/api/updateMaintenance/${id}`);
        const response = await axios.get('http://localhost:5000/api/AssignedMaintenance');
        setMaintenanceRecords(response.data);
      } catch (error) {
        console.error('Error updating maintenance status:', error);
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 font-inter">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <History className="text-sky-500" size={32} />
          Maintenance History
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Review all assigned structural maintenance tasks and their current progress.</p>
      </div>

      <div className="mb-6">
        <div className="relative group max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
            placeholder="Search by bridge or engineer..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden p-4 rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Record ID</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Asset designation</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Personnel Assignment</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Health Metrics</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Service Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {currentBridges.length > 0 ? (
                currentBridges.map((bridge) => (
                  <tr key={bridge["maintenance id"]} className="hover:bg-slate-50/80 dark:hover:bg-sky-500/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-mono text-slate-400 font-bold tracking-tighter">#{bridge["maintenance id"]}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase text-base italic leading-none">{bridge["bridge name"]}</div>
                    </td>
                    <td className="px-8 py-6 text-base">
                      <div className="text-slate-800 dark:text-slate-200 font-bold">{bridge["assign user name"]}</div>
                      <div className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-tight">{bridge["assigned date"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-2 w-full max-w-[120px]">
                          <div className="h-1.5 flex-grow bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500" style={{ width: `${bridge["durability"]}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">{bridge["durability"]}%</span>
                        </div>
                        <div className="text-[10px] text-slate-400 tracking-wide uppercase">Lifespan: <span className="text-sky-500 font-bold">{bridge["remaining lifespan"]}yr</span></div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleUpdate(bridge["maintenance id"], bridge["status"])}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm
                          ${bridge["status"].toLowerCase() === 'pending'
                            ? 'bg-amber-100/50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 hover:bg-amber-500 hover:text-white cursor-pointer'
                            : 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 cursor-default opacity-80'
                          }`}
                      >
                        {bridge["status"].toLowerCase() === 'pending' ? <Clock size={14} /> : <CheckCircle2 size={14} />}
                        {bridge["status"].toUpperCase()}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 italic font-inter font-light">
                    No maintenance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-900 dark:text-white font-inter tracking-tighter">{indexOfFirstBridge + 1}-{Math.min(indexOfLastBridge, filteredBridges.length)}</span> of <span className="font-semibold text-slate-900 dark:text-white">{filteredBridges.length}</span> results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredBridges.length / itemsPerPage), prev + 1))}
            disabled={currentPage * itemsPerPage >= filteredBridges.length}
            className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMaintenance;
