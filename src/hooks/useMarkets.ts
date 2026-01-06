import { useState, useEffect } from 'react';
import {
  getTopCoins,
  getWhaleActivity,
  getLiquidations,
  getCoinDetails,
  getCoinChart,
  Coin,
  WhaleActivity,
  Liquidation,
  CoinDetails,
  ChartDataPoint,
} from '../services/marketApi';

// Hook for top coins
export function useTopCoins() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const coins = await getTopCoins();
        setData(coins);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Hook for whale tracker
export function useWhaleTracker() {
  const [data, setData] = useState<WhaleActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const activity = await getWhaleActivity();
        setData(activity);
      } catch (err) {
        setError('Failed to fetch whale activity');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Hook for liquidations
export function useLiquidations(window: '1h' | '24h') {
  const [data, setData] = useState<Liquidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const liquidations = await getLiquidations(window);
        setData(liquidations);
      } catch (err) {
        setError('Failed to fetch liquidations data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [window]);

  return { data, loading, error };
}

// Hook for coin details
export function useCoinDetails(symbol: string) {
  const [data, setData] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await getCoinDetails(symbol);
        setData(details);
      } catch (err) {
        setError('Failed to fetch coin details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  return { data, loading, error };
}

// Hook for coin chart
export function useCoinChart(symbol: string, range: '24h' | '7d' | '1m' | '1y') {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const chartData = await getCoinChart(symbol, range);
        setData(chartData);
      } catch (err) {
        setError('Failed to fetch chart data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol, range]);

  return { data, loading, error };
}
