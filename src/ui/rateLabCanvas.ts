/**
 * @file rateLabCanvas.ts
 * @description High-DPI HTML5 Canvas 2D visualizer for the Institutional Rate Lab:
 * 1. Monte Carlo / SQMC Fan Chart (90% envelope, 50% IQR, median, sample paths, negative carry bleed zone).
 * 2. Forward Basis Term Structure Curve (tenors, spline, anchor points).
 */

import type { StochasticSimulationResult, FuturesTermStructure } from '../types/rateLab.js';

export interface CanvasDimensions {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

/**
 * Sets up High-DPI scaling for crisp rendering on retina/4K displays.
 */
export function setupHighDPI(canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; width: number; height: number } {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(300, rect.width || 600);
  const height = Math.max(200, rect.height || 320);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d')!;
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);
  return { ctx, width, height };
}

/**
 * Renders the full Monte Carlo / SQMC Fan Chart on canvas.
 */
export function renderStochasticFanChart(
  canvas: HTMLCanvasElement,
  result: StochasticSimulationResult,
  hoverDay: number | null = null
): void {
  const { ctx, width, height } = setupHighDPI(canvas);
  const pad = { top: 25, right: 35, bottom: 35, left: 55 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Background clear
  ctx.clearRect(0, 0, width, height);

  const steps = result.steps;
  if (!steps || steps.length < 2) return;

  const horizon = result.horizonDays;

  // Find min and max rate across all steps
  let minRate = Math.min(...steps.map(s => Math.min(s.p05, s.expectedDrift)));
  let maxRate = Math.max(...steps.map(s => Math.max(s.p95, s.expectedDrift)));

  // Always include 0% in vertical span
  minRate = Math.min(-2.0, minRate);
  maxRate = Math.max(10.0, maxRate);

  // Add 10% breathing room padding
  const range = maxRate - minRate || 1.0;
  const yMin = minRate - range * 0.1;
  const yMax = maxRate + range * 0.1;

  const toX = (day: number) => pad.left + (day / horizon) * plotW;
  const toY = (rate: number) => pad.top + ((yMax - rate) / (yMax - yMin)) * plotH;

  // 1. Draw Grid Lines & Axes
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);

  const yStep = range > 60 ? 20 : range > 30 ? 10 : 5;
  const startY = Math.ceil(yMin / yStep) * yStep;

  ctx.fillStyle = '#64748b';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let val = startY; val <= yMax; val += yStep) {
    const y = toY(val);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();

    ctx.fillText(`${val >= 0 ? '+' : ''}${val.toFixed(0)}%`, pad.left - 8, y);
  }

  // X Axis Day labels
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const xStepDays = horizon > 90 ? 30 : horizon > 45 ? 15 : 7;
  for (let d = 0; d <= horizon; d += xStepDays) {
    const x = toX(d);
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + plotH);
    ctx.stroke();
    ctx.fillText(`D${d}`, x, pad.top + plotH + 8);
  }
  ctx.setLineDash([]); // Reset dash

  // 2. Zero-Carry Baseline & Negative Shading
  const yZero = toY(0.0);
  if (yZero >= pad.top && yZero <= pad.top + plotH) {
    // Fill negative carry danger zone below yZero
    ctx.fillStyle = 'rgba(244, 63, 94, 0.08)';
    ctx.fillRect(pad.left, yZero, plotW, (pad.top + plotH) - yZero);

    // Draw prominent red/amber zero line
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, yZero);
    ctx.lineTo(pad.left + plotW, yZero);
    ctx.stroke();

    ctx.fillStyle = '#f43f5e';
    ctx.textAlign = 'left';
    ctx.fillText('0% Carry Floor', pad.left + 6, yZero - 8);
  }

  // 3. 90% Confidence Envelope Fill (p05 to p95)
  ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(steps[0].p95));
  for (let i = 1; i < steps.length; i++) {
    ctx.lineTo(toX(steps[i].day), toY(steps[i].p95));
  }
  for (let i = steps.length - 1; i >= 0; i--) {
    ctx.lineTo(toX(steps[i].day), toY(steps[i].p05));
  }
  ctx.closePath();
  ctx.fill();

  // 4. 50% Interquartile Band Fill (p25 to p75)
  ctx.fillStyle = 'rgba(6, 182, 212, 0.22)';
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(steps[0].p75));
  for (let i = 1; i < steps.length; i++) {
    ctx.lineTo(toX(steps[i].day), toY(steps[i].p75));
  }
  for (let i = steps.length - 1; i >= 0; i--) {
    ctx.lineTo(toX(steps[i].day), toY(steps[i].p25));
  }
  ctx.closePath();
  ctx.fill();

  // 5. Sample Stochastic Trajectories (Faint paths)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1;
  const nSamples = steps[0].samplePaths?.[0]?.length || 0;
  for (let pIdx = 0; pIdx < nSamples; pIdx++) {
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(steps[0].samplePaths[0][pIdx]));
    for (let i = 1; i < steps.length; i++) {
      ctx.lineTo(toX(steps[i].day), toY(steps[i].samplePaths[0][pIdx]));
    }
    ctx.stroke();
  }

  // 6. Expected Drift Path (Dashed Slate)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(steps[0].expectedDrift));
  for (let i = 1; i < steps.length; i++) {
    ctx.lineTo(toX(steps[i].day), toY(steps[i].expectedDrift));
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // 7. Median Path (Solid Cyan)
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(steps[0].median));
  for (let i = 1; i < steps.length; i++) {
    ctx.lineTo(toX(steps[i].day), toY(steps[i].median));
  }
  ctx.stroke();

  // 8. Hover Crosshair & Data Callout
  if (hoverDay !== null && hoverDay >= 0 && hoverDay <= horizon) {
    const step = steps[Math.min(steps.length - 1, Math.round(hoverDay))];
    const hx = toX(step.day);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(hx, pad.top);
    ctx.lineTo(hx, pad.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Median marker dot
    const hy = toY(step.median);
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(hx, hy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Small floating tooltip box
    const tooltipText = `D${step.day}: ${step.median >= 0 ? '+' : ''}${step.median.toFixed(1)}% [${step.p05.toFixed(1)}% to ${step.p95.toFixed(1)}%]`;
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    const textW = ctx.measureText(tooltipText).width;
    const boxX = Math.min(width - pad.right - textW - 12, Math.max(pad.left + 4, hx - textW / 2));
    const boxY = Math.max(pad.top + 4, hy - 24);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, textW + 12, 18, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(tooltipText, boxX + 6, boxY + 9);
  }
}

/**
 * Renders the Dated Futures Term Structure curve and tenor points.
 */
export function renderTermStructureCurve(
  canvas: HTMLCanvasElement,
  structure: FuturesTermStructure
): void {
  const { ctx, width, height } = setupHighDPI(canvas);
  const pad = { top: 25, right: 35, bottom: 35, left: 55 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  ctx.clearRect(0, 0, width, height);

  const tenors = structure.tenors;
  if (!tenors || tenors.length === 0) return;

  const maxDays = Math.max(200, Math.max(...tenors.map(t => t.daysToExpiry)) + 30);
  const minBasis = Math.min(0, Math.min(...tenors.map(t => t.annualizedBasisPct)) - 2);
  const maxBasis = Math.max(20, Math.max(...tenors.map(t => t.annualizedBasisPct)) + 3);

  const toX = (days: number) => pad.left + (days / maxDays) * plotW;
  const toY = (basis: number) => pad.top + ((maxBasis - basis) / (maxBasis - minBasis)) * plotH;

  // Grid & Axes
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);

  for (let b = Math.ceil(minBasis / 5) * 5; b <= maxBasis; b += 5) {
    const y = toY(b);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${b >= 0 ? '+' : ''}${b.toFixed(0)}%`, pad.left - 8, y);
  }

  for (let d = 30; d <= maxDays; d += 60) {
    const x = toX(d);
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + plotH);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`${d}d`, x, pad.top + plotH + 8);
  }
  ctx.setLineDash([]);

  // Draw Spline / Segmented Term Structure Curve
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let d = 7; d <= maxDays; d += 2) {
    // Interpolate basis
    let basis = tenors[0].annualizedBasisPct;
    if (d <= tenors[0].daysToExpiry) {
      basis = tenors[0].annualizedBasisPct;
    } else if (d >= tenors[tenors.length - 1].daysToExpiry) {
      basis = tenors[tenors.length - 1].annualizedBasisPct;
    } else {
      for (let i = 0; i < tenors.length - 1; i++) {
        if (d >= tenors[i].daysToExpiry && d <= tenors[i + 1].daysToExpiry) {
          const w = (d - tenors[i].daysToExpiry) / (tenors[i + 1].daysToExpiry - tenors[i].daysToExpiry);
          basis = tenors[i].annualizedBasisPct + w * (tenors[i + 1].annualizedBasisPct - tenors[i].annualizedBasisPct);
          break;
        }
      }
    }
    const x = toX(d);
    const y = toY(basis);
    if (d === 7) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Plot Tenor Points
  for (const t of tenors) {
    const x = toX(t.daysToExpiry);
    const y = toY(t.annualizedBasisPct);

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${t.instrument} (${t.annualizedBasisPct.toFixed(1)}%)`, x, y - 8);
  }
}
