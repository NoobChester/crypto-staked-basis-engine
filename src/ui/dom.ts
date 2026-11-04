/**
 * @file dom.ts
 * @description DOM element caching, UI event listeners, and reactive component renderers.
 */

import { fmtUSD, fmtPct, type HedgingState, type HedgingOutcome } from '../math/hedging.js';
import { getInstrumentDetails } from '../config/presets.js';
import {
  getLatestMarketData,
  type AssetHistoricalAnalytics,
  type HistoricalRatePoint,
  type MarketDataSnapshot,
  type FundingVenue
} from '../services/marketData.js';

export interface UIElements {
  modeUnifiedBtn: HTMLElement | null;
  modeIsolatedBtn: HTMLElement | null;
  panelUnifiedPresets: HTMLElement | null;
  panelIsolatedSplit: HTMLElement | null;
  valCollateralRatio: HTMLElement | null;
  collateralRatioExplainer: HTMLElement | null;
  jitosolToggleBox: HTMLElement | null;
  labelSolYieldMode: HTMLElement | null;
  btnSolNominal: HTMLElement | null;
  btnSolReal: HTMLElement | null;
  boxIsolatedBtcLst: HTMLElement | null;
  labelBtcLstMode: HTMLElement | null;
  btnBtcNative: HTMLElement | null;
  btnBtcLbtc: HTMLElement | null;
  btnBtcSolvbtc: HTMLElement | null;
  isoBtnEth: HTMLElement | null;
  isoBtnBtc: HTMLElement | null;
  isoBtnSol: HTMLElement | null;
  instCollateralNoteText: HTMLElement | null;
  inputPriceMove: HTMLInputElement | null;
  valPriceMove: HTMLElement | null;
  inputCapital: HTMLInputElement | null;
  valCapital: HTMLElement | null;
  inputDays: HTMLInputElement | null;
  valDays: HTMLElement | null;
  inputFunding: HTMLInputElement | null;
  valFunding: HTMLElement | null;
  inputStaking: HTMLInputElement | null;
  valStaking: HTMLElement | null;
  inputDepeg: HTMLInputElement | null;
  valDepeg: HTMLElement | null;
  inputSplit: HTMLInputElement | null;
  valSplit: HTMLElement | null;
  splitHelperText: HTMLElement | null;
  instPairBadge: HTMLElement | null;
  chartInstrumentsBadge: HTMLElement | null;
  assetBtnEth: HTMLElement | null;
  assetBtnBtc: HTMLElement | null;
  assetBtnSol: HTMLElement | null;
  instSpotSymbol: HTMLElement | null;
  instSpotDesc: HTMLElement | null;
  instSpotTag: HTMLElement | null;
  instSpotYield: HTMLElement | null;
  instSpotAmount: HTMLElement | null;
  instPerpSymbol: HTMLElement | null;
  instPerpDesc: HTMLElement | null;
  instPerpTag: HTMLElement | null;
  instPerpRate: HTMLElement | null;
  instPerpAmount: HTMLElement | null;
  instMarginDesc: HTMLElement | null;
  labelSpotCollat: HTMLElement | null;
  kpiDeltaSub: HTMLElement | null;
  kpiNetValue: HTMLElement | null;
  kpiRoi: HTMLElement | null;
  kpiStartingCap: HTMLElement | null;
  kpiTotalApy: HTMLElement | null;
  kpiApyMode: HTMLElement | null;
  kpiSpotApyContrib: HTMLElement | null;
  kpiPerpApyContrib: HTMLElement | null;
  kpiLiqDistance: HTMLElement | null;
  kpiLiqStatus: HTMLElement | null;
  kpiLiqThresholdLabel: HTMLElement | null;
  kpiAccruedYield: HTMLElement | null;
  kpiHorizonTag: HTMLElement | null;
  kpiFundingCash: HTMLElement | null;
  kpiStakingCash: HTMLElement | null;
  kpiDelta: HTMLElement | null;
  kpiDeltaTag: HTMLElement | null;
  breakdownSpotVal: HTMLElement | null;
  breakdownSpotPnl: HTMLElement | null;
  labelShortCollat: HTMLElement | null;
  breakdownShortVal: HTMLElement | null;
  breakdownShortPnl: HTMLElement | null;
  breakdownFunding: HTMLElement | null;
  breakdownFundingRate: HTMLElement | null;
  breakdownStaking: HTMLElement | null;
  breakdownStakingRate: HTMLElement | null;
  breakdownDepeg: HTMLElement | null;
  breakdownDepegPct: HTMLElement | null;
  breakdownNetPnl: HTMLElement | null;
  breakdownNetRoi: HTMLElement | null;
  stateBadge: HTMLElement | null;
  liqBanner: HTMLElement | null;
  alertLiqTrigger: HTMLElement | null;
  canvas: HTMLCanvasElement | null;
  chartSubCaption: HTMLElement | null;
  tooltip: HTMLElement | null;
  ttPrice: HTMLElement | null;
  ttVal: HTMLElement | null;
  ttRoi: HTMLElement | null;
  ttStatus: HTMLElement | null;
  triadModal: HTMLElement | null;
  btnTriadInfo: HTMLElement | null;
  btnTriadClose: HTMLElement | null;
  btnTriadCloseFooter: HTMLElement | null;

