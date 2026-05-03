import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Plus, MapPin, Database, ChevronLeft, ChevronRight, Activity, Filter } from 'lucide-react';

const ViewBridge = () => {
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
  const totalPages = Math.ceil(filteredBridges.length / itemsPerPage);

  return (
    <div className="animate-slow-fade w-full flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Database className="text-sky-600 dark:text-sky-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 dark:text-slate-400">Asset Management</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            Bridge <span className="text-sky-600">Inventory</span>
          </h1>
          <p className="text-slate-800 dark:text-slate-300 mt-3 font-bold text-lg">Comprehensive architectural database of all monitored infrastructure assets.</p>
        </div>

        <Link
          to="/AddBridge"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl shadow-xl shadow-sky-500/20 transition-all font-black text-xs uppercase tracking-widest hover:-translate-y-1 active:translate-y-0"
        >
          <Plus size={18} />
          <span>Register New asset</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="relative flex-grow max-w-xl group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
          <input
            type="text"
            className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-sm font-medium"
            placeholder="Search assets by designation, location or status code..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <Filter size={16} />
          Advanced Filters
        </button>
      </div>

      <div className="glass-panel overflow-hidden rounded-[2rem] p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Asset designation</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Deployment</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Vital Status</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Telemetry</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Engineering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {currentBridges.length > 0 ? (
                currentBridges.map((bridge) => (
                  <tr key={bridge.ID} className="hover:bg-slate-50/80 dark:hover:bg-sky-500/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 dark:text-slate-100 tracking-tight text-base uppercase group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{bridge["Name"]}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">ID-REF: {bridge["ID"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
                        <MapPin size={14} className="text-sky-500" />
                        {bridge["Lattitude"]}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${bridge["Status"]?.toLowerCase() === 'working'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/10'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${bridge["Status"]?.toLowerCase() === 'working' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                        {bridge["Status"]}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Activity size={16} className="text-sky-500" />
                        {bridge["Length"]}m <span className="text-slate-400 font-normal">×</span> {bridge["Width"]}m
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-black mt-1 uppercase tracking-tight">Slab: {bridge["SlabThickness"] || '0.0'}m</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{bridge["Design Type"]}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-black mt-1 tracking-widest">EST. {bridge["Construction Date"]?.split('T')[0] || bridge["Construction Date"]}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Database size={40} className="text-slate-200 dark:text-slate-800" />
                      <div className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest italic">Inventory search returned zero results</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Fix */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Displaying <span className="text-slate-900 dark:text-white">{indexOfFirstBridge + 1}</span> — <span className="text-slate-900 dark:text-white">{Math.min(indexOfLastBridge, filteredBridges.length)}</span> of <span className="text-slate-900 dark:text-white">{filteredBridges.length}</span> Assets
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center px-4 font-black text-xs text-sky-500">
            {currentPage} / {totalPages || 1}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBridge;