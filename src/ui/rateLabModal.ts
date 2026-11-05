/**
 * @file rateLabModal.ts
 * @description Modal Controller & Event Orchestration for the Institutional Rate Lab.
 * Manages tab switching, parameter controls, Canvas re-rendering, and terminal state injection.
 */

import type {
  RateLabState,
  ActiveRateModelTab,
  SimulationEngineType,
  OUProcessParams,
  RateRegimeKey,
  StochasticSimulationResult,
  FuturesTermStructure,
  StakingDecomposition
} from '../types/rateLab.js';

import {
  calibrateOUFromHistory,
  simulateStochasticFunding,
  calculateRegimeCarry,
  calculateStakingDecomposition,
  DEFAULT_REGIME_CONFIGS
} from '../math/stochasticRates.js';

import {
  fetchFuturesTermStructure,
  getHistoricalFundingSeries
} from '../services/marketData/futuresCurve.js';

import {
  renderStochasticFanChart,
  renderTermStructureCurve
} from './rateLabCanvas.js';

export interface RateLabCallbacks {
  onApplyRates: (fundingApr: number, stakingApy: number, ouParams?: OUProcessParams) => void;
  onStochasticStressTest?: (simResult: StochasticSimulationResult) => void;
}

// Internal State for the Rate Lab
let state: RateLabState = {
  activeTab: 'ou_stochastic',
  asset: 'ETH',
  solYieldType: 'real',
  horizonDays: 30,
  engineType: 'sqmc_sobol',
  ouParams: {
    theta: 0.085,
    mu: 10.8,
    sigma: 18.2,
    halfLifeDays: 8.2,
    jumpIntensity: 2.4,
    jumpMean: -8.0,
    jumpStdDev: 12.0
  },
  ouCustomOverrides: {},
  activeRegime: 'baseline',
  regimeConfigs: { ...DEFAULT_REGIME_CONFIGS }
};

let callbacks: RateLabCallbacks = {
  onApplyRates: () => {}
};

let modalEl: HTMLElement | null = null;
let canvasEl: HTMLCanvasElement | null = null;
let isInitialized = false;

/**
 * Initializes the Rate Lab DOM bindings, tabs, and slider event delegation.
 */
