// Market API service layer with stub data for The Real Crypto G

export interface Coin {
  symbol: string;
  name: string;
  price: number;
  priceUsd: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  rank: number;
}

export interface WhaleActivity {
  id: string;
  coin: string;
  symbol: string;
  direction: 'Long' | 'Short';
  size: number;
  timestamp: string;
  exchange: string;
}

export interface Liquidation {
  coin: string;
  symbol: string;
  longLiquidations: number;
  shortLiquidations: number;
  biggestLiquidation: number;
}

export interface CoinDetails {
  symbol: string;
  name: string;
  price: number;
  priceUsd: number;
  change24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  volume24h: number;
  treasuryHoldings: number | null;
  description: string;
}

export interface ChartDataPoint {
  timestamp: number;
  price: number;
}

// Mock data for top 10 coins
const MOCK_TOP_COINS: Coin[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 8628480,
    priceUsd: 103500,
    change24h: 2.35,
    marketCap: 172500000000,
    volume24h: 28500000000,
    rank: 1,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 338784,
    priceUsd: 4065,
    change24h: -1.24,
    marketCap: 48900000000,
    volume24h: 15200000000,
    rank: 2,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: 83.28,
    priceUsd: 1.00,
    change24h: 0.01,
    marketCap: 95800000000,
    volume24h: 52100000000,
    rank: 3,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 25344,
    priceUsd: 304,
    change24h: 5.67,
    marketCap: 13200000000,
    volume24h: 4850000000,
    rank: 4,
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 54096,
    priceUsd: 649,
    change24h: 1.89,
    marketCap: 9420000000,
    volume24h: 1920000000,
    rank: 5,
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 208,
    priceUsd: 2.50,
    change24h: 3.42,
    marketCap: 7850000000,
    volume24h: 5240000000,
    rank: 6,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: 83.28,
    priceUsd: 1.00,
    change24h: 0.00,
    marketCap: 42300000000,
    volume24h: 8940000000,
    rank: 7,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 120,
    priceUsd: 1.44,
    change24h: -2.15,
    marketCap: 5120000000,
    volume24h: 1850000000,
    rank: 8,
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 4331,
    priceUsd: 52,
    change24h: 4.23,
    marketCap: 4680000000,
    volume24h: 1240000000,
    rank: 9,
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    price: 916,
    priceUsd: 11,
    change24h: -0.85,
    marketCap: 3920000000,
    volume24h: 890000000,
    rank: 10,
  },
];

// Mock whale activity data
const MOCK_WHALE_ACTIVITY: WhaleActivity[] = [
  {
    id: '1',
    coin: 'Bitcoin',
    symbol: 'BTC',
    direction: 'Long',
    size: 8500000,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    exchange: 'Hyperliquid',
  },
  {
    id: '2',
    coin: 'Ethereum',
    symbol: 'ETH',
    direction: 'Short',
    size: 3200000,
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    exchange: 'Hyperliquid',
  },
  {
    id: '3',
    coin: 'Solana',
    symbol: 'SOL',
    direction: 'Long',
    size: 1850000,
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    exchange: 'Hyperliquid',
  },
  {
    id: '4',
    coin: 'Bitcoin',
    symbol: 'BTC',
    direction: 'Short',
    size: 5400000,
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    exchange: 'Hyperliquid',
  },
  {
    id: '5',
    coin: 'BNB',
    symbol: 'BNB',
    direction: 'Long',
    size: 980000,
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    exchange: 'Hyperliquid',
  },
];

// Mock liquidations data
const MOCK_LIQUIDATIONS_1H: Liquidation[] = [
  { coin: 'Bitcoin', symbol: 'BTC', longLiquidations: 12500000, shortLiquidations: 8200000, biggestLiquidation: 2800000 },
  { coin: 'Ethereum', symbol: 'ETH', longLiquidations: 5400000, shortLiquidations: 3800000, biggestLiquidation: 1200000 },
  { coin: 'Solana', symbol: 'SOL', longLiquidations: 2100000, shortLiquidations: 1850000, biggestLiquidation: 580000 },
  { coin: 'BNB', symbol: 'BNB', longLiquidations: 980000, shortLiquidations: 720000, biggestLiquidation: 340000 },
  { coin: 'Ripple', symbol: 'XRP', longLiquidations: 1240000, shortLiquidations: 890000, biggestLiquidation: 420000 },
];

