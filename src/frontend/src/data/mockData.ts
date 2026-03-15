// TODO: Replace all mock data with live API integrations
// FRED API: https://fred.stlouisfed.org/docs/api/
// Whale Alert: https://whale-alert.io/
// CoinGecko: https://www.coingecko.com/api/
// NewsAPI: https://newsapi.org/

export interface CountryLiquidity {
  country: string;
  flag: string;
  m2_growth: number;
  repo_rate: number;
  liquidity_score: number;
  trend: "up" | "down";
  change_24h: number;
}

export interface WhaleAlert {
  id: string;
  blockchain: "BTC" | "ETH" | "SOL";
  amount: number;
  usd_value: number;
  from_label: string;
  to_label: string;
  type: "exchange_inflow" | "exchange_outflow" | "transfer";
  timestamp: Date;
}

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  volume: number;
  market_cap: number;
  flow_direction: "up" | "down";
  category: "crypto" | "equity" | "commodity";
  sparkline: number[];
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface NewsItem {
  id: string;
  source: string;
  headline: string;
  sentiment_score: number;
  sentiment: "bullish" | "bearish" | "neutral";
  timestamp: Date;
  asset_symbol: string;
}

export interface Institution {
  id: string;
  filename: string;
  file_type: "13F Filing" | "Balance Sheet" | "ETF Flow";
  health_score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH";
  debt_equity: number;
  current_ratio: number;
  quick_ratio: number;
  assets_under_mgmt: string;
}

export const initialCountryLiquidity: CountryLiquidity[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    m2_growth: 4.2,
    repo_rate: 5.25,
    liquidity_score: 72,
    trend: "up",
    change_24h: 0.3,
  },
  {
    country: "Euro Zone",
    flag: "🇪🇺",
    m2_growth: 2.1,
    repo_rate: 4.5,
    liquidity_score: 61,
    trend: "down",
    change_24h: -0.2,
  },
  {
    country: "China",
    flag: "🇨🇳",
    m2_growth: 8.7,
    repo_rate: 3.45,
    liquidity_score: 84,
    trend: "up",
    change_24h: 0.8,
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    m2_growth: 2.8,
    repo_rate: 0.1,
    liquidity_score: 55,
    trend: "down",
    change_24h: -0.5,
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    m2_growth: 1.9,
    repo_rate: 5.0,
    liquidity_score: 48,
    trend: "down",
    change_24h: -0.1,
  },
  {
    country: "India",
    flag: "🇮🇳",
    m2_growth: 11.2,
    repo_rate: 6.5,
    liquidity_score: 78,
    trend: "up",
    change_24h: 1.2,
  },
];

