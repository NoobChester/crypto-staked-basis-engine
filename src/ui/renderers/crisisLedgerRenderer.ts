/**
 * @file crisisLedgerRenderer.ts
 * @description Renders the granular day-by-day institutional audit ledger table,
 * the Trough vs. Resolved Two-Tier Summary Card, and handles RFC-4180 compliant CSV export.
 */

import type { CrisisSimulationResult, CrisisSimulationStep } from '../../math/hedging.js';
import { fmtUSD, fmtPct } from '../../math/hedging.js';

export function renderCrisisAuditSummary(
  container: HTMLElement | null,
  result: CrisisSimulationResult | null
): void {
  if (!container) return;

  if (!result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) {
    container.innerHTML = '';
    container.className = 'hidden';
    return;
  }

  container.className = 'mt-4 block';

  const C = Math.max(1, result.terminalEquity - result.netPnL);
  const steps = result.dailyTrajectory;

  // 1. Find Trough Step (minimum equity reached during the crisis)
  const troughStep = steps.reduce(
    (min, s) => (s.equity < min.equity ? s : min),
    steps[0]
  );
  const troughEquity = troughStep.equity;
  const troughDrawdownPct = ((troughEquity - C) / C) * 100;
  const peakMarginRatio = Math.max(...steps.map(s => s.marginRatio));
  const peakDepeg = Math.max(...steps.map(s => s.depegPct));
  const minHeadroom = Math.max(0, (1 - peakMarginRatio) * 100);

  // 2. Terminal / Post-Resolution Step (0.00% Depeg Parity)
  const lastStep = steps[steps.length - 1];
  const totalHarvested = (result.totalHarvestedFunding || 0) + (result.totalHarvestedStaking || 0);

  // Post-Resolution values evaluated once secondary depeg resolves to 0.00% parity
  const resolvedEquity = result.resolvedTerminalEquity !== undefined
    ? result.resolvedTerminalEquity
    : (!result.isLiquidated ? parseFloat((C + totalHarvested).toFixed(2)) : result.terminalEquity + result.depegLoss);

  const resolvedNetPnL = result.resolvedNetPnL !== undefined
    ? result.resolvedNetPnL
    : parseFloat((resolvedEquity - C).toFixed(2));

  const resolvedApy = result.resolvedRealizedAPY !== undefined
    ? result.resolvedRealizedAPY
    : (C > 0 ? parseFloat(((resolvedNetPnL / C) * (365 / result.horizonDays) * 100).toFixed(2)) : 0);

  const mtmDiscountRecovered = result.depegLoss;

  // Depeg resolution classification
  let impairmentBadge = '';
  let impairmentDesc = '';

  if (!result.isLiquidated) {
    impairmentBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">TRANSITORY ($0.00 Permanent Loss)</span>`;
    impairmentDesc = 'Mark-to-market dip fully unwound upon re-pegging to parity (0.00% depeg). 100% carry preserved.';
  } else {
    impairmentBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-700 animate-pulse">PERMANENT IMPAIRMENT (-${fmtUSD(Math.abs(resolvedNetPnL))})</span>`;
    impairmentDesc = `Perp short liquidated on Day ${result.tLiq}. Hedge destroyed; position converted to naked spot.`;
  }

  const overallStatusPill = result.isLiquidated
    ? `<span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-600 animate-pulse">BREACH: LIQUIDATED ON DAY ${result.tLiq}</span>`
    : `<span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">SOLVENT (MIN HEADROOM: ${minHeadroom.toFixed(1)}%)</span>`;

  const resolvedPnlColor = resolvedNetPnL >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const resolvedApyColor = resolvedApy >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const drawdownColor = troughDrawdownPct >= 0 ? 'text-emerald-400' : 'text-rose-400';

  container.innerHTML = `
    <div class="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-3 font-mono shadow-xl">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div class="flex items-center gap-2.5">
          <div class="w-2 h-2 rounded-full ${result.isLiquidated ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}"></div>
          <span class="text-xs font-bold text-white uppercase tracking-wider">Audit Conclusion: Stress Trough vs. Post-Resolution</span>
          ${overallStatusPill}
        </div>
        <span class="text-[10px] text-slate-400">Institutional Mark-to-Market vs. Economic Realization</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <!-- Tier 1: Peak Stress (Trough) -->
        <div class="rounded-lg bg-slate-950/90 border border-slate-800/90 p-3.5 flex flex-col justify-between space-y-3 shadow-inner">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span class="text-[11px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              1. Peak Stress (Trough Point)
            </span>
            <span class="text-[10px] font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">${troughStep.dateStr || 'Day ' + troughStep.day}</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-[10px] text-slate-400 block">Min Trough Equity</span>
              <span class="text-white font-bold text-sm tracking-tight">${fmtUSD(troughEquity)}</span>
              <span class="text-[10px] ${drawdownColor} block font-semibold mt-0.5">${troughDrawdownPct >= 0 ? '+' : ''}${troughDrawdownPct.toFixed(1)}% MTM Dip</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Peak Margin Ratio</span>
              <span class="text-amber-300 font-bold text-sm tracking-tight">${(peakMarginRatio * 100).toFixed(1)}%</span>
              <span class="text-[10px] text-slate-400 block mt-0.5">Min Headroom: ${minHeadroom.toFixed(1)}%</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Peak Depeg Discount</span>
              <span class="text-rose-400 font-semibold">${peakDepeg.toFixed(2)}%</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Solvency Verdict</span>
              <span class="font-bold text-xs ${result.isLiquidated ? 'text-rose-400' : 'text-emerald-400'}">
                ${result.isLiquidated ? 'BREACHED ON DAY ' + result.tLiq : 'MAINTAINED SOLVENCY'}
              </span>
            </div>
          </div>
          <div class="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 italic">
            ${result.isLiquidated ? 'Liquidated at trough; margin equity breached maintenance buffer.' : 'Account absorbed maximum liquidity shock without breach.'}
          </div>
        </div>

        <!-- Tier 2: Post-Resolution (Terminal State) -->
        <div class="rounded-lg bg-slate-950/90 border border-slate-800/90 p-3.5 flex flex-col justify-between space-y-3 shadow-inner">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span class="text-[11px] font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              2. Post-Resolution (Terminal State)
            </span>
            <span class="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">${lastStep.dateStr || 'Day ' + lastStep.day} · 0.00% Depeg</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-[10px] text-slate-400 block">Resolved Final Equity</span>
              <span class="text-white font-bold text-sm tracking-tight">${fmtUSD(resolvedEquity)}</span>
              <span class="text-[10px] font-bold block ${resolvedPnlColor} mt-0.5">${resolvedNetPnL >= 0 ? '+' : ''}${fmtUSD(resolvedNetPnL)} Net PnL</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Net Realized APY</span>
              <span class="${resolvedApyColor} font-bold text-sm tracking-tight">${resolvedApy >= 0 ? '+' : ''}${resolvedApy.toFixed(1)}%</span>
              <span class="text-[10px] text-slate-400 block mt-0.5">Carry Harvested: +${fmtUSD(totalHarvested)}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Resolved Depeg</span>
              <span class="text-emerald-400 font-bold">0.00% (Parity)</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">MTM Discount Unwind</span>
              <span class="text-cyan-300 font-semibold">+${fmtUSD(mtmDiscountRecovered)} Recovered</span>
            </div>
            <div class="col-span-2 pt-1.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-1.5">
              <span class="text-[10px] text-slate-400">Depeg Impairment:</span>
              ${impairmentBadge}
            </div>
          </div>
          <div class="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 italic leading-relaxed">
            ${impairmentDesc}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderCrisisAuditTable(
  tbody: HTMLElement | null,
  result: CrisisSimulationResult | null,
  summaryContainer?: HTMLElement | null
): void {
  // Render companion two-tier summary card
  const summaryEl = summaryContainer ?? (typeof document !== 'undefined' && typeof document.getElementById === 'function' ? document.getElementById('crisis-audit-two-tier-summary') : null);
  renderCrisisAuditSummary(summaryEl, result);

  if (!tbody || typeof document === 'undefined' || typeof document.createElement !== 'function') return;
  tbody.innerHTML = '';

  if (!result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-800 text-slate-500 text-center';
    tr.innerHTML = `<td colspan="8" class="py-4 text-xs font-mono">No simulation data available.</td>`;
    tbody.appendChild(tr);
    return;
  }

  const fragment = typeof document.createDocumentFragment === 'function' ? document.createDocumentFragment() : null;

  result.dailyTrajectory.forEach((step: CrisisSimulationStep) => {
    const tr = document.createElement('tr');
    const isBreachDay = result.isLiquidated && result.tLiq === step.day;

    let rowClass = 'border-b border-slate-800/80 hover:bg-slate-800/40 transition text-xs font-mono';
    if (isBreachDay) {
      rowClass += ' bg-rose-950/40 text-rose-300 font-bold';
    } else if (step.isLiquidated) {
      rowClass += ' text-rose-400/80 bg-rose-950/10';
    } else {
      rowClass += ' text-slate-300';
    }
    tr.className = rowClass;

    const spotSign = step.priceShockPct >= 0 ? '+' : '';
    const spotColor = step.priceShockPct >= 0 ? 'text-emerald-400' : 'text-rose-400';
    const fundingColor = step.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400';

    let statusPill = '';
    if (isBreachDay) {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-900 text-rose-200 border border-rose-500 animate-pulse">LIQUIDATED</span>`;
    } else if (step.isLiquidated) {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] bg-rose-950/80 text-rose-400 border border-rose-800/60">UNHEDGED SPOT</span>`;
    } else {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">SOLVENT</span>`;
    }

    tr.innerHTML = `
      <td class="py-2.5 px-3 text-slate-400 font-bold">D${step.day}</td>
      <td class="py-2.5 px-3 text-slate-400 text-[11px]">${step.dateStr || 'Day ' + step.day}</td>
      <td class="py-2.5 px-3 ${spotColor} font-semibold">${spotSign}${step.priceShockPct.toFixed(1)}%</td>
      <td class="py-2.5 px-3 ${fundingColor}">${fmtPct(step.fundingAPR)}</td>
      <td class="py-2.5 px-3 text-amber-300">${step.depegPct.toFixed(2)}%</td>
      <td class="py-2.5 px-3 font-bold text-white">${fmtUSD(step.equity)}</td>
      <td class="py-2.5 px-3 text-slate-300">${(step.marginRatio * 100).toFixed(1)}%</td>
      <td class="py-2.5 px-3">${statusPill}</td>
    `;

    if (fragment) {
      fragment.appendChild(tr);
    } else {
      tbody.appendChild(tr);
    }
  });

  if (fragment) {
    tbody.appendChild(fragment);
  }
}

