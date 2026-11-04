/**
 * @file hedging.js
 * @description Pure quantitative calculation engine for delta-neutral hedging,
 * cross-margin liquidation thresholds, isolated cash margin buffers, and yield accrual.
 */

/**
 * @typedef {Object} HedgingState
 * @property {number} capital Starting portfolio equity in USD
 * @property {'unified' | 'isolated'} mode Margin architecture mode
 * @property {number} priceMove Underlying spot price move in percentage (-100 to +100+)
 * @property {number} days Duration horizon in days
 * @property {number} fundingAPR Perpetual short funding rate in APR %
 * @property {number} stakingAPY Spot asset staking yield in APY %
 * @property {number} depegPct LST depeg discount in %
 * @property {number} mmr Maintenance margin requirement (default 0.005 = 0.5%)
 * @property {number} collateralRatio Collateral haircut valuation (e.g., 0.90 for 10% haircut)
 * @property {number} splitSpot Percentage allocated to spot in isolated mode (e.g., 50 for 50/50 split)
 */

/**
 * @typedef {Object} HedgingOutcome
 * @property {number} C Starting capital
 * @property {number} S0 Initial spot notional
 * @property {number} M0 Initial margin notional
 * @property {number} N0 Short perpetual notional size
 * @property {number} rLiq Mathematical liquidation price surge threshold (decimal)
 * @property {boolean} isLiquidated Whether current price shock breaches liquidation
 * @property {number} spotVal Ending spot asset dollar value
 * @property {number} spotPnL Unrealized PnL on spot
 * @property {number} perpMarginVal Ending margin equity on perpetual
 * @property {number} perpPnL Unrealized PnL on perpetual short
 * @property {number} fundingYieldTotal Cash earned from short funding payments
 * @property {number} stakingYieldTotal Cash earned from spot staking rewards
 * @property {number} depegLoss Dollar loss attributed to LST depeg
 * @property {number} totalPortfolioVal Final net strategy value
 * @property {number} netPnL Strategy net dollar gain or loss
 * @property {number} roiPct Net strategy ROI %
 * @property {number} netDelta Residual portfolio delta exposure in USD
 * @property {number} spotAPYContrib Spot APY contribution weighted by capital allocation
 * @property {number} perpAPYContrib Perp funding APY contribution weighted by capital allocation
 * @property {number} totalStrategyAPY Combined net annualized strategy APY %
 * @property {number} distanceToLiqPct Distance remaining to liquidation price in percentage points
 */

/**
 * Calculates the exact quantitative outcome of the delta-neutral hedging position.
 * @param {number} priceChangePct Price move in percentage (-100 to +100+)
 * @param {Partial<HedgingState>} customState Custom or current state overrides
 * @returns {HedgingOutcome}
 */
export function calculateOutcome(priceChangePct, customState = {}) {
  const C = Math.max(0, customState.capital ?? 10000);
  const r = priceChangePct / 100;
  const depeg = Math.max(0, Math.min(1, (customState.depegPct ?? 0) / 100));
  const durationYears = Math.max(0, (customState.days ?? 90) / 365);
  const mmr = customState.mmr ?? 0.005;
  const mode = customState.mode ?? 'unified';
  const fundingAPR = customState.fundingAPR ?? 10.0;
  const stakingAPY = customState.stakingAPY ?? 3.2;

  let S0, M0, N0, rLiq, isLiquidated;
  let spotVal = 0, spotPnL = 0;
  let perpMarginVal = 0, perpPnL = 0;
  let totalPortfolioVal = 0;
  let netDelta = 0;
  let depegLoss = 0;

  if (mode === 'unified') {
    // UNIFIED MARGIN MODE:
    // 100% of capital deployed in spot. Spot acts as cross-margin for 1x short perp.
    S0 = C;
    N0 = C; // 1x delta-neutral short size
    M0 = C; // Notional margin base is spot itself
    const V = customState.collateralRatio ?? 0.90; // e.g. 0.90 (10% haircut)

    // Exact Unified Account liquidation threshold:
    // S0*(1+r)*(1-depeg)*V - N0*r = N0*(1+r)*MMR
    // Solving for r:
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
      // Liquidated in unified account (extreme price rally)
      spotVal = S0 * (1 + r) * (1 - depeg);
      spotPnL = spotVal - S0;
      depegLoss = S0 * (1 + r) * depeg;
      perpPnL = -S0 * V; // entire recognized collateral consumed
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

    return {
      C, S0, M0, N0, rLiq, isLiquidated,
      spotVal, spotPnL, perpMarginVal, perpPnL,
      fundingYieldTotal, stakingYieldTotal, depegLoss,
      totalPortfolioVal, netPnL, roiPct, netDelta,
      spotAPYContrib, perpAPYContrib, totalStrategyAPY,
      distanceToLiqPct
    };

  } else {
    // ISOLATED MARGIN MODE:
    const splitSpot = customState.splitSpot ?? 50;
    const sFrac = Math.max(0.01, Math.min(0.99, splitSpot / 100));
    const mFrac = 1 - sFrac;
    S0 = C * sFrac;
    M0 = C * mFrac;
    N0 = S0; // Delta-neutral short matches spot notional

    // Isolated short liquidation threshold:
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
      // Liquidated in isolated mode
      spotVal = S0 * (1 + r) * (1 - depeg);
      depegLoss = S0 * (1 + r) * depeg;
      spotPnL = spotVal - S0;
      perpMarginVal = 0;
      perpPnL = -M0; // 100% of cash margin forfeited
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

    return {
      C, S0, M0, N0, rLiq, isLiquidated,
      spotVal, spotPnL, perpMarginVal, perpPnL,
      fundingYieldTotal, stakingYieldTotal, depegLoss,
      totalPortfolioVal, netPnL, roiPct, netDelta,
      spotAPYContrib, perpAPYContrib, totalStrategyAPY,
      distanceToLiqPct
    };
  }
}

/**
 * Format currency with commas and 2 decimals.
 * @param {number} val
 * @returns {string}
 */
export function fmtUSD(val) {
  if (isNaN(val)) return '$0.00';
  const absVal = Math.abs(val);
  const str = absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (val < 0 ? '-' : '') + '$' + str;
}

/**
 * Format percentage with optional plus sign and infinite handling.
 * @param {number} val
 * @param {boolean} [plus=true]
 * @returns {string}
 */
export function fmtPct(val, plus = true) {
  if (val === Infinity) return 'INFINITE\u00A0(∞)';
  if (isNaN(val)) return '0.00%';
  const sign = (plus && val > 0) ? '+' : '';
  return sign + val.toFixed(2) + '%';
}

