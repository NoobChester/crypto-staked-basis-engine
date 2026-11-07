import { describe, it, expect } from 'vitest';
import { calculateOutcome, calculateDynamicBorrowAPR, fmtUSD, fmtPct } from '../src/math/hedging.js';

describe('Delta-Neutral Hedging Quantitative Core', () => {

  describe('Core Invariants - Unified Margin Mode', () => {
    it('calculates wstETH (10% haircut) liquidation threshold at ~+852.38%', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        depegPct: 0,
        days: 90,
        fundingAPR: 10.0,
        stakingAPY: 3.2
      });

      expect(res.isLiquidated).toBe(false);
      expect(Math.abs(res.rLiq - 8.5238)).toBeLessThan(0.001);
      expect(Math.abs(res.distanceToLiqPct - 852.38)).toBeLessThan(1.0);
    });

    it('triggers liquidation on unified account when price surge exceeds threshold', () => {
      const preLiq = calculateOutcome(850, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        depegPct: 0
      });
      expect(preLiq.isLiquidated).toBe(false);

      const postLiq = calculateOutcome(853, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        depegPct: 0
      });
      expect(postLiq.isLiquidated).toBe(true);
      expect(postLiq.perpMarginVal).toBe(0);
      expect(postLiq.netDelta).toBeGreaterThan(0);
    });

    it('ensures Inverse 100% margin has infinite liquidation runway', () => {
      const res = calculateOutcome(10000, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 1.00,
        mmr: 0.005,
        depegPct: 0
      });

      expect(res.rLiq).toBe(Infinity);
      expect(res.isLiquidated).toBe(false);
      expect(res.distanceToLiqPct).toBe(Infinity);
    });
  });

  describe('Core Invariants - Isolated Margin Mode', () => {
    it('calculates isolated 50/50 split liquidation at ~+99.00%', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'isolated',
        splitSpot: 50,
        mmr: 0.005,
        depegPct: 0
      });

      expect(res.S0).toBe(5000);
      expect(res.M0).toBe(5000);
      expect(res.N0).toBe(5000);
      expect(Math.abs(res.rLiq - 0.99)).toBeLessThan(0.001);
      expect(res.isLiquidated).toBe(false);
    });

    it('liquidates short margin when rally exceeds buffer', () => {
      const safe = calculateOutcome(98, {
        capital: 10000,
        mode: 'isolated',
        splitSpot: 50,
        mmr: 0.005
      });
      expect(safe.isLiquidated).toBe(false);

      const wiped = calculateOutcome(100, {
        capital: 10000,
        mode: 'isolated',
        splitSpot: 50,
        mmr: 0.005
      });
      expect(wiped.isLiquidated).toBe(true);
      expect(wiped.perpMarginVal).toBe(0);
      expect(wiped.perpPnL).toBe(-5000);
    });
  });

  describe('Depeg and Yield Accounting', () => {
    it('applies depeg discount loss to spot collateral', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 5.0,
        days: 90,
        fundingAPR: 0,
        stakingAPY: 0
      });

      expect(res.spotVal).toBe(9500);
      expect(res.depegLoss).toBe(500);
      expect(res.totalPortfolioVal).toBe(9500);
    });

    it('correctly accrues simultaneous funding and staking yields', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0,
        days: 365,
        fundingAPR: 10.0,
        stakingAPY: 3.2
      });

      expect(res.fundingYieldTotal).toBe(1000);
      expect(res.stakingYieldTotal).toBe(320);
      expect(res.totalPortfolioVal).toBe(11320);
      expect(res.totalStrategyAPY).toBe(13.2);
    });
  });

  describe('Net Realized APY & Fee Drag Accounting', () => {
    it('scales fee drag inversely with duration (30D vs 90D vs 180D vs 365D)', () => {
      const res30 = calculateOutcome(0, {
        capital: 10000,
        days: 30,
        fundingAPR: 10.0,
        stakingAPY: 3.2,
        roundtripFeePct: 0.10
      });
      // 0.10 * 365 / 30 = 1.2166... => 1.22%
      expect(res30.feeDragAPY).toBe(1.22);
      expect(res30.netRealizedAPY).toBe(parseFloat((13.2 - 1.22).toFixed(2)));

      const res90 = calculateOutcome(0, {
        capital: 10000,
        days: 90,
        fundingAPR: 10.0,
        stakingAPY: 3.2,
        roundtripFeePct: 0.10
      });
      // 0.10 * 365 / 90 = 0.4055... => 0.41%
      expect(res90.feeDragAPY).toBe(0.41);
      expect(res90.netRealizedAPY).toBe(parseFloat((13.2 - 0.41).toFixed(2)));

      const res180 = calculateOutcome(0, {
        capital: 10000,
        days: 180,
        fundingAPR: 10.0,
        stakingAPY: 3.2,
        roundtripFeePct: 0.10
      });
      // 0.10 * 365 / 180 = 0.2027... => 0.20%
      expect(res180.feeDragAPY).toBe(0.20);
      expect(res180.netRealizedAPY).toBe(parseFloat((13.2 - 0.20).toFixed(2)));

      const res365 = calculateOutcome(0, {
        capital: 10000,
        days: 365,
        fundingAPR: 10.0,
        stakingAPY: 3.2,
        roundtripFeePct: 0.10
      });
      expect(res365.feeDragAPY).toBe(0.10);
      expect(res365.netRealizedAPY).toBe(13.10);
    });

    it('correctly calculates net dollar profit after entry/exit friction', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        days: 365,
        fundingAPR: 10.0,
        stakingAPY: 3.0,
        roundtripFeePct: 0.10
      });

      expect(res.netFeeDollarLoss).toBe(10.00); // 10 bps on $10,000
      expect(res.netPnL).toBe(1300.00);
      expect(res.netRealizedPnL).toBe(1290.00);
      expect(res.netRealizedRoiPct).toBe(12.90);
    });
  });

  describe('US 3-Month Treasury Benchmark & Excess Alpha Spread', () => {
    it('accurately computes excess spread over 4.35% risk-free dollar yield', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        days: 90,
        fundingAPR: 10.0,
        stakingAPY: 3.2,
        roundtripFeePct: 0.10,
        tbillRate: 4.35
      });

      // totalStrategyAPY = 13.20%, feeDragAPY = 0.41%, netRealizedAPY = 12.79%
      expect(res.netRealizedAPY).toBe(12.79);
      // excessSpreadAPY = 12.79 - 4.35 = 8.44%
      expect(res.excessSpreadAPY).toBe(8.44);
      expect(res.excessDollarCarry).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases and Boundary Stress Tests', () => {
    it('handles extreme price spikes gracefully without NaN', () => {
      const res = calculateOutcome(1000, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0,
        days: 0
      });

      expect(res.isLiquidated).toBe(true);
      expect(res.spotVal).toBe(110000);
      expect(res.totalPortfolioVal).toBeGreaterThan(10000);
    });

    it('handles complete 100% depeg safely', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 100,
        days: 0
      });

      expect(res.spotVal).toBe(0);
      expect(res.depegLoss).toBe(10000);
      expect(res.isLiquidated).toBe(true);
    });

    it('handles zero starting capital without division by zero', () => {
      const res = calculateOutcome(10, {
        capital: 0,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0
      });

      expect(res.totalPortfolioVal).toBe(0);
      expect(res.roiPct).toBe(0);
      expect(res.netPnL).toBe(0);
    });

    it('handles negative funding rates (short pays funding fee)', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        days: 365,
        fundingAPR: -5.0,
        stakingAPY: 0,
        depegPct: 0
      });

      expect(res.fundingYieldTotal).toBe(-500);
      expect(res.totalPortfolioVal).toBe(9500);
      expect(res.roiPct).toBe(-5.0);
    });
  });

  describe('Leveraged Basis Trade (Carry Spread) Engine', () => {
    it('calculates leveraged liquidation shock thresholds across 1.0x to 5.0x correctly', () => {
      // 1.0x unlevered wstETH (90% collateral ratio, 0.5% MMR)
      const res1x = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        leverage: 1.0
      });
      expect(Math.abs(res1x.rLiq - 8.5238)).toBeLessThan(0.001);
      expect(res1x.borrowDebt).toBe(0);

      // 1.5x leverage: debtTerm = (1.5 - 1)/1.5 = 0.3333; num = 0.90 - 0.3333 - 0.005 = 0.5617; den = 1.005 - 0.90 = 0.105 -> rLiq ~5.349
      const res1_5x = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        leverage: 1.5
      });
      expect(Math.abs(res1_5x.rLiq - 5.3492)).toBeLessThan(0.005);
      expect(res1_5x.borrowDebt).toBe(5000);

      // 2.0x leverage: debtTerm = 0.50; num = 0.90 - 0.50 - 0.005 = 0.395; den = 0.105 -> rLiq ~3.7619 (+376.2%)
      const res2x = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        leverage: 2.0
      });
      expect(Math.abs(res2x.rLiq - 3.7619)).toBeLessThan(0.005);
      expect(res2x.borrowDebt).toBe(10000);
      expect(res2x.S0).toBe(20000);
      expect(res2x.N0).toBe(20000);

      // 3.0x leverage: debtTerm = 2/3 ~ 0.6667; num = 0.90 - 0.6667 - 0.005 = 0.2283; den = 0.105 -> rLiq ~2.1746 (+217.5%)
      const res3x = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        leverage: 3.0
      });
      expect(Math.abs(res3x.rLiq - 2.1746)).toBeLessThan(0.005);
      expect(res3x.borrowDebt).toBe(20000);

      // 5.0x leverage: debtTerm = 4/5 = 0.80; num = 0.90 - 0.80 - 0.005 = 0.095; den = 0.105 -> rLiq ~0.9048 (+90.5%)
      const res5x = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        leverage: 5.0
      });
      expect(Math.abs(res5x.rLiq - 0.9048)).toBeLessThan(0.005);
      expect(res5x.borrowDebt).toBe(40000);
    });

    it('evaluates dynamic borrow APR kink curve across market regimes', () => {
      // Calm regime (Funding <= 10%): sits at 6.5% base
      expect(calculateDynamicBorrowAPR(8.0, 0)).toBe(6.5);
      expect(calculateDynamicBorrowAPR(10.0, 0)).toBe(6.5);

      // Steady contango (Funding 20%): 6.5 + 0.3 * (20 - 10) = 9.5%
      expect(calculateDynamicBorrowAPR(20.0, 0)).toBe(9.5);

      // Kink trigger (Funding 40%): 11.0 + 0.65 * (40 - 25) = 20.75%
      expect(calculateDynamicBorrowAPR(40.0, 0)).toBe(20.75);

      // Parabolic contango (Funding 80%): 11.0 + 0.65 * 55 = 46.75%
      expect(calculateDynamicBorrowAPR(80.0, 0)).toBe(46.75);

      // Price rally modifier (+100% rally adds +7.0% borrow APR surcharge)
      const withRally = calculateDynamicBorrowAPR(40.0, 100.0);
      expect(withRally).toBeCloseTo(27.75, 1);
    });

    it('calculates leveraged net carry yields and debt drag accurately', () => {
      // $10,000 capital, 2.0x leverage, Staking 3.2%, Funding 10.0%, Borrow APR 6.5%
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        leverage: 2.0,
        stakingAPY: 3.2,
        fundingAPR: 10.0,
        borrowAPR: 6.5,
        days: 365,
        roundtripFeePct: 0
      });

      // Spot yield on $20,000 = $640 (6.4% on equity)
      expect(res.stakingYieldTotal).toBe(640);
      // Perp yield on $20,000 = $2,000 (20.0% on equity)
      expect(res.fundingYieldTotal).toBe(2000);
      // Debt interest on $10,000 @ 6.5% = $650 (-6.5% on equity)
      expect(res.borrowInterestTotal).toBe(650);
      expect(res.borrowAPYDrag).toBe(6.5);

      // Total Strategy APY = 2 * (3.2 + 10.0) - 1 * 6.5 = 26.4 - 6.5 = 19.9%
      expect(res.totalStrategyAPY).toBeCloseTo(19.9, 2);
      expect(res.netRealizedAPY).toBeCloseTo(19.9, 2);
      expect(res.netPnL).toBeCloseTo(1990, 1);
    });

    it('settles post-liquidation state by extinguishing debt and preserving residual spot', () => {
      // 2.0x leverage: liquidation threshold is +376.19%. S0 = $20,000, Debt D = $10,000.
      // Trigger liquidation at +400% price rally.
      const res = calculateOutcome(400, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        leverage: 2.0,
        days: 365,
        borrowAPR: 6.5
      });

      expect(res.isLiquidated).toBe(true);
      expect(res.perpMarginVal).toBe(0);
      // Spot value at +400%: $20,000 * 5 = $100,000
      expect(res.spotVal).toBe(100000);
      // Extinguish USD debt of $10,000 from spot: residual spot is $90,000
      expect(res.totalPortfolioVal).toBeGreaterThan(80000);
      expect(res.netDelta).toBe(90000); // Residual spot is naked long
    });
  });

  describe('Formatting Utilities', () => {
    it('formats USD strings accurately', () => {
      expect(fmtUSD(10000)).toBe('$10,000.00');
      expect(fmtUSD(-250.5)).toBe('-$250.50');
      expect(fmtUSD(0)).toBe('$0.00');
    });

    it('formats percentages accurately', () => {
      expect(fmtPct(852.38)).toBe('+852.38%');
      expect(fmtPct(-15.4)).toBe('-15.40%');
      expect(fmtPct(10, false)).toBe('10.00%');
      expect(fmtPct(Infinity)).toBe('INFINITE\u00A0(∞)');
    });
  });
});
