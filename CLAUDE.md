# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AEGIS** — AI Trading Agent Deployment Platform for BuidlHack 2026 hackathon.
Quant trading AI agent platform with TEE privacy, no-code strategy builder, marketplace, and gamification.

Target tracks: BNB Chain, Near AI (TEE), General Track (+ Status Network TBD, YGG & Verse8 if possible).

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

## Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-nova style, base-ui primitives — NOT radix)
- **Animation**: Framer Motion
- **Flow Editor**: @xyflow/react (React Flow v12)
- **Theme**: Dark-only, cyan/purple/emerald accent palette

### Page Structure (src/app/)
- `/` — Landing page (hero, features, CTA)
- `/dashboard` — Portfolio stats, active agents, recent trades
- `/builder` — Drag & drop strategy builder + AI chat panel
- `/marketplace` — Agent cards with filters, categories, search
- `/arena` — Leaderboard, live battles, season rewards

### Key Design Patterns
- All pages are client components ("use client") due to Framer Motion
- Sidebar navigation is 72px fixed left rail (src/components/sidebar.tsx)
- Color tokens defined in globals.css as CSS variables (--cyan, --purple, --emerald, etc.)
- Custom CSS classes: `.glass`, `.gradient-text`, `.glow-cyan`, `.grid-pattern`

## Important Notes
- shadcn/ui in this project uses **base-ui** (not radix). No `asChild` prop — components render their own elements.
- Dark mode is hardcoded via `className="dark"` on html element.
- Deployment target: Vercel
- BNB Chain requirement: must deploy smart contract on BSC/opBNB with 2+ successful transactions
