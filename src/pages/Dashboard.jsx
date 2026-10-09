import { useState, useEffect } from 'react';
import { TrendingUp, Truck, Recycle, Users, Leaf, ArrowUpRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { dashboardStats, collectionTrends, categoryDistribution, recentActivity } from '../data/mockData';
import LoadingState from '../components/LoadingState';

const statCards = [
  { label: 'Total Collected', value: `${(dashboardStats.totalCollected / 1000).toFixed(1)}t`, change: '+12.5%', icon: TrendingUp, gradient: 'from-eco-400 to-eco-600', shadow: 'shadow-eco-500/25' },
  { label: 'Pickups Today', value: dashboardStats.pickupsToday, change: '+3', icon: Truck, gradient: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/25' },
  { label: 'Recycling Rate', value: `${dashboardStats.recyclingRate}%`, change: '+2.1%', icon: Recycle, gradient: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/25' },
  { label: 'Active Users', value: dashboardStats.activeUsers, change: '+8', icon: Users, gradient: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-500/25' },
  { label: 'CO₂ Saved', value: `${(dashboardStats.co2Saved / 1000).toFixed(1)}t`, change: '+15.3%', icon: Leaf, gradient: 'from-teal-400 to-teal-600', shadow: 'shadow-teal-500/25' },
  { label: 'Pending Pickups', value: dashboardStats.pendingPickups, change: '-5', icon: Activity, gradient: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/25' },
];

const activityIcons = { success: '✅', info: 'ℹ️', warning: '⚠️' };

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingState message="Loading dashboard..." />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's your waste management overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="card group hover:-translate-y-1" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.change.startsWith('+') ? 'text-eco-600 dark:text-eco-400' : 'text-red-500'}`}>
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Area Chart - Collection Trends */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Collection Trends</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly waste collection by category</p>
            </div>
            <select className="input-field w-auto text-sm py-2 px-3">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={collectionTrends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPlastic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gMetal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px 16px',
                }}
              />
              <Area type="monotone" dataKey="organic" stroke="#22c55e" strokeWidth={2.5} fill="url(#gOrganic)" name="Organic" />
              <Area type="monotone" dataKey="plastic" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gPlastic)" name="Plastic" />
              <Area type="monotone" dataKey="metal" stroke="#f59e0b" strokeWidth={2.5} fill="url(#gMetal)" name="Metal" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Category Distribution</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current month breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {categoryDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} stroke="none" />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
                formatter={(value) => [`${value} kg`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-lg">{activityIcons[item.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.action}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.user}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
