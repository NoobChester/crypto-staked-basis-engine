/**
 * @file store.ts
 * @description Central reactive singleton store, subscriber bus, and polling coordinator for live market data.
 */

import {
  type FundingVenue,
  type VenueRateInfo,
  type TrailingAverages,
  type AssetHistoricalAnalytics,
  type MarketDataSnapshot,
  FALLBACK_MARKET_DATA,
  DEFAULT_TRAILING_AVERAGES
} from './types.js';
import { fetchBinanceRates, fetchHyperliquidRates, fetchWithTimeout } from './fundingApi.js';
import {
  fetchLidoStaking,
  fetchJitoStaking,
  fetchBtcLstStaking,
  fetchLstLiveDiscount
} from './stakingApi.js';
import { fetchAssetHistoricalAnalytics } from './historical.js';

let currentSnapshot: MarketDataSnapshot = JSON.parse(JSON.stringify(FALLBACK_MARKET_DATA));
const listeners: Array<(data: MarketDataSnapshot) => void> = [];
let autoRefreshTimer: ReturnType<typeof setInterval> | null = null;

export async function fetchLiveMarketData(): Promise<MarketDataSnapshot> {
  currentSnapshot.isLoading = true;
  notifyListeners();

  try {
    let hlData: any = null;
    try {
      const res = await fetchWithTimeout('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      }, 5000);
      if (res.ok) hlData = await res.json();
    } catch {
      // Hyperliquid offline or blocked
    }

    const [
      ethBinance,
      btcBinance,
      solBinance,
      ethHl,
      btcHl,
      solHl,
      lidoStaking,
      jitoStaking,
      btcLstRates,
      ethDiscount,
      btcDiscount,
      solDiscount
    ] = await Promise.all([
      fetchBinanceRates('ETH'),
      fetchBinanceRates('BTC'),
      fetchBinanceRates('SOL'),
      fetchHyperliquidRates('ETH', hlData),
      fetchHyperliquidRates('BTC', hlData),
      fetchHyperliquidRates('SOL', hlData),
      fetchLidoStaking(),
      fetchJitoStaking(),
      fetchBtcLstStaking(),
      fetchLstLiveDiscount('ETH'),
      fetchLstLiveDiscount('BTC'),
      fetchLstLiveDiscount('SOL')
    ]);

    const buildVenues = (b: VenueRateInfo, hl: VenueRateInfo): Record<FundingVenue, VenueRateInfo> => {
      return {
        binance: b,
        hyperliquid: hl
      };
    };

    const ethVenues = buildVenues(ethBinance, ethHl);
    const btcVenues = buildVenues(btcBinance, btcHl);
    const solVenues = buildVenues(solBinance, solHl);

    const venue = currentSnapshot.selectedVenue || 'binance';
    const now = Date.now();
    const isLive = ethBinance.status === 'live' || ethHl.status === 'live';

    // Compute or retrieve eager trailing averages
    let ethHist: AssetHistoricalAnalytics | null = null;
    let btcHist: AssetHistoricalAnalytics | null = null;
    let solHist: AssetHistoricalAnalytics | null = null;

    try {
      [ethHist, btcHist, solHist] = await Promise.all([
        fetchAssetHistoricalAnalytics('ETH', 90),
        fetchAssetHistoricalAnalytics('BTC', 90),
        fetchAssetHistoricalAnalytics('SOL', 90, 'real')
      ]);
    } catch {
      // Use fallback averages if network history is slow
    }

    const ethTrailing: TrailingAverages = ethHist ? {
      funding7d: ethHist.funding7d.avg,
      funding30d: ethHist.funding30d.avg,
      funding90d: ethHist.funding90d.avg,
      staking7d: ethHist.staking7d.avg,
      staking30d: ethHist.staking30d.avg,
      staking90d: ethHist.staking90d.avg
    } : DEFAULT_TRAILING_AVERAGES.ETH;

    const btcTrailing: TrailingAverages = btcHist ? {
      funding7d: btcHist.funding7d.avg,
      funding30d: btcHist.funding30d.avg,
      funding90d: btcHist.funding90d.avg,
      staking7d: btcHist.staking7d.avg,
      staking30d: btcHist.staking30d.avg,
      staking90d: btcHist.staking90d.avg
    } : DEFAULT_TRAILING_AVERAGES.BTC;

    const solTrailing: TrailingAverages = solHist ? {
      funding7d: solHist.funding7d.avg,
      funding30d: solHist.funding30d.avg,
      funding90d: solHist.funding90d.avg,
      staking7d: solHist.staking7d.avg,
      staking30d: solHist.staking30d.avg,
      staking90d: solHist.staking90d.avg
    } : DEFAULT_TRAILING_AVERAGES.SOL;

    currentSnapshot = {
      ETH: {
        perpFundingAPR: ethVenues[venue].apr,
        markPrice: ethVenues[venue].markPrice,
        venues: ethVenues,
        selectedVenue: venue,
        nextFundingTime: ethVenues[venue].nextFundingTime,
        stakingAPY: lidoStaking.apy,
        stakingSource: lidoStaking.source,
        fundingSource: ethVenues[venue].venueName,
        lstDiscount: ethDiscount,
        lastUpdated: now,
        status: ethVenues[venue].status,
        trailingAverages: ethTrailing
      },
      BTC: {
        perpFundingAPR: btcVenues[venue].apr,
        markPrice: btcVenues[venue].markPrice,
        venues: btcVenues,
        selectedVenue: venue,
        nextFundingTime: btcVenues[venue].nextFundingTime,
        stakingAPY: 0.0,
        stakingSource: 'Native BTC Spot (0%)',
        fundingSource: btcVenues[venue].venueName,
        lstDiscount: btcDiscount,
        lastUpdated: now,
        status: btcVenues[venue].status,
        trailingAverages: btcTrailing
      },
      SOL: {
        perpFundingAPR: solVenues[venue].apr,
        markPrice: solVenues[venue].markPrice,
        venues: solVenues,
        selectedVenue: venue,
        nextFundingTime: solVenues[venue].nextFundingTime,
        stakingAPY: jitoStaking.real,
        nominalStakingAPY: jitoStaking.nominal,
        realStakingAPY: jitoStaking.real,
        stakingSource: jitoStaking.source,
        fundingSource: solVenues[venue].venueName,
        lstDiscount: solDiscount,
        lastUpdated: now,
        status: solVenues[venue].status,
        trailingAverages: solTrailing
      },
      btcLst: btcLstRates,
      selectedVenue: venue,
      lastSynced: now,
      isLoading: false,
      isLive,
      error: null
    };

  } catch (err: any) {
    currentSnapshot.isLoading = false;
    currentSnapshot.error = err?.message || 'Failed to sync market feeds';
  }

  notifyListeners();
  return currentSnapshot;
}

export function setFundingVenue(venue: FundingVenue): MarketDataSnapshot {
  currentSnapshot.selectedVenue = venue;
  (['ETH', 'BTC', 'SOL'] as const).forEach(asset => {
    const vInfo = currentSnapshot[asset].venues[venue];
    currentSnapshot[asset].selectedVenue = venue;
    currentSnapshot[asset].perpFundingAPR = vInfo.apr;
    currentSnapshot[asset].markPrice = vInfo.markPrice;
    currentSnapshot[asset].nextFundingTime = vInfo.nextFundingTime;
    currentSnapshot[asset].fundingSource = vInfo.venueName;
    currentSnapshot[asset].status = vInfo.status;
  });
  notifyListeners();
  return currentSnapshot;
}

export function getLatestMarketData(): MarketDataSnapshot {
  return currentSnapshot;
}

export function subscribeMarketData(callback: (data: MarketDataSnapshot) => void): () => void {
  listeners.push(callback);
  callback(currentSnapshot);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notifyListeners(): void {
  for (const listener of listeners) {
    try {
      listener(currentSnapshot);
    } catch (e) {
      console.error('Market data subscriber error:', e);
    }
  }
}

export function startAutoRefresh(intervalMs = 60000): void {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  fetchLiveMarketData();
  autoRefreshTimer = setInterval(() => {
    fetchLiveMarketData();
  }, intervalMs);
}

export function stopAutoRefresh(): void {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
}
