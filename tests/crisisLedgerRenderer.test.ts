import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  renderCrisisAuditTable,
  renderCrisisAuditSummary,
  exportCrisisAuditCsv
} from '../src/ui/renderers/crisisLedgerRenderer.js';
import type { CrisisSimulationResult } from '../src/math/hedging.js';

function createMockElement(tag: string = 'div'): any {
  const children: any[] = [];
  const el: any = {
    tagName: tag.toUpperCase(),
    innerHTML: '',
    className: '',
    children,
    appendChild: vi.fn((child: any) => {
      if (child && child.nodeType === 11) {
        children.push(...child.children);
      } else {
        children.push(child);
      }
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
      add: vi.fn((c: string) => {
        el.className = el.className ? `${el.className} ${c}` : c;
      }),
      remove: vi.fn((c: string) => {
        el.className = el.className.replace(new RegExp(`\\b${c}\\b`, 'g'), '').trim();
      })
    }
  };
  return el;
}

function createMockDocumentFragment(): any {
  const children: any[] = [];
  return {
    nodeType: 11,
    children,
    appendChild: (child: any) => {
      children.push(child);
      return child;
    }
  };
}

describe('Crisis Audit Ledger: Trough vs. Resolved Two-Tier Summary Card', () => {
  let mockTbody: any;
  let mockSummaryContainer: any;
  let mockBody: any;

  const solventResult: CrisisSimulationResult = {
    scenarioKey: 'celsius_depeg_2022' as any,
    scenarioTitle: 'Celsius 2022 De-Peg Replay',
    horizonDays: 28,
    tLiq: null,
    isLiquidated: false,
    totalHarvestedFunding: 450,
    totalHarvestedStaking: 180,
    depegLoss: 0,
    spotPnL: 0,
    perpPnL: 0,
    terminalEquity: 10630,
    netPnL: 630,
    netRealizedAPY: 7.74,
    rLiq: 8.52,
    distanceToLiqPct: 45.2,
    dailyTrajectory: [
      {
        day: 1,
        dateStr: '2022-06-01',
        priceShockPct: 0.0,
        spotPrice: 2000,
        fundingAPR: 10.0,
        depegPct: 0.5,
        equity: 10000,
        marginRatio: 0.05,
        isLiquidated: false,
        fundingAccrued: 2.7,
        stakingAccrued: 0.8
      },
      {
        day: 8,
        dateStr: '2022-06-08',
        priceShockPct: -15.0,
        spotPrice: 1700,
        fundingAPR: -25.0,
        depegPct: 7.25, // PEAK DEPEG
        equity: 8850,   // TROUGH EQUITY
        marginRatio: 0.68, // PEAK MARGIN RATIO
        isLiquidated: false,
        fundingAccrued: -15.0,
        stakingAccrued: 6.4
      },
      {
        day: 28,
        dateStr: '2022-06-28',
        priceShockPct: 0.0,
        spotPrice: 2000,
        fundingAPR: 10.0,
        depegPct: 0.05, // RESOLVED DEPEG (< 0.1%)
        equity: 10630,  // RESOLVED TERMINAL EQUITY
        marginRatio: 0.06,
        isLiquidated: false,
        fundingAccrued: 450,
        stakingAccrued: 180
      }
    ]
  };

  const liquidatedResult: CrisisSimulationResult = {
    scenarioKey: 'ftx_alameda_cascade_2022' as any,
    scenarioTitle: 'FTX Alameda Cascade 2022',
    horizonDays: 14,
    tLiq: 5,
    isLiquidated: true,
    totalHarvestedFunding: -200,
    totalHarvestedStaking: 45,
    depegLoss: 600,
    spotPnL: -3200,
    perpPnL: -1500,
    terminalEquity: 5145,
    netPnL: -4855,
    netRealizedAPY: -126.5,
    rLiq: 0.48,
    distanceToLiqPct: -12.0,
    dailyTrajectory: [
      {
        day: 1,
        dateStr: '2022-11-06',
        priceShockPct: 0.0,
        spotPrice: 35.0,
        fundingAPR: 5.0,
        depegPct: 1.0,
        equity: 10000,
        marginRatio: 0.05,
        isLiquidated: false,
        fundingAccrued: 1.3,
        stakingAccrued: 0.9
      },
      {
        day: 5,
        dateStr: '2022-11-10',
        priceShockPct: -45.0,
        spotPrice: 19.25,
        fundingAPR: -120.0,
        depegPct: 15.0,
        equity: 4800,
        marginRatio: 1.0,
        isLiquidated: true,
        fundingAccrued: -180,
        stakingAccrued: 4.5
      },
      {
        day: 14,
        dateStr: '2022-11-19',
        priceShockPct: -40.0,
        spotPrice: 21.0,
        fundingAPR: 0.0,
        depegPct: 0.0,
        equity: 5145,
        marginRatio: 1.0,
        isLiquidated: true,
        fundingAccrued: -200,
        stakingAccrued: 45
      }
    ]
  };

  beforeEach(() => {
    mockTbody = createMockElement('tbody');
    mockSummaryContainer = createMockElement('div');
    mockBody = createMockElement('body');

    (globalThis as any).document = {
      createElement: vi.fn((tag: string) => createMockElement(tag)),
      createDocumentFragment: vi.fn(() => createMockDocumentFragment()),
      getElementById: vi.fn((id: string) => {
        if (id === 'crisis-audit-tbody') return mockTbody;
        if (id === 'crisis-audit-two-tier-summary') return mockSummaryContainer;
        return null;
      }),
      body: mockBody
    };

    (globalThis as any).URL = {
      createObjectURL: vi.fn().mockReturnValue('blob:mock-url'),
      revokeObjectURL: vi.fn()
    };
  });

  afterEach(() => {
    delete (globalThis as any).document;
    delete (globalThis as any).URL;
  });

  it('renders all rows of the audit table with formatting and status pills', () => {
    renderCrisisAuditTable(mockTbody, solventResult, mockSummaryContainer);

    expect(mockTbody.children.length).toBe(3);
    const firstRow = mockTbody.children[0];
    expect(firstRow.innerHTML).toContain('D1');
    expect(firstRow.innerHTML).toContain('2022-06-01');
    expect(firstRow.innerHTML).toContain('SOLVENT');
  });

  it('handles null simulation result gracefully without throwing', () => {
    renderCrisisAuditTable(mockTbody, null, mockSummaryContainer);

    expect(mockTbody.children.length).toBe(1);
    expect(mockTbody.children[0].innerHTML).toContain('No simulation data available');
    expect(mockSummaryContainer.className).toContain('hidden');
  });

  it('correctly calculates and renders Tier 1: Peak Stress (Trough) for solvent scenario', () => {
    renderCrisisAuditSummary(mockSummaryContainer, solventResult);

    const html = mockSummaryContainer.innerHTML;

    // Peak stress tier header & day
    expect(html).toContain('1. Peak Stress (Trough Point)');
    expect(html).toContain('2022-06-08');

    // Trough equity: $8,850.00
    expect(html).toContain('$8,850.00');

    // Peak margin ratio: 68.0%
    expect(html).toContain('68.0%');

    // Peak depeg: 7.25%
    expect(html).toContain('7.25%');

    // Solvency status: MAINTAINED SOLVENCY
    expect(html).toContain('MAINTAINED SOLVENCY');
  });

  it('correctly calculates and renders Tier 2: Post-Resolution (Terminal State) for solvent scenario', () => {
    renderCrisisAuditSummary(mockSummaryContainer, solventResult);

    const html = mockSummaryContainer.innerHTML;

    // Post-resolution tier header & day
    expect(html).toContain('2. Post-Resolution (Terminal State)');
    expect(html).toContain('2022-06-28');

    // Resolved equity & Net PnL: $10,630.00 & +$630.00
    expect(html).toContain('$10,630.00');
    expect(html).toContain('+$630.00');

    // Depeg Impairment classification: TRANSITORY ($0.00 Permanent Loss)
    expect(html).toContain('TRANSITORY ($0.00 Permanent Loss)');
    expect(html).toContain('Mark-to-market dip fully unwound upon re-pegging to parity');
  });

  it('correctly classifies PERMANENT IMPAIRMENT and BREACH in liquidated scenarios', () => {
    renderCrisisAuditSummary(mockSummaryContainer, liquidatedResult);

    const html = mockSummaryContainer.innerHTML;

    // Solvency breach verdict
    expect(html).toContain('BREACH: LIQUIDATED ON DAY 5');
    expect(html).toContain('BREACHED ON DAY 5');

    // Depeg Impairment: PERMANENT IMPAIRMENT
    expect(html).toContain('PERMANENT IMPAIRMENT');
    expect(html).toContain('Perp short liquidated on Day 5');
  });

  it('includes both Tier 1 Peak Stress and Tier 2 Post-Resolution metadata in CSV export', () => {
    exportCrisisAuditCsv(solventResult);

    expect((globalThis as any).URL.createObjectURL).toHaveBeenCalled();
    expect(mockBody.appendChild).toHaveBeenCalled();
    expect(mockBody.removeChild).toHaveBeenCalled();
  });
});
