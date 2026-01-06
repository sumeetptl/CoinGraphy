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
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
          <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/auth" />} />
          <Route path="/dashboard" element={user?.onboardingComplete ? <Dashboard /> : <Navigate to="/onboarding" />} />
          <Route path="/insights" element={user?.onboardingComplete ? <InsightsDetail /> : <Navigate to="/auth" />} />
          <Route path="/markets" element={user?.onboardingComplete ? <MarketsPageEnhanced /> : <Navigate to="/auth" />} />
          <Route path="/markets/:symbol" element={user?.onboardingComplete ? <CoinDetailPage /> : <Navigate to="/auth" />} />
          <Route path="/trades" element={user?.onboardingComplete ? <Trades /> : <Navigate to="/auth" />} />
          <Route path="/trades/:tradeId" element={user?.onboardingComplete ? <TradeDetail /> : <Navigate to="/auth" />} />
          <Route path="/trades/stats" element={user?.onboardingComplete ? <TradeStats /> : <Navigate to="/auth" />} />
          <Route path="/futures-stats" element={user?.onboardingComplete ? <FuturesStats /> : <Navigate to="/auth" />} />
          <Route path="/community-trade-ideas" element={user?.onboardingComplete ? <CommunityTradeIdeas /> : <Navigate to="/auth" />} />
          <Route path="/payments" element={user?.onboardingComplete ? <Payments /> : <Navigate to="/auth" />} />
          <Route path="/notifications" element={user?.onboardingComplete ? <Notifications /> : <Navigate to="/auth" />} />
          <Route path="/learn" element={user?.onboardingComplete ? <Learn /> : <Navigate to="/auth" />} />
          <Route path="/learn/:articleId" element={user?.onboardingComplete ? <LearnDetail /> : <Navigate to="/auth" />} />
          <Route path="/settings" element={user?.onboardingComplete ? <Settings /> : <Navigate to="/auth" />} />
          <Route path="/billing" element={user?.onboardingComplete ? <Billing /> : <Navigate to="/auth" />} />
          <Route path="/support" element={user?.onboardingComplete ? <Support /> : <Navigate to="/auth" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;