const MOCK_LIQUIDATIONS_24H: Liquidation[] = [
  { coin: 'Bitcoin', symbol: 'BTC', longLiquidations: 185000000, shortLiquidations: 142000000, biggestLiquidation: 15200000 },
  { coin: 'Ethereum', symbol: 'ETH', longLiquidations: 78000000, shortLiquidations: 62000000, biggestLiquidation: 8400000 },
  { coin: 'Solana', symbol: 'SOL', longLiquidations: 32000000, shortLiquidations: 28500000, biggestLiquidation: 4200000 },
  { coin: 'BNB', symbol: 'BNB', longLiquidations: 15800000, shortLiquidations: 12400000, biggestLiquidation: 2800000 },
  { coin: 'Ripple', symbol: 'XRP', longLiquidations: 18500000, shortLiquidations: 14200000, biggestLiquidation: 3100000 },
];

// Mock coin details
const COIN_DETAILS: { [key: string]: CoinDetails } = {
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 8628480,
    priceUsd: 103500,
    change24h: 2.35,
    marketCap: 172500000000,
    circulatingSupply: 19800000,
    totalSupply: 19800000,
    maxSupply: 21000000,
    volume24h: 28500000000,
    treasuryHoldings: null,
    description: 'Bitcoin is the first decentralized cryptocurrency. It was created in 2009 by an unknown person or group using the name Satoshi Nakamoto. Bitcoin operates on a peer-to-peer network and uses blockchain technology to record transactions. It is the most widely recognized and valuable cryptocurrency, often referred to as "digital gold." Bitcoin can be used for payments, as a store of value, and as an investment asset.',
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 338784,
    priceUsd: 4065,
    change24h: -1.24,
    marketCap: 48900000000,
    circulatingSupply: 120300000,
    totalSupply: 120300000,
    maxSupply: 0,
    volume24h: 15200000000,
    treasuryHoldings: null,
    description: 'Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (dApps). Launched in 2015 by Vitalik Buterin and others, Ethereum introduced the concept of programmable blockchain. Its native cryptocurrency, Ether (ETH), is used to pay for transaction fees and computational services. Ethereum has become the foundation for DeFi, NFTs, and countless blockchain innovations.',
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    price: 25344,
    priceUsd: 304,
    change24h: 5.67,
    marketCap: 13200000000,
    circulatingSupply: 585000000,
    totalSupply: 585000000,
    maxSupply: 0,
    volume24h: 4850000000,
    treasuryHoldings: null,
    description: 'Solana is a high-performance blockchain platform designed for fast, secure, and scalable decentralized applications. Founded by Anatoly Yakovenko in 2020, Solana uses a unique Proof-of-History consensus mechanism combined with Proof-of-Stake to achieve extremely high throughput—capable of processing thousands of transactions per second. SOL is the native token used for transaction fees, staking, and governance on the network.',
  },
};

// API functions
export async function getTopCoins(): Promise<Coin[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_TOP_COINS;
}

export async function getWhaleActivity(): Promise<WhaleActivity[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_WHALE_ACTIVITY;
}

export async function getLiquidations(window: '1h' | '24h'): Promise<Liquidation[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return window === '1h' ? MOCK_LIQUIDATIONS_1H : MOCK_LIQUIDATIONS_24H;
}

export async function getCoinDetails(symbol: string): Promise<CoinDetails> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const details = COIN_DETAILS[symbol.toUpperCase()];
  if (!details) {
    // Return a default coin if not found
    const coin = MOCK_TOP_COINS.find(c => c.symbol === symbol.toUpperCase());
    if (coin) {
      return {
        ...coin,
        circulatingSupply: 0,
        totalSupply: 0,
        maxSupply: 0,
        treasuryHoldings: null,
        description: `${coin.name} is a cryptocurrency. Detailed information is not available at this time.`,
      };
    }
    throw new Error('Coin not found');
  }
  
  return details;
}

export async function getCoinChart(symbol: string, range: '24h' | '7d' | '1m' | '1y'): Promise<ChartDataPoint[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const coin = MOCK_TOP_COINS.find(c => c.symbol === symbol.toUpperCase());
  if (!coin) throw new Error('Coin not found');
  
  // Generate mock chart data based on range
  const points: { [key: string]: number } = {
    '24h': 24,
    '7d': 168,
    '1m': 720,
    '1y': 365,
  };
  
  const numPoints = points[range];
  const basePrice = coin.price;
  const data: ChartDataPoint[] = [];
  
  const now = Date.now();
  const intervalMs = range === '24h' ? 3600000 : range === '7d' ? 3600000 : range === '1m' ? 3600000 : 86400000;
  
  for (let i = 0; i < numPoints; i++) {
    const timestamp = now - (numPoints - i) * intervalMs;
    // Create realistic price movement
    const volatility = 0.02; // 2% volatility
    const trend = coin.change24h / 100 / numPoints; // Distribute the 24h change
    const randomWalk = (Math.random() - 0.5) * volatility;
    const priceMultiplier = 1 + trend + randomWalk;
    const price = basePrice * priceMultiplier * (1 - (numPoints - i) * trend);
    
    data.push({ timestamp, price });
  }
  
  return data;
}
