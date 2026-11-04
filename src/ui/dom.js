/**
 * @file dom.js
 * @description DOM element caching, UI event listeners, and reactive component renderers.
 */

import { fmtUSD, fmtPct } from '../math/hedging.js';
import { getInstrumentDetails } from '../config/presets.js';

/**
 * Maps all interactive DOM elements in the document.
 * @returns {object}
 */
export function getUIElements() {
  return {
    modeUnifiedBtn: document.getElementById('mode-btn-unified'),
    modeIsolatedBtn: document.getElementById('mode-btn-isolated'),
    panelUnifiedPresets: document.getElementById('panel-unified-presets'),
    panelIsolatedSplit: document.getElementById('panel-isolated-split'),
    valCollateralRatio: document.getElementById('val-collateral-ratio'),
    collateralRatioExplainer: document.getElementById('collateral-ratio-explainer'),
    jitosolToggleBox: document.getElementById('jitosol-yield-toggle-box'),
    labelSolYieldMode: document.getElementById('label-sol-yield-mode'),
    btnSolNominal: document.getElementById('btn-sol-nominal'),
    btnSolReal: document.getElementById('btn-sol-real'),

    // Isolated BTC LST Controls
    boxIsolatedBtcLst: document.getElementById('box-isolated-btclst'),
    labelBtcLstMode: document.getElementById('label-btclst-mode'),
    btnBtcNative: document.getElementById('btn-btc-native'),
    btnBtcLbtc: document.getElementById('btn-btc-lbtc'),
    btnBtcSolvbtc: document.getElementById('btn-btc-solvbtc'),
    isoBtnEth: document.getElementById('iso-btn-eth'),
    isoBtnBtc: document.getElementById('iso-btn-btc'),
    isoBtnSol: document.getElementById('iso-btn-sol'),
    instCollateralNoteText: document.getElementById('inst-collateral-note-text'),

    // Sliders & Inputs
    inputPriceMove: document.getElementById('input-price-move'),
    valPriceMove: document.getElementById('val-price-move'),
    inputCapital: document.getElementById('input-capital'),
    valCapital: document.getElementById('val-capital'),
    inputDays: document.getElementById('input-days'),
    valDays: document.getElementById('val-days'),
    inputFunding: document.getElementById('input-funding'),
    valFunding: document.getElementById('val-funding'),
    inputStaking: document.getElementById('input-staking'),
    valStaking: document.getElementById('val-staking'),
    inputDepeg: document.getElementById('input-depeg'),
    valDepeg: document.getElementById('val-depeg'),
    inputSplit: document.getElementById('input-split'),
    valSplit: document.getElementById('val-split'),
    splitHelperText: document.getElementById('split-helper-text'),

    // Traded Instruments Elements
    instPairBadge: document.getElementById('inst-pair-badge'),
    chartInstrumentsBadge: document.getElementById('chart-instruments-badge'),
    assetBtnEth: document.getElementById('asset-btn-eth'),
    assetBtnBtc: document.getElementById('asset-btn-btc'),
    assetBtnSol: document.getElementById('asset-btn-sol'),
    instSpotSymbol: document.getElementById('inst-spot-symbol'),
    instSpotDesc: document.getElementById('inst-spot-desc'),
    instSpotTag: document.getElementById('inst-spot-tag'),
    instSpotYield: document.getElementById('inst-spot-yield'),
    instSpotAmount: document.getElementById('inst-spot-amount'),
    instPerpSymbol: document.getElementById('inst-perp-symbol'),
    instPerpDesc: document.getElementById('inst-perp-desc'),
    instPerpTag: document.getElementById('inst-perp-tag'),
    instPerpRate: document.getElementById('inst-perp-rate'),
    instPerpAmount: document.getElementById('inst-perp-amount'),
    instMarginDesc: document.getElementById('inst-margin-desc'),
    labelSpotCollat: document.getElementById('label-spot-collat'),
    kpiDeltaSub: document.getElementById('kpi-delta-sub'),

    // Ribbon KPIs
    kpiNetValue: document.getElementById('kpi-net-value'),
    kpiRoi: document.getElementById('kpi-roi'),
    kpiStartingCap: document.getElementById('kpi-starting-cap'),
    kpiTotalApy: document.getElementById('kpi-total-apy'),
    kpiApyMode: document.getElementById('kpi-apy-mode'),
    kpiSpotApyContrib: document.getElementById('kpi-spot-apy-contrib'),
    kpiPerpApyContrib: document.getElementById('kpi-perp-apy-contrib'),
    kpiLiqDistance: document.getElementById('kpi-liq-distance'),
    kpiLiqStatus: document.getElementById('kpi-liq-status'),
    kpiLiqThresholdLabel: document.getElementById('kpi-liq-threshold-label'),
    kpiAccruedYield: document.getElementById('kpi-accrued-yield'),
    kpiHorizonTag: document.getElementById('kpi-horizon-tag'),
    kpiFundingCash: document.getElementById('kpi-funding-cash'),
    kpiStakingCash: document.getElementById('kpi-staking-cash'),
    kpiDelta: document.getElementById('kpi-delta'),
    kpiDeltaTag: document.getElementById('kpi-delta-tag'),

    // Balance sheet decomposition
    breakdownSpotVal: document.getElementById('breakdown-spot-val'),
    breakdownSpotPnl: document.getElementById('breakdown-spot-pnl'),
    labelShortCollat: document.getElementById('label-short-collat'),
    breakdownShortVal: document.getElementById('breakdown-short-val'),
    breakdownShortPnl: document.getElementById('breakdown-short-pnl'),
    breakdownFunding: document.getElementById('breakdown-funding'),
    breakdownFundingRate: document.getElementById('breakdown-funding-rate'),
    breakdownStaking: document.getElementById('breakdown-staking'),
    breakdownStakingRate: document.getElementById('breakdown-staking-rate'),
    breakdownDepeg: document.getElementById('breakdown-depeg'),
    breakdownDepegPct: document.getElementById('breakdown-depeg-pct'),
    breakdownNetPnl: document.getElementById('breakdown-net-pnl'),
    breakdownNetRoi: document.getElementById('breakdown-net-roi'),
    stateBadge: document.getElementById('state-badge'),

    // Alert & Canvas
    liqBanner: document.getElementById('liquidation-banner'),
    alertLiqTrigger: document.getElementById('alert-liq-trigger'),
    canvas: document.getElementById('pnlCanvas'),
    chartSubCaption: document.getElementById('chart-sub-caption'),
    tooltip: document.getElementById('canvas-tooltip'),
    ttPrice: document.getElementById('tt-price'),
    ttVal: document.getElementById('tt-val'),
    ttRoi: document.getElementById('tt-roi'),
    ttStatus: document.getElementById('tt-status')
  };
}

