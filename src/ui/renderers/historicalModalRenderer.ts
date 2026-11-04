/**
 * @file historicalModalRenderer.ts
 * @description Renders historical analytics modal dialog stats cards, divergence metrics, and canvas tooltips.
 */

import { fmtPct } from '../../math/hedging.js';
import type {
  AssetHistoricalAnalytics,
  FundingVenue,
  HistoricalRatePoint
} from '../../services/marketData.js';
import type { UIElements } from '../dom.js';

export function renderHistoricalModal(
  UI: UIElements,
  analytics: AssetHistoricalAnalytics,
  _activeVenue: FundingVenue
): void {
  if (UI.histModalSymbolBadge) {
    UI.histModalSymbolBadge.textContent = analytics.symbol;
  }
  if (UI.histFooterAssetLabel) {
    UI.histFooterAssetLabel.textContent = analytics.symbol;
  }

  // Update Asset Selector Button Highlights
  const assetBtns = {
    ETH: UI.histBtnAssetEth,
    BTC: UI.histBtnAssetBtc,
    SOL: UI.histBtnAssetSol
  };
  (['ETH', 'BTC', 'SOL'] as const).forEach(sym => {
    const btn = assetBtns[sym];
    if (btn) {
      btn.className = sym === analytics.symbol
        ? 'px-2.5 py-1 rounded-md font-bold bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm transition cursor-pointer'
        : 'px-2.5 py-1 rounded-md text-slate-400 hover:text-white transition cursor-pointer';
    }
  });
  if (UI.histStatBinanceAvg) {
    UI.histStatBinanceAvg.textContent = fmtPct(analytics.binanceAvg);
  }
  if (UI.histStatBinanceSub) {
    UI.histStatBinanceSub.textContent = `${analytics.rangeDays}d avg (8h)`;
  }
  if (UI.histStatHlAvg) {
    UI.histStatHlAvg.textContent = fmtPct(analytics.hyperliquidAvg);
  }
  if (UI.histStatHlSub) {
    UI.histStatHlSub.textContent = `${analytics.rangeDays}d avg (1h)`;
  }
  if (UI.histStatConsensusAvg && analytics.consensusAvg !== undefined) {
    UI.histStatConsensusAvg.textContent = fmtPct(analytics.consensusAvg);
  }
  if (UI.histStatConsensusSub) {
    UI.histStatConsensusSub.textContent = `${analytics.rangeDays}d blend`;
  }
  if (UI.histStatDivergence && analytics.fundingDivergence !== undefined) {
    UI.histStatDivergence.textContent = `${analytics.fundingDivergence.toFixed(2)}%`;
  }
  if (UI.histStatDivergenceSub) {
    UI.histStatDivergenceSub.textContent = '|Binance - HL|';
  }
  if (UI.histStatStakingAvg) {
    UI.histStatStakingAvg.textContent = `${analytics.stakingAvg.toFixed(2)}% APY`;
  }
  if (UI.histStatStakingSub) {
    UI.histStatStakingSub.textContent = `${analytics.rangeDays}d protocol avg`;
  }
  if (UI.histStatNetcarryAvg) {
    UI.histStatNetcarryAvg.textContent = fmtPct(analytics.netCarryAvg) + ' APY';
  }
  if (UI.histStatNetcarrySub) {
    const higherVenue = analytics.binanceAvg >= analytics.hyperliquidAvg ? 'Binance' : 'Hyperliquid';
    UI.histStatNetcarrySub.textContent = `${analytics.rangeDays}d max (${higherVenue}) + Stake`;
  }

  // Regime frequency stats
  if (UI.histStatNegIntervals) {
    const negPct = analytics.funding90d?.negativeIntervalPct ?? 0;
    const isZero = negPct === 0;
    UI.histStatNegIntervals.innerHTML = `Negative intervals: <strong class="${isZero ? 'text-emerald-400' : 'text-amber-400'}">${negPct.toFixed(1)}%</strong> across selected timeframe. ${isZero ? 'Carry remained structurally accretive.' : 'Brief inverse discount periods observed.'}`;
  }

  // Volatility stats
  if (UI.histStatVol) {
    const stdDev = analytics.funding90d?.stdDev ?? 0;
    const maxRate = analytics.funding90d?.max ?? 0;
    UI.histStatVol.innerHTML = `Standard deviation: <strong class="text-indigo-300">&sigma; = ${stdDev.toFixed(2)}%</strong>. Peak observed rate reached <strong>${fmtPct(maxRate)}</strong>.`;
  }

  // Sub-chart status
  if (UI.histSubchartStats && analytics.lstDiscountAvg !== undefined) {
    if (analytics.symbol === 'BTC') {
      UI.histSubchartStats.textContent = 'Vanilla Spot Collateral (0% De-peg)';
    } else {
      UI.histSubchartStats.textContent = `Avg: ${analytics.lstDiscountAvg.toFixed(2)}% | Max Shock: ${analytics.lstDiscountMax.toFixed(2)}%`;
    }
  }

  if (UI.histSubchartEmpty) {
    if (analytics.symbol === 'BTC') {
      UI.histSubchartEmpty.classList.remove('hidden');
    } else {
      UI.histSubchartEmpty.classList.add('hidden');
    }
  }
}

export function updateHistoricalTooltip(
  UI: UIElements,
  point: HistoricalRatePoint | null,
  mouseX: number,
  mouseY: number
): void {
  if (!UI.historicalTooltip) return;

  if (!point) {
    UI.historicalTooltip.classList.add('hidden');
    return;
  }

  UI.historicalTooltip.classList.remove('hidden');
  const parentW = UI.historicalCanvas?.parentElement?.clientWidth || 700;
  UI.historicalTooltip.style.left = `${Math.min(mouseX + 15, parentW - 200)}px`;
  UI.historicalTooltip.style.top = `${Math.max(mouseY - 80, 10)}px`;

  if (UI.histTtDate) UI.histTtDate.textContent = `Date: ${point.date}`;
  if (UI.histTtBinance) UI.histTtBinance.textContent = fmtPct(point.binanceApr);
  if (UI.histTtHl) UI.histTtHl.textContent = fmtPct(point.hyperliquidApr);
  if (UI.histTtStaking) UI.histTtStaking.textContent = `${point.stakingApy.toFixed(2)}% APY`;
  if (UI.histTtNetcarry) UI.histTtNetcarry.textContent = fmtPct(point.netCarryApy);
  if (UI.histTtDivergence) {
    const div = Math.abs(point.binanceApr - point.hyperliquidApr);
    UI.histTtDivergence.textContent = `${div.toFixed(2)}%`;
  }
  if (UI.histTtDepeg && point.lstDiscountPct !== undefined) {
    UI.histTtDepeg.textContent = `${point.lstDiscountPct.toFixed(2)}%`;
  }
}
