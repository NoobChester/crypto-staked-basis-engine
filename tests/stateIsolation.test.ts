import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  state,
  stressLabState,
  applyCrisisScenario,
  setStressCapital,
  setStressMode,
  setStressAsset
} from '../src/app.js';

describe('State Isolation: Live Terminal vs Institutional Stress Lab', () => {
  beforeEach(() => {
    (global as any).window = {
      innerWidth: 1200,
      location: { hash: '#terminal' },
      history: { replaceState: vi.fn() },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };
    (global as any).document = {
      readyState: 'complete',
      getElementById: vi.fn(() => ({
        className: '',
        classList: { add: vi.fn(), remove: vi.fn(), contains: vi.fn(() => false) },
        style: {},
        textContent: '',
        value: ''
      })),
      querySelectorAll: vi.fn(() => []),
      addEventListener: vi.fn()
    };
  });

  afterEach(() => {
    delete (global as any).window;
    delete (global as any).document;
  });

  it('guarantees applying a crisis scenario does NOT mutate live terminal sliders or state', () => {
    // Setup initial live terminal parameters
    state.priceMove = 0.0;
    state.fundingAPR = 10.5;
    state.days = 90;
    state.depegPct = 0.0;
    state.capital = 25000;
    state.mode = 'unified';

    // Apply severe crisis scenario in Stress Lab (e.g. Celsius: -40% price shock, -8% funding, 6.5% depeg)
    applyCrisisScenario('celsius_depeg_2022');

    // Assert that the stress lab state took the scenario
    expect(stressLabState.activeScenario).toBe('celsius_depeg_2022');

    // CRITICAL INVARIANT: Live terminal sliders and state remain 100% UNTOUCHED
    expect(state.priceMove).toBe(0.0);
    expect(state.fundingAPR).toBe(10.5);
    expect(state.days).toBe(90);
    expect(state.depegPct).toBe(0.0);
    expect(state.capital).toBe(25000);
    expect(state.mode).toBe('unified');
  });

  it('guarantees modifying Stress Lab capital or mode does NOT affect Live Terminal', () => {
    state.capital = 15000;
    state.mode = 'unified';

    // Modify Stress Lab capital to $100,000 and mode to isolated
    setStressCapital(100000);
    setStressMode('isolated');

    // Assert Stress Lab updated
    expect(stressLabState.capital).toBe(100000);
    expect(stressLabState.mode).toBe('isolated');

    // Assert Live Terminal retained its own independent settings
    expect(state.capital).toBe(15000);
    expect(state.mode).toBe('unified');
  });

  it('guarantees Stress Lab asset selection updates collateral ratios independently', () => {
    setStressAsset('BTC');
    expect(stressLabState.tradedAsset).toBe('BTC');
    expect(stressLabState.collateralRatio).toBe(0.85);

    setStressAsset('ETH');
    expect(stressLabState.tradedAsset).toBe('ETH');
    expect(stressLabState.collateralRatio).toBe(0.90);
  });
});
