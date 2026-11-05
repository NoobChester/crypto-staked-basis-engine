/**
 * @file events.ts
 * @description Declarative event delegation handler for [data-action] elements and slider input bindings.
 * Eliminates all inline HTML onclick attributes and global window.* pollution.
 */

import { fmtUSD, fmtPct, type HedgingState } from '../math/hedging.js';
import type { UIElements } from './dom.js';
import type { MarginMode, TradedAsset, BtcVariant, CollateralPresetKey, SolYieldType } from '../config/presets.js';
import type { FundingVenue, ExecutionFeeTier } from '../services/marketData.js';
import type { CrisisScenarioKey } from '../config/scenarios.js';

export interface AppActions {
  setAccountMode: (mode: MarginMode) => void;
  setTradedAsset: (asset: TradedAsset) => void;
  setBtcVariant: (variant: BtcVariant) => void;
  applyCollateralPreset: (presetKey: CollateralPresetKey) => void;
  setSolYieldType: (yieldType: SolYieldType) => void;
  setPriceChange: (pct: number) => void;
  setDays: (days: number) => void;
  setSplit: (splitSpot: number) => void;
  resetDefaults: () => void;
  openTriadModal: () => void;
  closeTriadModal: () => void;
  applyLiveFunding: () => void;
  applyLiveStaking: () => void;
  applyHistoricalFunding: (window: 'live' | '7d' | '30d' | '90d') => void;
  applyHistoricalStaking: (window: 'live' | '7d' | '30d' | '90d') => void;
  applyHistoricalWindowToAll: (window: '30d' | '90d') => void;
  applyLiveDepeg: () => void;
  setDepeg: (pct: number) => void;
  openHistoricalModal: () => void;
  closeHistoricalModal: () => void;
  setHistoricalAsset: (asset: TradedAsset) => void;
  setHistoricalTimeframe: (tf: 30 | 90 | 180) => void;
  setFundingVenue: (venue: FundingVenue) => void;
  refreshLiveRates: () => void;
  setFeeTier?: (tier: ExecutionFeeTier) => void;
  applyCrisisScenario?: (key: CrisisScenarioKey) => void;
  restoreLiveMarketFeeds?: () => void;
  openCrisisAuditModal?: () => void;
  closeCrisisAuditModal?: () => void;
  exportCrisisAuditCsv?: () => void;
  setRegime?: (regime: 'conservative' | 'base' | 'bull') => void;
  setLookback?: (days: number) => void;
  openRateLabModal?: () => void;
  setForwardEngine?: (engine: 'sqmc' | 'dated_basis') => void;
  setView?: (view: 'terminal' | 'stress-lab' | 'backtest') => void;
  setStressCapital?: (capital: number) => void;
  setStressMode?: (mode: MarginMode) => void;
  setStressAsset?: (asset: TradedAsset) => void;
  setBacktestAsset?: (asset: TradedAsset) => void;
  setBacktestCapital?: (capital: number) => void;
  setBacktestMode?: (mode: MarginMode) => void;
  setBacktestEpoch?: (epoch: string) => void;
  setBacktestDates?: (startDate: string, endDate: string) => void;
  exportBacktestCsv?: () => void;
}

