import React, { useState, useEffect, useMemo } from 'react';
import {
  FaTractor, FaSeedling, FaTint, FaLeaf, FaSprayCan, FaCalendarAlt, FaFilter, FaPlus,
  FaEye, FaEdit, FaTrash, FaTimes, FaExclamationTriangle, FaSun, FaCloudRain, FaCloudSun,
  FaWind, FaDownload, FaThermometerHalf, FaTint as FaHumidity, FaCheckCircle, FaClock,
  FaMapMarkerAlt, FaSortAmountDown, FaSortAmountUp, FaSearch, FaClipboardList, FaLayerGroup,
  FaStickyNote, FaHistory, FaStar
} from 'react-icons/fa';
import { apiFetch } from "../utils/api";
import dashboardBg from "../assets/farm-bg.jpeg";
import { API_BASE } from '../config';

const ENDPOINT = `${API_BASE}/api/activities`;
const getToken = () => localStorage.getItem("token");

/* --- Configurations --- */
const activityTypes = ['Sowing', 'Irrigation', 'Pesticide Application', 'Fertilizer Application', 'Harvest'];
const fields = ['Field A', 'Field B', 'Field C', 'Field D'];
const crops = ['Corn', 'Wheat', 'Rice', 'Soybean', 'Cotton', 'Potato', 'Tomato', 'Onion', 'Carrot', 'Lettuce'];
const priorities = ['low', 'medium', 'high', 'critical'];
const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Partly Cloudy', 'Stormy'];

