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
      const noDepeg = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0,
        days: 0
      });
      const withDepeg = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 5,
        days: 0
      });

      expect(noDepeg.spotVal).toBe(10000);
      expect(withDepeg.spotVal).toBe(9500);
      expect(withDepeg.depegLoss).toBe(500);
      expect(withDepeg.netPnL).toBe(-500);
    });

    it('calculates exact 365-day yield compounding for funding and staking', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        days: 365,
        fundingAPR: 10.0,
        stakingAPY: 4.0,
        depegPct: 0
      });

      expect(res.fundingYieldTotal).toBe(1000);
      expect(res.stakingYieldTotal).toBe(400);
      expect(res.totalPortfolioVal).toBe(11400);
      expect(Math.abs(res.roiPct - 14.0)).toBeLessThan(1e-6);
    });
  });

  describe('Comprehensive Edge Cases', () => {
    it('handles extreme market capitulation crash (-99%)', () => {
      const res = calculateOutcome(-99, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0,
        days: 0
      });

      expect(res.isLiquidated).toBe(false);
      expect(Math.abs(res.spotVal - 100)).toBeLessThan(1e-6);
      expect(res.perpPnL).toBe(9900);
      expect(res.totalPortfolioVal).toBe(10000);
      expect(res.netPnL).toBe(0);
    });

    it('handles extreme rally (+1000%) with post-liquidation spot upside', () => {
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

