import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
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

      assert.equal(res.isLiquidated, false);
      assert.ok(Math.abs(res.rLiq - 8.5238) < 0.001, `Expected rLiq ~8.5238, got ${res.rLiq}`);
      assert.ok(Math.abs(res.distanceToLiqPct - 852.38) < 1.0);
    });

    it('triggers liquidation on unified account when price surge exceeds threshold', () => {
      const preLiq = calculateOutcome(850, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        depegPct: 0
      });
      assert.equal(preLiq.isLiquidated, false);

      const postLiq = calculateOutcome(853, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        mmr: 0.005,
        depegPct: 0
      });
      assert.equal(postLiq.isLiquidated, true);
      assert.equal(postLiq.perpMarginVal, 0);
      assert.ok(postLiq.netDelta > 0, 'Liquidated position becomes naked long spot');
    });

    it('ensures Inverse 100% margin has infinite liquidation runway', () => {
      const res = calculateOutcome(10000, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 1.00,
        mmr: 0.005,
        depegPct: 0
      });

      assert.equal(res.rLiq, Infinity);
      assert.equal(res.isLiquidated, false);
      assert.equal(res.distanceToLiqPct, Infinity);
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

      assert.equal(res.S0, 5000);
      assert.equal(res.M0, 5000);
      assert.equal(res.N0, 5000);
      assert.ok(Math.abs(res.rLiq - 0.99) < 0.001, `Expected rLiq ~0.99, got ${res.rLiq}`);
      assert.equal(res.isLiquidated, false);
    });

    it('liquidates short margin when rally exceeds buffer', () => {
      const safe = calculateOutcome(98, {
        capital: 10000,
        mode: 'isolated',
        splitSpot: 50,
        mmr: 0.005
      });
      assert.equal(safe.isLiquidated, false);

      const wiped = calculateOutcome(100, {
        capital: 10000,
        mode: 'isolated',
        splitSpot: 50,
        mmr: 0.005
      });
      assert.equal(wiped.isLiquidated, true);
      assert.equal(wiped.perpMarginVal, 0);
      assert.equal(wiped.perpPnL, -5000); // 100% of cash margin consumed
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

      assert.equal(noDepeg.spotVal, 10000);
      assert.equal(withDepeg.spotVal, 9500);
      assert.equal(withDepeg.depegLoss, 500);
      assert.equal(withDepeg.netPnL, -500);
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

      assert.equal(res.fundingYieldTotal, 1000);
      assert.equal(res.stakingYieldTotal, 400);
      assert.equal(res.totalPortfolioVal, 11400);
      assert.ok(Math.abs(res.roiPct - 14.0) < 1e-6);
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

      assert.equal(res.isLiquidated, false);
      assert.ok(Math.abs(res.spotVal - 100) < 1e-6);
      assert.equal(res.perpPnL, 9900);
      assert.equal(res.totalPortfolioVal, 10000);
      assert.equal(res.netPnL, 0);
    });

    it('handles extreme rally (+1000%) with post-liquidation spot upside', () => {
      const res = calculateOutcome(1000, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0,
        days: 0
      });

      assert.equal(res.isLiquidated, true);
      // Spot value at 11x
      assert.equal(res.spotVal, 110000);
      assert.ok(res.totalPortfolioVal > 10000);
    });

    it('handles complete 100% depeg safely', () => {
      const res = calculateOutcome(0, {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 100,
        days: 0
      });

      assert.equal(res.spotVal, 0);
      assert.equal(res.depegLoss, 10000);
      assert.equal(res.isLiquidated, true);
    });

    it('handles zero starting capital without division by zero', () => {
      const res = calculateOutcome(10, {
        capital: 0,
        mode: 'unified',
        collateralRatio: 0.90,
        depegPct: 0
      });

      assert.equal(res.totalPortfolioVal, 0);
      assert.equal(res.roiPct, 0);
      assert.equal(res.netPnL, 0);
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

      assert.equal(res.fundingYieldTotal, -500);
      assert.equal(res.totalPortfolioVal, 9500);
      assert.equal(res.roiPct, -5.0);
    });
  });

  describe('Formatting Utilities', () => {
    it('formats USD strings accurately', () => {
      assert.equal(fmtUSD(10000), '$10,000.00');
      assert.equal(fmtUSD(-250.5), '-$250.50');
      assert.equal(fmtUSD(0), '$0.00');
    });

    it('formats percentages accurately', () => {
      assert.equal(fmtPct(852.38), '+852.38%');
      assert.equal(fmtPct(-15.4), '-15.40%');
      assert.equal(fmtPct(10, false), '10.00%');
      assert.equal(fmtPct(Infinity), 'INFINITE\u00A0(∞)');
    });
  });
});