  // Live Market Feed Elements
  marketFeedBar: HTMLElement | null;
  feedPing: HTMLElement | null;
  feedDot: HTMLElement | null;
  feedStatusBadge: HTMLElement | null;
  feedStatusTag: HTMLElement | null;
  feedLiveFundingVal: HTMLElement | null;
  feedFundingSource: HTMLElement | null;
  feedLiveStakingVal: HTMLElement | null;
  feedStakingSource: HTMLElement | null;
  feedLivePriceVal: HTMLElement | null;
  feedLastUpdated: HTMLElement | null;
  btnRefreshFeed: HTMLElement | null;
  refreshIcon: HTMLElement | null;
  refreshBtnLabel: HTMLElement | null;
  btnUseLiveFunding: HTMLElement | null;
  labelLiveFundingSnap: HTMLElement | null;
  descFundingSource: HTMLElement | null;
  btnUseLiveStaking: HTMLElement | null;
  labelLiveStakingSnap: HTMLElement | null;
  descStakingSource: HTMLElement | null;
  feedNextFundingCountdown: HTMLElement | null;
  subtextPreset90: HTMLElement | null;
  subtextPreset85: HTMLElement | null;
  feedVenueBtnBinance: HTMLElement | null;
  feedVenueBtnHyperliquid: HTMLElement | null;
  feedVenueBtnAverage: HTMLElement | null;
  sliderVenueBtnBinance: HTMLElement | null;
  sliderVenueBtnHyperliquid: HTMLElement | null;
  sliderVenueBtnAverage: HTMLElement | null;

  // Rolling Trailing Horizon Pills
  pillStakeLive: HTMLElement | null;
  pillStake7d: HTMLElement | null;
  pillStake30d: HTMLElement | null;
  pillStake90d: HTMLElement | null;
  labelPillStakeLive: HTMLElement | null;
  labelPillStake7d: HTMLElement | null;
  labelPillStake30d: HTMLElement | null;
  labelPillStake90d: HTMLElement | null;

  pillFundLive: HTMLElement | null;
  pillFund7d: HTMLElement | null;
  pillFund30d: HTMLElement | null;
  pillFund90d: HTMLElement | null;
  labelPillFundLive: HTMLElement | null;
  labelPillFund7d: HTMLElement | null;
  labelPillFund30d: HTMLElement | null;
  labelPillFund90d: HTMLElement | null;

