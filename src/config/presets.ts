/**
 * @file presets.ts
 * @description Collateral presets, institutional staking podium metadata, and margin rules.
 */

import type { MarketDataSnapshot } from '../services/marketData.js';

export type TradedAsset = 'ETH' | 'BTC' | 'SOL';
export type MarginMode = 'unified' | 'isolated';
export type SolYieldType = 'nominal' | 'real';
export type BtcVariant = 'native' | 'lbtc' | 'solvbtc';
export type CollateralPresetKey = 'wsteth_90' | 'wbeth_95' | 'fbtc_90' | 'jitosol_85' | 'sanctum_inf_85' | 'inverse_100' | 'btc_eth_95' | 'sol_lrt_85';

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

export interface CollateralIntelligence {
  rank: number;
  asset: string;
  protocol: string;
  marginVenue: string;
  realApyText: string;
  valuationRatio: number;
  bufferText: string;
  whyWorthUsing: string;
  beatsAlternative: string;
  alternativeName: string;
  verdict: string;
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
  wsteth_90: {
    collateralRatio: 0.90,
    stakingAPY: 3.2,
    defaultAsset: 'ETH',
    badgeLabel: '#1 Lido wstETH (90%)',
    explainer: 'Rank #1 Institutional Gold Standard: Lido wstETH with 10% haircut (+852% runway) and multi-billion secondary liquidity.'
  },
  wbeth_95: {
    collateralRatio: 0.95,
    stakingAPY: 3.1,
    defaultAsset: 'ETH',
    badgeLabel: '#2 Binance WBETH (95%)',
    explainer: 'Binance Portfolio Margin Native Staked ETH: 95% collateral ratio (5% haircut, +1,718% runway at 1x) with 0-fee promotions and deep Binance CEX liquidity.'
  },
  fbtc_90: {
    collateralRatio: 0.90,
    stakingAPY: 3.0,
    defaultAsset: 'BTC',
    badgeLabel: '#2 FBTC (90%)',
    explainer: 'Rank #2 Bitcoin Game Changer: Cobo/Bybit FBTC is the ONLY BTC asset unlocking 100% Unified Margin on Bybit UTA (2x Babylon dollar carry).'
  },
  jitosol_85: {
    collateralRatio: 0.85,
    stakingAPY: 1.8,
    defaultAsset: 'SOL',
    badgeLabel: '#3 JitoSOL (85%)',
    nominalAPY: 7.2,
    realAPY: 1.8,
    getExplainer(yieldType: SolYieldType) {
      return yieldType === 'nominal'
        ? 'Rank #3 Solana CEX Champion: JitoSOL capturing MEV tips (Nominal 7.2% APR emissions before inflation). 15% haircut (+545% buffer).'
        : 'Rank #3 Solana CEX Champion: JitoSOL capturing MEV tips (Real 1.8% APY net of inflation). Whitelisted on Bybit UTA (15% haircut, +545% buffer).';
    }
  },
  sol_lrt_85: {
    collateralRatio: 0.85,
    stakingAPY: 1.8,
    defaultAsset: 'SOL',
    badgeLabel: '#3 JitoSOL (85%)',
    nominalAPY: 7.2,
    realAPY: 1.8,
    getExplainer(yieldType: SolYieldType) {
      return yieldType === 'nominal'
        ? 'Rank #3 Solana CEX Champion: JitoSOL capturing MEV tips (Nominal 7.2% APR emissions before inflation). 15% haircut (+545% buffer).'
        : 'Rank #3 Solana CEX Champion: JitoSOL capturing MEV tips (Real 1.8% APY net of inflation). Whitelisted on Bybit UTA (15% haircut, +545% buffer).';
    }
  },
  sanctum_inf_85: {
    collateralRatio: 0.85,
    stakingAPY: 3.1,
    defaultAsset: 'SOL',
    badgeLabel: '#4 Sanctum INF (85%)',
    nominalAPY: 8.5,
    realAPY: 3.1,
    explainer: 'Rank #4 Solana DeFi Monster: Sanctum INF earns base staking + dynamic LST swap fee revenue (~3.1% real yield) executed via Drift Protocol.'
  },
  inverse_100: {
    collateralRatio: 1.00,
    stakingAPY: 0.0,
    defaultAsset: 'BTC',
    badgeLabel: '100% Inverse COIN-M',
    explainer: 'Standard Inverse COIN-M perp. Spot value gains equal perp losses 1:1. Zero liquidation risk.'
  },
  btc_eth_95: {
    collateralRatio: 0.95,
    stakingAPY: 0.0,
    defaultAsset: 'BTC',
    badgeLabel: '95.0% Vanilla Spot',
    explainer: 'Pure spot BTC/ETH in Unified Margin. Zero staking risk with a +1,718% liquidation buffer.'
  }
};

