import { describe, it, expect } from 'vitest';
import { calculateOutcome, fmtUSD, fmtPct } from '../src/math/hedging.js';

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
