import { useCallback, useEffect, useState } from "react";
import {
  type Asset,
  type CountryLiquidity,
  type Institution,
  type NewsItem,
  type WhaleAlert,
  initialAssets,
  initialCountryLiquidity,
  initialInstitutions,
  initialNews,
  initialOrderBook,
  initialWhaleAlerts,
} from "../data/mockData";

// TODO: Replace with FRED API (https://fred.stlouisfed.org/docs/api/) for live M2 and balance sheet data
// TODO: Replace with Whale Alert WebSocket (https://whale-alert.io/) for live whale transactions
// TODO: Replace with CoinGecko/Alpha Vantage for live asset prices
// TODO: Replace with NewsAPI + OpenAI for live NLP sentiment scoring

const WHALE_BLOCKCHAINS = ["BTC", "ETH", "SOL"] as const;
const WHALE_FROM = [
  "Binance",
  "Coinbase",
  "Unknown Wallet",
  "Kraken",
  "OKX",
  "Grayscale",
  "Jump Crypto",
];
const WHALE_TO = [
  "Binance",
  "Cold Storage",
  "Unknown Wallet",
  "Bybit",
  "Self-Custody",
  "Coinbase Prime",
];
const WHALE_TYPES = [
  "exchange_inflow",
  "exchange_outflow",
  "transfer",
] as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function fluctuate(value: number, pct = 0.002): number {
  return value * (1 + (Math.random() - 0.5) * pct * 2);
}

export function useMockData() {
  const [liquidity, setLiquidity] = useState<CountryLiquidity[]>(
    initialCountryLiquidity,
  );
  const [whaleAlerts, setWhaleAlerts] =
    useState<WhaleAlert[]>(initialWhaleAlerts);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [orderBook] = useState(initialOrderBook);
  const [news] = useState<NewsItem[]>(initialNews);
  const [institutions] = useState<Institution[]>(initialInstitutions);
  const [tick, setTick] = useState(0);

  // Update asset prices every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => {
          const newPrice = fluctuate(a.price, 0.003);
          const change = ((newPrice - a.price) / a.price) * 100;
          const newSparkline = [...a.sparkline.slice(1), newPrice];
          return {
            ...a,
            price: newPrice,
            change_24h: a.change_24h + change * 0.1,
            flow_direction: change >= 0 ? "up" : "down",
            sparkline: newSparkline,
          };
        }),
      );
      setTick((t) => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update liquidity scores every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidity((prev) =>
        prev.map((c) => ({
          ...c,
          liquidity_score: Math.min(
            100,
            Math.max(0, c.liquidity_score + (Math.random() - 0.5) * 2),
          ),
          m2_growth: fluctuate(c.m2_growth, 0.01),
        })),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add new whale alerts every 8 seconds
  const addWhaleAlert = useCallback(() => {
    const blockchain = WHALE_BLOCKCHAINS[Math.floor(Math.random() * 3)];
    const amounts: Record<string, number> = {
      BTC: randomBetween(50, 3000),
      ETH: randomBetween(1000, 50000),
      SOL: randomBetween(50000, 1500000),
    };
    const amount = amounts[blockchain];
    const prices: Record<string, number> = { BTC: 64782, ETH: 2514, SOL: 156 };
    const newAlert: WhaleAlert = {
      id: `w${Date.now()}`,
      blockchain,
      amount,
      usd_value: amount * prices[blockchain],
      from_label: WHALE_FROM[Math.floor(Math.random() * WHALE_FROM.length)],
      to_label: WHALE_TO[Math.floor(Math.random() * WHALE_TO.length)],
      type: WHALE_TYPES[Math.floor(Math.random() * 3)],
      timestamp: new Date(),
    };
    setWhaleAlerts((prev) => [newAlert, ...prev.slice(0, 19)]);
  }, []);

  useEffect(() => {
    const interval = setInterval(addWhaleAlert, 8000);
    return () => clearInterval(interval);
  }, [addWhaleAlert]);

  return {
    liquidity,
    whaleAlerts,
    assets,
    orderBook,
    news,
    institutions,
    tick,
  };
}