  // Historical Carry Modal Elements
  btnOpenHistoricalModal: HTMLElement | null;
  historicalModal: HTMLElement | null;
  btnHistoricalClose: HTMLElement | null;
  btnHistoricalCloseFooter: HTMLElement | null;
  histModalSymbolBadge: HTMLElement | null;
  histBtnRange30: HTMLElement | null;
  histBtnRange90: HTMLElement | null;
  histBtnRange180: HTMLElement | null;
  historicalCanvas: HTMLCanvasElement | null;
  historicalTooltip: HTMLElement | null;
  histTtDate: HTMLElement | null;
  histTtBinance: HTMLElement | null;
  histTtHl: HTMLElement | null;
  histTtStaking: HTMLElement | null;
  histTtNetcarry: HTMLElement | null;
  histTtDivergence: HTMLElement | null;

  histStatBinanceAvg: HTMLElement | null;
  histStatHlAvg: HTMLElement | null;
  histStatConsensusAvg: HTMLElement | null;
  histStatDivergence: HTMLElement | null;
  histStatStakingAvg: HTMLElement | null;
  histStatNetcarryAvg: HTMLElement | null;
  histStatNegIntervals: HTMLElement | null;
  histStatVol: HTMLElement | null;

  [key: string]: HTMLElement | HTMLInputElement | HTMLCanvasElement | null;
}

