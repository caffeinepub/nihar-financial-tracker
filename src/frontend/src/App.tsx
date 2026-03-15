import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { type ModuleId, Sidebar } from "./components/layout/Sidebar";
import { TopNav } from "./components/layout/TopNav";
import { ModuleA_Liquidity } from "./components/modules/ModuleA_Liquidity";
import { ModuleB_WhaleTracker } from "./components/modules/ModuleB_WhaleTracker";
import { ModuleC_AssetFlow } from "./components/modules/ModuleC_AssetFlow";
import { ModuleD_Sentiment } from "./components/modules/ModuleD_Sentiment";
import { ModuleE_BalanceSheet } from "./components/modules/ModuleE_BalanceSheet";
import { useMockData } from "./hooks/useMockData";

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>("A");
  const { liquidity, whaleAlerts, assets, news, institutions } = useMockData();

  const renderModule = () => {
    switch (activeModule) {
      case "A":
        return <ModuleA_Liquidity liquidity={liquidity} />;
      case "B":
        return <ModuleB_WhaleTracker whaleAlerts={whaleAlerts} />;
      case "C":
        return <ModuleC_AssetFlow assets={assets} />;
      case "D":
        return <ModuleD_Sentiment news={news} />;
      case "E":
        return <ModuleE_BalanceSheet institutions={institutions} />;
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#080b0f" }}
    >
      <Sidebar active={activeModule} onSelect={setActiveModule} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNav assets={assets} />
        <main className="flex-1 overflow-hidden">{renderModule()}</main>
      </div>
      <Toaster theme="dark" />
      {/* Scanlines overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />
    </div>
  );
}
