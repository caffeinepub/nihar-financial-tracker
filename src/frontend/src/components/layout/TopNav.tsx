import { Bell, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import type { Asset } from "../../data/mockData";

interface TopNavProps {
  assets: Asset[];
}

function isMarketOpen(): boolean {
  const now = new Date();
  const utcHour = now.getUTCHours();
  const utcDay = now.getUTCDay();
  // NYSE: Mon-Fri 13:30-20:00 UTC
  if (utcDay === 0 || utcDay === 6) return false;
  return utcHour >= 13 && utcHour < 20;
}

export function TopNav({ assets }: TopNavProps) {
  const [time, setTime] = useState(new Date());
  const [notifications] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const marketOpen = isMarketOpen();
  const btc = assets.find((a) => a.symbol === "BTC");
  const eth = assets.find((a) => a.symbol === "ETH");
  const spy = assets.find((a) => a.symbol === "SPY");

  const tickers = [
    { symbol: "BTC", asset: btc },
    { symbol: "ETH", asset: eth },
    { symbol: "SPY", asset: spy },
  ];

  return (
    <header
      data-ocid="topnav.panel"
      className="h-14 border-b border-[#1e2736] bg-[#0d1117] flex items-center px-4 gap-4 flex-shrink-0 relative z-10"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="text-xl font-mono font-bold"
          style={{ color: "#00ff88", textShadow: "0 0 12px #00ff8866" }}
        >
          ⬡ NIHAR FT
        </span>
        <div className="hidden sm:block">
          <div className="text-[9px] text-[#6b7280] font-mono tracking-[0.25em] uppercase">
            Financial Tracker
          </div>
        </div>
      </div>

      <div className="w-px h-6 bg-[#1e2736] flex-shrink-0" />

      {/* Center: Clock + Market Status + Tickers */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        <div className="text-sm font-mono text-[#e8edf3]">
          {time.toUTCString().slice(17, 25)}
          <span className="text-[10px] text-[#6b7280] ml-1">UTC</span>
        </div>

        <div
          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
          style={
            marketOpen
              ? {
                  color: "#00ff88",
                  borderColor: "#00ff8844",
                  backgroundColor: "#00ff8811",
                }
              : {
                  color: "#ff3355",
                  borderColor: "#ff335544",
                  backgroundColor: "#ff335511",
                }
          }
        >
          {marketOpen ? "● MARKETS OPEN" : "● MARKETS CLOSED"}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {tickers.map(({ symbol, asset }) => (
            <div key={symbol} className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#6b7280] font-mono">
                {symbol}
              </span>
              <span className="text-xs font-mono font-bold text-[#e8edf3] flicker">
                {asset
                  ? `$${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                  : "—"}
              </span>
              {asset && (
                <span
                  className="text-[10px] font-mono"
                  style={{
                    color: asset.change_24h >= 0 ? "#00ff88" : "#ff3355",
                  }}
                >
                  {asset.change_24h >= 0 ? "+" : ""}
                  {asset.change_24h.toFixed(2)}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Role + Bell */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-[#00b4ff] border border-[#00b4ff33] bg-[#00b4ff11] px-2 py-0.5 rounded">
          <Shield size={10} />
          ANALYST
        </div>
        <button
          type="button"
          className="relative p-1.5 rounded hover:bg-[#1e2736] transition-colors"
        >
          <Bell size={16} className="text-[#6b7280]" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#ff3355] text-[#080b0f] text-[8px] font-mono font-bold flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
