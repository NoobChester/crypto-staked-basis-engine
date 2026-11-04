/**
 * @file app.ts
 * @description Main application orchestrator, state store, event dispatcher, and live feed coordinator.
 */

import { calculateOutcome, fmtPct, type HedgingState } from './math/hedging.js';
import {
  COLLATERAL_PRESETS,
  BTC_LST_VARIANTS,
  updatePresetsWithLiveData,
  type MarginMode,
  type TradedAsset,
  type BtcVariant,
  type CollateralPresetKey,
  type SolYieldType
} from './config/presets.js';
import {
  fetchLiveMarketData,
  getLatestMarketData,
  subscribeMarketData,
  startAutoRefresh,
  setFundingVenue as setServiceFundingVenue,
  type FundingVenue,
  type MarketDataSnapshot
} from './services/marketData.js';
import { getUIElements, renderUI, bindInputListeners, type UIElements } from './ui/dom.js';
import { drawChart, setupChartInteractions } from './ui/chart.js';

export const state: HedgingState & {
  tradedAsset: TradedAsset;
  btcVariant: BtcVariant;
  activePreset: CollateralPresetKey;
  solYieldType: SolYieldType;
  isLiveFunding: boolean;
  isLiveStaking: boolean;
} = {
  mode: 'unified',
  capital: 10000,
  priceMove: 0,
  days: 90,
  fundingAPR: 10.0,
  stakingAPY: 3.2,
  depegPct: 0.0,
  mmr: 0.005,
  tradedAsset: 'ETH',
  btcVariant: 'lbtc',
  activePreset: 'wsteth_90',
  collateralRatio: 0.90,
  solYieldType: 'real',
  splitSpot: 50,
  isLiveFunding: true,
  isLiveStaking: true
};

let UI: UIElements;

export function updateApp(): void {
  if (!UI) return;
  const res = calculateOutcome(state.priceMove, state);
  renderUI(UI, state, res);
  drawChart(UI.canvas, state, res);
}

