import React from 'react'
import { UserPlus, Shield, Mail, Phone, Calendar, Camera, UserCheck } from 'lucide-react';

const AddUser = () => {
  const InputWrapper = ({ label, icon: Icon, children }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
        {Icon && <Icon size={12} className="text-sky-500" />}
        {label}
      </label>
      {children}
    </div>
  );

  const inputClasses = "w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-6xl mx-auto pb-20">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-sky-500/10 text-sky-500 rounded-2xl">
                <UserPlus size={24} />
            </div>
            <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                    Personnel <span className="text-sky-500">Boarding</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Provisioning and role assignment for system access control.</p>
            </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 bg-[length:200%_auto] animate-gradient"></div>
        
        <form action="http://localhost:8080/Bridge%20Maintenance/AddUser" method="post" encType="multipart/form-data" className="p-10 lg:p-14 space-y-12">
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            
            {/* Left: Security Credentials */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <Shield size={18} className="text-sky-500" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Security Credentials</h2>
                </div>
                <div className="space-y-6">
                    <InputWrapper label="System Username">
                        <input type="text" name="UserName" className={inputClasses} placeholder='Ex: j.doe_admin' required />
                    </InputWrapper>
                    <InputWrapper label="Access Password">
                        <input type="password" name="password" className={inputClasses} placeholder='••••••••' required />
                    </InputWrapper>
                    <InputWrapper label="Functional Role">
                        <select name="Role" className={`${inputClasses} appearance-none cursor-pointer`} defaultValue="" required>
                            <option value="" hidden>CHOOSE PRIVILEGE LEVEL...</option>
                            <option value="Admin">SYSTEM ADMINISTRATOR</option>
                            <option value="Engineer">STRUCTURAL ENGINEER</option>
                            <option value="Inspector">FIELD INSPECTOR</option>
                        </select>
                    </InputWrapper>
                </div>
            </section>

            {/* Right: Contact & Identity */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <UserCheck size={18} className="text-sky-500" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Personnel Identity</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                        <InputWrapper label="Primary Email Address" icon={Mail}>
                            <input type="email" name="EmailId" className={inputClasses} placeholder='j.doe@bridgesense.ai' required />
                        </InputWrapper>
                    </div>
                    <InputWrapper label="Contact Mobile" icon={Phone}>
                        <input type="text" name="ContactNo" className={inputClasses} placeholder='+1 234 567 890' required />
                    </InputWrapper>
                    <InputWrapper label="Date of Birth" icon={Calendar}>
                        <input type="date" name="BirthDate" className={inputClasses} />
                    </InputWrapper>
                </div>
            </section>
          </div>

          {/* Biometric/Profile Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Camera size={18} className="text-sky-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Biometric Verification</h2>
            </div>
            <div className="relative group transition-all max-w-2xl">
                <input 
                  type="file" 
                  name="image" 
                  className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="w-full px-8 py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center group-hover:border-sky-500 group-hover:bg-sky-500/5 transition-all">
                    <div className="bg-slate-50 dark:bg-slate-800/50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-sky-500 group-hover:scale-110 transition-all">
                        <Camera size={24} />
                    </div>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Upload Personnel Profile Image</span>
                    <p className="text-xs text-slate-400 mt-1 font-medium italic">Standard identification format (JPG, PNG) required.</p>
                </div>
            </div>
          </section>

          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit" 
              className="flex-grow py-5 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white font-black rounded-2xl shadow-2xl shadow-sky-500/10 hover:shadow-sky-500/30 hover:-translate-y-1 active:translate-y-0 transition-all text-sm uppercase tracking-[0.2em]"
            >
              Confirm Personnel Onboarding
            </button>
            <button 
              type="reset" 
              className="px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-xs uppercase tracking-widest"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}} />
    </div>
  )
}

export default AddUser
