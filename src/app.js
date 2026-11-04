/**
 * @file app.js
 * @description Main application orchestrator, state store, and event dispatcher.
 */

import { calculateOutcome, fmtUSD, fmtPct } from './math/hedging.js';
import { COLLATERAL_PRESETS, BTC_LST_VARIANTS, getInstrumentDetails } from './config/presets.js';
import { getUIElements, renderUI, bindInputListeners } from './ui/dom.js';
import { drawChart, setupChartInteractions } from './ui/chart.js';

// Application State Store
export const state = {
  mode: 'unified', // 'unified' | 'isolated'
  capital: 10000,
  priceMove: 0,    // % (-100 to +100)
  days: 90,
  fundingAPR: 10.0, // %
  stakingAPY: 3.2,  // %
  depegPct: 0.0,    // %
  mmr: 0.005,       // 0.5% exchange maintenance margin requirement
  
  // Traded Instrument selection
  tradedAsset: 'ETH', // 'ETH' | 'BTC' | 'SOL'
  btcVariant: 'lbtc',  // 'native' | 'lbtc' | 'solvbtc' (Available in Isolated Mode)

  // Unified Mode specific
  activePreset: 'wsteth_90',
  collateralRatio: 0.90, // 0.90 = 10% haircut
  solYieldType: 'real', // 'nominal' (7.2%) | 'real' (1.8%) - default is real yield

  // Isolated Mode specific
  splitSpot: 50 // % (Spot fraction; remainder is margin)
};

let UI = {};

/**
 * Re-computes financial outcome, updates DOM, and redraws the canvas chart.
 */
export function updateApp() {
  const res = calculateOutcome(state.priceMove, state);
  renderUI(UI, state, res);
  drawChart(UI.canvas, state, res);
}

// Controller Actions (also attached to window for index.html onclick compatibility)
export function setAccountMode(mode) {
  state.mode = mode;
  if (mode === 'unified') {
    if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow';
    if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
    if (UI.panelUnifiedPresets) UI.panelUnifiedPresets.classList.remove('hidden');
    if (UI.panelIsolatedSplit) UI.panelIsolatedSplit.classList.add('hidden');
    if (UI.chartSubCaption) UI.chartSubCaption.textContent = 'Cross-collateralized: Spot collateral appreciation cushions perp losses';
    if (state.tradedAsset === 'BTC') {
      state.stakingAPY = 0.0;
      if (UI.inputStaking) UI.inputStaking.value = 0.0;
      if (UI.valStaking) UI.valStaking.textContent = '0.0% APY';
    }
    applyCollateralPreset(state.activePreset || 'wsteth_90');
  } else {
    if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow';
    if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
    if (UI.panelUnifiedPresets) UI.panelUnifiedPresets.classList.add('hidden');
    if (UI.panelIsolatedSplit) UI.panelIsolatedSplit.classList.remove('hidden');
    if (UI.chartSubCaption) UI.chartSubCaption.textContent = 'Isolated cash margin: Sharp rallies can deplete collateral and trigger liquidation';
    if (state.tradedAsset === 'BTC') {
      const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
      state.stakingAPY = btcMeta.stakingAPY;
      if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
    } else if (state.tradedAsset === 'SOL') {
      state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
      if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
    }
  }
  updateApp();
}

export function setTradedAsset(asset) {
  state.tradedAsset = asset;
  if (state.mode === 'unified') {
    if (asset === 'SOL') {
      applyCollateralPreset('sol_lrt_85');
      return;
    } else if (asset === 'BTC') {
      state.stakingAPY = 0.0;
      if (UI.inputStaking) UI.inputStaking.value = 0.0;
      if (UI.valStaking) UI.valStaking.textContent = '0.0% APY';
      if (state.activePreset === 'wsteth_90' || state.activePreset === 'sol_lrt_85') {
        applyCollateralPreset('btc_eth_95');
        return;
      }
    } else if (asset === 'ETH') {
      if (state.activePreset === 'sol_lrt_85') {
        applyCollateralPreset('wsteth_90');
        return;
      }
    }
  } else {
    // Isolated Mode
    if (asset === 'BTC') {
      const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
      state.stakingAPY = btcMeta.stakingAPY;
    } else if (asset === 'ETH') {
      state.stakingAPY = 3.2;
    } else if (asset === 'SOL') {
      state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
    }
    if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
    if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
  }
  updateApp();
}

