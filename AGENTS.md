# AGENTS.md — Quantitative Architecture & Agent Operating Guide

Welcome to the **DELTA-Q Quant Terminal** codebase. This document serves as the single source of truth for AI agents operating on this repository.

---

## 1. Project Purpose & Domain Overview

The Delta-Q Quant Terminal is an institutional simulation engine designed to model and compare **Delta-Neutral Cash-and-Carry Hedging** across two distinct exchange margin architectures:

1. **Unified Cross-Margin Account**: 100% of capital is deployed into spot/LST collateral, which directly serves as margin to short 1x perpetual derivatives. As spot prices surge, collateral appreciation automatically cushions unrealized perp short losses.
2. **Isolated Cash Hedging**: Capital is split between Web3 spot custody (e.g., restaked assets) and a centralized exchange (CEX) cash margin account (e.g., USDC). Rallies drain cash margin, creating a strict liquidation ceiling.

---

## 2. Quantitative Mathematical Core

All financial and mathematical calculations reside strictly in [`src/math/hedging.js`](file:///c:/Users/User/crypto%20portfolio/src/math/hedging.js) and must remain **pure functions with zero DOM dependencies**.

### Key Variables & Parameters
- $C$: Initial capital in USD (default: $\$10,000$)
- $r$: Spot price percentage shock ($r = \frac{\Delta P}{100}$)
- $d$: LST depeg discount ($d = \frac{\text{depegPct}}{100}$)
- $V$: Collateral valuation ratio after haircut ($V = 1 - \text{haircut}$)
- $\text{MMR}$: Maintenance margin requirement (default: $0.005$ or $0.5\%$)
- $t$: Duration in fractional years ($t = \frac{\text{days}}{365}$)

---

### Mathematical Formulations

#### A. Unified Margin Mode
- Initial Spot Notional: $S_0 = C$
- Initial Short Notional: $N_0 = C$
- Collateral Margin Base: $M_0 = C$

**Unified Liquidation Price Shock Threshold ($r_{\text{liq}}$):**
$$\text{Equity} = S_0 (1 + r)(1 - d) V - N_0 r$$
$$\text{Maintenance Margin} = N_0 (1 + r) \text{MMR}$$

Setting $\text{Equity} = \text{Maintenance Margin}$ and solving for $r_{\text{liq}}$:
$$r_{\text{liq}} = \frac{(1 - d)V - \text{MMR}}{1 + \text{MMR} - (1 - d)V}$$

* **Inverse 1:1 ($V = 1.00, d = 0$):** $r_{\text{liq}} = \infty$ (zero liquidation risk).
* **wstETH ($V = 0.90, \text{MMR} = 0.005$):** $r_{\text{liq}} = \frac{0.895}{0.105} \approx 8.5238$ (**+852.4% price rally buffer**).
* **SOL LRT ($V = 0.85, \text{MMR} = 0.005$):** $r_{\text{liq}} = \frac{0.845}{0.155} \approx 5.4516$ (**+545.2% price rally buffer**).

**Post-Liquidation State:**
If $r \ge r_{\text{liq}}$, the short perp is liquidated, forfeiting recognized margin ($S_0 \cdot V$). The portfolio converts into a **naked long spot** position with equity $= S_0(1 + r)(1 - d) + \text{accrued yields}$.

---

#### B. Isolated Margin Mode
Capital is partitioned by spot fraction $s \in (0, 1)$:
- Spot Notional: $S_0 = C \cdot s$
- Cash Margin: $M_0 = C \cdot (1 - s)$
- Short Perp Notional: $N_0 = S_0$ (1x delta-neutral)

**Isolated Liquidation Price Shock Threshold ($r_{\text{liq}}$):**
$$r_{\text{liq}} = \frac{\frac{M_0}{N_0} - \text{MMR}}{1 + \text{MMR}} = \frac{\frac{1 - s}{s} - \text{MMR}}{1 + \text{MMR}}$$

* At 50/50 split ($s = 0.5$): Effective leverage is $1\text{x}$, and $r_{\text{liq}} = \frac{1 - 0.005}{1.005} \approx 0.9900$ (**+99.0% price rally buffer**).
* At 67/33 split ($s = 0.67$): Effective leverage is $2\text{x}$, and $r_{\text{liq}} \approx +48.5\%$.
* At 80/20 split ($s = 0.80$): Effective leverage is $4\text{x}$, and $r_{\text{liq}} \approx +24.4\%$.

---

#### C. Yield Accrual & Portfolio Accounting
$$\text{Funding Cash} = N_0 \cdot \left(\frac{\text{fundingAPR}}{100}\right) \cdot t$$
$$\text{Staking Cash} = S_0 \cdot \left(\frac{\text{stakingAPY}}{100}\right) \cdot t$$
$$\text{Depeg Loss} = S_0 (1 + r) \cdot d$$
$$\text{Total Portfolio Value} = \text{SpotVal} + \text{PerpMarginVal} + \text{Funding Cash} + \text{Staking Cash}$$
$$\text{Strategy APY} = (\text{stakingAPY} \cdot w_{\text{spot}}) + (\text{fundingAPR} \cdot w_{\text{perp}})$$

---

## 3. Institutional Domain Invariants

1. **Babylon Bitcoin LSTs (LBTC, SolvBTC.BBN):**
   Major centralized derivatives desks (Binance, OKX, Bybit) do **not** whitelist Babylon restaked BTC as cross-margin collateral. Therefore, BTC LSTs must be modeled in **Isolated Margin Mode** (custodied in Web3 to harvest Babylon staking yield, hedged with USDC cash on the exchange).
2. **Solana Staking: Nominal vs. Real Yield:**
   Solana's annual network token inflation is $\approx 5.4\%$. In a USD-hedged delta-neutral strategy, nominal token emissions dilute baseline purchasing power.
   - Nominal Yield: $\approx 7.2\%$
   - Real Economic Yield: $\approx 1.8\%$ ($7.2\% - 5.4\%$)

---

## 4. Repository Architecture

```
crypto portfolio/
├── .gemini/
│   └── rules/
│       └── git-workflow.md     # Standing orders: git branching, tests, commits
├── .gitignore                  # Standard ignores for web & testing
├── AGENTS.md                   # This specification file
├── tsconfig.json               # TypeScript strict configuration
├── vite.config.ts              # Vite & Vitest configuration (port 3000, HMR)
├── package.json                # Scripts: dev, build, test, typecheck
├── index.html                  # Semantic UI (Tailwind CSS, Plus Jakarta Sans, JetBrains Mono)
├── styles.css                  # Custom scrollbars, glow effects, slider aesthetics
├── tests/
│   └── hedging.test.ts         # Vitest suite (14+ invariant tests)
└── src/
    ├── config/
    │   └── presets.ts          # Whitelist presets, haircut ratios, metadata
    ├── math/
    │   └── hedging.ts          # Pure quant calculations & liquidation math
    ├── ui/
    │   ├── chart.ts            # HTML5 Canvas 2D engine, curves, bands, tooltips
    │   └── dom.ts              # DOM element bindings, sliders, badges, KPI renderers
    └── app.ts                  # State store & reactive orchestration entrypoint
```

---

## 5. Agent Runbooks & Operating Rules

### Runbook 1: Running Tests & Type Checks
Before committing or completing any task:
```bash
npm test              # Vitest test suite
npm run typecheck     # Strict TypeScript compiler verification
```
*Both must pass 100% with zero errors or regressions.*

### Runbook 2: Adding a New Collateral Preset
1. Open [`src/config/presets.ts`](file:///c:/Users/User/crypto%20portfolio/src/config/presets.ts).
2. Add the entry to `COLLATERAL_PRESETS` with `collateralRatio`, `stakingAPY`, `defaultAsset`, `badgeLabel`, and `explainer`.
3. Update [`src/config/presets.ts`](file:///c:/Users/User/crypto%20portfolio/src/config/presets.ts) `getInstrumentDetails()`.
4. Add corresponding test in [`tests/hedging.test.ts`](file:///c:/Users/User/crypto%20portfolio/tests/hedging.test.ts) asserting expected $r_{\text{liq}}$.
5. Run `npm test && npm run typecheck`.

### Runbook 3: Modifying Quant Math
1. Edit [`src/math/hedging.ts`](file:///c:/Users/User/crypto%20portfolio/src/math/hedging.ts). Keep functions pure and strictly typed.
2. Update/add tests in [`tests/hedging.test.ts`](file:///c:/Users/User/crypto%20portfolio/tests/hedging.test.ts).
3. Verify with `npm test && npm run typecheck`.
4. Check for floating-point precision comparisons (use delta checks `Math.abs(a - b) < 1e-6` or `toBeCloseTo`).

### Runbook 4: Git Workflow Protocol
Follow [`.gemini/rules/git-workflow.md`](file:///c:/Users/User/crypto%20portfolio/.gemini/rules/git-workflow.md):
- Check `git status` before starting.
- Create topic branches for non-trivial tasks (`feat/...`, `fix/...`).
- Run `git diff` to self-review before committing.
- Commit atomically using Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`).
- Merge cleanly to `master` and delete the topic branch.

