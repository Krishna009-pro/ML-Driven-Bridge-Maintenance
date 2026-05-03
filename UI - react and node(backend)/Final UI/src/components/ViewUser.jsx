import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, Search, UserPlus, Trash2, ShieldCheck, Mail, Fingerprint, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to terminate this user access?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/userdata/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.ID !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/userdata')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    (user["Name"]?.toString().toLowerCase() || "").includes(filter.toLowerCase()) ||
    (user["ID"]?.toString().toLowerCase() || "").includes(filter.toLowerCase()) ||
    (user["Role"]?.toString().toLowerCase() || "").includes(filter.toLowerCase())
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="animate-slow-fade w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-sky-600 dark:text-sky-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Access Control</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            Personnel <span className="text-sky-600">Registry</span>
          </h1>
          <p className="text-slate-800 dark:text-slate-300 mt-3 font-bold">Credential management and privilege escalation for authorized personnel.</p>
        </div>

        <Link
          to="/AddUser"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl shadow-xl shadow-sky-500/20 transition-all font-black text-xs uppercase tracking-widest hover:-translate-y-1 active:translate-y-0"
        >
          <UserPlus size={18} />
          <span>Onboard Personnel</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="relative flex-grow max-w-xl group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
          <input
            type="text"
            className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-sm font-medium"
            placeholder="Search personnel by name, UID or functional role..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <Filter size={16} />
          Privilege Sort
        </button>
      </div>

      <div className="glass-panel overflow-hidden p-6 rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Personnel ID</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Identity Designation</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Privilege Level</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Communication</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.ID} className="hover:bg-slate-50/80 dark:hover:bg-sky-500/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                          <Fingerprint size={16} className="text-slate-500" />
                        </div>
                        <span className="text-sm font-black font-mono text-slate-600 dark:text-slate-400 tracking-tighter">REF-{user["ID"]}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 dark:text-slate-100 tracking-tight text-base uppercase group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors uppercase italic">{user["Name"]}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-400 font-black text-xs uppercase tracking-widest border border-sky-500/20">
                        {user["Role"]}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200 font-bold text-base">
                        <Mail size={16} className="text-sky-600" />
                        {user["Email Id"]}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => handleDelete(user.ID)}
                        className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all hover:scale-110 active:scale-90"
                        title="De-provision Account"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Users size={40} className="text-slate-200 dark:text-slate-800" />
                      <div className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest italic">Personnel search returned zero matches</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Onboarded Personnel: <span className="text-slate-900 dark:text-white">{indexOfFirstUser + 1}</span> — <span className="text-slate-900 dark:text-white">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="text-slate-900 dark:text-white">{filteredUsers.length}</span> Profiles
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

export default ViewUser;