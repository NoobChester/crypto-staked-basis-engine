/**
 * @file presets.ts
 * @description Collateral presets, asset definitions, and institutional margin metadata.
 */

import type { MarketDataSnapshot } from '../services/marketData.js';

export type TradedAsset = 'ETH' | 'BTC' | 'SOL';
export type MarginMode = 'unified' | 'isolated';
export type SolYieldType = 'nominal' | 'real';
export type BtcVariant = 'native' | 'lbtc' | 'solvbtc';
export type CollateralPresetKey = 'inverse_100' | 'btc_eth_95' | 'wsteth_90' | 'sol_lrt_85';

export interface CollateralPreset {
  collateralRatio: number;
  stakingAPY: number;
  defaultAsset: TradedAsset;
  badgeLabel: string;
  explainer?: string;
  nominalAPY?: number;
  realAPY?: number;
  getExplainer?: (type: SolYieldType) => string;
}

export interface BtcLstVariant {
  symbol: string;
  name: string;
  stakingAPY: number;
  tag: string;
  note: string;
}

export interface InstrumentDetails {
  pairBadge: string;
  spotSymbol: string;
  spotName: string;
  spotTag: string;
  perpSymbol: string;
  perpName: string;
  perpTag: string;
  marginDesc: string;
  note?: string;
}

export interface StrategyStateLike {
  mode: MarginMode;
  tradedAsset?: TradedAsset;
  btcVariant?: BtcVariant;
  activePreset?: CollateralPresetKey;
  solYieldType?: SolYieldType;
}

export const DEFAULT_MMR = 0.005;

export const COLLATERAL_PRESETS: Record<CollateralPresetKey, CollateralPreset> = {
  inverse_100: {
    collateralRatio: 1.00,
    stakingAPY: 0.0,
    defaultAsset: 'BTC',
    badgeLabel: '100% (0% Haircut)',
    explainer: 'Standard Inverse COIN-M perp. Spot value gains equal perp losses 1:1. Zero liquidation risk.'
  },
  btc_eth_95: {
    collateralRatio: 0.95,
    stakingAPY: 0.0,
    defaultAsset: 'BTC',
    badgeLabel: '95.0% (5% Haircut)',
    explainer: 'Pure spot BTC/ETH in Unified Margin. Zero staking risk. (Babylon BTC LSTs like LBTC/SolvBTC.BBN require Isolated Margin due to CEX collateral rules).'
  },
  wsteth_90: {
    collateralRatio: 0.90,
    stakingAPY: 3.2,
    defaultAsset: 'ETH',
    badgeLabel: '90.0% (10% Haircut)',
    explainer: 'Lido wstETH (Ethereum LST). Earns 3.2% base staking APY with an 8.5x (+852%) upside buffer.'
  },
  sol_lrt_85: {
    collateralRatio: 0.85,
    stakingAPY: 1.8,
    defaultAsset: 'SOL',
    badgeLabel: '85.0% (15% Haircut)',
    nominalAPY: 7.2,
    realAPY: 1.8,
    getExplainer(yieldType: SolYieldType) {
      return yieldType === 'nominal'
        ? 'Solana LRT (Nominal 7.2% APR): Gross staking emissions; unadjusted for ~5.4% annual network inflation dilution. +545% runway.'
        : 'Solana LRT (Real 1.8% APY): Net economic yield after stripping ~5.4% annual network dilution drag on USD purchasing power. +545% runway.';
    }
  }
};

export const BTC_LST_VARIANTS: Record<BtcVariant, BtcLstVariant> = {
  lbtc: {
    symbol: 'LBTC',
    name: 'Lombard Staked Bitcoin (Babylon LST)',
    stakingAPY: 3.2,
    tag: 'BABYLON LST',
    note: 'Babylon Staking Active: LBTC held in Web3 custody (~3.2% APY). Hedged with CEX cash margin.'
  },
  solvbtc: {
    symbol: 'SolvBTC.BBN',
    name: 'Solv Babylon Staked BTC',
    stakingAPY: 3.5,
    tag: 'BABYLON LST',
    note: 'Babylon Staking Active: SolvBTC.BBN held in Web3 custody (~3.5% APY). Hedged with CEX cash margin.'
  },
  native: {
    symbol: 'BTC',
    name: 'Bitcoin Native Spot',
    stakingAPY: 0.0,
    tag: 'SPOT ASSET',
    note: 'Native Spot BTC held in cold custody; CEX derivatives hedged with cash margin.'
  }
};

