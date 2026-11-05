import { describe, it, expect } from 'vitest';
import {
  inverseNormalCDF,
  generateDirectionNumbers,
  generateScrambledSobolMatrix,
  constructBrownianBridgePaths,
  calibrateOUFromHistory,
  simulateStochasticFunding,
  calculateRegimeCarry,
  calculateStakingDecomposition,
  DEFAULT_REGIME_CONFIGS
} from '../src/math/stochasticRates.js';

describe('Institutional Rate Modeler: Stochastic & SQMC Engine', () => {
  describe('Inverse Normal CDF (Beasley-Springer-Moro)', () => {
    it('accurately reproduces standard normal distribution quantiles', () => {
      // Median (p = 0.5) must be 0.0
      expect(inverseNormalCDF(0.5)).toBeCloseTo(0.0, 5);

      // 1 sigma: p ≈ 0.84134474
      expect(inverseNormalCDF(0.84134474)).toBeCloseTo(1.0, 3);
      expect(inverseNormalCDF(1.0 - 0.84134474)).toBeCloseTo(-1.0, 3);

      // 2 sigma (97.5% quantile for 95% two-tailed CI)
      expect(inverseNormalCDF(0.975)).toBeCloseTo(1.95996, 3);
      expect(inverseNormalCDF(0.025)).toBeCloseTo(-1.95996, 3);

      // Extreme tail clamping
      expect(inverseNormalCDF(0.0)).toBeLessThanOrEqual(-7.0);
      expect(inverseNormalCDF(1.0)).toBeGreaterThanOrEqual(7.0);
    });
  });

  describe('Joe & Kuo Sobol Sequence & Owen/Dick Scrambling', () => {
    it('generates valid non-zero 32-bit direction numbers for higher dimensions', () => {
      for (let dim = 0; dim < 40; dim++) {
        const v = generateDirectionNumbers(dim);
        expect(v.length).toBe(32);
        expect(v[0]).toBeGreaterThan(0);
        expect(v[31]).toBeGreaterThan(0);
      }
    });

    it('generates low-discrepancy points strictly bounded in (0, 1)', () => {
      const matrix = generateScrambledSobolMatrix(256, 30, 42);
      expect(matrix.length).toBe(256);
      expect(matrix[0].length).toBe(30);

      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          const val = matrix[i][j];
          expect(val).toBeGreaterThan(0.0);
          expect(val).toBeLessThan(1.0);
        }
      }
    });

    it('scrambling with different seeds creates distinct uniform configurations', () => {
      const mat1 = generateScrambledSobolMatrix(64, 5, 111);
      const mat2 = generateScrambledSobolMatrix(64, 5, 999);
      expect(mat1[0][0]).not.toEqual(mat2[0][0]);
    });
  });

  describe('Brownian Bridge Path Construction', () => {
    it('concentrates endpoint variance in dimension 0 and satisfies bridge properties', () => {
      const nPaths = 128;
      const horizon = 30;
      const normals = Array.from({ length: nPaths }, () =>
        Array.from({ length: horizon }, () => 1.0)
      );

      const paths = constructBrownianBridgePaths(normals, horizon);
      expect(paths.length).toBe(nPaths);
      expect(paths[0].length).toBe(horizon + 1);

      // Starting point is strictly 0.0
      expect(paths[0][0]).toBe(0.0);
      // Endpoint W_T = sqrt(T) * z[0]
      expect(paths[0][horizon]).toBeCloseTo(Math.sqrt(horizon) * 1.0, 5);
    });
  });

  describe('OLS / MLE Calibration of Ornstein-Uhlenbeck Process', () => {
    it('recovers realistic parameters from synthetic mean-reverting series', () => {
      // Synthetic mean-reverting series anchored to 10% APR
      const syntheticSeries = [10.0, 11.2, 12.0, 10.5, 9.8, 8.9, 10.1, 10.8, 11.5, 10.2, 9.5];
      const params = calibrateOUFromHistory(syntheticSeries);

      expect(params.theta).toBeGreaterThan(0);
      expect(params.mu).toBeGreaterThan(5.0);
      expect(params.mu).toBeLessThan(25.0);
      expect(params.sigma).toBeGreaterThan(0);
      expect(params.halfLifeDays).toBeGreaterThan(0);
      expect(params.jumpIntensity).toBeGreaterThanOrEqual(0.5);
    });

    it('falls back gracefully when input series is sparse or empty', () => {
      const fallback = calibrateOUFromHistory([]);
      expect(fallback.mu).toBe(10.5);
      expect(fallback.theta).toBe(0.08);
      expect(fallback.halfLifeDays).toBeCloseTo(Math.LN2 / 0.08, 1);
    });
  });

  describe('Stochastic Simulation Generator (SQMC vs Pseudo-MC)', () => {
    const testParams = {
      theta: 0.1,
      mu: 12.0,
      sigma: 15.0,
      halfLifeDays: 6.9,
      jumpIntensity: 2.0,
      jumpMean: -10.0,
      jumpStdDev: 8.0
    };

    it('produces expected trajectory steps and risk metrics with SQMC Sobol', () => {
      const result = simulateStochasticFunding(10.0, testParams, {
        engineType: 'sqmc_sobol',
        pathCount: 256,
        horizonDays: 30,
        seed: 42
      });

      expect(result.horizonDays).toBe(30);
      expect(result.steps.length).toBe(31); // day 0 to day 30
      expect(result.engineUsed).toBe('sqmc_sobol');
      expect(result.expectedCarryApr).toBeGreaterThan(0);
      expect(result.var95Apr).toBeLessThan(result.expectedCarryApr);
      expect(result.cvar95Apr).toBeLessThanOrEqual(result.var95Apr);
      expect(result.negativeCarryProbabilityPct).toBeGreaterThanOrEqual(0);
      expect(result.negativeCarryProbabilityPct).toBeLessThanOrEqual(100);

      // Day 0 matches initial funding rate
      expect(result.steps[0].median).toBe(10.0);
      expect(result.steps[0].expectedDrift).toBe(10.0);

      // Quantile ordering invariants at day 30: p05 <= p25 <= median <= p75 <= p95
      const finalStep = result.steps[30];
      expect(finalStep.p05).toBeLessThanOrEqual(finalStep.p25);
      expect(finalStep.p25).toBeLessThanOrEqual(finalStep.median);
      expect(finalStep.median).toBeLessThanOrEqual(finalStep.p75);
      expect(finalStep.p75).toBeLessThanOrEqual(finalStep.p95);
    });

    it('supports standard pseudo-random Monte Carlo mode', () => {
      const mcResult = simulateStochasticFunding(8.0, testParams, {
        engineType: 'pseudo_mc',
        pathCount: 500,
        horizonDays: 14,
        seed: 123
      });

      expect(mcResult.engineUsed).toBe('pseudo_mc');
      expect(mcResult.horizonDays).toBe(14);
      expect(mcResult.steps.length).toBe(15);
    });
  });

  describe('Regime-Based Carry Calculations', () => {
    it('computes cumulative dollar carry harvest under Contango', () => {
      const res = calculateRegimeCarry(10000, 'contango');
      expect(res.activeRegime).toBe('contango');
      expect(res.netRealizedCarryApr).toBe(DEFAULT_REGIME_CONFIGS.contango.fundingApr);
      // $10,000 * 32.5% * (30 / 365) = ~$267.12
      expect(res.cumulativeCarryBleedDollar).toBeGreaterThan(200);
    });

    it('computes negative carry bleed under Liquidation Backwardation', () => {
      const res = calculateRegimeCarry(10000, 'backwardation');
      expect(res.activeRegime).toBe('backwardation');
      expect(res.netRealizedCarryApr).toBe(-14.0);
      // Bleed is negative dollar value
      expect(res.cumulativeCarryBleedDollar).toBeLessThan(0);
    });
  });

  describe('Companion Staking Yield Decomposition', () => {
    it('decomposes ETH staking yield into consensus issuance and MEV tips', () => {
      const decomp = calculateStakingDecomposition('ETH', 'real', 1000000, 60.0);
      expect(decomp.asset).toBe('ETH');
      expect(decomp.consensusIssuanceApy).toBeGreaterThan(2.0);
      expect(decomp.consensusIssuanceApy).toBeLessThan(3.0);
      expect(decomp.mevTipsApy).toBeGreaterThan(0.2);
      expect(decomp.totalStakingApy).toBeCloseTo(
        decomp.consensusIssuanceApy + decomp.mevTipsApy,
        2
      );
      expect(decomp.pendleImpliedApyBenchmark).toBe(3.35);
    });

    it('properly handles SOL Real vs Nominal Staking Yield', () => {
      const nominal = calculateStakingDecomposition('SOL', 'nominal');
      const real = calculateStakingDecomposition('SOL', 'real');

      expect(nominal.totalStakingApy).toBeGreaterThan(6.0);
      expect(real.totalStakingApy).toBeLessThan(3.0);
      // Nominal minus Real should roughly equal ~5.4% inflation
      expect(nominal.totalStakingApy - real.totalStakingApy).toBeCloseTo(5.4, 1);
    });

    it('sets BTC native staking yield to 0% with restaking benchmark', () => {
      const btc = calculateStakingDecomposition('BTC');
      expect(btc.totalStakingApy).toBe(0.0);
      expect(btc.consensusIssuanceApy).toBe(0.0);
      expect(btc.pendleImpliedApyBenchmark).toBe(0.8);
    });
  });
});
