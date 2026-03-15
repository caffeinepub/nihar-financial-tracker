// TODO: Connect to NewsAPI + OpenAI/HuggingFace for live NLP sentiment scoring
// TODO: Integrate StockTwits or X (Twitter) Enterprise API for social sentiment
// TODO: Build real-time sentiment scoring pipeline with WebSocket updates

import {
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
import { sentimentTrendData } from "../../data/mockData";
import type { NewsItem } from "../../data/mockData";
import { SentimentMeter } from "../widgets/SentimentMeter";

interface Props {
  news: NewsItem[];
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

export function ModuleD_Sentiment({ news }: Props) {
  const avgScore = Math.round(
    news.reduce((s, n) => s + n.sentiment_score, 0) / news.length,
  );
  const bullishCount = news.filter((n) => n.sentiment === "bullish").length;
  const bearishCount = news.filter((n) => n.sentiment === "bearish").length;
  const neutralCount = news.filter((n) => n.sentiment === "neutral").length;

  const sentBreakdown = [
    { name: "Bullish", value: bullishCount, color: "#00ff88" },
    { name: "Bearish", value: bearishCount, color: "#ff3355" },
    { name: "Neutral", value: neutralCount, color: "#00b4ff" },
  ];

  const tickerText = news
    .map(
      (n) =>
        `${n.asset_symbol}: "${n.headline}" [${n.sentiment.toUpperCase()} ${n.sentiment_score}]`,
    )
    .join("   ●   ");

  return (
    <div
      data-ocid="module_d.section"
      className="flex flex-col gap-4 p-4 overflow-y-auto h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-[10px] text-[#6b7280] font-mono tracking-widest">
          MODULE-D
        </div>
        <h2 className="text-sm font-mono font-bold text-[#ffcc00] tracking-wider">
          NEWS &amp; AI SENTIMENT ENGINE
        </h2>
        <div className="flex-1 h-px bg-[#1e2736]" />
        <div className="text-[10px] text-[#ffcc00] font-mono live-pulse">
          ● AI SCORING
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg overflow-hidden h-8 flex items-center">
        <div className="text-[10px] text-[#ffcc00] font-mono px-3 border-r border-[#1e2736] whitespace-nowrap">
          LIVE FEED
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-animate text-[10px] font-mono text-[#9ca3af] whitespace-nowrap py-1">
            {tickerText}
          </div>
        </div>
      </div>

      {/* Main: news + sentiment */}
      <div className="flex gap-4 min-h-0 flex-1">
        {/* News feed */}
        <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-y-auto">
          {news.map((item, i) => (
            <div
              key={item.id}
              data-ocid={i < 5 ? `news.item.${i + 1}` : undefined}
              className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-3 hover:border-[#2a3a50] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-mono bg-[#1e2736] text-[#9ca3af] px-1.5 py-0.5 rounded">
                  {item.source}
                </span>
                <span className="text-[9px] font-mono text-[#00b4ff] border border-[#00b4ff33] bg-[#00b4ff11] px-1.5 py-0.5 rounded">
                  {item.asset_symbol}
                </span>
                <span className="text-[9px] text-[#6b7280] font-mono ml-auto">
                  {timeAgo(item.timestamp)}
                </span>
              </div>
              <p className="text-xs font-mono text-[#e8edf3] mb-2 leading-relaxed">
                {item.headline}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="text-[9px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    color:
                      item.sentiment === "bullish"
                        ? "#00ff88"
                        : item.sentiment === "bearish"
                          ? "#ff3355"
                          : "#00b4ff",
                    backgroundColor:
                      item.sentiment === "bullish"
                        ? "#00ff8818"
                        : item.sentiment === "bearish"
                          ? "#ff335518"
                          : "#00b4ff18",
                  }}
                >
                  {item.sentiment === "bullish"
                    ? "BULLISH ▲"
                    : item.sentiment === "bearish"
                      ? "BEARISH ▼"
                      : "NEUTRAL ●"}
                </div>
                <div className="flex-1 h-1.5 bg-[#1e2736] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.sentiment_score}%`,
                      backgroundColor:
                        item.sentiment === "bullish"
                          ? "#00ff88"
                          : item.sentiment === "bearish"
                            ? "#ff3355"
                            : "#00b4ff",
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono text-[#6b7280]">
                  {item.sentiment_score}/100
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sentiment panel */}
        <div
          data-ocid="sentiment.panel"
          className="w-72 flex-shrink-0 flex flex-col gap-3"
        >
          {/* Gauge */}
          <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4 flex flex-col items-center">
            <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-2">
              Market Sentiment Score
            </div>
            <SentimentMeter score={avgScore} size={180} />
          </div>

          {/* Breakdown donut */}
          <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
            <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-3">
              Sentiment Breakdown
            </div>
            <div className="flex items-center gap-3">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie
                    data={sentBreakdown}
                    cx={45}
                    cy={45}
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sentBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {sentBreakdown.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-[10px] font-mono text-[#9ca3af]">
                      {s.name}
                    </span>
                    <span
                      className="text-[10px] font-mono ml-auto"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trend line */}
          <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
            <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest mb-3">
              24h Sentiment Trend
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={sentimentTrendData}>
                <CartesianGrid stroke="#1e2736" strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280", fontSize: 9 }}
                  interval={5}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280", fontSize: 9 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #1e2736",
                    color: "#e8edf3",
                    fontFamily: "monospace",
                    fontSize: 10,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ffcc00"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
