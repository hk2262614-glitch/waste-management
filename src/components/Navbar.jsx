import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Moon, Sun, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { notifications as notifData } from '../data/mockData';

export default function Navbar({ onMenuClick }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifData.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 glass border-b border-gray-200/80 dark:border-gray-700/50 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            id="menu-toggle"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="relative hidden sm:block max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800/80 rounded-xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-eco-500/40 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 border border-transparent focus:border-eco-500/30"
              id="search-input"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
            id="dark-mode-toggle"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              id="notification-btn"
            >
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in">
                <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Notifications</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifData.map((n) => (
                    <div
                      key={n.id}
                      className={`px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-700/30 ${
                        !n.read ? 'bg-eco-50/30 dark:bg-eco-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? 'bg-eco-500' : 'bg-transparent'}`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700">
                  <button className="text-xs font-medium text-eco-600 dark:text-eco-400 hover:text-eco-700 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              id="profile-btn"
            >
              <div className="w-8 h-8 rounded-lg gradient-eco flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                A
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">Admin</p>
                <p className="text-[11px] text-gray-400">admin@ecowaste.io</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in">
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                  </button>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600 dark:text-red-400">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
