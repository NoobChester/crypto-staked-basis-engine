/**
 * @file crisisLedgerRenderer.ts
 * @description Renders the granular day-by-day institutional audit ledger table
 * and handles RFC-4180 compliant CSV export for compliance sign-off.
 */

import type { CrisisSimulationResult, CrisisSimulationStep } from '../../math/hedging.js';
import { fmtUSD, fmtPct } from '../../math/hedging.js';

export function renderCrisisAuditTable(
  tbody: HTMLElement | null,
  result: CrisisSimulationResult | null
): void {
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-800 text-slate-500 text-center';
    tr.innerHTML = `<td colspan="8" class="py-4 text-xs">No simulation data available.</td>`;
    tbody.appendChild(tr);
    return;
  }

  const fragment = document.createDocumentFragment();

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

    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
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

  const metadata = [
    `# DELTA-Q QUANT TERMINAL - INSTITUTIONAL CRISIS AUDIT PACKET`,
    `# Scenario: ${result.scenarioTitle || result.scenarioKey}`,
    `# Scenario Key: ${result.scenarioKey}`,
    `# Horizon Days: ${result.horizonDays}`,
    `# Liquidation Status: ${result.isLiquidated ? 'BREACHED on Day ' + result.tLiq : 'SURVIVED / FULLY SOLVENT'}`,
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
