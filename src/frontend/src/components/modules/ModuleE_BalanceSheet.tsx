// TODO: Integrate SEC EDGAR API for 13F filings, parse with Pandas via HTTP outcall
// TODO: Connect to Bloomberg or Refinitiv for institutional balance sheet data
// TODO: Build ETF flow aggregation pipeline

import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Loader2,
  Upload,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import type { Institution } from "../../data/mockData";
import { useActor } from "../../hooks/useActor";

interface Props {
  institutions: Institution[];
}

const RISK_COLORS: Record<string, string> = {
  LOW: "#00ff88",
  MEDIUM: "#ffcc00",
  HIGH: "#ff3355",
};

const RISK_BG: Record<string, string> = {
  LOW: "#00ff8818",
  MEDIUM: "#ffcc0018",
  HIGH: "#ff335518",
};

const mockRiskTable = [
  {
    name: "BlackRock",
    assets: "$9.1T",
    leverage: 1.42,
    beta: 0.87,
    var: "2.1%",
    rating: "AAA",
  },
  {
    name: "Vanguard",
    assets: "$8.0T",
    leverage: 1.21,
    beta: 0.92,
    var: "1.8%",
    rating: "AAA",
  },
  {
    name: "Fidelity",
    assets: "$4.5T",
    leverage: 1.68,
    beta: 1.04,
    var: "3.2%",
    rating: "AA+",
  },
  {
    name: "ARK Invest",
    assets: "$7.8B",
    leverage: 3.44,
    beta: 2.15,
    var: "12.4%",
    rating: "BB",
  },
  {
    name: "Tesla Inc.",
    assets: "$95.4B",
    leverage: 1.87,
    beta: 1.78,
    var: "8.9%",
    rating: "BBB",
  },
];

