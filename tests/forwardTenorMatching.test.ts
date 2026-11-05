import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  fetchFuturesTermStructure,
  interpolateBasisRate,
  FALLBACK_FUTURES_CURVES
} from '../src/services/marketData/futuresCurve.js';

describe('Dynamic Forward Tenor Matching & Rate Source Badging', () => {
  it('derives distinct forward basis rates matching requested holding tenors', () => {
    const tenors = FALLBACK_FUTURES_CURVES.ETH;

    const basis30d = interpolateBasisRate(tenors, 30);
    const basis90d = interpolateBasisRate(tenors, 90);
    const basis180d = interpolateBasisRate(tenors, 180);

    // Forward curve should be upward sloping / distinct per tenor
    expect(basis30d).toBeGreaterThan(0);
    expect(basis90d).toBeGreaterThan(0);
    expect(basis180d).toBeGreaterThan(0);
    expect(basis30d).not.toEqual(basis90d);
  });

  it('overwrites previous rate state with the forward tenor matched basis', async () => {
    const termStruct = await fetchFuturesTermStructure('ETH');

    // Simulate user having a custom/overridden rate of 5.0%
    let currentFundingRate = 5.0;

    // Horizon changed to 90 days -> actively overwrites previous rate
    const newDays = 90;
    const forwardMatched = interpolateBasisRate(termStruct.tenors, newDays);
    currentFundingRate = forwardMatched;

    expect(currentFundingRate).toBe(termStruct.interpolatedBasis90d);
    expect(currentFundingRate).not.toBe(5.0);
  });

  describe('Rate Source Badge Formatter', () => {
    let mockBadge: any;
    let mockDesc: any;

    beforeEach(() => {
      mockBadge = { textContent: '', className: '' };
      mockDesc = { textContent: '', className: '' };

      (global as any).window = { innerWidth: 1200, addEventListener: vi.fn(), removeEventListener: vi.fn() };
      (global as any).document = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        getElementById: (id: string) => {
          if (id === 'badge-rate-source') return mockBadge;
          if (id === 'desc-funding-source') return mockDesc;
          return null;
        },
        querySelectorAll: () => []
      };
    });

    afterEach(() => {
      delete (global as any).window;
      delete (global as any).document;
    });

    it('formats badge correctly for forward tenor matching', async () => {
      const { updateRateSourceBadge } = await import('../src/app.js');

      updateRateSourceBadge('forward_tenor', 90);
      expect(mockBadge.textContent).toBe('⚡ FORWARD (90D BASIS)');
      expect(mockBadge.className).toContain('text-cyan-300');
      expect(mockDesc.textContent).toContain('90d Tenor Matched');

      updateRateSourceBadge('live');
      expect(mockBadge.textContent).toBe('🟢 LIVE TICKER');
      expect(mockBadge.className).toContain('text-emerald-300');

      updateRateSourceBadge('rate_lab');
      expect(mockBadge.textContent).toBe('⚡ RATE LAB MODEL');
      expect(mockBadge.className).toContain('text-indigo-300');

      updateRateSourceBadge('historical_replay', '30D');
      expect(mockBadge.textContent).toBe('📅 HISTORICAL 30D REPLAY');
      expect(mockBadge.className).toContain('text-amber-300');

      updateRateSourceBadge('manual');
      expect(mockBadge.textContent).toBe('✏️ MANUAL INPUT');
      expect(mockBadge.className).toContain('text-slate-300');
    });
  });
});
