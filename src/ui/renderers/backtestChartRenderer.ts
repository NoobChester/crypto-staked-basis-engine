/**
 * @file backtestChartRenderer.ts
 * @description High-performance HTML5 Canvas 2D rendering engine for the Multi-Year Tri-Curve Backtest.
 * Visualizes Strategy Equity vs Buy-and-Hold Spot Asset vs Risk-Free US T-Bills with hover crosshair scrubbing.
 */

import type { BacktestSummaryResult } from '../../math/backtest.js';
import { fmtUSD, fmtPct } from '../../math/hedging.js';

interface ChartDimensions {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  plotWidth: number;
  plotHeight: number;
}

let activeHoverCleanup: (() => void) | null = null;

export function drawBacktestChart(
  canvas: HTMLCanvasElement | null,
  result: BacktestSummaryResult | null
): void {
  if (!canvas || !result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Cleanup prior listeners
  if (activeHoverCleanup) {
    activeHoverCleanup();
    activeHoverCleanup = null;
  }

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(300, rect.width || canvas.width || 800);
  const height = Math.max(200, rect.height || canvas.height || 360);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);

  const padding = { top: 25, right: 30, bottom: 35, left: 70 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const dims: ChartDimensions = { width, height, padding, plotWidth, plotHeight };

  const steps = result.dailyTrajectory;
  const n = steps.length;

  // Find min and max across all three curves
  const allValues: number[] = [];
  for (const s of steps) {
    allValues.push(s.strategyEquity, s.spotBenchmarkEquity, s.tbillBenchmarkEquity);
  }
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const yPadding = (maxVal - minVal) * 0.08 || 500;
  const yMin = Math.max(0, minVal - yPadding);
  const yMax = maxVal + yPadding;

  const getX = (index: number) => padding.left + (index / (n - 1 || 1)) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - yMin) / (yMax - yMin || 1)) * plotHeight;

  // Clear background
  ctx.fillStyle = '#080d1a';
  ctx.fillRect(0, 0, width, height);

  // Draw Grid Lines (Horizontal)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  const yTicks = 5;
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let i = 0; i <= yTicks; i++) {
    const val = yMin + (i / yTicks) * (yMax - yMin);
    const y = getY(val);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(fmtUSD(val), padding.left - 8, y);
  }

  // Draw Grid Lines (Vertical / Date Ticks)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const xTicks = Math.min(6, n);
  for (let i = 0; i < xTicks; i++) {
    const idx = Math.floor((i / (xTicks - 1 || 1)) * (n - 1));
    const x = getX(idx);
    const dateStr = steps[idx].date;

    ctx.beginPath();
    ctx.strokeStyle = '#1e293b';
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, height - padding.bottom);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.fillText(dateStr.slice(0, 7), x, height - padding.bottom + 8);
  }

  // Curve 3: US T-Bills Risk-Free Rate (Emerald Dashed Line)
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = getX(i);
    const y = getY(steps[i].tbillBenchmarkEquity);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Curve 2: Buy-and-Hold Spot Asset (Purple Solid Line)
  ctx.save();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = getX(i);
    const y = getY(steps[i].spotBenchmarkEquity);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Curve 1: Staked Basis Strategy Equity (Cyan Solid Line with Gradient Glow)
  ctx.save();
  const grad = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  grad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  grad.addColorStop(1, 'rgba(6, 182, 212, 0.00)');

  ctx.beginPath();
  ctx.moveTo(getX(0), height - padding.bottom);
  for (let i = 0; i < n; i++) {
    ctx.lineTo(getX(i), getY(steps[i].strategyEquity));
  }
  ctx.lineTo(getX(n - 1), height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = getX(i);
    const y = getY(steps[i].strategyEquity);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Liquidation Marker if breached
  if (result.isLiquidated && result.tLiq) {
    const liqIdx = Math.min(n - 1, Math.max(0, result.tLiq - 1));
    const liqX = getX(liqIdx);

    ctx.save();
    ctx.strokeStyle = '#f43f5e';
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(liqX, padding.top);
    ctx.lineTo(liqX, height - padding.bottom);
    ctx.stroke();

    ctx.fillStyle = '#9f1239';
    ctx.strokeStyle = '#f43f5e';
    ctx.setLineDash([]);
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    const tag = `LIQUIDATED (Day ${result.tLiq})`;
    const tagW = ctx.measureText(tag).width + 8;
    ctx.fillRect(liqX - tagW / 2, padding.top + 5, tagW, 16);
    ctx.strokeRect(liqX - tagW / 2, padding.top + 5, tagW, 16);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tag, liqX, padding.top + 13);
    ctx.restore();
  }

  // Interactive Hover Crosshair
  setupHoverListener(canvas, result, dims);
}

function setupHoverListener(
  canvas: HTMLCanvasElement,
  result: BacktestSummaryResult,
  dims: ChartDimensions
): void {
  const steps = result.dailyTrajectory;
  const n = steps.length;
  const tooltip = document.getElementById('backtest-chart-tooltip');

  function onMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX < dims.padding.left || mouseX > dims.width - dims.padding.right) {
      if (tooltip) tooltip.classList.add('hidden');
      return;
    }

    const frac = (mouseX - dims.padding.left) / dims.plotWidth;
    const idx = Math.min(n - 1, Math.max(0, Math.round(frac * (n - 1))));
    const step = steps[idx];

    if (!tooltip) return;

    tooltip.classList.remove('hidden');
    tooltip.innerHTML = `
      <div class="space-y-1 text-[11px] font-mono leading-tight">
        <div class="flex items-center justify-between border-b border-slate-700/80 pb-1 font-bold text-white">
          <span>${step.date}</span>
          <span class="text-[10px] text-slate-400">Day ${step.day}/${n}</span>
        </div>
        <div class="flex items-center justify-between gap-3 text-cyan-400 font-bold">
          <span>Strategy Equity:</span>
          <span>${fmtUSD(step.strategyEquity)}</span>
        </div>
        <div class="flex items-center justify-between gap-3 text-purple-400">
          <span>Spot Buy & Hold:</span>
          <span>${fmtUSD(step.spotBenchmarkEquity)}</span>
        </div>
        <div class="flex items-center justify-between gap-3 text-emerald-400">
          <span>US T-Bill Cash:</span>
          <span>${fmtUSD(step.tbillBenchmarkEquity)}</span>
        </div>
        <div class="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
          <span>Spot: $${step.spotPrice.toLocaleString()}</span>
          <span>Funding: ${fmtPct(step.fundingAPR)}</span>
          <span>Staking: ${step.stakingAPY.toFixed(1)}%</span>
        </div>
        ${step.isLiquidated ? '<div class="text-rose-400 font-bold text-[10px] text-center pt-0.5">⚠️ POST-LIQUIDATION SPOT</div>' : ''}
      </div>
    `;

    // Position tooltip smoothly
    const tooltipW = 230;
    let leftPos = mouseX + 15;
    if (leftPos + tooltipW > dims.width) {
      leftPos = mouseX - tooltipW - 15;
    }
    tooltip.style.left = `${leftPos}px`;
    tooltip.style.top = '15px';
  }

  function onMouseLeave() {
    if (tooltip) tooltip.classList.add('hidden');
  }

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);

  activeHoverCleanup = () => {
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseleave', onMouseLeave);
  };
}
