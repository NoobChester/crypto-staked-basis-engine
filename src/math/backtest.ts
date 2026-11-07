/**
 * @file backtest.ts
 * @description Quantitative historical simulation engine for multi-year delta-neutral staked basis trades.
 * Implements pure mathematical path-dependent liquidation calculus, benchmark generation, and institutional risk metrics.
 */

import type { MarginMode } from '../config/presets.js';
import type { DailyHistoricalMarketStep } from '../data/historical/ethBeaconSeries.js';
import { getSp500Price } from '../data/historical/sp500Series.js';

export interface BacktestConfig {
  capital: number;
  mode: MarginMode;
  collateralRatio?: number;
  splitSpot?: number;
  mmr?: number;
  tbillRate?: number;
  asset?: string;
  leverage?: number;
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
  sp500BenchmarkEquity: number;
  marginRatio: number;
  isLiquidated: boolean;
  cumulativeFunding: number;
  cumulativeStaking: number;
  borrowRateAPR: number;
  cumulativeBorrowInterest: number;
  borrowDebt: number;
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
  totalBorrowInterestPaid: number;
  leverage: number;
  isLiquidated: boolean;
  liquidationDate: string | null;
  liquidationPrice: number | null;
  tLiq: number | null;
  spotBenchmarkReturnPct: number;
  tbillBenchmarkReturnPct: number;
  sp500BenchmarkReturnPct: number;
  dailyTrajectory: BacktestStepResult[];
}

// High-performance LRU / Memoization simulation cache
const backtestResultCache = new Map<string, BacktestSummaryResult>();
const MAX_SIMULATION_CACHE = 40;

export function clearBacktestSimulationCache(): void {
  backtestResultCache.clear();
}

/**
 * Fast numerical rounding to 2 decimal places without heap string allocation
 */
function round2(val: number): number {
  return Math.round(val * 100) / 100;
}

/**
 * Fast numerical rounding to 4 decimal places without heap string allocation
 */
