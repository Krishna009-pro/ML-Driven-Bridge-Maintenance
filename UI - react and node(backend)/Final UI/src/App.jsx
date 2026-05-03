import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

// Components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddBridge from "./components/AddBridge";
import Slidebar from "./components/Slidebar";
import Report from "./components/Report";
import Loading from './components/Loading';
import BridgeInfo from "./components/BridgeInfo";
import ViewBridge from "./components/ViewBridge";
import AddUser from "./components/AddUser";
import ViewUser from "./components/ViewUser";
import Predict from "./components/Predict";
import Recommendation from "./components/Recommendation";
import PredictMaintenance from "./components/PredictMaintenance";
import AssignMaintenance from "./components/AssignMaintenance";
import ViewMaintenance from "./components/ViewMaintenance";

const Layout = ({ children, isDarkMode, toggleTheme }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === 'true';
  });

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebar_collapsed', newState);
  };

  return (
    <div className="flex min-h-screen w-full text-slate-900 dark:text-slate-50 transition-colors duration-500">
      {/* Sidebar - Fixed Position for Absolute Stability */}
      <aside className={`fixed left-0 top-0 h-screen transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-slate-200 dark:border-slate-800/80 shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-50 overflow-y-auto custom-scrollbar ${isSidebarCollapsed ? 'w-24' : 'w-84'}`}>
        <Slidebar isCollapsed={isSidebarCollapsed} toggleCollapse={toggleSidebar} />
      </aside>

      {/* Main Content Area - Shifted Right by Sidebar Width */}
      <div className={`flex-grow min-h-screen flex flex-col relative z-20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarCollapsed ? 'ml-24' : 'ml-84'}`}>
        {/* Top Floating Header for Theme Toggle */}
        <div className="flex justify-end p-6 sticky top-0 right-0 z-40 pointer-events-none">
            <button 
                onClick={toggleTheme}
                className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl hover:shadow-sky-500/10 hover:border-sky-500/50 transition-all duration-300 group pointer-events-auto"
                title="Toggle View Mode"
            >
                {isDarkMode ? (
                    <Sun size={20} className="text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
                ) : (
                    <Moon size={20} className="text-slate-500 group-hover:-rotate-12 transition-transform duration-500" />
                )}
            </button>
        </div>

        <main className="flex-grow px-8 py-8 scroll-smooth">
          <div className="w-full mx-auto animate-slow-fade">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const [images, setImages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Pass theme props to Layout */}
        <Route path="/dashboard" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><Dashboard /></Layout>} />
        <Route path="/AddBridge" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><AddBridge /></Layout>} />
        <Route path="/ViewBridge" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><ViewBridge /></Layout>} />
        <Route path="/AddUser" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><AddUser /></Layout>} />
        <Route path="/ViewUser" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><ViewUser /></Layout>} />
        <Route path="/Predict" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><Predict /></Layout>} />
        <Route path="/Recommendation" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><Recommendation /></Layout>} />
        <Route path="/Report" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><Report /></Layout>} />
        <Route path="/AssignMaintenance" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><AssignMaintenance /></Layout>} />
        <Route path="/Loading" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><Loading imagesmain={images} /></Layout>} />
        <Route path="/PredictMaintenance" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><PredictMaintenance setImages={setImages} /></Layout>} />
        <Route path="/BridgeInfo" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><BridgeInfo /></Layout>} />
        <Route path="/ViewMaintenance" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><ViewMaintenance /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;