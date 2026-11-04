/**
 * @file scenarioRenderer.ts
 * @description Renders the Institutional Crisis & Stress-Test Matrix buttons,
 * active scenario state indicators, and dynamic margin risk diagnostic verdicts.
 */

import type { HedgingState, HedgingOutcome } from '../../math/hedging.js';
import { CRISIS_SCENARIOS, type CrisisScenarioKey } from '../../config/scenarios.js';
import type { UIElements } from '../dom.js';

const SCENARIO_BUTTON_MAP: Record<CrisisScenarioKey, keyof UIElements> = {
  celsius_depeg_2022: 'scenarioBtnCelsius',
  ftx_carry_winter: 'scenarioBtnFtx',
  parabolic_squeeze_2x: 'scenarioBtnParabolic',
  haircut_compression: 'scenarioBtnHaircut',
  flash_crash_yen: 'scenarioBtnFlashCrash',
  meme_mania_rally: 'scenarioBtnMeme'
};

const BASE_BTN_CLASSES =
  'p-3 bg-brand-surface/70 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between';

const ACCENT_ACTIVE_CLASSES: Record<string, string> = {
  rose: 'p-3 bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/30 ring-1 ring-rose-400/50 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between',
  amber: 'p-3 bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/50 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between',
  cyan: 'p-3 bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-400/50 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between',
  indigo: 'p-3 bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/30 ring-1 ring-indigo-400/50 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between',
  purple: 'p-3 bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/30 ring-1 ring-purple-400/50 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between'
};

export function renderScenarioMatrix(
  UI: UIElements,
  state: HedgingState,
  outcome: HedgingOutcome,
  activeScenarioKey: CrisisScenarioKey | null
): void {
  // Update Scenario Buttons state styling
  for (const [key, btnProp] of Object.entries(SCENARIO_BUTTON_MAP) as [CrisisScenarioKey, keyof UIElements][]) {
    const btn = UI[btnProp] as HTMLElement | null;
    if (!btn) continue;

    const isActive = activeScenarioKey === key;
    if (isActive) {
      const scenario = CRISIS_SCENARIOS[key];
      const accent = scenario?.accentColor || 'cyan';
      btn.className = ACCENT_ACTIVE_CLASSES[accent] || ACCENT_ACTIVE_CLASSES.cyan;
    } else {
      btn.className = BASE_BTN_CLASSES;
    }
  }

  // Restore Live Feeds button visibility
  if (UI.btnRestoreLiveFeeds) {
    if (activeScenarioKey !== null) {
      UI.btnRestoreLiveFeeds.classList.remove('hidden');
      UI.btnRestoreLiveFeeds.classList.add('inline-flex');
    } else {
      UI.btnRestoreLiveFeeds.classList.add('hidden');
      UI.btnRestoreLiveFeeds.classList.remove('inline-flex');
    }
  }

  // Dynamic Risk Diagnosis Verdict Box
  if (!UI.scenarioVerdictBox) return;

  if (!activeScenarioKey || !CRISIS_SCENARIOS[activeScenarioKey]) {
    UI.scenarioVerdictBox.classList.add('hidden');
    return;
  }

  const scenario = CRISIS_SCENARIOS[activeScenarioKey];
  const diagnosis = scenario.getDiagnosis(state, outcome);

  UI.scenarioVerdictBox.classList.remove('hidden');

  // Box border and background styling based on risk state
  if (diagnosis.status === 'liquidated') {
    UI.scenarioVerdictBox.className = 'p-3.5 rounded-xl border bg-rose-950/50 border-rose-600/80 text-rose-200 transition-all text-xs';
  } else if (diagnosis.status === 'inverted') {
    UI.scenarioVerdictBox.className = 'p-3.5 rounded-xl border bg-amber-950/50 border-amber-600/80 text-amber-200 transition-all text-xs';
  } else if (diagnosis.status === 'protected') {
    UI.scenarioVerdictBox.className = 'p-3.5 rounded-xl border bg-emerald-950/50 border-emerald-600/80 text-emerald-200 transition-all text-xs';
  } else {
    UI.scenarioVerdictBox.className = 'p-3.5 rounded-xl border bg-slate-900/80 border-slate-700/80 text-slate-200 transition-all text-xs';
  }

  if (UI.scenarioVerdictTitle) {
    UI.scenarioVerdictTitle.textContent = diagnosis.verdictTitle;
  }

  if (UI.scenarioVerdictText) {
    UI.scenarioVerdictText.textContent = diagnosis.verdictText;
  }

  if (UI.scenarioVerdictPill) {
    UI.scenarioVerdictPill.textContent = diagnosis.riskPill;
    UI.scenarioVerdictPill.className = `text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${diagnosis.badgeClass}`;
  }
}
