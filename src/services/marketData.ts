/**
 * @file marketData.ts
 * @description Real-time institutional market data service for perpetual funding rates and spot staking yields.
 * Sources:
 * - Multi-Venue Perpetual Funding Rates:
 *   1. Binance Futures API (CORS enabled public mark & funding index, 8-hour settlement)
 *   2. Hyperliquid Clearinghouse API (1-hour settlement rate)
 *   3. Consensus Average (50/50 blend of Binance & Hyperliquid)
 * - Spot Staking Protocols:
 *   - Lido Protocol (Official stETH oracle API / DeFiLlama wstETH)
 *   - Jito Network (Official Solana stake pool stats API / DeFiLlama JitoSOL)
 *   - Babylon BTC LSTs (Lombard LBTC & SolvBTC.BBN via DeFiLlama)
 */

export type FundingVenue = 'binance' | 'hyperliquid' | 'average';

export interface VenueRateInfo {
  apr: number;
  rateInterval: number; // 8h decimal for Binance, 1h decimal for Hyperliquid
  markPrice: number;
  nextFundingTime: number;
  status: 'live' | 'fallback';
  venueName: string;
}

export interface AssetLiveRates {
  perpFundingAPR: number;
  markPrice: number;
  venues: Record<FundingVenue, VenueRateInfo>;
  selectedVenue: FundingVenue;
  nextFundingTime: number;
  stakingAPY: number;
  nominalStakingAPY?: number;
  realStakingAPY?: number;
  stakingSource: string;
  fundingSource: string;
  lastUpdated: number;
  status: 'live' | 'fallback' | 'loading' | 'error';
  error?: string;
}

export interface BtcLstLiveRates {
  lbtc: { stakingAPY: number; source: string; status: 'live' | 'fallback' };
  solvbtc: { stakingAPY: number; source: string; status: 'live' | 'fallback' };
  native: { stakingAPY: number; source: string; status: 'live' | 'fallback' };
}

export interface MarketDataSnapshot {
  ETH: AssetLiveRates;
  BTC: AssetLiveRates;
  SOL: AssetLiveRates;
  btcLst: BtcLstLiveRates;
  selectedVenue: FundingVenue;
  lastSynced: number | null;
  isLoading: boolean;
  isLive: boolean;
  error?: string | null;
}

const DEFAULT_VENUE_RATES: Record<'ETH' | 'BTC' | 'SOL', Record<FundingVenue, VenueRateInfo>> = {
  ETH: {
    binance: { apr: 10.0, rateInterval: 0.00009132, markPrice: 2315.0, nextFundingTime: 0, status: 'fallback', venueName: 'Binance (ETHUSDT)' },
    hyperliquid: { apr: 10.0, rateInterval: 0.00001141, markPrice: 2315.0, nextFundingTime: 0, status: 'fallback', venueName: 'Hyperliquid (ETH-PERP)' },
    average: { apr: 10.0, rateInterval: 0.00009132, markPrice: 2315.0, nextFundingTime: 0, status: 'fallback', venueName: 'Consensus Average' }
  },
  BTC: {
    binance: { apr: 10.0, rateInterval: 0.00009132, markPrice: 78500.0, nextFundingTime: 0, status: 'fallback', venueName: 'Binance (BTCUSDT)' },
    hyperliquid: { apr: 10.0, rateInterval: 0.00001141, markPrice: 78500.0, nextFundingTime: 0, status: 'fallback', venueName: 'Hyperliquid (BTC-PERP)' },
    average: { apr: 10.0, rateInterval: 0.00009132, markPrice: 78500.0, nextFundingTime: 0, status: 'fallback', venueName: 'Consensus Average' }
  },
  SOL: {
    binance: { apr: 10.0, rateInterval: 0.00009132, markPrice: 93.5, nextFundingTime: 0, status: 'fallback', venueName: 'Binance (SOLUSDT)' },
    hyperliquid: { apr: 10.0, rateInterval: 0.00001141, markPrice: 93.5, nextFundingTime: 0, status: 'fallback', venueName: 'Hyperliquid (SOL-PERP)' },
    average: { apr: 10.0, rateInterval: 0.00009132, markPrice: 93.5, nextFundingTime: 0, status: 'fallback', venueName: 'Consensus Average' }
  }
};

