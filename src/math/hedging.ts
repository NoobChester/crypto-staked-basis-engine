/**
 * @file hedging.ts
 * @description Pure quantitative calculation engine for delta-neutral hedging,
 * cross-margin liquidation thresholds, isolated cash margin buffers, fee drag, and yield accrual.
 */

import type { MarginMode, TradedAsset, BtcVariant, CollateralPresetKey, SolYieldType } from '../config/presets.js';
import { CRISIS_SCENARIOS, type CrisisScenarioKey } from '../config/scenarios.js';
import { CRISIS_HISTORICAL_SERIES } from '../data/crisisHistoricalSeries.js';

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
  leverage?: number;
  borrowAPR?: number;
  isCustomBorrowAPR?: boolean;
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
  // Leveraged Basis Trade Metrics
  leverage: number;
  borrowDebt: number;
  borrowAPR: number;
  borrowInterestTotal: number;
  borrowAPYDrag: number;
}

export interface CrisisSimulationStep {
  day: number;
  dateStr?: string;
  priceShockPct: number;
  spotPrice: number;
  fundingAPR: number;
  depegPct: number;
  equity: number;
  marginRatio: number;
  isLiquidated: boolean;
  fundingAccrued: number;
  stakingAccrued: number;
}

export interface CrisisSimulationResult {
  scenarioKey: CrisisScenarioKey;
  scenarioTitle: string;
  horizonDays: number;
  tLiq: number | null; // null if unliquidated; day index if breached
  isLiquidated: boolean;
  totalHarvestedFunding: number;
  totalHarvestedStaking: number;
  depegLoss: number;
  spotPnL: number;
  perpPnL: number;
  terminalEquity: number;
  netPnL: number;
  netRealizedAPY: number;
  rLiq: number;
  distanceToLiqPct: number;
  dailyTrajectory: CrisisSimulationStep[];

  // Post-Resolution Parity State (0.00% Depeg)
  resolvedDepegPct?: number;
  resolvedDepegLoss?: number;
  resolvedTerminalEquity?: number;
  resolvedNetPnL?: number;
  resolvedRealizedAPY?: number;
}

/**
 * Calculates dynamic borrow APR using the two-slope market-responsive kink curve.
 * Baseline calm rate: 6.5%.
 * Contango regime (Funding 10% - 25%): rates expand steadily with borrowing demand.
 * Mania regime (Funding > 25% or Price Rally > 30%): piecewise kink slope spikes borrow APR up to 60.0%.
 */
