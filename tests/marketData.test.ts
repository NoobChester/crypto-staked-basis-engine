import { describe, it, expect } from 'vitest';
import {
  parseBinanceFunding,
  parseHyperliquidFunding,
  parseLidoApr,
  parseJitoApy,
  parseDeFiLlamaChartApy,
  FALLBACK_MARKET_DATA,
  setFundingVenue,
  getLatestMarketData,
  computeWindowStats
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

  describe('Rolling Window Statistics & Mathematical Properties', () => {
    it('computes exact mean, min, max, standard deviation and negative flip frequency', () => {
      // 10 intervals: 6 positive, 4 negative
      const mockValues = [10.0, 12.0, 8.0, -5.0, -2.0, 15.0, 20.0, -10.0, 0.0, -4.0];
      const stats = computeWindowStats(mockValues);

      // Sum = 44, Mean = 4.4
      expect(stats.avg).toBe(4.4);
      expect(stats.min).toBe(-10.0);
      expect(stats.max).toBe(20.0);
      expect(stats.intervalCount).toBe(10);
      // 4 negative values out of 10 = 40.0%
      expect(stats.negativeIntervalPct).toBe(40.0);
      expect(stats.stdDev).toBeGreaterThan(0);
    });

    it('handles empty value arrays without crashing', () => {
      const stats = computeWindowStats([]);
      expect(stats.avg).toBe(0);
      expect(stats.min).toBe(0);
      expect(stats.max).toBe(0);
      expect(stats.stdDev).toBe(0);
      expect(stats.negativeIntervalPct).toBe(0);
      expect(stats.intervalCount).toBe(0);
    });

    it('populates default trailing rolling averages for all triad assets', () => {
      expect(FALLBACK_MARKET_DATA.ETH.trailingAverages.funding7d).toBeGreaterThan(0);
      expect(FALLBACK_MARKET_DATA.ETH.trailingAverages.funding30d).toBeGreaterThan(0);
      expect(FALLBACK_MARKET_DATA.ETH.trailingAverages.staking7d).toBeGreaterThan(0);
      expect(FALLBACK_MARKET_DATA.SOL.trailingAverages.staking30d).toBe(1.80);
      expect(FALLBACK_MARKET_DATA.BTC.trailingAverages.staking7d).toBe(0.0);
    });
  });

  describe('Historical Carry Analytics Fetcher & Series Alignment', () => {
    it('generates contiguous daily series matching requested rangeDays', async () => {
      const { fetchAssetHistoricalAnalytics } = await import('../src/services/marketData.js');

      const analytics30 = await fetchAssetHistoricalAnalytics('ETH', 30, 'real');
      expect(analytics30.symbol).toBe('ETH');
      expect(analytics30.rangeDays).toBe(30);
      expect(analytics30.series.length).toBe(30);

      // Verify net carry formula: consensusApr + stakingApy
      const lastPoint = analytics30.series[analytics30.series.length - 1];
      expect(lastPoint.netCarryApy).toBeCloseTo(lastPoint.consensusApr + lastPoint.stakingApy, 1);
      expect(analytics30.binanceAvg).toBeDefined();
      expect(analytics30.hyperliquidAvg).toBeDefined();
      expect(analytics30.fundingDivergence).toBeGreaterThanOrEqual(0);
    });

    it('respects SOL Real vs Nominal Staking Yield modes', async () => {
      const { fetchAssetHistoricalAnalytics } = await import('../src/services/marketData.js');

      const realSol = await fetchAssetHistoricalAnalytics('SOL', 30, 'real');
      const nomSol = await fetchAssetHistoricalAnalytics('SOL', 30, 'nominal');

      expect(nomSol.stakingAvg).toBeGreaterThan(realSol.stakingAvg);
      expect(nomSol.netCarryAvg).toBeGreaterThan(realSol.netCarryAvg);
    });

    it('handles BTC historical carry with zero spot staking for native spot', async () => {
      const { fetchAssetHistoricalAnalytics } = await import('../src/services/marketData.js');

      const btcAnalytics = await fetchAssetHistoricalAnalytics('BTC', 30, 'real');
      expect(btcAnalytics.symbol).toBe('BTC');
      expect(btcAnalytics.series.length).toBe(30);
      expect(btcAnalytics.binanceAvg).toBeDefined();
    });

    it('allows dynamic switching across all three Triad assets (ETH, BTC, SOL)', async () => {
      const { fetchAssetHistoricalAnalytics } = await import('../src/services/marketData.js');

      const assets = ['ETH', 'BTC', 'SOL'] as const;
      for (const asset of assets) {
        const res = await fetchAssetHistoricalAnalytics(asset, 30, 'real');
        expect(res.symbol).toBe(asset);
        expect(res.series.length).toBe(30);
        expect(res.consensusAvg).toBeDefined();
        expect(res.stakingAvg).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
