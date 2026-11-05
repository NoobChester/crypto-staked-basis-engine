/**
 * @file mobileNav.ts
 * @description Mobile Navigation Controller & Sticky Mini-HUD Manager.
 * Orchestrates 3-tab bottom navigation (< 1024px) and cross-tab real-time HUD feedback.
 */

import type { MobileTabKey, MiniHudData } from '../types/mobileUi.js';

let activeTab: MobileTabKey = 'chart';
let onTabChangeCallback: ((tab: MobileTabKey) => void) | null = null;
let isInitialized = false;

export function isMobileView(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
}

export function getMobileTab(): MobileTabKey {
  return activeTab;
}

/**
 * Initializes mobile bottom app bar navigation and sticky mini-HUD listeners.
 */
export function initMobileNav(onTabChange?: (tab: MobileTabKey) => void): void {
  if (typeof document === 'undefined') return;
  onTabChangeCallback = onTabChange || null;

  if (isInitialized) return;
  isInitialized = true;

  // Bottom nav tab buttons
  const tabButtons = document.querySelectorAll('[data-action="set-mobile-tab"]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = (e.currentTarget as HTMLElement).dataset.tab as MobileTabKey;
      if (tab) {
        setMobileTab(tab);
      }
    });
  });

  // Sticky Mini-HUD tap to switch to chart
  const hudElement = document.getElementById('mobile-sticky-hud');
  if (hudElement) {
    hudElement.addEventListener('click', () => {
      setMobileTab('chart');
    });
  }

  // Handle window resizing across mobile/desktop breakpoint (1024px)
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
    applyLayoutVisibility();
    });
  }

  applyLayoutVisibility();
}

/**
 * Sets the active mobile tab and updates tab containers & button styles.
 */
export function setMobileTab(tab: MobileTabKey): void {
  activeTab = tab;
  applyLayoutVisibility();
  updateNavButtonStyles();

  if (onTabChangeCallback) {
    onTabChangeCallback(tab);
  }
}

/**
 * Applies responsive visibility to the workspace panels based on screen size and active tab.
 */
export function applyLayoutVisibility(): void {
  if (typeof document === 'undefined') return;

  const panelChart = document.getElementById('tab-panel-chart');
  const panelControls = document.getElementById('tab-panel-controls');
  const panelStress = document.getElementById('tab-panel-stress');
  const bottomBar = document.getElementById('mobile-bottom-bar');
  const stickyHud = document.getElementById('mobile-sticky-hud');

  if (!isMobileView()) {
    // Desktop: show all panels simultaneously in multi-column grid
    panelChart?.classList.remove('hidden');
    panelControls?.classList.remove('hidden');
    panelStress?.classList.remove('hidden');
    bottomBar?.classList.add('hidden');
    stickyHud?.classList.add('hidden');
    return;
  }

  // Mobile: show bottom bar and sticky HUD (when not on chart tab)
  bottomBar?.classList.remove('hidden');

  if (activeTab === 'chart') {
    panelChart?.classList.remove('hidden');
    panelControls?.classList.add('hidden');
    panelStress?.classList.add('hidden');
    // Hide mini-HUD on chart tab since main chart and KPIs are already visible
    stickyHud?.classList.add('hidden');
  } else if (activeTab === 'controls') {
    panelChart?.classList.add('hidden');
    panelControls?.classList.remove('hidden');
    panelStress?.classList.add('hidden');
    // Show mini-HUD on controls tab so user sees live impact of slider drags
    stickyHud?.classList.remove('hidden');
  } else if (activeTab === 'stress') {
    panelChart?.classList.add('hidden');
    panelControls?.classList.add('hidden');
    panelStress?.classList.remove('hidden');
    // Show mini-HUD on stress lab tab
    stickyHud?.classList.remove('hidden');
  }
}

/**
 * Updates active/inactive styling on mobile bottom bar buttons.
 */
function updateNavButtonStyles(): void {
  if (typeof document === 'undefined') return;

  const tabButtons = document.querySelectorAll('[data-action="set-mobile-tab"]');
  tabButtons.forEach(btn => {
    const tab = (btn as HTMLElement).dataset.tab;
    const isActive = tab === activeTab;
    const icon = btn.querySelector('.tab-icon');
    const label = btn.querySelector('.tab-label');

    if (isActive) {
      btn.classList.add('text-cyan-400');
      btn.classList.remove('text-slate-400');
      icon?.classList.add('scale-110');
      label?.classList.add('font-bold', 'text-cyan-300');
    } else {
      btn.classList.remove('text-cyan-400');
      btn.classList.add('text-slate-400');
      icon?.classList.remove('scale-110');
      label?.classList.remove('font-bold', 'text-cyan-300');
    }
  });
}

/**
 * Updates the contents of the sticky mini-HUD header strip.
 */
export function updateMiniHud(data: MiniHudData): void {
  if (typeof document === 'undefined') return;

  const hudApy = document.getElementById('hud-val-apy');
  const hudBuffer = document.getElementById('hud-val-buffer');
  const hudPnl = document.getElementById('hud-val-pnl');

  if (hudApy) {
    hudApy.textContent = `${data.netRealizedApy >= 0 ? '+' : ''}${data.netRealizedApy.toFixed(1)}% APY`;
    hudApy.className = `font-mono font-bold text-xs ${data.netRealizedApy >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }

  if (hudBuffer) {
    if (data.isLiquidated) {
      hudBuffer.textContent = 'LIQUIDATED';
      hudBuffer.className = 'font-mono font-bold text-xs text-rose-500 animate-pulse';
    } else if (data.rLiq === Infinity || data.distanceToLiqPct === Infinity) {
      hudBuffer.textContent = 'Liq: ∞';
      hudBuffer.className = 'font-mono font-bold text-xs text-emerald-400';
    } else {
      const bufSign = data.distanceToLiqPct > 0 ? '+' : '';
      hudBuffer.textContent = `Liq: ${bufSign}${data.distanceToLiqPct.toFixed(1)}%`;
      hudBuffer.className = `font-mono font-bold text-xs ${data.distanceToLiqPct < 25 ? 'text-amber-400' : 'text-emerald-400'}`;
    }
  }

  if (hudPnl) {
    const sign = data.netPnL >= 0 ? '+' : '';
    hudPnl.textContent = `${sign}$${Math.abs(data.netPnL).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    hudPnl.className = `font-mono font-bold text-xs ${data.netPnL >= 0 ? 'text-cyan-300' : 'text-rose-400'}`;
  }
}