export function initRateLabModal(handlers: RateLabCallbacks): void {
  callbacks = handlers;
  modalEl = document.getElementById('rate-lab-modal');
  canvasEl = document.getElementById('rate-lab-canvas') as HTMLCanvasElement;

  if (!modalEl || isInitialized) return;
  isInitialized = true;

  // Close buttons
  const closeBtns = modalEl.querySelectorAll('[data-action="close-rate-lab"]');
  closeBtns.forEach(btn => btn.addEventListener('click', closeRateLabModal));

  // Tab switching
  const tabBtns = modalEl.querySelectorAll('[data-action="rate-lab-tab"]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.currentTarget as HTMLElement).dataset.tab as ActiveRateModelTab;
      if (target) {
        setRateLabTab(target);
      }
    });
  });

  // Engine toggle: SQMC Sobol vs Standard MC
  const engineBtns = modalEl.querySelectorAll('[data-action="set-sim-engine"]');
  engineBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const engine = (e.currentTarget as HTMLElement).dataset.engine as SimulationEngineType;
      if (engine) {
        state.engineType = engine;
        updateEngineButtonStyles();
        refreshRateLab();
      }
    });
  });

  // Horizon Buttons (7d, 14d, 30d, 60d, 90d, 180d)
  const horizonBtns = modalEl.querySelectorAll('[data-action="set-rate-lab-horizon"]');
  horizonBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const days = parseInt((e.currentTarget as HTMLElement).dataset.days || '30', 10);
      setRateLabHorizon(days);
    });
  });

  // Sliders
  const inputHorizon = document.getElementById('input-rl-horizon') as HTMLInputElement;
  inputHorizon?.addEventListener('input', (e) => {
    setRateLabHorizon(parseInt((e.target as HTMLInputElement).value, 10));
  });

  const inputMu = document.getElementById('input-rl-mu') as HTMLInputElement;
  inputMu?.addEventListener('input', (e) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    state.ouCustomOverrides.mu = val;
    const label = document.getElementById('val-rl-mu');
    if (label) label.textContent = `${val >= 0 ? '+' : ''}${val.toFixed(1)}% APR`;
    refreshRateLab();
  });

  const inputTheta = document.getElementById('input-rl-theta') as HTMLInputElement;
  inputTheta?.addEventListener('input', (e) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    state.ouCustomOverrides.theta = val;
    state.ouCustomOverrides.halfLifeDays = parseFloat((Math.LN2 / Math.max(0.001, val)).toFixed(1));
    const label = document.getElementById('val-rl-theta');
    if (label) label.textContent = `${val.toFixed(3)} (τ: ${state.ouCustomOverrides.halfLifeDays}d)`;
    refreshRateLab();
  });

  const inputSigma = document.getElementById('input-rl-sigma') as HTMLInputElement;
  inputSigma?.addEventListener('input', (e) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    state.ouCustomOverrides.sigma = val;
    const label = document.getElementById('val-rl-sigma');
    if (label) label.textContent = `±${val.toFixed(1)}%`;
    refreshRateLab();
  });

  // Reset calibration button
  const btnReset = document.getElementById('btn-rl-reset-calib');
  btnReset?.addEventListener('click', async () => {
    state.ouCustomOverrides = {};
    await autoCalibrateFromMarket();
    refreshRateLab();
  });

  // Regime Selection Buttons inside Modal
  const regimeBtns = modalEl.querySelectorAll('[data-action="rl-select-regime"]');
  regimeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reg = (e.currentTarget as HTMLElement).dataset.regime as RateRegimeKey;
      if (reg) {
        state.activeRegime = reg;
        updateRegimeButtonStyles();
        refreshRateLab();
      }
    });
  });

  // Action: Apply Rates to Terminal
  const btnApply = document.getElementById('btn-rl-apply-rates');
  btnApply?.addEventListener('click', () => {
    applyRatesToTerminal();
    closeRateLabModal();
  });

  // Action: Stochastic Margin Stress Test
  const btnStress = document.getElementById('btn-rl-stress-test');
  btnStress?.addEventListener('click', () => {
    if (state.latestStochasticResult && callbacks.onStochasticStressTest) {
      callbacks.onStochasticStressTest(state.latestStochasticResult);
      closeRateLabModal();
    }
  });

  // Canvas Mouse Move for Tooltip
  canvasEl?.addEventListener('mousemove', (e) => {
    if (state.activeTab !== 'ou_stochastic' || !state.latestStochasticResult) return;
    const rect = canvasEl!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const padLeft = 55;
    const plotW = rect.width - 55 - 35;
    if (mouseX >= padLeft && mouseX <= padLeft + plotW) {
      const frac = (mouseX - padLeft) / plotW;
      const day = frac * state.horizonDays;
      renderStochasticFanChart(canvasEl!, state.latestStochasticResult, day);
    }
  });

  canvasEl?.addEventListener('mouseleave', () => {
    if (state.activeTab === 'ou_stochastic' && state.latestStochasticResult) {
      renderStochasticFanChart(canvasEl!, state.latestStochasticResult, null);
    }
  });
}

/**
 * Opens the Rate Lab Modal, synchronizes with the active asset and parameters, and renders.
 */
export async function openRateLabModal(
  currentAsset: 'ETH' | 'BTC' | 'SOL',
  solYield: 'nominal' | 'real' = 'real'
): Promise<void> {
  state.asset = currentAsset;
  state.solYieldType = solYield;

  if (modalEl) {
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex');
  }

  // Update asset badges in modal
  const assetBadges = modalEl?.querySelectorAll('[data-bind="rl-asset"]');
  assetBadges?.forEach(b => { b.textContent = currentAsset; });

  await autoCalibrateFromMarket();
  refreshRateLab();
}

/**
 * Closes the Rate Lab Modal.
 */
export function closeRateLabModal(): void {
  if (modalEl) {
    modalEl.classList.add('hidden');
    modalEl.classList.remove('flex');
  }
}