export function calculateDynamicBorrowAPR(fundingAPR: number, priceMovePct: number = 0): number {
  const baseRate = 6.5;
  let apr = baseRate;

  if (fundingAPR > 10 && fundingAPR <= 25) {
    apr += 0.3 * (fundingAPR - 10);
  } else if (fundingAPR > 25) {
    // 6.5 + 0.3 * 15 = 11.0% at the kink point
    apr = 11.0 + 0.65 * (fundingAPR - 25);
  }

  // Price rally liquidity squeeze modifier
  if (priceMovePct > 30) {
    apr += 0.1 * (priceMovePct - 30);
  }

  return parseFloat(Math.max(2.5, Math.min(60.0, apr)).toFixed(2));
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
    // Capital deployed with optional leverage L (>= 1.0x).
    // Spot acts as cross-margin for short perp. Extra notional financed via USD margin loan debt.
    const L = Math.max(1.0, customState.leverage ?? 1.0);
    S0 = C * L;
    N0 = C * L;
    M0 = C;
    const D = (L - 1) * C;
    const V = customState.collateralRatio ?? 0.90;

    const dynamicBorrowAPR = calculateDynamicBorrowAPR(fundingAPR, priceChangePct);
    const borrowAPR = customState.borrowAPR ?? dynamicBorrowAPR;
    const borrowInterestTotal = D * (borrowAPR / 100) * durationYears;
    const borrowAPYDrag = (L - 1) * borrowAPR;

    // Leveraged Unified Account liquidation threshold:
    // S0*(1+r)*(1-depeg)*V - D - N0*r = N0*(1+r)*MMR
    // Dividing by C * L:
    // (1+r)*(1-depeg)*V - (L-1)/L - r = (1+r)*MMR
    if (L === 1.0 && V >= 0.999 && depeg === 0) {
      rLiq = Infinity;
    } else {
      const debtTerm = (L - 1) / L;
      const num = ((1 - depeg) * V) - debtTerm - mmr;
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

      totalPortfolioVal = (spotVal - D) + perpPnL + fundingYieldTotal + stakingYieldTotal - borrowInterestTotal;
      netDelta = spotVal - (N0 * (1 + r));
      perpMarginVal = spotVal * V - D + perpPnL;
    } else {
      spotVal = S0 * (1 + r) * (1 - depeg);
      spotPnL = spotVal - S0;
      depegLoss = S0 * (1 + r) * depeg;
      perpPnL = -N0 * rLiq;
      // In unified cross-margin, exchange sells spot collateral to settle short perp loss (-N0 * rLiq) and debt D
      const spotValAtLiq = S0 * (1 + rLiq) * (1 - depeg);
      const residualSpotAtLiq = Math.max(0, spotValAtLiq - (N0 * rLiq + D));
      // Remaining residual spot continues naked long above liquidation threshold
      const residualSpot = rLiq > -1 ? residualSpotAtLiq * ((1 + r) / (1 + rLiq)) : 0;
      totalPortfolioVal = residualSpot + fundingYieldTotal + stakingYieldTotal - borrowInterestTotal;
      netDelta = residualSpot;
      perpMarginVal = 0;
    }

    const netPnL = totalPortfolioVal - C;
    const roiPct = C > 0 ? (netPnL / C) * 100 : 0;

    const spotWeight = L;
    const perpWeight = L;
    const spotAPYContrib = stakingAPY * spotWeight;
    const perpAPYContrib = fundingAPR * perpWeight;
    const totalStrategyAPY = (spotAPYContrib + perpAPYContrib) - borrowAPYDrag;
    const distanceToLiqPct = (rLiq === Infinity) ? Infinity : (rLiq - r) * 100;

    // Fee drag calculations scaled by leveraged notional
    const feeDragAPY = parseFloat((roundtripFeePct * L * (365 / days)).toFixed(2));
    const netRealizedAPY = parseFloat((totalStrategyAPY - feeDragAPY).toFixed(2));
    const netFeeDollarLoss = parseFloat((C * L * (roundtripFeePct / 100)).toFixed(2));
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
      excessDollarCarry,
      leverage: L,
      borrowDebt: D,
      borrowAPR,
      borrowInterestTotal: parseFloat(borrowInterestTotal.toFixed(2)),
      borrowAPYDrag: parseFloat(borrowAPYDrag.toFixed(2))
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
      excessDollarCarry,
      leverage: 1.0,
      borrowDebt: 0,
      borrowAPR: 0,
      borrowInterestTotal: 0,
      borrowAPYDrag: 0
    };
  }
}

export interface HedgingConfidenceBounds {
  priceShockPct: number;
  baseEquity: number;
  upperEquity: number; // +2σ
  lowerEquity: number; // -2σ
  sigmaDollarSpan: number;
}

/**
 * Computes ±2σ statistical carry confidence bounds for a given price shock.
 * Evaluates upper outcome with (+2σ funding, +2σ staking) and lower outcome with (-2σ funding, -2σ staking clamped >= 0.1).
 */
