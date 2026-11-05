/**
 * @file scenarios.ts
 * @description Institutional crisis and extreme market scenario catalog with multi-variable stress-testing definitions.
 */

import type { HedgingState, HedgingOutcome } from '../math/hedging.js';

export type CrisisScenarioKey =
  | 'celsius_depeg_2022'
  | 'ftx_carry_winter'
  | 'parabolic_squeeze_2x'
  | 'haircut_compression'
  | 'flash_crash_yen'
  | 'meme_mania_rally';

export interface CrisisDiagnosis {
  status: 'liquidated' | 'inverted' | 'protected' | 'stressed';
  verdictTitle: string;
  verdictText: string;
  riskPill: string;
  badgeClass: string;
}

export interface CrisisScenario {
  key: CrisisScenarioKey;
  title: string;
  subtitle: string;
  dateTag: string;
  priceMove: number;
  fundingAPR: number;
  depegPct: number;
  collateralRatio?: number;
  primaryRisk: string;
  accentColor: string;
  isHistorical: boolean;
  lockedHorizonDays: number;
  halfLifeDays?: number;
  getDiagnosis: (state: HedgingState, outcome: HedgingOutcome) => CrisisDiagnosis;
}

export const CRISIS_SCENARIOS: Record<CrisisScenarioKey, CrisisScenario> = {
  celsius_depeg_2022: {
    key: 'celsius_depeg_2022',
    title: 'Celsius 2022 LST De-Peg',
    subtitle: 'Secondary Liquidity Freeze',
    dateTag: 'JUN 2022',
    priceMove: -40.0,
    fundingAPR: -8.0,
    depegPct: 6.5,
    primaryRisk: 'Structural Basis Discount & Negative Funding Bleed',
    accentColor: 'rose',
    isHistorical: true,
    lockedHorizonDays: 28,
    getDiagnosis: (state, outcome) => {
      const depegLossStr = outcome.depegLoss > 0 ? `-$${outcome.depegLoss.toFixed(2)}` : '$0.00';
      const staking = state.stakingAPY ?? 3.2;
      const funding = state.fundingAPR ?? -8.0;
      const netCarry = (staking + funding).toFixed(1);
      return {
        status: 'stressed',
        verdictTitle: 'Secondary Basis Freeze & Negative Drag',
        verdictText: `Spot de-pegged by 6.5% creating a ${depegLossStr} basis discount loss. Inverted funding (${funding.toFixed(1)}% APR) flips net strategy carry to ${netCarry}% APY, though position remains safely unliquidated due to downside cushion.`,
        riskPill: 'DE-PEG IMPAIRMENT',
        badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-700/80'
      };
    }
  },

  ftx_carry_winter: {
    key: 'ftx_carry_winter',
    title: 'Post-FTX Inverted Carry',
    subtitle: 'Prolonged Bear Market Drag',
    dateTag: 'NOV 2022',
    priceMove: -25.0,
    fundingAPR: -12.0,
    depegPct: 2.0,
    primaryRisk: 'Severe Backwardation (Short Pays Long)',
    accentColor: 'amber',
    isHistorical: true,
    lockedHorizonDays: 30,
    getDiagnosis: (state, outcome) => {
      const isNetBleed = outcome.netPnL < 0;
      const staking = state.stakingAPY ?? 3.2;
      const funding = state.fundingAPR ?? -12.0;
      const netCarry = (staking + funding).toFixed(1);
      return {
        status: 'inverted',
        verdictTitle: 'Severe Backwardation Carry Bleed',
        verdictText: `Prolonged short funding payments (${funding.toFixed(1)}% APR) heavily exceed spot staking (+${staking.toFixed(1)}% APY). Net carry runs inverted at ${netCarry}% APY, generating a net cash bleed of $${Math.abs(outcome.fundingYieldTotal).toFixed(2)} over the horizon.`,
        riskPill: isNetBleed ? 'NEGATIVE CARRY DRAIN' : 'CARRY COMPRESSION',
        badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/80'
      };
    }
  },

  parabolic_squeeze_2x: {
    key: 'parabolic_squeeze_2x',
    title: 'Parabolic Bull Squeeze (2x)',
    subtitle: 'Asymmetric Rally Liquidation',
    dateTag: 'Q1 2024',
    priceMove: 100.0,
    fundingAPR: 45.0,
    depegPct: 0.0,
    primaryRisk: 'Isolated Cash Margin Wipeout vs Unified Survival',
    accentColor: 'cyan',
    isHistorical: false,
    lockedHorizonDays: 30,
    halfLifeDays: 7,
    getDiagnosis: (_state, outcome) => {
      if (outcome.isLiquidated) {
        const rLiqPct = (outcome.rLiq * 100).toFixed(1);
        return {
          status: 'liquidated',
          verdictTitle: 'ISOLATED MARGIN WIPED OUT',
          verdictText: `CRITICAL MARGIN BREACH: +100% rally drained the isolated cash pool. Account was liquidated at +${rLiqPct}% rally shock. The short hedge is closed, leaving an unhedged long spot position.`,
          riskPill: 'LIQUIDATION TRIGGERED',
          badgeClass: 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
        };
      }
      const buffer = outcome.rLiq === Infinity ? 'Infinite (∞)' : `+${outcome.distanceToLiqPct.toFixed(1)}%`;
      return {
        status: 'protected',
        verdictTitle: 'Unified Margin Protected & Accretive',
        verdictText: `Spot collateral appreciated by +$${outcome.spotPnL.toFixed(2)}, fully cushioning perp short losses. Remaining rally runway: ${buffer}. Euphoric funding (+45.0% APR) harvested +$${outcome.fundingYieldTotal.toFixed(2)} in cash.`,
        riskPill: 'FULLY HEDGED & HARVESTING',
        badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
      };
    }
  },

  haircut_compression: {
    key: 'haircut_compression',
    title: 'Exchange Haircut Slash',
    subtitle: 'Black Swan Collateral De-Risking',
    dateTag: 'RISK SHOCK',
    priceMove: 50.0,
    fundingAPR: 20.0,
    depegPct: 4.0,
    collateralRatio: 0.70, // 30% Haircut
    primaryRisk: 'Contracted Liquidation Distance & Margin Compression',
    accentColor: 'indigo',
    isHistorical: false,
    lockedHorizonDays: 30,
    halfLifeDays: 10,
    getDiagnosis: (_state, outcome) => {
      const buffer = outcome.rLiq === Infinity ? 'Infinite (∞)' : `+${outcome.distanceToLiqPct.toFixed(1)}%`;
      return {
        status: outcome.isLiquidated ? 'liquidated' : 'stressed',
        verdictTitle: outcome.isLiquidated ? 'HAIRCUT COMPRESSION LIQUIDATION' : 'Margin Runway Compressed (30% Haircut)',
        verdictText: outcome.isLiquidated
          ? 'Exchange slashed collateral valuation to 70% while spot rallied +50%, triggering an early maintenance margin breach.'
          : `Exchange de-risked collateral ratio from standard 90% down to 70.0% (30% haircut). Liquidation runway contracted significantly to ${buffer}, though cross-margin buffer prevented immediate liquidation.`,
        riskPill: outcome.isLiquidated ? 'HAIRCUT LIQUIDATION' : 'RUNWAY CONTRACTED',
        badgeClass: outcome.isLiquidated ? 'bg-rose-950 text-rose-300 border-rose-500' : 'bg-indigo-950/80 text-indigo-300 border-indigo-700/80'
      };
    }
  },

  flash_crash_yen: {
    key: 'flash_crash_yen',
    title: 'Macro Flash Crash',
    subtitle: 'Sudden Liquidation Cascade',
    dateTag: 'AUG 2024',
    priceMove: -30.0,
    fundingAPR: 0.0,
    depegPct: 3.5,
    primaryRisk: 'Violent Intraday Basis Widening & Spot Drawdown',
    accentColor: 'amber',
    isHistorical: true,
    lockedHorizonDays: 14,
    getDiagnosis: (_state, outcome) => {
      return {
        status: 'stressed',
        verdictTitle: 'Downside Basis Stress & Neutral Carry',
        verdictText: `Rapid -30% market selloff widened secondary LST discount to 3.5% (-$${outcome.depegLoss.toFixed(2)} depeg drag). Funding dried up to 0.0% APR, but short hedge was 100% solvent with zero liquidation risk.`,
        riskPill: 'SOLVENT WITH BASIS DRAG',
        badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/80'
      };
    }
  },

  meme_mania_rally: {
    key: 'meme_mania_rally',
    title: 'Altcoin Meme Mania (3x)',
    subtitle: 'Extreme Leveraged Contango',
    dateTag: 'PARABOLIC',
    priceMove: 200.0,
    fundingAPR: 80.0,
    depegPct: 5.0,
    primaryRisk: 'Max Extreme Rally (+200%) vs Windfall Carry',
    accentColor: 'purple',
    isHistorical: false,
    lockedHorizonDays: 21,
    halfLifeDays: 5,
    getDiagnosis: (_state, outcome) => {
      if (outcome.isLiquidated) {
        return {
          status: 'liquidated',
          verdictTitle: 'ISOLATED MARGIN WIPED OUT AT +99%',
          verdictText: 'Extreme +200% mania rally instantly wiped out isolated margin. The short was liquidated near entry, completely missing the massive +80% funding carry.',
          riskPill: 'ISOLATED MARGIN COLLAPSED',
          badgeClass: 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
        };
      }
      return {
        status: 'protected',
        verdictTitle: 'Unified Margin Captures Windfall Carry',
        verdictText: `Unified cross-margin comfortably absorbed the +200% price surge. Massive retail contango paid +80.0% APR funding, generating +$${outcome.fundingYieldTotal.toFixed(2)} in cashflow while collateral appreciated by +$${outcome.spotPnL.toFixed(2)}.`,
        riskPill: 'WINDFALL CARRY HARVEST',
        badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-700/80'
      };
    }
  }
};
