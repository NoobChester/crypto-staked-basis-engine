/**
 * @file hedging.ts
 * @description Pure quantitative calculation engine for delta-neutral hedging,
 * cross-margin liquidation thresholds, isolated cash margin buffers, fee drag, and yield accrual.
 */

import type { MarginMode, TradedAsset, BtcVariant, CollateralPresetKey, SolYieldType } from '../config/presets.js';

export interface HedgingState {
  capital: number;
  mode: MarginMode;
  priceMove: number;
  days: number;
  fundingAPR: number;
  stakingAPY: number;
  depegPct: number;
  mmr: number;
  collateralRatio: number;
  splitSpot: number;
  roundtripFeePct?: number;
  tbillRate?: number;
  feeTier?: string;
  tradedAsset?: TradedAsset;
  btcVariant?: BtcVariant;
  activePreset?: CollateralPresetKey;
  solYieldType?: SolYieldType;
  isLiveFunding?: boolean;
  isLiveStaking?: boolean;
}

export interface HedgingOutcome {
  C: number;
  S0: number;
  M0: number;
  N0: number;
  rLiq: number;
  isLiquidated: boolean;
  spotVal: number;
  spotPnL: number;
  perpMarginVal: number;
  perpPnL: number;
  fundingYieldTotal: number;
  stakingYieldTotal: number;
  depegLoss: number;
  totalPortfolioVal: number;
  netPnL: number;
  roiPct: number;
  netDelta: number;
  spotAPYContrib: number;
  perpAPYContrib: number;
  totalStrategyAPY: number;
  distanceToLiqPct: number;
  // Execution Fee Friction & Realized Yield
  roundtripFeePct: number;
  feeDragAPY: number;
  netRealizedAPY: number;
  netFeeDollarLoss: number;
  netRealizedPnL: number;
  netRealizedRoiPct: number;
  // Macro Risk-Free Benchmark Comparison
  tbillRate: number;
  excessSpreadAPY: number;
  excessDollarCarry: number;
}

/**
 * Calculates the exact quantitative outcome of the delta-neutral hedging position.
 */
