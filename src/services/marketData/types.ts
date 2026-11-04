/**
 * @file types.ts
 * @description Data interfaces, types, and fallback baselines for institutional market data feeds.
 */

export type FundingVenue = 'binance' | 'hyperliquid';

export interface VenueRateInfo {
  apr: number;
  rateInterval: number; // 8h decimal for Binance, 1h decimal for Hyperliquid
  markPrice: number;
  nextFundingTime: number;
  status: 'live' | 'fallback';
  venueName: string;
}

export interface TrailingAverages {
  funding7d: number;
  funding30d: number;
  funding90d: number;
  staking7d: number;
  staking30d: number;
  staking90d: number;
}

export interface LstDiscountInfo {
  discountPct: number; // max(0, rawBasisPct) clamped to >= 0 for shock slider
  rawBasisPct: number; // exact raw %: positive = discount, negative = premium
  fairRatio: number;
  marketRatio: number;
  source: string;
  status: 'live' | 'fallback';
  isNative: boolean;
  assetName: string;
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
  lstDiscount?: LstDiscountInfo;
  lastUpdated: number;
  status: 'live' | 'fallback' | 'loading' | 'error';
  trailingAverages: TrailingAverages;
  error?: string;
}

export interface BtcLstLiveRates {
  lbtc: { stakingAPY: number; source: string; status: 'live' | 'fallback'; discountPct: number; rawBasisPct: number };
  solvbtc: { stakingAPY: number; source: string; status: 'live' | 'fallback'; discountPct: number; rawBasisPct: number };
  native: { stakingAPY: number; source: string; status: 'live' | 'fallback'; discountPct: number; rawBasisPct: number };
}

export interface HistoricalRatePoint {
  date: string; // YYYY-MM-DD
  timestamp: number;
  binanceApr: number;
  hyperliquidApr: number;
  venueSpread?: number;
  bestFundingApr: number; // Highest of Binance and Hyperliquid
  stakingApy: number;
  netCarryApy: number; // Staking APY + bestFundingApr
  lstDiscountPct: number; // Daily LST basis discount %
}

export interface HistoricalWindowStats {
  avg: number;
  min: number;
  max: number;
  stdDev: number;
  negativeIntervalPct: number;
  intervalCount: number;
}

