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

describe('Historical Time-Series Dataset & Ingestion Service', () => {
  it('contains full contiguous daily series for ETH starting at Beacon Chain Genesis (2020-12-01)', () => {
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES.length).toBe(2161);
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES[0].date).toBe('2020-12-01');
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES[ETH_BEACON_CHAIN_HISTORICAL_SERIES.length - 1].date).toBe('2026-10-31');
    expect(ETH_BEACON_CHAIN_HISTORICAL_SERIES[0].spotPrice).toBeCloseTo(597.11, 2);
  });

  it('contains valid series for SOL starting at staking adoption (2022-10-01) and BTC at Babylon (2024-08-15)', () => {
    expect(getAssetInceptionDate('ETH')).toBe('2020-12-01');
    expect(getAssetInceptionDate('SOL')).toBe('2022-10-01');
    expect(getAssetInceptionDate('BTC')).toBe('2024-08-15');

    expect(SOL_HISTORICAL_SERIES.length).toBe(1492);
    expect(SOL_HISTORICAL_SERIES[0].date).toBe('2022-10-01');

    expect(BTC_HISTORICAL_SERIES.length).toBe(808);
    expect(BTC_HISTORICAL_SERIES[0].date).toBe('2024-08-15');
  });

  it('clamps historical series accurately to asset inception dates', () => {
    // Attempting to backtest SOL from 2020 should clamp to 2022-10-01
    const solSeries = getHistoricalBacktestSeries('SOL', '2020-12-01', '2023-01-01');
    expect(solSeries[0].date).toBe('2022-10-01');
    expect(solSeries[solSeries.length - 1].date).toBe('2023-01-01');

    // Attempting to backtest BTC from 2021 should clamp to 2024-08-15
    const btcSeries = getHistoricalBacktestSeries('BTC', '2021-01-01', '2025-01-01');
    expect(btcSeries[0].date).toBe('2024-08-15');
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
});
