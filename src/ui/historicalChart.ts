/**
 * @file historicalChart.ts
 * @description HTML5 Canvas 2D multi-venue time-series chart engine for historical
 * funding rates, spot staking yields, and net carry spreads with crosshair tracking.
 */

import { type AssetHistoricalAnalytics, type HistoricalRatePoint, type FundingVenue } from '../services/marketData.js';

export interface HistoricalTooltipElements {
  container: HTMLElement | null;
  dateText: HTMLElement | null;
  binanceText: HTMLElement | null;
  hlText: HTMLElement | null;
  stakingText: HTMLElement | null;
  netCarryText: HTMLElement | null;
  divergenceText: HTMLElement | null;
}

const PAD = { top: 32, right: 28, bottom: 42, left: 58 };

export function drawHistoricalChart(
  canvas: HTMLCanvasElement | null,
  analytics: AssetHistoricalAnalytics | null,
  activeVenue: FundingVenue = 'average',
  hoverIndex: number | null = null
): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const context = ctx;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  context.resetTransform();
  context.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  // Clear & dark background
  context.clearRect(0, 0, W, H);
  context.fillStyle = '#080d1a';
  context.fillRect(0, 0, W, H);

  if (!analytics || !analytics.series || analytics.series.length === 0) {
    context.fillStyle = '#64748b';
    context.font = '12px "JetBrains Mono", monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Syncing historical market curves...', W / 2, H / 2);
    return;
  }

  const series = analytics.series;
  const count = series.length;
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // Compute min and max across all series
  let minVal = 0;
  let maxVal = 10;

  for (const pt of series) {
    minVal = Math.min(minVal, pt.binanceApr, pt.hyperliquidApr, pt.stakingApy, pt.netCarryApy);
    maxVal = Math.max(maxVal, pt.binanceApr, pt.hyperliquidApr, pt.stakingApy, pt.netCarryApy);
  }

  // Add 15% padding above and below
  const span = Math.max(5, maxVal - minVal);
  const yMin = Math.floor(minVal - span * 0.1);
  const yMax = Math.ceil(maxVal + span * 0.1);

  function toX(idx: number): number {
    if (count <= 1) return PAD.left + plotW / 2;
    return PAD.left + (idx / (count - 1)) * plotW;
  }

  function toY(val: number): number {
    return PAD.top + plotH - ((val - yMin) / (yMax - yMin)) * plotH;
  }

  // Plot background grid area
  context.fillStyle = '#0a101d';
  context.fillRect(PAD.left, PAD.top, plotW, plotH);

  // Y-axis grid ticks (5-6 intervals)
  const yTickCount = 5;
  context.strokeStyle = '#141e30';
  context.lineWidth = 1;
  context.fillStyle = '#64748b';
  context.font = '10px "JetBrains Mono", monospace';
  context.textAlign = 'right';
  context.textBaseline = 'middle';

  for (let i = 0; i <= yTickCount; i++) {
    const val = yMin + (i / yTickCount) * (yMax - yMin);
    const y = toY(val);
    context.beginPath();
    context.moveTo(PAD.left, y);
    context.lineTo(PAD.left + plotW, y);
    context.stroke();

    const label = (val > 0 ? '+' : '') + val.toFixed(1) + '%';
    context.fillText(label, PAD.left - 8, y);
  }

  // Highlighted 0.0% baseline
  if (yMin <= 0 && yMax >= 0) {
    const zeroY = toY(0);
    context.strokeStyle = '#334155';
    context.lineWidth = 1.5;
    context.setLineDash([4, 4]);
    context.beginPath();
    context.moveTo(PAD.left, zeroY);
    context.lineTo(PAD.left + plotW, zeroY);
    context.stroke();
    context.setLineDash([]);

    context.fillStyle = '#94a3b8';
    context.fillText('0.0%', PAD.left - 8, zeroY);
  }

  // X-axis date ticks (up to 6 ticks)
  const xTickCount = Math.min(6, count);
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillStyle = '#64748b';

  for (let i = 0; i < xTickCount; i++) {
    const idx = Math.round((i / (xTickCount - 1)) * (count - 1));
    const pt = series[idx];
    const x = toX(idx);

    context.beginPath();
    context.moveTo(x, PAD.top);
    context.lineTo(x, PAD.top + plotH);
    context.strokeStyle = '#141e30';
    context.stroke();

    // Short date format MM/DD
    const parts = pt.date.split('-');
    const label = parts.length === 3 ? `${parts[1]}/${parts[2]}` : pt.date;
    context.fillText(label, x, PAD.top + plotH + 8);
  }

  // Shaded Net Carry Area (between active funding and 0 or Net Carry curve)
  const netCarryGradient = context.createLinearGradient(0, PAD.top, 0, PAD.top + plotH);
  netCarryGradient.addColorStop(0, 'rgba(168, 85, 247, 0.20)');
  netCarryGradient.addColorStop(1, 'rgba(168, 85, 247, 0.01)');

  context.fillStyle = netCarryGradient;
  context.beginPath();
  context.moveTo(toX(0), toY(0));
  for (let i = 0; i < count; i++) {
    context.lineTo(toX(i), toY(series[i].netCarryApy));
  }
  context.lineTo(toX(count - 1), toY(0));
  context.closePath();
  context.fill();

  // Draw Curve Helper
  function drawCurve(
    color: string,
    width: number,
    getValue: (pt: HistoricalRatePoint) => number,
    dash: number[] = []
  ): void {
    context.save();
    context.strokeStyle = color;
    context.lineWidth = width;
    context.setLineDash(dash);
    context.beginPath();
    for (let i = 0; i < count; i++) {
      const x = toX(i);
      const y = toY(getValue(series[i]));
      if (i === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
    context.restore();
  }

  // Curve 1: Binance Annualized APR (#f59e0b amber)
  drawCurve('#f59e0b', activeVenue === 'binance' ? 2.5 : 1.5, pt => pt.binanceApr);

  // Curve 2: Hyperliquid Annualized APR (#06b6d4 cyan)
  drawCurve('#06b6d4', activeVenue === 'hyperliquid' ? 2.5 : 1.5, pt => pt.hyperliquidApr);

  // Curve 3: Staking APY (#10b981 emerald)
  drawCurve('#10b981', 2.0, pt => pt.stakingApy);

  // Curve 4: Net Carry APY (#a855f7 purple dashed)
  drawCurve('#a855f7', 1.8, pt => pt.netCarryApy, [4, 3]);

  // Legend at Top Left of Plot
  const legendItems = [
    { label: 'Binance APR', color: '#f59e0b' },
    { label: 'Hyperliquid APR', color: '#06b6d4' },
    { label: 'Spot Staking APY', color: '#10b981' },
    { label: 'Net Carry APY', color: '#a855f7' }
  ];

  context.font = '9px "JetBrains Mono", monospace';
  context.textBaseline = 'middle';
  context.textAlign = 'left';
  let legendX = PAD.left + 12;
  const legendY = PAD.top + 12;

  for (const item of legendItems) {
    context.fillStyle = item.color;
    context.fillRect(legendX, legendY - 3, 10, 3);
    legendX += 14;
    context.fillStyle = '#94a3b8';
    context.fillText(item.label, legendX, legendY - 1);
    legendX += context.measureText(item.label).width + 14;
  }

  // Hover Crosshair & Dots
  if (hoverIndex !== null && hoverIndex >= 0 && hoverIndex < count) {
    const pt = series[hoverIndex];
    const hoverX = toX(hoverIndex);

    // Vertical dashed tracking line
    context.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    context.lineWidth = 1;
    context.setLineDash([3, 3]);
    context.beginPath();
    context.moveTo(hoverX, PAD.top);
    context.lineTo(hoverX, PAD.top + plotH);
    context.stroke();
    context.setLineDash([]);

    // Dots on curves
    const dots = [
      { yVal: pt.binanceApr, color: '#f59e0b' },
      { yVal: pt.hyperliquidApr, color: '#06b6d4' },
      { yVal: pt.stakingApy, color: '#10b981' },
      { yVal: pt.netCarryApy, color: '#a855f7' }
    ];

    for (const dot of dots) {
      const dotY = toY(dot.yVal);
      context.fillStyle = dot.color;
      context.beginPath();
      context.arc(hoverX, dotY, 4, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = '#ffffff';
      context.beginPath();
      context.arc(hoverX, dotY, 1.5, 0, Math.PI * 2);
      context.fill();
    }
  }
}

export function setupHistoricalChartInteractions(
  canvas: HTMLCanvasElement | null,
  getSeries: () => HistoricalRatePoint[] | null,
  onHover: (point: HistoricalRatePoint | null, index: number | null, mouseX: number, mouseY: number) => void
): void {
  if (!canvas) return;

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const series = getSeries();
    if (!series || series.length === 0) {
      onHover(null, null, 0, 0);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const plotW = rect.width - PAD.left - PAD.right;

    if (mouseX < PAD.left || mouseX > PAD.left + plotW || mouseY < PAD.top || mouseY > rect.height - PAD.bottom) {
      onHover(null, null, 0, 0);
      return;
    }

    const ratio = Math.max(0, Math.min(1, (mouseX - PAD.left) / plotW));
    const idx = Math.round(ratio * (series.length - 1));
    const pt = series[idx];

    onHover(pt, idx, mouseX, mouseY);
  });

  canvas.addEventListener('mouseleave', () => {
    onHover(null, null, 0, 0);
  });
}

const SUB_PAD = { top: 16, right: 28, bottom: 18, left: 58 };

export function drawHistoricalSubChart(
  canvas: HTMLCanvasElement | null,
  analytics: AssetHistoricalAnalytics | null,
  hoverIndex: number | null = null
): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const context = ctx;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  context.resetTransform();
  context.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  // Clear & dark background
  context.clearRect(0, 0, W, H);
  context.fillStyle = '#080d1a';
  context.fillRect(0, 0, W, H);

  if (!analytics || !analytics.series || analytics.series.length === 0) {
    return;
  }

  // If Native BTC (zero LST basis risk)
  if (analytics.symbol === 'BTC') {
    context.fillStyle = '#64748b';
    context.font = '11px "JetBrains Mono", monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Vanilla Spot Collateral — 0.00% Structural Basis Risk', W / 2, H / 2);
    return;
  }

  const series = analytics.series;
  const count = series.length;
  const plotW = W - SUB_PAD.left - SUB_PAD.right;
  const plotH = H - SUB_PAD.top - SUB_PAD.bottom;

  let maxVal = 0.15;
  for (const pt of series) {
    if (pt.lstDiscountPct > maxVal) maxVal = pt.lstDiscountPct;
  }
  const yMin = 0.0;
  const yMax = parseFloat((maxVal * 1.25).toFixed(2));

  function toX(idx: number): number {
    if (count <= 1) return SUB_PAD.left + plotW / 2;
    return SUB_PAD.left + (idx / (count - 1)) * plotW;
  }

  function toY(val: number): number {
    return SUB_PAD.top + plotH - ((val - yMin) / (yMax - yMin)) * plotH;
  }

  // Plot background grid area
  context.fillStyle = '#0a101d';
  context.fillRect(SUB_PAD.left, SUB_PAD.top, plotW, plotH);

  // 3 Y-axis ticks
  context.strokeStyle = '#141e30';
  context.lineWidth = 1;
  context.fillStyle = '#64748b';
  context.font = '9px "JetBrains Mono", monospace';
  context.textAlign = 'right';
  context.textBaseline = 'middle';

  const ticks = [0.0, yMax / 2, yMax];
  for (const val of ticks) {
    const y = toY(val);
    context.beginPath();
    context.moveTo(SUB_PAD.left, y);
    context.lineTo(SUB_PAD.left + plotW, y);
    context.stroke();
    context.fillText(val.toFixed(2) + '%', SUB_PAD.left - 6, y);
  }

  // Shaded area
  const gradient = context.createLinearGradient(0, SUB_PAD.top, 0, SUB_PAD.top + plotH);
  gradient.addColorStop(0, 'rgba(244, 63, 94, 0.28)');
  gradient.addColorStop(1, 'rgba(244, 63, 94, 0.02)');

  context.fillStyle = gradient;
  context.beginPath();
  context.moveTo(toX(0), toY(0));
  for (let i = 0; i < count; i++) {
    context.lineTo(toX(i), toY(series[i].lstDiscountPct));
  }
  context.lineTo(toX(count - 1), toY(0));
  context.closePath();
  context.fill();

  // Draw curve
  context.strokeStyle = '#f43f5e'; // Rose-500
  context.lineWidth = 1.8;
  context.beginPath();
  for (let i = 0; i < count; i++) {
    const x = toX(i);
    const y = toY(series[i].lstDiscountPct);
    if (i === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.stroke();

  // Label at top left of plot
  context.font = '9px "JetBrains Mono", monospace';
  context.fillStyle = '#f43f5e';
  context.textAlign = 'left';
  context.textBaseline = 'top';
  context.fillText('LST Basis Discount %', SUB_PAD.left + 8, SUB_PAD.top - 14);

  // Hover crosshair and dot
  if (hoverIndex !== null && hoverIndex >= 0 && hoverIndex < count) {
    const hoverX = toX(hoverIndex);
    const pt = series[hoverIndex];

    context.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    context.lineWidth = 1;
    context.setLineDash([3, 3]);
    context.beginPath();
    context.moveTo(hoverX, SUB_PAD.top);
    context.lineTo(hoverX, SUB_PAD.top + plotH);
    context.stroke();
    context.setLineDash([]);

    const dotY = toY(pt.lstDiscountPct);
    context.fillStyle = '#f43f5e';
    context.beginPath();
    context.arc(hoverX, dotY, 4, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(hoverX, dotY, 1.5, 0, Math.PI * 2);
    context.fill();
  }
}