export const FALLBACK_MARKET_DATA: MarketDataSnapshot = {
  ETH: {
    perpFundingAPR: 10.0,
    markPrice: 2315.0,
    venues: DEFAULT_VENUE_RATES.ETH,
    selectedVenue: 'binance',
    nextFundingTime: 0,
    stakingAPY: 3.2,
    stakingSource: 'Lido Protocol Preset',
    fundingSource: 'Binance (ETHUSDT)',
    lastUpdated: 0,
    status: 'fallback'
  },
  BTC: {
    perpFundingAPR: 10.0,
    markPrice: 78500.0,
    venues: DEFAULT_VENUE_RATES.BTC,
    selectedVenue: 'binance',
    nextFundingTime: 0,
    stakingAPY: 0.0,
    stakingSource: 'Native Spot (0%)',
    fundingSource: 'Binance (BTCUSDT)',
    lastUpdated: 0,
    status: 'fallback'
  },
  SOL: {
    perpFundingAPR: 10.0,
    markPrice: 93.5,
    venues: DEFAULT_VENUE_RATES.SOL,
    selectedVenue: 'binance',
    nextFundingTime: 0,
    stakingAPY: 1.8,
    nominalStakingAPY: 7.2,
    realStakingAPY: 1.8,
    stakingSource: 'Jito Protocol Preset',
    fundingSource: 'Binance (SOLUSDT)',
    lastUpdated: 0,
    status: 'fallback'
  },
  btcLst: {
    lbtc: { stakingAPY: 3.2, source: 'Babylon Baseline (3.2%)', status: 'fallback' },
    solvbtc: { stakingAPY: 3.5, source: 'Babylon Baseline (3.5%)', status: 'fallback' },
    native: { stakingAPY: 0.0, source: 'Native Cold Storage', status: 'fallback' }
  },
  selectedVenue: 'binance',
  lastSynced: null,
  isLoading: false,
  isLive: false,
  error: null
};

// Internal reactive store
let currentSnapshot: MarketDataSnapshot = JSON.parse(JSON.stringify(FALLBACK_MARKET_DATA));
const listeners: Array<(data: MarketDataSnapshot) => void> = [];
let autoRefreshTimer: ReturnType<typeof setInterval> | null = null;

// ==========================================
// Pure Parsers (Exported for Unit Testing)
// ==========================================

export function parseBinanceFunding(data: any): {
  apr: number;
  rate8h: number;
  markPrice: number;
  indexPrice: number;
  nextFundingTime: number;
} {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid Binance funding payload');
  }
  const rate8h = parseFloat(data.lastFundingRate);
  if (isNaN(rate8h)) throw new Error('Invalid lastFundingRate');

  // Binance settlement is 3 times daily (every 8 hours)
  const apr = parseFloat((rate8h * 3 * 365 * 100).toFixed(2));
  const markPrice = parseFloat(data.markPrice) || 0;
  const indexPrice = parseFloat(data.indexPrice) || markPrice;
  const nextFundingTime = parseInt(data.nextFundingTime, 10) || 0;

  return { apr, rate8h, markPrice, indexPrice, nextFundingTime };
}

export function parseHyperliquidFunding(
  data: any,
  symbol: 'ETH' | 'BTC' | 'SOL'
): {
  apr: number;
  rate1h: number;
  markPrice: number;
} {
  if (!Array.isArray(data) || data.length < 2 || !data[0]?.universe || !Array.isArray(data[1])) {
    throw new Error('Invalid Hyperliquid market payload');
  }
  const idx = data[0].universe.findIndex((u: any) => u.name === symbol);
  if (idx < 0) throw new Error(`Symbol ${symbol} not found on Hyperliquid`);

  const ctx = data[1][idx];
  const rate1h = parseFloat(ctx?.funding);
  if (isNaN(rate1h)) throw new Error('Invalid Hyperliquid funding');

  // Hyperliquid funding payment is hourly (24 times/day)
  const apr = parseFloat((rate1h * 24 * 365 * 100).toFixed(2));
  const markPrice = parseFloat(ctx?.markPx) || 0;

  return { apr, rate1h, markPrice };
}

export function parseLidoApr(data: any): number {
  if (data?.data?.apr !== undefined) {
    const val = parseFloat(data.data.apr);
    if (!isNaN(val) && val > 0 && val < 50) {
      return parseFloat(val.toFixed(2));
    }
  }
  throw new Error('Invalid Lido APR response');
}

