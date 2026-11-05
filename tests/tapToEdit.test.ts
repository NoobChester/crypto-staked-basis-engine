import { describe, it, expect } from 'vitest';
import { sanitizeInputNumber } from '../src/ui/tapToEdit.js';

describe('Tap-to-Edit Input Sanitizer & Bounds Engine', () => {
  it('strips non-numeric currency and percentage symbols correctly', () => {
    expect(sanitizeInputNumber('$10,000.00', 100, 1000000, 100)).toBe(10000);
    expect(sanitizeInputNumber('+12.5% APR', -50, 100, 0.1)).toBe(12.5);
    expect(sanitizeInputNumber('-5.2%', -50, 100, 0.1)).toBe(-5.2);
  });

  it('clamps values strictly within min and max boundaries', () => {
    // Underflow clamped to min
    expect(sanitizeInputNumber(-20, 0, 100, 1)).toBe(0);
    // Overflow clamped to max
    expect(sanitizeInputNumber(250, 0, 100, 1)).toBe(100);
  });

  it('rounds properly to defined step decimal precision', () => {
    expect(sanitizeInputNumber(12.3456, 0, 100, 0.1)).toBe(12.3);
    expect(sanitizeInputNumber(12.38, 0, 100, 0.5)).toBe(12.4);
    expect(sanitizeInputNumber(145.7, 0, 1000, 1)).toBe(146);
  });

  it('returns min bound when input is completely invalid NaN string', () => {
    expect(sanitizeInputNumber('invalid_text', 50, 500, 1)).toBe(50);
  });
});
