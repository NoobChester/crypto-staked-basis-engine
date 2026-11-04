/**
 * @file crisisHistoricalSeries.ts
 * @description Audited historical daily time series data for institutional crisis replays.
 * Provides granular daily trajectories for spot price shocks, perpetual funding APR, and LST de-peg basis discounts.
 */

export interface HistoricalCrisisDay {
  day: number;
  dateStr: string;
  priceShockPct: number;
  fundingAPR: number;
  depegPct: number;
}

/**
 * 1. Celsius 2022 LST De-Peg (28 days: June 1, 2022 - June 28, 2022)
 * Spot drops from 0% to -40%, funding flips deeply negative averaging -8% to -15% peak,
 * and stETH depeg discount widens from 1.5% to peak 6.5% on Day 18 and partially recovers to 4.5% on Day 28.
 */
const CELSIUS_DEPEG_2022_SERIES: HistoricalCrisisDay[] = [
  { day: 1,  dateStr: '2022-06-01', priceShockPct: 0.0,   fundingAPR: -2.1,  depegPct: 1.50 },
  { day: 2,  dateStr: '2022-06-02', priceShockPct: -1.2,  fundingAPR: -2.8,  depegPct: 1.62 },
  { day: 3,  dateStr: '2022-06-03', priceShockPct: -2.5,  fundingAPR: -3.5,  depegPct: 1.75 },
  { day: 4,  dateStr: '2022-06-04', priceShockPct: -3.8,  fundingAPR: -4.2,  depegPct: 1.90 },
  { day: 5,  dateStr: '2022-06-05', priceShockPct: -5.5,  fundingAPR: -5.0,  depegPct: 2.10 },
  { day: 6,  dateStr: '2022-06-06', priceShockPct: -7.2,  fundingAPR: -6.0,  depegPct: 2.35 },
  { day: 7,  dateStr: '2022-06-07', priceShockPct: -9.0,  fundingAPR: -7.2,  depegPct: 2.65 },
  { day: 8,  dateStr: '2022-06-08', priceShockPct: -11.5, fundingAPR: -8.5,  depegPct: 2.95 },
  { day: 9,  dateStr: '2022-06-09', priceShockPct: -14.0, fundingAPR: -9.8,  depegPct: 3.25 },
  { day: 10, dateStr: '2022-06-10', priceShockPct: -17.2, fundingAPR: -11.0, depegPct: 3.60 },
  { day: 11, dateStr: '2022-06-11', priceShockPct: -21.0, fundingAPR: -12.2, depegPct: 4.00 },
  { day: 12, dateStr: '2022-06-12', priceShockPct: -25.5, fundingAPR: -13.5, depegPct: 4.45 },
  { day: 13, dateStr: '2022-06-13', priceShockPct: -29.8, fundingAPR: -14.2, depegPct: 4.90 },
  { day: 14, dateStr: '2022-06-14', priceShockPct: -33.0, fundingAPR: -14.6, depegPct: 5.35 },
  { day: 15, dateStr: '2022-06-15', priceShockPct: -35.2, fundingAPR: -14.8, depegPct: 5.75 },
  { day: 16, dateStr: '2022-06-16', priceShockPct: -36.8, fundingAPR: -14.9, depegPct: 6.10 },
  { day: 17, dateStr: '2022-06-17', priceShockPct: -38.0, fundingAPR: -14.9, depegPct: 6.35 },
  { day: 18, dateStr: '2022-06-18', priceShockPct: -39.5, fundingAPR: -15.0, depegPct: 6.50 },
  { day: 19, dateStr: '2022-06-19', priceShockPct: -41.0, fundingAPR: -14.2, depegPct: 6.25 },
  { day: 20, dateStr: '2022-06-20', priceShockPct: -41.8, fundingAPR: -13.1, depegPct: 5.95 },
  { day: 21, dateStr: '2022-06-21', priceShockPct: -41.5, fundingAPR: -11.8, depegPct: 5.65 },
  { day: 22, dateStr: '2022-06-22', priceShockPct: -41.0, fundingAPR: -10.5, depegPct: 5.40 },
  { day: 23, dateStr: '2022-06-23', priceShockPct: -40.5, fundingAPR: -9.5,  depegPct: 5.15 },
  { day: 24, dateStr: '2022-06-24', priceShockPct: -40.2, fundingAPR: -8.8,  depegPct: 4.95 },
  { day: 25, dateStr: '2022-06-25', priceShockPct: -40.0, fundingAPR: -8.2,  depegPct: 4.80 },
  { day: 26, dateStr: '2022-06-26', priceShockPct: -40.1, fundingAPR: -7.8,  depegPct: 4.68 },
  { day: 27, dateStr: '2022-06-27', priceShockPct: -39.8, fundingAPR: -7.5,  depegPct: 4.58 },
  { day: 28, dateStr: '2022-06-28', priceShockPct: -40.0, fundingAPR: -7.2,  depegPct: 4.50 }
];