export function setBtcVariant(variant) {
  state.btcVariant = variant;
  const btcMeta = BTC_LST_VARIANTS[variant] || BTC_LST_VARIANTS.lbtc;
  state.stakingAPY = btcMeta.stakingAPY;
  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
  updateApp();
}

export function applyCollateralPreset(presetKey) {
  state.activePreset = presetKey;
  
  // Reset preset styling
  ['btn-preset-100', 'btn-preset-95', 'btn-preset-90', 'btn-preset-85'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'preset-choice p-2 rounded-lg bg-brand-dark hover:bg-slate-800 border border-brand-border text-left transition';
    const title = el.querySelector('.font-bold');
    if (title) title.className = 'font-bold text-white';
  });

  const activeBtnId = {
    'inverse_100': 'btn-preset-100',
    'btc_eth_95': 'btn-preset-95',
    'wsteth_90': 'btn-preset-90',
    'sol_lrt_85': 'btn-preset-85'
  }[presetKey];

  if (activeBtnId) {
    const btn = document.getElementById(activeBtnId);
    if (btn) {
      btn.className = 'preset-choice p-2 rounded-lg bg-cyan-950/80 border border-cyan-500 text-left transition';
      const title = btn.querySelector('.font-bold');
      if (title) title.className = 'font-bold text-cyan-300';
    }
  }

  // Toggle JitoSOL box visibility
  if (UI.jitosolToggleBox) {
    if (presetKey === 'sol_lrt_85') {
      UI.jitosolToggleBox.classList.remove('hidden');
    } else {
      UI.jitosolToggleBox.classList.add('hidden');
    }
  }

  const presetConfig = COLLATERAL_PRESETS[presetKey];
  if (presetConfig) {
    state.collateralRatio = presetConfig.collateralRatio;
    if (presetKey === 'sol_lrt_85') {
      state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
      state.tradedAsset = 'SOL';
      if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
      if (UI.collateralRatioExplainer) UI.collateralRatioExplainer.textContent = presetConfig.getExplainer(state.solYieldType);
    } else if (presetKey === 'wsteth_90') {
      state.stakingAPY = presetConfig.stakingAPY;
      state.tradedAsset = 'ETH';
      if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
      if (UI.collateralRatioExplainer) UI.collateralRatioExplainer.textContent = presetConfig.explainer;
    } else {
      state.stakingAPY = presetConfig.stakingAPY;
      if (state.tradedAsset !== 'BTC' && state.tradedAsset !== 'ETH') state.tradedAsset = 'BTC';
      if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
      if (UI.collateralRatioExplainer) UI.collateralRatioExplainer.textContent = presetConfig.explainer;
    }
  }

  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';

  updateApp();
}

export function setSolYieldType(type) {
  state.solYieldType = type;
  if (type === 'nominal') {
    state.stakingAPY = 7.2;
    if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = 'Nominal (+7.2%)';
    if (UI.btnSolNominal) UI.btnSolNominal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
    if (UI.btnSolReal) UI.btnSolReal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
  } else {
    state.stakingAPY = 1.8;
    if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = 'Real (+1.8%)';
    if (UI.btnSolReal) UI.btnSolReal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
    if (UI.btnSolNominal) UI.btnSolNominal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
  }

  const subtext85 = document.getElementById('subtext-preset-85');
  if (subtext85) {
    subtext85.textContent = (type === 'nominal') ? '15% Haircut | 7.2% Stake' : '15% Haircut | 1.8% Real Stake';
  }

  if (state.activePreset === 'sol_lrt_85' && UI.collateralRatioExplainer) {
    UI.collateralRatioExplainer.textContent = (type === 'nominal')
      ? 'Solana / Liquid Restaking (Nominal 7.2%). Stacks high base yield with a +545% price surge liquidation buffer.'
      : 'Solana / Liquid Restaking (Real Yield 1.8%). Stacks inflation-adjusted real yield with a +545% price surge liquidation buffer.';
  }

  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
  updateApp();
}

