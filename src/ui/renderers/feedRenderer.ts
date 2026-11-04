/**
 * @file feedRenderer.ts
 * @description Renders market data live feed ticker ribbon, venue buttons, sync indicators, and trailing horizon pills.
 */

import { fmtUSD, fmtPct, type HedgingState } from '../../math/hedging.js';
import { getLatestMarketData, type MarketDataSnapshot } from '../../services/marketData.js';
import { COLLATERAL_PRESETS } from '../../config/presets.js';
import type { UIElements } from '../dom.js';

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
      if (state.activePreset === 'fbtc_90') {
        liveStakingVal = COLLATERAL_PRESETS.fbtc_90.stakingAPY;
        liveStakingSource = 'Cobo FBTC Bybit Whitelist (~3.0%)';
      } else {
        liveStakingVal = 0.0;
        liveStakingSource = 'Vanilla Spot Collateral (0%)';
      }
    }
  } else if (asset === 'SOL') {
    if (state.activePreset === 'sanctum_inf_85') {
      liveStakingVal = state.solYieldType === 'nominal' ? 8.5 : 3.1;
      liveStakingSource = `Sanctum Infinity Pool (${state.solYieldType === 'nominal' ? 'Nominal' : 'Real'})`;
    } else {
      if (state.solYieldType === 'nominal') {
        liveStakingVal = data.SOL.nominalStakingAPY ?? 7.2;
        liveStakingSource = `${data.SOL.stakingSource} (Nominal)`;
      } else {
        liveStakingVal = data.SOL.realStakingAPY ?? 1.8;
        liveStakingSource = `${data.SOL.stakingSource} (Real net of inflation)`;
      }
    }
  }

  // Update Ribbon Values
  if (UI.feedLiveFundingVal) {
    UI.feedLiveFundingVal.textContent = `${fmtPct(assetRates.perpFundingAPR)} APR`;
    UI.feedLiveFundingVal.className = `font-bold font-mono ${assetRates.perpFundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (UI.feedFundingSource) {
    const srcShort = assetRates.fundingSource.includes('Binance') ? 'Binance' : (assetRates.fundingSource.includes('Hyperliquid') ? 'Hyperliquid' : 'Preset');
    const isClamped = Math.abs(assetRates.perpFundingAPR - 10.95) < 0.05;
    UI.feedFundingSource.textContent = isClamped ? `(${srcShort} • Clamped)` : `(${srcShort})`;
    UI.feedFundingSource.title = isClamped
      ? 'Current 8h settlement clamped at exchange protocol baseline (0.01%/8h = 10.95% APR). Click 7d/30d/90d pills below to use realized trailing averages.'
      : `Live perpetual funding rate from ${assetRates.fundingSource}`;
  }

  // Update Venue Switcher Buttons
  const activeVenue = data.selectedVenue || 'binance';
  const venueKeys = [
    { key: 'binance', feedBtn: UI.feedVenueBtnBinance, sliderBtn: UI.sliderVenueBtnBinance },
    { key: 'hyperliquid', feedBtn: UI.feedVenueBtnHyperliquid, sliderBtn: UI.sliderVenueBtnHyperliquid }
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
