import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import login_img from './images/login_bridge.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      if (response.data.success) {
        setLoginStatus('Login successful!');
        navigate('/dashboard');
      } else {
        setLoginStatus('Invalid username or password');
      }
    } catch (error) {
      setLoginStatus('Error during login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-500 overflow-hidden font-inter">
      {/* Left Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 relative z-10">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:rotate-12 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              BridgeSense <span className="text-slate-400 dark:text-slate-500 font-light">AI</span>
            </h1>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400">Precision monitoring for a safer infrastructure.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors">Forgot Password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none hover:-translate-y-0.5 transition-all text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Log In"}
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
            
            {loginStatus && (
              <p className={`text-center font-medium mt-4 animate-bounce ${loginStatus.includes('successful') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {loginStatus}
              </p>
            )}
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              © 2026 BridgeSense AI. Built for structural longevity.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Image */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src={login_img}
          alt="Modern Bridge"
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/80 via-indigo-900/60 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16 text-white p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl animate-in fade-in slide-in-from-right-12 duration-1000">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">Intelligent Bridge <br/> Structural Analysis.</h2>
          <p className="text-sky-100 text-lg opacity-90 leading-relaxed font-light">
            Leveraging neural networks and machine learning to predict industrial bridge lifespan with 99.2% accuracy across global datasets.
          </p>
          <div className="flex gap-4 mt-8">
            <div className="h-1 w-12 bg-sky-400 rounded-full"></div>
            <div className="h-1 w-4 bg-white/40 rounded-full"></div>
            <div className="h-1 w-4 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
