/**
 * @file backtest.ts
 * @description Quantitative historical simulation engine for multi-year delta-neutral staked basis trades.
 * Implements pure mathematical path-dependent liquidation calculus, benchmark generation, and institutional risk metrics.
 */

import type { MarginMode } from '../config/presets.js';
import type { DailyHistoricalMarketStep } from '../data/historical/ethBeaconSeries.js';
import { getSp500Price } from '../data/historical/sp500Series.js';

export type BacktestExecutionMode = 'optimized' | 'retail';

export interface BacktestConfig {
  capital: number;
  mode: MarginMode;
  collateralRatio?: number;
  splitSpot?: number;
  mmr?: number;
  tbillRate?: number;
  asset?: string;
  leverage?: number;
  autoResetEnabled?: boolean;
  autoResetThreshold?: number; // e.g. 0.80 for 80% MMR
  executionMode?: BacktestExecutionMode; // 'optimized' (5 bps on net delta) | 'retail' (18 bps on gross turnover)
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
  isResetStep?: boolean;
  resetFeePaid?: number;
  resetBaselinePrice?: number | null;
  resetVolumeTraded?: number;
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
  totalResetsCount: number;
  totalResetFeesPaid: number;
  savedFromLiquidation: boolean;
  autoResetEnabled: boolean;
  autoResetThreshold: number;
  executionMode: BacktestExecutionMode;
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
  const L = mode === 'unified' ? Math.max(1.0, config.leverage ?? 1.0) : 1.0;
  const D = mode === 'unified' ? (L - 1) * C : 0;

  const autoResetEnabled = config.autoResetEnabled ?? false;
  const autoResetThreshold = Math.max(0.50, Math.min(0.99, config.autoResetThreshold ?? 0.80));
  const executionMode: BacktestExecutionMode = config.executionMode ?? 'optimized';

  // Fee rates:
  // Optimized: 5 bps (0.0005) on net delta traded volume (post-only maker + CoW Swap batch auction)
  // Retail: 18 bps (0.0018) on gross turnover (market taker + retail DEX slippage)
  const OPTIMIZED_FEE_RATE = 0.0005;
  const RETAIL_FEE_RATE = 0.0018;

  // High-performance cache check: sub-millisecond retrieval on repeat configurations
  const p0 = series[0].spotPrice;
  const pN = series[series.length - 1].spotPrice;
  const assetKey = config.asset ?? '';
  const cacheKey = `${assetKey}|${mode}|${C}|${L}|${V}|${splitSpot}|${mmr}|${tbillRate}|${p0}|${pN}|${series[0].date}|${series[series.length - 1].date}|${series.length}|${autoResetEnabled}|${autoResetThreshold}|${executionMode}`;
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

  // State-preserving epoch baseline tracking for auto-reset
  let currentS0 = S0;
  let currentM0 = M0;
  let currentN0 = N0;
  let currentD = D;
  let epochBaselinePrice = P0;
  let cumFundingAtEpochStart = 0;
  let cumStakingAtEpochStart = 0;
  let cumBorrowInterestAtEpochStart = 0;
  let totalResetFeesPaid = 0;
  let totalResetsCount = 0;
  let savedFromLiquidation = false;

