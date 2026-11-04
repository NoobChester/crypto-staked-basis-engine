/**
 * @file chart.ts
 * @description HTML5 Canvas 2D rendering engine for PnL curves, liquidation cliffs,
 * entry reference baselines, and interactive tooltip tracking.
 */

import { calculateOutcome, fmtUSD, fmtPct, type HedgingState, type HedgingOutcome } from '../math/hedging.js';

export interface TooltipElements {
  tooltip: HTMLElement | null;
  ttPrice: HTMLElement | null;
  ttVal: HTMLElement | null;
  ttRoi: HTMLElement | null;
  ttStatus: HTMLElement | null;
}

export function drawChart(
  canvas: HTMLCanvasElement | null,
  state: HedgingState,
  currentRes: HedgingOutcome
): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.resetTransform();
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  const pad = { top: 25, right: 30, bottom: 45, left: 65 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const xMin = -100;
  const xMax = state.priceMove > 100 ? Math.max(100, Math.ceil(state.priceMove / 50) * 50) : 100;
  const xSpan = xMax - xMin;

  const stepCount = 140;
  const pnlPoints: Array<{ x: number; y: number; isLiq: boolean }> = [];
  const spotPoints: Array<{ x: number; y: number }> = [];

  let minVal = Infinity;
  let maxVal = -Infinity;

  for (let i = 0; i <= stepCount; i++) {
    const pMove = xMin + (xSpan * i / stepCount);
    const outcome = calculateOutcome(pMove, state);
    pnlPoints.push({ x: pMove, y: outcome.totalPortfolioVal, isLiq: outcome.isLiquidated });

    const unhedged = state.capital * (1 + (pMove / 100));
    spotPoints.push({ x: pMove, y: unhedged });

    minVal = Math.min(minVal, outcome.totalPortfolioVal, unhedged);
    maxVal = Math.max(maxVal, outcome.totalPortfolioVal, unhedged);
  }

  const yMin = Math.max(0, Math.floor(minVal * 0.85 / 1000) * 1000);
  const yMax = Math.ceil(maxVal * 1.15 / 1000) * 1000;

  function toCanvasX(pMove: number) {
    return pad.left + ((pMove - xMin) / xSpan) * plotW;
  }
  function toCanvasY(val: number) {
    return pad.top + plotH - ((val - yMin) / (yMax - yMin)) * plotH;
  }

  // Clear & Background
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#080d1a';
  ctx.fillRect(pad.left, pad.top, plotW, plotH);

  // Grid Lines - Y Axis
  const yTicks = 5;
  ctx.strokeStyle = '#162238';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let i = 0; i <= yTicks; i++) {
    const v = yMin + (i / yTicks) * (yMax - yMin);
    const y = toCanvasY(v);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();

    ctx.fillText('$' + Math.round(v).toLocaleString(), pad.left - 8, y);
  }

  // Grid Lines - X Axis (-100%, -50%, 0%, 50%, 100%, 150%, 200%)
  const xTicks = xMax > 100 ? [-100, -50, 0, 50, 100, 150, 200] : [-100, -50, 0, 50, 100];
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (const xt of xTicks) {
    const x = toCanvasX(xt);
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + plotH);
    ctx.strokeStyle = (xt === 0) ? '#2a3b5c' : '#141d30';
    ctx.stroke();

    ctx.fillStyle = (xt === 0) ? '#38bdf8' : '#64748b';
    ctx.fillText((xt > 0 ? '+' : '') + xt + '%', x, pad.top + plotH + 8);
  }

  // Initial Capital Entry Line (dashed reference)
  const yBase = toCanvasY(state.capital);
  ctx.strokeStyle = '#334155';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(pad.left, yBase);
  ctx.lineTo(pad.left + plotW, yBase);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left';
  ctx.fillText('ENTRY BASE: $' + state.capital.toLocaleString(), pad.left + 8, yBase - 8);

  // Draw Liquidation Cliff (if it falls within the [xMin, xMax] window)
  const rLiqPct = currentRes.rLiq * 100;
  if (rLiqPct <= xMax && rLiqPct > -100) {
    const liqX = toCanvasX(rLiqPct);

    ctx.fillStyle = 'rgba(244, 63, 94, 0.08)';
    ctx.fillRect(liqX, pad.top, (pad.left + plotW) - liqX, plotH);

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(liqX, pad.top);
    ctx.lineTo(liqX, pad.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LIQ CLIFF (' + fmtPct(rLiqPct) + ')', liqX, pad.top + 14);
  }

  // Draw Benchmark Spot Line
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  for (let i = 0; i < spotPoints.length; i++) {
    const pt = spotPoints[i];
    const x = toCanvasX(pt.x);
    const y = toCanvasY(pt.y);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw Strategy Fill Gradient
  const areaGradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
  areaGradient.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
  areaGradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

  ctx.fillStyle = areaGradient;
  ctx.beginPath();
  ctx.moveTo(toCanvasX(-100), pad.top + plotH);
  for (let i = 0; i < pnlPoints.length; i++) {
    ctx.lineTo(toCanvasX(pnlPoints[i].x), toCanvasY(pnlPoints[i].y));
  }
  ctx.lineTo(toCanvasX(100), pad.top + plotH);
  ctx.closePath();
  ctx.fill();

  // Draw Strategy Line
  for (let i = 0; i < pnlPoints.length - 1; i++) {
    const pt1 = pnlPoints[i];
    const pt2 = pnlPoints[i + 1];

    ctx.beginPath();
    ctx.moveTo(toCanvasX(pt1.x), toCanvasY(pt1.y));
    ctx.lineTo(toCanvasX(pt2.x), toCanvasY(pt2.y));

    ctx.lineWidth = 2.5;
    if (pt1.isLiq || pt2.isLiq) {
      ctx.strokeStyle = '#f43f5e';
    } else {
      ctx.strokeStyle = '#06b6d4';
    }
    ctx.stroke();
  }

  // Active Hover / Position Pin
  const curX = toCanvasX(state.priceMove);
  const curY = toCanvasY(currentRes.totalPortfolioVal);

  ctx.strokeStyle = currentRes.isLiquidated ? 'rgba(244, 63, 94, 0.7)' : 'rgba(6, 182, 212, 0.7)';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);
  ctx.beginPath();
  ctx.moveTo(curX, pad.top);
  ctx.lineTo(curX, pad.top + plotH);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.shadowColor = currentRes.isLiquidated ? '#f43f5e' : '#06b6d4';
  ctx.shadowBlur = 12;
  ctx.fillStyle = currentRes.isLiquidated ? '#f43f5e' : '#22d3ee';
  ctx.beginPath();
  ctx.arc(curX, curY, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Tooltip Callout on Pin
  const badgeText = fmtUSD(currentRes.totalPortfolioVal);
  ctx.font = 'bold 10px "JetBrains Mono", monospace';
  const badgeW = ctx.measureText(badgeText).width + 12;
  const badgeH = 20;
  const badgeY = Math.max(pad.top + 8, curY - 26);
  const badgeX = Math.min(Math.max(pad.left + badgeW / 2, curX), pad.left + plotW - badgeW / 2);

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = currentRes.isLiquidated ? '#f43f5e' : '#06b6d4';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(badgeX - badgeW / 2, badgeY, badgeW, badgeH, 6);
  } else {
    ctx.rect(badgeX - badgeW / 2, badgeY, badgeW, badgeH);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = currentRes.isLiquidated ? '#fb7185' : '#38bdf8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX, badgeY + badgeH / 2);
}

export function setupChartInteractions(
  canvas: HTMLCanvasElement | null,
  tooltipEls: TooltipElements,
  getState: () => HedgingState
): void {
  if (!canvas || !tooltipEls.tooltip) return;

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const pad = { top: 25, right: 30, bottom: 45, left: 65 };
    const plotW = rect.width - pad.left - pad.right;

    if (mouseX < pad.left || mouseX > pad.left + plotW || mouseY < pad.top || mouseY > rect.height - pad.bottom) {
      tooltipEls.tooltip?.classList.add('hidden');
      return;
    }

    const currentState = getState();
    const xMax = currentState.priceMove > 100 ? Math.max(100, Math.ceil(currentState.priceMove / 50) * 50) : 100;
    const hoverPriceMove = -100 + ((mouseX - pad.left) / plotW) * (xMax - (-100));
    const res = calculateOutcome(hoverPriceMove, currentState);

    if (tooltipEls.tooltip) {
      tooltipEls.tooltip.classList.remove('hidden');
      tooltipEls.tooltip.style.left = `${Math.min(mouseX + 15, rect.width - 180)}px`;
      tooltipEls.tooltip.style.top = `${Math.max(mouseY - 75, 10)}px`;
    }

    if (tooltipEls.ttPrice) tooltipEls.ttPrice.textContent = `Price Move: ${fmtPct(hoverPriceMove)}`;
    if (tooltipEls.ttVal) tooltipEls.ttVal.textContent = `Portfolio: ${fmtUSD(res.totalPortfolioVal)}`;
    if (tooltipEls.ttRoi) tooltipEls.ttRoi.textContent = `ROI: ${fmtPct(res.roiPct)}`;
    if (tooltipEls.ttStatus) {
      tooltipEls.ttStatus.textContent = res.isLiquidated
        ? 'Status: 100% Unhedged Long'
        : (currentState.mode === 'unified' ? 'Status: Cross-Margin Protected' : 'Status: Isolated Hedged');
      tooltipEls.ttStatus.className = res.isLiquidated ? 'text-[10px] text-rose-400 font-bold' : 'text-[10px] text-cyan-400';
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltipEls.tooltip?.classList.add('hidden');
  });
}

