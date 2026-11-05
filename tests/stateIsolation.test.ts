import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  state,
  stressLabState,
  applyCrisisScenario,
  setStressCapital,
  setStressMode,
  setStressAsset,
  getStressLabScenarioState
} from '../src/app.js';
import { calculateCrisisSimulation } from '../src/math/hedging.js';
import { CRISIS_HISTORICAL_SERIES } from '../src/data/crisisHistoricalSeries.js';

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

  it('guarantees switching to Post-FTX Inverted Carry renders 30-day FTX series without being overwritten by Celsius', () => {
    // 1. Initial state is Celsius (28 days)
    applyCrisisScenario('celsius_depeg_2022');
    expect(stressLabState.activeScenario).toBe('celsius_depeg_2022');

    // 2. Switch to Post-FTX Inverted Carry (30 days)
    applyCrisisScenario('ftx_carry_winter');
    expect(stressLabState.activeScenario).toBe('ftx_carry_winter');

    // 3. Verify scenario state formulation
    const ftxScenarioState = getStressLabScenarioState('ftx_carry_winter');
    expect(ftxScenarioState.priceMove).toBe(-25.0);
    expect(ftxScenarioState.fundingAPR).toBe(-12.0);
    expect(ftxScenarioState.depegPct).toBe(2.0);
    expect(ftxScenarioState.days).toBe(30);

    // 4. Verify calculated simulation matches 30-day FTX trajectory and NOT 28-day Celsius
    const simRes = calculateCrisisSimulation('ftx_carry_winter', ftxScenarioState);
    expect(simRes.horizonDays).toBe(30);
    expect(simRes.dailyTrajectory).toHaveLength(30);
    expect(simRes.scenarioKey).toBe('ftx_carry_winter');
    expect(simRes.scenarioTitle).toBe('Post-FTX Inverted Carry');

    // First day of FTX is 2022-11-01 (NOT June 2022 Celsius)
    expect(simRes.dailyTrajectory[0].dateStr).toBe('2022-11-01');
    expect(simRes.dailyTrajectory[29].dateStr).toBe('2022-11-30');
    expect(simRes.dailyTrajectory[0].fundingAPR).toBe(CRISIS_HISTORICAL_SERIES.ftx_carry_winter[0].fundingAPR);

    // Peak depeg in FTX is ~2.20% (NOT 6.50% from Celsius)
    const peakDepeg = Math.max(...simRes.dailyTrajectory.map(s => s.depegPct));
    expect(peakDepeg).toBeLessThan(3.0);
    expect(peakDepeg).toBeGreaterThan(1.5);
  });
});
