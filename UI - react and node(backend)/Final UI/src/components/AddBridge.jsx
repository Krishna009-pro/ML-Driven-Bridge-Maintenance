import React from 'react'
import { Building2, MapPin, Ruler, HardHat, Gauge, Calendar, Navigation } from 'lucide-react';

const AddBridge = () => {
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
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
              Asset <span className="text-sky-500">Inventory</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Digital instrumentation and geographical registration of new infrastructure.</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 bg-[length:200%_auto] animate-gradient"></div>

        <form action="http://localhost:8080/Bridge%20Maintenance/AddBridge" method="post" className="p-10 lg:p-14 space-y-12">

          {/* Identity Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Navigation size={18} className="text-sky-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Structural Identity</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <InputWrapper label="Functional Designation" icon={Building2}>
                  <input type="text" name="BridgeName" id="BridgeName" className={inputClasses} placeholder='Ex: Golden Gate Expansion North' required />
                </InputWrapper>
              </div>
              <InputWrapper label="Commission Date" icon={Calendar}>
                <input type="date" name="ConstructionDate" className={inputClasses} required />
              </InputWrapper>
            </div>
          </section>

          {/* Location & Specs Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">

            {/* Left: Geographical */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <MapPin size={18} className="text-sky-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Positioning</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputWrapper label="Lattitude Coords">
                  <input type="text" name="Lattitude" className={inputClasses} placeholder='37.8199' required />
                </InputWrapper>
                <InputWrapper label="Longitude Coords">
                  <input type="text" name="Longitude" className={inputClasses} placeholder='-122.4783' required />
                </InputWrapper>
                <div className="sm:col-span-2">
                  <InputWrapper label="Speed Regulation (Km/h)" icon={Gauge}>
                    <input type="number" step="any" name="SpeedLimit" className={inputClasses} placeholder='60' />
                  </InputWrapper>
                </div>
              </div>
            </section>

            {/* Right: Technical */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <Ruler size={18} className="text-sky-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Dimensions</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <InputWrapper label="Length (m)">
                  <input type="number" step="any" name="Length" className={inputClasses} placeholder='0.0' />
                </InputWrapper>
                <InputWrapper label="Width (m)">
                  <input type="number" step="any" name="Width" className={inputClasses} placeholder='0.0' />
                </InputWrapper>
                <InputWrapper label="Height (m)">
                  <input type="number" step="any" name="Height" className={inputClasses} placeholder='0.0' />
                </InputWrapper>
                <InputWrapper label="Beams (qty)">
                  <input type="number" name="NOOfBeams" className={inputClasses} placeholder='0' />
                </InputWrapper>
                <InputWrapper label="Slab (m)">
                  <input type="number" step="any" name="SlabThickness" className={inputClasses} placeholder='0.0' />
                </InputWrapper>
                <InputWrapper label="Surface (m²)">
                  <input type="number" name="BearSurfaceArea" className={inputClasses} placeholder='0' />
                </InputWrapper>
              </div>
            </section>
          </div>

          {/* Engineering & Capacities */}
          <section className="space-y-8">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <HardHat size={18} className="text-sky-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Engineering Specs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InputWrapper label="Rated Load (Tons)">
                <input type="number" step="any" name="RatedLoadCapacity" className={inputClasses} placeholder='500.0' />
              </InputWrapper>
              <InputWrapper label="Concrete Specification">
                <select name="ConcreteType" className={`${inputClasses} appearance-none cursor-pointer`} defaultValue="" >
                  <option value="" hidden>CHOOSE TYPE...</option>
                  <option value="High-Strength">H-STRENGTH REINFORCED</option>
                  <option value="Normal">STANDARD GRADE</option>
                  <option value="Self-Consolidating">SELF-CONSOLIDATING</option>
                </select>
              </InputWrapper>
              <InputWrapper label="Structural Design">
                <select name="DesignType" className={`${inputClasses} appearance-none cursor-pointer`} defaultValue="" >
                  <option value="" hidden>CHOOSE DESIGN...</option>
                  <option value="Truss">TRUSS SYSTEM</option>
                  <option value="Cable-Stayed">CABLE-STAYED</option>
                  <option value="Suspension">SUSPENSION</option>
                  <option value="Arch">ARCH BRIDGE</option>
                  <option value="Beam">BEAM BRIDGE</option>
                </select>
              </InputWrapper>
            </div>
          </section>

          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-grow py-5 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white font-bold rounded-2xl shadow-2xl shadow-sky-500/10 hover:shadow-sky-500/30 hover:-translate-y-1 active:translate-y-0 transition-all text-sm uppercase tracking-[0.2em]"
            >
              Verify & Register Asset
            </button>
            <button
              type="reset"
              className="px-10 py-5 bg-slate-900/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-white font-bold rounded-2xl hover:bg-slate-500 dark:hover:bg-slate-700/50 transition-all text-xs uppercase tracking-widest"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Custom Styles for Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
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

export default AddBridge
