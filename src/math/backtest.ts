/**
 * @file backtest.ts
 * @description Quantitative historical simulation engine for multi-year delta-neutral staked basis trades.
 * Implements pure mathematical path-dependent liquidation calculus, benchmark generation, and institutional risk metrics.
 */

import type { MarginMode } from '../config/presets.js';
import type { DailyHistoricalMarketStep } from '../data/historical/ethBeaconSeries.js';

export interface BacktestConfig {
  capital: number;
  mode: MarginMode;
  collateralRatio?: number;
  splitSpot?: number;
  mmr?: number;
  tbillRate?: number;
}

export interface BacktestStepResult {
  day: number;
  date: string;
  timestamp: number;
  spotPrice: number;
  priceReturnPct: number;
  fundingAPR: number;
  stakingAPY: number;
  depegPct: number;
  strategyEquity: number;
  spotBenchmarkEquity: number;
  tbillBenchmarkEquity: number;
  marginRatio: number;
  isLiquidated: boolean;
  cumulativeFunding: number;
  cumulativeStaking: number;
}

export interface BacktestSummaryResult {
  horizonDays: number;
  startDate: string;
  endDate: string;
  initialCapital: number;
  terminalStrategyEquity: number;
  netPnL: number;
  cumulativeReturnPct: number;
  cagrPct: number;
  maxDrawdownPct: number;
  maxDrawdownTroughDate: string;
  sharpeRatio: number;
  sortinoRatio: number;
  totalHarvestedFunding: number;
  totalHarvestedStaking: number;
  isLiquidated: boolean;
  liquidationDate: string | null;
  liquidationPrice: number | null;
  tLiq: number | null;
  spotBenchmarkReturnPct: number;
  tbillBenchmarkReturnPct: number;
  dailyTrajectory: BacktestStepResult[];
}

