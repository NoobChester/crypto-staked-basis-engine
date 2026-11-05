import { describe, it, expect, vi } from 'vitest';
import { calculateTouchScrub, bindCanvasTouchScrub } from '../src/ui/touchInteractions.js';

describe('Mobile Touch Interactions & Canvas Scrubbing Engine', () => {
  const mockRect = {
    left: 20,
    top: 50,
    width: 360,
    height: 240
  };

  it('calculates normalized plot fraction and anchors tooltip above finger contact', () => {
    // Touch in center of plot (left=20, padLeft=55 -> plot start at x=75. Center ~ x=180)
    const scrub = calculateTouchScrub(200, 150, mockRect, { padLeft: 55, padRight: 35, tooltipHeightOffset: 45 });

    expect(scrub.plotFraction).toBeGreaterThan(0.3);
    expect(scrub.plotFraction).toBeLessThan(0.7);

    // rawY is 150 - 50 = 100. Tooltip should be at 100 - 45 = 55
    expect(scrub.tooltipY).toBe(55);
    expect(scrub.x).toBe(180);
  });

  it('clamps plot fraction strictly to [0.0, 1.0] when touch drags outside plot boundaries', () => {
    // Far left touch (dragged off left edge)
    const leftScrub = calculateTouchScrub(0, 100, mockRect, { padLeft: 50, padRight: 30 });
    expect(leftScrub.plotFraction).toBe(0.0);
    expect(leftScrub.x).toBe(50);

    // Far right touch (dragged off right edge)
    const rightScrub = calculateTouchScrub(500, 100, mockRect, { padLeft: 50, padRight: 30 });
    expect(rightScrub.plotFraction).toBe(1.0);
    expect(rightScrub.x).toBe(mockRect.width - 30);
  });

  it('enforces touch-action: pan-y and binds touch listeners to canvas', () => {
    const listeners: Record<string, Function> = {};
    const mockCanvas: any = {
      style: {},
      addEventListener: vi.fn((event, handler) => {
        listeners[event] = handler;
      }),
      removeEventListener: vi.fn(),
      getBoundingClientRect: () => mockRect
    };

    const cleanup = bindCanvasTouchScrub(mockCanvas, () => {});

    expect(mockCanvas.style.touchAction).toBe('pan-y');
    expect(mockCanvas.addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function), { passive: true });
    expect(mockCanvas.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: false });
    expect(mockCanvas.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function), { passive: true });

    // Cleanup removes listeners
    cleanup();
    expect(mockCanvas.removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(mockCanvas.removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function));
    expect(mockCanvas.removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
  });
});
