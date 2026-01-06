import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Trash2, CreditCard, HelpCircle } from 'lucide-react';
import Navigation from './Navigation';
import { useApp } from '../App';

export default function Settings() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || '');
  const [investmentGoal, setInvestmentGoal] = useState(user?.investmentGoal || '');
  const [riskComfort, setRiskComfort] = useState(user?.riskComfort || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      setUser({
        ...user,
        experienceLevel,
        investmentGoal,
        riskComfort,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      setUser(null);
      navigate('/');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-gray-900 mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Profile</h2>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm text-gray-700 mb-2">
                  Experience level
                </label>
                <select
                  id="experience"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm text-gray-700 mb-2">
                  Investment goal
                </label>
                <select
                  id="goal"
                  value={investmentGoal}
                  onChange={(e) => setInvestmentGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select investment goal</option>
                  <option value="Learn and explore">Learn and explore</option>
                  <option value="Grow wealth over time">Grow wealth over time</option>
                  <option value="Active trading">Active trading</option>
                </select>
              </div>

              <div>
                <label htmlFor="risk" className="block text-sm text-gray-700 mb-2">
                  Risk comfort
                </label>
                <select
                  id="risk"
                  value={riskComfort}
                  onChange={(e) => setRiskComfort(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select risk comfort</option>
                  <option value="Very cautious">Very cautious</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save changes
                </button>
                {saved && (
                  <span className="text-sm text-green-600">
                    Changes saved successfully
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Quick Links</h2>

            <div className="space-y-3">
              <Link
                to="/billing"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Billing & Subscription
              </Link>

              <Link
                to="/support"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                Support & Help
              </Link>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Account</h2>

            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>

              <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
              >
                <Trash2 className="w-5 h-5" />
                Delete account
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-900">
              <strong>Privacy note:</strong> Your data is stored locally in your browser. 
              The Real Crypto G does not collect or store personal information on external servers.
              This tool is for educational purposes only and does not provide investment or tax advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}