export const initialWhaleAlerts: WhaleAlert[] = [
  {
    id: "w1",
    blockchain: "BTC",
    amount: 2847,
    usd_value: 184_500_000,
    from_label: "Unknown Wallet",
    to_label: "Binance",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "w2",
    blockchain: "ETH",
    amount: 45000,
    usd_value: 112_800_000,
    from_label: "Coinbase",
    to_label: "Unknown Wallet",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "w3",
    blockchain: "SOL",
    amount: 1_200_000,
    usd_value: 188_400_000,
    from_label: "Kraken",
    to_label: "Cold Storage",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 360000),
  },
  {
    id: "w4",
    blockchain: "BTC",
    amount: 1234,
    usd_value: 79_800_000,
    from_label: "Grayscale",
    to_label: "Grayscale Cold",
    type: "transfer",
    timestamp: new Date(Date.now() - 480000),
  },
  {
    id: "w5",
    blockchain: "ETH",
    amount: 28000,
    usd_value: 70_100_000,
    from_label: "Unknown Whale",
    to_label: "FTX Bankruptcy",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 600000),
  },
  {
    id: "w6",
    blockchain: "BTC",
    amount: 950,
    usd_value: 61_500_000,
    from_label: "OKX",
    to_label: "Unknown Wallet",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 720000),
  },
  {
    id: "w7",
    blockchain: "SOL",
    amount: 800_000,
    usd_value: 125_600_000,
    from_label: "Jump Crypto",
    to_label: "Bybit",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: "w8",
    blockchain: "ETH",
    amount: 15000,
    usd_value: 37_600_000,
    from_label: "Vitalik.eth",
    to_label: "Gitcoin",
    type: "transfer",
    timestamp: new Date(Date.now() - 1200000),
  },
  {
    id: "w9",
    blockchain: "BTC",
    amount: 605,
    usd_value: 39_200_000,
    from_label: "MicroStrategy",
    to_label: "Cold Wallet",
    type: "transfer",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "w10",
    blockchain: "ETH",
    amount: 9800,
    usd_value: 24_600_000,
    from_label: "Huobi",
    to_label: "Unknown Whale",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 2400000),
  },
  {
    id: "w11",
    blockchain: "SOL",
    amount: 500_000,
    usd_value: 78_500_000,
    from_label: "Alameda Remnant",
    to_label: "Binance",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "w12",
    blockchain: "BTC",
    amount: 412,
    usd_value: 26_700_000,
    from_label: "BlockFi Estate",
    to_label: "OKX",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "w13",
    blockchain: "ETH",
    amount: 6400,
    usd_value: 16_100_000,
    from_label: "Unknown Whale",
    to_label: "Unknown Wallet",
    type: "transfer",
    timestamp: new Date(Date.now() - 4200000),
  },
  {
    id: "w14",
    blockchain: "BTC",
    amount: 200,
    usd_value: 12_900_000,
    from_label: "Kraken",
    to_label: "Self-Custody",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 5400000),
  },
  {
    id: "w15",
    blockchain: "SOL",
    amount: 300_000,
    usd_value: 47_100_000,
    from_label: "Phantom Whale",
    to_label: "Coinbase Prime",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 6600000),
  },
  {
    id: "w16",
    blockchain: "ETH",
    amount: 4200,
    usd_value: 10_500_000,
    from_label: "DeFi Protocol",
    to_label: "Unknown Whale",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: "w17",
    blockchain: "BTC",
    amount: 105,
    usd_value: 6_800_000,
    from_label: "Swan Bitcoin",
    to_label: "Self-Custody",
    type: "transfer",
    timestamp: new Date(Date.now() - 9000000),
  },
  {
    id: "w18",
    blockchain: "SOL",
    amount: 150_000,
    usd_value: 23_500_000,
    from_label: "Bybit",
    to_label: "Unknown Wallet",
    type: "exchange_outflow",
    timestamp: new Date(Date.now() - 10800000),
  },
  {
    id: "w19",
    blockchain: "BTC",
    amount: 88,
    usd_value: 5_700_000,
    from_label: "Unknown Wallet",
    to_label: "Binance",
    type: "exchange_inflow",
    timestamp: new Date(Date.now() - 12600000),
  },
  {
    id: "w20",
    blockchain: "ETH",
    amount: 2200,
    usd_value: 5_500_000,
    from_label: "Maker Protocol",
    to_label: "Compound",
    type: "transfer",
    timestamp: new Date(Date.now() - 14400000),
  },
];

export const initialAssets: Asset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 64_782.5,
    change_24h: 2.34,
    volume: 28_400_000_000,
    market_cap: 1_270_000_000_000,
    flow_direction: "up",
    category: "crypto",
    sparkline: [58000, 60000, 59200, 62100, 61800, 63400, 64782],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2_514.8,
    change_24h: 1.87,
    volume: 14_200_000_000,
    market_cap: 302_000_000_000,
    flow_direction: "up",
    category: "crypto",
    sparkline: [2200, 2310, 2280, 2420, 2380, 2490, 2514],
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 156.92,
    change_24h: -1.23,
    volume: 2_800_000_000,
    market_cap: 72_000_000_000,
    flow_direction: "down",
    category: "crypto",
    sparkline: [165, 162, 168, 158, 161, 159, 156],
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.34,
    change_24h: 0.67,
    volume: 3_400_000_000,
    market_cap: 2_920_000_000_000,
    flow_direction: "up",
    category: "equity",
    sparkline: [184, 185, 187, 186, 188, 189, 189],
  },
  {
    symbol: "GOLD",
    name: "Gold Spot",
    price: 2_384.6,
    change_24h: -0.45,
    volume: 48_000_000_000,
    market_cap: 15_200_000_000_000,
    flow_direction: "down",
    category: "commodity",
    sparkline: [2410, 2405, 2395, 2390, 2385, 2388, 2384],
  },
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    price: 527.88,
    change_24h: 0.92,
    volume: 18_500_000_000,
    market_cap: 480_000_000_000,
    flow_direction: "up",
    category: "equity",
    sparkline: [510, 515, 518, 520, 524, 526, 527],
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 245.67,
    change_24h: -2.14,
    volume: 8_200_000_000,
    market_cap: 782_000_000_000,
    flow_direction: "down",
    category: "equity",
    sparkline: [268, 262, 255, 252, 248, 247, 245],
  },
];