export function runHistoricalBacktest(
  series: DailyHistoricalMarketStep[],
  config: BacktestConfig
): BacktestSummaryResult {
  if (!series || series.length === 0) {
    throw new Error('Backtest series cannot be empty');
  }

  const C = Math.max(1, config.capital ?? 10000);
  const mode = config.mode ?? 'unified';
  const V = config.collateralRatio ?? 0.90;
  const mmr = config.mmr ?? 0.005;
  const tbillRate = config.tbillRate ?? 4.35;
  const splitSpot = Math.max(1, Math.min(99, config.splitSpot ?? 50));

  let S0: number, M0: number, N0: number;
  if (mode === 'unified') {
    S0 = C;
    M0 = C;
    N0 = C;
  } else {
    const sFrac = splitSpot / 100;
    S0 = C * sFrac;
    M0 = C * (1 - sFrac);
    N0 = S0;
  }

  const P0 = series[0].spotPrice;
  const trajectory: BacktestStepResult[] = [];
  let cumFunding = 0;
  let cumStaking = 0;
  let isLiquidated = false;
  let tLiq: number | null = null;
  let liquidationDate: string | null = null;
  let liquidationPrice: number | null = null;

  for (let i = 0; i < series.length; i++) {
    const step = series[i];
    const day = i + 1;
    const r = (step.spotPrice - P0) / P0;
    const depeg = Math.max(0, Math.min(1, step.depegPct / 100));

    // Staking accrual on spot collateral
    const dailyStaking = S0 * (step.stakingAPY / 100) * (1 / 365);
    cumStaking += dailyStaking;

    // Funding accrues only if hedge is solvent
    if (!isLiquidated) {
      const dailyFunding = N0 * (step.fundingAPR / 100) * (1 / 365);
      cumFunding += dailyFunding;
    }

    // Spot position valuation including depeg discount
    const spotVal = S0 * (1 + r) * (1 - depeg);

    // Maintenance margin and margin equity
    let maintenanceMargin: number;
    let marginEquity: number;

    if (mode === 'unified') {
      maintenanceMargin = N0 * (1 + r) * mmr;
      marginEquity = spotVal * V - N0 * r;
    } else {
      maintenanceMargin = N0 * (1 + r) * mmr;
      marginEquity = M0 - N0 * r;
    }

    // Solvency breach check
    if (!isLiquidated) {
      if (marginEquity < maintenanceMargin) {
        isLiquidated = true;
        tLiq = day;
        liquidationDate = step.date;
        liquidationPrice = step.spotPrice;
      }
    }

    // Mark-to-market Strategy Equity
    let strategyEquity: number;
    let marginRatio: number;

    if (isLiquidated) {
      // In post-liquidation state, short perp was forfeited; position is naked spot
      strategyEquity = spotVal + cumFunding + cumStaking;
      marginRatio = 1.0;
    } else {
      if (mode === 'unified') {
        const perpPnL = -N0 * r;
        strategyEquity = spotVal + perpPnL + cumFunding + cumStaking;
      } else {
        const perpMarginVal = Math.max(0, M0 - N0 * r);
        strategyEquity = spotVal + perpMarginVal + cumFunding + cumStaking;
      }
      marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 1.0;
    }

    // Benchmarks
    const spotBenchmarkEquity = C * (1 + r);
    const tbillBenchmarkEquity = C * Math.pow(1 + (tbillRate / 100), (day / 365));

    trajectory.push({
      day,
      date: step.date,
      timestamp: step.timestamp,
      spotPrice: step.spotPrice,
      priceReturnPct: parseFloat((r * 100).toFixed(2)),
      fundingAPR: step.fundingAPR,
      stakingAPY: step.stakingAPY,
      depegPct: step.depegPct,
      strategyEquity: parseFloat(strategyEquity.toFixed(2)),
      spotBenchmarkEquity: parseFloat(spotBenchmarkEquity.toFixed(2)),
      tbillBenchmarkEquity: parseFloat(tbillBenchmarkEquity.toFixed(2)),
      marginRatio: parseFloat(marginRatio.toFixed(4)),
      isLiquidated,
      cumulativeFunding: parseFloat(cumFunding.toFixed(2)),
      cumulativeStaking: parseFloat(cumStaking.toFixed(2))
    });
  }

  const horizonDays = trajectory.length;
  const lastStep = trajectory[trajectory.length - 1];
  const terminalStrategyEquity = lastStep.strategyEquity;
  const netPnL = parseFloat((terminalStrategyEquity - C).toFixed(2));
  const cumulativeReturnPct = parseFloat(((netPnL / C) * 100).toFixed(2));

  // CAGR (Compound Annual Growth Rate)
  const durationYears = horizonDays / 365;
  const cagrPct = durationYears > 0 && terminalStrategyEquity > 0
    ? parseFloat(((Math.pow(terminalStrategyEquity / C, 1 / durationYears) - 1) * 100).toFixed(2))
    : 0;

  // Maximum Drawdown (MDD) calculation
  let peakEquity = trajectory[0].strategyEquity;
  let maxDrawdown = 0;
  let maxDrawdownTroughDate = trajectory[0].date;

  for (const step of trajectory) {
    if (step.strategyEquity > peakEquity) {
      peakEquity = step.strategyEquity;
    }
    const dd = (step.strategyEquity - peakEquity) / peakEquity;
    if (dd < maxDrawdown) {
      maxDrawdown = dd;
      maxDrawdownTroughDate = step.date;
    }
  }
  const maxDrawdownPct = parseFloat(Math.abs(maxDrawdown * 100).toFixed(2));

  // Daily returns for Sharpe and Sortino computation
  const dailyReturns: number[] = [];
  for (let i = 1; i < trajectory.length; i++) {
    const prev = trajectory[i - 1].strategyEquity;
    const cur = trajectory[i].strategyEquity;
    if (prev > 0) {
      dailyReturns.push((cur - prev) / prev);
    }
  }

  let sharpeRatio = 0;
  let sortinoRatio = 0;

  if (dailyReturns.length > 1) {
    const meanDaily = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
    const varDaily = dailyReturns.reduce((acc, r) => acc + Math.pow(r - meanDaily, 2), 0) / (dailyReturns.length - 1);
    const annVol = Math.sqrt(varDaily) * Math.sqrt(365);

    // Downside variance for Sortino
    const downsideReturns = dailyReturns.filter(r => r < 0);
    const downsideVar = downsideReturns.length > 0
      ? downsideReturns.reduce((acc, r) => acc + Math.pow(r, 2), 0) / dailyReturns.length
      : 0;
    const annDownsideVol = Math.sqrt(downsideVar) * Math.sqrt(365);

    const excessAnnualReturn = (cagrPct - tbillRate) / 100;

    if (annVol > 0.0001) {
      sharpeRatio = parseFloat((excessAnnualReturn / annVol).toFixed(2));
    }
    if (annDownsideVol > 0.0001) {
      sortinoRatio = parseFloat((excessAnnualReturn / annDownsideVol).toFixed(2));
    } else if (excessAnnualReturn > 0) {
      sortinoRatio = 99.9;
    }
  }

  const spotBenchmarkReturnPct = parseFloat((((lastStep.spotBenchmarkEquity - C) / C) * 100).toFixed(2));
  const tbillBenchmarkReturnPct = parseFloat((((lastStep.tbillBenchmarkEquity - C) / C) * 100).toFixed(2));

  return {
    horizonDays,
    startDate: series[0].date,
    endDate: lastStep.date,
    initialCapital: C,
    terminalStrategyEquity,
    netPnL,
    cumulativeReturnPct,
    cagrPct,
    maxDrawdownPct,
    maxDrawdownTroughDate,
    sharpeRatio,
    sortinoRatio,
    totalHarvestedFunding: lastStep.cumulativeFunding,
    totalHarvestedStaking: lastStep.cumulativeStaking,
    isLiquidated,
    liquidationDate,
    liquidationPrice,
    tLiq,
    spotBenchmarkReturnPct,
    tbillBenchmarkReturnPct,
    dailyTrajectory: trajectory
  };
}
