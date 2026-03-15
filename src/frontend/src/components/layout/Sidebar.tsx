import {
  Activity,
  BarChart2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Newspaper,
  Settings,
} from "lucide-react";
import { useState } from "react";

export type ModuleId = "A" | "B" | "C" | "D" | "E";

const modules: {
  id: ModuleId;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  shortLabel: string;
  color: string;
}[] = [
  {
    id: "A",
    icon: Globe,
    label: "Global Liquidity",
    shortLabel: "LQDT",
    color: "#00b4ff",
  },
  {
    id: "B",
    icon: Activity,
    label: "Whale Tracker",
    shortLabel: "WHLE",
    color: "#9945ff",
  },
  {
    id: "C",
    icon: BarChart2,
    label: "Asset Flow",
    shortLabel: "ASST",
    color: "#00ff88",
  },
  {
    id: "D",
    icon: Newspaper,
    label: "AI Sentiment",
    shortLabel: "SENT",
    color: "#ffcc00",
  },
  {
    id: "E",
    icon: Building2,
    label: "Balance Sheet",
    shortLabel: "INST",
    color: "#ff3355",
  },
];

interface SidebarProps {
  active: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      data-ocid="sidebar.panel"
      className="flex flex-col border-r border-[#1e2736] bg-[#0d1117] flex-shrink-0 transition-all duration-200"
      style={{ width: expanded ? 220 : 56 }}
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="h-14 flex items-center justify-center hover:bg-[#1e2736] transition-colors border-b border-[#1e2736] flex-shrink-0"
      >
        {expanded ? (
          <ChevronLeft size={14} className="text-[#6b7280]" />
        ) : (
          <ChevronRight size={14} className="text-[#6b7280]" />
        )}
      </button>

      {/* Module navigation */}
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isActive = active === mod.id;
          return (
            <button
              type="button"
              key={mod.id}
              data-ocid={`nav.module_${mod.id.toLowerCase()}.link`}
              onClick={() => onSelect(mod.id)}
              className="flex items-center gap-3 px-2 py-2.5 rounded-md transition-all duration-150 group relative"
              style={
                isActive
                  ? {
                      backgroundColor: `${mod.color}18`,
                      color: mod.color,
                      borderLeft: `2px solid ${mod.color}`,
                    }
                  : { color: "#6b7280" }
              }
              title={!expanded ? mod.label : undefined}
            >
              <span className="flex-shrink-0">
                <Icon size={16} />
              </span>
              {expanded && (
                <div className="flex flex-col items-start overflow-hidden">
                  <span
                    className="text-[9px] font-mono tracking-widest"
                    style={{ color: isActive ? mod.color : "#4b5563" }}
                  >
                    MOD-{mod.id}
                  </span>
                  <span
                    className="text-xs font-mono whitespace-nowrap"
                    style={{ color: isActive ? mod.color : "#9ca3af" }}
                  >
                    {mod.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom settings */}
      <div className="p-2 border-t border-[#1e2736]">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-2 py-2.5 rounded-md text-[#6b7280] hover:text-[#9ca3af] hover:bg-[#1e2736] transition-colors"
        >
          <Settings size={16} />
          {expanded && <span className="text-xs font-mono">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
