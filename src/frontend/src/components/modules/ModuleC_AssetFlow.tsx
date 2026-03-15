// TODO: Connect to Alpha Vantage or CoinGecko API for live prices
// TODO: Integrate real order book data from exchange WebSockets
// TODO: Build level-2 order book depth visualization

import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Asset } from "../../data/mockData";
import { initialOrderBook } from "../../data/mockData";

interface Props {
  assets: Asset[];
}

function formatPrice(price: number): string {
  if (price >= 1000)
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return price.toFixed(2);
}

function formatVolume(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(1)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  return `$${(v / 1e6).toFixed(0)}M`;
}

function formatMarketCap(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(0)}B`;
  return `$${(v / 1e6).toFixed(0)}M`;
}

const PIE_COLORS = ["#00ff88", "#00b4ff", "#ffcc00"];

export function ModuleC_AssetFlow({ assets }: Props) {
  const orderBook = initialOrderBook;

  // Build cumulative depth data for chart
  const depthData: { price: number; bid: number; ask: number }[] = [];
  let cumBid = 0;
  const sortedBids = [...orderBook.bids].sort((a, b) => a.price - b.price);
  for (const b of sortedBids) {
    cumBid += b.size;
    depthData.push({ price: b.price, bid: cumBid, ask: 0 });
  }
  let cumAsk = 0;
  const sortedAsks = [...orderBook.asks].sort((a, b) => a.price - b.price);
  for (const a of sortedAsks) {
    cumAsk += a.size;
    depthData.push({ price: a.price, bid: 0, ask: cumAsk });
  }
  depthData.sort((a, b) => a.price - b.price);

  // Volume by category
  const cryptoVol = assets
    .filter((a) => a.category === "crypto")
    .reduce((s, a) => s + a.volume, 0);
  const equityVol = assets
    .filter((a) => a.category === "equity")
    .reduce((s, a) => s + a.volume, 0);
  const commVol = assets
    .filter((a) => a.category === "commodity")
    .reduce((s, a) => s + a.volume, 0);
  const totalVol = cryptoVol + equityVol + commVol;
  const pieData = [
    { name: "Crypto", value: Math.round((cryptoVol / totalVol) * 100) },
    { name: "Equities", value: Math.round((equityVol / totalVol) * 100) },
    { name: "Commodities", value: Math.round((commVol / totalVol) * 100) },
  ];

  return (
    <div
      data-ocid="module_c.section"
      className="flex flex-col gap-4 p-4 overflow-y-auto h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-[10px] text-[#6b7280] font-mono tracking-widest">
          MODULE-C
        </div>
        <h2 className="text-sm font-mono font-bold text-[#00ff88] tracking-wider">
          TOP ASSETS CASH FLOW &amp; MARKET FLOW
        </h2>
        <div className="flex-1 h-px bg-[#1e2736]" />
        <div className="text-[10px] text-[#00ff88] font-mono live-pulse">
          ● LIVE
        </div>
      </div>

      {/* Asset table */}
      <div
        data-ocid="asset.table"
        className="bg-[#0d1117] border border-[#1e2736] rounded-lg overflow-hidden"
      >
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-[#1e2736]">
              {[
                "#",
                "Asset",
                "Price",
                "24h Change",
                "Volume",
                "Mkt Cap",
                "Flow",
                "7D Trend",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-[#6b7280] px-3 py-2 text-[10px] uppercase tracking-wider font-mono"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, i) => (
              <tr
                key={asset.symbol}
                data-ocid={`asset.row.${i + 1}`}
                className="border-b border-[#1e2736] hover:bg-[#0f1620] transition-colors"
                style={{
                  backgroundColor: i % 2 === 0 ? "transparent" : "#0a0e14",
                }}
              >
                <td className="px-3 py-2 text-[#6b7280]">{i + 1}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center"
                      style={{
                        backgroundColor:
                          asset.category === "crypto"
                            ? "#00ff8818"
                            : asset.category === "equity"
                              ? "#00b4ff18"
                              : "#ffcc0018",
                        color:
                          asset.category === "crypto"
                            ? "#00ff88"
                            : asset.category === "equity"
                              ? "#00b4ff"
                              : "#ffcc00",
                      }}
                    >
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <div className="text-[#e8edf3] font-bold">
                        {asset.symbol}
                      </div>
                      <div className="text-[9px] text-[#6b7280]">
                        {asset.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-[#e8edf3] font-bold flicker">
                  ${formatPrice(asset.price)}
                </td>
                <td className="px-3 py-2">
                  <span
                    style={{
                      color: asset.change_24h >= 0 ? "#00ff88" : "#ff3355",
                    }}
                  >
                    {asset.change_24h >= 0 ? "+" : ""}
                    {asset.change_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="px-3 py-2 text-[#6b7280]">
                  {formatVolume(asset.volume)}
                </td>
                <td className="px-3 py-2 text-[#6b7280]">
                  {formatMarketCap(asset.market_cap)}
                </td>
                <td className="px-3 py-2">
                  {asset.flow_direction === "up" ? (
                    <ArrowUp size={14} className="text-[#00ff88]" />
                  ) : (
                    <ArrowDown size={14} className="text-[#ff3355]" />
                  )}
                </td>
                <td className="px-3 py-2">
                  <div style={{ width: 80, height: 30 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={asset.sparkline.map((v, j) => ({ v, j }))}
                      >
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke={asset.change_24h >= 0 ? "#00ff88" : "#ff3355"}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Order book depth */}
        <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-3">
            BTC/USD Order Book Depth
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={depthData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="bidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="askGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3355" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ff3355" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e2736" strokeDasharray="3 3" />
              <XAxis
                dataKey="price"
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 9 }}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 10 }}
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
              <Area
                type="stepAfter"
                dataKey="bid"
                stroke="#00ff88"
                strokeWidth={1.5}
                fill="url(#bidGrad)"
              />
              <Area
                type="stepAfter"
                dataKey="ask"
                stroke="#ff3355"
                strokeWidth={1.5}
                fill="url(#askGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Volume donut */}
        <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-3">
            Volume Flow by Category
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx={75}
                  cy={75}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #1e2736",
                    color: "#e8edf3",
                    fontFamily: "monospace",
                    fontSize: 11,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <div>
                    <div className="text-xs font-mono text-[#e8edf3]">
                      {item.name}
                    </div>
                    <div
                      className="text-[10px] font-mono"
                      style={{ color: PIE_COLORS[i] }}
                    >
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
