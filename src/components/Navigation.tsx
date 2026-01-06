import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, LayoutDashboard, BookOpen, Settings, Menu, X, Activity, Bell, BarChart2, Users } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../App';

export default function Navigation() {
  const location = useLocation();
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/markets', label: 'Markets', icon: BarChart2 },
    { path: '/trades', label: 'Trades', icon: Activity },
    { path: '/community-trade-ideas', label: 'Community', icon: Users },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 hidden sm:inline">The Real Crypto G</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}

            {/* Notifications Bell */}
            <Link
              to="/notifications"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
            </Link>

            {/* Profile Avatar */}
            <Link
              to="/settings"
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm"
            >
              {user?.email.charAt(0).toUpperCase()}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/notifications"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
                Notifications
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}