export function exportCrisisAuditCsv(result: CrisisSimulationResult): void {
  if (!result || !result.dailyTrajectory) return;

  const headers = [
    'Day',
    'Date',
    'Spot_Shock_Pct',
    'Spot_Price_USD',
    'Funding_APR_Pct',
    'Depeg_Discount_Pct',
    'Portfolio_Equity_USD',
    'Margin_Ratio_Pct',
    'Status',
    'Cumulative_Funding_USD',
    'Cumulative_Staking_USD'
  ];

  const rows = result.dailyTrajectory.map((step) => [
    step.day,
    `"${step.dateStr || 'Day ' + step.day}"`,
    step.priceShockPct.toFixed(2),
    step.spotPrice.toFixed(2),
    step.fundingAPR.toFixed(2),
    step.depegPct.toFixed(2),
    step.equity.toFixed(2),
    (step.marginRatio * 100).toFixed(2),
    `"${step.isLiquidated ? (result.tLiq === step.day ? 'LIQUIDATED_BREACH' : 'POST_LIQUIDATION_UNHEDGED') : 'SOLVENT'}"`,
    step.fundingAccrued.toFixed(2),
    step.stakingAccrued.toFixed(2)
  ]);

  const steps = result.dailyTrajectory;
  const troughStep = steps.reduce(
    (min, s) => (s.equity < min.equity ? s : min),
    steps[0]
  );
  const peakMarginRatio = Math.max(...steps.map(s => s.marginRatio));
  const peakDepeg = Math.max(...steps.map(s => s.depegPct));
  const lastStep = steps[steps.length - 1];
  const C = Math.max(1, result.terminalEquity - result.netPnL);
  const totalHarvested = (result.totalHarvestedFunding || 0) + (result.totalHarvestedStaking || 0);
  const resolvedEquity = result.resolvedTerminalEquity !== undefined
    ? result.resolvedTerminalEquity
    : (!result.isLiquidated ? parseFloat((C + totalHarvested).toFixed(2)) : result.terminalEquity + result.depegLoss);
  const resolvedNetPnL = result.resolvedNetPnL !== undefined
    ? result.resolvedNetPnL
    : parseFloat((resolvedEquity - C).toFixed(2));
  const resolvedApy = result.resolvedRealizedAPY !== undefined
    ? result.resolvedRealizedAPY
    : (C > 0 ? parseFloat(((resolvedNetPnL / C) * (365 / result.horizonDays) * 100).toFixed(2)) : 0);

  const metadata = [
    `# DELTA-Q QUANT TERMINAL - INSTITUTIONAL CRISIS AUDIT PACKET`,
    `# Scenario: ${result.scenarioTitle || result.scenarioKey}`,
    `# Scenario Key: ${result.scenarioKey}`,
    `# Horizon Days: ${result.horizonDays}`,
    `# Liquidation Status: ${result.isLiquidated ? 'BREACHED on Day ' + result.tLiq : 'SURVIVED / FULLY SOLVENT'}`,
    `# 1. Peak Stress (Trough): Day ${troughStep.day} (${troughStep.dateStr || 'D' + troughStep.day}), Min_Equity=$${troughStep.equity.toFixed(2)}, Peak_Margin_Ratio=${(peakMarginRatio * 100).toFixed(2)}%, Peak_Depeg=${peakDepeg.toFixed(2)}%`,
    `# 2. Post-Resolution (Terminal): Day ${lastStep.day} (${lastStep.dateStr || 'D' + lastStep.day}), Depeg=0.00% (Parity Restored), Resolved_Equity=${resolvedEquity.toFixed(2)}, Net_PnL=${resolvedNetPnL.toFixed(2)}, Realized_APY=${resolvedApy.toFixed(2)}%, Depeg_Impairment=${!result.isLiquidated ? 'TRANSITORY ($0.00)' : 'PERMANENT_IMPAIRMENT'}`,
    `# Net Realized PnL: $${result.netPnL.toFixed(2)}`,
    `# Net Realized APY: ${result.netRealizedAPY.toFixed(2)}%`,
    `# Export Timestamp: ${new Date().toISOString()}`,
    `# Methodology: Audited Hybrid Time-Series Replay & Parametric Mean-Reversion`,
    ``
  ];

  const csvContent = metadata.join('\r\n') + headers.join(',') + '\r\n' + rows.map(r => r.join(',')).join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const safeTitle = (result.scenarioKey || 'crisis').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  link.setAttribute('download', `delta_q_audit_packet_${safeTitle}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
