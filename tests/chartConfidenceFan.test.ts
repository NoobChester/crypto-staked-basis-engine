/**
 * @file chartConfidenceFan.test.ts
 * @description Unit tests for HTML5 Canvas 2D statistical carry confidence fan corridor
 * and interactive tooltip confidence telemetry.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  drawChart,
  calculateConfidenceEnvelope,
  setupChartInteractions,
  type ChartConfidenceStats,
  type TooltipElements
} from '../src/ui/chart.js';
import { calculateOutcome, type HedgingState } from '../src/math/hedging.js';

describe('Chart Confidence Fan & Corridor Rendering Engine', () => {
  const baseState: HedgingState = {
    mode: 'unified',
    capital: 10000,
    priceMove: 0,
    days: 90,
    fundingAPR: 10.0,
    stakingAPY: 3.2,
    depegPct: 0.0,
    mmr: 0.005,
    roundtripFeePct: 0.10,
    tbillRate: 4.35,
    collateralRatio: 0.90,
    splitSpot: 50
  };

  function createMockCanvas(width = 800, height = 400) {
    const contextMock: any = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
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

    const listeners: Record<string, Function[]> = {};

    const canvasMock: any = {
      width,
      height,
      getContext: vi.fn().mockReturnValue(contextMock),
      getBoundingClientRect: vi.fn().mockReturnValue({
        left: 0,
        top: 0,
        width,
        height,
        right: width,
        bottom: height
      }),
      addEventListener: vi.fn((event: string, cb: Function) => {
        listeners[event] = listeners[event] || [];
        listeners[event].push(cb);
      }),
      removeEventListener: vi.fn((event: string, cb: Function) => {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter(fn => fn !== cb);
        }
      }),
      _dispatch: (event: string, payload: any) => {
        (listeners[event] || []).forEach(fn => fn(payload));
      }
    };

    return { canvasMock, contextMock };
  }

  describe('Mathematical Envelope Bracketing', () => {
    it('properly brackets base curve (y_lower <= y_base <= y_upper) across full price spectrum in Unified mode', () => {
      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 4.5,
        sigmaStaking: 1.2,
        showConfidenceFan: true
      };

      const envelope = calculateConfidenceEnvelope(baseState, confidenceStats, -100, 100, 100);

      expect(envelope.pnlPoints.length).toBe(101);
      expect(envelope.upperPoints.length).toBe(101);
      expect(envelope.lowerPoints.length).toBe(101);

      for (let i = 0; i < envelope.pnlPoints.length; i++) {
        const yBase = envelope.pnlPoints[i].y;
        const yUpper = envelope.upperPoints[i].y;
        const yLower = envelope.lowerPoints[i].y;

        expect(yLower).toBeLessThanOrEqual(yBase);
        expect(yBase).toBeLessThanOrEqual(yUpper);
        expect(yLower).toBeLessThan(yUpper);
      }
    });

    it('properly brackets base curve in Isolated Margin Mode', () => {
      const isolatedState: HedgingState = {
        ...baseState,
        mode: 'isolated',
        splitSpot: 60
      };

      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 3.8,
        sigmaStaking: 0.8,
        showConfidenceFan: true
      };

      const envelope = calculateConfidenceEnvelope(isolatedState, confidenceStats, -100, 100, 50);

      expect(envelope.upperPoints.length).toBe(51);
      expect(envelope.lowerPoints.length).toBe(51);

      for (let i = 0; i < envelope.pnlPoints.length; i++) {
        const yBase = envelope.pnlPoints[i].y;
        const yUpper = envelope.upperPoints[i].y;
        const yLower = envelope.lowerPoints[i].y;

        expect(yLower).toBeLessThanOrEqual(yBase);
        expect(yBase).toBeLessThanOrEqual(yUpper);
      }
    });

    it('handles undefined sigmaStaking by defaulting to zero deviation', () => {
      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 5.0,
        sigmaStaking: undefined,
        showConfidenceFan: true
      };

      const envelope = calculateConfidenceEnvelope(baseState, confidenceStats, -100, 100, 20);

      expect(envelope.upperPoints.length).toBe(21);
      expect(envelope.lowerPoints.length).toBe(21);

      for (let i = 0; i < envelope.pnlPoints.length; i++) {
        expect(envelope.lowerPoints[i].y).toBeLessThan(envelope.upperPoints[i].y);
      }
    });

    it('floors stressed staking APY at 0.1% when 2*sigmaStaking exceeds base APY', () => {
      const lowStakingState: HedgingState = {
        ...baseState,
        stakingAPY: 1.0
      };

      // 2 * 1.5 = 3.0%, so 1.0 - 3.0 = -2.0%, which must be floored to 0.1%
      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 2.0,
        sigmaStaking: 1.5,
        showConfidenceFan: true
      };

      const envelope = calculateConfidenceEnvelope(lowStakingState, confidenceStats, 0, 0, 1);
      expect(envelope.lowerPoints.length).toBe(2);

      // Verify at pMove = 0
      const directStressed = calculateOutcome(0, {
        ...lowStakingState,
        fundingAPR: lowStakingState.fundingAPR - 2 * 2.0,
        stakingAPY: 0.1
      });

      expect(envelope.lowerPoints[0].y).toBeCloseTo(directStressed.totalPortfolioVal, 4);
    });

    it('returns empty upper and lower points when showConfidenceFan is false or stats omitted', () => {
      const disabledStats: ChartConfidenceStats = {
        sigmaFunding: 4.0,
        showConfidenceFan: false
      };

      const envDisabled = calculateConfidenceEnvelope(baseState, disabledStats);
      expect(envDisabled.upperPoints).toEqual([]);
      expect(envDisabled.lowerPoints).toEqual([]);

      const envOmitted = calculateConfidenceEnvelope(baseState, undefined);
      expect(envOmitted.upperPoints).toEqual([]);
      expect(envOmitted.lowerPoints).toEqual([]);

      const envNoFunding = calculateConfidenceEnvelope(baseState, { sigmaFunding: undefined });
      expect(envNoFunding.upperPoints).toEqual([]);
      expect(envNoFunding.lowerPoints).toEqual([]);
    });
  });

  describe('drawChart Canvas 2D Execution', () => {
    it('runs cleanly without errors when confidenceStats is provided', () => {
      const { canvasMock, contextMock } = createMockCanvas();
      const currentRes = calculateOutcome(0, baseState);
      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 4.5,
        sigmaStaking: 1.2,
        showConfidenceFan: true
      };

      expect(() => {
        drawChart(canvasMock, baseState, currentRes, confidenceStats);
      }).not.toThrow();

      // Verify canvas operations executed
      expect(contextMock.fillRect).toHaveBeenCalled();
      expect(contextMock.stroke).toHaveBeenCalled();
      expect(contextMock.fill).toHaveBeenCalled();

      // Upper & lower boundaries dashed line with [3, 3]
      expect(contextMock.setLineDash).toHaveBeenCalledWith([3, 3]);

      // Subtle annotations drawn
      const textCalls = contextMock.fillText.mock.calls.map((c: any[]) => c[0]);
      expect(textCalls).toContain('+2σ Bull');
      expect(textCalls).toContain('-2σ Stress');
    });

    it('runs cleanly when confidenceStats is omitted (backwards compatibility)', () => {
      const { canvasMock, contextMock } = createMockCanvas();
      const currentRes = calculateOutcome(0, baseState);

      expect(() => {
        drawChart(canvasMock, baseState, currentRes);
      }).not.toThrow();

      expect(contextMock.fillRect).toHaveBeenCalled();

      // Annotations should NOT be rendered when confidenceStats is omitted
      const textCalls = contextMock.fillText.mock.calls.map((c: any[]) => c[0]);
      expect(textCalls).not.toContain('+2σ Bull');
      expect(textCalls).not.toContain('-2σ Stress');
    });

    it('suppresses confidence fan when showConfidenceFan is false', () => {
      const { canvasMock, contextMock } = createMockCanvas();
      const currentRes = calculateOutcome(0, baseState);
      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 4.5,
        sigmaStaking: 1.2,
        showConfidenceFan: false
      };

      drawChart(canvasMock, baseState, currentRes, confidenceStats);

      const textCalls = contextMock.fillText.mock.calls.map((c: any[]) => c[0]);
      expect(textCalls).not.toContain('+2σ Bull');
      expect(textCalls).not.toContain('-2σ Stress');
    });

    it('handles null canvas gracefully without crashing', () => {
      const currentRes = calculateOutcome(0, baseState);
      expect(() => drawChart(null, baseState, currentRes)).not.toThrow();
    });

    it('handles canvas without 2d context gracefully', () => {
      const canvasMock: any = {
        getContext: vi.fn().mockReturnValue(null)
      };
      const currentRes = calculateOutcome(0, baseState);
      expect(() => drawChart(canvasMock, baseState, currentRes)).not.toThrow();
    });
  });

  describe('Interactive Chart Interactions & Tooltip CI', () => {
    it('displays 95% CI in tooltip on hover when confidenceStats are provided', () => {
      const { canvasMock } = createMockCanvas();

      const tooltipMock: any = {
        classList: {
          add: vi.fn(),
          remove: vi.fn()
        },
        style: {},
        querySelector: vi.fn().mockReturnValue(null)
      };

      const ttCiMock = {
        textContent: '',
        classList: {
          add: vi.fn(),
          remove: vi.fn()
        }
      };

      const tooltipEls: TooltipElements = {
        tooltip: tooltipMock,
        ttPrice: { textContent: '' } as any,
        ttVal: { textContent: '' } as any,
        ttRoi: { textContent: '' } as any,
        ttStatus: { textContent: '', className: '' } as any,
        ttCi: ttCiMock as any
      };

      const confidenceStats: ChartConfidenceStats = {
        sigmaFunding: 5.0,
        sigmaStaking: 1.0,
        showConfidenceFan: true
      };

      const cleanup = setupChartInteractions(
        canvasMock,
        tooltipEls,
        () => baseState,
        confidenceStats
      );

      // Simulate mouse move over center of plot area (e.g. mouseX = 200, mouseY = 100)
      canvasMock._dispatch('mousemove', { clientX: 200, clientY: 100 });

      expect(tooltipMock.classList.remove).toHaveBeenCalledWith('hidden');
      expect(ttCiMock.textContent).toContain('95% CI:');
      expect(ttCiMock.classList.remove).toHaveBeenCalledWith('hidden');

      // Verify lower and upper bounds are both in the formatted text
      expect(ttCiMock.textContent).toMatch(/95% CI: \$[0-9,.]+ – \$[0-9,.]+/);

      // Simulate mouse leave
      canvasMock._dispatch('mouseleave', {});
      expect(tooltipMock.classList.add).toHaveBeenCalledWith('hidden');

      if (typeof cleanup === 'function') {
        cleanup();
      }
    });

    it('supports getter function getConfidenceStats in setupChartInteractions', () => {
      const { canvasMock } = createMockCanvas();

      const tooltipMock: any = {
        classList: { add: vi.fn(), remove: vi.fn() },
        style: {},
        querySelector: vi.fn().mockReturnValue(null)
      };

      const ttCiMock = {
        textContent: '',
        classList: { add: vi.fn(), remove: vi.fn() }
      };

      const tooltipEls: TooltipElements = {
        tooltip: tooltipMock,
        ttPrice: { textContent: '' } as any,
        ttVal: { textContent: '' } as any,
        ttRoi: { textContent: '' } as any,
        ttStatus: { textContent: '', className: '' } as any,
        ttCi: ttCiMock as any
      };

      let activeStats: ChartConfidenceStats | undefined = {
        sigmaFunding: 3.5,
        sigmaStaking: 0.5,
        showConfidenceFan: true
      };

      setupChartInteractions(
        canvasMock,
        tooltipEls,
        () => baseState,
        () => activeStats
      );

      // Hover
      canvasMock._dispatch('mousemove', { clientX: 300, clientY: 150 });
      expect(ttCiMock.textContent).toContain('95% CI:');

      // Now toggle confidence off dynamically
      activeStats = { ...activeStats, showConfidenceFan: false };
      canvasMock._dispatch('mousemove', { clientX: 300, clientY: 150 });
      expect(ttCiMock.textContent).toBe('');
      expect(ttCiMock.classList.add).toHaveBeenCalledWith('hidden');
    });

    it('cleans up event listeners when cleanup function is invoked', () => {
      const { canvasMock } = createMockCanvas();

      const tooltipEls: TooltipElements = {
        tooltip: { classList: { add: vi.fn(), remove: vi.fn() }, style: {} } as any,
        ttPrice: null,
        ttVal: null,
        ttRoi: null,
        ttStatus: null
      };

      const cleanup = setupChartInteractions(canvasMock, tooltipEls, () => baseState);
      expect(typeof cleanup).toBe('function');

      if (typeof cleanup === 'function') {
        cleanup();
        expect(canvasMock.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(canvasMock.removeEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      }
    });
  });
});
