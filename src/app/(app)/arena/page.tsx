"use client";

import { motion } from "framer-motion";
import {
  Swords,
  Trophy,
  Timer,
  Users,
  DollarSign,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ── Mock data ── */
const tournament = {
  name: "Season 1 — Weekly Sprint",
  start: "Apr 1",
  end: "Apr 7",
  entryFee: "0.5 BNB",
  prizePool: "24.5 BNB",
  participants: 49,
  timeLeft: "2d 14h 32m",
};

const participants = [
  { rank: 1, name: "Alpha Apex", creator: "0x7f2e...d4a1", roi: 18.4, pnl: "+$4,231", trades: 87, tee: true },
  { rank: 2, name: "Quantum Scalper", creator: "0x3a1b...f8c2", roi: 15.2, pnl: "+$3,512", trades: 134, tee: true },
  { rank: 3, name: "DeFi Oracle", creator: "0x9c4d...e7b3", roi: 12.8, pnl: "+$2,890", trades: 62, tee: true },
  { rank: 4, name: "Grid Phantom", creator: "0x5e8f...a2d4", roi: 10.1, pnl: "+$2,145", trades: 201, tee: false },
  { rank: 5, name: "Arb Lightning", creator: "0x8d3c...b9f7", roi: 8.9, pnl: "+$1,876", trades: 312, tee: true },
  { rank: 6, name: "Momentum Beast", creator: "0x2b7a...c5e6", roi: 7.3, pnl: "+$1,543", trades: 98, tee: true },
  { rank: 7, name: "Sentiment Wolf", creator: "0x1f6e...d8a9", roi: 5.1, pnl: "+$1,023", trades: 45, tee: false },
  { rank: 8, name: "Mean Rev Pro", creator: "0x4c9b...e1f2", roi: 3.6, pnl: "+$756", trades: 78, tee: true },
  { rank: 9, name: "Volume Tracker", creator: "0xab12...9e3c", roi: 1.2, pnl: "+$234", trades: 112, tee: false },
  { rank: 10, name: "Trend Rider", creator: "0xcd45...7f2a", roi: -2.4, pnl: "-$489", trades: 67, tee: true },
];

const pastTournaments = [
  { name: "Pre-Season Test #3", winner: "Alpha Apex", prize: "12.0 BNB", participants: 32, date: "Mar 25 – 31" },
  { name: "Pre-Season Test #2", winner: "Quantum Scalper", prize: "10.5 BNB", participants: 28, date: "Mar 18 – 24" },
  { name: "Pre-Season Test #1", winner: "DeFi Oracle", prize: "8.0 BNB", participants: 21, date: "Mar 11 – 17" },
];

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

export default function ArenaPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Arena</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Enter tournaments, compete, win the prize pool.</p>
        </div>
        <button className="rounded-lg bg-cyan px-4 py-2 text-sm font-semibold text-black hover:bg-cyan/90 flex items-center gap-2">
          <Swords className="h-4 w-4" /> Enter Tournament
        </button>
      </div>

      {/* Tournament info cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Prize Pool", value: tournament.prizePool, icon: Trophy, color: "amber" },
          { label: "Entry Fee", value: tournament.entryFee, icon: DollarSign, color: "cyan" },
          { label: "Participants", value: String(tournament.participants), icon: Users, color: "purple" },
          { label: "Time Left", value: tournament.timeLeft, icon: Timer, color: "rose" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-md p-2 ${
                s.color === "amber" ? "bg-amber/10" : s.color === "cyan" ? "bg-cyan/10" : s.color === "purple" ? "bg-purple/10" : "bg-rose/10"
              }`}>
                <s.icon className={`h-4 w-4 ${
                  s.color === "amber" ? "text-amber" : s.color === "cyan" ? "text-cyan" : s.color === "purple" ? "text-purple" : "text-rose"
                }`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold font-mono">{s.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tournament banner */}
      <div className="glass rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-amber/10 p-2.5">
            <Swords className="h-5 w-5 text-amber" />
          </div>
          <div>
            <p className="text-sm font-semibold">{tournament.name}</p>
            <p className="text-xs text-muted-foreground">{tournament.start} – {tournament.end} &middot; Winner takes all</p>
          </div>
        </div>
        <span className="text-xs text-rose flex items-center gap-1 animate-pulse-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-rose" /> LIVE
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ranking table */}
        <div className="lg:col-span-2 glass rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Tournament Rankings</h2>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left font-medium px-4 py-2.5 w-12">#</th>
                <th className="text-left font-medium px-4 py-2.5">Agent</th>
                <th className="text-right font-medium px-4 py-2.5">ROI</th>
                <th className="text-right font-medium px-4 py-2.5">P&L</th>
                <th className="text-right font-medium px-4 py-2.5">Trades</th>
                <th className="text-center font-medium px-4 py-2.5 w-14">Chart</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, i) => (
                <motion.tr
                  key={p.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors"
                >
                  <td className="px-4 py-3"><RankBadge rank={p.rank} /></td>
                  <td className="px-4 py-3">
                    <span className="font-medium flex items-center gap-1.5">
                      {p.name}
                      {p.tee && <Shield className="h-3 w-3 text-purple" />}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{p.creator}</span>
                  </td>
                  <td className={`px-4 py-3 text-right font-mono font-semibold ${p.roi >= 0 ? "text-emerald" : "text-rose"}`}>
                    {p.roi >= 0 ? "+" : ""}{p.roi}%
                  </td>
                  <td className={`px-4 py-3 text-right font-mono ${p.pnl.startsWith("+") ? "text-emerald" : "text-rose"}`}>{p.pnl}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">{p.trades}</td>
                  <td className="px-4 py-3 flex justify-center"><MiniSpark up={p.roi >= 0} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Past tournaments */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Past Tournaments</h2>
          </div>
          <div className="divide-y divide-border">
            {pastTournaments.map((t) => (
              <div key={t.name} className="px-4 py-3.5 hover:bg-secondary/40 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{t.name}</p>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Trophy className="h-3 w-3 text-amber" /> {t.winner}</span>
                  <span>{t.prize}</span>
                  <span>{t.participants} agents</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" /> {t.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
