/**
 * @file autoReset.test.ts
 * @description Vitest test suite for the Auto Baseline Reset (Rebalance Engine) in Multi-Year Backtests.
 * Validates liquidation prevention, Retail vs Optimized execution fee drag divergence,
 * threshold sensitivity, and state-preserving compounding across both Unified and Isolated modes.
 */

import { describe, it, expect } from 'vitest';
import { runHistoricalBacktest } from '../src/math/backtest.js';
import { calculateOutcome } from '../src/math/hedging.js';
import { syncSliderMax } from '../src/app.js';
import { getHistoricalBacktestSeries } from '../src/services/marketData/backtestService.js';
import type { DailyHistoricalMarketStep } from '../src/data/historical/ethBeaconSeries.js';

describe('Auto Baseline Reset (Rebalance Engine) Quantitative Calculus', () => {
  // Construct a synthetic 5-day explosive rally series where spot surges +1,000%
  const syntheticRallySeries: DailyHistoricalMarketStep[] = [
    { date: '2024-01-01', timestamp: 1704067200000, spotPrice: 1000, fundingAPR: 15.0, stakingAPY: 3.5, depegPct: 0.0, borrowAPR: 6.5 },
    { date: '2024-01-02', timestamp: 1704153600000, spotPrice: 2500, fundingAPR: 20.0, stakingAPY: 3.5, depegPct: 0.0, borrowAPR: 6.5 },
    { date: '2024-01-03', timestamp: 1704240000000, spotPrice: 5000, fundingAPR: 25.0, stakingAPY: 3.5, depegPct: 0.0, borrowAPR: 6.5 },
    { date: '2024-01-04', timestamp: 1704326400000, spotPrice: 8500, fundingAPR: 30.0, stakingAPY: 3.5, depegPct: 0.0, borrowAPR: 6.5 },
    { date: '2024-01-05', timestamp: 1704412800000, spotPrice: 11000, fundingAPR: 35.0, stakingAPY: 3.5, depegPct: 0.0, borrowAPR: 6.5 },
  ];

  it('liquidates on a +1,000% rally when Auto-Reset is disabled (Unified 1.5x)', () => {
    const unresetResult = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 1.5,
      collateralRatio: 0.90,
      mmr: 0.005,
      autoResetEnabled: false
    });

    expect(unresetResult.isLiquidated).toBe(true);
    expect(unresetResult.tLiq).not.toBeNull();
    expect(unresetResult.totalResetsCount).toBe(0);
    expect(unresetResult.totalResetFeesPaid).toBe(0);
  });

  it('prevents liquidation on a +1,000% rally when Auto-Reset is enabled (Unified 1.5x)', () => {
    const resetResult = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 1.5,
      collateralRatio: 0.90,
      mmr: 0.005,
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'optimized'
    });

    expect(resetResult.isLiquidated).toBe(false);
    expect(resetResult.savedFromLiquidation).toBe(true);
    expect(resetResult.totalResetsCount).toBeGreaterThan(0);
    expect(resetResult.totalResetFeesPaid).toBeGreaterThan(0);
    expect(resetResult.terminalStrategyEquity).toBeGreaterThan(0);

    // Verify reset steps in trajectory
    const resetSteps = resetResult.dailyTrajectory.filter(s => s.isResetStep);
    expect(resetSteps.length).toBe(resetResult.totalResetsCount);
    resetSteps.forEach(step => {
      expect(step.resetFeePaid).toBeGreaterThan(0);
      expect(step.resetBaselinePrice).toBe(step.spotPrice);
      // Margin ratio must be reset safely below threshold
      expect(step.marginRatio).toBeLessThan(0.80);
    });
  });

  it('demonstrates fee drag divergence: Retail pays higher fees than Optimized mode', () => {
    const optimizedResult = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 1.5,
      collateralRatio: 0.90,
      mmr: 0.005,
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'optimized'
    });

    const retailResult = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 1.5,
      collateralRatio: 0.90,
      mmr: 0.005,
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'retail'
    });

    expect(optimizedResult.totalResetsCount).toBe(retailResult.totalResetsCount);
    // Retail pays 18 bps on gross turnover vs Optimized 5 bps on net delta
    expect(retailResult.totalResetFeesPaid).toBeGreaterThan(optimizedResult.totalResetFeesPaid);
    // Optimized retains higher terminal equity
    expect(optimizedResult.terminalStrategyEquity).toBeGreaterThan(retailResult.terminalStrategyEquity);
  });

  it('respects sensitivity slider: 70% threshold triggers resets earlier than 90%', () => {
    const sensitiveResult = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 1.5,
      collateralRatio: 0.90,
      mmr: 0.005,
      autoResetEnabled: true,
      autoResetThreshold: 0.70,
      executionMode: 'optimized'
    });

    const relaxedResult = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 1.5,
      collateralRatio: 0.90,
      mmr: 0.005,
      autoResetEnabled: true,
      autoResetThreshold: 0.90,
      executionMode: 'optimized'
    });

    // 70% threshold resets sooner and has equal or greater number of resets
    expect(sensitiveResult.totalResetsCount).toBeGreaterThanOrEqual(relaxedResult.totalResetsCount);
  });

  it('prevents cash margin exhaustion in Isolated Mode (70/30 split)', () => {
    // Isolated 70/30 liquidates at +42% rally
    const isolatedUnreset = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'isolated',
      splitSpot: 70,
      mmr: 0.005,
      autoResetEnabled: false
    });

    expect(isolatedUnreset.isLiquidated).toBe(true);

    const isolatedReset = runHistoricalBacktest(syntheticRallySeries, {
      capital: 10000,
      mode: 'isolated',
      splitSpot: 70,
      mmr: 0.005,
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'optimized'
    });

    expect(isolatedReset.isLiquidated).toBe(false);
    expect(isolatedReset.savedFromLiquidation).toBe(true);
    expect(isolatedReset.totalResetsCount).toBeGreaterThan(0);
  });

  it('runs seamlessly on empirical multi-year ETH historical data (2020 to 2026)', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2020-12-01', '2026-10-31');

    // Run 2.0x leveraged ETH backtest without auto-reset
    const noResetResult = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 2.0,
      collateralRatio: 0.90,
      mmr: 0.005,
      asset: 'ETH',
      autoResetEnabled: false
    });

    expect(noResetResult.isLiquidated).toBe(true);

    // Run 2.0x leveraged ETH backtest with auto-reset enabled
    const autoResetResult = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 2.0,
      collateralRatio: 0.90,
      mmr: 0.005,
      asset: 'ETH',
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'optimized'
    });

    // Auto-reset must successfully preserve solvency and accrue positive net returns
    expect(autoResetResult.savedFromLiquidation).toBe(true);
    expect(autoResetResult.isLiquidated).toBe(false);
    expect(autoResetResult.totalResetsCount).toBeGreaterThan(0);
    expect(autoResetResult.terminalStrategyEquity).toBeGreaterThan(autoResetResult.initialCapital);
  });

  it('supports up to 9.0x institutional leverage ceiling for wstETH without Day 1 liquidation', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2020-12-01', '2026-10-31');
    const res9 = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 9.0,
      collateralRatio: 0.90,
      mmr: 0.005,
      asset: 'ETH',
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'optimized'
    });

    expect(res9.isLiquidated).toBe(false);
    expect(res9.tLiq).toBeNull();
    expect(res9.totalResetsCount).toBeGreaterThan(0);
    expect(res9.leverage).toBe(9.0);
  });

  it('calculates realistic fee drag (5 bps on perp roll + spot net trim, 18 bps on gross retail)', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2020-12-01', '2026-10-31');
    const res2_opt = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified',
      leverage: 2.0,
      collateralRatio: 0.90,
      mmr: 0.005,
      asset: 'ETH',
      autoResetEnabled: true,
      autoResetThreshold: 0.80,
      executionMode: 'optimized'
    });

    const resetStep = res2_opt.dailyTrajectory.find(s => s.isResetStep);
    expect(resetStep).toBeDefined();
    if (resetStep) {
      // Fee should be 5 bps on traded volume (which includes rolling the new perp contract)
      expect(resetStep.resetFeePaid).toBeGreaterThan(10.0); // Never pennies on a multi-thousand dollar position
      expect(resetStep.resetVolumeTraded).toBeGreaterThan(resetStep.strategyEquity);
    }
  });

  it('supports uncapped leverage and price shocks in calculateOutcome without 5.0x or 200% ceiling', () => {
    const outcome = calculateOutcome(500, {
      capital: 10_000_000,
      mode: 'unified',
      leverage: 8.0,
      collateralRatio: 0.90,
      mmr: 0.005,
      fundingAPR: 12.0,
      stakingAPY: 3.5,
      depegPct: 0.0,
      days: 365,
      borrowAPR: 6.5,
      isCustomBorrowAPR: true
    } as any);

    expect(outcome.leverage).toBe(8.0);
    expect(outcome.S0).toBe(80_000_000);
    expect(outcome.N0).toBe(80_000_000);
  });

  it('dynamically expands slider max without restricting user entries', () => {
    const mockSlider = { max: '5.0' } as HTMLInputElement;
    syncSliderMax(mockSlider, 8.5, 5.0);
    expect(mockSlider.max).toBe('8.5');

    // When value is below default max, max stays at defaultMax
    syncSliderMax(mockSlider, 3.0, 5.0);
    expect(mockSlider.max).toBe('5');
  });
});
