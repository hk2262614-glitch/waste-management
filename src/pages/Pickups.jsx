import { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Trash2 } from 'lucide-react';
import { pickups as initialPickups, users } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const wasteTypes = ['Organic', 'Plastic', 'Metal', 'Hazardous', 'Paper', 'Glass'];

export default function Pickups() {
  const [pickupList, setPickupList] = useState(initialPickups);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ userId: '', date: '', time: '', wasteType: 'Organic' });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.userId || !form.date || !form.time) return;
    const user = users.find(u => u.id === parseInt(form.userId));
    const newPickup = {
      id: Math.max(...pickupList.map(p => p.id)) + 1,
      userId: parseInt(form.userId),
      userName: user?.name || 'Unknown',
      date: form.date,
      time: form.time,
      wasteType: form.wasteType,
      status: 'Pending',
      weight: '—',
    };
    setPickupList([newPickup, ...pickupList]);
    setForm({ userId: '', date: '', time: '', wasteType: 'Organic' });
    setShowForm(false);
  };

  const removePickup = (id) => {
    setPickupList(pickupList.filter(p => p.id !== id));
  };

  if (loading) return <LoadingState message="Loading pickups..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Pickup Scheduling</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Schedule and manage waste collection pickups</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" id="schedule-pickup-btn">
          <Plus className="w-4 h-4" />
          Schedule Pickup
        </button>
      </div>

      {/* Schedule Form */}
      {showForm && (
        <div className="card animate-scale-in border-eco-200 dark:border-eco-700/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">New Pickup</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Select User</label>
              <select
                className="input-field"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                required
              >
                <option value="">Choose user...</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  className="input-field pl-10"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="time"
                  className="input-field pl-10"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Waste Type</label>
              <select
                className="input-field"
                value={form.wasteType}
                onChange={(e) => setForm({ ...form, wasteType: e.target.value })}
              >
                {wasteTypes.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex gap-3 pt-2">
              <button type="submit" className="btn-primary">Schedule</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Pickups */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Upcoming Pickups</h2>
        {pickupList.length === 0 ? (
          <EmptyState title="No pickups scheduled" description="Schedule a new pickup using the button above." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full" id="pickups-table">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3.5 text-left">User</th>
                  <th className="px-6 py-3.5 text-left">Date</th>
                  <th className="px-6 py-3.5 text-left">Time</th>
                  <th className="px-6 py-3.5 text-left">Type</th>
                  <th className="px-6 py-3.5 text-left">Weight</th>
                  <th className="px-6 py-3.5 text-left">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pickupList.map((pickup) => (
                  <tr key={pickup.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="table-cell font-medium text-gray-900 dark:text-gray-100">{pickup.userName}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {pickup.date}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {pickup.time}
                      </div>
                    </td>
                    <td className="table-cell">{pickup.wasteType}</td>
                    <td className="table-cell">{pickup.weight}</td>
                    <td className="table-cell">
                      <StatusBadge status={pickup.status} />
                    </td>
                    <td className="table-cell text-right">
                      {pickup.status === 'Pending' && (
                        <button
                          onClick={() => removePickup(pickup.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                          title="Cancel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