export function calculateConfidenceBounds(
  priceChangePct: number,
  state: HedgingState,
  sigmas?: { sigmaFunding?: number; sigmaStaking?: number }
): HedgingConfidenceBounds {
  const baseFunding = state.fundingAPR ?? 10.0;
  const baseStaking = state.stakingAPY ?? 3.2;

  const sigmaFunding = Math.abs(sigmas?.sigmaFunding ?? 0);
  const sigmaStaking = Math.abs(sigmas?.sigmaStaking ?? 0);

  const upperFunding = baseFunding + 2 * sigmaFunding;
  const upperStaking = baseStaking + 2 * sigmaStaking;

  const lowerFunding = baseFunding - 2 * sigmaFunding;
  const lowerStaking = baseStaking <= 0
    ? 0
    : Math.min(baseStaking, Math.max(0.1, baseStaking - 2 * sigmaStaking));

  const baseOutcome = calculateOutcome(priceChangePct, state);
  const upperOutcome = calculateOutcome(priceChangePct, {
    ...state,
    fundingAPR: upperFunding,
    stakingAPY: upperStaking
  });
  const lowerOutcome = calculateOutcome(priceChangePct, {
    ...state,
    fundingAPR: lowerFunding,
    stakingAPY: lowerStaking
  });

  const baseEquity = parseFloat(baseOutcome.totalPortfolioVal.toFixed(2));
  const upperEquity = parseFloat(upperOutcome.totalPortfolioVal.toFixed(2));
  const lowerEquity = parseFloat(lowerOutcome.totalPortfolioVal.toFixed(2));
  const sigmaDollarSpan = parseFloat(Math.max(0, upperEquity - lowerEquity).toFixed(2));

  return {
    priceShockPct: priceChangePct,
    baseEquity,
    upperEquity,
    lowerEquity,
    sigmaDollarSpan
  };
}

/**
 * Executes a path-dependent daily crisis simulation across historical time series or mean-reverting shocks.
 * Models day-by-day margin ratio progression, liquidation breaches, cessation of perp carry, and terminal PnL.
 */
