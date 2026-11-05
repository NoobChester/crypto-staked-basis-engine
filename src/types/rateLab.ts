/**
 * @file rateLab.ts
 * @description Shared Type Contract for Institutional Rate Modeler & Stochastic Carry Engine.
 * Serves as the single source of truth for all quantitative rate modeling, term structure,
 * and Monte Carlo/Quasi-Monte Carlo simulation modules.
 */

// Core parameters for Ornstein-Uhlenbeck with Jumps
export interface OUProcessParams {
  theta: number;          // Mean-reversion speed (decay rate per day)
  mu: number;             // Long-term equilibrium funding rate anchor (% APR)
  sigma: number;          // Instantaneous funding volatility (% APR)
  halfLifeDays: number;   // ln(2) / theta
  jumpIntensity: number;  // Expected jump arrivals per year (lambda)
  jumpMean: number;       // Mean jump shock size (% APR, typically negative)
  jumpStdDev: number;     // Jump shock volatility (% APR)
}

// Simulation engine options
export type SimulationEngineType = 'sqmc_sobol' | 'pseudo_mc';

export interface SimulationConfig {
  engineType: SimulationEngineType;
  pathCount: number;      // e.g. 512 for SQMC (matches 2^9 dyadic net), 2500 for MC
  horizonDays: number;    // e.g. 30, 60, 90, 180
  seed?: number;
}

// Monte Carlo / SQMC path generation step
export interface MonteCarloPathStep {
  day: number;
  median: number;
  p05: number;
  p25: number;
  p75: number;
  p95: number;
  expectedDrift: number;
  samplePaths: number[][]; // e.g. 5 representative paths for visual trajectory display
}

// Output of the stochastic simulation
export interface StochasticSimulationResult {
  horizonDays: number;
  engineUsed: SimulationEngineType;
  pathCount: number;
  steps: MonteCarloPathStep[];
  expectedCarryApr: number;
  negativeCarryProbabilityPct: number;
  var95Apr: number;
  cvar95Apr: number;
  halfLifeDays: number;
}

// Regime-based discrete configuration
export type RateRegimeKey = 'contango' | 'baseline' | 'backwardation';

export interface RegimeConfig {
  key: RateRegimeKey;
  label: string;
  fundingApr: number;
  durationDays: number;
  description: string;
}

export interface RegimeSimulationResult {
  regimes: Record<RateRegimeKey, RegimeConfig>;
  activeRegime: RateRegimeKey;
  cumulativeCarryBleedDollar: number;
  netRealizedCarryApr: number;
}

// Forward basis term structure from dated deliverable futures
export interface FuturesBasisTenor {
  instrument: string;     // e.g., 'ETH-28MAR25'
  daysToExpiry: number;
  annualizedBasisPct: number;
  futuresPrice: number;
  spotPrice: number;
}

export interface FuturesTermStructure {
  asset: 'ETH' | 'BTC' | 'SOL';
  tenors: FuturesBasisTenor[];
  interpolatedBasis30d: number;
  interpolatedBasis90d: number;
  interpolatedBasis180d: number;
  isLiveFeed: boolean;
}

// Companion Staking Decomposition
export interface StakingDecomposition {
  asset: 'ETH' | 'BTC' | 'SOL';
  totalStakingApy: number;
  consensusIssuanceApy: number;
  mevTipsApy: number;
  activeValidators: number;
  isSolRealYield: boolean;
  pendleImpliedApyBenchmark?: number;
}

// Top-level Rate Lab Active Model State
export type ActiveRateModelTab = 'regimes' | 'ou_stochastic' | 'term_structure' | 'staking';

export interface RateLabState {
  activeTab: ActiveRateModelTab;
  asset: 'ETH' | 'BTC' | 'SOL';
  solYieldType: 'nominal' | 'real';
  horizonDays: number;
  engineType: SimulationEngineType;
  ouParams: OUProcessParams;
  ouCustomOverrides: Partial<OUProcessParams>;
  activeRegime: RateRegimeKey;
  regimeConfigs: Record<RateRegimeKey, RegimeConfig>;
  latestStochasticResult?: StochasticSimulationResult;
  latestTermStructure?: FuturesTermStructure;
  latestStakingDecomposition?: StakingDecomposition;
}
