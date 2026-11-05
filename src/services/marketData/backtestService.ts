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
      return '2024-08-15';
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

export function getHistoricalBacktestSeries(
  asset: TradedAsset = 'ETH',
  startDate?: string,
  endDate?: string
): DailyHistoricalMarketStep[] {
  const fullSeries = getRawAssetSeries(asset);
  if (!fullSeries || fullSeries.length === 0) return [];

  const inceptionDate = getAssetInceptionDate(asset);
  const effectiveStart = (!startDate || startDate < inceptionDate) ? inceptionDate : startDate;
  const effectiveEnd = endDate || fullSeries[fullSeries.length - 1].date;

  return fullSeries.filter(step => step.date >= effectiveStart && step.date <= effectiveEnd);
}
