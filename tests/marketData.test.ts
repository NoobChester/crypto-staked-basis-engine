import { describe, it, expect } from 'vitest';
import {
  parseBinanceFunding,
  parseHyperliquidFunding,
  parseLidoApr,
  parseJitoApy,
  parseDeFiLlamaChartApy,
  FALLBACK_MARKET_DATA,
  setFundingVenue,
  getLatestMarketData
} from '../src/services/marketData.js';

describe('Market Data Service & Quantitative Parsers', () => {

  describe('Binance Perpetual Funding Rate Parsing', () => {
    it('correctly annualizes positive 8-hour funding rates', () => {
      const mockPayload = {
        symbol: 'ETHUSDT',
        markPrice: '2319.22000000',
        indexPrice: '2319.51930233',
        lastFundingRate: '0.00010000',
        nextFundingTime: '1793808000000'
      };

      const res = parseBinanceFunding(mockPayload);
      // 0.0001 * 3 * 365 * 100 = 10.95%
      expect(res.rate8h).toBe(0.0001);
      expect(res.apr).toBe(10.95);
      expect(res.markPrice).toBe(2319.22);
      expect(res.indexPrice).toBe(2319.51930233);
      expect(res.nextFundingTime).toBe(1793808000000);
    });

    it('correctly annualizes negative 8-hour funding rates', () => {
      const mockPayload = {
        symbol: 'BTCUSDT',
        markPrice: '78000.00',
        lastFundingRate: '-0.00025000',
        nextFundingTime: '1793808000000'
      };

      const res = parseBinanceFunding(mockPayload);
      // -0.00025 * 3 * 365 * 100 = -27.375% => -27.38%
      expect(res.rate8h).toBe(-0.00025);
      expect(res.apr).toBe(-27.38);
    });

    it('handles zero funding rate without error', () => {
      const res = parseBinanceFunding({ lastFundingRate: '0.00000000' });
      expect(res.apr).toBe(0);
      expect(res.rate8h).toBe(0);
    });

    it('throws on invalid or missing payload', () => {
      expect(() => parseBinanceFunding(null)).toThrow('Invalid Binance funding payload');
      expect(() => parseBinanceFunding({})).toThrow('Invalid lastFundingRate');
    });
  });

  describe('Hyperliquid Perpetual Funding Rate Parsing', () => {
    it('correctly annualizes hourly funding rate for ETH and BTC', () => {
      const mockPayload = [
        {
          universe: [
            { name: 'BTC', szDecimals: 5 },
            { name: 'ETH', szDecimals: 4 }
          ]
        },
        [
          { funding: '0.0000125', markPx: '78400.0' },
          { funding: '0.0000100', markPx: '2320.0' }
        ]
      ];

      const btc = parseHyperliquidFunding(mockPayload, 'BTC');
      // 0.0000125 * 24 * 365 * 100 = 10.95%
      expect(btc.rate1h).toBe(0.0000125);
      expect(btc.apr).toBe(10.95);
      expect(btc.markPrice).toBe(78400.0);

      const eth = parseHyperliquidFunding(mockPayload, 'ETH');
      // 0.00001 * 24 * 365 * 100 = 8.76%
      expect(eth.rate1h).toBe(0.00001);
      expect(eth.apr).toBe(8.76);
      expect(eth.markPrice).toBe(2320.0);
    });

    it('throws when symbol is not present in universe', () => {
      const mockPayload = [
        { universe: [{ name: 'BTC' }] },
        [{ funding: '0.00001' }]
      ];
      expect(() => parseHyperliquidFunding(mockPayload, 'SOL')).toThrow('Symbol SOL not found on Hyperliquid');
    });
  });

  describe('Venue Selection & Consensus Calculations', () => {
    it('switches active funding venue between Binance, Hyperliquid, and Average', () => {
      setFundingVenue('hyperliquid');
      let data = getLatestMarketData();
      expect(data.selectedVenue).toBe('hyperliquid');
      expect(data.ETH.selectedVenue).toBe('hyperliquid');

      setFundingVenue('average');
      data = getLatestMarketData();
      expect(data.selectedVenue).toBe('average');

      setFundingVenue('binance');
      data = getLatestMarketData();
      expect(data.selectedVenue).toBe('binance');
    });
  });

  describe('Lido Staking APR Parsing', () => {
    it('extracts live stETH APR correctly', () => {
      const mockLido = {
        data: {
          timeUnix: 1793708579,
          apr: 2.301
        },
        meta: { symbol: 'stETH' }
      };

      const apr = parseLidoApr(mockLido);
      expect(apr).toBe(2.30);
    });

    it('throws on invalid Lido APR', () => {
      expect(() => parseLidoApr({})).toThrow('Invalid Lido APR response');
      expect(() => parseLidoApr({ data: { apr: 'invalid' } })).toThrow('Invalid Lido APR response');
    });
  });

  describe('Jito Network Solana Staking APY Parsing', () => {
    it('extracts nominal and calculates real APY net of Solana inflation', () => {
      const mockJito = {
        apy: [
          { data: 0.048, date: '2026-10-28' },
          { data: 0.049339, date: '2026-11-04' }
        ]
      };

      const res = parseJitoApy(mockJito);
      expect(res.nominal).toBe(4.93);
      expect(res.real).toBeGreaterThan(0);
    });

    it('accurately strips 5.4% inflation dilution when nominal exceeds 5.4%', () => {
      const mockJito = {
        apy: [
          { data: 0.0720, date: '2026-11-04' }
        ]
      };

      const res = parseJitoApy(mockJito);
      expect(res.nominal).toBe(7.20);
      expect(res.real).toBe(1.80);
    });

    it('throws on empty or invalid Jito response', () => {
      expect(() => parseJitoApy({})).toThrow('Invalid Jito APY response');
      expect(() => parseJitoApy({ apy: [] })).toThrow('Invalid Jito APY response');
    });
  });

  describe('DeFiLlama Chart APY Parsing', () => {
    it('extracts the latest APY from time series', () => {
      const mockLlama = {
        data: [
          { timestamp: '2026-11-03', apy: 0.92 },
          { timestamp: '2026-11-04', apy: 0.9528 }
        ]
      };

      const apy = parseDeFiLlamaChartApy(mockLlama);
      expect(apy).toBe(0.95);
    });

    it('throws on invalid DeFiLlama payload', () => {
      expect(() => parseDeFiLlamaChartApy({})).toThrow('Invalid DeFiLlama chart response');
      expect(() => parseDeFiLlamaChartApy({ data: [] })).toThrow('Invalid DeFiLlama chart response');
    });
  });

  describe('Fallback Market Data Structure', () => {
    it('provides valid institutional presets for ETH, BTC, SOL across all venues', () => {
      expect(FALLBACK_MARKET_DATA.ETH.venues.binance.apr).toBe(10.0);
      expect(FALLBACK_MARKET_DATA.ETH.venues.hyperliquid.apr).toBe(10.0);
      expect(FALLBACK_MARKET_DATA.ETH.venues.average.apr).toBe(10.0);
      expect(FALLBACK_MARKET_DATA.ETH.stakingAPY).toBe(3.2);
      expect(FALLBACK_MARKET_DATA.BTC.stakingAPY).toBe(0.0);
      expect(FALLBACK_MARKET_DATA.SOL.stakingAPY).toBe(1.8);
      expect(FALLBACK_MARKET_DATA.btcLst.lbtc.stakingAPY).toBe(3.2);
      expect(FALLBACK_MARKET_DATA.btcLst.solvbtc.stakingAPY).toBe(3.5);
    });
  });

  describe('Preset Dynamic Updates with Live Feeds', () => {
    it('updates whitelist presets and BTC variants from live market snapshot', async () => {
      const { updatePresetsWithLiveData, COLLATERAL_PRESETS, BTC_LST_VARIANTS } = await import('../src/config/presets.js');

      const mockSnapshot = JSON.parse(JSON.stringify(FALLBACK_MARKET_DATA));
      mockSnapshot.ETH.stakingAPY = 2.45;
      mockSnapshot.ETH.stakingSource = 'Lido Test Oracle';
      mockSnapshot.SOL.nominalStakingAPY = 5.12;
      mockSnapshot.SOL.realStakingAPY = 1.95;
      mockSnapshot.btcLst.lbtc.stakingAPY = 1.15;
      mockSnapshot.btcLst.solvbtc.stakingAPY = 3.65;

      updatePresetsWithLiveData(mockSnapshot);

      expect(COLLATERAL_PRESETS.wsteth_90.stakingAPY).toBe(2.45);
      expect(COLLATERAL_PRESETS.wsteth_90.explainer).toContain('2.5%');
      expect(COLLATERAL_PRESETS.sol_lrt_85.nominalAPY).toBe(5.12);
      expect(COLLATERAL_PRESETS.sol_lrt_85.realAPY).toBe(1.95);
      expect(BTC_LST_VARIANTS.lbtc.stakingAPY).toBe(1.15);
      expect(BTC_LST_VARIANTS.solvbtc.stakingAPY).toBe(3.65);
    });
  });
});