export const initialOrderBook = {
  bids: [
    { price: 64750.0, size: 1.42, total: 1.42 },
    { price: 64720.0, size: 2.18, total: 3.6 },
    { price: 64700.0, size: 0.85, total: 4.45 },
    { price: 64680.0, size: 3.22, total: 7.67 },
    { price: 64650.0, size: 1.98, total: 9.65 },
    { price: 64620.0, size: 4.55, total: 14.2 },
    { price: 64590.0, size: 2.33, total: 16.53 },
    { price: 64560.0, size: 5.12, total: 21.65 },
    { price: 64530.0, size: 1.77, total: 23.42 },
    { price: 64500.0, size: 6.88, total: 30.3 },
  ],
  asks: [
    { price: 64800.0, size: 0.95, total: 0.95 },
    { price: 64830.0, size: 1.67, total: 2.62 },
    { price: 64860.0, size: 3.44, total: 6.06 },
    { price: 64890.0, size: 1.12, total: 7.18 },
    { price: 64920.0, size: 4.88, total: 12.06 },
    { price: 64950.0, size: 2.25, total: 14.31 },
    { price: 64980.0, size: 3.75, total: 18.06 },
    { price: 65010.0, size: 1.5, total: 19.56 },
    { price: 65040.0, size: 5.22, total: 24.78 },
    { price: 65070.0, size: 2.8, total: 27.58 },
  ],
};

