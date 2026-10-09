import { useState, useEffect } from 'react';
import { Download, Filter, TrendingUp, Truck, Recycle, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { monthlyReports, collectionTrends, categoryDistribution } from '../data/mockData';
import LoadingState from '../components/LoadingState';

const summaryCards = [
  { label: 'Total Collection', value: '34,810 kg', icon: TrendingUp, color: 'text-eco-600 dark:text-eco-400', bg: 'bg-eco-50 dark:bg-eco-900/20' },
  { label: 'Avg Pickups/Month', value: '277', icon: Truck, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Avg Recycling Rate', value: '71.8%', icon: Recycle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { label: 'Total CO₂ Saved', value: '10,503 kg', icon: Leaf, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20' },
];

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('6months');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => {
    alert('Report download started! (UI demonstration)');
  };

  if (loading) return <LoadingState message="Loading reports..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Analyze waste collection data and trends</p>
        </div>
        <button onClick={handleDownload} className="btn-primary" id="download-report-btn">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date Range</label>
            <select
              className="input-field"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
            <select
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="organic">Organic</option>
              <option value="plastic">Plastic</option>
              <option value="metal">Metal</option>
              <option value="hazardous">Hazardous</option>
              <option value="paper">Paper</option>
              <option value="glass">Glass</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn-secondary w-full justify-center">
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((stat, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart - Monthly Collection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Monthly Collection</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Total waste collected per month (kg)</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyReports} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v.split(' ')[0]} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="totalCollected" fill="url(#barGrad)" radius={[6, 6, 0, 0]} name="Collected (kg)" />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Recycling Rate */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Recycling Rate Trend</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Monthly recycling rate percentage</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyReports} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v.split(' ')[0]} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} domain={[60, 80]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="recyclingRate" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} name="Recycling %" />
              <Line type="monotone" dataKey="co2Saved" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="CO₂ Saved (kg)" yAxisId={0} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Monthly Summary</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full" id="reports-table">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-3.5 text-left">Month</th>
                <th className="px-6 py-3.5 text-left">Total Collected</th>
                <th className="px-6 py-3.5 text-left">Recycling Rate</th>
                <th className="px-6 py-3.5 text-left">Pickups</th>
                <th className="px-6 py-3.5 text-left">CO₂ Saved</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReports.map((report, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="table-cell font-medium text-gray-900 dark:text-gray-100">{report.month}</td>
                  <td className="table-cell">{report.totalCollected.toLocaleString()} kg</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-eco-500 h-2 rounded-full" style={{ width: `${report.recyclingRate}%` }}></div>
                      </div>
                      <span className="text-eco-600 dark:text-eco-400 font-semibold">{report.recyclingRate}%</span>
                    </div>
                  </td>
                  <td className="table-cell">{report.pickups}</td>
                  <td className="table-cell">{report.co2Saved.toLocaleString()} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
