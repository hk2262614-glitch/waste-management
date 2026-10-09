import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Truck, Recycle, FileBarChart, Leaf } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/pickups', icon: Truck, label: 'Pickups' },
  { to: '/segregation', icon: Recycle, label: 'Segregation' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="w-10 h-10 rounded-xl gradient-eco flex items-center justify-center shadow-md shadow-eco-500/30">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient">EcoWaste</h1>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase">Management System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              end={item.to === '/'}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom card */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gradient-to-br from-eco-500/10 to-eco-600/10 dark:from-eco-400/10 dark:to-eco-500/10 rounded-2xl p-4 border border-eco-200/50 dark:border-eco-700/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-eco-500 animate-pulse-soft"></div>
              <span className="text-xs font-semibold text-eco-700 dark:text-eco-400 uppercase tracking-wider">System Status</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
            <div className="mt-3 w-full bg-eco-100 dark:bg-eco-900/30 rounded-full h-1.5">
              <div className="bg-eco-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