export function calculateOutcome(
  priceChangePct: number,
  customState: Partial<HedgingState> = {}
): HedgingOutcome {
  const C = Math.max(0, customState.capital ?? 10000);
  const r = priceChangePct / 100;
  const depeg = Math.max(0, Math.min(1, (customState.depegPct ?? 0) / 100));
  const days = Math.max(1, customState.days ?? 90);
  const durationYears = days / 365;
  const mmr = customState.mmr ?? 0.005;
  const mode = customState.mode ?? 'unified';
  const fundingAPR = customState.fundingAPR ?? 10.0;
  const stakingAPY = customState.stakingAPY ?? 3.2;
  const roundtripFeePct = customState.roundtripFeePct ?? 0.10;
  const tbillRate = customState.tbillRate ?? 4.35;

  let S0: number, M0: number, N0: number, rLiq: number, isLiquidated: boolean;
  let spotVal = 0, spotPnL = 0;
  let perpMarginVal = 0, perpPnL = 0;
  let totalPortfolioVal = 0;
  let netDelta = 0;
  let depegLoss = 0;

  if (mode === 'unified') {
    // UNIFIED MARGIN MODE:
    // 100% of capital deployed in spot. Spot acts as cross-margin for 1x short perp.
    S0 = C;
    N0 = C;
    M0 = C;
    const V = customState.collateralRatio ?? 0.90;

    // Unified Account liquidation threshold:
    // S0*(1+r)*(1-depeg)*V - N0*r = N0*(1+r)*MMR
    if (V >= 0.999 && depeg === 0) {
      rLiq = Infinity;
    } else {
      const num = ((1 - depeg) * V) - mmr;
      const den = 1 + mmr - ((1 - depeg) * V);
      rLiq = den <= 0 ? Infinity : (num / den);
    }

    isLiquidated = (r >= rLiq);

    const fundingYieldTotal = N0 * (fundingAPR / 100) * durationYears;
    const stakingYieldTotal = S0 * (stakingAPY / 100) * durationYears;

    if (!isLiquidated) {
      spotVal = S0 * (1 + r) * (1 - depeg);
      depegLoss = S0 * (1 + r) * depeg;
      spotPnL = spotVal - S0;
      perpPnL = -N0 * r;

      totalPortfolioVal = spotVal + perpPnL + fundingYieldTotal + stakingYieldTotal;
      netDelta = spotVal - (N0 * (1 + r));
      perpMarginVal = spotVal * V + perpPnL;
    } else {
      spotVal = S0 * (1 + r) * (1 - depeg);
      spotPnL = spotVal - S0;
      depegLoss = S0 * (1 + r) * depeg;
      perpPnL = -S0 * V;
      totalPortfolioVal = spotVal + fundingYieldTotal + stakingYieldTotal;
      netDelta = spotVal;
      perpMarginVal = 0;
    }

    const netPnL = totalPortfolioVal - C;
    const roiPct = C > 0 ? (netPnL / C) * 100 : 0;

    const spotWeight = 1.0;
    const perpWeight = 1.0;
    const spotAPYContrib = stakingAPY * spotWeight;
    const perpAPYContrib = fundingAPR * perpWeight;
    const totalStrategyAPY = spotAPYContrib + perpAPYContrib;
    const distanceToLiqPct = (rLiq === Infinity) ? Infinity : (rLiq - r) * 100;

    // Fee drag calculations
    const feeDragAPY = parseFloat((roundtripFeePct * (365 / days)).toFixed(2));
    const netRealizedAPY = parseFloat((totalStrategyAPY - feeDragAPY).toFixed(2));
    const netFeeDollarLoss = parseFloat((C * (roundtripFeePct / 100)).toFixed(2));
    const netRealizedPnL = parseFloat((netPnL - netFeeDollarLoss).toFixed(2));
    const netRealizedRoiPct = C > 0 ? parseFloat(((netRealizedPnL / C) * 100).toFixed(2)) : 0;

    // Macro Benchmark Spread
    const excessSpreadAPY = parseFloat((netRealizedAPY - tbillRate).toFixed(2));
    const excessDollarCarry = parseFloat((C * (excessSpreadAPY / 100) * durationYears).toFixed(2));

    return {
      C, S0, M0, N0, rLiq, isLiquidated,
      spotVal, spotPnL, perpMarginVal, perpPnL,
      fundingYieldTotal, stakingYieldTotal, depegLoss,
      totalPortfolioVal, netPnL, roiPct, netDelta,
      spotAPYContrib, perpAPYContrib, totalStrategyAPY,
      distanceToLiqPct,
      roundtripFeePct,
      feeDragAPY,
      netRealizedAPY,
      netFeeDollarLoss,
      netRealizedPnL,
      netRealizedRoiPct,
      tbillRate,
      excessSpreadAPY,
      excessDollarCarry
    };

  } else {
    // ISOLATED MARGIN MODE:
    const splitSpot = customState.splitSpot ?? 50;
    const sFrac = Math.max(0.01, Math.min(0.99, splitSpot / 100));
    const mFrac = 1 - sFrac;
    S0 = C * sFrac;
    M0 = C * mFrac;
    N0 = S0;

    rLiq = ((M0 / N0) - mmr) / (1 + mmr);
    isLiquidated = (r >= rLiq);

    const fundingYieldTotal = N0 * (fundingAPR / 100) * durationYears;
    const stakingYieldTotal = S0 * (stakingAPY / 100) * durationYears;

    if (!isLiquidated) {
      spotVal = S0 * (1 + r) * (1 - depeg);
      depegLoss = S0 * (1 + r) * depeg;
      spotPnL = spotVal - S0;
      perpPnL = -N0 * r;

      perpMarginVal = Math.max(0, M0 + perpPnL);
      totalPortfolioVal = spotVal + perpMarginVal + fundingYieldTotal + stakingYieldTotal;
      netDelta = spotVal - (N0 * (1 + r));
    } else {
      spotVal = S0 * (1 + r) * (1 - depeg);
      depegLoss = S0 * (1 + r) * depeg;
      spotPnL = spotVal - S0;
      perpMarginVal = 0;
      perpPnL = -M0;
      totalPortfolioVal = spotVal + fundingYieldTotal + stakingYieldTotal;
      netDelta = spotVal;
    }

    const netPnL = totalPortfolioVal - C;
    const roiPct = C > 0 ? (netPnL / C) * 100 : 0;

    const spotWeight = sFrac;
    const perpWeight = sFrac;
    const spotAPYContrib = stakingAPY * spotWeight;
    const perpAPYContrib = fundingAPR * perpWeight;
    const totalStrategyAPY = spotAPYContrib + perpAPYContrib;
    const distanceToLiqPct = (rLiq === Infinity) ? Infinity : (rLiq - r) * 100;

    // Fee drag calculations
    const feeDragAPY = parseFloat((roundtripFeePct * (365 / days)).toFixed(2));
    const netRealizedAPY = parseFloat((totalStrategyAPY - feeDragAPY).toFixed(2));
    const netFeeDollarLoss = parseFloat((C * (roundtripFeePct / 100)).toFixed(2));
    const netRealizedPnL = parseFloat((netPnL - netFeeDollarLoss).toFixed(2));
    const netRealizedRoiPct = C > 0 ? parseFloat(((netRealizedPnL / C) * 100).toFixed(2)) : 0;

    // Macro Benchmark Spread
    const excessSpreadAPY = parseFloat((netRealizedAPY - tbillRate).toFixed(2));
    const excessDollarCarry = parseFloat((C * (excessSpreadAPY / 100) * durationYears).toFixed(2));

    return {
      C, S0, M0, N0, rLiq, isLiquidated,
      spotVal, spotPnL, perpMarginVal, perpPnL,
      fundingYieldTotal, stakingYieldTotal, depegLoss,
      totalPortfolioVal, netPnL, roiPct, netDelta,
      spotAPYContrib, perpAPYContrib, totalStrategyAPY,
      distanceToLiqPct,
      roundtripFeePct,
      feeDragAPY,
      netRealizedAPY,
      netFeeDollarLoss,
      netRealizedPnL,
      netRealizedRoiPct,
      tbillRate,
      excessSpreadAPY,
      excessDollarCarry
    };
  }
}

export function fmtUSD(val: number): string {
  if (isNaN(val)) return '$0.00';
  const absVal = Math.abs(val);
  const str = absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (val < 0 ? '-' : '') + '$' + str;
}

export function fmtPct(val: number, plus = true): string {
  if (val === Infinity) return 'INFINITE\u00A0(∞)';
  if (isNaN(val)) return '0.00%';
  const sign = (plus && val > 0) ? '+' : '';
  return sign + val.toFixed(2) + '%';
}
