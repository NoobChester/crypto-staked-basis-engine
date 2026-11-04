/**
 * @file presets.js
 * @description Collateral presets, asset definitions, and institutional margin metadata.
 */

/**
 * @typedef {'ETH' | 'BTC' | 'SOL'} TradedAsset
 * @typedef {'unified' | 'isolated'} MarginMode
 * @typedef {'nominal' | 'real'} SolYieldType
 * @typedef {'native' | 'lbtc' | 'solvbtc'} BtcVariant
 * @typedef {'inverse_100' | 'btc_eth_95' | 'wsteth_90' | 'sol_lrt_85'} CollateralPresetKey
 */

/**
 * Maintenance Margin Requirement (MMR) default: 0.5%
 */
export const DEFAULT_MMR = 0.005;

/**
 * Unified Margin Collateral Presets
 */
export const COLLATERAL_PRESETS = {
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
    stakingAPY: 1.8, // Default to real yield
    defaultAsset: 'SOL',
    badgeLabel: '85.0% (15% Haircut)',
    nominalAPY: 7.2,
    realAPY: 1.8,
    getExplainer(yieldType) {
      return yieldType === 'nominal'
        ? 'Solana / Liquid Restaking (Nominal 7.2%). Stacks high base yield with a +545% price surge liquidation buffer.'
        : 'Solana / Liquid Restaking (Real Yield 1.8%). Stacks inflation-adjusted real yield with a +545% price surge liquidation buffer.';
    }
  }
};

/**
 * Isolated BTC LST Variants (Babylon staking ecosystem)
 */
export const BTC_LST_VARIANTS = {
  lbtc: {
    symbol: 'LBTC',
    name: 'Lombard Staked Bitcoin (Babylon LST)',
    stakingAPY: 3.2,
    tag: 'BABYLON LST',
    note: 'Babylon Staking Active: LBTC held in Web3 custody (~3.2% APY). Hedged with cash margin on CEX (Bypasses CEX collateral whitelists).'
  },
  solvbtc: {
    symbol: 'SolvBTC.BBN',
    name: 'Solv Babylon Staked BTC',
    stakingAPY: 3.5,
    tag: 'BABYLON LST',
    note: 'Babylon Staking Active: SolvBTC.BBN held in Web3 custody (~3.5% APY). Hedged with cash margin on CEX (Bypasses CEX collateral whitelists).'
  },
  native: {
    symbol: 'BTC',
    name: 'Bitcoin Native Spot',
    stakingAPY: 0.0,
    tag: 'SPOT ASSET',
    note: 'Native Spot BTC held in cold custody; CEX derivatives hedged with cash margin.'
  }
};

/**
 * Resolves instrument details and metadata based on current state.
 * @param {object} s Current strategy state
 * @returns {object} Instrument metadata
 */
export function getInstrumentDetails(s) {
  const asset = s.tradedAsset || 'ETH';
  const mode = s.mode;
  const preset = s.activePreset;

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
        : 'Coin-Margined 1:1 inverse hedge.'
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
        ? 'CEX Collateral Restricted: Desks do not whitelist Babylon LSTs (LBTC/SolvBTC) for cross-margin. Switch to Isolated Margin to model them.'
        : 'Spot ETH cross-margin.'
    };
  }
}

