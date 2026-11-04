# Crypto Staked Basis (DELTA-Q Quant Engine)

[![Live Demo](https://img.shields.io/badge/Live%20Terminal-Online%20Simulation-06b6d4?style=flat-square&logo=googlechrome&logoColor=white)](https://noobchester.github.io/crypto-staked-basis-engine/)
[![Tests](https://img.shields.io/badge/tests-53%2F53%20passing-emerald?style=flat-square&logo=vitest)](tests/hedging.test.ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20strict-blue?style=flat-square&logo=typescript)](tsconfig.json)
[![Vite](https://img.shields.io/badge/Vite-HMR%20active-646CFF?style=flat-square&logo=vite)](vite.config.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square)](LICENSE)

<div align="center">
  <br />
  <a href="https://noobchester.github.io/crypto-staked-basis-engine/">
    <img src="https://img.shields.io/badge/▶_LAUNCH_QUANT_TERMINAL-080d1a?style=for-the-badge&logoColor=06b6d4&color=06b6d4" height="42" alt="Launch Live Quant Terminal" />
  </a>
  <p><em>Click to simulate institutional cash-and-carry carry arbitrage in-browser (Zero Install, Zero Server)</em></p>
  <br />
</div>

An institutional quantitative modeling, simulation, and risk engine designed for **Crypto Staked Basis Trading** (cash-and-carry carry arbitrage, popularized by protocols like Ethena).

This platform models capital efficiency, yield compounding, and exchange liquidation risk across **Unified Cross-Margin Accounts** vs. **Isolated Cash Hedging**.

---

## The Quantitative Strategy: Staked Basis Carry

A staked basis trade combines an income-generating spot asset with a 1x short perpetual contract to create a delta-neutral ($\Delta = 0$) synthetic dollar position that harvests dual cash flows:

$$\text{Strategy APY} = (\text{Staking APY} \cdot w_{\text{spot}}) + (\text{Funding APR} \cdot w_{\text{perp}})$$

1. **Spot Long Leg**: Liquid Staking / Restaking Tokens (wstETH, JitoSOL, Babylon LBTC/SolvBTC) generating protocol staking yield.
2. **Derivative Short Leg**: 1x Linear or Inverse Perpetual Short on centralized derivatives desks (Binance, OKX, Bybit), neutralizing directional price beta and capturing positive funding rate premiums paid by leveraged long traders.

---

## The Core Problem: Exchange Margin Liquidation

In traditional finance, a cash-and-carry trade is virtually immune to liquidation because spot physically delivers into futures. In crypto derivatives, however, **margin architecture creates asymmetric upside liquidation risk during parabolic rallies**:

### 1. Isolated Cash Margin (High Liquidation Risk)
Spot is custodied in Web3 or cold storage, while the short perp is margined in cash (e.g., USDC) on a CEX.
- As the asset price rallies ($+r$), unrealized losses drain the cash margin.
- **Liquidation Threshold**:
  $$r_{\text{liq}} = \frac{\frac{M_0}{N_0} - \text{MMR}}{1 + \text{MMR}}$$
  *At a 50/50 capital split ($1\text{x}$ effective leverage), a **$+99.0\%$ price surge wipes the margin account**, leaving the trader with an unintended naked long spot position.*

### 2. Unified Cross-Margin (Collateral-Cushioned)
100% of capital is deployed into spot/LST collateral directly on the exchange to back the short perp.
- As the asset rallies, spot collateral appreciates in value, automatically offsetting short perp losses.
- **Liquidation Threshold**:
  $$r_{\text{liq}} = \frac{(1 - d)V - \text{MMR}}{1 + \text{MMR} - (1 - d)V}$$
  *Where $V = (1 - \text{haircut})$ and $d = \text{depeg discount}$.*
  *For wstETH ($10\%$ haircut, $V = 0.90$), the liquidation buffer expands to **$+852.4\%$ price surge**.*
  *For Inverse COIN-M ($V = 1.00$), liquidation risk is **mathematically zero ($\infty$)**.*

---

## Institutional Domain Features

- **Macro Stress-Test & Crisis Scenario Matrix**: 1-click institutional simulation of 6 historical and extreme market regimes (Celsius 2022 LST De-Peg freeze, Post-FTX Inverted Carry, Parabolic Bull Squeeze 2x, Exchange Haircut Slash, Macro Flash Crash, and Altcoin Meme Mania) with live margin risk diagnostic verdicts.
- **Babylon Bitcoin LST Routing**: Centralized derivatives desks do not whitelist restaked BTC (LBTC, SolvBTC) for cross-margin collateral. The engine models them under Isolated Margin (held in Web3 custody to harvest ~3.2% yield, hedged with USDC on-exchange).
- **Nominal vs. Real Yield Modeling**: Solana's ~5.4% annual network token inflation dilutes USD-hedged purchasing power. The platform models both Nominal APY (~7.2%) and Real Economic Yield (~1.8%).
- **LST Depeg Stress Testing**: Simulates liquidity crisis discounts ($d$) and their direct contraction of the liquidation safety cushion.
- **HTML5 Canvas 2D Engine**: Zero-dependency 60fps canvas renderer featuring dynamic PnL curves, liquidation danger cliff bands, entry baselines, and position pins.

---

## Architecture & Codebase Map

Zero external npm build dependencies. Uses native browser ES Modules and Node.js built-in test runner.

```
crypto-staked-basis/
├── .gemini/
│   └── rules/
│       └── git-workflow.md     # Standing orders: git branching, tests, commits
├── AGENTS.md                   # Quant specification & AI agent operating runbooks
├── package.json                # "type": "module", "scripts": { "test": "node --test" }
├── index.html                  # Semantic UI (Tailwind CSS, Plus Jakarta Sans, JetBrains Mono)
├── styles.css                  # Custom scrollbars, glow effects, slider aesthetics
├── tests/
│   └── hedging.test.js         # Built-in Node test suite (14+ invariant tests)
└── src/
    ├── config/
    │   └── presets.js          # Whitelist presets, haircut ratios, metadata
    ├── math/
    │   └── hedging.js          # Pure quant calculations & liquidation math
    ├── ui/
    │   ├── chart.js            # HTML5 Canvas 2D engine, curves, bands, tooltips
    │   └── dom.js              # DOM element bindings, sliders, badges, KPI renderers
    └── app.js                  # State store & reactive orchestration entrypoint
```

---

## Quickstart

### 1. Launching the Development Server (with Instant HMR)

Start Vite to launch the interactive terminal with real-time Hot Module Replacement:

```bash
npm run dev
```

*Opens at `http://localhost:3000`. Any edits to calculations or canvas curves update the browser instantly in milliseconds without refreshing.*

### 2. Running Automated Tests & Type Checking

```bash
# Run Vitest test suite
npm test

# Run strict TypeScript compiler verification
npm run typecheck

# Build optimized production bundle
npm run build
```

---

## Quantitative Agent Workflow

This repository is optimized for autonomous AI coding agents (Antigravity, Gemini, Claude Code):
- **[`AGENTS.md`](file:///c:/Users/User/crypto%20portfolio/AGENTS.md)** provides domain formulas, derivations, and developer runbooks automatically to incoming agents.
- **[`.gemini/rules/git-workflow.md`](file:///c:/Users/User/crypto%20portfolio/.gemini/rules/git-workflow.md)** enforces atomic commits, branch isolation, and mandatory test passes before merging.

---

## Development Roadmap

- [x] **Phase 1: Analytical Engine & Visualizer**
  - Pure mathematical calculation engine ([`src/math/hedging.js`](file:///c:/Users/User/crypto%20portfolio/src/math/hedging.js)).
  - Unified vs Isolated liquidation runway simulation.
  - Interactive HTML5 Canvas PnL curve with hover inspections.
- [ ] **Phase 2: Live Market Data Ingestion**
  - Real-time perpetual funding rates from Binance, OKX, and Bybit via REST/WebSocket.
  - On-chain staking yield feeds (Lido wstETH, JitoSOL, Babylon staking APRs).
- [ ] **Phase 3: Historical Backtesting Engine**
  - Multi-year basis spread and funding rate historical data replay.
  - Historical drawdown and volatility shock stress testing.
- [ ] **Phase 4: Automated Rebalancing & Execution Hooks**
  - Alerts when liquidation runway approaches threshold $<20\%$.
  - Rebalancing hooks to dynamically transfer collateral between Web3 and CEX accounts.

---

## License

MIT © NoobChester

