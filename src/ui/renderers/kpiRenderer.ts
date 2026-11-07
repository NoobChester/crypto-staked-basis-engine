/**
 * @file kpiRenderer.ts
 * @description Renders main scenario KPI outcome cards, Net Realized APY, T-Bill spread,
 * Net Delta, Liquidation distance, Collateral Intelligence, and PnL breakdown table.
 */

import { fmtUSD, fmtPct, type HedgingState, type HedgingOutcome } from '../../math/hedging.js';
import { getInstrumentDetails, COLLATERAL_INTELLIGENCE, type CollateralPresetKey } from '../../config/presets.js';
import { FEE_TIERS, type ExecutionFeeTier } from '../../services/marketData.js';
import type { UIElements } from '../dom.js';
import { renderMarketData } from './feedRenderer.js';

export function renderCollateralIntelligence(UI: UIElements, state: HedgingState): void {
  const presetKey = (state.activePreset || 'wsteth_90') as CollateralPresetKey;
  const intel = COLLATERAL_INTELLIGENCE[presetKey];
  if (!intel) return;

  if (UI.ciRankBadge) {
    UI.ciRankBadge.textContent = intel.rank > 0 ? `#${intel.rank} RANK` : 'BENCHMARK';
  }
  if (UI.ciTitle) {
    UI.ciTitle.textContent = `${intel.protocol} (${intel.asset})`;
  }
  if (UI.ciVenue) {
    UI.ciVenue.textContent = intel.marginVenue;
  }
  if (UI.ciBuffer) {
    UI.ciBuffer.textContent = intel.bufferText;
  }
  if (UI.ciRealApy) {
    UI.ciRealApy.textContent = intel.realApyText;
  }
  if (UI.ciWhy) {
    UI.ciWhy.textContent = intel.whyWorthUsing;
  }
  if (UI.ciBeats) {
    UI.ciBeats.textContent = intel.beatsAlternative;
  }
  if (UI.ciVerdict) {
    UI.ciVerdict.textContent = intel.verdict;
  }
}

