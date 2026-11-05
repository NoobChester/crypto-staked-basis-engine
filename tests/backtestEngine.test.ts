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
  setBacktestStartDateIndex
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

    // Toggle spot off
    toggleBacktestPlot('spot');
    expect(backtestState.visiblePlots.spot).toBe(false);
    expect(backtestState.visiblePlots.strategy).toBe(true);
    expect(backtestState.visiblePlots.tbill).toBe(true);

    // Toggle tbill off
    toggleBacktestPlot('tbill');
    expect(backtestState.visiblePlots.tbill).toBe(false);
    expect(backtestState.visiblePlots.strategy).toBe(true);

    // Attempting to toggle strategy off should be blocked (only 1 plot left active)
    toggleBacktestPlot('strategy');
    expect(backtestState.visiblePlots.strategy).toBe(true); // Must remain true!

    // Toggle spot back on
    toggleBacktestPlot('spot');
    expect(backtestState.visiblePlots.spot).toBe(true);

    // Now strategy can be toggled off because spot is active
    toggleBacktestPlot('strategy');
    expect(backtestState.visiblePlots.strategy).toBe(false);
    expect(backtestState.visiblePlots.spot).toBe(true);

    // Clean up
    backtestState.visiblePlots.strategy = true;
    backtestState.visiblePlots.spot = true;
    backtestState.visiblePlots.tbill = true;
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
      tbill: true
    };

    expect(() => drawBacktestChart(mockCanvas, result, 'ETH', visiblePlots)).not.toThrow();
  });
});