/**
 * Updates DOM elements with the calculated outcome and state.
 * @param {object} UI
 * @param {object} state
 * @param {object} res
 */
export function renderUI(UI, state, res) {
  // Top KPIs
  if (UI.kpiNetValue) UI.kpiNetValue.textContent = fmtUSD(res.totalPortfolioVal);
  if (UI.kpiStartingCap) UI.kpiStartingCap.textContent = fmtUSD(res.C);
  if (UI.kpiRoi) {
    UI.kpiRoi.textContent = fmtPct(res.roiPct);
    UI.kpiRoi.className = `text-xs font-mono font-semibold ${res.roiPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }

  if (UI.kpiTotalApy) UI.kpiTotalApy.textContent = fmtPct(res.totalStrategyAPY, false) + ' APY';
  if (UI.kpiSpotApyContrib) UI.kpiSpotApyContrib.textContent = fmtPct(res.spotAPYContrib);
  if (UI.kpiPerpApyContrib) UI.kpiPerpApyContrib.textContent = fmtPct(res.perpAPYContrib);
  if (UI.kpiApyMode) UI.kpiApyMode.textContent = state.mode === 'unified' ? 'UNIFIED 100%' : `${state.splitSpot}% SPOT`;

  // Liquidation runway
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

  // Cash Harvest
  const totalCash = res.fundingYieldTotal + res.stakingYieldTotal;
  if (UI.kpiAccruedYield) {
    UI.kpiAccruedYield.textContent = (totalCash >= 0 ? '+' : '') + fmtUSD(totalCash);
    UI.kpiAccruedYield.className = `text-2xl font-bold font-mono ${totalCash >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.kpiFundingCash) UI.kpiFundingCash.textContent = fmtUSD(res.fundingYieldTotal);
  if (UI.kpiStakingCash) UI.kpiStakingCash.textContent = fmtUSD(res.stakingYieldTotal);
  if (UI.kpiHorizonTag) UI.kpiHorizonTag.textContent = `${state.days}d`;

  // Delta Exposure
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

  // Liquidation Alert Banner
  if (UI.liqBanner && UI.alertLiqTrigger) {
    if (res.isLiquidated) {
      UI.liqBanner.classList.remove('hidden');
      UI.alertLiqTrigger.textContent = fmtPct(res.rLiq * 100);
    } else {
      UI.liqBanner.classList.add('hidden');
    }
  }

  // Decomposition Table
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
  if (UI.breakdownNetPnl) {
    UI.breakdownNetPnl.textContent = (res.netPnL >= 0 ? '+' : '') + fmtUSD(res.netPnL);
    UI.breakdownNetPnl.className = `text-sm font-bold font-mono mt-0.5 ${res.netPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.breakdownNetRoi) {
    UI.breakdownNetRoi.textContent = `ROI: ${fmtPct(res.roiPct)}`;
    UI.breakdownNetRoi.className = `text-[10px] font-mono mt-0.5 ${res.roiPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`;
  }

  if (UI.stateBadge) {
    if (res.isLiquidated) {
      UI.stateBadge.textContent = 'UNHEDGED SPOT LONG';
      UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono';
    } else if (state.mode === 'unified') {
      UI.stateBadge.textContent = 'CROSS-COLLATERALIZED HEDGE';
      UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold font-mono';
    } else {
      UI.stateBadge.textContent = 'ISOLATED DELTA NEUTRAL';
      UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold font-mono';
    }
  }

  // Update Traded Instruments Display
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

  // Update asset selector active styles
  const activeAsset = state.tradedAsset || 'ETH';
  ['assetBtnEth', 'assetBtnBtc', 'assetBtnSol'].forEach(btnKey => {
    if (!UI[btnKey]) return;
    const assetName = btnKey.replace('assetBtn', '').toUpperCase();
    if (assetName === activeAsset) {
      UI[btnKey].className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
    } else {
      UI[btnKey].className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
    }
  });

  // Update Balance Sheet labels
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

  // Update Isolated BTC LST Box & Buttons
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

  // Sync Isolated Asset Selector Buttons
  ['isoBtnEth', 'isoBtnBtc', 'isoBtnSol'].forEach(btnKey => {
    if (!UI[btnKey]) return;
    const a = btnKey.replace('isoBtn', '').toUpperCase();
    if (a === state.tradedAsset) {
      UI[btnKey].className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
    } else {
      UI[btnKey].className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
    }
  });

  // Update Dynamic Institutional Collateral Notice
  if (UI.instCollateralNoteText && inst.note) {
    UI.instCollateralNoteText.textContent = inst.note;
  }
}

/**
 * Binds slider and input change listeners to the UI controls.
 * @param {object} UI
 * @param {object} state
 * @param {() => void} onUpdate
 */
export function bindInputListeners(UI, state, onUpdate) {
  if (UI.inputPriceMove) {
    UI.inputPriceMove.addEventListener('input', (e) => {
      state.priceMove = parseFloat(e.target.value);
      if (UI.valPriceMove) UI.valPriceMove.textContent = fmtPct(state.priceMove);
      onUpdate();
    });
  }

  if (UI.inputCapital) {
    UI.inputCapital.addEventListener('input', (e) => {
      const val = Math.max(100, parseFloat(e.target.value) || 1000);
      state.capital = val;
      if (UI.valCapital) UI.valCapital.textContent = fmtUSD(val);
      onUpdate();
    });
  }

  if (UI.inputDays) {
    UI.inputDays.addEventListener('input', (e) => {
      state.days = parseInt(e.target.value);
      if (UI.valDays) UI.valDays.textContent = `${state.days} Day${state.days === 1 ? '' : 's'}`;
      onUpdate();
    });
  }

  if (UI.inputFunding) {
    UI.inputFunding.addEventListener('input', (e) => {
      state.fundingAPR = parseFloat(e.target.value);
      if (UI.valFunding) {
        UI.valFunding.textContent = fmtPct(state.fundingAPR) + ' APR';
        UI.valFunding.className = `font-mono font-bold ${state.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      }
      onUpdate();
    });
  }

  if (UI.inputStaking) {
    UI.inputStaking.addEventListener('input', (e) => {
      state.stakingAPY = parseFloat(e.target.value);
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
      onUpdate();
    });
  }

  if (UI.inputDepeg) {
    UI.inputDepeg.addEventListener('input', (e) => {
      state.depegPct = parseFloat(e.target.value);
      if (UI.valDepeg) UI.valDepeg.textContent = state.depegPct.toFixed(1) + '% Discount';
      onUpdate();
    });
  }

  if (UI.inputSplit) {
    UI.inputSplit.addEventListener('input', (e) => {
      const spotPct = parseInt(e.target.value);
      state.splitSpot = spotPct;
      const marginPct = 100 - spotPct;
      if (UI.valSplit) UI.valSplit.textContent = `${spotPct}% Spot / ${marginPct}% Margin`;

      const lev = spotPct / marginPct;
      const rLiq = (((marginPct / spotPct) - state.mmr) / (1 + state.mmr)) * 100;
      if (UI.splitHelperText) {
        UI.splitHelperText.textContent = `Effective Short Leverage: ${lev.toFixed(2)}x (Liquidation buffer: +${rLiq.toFixed(1)}%)`;
      }
      onUpdate();
    });
  }
}
