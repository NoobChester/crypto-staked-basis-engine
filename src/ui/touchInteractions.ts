/**
 * @file touchInteractions.ts
 * @description Mobile Touch Event Normalizer & Canvas Touch-Scrubbing Controller.
 * Enables horizontal curve scrubbing with above-thumb floating tooltip positioning
 * while preserving native vertical page scrolling via touch-action: pan-y.
 */

import type { TouchScrubPoint } from '../types/mobileUi.js';

export interface TouchScrubOptions {
  padLeft?: number;
  padRight?: number;
  tooltipHeightOffset?: number; // Distance in px to position tooltip above finger (default 45px)
}

/**
 * Calculates normalized scrub coordinates and above-thumb tooltip anchor from touch position.
 */
export function calculateTouchScrub(
  touchClientX: number,
  touchClientY: number,
  canvasRect: { left: number; top: number; width: number; height: number },
  options?: TouchScrubOptions
): TouchScrubPoint {
  const padLeft = options?.padLeft ?? 55;
  const padRight = options?.padRight ?? 35;
  const offsetAboveFinger = options?.tooltipHeightOffset ?? 45;

  const rawX = touchClientX - canvasRect.left;
  const rawY = touchClientY - canvasRect.top;

  const plotWidth = Math.max(1, canvasRect.width - padLeft - padRight);
  const clampedX = Math.max(padLeft, Math.min(canvasRect.width - padRight, rawX));
  const plotFraction = Math.max(0.0, Math.min(1.0, (clampedX - padLeft) / plotWidth));

  // Anchor tooltip directly above the finger contact point
  const tooltipX = Math.max(10, Math.min(canvasRect.width - 150, rawX - 60));
  const tooltipY = Math.max(8, rawY - offsetAboveFinger);

  return {
    x: clampedX,
    y: rawY,
    plotFraction,
    tooltipX,
    tooltipY
  };
}

/**
 * Binds touch-scrubbing listeners to a target canvas element.
 */
export function bindCanvasTouchScrub(
  canvas: HTMLCanvasElement,
  onScrub: (scrub: TouchScrubPoint | null) => void,
  options?: TouchScrubOptions
): () => void {
  if (!canvas) return () => {};

  // Ensure canvas does not hijack vertical page scrolling
  canvas.style.touchAction = 'pan-y';

  let isTouchActive = false;
  let startX = 0;
  let startY = 0;
  let isHorizontalDrag = false;

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isTouchActive = true;
    isHorizontalDrag = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isTouchActive || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startX);
    const dy = Math.abs(touch.clientY - startY);

    // Determine gesture intent: if horizontal movement exceeds vertical by threshold
    if (!isHorizontalDrag) {
      if (dx > 8 && dx > dy) {
        isHorizontalDrag = true;
      } else if (dy > 8) {
        // Vertical scroll intent: release touch tracking to allow fluid page scroll
        isTouchActive = false;
        onScrub(null);
        return;
      }
    }

    if (isHorizontalDrag) {
      // Prevent browser horizontal gesture navigation
      if (e.cancelable) e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scrub = calculateTouchScrub(touch.clientX, touch.clientY, rect, options);
      onScrub(scrub);
    }
  };

  const handleTouchEnd = () => {
    if (isTouchActive) {
      isTouchActive = false;
      isHorizontalDrag = false;
      onScrub(null);
    }
  };

  canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
  canvas.addEventListener('touchcancel', handleTouchEnd, { passive: true });

  return () => {
    canvas.removeEventListener('touchstart', handleTouchStart);
    canvas.removeEventListener('touchmove', handleTouchMove);
    canvas.removeEventListener('touchend', handleTouchEnd);
    canvas.removeEventListener('touchcancel', handleTouchEnd);
  };
}