const activityConfig = {
  'Sowing': { icon: FaSeedling, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
  'Irrigation': { icon: FaTint, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
  'Pesticide Application': { icon: FaLeaf, color: 'text-lime-600', bg: 'bg-lime-100', border: 'border-lime-200' },
  'Fertilizer Application': { icon: FaSprayCan, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
  'Harvest': { icon: FaTractor, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' }
};

const priorityConfig = {
  low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  high: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  critical: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' }
};

const weatherConfig = {
  Sunny: { icon: FaSun, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  Cloudy: { icon: FaCloudSun, color: 'text-gray-500', bg: 'bg-gray-50' },
  Rainy: { icon: FaCloudRain, color: 'text-blue-500', bg: 'bg-blue-50' },
  Windy: { icon: FaWind, color: 'text-gray-400', bg: 'bg-gray-50' },
  'Partly Cloudy': { icon: FaCloudSun, color: 'text-gray-400', bg: 'bg-gray-50' },
  Stormy: { icon: FaCloudRain, color: 'text-indigo-600', bg: 'bg-indigo-50' }
};

const defaultFormData = () => ({
  activityType: '', fieldName: '', crop: '', date: new Date().toISOString().split('T')[0],
  notes: '', priority: 'medium', weather: '', temperature: '', humidity: '', location: '', customCrop: '',
  area: '', seedType: '', seedQuantity: '', sowingMethod: '', waterAmount: '', irrigationMethod: '',
  productName: '', dosage: '', reason: '', yieldQuantity: '', qualityGrade: '', marketPrice: '', completed: false
});

/* --- Activity Timeline Component --- */
const ActivityTimeline = ({ activities, onToggleComplete, onView, onEdit, onDelete }) => {
  return (
    <div className="relative py-4">
      {/* Global Timeline Line */}
      {activities.length > 0 && (
        <div className="absolute left-5 sm:left-[1.5rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-200 via-teal-200 to-gray-200 rounded-full"></div>
      )}

      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const config = activityConfig[activity.activityType] || activityConfig['Harvest'];
            const ActivityIcon = config.icon;
            const pStyle = priorityConfig[activity.priority];
            const isPending = !activity.completed;

            return (
              <div key={activity.id} className={`group relative pl-12 sm:pl-24 transition-all duration-500 animate-slideIn`}>

                {/* Timeline Connectors */}
                <div className={`absolute left-0 sm:left-6 top-0 w-10 sm:w-12 h-full flex flex-col items-center pointer-events-none`}>
                  {/* The Node */}
                  <div className={`relative z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 bg-white ${isPending ? 'border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)] scale-110' : 'border-gray-200 grayscale opacity-80'}`}>
                    <ActivityIcon className={`text-[10px] sm:text-base ${isPending ? config.color : 'text-gray-400'}`} />
                    {isPending && <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></span>}
                  </div>
                </div>

                {/* Card Content - Glassmorphism & Gradient Border */}
                <div className={`relative rounded-[2rem] p-[2px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isPending ? 'bg-gradient-to-br from-white to-emerald-50 hover:from-emerald-400 hover:to-teal-400' : 'bg-white hover:bg-gray-50'}`}>
                  {/* Inner Card */}
                  <div className={`relative h-full bg-white rounded-[1.9rem] p-4 sm:p-5 overflow-hidden`}>
                    {/* Decorative bg shape */}
                    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${isPending ? 'from-emerald-50 to-teal-50' : 'from-gray-50 to-gray-100'} rounded-full blur-3xl opacity-60 pointer-events-none`}></div>

                    <div className="relative z-10 flex flex-col gap-2">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1">
                          {/* Title & Priority */}
                          <div className="flex items-center gap-3">
                            <h3 className={`text-lg font-black tracking-tighter ${isPending ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                              {activity.activityType}
                            </h3>
                            <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${pStyle.bg} ${pStyle.text} ${pStyle.border}`}>
                              {activity.priority}
                            </span>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-gray-500">
                            <span className="flex items-center gap-2 group-hover:text-emerald-600 transition-colors">
                              <FaCalendarAlt className={isPending ? "text-emerald-400" : "text-gray-300"} />
                              {new Date(activity.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                              <FaMapMarkerAlt className={isPending ? "text-blue-400" : "text-gray-300"} />
                              {activity.fieldName}
                            </span>
                          </div>
                        </div>

                        {/* Toggle Button */}
                        <button
                          onClick={() => onToggleComplete(activity.id)}
                          className={`relative overflow-hidden px-3 py-1.5 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 border-2 ${activity.completed ? 'bg-gray-50 text-gray-400 border-gray-100' : 'bg-white text-emerald-600 border-emerald-100 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20'}`}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {activity.completed ? <><FaCheckCircle /> Completed</> : <><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Mark Done</>}
                          </span>
                        </button>
                      </div>

                      {/* Content Body */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100/50">
                        <div className="flex-1 space-y-2">
                          {activity.notes && (
                            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium italic relative">
                              <FaStickyNote className="absolute -top-3 left-4 text-gray-300 bg-white px-1" />
                              "{activity.notes}"
                            </div>
                          )}

                          {/* Badges/Chips */}
                          <div className="flex flex-wrap gap-2">
                            {activity.weather && (
                              <span className="px-2 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-bold border border-orange-100 flex items-center gap-1.5">
                                <FaSun className="text-orange-400" /> {activity.weather}
                              </span>
                            )}
                            {activity.temperature && (
                              <span className="px-2 py-1 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 flex items-center gap-1.5">
                                <FaThermometerHalf /> {activity.temperature}
                              </span>
                            )}
                            {activity.crop && (
                              <span className="px-2 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold border border-green-100 flex items-center gap-1.5">
                                <FaSeedling /> {activity.crop}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions Toolbar */}
                        <div className="flex sm:flex-col items-center justify-end gap-2 sm:pl-4 sm:border-l sm:border-gray-100">
                          <button onClick={() => onView(activity)} className="w-9 h-9 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-blue-500/30" title="View Details"><FaEye /></button>
                          {!activity.completed && (
                            <button onClick={() => onEdit(activity)} className="w-9 h-9 rounded-2xl flex items-center justify-center bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all shadow-sm hover:shadow-amber-500/30" title="Edit"><FaEdit /></button>
                          )}
                          <button onClick={() => onDelete(activity)} className="w-9 h-9 rounded-2xl flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-red-500/30" title="Delete"><FaTrash /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-gray-50 mb-4 animate-bounce">
            <FaClipboardList className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-xl font-black text-gray-400">No Activities Logged</h3>
          <p className="text-gray-400 text-sm mt-1">Start by adding your first field task.</p>
        </div>
      )}
    </div>
  );
};
/* --- Simplified Modals --- */
const ModalOverlay = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
    <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col relative animate-scaleIn">
      {children}
    </div>
  </div>
);

const InputField = ({ label, icon: Icon, name, type = "text", placeholder, options, className = "", formData, handleInputChange, isViewMode }) => (
  <div className={`group ${className}`}>
    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-emerald-600 transition-colors">{label}</label>
    <div className="relative transition-all duration-300">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="text-gray-300 group-focus-within:text-emerald-500 transition-colors text-lg" />
      </div>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`block w-full pl-12 pr-4 py-4 text-gray-700 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none font-bold cursor-pointer shadow-sm group-focus-within:shadow-md ${isViewMode ? 'opacity-70 pointer-events-none bg-gray-100' : ''}`}
          disabled={isViewMode}
        >
          <option value="">Select {label}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`block w-full pl-12 pr-4 py-4 text-gray-700 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-bold shadow-sm group-focus-within:shadow-md placeholder-gray-300 ${isViewMode ? 'opacity-70 pointer-events-none bg-gray-100' : ''}`}
          disabled={isViewMode}
        />
      )}
    </div>
  </div>
);

const ActivityFormModal = ({ isOpen, currentActivity, formData, setFormData, onClose, onSubmit, isViewMode }) => {
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const fetchWeatherData = async () => {
    if (!formData.location) {
      alert("Please enter a location (City or Village) first.");
      return;
    }

    setIsFetchingWeather(true);
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!API_KEY) throw new Error("API Key missing");

      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formData.location)}&appid=${API_KEY}&units=metric`);

      if (!res.ok) throw new Error("Location not found");

      const data = await res.json();
      const main = data.weather?.[0]?.main;

      // Map API weather to our options
      let mappedWeather = 'Sunny';
      if (main === 'Clouds') mappedWeather = 'Cloudy';
      else if (main === 'Rain' || main === 'Drizzle') mappedWeather = 'Rainy';
      else if (main === 'Thunderstorm') mappedWeather = 'Stormy';
      else if (main === 'Wind') mappedWeather = 'Windy';

      setFormData(prev => ({
        ...prev,
        weather: mappedWeather,
        temperature: `${Math.round(data.main.temp)}°C`,
        humidity: `${data.main.humidity}%`
      }));
    } catch (error) {
      console.error(error);
      alert("Could not fetch weather. " + (error.message || ""));
    } finally {
      setIsFetchingWeather(false);
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative bg-gradient-to-r from-teal-900 via-emerald-800 to-green-900 min-h-[120px] flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-[100px] -mr-20 -mt-20"></div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${isViewMode ? 'bg-blue-400' : (currentActivity ? 'bg-amber-400' : 'bg-emerald-400')} ${!isViewMode && 'animate-pulse'} shadow-[0_0_10px_currentColor]`}></span>
            <span className="text-emerald-200/70 text-xs font-black tracking-[0.2em] uppercase">
              {isViewMode ? 'Read Only' : (currentActivity ? 'System Command' : 'Input Protocol')}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white flex items-center justify-center gap-4 tracking-tighter">
            {isViewMode ? <FaEye className="text-emerald-400" /> : (currentActivity ? <FaEdit className="text-emerald-400" /> : <FaPlus className="text-emerald-400" />)}
            {isViewMode ? 'ACTIVITY DETAILS' : (currentActivity ? 'EDIT RECORD' : 'NEW ENTRY')}
          </h2>
        </div>

        <button onClick={onClose} className="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-100 hover:text-white rounded-2xl p-3 transition-colors backdrop-blur-sm border border-emerald-500/20 shadow-lg">
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex-1 overflow-y-auto bg-gray-50/80 p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

          {/* LEFT COLUMN: Unified Form Card */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-white/50">

            {/* Section 1: Core Data */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 text-gray-400 flex items-center justify-center shadow-inner">
                  <span className="font-black text-lg">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">Core Specifications</h3>
                  <p className="text-gray-400 text-sm font-medium">Essential parameters for this activity</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputField label="Activity Type" name="activityType" icon={FaTractor} options={activityTypes} className="md:col-span-2" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                <InputField label="Select Field" name="fieldName" icon={FaMapMarkerAlt} options={fields} formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                <div className="md:col-span-1">
                  {formData.crop === 'Other' ? (
                    <div className="group animate-fadeIn">
                      <label className="block text-xs font-extrabold text-emerald-600 uppercase tracking-widest mb-2 ml-1">Manual Crop Entry</label>
                      <div className="relative transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaSeedling className="text-emerald-500 text-lg" />
                        </div>
                        <input
                          type="text"
                          name="customCrop"
                          value={formData.customCrop}
                          onChange={handleInputChange}
                          placeholder="Type crop name..."
                          autoFocus
                          className="block w-full pl-12 pr-10 py-4 text-gray-700 bg-white border-2 border-emerald-500/20 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-bold shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, crop: '', customCrop: '' }))}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                          title="Back to list"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <InputField label="Target Crop" name="crop" icon={FaSeedling} options={[...crops, 'Other']} formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                  )}
                </div>
                <InputField label="Execution Date" name="date" type="date" icon={FaCalendarAlt} formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                <InputField label="Priority Level" name="priority" icon={FaExclamationTriangle} options={priorities} formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
              </div>
            </div>

            {/* Section 2: Dynamic Data (Conditional) */}
            {formData.activityType && (
              <div className="mb-10 animate-fadeIn">
                <div className="h-px bg-gray-100 mb-10"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                    <span className="font-black text-lg">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">{formData.activityType} Metrics</h3>
                    <p className="text-gray-400 text-sm font-medium">Specific data points for this task</p>
                  </div>
                </div>

                <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {formData.activityType === 'Sowing' && (
                      <>
                        <InputField label="Seed Variety" name="seedType" icon={FaSeedling} placeholder="e.g. Hybrid-A" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                        <InputField label="Quantity Used" name="seedQuantity" icon={FaLayerGroup} placeholder="e.g. 50 kg" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                        <InputField label="Coverage Area" name="area" icon={FaMapMarkerAlt} placeholder="Acres" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                      </>
                    )}
                    {formData.activityType === 'Irrigation' && (
                      <>
                        <InputField label="Volume" name="waterAmount" icon={FaTint} placeholder="Liters" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                        <InputField label="Methodology" name="irrigationMethod" icon={FaLayerGroup} placeholder="e.g. Drip" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                      </>
                    )}
                    {(formData.activityType === 'Pesticide Application' || formData.activityType === 'Fertilizer Application') && (
                      <>
                        <InputField label="Product Name" name="productName" icon={FaSprayCan} placeholder="Product Name" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                        <InputField label="Dosage / Mix" name="dosage" icon={FaTint} placeholder="e.g. 500ml" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                      </>
                    )}
                    {formData.activityType === 'Harvest' && (
                      <>
                        <InputField label="Total Yield" name="yieldQuantity" icon={FaTractor} placeholder="Total Yield" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                        <InputField label="Market Price" name="marketPrice" icon={FaSortAmountUp} placeholder="Market Price" formData={formData} handleInputChange={handleInputChange} isViewMode={isViewMode} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Notes */}
            <div className="mb-2">
              <div className="h-px bg-gray-100 mb-10"></div>
              <div className="group">
                <label className="flex items-center gap-3 mb-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest group-focus-within:text-emerald-600 transition-colors">
                  <FaStickyNote size={14} />
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="block w-full p-6 text-gray-700 bg-gray-50 border border-gray-100 rounded-3xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium placeholder-gray-400 resize-none shadow-inner"
                  placeholder="Type any observations, issues, or reminders here..."
                ></textarea>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar (Context & Actions) */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Live Environment Widget */}
            <div className="rounded-[2.5rem] p-1 bg-gradient-to-b from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/20">
              <div className="bg-white/10 backdrop-blur-xl rounded-[2.3rem] p-6 text-white border-t border-white/20">
                <div className="flex items-center justify-between mb-8 opacity-80">
                  <div className="flex items-center gap-2 text-xs font-black tracking-widest uppercase">
                    <FaCloudSun /> Environment
                  </div>
                  {isFetchingWeather && <div className="animate-spin h-3 w-3 border-2 border-white/50 border-t-white rounded-full"></div>}
                </div>

                <div className="relative mb-8 group">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Find Location..."
                    className="w-full bg-black/20 group-hover:bg-black/30 text-white placeholder-blue-200/40 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-white/30 transition-all font-bold tracking-wide border border-white/5"
                  />
                  <FaSearch className="absolute left-4 top-5 text-white/30" />
                  <button
                    type="button"
                    onClick={fetchWeatherData}
                    className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  >
                    <FaSearch className="text-xs" />
                  </button>
                </div>

                {/* Weather Stats Display */}
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-5xl font-black tracking-tighter">{formData.temperature || '--'}</div>
                      <div className="text-blue-200 font-bold tracking-wide mt-1">{formData.weather || 'No Data'}</div>
                    </div>
                    <div className="text-4xl opacity-50 mb-2">
                      <FaSun />
                    </div>
                  </div>
                  <div className="h-px bg-white/10"></div>
                  <div className="flex justify-between items-center text-sm font-medium opacity-80">
                    <span>Humidity</span>
                    <span className="font-bold">{formData.humidity || '--'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Completion Toggle */}
            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex-1 flex flex-col justify-center">
              <div
                onClick={() => setFormData(prev => ({ ...prev, completed: !prev.completed }))}
                className={`cursor-pointer group relative overflow-hidden rounded-[2rem] p-1 transition-all duration-500 ${formData.completed ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30' : 'bg-gray-100'}`}
              >
                <div className="bg-white rounded-[1.8rem] p-6 flex flex-col items-center justify-center text-center gap-4 transition-colors relative z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${formData.completed ? 'bg-emerald-100 text-emerald-500 scale-110' : 'bg-gray-100 text-gray-300'}`}>
                    <FaCheckCircle size={28} />
                  </div>
                  <div>
                    <div className={`font-black text-xl tracking-tight mb-1 ${formData.completed ? 'text-emerald-900' : 'text-gray-400'}`}>
                      {formData.completed ? 'COMPLETED' : 'IN PROGRESS'}
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {formData.completed ? 'Task Finalized' : 'Tap to Complete'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action */}
            {/* Primary Action - Hide in View Mode */}
            {!isViewMode && (
              <button
                type="submit"
                className="w-full py-6 rounded-[2rem] font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 active:scale-95 transition-all text-lg tracking-widest flex items-center justify-center gap-3 uppercase group"
              >
                <span>Save Record</span>
                <FaCheckCircle className="text-emerald-200 group-hover:scale-125 transition-transform" />
              </button>
            )}

          </div>
        </div>
      </form>
    </ModalOverlay>
  );
};

/* --- Main Page --- */
export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({ activityType: '', field: '', priority: '', status: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [formData, setFormData] = useState(defaultFormData());

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return;
      try {
        const res = await apiFetch(ENDPOINT);
        if (res.ok) {
          const data = await res.json();
          setActivities(data.map(a => ({ ...a, id: a._id, fieldName: a.field, yieldQuantity: a.yieldDisplay || "" })));
        }
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, field: formData.fieldName };

    // Handle Custom Crop
    if (payload.crop === 'Other') {
      if (!payload.customCrop || payload.customCrop.trim() === '') {
        alert('pls wrie crop name');
        return;
      }
      payload.crop = payload.customCrop;
    }

    delete payload.fieldName;
    delete payload.customCrop;
    // Basic cleanup
    if (payload.area) payload.area = Number(payload.area);
    if (payload.yieldQuantity) payload.yield = Number(String(payload.yieldQuantity).replace(/[^0-9.]/g, ''));

    try {
      const res = await apiFetch(currentActivity ? `${ENDPOINT}/${currentActivity.id}` : ENDPOINT, {
        method: currentActivity ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        const mapped = { ...saved, id: saved._id, fieldName: saved.field, yieldQuantity: saved.yieldDisplay || "" };
        setActivities(prev => currentActivity ? prev.map(a => a.id === mapped.id ? mapped : a) : [mapped, ...prev]);
        setIsFormOpen(false);
      }
    } catch (err) { alert("Error saving activity"); }
  };

  const handleDelete = async (activity) => {
    if (!window.confirm("Delete this activity?")) return;
    try {
      await apiFetch(`${ENDPOINT}/${activity.id}`, { method: "DELETE" });
      setActivities(prev => prev.filter(a => a.id !== activity.id));
    } catch (e) { alert("Delete failed"); }
  };

  const handleToggleComplete = async (id) => {
    const activity = activities.find(a => a.id === id);
    if (!activity) return;

    try {
      const res = await apiFetch(`${ENDPOINT}/${id}`, { method: "PUT", body: JSON.stringify({ completed: !activity.completed }) });
      if (res.ok) {
        setActivities(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
      }
    } catch (e) { }
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      if (filters.activityType && a.activityType !== filters.activityType) return false;
      if (filters.field && a.fieldName !== filters.field) return false;
      if (filters.priority && a.priority !== filters.priority) return false;
      if (filters.status) {
        if (filters.status === 'pending' && a.completed) return false;
        if (filters.status === 'completed' && !a.completed) return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          a.activityType.toLowerCase().includes(query) ||
          a.field.toLowerCase().includes(query) ||
          (a.notes && a.notes.toLowerCase().includes(query)) ||
          (a.crop && a.crop.toLowerCase().includes(query))
        );
      }
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activities, filters, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header aligned with Dashboard */}
      {/* Header aligned with Dashboard */}
      <div className="relative w-full mb-10">
        <div
          className="relative bg-cover bg-center h-[45vh] md:h-[55vh] flex items-center justify-center"
          style={{
            backgroundImage: `url(${dashboardBg})`,
            backgroundPosition: "center 35%"
          }}
        >
          {/* Minimal overlay ONLY for readability */}
          <div className="absolute inset-0 bg-black/25"></div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
              Farm Activity Log
            </h1>
            <p className="text-lg md:text-xl text-white drop-shadow-md">
              Track tasks, monitor progress, and optimize your farming schedule efficiently.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Controls & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col gap-6">

            {/* Search Bar - Full Width & Prominent */}
            <div className="relative group w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 group-hover:text-emerald-500 transition-colors text-xl" />
              <input
                type="text"
                placeholder="Search activities, fields, or notes..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl font-bold text-lg text-gray-700 placeholder-gray-400 outline-none transition-all shadow-inner group-hover:bg-white group-hover:shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 w-full xl:w-auto flex-1">
                <div className="relative group flex-1 min-w-[140px]">
                  <FaFilter className="absolute left-3 top-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-600 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-100"
                    value={filters.activityType}
                    onChange={e => setFilters({ ...filters, activityType: e.target.value })}
                  >
                    <option value="">All Types</option>
                    {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="relative group flex-1 min-w-[140px]">
                  <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-600 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-100"
                    value={filters.field}
                    onChange={e => setFilters({ ...filters, field: e.target.value })}
                  >
                    <option value="">All Fields</option>
                    {fields.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div className="relative group flex-1 min-w-[140px]">
                  <FaExclamationTriangle className="absolute left-3 top-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-600 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-100"
                    value={filters.priority}
                    onChange={e => setFilters({ ...filters, priority: e.target.value })}
                  >
                    <option value="">All Priorities</option>
                    {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>

                <div className="relative group flex-1 min-w-[140px]">
                  <FaCheckCircle className="absolute left-3 top-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-600 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-100"
                    value={filters.status}
                    onChange={e => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <button onClick={() => { setFormData(defaultFormData()); setCurrentActivity(null); setIsViewMode(false); setIsFormOpen(true); }}
                className="w-full xl:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95 whitespace-nowrap"
              >
                <FaPlus className="text-emerald-200" /> New Entry
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1 relative z-10">Total Activities</h3>
            <div className="text-4xl font-black text-gray-800 relative z-10">{activities.length}</div>
            <div className="text-xs font-bold text-gray-400 mt-2 flex items-center gap-2 relative z-10">
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{activities.filter(a => a.completed).length} Done</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">{activities.filter(a => !a.completed).length} Pending</span>
            </div>
          </div>
        </div>

        {/* Timeline View Only */}
        <ActivityTimeline
          activities={filteredActivities}
          onToggleComplete={handleToggleComplete}
          onView={(a) => {
            setCurrentActivity(a);
            setFormData({ ...a, fieldName: a.field, yieldQuantity: a.yieldDisplay || "", completed: Boolean(a.completed) });
            setIsViewMode(true);
            setIsFormOpen(true);
          }}
          onEdit={(a) => {
            setCurrentActivity(a);
            setFormData({ ...a, fieldName: a.field, yieldQuantity: a.yieldDisplay || "", completed: Boolean(a.completed) });
            setIsViewMode(false);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
        />

        <ActivityFormModal
          isOpen={isFormOpen}
          currentActivity={currentActivity}
          formData={formData}
          setFormData={setFormData}
          isViewMode={isViewMode}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      </div >
    </div >
  );
}