"use client";

import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Plus,
  TrendingUp,
  BarChart3,
  Filter,
  Zap,
  Shield,
  Activity,
  Play,
  Save,
  Undo2,
  Redo2,
  ChevronDown,
  X,
  Clock,
  Globe,
  GitBranch,
  ShieldCheck,
  Target,
  AlertTriangle,
} from "lucide-react";

/* ── Node component ── */
function StrategyNode({ data, selected }: { data: Record<string, string>; selected?: boolean }) {
  const cm: Record<string, string> = {
    trigger: "cyan",
    indicator: "purple",
    condition: "amber",
    action: "emerald",
    risk: "rose",
  };
  const color = cm[data.type] || "cyan";
  const icons: Record<string, React.ElementType> = {
    TrendingUp, BarChart3, Filter, Zap, Activity, Clock, Globe, GitBranch, ShieldCheck, Target, AlertTriangle,
  };
  const Icon = icons[data.icon] || Zap;

  return (
    <div
      className={`rounded-xl border bg-card p-3.5 min-w-[160px] max-w-[200px] transition-shadow ${
        selected ? "glow-cyan border-cyan/40" : "border-border"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-cyan !border-[2px] !border-background !-left-1" />
      <div className="flex items-center gap-2 mb-1">
        <div className={`rounded-md p-1 bg-${color}/10`}>
          <Icon className={`h-3.5 w-3.5 text-${color}`} />
        </div>
        <span className="text-xs font-semibold truncate">{data.label}</span>
      </div>
      <p className="text-[10px] leading-snug text-muted-foreground">{data.desc}</p>
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-cyan !border-[2px] !border-background !-right-1" />
    </div>
  );
}

const nodeTypes = { strategy: StrategyNode };

/* ── initial demo flow ── */
const initNodes: Node[] = [
  { id: "1", type: "strategy", position: { x: 60, y: 140 }, data: { label: "BNB/USDT Feed", type: "trigger", icon: "TrendingUp", desc: "1h candles" } },
  { id: "2", type: "strategy", position: { x: 320, y: 60 }, data: { label: "RSI (14)", type: "indicator", icon: "BarChart3", desc: "Oversold < 30" } },
  { id: "3", type: "strategy", position: { x: 320, y: 220 }, data: { label: "EMA Cross", type: "indicator", icon: "BarChart3", desc: "9 / 21 EMA" } },
  { id: "4", type: "strategy", position: { x: 560, y: 140 }, data: { label: "AND", type: "condition", icon: "Filter", desc: "All true" } },
  { id: "5", type: "strategy", position: { x: 780, y: 100 }, data: { label: "Market Buy", type: "action", icon: "Zap", desc: "2% of portfolio" } },
  { id: "6", type: "strategy", position: { x: 780, y: 200 }, data: { label: "Stop Loss", type: "risk", icon: "AlertTriangle", desc: "-3% from entry" } },
];

const initEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
  { id: "e4-6", source: "4", target: "6", animated: true },
];

/* ── Node palette ── */
const palette = [
  { cat: "Trigger", items: [
    { label: "Price Feed", type: "trigger", icon: "TrendingUp", desc: "Real-time OHLCV" },
    { label: "Time Trigger", type: "trigger", icon: "Clock", desc: "Schedule-based" },
    { label: "On-Chain Event", type: "trigger", icon: "Globe", desc: "Whale / large tx" },
  ]},
  { cat: "Indicator", items: [
    { label: "SMA / EMA", type: "indicator", icon: "BarChart3", desc: "Moving Average" },
    { label: "RSI", type: "indicator", icon: "BarChart3", desc: "Relative Strength" },
    { label: "MACD", type: "indicator", icon: "BarChart3", desc: "Convergence / Div" },
    { label: "Bollinger", type: "indicator", icon: "BarChart3", desc: "Bands & squeeze" },
    { label: "Volume", type: "indicator", icon: "Activity", desc: "Volume spike" },
  ]},
  { cat: "Condition", items: [
    { label: "Crosses Above", type: "condition", icon: "GitBranch", desc: "A crosses above B" },
    { label: "Crosses Below", type: "condition", icon: "GitBranch", desc: "A crosses below B" },
    { label: "AND Gate", type: "condition", icon: "Filter", desc: "All conditions met" },
    { label: "OR Gate", type: "condition", icon: "Filter", desc: "Any condition met" },
    { label: "Threshold", type: "condition", icon: "Target", desc: "Value > or < X" },
  ]},
  { cat: "Action", items: [
    { label: "Market Buy", type: "action", icon: "Zap", desc: "Buy at market price" },
    { label: "Market Sell", type: "action", icon: "Zap", desc: "Sell at market price" },
    { label: "Limit Order", type: "action", icon: "Zap", desc: "Limit buy / sell" },
    { label: "Take Profit", type: "action", icon: "Zap", desc: "TP at target %" },
    { label: "Trailing Stop", type: "action", icon: "Zap", desc: "Dynamic stop" },
  ]},
  { cat: "Risk", items: [
    { label: "Stop Loss", type: "risk", icon: "AlertTriangle", desc: "Max loss per trade" },
    { label: "Max Position", type: "risk", icon: "ShieldCheck", desc: "Position size limit" },
    { label: "Max Drawdown", type: "risk", icon: "ShieldCheck", desc: "Auto-pause agent" },
    { label: "Cooldown", type: "risk", icon: "Clock", desc: "Min time between trades" },
  ]},
];

export default function BuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [menuOpen, setMenuOpen] = useState(false);
  const idRef = useRef(7);

  const onConnect = useCallback(
    (p: Connection) => setEdges((es) => addEdge({ ...p, animated: true }, es)),
    [setEdges],
  );

  const addNode = (item: (typeof palette)[0]["items"][0]) => {
    const id = String(idRef.current++);
    const newNode: Node = {
      id,
      type: "strategy",
      position: { x: 400 + Math.random() * 120, y: 120 + Math.random() * 120 },
      data: { ...item },
    };
    setNodes((ns) => [...ns, newNode]);
    setMenuOpen(false);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-[#08080c] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <input
            defaultValue="My Strategy"
            className="bg-transparent text-sm font-semibold outline-none w-32 border-b border-transparent focus:border-cyan/40"
          />
          <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 flex items-center gap-1">
            <Shield className="h-3 w-3 text-purple" /> TEE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Pair + Timeframe */}
          <button className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs hover:bg-muted">
            BNB/USDT <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs hover:bg-muted">
            1H <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          <div className="mx-1.5 h-4 w-px bg-border" />

          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" title="Undo">
            <Undo2 className="h-4 w-4" />
          </button>
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" title="Redo">
            <Redo2 className="h-4 w-4" />
          </button>

          <div className="mx-1.5 h-4 w-px bg-border" />

          <button className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-1.5">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
          <button className="rounded-md bg-purple/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" /> Backtest
          </button>
          <button className="rounded-md bg-cyan px-3 py-1.5 text-xs font-semibold text-black hover:bg-cyan/90 flex items-center gap-1.5">
            <Play className="h-3.5 w-3.5" /> Deploy
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          className="!bg-[#08080e]"
        >
          <Background color="rgba(255,255,255,0.03)" gap={32} size={1} />
          <Controls showInteractive={false} />
          <MiniMap nodeColor="#06b6d4" maskColor="rgba(6,6,10,0.85)" pannable />
        </ReactFlow>

        {/* Floating add button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute bottom-6 left-6 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan text-black shadow-lg shadow-cyan/20 transition-transform hover:scale-105"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>

        {/* Node palette popup */}
        {menuOpen && (
          <div className="absolute bottom-20 left-6 z-10 w-64 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="max-h-[420px] overflow-y-auto p-2">
              {palette.map((group) => (
                <div key={group.cat} className="mb-2">
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.cat}
                  </p>
                  {group.items.map((item) => {
                    const cm: Record<string, string> = { trigger: "cyan", indicator: "purple", condition: "amber", action: "emerald", risk: "rose" };
                    const c = cm[item.type] || "cyan";
                    const icons: Record<string, React.ElementType> = {
                      TrendingUp, BarChart3, Filter, Zap, Activity, Clock, Globe, GitBranch, ShieldCheck, Target, AlertTriangle,
                    };
                    const Icon = icons[item.icon] || Zap;
                    return (
                      <button
                        key={item.label}
                        onClick={() => addNode(item)}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-secondary"
                      >
                        <div className={`rounded-md p-1 bg-${c}/10`}>
                          <Icon className={`h-3.5 w-3.5 text-${c}`} />
                        </div>
                        <div>
                          <p className="text-xs font-medium">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