  for (let i = 0; i < series.length; i++) {
    const step = series[i];
    const day = i + 1;
    let r_epoch = (step.spotPrice - epochBaselinePrice) / epochBaselinePrice;
    const r_total = (step.spotPrice - P0) / P0;
    const depeg = Math.max(0, Math.min(1, step.depegPct / 100));

    // Staking accrual on current spot collateral
    const dailyStaking = currentS0 * (step.stakingAPY / 100) * (1 / 365);
    cumStaking += dailyStaking;

    // Funding accrues only if hedge is solvent
    if (!isLiquidated) {
      const dailyFunding = currentN0 * (step.fundingAPR / 100) * (1 / 365);
      cumFunding += dailyFunding;
    }

    // Borrow interest on USD margin loan debt (stops once debt is settled upon liquidation)
    const borrowRate = step.borrowAPR ?? 6.5;
    let dailyBorrowInterest = 0;
    if (currentD > 0 && !isLiquidated) {
      dailyBorrowInterest = currentD * (borrowRate / 100) * (1 / 365);
      cumBorrowInterest += dailyBorrowInterest;
    }

    // Spot position valuation including depeg discount for current epoch
    let spotVal = currentS0 * (1 + r_epoch) * (1 - depeg);

    // Maintenance margin and margin equity
    let maintenanceMargin: number;
    let marginEquity: number;

    if (mode === 'unified') {
      maintenanceMargin = currentN0 * (1 + r_epoch) * mmr;
      marginEquity = spotVal * V - currentD - currentN0 * r_epoch;
    } else {
      maintenanceMargin = currentN0 * (1 + r_epoch) * mmr;
      marginEquity = currentM0 - currentN0 * r_epoch;
    }

    let marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 1.0;

    let isResetStep = false;
    let resetFeePaid = 0;
    let resetBaselinePrice: number | null = null;
    let resetVolumeTraded = 0;

    // Automatic Baseline Reset check: triggers if margin ratio breaches threshold
    if (autoResetEnabled && !isLiquidated) {
      if (marginRatio >= autoResetThreshold || marginEquity <= maintenanceMargin) {
        const epochYield = (cumFunding - cumFundingAtEpochStart) + (cumStaking - cumStakingAtEpochStart) - (cumBorrowInterest - cumBorrowInterestAtEpochStart);
        let equityBeforeReset: number;
        if (mode === 'unified') {
          const perpPnL = -currentN0 * r_epoch;
          equityBeforeReset = (spotVal - currentD) + perpPnL + epochYield;
        } else {
          const perpMarginVal = Math.max(0, currentM0 - currentN0 * r_epoch);
          equityBeforeReset = spotVal + perpMarginVal + epochYield;
        }

        if (equityBeforeReset > 0) {
          let fee = 0;
          let volume = 0;
          const oldSpotNotional = currentS0 * (1 + r_epoch);
          const oldPerpNotional = currentN0 * (1 + r_epoch);

          if (mode === 'unified') {
            const newNotional = equityBeforeReset * L;
            if (executionMode === 'optimized') {
              // Optimized: 5 bps on net delta volume (trimmed spot + new perp delta)
              const netSpotTrim = Math.max(0, oldSpotNotional - newNotional);
              const netPerpTrim = Math.max(0, oldPerpNotional - newNotional);
              volume = netSpotTrim + netPerpTrim;
              fee = volume * OPTIMIZED_FEE_RATE;
            } else {
              // Retail: 18 bps on full gross turnover (close all + open all)
              volume = (oldSpotNotional + oldPerpNotional) + (newNotional * 2);
              fee = (volume / 2) * RETAIL_FEE_RATE;
            }
          } else {
            const sFrac = splitSpot / 100;
            const newSpotNotional = equityBeforeReset * sFrac;
            const newPerpNotional = newSpotNotional;
            if (executionMode === 'optimized') {
              const netSpotTrim = Math.max(0, oldSpotNotional - newSpotNotional);
              const netPerpTrim = Math.max(0, oldPerpNotional - newPerpNotional);
              volume = netSpotTrim + netPerpTrim;
              fee = volume * OPTIMIZED_FEE_RATE;
            } else {
              volume = (oldSpotNotional + oldPerpNotional) + (newSpotNotional + newPerpNotional);
              fee = (volume / 2) * RETAIL_FEE_RATE;
            }
          }

          fee = round2(fee);
          totalResetFeesPaid += fee;
          totalResetsCount++;
          savedFromLiquidation = true;
          isResetStep = true;
          resetFeePaid = fee;
          resetBaselinePrice = step.spotPrice;
          resetVolumeTraded = round2(volume);

          // Rebalance & redeploy 100% of post-fee equity into new baseline
          const newEquity = Math.max(1, equityBeforeReset - fee);
          cumFundingAtEpochStart = cumFunding;
          cumStakingAtEpochStart = cumStaking;
          cumBorrowInterestAtEpochStart = cumBorrowInterest;
          epochBaselinePrice = step.spotPrice;
          r_epoch = 0;

          if (mode === 'unified') {
            currentS0 = newEquity * L;
            currentM0 = newEquity;
            currentN0 = newEquity * L;
            currentD = (L - 1) * newEquity;

            spotVal = currentS0 * (1 - depeg);
            maintenanceMargin = currentN0 * mmr;
            marginEquity = spotVal * V - currentD;
            marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 0;
          } else {
            const sFrac = splitSpot / 100;
            currentS0 = newEquity * sFrac;
            currentM0 = newEquity * (1 - sFrac);
            currentN0 = currentS0;

            spotVal = currentS0 * (1 - depeg);
            maintenanceMargin = currentN0 * mmr;
            marginEquity = currentM0;
            marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 0;
          }
        }
      }
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
          // In unified mode, the exchange sells spot collateral to settle short perp loss and repay USD debt D
          residualSpotEquityAtLiq = Math.max(0, spotVal - (currentN0 * r_epoch + currentD));
        }
      }
    }

    // Mark-to-market Strategy Equity
    let strategyEquity: number;

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
      const epochYield = (cumFunding - cumFundingAtEpochStart) + (cumStaking - cumStakingAtEpochStart) - (cumBorrowInterest - cumBorrowInterestAtEpochStart);
      if (mode === 'unified') {
        const perpPnL = -currentN0 * r_epoch;
        strategyEquity = (spotVal - currentD) + perpPnL + epochYield;
      } else {
        const perpMarginVal = Math.max(0, currentM0 - currentN0 * r_epoch);
        strategyEquity = spotVal + perpMarginVal + epochYield;
      }
      marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 1.0;
    }

    // Benchmarks
    const spotBenchmarkEquity = C * (1 + r_total);
    const tbillBenchmarkEquity = C * Math.pow(1 + (tbillRate / 100), (day / 365));
    const sp500Price = getSp500Price(step.date);
    const sp500BenchmarkEquity = sp500P0 > 0 ? C * (sp500Price / sp500P0) : C;

    trajectory.push({
      day,
      date: step.date,
      timestamp: step.timestamp,
      spotPrice: step.spotPrice,
      priceReturnPct: round2(r_total * 100),
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
      borrowDebt: currentD,
      isResetStep,
      resetFeePaid,
      resetBaselinePrice,
      resetVolumeTraded
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
    dailyTrajectory: trajectory,
    totalResetsCount,
    totalResetFeesPaid: round2(totalResetFeesPaid),
    savedFromLiquidation,
    autoResetEnabled,
    autoResetThreshold,
    executionMode
  };

  // Manage cache capacity & store
  if (backtestResultCache.size >= MAX_SIMULATION_CACHE) {
    const firstKey = backtestResultCache.keys().next().value;
    if (firstKey) backtestResultCache.delete(firstKey);
  }
  backtestResultCache.set(cacheKey, summaryResult);

  return summaryResult;
}
