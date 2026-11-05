/**
 * @file backtestLedgerRenderer.ts
 * @description Renders the paginated Day-by-Day Historical Backtest Ledger Table and handles RFC-4180 CSV export.
 */

import type { BacktestSummaryResult, BacktestStepResult } from '../../math/backtest.js';
import { fmtUSD, fmtPct } from '../../math/hedging.js';

export function renderBacktestLedger(
  tbody: HTMLElement | null,
  result: BacktestSummaryResult | null,
  currentPage: number = 1,
  pageSize: number = 50,
  asset: string = 'ETH'
): void {
  if (!tbody || typeof document === 'undefined' || typeof document.createElement !== 'function') return;
  tbody.innerHTML = '';

  if (!result || !result.dailyTrajectory || result.dailyTrajectory.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-800 text-slate-500 text-center';
    tr.innerHTML = `<td colspan="9" class="py-4 text-xs font-mono">No backtest simulation data available.</td>`;
    tbody.appendChild(tr);
    return;
  }

  const steps = result.dailyTrajectory;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(steps.length, startIndex + pageSize);
  const pageSlice = steps.slice(startIndex, endIndex);

  const fragment = typeof document.createDocumentFragment === 'function' ? document.createDocumentFragment() : null;

  pageSlice.forEach((step: BacktestStepResult) => {
    // Milestone row divider for Babylon Restaking Inception (Aug 15, 2024)
    if (step.date === '2024-08-15' && (asset === 'BTC' || (step.stakingAPY > 0 && steps[0].stakingAPY === 0))) {
      const milestoneTr = document.createElement('tr');
      milestoneTr.className = 'bg-gradient-to-r from-amber-950/70 via-purple-950/80 to-slate-900 border-y-2 border-amber-500/80 text-white font-mono';
      milestoneTr.innerHTML = `
        <td colspan="9" class="py-2.5 px-3 text-center">
          <div class="inline-flex items-center gap-2 flex-wrap justify-center">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span class="text-amber-300 font-bold uppercase tracking-wide">⚡ REGIME SHIFT MILESTONE: BABYLON RESTAKING ERA ACTIVATION (AUG 15, 2024)</span>
            <span class="text-purple-300 text-[11px] font-semibold">— Transitions from Pure Cash-and-Carry (0.0% PoW) to Native Staked Basis (+1.1% APY)</span>
          </div>
        </td>
      `;
      if (fragment) {
        fragment.appendChild(milestoneTr);
      } else {
        tbody.appendChild(milestoneTr);
      }
    }

    const tr = document.createElement('tr');
    const isLiqDay = result.isLiquidated && result.tLiq === step.day;

    let rowClass = 'border-b border-slate-800/80 hover:bg-slate-800/40 transition text-xs font-mono';
    if (isLiqDay) {
      rowClass += ' bg-rose-950/40 text-rose-300 font-bold';
    } else if (step.isLiquidated) {
      rowClass += ' text-rose-400/80 bg-rose-950/10';
    } else {
      rowClass += ' text-slate-300';
    }
    tr.className = rowClass;

    const spotReturnSign = step.priceReturnPct >= 0 ? '+' : '';
    const spotColor = step.priceReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400';
    const fundingColor = step.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400';

    let statusPill = '';
    if (isLiqDay) {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-900 text-rose-200 border border-rose-500 animate-pulse">LIQUIDATED</span>`;
    } else if (step.isLiquidated) {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] bg-rose-950/80 text-rose-400 border border-rose-800/60">UNHEDGED SPOT</span>`;
    } else if (step.stakingAPY === 0) {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-700/80 font-medium" title="Pure Cash-and-Carry Basis (100% Funding Contango, 0% Staking Yield)">CASH &amp; CARRY</span>`;
    } else {
      statusPill = `<span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium" title="Dual-Yield Staked Basis (Staking Yield + Perp Funding)">STAKED BASIS</span>`;
    }

    const stakingDisplay = step.stakingAPY === 0
      ? `<span class="text-slate-500 font-medium" title="Pure Cash-and-Carry Era (Proof-of-Work: 0% Protocol Staking Yield)">0.0% <span class="text-[9px] text-slate-500 font-normal">PoW</span></span>`
      : `<span class="text-cyan-300">${step.stakingAPY.toFixed(1)}%</span>`;

    tr.innerHTML = `
      <td class="py-2.5 px-3 text-slate-400 font-bold">D${step.day}</td>
      <td class="py-2.5 px-3 text-slate-400 text-[11px]">${step.date}</td>
      <td class="py-2.5 px-3 font-semibold text-white">$${step.spotPrice.toLocaleString()}</td>
      <td class="py-2.5 px-3 ${spotColor}">${spotReturnSign}${step.priceReturnPct.toFixed(1)}%</td>
      <td class="py-2.5 px-3 ${fundingColor}">${fmtPct(step.fundingAPR)}</td>
      <td class="py-2.5 px-3">${stakingDisplay}</td>
      <td class="py-2.5 px-3 text-amber-300">${step.depegPct.toFixed(2)}%</td>
      <td class="py-2.5 px-3 font-bold text-cyan-400">${fmtUSD(step.strategyEquity)}</td>
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

export function renderBacktestPagination(
  container: HTMLElement | null,
  totalItems: number,
  currentPage: number,
  pageSize: number = 50,
  onPageChange: (newPage: number) => void
): void {
  if (!container || typeof document === 'undefined' || typeof document.createElement !== 'function') return;
  container.innerHTML = '';

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(totalItems, currentPage * pageSize);

  container.className = 'flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800';

  container.innerHTML = `
    <div>
      Showing <span class="font-bold text-white">${start}</span> to <span class="font-bold text-white">${end}</span> of <span class="font-bold text-white">${totalItems}</span> Days
    </div>
    <div class="flex items-center gap-1.5">
      <button type="button" id="btn-backtest-prev-page" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer" ${currentPage <= 1 ? 'disabled' : ''}>
        ← Prev
      </button>
      <span class="px-2 py-1 text-slate-400">Page <strong class="text-white">${currentPage}</strong> of <strong class="text-white">${totalPages}</strong></span>
      <button type="button" id="btn-backtest-next-page" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer" ${currentPage >= totalPages ? 'disabled' : ''}>
        Next →
      </button>
    </div>
  `;

  const btnPrev = container.querySelector('#btn-backtest-prev-page');
  const btnNext = container.querySelector('#btn-backtest-next-page');

  if (btnPrev && currentPage > 1) {
    btnPrev.addEventListener('click', () => onPageChange(currentPage - 1));
  }
  if (btnNext && currentPage < totalPages) {
    btnNext.addEventListener('click', () => onPageChange(currentPage + 1));
  }
}

export function exportBacktestCsv(result: BacktestSummaryResult): void {
  if (!result || !result.dailyTrajectory || typeof document === 'undefined' || typeof document.createElement !== 'function') return;

  const headers = [
    'Day',
    'Date',
    'Spot_Price_USD',
    'Spot_Return_Pct',
    'Funding_APR_Pct',
    'Staking_APY_Pct',
    'Depeg_Discount_Pct',
    'Strategy_Equity_USD',
    'Spot_Benchmark_USD',
    'TBill_Benchmark_USD',
    'Margin_Ratio_Pct',
    'Status',
    'Cumulative_Funding_USD',
    'Cumulative_Staking_USD'
  ];

  const rows = result.dailyTrajectory.map((step) => [
    step.day,
    `"${step.date}"`,
    step.spotPrice.toFixed(2),
    step.priceReturnPct.toFixed(2),
    step.fundingAPR.toFixed(2),
    step.stakingAPY.toFixed(2),
    step.depegPct.toFixed(2),
    step.strategyEquity.toFixed(2),
    step.spotBenchmarkEquity.toFixed(2),
    step.tbillBenchmarkEquity.toFixed(2),
    (step.marginRatio * 100).toFixed(2),
    `"${step.isLiquidated ? (result.tLiq === step.day ? 'LIQUIDATED_BREACH' : 'POST_LIQUIDATION_UNHEDGED') : 'SOLVENT'}"`,
    step.cumulativeFunding.toFixed(2),
    step.cumulativeStaking.toFixed(2)
  ]);

  const metadata = [
    `# DELTA-Q QUANT TERMINAL - MULTI-YEAR HISTORICAL BACKTEST AUDIT PACKET`,
    `# Horizon: ${result.startDate} to ${result.endDate} (${result.horizonDays} Days)`,
    `# Initial Capital: $${result.initialCapital.toFixed(2)}`,
    `# Terminal Strategy Equity: $${result.terminalStrategyEquity.toFixed(2)}`,
    `# Cumulative Net PnL: $${result.netPnL.toFixed(2)} (${result.cumulativeReturnPct.toFixed(2)}%)`,
    `# Annualized Return (CAGR): ${result.cagrPct.toFixed(2)}%`,
    `# Maximum Drawdown: ${result.maxDrawdownPct.toFixed(2)}% (Trough Date: ${result.maxDrawdownTroughDate})`,
    `# Sharpe Ratio (Rf=4.35%): ${result.sharpeRatio.toFixed(2)} | Sortino Ratio: ${result.sortinoRatio.toFixed(2)}`,
    `# Liquidation Status: ${result.isLiquidated ? 'BREACHED on Day ' + result.tLiq + ' (' + result.liquidationDate + ' @ $' + result.liquidationPrice?.toFixed(2) + ')' : 'FULLY SOLVENT (Zero Breach)'}`,
    `# Benchmarks: Buy-and-Hold Spot: ${result.spotBenchmarkReturnPct.toFixed(2)}% | US T-Bills Cash: ${result.tbillBenchmarkReturnPct.toFixed(2)}%`,
    `# Total Harvested Staking Yield: $${result.totalHarvestedStaking.toFixed(2)} | Total Harvested Funding: $${result.totalHarvestedFunding.toFixed(2)}`,
    `# Export Timestamp: ${new Date().toISOString()}`,
    `# Methodology: Multi-Year Path-Dependent Cross-Margin vs Isolated Simulation`,
    ``
  ];

  const csvContent = metadata.join('\r\n') + headers.join(',') + '\r\n' + rows.map(r => r.join(',')).join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `delta_q_backtest_${result.startDate}_${result.endDate}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
