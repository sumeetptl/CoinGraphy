import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Bell } from 'lucide-react';
import Navigation from './Navigation';

interface Notification {
  id: string;
  type: 'trade' | 'portfolio';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: 'up' | 'down' | 'alert' | 'check';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'trade',
    title: 'New Live Trade: ETH/USDT',
    message: 'A new buy signal has been posted for ETH/USDT. Entry zone: ₹3,35,000 - ₹3,42,000',
    timestamp: '2024-01-18T10:30:00',
    read: false,
    icon: 'up',
  },
  {
    id: '2',
    type: 'trade',
    title: 'Trade Hit Take Profit: SOL/USDT',
    message: 'Your SOL/USDT short position hit take profit at ₹23,000. Profit: +13.2%',
    timestamp: '2024-01-17T14:45:00',
    read: false,
    icon: 'check',
  },
  {
    id: '3',
    type: 'portfolio',
    title: 'Concentration Risk Alert',
    message: '68% of your portfolio is concentrated in Bitcoin. Consider diversifying.',
    timestamp: '2024-01-16T09:15:00',
    read: true,
    icon: 'alert',
  },
  {
    id: '4',
    type: 'trade',
    title: 'Trade Update: BTC/USDT',
    message: 'BTC approaching entry zone. Current price: ₹84,50,000',
    timestamp: '2024-01-15T16:20:00',
    read: true,
    icon: 'up',
  },
  {
    id: '5',
    type: 'portfolio',
    title: 'Portfolio Up 24h',
    message: 'Your portfolio increased by ₹10,240 (+2.4%) in the last 24 hours.',
    timestamp: '2024-01-15T08:00:00',
    read: true,
    icon: 'check',
  },
  {
    id: '6',
    type: 'trade',
    title: 'Trade Closed: MATIC/USDT',
    message: 'MATIC/USDT buy closed with profit: +13.28% (₹17)',
    timestamp: '2024-01-14T11:30:00',
    read: true,
    icon: 'check',
  },
  {
    id: '7',
    type: 'portfolio',
    title: 'Market Volatility Warning',
    message: 'High volatility detected across your holdings. Review your stop losses.',
    timestamp: '2024-01-13T13:45:00',
    read: true,
    icon: 'alert',
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'trade' | 'portfolio'>('all');

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'alert': return AlertCircle;
      case 'check': return CheckCircle;
      default: return Bell;
    }
  };

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'up': return 'bg-green-100 text-green-600';
      case 'down': return 'bg-red-100 text-red-600';
      case 'alert': return 'bg-yellow-100 text-yellow-600';
      case 'check': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-gray-600">
              {unreadCount} unread notification{unreadCount !== 1 && 's'}
            </p>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('trade')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'trade'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Trade Alerts
          </button>
          <button
            onClick={() => setFilter('portfolio')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'portfolio'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Portfolio Alerts
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No notifications to show</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.icon);
              return (
                <div
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification.id)}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
                    notification.read
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.icon)}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`${notification.read ? 'text-gray-900' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{formatTime(notification.timestamp)}</span>
                        <span>•</span>
                        <span className="capitalize">{notification.type} alert</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900 text-center">
            Enable browser notifications to get real-time alerts for trades and portfolio changes.
          </p>
        </div>
      </div>
    </div>
  );
}
