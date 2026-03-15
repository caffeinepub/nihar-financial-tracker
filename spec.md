# NIHAR FINANCIAL TRACKER

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full-screen dark-mode terminal dashboard named "NIHAR FINANCIAL TRACKER"
- Top navigation bar with live clock, market status indicator, and module tabs
- Collapsible sidebar with module navigation icons
- 5 core modules rendered as tabbed/panel views:
  - Module A: Global Liquidity & Macro Flow — country heatmap + M2/repo rate cards
  - Module B: Crypto Whale & On-Chain Tracker — live whale alert feed + blockchain transaction table
  - Module C: Top Assets Cash Flow & Market Flow — ranked asset table + order book depth chart
  - Module D: News & AI Sentiment Engine — live news ticker + sentiment-scored headline feed + sentiment chart overlay
  - Module E: Institutional Balance Sheet Analyzer — file upload zone + health score cards + risk metrics table
- Recharts-based charts: area charts, bar charts, heatmap-style grids, order book depth
- Mock/simulated data for all modules with clear API integration point comments
- Design: deep black (#0a0a0a), neon green (#00ff88), vibrant red (#ff3355), electric blue (#00b4ff), monospace terminal font
- Motoko backend storing watchlist assets, whale alert log, sentiment scores, uploaded file metadata

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Motoko backend: actors for WatchlistAsset, WhaleAlert, SentimentScore, BalanceSheetFile
2. Frontend: App shell with TopNav + Sidebar + module router
3. Module A: LiquidityHeatmap + MacroCards with mock country data
4. Module B: WhaleAlertFeed + BlockchainTxTable with simulated WebSocket-style updates
5. Module C: AssetRankingTable + OrderBookDepthChart using Recharts
6. Module D: NewsTicker + SentimentFeed + SentimentOverlayChart
7. Module E: FileUploadZone + HealthScoreCards + RiskMetricsTable
8. Wire all frontend components to Motoko backend APIs
9. Apply deterministic data-ocid markers throughout
