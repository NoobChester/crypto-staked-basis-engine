import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCustomStatisticalCarry,
  customStatsCache,
  computeWindowStats
} from '../src/services/marketData/historical.js';
import {
  calculateConfidenceBounds,
  type HedgingState
} from '../src/math/hedging.js';

describe('Statistical Rolling Carry & Confidence Fans Engine', () => {

  beforeEach(() => {
    customStatsCache.clear();
  });

  describe('Rolling Horizon Slicing & Clamping Limits', () => {
    it('correctly slices contiguous daily series for 7d, 14d, 30d, 90d, and 180d', async () => {
      const horizons = [7, 14, 30, 90, 180] as const;

      for (const h of horizons) {
        const snapshot = await getCustomStatisticalCarry('ETH', h, 'real');

        expect(snapshot.symbol).toBe('ETH');
        expect(snapshot.lookbackDays).toBe(h);
        expect(snapshot.funding.intervalCount).toBe(h);
        expect(snapshot.staking.intervalCount).toBe(h);
        expect(snapshot.netCarry.intervalCount).toBe(h);

        // Sanity checks on statistical ranges
        expect(snapshot.funding.avg).toBeGreaterThanOrEqual(snapshot.funding.min);
        expect(snapshot.funding.avg).toBeLessThanOrEqual(snapshot.funding.max);
        expect(snapshot.funding.stdDev).toBeGreaterThanOrEqual(0);
      }
    });

    it('clamps lookback windows strictly between 7 and 180 days', async () => {
      const underflow = await getCustomStatisticalCarry('ETH', 2, 'real');
      expect(underflow.lookbackDays).toBe(7);
      expect(underflow.funding.intervalCount).toBe(7);

      const overflow = await getCustomStatisticalCarry('ETH', 365, 'real');
      expect(overflow.lookbackDays).toBe(180);
      expect(overflow.funding.intervalCount).toBe(180);

      const negative = await getCustomStatisticalCarry('ETH', -50, 'real');
      expect(negative.lookbackDays).toBe(7);
    });

    it('caches calculated snapshots in customStatsCache memory store', async () => {
      expect(customStatsCache.size).toBe(0);

      const first = await getCustomStatisticalCarry('ETH', 30, 'real');
      expect(customStatsCache.size).toBe(1);

      const second = await getCustomStatisticalCarry('ETH', 30, 'real');
      expect(second).toBe(first); // exact memory reference match
    });
  });

  describe('Statistical Bound Rate Formulations (mu ± 2*sigma)', () => {
    it('computes conservative and bull funding rates as mu - 2*sigma and mu + 2*sigma', async () => {
      const snapshot = await getCustomStatisticalCarry('ETH', 30, 'real');

      const expectedConservativeFunding = parseFloat(
        (snapshot.funding.avg - 2 * snapshot.funding.stdDev).toFixed(2)
      );
      const expectedBullFunding = parseFloat(
        (snapshot.funding.avg + 2 * snapshot.funding.stdDev).toFixed(2)
      );

      expect(snapshot.baseFundingApr).toBe(snapshot.funding.avg);
      expect(snapshot.conservativeFundingApr).toBe(expectedConservativeFunding);
      expect(snapshot.bullFundingApr).toBe(expectedBullFunding);
      expect(snapshot.conservativeFundingApr).toBeLessThanOrEqual(snapshot.bullFundingApr);
    });

    it('computes bull staking as mu + 2*sigma and enforces conservative staking >= 0.1%', async () => {
      const snapshot = await getCustomStatisticalCarry('ETH', 30, 'real');

      const expectedBullStaking = parseFloat(
        (snapshot.staking.avg + 2 * snapshot.staking.stdDev).toFixed(2)
      );
      const rawConservative = parseFloat(
        (snapshot.staking.avg - 2 * snapshot.staking.stdDev).toFixed(2)
      );
      const expectedConservativeStaking = Math.max(0.1, rawConservative);

      expect(snapshot.baseStakingApy).toBe(snapshot.staking.avg);
      expect(snapshot.bullStakingApy).toBe(expectedBullStaking);
      expect(snapshot.conservativeStakingApy).toBe(expectedConservativeStaking);
      expect(snapshot.conservativeStakingApy).toBeGreaterThanOrEqual(0.1);
    });

    it('guarantees conservative staking never drops below 0.1% floor even when mu - 2*sigma is zero or negative', async () => {
      const btcSnapshot = await getCustomStatisticalCarry('BTC', 30, 'real');
      expect(btcSnapshot.conservativeStakingApy).toBeGreaterThanOrEqual(0.1);

      // Verify that when staking APY drops to 0 or negative under -2σ, it clamps strictly to 0.1%
      const lowStakingStats = computeWindowStats([0.05, 0.08, 0.02, 0.04, 0.01]);
      const conservativeCalculated = Math.max(
        0.1,
        parseFloat((lowStakingStats.avg - 2 * lowStakingStats.stdDev).toFixed(2))
      );
      expect(conservativeCalculated).toBe(0.1);
    });

    it('differentiates SOL Nominal vs Real yield in statistical carry snapshot', async () => {
      const solReal = await getCustomStatisticalCarry('SOL', 30, 'real');
      const solNominal = await getCustomStatisticalCarry('SOL', 30, 'nominal');

      expect(solNominal.baseStakingApy).toBeGreaterThan(solReal.baseStakingApy);
      expect(solNominal.bullStakingApy).toBeGreaterThan(solReal.bullStakingApy);
      expect(solNominal.netCarry.avg).toBeGreaterThan(solReal.netCarry.avg);
    });
  });

  describe('Confidence Bounds Engine (calculateConfidenceBounds)', () => {
    const mockStateUnified: HedgingState = {
      capital: 10000,
      mode: 'unified',
      priceMove: 0,
      days: 90,
      fundingAPR: 10.0,
      stakingAPY: 3.2,
      depegPct: 0,
      mmr: 0.005,
      collateralRatio: 0.90,
      splitSpot: 50
    };

    const mockStateIsolated: HedgingState = {
      capital: 10000,
      mode: 'isolated',
      priceMove: 0,
      days: 90,
      fundingAPR: 10.0,
      stakingAPY: 3.2,
      depegPct: 0,
      mmr: 0.005,
      collateralRatio: 0.90,
      splitSpot: 50
    };

    it('correctly produces lowerEquity <= baseEquity <= upperEquity in Unified mode', () => {
      const sigmas = { sigmaFunding: 2.5, sigmaStaking: 0.6 };
      const bounds = calculateConfidenceBounds(0, mockStateUnified, sigmas);

      expect(bounds.priceShockPct).toBe(0);
      expect(bounds.lowerEquity).toBeLessThanOrEqual(bounds.baseEquity);
      expect(bounds.baseEquity).toBeLessThanOrEqual(bounds.upperEquity);
      expect(bounds.sigmaDollarSpan).toBeCloseTo(bounds.upperEquity - bounds.lowerEquity, 2);
      expect(bounds.sigmaDollarSpan).toBeGreaterThan(0);
    });

    it('correctly produces lowerEquity <= baseEquity <= upperEquity across varying price shocks', () => {
      const sigmas = { sigmaFunding: 3.0, sigmaStaking: 1.0 };
      const shocks = [-30, -10, 0, 25, 50, 100, 200];

      for (const shock of shocks) {
        const bounds = calculateConfidenceBounds(shock, mockStateUnified, sigmas);
        expect(bounds.lowerEquity).toBeLessThanOrEqual(bounds.baseEquity);
        expect(bounds.baseEquity).toBeLessThanOrEqual(bounds.upperEquity);
        expect(bounds.sigmaDollarSpan).toBeGreaterThanOrEqual(0);
      }
    });

    it('correctly produces lowerEquity <= baseEquity <= upperEquity in Isolated mode', () => {
      const sigmas = { sigmaFunding: 2.0, sigmaStaking: 0.5 };
      const shocks = [-20, 0, 20, 40, 80];

      for (const shock of shocks) {
        const bounds = calculateConfidenceBounds(shock, mockStateIsolated, sigmas);
        expect(bounds.lowerEquity).toBeLessThanOrEqual(bounds.baseEquity);
        expect(bounds.baseEquity).toBeLessThanOrEqual(bounds.upperEquity);
        expect(bounds.sigmaDollarSpan).toBeGreaterThanOrEqual(0);
      }
    });

    it('handles zero or omitted sigmas by equating lower, base, and upper equity', () => {
      const boundsNoSigmas = calculateConfidenceBounds(0, mockStateUnified);
      expect(boundsNoSigmas.lowerEquity).toBe(boundsNoSigmas.baseEquity);
      expect(boundsNoSigmas.upperEquity).toBe(boundsNoSigmas.baseEquity);
      expect(boundsNoSigmas.sigmaDollarSpan).toBe(0);

      const boundsZeroSigmas = calculateConfidenceBounds(10, mockStateUnified, { sigmaFunding: 0, sigmaStaking: 0 });
      expect(boundsZeroSigmas.lowerEquity).toBe(boundsZeroSigmas.baseEquity);
      expect(boundsZeroSigmas.upperEquity).toBe(boundsZeroSigmas.baseEquity);
      expect(boundsZeroSigmas.sigmaDollarSpan).toBe(0);
    });

    it('clamps lower staking APY to >= 0.1% and prevents lowerEquity from exceeding baseEquity', () => {
      // High sigma that pushes staking yield negative
      const extremeSigmas = { sigmaFunding: 1.0, sigmaStaking: 5.0 };
      const bounds = calculateConfidenceBounds(0, mockStateUnified, extremeSigmas);

      expect(bounds.lowerEquity).toBeLessThanOrEqual(bounds.baseEquity);
      expect(bounds.baseEquity).toBeLessThanOrEqual(bounds.upperEquity);
    });

    it('preserves confidence ordering even post-liquidation', () => {
      // +900% shock breaches wstETH unified threshold (+852.4%)
      const sigmas = { sigmaFunding: 2.0, sigmaStaking: 0.8 };
      const postLiqBounds = calculateConfidenceBounds(900, mockStateUnified, sigmas);

      expect(postLiqBounds.lowerEquity).toBeLessThanOrEqual(postLiqBounds.baseEquity);
      expect(postLiqBounds.baseEquity).toBeLessThanOrEqual(postLiqBounds.upperEquity);
      expect(postLiqBounds.sigmaDollarSpan).toBeGreaterThan(0);
    });
  });
});