export function getUIElements(): UIElements {
  return {
    marketFeedBar: document.getElementById('market-feed-bar'),
    feedPing: document.getElementById('feed-ping'),
    feedDot: document.getElementById('feed-dot'),
    feedStatusBadge: document.getElementById('feed-status-badge'),
    feedStatusTag: document.getElementById('feed-status-tag'),
    feedLiveFundingVal: document.getElementById('feed-live-funding-val'),
    feedFundingSource: document.getElementById('feed-funding-source'),
    feedLiveStakingVal: document.getElementById('feed-live-staking-val'),
    feedStakingSource: document.getElementById('feed-staking-source'),
    feedLivePriceVal: document.getElementById('feed-live-price-val'),
    feedLastUpdated: document.getElementById('feed-last-updated'),
    btnRefreshFeed: document.getElementById('btn-refresh-feed'),
    refreshIcon: document.getElementById('refresh-icon'),
    refreshBtnLabel: document.getElementById('refresh-btn-label'),
    btnUseLiveFunding: document.getElementById('btn-use-live-funding'),
    labelLiveFundingSnap: document.getElementById('label-live-funding-snap'),
    descFundingSource: document.getElementById('desc-funding-source'),
    btnUseLiveStaking: document.getElementById('btn-use-live-staking'),
    labelLiveStakingSnap: document.getElementById('label-live-staking-snap'),
    descStakingSource: document.getElementById('desc-staking-source'),
    feedNextFundingCountdown: document.getElementById('feed-next-funding-countdown'),
    subtextPreset90: document.getElementById('subtext-preset-90'),
    subtextPreset85: document.getElementById('subtext-preset-85'),
    feedVenueBtnBinance: document.getElementById('feed-venue-btn-binance'),
    feedVenueBtnHyperliquid: document.getElementById('feed-venue-btn-hyperliquid'),
    feedVenueBtnAverage: document.getElementById('feed-venue-btn-average'),
    sliderVenueBtnBinance: document.getElementById('slider-venue-btn-binance'),
    sliderVenueBtnHyperliquid: document.getElementById('slider-venue-btn-hyperliquid'),
    sliderVenueBtnAverage: document.getElementById('slider-venue-btn-average'),

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

    boxIsolatedBtcLst: document.getElementById('box-isolated-btclst'),
    labelBtcLstMode: document.getElementById('label-btclst-mode'),
    btnBtcNative: document.getElementById('btn-btc-native'),
    btnBtcLbtc: document.getElementById('btn-btc-lbtc'),
    btnBtcSolvbtc: document.getElementById('btn-btc-solvbtc'),
    isoBtnEth: document.getElementById('iso-btn-eth'),
    isoBtnBtc: document.getElementById('iso-btn-btc'),
    isoBtnSol: document.getElementById('iso-btn-sol'),
    instCollateralNoteText: document.getElementById('inst-collateral-note-text'),

    inputPriceMove: document.getElementById('input-price-move') as HTMLInputElement | null,
    valPriceMove: document.getElementById('val-price-move'),
    inputCapital: document.getElementById('input-capital') as HTMLInputElement | null,
    valCapital: document.getElementById('val-capital'),
    inputDays: document.getElementById('input-days') as HTMLInputElement | null,
    valDays: document.getElementById('val-days'),
    inputFunding: document.getElementById('input-funding') as HTMLInputElement | null,
    valFunding: document.getElementById('val-funding'),
    inputStaking: document.getElementById('input-staking') as HTMLInputElement | null,
    valStaking: document.getElementById('val-staking'),
    inputDepeg: document.getElementById('input-depeg') as HTMLInputElement | null,
    valDepeg: document.getElementById('val-depeg'),
    inputSplit: document.getElementById('input-split') as HTMLInputElement | null,
    valSplit: document.getElementById('val-split'),
    splitHelperText: document.getElementById('split-helper-text'),

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

    liqBanner: document.getElementById('liquidation-banner'),
    alertLiqTrigger: document.getElementById('alert-liq-trigger'),
    canvas: document.getElementById('pnlCanvas') as HTMLCanvasElement | null,
    chartSubCaption: document.getElementById('chart-sub-caption'),
    tooltip: document.getElementById('canvas-tooltip'),
    ttPrice: document.getElementById('tt-price'),
    ttVal: document.getElementById('tt-val'),
    ttRoi: document.getElementById('tt-roi'),
    ttStatus: document.getElementById('tt-status'),
    triadModal: document.getElementById('triad-modal'),
    btnTriadInfo: document.getElementById('btn-triad-info'),
    btnTriadClose: document.getElementById('btn-triad-close'),
    btnTriadCloseFooter: document.getElementById('btn-triad-close-footer'),

    // Rolling Trailing Horizon Pills
    pillStakeLive: document.getElementById('pill-stake-live'),
    pillStake7d: document.getElementById('pill-stake-7d'),
    pillStake30d: document.getElementById('pill-stake-30d'),
    pillStake90d: document.getElementById('pill-stake-90d'),
    labelPillStakeLive: document.getElementById('label-pill-stake-live'),
    labelPillStake7d: document.getElementById('label-pill-stake-7d'),
    labelPillStake30d: document.getElementById('label-pill-stake-30d'),
    labelPillStake90d: document.getElementById('label-pill-stake-90d'),

    pillFundLive: document.getElementById('pill-fund-live'),
    pillFund7d: document.getElementById('pill-fund-7d'),
    pillFund30d: document.getElementById('pill-fund-30d'),
    pillFund90d: document.getElementById('pill-fund-90d'),
    labelPillFundLive: document.getElementById('label-pill-fund-live'),
    labelPillFund7d: document.getElementById('label-pill-fund-7d'),
    labelPillFund30d: document.getElementById('label-pill-fund-30d'),
    labelPillFund90d: document.getElementById('label-pill-fund-90d'),

    // Historical Modal Elements
    btnOpenHistoricalModal: document.getElementById('btn-open-historical-modal'),
    historicalModal: document.getElementById('historical-modal'),
    btnHistoricalClose: document.getElementById('btn-historical-close'),
    btnHistoricalCloseFooter: document.getElementById('btn-historical-close-footer'),
    histModalSymbolBadge: document.getElementById('hist-modal-symbol-badge'),
    histBtnRange30: document.getElementById('hist-btn-range-30'),
    histBtnRange90: document.getElementById('hist-btn-range-90'),
    histBtnRange180: document.getElementById('hist-btn-range-180'),
    historicalCanvas: document.getElementById('historicalCanvas') as HTMLCanvasElement | null,
    historicalTooltip: document.getElementById('historical-tooltip'),
    histTtDate: document.getElementById('hist-tt-date'),
    histTtBinance: document.getElementById('hist-tt-binance'),
    histTtHl: document.getElementById('hist-tt-hl'),
    histTtStaking: document.getElementById('hist-tt-staking'),
    histTtNetcarry: document.getElementById('hist-tt-netcarry'),
    histTtDivergence: document.getElementById('hist-tt-divergence'),

    histStatBinanceAvg: document.getElementById('hist-stat-binance-avg'),
    histStatHlAvg: document.getElementById('hist-stat-hl-avg'),
    histStatConsensusAvg: document.getElementById('hist-stat-consensus-avg'),
    histStatDivergence: document.getElementById('hist-stat-divergence'),
    histStatStakingAvg: document.getElementById('hist-stat-staking-avg'),
    histStatNetcarryAvg: document.getElementById('hist-stat-netcarry-avg'),
    histStatNegIntervals: document.getElementById('hist-stat-neg-intervals'),
    histStatVol: document.getElementById('hist-stat-vol')
  };
}

