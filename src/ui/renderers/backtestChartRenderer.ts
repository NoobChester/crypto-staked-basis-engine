/**
 * @file backtestChartRenderer.ts
 * @description High-performance HTML5 Canvas 2D rendering engine for the Multi-Year Tri-Curve Backtest.
 * Visualizes Strategy Equity vs Buy-and-Hold Spot Asset vs Risk-Free US T-Bills with hover crosshair scrubbing.
 */

import type { BacktestSummaryResult, BacktestStepResult } from '../../math/backtest.js';
import { fmtUSD, fmtPct } from '../../math/hedging.js';

export interface VisiblePlots {
  strategy: boolean;
  spot: boolean;
  tbill: boolean;
  sp500: boolean;
  resets?: boolean;
}

interface ChartDimensions {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  plotWidth: number;
  plotHeight: number;
}

interface ActiveChartState {
  canvas: HTMLCanvasElement;
  result: BacktestSummaryResult;
  asset: string;
  visiblePlots: VisiblePlots;
  dims: ChartDimensions;
  steps: BacktestStepResult[];
}

let activeChartState: ActiveChartState | null = null;
let currentListeningCanvas: HTMLCanvasElement | null = null;
let activeHoverCleanup: (() => void) | null = null;
let lastHoverIdx = -1;
let hoverRafId: number | null = null;

function setupHoverListeners(canvas: HTMLCanvasElement, tooltip: HTMLElement): void {
  if (currentListeningCanvas === canvas) return;

  if (activeHoverCleanup) {
    activeHoverCleanup();
    activeHoverCleanup = null;
  }

  let cachedRect: DOMRect | null = null;

  function updateRect() {
    cachedRect = canvas.getBoundingClientRect();
  }

  function onMouseEnter() {
    updateRect();
  }

  function onMouseMove(e: MouseEvent) {
    if (!activeChartState || activeChartState.canvas !== canvas) return;
    const { dims, steps } = activeChartState;
    const n = steps.length;
    if (n === 0) return;

    if (!cachedRect) updateRect();
    const mouseX = e.clientX - (cachedRect?.left ?? 0);
    if (mouseX < dims.padding.left || mouseX > dims.width - dims.padding.right) {
      tooltip.classList.add('hidden');
      lastHoverIdx = -1;
      return;
    }

    const frac = (mouseX - dims.padding.left) / dims.plotWidth;
    const idx = Math.min(n - 1, Math.max(0, Math.round(frac * (n - 1))));

    // Sub-pixel jitter guard: do not re-render DOM if hover index has not changed
    if (idx === lastHoverIdx) return;
    lastHoverIdx = idx;

    if (hoverRafId !== null) cancelAnimationFrame(hoverRafId);
    hoverRafId = requestAnimationFrame(() => {
      if (!activeChartState || activeChartState.canvas !== canvas) return;
      const currentSteps = activeChartState.steps;
      const totalSteps = currentSteps.length;
      if (idx >= totalSteps) return;
      const step = currentSteps[idx];
      const activePlots = activeChartState.visiblePlots;

      tooltip.classList.remove('hidden');
      tooltip.innerHTML = `
        <div class="space-y-1 text-[11px] font-mono leading-tight">
          <div class="flex items-center justify-between border-b border-slate-700/80 pb-1 font-bold text-white">
            <span>${step.date}</span>
            <span class="text-[10px] text-slate-400">Day ${step.day}/${totalSteps}</span>
          </div>
${activePlots.strategy ? `          <div class="flex items-center justify-between gap-3 text-cyan-400 font-bold">
            <span>Strategy Equity:</span>
            <span>${fmtUSD(step.strategyEquity)}</span>
          </div>` : ''}
${activePlots.spot ? `          <div class="flex items-center justify-between gap-3 text-purple-400">
            <span>Spot Buy & Hold:</span>
            <span>${fmtUSD(step.spotBenchmarkEquity)}</span>
          </div>` : ''}
${activePlots.tbill ? `          <div class="flex items-center justify-between gap-3 text-emerald-400">
            <span>US T-Bill Cash:</span>
            <span>${fmtUSD(step.tbillBenchmarkEquity)}</span>
          </div>` : ''}
${activePlots.sp500 ? `          <div class="flex items-center justify-between gap-3 text-amber-400 font-medium">
            <span>S&amp;P 500 Index:</span>
            <span>${fmtUSD(step.sp500BenchmarkEquity)}</span>
          </div>` : ''}
${step.isResetStep ? `          <div class="py-1 px-1.5 my-1 rounded bg-amber-950/90 border border-amber-500/80 text-[10px] text-amber-300 font-bold flex items-center justify-between shadow">
            <span>🔄 Auto-Reset Baseline</span>
            <span>Fee: -${fmtUSD(step.resetFeePaid || 0)}</span>
          </div>` : ''}
${step.borrowRateAPR && activeChartState?.result?.leverage && activeChartState.result.leverage > 1.0 ? `          <div class="flex items-center justify-between gap-3 text-purple-400 font-medium">
            <span>USD Borrow APR:</span>
            <span>${fmtPct(step.borrowRateAPR)} (-${fmtUSD(step.cumulativeBorrowInterest || 0)})</span>
          </div>` : ''}
          <div class="pt-1 border-t border-slate-800 text-[10px] flex justify-between items-center font-medium">
            <span class="text-slate-400">Liq Buffer:</span>
            <span class="${step.isLiquidated ? 'text-rose-400 font-bold' : (step.liquidationBufferPct === Infinity ? 'text-emerald-400 font-bold' : (step.liquidationBufferPct < 20 ? 'text-rose-400 font-bold' : (step.liquidationBufferPct < 50 ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold')))}">
              ${step.isLiquidated ? '0.0% (Liquidated)' : (step.liquidationBufferPct === Infinity ? '∞ (Zero Risk)' : `+${step.liquidationBufferPct.toFixed(1)}%`)}${step.liquidationPrice ? ` ($${Math.round(step.liquidationPrice).toLocaleString()})` : ''}
            </span>
          </div>
          <div class="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
            <span>Spot: $${step.spotPrice.toLocaleString()}</span>
            <span>Funding: ${fmtPct(step.fundingAPR)}</span>
            <span>Staking: ${step.stakingAPY === 0 ? '0.0% (PoW)' : `${step.stakingAPY.toFixed(1)}%`}</span>
          </div>
          <div class="pt-0.5 text-[10px] font-mono text-center">
            ${step.isLiquidated ? '<span class="text-rose-400 font-bold">⚠️ POST-LIQUIDATION SPOT</span>' : (step.stakingAPY === 0 ? '<span class="text-amber-400 font-medium">Regime: Pure Cash-and-Carry Basis</span>' : '<span class="text-purple-400 font-medium">Regime: Staked Basis</span>')}
          </div>
        </div>
      `;

      // Position tooltip smoothly
      const tooltipW = 260;
      let leftPos = mouseX + 15;
      if (leftPos + tooltipW > dims.width) {
        leftPos = mouseX - tooltipW - 15;
      }
      tooltip.style.left = `${leftPos}px`;
      tooltip.style.top = '15px';
    });
  }

  function onMouseLeave() {
    if (hoverRafId !== null) {
      cancelAnimationFrame(hoverRafId);
      hoverRafId = null;
    }
    lastHoverIdx = -1;
    tooltip.classList.add('hidden');
  }

  canvas.addEventListener('mouseenter', onMouseEnter);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);

  currentListeningCanvas = canvas;
  activeHoverCleanup = () => {
    if (hoverRafId !== null) cancelAnimationFrame(hoverRafId);
    canvas.removeEventListener('mouseenter', onMouseEnter);
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseleave', onMouseLeave);
    currentListeningCanvas = null;
  };
}