function round4(val: number): number {
  return Math.round(val * 10000) / 10000;
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
  const L = mode === 'unified' ? Math.max(1.0, Math.min(5.0, config.leverage ?? 1.0)) : 1.0;
  const D = mode === 'unified' ? (L - 1) * C : 0;

  // High-performance cache check: sub-millisecond retrieval on repeat configurations
  const p0 = series[0].spotPrice;
  const pN = series[series.length - 1].spotPrice;
  const assetKey = config.asset ?? '';
  const cacheKey = `${assetKey}|${mode}|${C}|${L}|${V}|${splitSpot}|${mmr}|${tbillRate}|${p0}|${pN}|${series[0].date}|${series[series.length - 1].date}|${series.length}`;
  const cached = backtestResultCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  let S0: number, M0: number, N0: number;
  if (mode === 'unified') {
    S0 = C * L;
    M0 = C;
    N0 = C * L;
  } else {
    const sFrac = splitSpot / 100;
    S0 = C * sFrac;
    M0 = C * (1 - sFrac);
    N0 = S0;
  }

  const P0 = series[0].spotPrice;
  const sp500P0 = getSp500Price(series[0].date);
  const trajectory: BacktestStepResult[] = [];
  let cumFunding = 0;
  let cumStaking = 0;
  let cumBorrowInterest = 0;
  let isLiquidated = false;
  let tLiq: number | null = null;
  let liquidationDate: string | null = null;
  let liquidationPrice: number | null = null;
  let liquidationDepeg = 0;
  let residualSpotEquityAtLiq = 0;

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

    // Borrow interest on USD margin loan debt (stops once debt is settled upon liquidation)
    const borrowRate = step.borrowAPR ?? 6.5;
    let dailyBorrowInterest = 0;
    if (D > 0 && !isLiquidated) {
      dailyBorrowInterest = D * (borrowRate / 100) * (1 / 365);
      cumBorrowInterest += dailyBorrowInterest;
    }

    // Spot position valuation including depeg discount
    const spotVal = S0 * (1 + r) * (1 - depeg);

    // Maintenance margin and margin equity
    let maintenanceMargin: number;
    let marginEquity: number;

    if (mode === 'unified') {
      maintenanceMargin = N0 * (1 + r) * mmr;
      marginEquity = spotVal * V - D - N0 * r;
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
        liquidationDepeg = depeg;
        if (mode === 'unified') {
          // In unified mode, the exchange sells spot collateral to settle short perp loss (-N0 * r) and repay USD debt D
          residualSpotEquityAtLiq = Math.max(0, spotVal - (N0 * r + D));
        }
      }
    }

    // Mark-to-market Strategy Equity
    let strategyEquity: number;
    let marginRatio: number;

    if (isLiquidated) {
      if (mode === 'unified') {
        // In post-liquidation state, derivative closed, debt extinguished via spot sale, remaining residual spot continues naked long
        const priceRatio = (liquidationPrice && liquidationPrice > 0)
          ? (step.spotPrice * (1 - depeg)) / (liquidationPrice * (1 - liquidationDepeg))
          : 1.0;
        const residualSpot = residualSpotEquityAtLiq * priceRatio;
        strategyEquity = residualSpot + cumFunding + cumStaking - cumBorrowInterest;
      } else {
        // In isolated mode, spot in custody was untouched; only cash margin M0 was wiped out
        strategyEquity = spotVal + cumFunding + cumStaking;
      }
      marginRatio = 1.0;
    } else {
      if (mode === 'unified') {
        const perpPnL = -N0 * r;
        strategyEquity = (spotVal - D) + perpPnL + cumFunding + cumStaking - cumBorrowInterest;
      } else {
        const perpMarginVal = Math.max(0, M0 - N0 * r);
        strategyEquity = spotVal + perpMarginVal + cumFunding + cumStaking;
      }
      marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 1.0;
    }

    // Benchmarks
    const spotBenchmarkEquity = C * (1 + r);
    const tbillBenchmarkEquity = C * Math.pow(1 + (tbillRate / 100), (day / 365));
    const sp500Price = getSp500Price(step.date);
    const sp500BenchmarkEquity = sp500P0 > 0 ? C * (sp500Price / sp500P0) : C;

    trajectory.push({
      day,
      date: step.date,
      timestamp: step.timestamp,
      spotPrice: step.spotPrice,
      priceReturnPct: round2(r * 100),
      fundingAPR: step.fundingAPR,
      stakingAPY: step.stakingAPY,
      depegPct: step.depegPct,
      strategyEquity: round2(strategyEquity),
      spotBenchmarkEquity: round2(spotBenchmarkEquity),
      tbillBenchmarkEquity: round2(tbillBenchmarkEquity),
      sp500BenchmarkEquity: round2(sp500BenchmarkEquity),
      marginRatio: round4(marginRatio),
      isLiquidated,
      cumulativeFunding: round2(cumFunding),
      cumulativeStaking: round2(cumStaking),
      borrowRateAPR: borrowRate,
      cumulativeBorrowInterest: round2(cumBorrowInterest),
      borrowDebt: D
    });
  }

  const horizonDays = trajectory.length;
  const lastStep = trajectory[trajectory.length - 1];
  const terminalStrategyEquity = lastStep.strategyEquity;
  const netPnL = round2(terminalStrategyEquity - C);
  const cumulativeReturnPct = round2((netPnL / C) * 100);

  // CAGR (Compound Annual Growth Rate)
  const durationYears = horizonDays / 365;
  const cagrPct = durationYears > 0 && terminalStrategyEquity > 0
    ? round2((Math.pow(terminalStrategyEquity / C, 1 / durationYears) - 1) * 100)
    : 0;

  // Maximum Drawdown (MDD) calculation in O(N)
  let peakEquity = trajectory[0].strategyEquity;
  let maxDrawdown = 0;
  let maxDrawdownTroughDate = trajectory[0].date;

  for (let i = 0; i < horizonDays; i++) {
    const eq = trajectory[i].strategyEquity;
    if (eq > peakEquity) {
      peakEquity = eq;
    }
    const dd = (eq - peakEquity) / peakEquity;
    if (dd < maxDrawdown) {
      maxDrawdown = dd;
      maxDrawdownTroughDate = trajectory[i].date;
    }
  }
  const maxDrawdownPct = round2(Math.abs(maxDrawdown * 100));

  // Daily returns for Sharpe and Sortino computation (single allocated array)
  const dailyReturns: number[] = new Array(horizonDays - 1);
  let sumDailyReturns = 0;
  for (let i = 1; i < horizonDays; i++) {
    const prev = trajectory[i - 1].strategyEquity;
    const cur = trajectory[i].strategyEquity;
    const ret = prev > 0 ? (cur - prev) / prev : 0;
    dailyReturns[i - 1] = ret;
    sumDailyReturns += ret;
  }

  let sharpeRatio = 0;
  let sortinoRatio = 0;

  const numReturns = dailyReturns.length;
  if (numReturns > 1) {
    const meanDaily = sumDailyReturns / numReturns;
    let sumSqDiff = 0;
    let sumDownsideSq = 0;

    for (let i = 0; i < numReturns; i++) {
      const r = dailyReturns[i];
      sumSqDiff += Math.pow(r - meanDaily, 2);
      if (r < 0) {
        sumDownsideSq += Math.pow(r, 2);
      }
    }

    const varDaily = sumSqDiff / (numReturns - 1);
    const annVol = Math.sqrt(varDaily) * Math.sqrt(365);

    const downsideVar = sumDownsideSq / numReturns;
    const annDownsideVol = Math.sqrt(downsideVar) * Math.sqrt(365);

    const excessAnnualReturn = (cagrPct - tbillRate) / 100;

    if (annVol > 0.0001) {
      sharpeRatio = round2(excessAnnualReturn / annVol);
    }
    if (annDownsideVol > 0.0001) {
      sortinoRatio = round2(excessAnnualReturn / annDownsideVol);
    } else if (excessAnnualReturn > 0) {
      sortinoRatio = 99.9;
    }
  }

  const spotBenchmarkReturnPct = round2(((lastStep.spotBenchmarkEquity - C) / C) * 100);
  const tbillBenchmarkReturnPct = round2(((lastStep.tbillBenchmarkEquity - C) / C) * 100);
  const sp500BenchmarkReturnPct = round2(((lastStep.sp500BenchmarkEquity - C) / C) * 100);

  const summaryResult: BacktestSummaryResult = {
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
    totalBorrowInterestPaid: round2(cumBorrowInterest),
    leverage: L,
    isLiquidated,
    liquidationDate,
    liquidationPrice,
    tLiq,
    spotBenchmarkReturnPct,
    tbillBenchmarkReturnPct,
    sp500BenchmarkReturnPct,
    dailyTrajectory: trajectory
  };

  // Manage cache capacity & store
  if (backtestResultCache.size >= MAX_SIMULATION_CACHE) {
    const firstKey = backtestResultCache.keys().next().value;
    if (firstKey) backtestResultCache.delete(firstKey);
  }
  backtestResultCache.set(cacheKey, summaryResult);

  return summaryResult;
}
