// TODO: Connect to FRED API (https://fred.stlouisfed.org/docs/api/) for live M2 and balance sheet data
// TODO: Connect to TradingEconomics API for repo rate data
// TODO: Build heatmap with D3.js world map visualization

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { m2ChartData } from "../../data/mockData";
import type { CountryLiquidity } from "../../data/mockData";
import { MacroCard } from "../widgets/MacroCard";

interface Props {
  liquidity: CountryLiquidity[];
}

export function ModuleA_Liquidity({ liquidity }: Props) {
  return (
    <div
      data-ocid="module_a.section"
      className="flex flex-col gap-4 p-4 overflow-y-auto h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-[10px] text-[#6b7280] font-mono tracking-widest">
          MODULE-A
        </div>
        <h2 className="text-sm font-mono font-bold text-[#00b4ff] tracking-wider">
          GLOBAL LIQUIDITY &amp; MACRO FLOW
        </h2>
        <div className="flex-1 h-px bg-[#1e2736]" />
        <div className="text-[10px] text-[#00ff88] font-mono live-pulse">
          ● LIVE
        </div>
      </div>

      {/* Macro stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MacroCard
          title="Global M2 Growth"
          value="+4.8"
          suffix="% YoY"
          trend="up"
          change="+0.3% this week"
          color="green"
        />
        <MacroCard
          title="Fed Balance Sheet"
          value="$7.4"
          suffix="Trillion"
          trend="down"
          change="-$48B this month"
          color="red"
        />
        <MacroCard
          title="Crypto Market Cap"
          value="$2.31"
          suffix="Trillion"
          trend="up"
          change="+5.2% 24h"
          color="blue"
        />
        <MacroCard
          title="Global Repo Rate"
          value="3.87"
          suffix="% avg"
          trend="up"
          change="+0.12% 30d"
          color="yellow"
        />
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {liquidity.map((country) => (
          <div
            key={country.country}
            className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4 hover:border-[#2a3a50] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <div className="text-xs font-mono font-bold text-[#e8edf3]">
                    {country.country}
                  </div>
                  <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-wide">
                    Central Bank
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-1 text-xs font-mono"
                style={{
                  color: country.trend === "up" ? "#00ff88" : "#ff3355",
                }}
              >
                {country.trend === "up" ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {country.change_24h >= 0 ? "+" : ""}
                {country.change_24h.toFixed(1)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <div className="text-[9px] text-[#6b7280] font-mono uppercase mb-0.5">
                  M2 Growth
                </div>
                <div
                  className="text-sm font-mono font-bold"
                  style={{
                    color:
                      country.m2_growth > 5
                        ? "#00ff88"
                        : country.m2_growth > 3
                          ? "#ffcc00"
                          : "#ff3355",
                  }}
                >
                  +{country.m2_growth.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-[9px] text-[#6b7280] font-mono uppercase mb-0.5">
                  Repo Rate
                </div>
                <div className="text-sm font-mono font-bold text-[#00b4ff]">
                  {country.repo_rate.toFixed(2)}%
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-[#6b7280]">LIQUIDITY SCORE</span>
                <span
                  style={{
                    color:
                      country.liquidity_score >= 70
                        ? "#00ff88"
                        : country.liquidity_score >= 50
                          ? "#ffcc00"
                          : "#ff3355",
                  }}
                >
                  {Math.round(country.liquidity_score)}/100
                </span>
              </div>
              <div className="h-1.5 bg-[#1e2736] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${country.liquidity_score}%`,
                    background:
                      country.liquidity_score >= 70
                        ? "#00ff88"
                        : country.liquidity_score >= 50
                          ? "#ffcc00"
                          : "#ff3355",
                    boxShadow: `0 0 6px ${country.liquidity_score >= 70 ? "#00ff8844" : "#ffcc0044"}`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* M2 Growth Chart */}
      <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4">
        <div className="text-[10px] text-[#6b7280] font-mono uppercase tracking-widest mb-4">
          M2 Money Supply Growth — 12 Month Trend (%)
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={m2ChartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="usGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b4ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00b4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="euGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3355" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff3355" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e2736" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fill: "#6b7280", fontSize: 11 }}
            />
            <YAxis stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0d1117",
                border: "1px solid #1e2736",
                color: "#e8edf3",
                fontFamily: "monospace",
                fontSize: 11,
              }}
            />
            <Legend
              wrapperStyle={{
                color: "#6b7280",
                fontSize: 11,
                fontFamily: "monospace",
              }}
            />
            <Area
              type="monotone"
              dataKey="US"
              stroke="#00b4ff"
              strokeWidth={2}
              fill="url(#usGrad)"
            />
            <Area
              type="monotone"
              dataKey="EU"
              stroke="#00ff88"
              strokeWidth={2}
              fill="url(#euGrad)"
            />
            <Area
              type="monotone"
              dataKey="China"
              stroke="#ff3355"
              strokeWidth={2}
              fill="url(#cnGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
