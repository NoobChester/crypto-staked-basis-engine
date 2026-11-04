import { describe, it, expect, vi } from 'vitest';
import { drawCrisisTrajectory, bindTrajectoryTooltip } from '../src/ui/renderers/crisisTrajectoryRenderer.js';
import type { CrisisSimulationResult } from '../src/math/hedging.js';

describe('crisisTrajectoryRenderer', () => {
  const mockResult: CrisisSimulationResult = {
    scenarioKey: 'celsius_depeg_2022' as any,
    scenarioTitle: 'Celsius 2022 De-Peg Replay',
    horizonDays: 28,
    tLiq: 14,
    isLiquidated: true,
    totalHarvestedFunding: -250,
    totalHarvestedStaking: 120,
    depegLoss: 450,
    spotPnL: -3500,
    perpPnL: -900,
    terminalEquity: 5520,
    netPnL: -4480,
    netRealizedAPY: -58.4,
    rLiq: -0.28,
    distanceToLiqPct: -5.0,
    dailyTrajectory: [
      {
        day: 1,
        dateStr: '2022-06-01',
        priceShockPct: 0.0,
        spotPrice: 2000,
        fundingAPR: -2.1,
        depegPct: 1.5,
        equity: 9980,
        marginRatio: 0.05,
        isLiquidated: false,
        fundingAccrued: -2,
        stakingAccrued: 1
      },
      {
        day: 14,
        dateStr: '2022-06-14',
        priceShockPct: -33.0,
        spotPrice: 1340,
        fundingAPR: -14.6,
        depegPct: 5.35,
        equity: 5900,
        marginRatio: 1.0,
        isLiquidated: true,
        fundingAccrued: -120,
        stakingAccrued: 60
      },
      {
        day: 28,
        dateStr: '2022-06-28',
        priceShockPct: -40.0,
        spotPrice: 1200,
        fundingAPR: -7.2,
        depegPct: 4.5,
        equity: 5520,
        marginRatio: 1.0,
        isLiquidated: true,
        fundingAccrued: -250,
        stakingAccrued: 120
      }
    ]
  };

  function createMockCanvas() {
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
      setTransform: vi.fn(),
      resetTransform: vi.fn(),
      setLineDash: vi.fn(),
      arc: vi.fn(),
      bezierCurveTo: vi.fn(),
      quadraticCurveTo: vi.fn(),
      roundRect: vi.fn(),
      createLinearGradient: vi.fn().mockReturnValue({
        addColorStop: vi.fn()
      })
    };

    const listeners: Record<string, Function[]> = {};

    const canvasMock: any = {
      width: 400,
      height: 120,
      getContext: vi.fn().mockReturnValue(contextMock),
      getBoundingClientRect: vi.fn().mockReturnValue({
        left: 0,
        top: 0,
        width: 400,
        height: 120,
        right: 400,
        bottom: 120
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

  it('handles null canvas and null result gracefully', () => {
    expect(() => drawCrisisTrajectory(null, null)).not.toThrow();
    expect(() => drawCrisisTrajectory(null, mockResult)).not.toThrow();
    const { canvasMock } = createMockCanvas();
    expect(() => drawCrisisTrajectory(canvasMock, null)).not.toThrow();
  });

  it('draws background and trajectory path on valid result', () => {
    const { canvasMock, contextMock } = createMockCanvas();
    drawCrisisTrajectory(canvasMock, mockResult, { accentColor: 'rose', showLiquidationBeacon: true });

    // Background fill
    expect(contextMock.fillRect).toHaveBeenCalledWith(0, 0, 400, 120);

    // Grid lines and entry baseline drawn
    expect(contextMock.stroke).toHaveBeenCalled();
    expect(contextMock.fillText).toHaveBeenCalled();

    // Liquidation beacon drawn at Day 14
    expect(contextMock.arc).toHaveBeenCalled();
  });

  it('binds and cleans up trajectory tooltip listeners', () => {
    const { canvasMock } = createMockCanvas();
    const tooltipMock: any = {
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      },
      style: {},
      querySelector: vi.fn().mockReturnValue(null),
      innerHTML: ''
    };

    const cleanup = bindTrajectoryTooltip(canvasMock, tooltipMock, () => mockResult);
    expect(typeof cleanup).toBe('function');

    // Simulate mouse move over center
    canvasMock._dispatch('mousemove', { clientX: 200, clientY: 60 });
    expect(tooltipMock.classList.remove).toHaveBeenCalledWith('hidden');
    expect(tooltipMock.innerHTML).toContain('Day');
    expect(tooltipMock.innerHTML).toContain('Equity:');

    // Simulate mouse leave
    canvasMock._dispatch('mouseleave', {});
    expect(tooltipMock.classList.add).toHaveBeenCalledWith('hidden');

    // Run cleanup
    cleanup();
    expect(canvasMock.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(canvasMock.removeEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
  });
});