export const COLLATERAL_INTELLIGENCE: Record<CollateralPresetKey, CollateralIntelligence> = {
  wsteth_90: {
    rank: 1,
    asset: 'Ethereum (ETH)',
    protocol: 'Lido (wstETH)',
    marginVenue: 'Unified Margin (0.90) // Bybit UTA & Binance PM',
    realApyText: '~3.2% Base PoS + Perp (~13% - 15% Gross)',
    valuationRatio: 0.90,
    bufferText: '+852.4% Rally Runway (10% Haircut)',
    whyWorthUsing: 'The undisputed Gold Standard. 10% haircut, multi-billion instant secondary liquidity, and 4 years of battle-tested zero-exploit history.',
    beatsAlternative: 'Ether.fi (weETH) gives ~+0.8% more yield, but Bybit hits you with a 20% haircut (reducing runway from +852% to +395%) and exposes funds to EigenLayer AVS slashing bugs.',
    alternativeName: 'Ether.fi (weETH)',
    verdict: 'For a 7-figure delta-neutral carry trade, wstETH is the cleanest, most sleep-at-night asset in crypto.'
  },
  wbeth_95: {
    rank: 2,
    asset: 'Ethereum (ETH)',
    protocol: 'Binance Staking (WBETH)',
    marginVenue: 'Unified Margin (0.95) // Binance Portfolio Margin',
    realApyText: '~3.1% Base PoS + Perp (~13% - 15% Gross)',
    valuationRatio: 0.95,
    bufferText: '+1,718.2% Rally Runway (5% Haircut)',
    whyWorthUsing: 'Unlocks the tightest haircut (5%) on any tier-1 CEX. Maximizes capital efficiency, doubles the 1x liquidation runway to +1,718%, and allows leverage up to 18x.',
    beatsAlternative: 'Lido wstETH carries a 10% haircut (+852% runway). WBETH only carries a 5% haircut (+1,718% runway) and offers 0-fee promotions on Binance.',
    alternativeName: 'Lido (wstETH)',
    verdict: 'The premier choice for high-leverage delta-neutral basis on Binance Portfolio Margin.'
  },
  fbtc_90: {
    rank: 2,
    asset: 'Bitcoin (BTC)',
    protocol: 'FBTC (Cobo / Bybit)',
    marginVenue: 'Unified Margin (0.90) // Bybit UTA',
    realApyText: '~3.0% Staking + Perp (~13% - 14% Gross)',
    valuationRatio: 0.90,
    bufferText: '+852.4% Rally Runway (10% Haircut)',
    whyWorthUsing: 'The ONLY Bitcoin asset that unlocks 100% Unified Margin! Your entire BTC pool earns ~3.0% yield while directly backing the short perp.',
    beatsAlternative: 'Babylon BTC (LBTC / SolvBTC) forces you into Isolated Margin with 50% in idle 0% USDC cash margin, cutting net strategy APY in half from 13% down to ~6.6%. FBTC delivers 2x the net dollar carry.',
    alternativeName: 'Babylon BTC (LBTC / SolvBTC)',
    verdict: 'If you want to run a Bitcoin carry trade in Unified Margin, FBTC on Bybit is currently the only game in town.'
  },
  jitosol_85: {
    rank: 3,
    asset: 'Solana (SOL)',
    protocol: 'Jito (JitoSOL)',
    marginVenue: 'Unified Margin (0.85) // Bybit UTA & Drift',
    realApyText: '~1.8% Real MEV Tips + Perp (~14% Gross)',
    valuationRatio: 0.85,
    bufferText: '+545.2% Rally Runway (15% Haircut)',
    whyWorthUsing: 'Captures Solana MEV priority transaction tips (arbitrageurs paying validators to frontrun/backrun DEX trades). Passes cash tips directly to stakers.',
    beatsAlternative: 'Marinade (mSOL) relies on standard network emissions (real yield is only ~1.4%). Jito provides higher real economic yield and Bybit whitelisting.',
    alternativeName: 'Marinade (mSOL)',
    verdict: 'The premier choice if shorting on a centralized exchange.'
  },
  sanctum_inf_85: {
    rank: 4,
    asset: 'Solana DeFi',
    protocol: 'Sanctum (INF)',
    marginVenue: 'Unified Margin (0.85) // Drift Protocol',
    realApyText: '~3.1% Real Yield + Perp (~15% Gross)',
    valuationRatio: 0.85,
    bufferText: '+545.2% Rally Runway (15% Haircut)',
    whyWorthUsing: 'Highest real yield on Solana. Sanctum Infinity Pool earns normal staking yield PLUS dynamic LST swap fee revenue from on-chain arbitrageurs.',
    beatsAlternative: 'Not whitelisted on CEXs (Binance / Bybit); you must run the carry trade on Solana DeFi (holding INF on Drift and shorting Drift SOL-PERP).',
    alternativeName: 'Centralized LSTs (JitoSOL / mSOL)',
    verdict: 'The hidden yield monster for on-chain DeFi delta-neutral allocators.'
  },
  inverse_100: {
    rank: 0,
    asset: 'BTC / ETH',
    protocol: 'Native Coin-M Inverse',
    marginVenue: 'Inverse 1:1 COIN-M Account',
    realApyText: '0.0% Spot + 10.0% Funding APR',
    valuationRatio: 1.00,
    bufferText: 'IMMUNE (Mathematically Infinite Runway)',
    whyWorthUsing: 'Zero liquidation risk. Spot collateral value gains match perp losses 1:1 on coin-margined contracts.',
    beatsAlternative: 'Linear perps risk liquidation on rallies, but Inverse contracts sacrifice USD cash compounding.',
    alternativeName: 'Linear USDT Perps',
    verdict: 'Ideal for sovereign Bitcoin maximalists hedging USD value without counterparty margin call risk.'
  },
  btc_eth_95: {
    rank: 0,
    asset: 'BTC / ETH',
    protocol: 'Vanilla Spot Collateral',
    marginVenue: 'Unified Margin (0.95) // Tier-1 CEX',
    realApyText: '0.0% Spot + 10.0% Funding APR',
    valuationRatio: 0.95,
    bufferText: '+1,718% Rally Runway (5% Haircut)',
    whyWorthUsing: 'Zero smart contract risk. Plain spot BTC/ETH serves directly as margin collateral.',
    beatsAlternative: 'Sacrifices 3% LST staking yield in exchange for zero depeg and zero smart contract risk.',
    alternativeName: 'LST Staking Collateral',
    verdict: 'The institutional benchmark for pure risk-free cash-and-carry execution.'
  },
  sol_lrt_85: {
    rank: 3,
    asset: 'Solana (SOL)',
    protocol: 'Jito (JitoSOL)',
    marginVenue: 'Unified Margin (0.85) // Bybit UTA & Drift',
    realApyText: '~1.8% Real MEV Tips + Perp (~14% Gross)',
    valuationRatio: 0.85,
    bufferText: '+545.2% Rally Runway (15% Haircut)',
    whyWorthUsing: 'Captures Solana MEV priority transaction tips (arbitrageurs paying validators to frontrun/backrun DEX trades). Passes cash tips directly to stakers.',
    beatsAlternative: 'Marinade (mSOL) relies on standard network emissions (real yield is only ~1.4%). Jito provides higher real economic yield and Bybit whitelisting.',
    alternativeName: 'Marinade (mSOL)',
    verdict: 'The premier choice if shorting on a centralized exchange.'
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
        pairBadge: `${btcMeta.symbol} / BTC-USDC PERP (HYPERLIQUID)`,
        spotSymbol: btcMeta.symbol,
        spotName: btcMeta.name,
        spotTag: btcMeta.tag,
        perpSymbol: 'BTC-USDC PERP',
        perpName: 'Hyperliquid BTC Linear Perp',
        perpTag: 'ISOLATED SHORT',
        marginDesc: 'USDC Cash Margin (Hyperliquid / CEX Isolated Account)',
        note: btcMeta.note
      };
    } else if (asset === 'SOL') {
      return {
        pairBadge: 'SOL-SPOT / SOL-USDC PERP (HYPERLIQUID)',
        spotSymbol: 'SOL',
        spotName: 'Solana Native Spot',
        spotTag: 'SPOT ASSET',
        perpSymbol: 'SOL-USDC PERP',
        perpName: 'Hyperliquid SOL Linear Perp',
        perpTag: 'ISOLATED SHORT',
        marginDesc: 'USDC Cash Margin (Hyperliquid / CEX Isolated Account)',
        note: 'Native SOL held in custody; Hyperliquid derivatives margined in cash USDC.'
      };
    } else {
      return {
        pairBadge: 'ETH-SPOT / ETH-USDC PERP (HYPERLIQUID)',
        spotSymbol: 'ETH',
        spotName: 'Ethereum Native Spot',
        spotTag: 'SPOT ASSET',
        perpSymbol: 'ETH-USDC PERP',
        perpName: 'Hyperliquid ETH Linear Perp',
        perpTag: 'ISOLATED SHORT',
        marginDesc: 'USDC Cash Margin (Hyperliquid / CEX Isolated Account)',
        note: 'Native ETH held in custody; Hyperliquid derivatives margined in cash USDC.'
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
      marginDesc: 'wstETH Collateral (Bybit UTA / Binance PM, 10% Haircut)',
      note: 'Rank #1 Institutional Gold Standard: wstETH accepted directly as margin collateral (90% valuation).'
    };
  } else if (preset === 'wbeth_95') {
    return {
      pairBadge: 'WBETH / ETH-USDT PERP',
      spotSymbol: 'WBETH',
      spotName: 'Binance Wrapped Beacon ETH',
      spotTag: 'CEX LST',
      perpSymbol: 'ETH-USDT PERP',
      perpName: 'Ethereum Linear Perpetual Short',
      perpTag: 'USDⓈ-M PERP',
      marginDesc: 'WBETH Collateral (Binance Portfolio Margin, 5% Haircut)',
      note: 'Binance Native Staked ETH: 95% collateral credit ratio (5% haircut, +1,718% rally runway at 1x).'
    };
  } else if (preset === 'fbtc_90') {
    return {
      pairBadge: 'FBTC / BTC-USDT PERP',
      spotSymbol: 'FBTC',
      spotName: 'Cobo / Bybit Staked Bitcoin',
      spotTag: 'BTC LST',
      perpSymbol: 'BTC-USDT PERP',
      perpName: 'Bitcoin Linear Perpetual Short',
      perpTag: 'LINEAR PERP',
      marginDesc: 'FBTC Collateral (Bybit UTA Unified Margin, 10% Haircut)',
      note: 'Rank #2 Bitcoin Game Changer: FBTC unlocks 100% Unified Margin on Bybit UTA (delivering 2x net dollar carry vs Babylon).'
    };
  } else if (preset === 'jitosol_85' || preset === 'sol_lrt_85') {
    return {
      pairBadge: 'JitoSOL / SOL-USDT PERP',
      spotSymbol: 'JitoSOL',
      spotName: 'Jito Staked SOL (LST)',
      spotTag: 'SOL LST',
      perpSymbol: 'SOL-USDT PERP',
      perpName: 'Solana Linear Perpetual Short',
      perpTag: 'LINEAR PERP',
      marginDesc: 'JitoSOL Collateral (Bybit UTA, 15% Haircut)',
      note: 'Rank #3 Solana CEX Champion: Captures Solana MEV priority tips directly to stakers (85% valuation).'
    };
  } else if (preset === 'sanctum_inf_85') {
    return {
      pairBadge: 'INF / SOL-PERP (DRIFT PROTOCOL)',
      spotSymbol: 'Sanctum INF',
      spotName: 'Sanctum Infinity Pool LST',
      spotTag: 'DEFI LST',
      perpSymbol: 'SOL-PERP (Drift)',
      perpName: 'Drift Protocol Solana Perp',
      perpTag: 'DRIFT DEFI PERP',
      marginDesc: 'Sanctum INF Collateral on Drift Protocol (15% Haircut)',
      note: 'Rank #4 Solana DeFi Monster: Earns staking yield + dynamic LST swap fee revenue on Drift Protocol.'
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
      note: 'Coin-Margined 1:1 inverse hedge. Mathematically immune to liquidation.'
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
      note: 'Spot cross-margin: Direct collateral cushion with 5% haircut buffer (+1,718% runway).'
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
  COLLATERAL_PRESETS.jitosol_85.nominalAPY = solNominal;
  COLLATERAL_PRESETS.jitosol_85.realAPY = solReal;
  COLLATERAL_PRESETS.jitosol_85.stakingAPY = solReal;
  COLLATERAL_PRESETS.jitosol_85.getExplainer = (type: SolYieldType) => {
    return type === 'nominal'
      ? `Rank #3 Solana CEX Champion: JitoSOL (Nominal ${solNominal.toFixed(1)}% APR): Gross staking emissions from ${data.SOL.stakingSource}; unadjusted for ~5.4% annual network inflation dilution.`
      : `Rank #3 Solana CEX Champion: JitoSOL (Real ${solReal.toFixed(1)}% APY): Net economic yield after stripping ~5.4% annual network dilution drag on USD purchasing power. +545% runway. (${data.SOL.stakingSource})`;
  };
  COLLATERAL_PRESETS.sol_lrt_85.nominalAPY = solNominal;
  COLLATERAL_PRESETS.sol_lrt_85.realAPY = solReal;
  COLLATERAL_PRESETS.sol_lrt_85.stakingAPY = solReal;
  COLLATERAL_PRESETS.sol_lrt_85.getExplainer = COLLATERAL_PRESETS.jitosol_85.getExplainer;

  // Update Babylon BTC LST variants
  BTC_LST_VARIANTS.lbtc.stakingAPY = data.btcLst.lbtc.stakingAPY;
  BTC_LST_VARIANTS.lbtc.note = `Babylon Staking Active: LBTC held in Web3 custody (~${data.btcLst.lbtc.stakingAPY.toFixed(1)}% APY). Hedged with CEX cash margin. (${data.btcLst.lbtc.source})`;

  BTC_LST_VARIANTS.solvbtc.stakingAPY = data.btcLst.solvbtc.stakingAPY;
  BTC_LST_VARIANTS.solvbtc.note = `Babylon Staking Active: SolvBTC.BBN held in Web3 custody (~${data.btcLst.solvbtc.stakingAPY.toFixed(1)}% APY). Hedged with CEX cash margin. (${data.btcLst.solvbtc.source})`;
}

export interface VenueFeeSchedule {
  venueName: string;
  retailRate: number;
  optimizedRate: number;
  retailLabel: string;
  optimizedLabel: string;
  exchange: 'binance' | 'bybit' | 'hyperliquid';
}

export const VENUE_FEE_SCHEDULES: Record<string, VenueFeeSchedule> = {
  wbeth: {
    venueName: 'Binance Portfolio Margin',
    retailRate: 0.0014, // 14 bps
    optimizedRate: 0.0004, // 4 bps
    retailLabel: '14 bps (Binance VIP0 Taker)',
    optimizedLabel: '4 bps (Maker Post-Only)',
    exchange: 'binance'
  },
  wsteth: {
    venueName: 'Bybit Unified Account (UTA)',
    retailRate: 0.0018, // 18 bps
    optimizedRate: 0.0005, // 5 bps
    retailLabel: '18 bps (Bybit VIP0 Taker)',
    optimizedLabel: '5 bps (Maker Post-Only)',
    exchange: 'bybit'
  },
  fbtc: {
    venueName: 'Bybit Unified Account (UTA)',
    retailRate: 0.0018,
    optimizedRate: 0.0005,
    retailLabel: '18 bps (Bybit VIP0 Taker)',
    optimizedLabel: '5 bps (Maker Post-Only)',
    exchange: 'bybit'
  },
  jitosol: {
    venueName: 'Bybit Unified Account (UTA)',
    retailRate: 0.0018,
    optimizedRate: 0.0005,
    retailLabel: '18 bps (Bybit VIP0 Taker)',
    optimizedLabel: '5 bps (Maker Post-Only)',
    exchange: 'bybit'
  },
  isolated: {
    venueName: 'Hyperliquid / Web3 Custody',
    retailRate: 0.0008, // 8 bps
    optimizedRate: 0.0002, // 2 bps
    retailLabel: '8 bps (DEX Taker)',
    optimizedLabel: '2 bps (DEX Maker)',
    exchange: 'hyperliquid'
  }
};
