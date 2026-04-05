"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const agents = [
  { rank: 1, name: "Alpha Apex", creator: "0x7f2e...d4a1", pair: "BNB/USDT", roi: 312.7, winRate: 74.2, trades: 1847, duration: "8 months", tee: true, sparkUp: true },
  { rank: 2, name: "Quantum Scalper", creator: "0x3a1b...f8c2", pair: "ETH/USDT", roi: 267.4, winRate: 69.8, trades: 3421, duration: "6 months", tee: true, sparkUp: true },
  { rank: 3, name: "DeFi Oracle", creator: "0x9c4d...e7b3", pair: "Multi", roi: 198.2, winRate: 72.1, trades: 1234, duration: "11 months", tee: true, sparkUp: true },
  { rank: 4, name: "Grid Phantom", creator: "0x5e8f...a2d4", pair: "BNB/USDT", roi: 156.8, winRate: 81.3, trades: 4567, duration: "4 months", tee: false, sparkUp: true },
  { rank: 5, name: "Momentum Beast", creator: "0x2b7a...c5e6", pair: "SOL/USDT", roi: 143.2, winRate: 66.5, trades: 2156, duration: "9 months", tee: true, sparkUp: true },
  { rank: 6, name: "Arb Lightning", creator: "0x8d3c...b9f7", pair: "Multi", roi: 128.9, winRate: 87.2, trades: 5678, duration: "3 months", tee: true, sparkUp: true },
  { rank: 7, name: "Sentiment Wolf", creator: "0x1f6e...d8a9", pair: "BTC/USDT", roi: 112.4, winRate: 63.8, trades: 876, duration: "7 months", tee: false, sparkUp: true },
  { rank: 8, name: "Mean Rev Pro", creator: "0x4c9b...e1f2", pair: "ETH/USDT", roi: 98.7, winRate: 70.4, trades: 1987, duration: "5 months", tee: true, sparkUp: true },
  { rank: 9, name: "Volume Tracker", creator: "0xab12...9e3c", pair: "BNB/USDT", roi: 87.3, winRate: 65.1, trades: 2341, duration: "10 months", tee: false, sparkUp: false },
  { rank: 10, name: "Trend Rider", creator: "0xcd45...7f2a", pair: "SOL/USDT", roi: 76.5, winRate: 61.9, trades: 1432, duration: "2 months", tee: true, sparkUp: true },
];

function MiniSpark({ up }: { up: boolean }) {
  const d = up
    ? "M0 12 L4 10 L8 11 L12 7 L16 8 L20 5 L24 6 L28 3 L32 4 L36 2"
    : "M0 2 L4 4 L8 3 L12 6 L16 5 L20 8 L24 7 L28 10 L32 9 L36 12";
  return (
    <svg viewBox="0 0 36 14" className="h-4 w-12">
      <path d={d} fill="none" stroke={up ? "#10b981" : "#ef4444"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const cls =
    rank === 1
      ? "bg-amber/10 text-amber border-amber/30"
      : rank === 2
      ? "bg-zinc-300/10 text-zinc-300 border-zinc-300/30"
      : rank === 3
      ? "bg-orange-400/10 text-orange-400 border-orange-400/30"
      : "bg-secondary text-muted-foreground border-border";
  return (
    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border text-xs font-bold ${cls}`}>
      {rank}
    </span>
  );
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"roi" | "winRate" | "trades" | "duration">("roi");

  const filtered = agents
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "roi") return b.roi - a.roi;
      if (sortKey === "winRate") return b.winRate - a.winRate;
      if (sortKey === "trades") return b.trades - a.trades;
      return 0;
    });

  return (
    <div className="p-6 lg:p-8 space-y-5">
      <div>
        <h1 className="text-xl font-bold">Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Explore agents ranked by real performance. Strategies stay private.</p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents..."
            className="w-full rounded-lg border border-border bg-secondary pl-9 pr-3 py-2 text-sm outline-none focus:border-cyan/40 placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {(["roi", "winRate", "trades"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setSortKey(k)}
              className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                sortKey === k
                  ? "border-cyan/40 bg-cyan/10 text-cyan"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {k === "roi" ? "ROI" : k === "winRate" ? "Win Rate" : "Trades"}
            </button>
          ))}
          <button className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5">
            Filters <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left font-medium px-4 py-3 w-12">#</th>
              <th className="text-left font-medium px-4 py-3">Agent</th>
              <th className="text-left font-medium px-4 py-3">Pair</th>
              <th className="text-right font-medium px-4 py-3 cursor-pointer select-none" onClick={() => setSortKey("roi")}>
                <span className="inline-flex items-center gap-1">ROI {sortKey === "roi" && <ArrowDown className="h-3 w-3 text-cyan" />}</span>
              </th>
              <th className="text-right font-medium px-4 py-3 cursor-pointer select-none" onClick={() => setSortKey("winRate")}>
                <span className="inline-flex items-center gap-1">Win Rate {sortKey === "winRate" && <ArrowDown className="h-3 w-3 text-cyan" />}</span>
              </th>
              <th className="text-right font-medium px-4 py-3 cursor-pointer select-none" onClick={() => setSortKey("trades")}>
                <span className="inline-flex items-center gap-1">Trades {sortKey === "trades" && <ArrowDown className="h-3 w-3 text-cyan" />}</span>
              </th>
              <th className="text-left font-medium px-4 py-3">Duration</th>
              <th className="text-center font-medium px-4 py-3 w-14">Chart</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <motion.tr
                key={a.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3"><RankBadge rank={a.rank} /></td>
                <td className="px-4 py-3">
                  <div>
                    <span className="font-medium flex items-center gap-1.5">
                      {a.name}
                      {a.tee && <Shield className="h-3 w-3 text-purple" />}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{a.creator}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{a.pair}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-emerald">+{a.roi}%</td>
                <td className="px-4 py-3 text-right font-mono">{a.winRate}%</td>
                <td className="px-4 py-3 text-right font-mono text-muted-foreground">{a.trades.toLocaleString()}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.duration}</td>
                <td className="px-4 py-3 flex justify-center"><MiniSpark up={a.sparkUp} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
