import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateOutcome, calculateDynamicBorrowAPR, type HedgingState } from '../src/math/hedging.js';
import { renderUI } from '../src/ui/renderers/kpiRenderer.js';
import { exportBacktestCsv } from '../src/ui/renderers/backtestLedgerRenderer.js';
import type { BacktestSummaryResult } from '../src/math/backtest.js';
import type { UIElements } from '../src/ui/dom.js';

function createMockElement(tag: string = 'div'): any {
  const children: any[] = [];
  const el: any = {
    tagName: tag.toUpperCase(),
    textContent: '',
    innerHTML: '',
    className: '',
    value: '',
    title: '',
    children,
    appendChild: vi.fn((child: any) => {
      children.push(child);
      return child;
    }),
    removeChild: vi.fn((child: any) => {
      const idx = children.indexOf(child);
      if (idx !== -1) children.splice(idx, 1);
      return child;
    }),
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
    click: vi.fn(),
    classList: {
      add: vi.fn((cls: string) => {
        el.className = el.className ? `${el.className} ${cls}` : cls;
      }),
      remove: vi.fn((cls: string) => {
        el.className = el.className.replace(new RegExp(`\\b${cls}\\b`, 'g'), '').trim();
      }),
      contains: vi.fn((cls: string) => el.className.includes(cls))
    }
  };
  return el;
}

