/**
 * @file app.ts
 * @description Main application orchestrator, state store, event dispatcher, and live feed coordinator.
 */

import { calculateOutcome, calculateCrisisSimulation, fmtPct, type HedgingState, type CrisisSimulationResult } from './math/hedging.js';
import { drawCrisisTrajectory } from './ui/renderers/crisisTrajectoryRenderer.js';
import { renderCrisisAuditTable, exportCrisisAuditCsv } from './ui/dom.js';
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
  CRISIS_SCENARIOS,
  type CrisisScenarioKey
} from './config/scenarios.js';
import {
  fetchLiveMarketData,
  fetchAssetHistoricalAnalytics,
  getLatestMarketData,
  subscribeMarketData,
  startAutoRefresh,
  setFundingVenue as setServiceFundingVenue,
  type FundingVenue,
  type MarketDataSnapshot,
  type AssetHistoricalAnalytics,
  FEE_TIERS,
  VENUE_EXECUTION_FEES,
  DEFAULT_TBILL_RATE,
  type ExecutionFeeTier
} from './services/marketData.js';
import {
  getUIElements,
  renderUI,
  renderHistoricalPills,
  renderHistoricalModal,
  updateHistoricalTooltip,
  updateDepegControl,
  type UIElements
} from './ui/dom.js';
import { setupEventDelegation, bindSliderListeners } from './ui/events.js';
import { drawChart, setupChartInteractions, type ChartConfidenceStats } from './ui/chart.js';
import { getCustomStatisticalCarry, type StatisticalCarrySnapshot } from './services/marketData.js';
import { drawHistoricalChart, drawHistoricalStakingSubChart, drawHistoricalSubChart, setupHistoricalChartInteractions } from './ui/historicalChart.js';

export type HistoricalHorizon = 'live' | '7d' | '30d' | '90d' | 'custom';

export const state: HedgingState & {
  tradedAsset: TradedAsset;
  btcVariant: BtcVariant;
  activePreset: CollateralPresetKey;
  solYieldType: SolYieldType;
  isLiveFunding: boolean;
  isLiveStaking: boolean;
  stakingWindow: HistoricalHorizon;
  fundingWindow: HistoricalHorizon;
  feeTier: ExecutionFeeTier;
  activeCrisisScenario: CrisisScenarioKey | null;
  activeRegime?: 'conservative' | 'base' | 'bull';
  lookbackDays?: number;
} = {
  mode: 'unified',
  capital: 10000,
  priceMove: 0,
  days: 90,
  fundingAPR: 10.0,
  stakingAPY: 3.2,
  depegPct: 0.0,
  mmr: 0.005,
  roundtripFeePct: 0.10,
  tbillRate: DEFAULT_TBILL_RATE,
  feeTier: 'vip',
  tradedAsset: 'ETH',
  btcVariant: 'lbtc',
  activePreset: 'wsteth_90',
  collateralRatio: 0.90,
  solYieldType: 'real',
  splitSpot: 50,
  isLiveFunding: true,
  isLiveStaking: true,
  stakingWindow: 'live',
  fundingWindow: 'live',
  activeCrisisScenario: null,
  activeRegime: 'base' as 'conservative' | 'base' | 'bull',
  lookbackDays: 30
};

let UI: UIElements;
let currentHistoricalAnalytics: AssetHistoricalAnalytics | null = null;
let currentHistoricalTimeframe: 30 | 90 | 180 = 90;
let currentHistoricalAsset: TradedAsset = 'ETH';
let isHistoricalModalOpen = false;
let currentCrisisResult: CrisisSimulationResult | null = null;
let latestStatisticalCarry: StatisticalCarrySnapshot | null = null;

export function getConfidenceStats(): ChartConfidenceStats | undefined {
  if (!latestStatisticalCarry) return undefined;
  return {
    sigmaFunding: latestStatisticalCarry.funding.stdDev,
    sigmaStaking: latestStatisticalCarry.staking.stdDev,
    showConfidenceFan: true
  };
}

export function updateApp(): void {
  if (!UI) return;
  const res = calculateOutcome(state.priceMove, state);

  // If institutional crisis scenario is active, compute path-dependent audit simulation
  if (state.activeCrisisScenario && CRISIS_SCENARIOS[state.activeCrisisScenario]) {
    const key = state.activeCrisisScenario;
    const scenario = CRISIS_SCENARIOS[key];
    currentCrisisResult = calculateCrisisSimulation(key, state);

    // Overlay path-dependent simulation outcomes onto res for consistent KPI display
    res.fundingYieldTotal = currentCrisisResult.totalHarvestedFunding;
    res.stakingYieldTotal = currentCrisisResult.totalHarvestedStaking;
    res.depegLoss = currentCrisisResult.depegLoss;
    res.spotPnL = currentCrisisResult.spotPnL;
    res.perpPnL = currentCrisisResult.perpPnL;
    res.totalPortfolioVal = currentCrisisResult.terminalEquity;
    res.netPnL = currentCrisisResult.netPnL;
    res.roiPct = state.capital > 0 ? (res.netPnL / state.capital) * 100 : 0;
    res.netRealizedPnL = parseFloat((res.netPnL - res.netFeeDollarLoss).toFixed(2));
    res.netRealizedRoiPct = state.capital > 0 ? parseFloat(((res.netRealizedPnL / state.capital) * 100).toFixed(2)) : 0;
    res.netRealizedAPY = currentCrisisResult.netRealizedAPY;
    res.isLiquidated = currentCrisisResult.isLiquidated;

    if (UI.sliderLockBadge) {
      UI.sliderLockBadge.textContent = `LOCKED (${scenario.lockedHorizonDays}D)`;
      UI.sliderLockBadge.classList.remove('hidden');
    }

    if (UI.crisisTrajectoryContainer && UI.crisisTrajectoryCanvas) {
      UI.crisisTrajectoryContainer.classList.remove('hidden');
      drawCrisisTrajectory(UI.crisisTrajectoryCanvas, currentCrisisResult, {
        accentColor: scenario.accentColor
      });
    }
  } else {
    currentCrisisResult = null;
    if (UI.sliderLockBadge) {
      UI.sliderLockBadge.classList.add('hidden');
    }
    if (UI.crisisTrajectoryContainer) {
      UI.crisisTrajectoryContainer.classList.add('hidden');
    }
  }

  renderUI(UI, state, res);
  drawChart(UI.canvas, state, res, getConfidenceStats());
  updateDepegControl(UI, state, getLatestMarketData());
}