export interface AssetHistoricalAnalytics {
  symbol: 'ETH' | 'BTC' | 'SOL';
  rangeDays: 30 | 90 | 180;
  funding7d: HistoricalWindowStats;
  funding30d: HistoricalWindowStats;
  funding90d: HistoricalWindowStats;
  staking7d: HistoricalWindowStats;
  staking30d: HistoricalWindowStats;
  staking90d: HistoricalWindowStats;
  series: HistoricalRatePoint[];
  binanceAvg: number;
  hyperliquidAvg: number;
  venueSpreadAvg: number;
  leadingVenue: 'Binance' | 'Hyperliquid' | 'Tied';
  bestFundingAvg: number; // max(binanceAvg, hyperliquidAvg)
  stakingAvg: number;
  netCarryAvg: number; // stakingAvg + bestFundingAvg
  fundingDivergence?: number; // abs(binance - hyperliquid)
  lstDiscountAvg: number;
  lstDiscountMax: number;
  lastFetched: number;
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

export const DEFAULT_TBILL_RATE = 4.35; // 3-Month US Treasury Bill Yield (% APY)

export const VENUE_EXECUTION_FEES: Record<FundingVenue, { roundtripPct: number; label: string }> = {
  binance: { roundtripPct: 0.10, label: 'Binance (10 bps roundtrip)' },
  hyperliquid: { roundtripPct: 0.07, label: 'Hyperliquid (7 bps roundtrip)' }
};

export type ExecutionFeeTier = 'vip' | 'retail' | 'mm';

export const FEE_TIERS: Record<ExecutionFeeTier, { feePct: number; label: string; desc: string }> = {
  vip: { feePct: 0.10, label: 'Institutional VIP (10 bps)', desc: 'Standard Tier-1 CEX VIP 3-5 taker/maker execution blend' },
  retail: { feePct: 0.16, label: 'Retail Standard (16 bps)', desc: 'Standard non-VIP public taker schedule' },
  mm: { feePct: 0.04, label: 'Market Maker (4 bps)', desc: 'High-volume liquidity provision rebate & VIP 9 schedule' }
};

export const DEFAULT_VENUE_RATES: Record<'ETH' | 'BTC' | 'SOL', Record<FundingVenue, VenueRateInfo>> = {
  ETH: {
    binance: { apr: 10.0, rateInterval: 0.00009132, markPrice: 2315.0, nextFundingTime: 0, status: 'fallback', venueName: 'Binance (ETHUSDT)' },
    hyperliquid: { apr: 10.0, rateInterval: 0.00001141, markPrice: 2315.0, nextFundingTime: 0, status: 'fallback', venueName: 'Hyperliquid (ETH-PERP)' }
  },
  BTC: {
    binance: { apr: 10.0, rateInterval: 0.00009132, markPrice: 78500.0, nextFundingTime: 0, status: 'fallback', venueName: 'Binance (BTCUSDT)' },
    hyperliquid: { apr: 10.0, rateInterval: 0.00001141, markPrice: 78500.0, nextFundingTime: 0, status: 'fallback', venueName: 'Hyperliquid (BTC-PERP)' }
  },
  SOL: {
    binance: { apr: 10.0, rateInterval: 0.00009132, markPrice: 93.5, nextFundingTime: 0, status: 'fallback', venueName: 'Binance (SOLUSDT)' },
    hyperliquid: { apr: 10.0, rateInterval: 0.00001141, markPrice: 93.5, nextFundingTime: 0, status: 'fallback', venueName: 'Hyperliquid (SOL-PERP)' }
  }
};

export const DEFAULT_TRAILING_AVERAGES: Record<'ETH' | 'BTC' | 'SOL', TrailingAverages> = {
  ETH: {
    funding7d: 2.13,
    funding30d: 3.22,
    funding90d: 4.66,
    staking7d: 4.25,
    staking30d: 2.73,
    staking90d: 2.40
  },
  BTC: {
    funding7d: 2.05,
    funding30d: 3.10,
    funding90d: 4.50,
    staking7d: 0.0,
    staking30d: 0.0,
    staking90d: 0.0
  },
  SOL: {
    funding7d: 2.50,
    funding30d: 3.80,
    funding90d: 5.20,
    staking7d: 1.80,
    staking30d: 1.80,
    staking90d: 1.80
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
    lstDiscount: {
      discountPct: 0.08,
      rawBasisPct: 0.08,
      fairRatio: 1.1895,
      marketRatio: 1.1885,
      source: 'Lido wstETH (Canonical Wrap Baseline)',
      status: 'fallback',
      isNative: false,
      assetName: 'wstETH'
    },
    lastUpdated: 0,
    status: 'fallback',
    trailingAverages: DEFAULT_TRAILING_AVERAGES.ETH
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
    lstDiscount: {
      discountPct: 0.0,
      rawBasisPct: 0.0,
      fairRatio: 1.0,
      marketRatio: 1.0,
      source: 'Vanilla Spot Collateral (0% Basis Risk)',
      status: 'fallback',
      isNative: true,
      assetName: 'Native BTC'
    },
    lastUpdated: 0,
    status: 'fallback',
    trailingAverages: DEFAULT_TRAILING_AVERAGES.BTC
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
    lstDiscount: {
      discountPct: 0.05,
      rawBasisPct: 0.05,
      fairRatio: 1.1240,
      marketRatio: 1.1234,
      source: 'Jito Stake Pool Baseline (0.05%)',
      status: 'fallback',
      isNative: false,
      assetName: 'JitoSOL'
    },
    lastUpdated: 0,
    status: 'fallback',
    trailingAverages: DEFAULT_TRAILING_AVERAGES.SOL
  },
  btcLst: {
    lbtc: { stakingAPY: 3.2, source: 'Babylon Baseline (3.2%)', status: 'fallback', discountPct: 0.08, rawBasisPct: 0.08 },
    solvbtc: { stakingAPY: 3.5, source: 'Babylon Baseline (3.5%)', status: 'fallback', discountPct: 0.12, rawBasisPct: 0.12 },
    native: { stakingAPY: 0.0, source: 'Native Cold Storage', status: 'fallback', discountPct: 0.0, rawBasisPct: 0.0 }
  },
  selectedVenue: 'binance',
  lastSynced: null,
  isLoading: false,
  isLive: false,
  error: null
};

export const POOL_IDS: Record<'ETH' | 'BTC' | 'SOL', string> = {
  ETH: '747c1d2a-c668-4682-b9f9-296708a3dd90', // Lido wstETH
  SOL: '0e7d0722-9054-4907-8593-567b353c0900', // JitoSOL
  BTC: 'c9762afb-7746-4b5a-a484-a8881a348999'  // Lombard LBTC
};
