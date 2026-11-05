/**
 * @file crisisTrajectoryRenderer.ts
 * @description High-performance HTML5 Canvas 2D rendering engine for mark-to-market
 * cumulative equity trajectories across institutional crisis and stress scenarios.
 * Visualizes dynamic day-by-day path evolution [0..T], path-dependent liquidation thresholds,
 * entry reference baselines, and interactive high-precision hover telemetry.
 */

import type { CrisisSimulationResult, CrisisSimulationStep } from '../../math/hedging.js';

export interface TrajectoryRenderOptions {
  accentColor?: 'rose' | 'amber' | 'cyan' | 'indigo' | 'purple' | string;
  showLiquidationBeacon?: boolean;
  width?: number;
  height?: number;
  hoverDay?: number | null;
}

/**
 * Resolves color string or theme token into a concrete CSS color string.
 */
function resolveAccentColor(accent?: string, isProfitable = true): string {
  if (accent) {
    switch (accent) {
      case 'rose':
        return '#f43f5e';
      case 'amber':
        return '#f59e0b';
      case 'cyan':
        return '#06b6d4';
      case 'indigo':
        return '#6366f1';
      case 'purple':
        return '#a855f7';
      default:
        return accent;
    }
  }
  return isProfitable ? '#10b981' : '#f43f5e';
}

/**
 * Converts a hex or rgb string into an rgba() string with custom opacity.
 */
function toRgba(color: string, alpha: number): string {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  if (color.startsWith('rgba(')) {
    return color.replace(/[\d\.]+\)$/, `${alpha})`);
  }
  return `rgba(6, 182, 212, ${alpha})`;
}

/**
 * Helper to get the canonical trajectory ensuring Day 0 baseline is present.
 */
function getNormalizedTrajectory(result: CrisisSimulationResult, initialC: number): CrisisSimulationStep[] {
  const raw = result.dailyTrajectory || [];
  if (raw.length === 0) return [];
  if (raw[0].day === 0) return raw;

  return [
    {
      day: 0,
      dateStr: 'Entry Base',
      priceShockPct: 0,
      spotPrice: raw[0].spotPrice,
      fundingAPR: raw[0].fundingAPR,
      depegPct: 0,
      equity: initialC,
      marginRatio: 0,
      isLiquidated: false,
      fundingAccrued: 0,
      stakingAccrued: 0
    },
    ...raw
  ];
}

/**
 * Draws the high-fidelity mark-to-market crisis equity trajectory on an HTML5 canvas.
 */
