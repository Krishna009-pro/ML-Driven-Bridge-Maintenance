import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ClipboardCheck, UserCheck, CalendarDays } from 'lucide-react';

const AssignMaintenance = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get('id');
    const name = queryParams.get('name');
    const lifespan = queryParams.get('lifespan');
    const durability = queryParams.get('durability');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto py-8 font-inter">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                    <ClipboardCheck className="text-sky-500" size={32} />
                    Assign Maintenance
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Delegating structural analysis task to an on-field engineer.</p>
            </div>

            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 to-indigo-600"></div>
                
                <form action="http://localhost:8080/Bridge%20Maintenance/AssignMaintenace" method="post" className="p-8 space-y-8">
                    
                    {/* Bridge Summary Data (Read-only labels) */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bridge ID</span>
                            <div className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">#{id}</div>
                            <input type="hidden" name="bridge_id" value={id} />
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bridge Name</span>
                            <div className="text-sm font-bold text-slate-900 dark:text-white uppercase truncate">{name}</div>
                            <input type="hidden" name="bridge_name" value={name} />
                        </div>
                        <div className="space-y-1 mt-2">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Structural Durability</span>
                            <div className="text-sm font-bold text-sky-500">{durability}%</div>
                            <input type="hidden" name="durability" value={durability} />
                        </div>
                        <div className="space-y-1 mt-2">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Est. Lifespan</span>
                            <div className="text-sm font-bold text-indigo-500">{lifespan} years</div>
                            <input type="hidden" name="lifespan" value={lifespan} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Engineer Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <UserCheck size={18} className="text-sky-500" />
                                Select Assigned Engineer
                            </label>
                            <div className="relative group">
                                <select 
                                    name="engineer" 
                                    id="engineer" 
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-white appearance-none cursor-pointer"
                                >
                                    <option value="" hidden>CHOOSE AN ENGINEER...</option>
                                    <option value="shubham">Shubham R.</option>
                                    <option value="krushana">Krushana P.</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <CalendarDays size={18} className="text-sky-500" />
                                Maintenance Date
                            </label>
                            <input 
                                type="date" 
                                name="date" 
                                id="date" 
                                required
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-white" 
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full py-4 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
                        >
                            Assign Maintenance Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AssignMaintenance; 
