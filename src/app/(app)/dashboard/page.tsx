"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Bot,
  Activity,
  Play,
  Pause,
  Shield,
  Clock,
} from "lucide-react";

/* ── Mock data ── */
const stats = [
  { label: "Portfolio Value", value: "$124,832", icon: DollarSign, change: "+12.4%", up: true },
  { label: "Total Return", value: "+18.7%", icon: TrendingUp, change: "+3.2% 24h", up: true },
  { label: "Active Agents", value: "5", icon: Bot, change: "+1 this week", up: true },
  { label: "24h P&L", value: "+$2,847", icon: Activity, change: "+3.2%", up: true },
];

const agents = [
  { name: "Alpha Momentum", pair: "BNB/USDT", status: "running", roi: "+24.8%", trades: 312, tee: true },
  { name: "Grid Master", pair: "ETH/USDT", status: "running", roi: "+12.3%", trades: 891, tee: true },
  { name: "DeFi Arb", pair: "Multi", status: "running", roi: "+31.2%", trades: 156, tee: true },
  { name: "Mean Revert", pair: "BTC/USDT", status: "paused", roi: "-2.1%", trades: 67, tee: false },
  { name: "Momentum V2", pair: "SOL/USDT", status: "running", roi: "+8.5%", trades: 203, tee: true },
];

const trades = [
  { time: "2m ago", pair: "BNB/USDT", side: "BUY", price: "$612.40", qty: "2.5 BNB", agent: "Alpha Momentum" },
  { time: "8m ago", pair: "ETH/USDT", side: "SELL", price: "$3,421", qty: "0.8 ETH", agent: "Grid Master" },
  { time: "14m ago", pair: "BTC/USDT", side: "BUY", price: "$67,892", qty: "0.05 BTC", agent: "DeFi Arb" },
  { time: "21m ago", pair: "SOL/USDT", side: "SELL", price: "$178.50", qty: "15 SOL", agent: "Momentum V2" },
  { time: "33m ago", pair: "BNB/USDT", side: "BUY", price: "$611.20", qty: "1.2 BNB", agent: "Alpha Momentum" },
];

function Spark({ up }: { up: boolean }) {
  const d = up
    ? "M0 14 L6 12 L12 10 L18 11 L24 7 L30 8 L36 4 L42 5 L48 2"
    : "M0 2 L6 5 L12 4 L18 7 L24 10 L30 8 L36 12 L42 11 L48 14";
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-14">
      <path d={d} fill="none" stroke={up ? "#10b981" : "#ef4444"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Monitor your agents and portfolio.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-md bg-secondary p-1.5">
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Spark up={s.up} />
            </div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold font-mono mt-0.5">{s.value}</p>
            <p className={`text-xs mt-1 ${s.up ? "text-emerald" : "text-rose"}`}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Agents table */}
        <div className="lg:col-span-3 glass rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">My Agents</h2>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
              {agents.filter((a) => a.status === "running").length} running
            </span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left font-medium px-4 py-2.5">Agent</th>
                <th className="text-left font-medium px-4 py-2.5">Pair</th>
                <th className="text-left font-medium px-4 py-2.5">Status</th>
                <th className="text-right font-medium px-4 py-2.5">ROI</th>
                <th className="text-right font-medium px-4 py-2.5">Trades</th>
                <th className="text-center font-medium px-4 py-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.name} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    {a.name}
                    {a.tee && <Shield className="h-3 w-3 text-purple" />}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.pair}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 ${a.status === "running" ? "text-emerald" : "text-amber"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${a.status === "running" ? "bg-emerald" : "bg-amber"}`} />
                      {a.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-mono ${a.roi.startsWith("+") ? "text-emerald" : "text-rose"}`}>{a.roi}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">{a.trades}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="rounded-md p-1 hover:bg-secondary text-muted-foreground hover:text-foreground">
                      {a.status === "running" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent trades */}
        <div className="lg:col-span-2 glass rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">Recent Trades</h2>
            <span className="text-[10px] border border-border rounded px-1.5 py-0.5 text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" /> Live
            </span>
          </div>
          <div className="divide-y divide-border">
            {trades.map((t, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                      t.side === "BUY" ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose"
                    }`}>
                      {t.side}
                    </span>
                    <span className="text-xs font-medium">{t.pair}</span>
                  </div>
                  <span className="text-xs font-mono">{t.price}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">{t.agent}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />{t.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