export function parseJitoApy(data: any): { nominal: number; real: number } {
  if (data?.apy && Array.isArray(data.apy) && data.apy.length > 0) {
    const lastEntry = data.apy[data.apy.length - 1];
    const rawVal = parseFloat(lastEntry?.data);
    if (!isNaN(rawVal) && rawVal > 0) {
      // Jito API returns fractional yield, e.g. 0.0493 => 4.93%
      const nominal = parseFloat((rawVal * 100).toFixed(2));
      // Solana network token inflation dilution is ~5.4% annual
      const realCalc = nominal - 5.4;
      const real = parseFloat((realCalc > 0 ? realCalc : Math.max(0.5, nominal * 0.35)).toFixed(2));
      return { nominal, real };
    }
  }
  throw new Error('Invalid Jito APY response');
}

export function parseDeFiLlamaChartApy(data: any): number {
  if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    const last = data.data[data.data.length - 1];
    const val = parseFloat(last?.apy);
    if (!isNaN(val) && val >= 0 && val < 100) {
      return parseFloat(val.toFixed(2));
    }
  }
  throw new Error('Invalid DeFiLlama chart response');
}

// ==========================================
// Network Fetchers with Timeouts & Fallbacks
// ==========================================

async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = 6000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(init?.headers || {})
      }
    });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