export function setDepeg(pct: number): void {
  state.depegPct = pct;
  if (UI?.inputDepeg) {
    UI.inputDepeg.value = pct.toString();
  }
  if (UI?.valDepeg) {
    UI.valDepeg.textContent = `${pct.toFixed(1)}% Discount`;
  }
  updateApp();
}

export function applyLiveDepeg(): void {
  const snapshot = getLatestMarketData();
  const asset = state.tradedAsset || 'ETH';
  let liveDiscount = 0.08;

  if (state.mode === 'unified') {
    if (state.activePreset === 'inverse_100' || state.activePreset === 'btc_eth_95') {
      liveDiscount = 0.0;
    } else if (state.activePreset === 'sol_lrt_85') {
      liveDiscount = snapshot.SOL?.lstDiscount?.discountPct ?? 0.05;
    } else {
      liveDiscount = snapshot.ETH?.lstDiscount?.discountPct ?? 0.08;
    }
  } else {
    if (asset === 'BTC') {
      if (state.btcVariant === 'solvbtc') {
        liveDiscount = snapshot.btcLst?.solvbtc?.discountPct ?? 0.12;
      } else if (state.btcVariant === 'lbtc') {
        liveDiscount = snapshot.btcLst?.lbtc?.discountPct ?? 0.08;
      } else {
        liveDiscount = 0.0;
      }
    } else if (asset === 'SOL') {
      liveDiscount = snapshot.SOL?.lstDiscount?.discountPct ?? 0.05;
    } else {
      liveDiscount = snapshot.ETH?.lstDiscount?.discountPct ?? 0.08;
    }
  }

  setDepeg(liveDiscount);
}

