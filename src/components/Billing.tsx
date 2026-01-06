import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Check, Download, X } from 'lucide-react';
import Navigation from './Navigation';
import { useApp } from '../App';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  invoiceNumber: string;
}

const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    date: '2024-01-01',
    amount: 999,
    status: 'Paid',
    invoiceNumber: 'INV-2024-001',
  },
  {
    id: '2',
    date: '2023-12-01',
    amount: 999,
    status: 'Paid',
    invoiceNumber: 'INV-2023-012',
  },
  {
    id: '3',
    date: '2023-11-01',
    amount: 999,
    status: 'Paid',
    invoiceNumber: 'INV-2023-011',
  },
];

export default function Billing() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const isSubscribed = user?.isSubscribed || false;

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to live trades.')) {
      if (user) {
        setUser({ ...user, isSubscribed: false });
      }
      navigate('/trades');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">
            Manage your subscription and view payment history
          </p>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Current Plan</h2>

          {isSubscribed ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900">Pro Subscription</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">₹999 per month</p>
                  <p className="text-sm text-gray-500">
                    Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-2xl text-gray-900">₹999/mo</div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Access all live trades & signals</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Full trade history and stats</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Priority updates on key market moves</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-colors">
                  <CreditCard className="w-4 h-4" />
                  Update payment method
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel subscription
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">Free Plan</h3>
              <p className="text-gray-600 mb-6">
                Upgrade to Pro to unlock live trades and signals
              </p>
              <Link
                to="/payments"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          )}
        </div>

        {/* Payment History */}
        {isSubscribed && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Payment History</h2>

            <div className="space-y-3">
              {MOCK_INVOICES.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div>
                    <div className="text-gray-900 mb-1">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(invoice.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-gray-900">₹{invoice.amount}</div>
                      <span
                        className={`text-sm ${
                          invoice.status === 'Paid'
                            ? 'text-green-600'
                            : invoice.status === 'Failed'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Need help with billing?</p>
          <Link to="/support" className="text-sm text-blue-600 hover:text-blue-700">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