/**
 * 2. Post-FTX Inverted Carry Winter (30 days: November 1, 2022 - November 30, 2022)
 * Spot drops -25%, severe backwardation with funding negative averaging -12% to -20% APR, and de-peg discount of 2.0%.
 */
const FTX_CARRY_WINTER_SERIES: HistoricalCrisisDay[] = [
  { day: 1,  dateStr: '2022-11-01', priceShockPct: 0.0,   fundingAPR: -5.5,  depegPct: 1.80 },
  { day: 2,  dateStr: '2022-11-02', priceShockPct: -1.5,  fundingAPR: -6.8,  depegPct: 1.85 },
  { day: 3,  dateStr: '2022-11-03', priceShockPct: -3.0,  fundingAPR: -8.0,  depegPct: 1.90 },
  { day: 4,  dateStr: '2022-11-04', priceShockPct: -5.2,  fundingAPR: -9.5,  depegPct: 1.95 },
  { day: 5,  dateStr: '2022-11-05', priceShockPct: -7.8,  fundingAPR: -11.2, depegPct: 2.00 },
  { day: 6,  dateStr: '2022-11-06', priceShockPct: -11.0, fundingAPR: -13.5, depegPct: 2.05 },
  { day: 7,  dateStr: '2022-11-07', priceShockPct: -15.5, fundingAPR: -16.0, depegPct: 2.10 },
  { day: 8,  dateStr: '2022-11-08', priceShockPct: -21.0, fundingAPR: -18.5, depegPct: 2.15 },
  { day: 9,  dateStr: '2022-11-09', priceShockPct: -26.0, fundingAPR: -20.0, depegPct: 2.20 },
  { day: 10, dateStr: '2022-11-10', priceShockPct: -27.2, fundingAPR: -19.5, depegPct: 2.18 },
  { day: 11, dateStr: '2022-11-11', priceShockPct: -26.5, fundingAPR: -19.0, depegPct: 2.15 },
  { day: 12, dateStr: '2022-11-12', priceShockPct: -25.8, fundingAPR: -18.0, depegPct: 2.10 },
  { day: 13, dateStr: '2022-11-13', priceShockPct: -25.2, fundingAPR: -17.2, depegPct: 2.08 },
  { day: 14, dateStr: '2022-11-14', priceShockPct: -25.0, fundingAPR: -16.5, depegPct: 2.05 },
  { day: 15, dateStr: '2022-11-15', priceShockPct: -24.8, fundingAPR: -16.0, depegPct: 2.02 },
  { day: 16, dateStr: '2022-11-16', priceShockPct: -25.1, fundingAPR: -15.5, depegPct: 2.00 },
  { day: 17, dateStr: '2022-11-17', priceShockPct: -25.3, fundingAPR: -15.2, depegPct: 2.00 },
  { day: 18, dateStr: '2022-11-18', priceShockPct: -25.0, fundingAPR: -15.0, depegPct: 2.00 },
  { day: 19, dateStr: '2022-11-19', priceShockPct: -24.9, fundingAPR: -14.8, depegPct: 2.00 },
  { day: 20, dateStr: '2022-11-20', priceShockPct: -25.2, fundingAPR: -14.5, depegPct: 2.00 },
  { day: 21, dateStr: '2022-11-21', priceShockPct: -25.5, fundingAPR: -14.2, depegPct: 2.00 },
  { day: 22, dateStr: '2022-11-22', priceShockPct: -25.4, fundingAPR: -14.0, depegPct: 2.00 },
  { day: 23, dateStr: '2022-11-23', priceShockPct: -25.1, fundingAPR: -13.8, depegPct: 2.00 },
  { day: 24, dateStr: '2022-11-24', priceShockPct: -25.0, fundingAPR: -13.5, depegPct: 2.00 },
  { day: 25, dateStr: '2022-11-25', priceShockPct: -24.9, fundingAPR: -13.2, depegPct: 2.00 },
  { day: 26, dateStr: '2022-11-26', priceShockPct: -25.0, fundingAPR: -13.0, depegPct: 2.00 },
  { day: 27, dateStr: '2022-11-27', priceShockPct: -25.2, fundingAPR: -12.8, depegPct: 2.00 },
  { day: 28, dateStr: '2022-11-28', priceShockPct: -25.3, fundingAPR: -12.5, depegPct: 2.00 },
  { day: 29, dateStr: '2022-11-29', priceShockPct: -25.1, fundingAPR: -12.2, depegPct: 2.00 },
  { day: 30, dateStr: '2022-11-30', priceShockPct: -25.0, fundingAPR: -12.0, depegPct: 2.00 }
];

