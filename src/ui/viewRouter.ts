/**
 * @file viewRouter.ts
 * @description Top-level view routing controller between Live Basis Terminal
 * and Institutional Stress & Crisis Lab, with persistent URL hash synchronization.
 */

export type AppView = 'terminal' | 'stress-lab' | 'backtest' | 'rate-lab';

let currentView: AppView = 'terminal';
let onViewChangeCallback: ((view: AppView) => void) | null = null;
let isInitialized = false;

const ACTIVE_TAB_CLASSES = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow cursor-pointer';
const ACTIVE_BACKTEST_TAB_CLASSES = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-purple-500 text-black shadow cursor-pointer';
const ACTIVE_RATE_LAB_TAB_CLASSES = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-emerald-500 text-black shadow cursor-pointer';
const INACTIVE_TAB_CLASSES = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer';

export function getView(): AppView {
  return currentView;
}

/**
 * Initializes hash routing listener and top header navigation buttons.
 */
export function initViewRouter(onViewChange?: (view: AppView) => void): void {
  if (typeof document === 'undefined') return;
  if (onViewChange) onViewChangeCallback = onViewChange;

  if (isInitialized) return;
  isInitialized = true;

  // Header Nav button clicks
  const navBtns = document.querySelectorAll<HTMLElement>('[data-action="set-view"]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = (e.currentTarget as HTMLElement).getAttribute('data-view') as AppView;
      if (target) {
        setView(target, true);
      }
    });
  });

  // Quick action banner click in live terminal
  const bannerStress = document.getElementById('banner-open-stress-lab');
  if (bannerStress) {
    bannerStress.addEventListener('click', () => {
      setView('stress-lab', true);
    });
  }

  // Handle URL hash changes
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      syncFromHash();
    });
    // Initial sync from hash on page load
    syncFromHash();
  } else {
    applyViewVisibility();
    updateHeaderNavStyles();
    updateMobileBottomNavStyles();
  }
}

/**
 * Syncs the view based on current window.location.hash.
 */
export function syncFromHash(): void {
  if (typeof window === 'undefined' || !window.location || typeof window.location.hash !== 'string') return;
  const hash = window.location.hash.toLowerCase();
  if (hash === '#backtest' || hash === '#historical') {
    setView('backtest', false);
  } else if (hash === '#stress-lab' || hash === '#stress' || hash === '#crisis') {
    setView('stress-lab', false);
  } else if (hash === '#rate-lab' || hash === '#rates' || hash === '#rate') {
    setView('rate-lab', false);
  } else {
    setView('terminal', false);
  }
}

/**
 * Sets the active view, updates DOM containers, styling, and triggers callback.
 */
export function setView(view: AppView, updateHash = true): void {
  currentView = view;

  if (updateHash && typeof window !== 'undefined' && window.location && typeof window.location.hash === 'string') {
    const targetHash = view === 'backtest'
      ? '#backtest'
      : view === 'stress-lab'
        ? '#stress-lab'
        : view === 'rate-lab'
          ? '#rate-lab'
          : '#terminal';
    if (window.location.hash !== targetHash) {
      if (window.history && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, '', targetHash);
      }
    }
  }

  applyViewVisibility();
  updateHeaderNavStyles();
  updateMobileBottomNavStyles();

  if (onViewChangeCallback) {
    onViewChangeCallback(view);
  }
}

/**
 * Applies CSS visibility classes to the top-level view containers.
 */
export function applyViewVisibility(): void {
  if (typeof document === 'undefined') return;

  const viewTerminal = document.getElementById('view-live-terminal');
  const viewStress = document.getElementById('view-stress-lab');
  const viewBacktest = document.getElementById('view-backtest');
  const viewRateLab = document.getElementById('view-rate-lab');

  const toggleHidden = (el: HTMLElement | null, isHidden: boolean) => {
    if (!el || !el.classList) return;
    if (typeof el.classList.toggle === 'function') {
      el.classList.toggle('hidden', isHidden);
    } else if (isHidden) {
      el.classList.add?.('hidden');
    } else {
      el.classList.remove?.('hidden');
    }
  };

  toggleHidden(viewTerminal, currentView !== 'terminal');
  toggleHidden(viewStress, currentView !== 'stress-lab');
  toggleHidden(viewBacktest, currentView !== 'backtest');
  toggleHidden(viewRateLab, currentView !== 'rate-lab');
}

/**
 * Updates active and inactive button classes on the top navigation bar.
 */
export function updateHeaderNavStyles(): void {
  if (typeof document === 'undefined') return;

  const btnTerminal = document.getElementById('nav-btn-terminal');
  const btnStress = document.getElementById('nav-btn-stress');
  const btnBacktest = document.getElementById('nav-btn-backtest');
  const btnRateLab = document.getElementById('nav-btn-rate-lab');

  if (btnTerminal) {
    btnTerminal.className = currentView === 'terminal' ? ACTIVE_TAB_CLASSES : INACTIVE_TAB_CLASSES;
  }
  if (btnStress) {
    btnStress.className = currentView === 'stress-lab' ? ACTIVE_TAB_CLASSES : INACTIVE_TAB_CLASSES;
  }
  if (btnBacktest) {
    btnBacktest.className = currentView === 'backtest' ? ACTIVE_BACKTEST_TAB_CLASSES : INACTIVE_TAB_CLASSES;
  }
  if (btnRateLab) {
    btnRateLab.className = currentView === 'rate-lab' ? ACTIVE_RATE_LAB_TAB_CLASSES : INACTIVE_TAB_CLASSES;
  }
}

/**
 * Updates active and inactive button classes on the mobile bottom app bar.
 */
export function updateMobileBottomNavStyles(view: AppView = currentView): void {
  if (typeof document === 'undefined') return;

  const bottomNav = document.getElementById('mobile-bottom-bar');
  if (!bottomNav || typeof bottomNav.querySelectorAll !== 'function') return;

  const buttons = bottomNav.querySelectorAll<HTMLElement>('[data-action="set-view"]');
  buttons.forEach(btn => {
    const btnView = btn.getAttribute('data-view') as AppView;
    const isActive = btnView === view;
    const icon = btn.querySelector('.tab-icon');
    const label = btn.querySelector('.tab-label');

    btn.classList.remove('text-cyan-400', 'text-purple-400', 'text-emerald-400', 'text-slate-400');
    icon?.classList.remove('scale-110');
    label?.classList.remove('font-bold', 'text-cyan-300', 'text-purple-300', 'text-emerald-300');

    if (isActive) {
      if (btnView === 'backtest') {
        btn.classList.add('text-purple-400');
        label?.classList.add('font-bold', 'text-purple-300');
      } else if (btnView === 'rate-lab') {
        btn.classList.add('text-emerald-400');
        label?.classList.add('font-bold', 'text-emerald-300');
      } else {
        btn.classList.add('text-cyan-400');
        label?.classList.add('font-bold', 'text-cyan-300');
      }
      icon?.classList.add('scale-110');
    } else {
      btn.classList.add('text-slate-400');
    }
  });
}
