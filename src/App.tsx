import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext, ReactNode } from 'react';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import InsightsDetail from './components/InsightsDetail';
import MarketsPageEnhanced from './features/markets/MarketsPageEnhanced';
import CoinDetailPage from './features/markets/CoinDetailPage';
import Trades from './components/Trades';
import TradeDetail from './components/TradeDetail';
import TradeStats from './components/TradeStats';
import FuturesStats from './components/FuturesStats';
import CommunityTradeIdeas from './components/CommunityTradeIdeas';
import Payments from './components/Payments';
import Notifications from './components/Notifications';
import Learn from './components/Learn';
import LearnDetail from './components/LearnDetail';
import Settings from './components/Settings';
import Billing from './components/Billing';
import Support from './components/Support';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Types
export interface UserProfile {
  email: string;
  experienceLevel?: string;
  investmentGoal?: string;
  riskComfort?: string;
  onboardingComplete: boolean;
  isSubscribed?: boolean;
}

export interface Holding {
  id: string;
  coin: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
}

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  holdings: Holding[];
  setHoldings: (holdings: Holding[]) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  holdings: [],
  setHoldings: () => {},
});

export const useApp = () => useContext(AppContext);

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);

  return (
    <AppContext.Provider value={{ user, setUser, holdings, setHoldings }}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth routes - only accessible when not authenticated */}
          <Route element={<ProtectedRoute requireAuth={false} redirectTo="/dashboard" />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          {/* Onboarding route - only accessible when authenticated but onboarding not complete */}
          <Route element={
            <ProtectedRoute 
              requireAuth 
              requireOnboarding={false} 
              redirectTo={
                !user ? '/auth' : 
                user.onboardingComplete ? '/dashboard' : undefined
              } 
            />
          }>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insights" element={<InsightsDetail />} />
            <Route path="/markets" element={<MarketsPageEnhanced />} />
            <Route path="/markets/:symbol" element={<CoinDetailPage />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/trades/:tradeId" element={<TradeDetail />} />
            <Route path="/trades/stats" element={<TradeStats />} />
            <Route path="/futures-stats" element={<FuturesStats />} />
            <Route path="/community-trade-ideas" element={<CommunityTradeIdeas />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:articleId" element={<LearnDetail />} />
          </Route>

          {/* Settings - accessible after login, doesn't require onboarding */}
          <Route element={<ProtectedRoute requireAuth requireOnboarding={false} />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Routes that require both auth and onboarding */}
          <Route element={<ProtectedRoute requireOnboarding />}>
            <Route path="/billing" element={<Billing />} />
            <Route path="/support" element={<Support />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;