export function setupEventDelegation(actions: AppActions): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
    if (!target) return;

    const action = target.getAttribute('data-action');
    if (!action) return;

    switch (action) {
      case 'set-mode': {
        const mode = target.getAttribute('data-mode') as MarginMode;
        if (mode) actions.setAccountMode(mode);
        break;
      }
      case 'set-venue': {
        const venue = target.getAttribute('data-venue') as FundingVenue;
        if (venue) actions.setFundingVenue(venue);
        break;
      }
      case 'open-historical-modal':
        actions.openHistoricalModal();
        break;
      case 'close-historical-modal':
        actions.closeHistoricalModal();
        break;
      case 'open-rate-lab':
        actions.openRateLabModal?.();
        break;
      case 'set-forward-engine': {
        const engine = target.getAttribute('data-engine') as 'sqmc' | 'dated_basis';
        if (engine && actions.setForwardEngine) actions.setForwardEngine(engine);
        break;
      }
      case 'refresh-live-rates':
        actions.refreshLiveRates();
        break;
      case 'set-price-change': {
        const pct = parseFloat(target.getAttribute('data-pct') || '0');
        actions.setPriceChange(pct);
        break;
      }
      case 'set-traded-asset': {
        const asset = target.getAttribute('data-asset') as TradedAsset;
        if (asset) actions.setTradedAsset(asset);
        break;
      }
      case 'open-triad-modal':
        actions.openTriadModal();
        break;
      case 'close-triad-modal':
        actions.closeTriadModal();
        break;
      case 'reset-defaults':
        actions.resetDefaults();
        break;
      case 'apply-collateral-preset': {
        const preset = target.getAttribute('data-preset') as CollateralPresetKey;
        if (preset) actions.applyCollateralPreset(preset);
        break;
      }
      case 'set-sol-yield': {
        e.stopPropagation();
        const yType = target.getAttribute('data-yield') as SolYieldType;
        if (yType) actions.setSolYieldType(yType);
        break;
      }
      case 'set-btc-variant': {
        const v = target.getAttribute('data-variant') as BtcVariant;
        if (v) actions.setBtcVariant(v);
        break;
      }
      case 'set-split': {
        const split = parseInt(target.getAttribute('data-split') || '50', 10);
        actions.setSplit(split);
        break;
      }
      case 'set-days': {
        const days = parseInt(target.getAttribute('data-days') || '90', 10);
        actions.setDays(days);
        break;
      }
      case 'apply-historical-staking': {
        const win = (target.getAttribute('data-window') || 'live') as 'live' | '7d' | '30d' | '90d';
        actions.applyHistoricalStaking(win);
        break;
      }
      case 'apply-historical-funding': {
        const win = (target.getAttribute('data-window') || 'live') as 'live' | '7d' | '30d' | '90d';
        actions.applyHistoricalFunding(win);
        break;
      }
      case 'apply-live-depeg':
        actions.applyLiveDepeg();
        break;
      case 'set-depeg': {
        const pct = parseFloat(target.getAttribute('data-pct') || '0');
        actions.setDepeg(pct);
        break;
      }
      case 'set-historical-asset': {
        const asset = target.getAttribute('data-asset') as TradedAsset;
        if (asset) actions.setHistoricalAsset(asset);
        break;
      }
      case 'set-fee-tier': {
        const tier = target.getAttribute('data-tier') as ExecutionFeeTier;
        if (tier && actions.setFeeTier) actions.setFeeTier(tier);
        break;
      }
      case 'set-historical-timeframe': {
        const tf = parseInt(target.getAttribute('data-tf') || '90', 10) as 30 | 90 | 180;
        actions.setHistoricalTimeframe(tf);
        break;
      }
      case 'apply-historical-window-to-all': {
        const win = (target.getAttribute('data-window') || '30d') as '30d' | '90d';
        actions.applyHistoricalWindowToAll(win);
        break;
      }
      case 'apply-crisis-scenario': {
        const scenarioKey = target.getAttribute('data-scenario') as CrisisScenarioKey;
        if (scenarioKey && actions.applyCrisisScenario) {
          actions.applyCrisisScenario(scenarioKey);
        }
        break;
      }
            case 'restore-live-feeds': {
        if (actions.restoreLiveMarketFeeds) {
          actions.restoreLiveMarketFeeds();
        }
        break;
      }
            case 'set-regime': {
        const regime = target.getAttribute('data-regime') as 'conservative' | 'base' | 'bull';
        if (regime && actions.setRegime) actions.setRegime(regime);
        break;
      }
      case 'set-lookback': {
        const days = parseInt(target.getAttribute('data-days') || '30', 10);
        if (actions.setLookback) actions.setLookback(days);
        break;
      }
      case 'open-crisis-audit-modal': {
        actions.openCrisisAuditModal?.();
        break;
      }
      case 'close-crisis-audit-modal': {
        actions.closeCrisisAuditModal?.();
        break;
      }
      case 'export-crisis-csv': {
        actions.exportCrisisAuditCsv?.();
        break;
      }
      case 'set-view': {
        const view = target.getAttribute('data-view') as 'terminal' | 'stress-lab' | 'backtest';
        if (view && actions.setView) actions.setView(view);
        break;
      }
      case 'navigate-to-stress-lab': {
        if (actions.setView) actions.setView('stress-lab');
        break;
      }
      case 'set-stress-capital': {
        const cap = parseFloat(target.getAttribute('data-capital') || '10000');
        if (actions.setStressCapital) actions.setStressCapital(cap);
        break;
      }
      case 'set-stress-mode': {
        const mode = target.getAttribute('data-mode') as MarginMode;
        if (mode && actions.setStressMode) actions.setStressMode(mode);
        break;
      }
      case 'set-stress-asset': {
        const asset = target.getAttribute('data-asset') as TradedAsset;
        if (asset && actions.setStressAsset) actions.setStressAsset(asset);
        break;
      }
      case 'set-backtest-asset': {
        const asset = target.getAttribute('data-asset') as TradedAsset;
        if (asset && actions.setBacktestAsset) actions.setBacktestAsset(asset);
        break;
      }
      case 'set-backtest-mode': {
        const mode = target.getAttribute('data-mode') as MarginMode;
        if (mode && actions.setBacktestMode) actions.setBacktestMode(mode);
        break;
      }
      case 'set-backtest-epoch': {
        const epoch = target.getAttribute('data-epoch');
        if (epoch && actions.setBacktestEpoch) actions.setBacktestEpoch(epoch);
        break;
      }
      case 'apply-backtest-dates': {
        const startEl = document.getElementById('backtest-start-date') as HTMLInputElement | null;
        const endEl = document.getElementById('backtest-end-date') as HTMLInputElement | null;
        if (startEl && endEl && actions.setBacktestDates) {
          actions.setBacktestDates(startEl.value, endEl.value);
        }
        break;
      }
      case 'export-backtest-csv': {
        actions.exportBacktestCsv?.();
        break;
      }
    }
  });
}

