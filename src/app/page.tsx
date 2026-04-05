"use client";

import { motion } from "framer-motion";
import { Shield, Workflow, Store, Swords, ArrowRight, Lock, Cpu, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Workflow,
    title: "No-Code Builder",
    desc: "Build trading strategies with drag & drop nodes. Configure indicators, set conditions, and deploy — zero coding required.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "TEE Security",
    desc: "Your strategies, API keys, and trade data are encrypted inside Trusted Execution Environments. Nobody can see them — not even us.",
    color: "purple",
  },
  {
    icon: Store,
    title: "Marketplace",
    desc: "Explore community agents ranked by real performance. Strategies stay private — only results are public.",
    color: "emerald",
  },
  {
    icon: Swords,
    title: "Arena",
    desc: "Enter tournaments, compete with other agents, and win the prize pool. Put your strategy to the ultimate test.",
    color: "amber",
  },
];

const stack = [
  { icon: Cpu, label: "BNB Chain" },
  { icon: Lock, label: "NEAR AI TEE" },
  { icon: Zap, label: "opBNB" },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* bg */}
      <div className="fixed inset-0 grid-pattern" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      <div className="fixed -top-40 left-[18%] h-[420px] w-[420px] rounded-full bg-cyan/[0.04] blur-[120px]" />
      <div className="fixed top-32 right-[12%] h-[340px] w-[340px] rounded-full bg-purple/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-1.5 text-sm text-cyan"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
            Secured by TEE on BNB Chain
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl"
          >
            Build & Deploy AI Trading
            <br />
            Agents{" "}
            <span className="gradient-text">Privately</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Create quant strategies with no-code tools, deploy AI agents on-chain, and
            trade with confidence — all encrypted inside TEE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-9"
          >
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan/90"
            >
              Build Your Agent <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* stack badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-14 flex gap-3"
          >
            {stack.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3.5 py-2 text-xs text-muted-foreground"
              >
                <s.icon className="h-3.5 w-3.5 text-cyan" />
                {s.label}
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <section className="pb-32">
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Everything you need to <span className="gradient-text">trade smarter</span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-2xl p-7 transition-all hover:glow-cyan"
              >
                <div
                  className={`mb-3 inline-flex rounded-lg p-2.5 ${
                    f.color === "cyan"
                      ? "bg-cyan/10"
                      : f.color === "purple"
                      ? "bg-purple/10"
                      : f.color === "emerald"
                      ? "bg-emerald/10"
                      : "bg-amber/10"
                  }`}
                >
                  <f.icon
                    className={`h-5 w-5 ${
                      f.color === "cyan"
                        ? "text-cyan"
                        : f.color === "purple"
                        ? "text-purple"
                        : f.color === "emerald"
                        ? "text-emerald"
                        : "text-amber"
                    }`}
                  />
                </div>
                <h3 className="mb-1.5 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
