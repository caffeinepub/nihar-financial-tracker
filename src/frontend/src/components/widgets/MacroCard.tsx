import { TrendingDown, TrendingUp } from "lucide-react";

interface MacroCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  suffix?: string;
  color?: "green" | "red" | "blue" | "yellow";
}

const colorMap = {
  green: "#00ff88",
  red: "#ff3355",
  blue: "#00b4ff",
  yellow: "#ffcc00",
};

export function MacroCard({
  title,
  value,
  change,
  trend,
  suffix,
  color = "blue",
}: MacroCardProps) {
  const accentColor = colorMap[color];
  return (
    <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
        }}
      />
      <div className="text-[10px] text-[#6b7280] font-mono uppercase tracking-widest mb-2">
        {title}
      </div>
      <div className="flex items-end gap-2">
        <div
          className="text-2xl font-mono font-bold flicker"
          style={{ color: accentColor }}
        >
          {value}
        </div>
        {suffix && (
          <div className="text-sm text-[#6b7280] font-mono mb-0.5">
            {suffix}
          </div>
        )}
      </div>
      {change && (
        <div
          className={`flex items-center gap-1 mt-1 text-xs font-mono ${trend === "up" ? "text-[#00ff88]" : trend === "down" ? "text-[#ff3355]" : "text-[#6b7280]"}`}
        >
          {trend === "up" ? (
            <TrendingUp size={12} />
          ) : trend === "down" ? (
            <TrendingDown size={12} />
          ) : null}
          {change}
        </div>
      )}
    </div>
  );
}