export function drawBacktestChart(
  canvas: HTMLCanvasElement | null,
  result: BacktestSummaryResult | null,
  asset: string = 'ETH',
  visiblePlots: VisiblePlots = { strategy: true, spot: true, tbill: true, sp500: true }
): void {
  if (!canvas || !result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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

  // Set active chart state for high-performance hover lookup
  activeChartState = {
    canvas,
    result,
    asset,
    visiblePlots,
    dims,
    steps: result.dailyTrajectory
  };

  const steps = result.dailyTrajectory;
  const n = steps.length;

  // Find min and max across all currently visible curves in a single O(N) pass
  let minVal = Infinity;
  let maxVal = -Infinity;
  const hasStrategy = visiblePlots.strategy;
  const hasSpot = visiblePlots.spot;
  const hasTbill = visiblePlots.tbill;
  const hasSp500 = visiblePlots.sp500;

  for (let i = 0; i < n; i++) {
    const s = steps[i];
    if (hasStrategy) {
      if (s.strategyEquity < minVal) minVal = s.strategyEquity;
      if (s.strategyEquity > maxVal) maxVal = s.strategyEquity;
    }
    if (hasSpot) {
      if (s.spotBenchmarkEquity < minVal) minVal = s.spotBenchmarkEquity;
      if (s.spotBenchmarkEquity > maxVal) maxVal = s.spotBenchmarkEquity;
    }
    if (hasTbill) {
      if (s.tbillBenchmarkEquity < minVal) minVal = s.tbillBenchmarkEquity;
      if (s.tbillBenchmarkEquity > maxVal) maxVal = s.tbillBenchmarkEquity;
    }
    if (hasSp500) {
      if (s.sp500BenchmarkEquity < minVal) minVal = s.sp500BenchmarkEquity;
      if (s.sp500BenchmarkEquity > maxVal) maxVal = s.sp500BenchmarkEquity;
    }
  }
  // Fallback to strategy equity if no curves active or non-finite
  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    minVal = steps[0].strategyEquity;
    maxVal = steps[n - 1].strategyEquity;
  }
  if (minVal === maxVal) {
    minVal *= 0.9;
    maxVal *= 1.1;
  }

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

  // Active Leverage Annotation
  if (result.leverage && result.leverage > 1.0) {
    ctx.save();
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const debt = (result.leverage - 1) * result.initialCapital;
    ctx.fillText(
      `LEVERAGED BASIS: ${result.leverage.toFixed(1)}x · USD DEBT: $${Math.round(debt).toLocaleString()}`,
      padding.left + 10,
      padding.top + 8
    );
    ctx.restore();
  }

  // Curve 3: US T-Bills Risk-Free Rate (Emerald Dashed Line)
  if (hasTbill) {
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
  }

  // Curve 4: S&P 500 Index Benchmark (Amber Solid Line)
  if (hasSp500) {
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = getX(i);
      const y = getY(steps[i].sp500BenchmarkEquity);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // Curve 2: Buy-and-Hold Spot Asset (Purple Solid Line)
  if (hasSpot) {
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
  }

  // Curve 1: Staked Basis Strategy Equity (Cyan Solid Line with Gradient Glow)
  if (hasStrategy) {
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

    // Curve 1: Staked Basis Strategy Equity (Hardware-Accelerated Dual Stroke Neon Glow without raster blur)
    // Glow pass
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = getX(i);
      const y = getY(steps[i].strategyEquity);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Core crisp stroke
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = getX(i);
      const y = getY(steps[i].strategyEquity);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

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

  // Babylon Restaking Inception Marker (if in range and transitions from 0% PoW to Babylon restaking)
  const bbnIdx = steps.findIndex(s => s.date === '2024-08-15');
  if (bbnIdx > 0 && bbnIdx < n - 1 && (asset === 'BTC' || (steps[0].stakingAPY === 0 && steps[bbnIdx].stakingAPY > 0))) {
    const bbnX = getX(bbnIdx);
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bbnX, padding.top + 20);
    ctx.lineTo(bbnX, height - padding.bottom);
    ctx.stroke();

    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([]);
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    const tag = '⚡ BABYLON RESTAKING ERA (Aug 15, 2024)';
    const tagW = ctx.measureText(tag).width + 8;
    ctx.fillRect(bbnX - tagW / 2, padding.top + 5, tagW, 16);
    ctx.strokeRect(bbnX - tagW / 2, padding.top + 5, tagW, 16);
    ctx.fillStyle = '#fef3c7';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tag, bbnX, padding.top + 13);
    ctx.restore();
  }

  // Full Vertical Dashed Auto-Reset Lines & Staggered Milestone Badges
  if (visiblePlots.resets !== false && result.totalResetsCount > 0) {
    ctx.save();
    let resetCount = 0;
    for (let i = 0; i < n; i++) {
      const s = steps[i];
      if (s.isResetStep) {
        resetCount++;
        const x = getX(i);
        const y = getY(s.strategyEquity);

        // 1. Full vertical dashed amber line across canvas
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();

        // 2. Staggered Top Milestone Pill Badge to prevent overlap when resets happen close together
        const tier = (resetCount - 1) % 3;
        const tagY = padding.top + 5 + tier * 19;
        ctx.fillStyle = '#451a03';
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        const tag = `🔄 RESET #${resetCount} (Day ${s.day})`;
        const tagW = ctx.measureText(tag).width + 8;
        const badgeLeft = Math.max(padding.left + 2, Math.min(width - padding.right - tagW - 2, x - tagW / 2));
        ctx.fillRect(badgeLeft, tagY, tagW, 16);
        ctx.strokeRect(badgeLeft, tagY, tagW, 16);
        ctx.fillStyle = '#fef3c7';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag, badgeLeft + tagW / 2, tagY + 8);

        // 3. Glowing amber pin on Strategy curve intersection if strategy curve is visible
        if (hasStrategy) {
          ctx.setLineDash([]);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  // Interactive Hover Crosshair with rAF and index memoization
  const tooltipEl = typeof document !== 'undefined' ? document.getElementById('backtest-chart-tooltip') : null;
  if (tooltipEl) {
    setupHoverListeners(canvas, tooltipEl);
  }
}