export function drawCrisisTrajectory(
  canvas: HTMLCanvasElement | null,
  result: CrisisSimulationResult | null,
  options?: TrajectoryRenderOptions
): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
  const W = rect.width > 0 ? rect.width : (options?.width || canvas.width || 400);
  const H = rect.height > 0 ? rect.height : (options?.height || canvas.height || 112);

  // Resize canvas backing store with DPR scaling
  const pixelWidth = Math.round(W * dpr);
  const pixelHeight = Math.round(H * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  if (typeof ctx.resetTransform === 'function') {
    ctx.resetTransform();
  } else {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  ctx.scale(dpr, dpr);

  // 1. Terminal Canvas Background
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#080d1a';
  ctx.fillRect(0, 0, W, H);

  // Guard against missing simulation data
  if (!result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) {
    ctx.fillStyle = '#64748b';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('No crisis trajectory data available.', W / 2, H / 2);
    return;
  }

  // Layout padding
  const pad = {
    top: H < 140 ? 14 : 20,
    right: 20,
    bottom: H < 140 ? 22 : 30,
    left: H < 140 ? 54 : 64
  };
  const plotW = Math.max(10, W - pad.left - pad.right);
  const plotH = Math.max(10, H - pad.top - pad.bottom);

  // Determine initial capital C
  const C = (result as unknown as { initialCapital?: number }).initialCapital ??
    (result as unknown as { C?: number }).C ??
    (result.dailyTrajectory.length > 0 ? result.dailyTrajectory[0].equity : (result.terminalEquity - result.netPnL)) ??
    10000;

  const trajectory = getNormalizedTrajectory(result, C);

  // Determine equity boundaries: scale from min(equity) * 0.95 to max(equity) * 1.05
  let minEquity = C;
  let maxEquity = C;
  for (const step of trajectory) {
    if (typeof step.equity === 'number' && !isNaN(step.equity)) {
      if (step.equity < minEquity) minEquity = step.equity;
      if (step.equity > maxEquity) maxEquity = step.equity;
    }
  }

  let yMin = minEquity * 0.95;
  let yMax = maxEquity * 1.05;
  if (yMax <= yMin) {
    yMax = yMin + 500;
  }
  const ySpan = yMax - yMin;
  const horizon = Math.max(1, result.horizonDays);

  function toCanvasX(day: number): number {
    return pad.left + (Math.max(0, Math.min(horizon, day)) / horizon) * plotW;
  }

  function toCanvasY(equityVal: number): number {
    return pad.top + plotH - ((equityVal - yMin) / ySpan) * plotH;
  }

  // 2. Horizontal Grid Lines with USD labels
  const yTickCount = H < 140 ? 3 : 4;
  ctx.strokeStyle = '#162238';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let i = 0; i <= yTickCount; i++) {
    const val = yMin + (i / yTickCount) * ySpan;
    const y = toCanvasY(val);

    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();

    const formattedUsd = '$' + Math.round(val).toLocaleString('en-US');
    ctx.fillText(formattedUsd, pad.left - 6, y);
  }

  // 3. Vertical Day Grid Lines
  let dayStep = 7;
  if (horizon <= 7) dayStep = 1;
  else if (horizon <= 14) dayStep = 2;
  else if (horizon <= 35) dayStep = 7;
  else if (horizon <= 70) dayStep = 14;
  else dayStep = 30;

  const dayTicks: number[] = [0];
  for (let d = dayStep; d < horizon; d += dayStep) {
    dayTicks.push(d);
  }
  if (!dayTicks.includes(horizon)) {
    dayTicks.push(horizon);
  }

  ctx.strokeStyle = '#141d30';
  ctx.fillStyle = '#64748b';
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (const d of dayTicks) {
    const x = toCanvasX(d);
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + plotH);
    ctx.stroke();

    ctx.fillText(`D${d}`, x, pad.top + plotH + 5);
  }

  // 4. Entry Capital Reference Line (y = C) as dashed slate line (#475569)
  const yEntry = toCanvasY(C);
  if (yEntry >= pad.top && yEntry <= pad.top + plotH) {
    ctx.save();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, yEntry);
    ctx.lineTo(pad.left + plotW, yEntry);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`ENTRY BASE: $${Math.round(C).toLocaleString('en-US')}`, pad.left + 4, yEntry - 2);
    ctx.restore();
  }

  // 5. Daily Equity Points Mapping
  const pts = trajectory.map((step: CrisisSimulationStep) => ({
    x: toCanvasX(step.day),
    y: toCanvasY(step.equity),
    day: step.day,
    equity: step.equity,
    isLiquidated: step.isLiquidated
  }));

  // Resolve Line & Fill Accent Color
  const finalEquity = result.terminalEquity ?? (pts[pts.length - 1]?.equity ?? C);
  const isProfitable = finalEquity >= C;
  const strokeColor = resolveAccentColor(options?.accentColor, isProfitable);

  if (pts.length > 0) {
    // 6. Subtle Semi-Transparent Gradient Fill under Equity Curve to Bottom
    const fillGradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    fillGradient.addColorStop(0, toRgba(strokeColor, 0.22));
    fillGradient.addColorStop(1, toRgba(strokeColor, 0.01));

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.top + plotH);
    ctx.lineTo(pts[0].x, pts[0].y);

    if (pts.length === 1) {
      ctx.lineTo(pad.left + plotW, pts[0].y);
      ctx.lineTo(pad.left + plotW, pad.top + plotH);
    } else {
      // Smooth Catmull-Rom to Cubic Bezier curve path
      for (let i = 0; i < pts.length - 1; i++) {
        const pPrev = pts[Math.max(0, i - 1)];
        const pCurr = pts[i];
        const pNext = pts[i + 1];
        const pAfter = pts[Math.min(pts.length - 1, i + 2)];

        const cp1x = pCurr.x + (pNext.x - pPrev.x) / 6;
        const cp1y = pCurr.y + (pNext.y - pPrev.y) / 6;
        const cp2x = pNext.x - (pAfter.x - pCurr.x) / 6;
        const cp2y = pNext.y - (pAfter.y - pCurr.y) / 6;

        if (typeof ctx.bezierCurveTo === 'function') {
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pNext.x, pNext.y);
        } else {
          ctx.lineTo(pNext.x, pNext.y);
        }
      }
      ctx.lineTo(pts[pts.length - 1].x, pad.top + plotH);
    }

    ctx.closePath();
    ctx.fillStyle = fillGradient;
    ctx.fill();
    ctx.restore();

    // 7. Daily Equity Line Path (Smooth Stroke)
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);

    if (pts.length === 1) {
      ctx.lineTo(pad.left + plotW, pts[0].y);
    } else {
      for (let i = 0; i < pts.length - 1; i++) {
        const pPrev = pts[Math.max(0, i - 1)];
        const pCurr = pts[i];
        const pNext = pts[i + 1];
        const pAfter = pts[Math.min(pts.length - 1, i + 2)];

        const cp1x = pCurr.x + (pNext.x - pPrev.x) / 6;
        const cp1y = pCurr.y + (pNext.y - pPrev.y) / 6;
        const cp2x = pNext.x - (pAfter.x - pCurr.x) / 6;
        const cp2y = pNext.y - (pAfter.y - pCurr.y) / 6;

        if (typeof ctx.bezierCurveTo === 'function') {
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pNext.x, pNext.y);
        } else {
          ctx.lineTo(pNext.x, pNext.y);
        }
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  // 8. Liquidation Beacon, Vertical Line & Crisp Badge
  const showBeacon = options?.showLiquidationBeacon !== false;
  if (result.isLiquidated && result.tLiq !== null && showBeacon) {
    const liqDay = result.tLiq;
    const liqX = toCanvasX(liqDay);

    // Find equity at liquidation day
    const liqStep = trajectory.find((s: CrisisSimulationStep) => s.day === liqDay) ??
      trajectory[Math.min(liqDay, trajectory.length - 1)];
    const liqEquity = liqStep ? liqStep.equity : C;
    const liqY = toCanvasY(liqEquity);

    // Vertical red dashed line (#f43f5e)
    ctx.save();
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(liqX, pad.top);
    ctx.lineTo(liqX, pad.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Red beacon circle with subtle multi-layer halo
    ctx.save();
    ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
    ctx.beginPath();
    ctx.arc(liqX, liqY, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(liqX, liqY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(liqX, liqY, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Crisp badge label: LIQUIDATED Day ${result.tLiq}
    ctx.save();
    const badgeText = `LIQUIDATED Day ${result.tLiq}`;
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    const textMetrics = ctx.measureText(badgeText);
    const badgeW = textMetrics.width + 12;
    const badgeH = 18;

    let badgeY = liqY - 24;
    if (badgeY < pad.top + 2) {
      badgeY = liqY + 8;
    }

    let badgeX = liqX;
    if (badgeX - badgeW / 2 < pad.left + 2) {
      badgeX = pad.left + 2 + badgeW / 2;
    } else if (badgeX + badgeW / 2 > pad.left + plotW - 2) {
      badgeX = pad.left + plotW - 2 - badgeW / 2;
    }

    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(badgeX - badgeW / 2, badgeY, badgeW, badgeH, 4);
    } else {
      ctx.rect(badgeX - badgeW / 2, badgeY, badgeW, badgeH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fb7185';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX, badgeY + badgeH / 2);
    ctx.restore();
  }

  // 9. Optional Hover Crosshair Pin (if hoverDay passed in options)
  if (typeof options?.hoverDay === 'number') {
    const hDay = options.hoverDay;
    const hStep = trajectory.find((s: CrisisSimulationStep) => s.day === hDay) ??
      trajectory[Math.min(hDay, trajectory.length - 1)];
    if (hStep) {
      const hX = toCanvasX(hStep.day);
      const hY = toCanvasY(hStep.equity);

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(hX, pad.top);
      ctx.lineTo(hX, pad.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(hX, hY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

/**
 * Binds mouse interactions to an interactive floating hover tooltip for the trajectory canvas.
 * Returns a cleanup function to detach event listeners.
 */
export function bindTrajectoryTooltip(
  canvas: HTMLCanvasElement | null,
  tooltipEl: HTMLElement | null,
  getResult: () => CrisisSimulationResult | null
): () => void {
  if (!canvas) return () => {};

  let activeTooltipEl = tooltipEl;
  let createdTooltip = false;

  // Fallback: If tooltip element is not provided, attach an institutional HUD inside canvas parent
  if (!activeTooltipEl && canvas.parentElement) {
    let existing = canvas.parentElement.querySelector<HTMLElement>('.crisis-trajectory-tooltip');
    if (!existing) {
      existing = document.createElement('div');
      existing.className = 'crisis-trajectory-tooltip absolute pointer-events-none hidden bg-slate-900/95 border border-cyan-500/60 rounded-xl p-2.5 shadow-2xl backdrop-blur-md text-[11px] font-mono space-y-1 z-30 transition-opacity';
      canvas.parentElement.style.position = 'relative';
      canvas.parentElement.appendChild(existing);
      createdTooltip = true;
    }
    activeTooltipEl = existing;
  }

  const onMouseMove = (e: MouseEvent) => {
    const result = getResult();
    if (!result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) {
      if (activeTooltipEl) activeTooltipEl.classList.add('hidden');
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const W = rect.width || canvas.width || 400;
    const H = rect.height || canvas.height || 112;
    const pad = {
      top: H < 140 ? 14 : 20,
      right: 20,
      bottom: H < 140 ? 22 : 30,
      left: H < 140 ? 54 : 64
    };
    const plotW = Math.max(1, W - pad.left - pad.right);
    const plotH = Math.max(1, H - pad.top - pad.bottom);

    // Check boundary
    if (mouseX < pad.left - 4 || mouseX > pad.left + plotW + 4 || mouseY < pad.top - 4 || mouseY > pad.top + plotH + 4) {
      if (activeTooltipEl) activeTooltipEl.classList.add('hidden');
      return;
    }

    const horizon = Math.max(1, result.horizonDays);
    const ratio = Math.max(0, Math.min(1, (mouseX - pad.left) / plotW));
    const hoverDay = ratio * horizon;

    // Determine C
    const C = (result as unknown as { initialCapital?: number }).initialCapital ??
      (result as unknown as { C?: number }).C ??
      (result.dailyTrajectory.length > 0 ? result.dailyTrajectory[0].equity : (result.terminalEquity - result.netPnL)) ??
      10000;

    const trajectory = getNormalizedTrajectory(result, C);

    // Find nearest step in normalized trajectory
    let nearestStep: CrisisSimulationStep = trajectory[0];
    let minDiff = Math.abs(nearestStep.day - hoverDay);
    for (let i = 1; i < trajectory.length; i++) {
      const step = trajectory[i];
      const diff = Math.abs(step.day - hoverDay);
      if (diff < minDiff) {
        minDiff = diff;
        nearestStep = step;
      }
    }

    if (!activeTooltipEl) return;

    const dayTitle = `Day ${nearestStep.day}${nearestStep.dateStr ? ' • ' + nearestStep.dateStr : ''}`;
    const spotSign = nearestStep.priceShockPct >= 0 ? '+' : '';
    const spotChange = `Spot: ${spotSign}${nearestStep.priceShockPct.toFixed(1)}%`;
    const equityText = `Equity: $${nearestStep.equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const fundingText = `Funding: $${nearestStep.fundingAccrued.toFixed(2)}`;
    const statusText = `Status: ${nearestStep.isLiquidated ? 'LIQUIDATED' : 'SOLVENT'}`;

    // Target child elements if present, otherwise inject structured HTML
    const elDay = activeTooltipEl.querySelector('#crisis-tt-day');
    const elSpot = activeTooltipEl.querySelector('#crisis-tt-spot');
    const elEquity = activeTooltipEl.querySelector('#crisis-tt-equity');
    const elFunding = activeTooltipEl.querySelector('#crisis-tt-funding');
    const elStatus = activeTooltipEl.querySelector('#crisis-tt-status');

    if (elDay && elSpot && elEquity && elFunding && elStatus) {
      elDay.textContent = dayTitle;
      elSpot.textContent = spotChange;
      elEquity.textContent = equityText;
      elFunding.textContent = fundingText;
      elStatus.textContent = statusText;
    } else {
      const statusColor = nearestStep.isLiquidated ? 'text-rose-400 font-bold' : 'text-emerald-400';
      const spotColor = nearestStep.priceShockPct >= 0 ? 'text-emerald-400' : 'text-rose-400';
      activeTooltipEl.innerHTML = `
        <div class="text-slate-300 font-semibold border-b border-slate-700/80 pb-1">${dayTitle}</div>
        <div class="${spotColor} text-[10px]">${spotChange}</div>
        <div class="text-white font-bold">${equityText}</div>
        <div class="text-cyan-300 text-[10px]">${fundingText}</div>
        <div class="${statusColor} text-[10px] uppercase">${statusText}</div>
      `;
    }

    activeTooltipEl.classList.remove('hidden');

    // Clamped floating positioning
    const tooltipW = activeTooltipEl.offsetWidth || 150;
    const tooltipH = activeTooltipEl.offsetHeight || 90;
    let left = mouseX + 12;
    if (left + tooltipW > rect.width - 8) {
      left = mouseX - tooltipW - 12;
    }
    let top = mouseY - 45;
    if (top + tooltipH > rect.height - 8) {
      top = rect.height - tooltipH - 8;
    }
    if (top < 8) top = 8;

    activeTooltipEl.style.left = `${Math.max(4, Math.round(left))}px`;
    activeTooltipEl.style.top = `${Math.max(4, Math.round(top))}px`;
  };

  const onMouseLeave = () => {
    if (activeTooltipEl) {
      activeTooltipEl.classList.add('hidden');
    }
  };

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);

  return () => {
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseleave', onMouseLeave);
    if (createdTooltip && activeTooltipEl && activeTooltipEl.parentElement) {
      activeTooltipEl.parentElement.removeChild(activeTooltipEl);
    }
  };
}
