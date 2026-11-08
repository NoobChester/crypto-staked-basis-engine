import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initViewRouter,
  setView,
  getView,
  syncFromHash,
  applyViewVisibility,
  updateHeaderNavStyles,
  updateMobileBottomNavStyles
} from '../src/ui/viewRouter.js';

describe('Top-Level View Router (#terminal vs #stress-lab)', () => {
  let mockElements: Record<string, any> = {};

  function createMockElement(id: string) {
    return {
      id,
      className: '',
      classList: {
        add: vi.fn(function(cls: string) {
          if (!mockElements[id].className.includes(cls)) {
            mockElements[id].className += ' ' + cls;
          }
        }),
        remove: vi.fn(function(cls: string) {
          mockElements[id].className = mockElements[id].className.replace(cls, '').trim();
        }),
        contains: vi.fn(function(cls: string) {
          return mockElements[id].className.includes(cls);
        }),
        toggle: vi.fn(function(cls: string, force?: boolean) {
          const present = mockElements[id].className.includes(cls);
          const shouldAdd = force !== undefined ? force : !present;
          if (shouldAdd && !present) {
            mockElements[id].className = (mockElements[id].className + ' ' + cls).trim();
          } else if (!shouldAdd && present) {
            mockElements[id].className = mockElements[id].className.replace(cls, '').trim();
          }
          return shouldAdd;
        })
      },
      getAttribute: vi.fn((attr: string) => {
        if (attr === 'data-view') return id === 'nav-btn-stress' ? 'stress-lab' : 'terminal';
        return null;
      }),
      addEventListener: vi.fn()
    };
  }

  function createMockMobileNavButton(view: string) {
    const icon = { classList: { add: vi.fn(), remove: vi.fn() } };
    const label = { classList: { add: vi.fn(), remove: vi.fn() } };
    return {
      getAttribute: vi.fn((attr: string) => attr === 'data-view' ? view : null),
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      },
      querySelector: vi.fn((sel: string) => {
        if (sel === '.tab-icon') return icon;
        if (sel === '.tab-label') return label;
        return null;
      }),
      addEventListener: vi.fn()
    };
  }

  beforeEach(() => {
    const mobBtns = {
      terminal: createMockMobileNavButton('terminal'),
      'stress-lab': createMockMobileNavButton('stress-lab'),
      backtest: createMockMobileNavButton('backtest'),
      'rate-lab': createMockMobileNavButton('rate-lab')
    };

    mockElements = {
      'view-live-terminal': createMockElement('view-live-terminal'),
      'view-stress-lab': createMockElement('view-stress-lab'),
      'view-backtest': createMockElement('view-backtest'),
      'view-rate-lab': createMockElement('view-rate-lab'),
      'nav-btn-terminal': createMockElement('nav-btn-terminal'),
      'nav-btn-stress': createMockElement('nav-btn-stress'),
      'nav-btn-backtest': createMockElement('nav-btn-backtest'),
      'nav-btn-rate-lab': createMockElement('nav-btn-rate-lab'),
      'banner-open-stress-lab': createMockElement('banner-open-stress-lab'),
      'mobile-bottom-bar': {
        querySelectorAll: vi.fn((sel: string) => {
          if (sel.includes('[data-action="set-view"]')) {
            return [mobBtns.terminal, mobBtns['stress-lab'], mobBtns.backtest, mobBtns['rate-lab']];
          }
          return [];
        })
      },
      mobBtns
    };

    (global as any).window = {
      location: {
        hash: '#terminal'
      },
      history: {
        replaceState: vi.fn()
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };

    (global as any).document = {
      getElementById: (id: string) => mockElements[id] || null,
      querySelectorAll: (sel: string) => {
        if (sel.includes('data-action="set-view"')) {
          return [
            mockElements['nav-btn-terminal'],
            mockElements['nav-btn-stress'],
            mockElements['nav-btn-backtest'],
            mockElements['nav-btn-rate-lab']
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

  it('defaults to terminal view', () => {
    setView('terminal', false);
    expect(getView()).toBe('terminal');
    applyViewVisibility();
    expect(mockElements['view-live-terminal'].classList.toggle).toHaveBeenCalledWith('hidden', false);
    expect(mockElements['view-stress-lab'].classList.toggle).toHaveBeenCalledWith('hidden', true);
    expect(mockElements['view-backtest'].classList.toggle).toHaveBeenCalledWith('hidden', true);
    expect(mockElements['view-rate-lab'].classList.toggle).toHaveBeenCalledWith('hidden', true);
  });

  it('switches to stress-lab view and toggles container visibility', () => {
    setView('stress-lab', false);
    expect(getView()).toBe('stress-lab');
    applyViewVisibility();
    expect(mockElements['view-stress-lab'].classList.toggle).toHaveBeenCalledWith('hidden', false);
    expect(mockElements['view-live-terminal'].classList.toggle).toHaveBeenCalledWith('hidden', true);
    expect(mockElements['view-backtest'].classList.toggle).toHaveBeenCalledWith('hidden', true);
    expect(mockElements['view-rate-lab'].classList.toggle).toHaveBeenCalledWith('hidden', true);
  });

  it('switches to rate-lab view and toggles container visibility', () => {
    setView('rate-lab', false);
    expect(getView()).toBe('rate-lab');
    applyViewVisibility();
    expect(mockElements['view-rate-lab'].classList.toggle).toHaveBeenCalledWith('hidden', false);
    expect(mockElements['view-live-terminal'].classList.toggle).toHaveBeenCalledWith('hidden', true);
    expect(mockElements['view-stress-lab'].classList.toggle).toHaveBeenCalledWith('hidden', true);
    expect(mockElements['view-backtest'].classList.toggle).toHaveBeenCalledWith('hidden', true);
  });

  it('updates header nav styles when switching views', () => {
    setView('rate-lab', false);
    updateHeaderNavStyles();
    expect(mockElements['nav-btn-rate-lab'].className).toContain('bg-emerald-500');
    expect(mockElements['nav-btn-terminal'].className).toContain('text-slate-400');

    setView('terminal', false);
    updateHeaderNavStyles();
    expect(mockElements['nav-btn-terminal'].className).toContain('bg-cyan-500');
    expect(mockElements['nav-btn-rate-lab'].className).toContain('text-slate-400');
  });

  it('updates mobile bottom bar nav styles across all 4 views', () => {
    setView('rate-lab', false);
    updateMobileBottomNavStyles();
    expect(mockElements.mobBtns['rate-lab'].classList.add).toHaveBeenCalledWith('text-emerald-400');
    expect(mockElements.mobBtns.terminal.classList.add).toHaveBeenCalledWith('text-slate-400');

    setView('backtest', false);
    updateMobileBottomNavStyles();
    expect(mockElements.mobBtns.backtest.classList.add).toHaveBeenCalledWith('text-purple-400');
    expect(mockElements.mobBtns['rate-lab'].classList.add).toHaveBeenCalledWith('text-slate-400');

    setView('terminal', false);
    updateMobileBottomNavStyles();
    expect(mockElements.mobBtns.terminal.classList.add).toHaveBeenCalledWith('text-cyan-400');
    expect(mockElements.mobBtns.backtest.classList.add).toHaveBeenCalledWith('text-slate-400');
  });

  it('syncs correctly from URL hash (#rate-lab and #stress-lab)', () => {
    (global as any).window.location.hash = '#rate-lab';
    syncFromHash();
    expect(getView()).toBe('rate-lab');

    (global as any).window.location.hash = '#stress-lab';
    syncFromHash();
    expect(getView()).toBe('stress-lab');

    (global as any).window.location.hash = '#terminal';
    syncFromHash();
    expect(getView()).toBe('terminal');
  });

  it('initializes event listeners and triggers onViewChange callback', () => {
    const callback = vi.fn();
    initViewRouter(callback);
    setView('stress-lab', false);
    expect(callback).toHaveBeenCalledWith('stress-lab');
  });
});
