import { useState, useEffect } from 'react';
import { wasteCategories } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';

export default function Segregation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingState message="Loading waste data..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Waste Segregation</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor waste categories and collection status</p>
      </div>

      {/* Summary bar */}
      <div className="card flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-eco-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Collected:{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {wasteCategories.reduce((sum, c) => sum + c.collected, 0).toLocaleString()} kg
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Capacity:{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {wasteCategories.reduce((sum, c) => sum + c.capacity, 0).toLocaleString()} kg
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Categories: <span className="font-bold text-gray-900 dark:text-white">{wasteCategories.length}</span>
          </span>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wasteCategories.map((cat, i) => {
          const percentage = Math.round((cat.collected / cat.capacity) * 100);
          return (
            <div
              key={cat.id}
              className="card group hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
                  </div>
                </div>
                <StatusBadge status={cat.status} />
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{cat.collected.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/ {cat.capacity.toLocaleString()} {cat.unit}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${percentage > 80 ? 'text-red-500' : percentage > 60 ? 'text-amber-500' : 'text-eco-600 dark:text-eco-400'}`}>
                    {percentage}% filled
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(cat.capacity - cat.collected).toLocaleString()} {cat.unit} remaining
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