export function ModuleE_BalanceSheet({ institutions }: Props) {
  const { actor } = useActor();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!actor) {
      toast.error("Not connected");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      const analysis = {
        content: `File: ${file.name}, Size: ${file.size}, Type: ${file.type}`,
        author: "NIHAR-FT-USER",
        timestamp: BigInt(Date.now()),
      };
      await actor.uploadAndAnalyzeFile(blob, analysis);
      toast.success(`Uploaded ${file.name} successfully`);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      data-ocid="module_e.section"
      className="flex flex-col gap-4 p-4 overflow-y-auto h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-[10px] text-[#6b7280] font-mono tracking-widest">
          MODULE-E
        </div>
        <h2 className="text-sm font-mono font-bold text-[#ff3355] tracking-wider">
          INSTITUTIONAL BALANCE SHEET ANALYZER
        </h2>
        <div className="flex-1 h-px bg-[#1e2736]" />
        <div className="text-[10px] text-[#00b4ff] font-mono">
          ● AI ANALYSIS
        </div>
      </div>

      {/* Upload zone */}
      <div
        data-ocid="upload.dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer"
        style={{
          borderColor: isDragging ? "#00b4ff" : "#1e2736",
          backgroundColor: isDragging ? "#00b4ff08" : "#0d1117",
        }}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.pdf,.json"
          onChange={handleFileInput}
          className="hidden"
        />
        <Upload
          size={32}
          className="mx-auto mb-3"
          style={{ color: isDragging ? "#00b4ff" : "#6b7280" }}
        />
        <div className="text-sm font-mono text-[#e8edf3] mb-1">
          Drop files or click to upload
        </div>
        <div className="text-[10px] text-[#6b7280] font-mono mb-4">
          Supports CSV, PDF, JSON institutional filings
        </div>
        <div className="flex justify-center gap-3">
          {["13F FILINGS", "BALANCE SHEETS", "ETF FLOWS"].map((tag) => (
            <div
              key={tag}
              className="text-[9px] font-mono border border-[#1e2736] bg-[#080b0f] text-[#6b7280] px-2 py-1 rounded"
            >
              {tag}
            </div>
          ))}
        </div>
        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Loader2 size={14} className="text-[#00b4ff] animate-spin" />
              <span className="text-xs font-mono text-[#00b4ff]">
                Analyzing... {uploadProgress.toFixed(0)}%
              </span>
            </div>
            <div className="h-1 bg-[#1e2736] rounded-full overflow-hidden mx-auto max-w-xs">
              <div
                className="h-full bg-[#00b4ff] rounded-full transition-all duration-100"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
        <button
          type="button"
          data-ocid="upload.button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-4 text-xs font-mono px-4 py-1.5 rounded border border-[#00b4ff44] text-[#00b4ff] bg-[#00b4ff11] hover:bg-[#00b4ff22] transition-colors"
        >
          SELECT FILE
        </button>
      </div>

      {/* Analyzed files */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {institutions.map((inst, i) => (
          <div
            key={inst.id}
            data-ocid={`institution.item.${i + 1}`}
            className="bg-[#0d1117] border border-[#1e2736] rounded-lg p-4 hover:border-[#2a3a50] transition-colors"
          >
            {/* File info */}
            <div className="flex items-start gap-2 mb-3">
              <FileText
                size={16}
                className="text-[#6b7280] mt-0.5 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-[#e8edf3] truncate">
                  {inst.filename}
                </div>
                <div className="text-[9px] font-mono text-[#00b4ff] border border-[#00b4ff33] bg-[#00b4ff11] px-1.5 py-0.5 rounded inline-block mt-1">
                  {inst.file_type}
                </div>
              </div>
            </div>

            {/* Health score */}
            <div className="mb-3">
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-[#6b7280]">HEALTH SCORE</span>
                <span
                  style={{
                    color:
                      inst.health_score >= 70
                        ? "#00ff88"
                        : inst.health_score >= 40
                          ? "#ffcc00"
                          : "#ff3355",
                  }}
                >
                  {inst.health_score}/100
                </span>
              </div>
              <div className="h-2 bg-[#1e2736] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${inst.health_score}%`,
                    backgroundColor:
                      inst.health_score >= 70
                        ? "#00ff88"
                        : inst.health_score >= 40
                          ? "#ffcc00"
                          : "#ff3355",
                  }}
                />
              </div>
            </div>

            {/* Risk badge + AUM */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                {inst.risk_level === "LOW" ? (
                  <CheckCircle size={12} color="#00ff88" />
                ) : inst.risk_level === "MEDIUM" ? (
                  <AlertTriangle size={12} color="#ffcc00" />
                ) : (
                  <XCircle size={12} color="#ff3355" />
                )}
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: RISK_COLORS[inst.risk_level],
                    backgroundColor: RISK_BG[inst.risk_level],
                  }}
                >
                  {inst.risk_level} RISK
                </span>
              </div>
              <div className="text-[9px] font-mono text-[#6b7280]">
                {inst.assets_under_mgmt}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "D/E Ratio", value: inst.debt_equity.toFixed(2) },
                { label: "Current", value: inst.current_ratio.toFixed(2) },
                { label: "Quick", value: inst.quick_ratio.toFixed(2) },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-[#080b0f] rounded p-2 text-center"
                >
                  <div className="text-[8px] text-[#6b7280] font-mono uppercase">
                    {m.label}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#e8edf3]">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full text-[10px] font-mono py-1.5 rounded border border-[#1e2736] text-[#6b7280] hover:border-[#00b4ff44] hover:text-[#00b4ff] transition-colors"
            >
              VIEW DETAILS
            </button>
          </div>
        ))}
      </div>

      {/* Risk comparison table */}
      <div className="bg-[#0d1117] border border-[#1e2736] rounded-lg overflow-hidden">
        <div className="px-4 py-2 border-b border-[#1e2736]">
          <div className="text-[9px] text-[#6b7280] font-mono uppercase tracking-widest">
            Institutional Risk Comparison
          </div>
        </div>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-[#1e2736]">
              {[
                "Institution",
                "AUM",
                "Leverage",
                "Beta",
                "VaR (1D)",
                "Rating",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-[#6b7280] px-4 py-2 text-[10px] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockRiskTable.map((row, i) => (
              <tr
                key={row.name}
                className="border-b border-[#1e2736] hover:bg-[#0f1620] transition-colors"
                style={{
                  backgroundColor: i % 2 === 0 ? "transparent" : "#0a0e14",
                }}
              >
                <td className="px-4 py-2 text-[#e8edf3] font-bold">
                  {row.name}
                </td>
                <td className="px-4 py-2 text-[#6b7280]">{row.assets}</td>
                <td
                  className="px-4 py-2"
                  style={{
                    color:
                      row.leverage > 2
                        ? "#ff3355"
                        : row.leverage > 1.5
                          ? "#ffcc00"
                          : "#00ff88",
                  }}
                >
                  {row.leverage}x
                </td>
                <td
                  className="px-4 py-2"
                  style={{
                    color:
                      row.beta > 1.5
                        ? "#ff3355"
                        : row.beta > 1
                          ? "#ffcc00"
                          : "#00ff88",
                  }}
                >
                  {row.beta}
                </td>
                <td
                  className="px-4 py-2"
                  style={{
                    color:
                      Number.parseFloat(row.var) > 8
                        ? "#ff3355"
                        : Number.parseFloat(row.var) > 4
                          ? "#ffcc00"
                          : "#00ff88",
                  }}
                >
                  {row.var}
                </td>
                <td className="px-4 py-2">
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                    style={{
                      color: row.rating.startsWith("AA")
                        ? "#00ff88"
                        : row.rating.startsWith("BB")
                          ? "#ff3355"
                          : "#ffcc00",
                      backgroundColor: row.rating.startsWith("AA")
                        ? "#00ff8818"
                        : row.rating.startsWith("BB")
                          ? "#ff335518"
                          : "#ffcc0018",
                    }}
                  >
                    {row.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