export function renderUI(UI: UIElements, state: HedgingState, res: HedgingOutcome): void {
  if (UI.kpiNetValue) UI.kpiNetValue.textContent = fmtUSD(res.totalPortfolioVal);
  if (UI.kpiStartingCap) UI.kpiStartingCap.textContent = fmtUSD(res.C);
  if (UI.kpiRoi) {
    UI.kpiRoi.textContent = fmtPct(res.roiPct);
    UI.kpiRoi.className = `text-xs font-mono font-semibold ${res.roiPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }

  // Net Realized APY headline & duration fee drag
  if (UI.kpiNetRealizedApy) {
    UI.kpiNetRealizedApy.textContent = fmtPct(res.netRealizedAPY, false);
  }
  if (UI.kpiFeeDragBadge) {
    UI.kpiFeeDragBadge.textContent = `-${res.feeDragAPY.toFixed(2)}% fee`;
  }
  if (UI.valFeeDragAnnual) {
    UI.valFeeDragAnnual.textContent = `-${res.feeDragAPY.toFixed(2)}% APY (${state.days}d)`;
  }

  // 3-Month US Treasury Bills Benchmark comparison (+X.XX% vs T-Bills)
  if (UI.kpiTbillSpreadBadge) {
    const isSpreadPositive = res.excessSpreadAPY >= 0;
    UI.kpiTbillSpreadBadge.textContent = `${isSpreadPositive ? '+' : ''}${res.excessSpreadAPY.toFixed(2)}% vs T-Bills`;
    UI.kpiTbillSpreadBadge.title = `Alpha spread over 3-Month US Treasury Bills (${res.tbillRate.toFixed(2)}% risk-free rate)`;
    UI.kpiTbillSpreadBadge.className = isSpreadPositive
      ? 'px-1.5 py-0.5 rounded font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 text-[10px] font-mono shrink-0'
      : 'px-1.5 py-0.5 rounded font-bold text-rose-400 bg-rose-950/80 border border-rose-800 text-[10px] font-mono shrink-0';
  }

  if (UI.kpiTotalApy) UI.kpiTotalApy.textContent = fmtPct(res.totalStrategyAPY, false);
  if (UI.kpiSpotApyContrib) UI.kpiSpotApyContrib.textContent = fmtPct(res.spotAPYContrib);
  if (UI.kpiPerpApyContrib) UI.kpiPerpApyContrib.textContent = fmtPct(res.perpAPYContrib);
  if (UI.kpiApyMode) UI.kpiApyMode.textContent = state.mode === 'unified' ? 'UNIFIED 100%' : `${state.splitSpot}% SPOT`;

  if (UI.kpiLiqDistance && UI.kpiLiqStatus && UI.kpiLiqThresholdLabel) {
    if (res.rLiq === Infinity) {
      UI.kpiLiqDistance.textContent = 'IMMUNE\u00A0(∞)';
      UI.kpiLiqStatus.textContent = 'ZERO RISK';
      UI.kpiLiqStatus.className = 'shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
      UI.kpiLiqThresholdLabel.textContent = 'Mathematically impossible';
    } else if (res.isLiquidated) {
      UI.kpiLiqDistance.textContent = 'LIQUIDATED';
      UI.kpiLiqStatus.textContent = 'BREACHED';
      UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono';
      UI.kpiLiqThresholdLabel.textContent = `Breached at ${fmtPct(res.rLiq * 100)}`;
    } else {
      UI.kpiLiqDistance.textContent = fmtPct(res.distanceToLiqPct);
      UI.kpiLiqThresholdLabel.textContent = fmtPct(res.rLiq * 100);
      if (res.distanceToLiqPct < 20) {
        UI.kpiLiqStatus.textContent = 'DANGER';
        UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono animate-subtle';
      } else if (res.distanceToLiqPct < 60) {
        UI.kpiLiqStatus.textContent = 'WARNING';
        UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono';
      } else {
        UI.kpiLiqStatus.textContent = 'SAFE';
        UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
      }
    }
  }

  const totalCash = res.fundingYieldTotal + res.stakingYieldTotal;
  if (UI.kpiAccruedYield) {
    UI.kpiAccruedYield.textContent = (totalCash >= 0 ? '+' : '') + fmtUSD(totalCash);
    UI.kpiAccruedYield.className = `text-2xl font-bold font-mono ${totalCash >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.kpiFundingCash) UI.kpiFundingCash.textContent = fmtUSD(res.fundingYieldTotal);
  if (UI.kpiStakingCash) UI.kpiStakingCash.textContent = fmtUSD(res.stakingYieldTotal);
  if (UI.kpiHorizonTag) UI.kpiHorizonTag.textContent = `${state.days}d`;

  if (UI.kpiDelta && UI.kpiDeltaTag) {
    UI.kpiDelta.textContent = fmtUSD(res.netDelta);
    if (res.isLiquidated) {
      UI.kpiDelta.className = 'text-2xl font-bold font-mono text-rose-400';
      UI.kpiDeltaTag.textContent = '100% NAKED LONG';
      UI.kpiDeltaTag.className = 'text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono animate-subtle';
    } else {
      UI.kpiDelta.className = 'text-2xl font-bold font-mono text-cyan-400';
      UI.kpiDeltaTag.textContent = 'NEUTRAL (Δ=0)';
      UI.kpiDeltaTag.className = 'text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
    }
  }

  if (UI.liqBanner && UI.alertLiqTrigger) {
    if (res.isLiquidated) {
      UI.liqBanner.classList.remove('hidden');
      UI.alertLiqTrigger.textContent = fmtPct(res.rLiq * 100);
    } else {
      UI.liqBanner.classList.add('hidden');
    }
  }

  // PnL Balance Sheet Breakdown
  if (UI.breakdownSpotVal) UI.breakdownSpotVal.textContent = fmtUSD(res.spotVal);
  if (UI.breakdownSpotPnl) UI.breakdownSpotPnl.textContent = `PnL: ${res.spotPnL >= 0 ? '+' : ''}${fmtUSD(res.spotPnL)}`;

  if (UI.labelShortCollat && UI.breakdownShortVal && UI.breakdownShortPnl) {
    if (state.mode === 'unified') {
      UI.labelShortCollat.textContent = 'Short Perp Equity / Loss';
    } else {
      UI.labelShortCollat.textContent = 'Short Perp Margin & PnL';
    }
    UI.breakdownShortVal.textContent = fmtUSD(res.perpMarginVal);
    UI.breakdownShortPnl.textContent = `PnL: ${res.perpPnL >= 0 ? '+' : ''}${fmtUSD(res.perpPnL)}`;
  }

  if (UI.breakdownFunding) UI.breakdownFunding.textContent = (res.fundingYieldTotal >= 0 ? '+' : '') + fmtUSD(res.fundingYieldTotal);
  if (UI.breakdownFundingRate) UI.breakdownFundingRate.textContent = `Rate: ${fmtPct(state.fundingAPR)} APR`;
  if (UI.breakdownStaking) UI.breakdownStaking.textContent = `+${fmtUSD(res.stakingYieldTotal)}`;
  if (UI.breakdownStakingRate) UI.breakdownStakingRate.textContent = `Rate: ${state.stakingAPY.toFixed(1)}% APY`;
  if (UI.breakdownDepeg) UI.breakdownDepeg.textContent = `-${fmtUSD(res.depegLoss)}`;
  if (UI.breakdownDepegPct) UI.breakdownDepegPct.textContent = `Discount: ${state.depegPct.toFixed(1)}%`;

  // Net Returns & Fee Accounting
  if (UI.breakdownFeeLoss) {
    UI.breakdownFeeLoss.textContent = `-${fmtUSD(res.netFeeDollarLoss)}`;
  }
  if (UI.breakdownNetRealizedPnl) {
    UI.breakdownNetRealizedPnl.textContent = (res.netRealizedPnL >= 0 ? '+' : '') + fmtUSD(res.netRealizedPnL);
    UI.breakdownNetRealizedPnl.className = `text-sm font-bold font-mono mt-0.5 ${res.netRealizedPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.breakdownNetRealizedRoi) {
    UI.breakdownNetRealizedRoi.textContent = `Net ROI: ${fmtPct(res.netRealizedRoiPct)}`;
    UI.breakdownNetRealizedRoi.className = `text-[10px] font-mono mt-0.5 ${res.netRealizedRoiPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`;
  }
  if (UI.breakdownExcessDollarCarry) {
    const isExcessPos = res.excessDollarCarry >= 0;
    UI.breakdownExcessDollarCarry.textContent = (isExcessPos ? '+' : '') + fmtUSD(res.excessDollarCarry);
    UI.breakdownExcessDollarCarry.className = `text-sm font-bold font-mono mt-0.5 ${isExcessPos ? 'text-indigo-300' : 'text-rose-400'}`;
  }

  if (UI.breakdownNetPnl) {
    UI.breakdownNetPnl.textContent = (res.netPnL >= 0 ? '+' : '') + fmtUSD(res.netPnL);
    UI.breakdownNetPnl.className = `text-sm font-bold font-mono mt-0.5 ${res.netPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.breakdownNetRoi) {
    UI.breakdownNetRoi.textContent = `Gross ROI: ${fmtPct(res.roiPct)}`;
    UI.breakdownNetRoi.className = `text-[10px] font-mono mt-0.5 ${res.roiPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`;
  }

  // Fee Tier Switcher Highlight
  const activeFeeTier = (state.feeTier || 'vip') as ExecutionFeeTier;
  const tierBtns = {
    vip: UI.feeTierBtnVip,
    retail: UI.feeTierBtnRetail,
    mm: UI.feeTierBtnMm
  };
  (Object.keys(tierBtns) as ExecutionFeeTier[]).forEach(t => {
    const btn = tierBtns[t];
    if (btn) {
      btn.className = t === activeFeeTier
        ? 'py-1 px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold transition text-center truncate cursor-pointer shadow-sm'
        : 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate cursor-pointer';
    }
  });
  if (UI.labelActiveFeeTier) {
    const info = FEE_TIERS[activeFeeTier] || FEE_TIERS.vip;
    UI.labelActiveFeeTier.textContent = info.label;
  }

  if (UI.stateBadge) {
    if (res.isLiquidated) {
      UI.stateBadge.textContent = 'UNHEDGED SPOT LONG';
      UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono';
    } else if (state.mode === 'unified') {
      if (state.leverage && state.leverage > 1.0) {
        UI.stateBadge.textContent = `LEVERAGED BASIS (${state.leverage.toFixed(1)}x)`;
        UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800 font-bold font-mono';
      } else {
        UI.stateBadge.textContent = 'CROSS-COLLATERALIZED HEDGE';
        UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold font-mono';
      }
    } else {
      UI.stateBadge.textContent = 'ISOLATED DELTA NEUTRAL';
      UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold font-mono';
    }
  }

  const inst = getInstrumentDetails(state);
  if (UI.instPairBadge) UI.instPairBadge.textContent = inst.pairBadge;
  if (UI.chartInstrumentsBadge) UI.chartInstrumentsBadge.textContent = 'PAIR: ' + inst.pairBadge;
  if (UI.instSpotSymbol) UI.instSpotSymbol.textContent = inst.spotSymbol;
  if (UI.instSpotDesc) UI.instSpotDesc.textContent = inst.spotName;
  if (UI.instSpotTag) UI.instSpotTag.textContent = inst.spotTag;
  if (UI.instSpotYield) UI.instSpotYield.textContent = (state.stakingAPY > 0 ? `+${state.stakingAPY.toFixed(1)}% APY` : '0.0% APY');
  if (UI.instSpotAmount) UI.instSpotAmount.textContent = fmtUSD(res.S0) + (state.mode === 'isolated' ? ` (${state.splitSpot}%)` : ' (100%)');

  if (UI.instPerpSymbol) UI.instPerpSymbol.textContent = inst.perpSymbol;
  if (UI.instPerpDesc) UI.instPerpDesc.textContent = inst.perpName;
  if (UI.instPerpTag) UI.instPerpTag.textContent = inst.perpTag;
  if (UI.instPerpRate) {
    UI.instPerpRate.textContent = `${fmtPct(state.fundingAPR)} APR`;
    UI.instPerpRate.className = `text-[11px] font-bold ${state.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.instPerpAmount) UI.instPerpAmount.textContent = '-' + fmtUSD(res.N0) + (state.mode === 'isolated' ? ` (-${state.splitSpot}%)` : ' (-1.00x)');

  if (UI.instMarginDesc) {
    if (state.mode === 'isolated') {
      UI.instMarginDesc.textContent = `USDC Cash Margin (${fmtUSD(res.M0)} in Isolated Derivatives Account)`;
    } else {
      UI.instMarginDesc.textContent = inst.marginDesc;
    }
  }

  const activeAsset = state.tradedAsset || 'ETH';
  ['assetBtnEth', 'assetBtnBtc', 'assetBtnSol'].forEach(btnKey => {
    const btn = UI[btnKey];
    if (!btn) return;
    const assetName = btnKey.replace('assetBtn', '').toUpperCase();
    if (assetName === activeAsset) {
      btn.className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
    } else {
      btn.className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
    }
  });

  if (UI.labelSpotCollat) {
    UI.labelSpotCollat.innerHTML = `Spot Long (${inst.spotSymbol}) <span class="text-[9px] px-1 rounded bg-slate-800 text-cyan-300 font-semibold">SPOT</span>`;
  }
  if (UI.labelShortCollat) {
    if (state.mode === 'unified') {
      UI.labelShortCollat.innerHTML = `Short Perp (${inst.perpSymbol}) <span class="text-[9px] px-1 rounded bg-slate-800 text-rose-300 font-semibold">DERIVATIVE</span>`;
    } else {
      UI.labelShortCollat.innerHTML = `Short Perp & USDC Margin <span class="text-[9px] px-1 rounded bg-slate-800 text-rose-300 font-semibold">ISOLATED</span>`;
    }
  }

  if (UI.kpiDeltaSub) {
    UI.kpiDeltaSub.textContent = `Long ${inst.spotSymbol} Δ minus Short ${inst.perpSymbol} Δ`;
  }

  if (UI.boxIsolatedBtcLst) {
    if (state.mode === 'isolated' && state.tradedAsset === 'BTC') {
      UI.boxIsolatedBtcLst.classList.remove('hidden');
    } else {
      UI.boxIsolatedBtcLst.classList.add('hidden');
    }
  }

  if (UI.labelBtcLstMode) {
    const v = state.btcVariant || 'lbtc';
    if (v === 'lbtc') {
      UI.labelBtcLstMode.textContent = 'LBTC (Babylon LST, +3.2%)';
      if (UI.btnBtcLbtc) UI.btnBtcLbtc.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
      if (UI.btnBtcSolvbtc) UI.btnBtcSolvbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
      if (UI.btnBtcNative) UI.btnBtcNative.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
    } else if (v === 'solvbtc') {
      UI.labelBtcLstMode.textContent = 'SolvBTC.BBN (Babylon LST, +3.5%)';
      if (UI.btnBtcSolvbtc) UI.btnBtcSolvbtc.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
      if (UI.btnBtcLbtc) UI.btnBtcLbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
      if (UI.btnBtcNative) UI.btnBtcNative.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
    } else {
      UI.labelBtcLstMode.textContent = 'Native BTC (Pure Spot, 0%)';
      if (UI.btnBtcNative) UI.btnBtcNative.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
      if (UI.btnBtcLbtc) UI.btnBtcLbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
      if (UI.btnBtcSolvbtc) UI.btnBtcSolvbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
    }
  }

  ['isoBtnEth', 'isoBtnBtc', 'isoBtnSol'].forEach(btnKey => {
    const btn = UI[btnKey];
    if (!btn) return;
    const a = btnKey.replace('isoBtn', '').toUpperCase();
    if (a === state.tradedAsset) {
      btn.className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
    } else {
      btn.className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
    }
  });

  if (UI.instCollateralNoteText && inst.note) {
    UI.instCollateralNoteText.textContent = inst.note;
  }

  // Render Unified Leveraged Carry Spread Controls
  if (UI.panelUnifiedLeverage) {
    if (state.mode === 'unified') {
      UI.panelUnifiedLeverage.classList.remove('hidden');
    } else {
      UI.panelUnifiedLeverage.classList.add('hidden');
    }
  }

  const lev = state.leverage ?? 1.0;
  if (UI.valLeverage) {
    UI.valLeverage.textContent = `${lev.toFixed(1)}x ${lev > 1.0 ? 'Leveraged' : '(Unlevered)'}`;
  }
  if (UI.inputLeverage && (typeof document === 'undefined' || document.activeElement !== UI.inputLeverage)) {
    UI.inputLeverage.value = lev.toFixed(1);
  }
  if (UI.valLeveragedNotional) {
    UI.valLeveragedNotional.textContent = fmtUSD(res.S0);
  }
  if (UI.valBorrowDebt) {
    UI.valBorrowDebt.textContent = fmtUSD(res.borrowDebt);
  }
  if (UI.valBorrowDragAnnual) {
    UI.valBorrowDragAnnual.textContent = `-${res.borrowAPYDrag.toFixed(2)}% APY`;
    UI.valBorrowDragAnnual.className = `font-bold ${res.borrowAPYDrag > 0 ? 'text-rose-400' : 'text-slate-400'}`;
  }
  if (UI.sliderBorrowApr && (typeof document === 'undefined' || document.activeElement !== UI.sliderBorrowApr)) {
    UI.sliderBorrowApr.value = res.borrowAPR.toFixed(1);
  }
  if (UI.inputBorrowApr && (typeof document === 'undefined' || document.activeElement !== UI.inputBorrowApr)) {
    UI.inputBorrowApr.value = res.borrowAPR.toFixed(1);
  }
  if (UI.badgeBorrowMode) {
    UI.badgeBorrowMode.textContent = state.isCustomBorrowAPR ? 'MANUAL OVERRIDE' : 'AUTO-KINK';
    UI.badgeBorrowMode.className = state.isCustomBorrowAPR
      ? 'text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold'
      : 'text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono font-bold';
  }
  if (UI.btnToggleBorrowAuto) {
    UI.btnToggleBorrowAuto.textContent = state.isCustomBorrowAPR ? 'Switch to Auto-Kink' : 'Market-Linked';
  }
  if (UI.borrowRateExplainer) {
    if (state.isCustomBorrowAPR) {
      UI.borrowRateExplainer.textContent = `Manual Override: Fixed USD borrow rate locked at ${res.borrowAPR.toFixed(1)}% APR.`;
    } else {
      UI.borrowRateExplainer.textContent = `Dynamic Kink Curve: Base 6.5% APR + Contango surge during market rallies (${res.borrowAPR.toFixed(1)}% APR active).`;
    }
  }

  // Quick leverage button active styles
  const quickLevBtns = [
    { btn: UI.btnLev10, val: 1.0 },
    { btn: UI.btnLev15, val: 1.5 },
    { btn: UI.btnLev20, val: 2.0 },
    { btn: UI.btnLev30, val: 3.0 }
  ];
  quickLevBtns.forEach(({ btn, val }) => {
    if (!btn) return;
    if (Math.abs(lev - val) < 0.05) {
      btn.className = 'w-full py-1 text-[11px] font-mono rounded bg-purple-950 text-purple-300 border border-purple-700 font-bold transition';
    } else {
      btn.className = 'w-full py-1 text-[11px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition';
    }
  });

  // Balance Sheet Borrow Breakdown
  if (UI.boxBreakdownBorrow) {
    if (lev > 1.0) {
      UI.boxBreakdownBorrow.classList.remove('hidden');
      if (UI.breakdownBorrowRate) UI.breakdownBorrowRate.textContent = `${res.borrowAPR.toFixed(1)}% APR`;
      if (UI.breakdownBorrowInterest) UI.breakdownBorrowInterest.textContent = `-${fmtUSD(res.borrowInterestTotal)}`;
      if (UI.breakdownBorrowDebt) UI.breakdownBorrowDebt.textContent = `Debt: ${fmtUSD(res.borrowDebt)} (${lev.toFixed(1)}x)`;
    } else {
      UI.boxBreakdownBorrow.classList.add('hidden');
    }
  }

  // Render Collateral Intelligence Card
  renderCollateralIntelligence(UI, state);

  // Render Live Market Ticker Ribbon
  renderMarketData(UI, state);
}