export function getInstrumentDetails(s: StrategyStateLike): InstrumentDetails {
  const asset: TradedAsset = s.tradedAsset || 'ETH';
  const mode = s.mode;
  const preset = s.activePreset || 'wsteth_90';

  if (mode === 'isolated') {
    if (asset === 'BTC') {
      const variant = s.btcVariant || 'lbtc';
      const btcMeta = BTC_LST_VARIANTS[variant] || BTC_LST_VARIANTS.lbtc;
      return {
        pairBadge: `${btcMeta.symbol} / BTC-USDC PERP`,
        spotSymbol: btcMeta.symbol,
        spotName: btcMeta.name,
        spotTag: btcMeta.tag,
        perpSymbol: 'BTC-USDC PERP',
        perpName: 'Bitcoin Linear Perp Short',
        perpTag: 'ISOLATED SHORT',
        marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
        note: btcMeta.note
      };
    } else if (asset === 'SOL') {
      return {
        pairBadge: 'SOL-SPOT / SOL-USDC-PERP',
        spotSymbol: 'SOL',
        spotName: 'Solana Native Spot',
        spotTag: 'SPOT ASSET',
        perpSymbol: 'SOL-USDC PERP',
        perpName: 'Solana Linear Perp Short',
        perpTag: 'ISOLATED SHORT',
        marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
        note: 'Native SOL held in custody; CEX derivatives margined in cash.'
      };
    } else {
      return {
        pairBadge: 'ETH-SPOT / ETH-USDC-PERP',
        spotSymbol: 'ETH',
        spotName: 'Ethereum Native Spot',
        spotTag: 'SPOT ASSET',
        perpSymbol: 'ETH-USDC PERP',
        perpName: 'Ethereum Linear Perp Short',
        perpTag: 'ISOLATED SHORT',
        marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
        note: 'Native ETH held in custody; CEX derivatives margined in cash.'
      };
    }
  }

  // Unified Margin Mode
  if (preset === 'wsteth_90') {
    return {
      pairBadge: 'wstETH / ETH-USDT PERP',
      spotSymbol: 'wstETH',
      spotName: 'Lido Wrapped Staked ETH',
      spotTag: 'LST SPOT',
      perpSymbol: 'ETH-USDT PERP',
      perpName: 'Ethereum Linear Perpetual Short',
      perpTag: 'LINEAR PERP',
      marginDesc: 'wstETH Collateral (Unified Cross-Margin, 10% Haircut)',
      note: 'CEX Whitelisted Collateral: wstETH accepted directly as margin collateral (90% valuation).'
    };
  } else if (preset === 'sol_lrt_85') {
    return {
      pairBadge: 'JitoSOL / SOL-USDT PERP',
      spotSymbol: 'JitoSOL',
      spotName: 'Jito Staked SOL (LST)',
      spotTag: 'SOL LST',
      perpSymbol: 'SOL-USDT PERP',
      perpName: 'Solana Linear Perpetual Short',
      perpTag: 'LINEAR PERP',
      marginDesc: 'JitoSOL Collateral (Unified Cross-Margin, 15% Haircut)',
      note: 'CEX Whitelisted Collateral: JitoSOL accepted directly as margin collateral (85% valuation).'
    };
  } else if (preset === 'inverse_100') {
    const sym = (asset === 'ETH') ? 'ETH' : 'BTC';
    return {
      pairBadge: `${sym} / ${sym}-USD INVERSE`,
      spotSymbol: `${sym} Native`,
      spotName: `${sym === 'BTC' ? 'Bitcoin' : 'Ethereum'} Native Spot`,
      spotTag: 'BASE COIN',
      perpSymbol: `${sym}-USD COIN-M`,
      perpName: `${sym} Inverse Perp (Coin-Margined Short)`,
      perpTag: 'COIN-M PERP',
      marginDesc: `100% Native ${sym} Collateral (0% Haircut, 1:1 Base)`,
      note: sym === 'BTC'
        ? 'Coin-Margined: Native BTC collateral only. Babylon LSTs (LBTC/SolvBTC) require Isolated Margin.'
        : 'Coin-Margined: 1:1 inverse hedge with native ETH collateral. Zero liquidation risk.'
    };
  } else {
    // btc_eth_95
    const sym = (asset === 'ETH') ? 'ETH' : 'BTC';
    return {
      pairBadge: `${sym} / ${sym}-USDT PERP`,
      spotSymbol: `${sym} Spot`,
      spotName: `${sym === 'BTC' ? 'Bitcoin Native Spot (Vanilla)' : 'Ethereum Vanilla Spot'}`,
      spotTag: 'SPOT L1',
      perpSymbol: `${sym}-USDT PERP`,
      perpName: `${sym} Linear Perpetual Short`,
      perpTag: 'LINEAR PERP',
      marginDesc: `${sym} Spot Collateral (Unified Cross-Margin, 5% Haircut)`,
      note: sym === 'BTC'
        ? 'CEX Collateral Restricted: Desks do not whitelist Babylon LSTs for cross-margin. Use Isolated mode.'
        : 'Spot ETH cross-margin: Direct ETH collateral cushion with 5% haircut buffer.'
    };
  }
}

