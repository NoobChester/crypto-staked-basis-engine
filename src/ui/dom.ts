/**
 * @file dom.ts
 * @description DOM element caching, UI event listeners, and component renderer barrel.
 */


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
  sliderVenueBtnBinance: HTMLElement | null;
  sliderVenueBtnHyperliquid: HTMLElement | null;

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

  // LST Depeg / Basis Discount Elements
  boxDepegControl: HTMLElement | null;
  badgeDepegNative: HTMLElement | null;
  containerDepegPills: HTMLElement | null;
  pillDepegLive: HTMLElement | null;
  labelPillDepegLive: HTMLElement | null;
  pillDepeg0: HTMLElement | null;
  pillDepeg2: HTMLElement | null;
  pillDepeg5: HTMLElement | null;
  pillDepeg8: HTMLElement | null;
  descDepegSource: HTMLElement | null;
  descDepegStatus: HTMLElement | null;

  // Historical Modal Elements
  btnOpenHistoricalModal: HTMLElement | null;
  historicalModal: HTMLElement | null;
  btnHistoricalClose: HTMLElement | null;
  btnHistoricalCloseFooter: HTMLElement | null;
  histModalSymbolBadge: HTMLElement | null;
  histBtnAssetEth: HTMLElement | null;
  histBtnAssetBtc: HTMLElement | null;
  histBtnAssetSol: HTMLElement | null;
  histFooterAssetLabel: HTMLElement | null;
  histBtnRange30: HTMLElement | null;
  histBtnRange90: HTMLElement | null;
  histBtnRange180: HTMLElement | null;
  historicalCanvas: HTMLCanvasElement | null;
  histSubchartWrapper: HTMLElement | null;
  historicalSubCanvas: HTMLCanvasElement | null;
  histSubchartEmpty: HTMLElement | null;
  histSubchartStats: HTMLElement | null;
  historicalTooltip: HTMLElement | null;
  histTtDate: HTMLElement | null;
  histTtBinance: HTMLElement | null;
  histTtHl: HTMLElement | null;
  histTtStaking: HTMLElement | null;
  histTtNetcarry: HTMLElement | null;
  histTtDivergence: HTMLElement | null;
  histTtDepegRow: HTMLElement | null;
  histTtDepeg: HTMLElement | null;

  histStatBinanceAvg: HTMLElement | null;
  histStatBinanceSub: HTMLElement | null;
  histStatHlAvg: HTMLElement | null;
  histStatHlSub: HTMLElement | null;
  histStatSpreadVal: HTMLElement | null;
  histStatSpreadSub: HTMLElement | null;
  histStatDivergence: HTMLElement | null;
  histStatDivergenceSub: HTMLElement | null;
  histStatStakingAvg: HTMLElement | null;
  histStatStakingSub: HTMLElement | null;
  histStatNetcarryAvg: HTMLElement | null;
  histStatNetcarrySub: HTMLElement | null;
  histStatNegIntervals: HTMLElement | null;
  histStatVol: HTMLElement | null;

  // Net Realized & Fee Drag Elements
  kpiNetRealizedApy: HTMLElement | null;
  kpiFeeDragBadge: HTMLElement | null;
  kpiTbillSpreadBadge: HTMLElement | null;
  valFeeDragAnnual: HTMLElement | null;
  breakdownFeeLoss: HTMLElement | null;
  breakdownNetRealizedPnl: HTMLElement | null;
  breakdownNetRealizedRoi: HTMLElement | null;
  breakdownExcessDollarCarry: HTMLElement | null;
  feeTierBtnVip: HTMLElement | null;
  feeTierBtnRetail: HTMLElement | null;
  feeTierBtnMm: HTMLElement | null;
  labelActiveFeeTier: HTMLElement | null;
  badgeForwardCarry: HTMLElement | null;

  // Crisis Scenarios Matrix Elements
  scenarioMatrixPanel: HTMLElement | null;
  btnRestoreLiveFeeds: HTMLElement | null;
  scenarioVerdictBox: HTMLElement | null;
  scenarioVerdictTitle: HTMLElement | null;
  scenarioVerdictText: HTMLElement | null;
  scenarioVerdictPill: HTMLElement | null;
  scenarioBtnCelsius: HTMLElement | null;
  scenarioBtnFtx: HTMLElement | null;
  scenarioBtnParabolic: HTMLElement | null;
  scenarioBtnHaircut: HTMLElement | null;
  scenarioBtnFlashCrash: HTMLElement | null;
  scenarioBtnMeme: HTMLElement | null;
  crisisTrajectoryContainer: HTMLElement | null;
  crisisTrajectoryCanvas: HTMLCanvasElement | null;
  btnOpenCrisisAudit: HTMLElement | null;
  sliderLockBadge: HTMLElement | null;
  crisisAuditModal: HTMLElement | null;
  btnCrisisAuditClose: HTMLElement | null;
  btnCrisisAuditCloseFooter: HTMLElement | null;
  crisisAuditTitle: HTMLElement | null;
  crisisAuditSubtitle: HTMLElement | null;
  crisisAuditTableBody: HTMLElement | null;
  btnExportCrisisCsv: HTMLElement | null;
  statisticalCarryPanel: HTMLElement | null;
  labelVolatilityDispersion: HTMLElement | null;
  btnRegimeConservative: HTMLElement | null;
  btnRegimeBase: HTMLElement | null;
  btnRegimeBull: HTMLElement | null;
  labelRegimeConservativeVal: HTMLElement | null;
  labelRegimeBaseVal: HTMLElement | null;
  labelRegimeBullVal: HTMLElement | null;
  inputLookbackDays: HTMLInputElement | null;
  valLookbackDays: HTMLElement | null;

  // Collateral Intelligence Card
  ciCard: HTMLElement | null;
  ciRankBadge: HTMLElement | null;
  ciTitle: HTMLElement | null;
  ciVenue: HTMLElement | null;
  ciBuffer: HTMLElement | null;
  ciRealApy: HTMLElement | null;
  ciWhy: HTMLElement | null;
  ciBeats: HTMLElement | null;
  ciVerdict: HTMLElement | null;

  // Spot Staking Sub-Chart Elements
  historicalStakingSubCanvas: HTMLCanvasElement | null;
  histStakingSubchartWrapper: HTMLElement | null;
  histStakingSubchartEmpty: HTMLElement | null;
  histStakingSubchartStats: HTMLElement | null;

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
    sliderVenueBtnBinance: document.getElementById('slider-venue-btn-binance'),
    sliderVenueBtnHyperliquid: document.getElementById('slider-venue-btn-hyperliquid'),

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

    // LST Depeg / Basis Discount Elements
    boxDepegControl: document.getElementById('box-depeg-control'),
    badgeDepegNative: document.getElementById('badge-depeg-native'),
    containerDepegPills: document.getElementById('container-depeg-pills'),
    pillDepegLive: document.getElementById('pill-depeg-live'),
    labelPillDepegLive: document.getElementById('label-pill-depeg-live'),
    pillDepeg0: document.getElementById('pill-depeg-0'),
    pillDepeg2: document.getElementById('pill-depeg-2'),
    pillDepeg5: document.getElementById('pill-depeg-5'),
    pillDepeg8: document.getElementById('pill-depeg-8'),
    descDepegSource: document.getElementById('desc-depeg-source'),
    descDepegStatus: document.getElementById('desc-depeg-status'),

    // Historical Modal Elements
    btnOpenHistoricalModal: document.getElementById('btn-open-historical-modal'),
    historicalModal: document.getElementById('historical-modal'),
    btnHistoricalClose: document.getElementById('btn-historical-close'),
    btnHistoricalCloseFooter: document.getElementById('btn-historical-close-footer'),
    histModalSymbolBadge: document.getElementById('hist-modal-symbol-badge'),
    histBtnAssetEth: document.getElementById('hist-btn-asset-eth'),
    histBtnAssetBtc: document.getElementById('hist-btn-asset-btc'),
    histBtnAssetSol: document.getElementById('hist-btn-asset-sol'),
    histFooterAssetLabel: document.getElementById('hist-footer-asset-label'),
    histBtnRange30: document.getElementById('hist-btn-range-30'),
    histBtnRange90: document.getElementById('hist-btn-range-90'),
    histBtnRange180: document.getElementById('hist-btn-range-180'),
    historicalCanvas: document.getElementById('historicalCanvas') as HTMLCanvasElement | null,
    histSubchartWrapper: document.getElementById('hist-subchart-wrapper'),
    historicalSubCanvas: document.getElementById('historicalSubCanvas') as HTMLCanvasElement | null,
    histSubchartEmpty: document.getElementById('hist-subchart-empty'),
    histSubchartStats: document.getElementById('hist-subchart-stats'),
    historicalTooltip: document.getElementById('historical-tooltip'),
    histTtDate: document.getElementById('hist-tt-date'),
    histTtBinance: document.getElementById('hist-tt-binance'),
    histTtHl: document.getElementById('hist-tt-hl'),
    histTtStaking: document.getElementById('hist-tt-staking'),
    histTtNetcarry: document.getElementById('hist-tt-netcarry'),
    histTtDivergence: document.getElementById('hist-tt-divergence'),
    histTtDepegRow: document.getElementById('hist-tt-depeg-row'),
    histTtDepeg: document.getElementById('hist-tt-depeg'),

    histStatBinanceAvg: document.getElementById('hist-stat-binance-avg'),
    histStatBinanceSub: document.getElementById('hist-stat-binance-sub'),
    histStatHlAvg: document.getElementById('hist-stat-hl-avg'),
    histStatHlSub: document.getElementById('hist-stat-hl-sub'),
    histStatSpreadVal: document.getElementById('hist-stat-spread-val'),
    histStatSpreadSub: document.getElementById('hist-stat-spread-sub'),
    histStatDivergence: document.getElementById('hist-stat-divergence'),
    histStatDivergenceSub: document.getElementById('hist-stat-divergence-sub'),
    histStatStakingAvg: document.getElementById('hist-stat-staking-avg'),
    histStatStakingSub: document.getElementById('hist-stat-staking-sub'),
    histStatNetcarryAvg: document.getElementById('hist-stat-netcarry-avg'),
    histStatNetcarrySub: document.getElementById('hist-stat-netcarry-sub'),
    histStatNegIntervals: document.getElementById('hist-stat-neg-intervals'),
    // Net Realized & Fee Drag Elements
    kpiNetRealizedApy: document.getElementById('kpi-net-realized-apy'),
    kpiFeeDragBadge: document.getElementById('kpi-fee-drag-badge'),
    kpiTbillSpreadBadge: document.getElementById('kpi-tbill-spread-badge'),
    valFeeDragAnnual: document.getElementById('val-fee-drag-annual'),
    breakdownFeeLoss: document.getElementById('breakdown-fee-loss'),
    breakdownNetRealizedPnl: document.getElementById('breakdown-net-realized-pnl'),
    breakdownNetRealizedRoi: document.getElementById('breakdown-net-realized-roi'),
    breakdownExcessDollarCarry: document.getElementById('breakdown-excess-dollar-carry'),
    feeTierBtnVip: document.getElementById('fee-tier-btn-vip'),
    feeTierBtnRetail: document.getElementById('fee-tier-btn-retail'),
    feeTierBtnMm: document.getElementById('fee-tier-btn-mm'),
    labelActiveFeeTier: document.getElementById('label-active-fee-tier'),
    badgeForwardCarry: document.getElementById('badge-forward-carry'),

    // Crisis Scenarios Matrix Elements
    scenarioMatrixPanel: document.getElementById('scenario-matrix-panel'),
    btnRestoreLiveFeeds: document.getElementById('btn-restore-live-feeds'),
    scenarioVerdictBox: document.getElementById('scenario-verdict-box'),
    scenarioVerdictTitle: document.getElementById('scenario-verdict-title'),
    scenarioVerdictText: document.getElementById('scenario-verdict-text'),
    scenarioVerdictPill: document.getElementById('scenario-verdict-pill'),
    scenarioBtnCelsius: document.getElementById('btn-scenario-celsius'),
    scenarioBtnFtx: document.getElementById('btn-scenario-ftx'),
    scenarioBtnParabolic: document.getElementById('btn-scenario-parabolic'),
    scenarioBtnHaircut: document.getElementById('btn-scenario-haircut'),
    scenarioBtnFlashCrash: document.getElementById('btn-scenario-flash-crash'),
    scenarioBtnMeme: document.getElementById('btn-scenario-meme'),
    crisisTrajectoryContainer: document.getElementById('crisis-trajectory-container'),
    crisisTrajectoryCanvas: document.getElementById('crisis-trajectory-canvas') as HTMLCanvasElement | null,
    btnOpenCrisisAudit: document.getElementById('btn-open-crisis-audit'),
    sliderLockBadge: document.getElementById('slider-lock-badge'),
    crisisAuditModal: document.getElementById('crisis-audit-modal'),
    btnCrisisAuditClose: document.getElementById('btn-crisis-audit-close'),
    btnCrisisAuditCloseFooter: document.getElementById('btn-crisis-audit-close-footer'),
    crisisAuditTitle: document.getElementById('crisis-audit-title'),
    crisisAuditSubtitle: document.getElementById('crisis-audit-subtitle'),
    crisisAuditTableBody: document.getElementById('crisis-audit-tbody'),
    btnExportCrisisCsv: document.getElementById('btn-export-crisis-csv'),
    btnOpenRateLab: document.getElementById('btn-open-rate-lab'),
    statisticalCarryPanel: document.getElementById('statistical-carry-panel'),
    labelVolatilityDispersion: document.getElementById('label-volatility-dispersion'),
    btnRegimeConservative: document.getElementById('btn-regime-conservative'),
    btnRegimeBase: document.getElementById('btn-regime-base'),
    btnRegimeBull: document.getElementById('btn-regime-bull'),
    labelRegimeConservativeVal: document.getElementById('label-regime-conservative-val'),
    labelRegimeBaseVal: document.getElementById('label-regime-base-val'),
    labelRegimeBullVal: document.getElementById('label-regime-bull-val'),
    inputLookbackDays: document.getElementById('input-lookback-days') as HTMLInputElement | null,
    valLookbackDays: document.getElementById('val-lookback-days'),

    // Collateral Intelligence Card
    ciCard: document.getElementById('ci-card'),
    ciRankBadge: document.getElementById('ci-rank-badge'),
    ciTitle: document.getElementById('ci-title'),
    ciVenue: document.getElementById('ci-venue'),
    ciBuffer: document.getElementById('ci-buffer'),
    ciRealApy: document.getElementById('ci-real-apy'),
    ciWhy: document.getElementById('ci-why'),
    ciBeats: document.getElementById('ci-beats'),
    ciVerdict: document.getElementById('ci-verdict'),

    // Spot Staking Sub-Chart Elements
    historicalStakingSubCanvas: document.getElementById('historicalStakingSubCanvas') as HTMLCanvasElement | null,
    histStakingSubchartWrapper: document.getElementById('hist-staking-subchart-wrapper'),
    histStakingSubchartEmpty: document.getElementById('hist-staking-subchart-empty'),
    histStakingSubchartStats: document.getElementById('hist-staking-subchart-stats'),

    histStatVol: document.getElementById('hist-stat-vol')
  };
}

// Re-export Modular Component Renderers
export { renderUI } from './renderers/kpiRenderer.js';
export { renderMarketData, renderHistoricalPills } from './renderers/feedRenderer.js';
export { renderHistoricalModal, updateHistoricalTooltip } from './renderers/historicalModalRenderer.js';
export { updateDepegControl } from './renderers/depegRenderer.js';
export { renderScenarioMatrix } from './renderers/scenarioRenderer.js';

export { bindSliderListeners as bindInputListeners } from "./events.js";

export { renderCrisisAuditTable, exportCrisisAuditCsv } from './renderers/crisisLedgerRenderer.js';