export function setPriceChange(pct) {
  state.priceMove = pct;
  if (UI.inputPriceMove) UI.inputPriceMove.value = pct;
  if (UI.valPriceMove) UI.valPriceMove.textContent = fmtPct(pct);
  updateApp();
}

export function setDays(d) {
  state.days = d;
  if (UI.inputDays) UI.inputDays.value = d;
  if (UI.valDays) UI.valDays.textContent = `${d} Day${d === 1 ? '' : 's'}`;
  updateApp();
}

export function setSplit(spotPct) {
  state.splitSpot = spotPct;
  if (UI.inputSplit) UI.inputSplit.value = spotPct;
  const marginPct = 100 - spotPct;
  if (UI.valSplit) UI.valSplit.textContent = `${spotPct}% Spot / ${marginPct}% Margin`;

  const lev = spotPct / marginPct;
  const rLiq = (((marginPct / spotPct) - state.mmr) / (1 + state.mmr)) * 100;
  if (UI.splitHelperText) {
    UI.splitHelperText.textContent = `Effective Short Leverage: ${lev.toFixed(2)}x (Liquidation buffer: +${rLiq.toFixed(1)}%)`;
  }
  updateApp();
}

export function resetDefaults() {
  state.tradedAsset = 'ETH';
  state.btcVariant = 'lbtc';
  state.solYieldType = 'real';
  if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = 'Real (+1.8%)';
  if (UI.btnSolReal) UI.btnSolReal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
  if (UI.btnSolNominal) UI.btnSolNominal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
  const subtext85 = document.getElementById('subtext-preset-85');
  if (subtext85) subtext85.textContent = '15% Haircut | 1.8% Real Stake';
  setAccountMode('unified');
  applyCollateralPreset('wsteth_90');
  setPriceChange(0);
  setDays(90);
  state.capital = 10000;
  if (UI.inputCapital) UI.inputCapital.value = 10000;
  if (UI.valCapital) UI.valCapital.textContent = '$10,000';
  state.fundingAPR = 10.0;
  if (UI.inputFunding) UI.inputFunding.value = 10.0;
  if (UI.valFunding) UI.valFunding.textContent = '+10.00% APR';
  state.depegPct = 0.0;
  if (UI.inputDepeg) UI.inputDepeg.value = 0.0;
  if (UI.valDepeg) UI.valDepeg.textContent = '0.0% Discount';
  setSplit(50);
  updateApp();
}

// Attach functions to global window for HTML inline onclick event handler compatibility
window.setAccountMode = setAccountMode;
window.setTradedAsset = setTradedAsset;
window.setBtcVariant = setBtcVariant;
window.applyCollateralPreset = applyCollateralPreset;
window.setSolYieldType = setSolYieldType;
window.setPriceChange = setPriceChange;
window.setDays = setDays;
window.setSplit = setSplit;
window.resetDefaults = resetDefaults;

// Initialization
function init() {
  UI = getUIElements();
  bindInputListeners(UI, state, updateApp);
  setupChartInteractions(UI.canvas, UI, () => state);

  if (UI.canvas && UI.canvas.parentElement) {
    const ro = new ResizeObserver(() => {
      updateApp();
    });
    ro.observe(UI.canvas.parentElement);
  }

  applyCollateralPreset('wsteth_90');
  setSplit(50);
  updateApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
