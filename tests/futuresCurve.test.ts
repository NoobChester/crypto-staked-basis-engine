import { describe, it, expect } from 'vitest';
import {
  interpolateBasisRate,
  fetchFuturesTermStructure,
  getHistoricalFundingSeries
} from '../src/services/marketData/futuresCurve.js';

describe('Market Data: Dated Futures Term Structure & Spline Engine', () => {
  describe('interpolateBasisRate (Spline & Piecewise Interpolation)', () => {
    const testTenors = [
      { instrument: 'TEST-1M', daysToExpiry: 30, annualizedBasisPct: 10.0, futuresPrice: 3025, spotPrice: 3000 },
      { instrument: 'TEST-3M', daysToExpiry: 90, annualizedBasisPct: 12.0, futuresPrice: 3090, spotPrice: 3000 },
      { instrument: 'TEST-6M', daysToExpiry: 180, annualizedBasisPct: 14.0, futuresPrice: 3210, spotPrice: 3000 }
    ];

    it('returns exact tenor basis when target matches tenor date', () => {
      expect(interpolateBasisRate(testTenors, 30)).toBe(10.0);
      expect(interpolateBasisRate(testTenors, 90)).toBe(12.0);
      expect(interpolateBasisRate(testTenors, 180)).toBe(14.0);
    });

    it('interpolates smoothly between tenors', () => {
      // Midpoint between 30d (10.0%) and 90d (12.0%) at 60d should be 11.0%
      expect(interpolateBasisRate(testTenors, 60)).toBe(11.0);
      // Midpoint between 90d (12.0%) and 180d (14.0%) at 135d should be 13.0%
      expect(interpolateBasisRate(testTenors, 135)).toBe(13.0);
    });

    it('clamps to boundary tenors when target is out of bounds', () => {
      expect(interpolateBasisRate(testTenors, 7)).toBe(10.0);
      expect(interpolateBasisRate(testTenors, 360)).toBe(14.0);
    });
  });

  describe('fetchFuturesTermStructure', () => {
    it('returns valid term structure for ETH with fallback resilience', async () => {
      const ethCurve = await fetchFuturesTermStructure('ETH');
      expect(ethCurve.asset).toBe('ETH');
      expect(ethCurve.tenors.length).toBeGreaterThanOrEqual(2);
      expect(ethCurve.interpolatedBasis30d).toBeGreaterThan(0);
      expect(ethCurve.interpolatedBasis90d).toBeGreaterThan(0);
      expect(ethCurve.interpolatedBasis180d).toBeGreaterThan(0);

      // Verify tenor fields
      const first = ethCurve.tenors[0];
      expect(first.daysToExpiry).toBeGreaterThanOrEqual(7);
      expect(first.futuresPrice).toBeGreaterThan(0);
      expect(first.spotPrice).toBeGreaterThan(0);
      expect(typeof first.annualizedBasisPct).toBe('number');
      expect(Number.isFinite(first.annualizedBasisPct)).toBe(true);
    });

    it('returns valid term structure for BTC and SOL', async () => {
      const btcCurve = await fetchFuturesTermStructure('BTC');
      expect(btcCurve.asset).toBe('BTC');
      expect(btcCurve.tenors.length).toBeGreaterThanOrEqual(2);

      const solCurve = await fetchFuturesTermStructure('SOL');
      expect(solCurve.asset).toBe('SOL');
      expect(solCurve.tenors.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getHistoricalFundingSeries Adapter', () => {
    it('extracts contiguous funding array for calibration', async () => {
      const series = await getHistoricalFundingSeries('ETH', 30);
      expect(Array.isArray(series)).toBe(true);
      expect(series.length).toBeGreaterThanOrEqual(5);
      expect(typeof series[0]).toBe('number');
    });
  });
});