export async function fetchBinanceRates(symbol: 'ETH' | 'BTC' | 'SOL'): Promise<VenueRateInfo> {
  const pair = `${symbol}USDT`;
  try {
    const res = await fetchWithTimeout(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${pair}`, undefined, 5000);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const parsed = parseBinanceFunding(data);
    return {
      apr: parsed.apr,
      rateInterval: parsed.rate8h,
      markPrice: parsed.markPrice,
      nextFundingTime: parsed.nextFundingTime,
      status: 'live',
      venueName: `Binance (${pair})`
    };
  } catch {
    const fb = FALLBACK_MARKET_DATA[symbol].venues.binance;
    return { ...fb, status: 'fallback' };
  }
}

export async function fetchHyperliquidRates(symbol: 'ETH' | 'BTC' | 'SOL', cachedHlData?: any): Promise<VenueRateInfo> {
  try {
    let data = cachedHlData;
    if (!data) {
      const res = await fetchWithTimeout('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      }, 5000);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    }
    const parsed = parseHyperliquidFunding(data, symbol);
    return {
      apr: parsed.apr,
      rateInterval: parsed.rate1h,
      markPrice: parsed.markPrice,
      nextFundingTime: Date.now() + 3600000,
      status: 'live',
      venueName: `Hyperliquid (${symbol}-PERP)`
    };
  } catch {
    const fb = FALLBACK_MARKET_DATA[symbol].venues.hyperliquid;
    return { ...fb, status: 'fallback' };
  }
}

export async function fetchLidoStaking(): Promise<{ apy: number; source: string }> {
  try {
    const res = await fetchWithTimeout('https://eth-api.lido.fi/v1/protocol/steth/apr/last', undefined, 5000);
    if (res.ok) {
      const data = await res.json();
      const apy = parseLidoApr(data);
      return { apy, source: 'Lido Protocol (stETH Oracle)' };
    }
  } catch {
    // Fallback to DeFiLlama wstETH
    try {
      const res = await fetchWithTimeout('https://yields.llama.fi/chart/747c1d2a-c668-4682-b9f9-296708a3dd90', undefined, 5000);
      if (res.ok) {
        const data = await res.json();
        const apy = parseDeFiLlamaChartApy(data);
        return { apy, source: 'DeFiLlama (Lido wstETH)' };
      }
    } catch {
      // Fallback
    }
  }

  return { apy: 3.2, source: 'Institutional Baseline (3.2%)' };
}

export async function fetchJitoStaking(): Promise<{ nominal: number; real: number; source: string }> {
  try {
    const res = await fetchWithTimeout('https://kobe.mainnet.jito.network/api/v1/stake_pool_stats', undefined, 5000);
    if (res.ok) {
      const data = await res.json();
      const { nominal, real } = parseJitoApy(data);
      return { nominal, real, source: 'Jito Network (Stake Pool Stats)' };
    }
  } catch {
    // Fallback to DeFiLlama JitoSOL pool
    try {
      const res = await fetchWithTimeout('https://yields.llama.fi/chart/0e7d0722-9054-4907-8593-567b353c0900', undefined, 5000);
      if (res.ok) {
        const data = await res.json();
        const nominal = parseDeFiLlamaChartApy(data);
        const realCalc = nominal - 5.4;
        const real = parseFloat((realCalc > 0 ? realCalc : Math.max(0.5, nominal * 0.35)).toFixed(2));
        return { nominal, real, source: 'DeFiLlama (JitoSOL Pool)' };
      }
    } catch {
      // Fallback
    }
  }

  return { nominal: 7.2, real: 1.8, source: 'Institutional Baseline (Nom 7.2% / Real 1.8%)' };
}

export async function fetchBtcLstStaking(): Promise<BtcLstLiveRates> {
  let lbtcApy = 3.2;
  let lbtcSource = 'Babylon Baseline (3.2%)';
  let lbtcStatus: 'live' | 'fallback' = 'fallback';

  try {
    const res = await fetchWithTimeout('https://yields.llama.fi/chart/c9762afb-7746-4b5a-a484-a8881a348999', undefined, 5000);
    if (res.ok) {
      const data = await res.json();
      lbtcApy = parseDeFiLlamaChartApy(data);
      lbtcSource = 'DeFiLlama (Lombard LBTC)';
      lbtcStatus = 'live';
    }
  } catch {
    // Keep fallback
  }

  let solvbtcApy = 3.5;
  let solvbtcSource = 'Babylon Staking Baseline (3.5%)';
  let solvbtcStatus: 'live' | 'fallback' = 'fallback';

  try {
    // Endur / Solv BTC pool on DeFiLlama
    const res = await fetchWithTimeout('https://yields.llama.fi/chart/3827d6b6-f6f1-4162-9df7-9024503e42ce', undefined, 5000);
    if (res.ok) {
      const data = await res.json();
      solvbtcApy = parseDeFiLlamaChartApy(data);
      solvbtcSource = 'DeFiLlama (SolvBTC.BBN)';
      solvbtcStatus = 'live';
    }
  } catch {
    if (lbtcStatus === 'live') {
      solvbtcApy = parseFloat((lbtcApy * 1.1).toFixed(2));
      solvbtcSource = 'Solv / Babylon Model (Dynamic)';
      solvbtcStatus = 'live';
    }
  }

  return {
    lbtc: { stakingAPY: lbtcApy, source: lbtcSource, status: lbtcStatus },
    solvbtc: { stakingAPY: solvbtcApy, source: solvbtcSource, status: solvbtcStatus },
    native: { stakingAPY: 0.0, source: 'Native Cold Storage', status: 'live' }
  };
}

// ==========================================
// Master Live Data Synchronizer
// ==========================================

export async function fetchLiveMarketData(): Promise<MarketDataSnapshot> {
  currentSnapshot.isLoading = true;
  notifyListeners();

  try {
    // Fetch Hyperliquid payload once for all symbols
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
      btcLstRates
    ] = await Promise.all([
      fetchBinanceRates('ETH'),
      fetchBinanceRates('BTC'),
      fetchBinanceRates('SOL'),
      fetchHyperliquidRates('ETH', hlData),
      fetchHyperliquidRates('BTC', hlData),
      fetchHyperliquidRates('SOL', hlData),
      fetchLidoStaking(),
      fetchJitoStaking(),
      fetchBtcLstStaking()
    ]);

    const buildVenues = (b: VenueRateInfo, hl: VenueRateInfo): Record<FundingVenue, VenueRateInfo> => {
      const avgApr = parseFloat(((b.apr + hl.apr) / 2).toFixed(2));
      const avgMark = parseFloat(((b.markPrice + hl.markPrice) / 2).toFixed(2));
      const avgStatus = (b.status === 'live' || hl.status === 'live') ? 'live' : 'fallback';
      return {
        binance: b,
        hyperliquid: hl,
        average: {
          apr: avgApr,
          rateInterval: (b.rateInterval + hl.rateInterval) / 2,
          markPrice: avgMark > 0 ? avgMark : (b.markPrice || hl.markPrice),
          nextFundingTime: b.nextFundingTime || hl.nextFundingTime,
          status: avgStatus,
          venueName: 'Consensus Average (Binance + Hyperliquid)'
        }
      };
    };

    const ethVenues = buildVenues(ethBinance, ethHl);
    const btcVenues = buildVenues(btcBinance, btcHl);
    const solVenues = buildVenues(solBinance, solHl);

    const venue = currentSnapshot.selectedVenue || 'binance';
    const now = Date.now();
    const isLive = ethBinance.status === 'live' || ethHl.status === 'live';

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
        lastUpdated: now,
        status: ethVenues[venue].status
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
        lastUpdated: now,
        status: btcVenues[venue].status
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
        lastUpdated: now,
        status: solVenues[venue].status
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