export const initialNews: NewsItem[] = [
  {
    id: "n1",
    source: "Bloomberg",
    headline:
      "Federal Reserve signals potential rate cuts in Q3 2024 amid cooling inflation data",
    sentiment_score: 72,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 180000),
    asset_symbol: "SPY",
  },
  {
    id: "n2",
    source: "CoinDesk",
    headline:
      "Bitcoin ETF inflows surge to $500M daily as institutional demand accelerates",
    sentiment_score: 88,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 600000),
    asset_symbol: "BTC",
  },
  {
    id: "n3",
    source: "Reuters",
    headline:
      "China's property sector woes deepen as Evergrande liquidation order looms",
    sentiment_score: 18,
    sentiment: "bearish",
    timestamp: new Date(Date.now() - 1200000),
    asset_symbol: "GOLD",
  },
  {
    id: "n4",
    source: "WSJ",
    headline:
      "Apple reports record iPhone sales in emerging markets, beats Q1 estimates",
    sentiment_score: 81,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 2400000),
    asset_symbol: "AAPL",
  },
  {
    id: "n5",
    source: "CryptoSlate",
    headline:
      "Ethereum Layer-2 TVL hits all-time high of $45B as DeFi activity surges",
    sentiment_score: 79,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 3600000),
    asset_symbol: "ETH",
  },
  {
    id: "n6",
    source: "FT",
    headline:
      "Tesla Q1 deliveries miss estimates by 20% as EV competition intensifies",
    sentiment_score: 22,
    sentiment: "bearish",
    timestamp: new Date(Date.now() - 5400000),
    asset_symbol: "TSLA",
  },
  {
    id: "n7",
    source: "MarketWatch",
    headline:
      "Gold consolidates near record highs as dollar weakens on soft CPI print",
    sentiment_score: 55,
    sentiment: "neutral",
    timestamp: new Date(Date.now() - 7200000),
    asset_symbol: "GOLD",
  },
  {
    id: "n8",
    source: "Decrypt",
    headline:
      "Solana network processes record 65,000 TPS during memecoin trading frenzy",
    sentiment_score: 64,
    sentiment: "neutral",
    timestamp: new Date(Date.now() - 9000000),
    asset_symbol: "SOL",
  },
  {
    id: "n9",
    source: "CNBC",
    headline: "ECB holds rates steady, signals two cuts before year-end",
    sentiment_score: 62,
    sentiment: "neutral",
    timestamp: new Date(Date.now() - 10800000),
    asset_symbol: "SPY",
  },
  {
    id: "n10",
    source: "The Block",
    headline:
      "Blackrock Bitcoin ETF AUM crosses $20 billion milestone in record time",
    sentiment_score: 91,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 12600000),
    asset_symbol: "BTC",
  },
  {
    id: "n11",
    source: "ZeroHedge",
    headline:
      "US commercial real estate crisis deepens, 35% of office loans face default",
    sentiment_score: 12,
    sentiment: "bearish",
    timestamp: new Date(Date.now() - 14400000),
    asset_symbol: "SPY",
  },
  {
    id: "n12",
    source: "Cointelegraph",
    headline: "Ethereum developers confirm Pectra upgrade timeline for Q2",
    sentiment_score: 74,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 18000000),
    asset_symbol: "ETH",
  },
  {
    id: "n13",
    source: "Bloomberg",
    headline: "Japan's yen hits 34-year low, BOJ intervention talk intensifies",
    sentiment_score: 28,
    sentiment: "bearish",
    timestamp: new Date(Date.now() - 21600000),
    asset_symbol: "GOLD",
  },
  {
    id: "n14",
    source: "Axios",
    headline:
      "NVIDIA Q1 earnings smash estimates, data center revenue triples YoY",
    sentiment_score: 96,
    sentiment: "bullish",
    timestamp: new Date(Date.now() - 25200000),
    asset_symbol: "SPY",
  },
  {
    id: "n15",
    source: "CoinDesk",
    headline:
      "Solana validators experience brief outage, network recovers in 4 hours",
    sentiment_score: 24,
    sentiment: "bearish",
    timestamp: new Date(Date.now() - 28800000),
    asset_symbol: "SOL",
  },
];

export const initialInstitutions: Institution[] = [
  {
    id: "i1",
    filename: "BlackRock_13F_Q1_2024.pdf",
    file_type: "13F Filing",
    health_score: 88,
    risk_level: "LOW",
    debt_equity: 0.42,
    current_ratio: 3.21,
    quick_ratio: 2.98,
    assets_under_mgmt: "$9.1 Trillion",
  },
  {
    id: "i2",
    filename: "Tesla_BalanceSheet_Q1_2024.csv",
    file_type: "Balance Sheet",
    health_score: 54,
    risk_level: "MEDIUM",
    debt_equity: 1.87,
    current_ratio: 1.45,
    quick_ratio: 0.98,
    assets_under_mgmt: "$95.4 Billion",
  },
  {
    id: "i3",
    filename: "ARK_Innovation_ETF_Flows.json",
    file_type: "ETF Flow",
    health_score: 31,
    risk_level: "HIGH",
    debt_equity: 3.44,
    current_ratio: 0.88,
    quick_ratio: 0.65,
    assets_under_mgmt: "$7.8 Billion",
  },
];

export const m2ChartData = Array.from({ length: 12 }, (_, i) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return {
    month: months[i],
    US: 4.2 + Math.sin(i * 0.5) * 1.5 + i * 0.15,
    EU: 2.1 + Math.sin(i * 0.4 + 1) * 0.8 + i * 0.05,
    China: 8.7 + Math.sin(i * 0.6 + 2) * 2.2 + i * 0.3,
  };
});

export const sentimentTrendData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}h`,
  score: 45 + Math.sin(i * 0.4) * 25 + Math.random() * 10,
}));
