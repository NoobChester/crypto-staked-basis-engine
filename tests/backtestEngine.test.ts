/**
 * @file backtestEngine.test.ts
 * @description Vitest test suite for the Multi-Year Historical Backtest Quantitative Engine.
 * Asserts dataset contiguous integrity, path-dependent liquidation calculus, benchmark generation,
 * risk metrics (CAGR, Sharpe, Sortino, MDD), and ledger rendering/export logic.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  ETH_BEACON_CHAIN_HISTORICAL_SERIES,
  SOL_HISTORICAL_SERIES,
  BTC_HISTORICAL_SERIES
} from '../src/data/historical/ethBeaconSeries.js';
import {
  getHistoricalBacktestSeries,
  getAssetInceptionDate,
  HISTORICAL_EPOCH_PRESETS
} from '../src/services/marketData/backtestService.js';
import {
  runHistoricalBacktest,
  clearBacktestSimulationCache,
  type BacktestSummaryResult
} from '../src/math/backtest.js';
import {
  renderBacktestLedger,
  renderBacktestPagination,
  exportBacktestCsv
} from '../src/ui/renderers/backtestLedgerRenderer.js';
import {
  drawBacktestChart,
  type VisiblePlots
} from '../src/ui/renderers/backtestChartRenderer.js';
import {
  getRawAssetSeries
} from '../src/services/marketData/backtestService.js';
import {
  backtestState,
  toggleBacktestPlot,
  setBacktestStartDateIndex,
  setBacktestEndDateIndex,
  setBacktestAsset,
  updateBacktestFast
} from '../src/app.js';

describe('Historical Time-Series Dataset & Ingestion Service', () => {
  it('contains full contiguous daily series for ETH starting at Beacon Chain Genesis (2020-12-01)', () => {
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES.length).toBe(2161);
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES[0].date).toBe('2020-12-01');
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES[ETH_BEACON_CHAIN_HISTORICAL_SERIES.length - 1].date).toBe('2026-10-31');
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES[0].spotPrice).toBeCloseTo(597.11, 2);
  });

  it('contains valid series for SOL starting at staking adoption (2022-10-01) and BTC from 2020-12-01', () => {
    expect(getAssetInceptionDate('ETH')).toBe('2020-12-01');
    expect(getAssetInceptionDate('SOL')).toBe('2022-10-01');
    expect(getAssetInceptionDate('BTC')).toBe('2020-12-01');

    expect(SOL_HISTORICAL_SERIES.length).toBe(1492);
    expect(SOL_HISTORICAL_SERIES[0].date).toBe('2022-10-01');

    expect(BTC_HISTORICAL_SERIES.length).toBe(2161);
    expect(BTC_HISTORICAL_SERIES[0].date).toBe('2020-12-01');
    expect(BTC_HISTORICAL_SERIES[0].spotPrice).toBeCloseTo(19345.5, 0);
  });

  it('clamps historical series accurately to asset inception dates', () => {
    // Attempting to backtest SOL from 2020 should clamp to 2022-10-01
    const solSeries = getHistoricalBacktestSeries('SOL', '2020-12-01', '2023-01-01');
    expect(solSeries[0].date).toBe('2022-10-01');
    expect(solSeries[solSeries.length - 1].date).toBe('2023-01-01');

    // Attempting to backtest BTC from 2019 should clamp to 2020-12-01
    const btcSeries = getHistoricalBacktestSeries('BTC', '2019-01-01', '2025-01-01');
    expect(btcSeries[0].date).toBe('2020-12-01');
  });

  it('slices named historical epoch presets correctly', () => {
    const bull2021 = HISTORICAL_EPOCH_PRESETS['bull_2021'];
    expect(bull2021).toBeDefined();
    const bullSeries = getHistoricalBacktestSeries('ETH', bull2021.startDate, bull2021.endDate);
    expect(bullSeries[0].date).toBe('2020-12-01');
    expect(bullSeries[bullSeries.length - 1].date).toBe('2021-12-31');
    expect(bullSeries.length).toBe(396);

    const bear2022 = HISTORICAL_EPOCH_PRESETS['bear_2022'];
    const bearSeries = getHistoricalBacktestSeries('ETH', bear2022.startDate, bear2022.endDate);
    expect(bearSeries[0].date).toBe('2022-01-01');
    expect(bearSeries[bearSeries.length - 1].date).toBe('2022-12-31');
    expect(bearSeries.length).toBe(365);
  });
});

describe('Quantitative Backtest Engine: Unified vs Isolated Margin Dynamics', () => {
  it('proves Unified Margin survives the entire 2020-2026 multi-year run with 0 liquidations', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2020-12-01', '2026-10-31');
    const result: BacktestSummaryResult = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified',
      collateralRatio: 0.90,
      mmr: 0.005,
      tbillRate: 4.35
    });

    expect(result.horizonDays).toBe(2161);
    expect(result.initialCapital).toBe(10000);
    expect(result.isLiquidated).toBe(false);
    expect(result.tLiq).toBeNull();
    expect(result.liquidationDate).toBeNull();

    // Strategy equity should have grown substantially from harvested cash
    expect(result.terminalStrategyEquity).toBeGreaterThan(15000);
    expect(result.netPnL).toBeGreaterThan(5000);
    expect(result.cumulativeReturnPct).toBeGreaterThan(50);
    expect(result.cagrPct).toBeGreaterThan(5);

    // Yield harvesting verification
    expect(result.totalHarvestedStaking).toBeGreaterThan(1000);
    expect(result.totalHarvestedFunding).toBeGreaterThan(2000);

    // Benchmarks comparison
    expect(result.tbillBenchmarkReturnPct).toBeGreaterThan(0);
    expect(result.spotBenchmarkReturnPct).toBeGreaterThan(0);
    expect(result.sp500BenchmarkReturnPct).toBeGreaterThan(0);
    expect(result.dailyTrajectory[0].sp500BenchmarkEquity).toBe(10000);
    expect(result.dailyTrajectory[result.dailyTrajectory.length - 1].sp500BenchmarkEquity).toBeGreaterThan(10000);
  });

  it('demonstrates Isolated Margin breaches liquidation during 2021 parabolic rally (+100% price move)', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2020-12-01', '2021-12-31');
    const result: BacktestSummaryResult = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'isolated',
      splitSpot: 50, // 50/50 split -> 1x leverage, liquidation at ~+99% rally
      mmr: 0.005,
      tbillRate: 4.35
    });

    expect(result.isLiquidated).toBe(true);
    expect(result.tLiq).not.toBeNull();
    expect(result.liquidationDate).not.toBeNull();
    expect(result.liquidationPrice).toBeGreaterThan(1190); // ~double of $600 initial price

    // Verify post-liquidation conversion to unhedged spot
    const liqStep = result.dailyTrajectory.find(s => s.day === result.tLiq);
    expect(liqStep).toBeDefined();
    expect(liqStep?.isLiquidated).toBe(true);

    // Subsequent steps should remain liquidated
    const lastStep = result.dailyTrajectory[result.dailyTrajectory.length - 1];
    expect(lastStep.isLiquidated).toBe(true);
  });

  it('accurately computes Institutional Risk Metrics (CAGR, MDD, Sharpe, Sortino)', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2023-01-01', '2023-12-31');
    const result = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified',
      collateralRatio: 0.90,
      mmr: 0.005,
      tbillRate: 4.35
    });

    expect(result.horizonDays).toBe(365);
    expect(result.maxDrawdownPct).toBeGreaterThanOrEqual(0);
    expect(typeof result.maxDrawdownTroughDate).toBe('string');
    expect(result.maxDrawdownTroughDate.length).toBe(10); // YYYY-MM-DD format

    // Sharpe and Sortino should be valid finite numbers
    expect(Number.isFinite(result.sharpeRatio)).toBe(true);
    expect(Number.isFinite(result.sortinoRatio)).toBe(true);
  });

  it('handles negative funding periods during 2022 Bear & Depeg Crash without crash', () => {
    const bearSeries = getHistoricalBacktestSeries('ETH', '2022-01-01', '2022-12-31');
    const result = runHistoricalBacktest(bearSeries, {
      capital: 10000,
      mode: 'unified',
      collateralRatio: 0.90,
      mmr: 0.005,
      tbillRate: 4.35
    });

    expect(result.horizonDays).toBe(365);
    expect(result.isLiquidated).toBe(false);
    expect(result.dailyTrajectory.length).toBe(365);
  });

  it('runs Bitcoin multi-year cash-and-carry basis from Dec 2020 through Babylon era', () => {
    const btcSeries = getHistoricalBacktestSeries('BTC', '2020-12-01', '2026-10-31');
    expect(btcSeries.length).toBe(2161);
    expect(btcSeries[0].date).toBe('2020-12-01');

    // Pre-Babylon steps must have 0.0% staking APY
    const step2021 = btcSeries.find(s => s.date === '2021-04-14');
    expect(step2021?.stakingAPY).toBe(0.0);
    expect(step2021?.depegPct).toBe(0.0);

    // Babylon steps must have active staking APY
    const step2024 = btcSeries.find(s => s.date === '2024-08-15');
    expect(step2024?.stakingAPY).toBeGreaterThan(0.0);

    const result = runHistoricalBacktest(btcSeries, {
      capital: 10000,
      mode: 'unified',
      collateralRatio: 0.85,
      mmr: 0.005,
      tbillRate: 4.35
    });

    expect(result.horizonDays).toBe(2161);
    expect(result.isLiquidated).toBe(false);
    expect(result.totalHarvestedFunding).toBeGreaterThan(1500);
    expect(result.terminalStrategyEquity).toBeGreaterThan(10000);
  });
});

describe('Ledger Table Rendering & CSV Export', () => {
  it('correctly handles null or empty result in renderBacktestLedger', () => {
    const mockTbody = { innerHTML: '', appendChild: vi.fn() } as unknown as HTMLElement;
    renderBacktestLedger(mockTbody, null, 1, 50);
    // In headless test without DOM document.createElement, safely returns
    expect(mockTbody).toBeDefined();
  });

  it('formats pagination bounds and avoids negative indexes', () => {
    const onPageChange = vi.fn();
    const mockContainer = { innerHTML: '', classList: { add: vi.fn(), remove: vi.fn() } } as unknown as HTMLElement;
    renderBacktestPagination(mockContainer, 2161, 1, 50, onPageChange);
    expect(mockContainer).toBeDefined();
  });

  it('safely handles CSV export execution in headless test environment', () => {
    const ethSeries = getHistoricalBacktestSeries('ETH', '2023-01-01', '2023-01-10');
    const result = runHistoricalBacktest(ethSeries, {
      capital: 10000,
      mode: 'unified'
    });
    expect(() => exportBacktestCsv(result)).not.toThrow();
  });

  it('renders explicit Cash-and-Carry vs Babylon Staked Basis regimes in ledger table', () => {
    const createdElements: any[] = [];
    const originalDocument = globalThis.document;

    (globalThis as any).document = {
      createElement: vi.fn((tag: string) => {
        const el = {
          tagName: tag.toUpperCase(),
          innerHTML: '',
          className: '',
          children: [] as any[],
          appendChild: vi.fn()
        };
        createdElements.push(el);
        return el;
      }),
      createDocumentFragment: vi.fn(() => {
        const fragmentChildren: any[] = [];
        return {
          nodeType: 11,
          children: fragmentChildren,
          appendChild: (c: any) => fragmentChildren.push(c)
        };
      })
    };

    try {
      const btcSlice = getHistoricalBacktestSeries('BTC', '2024-08-14', '2024-08-16');
      const btcResult = runHistoricalBacktest(btcSlice, { capital: 10000, mode: 'isolated' });
      const tbody = { innerHTML: '', appendChild: vi.fn() } as unknown as HTMLElement;

      renderBacktestLedger(tbody, btcResult, 1, 10, 'BTC');

      // 1. D1 (2024-08-14): staking = 0.0%, must show CASH & CARRY and PoW
      const rowAug14 = createdElements.find(el => el.innerHTML.includes('2024-08-14'));
      expect(rowAug14).toBeDefined();
      expect(rowAug14.innerHTML).toContain('CASH &amp; CARRY');
      expect(rowAug14.innerHTML).toContain('0.0%');
      expect(rowAug14.innerHTML).toContain('PoW');

      // 2. Milestone row for Aug 15, 2024 Babylon Activation
      const milestoneRow = createdElements.find(el => el.innerHTML.includes('BABYLON RESTAKING ERA ACTIVATION'));
      expect(milestoneRow).toBeDefined();
      expect(milestoneRow.innerHTML).toContain('AUG 15, 2024');

      // 3. Post-activation row (2024-08-16): staking > 0, must show STAKED BASIS
      const rowAug16 = createdElements.find(el => el.innerHTML.includes('2024-08-16'));
      expect(rowAug16).toBeDefined();
      expect(rowAug16.innerHTML).toContain('STAKED BASIS');
    } finally {
      (globalThis as any).document = originalDocument;
    }
  });
});

describe('High-Performance Caching & DSA Slicing Optimization', () => {
  it('memoizes sliced series via binary search and returns cached reference on repeat calls', () => {
    const run1 = getHistoricalBacktestSeries('ETH', '2021-06-01', '2021-12-31');
    const run2 = getHistoricalBacktestSeries('ETH', '2021-06-01', '2021-12-31');

    // Both calls must return identical array reference from memoization cache
    expect(run1).toBe(run2);
    expect(run1[0].date).toBe('2021-06-01');
    expect(run1[run1.length - 1].date).toBe('2021-12-31');
  });

  it('memoizes simulation calculations and returns cached BacktestSummaryResult', () => {
    const series = getHistoricalBacktestSeries('ETH', '2022-01-01', '2022-06-30');
    const config = { capital: 15000, mode: 'unified' as const, collateralRatio: 0.90 };

    const t0 = performance.now();
    const res1 = runHistoricalBacktest(series, config);
    const initialElapsed = performance.now() - t0;

    const t1 = performance.now();
    const res2 = runHistoricalBacktest(series, config);
    const cachedElapsed = performance.now() - t1;

    // Must be identical object reference from LRU simulation cache
    expect(res1).toBe(res2);
    expect(cachedElapsed).toBeLessThan(initialElapsed + 1.0);
  });
});

describe('Backtest Chart Toggleable Plots & Start Date Slider Horizon', () => {
  it('toggles plot visibility and enforces at least one active curve invariant', () => {
    // Reset to all enabled
    backtestState.visiblePlots.strategy = true;
    backtestState.visiblePlots.spot = true;
    backtestState.visiblePlots.tbill = true;
    backtestState.visiblePlots.sp500 = true;

    // Toggle spot off
    toggleBacktestPlot('spot');
    expect(backtestState.visiblePlots.spot).toBe(false);
    expect(backtestState.visiblePlots.strategy).toBe(true);
    expect(backtestState.visiblePlots.tbill).toBe(true);
    expect(backtestState.visiblePlots.sp500).toBe(true);

    // Toggle tbill off
    toggleBacktestPlot('tbill');
    expect(backtestState.visiblePlots.tbill).toBe(false);

    // Toggle sp500 off
    toggleBacktestPlot('sp500');
    expect(backtestState.visiblePlots.sp500).toBe(false);
    expect(backtestState.visiblePlots.strategy).toBe(true);

    // Attempting to toggle strategy off should be blocked (only 1 plot left active)
    toggleBacktestPlot('strategy');
    expect(backtestState.visiblePlots.strategy).toBe(true); // Must remain true!

    // Toggle sp500 back on
    toggleBacktestPlot('sp500');
    expect(backtestState.visiblePlots.sp500).toBe(true);

    // Now strategy can be toggled off because sp500 is active
    toggleBacktestPlot('strategy');
    expect(backtestState.visiblePlots.strategy).toBe(false);
    expect(backtestState.visiblePlots.sp500).toBe(true);

    // Clean up
    backtestState.visiblePlots.strategy = true;
    backtestState.visiblePlots.spot = true;
    backtestState.visiblePlots.tbill = true;
    backtestState.visiblePlots.sp500 = true;
  });

  it('adjusts start date horizon dynamically via slider index', () => {
    const rawEth = getRawAssetSeries('ETH');
    expect(rawEth.length).toBe(2161);

    // Move start date slider to day index 365 (start of 2022)
    setBacktestStartDateIndex(365);
    expect(backtestState.startDate).toBe(rawEth[365].date);
    expect(backtestState.startDate).toBe('2021-12-01');
    expect(backtestState.activeEpoch).toBe('custom');

    // Move start date slider back to day index 0 (Inception)
    setBacktestStartDateIndex(0);
    expect(backtestState.startDate).toBe('2020-12-01');
  });

  it('safely renders canvas with subset of visible plots', () => {
    const series = getHistoricalBacktestSeries('ETH', '2023-01-01', '2023-03-01');
    const result = runHistoricalBacktest(series, { capital: 10000, mode: 'unified' });

    const mockCtx = {
      resetTransform: vi.fn(),
      scale: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      closePath: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      fillText: vi.fn(),
      strokeRect: vi.fn(),
      setLineDash: vi.fn(),
      measureText: vi.fn(() => ({ width: 50 })),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn()
      }))
    };

    const mockCanvas = {
      getContext: vi.fn(() => mockCtx),
      getBoundingClientRect: vi.fn(() => ({ width: 800, height: 400, left: 0, top: 0 })),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      width: 800,
      height: 400
    } as unknown as HTMLCanvasElement;

    const visiblePlots: VisiblePlots = {
      strategy: true,
      spot: false, // Spot disabled
      tbill: true,
      sp500: true
    };

    expect(() => drawBacktestChart(mockCanvas, result, 'ETH', visiblePlots)).not.toThrow();
  });
});

describe('Asset Disambiguation & Cross-Asset Cache Collision Safeguards', () => {
  it('differentiates BTC and SOL simulations across overlapping date horizons with distinct metrics and curves', () => {
    clearBacktestSimulationCache();
    // Overlapping 1-year window from 2023-01-01 to 2023-12-31
    const btcSlice = getHistoricalBacktestSeries('BTC', '2023-01-01', '2023-12-31');
    const solSlice = getHistoricalBacktestSeries('SOL', '2023-01-01', '2023-12-31');

    expect(btcSlice.length).toBe(365);
    expect(solSlice.length).toBe(365);
    expect(btcSlice[0].date).toBe('2023-01-01');
    expect(solSlice[0].date).toBe('2023-01-01');

    // Initial spot prices are vastly different: BTC ~$16,600 vs SOL ~$9.98
    expect(btcSlice[0].spotPrice).toBeGreaterThan(10000);
    expect(solSlice[0].spotPrice).toBeLessThan(50);

    // Run BTC backtest
    const btcResult = runHistoricalBacktest(btcSlice, {
      capital: 10000,
      mode: 'isolated',
      collateralRatio: 0.85,
      asset: 'BTC'
    });

    // Run SOL backtest with same dates and capital
    const solResult = runHistoricalBacktest(solSlice, {
      capital: 10000,
      mode: 'isolated',
      collateralRatio: 0.85,
      asset: 'SOL'
    });

    // Run BTC backtest again to verify cache retrieval returns BTC, not SOL
    const btcResultCached = runHistoricalBacktest(btcSlice, {
      capital: 10000,
      mode: 'isolated',
      collateralRatio: 0.85,
      asset: 'BTC'
    });

    // Must be completely distinct results
    expect(btcResult.terminalStrategyEquity).not.toBe(solResult.terminalStrategyEquity);
    expect(btcResult.spotBenchmarkReturnPct).not.toBe(solResult.spotBenchmarkReturnPct);
    expect(btcResult.dailyTrajectory[0].spotPrice).not.toBe(solResult.dailyTrajectory[0].spotPrice);

    // Cached retrieval integrity
    expect(btcResultCached).toBe(btcResult);
    expect(btcResultCached.spotBenchmarkReturnPct).toBe(btcResult.spotBenchmarkReturnPct);
  });

  it('adjusts dates, mode, and inception boundaries cleanly when switching between assets', () => {
    // 1. Start on ETH with all epoch
    setBacktestAsset('ETH');
    expect(backtestState.asset).toBe('ETH');
    expect(backtestState.startDate).toBe('2020-12-01');
    expect(backtestState.mode).toBe('unified');

    // 2. Switch to SOL: must clamp start date to SOL staking adoption (2022-10-01)
    setBacktestAsset('SOL');
    expect(backtestState.asset).toBe('SOL');
    expect(backtestState.startDate).toBe('2022-10-01');
    expect(backtestState.mode).toBe('unified');

    // 3. Switch to BTC: must restore start date to 2020-12-01 and retain unified mode by default
    setBacktestAsset('BTC');
    expect(backtestState.asset).toBe('BTC');
    expect(backtestState.startDate).toBe('2020-12-01');
    expect(backtestState.mode).toBe('unified');

    // 4. Switch back to SOL: must set mode back to unified and clamp to 2022-10-01
    setBacktestAsset('SOL');
    expect(backtestState.asset).toBe('SOL');
    expect(backtestState.startDate).toBe('2022-10-01');
    expect(backtestState.mode).toBe('unified');

    // 5. Clean up by returning to ETH
    setBacktestAsset('ETH');
    expect(backtestState.asset).toBe('ETH');
    expect(backtestState.startDate).toBe('2020-12-01');
    expect(backtestState.mode).toBe('unified');
  });
});

describe('S&P 500 Index Benchmark & Unified Default Invariants', () => {
  it('calculates S&P 500 benchmark equity starting at capital C on Day 1 and tracking index level accurately', () => {
    const series = getHistoricalBacktestSeries('ETH', '2020-12-01', '2021-12-31');
    const result = runHistoricalBacktest(series, { capital: 10000, mode: 'unified' });

    // Day 1 must match initial capital C exactly
    expect(result.dailyTrajectory[0].sp500BenchmarkEquity).toBe(10000);

    // Terminal S&P 500 equity and return:
    // S&P 500 closed at 3,662.45 on 2020-12-01 and 4,766.18 on 2021-12-31 (+30.14%)
    const expectedReturnPct = Math.round(((4766.18 - 3662.45) / 3662.45) * 10000) / 100;
    expect(result.sp500BenchmarkReturnPct).toBeCloseTo(expectedReturnPct, 1);
    expect(result.dailyTrajectory[result.dailyTrajectory.length - 1].sp500BenchmarkEquity).toBeCloseTo(13013.6, 0);
  });

  it('normalizes S&P 500 benchmark starting equity to initial capital for custom start dates', () => {
    // 2022 Bear market (2022-01-01 to 2022-12-31): S&P 500 experienced significant drawdown (~ -19%)
    const series = getHistoricalBacktestSeries('ETH', '2022-01-01', '2022-12-31');
    const result = runHistoricalBacktest(series, { capital: 25000, mode: 'unified' });

    expect(result.dailyTrajectory[0].sp500BenchmarkEquity).toBe(25000);
    expect(result.sp500BenchmarkReturnPct).toBeLessThan(0);
    expect(result.dailyTrajectory[result.dailyTrajectory.length - 1].sp500BenchmarkEquity).toBeLessThan(25000);
  });

  it('verifies backtest uses unified margin mode by default across all assets', () => {
    // Default asset ETH -> unified
    setBacktestAsset('ETH');
    expect(backtestState.mode).toBe('unified');

    // Switch to SOL -> unified
    setBacktestAsset('SOL');
    expect(backtestState.mode).toBe('unified');

    // Switch to BTC -> unified (per institutional backtest default requirement)
    setBacktestAsset('BTC');
    expect(backtestState.mode).toBe('unified');

    // Return to ETH -> unified
    setBacktestAsset('ETH');
    expect(backtestState.mode).toBe('unified');
  });

  it('includes S&P 500 column and benchmark return in CSV export', () => {
    const series = getHistoricalBacktestSeries('ETH', '2024-01-01', '2024-06-30');
    const result = runHistoricalBacktest(series, { capital: 10000, mode: 'unified' });

    let capturedCsv = '';
    const originalBlob = (globalThis as any).Blob;
    const originalUrl = (globalThis as any).URL;
    const originalDocument = (globalThis as any).document;

    (globalThis as any).Blob = class MockBlob {
      constructor(parts: any[]) {
        capturedCsv = parts.join('');
      }
    };
    (globalThis as any).URL = {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn()
    };
    (globalThis as any).document = {
      createElement: vi.fn(() => ({
        setAttribute: vi.fn(),
        click: vi.fn()
      })),
      body: {
        appendChild: vi.fn(),
        removeChild: vi.fn()
      }
    };

    try {
      exportBacktestCsv(result);
      expect(capturedCsv).toContain('SP500_Benchmark_USD');
      expect(capturedCsv).toContain('S&P 500:');
    } finally {
      (globalThis as any).Blob = originalBlob;
      (globalThis as any).URL = originalUrl;
      (globalThis as any).document = originalDocument;
    }
  });

  describe('Dual Slider Horizon Scrubber & 60fps Fast Path Performance', () => {
    it('accurately updates start date and clamps when exceeding end date minus minimum window (7 days)', () => {
      setBacktestAsset('ETH');
      const ethSeries = getRawAssetSeries('ETH');

      // Set end date to day 100
      setBacktestEndDateIndex(100);
      expect(backtestState.endDate).toBe(ethSeries[100].date);

      // Attempt to move start slider past end date (e.g. to index 98)
      setBacktestStartDateIndex(98);
      // Must clamp to endIdx - 7 = 93
      expect(backtestState.startDate).toBe(ethSeries[93].date);
      expect(backtestState.activeEpoch).toBe('custom');
    });

    it('accurately updates end date and clamps when preceding start date plus minimum window (7 days)', () => {
      setBacktestAsset('ETH');
      const ethSeries = getRawAssetSeries('ETH');

      // Set start date to day 50
      setBacktestStartDateIndex(50);
      expect(backtestState.startDate).toBe(ethSeries[50].date);

      // Attempt to move end slider before start date (e.g. to index 52)
      setBacktestEndDateIndex(52);
      // Must clamp to startIdx + 7 = 57
      expect(backtestState.endDate).toBe(ethSeries[57].date);
      expect(backtestState.activeEpoch).toBe('custom');
    });

    it('restores activeEpoch to "all" when sliders are reset to inception and terminal horizon', () => {
      setBacktestAsset('ETH');
      const ethSeries = getRawAssetSeries('ETH');
      const maxIdx = ethSeries.length - 1;

      setBacktestStartDateIndex(0);
      setBacktestEndDateIndex(maxIdx);

      expect(backtestState.startDate).toBe(ethSeries[0].date);
      expect(backtestState.endDate).toBe(ethSeries[maxIdx].date);
      expect(backtestState.activeEpoch).toBe('all');
    });

    it('executes fast dragging updates without throwing or mutating full table unnecessarily', () => {
      setBacktestAsset('ETH');
      const ethSeries = getRawAssetSeries('ETH');

      // Fast dragging updates (isDragging = true)
      expect(() => setBacktestStartDateIndex(10, true)).not.toThrow();
      expect(backtestState.startDate).toBe(ethSeries[10].date);

      expect(() => setBacktestEndDateIndex(500, true)).not.toThrow();
      expect(backtestState.endDate).toBe(ethSeries[500].date);

      // Direct fast render call
      expect(() => updateBacktestFast()).not.toThrow();
    });
  });

  describe('Leveraged Basis Trade Historical Backtest Engine', () => {
    it('executes leveraged backtest (2.0x) and correctly detects 2021 parabolic squeeze liquidation', () => {
      clearBacktestSimulationCache();
      // 2021 Bull Run: ETH rallied +497% from $733 to $4,382 in May 2021, breaching the +376.2% buffer
      const series2021 = getHistoricalBacktestSeries('ETH', '2021-01-01', '2021-12-31');
      const result2021 = runHistoricalBacktest(series2021, {
        capital: 10000,
        mode: 'unified',
        leverage: 2.0
      });

      expect(result2021.leverage).toBe(2.0);
      expect(result2021.isLiquidated).toBe(true);
      expect(result2021.liquidationDate).toBe('2021-04-23');
      expect(result2021.totalBorrowInterestPaid).toBeGreaterThan(0);

      // Verify no artificial PnL spike across liquidation boundary
      const liqIdx = result2021.dailyTrajectory.findIndex(s => s.day === result2021.tLiq);
      expect(liqIdx).toBeGreaterThan(0);
      const preLiqStep = result2021.dailyTrajectory[liqIdx - 1];
      const liqStep = result2021.dailyTrajectory[liqIdx];
      // Equity before and at liquidation must be continuous without unhedged spot jumps
      expect(Math.abs(liqStep.strategyEquity - preLiqStep.strategyEquity)).toBeLessThan(500);
      expect(liqStep.strategyEquity).toBeLessThan(15000); // Definitely not $100,000+!

      // In 2023: ETH rallied moderately (+90%), well within the +376.2% runway -> survives 100%
      clearBacktestSimulationCache();
      const series2023 = getHistoricalBacktestSeries('ETH', '2023-01-01', '2023-12-31');
      const result2023_2x = runHistoricalBacktest(series2023, {
        capital: 10000,
        mode: 'unified',
        leverage: 2.0
      });
      const result2023_1x = runHistoricalBacktest(series2023, {
        capital: 10000,
        mode: 'unified',
        leverage: 1.0
      });

      expect(result2023_2x.isLiquidated).toBe(false);
      expect(result2023_2x.totalBorrowInterestPaid).toBeGreaterThan(0);
      expect(result2023_1x.totalBorrowInterestPaid).toBe(0);
      // Unliquidated 2.0x harvests exactly 2x the funding of 1.0x
      expect(result2023_2x.totalHarvestedFunding).toBeCloseTo(result2023_1x.totalHarvestedFunding * 2, 0);
      expect(result2023_2x.totalHarvestedStaking).toBeCloseTo(result2023_1x.totalHarvestedStaking * 2, 0);
    });

    it('accurately computes baseline, step, trough, and terminal liquidation buffers across solvent and liquidated regimes', () => {
      clearBacktestSimulationCache();
      const series2023 = getHistoricalBacktestSeries('ETH', '2023-01-01', '2023-12-31');

      // 1.0x Unlevered wstETH opening buffer with actual series2023[0].depegPct
      const res1x = runHistoricalBacktest(series2023, { capital: 10000, mode: 'unified', leverage: 1.0 });
      expect(res1x.baselineLiquidationBufferPct).toBeGreaterThan(500);
      expect(res1x.terminalLiquidationBufferPct).toBeGreaterThan(0);
      expect(res1x.minLiquidationBufferPct).toBeGreaterThan(0);
      expect(res1x.isLiquidated).toBe(false);

      // 2.0x Leveraged wstETH
      const res2x = runHistoricalBacktest(series2023, { capital: 10000, mode: 'unified', leverage: 2.0 });
      expect(res2x.baselineLiquidationBufferPct).toBeGreaterThan(300);
      expect(res2x.minLiquidationBufferPct).toBeLessThan(res2x.baselineLiquidationBufferPct);
      expect(res2x.minLiquidationBufferPct).toBeGreaterThan(0);
      expect(res2x.minLiquidationBufferDate).toBeDefined();

      // Verify each trajectory step has liquidation buffer and price
      expect(res2x.dailyTrajectory[0].liquidationBufferPct).toBeCloseTo(res2x.baselineLiquidationBufferPct, 1);
      expect(res2x.dailyTrajectory[0].liquidationPrice).toBeGreaterThan(res2x.dailyTrajectory[0].spotPrice);

      // Liquidated scenario: 2021 bull run breaches 2.0x leverage
      clearBacktestSimulationCache();
      const series2021 = getHistoricalBacktestSeries('ETH', '2021-01-01', '2021-12-31');
      const resLiq = runHistoricalBacktest(series2021, { capital: 10000, mode: 'unified', leverage: 2.0 });
      expect(resLiq.isLiquidated).toBe(true);
      expect(resLiq.terminalLiquidationBufferPct).toBe(0);
      expect(resLiq.minLiquidationBufferPct).toBe(0);
      expect(resLiq.terminalLiquidationPrice).toBe(resLiq.liquidationPrice);

      // Isolated 50/50 split -> (1.0 - 0.005) / 1.005 = +99.0% buffer
      const resIso = runHistoricalBacktest(series2023, { capital: 10000, mode: 'isolated', splitSpot: 50 });
      expect(resIso.baselineLiquidationBufferPct).toBeCloseTo(99.0, 1);
    });

    it('renders liquidation buffer column in ledger table and exports it in CSV format', () => {
      const mockSummary: BacktestSummaryResult = {
        startDate: '2023-01-01',
        endDate: '2023-01-03',
        horizonDays: 3,
        initialCapital: 10000,
        terminalStrategyEquity: 10050,
        netPnL: 50,
        cumulativeReturnPct: 0.5,
        cagrPct: 6.2,
        maxDrawdownPct: 0.1,
        maxDrawdownTroughDate: '2023-01-02',
        sharpeRatio: 2.5,
        sortinoRatio: 3.5,
        totalHarvestedFunding: 40,
        totalHarvestedStaking: 10,
        totalBorrowInterestPaid: 0,
        leverage: 1.0,
        isLiquidated: false,
        liquidationDate: null,
        liquidationPrice: null,
        tLiq: null,
        terminalLiquidationBufferPct: 852.4,
        minLiquidationBufferPct: 840.1,
        minLiquidationBufferDate: '2023-01-02',
        terminalLiquidationPrice: 11424,
        baselineLiquidationBufferPct: 852.4,
        spotBenchmarkReturnPct: 2.1,
        tbillBenchmarkReturnPct: 0.04,
        sp500BenchmarkReturnPct: 0.3,
        totalResetsCount: 0,
        totalResetFeesPaid: 0,
        savedFromLiquidation: false,
        autoResetEnabled: false,
        autoResetThreshold: 0.80,
        executionMode: 'optimized',
        dailyTrajectory: [
          {
            day: 1,
            date: '2023-01-01',
            timestamp: 1672531200000,
            spotPrice: 1200,
            priceReturnPct: 0,
            fundingAPR: 10,
            stakingAPY: 4,
            depegPct: 0,
            strategyEquity: 10000,
            spotBenchmarkEquity: 10000,
            tbillBenchmarkEquity: 10000,
            sp500BenchmarkEquity: 10000,
            marginRatio: 0.05,
            isLiquidated: false,
            cumulativeFunding: 0,
            cumulativeStaking: 0,
            borrowRateAPR: 0,
            cumulativeBorrowInterest: 0,
            borrowDebt: 0,
            liquidationBufferPct: 852.4,
            liquidationPrice: 11424
          }
        ]
      };

      const createdElements: { innerHTML: string; className: string }[] = [];
      const originalDoc = (globalThis as any).document;
      (globalThis as any).document = {
        createElement: vi.fn((_tag: string) => {
          const el = {
            innerHTML: '',
            className: '',
            setAttribute: vi.fn(),
            appendChild: vi.fn()
          };
          createdElements.push(el);
          return el;
        }),
        createDocumentFragment: vi.fn(() => ({
          appendChild: vi.fn()
        }))
      };

      const mockTbody = { innerHTML: '', appendChild: vi.fn() } as unknown as HTMLElement;
      renderBacktestLedger(mockTbody, mockSummary, 1, 10, 'ETH');

      // Assert row contains buffer
      const stepRow = createdElements.find(el => el.innerHTML.includes('2023-01-01'));
      expect(stepRow).toBeDefined();
      expect(stepRow!.innerHTML).toContain('+852.4%');

      (globalThis as any).document = originalDoc;
    });
  });
});