/**
 * Switch active tabs in the Rate Lab.
 */
export function setRateLabTab(tab: ActiveRateModelTab): void {
  state.activeTab = tab;
  updateTabHeaderStyles();
  toggleTabPanels();
  refreshRateLab();
}

/**
 * Update horizon days.
 */
export function setRateLabHorizon(days: number): void {
  state.horizonDays = Math.max(7, Math.min(180, days));
  const inputHorizon = document.getElementById('input-rl-horizon') as HTMLInputElement;
  if (inputHorizon) inputHorizon.value = state.horizonDays.toString();
  const labelHorizon = document.getElementById('val-rl-horizon');
  if (labelHorizon) labelHorizon.textContent = `${state.horizonDays} Days`;
  refreshRateLab();
}

/**
 * Calibrates OU parameters automatically from historical funding series.
 */
async function autoCalibrateFromMarket(): Promise<void> {
  const series = await getHistoricalFundingSeries(state.asset, 90);
  const calibrated = calibrateOUFromHistory(series);
  state.ouParams = calibrated;

  // Sync slider values
  const effectiveParams = getEffectiveOUParams();
  syncSliderInputs(effectiveParams);
}

function getEffectiveOUParams(): OUProcessParams {
  return {
    ...state.ouParams,
    ...state.ouCustomOverrides
  };
}

function syncSliderInputs(params: OUProcessParams): void {
  const inputMu = document.getElementById('input-rl-mu') as HTMLInputElement;
  if (inputMu) inputMu.value = params.mu.toString();
  const labelMu = document.getElementById('val-rl-mu');
  if (labelMu) labelMu.textContent = `${params.mu >= 0 ? '+' : ''}${params.mu.toFixed(1)}% APR`;

  const inputTheta = document.getElementById('input-rl-theta') as HTMLInputElement;
  if (inputTheta) inputTheta.value = params.theta.toString();
  const labelTheta = document.getElementById('val-rl-theta');
  if (labelTheta) labelTheta.textContent = `${params.theta.toFixed(3)} (τ: ${params.halfLifeDays}d)`;

  const inputSigma = document.getElementById('input-rl-sigma') as HTMLInputElement;
  if (inputSigma) inputSigma.value = params.sigma.toString();
  const labelSigma = document.getElementById('val-rl-sigma');
  if (labelSigma) labelSigma.textContent = `±${params.sigma.toFixed(1)}%`;
}

/**
 * Re-runs current model calculations and updates Canvas & KPI UI.
 */
export async function refreshRateLab(): Promise<void> {
  if (!canvasEl) return;

  const effectiveOU = getEffectiveOUParams();
  const initialFunding = effectiveOU.mu;

  // 1. Run Stochastic Simulation
  const simResult = simulateStochasticFunding(initialFunding, effectiveOU, {
    engineType: state.engineType,
    pathCount: state.engineType === 'sqmc_sobol' ? 512 : 1500,
    horizonDays: state.horizonDays,
    seed: 42
  });
  state.latestStochasticResult = simResult;

  // 2. Compute Staking Decomposition
  const stakingDecomp = calculateStakingDecomposition(state.asset, state.solYieldType);
  state.latestStakingDecomposition = stakingDecomp;

  // 3. Render Canvas based on Tab
  if (state.activeTab === 'ou_stochastic') {
    renderStochasticFanChart(canvasEl, simResult);
  } else if (state.activeTab === 'term_structure') {
    const termStruct = await fetchFuturesTermStructure(state.asset);
    state.latestTermStructure = termStruct;
    renderTermStructureCurve(canvasEl, termStruct);
    renderTermStructureTable(termStruct);
  } else if (state.activeTab === 'regimes') {
    renderRegimesPanel();
  } else if (state.activeTab === 'staking') {
    renderStakingPanel(stakingDecomp);
  }

  // 4. Update Institutional Risk KPIs Strip
  updateRiskKpis(simResult, stakingDecomp);
}

