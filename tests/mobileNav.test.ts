import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initMobileNav,
  setMobileTab,
  getMobileTab,
  updateMiniHud,
  isMobileView,
  applyLayoutVisibility
} from '../src/ui/mobileNav.js';

describe('Mobile Navigation & Mini-HUD Controller', () => {
  let mockElements: Record<string, any> = {};

  beforeEach(() => {
    mockElements = {
      'tab-panel-chart': createMockElement('tab-panel-chart'),
      'tab-panel-controls': createMockElement('tab-panel-controls'),
      'tab-panel-stress': createMockElement('tab-panel-stress'),
      'mobile-bottom-bar': createMockElement('mobile-bottom-bar'),
      'mobile-sticky-hud': createMockElement('mobile-sticky-hud'),
      'hud-val-apy': createMockElement('hud-val-apy'),
      'hud-val-buffer': createMockElement('hud-val-buffer'),
      'hud-val-pnl': createMockElement('hud-val-pnl')
    };

    // Setup global window and document mocks for node test runner
    (global as any).window = {
      innerWidth: 412,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };

    (global as any).document = {
      getElementById: (id: string) => mockElements[id] || null,
      querySelectorAll: (selector: string) => {
        if (selector.includes('data-action="set-mobile-tab"')) {
          return [
            createMockTabButton('chart'),
            createMockTabButton('controls'),
            createMockTabButton('stress')
          ];
        }
        return [];
      }
    };
  });

  afterEach(() => {
    delete (global as any).window;
    delete (global as any).document;
  });

  it('detects mobile view correctly based on window width', () => {
    (global as any).window.innerWidth = 412;
    expect(isMobileView()).toBe(true);

    (global as any).window.innerWidth = 1200;
    expect(isMobileView()).toBe(false);
  });

  it('switches tabs and adjusts container visibility on mobile view', () => {
    (global as any).window.innerWidth = 412;
    let switchedTab = '';
    initMobileNav((tab) => { switchedTab = tab; });

    setMobileTab('controls');
    expect(getMobileTab()).toBe('controls');
    expect(switchedTab).toBe('controls');

    expect(mockElements['tab-panel-controls'].classList.contains('hidden')).toBe(false);
    expect(mockElements['tab-panel-chart'].classList.contains('hidden')).toBe(true);
    expect(mockElements['tab-panel-stress'].classList.contains('hidden')).toBe(true);
    expect(mockElements['mobile-sticky-hud'].classList.contains('hidden')).toBe(false);
  });

  it('hides sticky mini-HUD when on Chart tab since full chart is visible', () => {
    (global as any).window.innerWidth = 412;
    setMobileTab('chart');

    expect(mockElements['tab-panel-chart'].classList.contains('hidden')).toBe(false);
    expect(mockElements['mobile-sticky-hud'].classList.contains('hidden')).toBe(true);
  });

  it('restores simultaneous visibility for all panels on desktop view (width >= 1024)', () => {
    (global as any).window.innerWidth = 1200;
    applyLayoutVisibility();

    expect(mockElements['tab-panel-chart'].classList.contains('hidden')).toBe(false);
    expect(mockElements['tab-panel-controls'].classList.contains('hidden')).toBe(false);
    expect(mockElements['tab-panel-stress'].classList.contains('hidden')).toBe(false);
    expect(mockElements['mobile-bottom-bar'].classList.contains('hidden')).toBe(true);
    expect(mockElements['mobile-sticky-hud'].classList.contains('hidden')).toBe(true);
  });

  it('updates mini-HUD with live metrics and handles liquidation states', () => {
    // Normal healthy state
    updateMiniHud({
      netRealizedApy: 14.5,
      rLiq: 8.52,
      distanceToLiqPct: 852.4,
      isLiquidated: false,
      netPnL: 1450,
      netDelta: 0.0
    });

    expect(mockElements['hud-val-apy'].textContent).toBe('+14.5% APY');
    expect(mockElements['hud-val-buffer'].textContent).toBe('Liq: +852.4%');
    expect(mockElements['hud-val-pnl'].textContent).toBe('+$1,450');

    // Liquidated breach state
    updateMiniHud({
      netRealizedApy: -45.0,
      rLiq: 0.25,
      distanceToLiqPct: -5.0,
      isLiquidated: true,
      netPnL: -4500,
      netDelta: 1.0
    });

    expect(mockElements['hud-val-buffer'].textContent).toBe('LIQUIDATED');
    expect(mockElements['hud-val-buffer'].className).toContain('text-rose-500');

    // Infinite buffer (Inverse 1:1)
    updateMiniHud({
      netRealizedApy: 12.0,
      rLiq: Infinity,
      distanceToLiqPct: Infinity,
      isLiquidated: false,
      netPnL: 1200,
      netDelta: 0.0
    });

    expect(mockElements['hud-val-buffer'].textContent).toBe('Liq: ∞');
  });
});

function createMockElement(id: string) {
  const classes = new Set<string>();
  return {
    id,
    textContent: '',
    className: '',
    classList: {
      add: (c: string) => classes.add(c),
      remove: (c: string) => classes.delete(c),
      contains: (c: string) => classes.has(c)
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    querySelector: vi.fn().mockReturnValue(null)
  };
}

function createMockTabButton(tab: string) {
  const el = createMockElement(`btn-tab-${tab}`);
  (el as any).dataset = { tab };
  return el;
}
