/**
 * @file scenarios.test.ts
 * @description Vitest test suite for Institutional Crisis & Extreme Market Scenarios Matrix.
 */

import { describe, it, expect } from 'vitest';
import { calculateOutcome, type HedgingState } from '../src/math/hedging.js';
import { CRISIS_SCENARIOS, type CrisisScenarioKey } from '../src/config/scenarios.js';

describe('Crisis & Stress-Test Scenarios Matrix', () => {

  const scenarioKeys: CrisisScenarioKey[] = [
    'celsius_depeg_2022',
    'ftx_carry_winter',
    'parabolic_squeeze_2x',
    'haircut_compression',
    'flash_crash_yen',
    'meme_mania_rally'
  ];

  it('defines all 6 institutional crisis scenarios with required properties', () => {
    expect(Object.keys(CRISIS_SCENARIOS)).toHaveLength(6);

    for (const key of scenarioKeys) {
      const scenario = CRISIS_SCENARIOS[key];
      expect(scenario).toBeDefined();
      expect(scenario.key).toBe(key);
      expect(scenario.title).toBeTruthy();
      expect(scenario.subtitle).toBeTruthy();
      expect(scenario.dateTag).toBeTruthy();
      expect(typeof scenario.priceMove).toBe('number');
      expect(typeof scenario.fundingAPR).toBe('number');
      expect(typeof scenario.depegPct).toBe('number');
      expect(typeof scenario.getDiagnosis).toBe('function');
    }
  });

  describe('1. Celsius 2022 LST De-Peg Scenario', () => {
    const sc = CRISIS_SCENARIOS.celsius_depeg_2022;

    it('models -40% price shock, -8.0% inverted funding, and 6.5% secondary de-peg', () => {
      const baseState: HedgingState = {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };

      const outcome = calculateOutcome(sc.priceMove, baseState);

      expect(outcome.isLiquidated).toBe(false);
      expect(outcome.depegLoss).toBeGreaterThan(0);
      // Staking 3.2% + funding -8.0% = -4.8% net carry
      expect(outcome.fundingYieldTotal).toBeLessThan(0);

      const diagnosis = sc.getDiagnosis(baseState, outcome);
      expect(diagnosis.status).toBe('stressed');
      expect(diagnosis.riskPill).toBe('DE-PEG IMPAIRMENT');
      expect(diagnosis.verdictTitle).toContain('Secondary Basis Freeze');
    });
  });

  describe('2. Post-FTX Inverted Carry Scenario', () => {
    const sc = CRISIS_SCENARIOS.ftx_carry_winter;

    it('models -12% inverted funding bleed during bear market backwardation', () => {
      const baseState: HedgingState = {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };

      const outcome = calculateOutcome(sc.priceMove, baseState);

      expect(outcome.isLiquidated).toBe(false);
      expect(outcome.fundingYieldTotal).toBeLessThan(0);

      const diagnosis = sc.getDiagnosis(baseState, outcome);
      expect(diagnosis.status).toBe('inverted');
      expect(diagnosis.verdictTitle).toContain('Severe Backwardation Carry Bleed');
    });
  });

  describe('3. Parabolic Bull Squeeze (2x) — Architecture Divergence', () => {
    const sc = CRISIS_SCENARIOS.parabolic_squeeze_2x;

    it('triggers liquidation on Isolated Margin (50/50 split) when rally reaches +100%', () => {
      const isolatedState: HedgingState = {
        capital: 10000,
        mode: 'isolated',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };

      const outcome = calculateOutcome(sc.priceMove, isolatedState);

      // Isolated 50/50 splits liquidate at ~+99.0%, so +100% rally breaches maintenance margin
      expect(outcome.isLiquidated).toBe(true);
      expect(outcome.perpMarginVal).toBe(0);

      const diagnosis = sc.getDiagnosis(isolatedState, outcome);
      expect(diagnosis.status).toBe('liquidated');
      expect(diagnosis.verdictTitle).toBe('ISOLATED MARGIN WIPED OUT');
      expect(diagnosis.riskPill).toBe('LIQUIDATION TRIGGERED');
    });

    it('survives comfortably on Unified Cross-Margin with +752% remaining runway', () => {
      const unifiedState: HedgingState = {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };

      const outcome = calculateOutcome(sc.priceMove, unifiedState);

      expect(outcome.isLiquidated).toBe(false);
      expect(outcome.distanceToLiqPct).toBeGreaterThan(700);
      expect(outcome.fundingYieldTotal).toBeGreaterThan(0);

      const diagnosis = sc.getDiagnosis(unifiedState, outcome);
      expect(diagnosis.status).toBe('protected');
      expect(diagnosis.verdictTitle).toContain('Unified Margin Protected & Accretive');
      expect(diagnosis.riskPill).toBe('FULLY HEDGED & HARVESTING');
    });
  });

  describe('4. Exchange Haircut Slash (Black Swan Collateral De-risking)', () => {
    const sc = CRISIS_SCENARIOS.haircut_compression;

    it('contracts liquidation runway when exchange cuts collateral ratio to 70%', () => {
      const baseState: HedgingState = {
        capital: 10000,
        mode: 'unified',
        collateralRatio: sc.collateralRatio ?? 0.70,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };

      const outcome = calculateOutcome(sc.priceMove, baseState);

      // At 70% collateral ratio (30% haircut), rLiq = (0.70 - 0.005) / (1 + 0.005 - 0.70) = 0.695 / 0.305 = 2.2787 (+227.9%)
      // Buffer at +50% rally is approx 227.9% - 50% = ~177.9%
      expect(outcome.isLiquidated).toBe(false);
      expect(outcome.rLiq).toBeLessThan(3.0); // significantly smaller than the normal 8.52 (+852%)

      const diagnosis = sc.getDiagnosis(baseState, outcome);
      expect(diagnosis.status).toBe('stressed');
      expect(diagnosis.riskPill).toBe('RUNWAY CONTRACTED');
    });
  });

  describe('5. Macro Flash Crash Scenario', () => {
    const sc = CRISIS_SCENARIOS.flash_crash_yen;

    it('remains 100% solvent during rapid -30% selloff with 3.5% basis widening', () => {
      const baseState: HedgingState = {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };

      const outcome = calculateOutcome(sc.priceMove, baseState);

      expect(outcome.isLiquidated).toBe(false);
      expect(outcome.depegLoss).toBeGreaterThan(0);

      const diagnosis = sc.getDiagnosis(baseState, outcome);
      expect(diagnosis.status).toBe('stressed');
      expect(diagnosis.riskPill).toBe('SOLVENT WITH BASIS DRAG');
    });
  });

  describe('6. Altcoin Meme Mania (3x Surge)', () => {
    const sc = CRISIS_SCENARIOS.meme_mania_rally;

    it('wipes out isolated margin but generates huge cashflow on unified cross-margin', () => {
      const isolatedState: HedgingState = {
        capital: 10000,
        mode: 'isolated',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };
      const isoOutcome = calculateOutcome(sc.priceMove, isolatedState);
      expect(isoOutcome.isLiquidated).toBe(true);

      const isoDiag = sc.getDiagnosis(isolatedState, isoOutcome);
      expect(isoDiag.status).toBe('liquidated');
      expect(isoDiag.riskPill).toBe('ISOLATED MARGIN COLLAPSED');

      const unifiedState: HedgingState = {
        capital: 10000,
        mode: 'unified',
        collateralRatio: 0.90,
        splitSpot: 50,
        mmr: 0.005,
        priceMove: sc.priceMove,
        fundingAPR: sc.fundingAPR,
        depegPct: sc.depegPct,
        days: 90,
        stakingAPY: 3.2
      };
      const uniOutcome = calculateOutcome(sc.priceMove, unifiedState);
      expect(uniOutcome.isLiquidated).toBe(false);
      expect(uniOutcome.fundingYieldTotal).toBeGreaterThan(1500); // 80% APR over 90d on $10k is ~1972

      const uniDiag = sc.getDiagnosis(unifiedState, uniOutcome);
      expect(uniDiag.status).toBe('protected');
      expect(uniDiag.riskPill).toBe('WINDFALL CARRY HARVEST');
    });
  });

});