function updateRiskKpis(sim: StochasticSimulationResult, staking: StakingDecomposition): void {
  const elExpected = document.getElementById('rl-kpi-expected-carry');
  if (elExpected) {
    elExpected.textContent = `${sim.expectedCarryApr >= 0 ? '+' : ''}${sim.expectedCarryApr.toFixed(1)}% APR`;
  }

  const elNegProb = document.getElementById('rl-kpi-neg-prob');
  if (elNegProb) {
    elNegProb.textContent = `${sim.negativeCarryProbabilityPct.toFixed(1)}%`;
    elNegProb.className = `font-mono font-bold ${sim.negativeCarryProbabilityPct > 15 ? 'text-rose-400' : 'text-emerald-400'}`;
  }

  const elVar95 = document.getElementById('rl-kpi-var95');
  if (elVar95) {
    elVar95.textContent = `${sim.var95Apr >= 0 ? '+' : ''}${sim.var95Apr.toFixed(1)}% APR`;
    elVar95.className = `font-mono font-bold ${sim.var95Apr < 0 ? 'text-rose-400' : 'text-slate-300'}`;
  }

  const elHalfLife = document.getElementById('rl-kpi-halflife');
  if (elHalfLife) {
    elHalfLife.textContent = `${sim.halfLifeDays.toFixed(1)} Days`;
  }

  const elStaking = document.getElementById('rl-kpi-staking-yield');
  if (elStaking) {
    elStaking.textContent = `${staking.totalStakingApy.toFixed(2)}% APY`;
  }
}

