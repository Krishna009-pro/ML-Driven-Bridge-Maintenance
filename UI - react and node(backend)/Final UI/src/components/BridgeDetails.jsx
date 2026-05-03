import React from "react";
import { Link } from 'react-router-dom';
import BridgeCondition from './BridgeCondition'
import { useEffect, useState } from "react";
import axios from 'axios';
import MapComponent from "./Map"
import StructuralDetails from "./StructuralDetails";
import TrafficGraph from "./TrafficGraph"
import CorrosionPie from "./CorrosionPie";
import { Info, Map as MapIcon, BarChart3, Construction, ClipboardList } from 'lucide-react';

const BridgeDetails = ({ lifespan, maintenance, durability, id }) => {
  const [blocation, setbLocation] = useState(null);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const apikey = "AIzaSyDTQNbvuBY4eO-weY-EDw1U3xh1-w16RiA";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = "http://localhost:5000/api/BridgeData?id=" + id;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    axios.get('http://localhost:5000/api/MaintenanceData?id=' + id)
      .then((response) => setMaintenanceData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-8 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl text-rose-600 dark:text-rose-400">
        <h2 className="text-lg font-bold">Error Loading Report</h2>
        <p>{error}</p>
    </div>
  );

  const bridgeData = {
    name: data[0]?.["Name"] || "Unknown Bridge",
    yearBuilt: data[0]?.["Construction Date"]?.split("T")[0] || "N/A",
    designType: data[0]?.["Design Type"] || "N/A",
    dimensions: `${data[0]?.["Length"]}m (L) x ${data[0]?.["Width"]}m (W) x ${data[0]?.["Height"]}m (H)`,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzsa39Ct_wlG-0JAPqMIuZOyiJisvdO_Df_Q&s",
    lat: data[0]?.["Lattitude"],
    lng: data[0]?.["Longitude"]
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-8 font-inter">
      
      {/* Top Section: Header & Image */}
      <section className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row">
            <div className="p-8 lg:p-12 lg:w-3/5 space-y-6">
                <div className="flex items-center gap-3 text-sky-500 mb-2">
                    <Info size={20} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Structural Identity</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
                    {bridgeData.name}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Commencement Date</span>
                        <p className="text-slate-700 dark:text-slate-200 font-medium">{bridgeData.yearBuilt}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Architectural Type</span>
                        <p className="text-slate-700 dark:text-slate-200 font-medium">{bridgeData.designType}</p>
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Dimensional Footprint</span>
                        <p className="text-slate-700 dark:text-slate-200 font-medium">{bridgeData.dimensions}</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-2/5 h-[300px] lg:h-auto relative">
                <img
                    src={bridgeData.imageUrl}
                    alt={bridgeData.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white dark:to-[#0b0f19]/80 lg:block hidden"></div>
            </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-4 text-slate-900 dark:text-white font-bold">
            <MapIcon size={20} className="text-sky-500" />
            <h3>Geospatial Deployment</h3>
        </div>
        <div className="h-[400px] w-full rounded-3xl bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden grayscale-[40%] hover:grayscale-0 transition-all duration-1000">
            <MapComponent apiKey={apikey} bridgeLocation={{lat: bridgeData.lat, lng: bridgeData.lng}}/>
        </div>
      </section>

      {/* Middle Section: Structural & Atmospheric */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Structural Details Card */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-2 text-sky-500 font-bold border-b border-slate-100 dark:border-slate-800 pb-4">
                <Construction size={22} />
                <h2 className="uppercase text-sm tracking-widest">Structural Engineering Specs</h2>
            </div>
            <StructuralDetails 
                slab={data[0]?.["Slab Thickness"]} 
                beams={data[0]?.["No_Of_Beams"]} 
                load={data[0]?.["Rated_Load_Capacity"]} 
            />
        </div>

        {/* Analytics Section */}
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <div className="flex items-center gap-2 text-sky-500 font-bold mb-6">
                    <BarChart3 size={20} />
                    <h2 className="uppercase text-sm tracking-widest text-slate-500">Atmospheric Factor Analytics</h2>
                </div>
                <div className="h-[250px]">
                    <TrafficGraph data={[
                        { name: "NO2", sales: data[0]?.["Average NO2"] || 0 },
                        { name: "SO2", sales: data[0]?.["Minimum SO2"] || 0 },
                        { name: "CO", sales: data[0]?.["Average CO"] || 0 },
                        { name: "CO2", sales: data[0]?.["Average CO2"] || 0 }
                    ]} />
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <div className="flex items-center gap-2 text-sky-500 font-bold mb-6">
                    <BarChart3 size={20} />
                    <h2 className="uppercase text-sm tracking-widest text-slate-500">Dynamic Traffic Loading</h2>
                </div>
                <div className="h-[200px]">
                    <CorrosionPie 
                        min={data[0]?.["Minimum Traffic Load"]} 
                        max={data[0]?.["Maximum Traffic Load"]} 
                        avg={data[0]?.["Average Traffic Load"]} 
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Bridge Condition Analysis (AI Results) */}
      <section className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-sky-500 to-transparent"></div>
            <BridgeCondition 
                lifespan={Number(lifespan).toFixed(2)} 
                maintenance={maintenance} 
                durability={durability} 
            /> 
      </section>

      {/* Call to Action */}
      <div className="flex justify-center pb-12">
            <Link 
                to={`/AssignMaintenance?id=${id}&name=${data[0]?.["Name"]}&lifespan=${lifespan}&durability=${durability}`}
                className="group flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white rounded-2xl shadow-2xl shadow-sky-500/20 hover:shadow-sky-500/40 transition-all font-bold text-lg uppercase tracking-widest"
            >
                <ClipboardList size={24} />
                Deploy Maintenance Directive
            </Link>
      </div>
    </div>
  );
};

export default BridgeDetails;
