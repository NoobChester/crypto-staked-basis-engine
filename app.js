// State Architecture
    const state = {
      mode: 'unified', // 'unified' | 'isolated'
      capital: 10000,
      priceMove: 0,    // % (-100 to +100)
      days: 90,
      fundingAPR: 10.0, // %
      stakingAPY: 3.2,  // %
      depegPct: 0.0,    // %
      mmr: 0.005,       // 0.5% exchange maintenance margin requirement
      
      // Traded Instrument selection
      tradedAsset: 'ETH', // 'ETH' | 'BTC' | 'SOL'
      btcVariant: 'lbtc',  // 'native' | 'lbtc' | 'solvbtc' (Available in Isolated Mode)

      // Unified Mode specific
      activePreset: 'wsteth_90',
      collateralRatio: 0.90, // 0.90 = 10% haircut
      solYieldType: 'real', // 'nominal' (7.2%) | 'real' (1.8%) - default is real yield

      // Isolated Mode specific
      splitSpot: 50 // % (Spot fraction; remainder is margin)
    };

    // DOM Elements Mapping
    const UI = {
      modeUnifiedBtn: document.getElementById('mode-btn-unified'),
      modeIsolatedBtn: document.getElementById('mode-btn-isolated'),
      panelUnifiedPresets: document.getElementById('panel-unified-presets'),
      panelIsolatedSplit: document.getElementById('panel-isolated-split'),
      valCollateralRatio: document.getElementById('val-collateral-ratio'),
      collateralRatioExplainer: document.getElementById('collateral-ratio-explainer'),
      jitosolToggleBox: document.getElementById('jitosol-yield-toggle-box'),
      labelSolYieldMode: document.getElementById('label-sol-yield-mode'),
      btnSolNominal: document.getElementById('btn-sol-nominal'),
      btnSolReal: document.getElementById('btn-sol-real'),

      // Isolated BTC LST Controls
      boxIsolatedBtcLst: document.getElementById('box-isolated-btclst'),
      labelBtcLstMode: document.getElementById('label-btclst-mode'),
      btnBtcNative: document.getElementById('btn-btc-native'),
      btnBtcLbtc: document.getElementById('btn-btc-lbtc'),
      btnBtcSolvbtc: document.getElementById('btn-btc-solvbtc'),
      isoBtnEth: document.getElementById('iso-btn-eth'),
      isoBtnBtc: document.getElementById('iso-btn-btc'),
      isoBtnSol: document.getElementById('iso-btn-sol'),
      instCollateralNoteText: document.getElementById('inst-collateral-note-text'),
      
      // Sliders & Inputs
      inputPriceMove: document.getElementById('input-price-move'),
      valPriceMove: document.getElementById('val-price-move'),
      inputCapital: document.getElementById('input-capital'),
      valCapital: document.getElementById('val-capital'),
      inputDays: document.getElementById('input-days'),
      valDays: document.getElementById('val-days'),
      inputFunding: document.getElementById('input-funding'),
      valFunding: document.getElementById('val-funding'),
      inputStaking: document.getElementById('input-staking'),
      valStaking: document.getElementById('val-staking'),
      inputDepeg: document.getElementById('input-depeg'),
      valDepeg: document.getElementById('val-depeg'),
      inputSplit: document.getElementById('input-split'),
      valSplit: document.getElementById('val-split'),
      splitHelperText: document.getElementById('split-helper-text'),

      // Traded Instruments Elements
      instPairBadge: document.getElementById('inst-pair-badge'),
      chartInstrumentsBadge: document.getElementById('chart-instruments-badge'),
      assetBtnEth: document.getElementById('asset-btn-eth'),
      assetBtnBtc: document.getElementById('asset-btn-btc'),
      assetBtnSol: document.getElementById('asset-btn-sol'),
      instSpotSymbol: document.getElementById('inst-spot-symbol'),
      instSpotDesc: document.getElementById('inst-spot-desc'),
      instSpotTag: document.getElementById('inst-spot-tag'),
      instSpotYield: document.getElementById('inst-spot-yield'),
      instSpotAmount: document.getElementById('inst-spot-amount'),
      instPerpSymbol: document.getElementById('inst-perp-symbol'),
      instPerpDesc: document.getElementById('inst-perp-desc'),
      instPerpTag: document.getElementById('inst-perp-tag'),
      instPerpRate: document.getElementById('inst-perp-rate'),
      instPerpAmount: document.getElementById('inst-perp-amount'),
      instMarginDesc: document.getElementById('inst-margin-desc'),
      labelSpotCollat: document.getElementById('label-spot-collat'),
      kpiDeltaSub: document.getElementById('kpi-delta-sub'),
      
      // Ribbon KPIs
      kpiNetValue: document.getElementById('kpi-net-value'),
      kpiRoi: document.getElementById('kpi-roi'),
      kpiStartingCap: document.getElementById('kpi-starting-cap'),
      kpiTotalApy: document.getElementById('kpi-total-apy'),
      kpiApyMode: document.getElementById('kpi-apy-mode'),
      kpiSpotApyContrib: document.getElementById('kpi-spot-apy-contrib'),
      kpiPerpApyContrib: document.getElementById('kpi-perp-apy-contrib'),
      kpiLiqDistance: document.getElementById('kpi-liq-distance'),
      kpiLiqStatus: document.getElementById('kpi-liq-status'),
      kpiLiqThresholdLabel: document.getElementById('kpi-liq-threshold-label'),
      kpiAccruedYield: document.getElementById('kpi-accrued-yield'),
      kpiHorizonTag: document.getElementById('kpi-horizon-tag'),
      kpiFundingCash: document.getElementById('kpi-funding-cash'),
      kpiStakingCash: document.getElementById('kpi-staking-cash'),
      kpiDelta: document.getElementById('kpi-delta'),
      kpiDeltaTag: document.getElementById('kpi-delta-tag'),
      
      // Balance sheet decomposition
      breakdownSpotVal: document.getElementById('breakdown-spot-val'),
      breakdownSpotPnl: document.getElementById('breakdown-spot-pnl'),
      labelShortCollat: document.getElementById('label-short-collat'),
      breakdownShortVal: document.getElementById('breakdown-short-val'),
      breakdownShortPnl: document.getElementById('breakdown-short-pnl'),
      breakdownFunding: document.getElementById('breakdown-funding'),
      breakdownFundingRate: document.getElementById('breakdown-funding-rate'),
      breakdownStaking: document.getElementById('breakdown-staking'),
      breakdownStakingRate: document.getElementById('breakdown-staking-rate'),
      breakdownDepeg: document.getElementById('breakdown-depeg'),
      breakdownDepegPct: document.getElementById('breakdown-depeg-pct'),
      breakdownNetPnl: document.getElementById('breakdown-net-pnl'),
      breakdownNetRoi: document.getElementById('breakdown-net-roi'),
      stateBadge: document.getElementById('state-badge'),
      
      // Alert & Canvas
      liqBanner: document.getElementById('liquidation-banner'),
      alertLiqTrigger: document.getElementById('alert-liq-trigger'),
      canvas: document.getElementById('pnlCanvas'),
      chartSubCaption: document.getElementById('chart-sub-caption'),
      tooltip: document.getElementById('canvas-tooltip'),
      ttPrice: document.getElementById('tt-price'),
      ttVal: document.getElementById('tt-val'),
      ttRoi: document.getElementById('tt-roi'),
      ttStatus: document.getElementById('tt-status')
    };

    const ctx = UI.canvas.getContext('2d');

    // Helper to resolve specific traded instrument names and metadata
    function getInstrumentDetails() {
      const asset = state.tradedAsset || 'ETH';
      const mode = state.mode;
      const preset = state.activePreset;

      if (mode === 'isolated') {
        if (asset === 'BTC') {
          const variant = state.btcVariant || 'lbtc';
          if (variant === 'lbtc') {
            return {
              pairBadge: 'LBTC / BTC-USDC PERP',
              spotSymbol: 'LBTC',
              spotName: 'Lombard Staked Bitcoin (Babylon LST)',
              spotTag: 'BABYLON LST',
              perpSymbol: 'BTC-USDC PERP',
              perpName: 'Bitcoin Linear Perp Short',
              perpTag: 'ISOLATED SHORT',
              marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
              note: 'Babylon Staking Active: LBTC held in Web3 custody (~3.2% APY). Hedged with cash margin on CEX (Bypasses CEX collateral whitelists).'
            };
          } else if (variant === 'solvbtc') {
            return {
              pairBadge: 'SolvBTC.BBN / BTC-USDC PERP',
              spotSymbol: 'SolvBTC.BBN',
              spotName: 'Solv Babylon Staked BTC',
              spotTag: 'BABYLON LST',
              perpSymbol: 'BTC-USDC PERP',
              perpName: 'Bitcoin Linear Perp Short',
              perpTag: 'ISOLATED SHORT',
              marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
              note: 'Babylon Staking Active: SolvBTC.BBN held in Web3 custody (~3.5% APY). Hedged with cash margin on CEX (Bypasses CEX collateral whitelists).'
            };
          } else {
            return {
              pairBadge: 'BTC-SPOT / BTC-USDC-PERP',
              spotSymbol: 'BTC',
              spotName: 'Bitcoin Native Spot',
              spotTag: 'SPOT ASSET',
              perpSymbol: 'BTC-USDC PERP',
              perpName: 'Bitcoin Linear Perp Short',
              perpTag: 'ISOLATED SHORT',
              marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
              note: 'Native Spot BTC held in cold custody; CEX derivatives hedged with cash margin.'
            };
          }
        } else if (asset === 'SOL') {
          return {
            pairBadge: 'SOL-SPOT / SOL-USDC-PERP',
            spotSymbol: 'SOL',
            spotName: 'Solana Native Spot',
            spotTag: 'SPOT ASSET',
            perpSymbol: 'SOL-USDC PERP',
            perpName: 'Solana Linear Perp Short',
            perpTag: 'ISOLATED SHORT',
            marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
            note: 'Native SOL held in custody; CEX derivatives margined in cash.'
          };
        } else {
          return {
            pairBadge: 'ETH-SPOT / ETH-USDC-PERP',
            spotSymbol: 'ETH',
            spotName: 'Ethereum Native Spot',
            spotTag: 'SPOT ASSET',
            perpSymbol: 'ETH-USDC PERP',
            perpName: 'Ethereum Linear Perp Short',
            perpTag: 'ISOLATED SHORT',
            marginDesc: 'USDC Cash Margin (Isolated Derivatives Account)',
            note: 'Native ETH held in custody; CEX derivatives margined in cash.'
          };
        }
      }

      // Unified Margin Mode
      if (preset === 'wsteth_90') {
        return {
          pairBadge: 'wstETH / ETH-USDT PERP',
          spotSymbol: 'wstETH',
          spotName: 'Lido Wrapped Staked ETH',
          spotTag: 'LST SPOT',
          perpSymbol: 'ETH-USDT PERP',
          perpName: 'Ethereum Linear Perpetual Short',
          perpTag: 'LINEAR PERP',
          marginDesc: 'wstETH Collateral (Unified Cross-Margin, 10% Haircut)',
          note: 'CEX Whitelisted Collateral: wstETH accepted directly as margin collateral (90% valuation).'
        };
      } else if (preset === 'sol_lrt_85') {
        return {
          pairBadge: 'JitoSOL / SOL-USDT PERP',
          spotSymbol: 'JitoSOL',
          spotName: 'Jito Staked SOL (LST)',
          spotTag: 'SOL LST',
          perpSymbol: 'SOL-USDT PERP',
          perpName: 'Solana Linear Perpetual Short',
          perpTag: 'LINEAR PERP',
          marginDesc: 'JitoSOL Collateral (Unified Cross-Margin, 15% Haircut)',
          note: 'CEX Whitelisted Collateral: JitoSOL accepted directly as margin collateral (85% valuation).'
        };
      } else if (preset === 'inverse_100') {
        const sym = (asset === 'ETH') ? 'ETH' : 'BTC';
        return {
          pairBadge: `${sym} / ${sym}-USD INVERSE`,
          spotSymbol: `${sym} Native`,
          spotName: `${sym === 'BTC' ? 'Bitcoin' : 'Ethereum'} Native Spot`,
          spotTag: 'BASE COIN',
          perpSymbol: `${sym}-USD COIN-M`,
          perpName: `${sym} Inverse Perp (Coin-Margined Short)`,
          perpTag: 'COIN-M PERP',
          marginDesc: `100% Native ${sym} Collateral (0% Haircut, 1:1 Base)`,
          note: sym === 'BTC' ? 'Coin-Margined: Native BTC collateral only. Babylon LSTs (LBTC/SolvBTC) require Isolated Margin.' : 'Coin-Margined 1:1 inverse hedge.'
        };
      } else {
        // btc_eth_95
        const sym = (asset === 'ETH') ? 'ETH' : 'BTC';
        return {
          pairBadge: `${sym} / ${sym}-USDT PERP`,
          spotSymbol: `${sym} Spot`,
          spotName: `${sym === 'BTC' ? 'Bitcoin Native Spot (Vanilla)' : 'Ethereum Vanilla Spot'}`,
          spotTag: 'SPOT L1',
          perpSymbol: `${sym}-USDT PERP`,
          perpName: `${sym} Linear Perpetual Short`,
          perpTag: 'LINEAR PERP',
          marginDesc: `${sym} Spot Collateral (Unified Cross-Margin, 5% Haircut)`,
          note: sym === 'BTC' ? 'CEX Collateral Restricted: Desks do not whitelist Babylon LSTs (LBTC/SolvBTC) for cross-margin. Switch to Isolated Margin to model them.' : 'Spot ETH cross-margin.'
        };
      }
    }

    // Mathematical Core Calculation
    function calculateOutcome(priceChangePct, customState = state) {
      const C = customState.capital;
      const r = priceChangePct / 100;
      const depeg = customState.depegPct / 100;
      const durationYears = customState.days / 365;

      let S0, M0, N0, rLiq, isLiquidated;
      let spotVal = 0, spotPnL = 0;
      let perpMarginVal = 0, perpPnL = 0;
      let totalPortfolioVal = 0;
      let netDelta = 0;
      let depegLoss = 0;
      let fundingYieldTotal = 0;
      let stakingYieldTotal = 0;

      if (customState.mode === 'unified') {
        // UNIFIED MARGIN MODE:
        // 100% of capital deployed in spot. Spot acts as cross-margin for 1x short.
        S0 = C;
        N0 = C; // 1x delta-neutral short size
        M0 = C; // Notional margin base is spot itself
        const V = customState.collateralRatio; // e.g. 0.90 (10% haircut)

        // Exact Unified Account liquidation threshold:
        // Equity = SpotValue * V - ShortUnrealizedLoss
        // MM Requirement = N0 * (1 + r) * MMR
        // S0*(1+r)*(1-depeg)*V - N0*r = N0*(1+r)*MMR
        // If V >= 1.0 (Inverse), liquidation is mathematically infinite
        if (V >= 0.999 && depeg === 0) {
          rLiq = Infinity;
        } else {
          const num = ((1 - depeg) * V) - customState.mmr;
          const den = 1 + customState.mmr - ((1 - depeg) * V);
          rLiq = den <= 0 ? Infinity : (num / den);
        }

        isLiquidated = (r >= rLiq);

        fundingYieldTotal = N0 * (customState.fundingAPR / 100) * durationYears;
        stakingYieldTotal = S0 * (customState.stakingAPY / 100) * durationYears;

        if (!isLiquidated) {
          spotVal = S0 * (1 + r) * (1 - depeg);
          depegLoss = S0 * (1 + r) * depeg;
          spotPnL = spotVal - S0;
          perpPnL = -N0 * r;

          // In unified account, total dollar value is spot value + perp cash PnL + accrued yields
          totalPortfolioVal = spotVal + perpPnL + fundingYieldTotal + stakingYieldTotal;
          netDelta = spotVal - (N0 * (1 + r)); // near 0 except for depeg
          perpMarginVal = spotVal * V + perpPnL; // Effective margin equity
        } else {
          // Liquidated in unified account (extreme price surge)
          spotVal = S0 * (1 + r) * (1 - depeg);
          spotPnL = spotVal - S0;
          depegLoss = S0 * (1 + r) * depeg;
          perpPnL = -S0 * V; // entire recognized collateral consumed
          totalPortfolioVal = spotVal + fundingYieldTotal + stakingYieldTotal;
          netDelta = spotVal;
          perpMarginVal = 0;
        }

      } else {
        // ISOLATED MARGIN MODE:
        const sFrac = customState.splitSpot / 100;
        const mFrac = 1 - sFrac;
        S0 = C * sFrac;
        M0 = C * mFrac;
        N0 = S0; // Delta-neutral short matches spot notional

        // Isolated short liquidation threshold:
        rLiq = ((M0 / N0) - customState.mmr) / (1 + customState.mmr);
        isLiquidated = (r >= rLiq);

        fundingYieldTotal = N0 * (customState.fundingAPR / 100) * durationYears;
        stakingYieldTotal = S0 * (customState.stakingAPY / 100) * durationYears;

        if (!isLiquidated) {
          spotVal = S0 * (1 + r) * (1 - depeg);
          depegLoss = S0 * (1 + r) * depeg;
          spotPnL = spotVal - S0;
          perpPnL = -N0 * r;

          perpMarginVal = Math.max(0, M0 + perpPnL);
          totalPortfolioVal = spotVal + perpMarginVal + fundingYieldTotal + stakingYieldTotal;
          netDelta = spotVal - (N0 * (1 + r));
        } else {
          // Liquidated in isolated mode
          spotVal = S0 * (1 + r) * (1 - depeg);
          depegLoss = S0 * (1 + r) * depeg;
          spotPnL = spotVal - S0;
          perpMarginVal = 0;
          perpPnL = -M0; // 100% of USDC margin forfeited
          totalPortfolioVal = spotVal + fundingYieldTotal + stakingYieldTotal;
          netDelta = spotVal;
        }
      }

      const netPnL = totalPortfolioVal - C;
      const roiPct = (netPnL / C) * 100;

      // Yield APY contributions
      const spotWeight = customState.mode === 'unified' ? 1.0 : (customState.splitSpot / 100);
      const perpWeight = customState.mode === 'unified' ? 1.0 : (customState.splitSpot / 100);
      const spotAPYContrib = customState.stakingAPY * spotWeight;
      const perpAPYContrib = customState.fundingAPR * perpWeight;
      const totalStrategyAPY = spotAPYContrib + perpAPYContrib;

      const distanceToLiqPct = (rLiq === Infinity) ? Infinity : (rLiq - r) * 100;

      return {
        C, S0, M0, N0, rLiq, isLiquidated,
        spotVal, spotPnL, perpMarginVal, perpPnL,
        fundingYieldTotal, stakingYieldTotal, depegLoss,
        totalPortfolioVal, netPnL, roiPct, netDelta,
        spotAPYContrib, perpAPYContrib, totalStrategyAPY,
        distanceToLiqPct
      };
    }

    // Formatting Helpers
    function fmtUSD(val) {
      const absVal = Math.abs(val);
      const str = absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return (val < 0 ? '-' : '') + '$' + str;
    }
    function fmtPct(val, plus = true) {
      if (val === Infinity) return 'INFINITE\u00A0(∞)';
      const sign = (plus && val > 0) ? '+' : '';
      return sign + val.toFixed(2) + '%';
    }

    // Update User Interface
    function updateUI() {
      const res = calculateOutcome(state.priceMove);

      // Top KPIs
      UI.kpiNetValue.textContent = fmtUSD(res.totalPortfolioVal);
      UI.kpiStartingCap.textContent = fmtUSD(res.C);
      UI.kpiRoi.textContent = fmtPct(res.roiPct);
      UI.kpiRoi.className = `text-xs font-mono font-semibold ${res.roiPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;

      UI.kpiTotalApy.textContent = fmtPct(res.totalStrategyAPY, false) + ' APY';
      UI.kpiSpotApyContrib.textContent = fmtPct(res.spotAPYContrib);
      UI.kpiPerpApyContrib.textContent = fmtPct(res.perpAPYContrib);
      UI.kpiApyMode.textContent = state.mode === 'unified' ? 'UNIFIED 100%' : `${state.splitSpot}% SPOT`;

      // Liquidation runway
      if (res.rLiq === Infinity) {
        UI.kpiLiqDistance.textContent = 'IMMUNE\u00A0(∞)';
        UI.kpiLiqStatus.textContent = 'ZERO RISK';
        UI.kpiLiqStatus.className = 'shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
        UI.kpiLiqThresholdLabel.textContent = 'Mathematically impossible';
      } else if (res.isLiquidated) {
        UI.kpiLiqDistance.textContent = 'LIQUIDATED';
        UI.kpiLiqStatus.textContent = 'BREACHED';
        UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono';
        UI.kpiLiqThresholdLabel.textContent = `Breached at ${fmtPct(res.rLiq * 100)}`;
      } else {
        UI.kpiLiqDistance.textContent = fmtPct(res.distanceToLiqPct);
        UI.kpiLiqThresholdLabel.textContent = fmtPct(res.rLiq * 100);
        if (res.distanceToLiqPct < 20) {
          UI.kpiLiqStatus.textContent = 'DANGER';
          UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono animate-subtle';
        } else if (res.distanceToLiqPct < 60) {
          UI.kpiLiqStatus.textContent = 'WARNING';
          UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono';
        } else {
          UI.kpiLiqStatus.textContent = 'SAFE';
          UI.kpiLiqStatus.className = 'text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
        }
      }

      // Cash Harvest
      const totalCash = res.fundingYieldTotal + res.stakingYieldTotal;
      UI.kpiAccruedYield.textContent = (totalCash >= 0 ? '+' : '') + fmtUSD(totalCash);
      UI.kpiAccruedYield.className = `text-2xl font-bold font-mono ${totalCash >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      UI.kpiFundingCash.textContent = fmtUSD(res.fundingYieldTotal);
      UI.kpiStakingCash.textContent = fmtUSD(res.stakingYieldTotal);
      UI.kpiHorizonTag.textContent = `${state.days}d`;

      // Delta Exposure
      UI.kpiDelta.textContent = fmtUSD(res.netDelta);
      if (res.isLiquidated) {
        UI.kpiDelta.className = 'text-2xl font-bold font-mono text-rose-400';
        UI.kpiDeltaTag.textContent = '100% NAKED LONG';
        UI.kpiDeltaTag.className = 'text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono animate-subtle';
      } else {
        UI.kpiDelta.className = 'text-2xl font-bold font-mono text-cyan-400';
        UI.kpiDeltaTag.textContent = 'NEUTRAL (Δ=0)';
        UI.kpiDeltaTag.className = 'text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono';
      }

      // Liquidation Alert Banner
      if (res.isLiquidated) {
        UI.liqBanner.classList.remove('hidden');
        UI.alertLiqTrigger.textContent = fmtPct(res.rLiq * 100);
      } else {
        UI.liqBanner.classList.add('hidden');
      }

      // Decomposition Table
      UI.breakdownSpotVal.textContent = fmtUSD(res.spotVal);
      UI.breakdownSpotPnl.textContent = `PnL: ${res.spotPnL >= 0 ? '+' : ''}${fmtUSD(res.spotPnL)}`;
      
      if (state.mode === 'unified') {
        UI.labelShortCollat.textContent = 'Short Perp Equity / Loss';
        UI.breakdownShortVal.textContent = fmtUSD(res.perpMarginVal);
        UI.breakdownShortPnl.textContent = `PnL: ${res.perpPnL >= 0 ? '+' : ''}${fmtUSD(res.perpPnL)}`;
      } else {
        UI.labelShortCollat.textContent = 'Short Perp Margin & PnL';
        UI.breakdownShortVal.textContent = fmtUSD(res.perpMarginVal);
        UI.breakdownShortPnl.textContent = `PnL: ${res.perpPnL >= 0 ? '+' : ''}${fmtUSD(res.perpPnL)}`;
      }

      UI.breakdownFunding.textContent = (res.fundingYieldTotal >= 0 ? '+' : '') + fmtUSD(res.fundingYieldTotal);
      UI.breakdownFundingRate.textContent = `Rate: ${fmtPct(state.fundingAPR)} APR`;
      UI.breakdownStaking.textContent = `+${fmtUSD(res.stakingYieldTotal)}`;
      UI.breakdownStakingRate.textContent = `Rate: ${state.stakingAPY.toFixed(1)}% APY`;
      UI.breakdownDepeg.textContent = `-${fmtUSD(res.depegLoss)}`;
      UI.breakdownDepegPct.textContent = `Discount: ${state.depegPct.toFixed(1)}%`;
      UI.breakdownNetPnl.textContent = (res.netPnL >= 0 ? '+' : '') + fmtUSD(res.netPnL);
      UI.breakdownNetPnl.className = `text-sm font-bold font-mono mt-0.5 ${res.netPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      UI.breakdownNetRoi.textContent = `ROI: ${fmtPct(res.roiPct)}`;
      UI.breakdownNetRoi.className = `text-[10px] font-mono mt-0.5 ${res.roiPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`;

      if (res.isLiquidated) {
        UI.stateBadge.textContent = 'UNHEDGED SPOT LONG';
        UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono';
      } else if (state.mode === 'unified') {
        UI.stateBadge.textContent = 'CROSS-COLLATERALIZED HEDGE';
        UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold font-mono';
      } else {
        UI.stateBadge.textContent = 'ISOLATED DELTA NEUTRAL';
        UI.stateBadge.className = 'px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold font-mono';
      }

      // Update Traded Instruments Display
      const inst = getInstrumentDetails();
      if (UI.instPairBadge) UI.instPairBadge.textContent = inst.pairBadge;
      if (UI.chartInstrumentsBadge) UI.chartInstrumentsBadge.textContent = 'PAIR: ' + inst.pairBadge;
      if (UI.instSpotSymbol) UI.instSpotSymbol.textContent = inst.spotSymbol;
      if (UI.instSpotDesc) UI.instSpotDesc.textContent = inst.spotName;
      if (UI.instSpotTag) UI.instSpotTag.textContent = inst.spotTag;
      if (UI.instSpotYield) UI.instSpotYield.textContent = (state.stakingAPY > 0 ? `+${state.stakingAPY.toFixed(1)}% APY` : '0.0% APY');
      if (UI.instSpotAmount) UI.instSpotAmount.textContent = fmtUSD(res.S0) + (state.mode === 'isolated' ? ` (${state.splitSpot}%)` : ' (100%)');

      if (UI.instPerpSymbol) UI.instPerpSymbol.textContent = inst.perpSymbol;
      if (UI.instPerpDesc) UI.instPerpDesc.textContent = inst.perpName;
      if (UI.instPerpTag) UI.instPerpTag.textContent = inst.perpTag;
      if (UI.instPerpRate) {
        UI.instPerpRate.textContent = `${fmtPct(state.fundingAPR)} APR`;
        UI.instPerpRate.className = `text-[11px] font-bold ${state.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      }
      if (UI.instPerpAmount) UI.instPerpAmount.textContent = '-' + fmtUSD(res.N0) + (state.mode === 'isolated' ? ` (-${state.splitSpot}%)` : ' (-1.00x)');

      if (UI.instMarginDesc) {
        if (state.mode === 'isolated') {
          UI.instMarginDesc.textContent = `USDC Cash Margin (${fmtUSD(res.M0)} in Isolated Derivatives Account)`;
        } else {
          UI.instMarginDesc.textContent = inst.marginDesc;
        }
      }

      // Update asset selector active styles
      const activeAsset = state.tradedAsset || 'ETH';
      ['assetBtnEth', 'assetBtnBtc', 'assetBtnSol'].forEach(btnKey => {
        if (!UI[btnKey]) return;
        const assetName = btnKey.replace('assetBtn', '').toUpperCase();
        if (assetName === activeAsset) {
          UI[btnKey].className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
        } else {
          UI[btnKey].className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
        }
      });

      // Update Balance Sheet labels
      if (UI.labelSpotCollat) {
        UI.labelSpotCollat.innerHTML = `Spot Long (${inst.spotSymbol}) <span class="text-[9px] px-1 rounded bg-slate-800 text-cyan-300 font-semibold">SPOT</span>`;
      }
      if (UI.labelShortCollat) {
        if (state.mode === 'unified') {
          UI.labelShortCollat.innerHTML = `Short Perp (${inst.perpSymbol}) <span class="text-[9px] px-1 rounded bg-slate-800 text-rose-300 font-semibold">DERIVATIVE</span>`;
        } else {
          UI.labelShortCollat.innerHTML = `Short Perp & USDC Margin <span class="text-[9px] px-1 rounded bg-slate-800 text-rose-300 font-semibold">ISOLATED</span>`;
        }
      }

      if (UI.kpiDeltaSub) {
        UI.kpiDeltaSub.textContent = `Long ${inst.spotSymbol} Δ minus Short ${inst.perpSymbol} Δ`;
      }

      // Update Isolated BTC LST Box & Buttons
      if (UI.boxIsolatedBtcLst) {
        if (state.mode === 'isolated' && state.tradedAsset === 'BTC') {
          UI.boxIsolatedBtcLst.classList.remove('hidden');
        } else {
          UI.boxIsolatedBtcLst.classList.add('hidden');
        }
      }

      if (UI.labelBtcLstMode) {
        const v = state.btcVariant || 'lbtc';
        if (v === 'lbtc') {
          UI.labelBtcLstMode.textContent = 'LBTC (Babylon LST, +3.2%)';
          if (UI.btnBtcLbtc) UI.btnBtcLbtc.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
          if (UI.btnBtcSolvbtc) UI.btnBtcSolvbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
          if (UI.btnBtcNative) UI.btnBtcNative.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
        } else if (v === 'solvbtc') {
          UI.labelBtcLstMode.textContent = 'SolvBTC.BBN (Babylon LST, +3.5%)';
          if (UI.btnBtcSolvbtc) UI.btnBtcSolvbtc.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
          if (UI.btnBtcLbtc) UI.btnBtcLbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
          if (UI.btnBtcNative) UI.btnBtcNative.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
        } else {
          UI.labelBtcLstMode.textContent = 'Native BTC (Pure Spot, 0%)';
          if (UI.btnBtcNative) UI.btnBtcNative.className = 'py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate';
          if (UI.btnBtcLbtc) UI.btnBtcLbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
          if (UI.btnBtcSolvbtc) UI.btnBtcSolvbtc.className = 'py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate';
        }
      }

      // Sync Isolated Asset Selector Buttons
      ['isoBtnEth', 'isoBtnBtc', 'isoBtnSol'].forEach(btnKey => {
        if (!UI[btnKey]) return;
        const a = btnKey.replace('isoBtn', '').toUpperCase();
        if (a === state.tradedAsset) {
          UI[btnKey].className = 'px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition';
        } else {
          UI[btnKey].className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition';
        }
      });

      // Update Dynamic Institutional Collateral Notice
      if (UI.instCollateralNoteText && inst.note) {
        UI.instCollateralNoteText.textContent = inst.note;
      }

      // Draw the canvas curve
      drawChart(res);
    }

    // Chart Renderer on HTML5 Canvas
    function drawChart(currentRes) {
      const canvas = UI.canvas;
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

      const stepCount = 140;
      const pnlPoints = [];
      const spotPoints = [];

      let minVal = Infinity;
      let maxVal = -Infinity;

      for (let i = 0; i <= stepCount; i++) {
        const pMove = -100 + (200 * i / stepCount);
        const outcome = calculateOutcome(pMove);
        pnlPoints.push({ x: pMove, y: outcome.totalPortfolioVal, isLiq: outcome.isLiquidated });

        // Unhedged spot benchmark
        const unhedged = state.capital * (1 + (pMove / 100));
        spotPoints.push({ x: pMove, y: unhedged });

        minVal = Math.min(minVal, outcome.totalPortfolioVal, unhedged);
        maxVal = Math.max(maxVal, outcome.totalPortfolioVal, unhedged);
      }

      const yMin = Math.max(0, Math.floor(minVal * 0.85 / 1000) * 1000);
      const yMax = Math.ceil(maxVal * 1.15 / 1000) * 1000;

      function toCanvasX(pMove) {
        return pad.left + ((pMove - (-100)) / 200) * plotW;
      }
      function toCanvasY(val) {
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

      // Grid Lines - X Axis (-100%, -50%, 0%, 50%, 100%)
      const xTicks = [-100, -50, 0, 50, 100];
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

      // Draw Liquidation Cliff (if it falls within the [-100%, +100%] window)
      const rLiqPct = currentRes.rLiq * 100;
      if (rLiqPct <= 100 && rLiqPct > -100) {
        const liqX = toCanvasX(rLiqPct);

        // Danger zone tint
        ctx.fillStyle = 'rgba(244, 63, 94, 0.08)';
        ctx.fillRect(liqX, pad.top, (pad.left + plotW) - liqX, plotH);

        // Dashed Red Cliff Line
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
          ctx.strokeStyle = '#f43f5e'; // Crimson if wiped
        } else {
          ctx.strokeStyle = '#06b6d4'; // Cyan if safely protected
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
      ctx.roundRect(badgeX - badgeW / 2, badgeY, badgeW, badgeH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = currentRes.isLiquidated ? '#fb7185' : '#38bdf8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, badgeX, badgeY + badgeH / 2);
    }

    // Canvas Mouse Hover Handler
    UI.canvas.addEventListener('mousemove', (e) => {
      const rect = UI.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const pad = { top: 25, right: 30, bottom: 45, left: 65 };
      const plotW = rect.width - pad.left - pad.right;

      if (mouseX < pad.left || mouseX > pad.left + plotW || mouseY < pad.top || mouseY > rect.height - pad.bottom) {
        UI.tooltip.classList.add('hidden');
        return;
      }

      const hoverPriceMove = -100 + ((mouseX - pad.left) / plotW) * 200;
      const res = calculateOutcome(hoverPriceMove);

      UI.tooltip.classList.remove('hidden');
      UI.tooltip.style.left = `${Math.min(mouseX + 15, rect.width - 180)}px`;
      UI.tooltip.style.top = `${Math.max(mouseY - 75, 10)}px`;

      UI.ttPrice.textContent = `Price Move: ${fmtPct(hoverPriceMove)}`;
      UI.ttVal.textContent = `Portfolio: ${fmtUSD(res.totalPortfolioVal)}`;
      UI.ttRoi.textContent = `ROI: ${fmtPct(res.roiPct)}`;
      UI.ttStatus.textContent = res.isLiquidated ? 'Status: 100% Unhedged Long' : (state.mode === 'unified' ? 'Status: Cross-Margin Protected' : 'Status: Isolated Hedged');
      UI.ttStatus.className = res.isLiquidated ? 'text-[10px] text-rose-400 font-bold' : 'text-[10px] text-cyan-400';
    });

    UI.canvas.addEventListener('mouseleave', () => {
      UI.tooltip.classList.add('hidden');
    });

    // Account Mode Switcher
    function setAccountMode(mode) {
      state.mode = mode;
      if (mode === 'unified') {
        UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow';
        UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
        UI.panelUnifiedPresets.classList.remove('hidden');
        UI.panelIsolatedSplit.classList.add('hidden');
        UI.chartSubCaption.textContent = 'Cross-collateralized: Spot collateral appreciation cushions perp losses';
        if (state.tradedAsset === 'BTC') {
          state.stakingAPY = 0.0;
          UI.inputStaking.value = 0.0;
          UI.valStaking.textContent = '0.0% APY';
        }
        applyCollateralPreset(state.activePreset || 'wsteth_90');
      } else {
        UI.modeIsolatedBtn.className = 'px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow';
        UI.modeUnifiedBtn.className = 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
        UI.panelUnifiedPresets.classList.add('hidden');
        UI.panelIsolatedSplit.classList.remove('hidden');
        UI.chartSubCaption.textContent = 'Isolated cash margin: Sharp rallies can deplete collateral and trigger liquidation';
        if (state.tradedAsset === 'BTC') {
          if (state.btcVariant === 'lbtc') {
            state.stakingAPY = 3.2;
          } else if (state.btcVariant === 'solvbtc') {
            state.stakingAPY = 3.5;
          } else {
            state.stakingAPY = 0.0;
          }
          UI.inputStaking.value = state.stakingAPY;
          UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
        } else if (state.tradedAsset === 'SOL') {
          state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
          UI.inputStaking.value = state.stakingAPY;
          UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
        }
      }
      updateUI();
    }
    window.setAccountMode = setAccountMode;

    // Asset Selector Handler
    function setTradedAsset(asset) {
      state.tradedAsset = asset;
      if (state.mode === 'unified') {
        if (asset === 'SOL') {
          applyCollateralPreset('sol_lrt_85');
          return;
        } else if (asset === 'BTC') {
          state.stakingAPY = 0.0;
          UI.inputStaking.value = 0.0;
          UI.valStaking.textContent = '0.0% APY';
          if (state.activePreset === 'wsteth_90' || state.activePreset === 'sol_lrt_85') {
            applyCollateralPreset('btc_eth_95');
            return;
          }
        } else if (asset === 'ETH') {
          if (state.activePreset === 'sol_lrt_85') {
            applyCollateralPreset('wsteth_90');
            return;
          }
        }
      } else {
        // Isolated Mode
        if (asset === 'BTC') {
          if (state.btcVariant === 'lbtc') {
            state.stakingAPY = 3.2;
          } else if (state.btcVariant === 'solvbtc') {
            state.stakingAPY = 3.5;
          } else {
            state.stakingAPY = 0.0;
          }
        } else if (asset === 'ETH') {
          state.stakingAPY = 3.2;
        } else if (asset === 'SOL') {
          state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
        }
        UI.inputStaking.value = state.stakingAPY;
        UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
      }
      updateUI();
    }
    window.setTradedAsset = setTradedAsset;

    // Isolated Bitcoin LST Variant Selector
    function setBtcVariant(variant) {
      state.btcVariant = variant;
      if (variant === 'lbtc') {
        state.stakingAPY = 3.2;
      } else if (variant === 'solvbtc') {
        state.stakingAPY = 3.5;
      } else {
        state.stakingAPY = 0.0;
      }
      UI.inputStaking.value = state.stakingAPY;
      UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
      updateUI();
    }
    window.setBtcVariant = setBtcVariant;

    // Unified Margin Collateral Presets Handlers
    function applyCollateralPreset(presetKey) {
      state.activePreset = presetKey;
      state.activePreset = presetKey;
      
      // Reset preset styling
      ['btn-preset-100', 'btn-preset-95', 'btn-preset-90', 'btn-preset-85'].forEach(id => {
        const el = document.getElementById(id);
        el.className = 'preset-choice p-2 rounded-lg bg-brand-dark hover:bg-slate-800 border border-brand-border text-left transition';
        const title = el.querySelector('.font-bold');
        if (title) title.className = 'font-bold text-white';
      });

      const activeBtn = {
        'inverse_100': 'btn-preset-100',
        'btc_eth_95': 'btn-preset-95',
        'wsteth_90': 'btn-preset-90',
        'sol_lrt_85': 'btn-preset-85'
      }[presetKey];

      if (activeBtn) {
        const btn = document.getElementById(activeBtn);
        btn.className = 'preset-choice p-2 rounded-lg bg-cyan-950/80 border border-cyan-500 text-left transition';
        const title = btn.querySelector('.font-bold');
        if (title) title.className = 'font-bold text-cyan-300';
      }

      // Hide or Show JitoSOL toggle
      if (presetKey === 'sol_lrt_85') {
        UI.jitosolToggleBox.classList.remove('hidden');
      } else {
        UI.jitosolToggleBox.classList.add('hidden');
      }

      switch(presetKey) {
        case 'inverse_100':
          state.collateralRatio = 1.00;
          state.stakingAPY = 0.0;
          if (state.tradedAsset !== 'BTC' && state.tradedAsset !== 'ETH') state.tradedAsset = 'BTC';
          UI.valCollateralRatio.textContent = '100% (0% Haircut)';
          UI.collateralRatioExplainer.textContent = 'Standard Inverse COIN-M perp. Spot value gains equal perp losses 1:1. Zero liquidation risk.';
          break;

        case 'btc_eth_95':
          state.collateralRatio = 0.95;
          state.stakingAPY = 0.0;
          if (state.tradedAsset !== 'BTC' && state.tradedAsset !== 'ETH') state.tradedAsset = 'BTC';
          UI.valCollateralRatio.textContent = '95.0% (5% Haircut)';
          UI.collateralRatioExplainer.textContent = 'Pure spot BTC/ETH in Unified Margin. Zero staking risk. (Babylon BTC LSTs like LBTC/SolvBTC.BBN require Isolated Margin due to CEX collateral rules).';
          break;

        case 'wsteth_90':
          state.collateralRatio = 0.90;
          state.stakingAPY = 3.2;
          state.tradedAsset = 'ETH';
          UI.valCollateralRatio.textContent = '90.0% (10% Haircut)';
          UI.collateralRatioExplainer.textContent = 'Lido wstETH (Ethereum LST). Earns 3.2% base staking APY with an 8.5x (+852%) upside buffer.';
          break;

        case 'sol_lrt_85':
          state.collateralRatio = 0.85;
          state.stakingAPY = (state.solYieldType === 'nominal') ? 7.2 : 1.8;
          state.tradedAsset = 'SOL';
          UI.valCollateralRatio.textContent = '85.0% (15% Haircut)';
          UI.collateralRatioExplainer.textContent = (state.solYieldType === 'nominal')
            ? 'Solana / Liquid Restaking (Nominal 7.2%). Stacks high base yield with a +545% price surge liquidation buffer.'
            : 'Solana / Liquid Restaking (Real Yield 1.8%). Stacks inflation-adjusted real yield with a +545% price surge liquidation buffer.';
          break;
      }

      // Synchronize staking slider
      UI.inputStaking.value = state.stakingAPY;
      UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';

      updateUI();
    }
    window.applyCollateralPreset = applyCollateralPreset;

    // JitoSOL Nominal vs Real Yield Toggle
    function setSolYieldType(type) {
      state.solYieldType = type;
      if (type === 'nominal') {
        state.stakingAPY = 7.2;
        UI.labelSolYieldMode.textContent = 'Nominal (+7.2%)';
        UI.btnSolNominal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
        UI.btnSolReal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
      } else {
        state.stakingAPY = 1.8;
        UI.labelSolYieldMode.textContent = 'Real (+1.8%)';
        UI.btnSolReal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
        UI.btnSolNominal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
      }

      const subtext85 = document.getElementById('subtext-preset-85');
      if (subtext85) {
        subtext85.textContent = (type === 'nominal') ? '15% Haircut | 7.2% Stake' : '15% Haircut | 1.8% Real Stake';
      }

      if (state.activePreset === 'sol_lrt_85') {
        UI.collateralRatioExplainer.textContent = (type === 'nominal')
          ? 'Solana / Liquid Restaking (Nominal 7.2%). Stacks high base yield with a +545% price surge liquidation buffer.'
          : 'Solana / Liquid Restaking (Real Yield 1.8%). Stacks inflation-adjusted real yield with a +545% price surge liquidation buffer.';
      }

      UI.inputStaking.value = state.stakingAPY;
      UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
      updateUI();
    }
    window.setSolYieldType = setSolYieldType;

    // Slider Event Listeners
    UI.inputPriceMove.addEventListener('input', (e) => {
      state.priceMove = parseFloat(e.target.value);
      UI.valPriceMove.textContent = fmtPct(state.priceMove);
      updateUI();
    });

    UI.inputCapital.addEventListener('input', (e) => {
      const val = Math.max(100, parseFloat(e.target.value) || 1000);
      state.capital = val;
      UI.valCapital.textContent = fmtUSD(val);
      updateUI();
    });

    UI.inputDays.addEventListener('input', (e) => {
      setDays(parseInt(e.target.value));
    });

    UI.inputFunding.addEventListener('input', (e) => {
      state.fundingAPR = parseFloat(e.target.value);
      UI.valFunding.textContent = fmtPct(state.fundingAPR) + ' APR';
      UI.valFunding.className = `font-mono font-bold ${state.fundingAPR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      updateUI();
    });

    UI.inputStaking.addEventListener('input', (e) => {
      state.stakingAPY = parseFloat(e.target.value);
      UI.valStaking.textContent = state.stakingAPY.toFixed(1) + '% APY';
      updateUI();
    });

    UI.inputDepeg.addEventListener('input', (e) => {
      state.depegPct = parseFloat(e.target.value);
      UI.valDepeg.textContent = state.depegPct.toFixed(1) + '% Discount';
      updateUI();
    });

    UI.inputSplit.addEventListener('input', (e) => {
      setSplit(parseInt(e.target.value));
    });

    // Helper functions for controls
    function setPriceChange(pct) {
      state.priceMove = pct;
      UI.inputPriceMove.value = pct;
      UI.valPriceMove.textContent = fmtPct(pct);
      updateUI();
    }
    window.setPriceChange = setPriceChange;

    function setDays(d) {
      state.days = d;
      UI.inputDays.value = d;
      UI.valDays.textContent = `${d} Day${d === 1 ? '' : 's'}`;
      updateUI();
    }
    window.setDays = setDays;

    function setSplit(spotPct) {
      state.splitSpot = spotPct;
      UI.inputSplit.value = spotPct;
      const marginPct = 100 - spotPct;
      UI.valSplit.textContent = `${spotPct}% Spot / ${marginPct}% Margin`;

      const lev = spotPct / marginPct;
      const rLiq = ((marginPct / spotPct) - state.mmr) / (1 + state.mmr) * 100;
      UI.splitHelperText.textContent = `Effective Short Leverage: ${lev.toFixed(2)}x (Liquidation buffer: +${rLiq.toFixed(1)}%)`;
      updateUI();
    }
    window.setSplit = setSplit;

    function resetDefaults() {
      state.tradedAsset = 'ETH';
      state.btcVariant = 'lbtc';
      state.solYieldType = 'real';
      if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = 'Real (+1.8%)';
      if (UI.btnSolReal) UI.btnSolReal.className = 'py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold';
      if (UI.btnSolNominal) UI.btnSolNominal.className = 'py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300';
      const subtext85 = document.getElementById('subtext-preset-85');
      if (subtext85) subtext85.textContent = '15% Haircut | 1.8% Real Stake';
      setAccountMode('unified');
      applyCollateralPreset('wsteth_90');
      setPriceChange(0);
      setDays(90);
      state.capital = 10000;
      UI.inputCapital.value = 10000;
      UI.valCapital.textContent = '$10,000';
      state.fundingAPR = 10.0;
      UI.inputFunding.value = 10.0;
      UI.valFunding.textContent = '+10.00% APR';
      state.depegPct = 0.0;
      UI.inputDepeg.value = 0.0;
      UI.valDepeg.textContent = '0.0% Discount';
      setSplit(50);
      updateUI();
    }
    window.resetDefaults = resetDefaults;

    // Canvas Auto-Resize Observer
    const ro = new ResizeObserver(() => {
      updateUI();
    });
    ro.observe(UI.canvas.parentElement);

    // Initial Execution on Load
    window.onload = function () {
      applyCollateralPreset('wsteth_90');
      setSplit(50);
      updateUI();
    };
