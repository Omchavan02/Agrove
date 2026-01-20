import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api"; // adjust path if needed
import { API_BASE } from '../config';
import dashboardBg from "../assets/dashboard-bg.jpeg"; // adjust path if needed




import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#6366F1"];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);


  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await apiFetch(`${API_BASE}/api/dashboard`);

        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const [isChartReady, setIsChartReady] = useState(false);
  useEffect(() => {
    // Delay chart rendering slightly to ensure layout is ready
    const timer = setTimeout(() => setIsChartReady(true), 100);
    return () => clearTimeout(timer);
  }, []);




  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!dashboard || dashboard.metrics.totalFields === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No activity data yet. Add activities to see dashboard insights.
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* ---------- HEADER ---------- */}
      {/* ---------- CRISP HERO HEADER (NO BLUR) ---------- */}
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
              Expert Agricultural Dashboard
            </h1>

            <p className="text-lg md:text-xl text-white drop-shadow-md">
              Personalized crop and soil dashboard to maximize your yield.
            </p>
          </div>
        </div>
      </div>


      {/* ---------- METRIC CARDS ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card
          title="Total Fields"
          value={dashboard.metrics.totalFields}
          icon="🏞️"
          trend="+2"
          bgColor="bg-blue-50"
        />
        <Card
          title="Total Area"
          value={`${dashboard.metrics.totalArea} acres`}
          icon="📐"
          trend="+5%"
          bgColor="bg-emerald-50"
        />
        <Card
          title="Active Crops"
          value={dashboard.metrics.activeCrops}
          icon="🌱"
          trend="+3"
          bgColor="bg-amber-50"
        />
        <Card
          title="Total Yield"
          value={`${dashboard.metrics.totalYield} t`}
          icon="📦"
          trend="+12%"
          bgColor="bg-purple-50"
        />
      </div>

      {/* ---------- GRAPHS ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GraphCard title="Crop Distribution by Area">
          {isChartReady && dashboard.cropDistribution && dashboard.cropDistribution.length > 0 ? (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboard.cropDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {dashboard.cropDistribution.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} acres`, 'Area']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <NoData />
          )}
        </GraphCard>


        <GraphCard
          title="Monthly Yield Trend"
          subtitle="Tonnes produced per month"
        >
          {isChartReady && dashboard.monthlyYield && dashboard.monthlyYield.length > 0 ? (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="99%" height="100%">
                <LineChart
                  data={dashboard.monthlyYield}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} t`, 'Yield']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="yield"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <NoData />
          )}
        </GraphCard>


        <GraphCard title="Crop-wise Yield Performance">
          {isChartReady && dashboard.cropWiseYield && dashboard.cropWiseYield.some(i => i.yield > 0) ? (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={dashboard.cropWiseYield.filter(i => i.yield > 0)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="crop"
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280', fontSize: 12, angle: -45, textAnchor: 'end', dy: 20 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} t`, 'Yield']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar
                    dataKey="yield"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <NoData />
          )}
        </GraphCard>


        <GraphCard title="Seasonal Activity Timeline">
          {isChartReady && dashboard.seasonalTimeline && dashboard.seasonalTimeline.length > 0 ? (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="99%" height="100%">
                <LineChart
                  data={dashboard.seasonalTimeline}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} activities`, 'Count']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <NoData />
          )}
        </GraphCard>

      </div>

      {/* ---------- FIELD TABLE ---------- */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Field Management</h2>
              <p className="text-gray-600 text-sm mt-1">Overview of all farming fields</p>
            </div>

          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Field</th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Crop</th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Area (acres)</th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Health</th>
                <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboard.fields.map((f, i) => (

                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-emerald-500 mr-3"></div>
                      <span className="font-medium text-gray-800">{f.field}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="mr-2">{getCropEmoji(f.crop)}</span>
                      <span className="text-gray-700">{f.crop}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{f.area?.toLocaleString() || 'N/A'}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${f.health === 'Excellent' ? 'bg-emerald-100 text-emerald-800' :
                      f.health === 'Good' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                      {f.health || "N/A"}

                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${f.status === 'Planted' ? 'bg-blue-100 text-blue-800' :
                      f.status === 'Growing' ? 'bg-emerald-100 text-emerald-800' :
                        f.status === 'Harvesting' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {f.status ?? "Active"}


                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
          Showing {dashboard.fields.length} field
          {dashboard.fields.length !== 1 ? 's' : ''}

        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Card = ({ title, value, icon, trend, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
    {trend && (
      <div className="flex items-center text-sm">
        <span className="text-emerald-600 font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {trend}
        </span>
        <span className="text-gray-500 ml-2">from last month</span>
      </div>
    )}
  </div>
);

const GraphCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const NoData = () => (
  <div className="h-72 flex flex-col items-center justify-center text-gray-400">
    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="text-lg">No data available</p>
    <p className="text-sm mt-1">Add some activities to see analytics</p>
  </div>
);

const getCropEmoji = (crop) => {
  const cropEmojis = {
    'Wheat': '🌾',
    'Corn': '🌽',
    'Rice': '🍚',
    'Soybean': '🟫',
    'Cotton': '🧵',
    'Vegetables': '🥬',
    'Fruits': '🍎'
  };
  return cropEmojis[crop] || '🌱';
};