function renderRegimesPanel(): void {
  const container = document.getElementById('rl-panel-regimes');
  if (!container) return;
  const result = calculateRegimeCarry(10000, state.activeRegime, state.regimeConfigs);

  const activeConf = result.regimes[state.activeRegime];
  const summaryEl = document.getElementById('rl-regime-bleed-summary');
  if (summaryEl) {
    summaryEl.textContent = `Cumulative 1x Carry on $10k over ${activeConf.durationDays}d: ${result.cumulativeCarryBleedDollar >= 0 ? '+' : ''}$${Math.abs(result.cumulativeCarryBleedDollar).toFixed(2)}`;
    summaryEl.className = `text-xs font-mono font-bold ${result.cumulativeCarryBleedDollar >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
}

function renderTermStructureTable(ts: FuturesTermStructure): void {
  const tbody = document.getElementById('rl-term-structure-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  for (const t of ts.tenors) {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-800/60 hover:bg-slate-800/40 text-[11px] font-mono';
    tr.innerHTML = `
      <td class="py-2 px-3 text-cyan-300 font-bold">${t.instrument}</td>
      <td class="py-2 px-3 text-slate-300">${t.daysToExpiry}d</td>
      <td class="py-2 px-3 text-slate-300">$${t.futuresPrice.toLocaleString('en-US', { minimumFractionDigits: 1 })}</td>
      <td class="py-2 px-3 ${t.annualizedBasisPct >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold">
        ${t.annualizedBasisPct >= 0 ? '+' : ''}${t.annualizedBasisPct.toFixed(2)}%
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function renderStakingPanel(decomp: StakingDecomposition): void {
  const elIssuance = document.getElementById('rl-staking-issuance');
  if (elIssuance) elIssuance.textContent = `${decomp.consensusIssuanceApy.toFixed(2)}% APY`;

  const elMev = document.getElementById('rl-staking-mev');
  if (elMev) elMev.textContent = `+${decomp.mevTipsApy.toFixed(2)}% Priority Tips`;

  const elTotal = document.getElementById('rl-staking-total');
  if (elTotal) elTotal.textContent = `${decomp.totalStakingApy.toFixed(2)}% Net APY`;

  const elPendle = document.getElementById('rl-staking-pendle');
  if (elPendle && decomp.pendleImpliedApyBenchmark !== undefined) {
    elPendle.textContent = `${decomp.pendleImpliedApyBenchmark.toFixed(2)}% APY (Pendle Implied)`;
  }
}

function applyRatesToTerminal(): void {
  let targetFunding = 10.0;
  let targetStaking = 3.2;

  if (state.activeTab === 'ou_stochastic' && state.latestStochasticResult) {
    targetFunding = state.latestStochasticResult.expectedCarryApr;
  } else if (state.activeTab === 'regimes') {
    targetFunding = state.regimeConfigs[state.activeRegime].fundingApr;
  } else if (state.activeTab === 'term_structure' && state.latestTermStructure) {
    targetFunding = state.latestTermStructure.interpolatedBasis90d;
  }

  if (state.latestStakingDecomposition) {
    targetStaking = state.latestStakingDecomposition.totalStakingApy;
  }

  callbacks.onApplyRates(targetFunding, targetStaking, state.ouParams);
}

function updateTabHeaderStyles(): void {
  const tabBtns = modalEl?.querySelectorAll('[data-action="rate-lab-tab"]');
  tabBtns?.forEach(btn => {
    const tab = (btn as HTMLElement).dataset.tab;
    if (tab === state.activeTab) {
      btn.className = 'px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono text-xs font-bold transition shadow-sm';
    } else {
      btn.className = 'px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-mono text-xs transition';
    }
  });
}

function toggleTabPanels(): void {
  const panelCanvas = document.getElementById('rl-panel-canvas-container');
  const panelRegimes = document.getElementById('rl-panel-regimes');
  const panelTermStructure = document.getElementById('rl-panel-term-structure');
  const panelStaking = document.getElementById('rl-panel-staking');
  const controlsOU = document.getElementById('rl-controls-ou');

  if (state.activeTab === 'ou_stochastic') {
    panelCanvas?.classList.remove('hidden');
    controlsOU?.classList.remove('hidden');
    panelRegimes?.classList.add('hidden');
    panelTermStructure?.classList.add('hidden');
    panelStaking?.classList.add('hidden');
  } else if (state.activeTab === 'term_structure') {
    panelCanvas?.classList.remove('hidden');
    controlsOU?.classList.add('hidden');
    panelRegimes?.classList.add('hidden');
    panelTermStructure?.classList.remove('hidden');
    panelStaking?.classList.add('hidden');
  } else if (state.activeTab === 'regimes') {
    panelCanvas?.classList.add('hidden');
    controlsOU?.classList.add('hidden');
    panelRegimes?.classList.remove('hidden');
    panelTermStructure?.classList.add('hidden');
    panelStaking?.classList.add('hidden');
  } else if (state.activeTab === 'staking') {
    panelCanvas?.classList.add('hidden');
    controlsOU?.classList.add('hidden');
    panelRegimes?.classList.add('hidden');
    panelTermStructure?.classList.add('hidden');
    panelStaking?.classList.remove('hidden');
  }
}

function updateEngineButtonStyles(): void {
  const btnSqmc = document.getElementById('btn-rl-engine-sqmc');
  const btnMc = document.getElementById('btn-rl-engine-mc');

  if (state.engineType === 'sqmc_sobol') {
    if (btnSqmc) btnSqmc.className = 'px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-mono font-bold';
    if (btnMc) btnMc.className = 'px-2 py-1 rounded bg-slate-900 text-slate-400 hover:bg-slate-800 text-[10px] font-mono';
  } else {
    if (btnSqmc) btnSqmc.className = 'px-2 py-1 rounded bg-slate-900 text-slate-400 hover:bg-slate-800 text-[10px] font-mono';
    if (btnMc) btnMc.className = 'px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-mono font-bold';
  }
}

function updateRegimeButtonStyles(): void {
  const regimeBtns = modalEl?.querySelectorAll('[data-action="rl-select-regime"]');
  regimeBtns?.forEach(b => {
    const reg = (b as HTMLElement).dataset.regime;
    if (reg === state.activeRegime) {
      b.className = 'p-3 rounded-xl bg-cyan-950/80 border-cyan-500 ring-1 ring-cyan-400/50 text-left font-mono transition shadow-lg cursor-pointer flex flex-col justify-between';
    } else {
      b.className = 'p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left font-mono transition cursor-pointer flex flex-col justify-between';
    }
  });
}