export function calculateCrisisSimulation(
  scenarioKey: CrisisScenarioKey,
  state: Partial<HedgingState> = {}
): CrisisSimulationResult {
  const scenario = CRISIS_SCENARIOS[scenarioKey];
  if (!scenario) {
    throw new Error(`Unknown crisis scenario key: ${scenarioKey}`);
  }

  const horizonDays = scenario.lockedHorizonDays;
  const C = Math.max(0, state.capital ?? 10000);
  const mode = state.mode ?? 'unified';
  const mmr = state.mmr ?? 0.005;
  const stakingAPY = state.stakingAPY ?? 3.2;
  const baseFundingAPR = state.fundingAPR ?? 10.0;
  const V = scenario.collateralRatio ?? state.collateralRatio ?? 0.90;

  const baseSpotPrice = state.tradedAsset === 'BTC' ? 78500 : state.tradedAsset === 'SOL' ? 93.5 : 2315;

  const L = mode === 'unified' ? Math.max(1.0, state.leverage ?? 1.0) : 1.0;
  const D = mode === 'unified' ? (L - 1) * C : 0;

  let S0: number, M0: number, N0: number;
  if (mode === 'unified') {
    S0 = C * L;
    M0 = C;
    N0 = C * L;
  } else {
    const splitSpot = state.splitSpot ?? 50;
    const sFrac = Math.max(0.01, Math.min(0.99, splitSpot / 100));
    const mFrac = 1 - sFrac;
    S0 = C * sFrac;
    M0 = C * mFrac;
    N0 = S0;
  }

  const dailyTrajectory: CrisisSimulationStep[] = [];
  let cumulativeFunding = 0;
  let cumulativeStaking = 0;
  let cumulativeBorrowInterest = 0;
  let isLiquidated = false;
  let tLiq: number | null = null;
  let residualSpotEquityAtLiq = 0;
  let liqSpotPrice = 0;
  let liqDepeg = 0;

  const rampDays = 5;
  const halfLifeDays = scenario.halfLifeDays ?? 7;
  const lambda = Math.LN2 / halfLifeDays;
  const peakFunding = scenario.fundingAPR;
  const peakDepeg = scenario.depegPct;
  const priceMove = scenario.priceMove;

  const histSeries = scenario.isHistorical
    ? CRISIS_HISTORICAL_SERIES[scenarioKey as keyof typeof CRISIS_HISTORICAL_SERIES]
    : null;

  for (let d = 1; d <= horizonDays; d++) {
    let priceShockPct: number;
    let fundingAPR: number;
    let depegPct: number;
    let dateStr: string | undefined;

    if (scenario.isHistorical && histSeries && histSeries[d - 1]) {
      const histDay = histSeries[d - 1];
      priceShockPct = histDay.priceShockPct;
      fundingAPR = histDay.fundingAPR;
      depegPct = histDay.depegPct;
      dateStr = histDay.dateStr;
    } else {
      priceShockPct = priceMove * Math.min(1, d / rampDays);
      fundingAPR = baseFundingAPR + (peakFunding - baseFundingAPR) * Math.exp(-lambda * d);
      depegPct = peakDepeg * Math.exp(-lambda * d);
      dateStr = `Day ${d}`;
    }

    const r = priceShockPct / 100;
    const depeg = Math.max(0, Math.min(1, depegPct / 100));
    const spotPrice = parseFloat((baseSpotPrice * (1 + r)).toFixed(2));

    // Staking accrues daily on spot collateral
    const dailyStaking = S0 * (stakingAPY / 100) * (1 / 365);
    cumulativeStaking += dailyStaking;

    // Daily funding accrual only if not previously liquidated
    if (!isLiquidated) {
      const dailyFunding = N0 * (fundingAPR / 100) * (1 / 365);
      cumulativeFunding += dailyFunding;
    }

    // Daily borrow interest drag on USD debt
    if (D > 0) {
      const stepBorrowAPR = state.borrowAPR ?? calculateDynamicBorrowAPR(fundingAPR, priceShockPct);
      const dailyBorrowInterest = D * (stepBorrowAPR / 100) * (1 / 365);
      cumulativeBorrowInterest += dailyBorrowInterest;
    }

    // Spot position valuation and de-peg discount
    const spotVal = S0 * (1 + r) * (1 - depeg);

    // Maintenance margin and margin equity check
    let maintenanceMargin: number;
    let marginEquity: number;
    let stepRLiq: number;

    if (mode === 'unified') {
      maintenanceMargin = N0 * (1 + r) * mmr;
      marginEquity = spotVal * V - D - N0 * r;

      if (L === 1.0 && V >= 0.999 && depeg === 0) {
        stepRLiq = Infinity;
      } else {
        const debtTerm = (L - 1) / L;
        const num = ((1 - depeg) * V) - debtTerm - mmr;
        const den = 1 + mmr - ((1 - depeg) * V);
        stepRLiq = den <= 0 ? Infinity : (num / den);
      }
    } else {
      maintenanceMargin = N0 * (1 + r) * mmr;
      marginEquity = M0 - N0 * r;
      stepRLiq = ((M0 / N0) - mmr) / (1 + mmr);
    }

    // Check liquidation breach
    if (!isLiquidated) {
      if (marginEquity < maintenanceMargin || (stepRLiq !== Infinity && r >= stepRLiq)) {
        isLiquidated = true;
        tLiq = d;
        liqSpotPrice = spotPrice;
        liqDepeg = depeg;
        if (mode === 'unified') {
          residualSpotEquityAtLiq = Math.max(0, spotVal - (N0 * r + D));
        }
      }
    }

    // Daily equity and margin ratio calculation
    let stepEquity: number;
    let marginRatio: number;

    if (isLiquidated) {
      if (mode === 'unified') {
        const priceRatio = (liqSpotPrice > 0)
          ? (spotPrice * (1 - depeg)) / (liqSpotPrice * (1 - liqDepeg))
          : 1.0;
        const residualSpot = residualSpotEquityAtLiq * priceRatio;
        stepEquity = residualSpot + cumulativeFunding + cumulativeStaking - cumulativeBorrowInterest;
      } else {
        stepEquity = spotVal + cumulativeFunding + cumulativeStaking;
      }
      marginRatio = 1.0;
    } else {
      if (mode === 'unified') {
        const perpPnL = -N0 * r;
        stepEquity = (spotVal - D) + perpPnL + cumulativeFunding + cumulativeStaking - cumulativeBorrowInterest;
      } else {
        const perpMarginVal = Math.max(0, M0 - N0 * r);
        stepEquity = spotVal + perpMarginVal + cumulativeFunding + cumulativeStaking;
      }
      marginRatio = marginEquity > 0 ? (maintenanceMargin / marginEquity) : 1.0;
    }

    dailyTrajectory.push({
      day: d,
      dateStr,
      priceShockPct: parseFloat(priceShockPct.toFixed(2)),
      spotPrice,
      fundingAPR: parseFloat(fundingAPR.toFixed(2)),
      depegPct: parseFloat(depegPct.toFixed(2)),
      equity: parseFloat(stepEquity.toFixed(2)),
      marginRatio: parseFloat(marginRatio.toFixed(4)),
      isLiquidated,
      fundingAccrued: parseFloat(cumulativeFunding.toFixed(2)),
      stakingAccrued: parseFloat(cumulativeStaking.toFixed(2))
    });
  }

  const lastStep = dailyTrajectory[dailyTrajectory.length - 1];
  const terminalR = lastStep.priceShockPct / 100;
  const terminalDepeg = lastStep.depegPct / 100;
  const terminalSpotVal = S0 * (1 + terminalR) * (1 - terminalDepeg);
  const depegLoss = parseFloat((S0 * (1 + terminalR) * terminalDepeg).toFixed(2));
  const spotPnL = parseFloat((terminalSpotVal - S0).toFixed(2));

  let perpPnL: number;
  if (!isLiquidated) {
    perpPnL = parseFloat((-N0 * terminalR).toFixed(2));
  } else {
    perpPnL = mode === 'isolated' ? -M0 : -parseFloat((S0 * V).toFixed(2));
  }

  const terminalEquity = lastStep.equity;
  const netPnL = parseFloat((terminalEquity - C).toFixed(2));
  const netRealizedAPY = C > 0 ? parseFloat(((netPnL / C) * (365 / horizonDays) * 100).toFixed(2)) : 0;

  let rLiq: number;
  if (mode === 'unified') {
    if (L === 1.0 && V >= 0.999 && terminalDepeg === 0) {
      rLiq = Infinity;
    } else {
      const debtTerm = (L - 1) / L;
      const num = ((1 - terminalDepeg) * V) - debtTerm - mmr;
      const den = 1 + mmr - ((1 - terminalDepeg) * V);
      rLiq = den <= 0 ? Infinity : (num / den);
    }
  } else {
    rLiq = ((M0 / N0) - mmr) / (1 + mmr);
  }

  const distanceToLiqPct = (rLiq === Infinity) ? Infinity : parseFloat(((rLiq - terminalR) * 100).toFixed(2));

  // Post-Resolution Parity State (0.00% Depeg)
  const resolvedDepegPct = 0.0;
  const resolvedDepegLoss = 0.0;
  let resolvedTerminalEquity: number;

  if (!isLiquidated) {
    // In delta-neutral hedge, spot delta (1+r) and perp short delta (-r) cancel out at 0% depeg
    resolvedTerminalEquity = parseFloat((C + cumulativeFunding + cumulativeStaking).toFixed(2));
  } else {
    // If liquidated at trough, position became naked spot; recovering depeg to 0 restores spot discount only
    const resolvedSpotVal = S0 * (1 + terminalR);
    const forfeitedMargin = mode === 'isolated' ? M0 : (S0 * V);
    resolvedTerminalEquity = parseFloat((resolvedSpotVal - forfeitedMargin + cumulativeFunding + cumulativeStaking).toFixed(2));
  }

  const resolvedNetPnL = parseFloat((resolvedTerminalEquity - C).toFixed(2));
  const resolvedRealizedAPY = C > 0 ? parseFloat(((resolvedNetPnL / C) * (365 / horizonDays) * 100).toFixed(2)) : 0;

  return {
    scenarioKey,
    scenarioTitle: scenario.title,
    horizonDays,
    tLiq,
    isLiquidated,
    totalHarvestedFunding: lastStep.fundingAccrued,
    totalHarvestedStaking: lastStep.stakingAccrued,
    depegLoss,
    spotPnL,
    perpPnL,
    terminalEquity,
    netPnL,
    netRealizedAPY,
    rLiq,
    distanceToLiqPct,
    dailyTrajectory,
    resolvedDepegPct,
    resolvedDepegLoss,
    resolvedTerminalEquity,
    resolvedNetPnL,
    resolvedRealizedAPY
  };
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