export function applyHistoricalFunding(window: 'live' | '7d' | '30d' | '90d'): void {
  const data = getLatestMarketData();
  const asset = state.tradedAsset || 'ETH';
  const assetRates = data[asset];

  let chosenRate = 10.0;
  if (window === 'live') {
    chosenRate = assetRates?.perpFundingAPR ?? 10.0;
    state.isLiveFunding = true;
  } else if (window === '7d') {
    chosenRate = assetRates?.trailingAverages?.funding7d ?? (assetRates?.perpFundingAPR ?? 10.0);
    state.isLiveFunding = false;
  } else if (window === '30d') {
    chosenRate = assetRates?.trailingAverages?.funding30d ?? (assetRates?.perpFundingAPR ?? 10.0);
    state.isLiveFunding = false;
  } else if (window === '90d') {
    chosenRate = assetRates?.trailingAverages?.funding90d ?? (assetRates?.perpFundingAPR ?? 10.0);
    state.isLiveFunding = false;
  }

  state.fundingAPR = chosenRate;
  state.fundingWindow = window;

  if (UI?.inputFunding) UI.inputFunding.value = chosenRate.toString();
  if (UI?.valFunding) {
    UI.valFunding.textContent = fmtPct(chosenRate) + ' APR';
    UI.valFunding.className = `font-mono font-bold ${chosenRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI) renderHistoricalPills(UI, state, data);
  updateApp();
}

export function applyLiveFunding(): void {
  applyHistoricalFunding('live');
}

export function applyHistoricalStaking(window: 'live' | '7d' | '30d' | '90d'): void {
  const data = getLatestMarketData();
  const asset = state.tradedAsset || 'ETH';
  const assetRates = data[asset];

  let chosenStaking = 0.0;
  if (window === 'live') {
    if (state.mode === 'unified') {
      if (state.activePreset === 'wsteth_90') {
        chosenStaking = data.ETH.stakingAPY;
      } else if (state.activePreset === 'fbtc_90') {
        chosenStaking = COLLATERAL_PRESETS.fbtc_90.stakingAPY;
      } else if (state.activePreset === 'jitosol_85' || state.activePreset === 'sol_lrt_85') {
        chosenStaking = (state.solYieldType === 'nominal')
          ? (data.SOL.nominalStakingAPY ?? 7.2)
          : (data.SOL.realStakingAPY ?? 1.8);
      } else if (state.activePreset === 'sanctum_inf_85') {
        chosenStaking = (state.solYieldType === 'nominal')
          ? (COLLATERAL_PRESETS.sanctum_inf_85.nominalAPY ?? 8.5)
          : (COLLATERAL_PRESETS.sanctum_inf_85.realAPY ?? 3.1);
      } else {
        chosenStaking = 0.0;
      }
    } else {
      if (asset === 'ETH') {
        chosenStaking = data.ETH.stakingAPY;
      } else if (asset === 'SOL') {
        chosenStaking = (state.solYieldType === 'nominal')
          ? (data.SOL.nominalStakingAPY ?? 7.2)
          : (data.SOL.realStakingAPY ?? 1.8);
      } else if (asset === 'BTC') {
        if (state.btcVariant === 'lbtc') chosenStaking = data.btcLst.lbtc.stakingAPY;
        else if (state.btcVariant === 'solvbtc') chosenStaking = data.btcLst.solvbtc.stakingAPY;
        else chosenStaking = 0.0;
      }
    }
    state.isLiveStaking = true;
  } else {
    state.isLiveStaking = false;
    let base = 0.0;
    if (window === '7d') base = assetRates?.trailingAverages?.staking7d ?? (assetRates?.stakingAPY ?? 0.0);
    else if (window === '30d') base = assetRates?.trailingAverages?.staking30d ?? (assetRates?.stakingAPY ?? 0.0);
    else if (window === '90d') base = assetRates?.trailingAverages?.staking90d ?? (assetRates?.stakingAPY ?? 0.0);

    if (state.mode === 'unified') {
      if (state.activePreset === 'btc_eth_95' || state.activePreset === 'inverse_100') {
        chosenStaking = 0.0;
      } else if (state.activePreset === 'fbtc_90') {
        chosenStaking = COLLATERAL_PRESETS.fbtc_90.stakingAPY;
      } else if (state.activePreset === 'jitosol_85' || state.activePreset === 'sol_lrt_85') {
        chosenStaking = state.solYieldType === 'nominal' ? parseFloat((base + 5.4).toFixed(2)) : base;
      } else if (state.activePreset === 'sanctum_inf_85') {
        chosenStaking = state.solYieldType === 'nominal' ? 8.5 : 3.1;
      } else {
        chosenStaking = base;
      }
    } else {
      if (asset === 'BTC') {
        if (state.btcVariant === 'lbtc') chosenStaking = data.btcLst.lbtc.stakingAPY;
        else if (state.btcVariant === 'solvbtc') chosenStaking = data.btcLst.solvbtc.stakingAPY;
        else chosenStaking = 0.0;
      } else if (asset === 'SOL') {
        chosenStaking = state.solYieldType === 'nominal' ? parseFloat((base + 5.4).toFixed(2)) : base;
      } else {
        chosenStaking = base;
      }
    }
  }

  state.stakingAPY = chosenStaking;
  state.stakingWindow = window;

  if (UI?.inputStaking) UI.inputStaking.value = chosenStaking.toString();
  if (UI?.valStaking) UI.valStaking.textContent = chosenStaking.toFixed(1) + '% APY';
  if (UI) renderHistoricalPills(UI, state, data);
  updateApp();
}

export function applyLiveStaking(): void {
  applyHistoricalStaking('live');
}

export function applyHistoricalWindowToAll(window: '30d' | '90d'): void {
  if (currentHistoricalAsset && currentHistoricalAsset !== state.tradedAsset) {
    setTradedAsset(currentHistoricalAsset);
  }
  applyHistoricalFunding(window);
  applyHistoricalStaking(window);
  closeHistoricalModal();
}

export async function openHistoricalModal(): Promise<void> {
  if (!UI?.historicalModal) return;
  currentHistoricalAsset = state.tradedAsset || 'ETH';
  UI.historicalModal.classList.remove('hidden');
  isHistoricalModalOpen = true;
  await loadAndRenderHistoricalData();
}

export function closeHistoricalModal(): void {
  if (!UI?.historicalModal) return;
  UI.historicalModal.classList.add('hidden');
  isHistoricalModalOpen = false;
  if (UI.historicalTooltip) UI.historicalTooltip.classList.add('hidden');
}

export async function setHistoricalAsset(asset: TradedAsset): Promise<void> {
  currentHistoricalAsset = asset;
  await loadAndRenderHistoricalData();
}

export async function setHistoricalTimeframe(tf: 30 | 90 | 180): Promise<void> {
  currentHistoricalTimeframe = tf;

  const btn30 = UI?.histBtnRange30;
  const btn90 = UI?.histBtnRange90;
  const btn180 = UI?.histBtnRange180;
  const activeClass = 'px-2.5 py-1 rounded-md font-bold bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm transition cursor-pointer';
  const inactiveClass = 'px-2.5 py-1 rounded-md text-slate-400 hover:text-white transition cursor-pointer';

  if (btn30) btn30.className = tf === 30 ? activeClass : inactiveClass;
  if (btn90) btn90.className = tf === 90 ? activeClass : inactiveClass;
  if (btn180) btn180.className = tf === 180 ? activeClass : inactiveClass;

  await loadAndRenderHistoricalData();
}

export async function loadAndRenderHistoricalData(): Promise<void> {
  if (!UI?.historicalModal) return;
  try {
    const asset = currentHistoricalAsset || state.tradedAsset || 'ETH';
    const venue = getLatestMarketData().selectedVenue;
    const analytics = await fetchAssetHistoricalAnalytics(asset, currentHistoricalTimeframe, state.solYieldType);
    currentHistoricalAnalytics = analytics;

    renderHistoricalModal(UI, analytics, venue);
    drawHistoricalChart(UI.historicalCanvas, analytics, venue);
    drawHistoricalStakingSubChart(UI.historicalStakingSubCanvas, analytics);
    drawHistoricalSubChart(UI.historicalSubCanvas, analytics);
  } catch (err) {
    console.error('Failed to load historical analytics:', err);
  }
}

export function syncHyperliquidMarginLock(venue: FundingVenue): void {
  if (!UI?.modeUnifiedBtn) return;
  if (venue === 'hyperliquid') {
    if (state.mode === 'unified') {
      setAccountMode('isolated');
    }
    UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-500 bg-slate-900 border border-slate-800 transition flex items-center gap-1.5 opacity-40 cursor-not-allowed pointer-events-none select-none';
    UI.modeUnifiedBtn.title = '🔒 Locked (Hyperliquid requires USDC cash collateral — Unified Margin not supported)';
    UI.modeUnifiedBtn.setAttribute('aria-disabled', 'true');
  } else {
    UI.modeUnifiedBtn.removeAttribute('aria-disabled');
    UI.modeUnifiedBtn.title = 'Unified Margin (Cross-Collateral)';
    if (state.mode === 'unified') {
      UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow cursor-pointer';
    } else {
      UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer';
    }
  }
}

export function setFundingVenue(venue: FundingVenue): void {
  setServiceFundingVenue(venue);
  if (venue === 'binance') {
    state.roundtripFeePct = VENUE_EXECUTION_FEES.binance.roundtripPct;
    state.feeTier = 'vip';
  } else if (venue === 'hyperliquid') {
    state.roundtripFeePct = VENUE_EXECUTION_FEES.hyperliquid.roundtripPct;
    state.feeTier = 'mm';
  }

  syncHyperliquidMarginLock(venue);

  if (state.fundingWindow !== 'custom') {
    const win = (state.fundingWindow === '7d' || state.fundingWindow === '30d' || state.fundingWindow === '90d') ? state.fundingWindow : 'live';
    applyHistoricalFunding(win);
  } else {
    updateApp();
  }
  if (isHistoricalModalOpen && currentHistoricalAnalytics) {
    renderHistoricalModal(UI, currentHistoricalAnalytics, venue);
    drawHistoricalChart(UI.historicalCanvas, currentHistoricalAnalytics, venue);
    drawHistoricalStakingSubChart(UI.historicalStakingSubCanvas, currentHistoricalAnalytics);
    drawHistoricalSubChart(UI.historicalSubCanvas, currentHistoricalAnalytics);
  }
}

export function setFeeTier(tier: ExecutionFeeTier): void {
  state.feeTier = tier;
  const info = FEE_TIERS[tier] || FEE_TIERS.vip;
  state.roundtripFeePct = info.feePct;
  updateApp();
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
    if (isHistoricalModalOpen) {
      await loadAndRenderHistoricalData();
    }
  } finally {
    if (UI?.refreshIcon) UI.refreshIcon.classList.remove('animate-spin');
    if (UI?.refreshBtnLabel) UI.refreshBtnLabel.textContent = 'Sync Live Rates';
    updateApp();
  }
}

export function setAccountMode(mode: MarginMode): void {
  const currentVenue = getLatestMarketData().selectedVenue;
  if (mode === 'unified' && currentVenue === 'hyperliquid') {
    return;
  }
  state.mode = mode;
  if (mode === 'unified') {
    if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow cursor-pointer';
    if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer';
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
    if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow cursor-pointer';
    if (UI.modeUnifiedBtn) {
      if (currentVenue === 'hyperliquid') {
        UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-500 bg-slate-900 border border-slate-800 transition flex items-center gap-1.5 opacity-40 cursor-not-allowed pointer-events-none select-none';
      } else {
        UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer';
      }
    }
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
  updateStatisticalCarry((state as any).lookbackDays || 30);
  updateApp();
}

export function setTradedAsset(asset: TradedAsset): void {
  state.tradedAsset = asset;
  updateStatisticalCarry((state as any).lookbackDays || 30);
  currentHistoricalAsset = asset;
  const data = getLatestMarketData();

  if (state.fundingWindow !== 'custom') {
    const win = (state.fundingWindow === '7d' || state.fundingWindow === '30d' || state.fundingWindow === '90d') ? state.fundingWindow : 'live';
    applyHistoricalFunding(win);
  } else {
    updateApp();
  }

  if (state.mode === 'unified') {
    if (asset === 'SOL') {
      applyCollateralPreset('jitosol_85');
      return;
    } else if (asset === 'BTC') {
      applyCollateralPreset('fbtc_90');
      return;
    } else {
      applyCollateralPreset('wsteth_90');
      return;
    }
  } else {
    if (asset === 'BTC') {
      const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
      state.stakingAPY = state.isLiveStaking ? (data.btcLst[state.btcVariant]?.stakingAPY ?? btcMeta.stakingAPY) : btcMeta.stakingAPY;
      if (UI.boxIsolatedBtcLst) UI.boxIsolatedBtcLst.classList.remove('hidden');
    } else {
      if (UI.boxIsolatedBtcLst) UI.boxIsolatedBtcLst.classList.add('hidden');
      if (asset === 'SOL') {
        const solVal = state.solYieldType === 'nominal' ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8);
        state.stakingAPY = state.isLiveStaking ? solVal : (state.solYieldType === 'nominal' ? 7.2 : 1.8);
      } else {
        state.stakingAPY = state.isLiveStaking ? data.ETH.stakingAPY : 3.2;
      }
    }
    if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
    if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
  }

  // Update isolated buttons styling
  const isoBtns = {
    ETH: UI.isoBtnEth,
    BTC: UI.isoBtnBtc,
    SOL: UI.isoBtnSol
  };
  (Object.keys(isoBtns) as TradedAsset[]).forEach(k => {
    const btn = isoBtns[k];
    if (btn) {
      if (k === asset) {
        btn.className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
      } else {
        btn.className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
      }
    }
  });

  if (isHistoricalModalOpen) {
    loadAndRenderHistoricalData();
  }

  updateApp();
}

export function setBtcVariant(variant: BtcVariant): void {
  state.btcVariant = variant;
  const meta = BTC_LST_VARIANTS[variant] || BTC_LST_VARIANTS.lbtc;
  const data = getLatestMarketData();

  if (state.isLiveStaking) {
    if (variant === 'lbtc') state.stakingAPY = data.btcLst.lbtc.stakingAPY;
    else if (variant === 'solvbtc') state.stakingAPY = data.btcLst.solvbtc.stakingAPY;
    else state.stakingAPY = 0.0;
  } else {
    state.stakingAPY = meta.stakingAPY;
  }

  if (UI.labelBtcLstMode) UI.labelBtcLstMode.textContent = meta.name;
  if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
  if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';

  const btcBtns = {
    native: UI.btnBtcNative,
    lbtc: UI.btnBtcLbtc,
    solvbtc: UI.btnBtcSolvbtc
  };
  (Object.keys(btcBtns) as BtcVariant[]).forEach(k => {
    const btn = btcBtns[k];
    if (btn) {
      if (k === variant) {
        btn.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
      } else {
        btn.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
      }
    }
  });

  updateStatisticalCarry((state as any).lookbackDays || 30);
  updateApp();
}

export function applyCollateralPreset(presetKey: CollateralPresetKey): void {
  const p = COLLATERAL_PRESETS[presetKey];
  if (!p) return;

  state.activePreset = presetKey;
  state.collateralRatio = p.collateralRatio;
  state.tradedAsset = p.defaultAsset;

  if (state.isLiveStaking) {
    applyLiveStaking();
  } else {
    state.stakingAPY = p.stakingAPY;
    if (UI?.inputStaking) UI.inputStaking.value = p.stakingAPY.toString();
    if (UI?.valStaking) UI.valStaking.textContent = p.stakingAPY.toFixed(1) + '% APY';
  }

  // Update Preset Cards highlight
  const presetBtns: Record<CollateralPresetKey, HTMLElement | null> = {
    wsteth_90: document.getElementById('btn-preset-wsteth') || document.getElementById('btn-preset-90'),
    fbtc_90: document.getElementById('btn-preset-fbtc'),
    jitosol_85: document.getElementById('btn-preset-jitosol') || document.getElementById('btn-preset-85'),
    sanctum_inf_85: document.getElementById('btn-preset-sanctum'),
    btc_eth_95: document.getElementById('btn-preset-95'),
    inverse_100: document.getElementById('btn-preset-100'),
    sol_lrt_85: document.getElementById('btn-preset-85')
  };

  (Object.keys(presetBtns) as CollateralPresetKey[]).forEach(k => {
    const el = presetBtns[k];
    if (el) {
      if (k === presetKey) {
        el.className = 'preset-choice p-2 rounded-lg bg-cyan-950/80 border border-cyan-500 text-left transition cursor-pointer select-none';
      } else {
        el.className = 'preset-choice p-2 rounded-lg bg-brand-dark hover:bg-slate-800 border border-brand-border text-left transition cursor-pointer select-none';
      }
    }
  });

  if (UI.valCollateralRatio) {
    UI.valCollateralRatio.textContent = (p.collateralRatio * 100).toFixed(0) + '%';
  }
  if (UI.collateralRatioExplainer) {
    UI.collateralRatioExplainer.textContent = p.getExplainer ? p.getExplainer(state.solYieldType) : (p.explainer ?? '');
  }

  if (isHistoricalModalOpen) {
    loadAndRenderHistoricalData();
  }

  updateStatisticalCarry((state as any).lookbackDays || 30);
  updateApp();
}

export function setSolYieldType(yieldType: SolYieldType): void {
  state.solYieldType = yieldType;
  const data = getLatestMarketData();

  if (UI.btnSolNominal && UI.btnSolReal) {
    if (yieldType === 'real') {
      UI.btnSolReal.className = 'px-1.5 py-0.5 rounded font-bold transition bg-amber-950 text-amber-300 border border-amber-700 shadow-sm';
      UI.btnSolNominal.className = 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white';
    } else {
      UI.btnSolNominal.className = 'px-1.5 py-0.5 rounded font-bold transition bg-amber-950 text-amber-300 border border-amber-700 shadow-sm';
      UI.btnSolReal.className = 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white';
    }
  }

  if (state.tradedAsset === 'SOL' || state.activePreset === 'jitosol_85' || state.activePreset === 'sol_lrt_85' || state.activePreset === 'sanctum_inf_85') {
    if (state.isLiveStaking) {
      applyLiveStaking();
    } else {
      const val = yieldType === 'nominal' ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8);
      state.stakingAPY = val;
      if (UI.inputStaking) UI.inputStaking.value = val.toString();
      if (UI.valStaking) UI.valStaking.textContent = val.toFixed(1) + '% APY';
    }
  }

  if (isHistoricalModalOpen) {
    loadAndRenderHistoricalData();
  }

  updateStatisticalCarry((state as any).lookbackDays || 30);
  updateApp();
}

export function setPriceChange(pct: number): void {
  state.priceMove = pct;
  state.activeCrisisScenario = null;
  if (UI.inputPriceMove) UI.inputPriceMove.value = pct.toString();
  if (UI.valPriceMove) UI.valPriceMove.textContent = fmtPct(pct);
  updateApp();
}

export function setDays(days: number): void {
  state.days = days;
  if (UI.inputDays) UI.inputDays.value = days.toString();
  if (UI.valDays) UI.valDays.textContent = `${days} Days`;
  updateApp();
}

export function setSplit(splitSpot: number): void {
  state.splitSpot = splitSpot;
  if (UI.inputSplit) UI.inputSplit.value = splitSpot.toString();
  if (UI.valSplit) UI.valSplit.textContent = `${splitSpot}% Spot / ${100 - splitSpot}% Margin`;

  const s = splitSpot / 100;
  const effLeverage = (1 / (1 - s)).toFixed(2);
  const rLiqPct = (((1 - s) / s - state.mmr) / (1 + state.mmr)) * 100;

  if (UI.splitHelperText) {
    UI.splitHelperText.textContent = `Effective Short Leverage: ${effLeverage}x (Liquidation buffer: +${rLiqPct.toFixed(1)}%)`;
  }

  updateApp();
}

export function applyCrisisScenario(key: CrisisScenarioKey): void {
  const scenario = CRISIS_SCENARIOS[key];
  if (!scenario) return;

  state.activeCrisisScenario = key;
  state.priceMove = scenario.priceMove;
  state.fundingAPR = scenario.fundingAPR;
  state.isLiveFunding = false;
  state.fundingWindow = 'custom';
  state.depegPct = scenario.depegPct;

  if (scenario.lockedHorizonDays) {
    state.days = scenario.lockedHorizonDays;
    if (UI?.inputDays) UI.inputDays.value = scenario.lockedHorizonDays.toString();
    if (UI?.valDays) UI.valDays.textContent = `${scenario.lockedHorizonDays} Days`;
  }

  if (scenario.collateralRatio !== undefined) {
    state.collateralRatio = scenario.collateralRatio;
    if (UI?.valCollateralRatio) {
      UI.valCollateralRatio.textContent = (scenario.collateralRatio * 100).toFixed(0) + '%';
    }
    if (UI?.collateralRatioExplainer) {
      UI.collateralRatioExplainer.textContent = `Exchange slashed collateral valuation to ${(scenario.collateralRatio * 100).toFixed(0)}% (${((1 - scenario.collateralRatio) * 100).toFixed(0)}% Haircut) in emergency de-risking.`;
    }
  }

  // Update DOM inputs to match scenario parameters
  if (UI?.inputPriceMove) UI.inputPriceMove.value = scenario.priceMove.toString();
  if (UI?.valPriceMove) UI.valPriceMove.textContent = fmtPct(scenario.priceMove);

  if (UI?.inputFunding) UI.inputFunding.value = scenario.fundingAPR.toString();
  if (UI?.valFunding) {
    UI.valFunding.textContent = fmtPct(scenario.fundingAPR) + ' APR';
    UI.valFunding.className = `font-mono font-bold ${scenario.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }

  if (UI?.inputDepeg) UI.inputDepeg.value = scenario.depegPct.toString();
  if (UI?.valDepeg) UI.valDepeg.textContent = `${scenario.depegPct.toFixed(1)}% Discount`;

  updateApp();
}

export function restoreLiveMarketFeeds(): void {
  state.activeCrisisScenario = null;
  state.priceMove = 0;
  if (UI?.sliderLockBadge) UI.sliderLockBadge.classList.add('hidden');
  if (UI?.crisisTrajectoryContainer) UI.crisisTrajectoryContainer.classList.add('hidden');
  currentCrisisResult = null;
  if (UI?.inputPriceMove) UI.inputPriceMove.value = '0';
  if (UI?.valPriceMove) UI.valPriceMove.textContent = '+0.0%';

  // Restore preset collateral ratio if it was modified
  if (state.mode === 'unified') {
    const p = COLLATERAL_PRESETS[state.activePreset];
    if (p) {
      state.collateralRatio = p.collateralRatio;
      if (UI?.valCollateralRatio) {
        UI.valCollateralRatio.textContent = (p.collateralRatio * 100).toFixed(0) + '%';
      }
      if (UI?.collateralRatioExplainer) {
        UI.collateralRatioExplainer.textContent = p.getExplainer ? p.getExplainer(state.solYieldType) : (p.explainer ?? '');
      }
    }
  }

  applyLiveFunding();
  applyLiveStaking();
  applyLiveDepeg();
  updateApp();
}

export function resetDefaults(): void {
  state.priceMove = 0;
  state.days = 90;
  state.depegPct = 0.0;
  state.capital = 10000;
  state.splitSpot = 50;
  state.activeCrisisScenario = null;

  if (UI.inputPriceMove) UI.inputPriceMove.value = '0';
  if (UI.valPriceMove) UI.valPriceMove.textContent = '0.0%';
  if (UI.inputDays) UI.inputDays.value = '90';
  if (UI.valDays) UI.valDays.textContent = '90 Days';
  if (UI.inputDepeg) UI.inputDepeg.value = '0';
  if (UI.valDepeg) UI.valDepeg.textContent = '0.0% Discount';
  if (UI.inputCapital) UI.inputCapital.value = '10000';
  if (UI.valCapital) UI.valCapital.textContent = '$10,000';

  applyHistoricalFunding('live');
  applyHistoricalStaking('live');
  applyCollateralPreset('wsteth_90');
  setSplit(50);
  syncHyperliquidMarginLock(getLatestMarketData().selectedVenue);
  updateApp();
}

export function openTriadModal(): void {
  if (UI.crisisAuditModal) {
    UI.crisisAuditModal.addEventListener('click', (e) => {
      if (e.target === UI.crisisAuditModal) {
        closeCrisisAuditModal();
      }
    });
  }

  if (UI.triadModal) {
    UI.triadModal.classList.remove('hidden');
  }
}

export function closeTriadModal(): void {
  if (UI.triadModal) {
    UI.triadModal.classList.add('hidden');
  }
}


export function openCrisisAuditModal(): void {
  if (!UI?.crisisAuditModal) return;
  if (!currentCrisisResult && state.activeCrisisScenario) {
    currentCrisisResult = calculateCrisisSimulation(state.activeCrisisScenario, state);
  }
  if (!currentCrisisResult) return;

  if (UI.crisisAuditTitle) {
    UI.crisisAuditTitle.textContent = `${currentCrisisResult.scenarioTitle.toUpperCase()} - AUDIT LEDGER`;
  }
  if (UI.crisisAuditSubtitle) {
    UI.crisisAuditSubtitle.textContent = `Horizon: ${currentCrisisResult.horizonDays} Days | Status: ${currentCrisisResult.isLiquidated ? 'LIQUIDATED (Day ' + currentCrisisResult.tLiq + ')' : 'SOLVENT'} | Realized PnL: ${currentCrisisResult.netPnL.toFixed(2)}`;
  }
  renderCrisisAuditTable(UI.crisisAuditTableBody, currentCrisisResult);
  UI.crisisAuditModal.classList.remove('hidden');
}

export function closeCrisisAuditModal(): void {
  if (!UI?.crisisAuditModal) return;
  UI.crisisAuditModal.classList.add('hidden');
}

export function exportCrisisCsv(): void {
  if (!currentCrisisResult && state.activeCrisisScenario) {
    currentCrisisResult = calculateCrisisSimulation(state.activeCrisisScenario, state);
  }
  if (currentCrisisResult) {
    exportCrisisAuditCsv(currentCrisisResult);
  }
}

export async function updateStatisticalCarry(lookbackDays?: number): Promise<void> {
  const days = lookbackDays ?? (state as any).lookbackDays ?? 30;
  (state as any).lookbackDays = days;
  try {
    const asset = state.tradedAsset || 'ETH';
    const stats = await getCustomStatisticalCarry(asset, days, state.solYieldType);
    latestStatisticalCarry = stats;

    if (UI?.labelVolatilityDispersion) {
      UI.labelVolatilityDispersion.textContent = `Funding σ: ±${stats.funding.stdDev.toFixed(2)}% | Staking σ: ±${stats.staking.stdDev.toFixed(2)}%`;
    }
    if (UI?.labelRegimeConservativeVal) {
      UI.labelRegimeConservativeVal.textContent = `${stats.conservativeFundingApr >= 0 ? '+' : ''}${stats.conservativeFundingApr.toFixed(1)}% / ${stats.conservativeStakingApy.toFixed(1)}%`;
    }
    if (UI?.labelRegimeBaseVal) {
      UI.labelRegimeBaseVal.textContent = `${stats.baseFundingApr >= 0 ? '+' : ''}${stats.baseFundingApr.toFixed(1)}% / ${stats.baseStakingApy.toFixed(1)}%`;
    }
    if (UI?.labelRegimeBullVal) {
      UI.labelRegimeBullVal.textContent = `${stats.bullFundingApr >= 0 ? '+' : ''}${stats.bullFundingApr.toFixed(1)}% / ${stats.bullStakingApy.toFixed(1)}%`;
    }

    applyActiveRegimeRates();
  } catch {
    // fallback
  }
}

export function applyActiveRegimeRates(): void {
  if (!latestStatisticalCarry) return;
  const regime = (state as any).activeRegime || 'base';

  let baseStaking = latestStatisticalCarry.baseStakingApy;
  let conservativeStaking = latestStatisticalCarry.conservativeStakingApy;
  let bullStaking = latestStatisticalCarry.bullStakingApy;

  // Adapt staking dispersion for specific collateral presets
  if (state.mode === 'unified') {
    if (state.activePreset === 'inverse_100') {
      baseStaking = 0.0;
      conservativeStaking = 0.0;
      bullStaking = 0.0;
    } else if (state.activePreset === 'fbtc_90') {
      baseStaking = 3.0;
      conservativeStaking = Math.max(0.1, parseFloat((3.0 - 2 * (latestStatisticalCarry.staking.stdDev || 0.15)).toFixed(2)));
      bullStaking = parseFloat((3.0 + 2 * (latestStatisticalCarry.staking.stdDev || 0.15)).toFixed(2));
    } else if (state.activePreset === 'sanctum_inf_85') {
      const sBase = state.solYieldType === 'nominal' ? 8.5 : 3.1;
      baseStaking = sBase;
      conservativeStaking = Math.max(0.1, parseFloat((sBase - 2 * (latestStatisticalCarry.staking.stdDev || 0.25)).toFixed(2)));
      bullStaking = parseFloat((sBase + 2 * (latestStatisticalCarry.staking.stdDev || 0.25)).toFixed(2));
    }
  } else if (state.tradedAsset === 'BTC') {
    if (state.btcVariant === 'native') {
      baseStaking = 0.0;
      conservativeStaking = 0.0;
      bullStaking = 0.0;
    }
  }

  // Update button label values
  if (UI?.labelRegimeConservativeVal) {
    UI.labelRegimeConservativeVal.textContent = `${latestStatisticalCarry.conservativeFundingApr >= 0 ? '+' : ''}${latestStatisticalCarry.conservativeFundingApr.toFixed(1)}% / ${conservativeStaking.toFixed(1)}%`;
  }
  if (UI?.labelRegimeBaseVal) {
    UI.labelRegimeBaseVal.textContent = `${latestStatisticalCarry.baseFundingApr >= 0 ? '+' : ''}${latestStatisticalCarry.baseFundingApr.toFixed(1)}% / ${baseStaking.toFixed(1)}%`;
  }
  if (UI?.labelRegimeBullVal) {
    UI.labelRegimeBullVal.textContent = `${latestStatisticalCarry.bullFundingApr >= 0 ? '+' : ''}${latestStatisticalCarry.bullFundingApr.toFixed(1)}% / ${bullStaking.toFixed(1)}%`;
  }

  if (regime === 'conservative') {
    state.fundingAPR = latestStatisticalCarry.conservativeFundingApr;
    state.stakingAPY = conservativeStaking;
  } else if (regime === 'bull') {
    state.fundingAPR = latestStatisticalCarry.bullFundingApr;
    state.stakingAPY = bullStaking;
  } else {
    state.fundingAPR = latestStatisticalCarry.baseFundingApr;
    state.stakingAPY = baseStaking;
  }

  state.isLiveFunding = false;
  state.isLiveStaking = false;
  (state as any).fundingWindow = 'custom';
  (state as any).stakingWindow = 'custom';

  if (UI?.inputFunding) UI.inputFunding.value = state.fundingAPR.toString();
  if (UI?.valFunding) {
    UI.valFunding.textContent = fmtPct(state.fundingAPR) + ' APR';
    UI.valFunding.className = `font-mono font-bold ${state.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI?.inputStaking) UI.inputStaking.value = state.stakingAPY.toString();
  if (UI?.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';

  renderRegimeButtonStyles();
  updateApp();
}

export function renderRegimeButtonStyles(): void {
  const regime = (state as any).activeRegime || 'base';
  const baseInactive = 'py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition text-left font-mono cursor-pointer flex flex-col group';

  if (UI?.btnRegimeConservative) {
    UI.btnRegimeConservative.className = regime === 'conservative'
      ? 'py-1.5 px-2 rounded-lg bg-amber-950/80 border-amber-500 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/50 transition text-left font-mono cursor-pointer flex flex-col group'
      : baseInactive;
  }
  if (UI?.btnRegimeBase) {
    UI.btnRegimeBase.className = regime === 'base'
      ? 'py-1.5 px-2 rounded-lg bg-cyan-950/90 border-cyan-500 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-400/50 transition text-left font-mono cursor-pointer flex flex-col group'
      : baseInactive;
  }
  if (UI?.btnRegimeBull) {
    UI.btnRegimeBull.className = regime === 'bull'
      ? 'py-1.5 px-2 rounded-lg bg-purple-950/80 border-purple-500 shadow-lg shadow-purple-950/30 ring-1 ring-purple-400/50 transition text-left font-mono cursor-pointer flex flex-col group'
      : baseInactive;
  }
}

export function setRegime(regime: 'conservative' | 'base' | 'bull'): void {
  (state as any).activeRegime = regime;
  applyActiveRegimeRates();
}

export function setLookback(days: number): void {
  (state as any).lookbackDays = days;
  if (UI?.inputLookbackDays) UI.inputLookbackDays.value = days.toString();
  if (UI?.valLookbackDays) UI.valLookbackDays.textContent = `${days} Days`;
  updateStatisticalCarry(days);
}

function init() {
  UI = getUIElements();

  setupEventDelegation({
    setAccountMode,
    setTradedAsset,
    setBtcVariant,
    applyCollateralPreset,
    setSolYieldType,
    setPriceChange,
    setDays,
    setSplit,
    resetDefaults,
    openTriadModal,
    closeTriadModal,
    applyLiveFunding,
    applyLiveStaking,
    applyHistoricalFunding,
    applyHistoricalStaking,
    applyHistoricalWindowToAll,
    applyLiveDepeg,
    setDepeg,
    openHistoricalModal,
    closeHistoricalModal,
    setHistoricalAsset,
    setHistoricalTimeframe,
    setFundingVenue,
    refreshLiveRates,
    setFeeTier,
    applyCrisisScenario,
    restoreLiveMarketFeeds,
    openCrisisAuditModal,
    closeCrisisAuditModal,
    exportCrisisAuditCsv: exportCrisisCsv,
    setRegime,
    setLookback
  });
  bindSliderListeners(UI, state, updateApp, (days) => setLookback(days));
  setupChartInteractions(UI.canvas, UI, () => state, getConfidenceStats);

  if (UI.canvas && UI.canvas.parentElement) {
    const ro = new ResizeObserver(() => {
      updateApp();
      if (isHistoricalModalOpen && currentHistoricalAnalytics) {
        const venue = getLatestMarketData().selectedVenue;
        drawHistoricalChart(UI.historicalCanvas, currentHistoricalAnalytics, venue);
        drawHistoricalStakingSubChart(UI.historicalStakingSubCanvas, currentHistoricalAnalytics);
        drawHistoricalSubChart(UI.historicalSubCanvas, currentHistoricalAnalytics);
      }
    });
    ro.observe(UI.canvas.parentElement);
  }

  // Setup Triad Modal backdrop dismiss
  if (UI.triadModal) {
    UI.triadModal.addEventListener('click', (e) => {
      if (e.target === UI.triadModal) {
        closeTriadModal();
      }
    });
  }

  // Setup Historical Modal backdrop dismiss
  if (UI.historicalModal) {
    UI.historicalModal.addEventListener('click', (e) => {
      if (e.target === UI.historicalModal) {
        closeHistoricalModal();
      }
    });
  }

  // Synchronized Historical Chart & Sub-Chart Canvas Hover interactions
  const handleHistoricalHover = (point: any, index: number | null, mouseX: number, mouseY: number) => {
    const venue = getLatestMarketData().selectedVenue;
    drawHistoricalChart(UI.historicalCanvas, currentHistoricalAnalytics, venue, index);
    drawHistoricalStakingSubChart(UI.historicalStakingSubCanvas, currentHistoricalAnalytics, index);
    drawHistoricalSubChart(UI.historicalSubCanvas, currentHistoricalAnalytics, index);
    updateHistoricalTooltip(UI, point, mouseX, mouseY);
  };

  setupHistoricalChartInteractions(
    [UI.historicalCanvas, UI.historicalStakingSubCanvas, UI.historicalSubCanvas],
    () => currentHistoricalAnalytics?.series ?? null,
    handleHistoricalHover
  );

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTriadModal();
      closeHistoricalModal();
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
    if (UI) renderHistoricalPills(UI, state, snapshot);
    if (isHistoricalModalOpen && currentHistoricalAnalytics) {
      drawHistoricalChart(UI.historicalCanvas, currentHistoricalAnalytics, snapshot.selectedVenue);
      drawHistoricalStakingSubChart(UI.historicalStakingSubCanvas, currentHistoricalAnalytics);
      drawHistoricalSubChart(UI.historicalSubCanvas, currentHistoricalAnalytics);
    }
  });

  // Start periodic 60s background polling
  startAutoRefresh(60000);

  applyCollateralPreset('wsteth_90');
  setSplit(50);
  updateStatisticalCarry(30);
  updateApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