export function renderUI(UI: UIElements, state: HedgingState, res: HedgingOutcome): void {
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

  renderMarketData(UI, state);
}

export function renderMarketData(UI: UIElements, state: HedgingState): void {
  const data = getLatestMarketData();
  const asset = state.tradedAsset || 'ETH';
  const assetRates = data[asset] || data.ETH;

  // Render Status Badge & Ping Indicator
  if (UI.feedStatusTag && UI.feedPing && UI.feedDot) {
    if (data.isLoading) {
      UI.feedStatusTag.textContent = 'SYNCING';
      UI.feedStatusTag.className = 'text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold';
      UI.feedPing.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75';
      UI.feedDot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500';
    } else if (data.isLive) {
      UI.feedStatusTag.textContent = 'LIVE';
      UI.feedStatusTag.className = 'text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold';
      UI.feedPing.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75';
      UI.feedDot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500';
    } else {
      UI.feedStatusTag.textContent = 'FALLBACK';
      UI.feedStatusTag.className = 'text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold';
      UI.feedPing.className = 'hidden';
      UI.feedDot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-500';
    }
  }

  // Determine current asset's staking live rate & source
  let liveStakingVal = assetRates.stakingAPY;
  let liveStakingSource = assetRates.stakingSource;

  if (asset === 'ETH') {
    liveStakingVal = data.ETH.stakingAPY;
    liveStakingSource = data.ETH.stakingSource;
  } else if (asset === 'BTC') {
    if (state.mode === 'isolated') {
      const v = state.btcVariant || 'lbtc';
      if (v === 'lbtc') {
        liveStakingVal = data.btcLst.lbtc.stakingAPY;
        liveStakingSource = data.btcLst.lbtc.source;
      } else if (v === 'solvbtc') {
        liveStakingVal = data.btcLst.solvbtc.stakingAPY;
        liveStakingSource = data.btcLst.solvbtc.source;
      } else {
        liveStakingVal = 0.0;
        liveStakingSource = 'Native Cold Custody (0%)';
      }
    } else {
      liveStakingVal = 0.0;
      liveStakingSource = 'Unified CEX Whitelist (0%)';
    }
  } else if (asset === 'SOL') {
    if (state.solYieldType === 'nominal') {
      liveStakingVal = data.SOL.nominalStakingAPY ?? 7.2;
      liveStakingSource = `${data.SOL.stakingSource} (Nominal)`;
    } else {
      liveStakingVal = data.SOL.realStakingAPY ?? 1.8;
      liveStakingSource = `${data.SOL.stakingSource} (Real net of inflation)`;
    }
  }

  // Update Ribbon Values
  if (UI.feedLiveFundingVal) {
    UI.feedLiveFundingVal.textContent = `${fmtPct(assetRates.perpFundingAPR)} APR`;
    UI.feedLiveFundingVal.className = `font-bold font-mono ${assetRates.perpFundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.feedFundingSource) {
    const srcShort = assetRates.fundingSource.includes('Binance') ? 'Binance' : (assetRates.fundingSource.includes('Hyperliquid') ? 'Hyperliquid' : (assetRates.fundingSource.includes('Consensus') ? 'Average' : 'Preset'));
    UI.feedFundingSource.textContent = `(${srcShort})`;
  }

  // Update Venue Switcher Buttons
  const activeVenue = data.selectedVenue || 'binance';
  const venueKeys = [
    { key: 'binance', feedBtn: UI.feedVenueBtnBinance, sliderBtn: UI.sliderVenueBtnBinance },
    { key: 'hyperliquid', feedBtn: UI.feedVenueBtnHyperliquid, sliderBtn: UI.sliderVenueBtnHyperliquid },
    { key: 'average', feedBtn: UI.feedVenueBtnAverage, sliderBtn: UI.sliderVenueBtnAverage }
  ] as const;

  venueKeys.forEach(({ key, feedBtn, sliderBtn }) => {
    const isAct = key === activeVenue;
    if (feedBtn) {
      feedBtn.className = isAct
        ? 'px-2 py-0.5 rounded font-bold transition bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm cursor-pointer'
        : 'px-2 py-0.5 rounded transition text-slate-400 hover:text-white cursor-pointer';
    }
    if (sliderBtn) {
      sliderBtn.className = isAct
        ? 'px-1.5 py-0.5 rounded font-bold transition bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm cursor-pointer'
        : 'px-1.5 py-0.5 rounded transition text-slate-400 hover:text-white cursor-pointer';
    }
  });

  if (UI.feedLiveStakingVal) {
    UI.feedLiveStakingVal.textContent = liveStakingVal > 0 ? `+${liveStakingVal.toFixed(2)}% APY` : '0.00% APY';
  }
  if (UI.feedStakingSource) {
    let srcShort = 'Native';
    if (asset === 'ETH') srcShort = 'Lido';
    else if (asset === 'SOL') srcShort = 'Jito';
    else if (asset === 'BTC' && state.mode === 'isolated') {
      srcShort = state.btcVariant === 'lbtc' ? 'Lombard' : (state.btcVariant === 'solvbtc' ? 'Solv' : 'Cold');
    }
    UI.feedStakingSource.textContent = `(${srcShort})`;
  }

  if (UI.feedLivePriceVal) {
    UI.feedLivePriceVal.textContent = fmtUSD(assetRates.markPrice);
  }

  // Update Next Funding Countdown
  if (UI.feedNextFundingCountdown) {
    if (assetRates.nextFundingTime && assetRates.nextFundingTime > Date.now()) {
      const diffMs = assetRates.nextFundingTime - Date.now();
      const hours = Math.floor(diffMs / 3600000);
      const mins = Math.floor((diffMs % 3600000) / 60000);
      UI.feedNextFundingCountdown.textContent = `Next settlement in ~${hours}h ${mins}m`;
    } else {
      UI.feedNextFundingCountdown.textContent = 'Settles 3x daily (00/08/16 UTC)';
    }
  }

  // Update Slider Live Snap Buttons & Source Labels
  if (UI.labelLiveFundingSnap) {
    UI.labelLiveFundingSnap.textContent = fmtPct(assetRates.perpFundingAPR);
  }
  if (UI.descFundingSource) {
    UI.descFundingSource.textContent = `Source: ${assetRates.fundingSource}`;
  }

  if (UI.labelLiveStakingSnap) {
    UI.labelLiveStakingSnap.textContent = `${liveStakingVal.toFixed(2)}%`;
  }
  if (UI.descStakingSource) {
    UI.descStakingSource.textContent = `Source: ${liveStakingSource}`;
  }

  // Update Preset Cards Subtexts with Live Yields
  if (UI.subtextPreset90) {
    UI.subtextPreset90.textContent = `10% Haircut | ${data.ETH.stakingAPY.toFixed(1)}% Live Stake`;
  }
  if (UI.subtextPreset85) {
    const solVal = state.solYieldType === 'nominal' ? (data.SOL.nominalStakingAPY ?? 7.2) : (data.SOL.realStakingAPY ?? 1.8);
    UI.subtextPreset85.textContent = `15% Haircut | ${solVal.toFixed(1)}% ${state.solYieldType === 'nominal' ? 'Nom' : 'Real'} Stake`;
  }

  // Update Isolated BTC LST button labels
  if (UI.btnBtcLbtc) {
    UI.btnBtcLbtc.textContent = `LBTC (${data.btcLst.lbtc.stakingAPY.toFixed(1)}%)`;
  }
  if (UI.btnBtcSolvbtc) {
    UI.btnBtcSolvbtc.textContent = `SolvBTC (${data.btcLst.solvbtc.stakingAPY.toFixed(1)}%)`;
  }

  // Update Last Synced
  if (UI.feedLastUpdated) {
    if (!data.lastSynced) {
      UI.feedLastUpdated.textContent = 'Syncing feeds...';
    } else {
      const elapsedSec = Math.max(0, Math.floor((Date.now() - data.lastSynced) / 1000));
      if (elapsedSec < 10) {
        UI.feedLastUpdated.textContent = 'Synced just now';
      } else if (elapsedSec < 60) {
        UI.feedLastUpdated.textContent = `Synced ${elapsedSec}s ago`;
      } else {
        const mins = Math.floor(elapsedSec / 60);
        UI.feedLastUpdated.textContent = `Synced ${mins}m ago`;
      }
    }
  }

  // Render rolling horizon pills under sliders
  renderHistoricalPills(UI, state, data);
}

export function renderHistoricalPills(UI: UIElements, state: any, data: MarketDataSnapshot): void {
  const asset = (state.tradedAsset || 'ETH') as 'ETH' | 'BTC' | 'SOL';
  const assetRates = data[asset];
  if (!assetRates) return;

  // 1. Staking Trailing
  let liveStaking = assetRates.stakingAPY;
  let stake7d = assetRates.trailingAverages?.staking7d ?? liveStaking;
  let stake30d = assetRates.trailingAverages?.staking30d ?? liveStaking;
  let stake90d = assetRates.trailingAverages?.staking90d ?? liveStaking;

  if (state.mode === 'unified') {
    if (state.activePreset === 'btc_95') {
      liveStaking = 0.0;
      stake7d = 0.0;
      stake30d = 0.0;
      stake90d = 0.0;
    } else if (state.activePreset === 'sol_lrt_85' && state.solYieldType === 'nominal') {
      liveStaking = assetRates.nominalStakingAPY ?? 7.2;
      stake7d = parseFloat((stake7d + 5.4).toFixed(2));
      stake30d = parseFloat((stake30d + 5.4).toFixed(2));
      stake90d = parseFloat((stake90d + 5.4).toFixed(2));
    }
  } else {
    if (asset === 'BTC') {
      if (state.btcVariant === 'lbtc') {
        liveStaking = data.btcLst.lbtc.stakingAPY;
        stake7d = liveStaking;
        stake30d = liveStaking;
        stake90d = liveStaking;
      } else if (state.btcVariant === 'solvbtc') {
        liveStaking = data.btcLst.solvbtc.stakingAPY;
        stake7d = liveStaking;
        stake30d = liveStaking;
        stake90d = liveStaking;
      } else {
        liveStaking = 0.0;
        stake7d = 0.0;
        stake30d = 0.0;
        stake90d = 0.0;
      }
    } else if (asset === 'SOL' && state.solYieldType === 'nominal') {
      liveStaking = assetRates.nominalStakingAPY ?? 7.2;
      stake7d = parseFloat((stake7d + 5.4).toFixed(2));
      stake30d = parseFloat((stake30d + 5.4).toFixed(2));
      stake90d = parseFloat((stake90d + 5.4).toFixed(2));
    }
  }

  if (UI.labelPillStakeLive) UI.labelPillStakeLive.textContent = `${liveStaking.toFixed(2)}%`;
  if (UI.labelPillStake7d) UI.labelPillStake7d.textContent = `${stake7d.toFixed(2)}%`;
  if (UI.labelPillStake30d) UI.labelPillStake30d.textContent = `${stake30d.toFixed(2)}%`;
  if (UI.labelPillStake90d) UI.labelPillStake90d.textContent = `${stake90d.toFixed(2)}%`;

  // 2. Funding Trailing
  const fundLive = assetRates.perpFundingAPR;
  const fund7d = assetRates.trailingAverages?.funding7d ?? fundLive;
  const fund30d = assetRates.trailingAverages?.funding30d ?? fundLive;
  const fund90d = assetRates.trailingAverages?.funding90d ?? fundLive;

  if (UI.labelPillFundLive) UI.labelPillFundLive.textContent = fmtPct(fundLive);
  if (UI.labelPillFund7d) UI.labelPillFund7d.textContent = fmtPct(fund7d);
  if (UI.labelPillFund30d) UI.labelPillFund30d.textContent = fmtPct(fund30d);
  if (UI.labelPillFund90d) UI.labelPillFund90d.textContent = fmtPct(fund90d);

  // Active Pill Styling
  const activeClass = 'text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/80 font-bold transition flex items-center gap-1 font-mono cursor-pointer shadow-sm';
  const inactiveClass = 'text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition flex items-center gap-1 font-mono cursor-pointer';

  const sWin = state.stakingWindow ?? (state.isLiveStaking ? 'live' : 'custom');
  if (UI.pillStakeLive) UI.pillStakeLive.className = sWin === 'live' ? activeClass : inactiveClass;
  if (UI.pillStake7d) UI.pillStake7d.className = sWin === '7d' ? activeClass : inactiveClass;
  if (UI.pillStake30d) UI.pillStake30d.className = sWin === '30d' ? activeClass : inactiveClass;
  if (UI.pillStake90d) UI.pillStake90d.className = sWin === '90d' ? activeClass : inactiveClass;

  const fWin = state.fundingWindow ?? (state.isLiveFunding ? 'live' : 'custom');
  if (UI.pillFundLive) UI.pillFundLive.className = fWin === 'live' ? activeClass : inactiveClass;
  if (UI.pillFund7d) UI.pillFund7d.className = fWin === '7d' ? activeClass : inactiveClass;
  if (UI.pillFund30d) UI.pillFund30d.className = fWin === '30d' ? activeClass : inactiveClass;
  if (UI.pillFund90d) UI.pillFund90d.className = fWin === '90d' ? activeClass : inactiveClass;
}

export function renderHistoricalModal(
  UI: UIElements,
  analytics: AssetHistoricalAnalytics,
  _activeVenue: FundingVenue
): void {
  if (UI.histModalSymbolBadge) {
    UI.histModalSymbolBadge.textContent = analytics.symbol;
  }
  if (UI.histStatBinanceAvg) {
    UI.histStatBinanceAvg.textContent = fmtPct(analytics.binanceAvg);
  }
  if (UI.histStatHlAvg) {
    UI.histStatHlAvg.textContent = fmtPct(analytics.hyperliquidAvg);
  }
  if (UI.histStatConsensusAvg) {
    UI.histStatConsensusAvg.textContent = fmtPct(analytics.consensusAvg);
  }
  if (UI.histStatDivergence) {
    UI.histStatDivergence.textContent = `${analytics.fundingDivergence.toFixed(2)}%`;
  }
  if (UI.histStatStakingAvg) {
    UI.histStatStakingAvg.textContent = `${analytics.stakingAvg.toFixed(2)}% APY`;
  }
  if (UI.histStatNetcarryAvg) {
    UI.histStatNetcarryAvg.textContent = fmtPct(analytics.netCarryAvg) + ' APY';
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
}

export function bindInputListeners(
  UI: UIElements,
  state: HedgingState,
  onUpdate: () => void
): void {
  if (UI.inputPriceMove) {
    UI.inputPriceMove.addEventListener('input', (e) => {
      state.priceMove = parseFloat((e.target as HTMLInputElement).value);
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
}

