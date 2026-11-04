/**
 * @file depegRenderer.ts
 * @description Renders LST basis discount slider, depeg presets, and native collateral status.
 */

import type { HedgingState } from '../../math/hedging.js';
import type { MarketDataSnapshot } from '../../services/marketData.js';
import type { UIElements } from '../dom.js';

export function updateDepegControl(
  UI: UIElements,
  state: HedgingState,
  snapshot: MarketDataSnapshot
): void {
  // Determine if active instrument is native vanilla spot without LST depeg risk
  let isNative = false;
  if (state.mode === 'unified') {
    isNative = state.activePreset === 'inverse_100' || state.activePreset === 'btc_eth_95';
  } else {
    isNative = state.tradedAsset === 'BTC' && state.btcVariant === 'native';
  }

  if (isNative) {
    if (UI.inputDepeg) {
      UI.inputDepeg.disabled = true;
      UI.inputDepeg.classList.add('opacity-40', 'cursor-not-allowed');
      UI.inputDepeg.value = '0';
    }
    if (UI.badgeDepegNative) UI.badgeDepegNative.classList.remove('hidden');
    if (UI.containerDepegPills) UI.containerDepegPills.classList.add('hidden');
    if (UI.valDepeg) UI.valDepeg.textContent = '0.0% (Vanilla Spot)';
    if (UI.descDepegSource) UI.descDepegSource.textContent = 'Vanilla Spot Collateral (Zero LST Basis Risk)';
    if (UI.descDepegStatus) UI.descDepegStatus.textContent = 'No depeg risk';
    return;
  }

  // LST active
  if (UI.inputDepeg) {
    UI.inputDepeg.disabled = false;
    UI.inputDepeg.classList.remove('opacity-40', 'cursor-not-allowed');
  }
  if (UI.badgeDepegNative) UI.badgeDepegNative.classList.add('hidden');
  if (UI.containerDepegPills) UI.containerDepegPills.classList.remove('hidden');

  let livePct = 0.08;
  let sourceText = 'Secondary DEX vs Canonical Wrap';
  let assetLabel = 'wstETH';

  const asset = state.tradedAsset || 'ETH';
  if (asset === 'ETH') {
    const info = snapshot.ETH?.lstDiscount;
    livePct = info?.discountPct ?? 0.08;
    sourceText = info?.source ?? 'DeFiLlama (wstETH vs Canonical Wrap)';
    assetLabel = 'wstETH';
  } else if (asset === 'SOL') {
    const info = snapshot.SOL?.lstDiscount;
    livePct = info?.discountPct ?? 0.05;
    sourceText = info?.source ?? 'Jito Network (Stake Pool Stats)';
    assetLabel = 'JitoSOL';
  } else if (asset === 'BTC') {
    if (state.btcVariant === 'solvbtc') {
      livePct = snapshot.btcLst?.solvbtc?.discountPct ?? 0.12;
      sourceText = 'DeFiLlama (SolvBTC.BBN vs BTC)';
      assetLabel = 'SolvBTC';
    } else {
      livePct = snapshot.btcLst?.lbtc?.discountPct ?? 0.08;
      sourceText = 'DeFiLlama (Lombard LBTC vs BTC)';
      assetLabel = 'LBTC';
    }
  }

  if (UI.labelPillDepegLive) {
    UI.labelPillDepegLive.textContent = `${livePct.toFixed(2)}% (${assetLabel})`;
  }
  if (UI.descDepegSource) {
    UI.descDepegSource.textContent = `Source: ${sourceText}`;
  }
  if (UI.descDepegStatus) {
    UI.descDepegStatus.textContent = livePct <= 0.20 ? 'Normal peg range' : 'Elevated discount';
  }

  // Active pill highlight
  const activeClass = 'text-[10px] px-2 py-0.5 rounded font-bold transition font-mono cursor-pointer bg-rose-950 text-rose-300 border border-rose-700 shadow-sm';
  const inactiveClass = 'text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition font-mono cursor-pointer';

  if (UI.pillDepeg0) UI.pillDepeg0.className = state.depegPct === 0 ? activeClass : inactiveClass;
  if (UI.pillDepeg2) UI.pillDepeg2.className = state.depegPct === 2 ? activeClass : inactiveClass;
  if (UI.pillDepeg5) UI.pillDepeg5.className = state.depegPct === 5 ? activeClass : inactiveClass;
  if (UI.pillDepeg8) UI.pillDepeg8.className = state.depegPct === 8 ? activeClass : inactiveClass;
}
