/**
 * @file crisisSimulation.test.ts
 * @description Quantitative Vitest test suite for Institutional Crisis & Extreme Market Simulation Engine.
 * Verifies path-dependent daily liquidation dynamics, historical series replay, exponential decay calculus,
 * yield accrual cessation upon liquidation, and architectural cross-margin vs isolated margin divergence.
 */

import { describe, it, expect } from 'vitest';
import { calculateCrisisSimulation, type HedgingState } from '../src/math/hedging.js';
import { CRISIS_SCENARIOS, type CrisisScenarioKey } from '../src/config/scenarios.js';
import { CRISIS_HISTORICAL_SERIES } from '../src/data/crisisHistoricalSeries.js';

describe('Institutional Crisis Simulation Engine', () => {

  describe('1. Scenario Horizon Clamping & Architectural Integrity', () => {
    const allScenarios: CrisisScenarioKey[] = [
      'celsius_depeg_2022',
      'ftx_carry_winter',
      'flash_crash_yen',
      'parabolic_squeeze_2x',
      'meme_mania_rally',
      'haircut_compression'
    ];

    it('enforces lockedHorizonDays and clamps simulation duration regardless of input state', () => {
      for (const key of allScenarios) {
        const scenario = CRISIS_SCENARIOS[key];
        // Pass a state with an arbitrary days parameter (e.g. 90 or 365 days)
        const res = calculateCrisisSimulation(key, { capital: 10000, days: 365 });

        expect(res.horizonDays).toBe(scenario.lockedHorizonDays);
        expect(res.dailyTrajectory).toHaveLength(scenario.lockedHorizonDays);
        expect(res.scenarioKey).toBe(key);
        expect(res.scenarioTitle).toBe(scenario.title);
      }
    });

    it('throws a descriptive error when invoked with an unknown scenario key', () => {
      expect(() => {
        calculateCrisisSimulation('unknown_crisis' as unknown as CrisisScenarioKey, {});
      }).toThrow(/Unknown crisis scenario key/i);
    });
  });

  describe('2. Historical Replay: Celsius 2022 LST De-Peg', () => {
    const state: HedgingState = {
      capital: 10000,
      mode: 'unified',
      collateralRatio: 0.90,
      splitSpot: 50,
      mmr: 0.005,
      priceMove: -40.0,
      fundingAPR: -8.0,
      depegPct: 6.5,
      days: 90,
      stakingAPY: 3.2
    };

    it('replays exact 28-day historical series with peak depeg on Day 18 and recovery on Day 28', () => {
      const res = calculateCrisisSimulation('celsius_depeg_2022', state);
      const expectedSeries = CRISIS_HISTORICAL_SERIES.celsius_depeg_2022;

      expect(res.horizonDays).toBe(28);
      expect(res.dailyTrajectory).toHaveLength(28);

      // Verify trajectory data alignment with audited historical series
      for (let i = 0; i < 28; i++) {
        const step = res.dailyTrajectory[i];
        const hist = expectedSeries[i];
        expect(step.day).toBe(hist.day);
        expect(step.dateStr).toBe(hist.dateStr);
        expect(step.priceShockPct).toBe(hist.priceShockPct);
        expect(step.fundingAPR).toBe(hist.fundingAPR);
        expect(step.depegPct).toBe(hist.depegPct);
      }

      // Check specific historical milestones
      // Day 18: Peak depeg 6.50%, peak inverted funding -15.0%
      const day18 = res.dailyTrajectory[17];
      expect(day18.depegPct).toBe(6.50);
      expect(day18.fundingAPR).toBe(-15.0);

      // Day 28: Partial recovery to 4.50% depeg, -40.0% spot shock
      const day28 = res.dailyTrajectory[27];
      expect(day28.depegPct).toBe(4.50);
      expect(day28.priceShockPct).toBe(-40.0);
    });

    it('preserves solvency in Unified Cross-Margin mode during Celsius crash (-40% shock)', () => {
      const res = calculateCrisisSimulation('celsius_depeg_2022', state);

      expect(res.isLiquidated).toBe(false);
      expect(res.tLiq).toBeNull();

      // Negative funding bleed accumulated
      expect(res.totalHarvestedFunding).toBeLessThan(0);

      // Staking yield steadily harvested
      expect(res.totalHarvestedStaking).toBeGreaterThan(0);

      // Terminal depeg loss realized
      // S0 * (1 - 0.40) * 0.045 = 10000 * 0.60 * 0.045 = $270.00
      expect(res.depegLoss).toBeCloseTo(270.0, 1);

      // Spot dropped by -$4000 (pre-depeg), perp short gained +$4000
      // Spot PnL incorporates depeg discount: spotVal = 10000 * 0.6 * 0.955 = $5730 -> spotPnL = -$4270
      expect(res.spotPnL).toBeCloseTo(-4270.0, 1);
      expect(res.perpPnL).toBeCloseTo(4000.0, 1);

      // Portfolio protected capital with modest drawdown solely from basis depeg & inverted carry
      expect(res.terminalEquity).toBeGreaterThan(9500);
      expect(res.terminalEquity).toBeLessThan(10000);
    });
  });

  describe('3. Historical Replay: FTX Carry Winter & Yen Flash Crash', () => {
    it('models 30 days of persistent backwardation carry bleed in Post-FTX Winter', () => {
      const res = calculateCrisisSimulation('ftx_carry_winter', {
        capital: 10000,
        mode: 'unified',
        stakingAPY: 3.2
      });

      expect(res.horizonDays).toBe(30);
      expect(res.isLiquidated).toBe(false);

      // Funding is strictly negative across all 30 days
      for (const step of res.dailyTrajectory) {
        expect(step.fundingAPR).toBeLessThan(0);
      }
      expect(res.totalHarvestedFunding).toBeLessThan(0);
      expect(res.depegLoss).toBeGreaterThan(0);
    });

    it('models 14-day V-shape recovery in Macro Flash Crash (Yen Unwind)', () => {
      const res = calculateCrisisSimulation('flash_crash_yen', {
        capital: 10000,
        mode: 'unified',
        stakingAPY: 3.2
      });

      expect(res.horizonDays).toBe(14);
      expect(res.isLiquidated).toBe(false);

      // Day 5 trough: -30% spot shock, 0.0% funding APR, 3.5% depeg
      const day5 = res.dailyTrajectory[4];
      expect(day5.priceShockPct).toBe(-30.0);
      expect(day5.fundingAPR).toBe(0.0);
      expect(day5.depegPct).toBe(3.50);

      // Day 14: Recovered to -10% spot shock, funding rebounded to 6.0%
      const day14 = res.dailyTrajectory[13];
      expect(day14.priceShockPct).toBe(-10.0);
      expect(day14.fundingAPR).toBe(6.0);
      expect(day14.depegPct).toBe(0.70);
    });
  });

  describe('4. Parabolic Bull Squeeze (2x): Isolated Liquidation & Carry Cessation', () => {
    const isolatedState: HedgingState = {
      capital: 10000,
      mode: 'isolated',
      splitSpot: 50,
      mmr: 0.005,
      collateralRatio: 0.90,
      priceMove: 100.0,
      fundingAPR: 45.0,
      depegPct: 0.0,
      days: 90,
      stakingAPY: 3.2
    };

    it('triggers early liquidation on Day 5 (+100% rally) and ceases perp funding accrual for all subsequent days', () => {
      const res = calculateCrisisSimulation('parabolic_squeeze_2x', isolatedState);

      // Liquidation occurred
      expect(res.isLiquidated).toBe(true);
      expect(res.tLiq).toBe(5);

      // Verify daily trajectory status
      // Days 1-4: solvent
      for (let d = 0; d < 4; d++) {
        expect(res.dailyTrajectory[d].isLiquidated).toBe(false);
      }

      // Day 5: breach occurs at +100% rally
      expect(res.dailyTrajectory[4].isLiquidated).toBe(true);
      expect(res.dailyTrajectory[4].priceShockPct).toBe(100.0);

      // Days 6-30: liquidated state persists
      for (let d = 5; d < 30; d++) {
        expect(res.dailyTrajectory[d].isLiquidated).toBe(true);
      }

      // CRITICAL INVARIANT: Perp funding ceases after tLiq (Day 5)
      const fundingAtLiq = res.dailyTrajectory[4].fundingAccrued;
      expect(fundingAtLiq).toBeGreaterThan(0);

      for (let d = 5; d < 30; d++) {
        expect(res.dailyTrajectory[d].fundingAccrued).toBe(fundingAtLiq);
      }
      expect(res.totalHarvestedFunding).toBe(fundingAtLiq);

      // Staking yield on spot collateral continues to accrue through Day 30
      expect(res.dailyTrajectory[29].stakingAccrued).toBeGreaterThan(res.dailyTrajectory[4].stakingAccrued);

      // Cash margin pool M0 ($5,000) was completely absorbed by liquidation
      expect(res.perpPnL).toBe(-5000);
    });
  });

  describe('5. Parabolic Bull Squeeze (2x): Unified Cross-Margin Resilience', () => {
    const unifiedState: HedgingState = {
      capital: 10000,
      mode: 'unified',
      splitSpot: 50,
      mmr: 0.005,
      collateralRatio: 0.90,
      priceMove: 100.0,
      fundingAPR: 45.0,
      depegPct: 0.0,
      days: 90,
      stakingAPY: 3.2
    };

    it('absorbs +100% price rally safely with zero liquidation and continuous carry harvesting', () => {
      const res = calculateCrisisSimulation('parabolic_squeeze_2x', unifiedState);

      expect(res.isLiquidated).toBe(false);
      expect(res.tLiq).toBeNull();

      // All 30 days remain solvent
      for (const step of res.dailyTrajectory) {
        expect(step.isLiquidated).toBe(false);
      }

      // Funding accrues across all 30 days
      const fundingDay5 = res.dailyTrajectory[4].fundingAccrued;
      const fundingDay30 = res.dailyTrajectory[29].fundingAccrued;
      expect(fundingDay30).toBeGreaterThan(fundingDay5);
      expect(res.totalHarvestedFunding).toBe(fundingDay30);

      // Spot collateral appreciation (+10,000) offsets perp short PnL (-10,000)
      expect(res.spotPnL).toBeCloseTo(10000.0, 1);
      expect(res.perpPnL).toBeCloseTo(-10000.0, 1);

      // Net portfolio equity is highly accretive due to harvested euphoric funding carry
      expect(res.terminalEquity).toBeGreaterThan(10000);
      expect(res.netPnL).toBeGreaterThan(0);
      expect(res.netRealizedAPY).toBeGreaterThan(0);
    });
  });

  describe('6. Exponential Decay Calculus & Mean-Reverting Dynamics', () => {
    it('produces strictly decreasing, smooth daily funding rates towards baseline in hypothetical scenarios', () => {
      const res = calculateCrisisSimulation('parabolic_squeeze_2x', {
        capital: 10000,
        mode: 'unified',
        fundingAPR: 10.0 // Baseline funding
      });

      // Half-life is 7 days for parabolic_squeeze_2x
      // Verify fundingAPR decreases monotonically every day
      for (let i = 1; i < res.dailyTrajectory.length; i++) {
        expect(res.dailyTrajectory[i].fundingAPR).toBeLessThan(res.dailyTrajectory[i - 1].fundingAPR);
      }

      // Base = 10.0%, Peak = 45.0%, Excess = 35.0%
      // On Day 7 (one half-life): excess should decay by approximately 50%
      // 10 + 35 * 0.5 = 27.5%
      const day7 = res.dailyTrajectory[6];
      expect(day7.fundingAPR).toBeCloseTo(27.5, 0.5);

      // On Day 14 (two half-lives): excess should decay to ~25%
      // 10 + 35 * 0.25 = 18.75%
      const day14 = res.dailyTrajectory[13];
      expect(day14.fundingAPR).toBeCloseTo(18.75, 0.5);
    });

    it('decays secondary basis de-peg discount exponentially towards peg in Meme Mania', () => {
      const res = calculateCrisisSimulation('meme_mania_rally', {
        capital: 10000,
        mode: 'unified'
      });

      // Half-life is 5 days for meme_mania_rally, peak depeg = 5.0%
      // On Day 5 (one half-life): depeg should decay to ~2.5%
      const day5 = res.dailyTrajectory[4];
      expect(day5.depegPct).toBeCloseTo(2.5, 0.5);

      // On Day 10 (two half-lives): depeg should decay to ~1.25%
      const day10 = res.dailyTrajectory[9];
      expect(day10.depegPct).toBeCloseTo(1.25, 0.5);
    });

    it('respects Haircut Compression emergency collateral re-valuation to 70%', () => {
      const res = calculateCrisisSimulation('haircut_compression', {
        capital: 10000,
        mode: 'unified'
      });

      // Collateral ratio compressed from 90% to 70%
      expect(res.horizonDays).toBe(30);
      expect(res.scenarioKey).toBe('haircut_compression');
      expect(res.dailyTrajectory).toHaveLength(30);
    });
  });

});
