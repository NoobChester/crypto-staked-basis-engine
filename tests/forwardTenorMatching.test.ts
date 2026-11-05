import type { OUProcessParams } from '../src/types/rateLab.js';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  interpolateBasisRate,
  FALLBACK_FUTURES_CURVES
} from '../src/services/marketData/futuresCurve.js';

describe('Dynamic Forward Tenor Matching & Horizon Unification', () => {
  it('derives distinct forward basis rates matching requested holding tenors', () => {
    const tenors = FALLBACK_FUTURES_CURVES.ETH;

    const basis30d = interpolateBasisRate(tenors, 30);
    const basis90d = interpolateBasisRate(tenors, 90);
    const basis180d = interpolateBasisRate(tenors, 180);

    expect(basis30d).toBeGreaterThan(0);
    expect(basis90d).toBeGreaterThan(0);
    expect(basis180d).toBeGreaterThan(0);
    expect(basis30d).not.toEqual(basis90d);
  });

  describe('Rate Source Badge Formatter & Forward Engine Toggles', () => {
    let mockElements: Record<string, any>;

    function createMockContext() {
      return {
        clearRect: vi.fn(),
        fillRect: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        bezierCurveTo: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        closePath: vi.fn(),
        fillText: vi.fn(),
        measureText: vi.fn().mockReturnValue({ width: 60 }),
        save: vi.fn(),
        restore: vi.fn(),
        scale: vi.fn(),
        resetTransform: vi.fn(),
        setLineDash: vi.fn(),
        arc: vi.fn(),
        roundRect: vi.fn(),
        rect: vi.fn(),
        createLinearGradient: vi.fn().mockReturnValue({
          addColorStop: vi.fn()
        })
      };
    }

    function getOrCreateMock(id: string) {
      if (!mockElements[id]) {
        mockElements[id] = {
          id,
          textContent: '',
          className: '',
          value: '',
          title: '',
          width: 800,
          height: 400,
          dataset: {},
          style: {},
          parentElement: {
            clientWidth: 800,
            clientHeight: 400
          },
          classList: {
            add: vi.fn(),
            remove: vi.fn(),
            toggle: vi.fn(),
            contains: vi.fn(() => false)
          },
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          setAttribute: vi.fn(),
          getAttribute: vi.fn(),
          querySelectorAll: vi.fn(() => []),
          querySelector: vi.fn(() => null),
          getContext: vi.fn().mockReturnValue(createMockContext()),
          getBoundingClientRect: vi.fn().mockReturnValue({
            left: 0,
            top: 0,
            width: 800,
            height: 400
          })
        };
      }
      return mockElements[id];
    }

    beforeEach(() => {
      mockElements = {};
      (global as any).ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
      (global as any).window = {
        innerWidth: 1200,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      };
      (global as any).document = {
        readyState: 'complete',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        getElementById: (id: string) => getOrCreateMock(id),
        querySelectorAll: () => []
      };
    });

    afterEach(() => {
      delete (global as any).ResizeObserver;
      delete (global as any).window;
      delete (global as any).document;
    });

    it('formats rate source badge correctly across all forward and historical sources', async () => {
      const { updateRateSourceBadge } = await import('../src/app.js');

      updateRateSourceBadge('sqmc', 90);
      const badge = getOrCreateMock('badge-rate-source');
      const desc = getOrCreateMock('desc-funding-source');
      expect(badge.textContent).toBe('⚡ SQMC MODEL (90D)');
      expect(badge.className).toContain('text-cyan-300');
      expect(desc.textContent).toContain('Forward Stochastic Drift via SQMC');

      updateRateSourceBadge('dated_basis', 90);
      expect(badge.textContent).toBe('📈 DATED BASIS (90D)');
      expect(badge.className).toContain('text-blue-300');
      expect(desc.textContent).toContain('Deliverable Futures Basis');

      updateRateSourceBadge('live');
      expect(badge.textContent).toBe('🟢 LIVE TICKER');
      expect(badge.className).toContain('text-emerald-300');

      updateRateSourceBadge('rate_lab');
      expect(badge.textContent).toBe('⚡ RATE LAB MODEL');
      expect(badge.className).toContain('text-indigo-300');

      updateRateSourceBadge('historical_replay', '30D');
      expect(badge.textContent).toBe('📅 HISTORICAL 30D REPLAY');
      expect(badge.className).toContain('text-amber-300');

      updateRateSourceBadge('manual');
      expect(badge.textContent).toBe('✏️ MANUAL INPUT');
      expect(badge.className).toContain('text-slate-300');
    });

    it('unifies 180-day investment horizon defaulting to SQMC model with companion benchmark chip', async () => {
      const { evaluateForwardHorizon, state, setForwardEngine } = await import('../src/app.js');

      await setForwardEngine('sqmc');
      const result = await evaluateForwardHorizon(180);

      // In SQMC mode: primary rate is SQMC drift (~8.58% expected carry), benchmark is dated basis
      expect(result.primaryRate).toBeGreaterThan(0);
      expect(result.benchmarkLabel).toContain('vs');
      expect(result.benchmarkLabel).toContain('Dated Basis');
      expect(state.fundingAPR).toBe(result.primaryRate);

      const badge = getOrCreateMock('badge-rate-source');
      expect(badge.textContent).toBe('⚡ SQMC MODEL (180D)');

      const chip = getOrCreateMock('chip-forward-benchmark');
      expect(chip.textContent).toContain('Dated Basis');
    });

    it('switches to dated deliverable futures basis mode and updates companion chip to SQMC benchmark', async () => {
      const { evaluateForwardHorizon, state, setForwardEngine } = await import('../src/app.js');

      await setForwardEngine('dated_basis');
      const result = await evaluateForwardHorizon(180);

      expect(result.primaryRate).toBeGreaterThan(0);
      expect(result.benchmarkLabel).toContain('vs');
      expect(result.benchmarkLabel).toContain('SQMC Model');
      expect(state.fundingAPR).toBe(result.primaryRate);

      const badge = getOrCreateMock('badge-rate-source');
      expect(badge.textContent).toBe('📈 DATED BASIS (180D)');

      const chip = getOrCreateMock('chip-forward-benchmark');
      expect(chip.textContent).toContain('SQMC Model');
    });

    it('synchronizes custom OU parameters from Rate Lab to the terminal horizon evaluator', async () => {
      const { evaluateForwardHorizon, setActiveOUParams, setForwardEngine } = await import('../src/app.js');

      await setForwardEngine('sqmc');

      // Calibrate custom high-drift parameters in Rate Lab
      const customParams: OUProcessParams = {
        theta: 0.1,
        mu: 16.5,
        sigma: 8.0,
        halfLifeDays: Math.log(2) / 0.1,
        jumpIntensity: 2.0,
        jumpMean: 1.0,
        jumpStdDev: 4.0
      };

      setActiveOUParams(customParams);

      const result = await evaluateForwardHorizon(180);
      // With mu = 16.5, forward drift should evaluate much higher than baseline 8.58
      expect(result.primaryRate).toBeGreaterThan(12.0);
    });
  });
});