export function bindSliderListeners(
  UI: UIElements,
  state: HedgingState,
  onUpdate: () => void,
  onLookback?: (days: number) => void,
  onStressCapital?: (capital: number) => void,
  onBacktestCapital?: (capital: number) => void
): void {
  if (UI.inputPriceMove) {
    UI.inputPriceMove.addEventListener('input', (e) => {
      state.priceMove = parseFloat((e.target as HTMLInputElement).value);
      (state as any).activeCrisisScenario = null;
      if (UI.valPriceMove) UI.valPriceMove.textContent = fmtPct(state.priceMove);
      onUpdate();
    });
  }

  if (UI.inputCapital) {
    UI.inputCapital.addEventListener('input', (e) => {
      const val = Math.max(100, parseFloat((e.target as HTMLInputElement).value) || 1000);
      state.capital = val;
      if (UI.valCapital) UI.valCapital.textContent = fmtUSD(val);
      onUpdate();
    });
  }

  if (UI.inputDays) {
    UI.inputDays.addEventListener('input', (e) => {
      state.days = parseInt((e.target as HTMLInputElement).value);
      if (UI.valDays) UI.valDays.textContent = `${state.days} Day${state.days === 1 ? '' : 's'}`;
      onUpdate();
    });
  }

  if (UI.inputFunding) {
    UI.inputFunding.addEventListener('input', (e) => {
      state.fundingAPR = parseFloat((e.target as HTMLInputElement).value);
      state.isLiveFunding = false;
      (state as any).fundingWindow = 'custom';
      (state as any).activeCrisisScenario = null;
      if (UI.valFunding) {
        UI.valFunding.textContent = fmtPct(state.fundingAPR) + ' APR';
        UI.valFunding.className = `font-mono font-bold ${state.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      }
      onUpdate();
    });
  }

  if (UI.inputStaking) {
    UI.inputStaking.addEventListener('input', (e) => {
      state.stakingAPY = parseFloat((e.target as HTMLInputElement).value);
      state.isLiveStaking = false;
      (state as any).stakingWindow = 'custom';
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
      onUpdate();
    });
  }

  if (UI.inputDepeg) {
    UI.inputDepeg.addEventListener('input', (e) => {
      state.depegPct = parseFloat((e.target as HTMLInputElement).value);
      (state as any).activeCrisisScenario = null;
      if (UI.valDepeg) UI.valDepeg.textContent = state.depegPct.toFixed(1) + '% Discount';
      onUpdate();
    });
  }

  if (UI.inputSplit) {
    UI.inputSplit.addEventListener('input', (e) => {
      const spotPct = parseInt((e.target as HTMLInputElement).value);
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
  if (UI.inputLookbackDays) {
    UI.inputLookbackDays.addEventListener('input', (e) => {
      const days = parseInt((e.target as HTMLInputElement).value, 10);
      if (UI.valLookbackDays) UI.valLookbackDays.textContent = `${days} Days`;
      if (onLookback) onLookback(days);
    });
  }
  if (UI.stressInputCapital) {
    UI.stressInputCapital.addEventListener('input', (e) => {
      const val = Math.max(100, parseFloat((e.target as HTMLInputElement).value) || 1000);
      if (onStressCapital) onStressCapital(val);
    });
  }
  if (UI.backtestInputCapital) {
    let backtestCapTimer: ReturnType<typeof setTimeout> | null = null;
    UI.backtestInputCapital.addEventListener('input', (e) => {
      const val = Math.max(100, parseFloat((e.target as HTMLInputElement).value) || 1000);
      if (backtestCapTimer) clearTimeout(backtestCapTimer);
      backtestCapTimer = setTimeout(() => {
        if (onBacktestCapital) onBacktestCapital(val);
      }, 150);
    });
  }
}