describe('Leveraged Basis Trade (Carry Spread) UI & Systems Suite', () => {
  let mockUI: Partial<UIElements>;
  let mockBody: any;
  let originalDocument: any;
  let originalURL: any;

  beforeEach(() => {
    originalDocument = (globalThis as any).document;
    originalURL = (globalThis as any).URL;

    mockBody = createMockElement('body');
    (globalThis as any).document = {
      createElement: vi.fn((tag: string) => createMockElement(tag)),
      body: mockBody,
      activeElement: null
    };

    (globalThis as any).URL = {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn()
    };

    mockUI = {
      valLeverage: createMockElement(),
      inputLeverage: createMockElement() as HTMLInputElement,
      valLeveragedNotional: createMockElement(),
      valBorrowDebt: createMockElement(),
      valBorrowDragAnnual: createMockElement(),
      badgeBorrowMode: createMockElement(),
      btnToggleBorrowAuto: createMockElement(),
      sliderBorrowApr: createMockElement() as HTMLInputElement,
      inputBorrowApr: createMockElement() as HTMLInputElement,
      borrowRateExplainer: createMockElement(),
      boxBreakdownBorrow: createMockElement(),
      breakdownBorrowRate: createMockElement(),
      breakdownBorrowInterest: createMockElement(),
      breakdownBorrowDebt: createMockElement(),
      panelUnifiedLeverage: createMockElement(),
      stateBadge: createMockElement(),
      instSpotAmount: createMockElement(),
      instPerpAmount: createMockElement(),
      btnLev10: createMockElement(),
      btnLev15: createMockElement(),
      btnLev20: createMockElement(),
      btnLev30: createMockElement()
    };
  });

  afterEach(() => {
    (globalThis as any).document = originalDocument;
    (globalThis as any).URL = originalURL;
  });

  it('correctly displays unlevered 1.0x metrics and hides borrow breakdown box', () => {
    const state: HedgingState = {
      mode: 'unified',
      capital: 10000,
      priceMove: 0,
      days: 90,
      fundingAPR: 10.0,
      stakingAPY: 3.2,
      depegPct: 0.0,
      collateralRatio: 0.90,
      splitSpot: 50,
      leverage: 1.0,
      isCustomBorrowAPR: false,
      mmr: 0.005,
      roundtripFeePct: 0.10,
      tbillRate: 4.35
    };

    const res = calculateOutcome(0, state);
    renderUI(mockUI as UIElements, state, res);

    expect(mockUI.valLeverage?.textContent).toBe('1.0x (Unlevered)');
    expect(mockUI.valBorrowDebt?.textContent).toBe('$0.00');
    expect(mockUI.valBorrowDragAnnual?.textContent).toBe('-0.00% APY');
    expect(mockUI.boxBreakdownBorrow?.classList.add).toHaveBeenCalledWith('hidden');
    expect(mockUI.badgeBorrowMode?.textContent).toBe('AUTO-KINK');
  });

  it('correctly renders 2.0x leveraged basis trade with USD debt and active borrow interest', () => {
    const state: HedgingState = {
      mode: 'unified',
      capital: 10000,
      priceMove: 0,
      days: 90,
      fundingAPR: 10.0,
      stakingAPY: 3.2,
      depegPct: 0.0,
      collateralRatio: 0.90,
      splitSpot: 50,
      leverage: 2.0,
      isCustomBorrowAPR: false,
      mmr: 0.005,
      roundtripFeePct: 0.10,
      tbillRate: 4.35
    };

    const res = calculateOutcome(0, state);
    renderUI(mockUI as UIElements, state, res);

    expect(mockUI.valLeverage?.textContent).toBe('2.0x Leveraged');
    expect(mockUI.valLeveragedNotional?.textContent).toBe('$20,000.00');
    expect(mockUI.valBorrowDebt?.textContent).toBe('$10,000.00');
    expect(res.borrowAPR).toBe(6.5);
    expect(res.borrowAPYDrag).toBeCloseTo(6.5, 1);
    expect(mockUI.boxBreakdownBorrow?.classList.remove).toHaveBeenCalledWith('hidden');
    expect(mockUI.breakdownBorrowRate?.textContent).toBe('6.5% APR');
    expect(mockUI.breakdownBorrowDebt?.textContent).toContain('Debt: $10,000.00 (2.0x)');
    expect(mockUI.stateBadge?.textContent).toBe('LEVERAGED BASIS (2.0x)');
  });

  it('activates manual override when isCustomBorrowAPR is set', () => {
    const state: HedgingState = {
      mode: 'unified',
      capital: 10000,
      priceMove: 0,
      days: 90,
      fundingAPR: 10.0,
      stakingAPY: 3.2,
      depegPct: 0.0,
      collateralRatio: 0.90,
      splitSpot: 50,
      leverage: 2.5,
      borrowAPR: 12.0,
      isCustomBorrowAPR: true,
      mmr: 0.005,
      roundtripFeePct: 0.10,
      tbillRate: 4.35
    };

    const res = calculateOutcome(0, state);
    renderUI(mockUI as UIElements, state, res);

    expect(mockUI.badgeBorrowMode?.textContent).toBe('MANUAL OVERRIDE');
    expect(mockUI.borrowRateExplainer?.textContent).toContain('Manual Override: Fixed USD borrow rate locked at 12.0% APR');
    expect(res.borrowAPR).toBe(12.0);
  });

  it('correctly calculates dynamic borrow APR under market mania', () => {
    const baseRate = calculateDynamicBorrowAPR(10.0, 0);
    expect(baseRate).toBe(6.5);

    const maniaRate = calculateDynamicBorrowAPR(40.0, 60.0);
    // fundingAPR > 25: 11.0 + 0.65 * (40 - 25) = 20.75%
    // priceMovePct > 30: 0.1 * (60 - 30) = 3.0%
    // Total = 23.75%
    expect(maniaRate).toBe(23.75);
  });

  it('exports RFC-4180 CSV containing active leverage metadata and borrow rate columns', () => {
    let capturedBlobContent = '';
    const originalBlob = globalThis.Blob;
    (globalThis as any).Blob = class MockBlob {
      content: string[];
      constructor(parts: any[]) {
        this.content = parts;
        capturedBlobContent = parts.join('');
      }
    };

    const mockSummary: BacktestSummaryResult = {
      startDate: '2021-01-01',
      endDate: '2021-01-03',
      horizonDays: 3,
      initialCapital: 10000,
      terminalStrategyEquity: 10150,
      netPnL: 150,
      cumulativeReturnPct: 1.5,
      cagrPct: 18.25,
      maxDrawdownPct: 0.2,
      maxDrawdownTroughDate: '2021-01-02',
      sharpeRatio: 3.4,
      sortinoRatio: 4.8,
      isLiquidated: false,
      liquidationDate: null,
      liquidationPrice: null,
      tLiq: null,
      leverage: 2.0,
      totalBorrowInterestPaid: 10.68,
      spotBenchmarkReturnPct: 5.2,
      tbillBenchmarkReturnPct: 0.04,
      sp500BenchmarkReturnPct: 0.5,
      totalHarvestedFunding: 120,
      totalHarvestedStaking: 40.68,
      totalResetsCount: 0,
      totalResetFeesPaid: 0,
      savedFromLiquidation: false,
      autoResetEnabled: false,
      autoResetThreshold: 0.80,
      executionMode: 'optimized',
      dailyTrajectory: [
        {
          day: 1,
          date: '2021-01-01',
          timestamp: 1609459200000,
          spotPrice: 730,
          priceReturnPct: 0,
          fundingAPR: 35.0,
          stakingAPY: 8.0,
          depegPct: 0,
          strategyEquity: 10000,
          spotBenchmarkEquity: 10000,
          tbillBenchmarkEquity: 10000,
          sp500BenchmarkEquity: 10000,
          marginRatio: 0.90,
          isLiquidated: false,
          cumulativeFunding: 0,
          cumulativeStaking: 0,
          borrowDebt: 10000,
          borrowRateAPR: 18.5,
          cumulativeBorrowInterest: 5.07
        }
      ]
    };

    exportBacktestCsv(mockSummary);

    expect(capturedBlobContent).toContain('# Active Leverage: 2.0x | Total Borrow Interest Paid: $10.68');
    expect(capturedBlobContent).toContain('Borrow_APR_Pct');
    expect(capturedBlobContent).toContain('Cumulative_Borrow_Interest_USD');
    expect(capturedBlobContent).toContain('18.50');
    expect(capturedBlobContent).toContain('5.07');

    (globalThis as any).Blob = originalBlob;
  });
});
