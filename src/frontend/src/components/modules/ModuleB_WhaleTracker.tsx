// TODO: Connect to Whale Alert API (https://whale-alert.io/) or Alchemy WebSocket
// TODO: Integrate Glassnode API for on-chain analytics
// TODO: Build real-time WebSocket listener for live transaction streaming

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WhaleAlert } from "../../data/mockData";
import { WhaleAlertCard } from "../widgets/WhaleAlertCard";

interface Props {
  whaleAlerts: WhaleAlert[];
}

function formatUSD(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${(value / 1000).toFixed(0)}K`;
}

export function ModuleB_WhaleTracker({ whaleAlerts }: Props) {
  const totalTxns = whaleAlerts.length;
  const totalBTC = whaleAlerts
    .filter((w) => w.blockchain === "BTC")
    .reduce((sum, w) => sum + w.amount, 0);
  const exchangeFlow = whaleAlerts.reduce((sum, w) => {
    if (w.type === "exchange_inflow") return sum - w.usd_value;
    if (w.type === "exchange_outflow") return sum + w.usd_value;
    return sum;
  }, 0);

  const chainVolume = [
    {
      chain: "BTC",
      volume:
        whaleAlerts
          .filter((w) => w.blockchain === "BTC")
          .reduce((s, w) => s + w.usd_value, 0) / 1e9,
      color: "#f7931a",
    },
    {
      chain: "ETH",
      volume:
        whaleAlerts
          .filter((w) => w.blockchain === "ETH")
          .reduce((s, w) => s + w.usd_value, 0) / 1e9,
      color: "#627eea",
    },
    {
      chain: "SOL",
      volume:
        whaleAlerts
          .filter((w) => w.blockchain === "SOL")
          .reduce((s, w) => s + w.usd_value, 0) / 1e9,
      color: "#9945ff",
    },
  ];

  return (
    <div
      data-ocid="module_b.section"
      className="flex flex-col gap-4 p-4 overflow-y-auto h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-[10px] text-[#6b7280] font-mono tracking-widest">
          MODULE-B
        </div>
        <h2 className="text-sm font-mono font-bold text-[#9945ff] tracking-wider">
          CRYPTO WHALE &amp; ON-CHAIN TRACKER
        </h2>
        <div className="flex-1 h-px bg-[#1e2736]" />
        <div className="text-[10px] text-[#00ff88] font-mono live-pulse">
          ● LIVE STREAM
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-1">
            Whale Txns 24h
          </div>
          <div className="text-2xl font-mono font-bold text-[#9945ff]">
            {totalTxns}
          </div>
        </div>
        <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-1">
            Total BTC Moved
          </div>
          <div className="text-2xl font-mono font-bold text-[#f7931a]">
            {totalBTC.toLocaleString(undefined, { maximumFractionDigits: 0 })} ₿
          </div>
        </div>
        <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-1">
            Exchange Net Flow
          </div>
          <div
            className="text-2xl font-mono font-bold"
            style={{ color: exchangeFlow >= 0 ? "#00ff88" : "#ff3355" }}
          >
            {formatUSD(Math.abs(exchangeFlow))}
          </div>
          <div
            className="text-[9px] font-mono mt-1"
            style={{ color: exchangeFlow >= 0 ? "#00ff88" : "#ff3355" }}
          >
            {exchangeFlow >= 0 ? "▲ NET OUTFLOW" : "▼ NET INFLOW"}
          </div>
        </div>
      </div>

      {/* Main content: feed + chart */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Alert feed */}
        <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-y-auto">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-1">
            Live Alert Feed
          </div>
          {whaleAlerts.map((alert, i) => (
            <WhaleAlertCard key={alert.id} alert={alert} index={i} />
          ))}
        </div>

        {/* Chart */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3">
          <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
            <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-3">
              24h Volume by Chain ($B)
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={chainVolume}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid stroke="#1e2736" strokeDasharray="3 3" />
                <XAxis
                  dataKey="chain"
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #1e2736",
                    color: "#e8edf3",
                    fontFamily: "monospace",
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="volume" radius={[3, 3, 0, 0]}>
                  {chainVolume.map((entry) => (
                    <Cell key={entry.chain} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-3">
            <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-2">
              Alert Legend
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#ff3355]" />
                <span className="text-[10px] font-mono text-[#9ca3af]">
                  Exchange Inflow
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#00ff88]" />
                <span className="text-[10px] font-mono text-[#9ca3af]">
                  Exchange Outflow
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#00b4ff]" />
                <span className="text-[10px] font-mono text-[#9ca3af]">
                  Transfer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
