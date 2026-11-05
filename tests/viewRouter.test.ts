import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initViewRouter,
  setView,
  getView,
  syncFromHash,
  applyViewVisibility,
  updateHeaderNavStyles
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
        })
      },
      getAttribute: vi.fn((attr: string) => {
        if (attr === 'data-view') return id === 'nav-btn-stress' ? 'stress-lab' : 'terminal';
        return null;
      }),
      addEventListener: vi.fn()
    };
  }

  beforeEach(() => {
    mockElements = {
      'view-live-terminal': createMockElement('view-live-terminal'),
      'view-stress-lab': createMockElement('view-stress-lab'),
      'nav-btn-terminal': createMockElement('nav-btn-terminal'),
      'nav-btn-stress': createMockElement('nav-btn-stress'),
      'banner-open-stress-lab': createMockElement('banner-open-stress-lab')
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
          return [mockElements['nav-btn-terminal'], mockElements['nav-btn-stress']];
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
    expect(mockElements['view-live-terminal'].classList.remove).toHaveBeenCalledWith('hidden');
    expect(mockElements['view-stress-lab'].classList.add).toHaveBeenCalledWith('hidden');
  });

  it('switches to stress-lab view and toggles container visibility', () => {
    setView('stress-lab', false);
    expect(getView()).toBe('stress-lab');
    applyViewVisibility();
    expect(mockElements['view-stress-lab'].classList.remove).toHaveBeenCalledWith('hidden');
    expect(mockElements['view-live-terminal'].classList.add).toHaveBeenCalledWith('hidden');
  });

  it('updates header nav styles when switching views', () => {
    setView('stress-lab', false);
    updateHeaderNavStyles();
    expect(mockElements['nav-btn-stress'].className).toContain('bg-cyan-500');
    expect(mockElements['nav-btn-terminal'].className).toContain('text-slate-400');

    setView('terminal', false);
    updateHeaderNavStyles();
    expect(mockElements['nav-btn-terminal'].className).toContain('bg-cyan-500');
    expect(mockElements['nav-btn-stress'].className).toContain('text-slate-400');
  });

  it('syncs correctly from URL hash (#stress-lab)', () => {
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
