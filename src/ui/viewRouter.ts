/**
 * @file viewRouter.ts
 * @description Top-level view routing controller between Live Basis Terminal
 * and Institutional Stress & Crisis Lab, with persistent URL hash synchronization.
 */

export type AppView = 'terminal' | 'stress-lab';

let currentView: AppView = 'terminal';
let onViewChangeCallback: ((view: AppView) => void) | null = null;
let isInitialized = false;

const ACTIVE_TAB_CLASSES = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow cursor-pointer';
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
  }
}

/**
 * Syncs the view based on current window.location.hash.
 */
export function syncFromHash(): void {
  if (typeof window === 'undefined' || !window.location || typeof window.location.hash !== 'string') return;
  const hash = window.location.hash.toLowerCase();
  if (hash === '#stress-lab' || hash === '#stress' || hash === '#crisis') {
    setView('stress-lab', false);
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
    const targetHash = view === 'stress-lab' ? '#stress-lab' : '#terminal';
    if (window.location.hash !== targetHash) {
      if (window.history && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, '', targetHash);
      }
    }
  }

  applyViewVisibility();
  updateHeaderNavStyles();

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

  if (currentView === 'terminal') {
    viewTerminal?.classList.remove('hidden');
    viewStress?.classList.add('hidden');
  } else {
    viewTerminal?.classList.add('hidden');
    viewStress?.classList.remove('hidden');
  }
}

/**
 * Updates active and inactive button classes on the top navigation bar.
 */
export function updateHeaderNavStyles(): void {
  if (typeof document === 'undefined') return;

  const btnTerminal = document.getElementById('nav-btn-terminal');
  const btnStress = document.getElementById('nav-btn-stress');

  if (btnTerminal && btnStress) {
    if (currentView === 'terminal') {
      btnTerminal.className = ACTIVE_TAB_CLASSES;
      btnStress.className = INACTIVE_TAB_CLASSES;
    } else {
      btnTerminal.className = INACTIVE_TAB_CLASSES;
      btnStress.className = ACTIVE_TAB_CLASSES;
    }
  }
}
