/**
 * @file tapToEdit.ts
 * @description Mobile Tap-to-Edit Numeric Popover Controller.
 * Solves imprecise mobile slider wrestling by allowing users to tap any value badge
 * to open a clean numeric input keypad with min/max bounds validation.
 */

import type { TapToEditTarget } from '../types/mobileUi.js';

let activeTarget: TapToEditTarget | null = null;
let popoverContainer: HTMLElement | null = null;

/**
 * Sanitizes and bounds-clamps user numeric input string.
 */
export function sanitizeInputNumber(
  raw: string | number,
  min: number,
  max: number,
  step = 1
): number {
  const parsed = typeof raw === 'number' ? raw : parseFloat(raw.toString().replace(/[^0-9.-]/g, ''));
  if (isNaN(parsed)) return min;

  // Clamp within min and optional max
  const clamped = max === Infinity ? Math.max(min, parsed) : Math.max(min, Math.min(max, parsed));

  // Round to step precision if step is finite
  if (step > 0) {
    const decimals = step.toString().split('.')[1]?.length || 0;
    return parseFloat(clamped.toFixed(decimals));
  }
  return clamped;
}

/**
 * Opens the tap-to-edit keypad popover for a given target badge.
 */
export function openTapToEditPopover(target: TapToEditTarget): void {
  if (typeof document === 'undefined') return;
  activeTarget = target;

  if (!popoverContainer) {
    createPopoverElement();
  }

  const titleEl = document.getElementById('tap-to-edit-title');
  const inputEl = document.getElementById('tap-to-edit-input') as HTMLInputElement;
  const boundsEl = document.getElementById('tap-to-edit-bounds');
  const unitEl = document.getElementById('tap-to-edit-unit');

  if (titleEl) titleEl.textContent = `Set ${target.field}`;
  if (inputEl) {
    inputEl.value = target.currentValue.toString();
    inputEl.min = target.min.toString();
    if (target.max !== Infinity) {
      inputEl.max = target.max.toString();
    } else {
      inputEl.removeAttribute('max');
    }
    inputEl.step = target.step.toString();
    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 50);
  }
  if (boundsEl) {
    boundsEl.textContent = target.max === Infinity
      ? `Minimum: ${target.min} ${target.unit}`
      : `Range: ${target.min} to ${target.max} ${target.unit}`;
  }
  if (unitEl) unitEl.textContent = target.unit;

  popoverContainer?.classList.remove('hidden');
  popoverContainer?.classList.add('flex');
}

/**
 * Closes the tap-to-edit popover dialog.
 */
export function closeTapToEditPopover(): void {
  if (popoverContainer) {
    popoverContainer.classList.add('hidden');
    popoverContainer.classList.remove('flex');
  }
  activeTarget = null;
}

/**
 * Confirms and commits the entered numeric value.
 */
export function commitTapToEdit(): void {
  if (!activeTarget) return;

  const inputEl = document.getElementById('tap-to-edit-input') as HTMLInputElement;
  if (!inputEl) return;

  const rawVal = inputEl.value;
  const sanitized = sanitizeInputNumber(rawVal, activeTarget.min, activeTarget.max, activeTarget.step);

  activeTarget.onCommit(sanitized);
  closeTapToEditPopover();
}

/**
 * Step nudge handler (+ or -).
 */
export function stepNudge(direction: 1 | -1): void {
  if (!activeTarget) return;
  const inputEl = document.getElementById('tap-to-edit-input') as HTMLInputElement;
  if (!inputEl) return;

  const current = parseFloat(inputEl.value) || 0;
  const step = activeTarget.step || 1;
  const next = sanitizeInputNumber(current + direction * step, activeTarget.min, activeTarget.max, step);
  inputEl.value = next.toString();
}

/**
 * Creates the modal popover container in the DOM if not already present.
 */
function createPopoverElement(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('tap-to-edit-modal')) {
    popoverContainer = document.getElementById('tap-to-edit-modal');
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'tap-to-edit-modal';
  modal.className = 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  modal.innerHTML = `
    <div class="relative w-full max-w-xs bg-slate-900 border border-cyan-800/80 rounded-2xl shadow-2xl p-4 flex flex-col space-y-3.5 modal-enter">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 id="tap-to-edit-title" class="font-mono font-bold text-sm text-white">Edit Parameter</h4>
        <button type="button" id="btn-tte-close" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button type="button" id="btn-tte-decrement" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition border border-slate-700 active:scale-95 cursor-pointer">-</button>
        <div class="relative flex-1">
          <input type="number" id="tap-to-edit-input" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-950 border border-cyan-500 font-mono font-bold text-base text-cyan-300 text-center focus:outline-none focus:ring-1 focus:ring-cyan-400" />
          <span id="tap-to-edit-unit" class="absolute right-2.5 top-2.5 text-xs font-mono text-slate-500 pointer-events-none"></span>
        </div>
        <button type="button" id="btn-tte-increment" class="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition border border-slate-700 active:scale-95 cursor-pointer">+</button>
      </div>

      <div id="tap-to-edit-bounds" class="text-[10px] font-mono text-slate-400 text-center"></div>

      <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
        <button type="button" id="btn-tte-cancel" class="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold transition cursor-pointer">Cancel</button>
        <button type="button" id="btn-tte-confirm" class="py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono text-xs font-bold transition cursor-pointer shadow-md shadow-cyan-950">Confirm</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  popoverContainer = modal;

  // Event listeners
  document.getElementById('btn-tte-close')?.addEventListener('click', closeTapToEditPopover);
  document.getElementById('btn-tte-cancel')?.addEventListener('click', closeTapToEditPopover);
  document.getElementById('btn-tte-confirm')?.addEventListener('click', commitTapToEdit);
  document.getElementById('btn-tte-decrement')?.addEventListener('click', () => stepNudge(-1));
  document.getElementById('btn-tte-increment')?.addEventListener('click', () => stepNudge(1));

  const inputEl = document.getElementById('tap-to-edit-input') as HTMLInputElement;
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      commitTapToEdit();
    } else if (e.key === 'Escape') {
      closeTapToEditPopover();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTapToEditPopover();
  });
}

/**
 * Binds click listeners to an array of badge targets.
 */
export function initTapToEdit(targets: TapToEditTarget[]): void {
  if (typeof document === 'undefined') return;

  for (const t of targets) {
    const el = document.getElementById(t.id);
    if (el) {
      el.classList.add('cursor-pointer', 'hover:ring-1', 'hover:ring-cyan-400/50', 'transition');
      el.setAttribute('title', `Tap to edit ${t.field}`);
      el.addEventListener('click', () => {
        openTapToEditPopover(t);
      });
    }
  }
}