export function applyLiveFunding(): void {
  const data = getLatestMarketData();
  const asset = state.tradedAsset || 'ETH';
  const liveRate = data[asset]?.perpFundingAPR ?? 10.0;
  state.fundingAPR = liveRate;
  state.isLiveFunding = true;
  if (UI?.inputFunding) UI.inputFunding.value = liveRate.toString();
  if (UI?.valFunding) {
    UI.valFunding.textContent = fmtPct(liveRate) + ' APR';
    UI.valFunding.className = `font-mono font-bold ${liveRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  updateApp();
}

export function applyLiveStaking(): void {
  const data = getLatestMarketData();
  const asset = state.tradedAsset || 'ETH';
  let liveStaking = 0.0;

  if (state.mode === 'unified') {
    if (state.activePreset === 'wsteth_90') {
      liveStaking = data.ETH.stakingAPY;
    } else if (state.activePreset === 'sol_lrt_85') {
      liveStaking = (state.solYieldType === 'nominal')
        ? (data.SOL.nominalStakingAPY ?? 7.2)
        : (data.SOL.realStakingAPY ?? 1.8);
    } else {
      liveStaking = 0.0;
    }
  } else {
    if (asset === 'ETH') {
      liveStaking = data.ETH.stakingAPY;
    } else if (asset === 'SOL') {
      liveStaking = (state.solYieldType === 'nominal')
        ? (data.SOL.nominalStakingAPY ?? 7.2)
        : (data.SOL.realStakingAPY ?? 1.8);
    } else if (asset === 'BTC') {
      if (state.btcVariant === 'lbtc') liveStaking = data.btcLst.lbtc.stakingAPY;
      else if (state.btcVariant === 'solvbtc') liveStaking = data.btcLst.solvbtc.stakingAPY;
      else liveStaking = 0.0;
    }
  }

  state.stakingAPY = liveStaking;
  state.isLiveStaking = true;
  if (UI?.inputStaking) UI.inputStaking.value = liveStaking.toString();
  if (UI?.valStaking) UI.valStaking.textContent = liveStaking.toFixed(1) + '% APY';
  updateApp();
}

export function setFundingVenue(venue: FundingVenue): void {
  setServiceFundingVenue(venue);
  if (state.isLiveFunding) {
    applyLiveFunding();
  } else {
    updateApp();
  }
}

export async function refreshLiveRates(): Promise<void> {
  if (UI?.refreshIcon) UI.refreshIcon.classList.add('animate-spin');
  if (UI?.refreshBtnLabel) UI.refreshBtnLabel.textContent = 'Syncing...';

  try {
    const data = await fetchLiveMarketData();
    updatePresetsWithLiveData(data);

    if (state.isLiveFunding) {
      applyLiveFunding();
    }
    if (state.isLiveStaking) {
      applyLiveStaking();
    }
  } finally {
    if (UI?.refreshIcon) UI.refreshIcon.classList.remove('animate-spin');
    if (UI?.refreshBtnLabel) UI.refreshBtnLabel.textContent = 'Sync Live Rates';
    updateApp();
  }
}

export function setAccountMode(mode: MarginMode): void {
  state.mode = mode;
  if (mode === 'unified') {
    if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow';
    if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
    if (UI.panelUnifiedPresets) UI.panelUnifiedPresets.classList.remove('hidden');
    if (UI.panelIsolatedSplit) UI.panelIsolatedSplit.classList.add('hidden');
    if (UI.chartSubCaption) UI.chartSubCaption.textContent = 'Cross-collateralized: Spot collateral appreciation cushions perp losses';
    if (state.tradedAsset === 'BTC') {
      state.stakingAPY = 0.0;
      if (UI.inputStaking) UI.inputStaking.value = '0.0';
      if (UI.valStaking) UI.valStaking.textContent = '0.0% APY';
    }
    applyCollateralPreset(state.activePreset || 'wsteth_90');
  } else {
    if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow';
    if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
    if (UI.panelUnifiedPresets) UI.panelUnifiedPresets.classList.add('hidden');
    if (UI.panelIsolatedSplit) UI.panelIsolatedSplit.classList.remove('hidden');
    if (UI.chartSubCaption) UI.chartSubCaption.textContent = 'Isolated cash margin: Sharp rallies can deplete collateral and trigger liquidation';
    
    if (state.isLiveStaking) {
      applyLiveStaking();
    } else {
      if (state.tradedAsset === 'BTC') {
        const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
        state.stakingAPY = btcMeta.stakingAPY;
      } else if (state.tradedAsset === 'SOL') {
        state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
      }
      if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
    }
  }
  updateApp();
}

export function setTradedAsset(asset: TradedAsset): void {
  state.tradedAsset = asset;
  const data = getLatestMarketData();

  if (state.isLiveFunding) {
    const liveRate = data[asset]?.perpFundingAPR ?? 10.0;
    state.fundingAPR = liveRate;
    if (UI.inputFunding) UI.inputFunding.value = liveRate.toString();
    if (UI.valFunding) {
      UI.valFunding.textContent = fmtPct(liveRate) + ' APR';
      UI.valFunding.className = `font-mono font-bold ${liveRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
    }
  }

  if (state.mode === 'unified') {
    if (asset === 'SOL') {
      applyCollateralPreset('sol_lrt_85');
      return;
    } else if (asset === 'BTC') {
      state.stakingAPY = 0.0;
      if (UI.inputStaking) UI.inputStaking.value = '0.0';
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
    if (state.isLiveStaking) {
      applyLiveStaking();
    } else {
      if (asset === 'BTC') {
        const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
        state.stakingAPY = btcMeta.stakingAPY;
      } else if (asset === 'ETH') {
        state.stakingAPY = 3.2;
      } else if (asset === 'SOL') {
        state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
      }
      if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
    }
  }
  updateApp();
}

export function setBtcVariant(variant: BtcVariant): void {
  state.btcVariant = variant;
  const data = getLatestMarketData();

  if (state.isLiveStaking) {
    if (variant === 'lbtc') state.stakingAPY = data.btcLst.lbtc.stakingAPY;
    else if (variant === 'solvbtc') state.stakingAPY = data.btcLst.solvbtc.stakingAPY;
    else state.stakingAPY = 0.0;
  } else {
    const btcMeta = BTC_LST_VARIANTS[variant] || BTC_LST_VARIANTS.lbtc;
    state.stakingAPY = btcMeta.stakingAPY;
  }

  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
  updateApp();
}

export function applyCollateralPreset(presetKey: CollateralPresetKey): void {
  state.activePreset = presetKey;
  const data = getLatestMarketData();
  
  ['btn-preset-100', 'btn-preset-95', 'btn-preset-90', 'btn-preset-85'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'preset-choice p-2 rounded-lg bg-brand-dark hover:bg-slate-800 border border-brand-border text-left transition cursor-pointer select-none';
    const title = el.querySelector('.font-bold');
    if (title) title.className = 'font-bold text-white';
  });

  const activeBtnId: Record<CollateralPresetKey, string> = {
    inverse_100: 'btn-preset-100',
    btc_eth_95: 'btn-preset-95',
    wsteth_90: 'btn-preset-90',
    sol_lrt_85: 'btn-preset-85'
  };

  const btnId = activeBtnId[presetKey];
  if (btnId) {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.className = 'preset-choice p-2 rounded-lg bg-cyan-950/80 border border-cyan-500 text-left transition cursor-pointer select-none';
      const title = btn.querySelector('.font-bold');
      if (title) title.className = 'font-bold text-cyan-300';
    }
  }

  const presetConfig = COLLATERAL_PRESETS[presetKey];
  if (presetConfig) {
    state.collateralRatio = presetConfig.collateralRatio;
    if (presetKey === 'sol_lrt_85') {
      state.tradedAsset = 'SOL';
      state.stakingAPY = state.isLiveStaking
        ? ((state.solYieldType === 'nominal') ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8))
        : ((state.solYieldType === 'nominal') ? (presetConfig.nominalAPY ?? 7.2) : (presetConfig.realAPY ?? 1.8));

      if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
      if (UI.collateralRatioExplainer && presetConfig.getExplainer) {
        UI.collateralRatioExplainer.textContent = presetConfig.getExplainer(state.solYieldType);
      }
      if (UI.btnSolNominal && UI.btnSolReal) {
        if (state.solYieldType === 'nominal') {
          UI.btnSolNominal.className = 'px-1.5 py-0.5 rounded font-bold transition bg-amber-950 text-amber-300 border border-amber-700 shadow-sm';
          UI.btnSolReal.className = 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white';
        } else {
          UI.btnSolReal.className = 'px-1.5 py-0.5 rounded font-bold transition bg-amber-950 text-amber-300 border border-amber-700 shadow-sm';
          UI.btnSolNominal.className = 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white';
        }
      }
      const subtext85 = document.getElementById('subtext-preset-85');
      if (subtext85) {
        const val = (state.solYieldType === 'nominal') ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8);
        subtext85.textContent = `15% Haircut | ${val.toFixed(1)}% ${state.solYieldType === 'nominal' ? 'Nom' : 'Real'} Stake`;
      }
    } else if (presetKey === 'wsteth_90') {
      state.stakingAPY = state.isLiveStaking ? data.ETH.stakingAPY : presetConfig.stakingAPY;
      state.tradedAsset = 'ETH';
      if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
      if (UI.collateralRatioExplainer && presetConfig.explainer) {
        UI.collateralRatioExplainer.textContent = presetConfig.explainer;
      }
    } else {
      state.stakingAPY = 0.0;
      if (state.tradedAsset !== 'BTC' && state.tradedAsset !== 'ETH') state.tradedAsset = 'BTC';
      if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
      if (UI.collateralRatioExplainer && presetConfig.explainer) {
        UI.collateralRatioExplainer.textContent = presetConfig.explainer;
      }
    }
  }

  if (state.isLiveFunding) {
    const liveFunding = data[state.tradedAsset]?.perpFundingAPR ?? 10.0;
    state.fundingAPR = liveFunding;
    if (UI.inputFunding) UI.inputFunding.value = liveFunding.toString();
    if (UI.valFunding) {
      UI.valFunding.textContent = fmtPct(liveFunding) + ' APR';
      UI.valFunding.className = `font-mono font-bold ${liveFunding >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
    }
  }

  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';

  updateApp();
}

export function setSolYieldType(type: SolYieldType): void {
  state.solYieldType = type;
  const data = getLatestMarketData();
  
  if (state.isLiveStaking) {
    state.stakingAPY = (type === 'nominal') ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8);
  } else {
    state.stakingAPY = (type === 'nominal') ? 7.2 : 1.8;
  }

  if (UI.btnSolNominal && UI.btnSolReal) {
    if (type === 'nominal') {
      UI.btnSolNominal.className = 'px-1.5 py-0.5 rounded font-bold transition bg-amber-950 text-amber-300 border border-amber-700 shadow-sm';
      UI.btnSolReal.className = 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white';
    } else {
      UI.btnSolReal.className = 'px-1.5 py-0.5 rounded font-bold transition bg-amber-950 text-amber-300 border border-amber-700 shadow-sm';
      UI.btnSolNominal.className = 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white';
    }
  }

  const subtext85 = document.getElementById('subtext-preset-85');
  if (subtext85) {
    const val = (type === 'nominal') ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8);
    subtext85.textContent = `15% Haircut | ${val.toFixed(1)}% ${type === 'nominal' ? 'Nom' : 'Real'} Stake`;
  }

  if (state.activePreset !== 'sol_lrt_85') {
    applyCollateralPreset('sol_lrt_85');
    return;
  }

  if (UI.collateralRatioExplainer) {
    const presetConfig = COLLATERAL_PRESETS.sol_lrt_85;
    if (presetConfig && presetConfig.getExplainer) {
      UI.collateralRatioExplainer.textContent = presetConfig.getExplainer(type);
    }
  }

  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
  updateApp();
}

export function setPriceChange(pct: number): void {
  state.priceMove = pct;
  if (UI.inputPriceMove) UI.inputPriceMove.value = pct.toString();
  if (UI.valPriceMove) UI.valPriceMove.textContent = fmtPct(pct);
  updateApp();
}

export function setDays(d: number): void {
  state.days = d;
  if (UI.inputDays) UI.inputDays.value = d.toString();
  if (UI.valDays) UI.valDays.textContent = `${d} Day${d === 1 ? '' : 's'}`;
  updateApp();
}

export function setSplit(spotPct: number): void {
  state.splitSpot = spotPct;
  if (UI.inputSplit) UI.inputSplit.value = spotPct.toString();
  const marginPct = 100 - spotPct;
  if (UI.valSplit) UI.valSplit.textContent = `${spotPct}% Spot / ${marginPct}% Margin`;

  const lev = spotPct / marginPct;
  const rLiq = (((marginPct / spotPct) - state.mmr) / (1 + state.mmr)) * 100;
  if (UI.splitHelperText) {
    UI.splitHelperText.textContent = `Effective Short Leverage: ${lev.toFixed(2)}x (Liquidation buffer: +${rLiq.toFixed(1)}%)`;
  }
  updateApp();
}

export function resetDefaults(): void {
  state.tradedAsset = 'ETH';
  state.btcVariant = 'lbtc';
  state.solYieldType = 'real';
  state.isLiveFunding = true;
  state.isLiveStaking = true;

  if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = 'Real (+1.8%)';
  if (UI.btnSolReal) UI.btnSolReal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
  if (UI.btnSolNominal) UI.btnSolNominal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
  
  setAccountMode('unified');
  applyCollateralPreset('wsteth_90');
  setPriceChange(0);
  setDays(90);
  state.capital = 10000;
  if (UI.inputCapital) UI.inputCapital.value = '10000';
  if (UI.valCapital) UI.valCapital.textContent = '$10,000';
  
  state.depegPct = 0.0;
  if (UI.inputDepeg) UI.inputDepeg.value = '0.0';
  if (UI.valDepeg) UI.valDepeg.textContent = '0.0% Discount';
  setSplit(50);

  applyLiveFunding();
  applyLiveStaking();
}

export function openTriadModal(): void {
  if (UI?.triadModal) {
    UI.triadModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

export function closeTriadModal(): void {
  if (UI?.triadModal) {
    UI.triadModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

declare global {
  interface Window {
    setAccountMode: typeof setAccountMode;
    setTradedAsset: typeof setTradedAsset;
    setBtcVariant: typeof setBtcVariant;
    applyCollateralPreset: typeof applyCollateralPreset;
    setSolYieldType: typeof setSolYieldType;
    setPriceChange: typeof setPriceChange;
    setDays: typeof setDays;
    setSplit: typeof setSplit;
    resetDefaults: typeof resetDefaults;
    openTriadModal: typeof openTriadModal;
    closeTriadModal: typeof closeTriadModal;
    applyLiveFunding: typeof applyLiveFunding;
    applyLiveStaking: typeof applyLiveStaking;
    setFundingVenue: typeof setFundingVenue;
    refreshLiveRates: typeof refreshLiveRates;
  }
}

window.setAccountMode = setAccountMode;
window.setTradedAsset = setTradedAsset;
window.setBtcVariant = setBtcVariant;
window.applyCollateralPreset = applyCollateralPreset;
window.setSolYieldType = setSolYieldType;
window.setPriceChange = setPriceChange;
window.setDays = setDays;
window.setSplit = setSplit;
window.resetDefaults = resetDefaults;
window.openTriadModal = openTriadModal;
window.closeTriadModal = closeTriadModal;
window.applyLiveFunding = applyLiveFunding;
window.applyLiveStaking = applyLiveStaking;
window.setFundingVenue = setFundingVenue;
window.refreshLiveRates = refreshLiveRates;

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

  // Setup Triad Modal backdrop and keyboard dismiss listeners
  if (UI.triadModal) {
    UI.triadModal.addEventListener('click', (e) => {
      if (e.target === UI.triadModal) {
        closeTriadModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTriadModal();
    }
  });

  // Subscribe to live market data feeds
  subscribeMarketData((snapshot: MarketDataSnapshot) => {
    updatePresetsWithLiveData(snapshot);
    if (state.isLiveFunding) {
      const liveRate = snapshot[state.tradedAsset]?.perpFundingAPR ?? state.fundingAPR;
      state.fundingAPR = liveRate;
      if (UI?.inputFunding) UI.inputFunding.value = liveRate.toString();
      if (UI?.valFunding) {
        UI.valFunding.textContent = fmtPct(liveRate) + ' APR';
        UI.valFunding.className = `font-mono font-bold ${liveRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      }
    }
    if (state.isLiveStaking) {
      applyLiveStaking();
    } else {
      updateApp();
    }
  });

  // Start periodic 60s background polling
  startAutoRefresh(60000);

  applyCollateralPreset('wsteth_90');
  setSplit(50);
  updateApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
