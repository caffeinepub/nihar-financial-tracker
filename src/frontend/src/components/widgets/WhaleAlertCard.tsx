import type { WhaleAlert } from "../../data/mockData";

interface WhaleAlertCardProps {
  alert: WhaleAlert;
  index?: number;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

function formatUSD(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${(value / 1000).toFixed(0)}K`;
}

function formatAmount(amount: number, chain: string): string {
  if (chain === "BTC")
    return `${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} BTC`;
  if (chain === "ETH")
    return `${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ETH`;
  return `${(amount / 1000).toFixed(0)}K SOL`;
}

const CHAIN_COLORS: Record<string, string> = {
  BTC: "#f7931a",
  ETH: "#627eea",
  SOL: "#9945ff",
};

const TYPE_CONFIG = {
  exchange_inflow: {
    label: "EXCHANGE INFLOW",
    color: "#ff3355",
    bg: "#ff335522",
  },
  exchange_outflow: {
    label: "EXCHANGE OUTFLOW",
    color: "#00ff88",
    bg: "#00ff8822",
  },
  transfer: { label: "TRANSFER", color: "#00b4ff", bg: "#00b4ff22" },
};

export function WhaleAlertCard({ alert, index }: WhaleAlertCardProps) {
  const isRecent = Date.now() - alert.timestamp.getTime() < 300000;
  const typeConfig = TYPE_CONFIG[alert.type];
  const chainColor = CHAIN_COLORS[alert.blockchain];
  const ocid =
    index !== undefined && index < 5 ? `whale.item.${index + 1}` : undefined;

  return (
    <div
      data-ocid={ocid}
      className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-3 flex items-center gap-3 hover:border-[#2a3a50] transition-colors"
    >
      {/* Chain badge */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center text-xs font-mono font-bold border"
        style={{
          color: chainColor,
          borderColor: `${chainColor}44`,
          backgroundColor: `${chainColor}11`,
        }}
      >
        {alert.blockchain}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-mono font-bold text-[#e8edf3]">
            {formatAmount(alert.amount, alert.blockchain)}
          </span>
          <span className="text-sm font-mono" style={{ color: chainColor }}>
            {formatUSD(alert.usd_value)}
          </span>
        </div>
        <div className="text-xs text-[#6b7280] font-mono truncate">
          {alert.from_label} <span className="text-[#1e2736]">→</span>{" "}
          {alert.to_label}
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{ color: typeConfig.color, backgroundColor: typeConfig.bg }}
        >
          {typeConfig.label}
        </div>
        <div className="flex items-center gap-1">
          {isRecent && (
            <div
              className="w-1.5 h-1.5 rounded-full live-pulse"
              style={{ backgroundColor: "#00ff88" }}
            />
          )}
          <span className="text-[10px] text-[#6b7280] font-mono">
            {timeAgo(alert.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}
