import { describe, it, expect } from 'vitest';
import {
  interpolateBasisRate,
  pchipInterpolate,
  fetchFuturesTermStructure,
  getHistoricalFundingSeries
} from '../src/services/marketData/futuresCurve.js';

describe('Market Data: Dated Futures Term Structure & Spline Engine', () => {
  describe('interpolateBasisRate (Fritsch-Carlson Monotone Cubic Spline - PCHIP)', () => {
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

    it('interpolates smoothly and preserves monotonicity between tenors', () => {
      const mid1 = interpolateBasisRate(testTenors, 60);
      expect(mid1).toBeGreaterThan(10.0);
      expect(mid1).toBeLessThan(12.0);
      expect(mid1).toBeCloseTo(11.08, 1);

      const mid2 = interpolateBasisRate(testTenors, 135);
      expect(mid2).toBeGreaterThan(12.0);
      expect(mid2).toBeLessThan(14.0);
      expect(mid2).toBeCloseTo(13.11, 1);
    });

    it('enforces Fritsch-Carlson zero overshoot on flat/non-monotonic regions', () => {
      const plateauPoints = [
        { x: 30, y: 10.0 },
        { x: 60, y: 20.0 },
        { x: 90, y: 20.0 },
        { x: 120, y: 10.0 }
      ];
      // On the plateau [60, 90], PCHIP must remain strictly 20.0 with zero overshoot
      expect(pchipInterpolate(plateauPoints, 75)).toBe(20.0);

      // Strictly bounded between 30 and 60
      const climb = pchipInterpolate(plateauPoints, 45);
      expect(climb).toBeGreaterThanOrEqual(10.0);
      expect(climb).toBeLessThanOrEqual(20.0);
    });

    it('clamps to boundary tenors when target is out of bounds', () => {
      expect(interpolateBasisRate(testTenors, 7)).toBe(10.0);
      expect(interpolateBasisRate(testTenors, 360)).toBe(14.0);
    });

    it('gracefully handles 1 and 2 tenor edge cases', () => {
      expect(pchipInterpolate([{ x: 30, y: 8.5 }], 60)).toBe(8.5);
      expect(pchipInterpolate([{ x: 30, y: 10.0 }, { x: 90, y: 12.0 }], 60)).toBe(11.0);
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
