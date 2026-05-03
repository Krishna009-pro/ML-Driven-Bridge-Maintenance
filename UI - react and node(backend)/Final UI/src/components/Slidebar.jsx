import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Plus,
  ActivitySquare,
  LogOut,
  FolderOpen,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

function Slidebar({ isCollapsed, toggleCollapse }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path
    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-r-4 border-sky-500 font-bold"
    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-200 border-r-4 border-transparent";

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`flex items-center py-3 transition-all duration-300 group ${isActive(to)} ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}
      title={isCollapsed ? label : ''}
    >
      <Icon size={20} className={`transition-transform duration-30 group-hover:scale-110 ${isCollapsed ? '' : 'mr-4'} ${location.pathname === to ? 'text-sky-600' : 'text-slate-500'}`} />
      {!isCollapsed && (
        <span className=" font-bold tracking-tight whitespace-nowrap overflow-hidden text-lg animate-in fade-in slide-in-from-left-2 duration-300">
          {label}
        </span>
      )}
    </Link>
  );

  return (
    <div className={`flex flex-col h-full py-6 select-none transition-all duration-500 ${isCollapsed ? 'items-center' : ''}`}>
      {/* Header with Toggle Button */}
      <div className={`w-full px-6 mb-10 flex items-center ${isCollapsed ? 'justify-center mb-12' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500 flex-shrink-0">
            <div className="p-2 bg-sky-600 rounded-xl shadow-lg shadow-sky-600/20 flex-shrink-0">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[17px] font-black tracking-tight text-slate-950 dark:text-white uppercase leading-none whitespace-nowrap">
                Bridge<span className="text-sky-600">Sense</span>
              </h1>
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1.5 opacity-70 whitespace-nowrap">
                Intelligence Systems
              </div>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="p-2 bg-sky-600 rounded-xl shadow-lg shadow-sky-600/20 mb-4">
            <ShieldCheck size={20} className="text-white" />
          </div>
        )}

        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-500/10 rounded-lg transition-all"
            title="Collapse Sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="mb-8 p-3 text-sky-600 bg-sky-500/10 rounded-2xl hover:bg-sky-500/20 transition-all active:scale-90 shadow-sm"
          title="Expand Sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Navigation Scroll Area */}
      <div className="flex-grow flex flex-col gap-6 overflow-y-auto custom-scrollbar overflow-x-hidden w-full">
        {/* Overview Section */}
        <section>
          {!isCollapsed && (
            <div className="px-6 mb-3 text-[11px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 opacity-60">
              Overview
            </div>
          )}
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        </section>

        {/* Bridges Section */}
        <section>
          {!isCollapsed && (
            <div className="px-6 mb-3 text-[11px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 opacity-60">
              Bridges
            </div>
          )}
          <div className="space-y-0.5">
            <NavItem to="/ViewBridge" icon={FolderOpen} label="All Bridges" />
            <NavItem to="/AddBridge" icon={Plus} label="Add Bridge" />
          </div>
        </section>

        {/* Maintenance Section */}
        <section>
          {!isCollapsed && (
            <div className="px-6 mb-3 text-[11px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 opacity-60">
              Maintenance
            </div>
          )}
          <div className="space-y-0.5">
            <NavItem to="/Predict" icon={ActivitySquare} label="Analysis" />
            <NavItem to="/Recommendation" icon={ClipboardList} label="Suggestions" />
            <NavItem to="/ViewMaintenance" icon={FolderOpen} label="History" />
          </div>
        </section>

        {/* Settings Section */}
        <section>
          {!isCollapsed && (
            <div className="px-6 mb-3 text-[11px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 opacity-60">
              Settings
            </div>
          )}
          <div className="space-y-0.5">
            <NavItem to="/ViewUser" icon={Settings} label="Users" />
            <NavItem to="/AddUser" icon={Plus} label="Add User" />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className={`mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 w-full ${isCollapsed ? 'px-0' : 'px-6'}`}>
        <Link
          to="/"
          className={`flex items-center text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl transition-all duration-300 font-bold group ${isCollapsed ? 'justify-center p-3 mx-4' : 'px-4 py-3'}`}
          title={isCollapsed ? 'Sign Out' : ''}
        >
          <LogOut size={isCollapsed ? 18 : 16} className={`${isCollapsed ? '' : 'mr-3'} group-hover:-translate-x-1 transition-transform`} />
          {!isCollapsed && <span className="text-base">Sign Out</span>}
        </Link>
        {!isCollapsed && (
          <p className="mt-4 text-[9px] text-center text-slate-400 font-medium tracking-widest opacity-50 uppercase animate-in fade-in duration-700">
            v4.1.0-Stabilized
          </p>
        )}
      </div>
    </div>
  );
}


export default Slidebar;