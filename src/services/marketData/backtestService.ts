/**
 * @file backtestService.ts
 * @description Ingestion service and epoch alignment for multi-year historical backtesting.
 * Slices contiguous daily steps matching requested asset inception milestones and date boundaries.
 */

import {
  ETH_BEACON_CHAIN_HISTORICAL_SERIES,
  SOL_HISTORICAL_SERIES,
  BTC_HISTORICAL_SERIES,
  type DailyHistoricalMarketStep
} from '../../data/historical/ethBeaconSeries.js';
import type { TradedAsset } from '../../config/presets.js';

export interface BacktestEpochPreset {
  key: string;
  label: string;
  sublabel: string;
  startDate: string;
  endDate: string;
}

export const HISTORICAL_EPOCH_PRESETS: Record<string, BacktestEpochPreset> = {
  all: {
    key: 'all',
    label: 'Full Beacon Era',
    sublabel: 'Dec 2020 – Present',
    startDate: '2020-12-01',
    endDate: '2026-10-31'
  },
  bull_2021: {
    key: 'bull_2021',
    label: '2021 Bull Contango',
    sublabel: 'Peak Funding Harvest (+40-80%)',
    startDate: '2020-12-01',
    endDate: '2021-12-31'
  },
  bear_2022: {
    key: 'bear_2022',
    label: '2022 Bear & De-Peg Crash',
    sublabel: 'Celsius (-6.5% discount) & FTX Winter',
    startDate: '2022-01-01',
    endDate: '2022-12-31'
  },
  shapella_2023: {
    key: 'shapella_2023',
    label: '2023 Shapella Re-Peg',
    sublabel: 'Withdrawals On & Parity Restore',
    startDate: '2023-01-01',
    endDate: '2023-12-31'
  },
  institutional_2024: {
    key: 'institutional_2024',
    label: '2024–Present Institutional',
    sublabel: 'ETF Inflows & Restaking Era',
    startDate: '2024-01-01',
    endDate: '2026-10-31'
  }
};

export function getAssetInceptionDate(asset: TradedAsset): string {
  switch (asset) {
    case 'SOL':
      return '2022-10-01';
    case 'BTC':
      return '2020-12-01';
    case 'ETH':
    default:
      return '2020-12-01';
  }
}

export function getRawAssetSeries(asset: TradedAsset): DailyHistoricalMarketStep[] {
  switch (asset) {
    case 'SOL':
      return SOL_HISTORICAL_SERIES;
    case 'BTC':
      return BTC_HISTORICAL_SERIES;
    case 'ETH':
    default:
      return ETH_BEACON_CHAIN_HISTORICAL_SERIES;
  }
}

// High-performance LRU / Memoization cache for sliced series
const seriesSliceCache = new Map<string, DailyHistoricalMarketStep[]>();
const MAX_SLICE_CACHE = 40;

/**
 * Binary search to find lower bound index in sorted date time-series: O(log N)
 */
function findDateLowerBound(series: DailyHistoricalMarketStep[], targetDate: string): number {
  let low = 0;
  let high = series.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (series[mid].date < targetDate) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

/**
 * Binary search to find upper bound index in sorted date time-series: O(log N)
 */
function findDateUpperBound(series: DailyHistoricalMarketStep[], targetDate: string): number {
  let low = 0;
  let high = series.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (series[mid].date <= targetDate) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low - 1;
}

export function getHistoricalBacktestSeries(
  asset: TradedAsset = 'ETH',
  startDate?: string,
  endDate?: string
): DailyHistoricalMarketStep[] {
  const fullSeries = getRawAssetSeries(asset);
  if (!fullSeries || fullSeries.length === 0) return [];

  const inceptionDate = getAssetInceptionDate(asset);
  const effectiveStart = (!startDate || startDate < inceptionDate) ? inceptionDate : startDate;
  const effectiveEnd = (!endDate || endDate > fullSeries[fullSeries.length - 1].date)
    ? fullSeries[fullSeries.length - 1].date
    : endDate;

  const cacheKey = `${asset}:${effectiveStart}:${effectiveEnd}`;
  const cached = seriesSliceCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // O(log N) binary search range extraction instead of O(N) array allocation filter
  const startIdx = findDateLowerBound(fullSeries, effectiveStart);
  const endIdx = findDateUpperBound(fullSeries, effectiveEnd);

  let result: DailyHistoricalMarketStep[];
  if (startIdx > endIdx || startIdx >= fullSeries.length || endIdx < 0) {
    result = [];
  } else {
    result = fullSeries.slice(startIdx, endIdx + 1);
  }

  // Manage cache capacity
  if (seriesSliceCache.size >= MAX_SLICE_CACHE) {
    const firstKey = seriesSliceCache.keys().next().value;
    if (firstKey) seriesSliceCache.delete(firstKey);
  }
  seriesSliceCache.set(cacheKey, result);

  return result;
}