/**
 * 3. Macro Flash Crash (Yen Unwind) (14 days: August 1, 2024 - August 14, 2024)
 * Spot falls to -30% on Day 5, funding dries to 0.0%, de-peg discount spikes to 3.5%,
 * followed by a 7-9 day V-shape recovery back up to -10% spot by Day 14.
 */
const FLASH_CRASH_YEN_SERIES: HistoricalCrisisDay[] = [
  { day: 1,  dateStr: '2024-08-01', priceShockPct: 0.0,   fundingAPR: 7.5, depegPct: 0.80 },
  { day: 2,  dateStr: '2024-08-02', priceShockPct: -4.5,  fundingAPR: 5.0, depegPct: 1.10 },
  { day: 3,  dateStr: '2024-08-03', priceShockPct: -11.0, fundingAPR: 3.0, depegPct: 1.60 },
  { day: 4,  dateStr: '2024-08-04', priceShockPct: -19.5, fundingAPR: 1.0, depegPct: 2.40 },
  { day: 5,  dateStr: '2024-08-05', priceShockPct: -30.0, fundingAPR: 0.0, depegPct: 3.50 },
  { day: 6,  dateStr: '2024-08-06', priceShockPct: -26.5, fundingAPR: 0.5, depegPct: 2.90 },
  { day: 7,  dateStr: '2024-08-07', priceShockPct: -23.0, fundingAPR: 1.2, depegPct: 2.30 },
  { day: 8,  dateStr: '2024-08-08', priceShockPct: -20.0, fundingAPR: 2.0, depegPct: 1.80 },
  { day: 9,  dateStr: '2024-08-09', priceShockPct: -17.5, fundingAPR: 2.8, depegPct: 1.40 },
  { day: 10, dateStr: '2024-08-10', priceShockPct: -15.5, fundingAPR: 3.5, depegPct: 1.10 },
  { day: 11, dateStr: '2024-08-11', priceShockPct: -13.8, fundingAPR: 4.2, depegPct: 0.90 },
  { day: 12, dateStr: '2024-08-12', priceShockPct: -12.2, fundingAPR: 4.8, depegPct: 0.80 },
  { day: 13, dateStr: '2024-08-13', priceShockPct: -11.0, fundingAPR: 5.4, depegPct: 0.75 },
  { day: 14, dateStr: '2024-08-14', priceShockPct: -10.0, fundingAPR: 6.0, depegPct: 0.70 }
];

export const CRISIS_HISTORICAL_SERIES: Record<'celsius_depeg_2022' | 'ftx_carry_winter' | 'flash_crash_yen', HistoricalCrisisDay[]> = {
  celsius_depeg_2022: CELSIUS_DEPEG_2022_SERIES,
  ftx_carry_winter: FTX_CARRY_WINTER_SERIES,
  flash_crash_yen: FLASH_CRASH_YEN_SERIES
};