/**
 * Dynamically updates whitelist preset staking yields and metadata using live market data.
 */
export function updatePresetsWithLiveData(data: MarketDataSnapshot): void {
  // Update Lido wstETH preset with live Lido/DeFiLlama APY
  COLLATERAL_PRESETS.wsteth_90.stakingAPY = data.ETH.stakingAPY;
  COLLATERAL_PRESETS.wsteth_90.explainer = `Lido wstETH (Ethereum LST). Live ${data.ETH.stakingAPY.toFixed(1)}% base staking APY with an 8.5x (+852%) upside buffer. (${data.ETH.stakingSource})`;

  // Update Solana LRT preset with live Jito nominal and real yield
  const solNominal = data.SOL.nominalStakingAPY ?? 7.2;
  const solReal = data.SOL.realStakingAPY ?? 1.8;
  COLLATERAL_PRESETS.sol_lrt_85.nominalAPY = solNominal;
  COLLATERAL_PRESETS.sol_lrt_85.realAPY = solReal;
  COLLATERAL_PRESETS.sol_lrt_85.stakingAPY = solReal;
  COLLATERAL_PRESETS.sol_lrt_85.getExplainer = (type: SolYieldType) => {
    return type === 'nominal'
      ? `Solana LRT (Live Nominal ${solNominal.toFixed(1)}% APR): Gross staking emissions from ${data.SOL.stakingSource}; unadjusted for ~5.4% annual network inflation dilution.`
      : `Solana LRT (Live Real ${solReal.toFixed(1)}% APY): Net economic yield after stripping ~5.4% annual network dilution drag on USD purchasing power. +545% runway. (${data.SOL.stakingSource})`;
  };

  // Update Babylon BTC LST variants
  BTC_LST_VARIANTS.lbtc.stakingAPY = data.btcLst.lbtc.stakingAPY;
  BTC_LST_VARIANTS.lbtc.note = `Babylon Staking Active: LBTC held in Web3 custody (~${data.btcLst.lbtc.stakingAPY.toFixed(1)}% APY). Hedged with CEX cash margin. (${data.btcLst.lbtc.source})`;

  BTC_LST_VARIANTS.solvbtc.stakingAPY = data.btcLst.solvbtc.stakingAPY;
  BTC_LST_VARIANTS.solvbtc.note = `Babylon Staking Active: SolvBTC.BBN held in Web3 custody (~${data.btcLst.solvbtc.stakingAPY.toFixed(1)}% APY). Hedged with CEX cash margin. (${data.btcLst.solvbtc.source})`;
}
