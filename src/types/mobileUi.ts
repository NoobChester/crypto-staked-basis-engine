/**
 * @file mobileUi.ts
 * @description Shared Type Contract for Mobile-First UX Transformation:
 * Bottom App Bar navigation, Sticky Mini-HUD, Canvas touch-scrubbing, and Tap-to-Edit inputs.
 */

export type MobileTabKey = 'chart' | 'controls' | 'stress';

export interface MobileTabDefinition {
  key: MobileTabKey;
  label: string;
  iconSvg: string;
  containerId: string;
}

export interface MiniHudData {
  netRealizedApy: number;
  rLiq: number;
  distanceToLiqPct: number;
  isLiquidated: boolean;
  netPnL: number;
  netDelta: number;
}

export interface TouchScrubPoint {
  x: number;
  y: number;
  plotFraction: number; // 0.0 to 1.0 along the X axis
  tooltipX: number;
  tooltipY: number;     // Constrained 40px above finger contact
}

export interface TapToEditTarget {
  id: string;
  field: string;
  currentValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onCommit: (val: number) => void;
}
