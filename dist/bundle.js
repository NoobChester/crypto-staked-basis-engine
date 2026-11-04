(() => {
  // src/math/hedging.js
  function calculateOutcome(priceChangePct, customState = {}) {
    const C = Math.max(0, customState.capital ?? 1e4);
    const r = priceChangePct / 100;
    const depeg = Math.max(0, Math.min(1, (customState.depegPct ?? 0) / 100));
    const durationYears = Math.max(0, (customState.days ?? 90) / 365);
    const mmr = customState.mmr ?? 5e-3;
    const mode = customState.mode ?? "unified";
    const fundingAPR = customState.fundingAPR ?? 10;
    const stakingAPY = customState.stakingAPY ?? 3.2;
    let S0, M0, N0, rLiq, isLiquidated;
    let spotVal = 0, spotPnL = 0;
    let perpMarginVal = 0, perpPnL = 0;
    let totalPortfolioVal = 0;
    let netDelta = 0;
    let depegLoss = 0;
    if (mode === "unified") {
      S0 = C;
      N0 = C;
      M0 = C;
      const V = customState.collateralRatio ?? 0.9;
      if (V >= 0.999 && depeg === 0) {
        rLiq = Infinity;
      } else {
        const num = (1 - depeg) * V - mmr;
        const den = 1 + mmr - (1 - depeg) * V;
        rLiq = den <= 0 ? Infinity : num / den;
      }
      isLiquidated = r >= rLiq;
      const fundingYieldTotal = N0 * (fundingAPR / 100) * durationYears;
      const stakingYieldTotal = S0 * (stakingAPY / 100) * durationYears;
      if (!isLiquidated) {
        spotVal = S0 * (1 + r) * (1 - depeg);
        depegLoss = S0 * (1 + r) * depeg;
        spotPnL = spotVal - S0;
        perpPnL = -N0 * r;
        totalPortfolioVal = spotVal + perpPnL + fundingYieldTotal + stakingYieldTotal;
        netDelta = spotVal - N0 * (1 + r);
        perpMarginVal = spotVal * V + perpPnL;
      } else {
        spotVal = S0 * (1 + r) * (1 - depeg);
        spotPnL = spotVal - S0;
        depegLoss = S0 * (1 + r) * depeg;
        perpPnL = -S0 * V;
        totalPortfolioVal = spotVal + fundingYieldTotal + stakingYieldTotal;
        netDelta = spotVal;
        perpMarginVal = 0;
      }
      const netPnL = totalPortfolioVal - C;
      const roiPct = C > 0 ? netPnL / C * 100 : 0;
      const spotWeight = 1;
      const perpWeight = 1;
      const spotAPYContrib = stakingAPY * spotWeight;
      const perpAPYContrib = fundingAPR * perpWeight;
      const totalStrategyAPY = spotAPYContrib + perpAPYContrib;
      const distanceToLiqPct = rLiq === Infinity ? Infinity : (rLiq - r) * 100;
      return {
        C,
        S0,
        M0,
        N0,
        rLiq,
        isLiquidated,
        spotVal,
        spotPnL,
        perpMarginVal,
        perpPnL,
        fundingYieldTotal,
        stakingYieldTotal,
        depegLoss,
        totalPortfolioVal,
        netPnL,
        roiPct,
        netDelta,
        spotAPYContrib,
        perpAPYContrib,
        totalStrategyAPY,
        distanceToLiqPct
      };
    } else {
      const splitSpot = customState.splitSpot ?? 50;
      const sFrac = Math.max(0.01, Math.min(0.99, splitSpot / 100));
      const mFrac = 1 - sFrac;
      S0 = C * sFrac;
      M0 = C * mFrac;
      N0 = S0;
      rLiq = (M0 / N0 - mmr) / (1 + mmr);
      isLiquidated = r >= rLiq;
      const fundingYieldTotal = N0 * (fundingAPR / 100) * durationYears;
      const stakingYieldTotal = S0 * (stakingAPY / 100) * durationYears;
      if (!isLiquidated) {
        spotVal = S0 * (1 + r) * (1 - depeg);
        depegLoss = S0 * (1 + r) * depeg;
        spotPnL = spotVal - S0;
        perpPnL = -N0 * r;
        perpMarginVal = Math.max(0, M0 + perpPnL);
        totalPortfolioVal = spotVal + perpMarginVal + fundingYieldTotal + stakingYieldTotal;
        netDelta = spotVal - N0 * (1 + r);
      } else {
        spotVal = S0 * (1 + r) * (1 - depeg);
        depegLoss = S0 * (1 + r) * depeg;
        spotPnL = spotVal - S0;
        perpMarginVal = 0;
        perpPnL = -M0;
        totalPortfolioVal = spotVal + fundingYieldTotal + stakingYieldTotal;
        netDelta = spotVal;
      }
      const netPnL = totalPortfolioVal - C;
      const roiPct = C > 0 ? netPnL / C * 100 : 0;
      const spotWeight = sFrac;
      const perpWeight = sFrac;
      const spotAPYContrib = stakingAPY * spotWeight;
      const perpAPYContrib = fundingAPR * perpWeight;
      const totalStrategyAPY = spotAPYContrib + perpAPYContrib;
      const distanceToLiqPct = rLiq === Infinity ? Infinity : (rLiq - r) * 100;
      return {
        C,
        S0,
        M0,
        N0,
        rLiq,
        isLiquidated,
        spotVal,
        spotPnL,
        perpMarginVal,
        perpPnL,
        fundingYieldTotal,
        stakingYieldTotal,
        depegLoss,
        totalPortfolioVal,
        netPnL,
        roiPct,
        netDelta,
        spotAPYContrib,
        perpAPYContrib,
        totalStrategyAPY,
        distanceToLiqPct
      };
    }
  }
  function fmtUSD(val) {
    if (isNaN(val)) return "$0.00";
    const absVal = Math.abs(val);
    const str = absVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (val < 0 ? "-" : "") + "$" + str;
  }
  function fmtPct(val, plus = true) {
    if (val === Infinity) return "INFINITE\xA0(\u221E)";
    if (isNaN(val)) return "0.00%";
    const sign = plus && val > 0 ? "+" : "";
    return sign + val.toFixed(2) + "%";
  }

  // src/config/presets.js
  var COLLATERAL_PRESETS = {
    inverse_100: {
      collateralRatio: 1,
      stakingAPY: 0,
      defaultAsset: "BTC",
      badgeLabel: "100% (0% Haircut)",
      explainer: "Standard Inverse COIN-M perp. Spot value gains equal perp losses 1:1. Zero liquidation risk."
    },
    btc_eth_95: {
      collateralRatio: 0.95,
      stakingAPY: 0,
      defaultAsset: "BTC",
      badgeLabel: "95.0% (5% Haircut)",
      explainer: "Pure spot BTC/ETH in Unified Margin. Zero staking risk. (Babylon BTC LSTs like LBTC/SolvBTC.BBN require Isolated Margin due to CEX collateral rules)."
    },
    wsteth_90: {
      collateralRatio: 0.9,
      stakingAPY: 3.2,
      defaultAsset: "ETH",
      badgeLabel: "90.0% (10% Haircut)",
      explainer: "Lido wstETH (Ethereum LST). Earns 3.2% base staking APY with an 8.5x (+852%) upside buffer."
    },
    sol_lrt_85: {
      collateralRatio: 0.85,
      stakingAPY: 1.8,
      // Default to real yield
      defaultAsset: "SOL",
      badgeLabel: "85.0% (15% Haircut)",
      nominalAPY: 7.2,
      realAPY: 1.8,
      getExplainer(yieldType) {
        return yieldType === "nominal" ? "Solana / Liquid Restaking (Nominal 7.2%). Stacks high base yield with a +545% price surge liquidation buffer." : "Solana / Liquid Restaking (Real Yield 1.8%). Stacks inflation-adjusted real yield with a +545% price surge liquidation buffer.";
      }
    }
  };
  var BTC_LST_VARIANTS = {
    lbtc: {
      symbol: "LBTC",
      name: "Lombard Staked Bitcoin (Babylon LST)",
      stakingAPY: 3.2,
      tag: "BABYLON LST",
      note: "Babylon Staking Active: LBTC held in Web3 custody (~3.2% APY). Hedged with cash margin on CEX (Bypasses CEX collateral whitelists)."
    },
    solvbtc: {
      symbol: "SolvBTC.BBN",
      name: "Solv Babylon Staked BTC",
      stakingAPY: 3.5,
      tag: "BABYLON LST",
      note: "Babylon Staking Active: SolvBTC.BBN held in Web3 custody (~3.5% APY). Hedged with cash margin on CEX (Bypasses CEX collateral whitelists)."
    },
    native: {
      symbol: "BTC",
      name: "Bitcoin Native Spot",
      stakingAPY: 0,
      tag: "SPOT ASSET",
      note: "Native Spot BTC held in cold custody; CEX derivatives hedged with cash margin."
    }
  };
  function getInstrumentDetails(s) {
    const asset = s.tradedAsset || "ETH";
    const mode = s.mode;
    const preset = s.activePreset;
    if (mode === "isolated") {
      if (asset === "BTC") {
        const variant = s.btcVariant || "lbtc";
        const btcMeta = BTC_LST_VARIANTS[variant] || BTC_LST_VARIANTS.lbtc;
        return {
          pairBadge: `${btcMeta.symbol} / BTC-USDC PERP`,
          spotSymbol: btcMeta.symbol,
          spotName: btcMeta.name,
          spotTag: btcMeta.tag,
          perpSymbol: "BTC-USDC PERP",
          perpName: "Bitcoin Linear Perp Short",
          perpTag: "ISOLATED SHORT",
          marginDesc: "USDC Cash Margin (Isolated Derivatives Account)",
          note: btcMeta.note
        };
      } else if (asset === "SOL") {
        return {
          pairBadge: "SOL-SPOT / SOL-USDC-PERP",
          spotSymbol: "SOL",
          spotName: "Solana Native Spot",
          spotTag: "SPOT ASSET",
          perpSymbol: "SOL-USDC PERP",
          perpName: "Solana Linear Perp Short",
          perpTag: "ISOLATED SHORT",
          marginDesc: "USDC Cash Margin (Isolated Derivatives Account)",
          note: "Native SOL held in custody; CEX derivatives margined in cash."
        };
      } else {
        return {
          pairBadge: "ETH-SPOT / ETH-USDC-PERP",
          spotSymbol: "ETH",
          spotName: "Ethereum Native Spot",
          spotTag: "SPOT ASSET",
          perpSymbol: "ETH-USDC PERP",
          perpName: "Ethereum Linear Perp Short",
          perpTag: "ISOLATED SHORT",
          marginDesc: "USDC Cash Margin (Isolated Derivatives Account)",
          note: "Native ETH held in custody; CEX derivatives margined in cash."
        };
      }
    }
    if (preset === "wsteth_90") {
      return {
        pairBadge: "wstETH / ETH-USDT PERP",
        spotSymbol: "wstETH",
        spotName: "Lido Wrapped Staked ETH",
        spotTag: "LST SPOT",
        perpSymbol: "ETH-USDT PERP",
        perpName: "Ethereum Linear Perpetual Short",
        perpTag: "LINEAR PERP",
        marginDesc: "wstETH Collateral (Unified Cross-Margin, 10% Haircut)",
        note: "CEX Whitelisted Collateral: wstETH accepted directly as margin collateral (90% valuation)."
      };
    } else if (preset === "sol_lrt_85") {
      return {
        pairBadge: "JitoSOL / SOL-USDT PERP",
        spotSymbol: "JitoSOL",
        spotName: "Jito Staked SOL (LST)",
        spotTag: "SOL LST",
        perpSymbol: "SOL-USDT PERP",
        perpName: "Solana Linear Perpetual Short",
        perpTag: "LINEAR PERP",
        marginDesc: "JitoSOL Collateral (Unified Cross-Margin, 15% Haircut)",
        note: "CEX Whitelisted Collateral: JitoSOL accepted directly as margin collateral (85% valuation)."
      };
    } else if (preset === "inverse_100") {
      const sym = asset === "ETH" ? "ETH" : "BTC";
      return {
        pairBadge: `${sym} / ${sym}-USD INVERSE`,
        spotSymbol: `${sym} Native`,
        spotName: `${sym === "BTC" ? "Bitcoin" : "Ethereum"} Native Spot`,
        spotTag: "BASE COIN",
        perpSymbol: `${sym}-USD COIN-M`,
        perpName: `${sym} Inverse Perp (Coin-Margined Short)`,
        perpTag: "COIN-M PERP",
        marginDesc: `100% Native ${sym} Collateral (0% Haircut, 1:1 Base)`,
        note: sym === "BTC" ? "Coin-Margined: Native BTC collateral only. Babylon LSTs (LBTC/SolvBTC) require Isolated Margin." : "Coin-Margined 1:1 inverse hedge."
      };
    } else {
      const sym = asset === "ETH" ? "ETH" : "BTC";
      return {
        pairBadge: `${sym} / ${sym}-USDT PERP`,
        spotSymbol: `${sym} Spot`,
        spotName: `${sym === "BTC" ? "Bitcoin Native Spot (Vanilla)" : "Ethereum Vanilla Spot"}`,
        spotTag: "SPOT L1",
        perpSymbol: `${sym}-USDT PERP`,
        perpName: `${sym} Linear Perpetual Short`,
        perpTag: "LINEAR PERP",
        marginDesc: `${sym} Spot Collateral (Unified Cross-Margin, 5% Haircut)`,
        note: sym === "BTC" ? "CEX Collateral Restricted: Desks do not whitelist Babylon LSTs (LBTC/SolvBTC) for cross-margin. Switch to Isolated Margin to model them." : "Spot ETH cross-margin."
      };
    }
  }

  // src/ui/dom.js
  function getUIElements() {
    return {
      modeUnifiedBtn: document.getElementById("mode-btn-unified"),
      modeIsolatedBtn: document.getElementById("mode-btn-isolated"),
      panelUnifiedPresets: document.getElementById("panel-unified-presets"),
      panelIsolatedSplit: document.getElementById("panel-isolated-split"),
      valCollateralRatio: document.getElementById("val-collateral-ratio"),
      collateralRatioExplainer: document.getElementById("collateral-ratio-explainer"),
      jitosolToggleBox: document.getElementById("jitosol-yield-toggle-box"),
      labelSolYieldMode: document.getElementById("label-sol-yield-mode"),
      btnSolNominal: document.getElementById("btn-sol-nominal"),
      btnSolReal: document.getElementById("btn-sol-real"),
      // Isolated BTC LST Controls
      boxIsolatedBtcLst: document.getElementById("box-isolated-btclst"),
      labelBtcLstMode: document.getElementById("label-btclst-mode"),
      btnBtcNative: document.getElementById("btn-btc-native"),
      btnBtcLbtc: document.getElementById("btn-btc-lbtc"),
      btnBtcSolvbtc: document.getElementById("btn-btc-solvbtc"),
      isoBtnEth: document.getElementById("iso-btn-eth"),
      isoBtnBtc: document.getElementById("iso-btn-btc"),
      isoBtnSol: document.getElementById("iso-btn-sol"),
      instCollateralNoteText: document.getElementById("inst-collateral-note-text"),
      // Sliders & Inputs
      inputPriceMove: document.getElementById("input-price-move"),
      valPriceMove: document.getElementById("val-price-move"),
      inputCapital: document.getElementById("input-capital"),
      valCapital: document.getElementById("val-capital"),
      inputDays: document.getElementById("input-days"),
      valDays: document.getElementById("val-days"),
      inputFunding: document.getElementById("input-funding"),
      valFunding: document.getElementById("val-funding"),
      inputStaking: document.getElementById("input-staking"),
      valStaking: document.getElementById("val-staking"),
      inputDepeg: document.getElementById("input-depeg"),
      valDepeg: document.getElementById("val-depeg"),
      inputSplit: document.getElementById("input-split"),
      valSplit: document.getElementById("val-split"),
      splitHelperText: document.getElementById("split-helper-text"),
      // Traded Instruments Elements
      instPairBadge: document.getElementById("inst-pair-badge"),
      chartInstrumentsBadge: document.getElementById("chart-instruments-badge"),
      assetBtnEth: document.getElementById("asset-btn-eth"),
      assetBtnBtc: document.getElementById("asset-btn-btc"),
      assetBtnSol: document.getElementById("asset-btn-sol"),
      instSpotSymbol: document.getElementById("inst-spot-symbol"),
      instSpotDesc: document.getElementById("inst-spot-desc"),
      instSpotTag: document.getElementById("inst-spot-tag"),
      instSpotYield: document.getElementById("inst-spot-yield"),
      instSpotAmount: document.getElementById("inst-spot-amount"),
      instPerpSymbol: document.getElementById("inst-perp-symbol"),
      instPerpDesc: document.getElementById("inst-perp-desc"),
      instPerpTag: document.getElementById("inst-perp-tag"),
      instPerpRate: document.getElementById("inst-perp-rate"),
      instPerpAmount: document.getElementById("inst-perp-amount"),
      instMarginDesc: document.getElementById("inst-margin-desc"),
      labelSpotCollat: document.getElementById("label-spot-collat"),
      kpiDeltaSub: document.getElementById("kpi-delta-sub"),
      // Ribbon KPIs
      kpiNetValue: document.getElementById("kpi-net-value"),
      kpiRoi: document.getElementById("kpi-roi"),
      kpiStartingCap: document.getElementById("kpi-starting-cap"),
      kpiTotalApy: document.getElementById("kpi-total-apy"),
      kpiApyMode: document.getElementById("kpi-apy-mode"),
      kpiSpotApyContrib: document.getElementById("kpi-spot-apy-contrib"),
      kpiPerpApyContrib: document.getElementById("kpi-perp-apy-contrib"),
      kpiLiqDistance: document.getElementById("kpi-liq-distance"),
      kpiLiqStatus: document.getElementById("kpi-liq-status"),
      kpiLiqThresholdLabel: document.getElementById("kpi-liq-threshold-label"),
      kpiAccruedYield: document.getElementById("kpi-accrued-yield"),
      kpiHorizonTag: document.getElementById("kpi-horizon-tag"),
      kpiFundingCash: document.getElementById("kpi-funding-cash"),
      kpiStakingCash: document.getElementById("kpi-staking-cash"),
      kpiDelta: document.getElementById("kpi-delta"),
      kpiDeltaTag: document.getElementById("kpi-delta-tag"),
      // Balance sheet decomposition
      breakdownSpotVal: document.getElementById("breakdown-spot-val"),
      breakdownSpotPnl: document.getElementById("breakdown-spot-pnl"),
      labelShortCollat: document.getElementById("label-short-collat"),
      breakdownShortVal: document.getElementById("breakdown-short-val"),
      breakdownShortPnl: document.getElementById("breakdown-short-pnl"),
      breakdownFunding: document.getElementById("breakdown-funding"),
      breakdownFundingRate: document.getElementById("breakdown-funding-rate"),
      breakdownStaking: document.getElementById("breakdown-staking"),
      breakdownStakingRate: document.getElementById("breakdown-staking-rate"),
      breakdownDepeg: document.getElementById("breakdown-depeg"),
      breakdownDepegPct: document.getElementById("breakdown-depeg-pct"),
      breakdownNetPnl: document.getElementById("breakdown-net-pnl"),
      breakdownNetRoi: document.getElementById("breakdown-net-roi"),
      stateBadge: document.getElementById("state-badge"),
      // Alert & Canvas
      liqBanner: document.getElementById("liquidation-banner"),
      alertLiqTrigger: document.getElementById("alert-liq-trigger"),
      canvas: document.getElementById("pnlCanvas"),
      chartSubCaption: document.getElementById("chart-sub-caption"),
      tooltip: document.getElementById("canvas-tooltip"),
      ttPrice: document.getElementById("tt-price"),
      ttVal: document.getElementById("tt-val"),
      ttRoi: document.getElementById("tt-roi"),
      ttStatus: document.getElementById("tt-status")
    };
  }
  function renderUI(UI2, state2, res) {
    if (UI2.kpiNetValue) UI2.kpiNetValue.textContent = fmtUSD(res.totalPortfolioVal);
    if (UI2.kpiStartingCap) UI2.kpiStartingCap.textContent = fmtUSD(res.C);
    if (UI2.kpiRoi) {
      UI2.kpiRoi.textContent = fmtPct(res.roiPct);
      UI2.kpiRoi.className = `text-xs font-mono font-semibold ${res.roiPct >= 0 ? "text-emerald-400" : "text-rose-400"}`;
    }
    if (UI2.kpiTotalApy) UI2.kpiTotalApy.textContent = fmtPct(res.totalStrategyAPY, false) + " APY";
    if (UI2.kpiSpotApyContrib) UI2.kpiSpotApyContrib.textContent = fmtPct(res.spotAPYContrib);
    if (UI2.kpiPerpApyContrib) UI2.kpiPerpApyContrib.textContent = fmtPct(res.perpAPYContrib);
    if (UI2.kpiApyMode) UI2.kpiApyMode.textContent = state2.mode === "unified" ? "UNIFIED 100%" : `${state2.splitSpot}% SPOT`;
    if (UI2.kpiLiqDistance && UI2.kpiLiqStatus && UI2.kpiLiqThresholdLabel) {
      if (res.rLiq === Infinity) {
        UI2.kpiLiqDistance.textContent = "IMMUNE\xA0(\u221E)";
        UI2.kpiLiqStatus.textContent = "ZERO RISK";
        UI2.kpiLiqStatus.className = "shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono";
        UI2.kpiLiqThresholdLabel.textContent = "Mathematically impossible";
      } else if (res.isLiquidated) {
        UI2.kpiLiqDistance.textContent = "LIQUIDATED";
        UI2.kpiLiqStatus.textContent = "BREACHED";
        UI2.kpiLiqStatus.className = "text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono";
        UI2.kpiLiqThresholdLabel.textContent = `Breached at ${fmtPct(res.rLiq * 100)}`;
      } else {
        UI2.kpiLiqDistance.textContent = fmtPct(res.distanceToLiqPct);
        UI2.kpiLiqThresholdLabel.textContent = fmtPct(res.rLiq * 100);
        if (res.distanceToLiqPct < 20) {
          UI2.kpiLiqStatus.textContent = "DANGER";
          UI2.kpiLiqStatus.className = "text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono animate-subtle";
        } else if (res.distanceToLiqPct < 60) {
          UI2.kpiLiqStatus.textContent = "WARNING";
          UI2.kpiLiqStatus.className = "text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono";
        } else {
          UI2.kpiLiqStatus.textContent = "SAFE";
          UI2.kpiLiqStatus.className = "text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono";
        }
      }
    }
    const totalCash = res.fundingYieldTotal + res.stakingYieldTotal;
    if (UI2.kpiAccruedYield) {
      UI2.kpiAccruedYield.textContent = (totalCash >= 0 ? "+" : "") + fmtUSD(totalCash);
      UI2.kpiAccruedYield.className = `text-2xl font-bold font-mono ${totalCash >= 0 ? "text-emerald-400" : "text-rose-400"}`;
    }
    if (UI2.kpiFundingCash) UI2.kpiFundingCash.textContent = fmtUSD(res.fundingYieldTotal);
    if (UI2.kpiStakingCash) UI2.kpiStakingCash.textContent = fmtUSD(res.stakingYieldTotal);
    if (UI2.kpiHorizonTag) UI2.kpiHorizonTag.textContent = `${state2.days}d`;
    if (UI2.kpiDelta && UI2.kpiDeltaTag) {
      UI2.kpiDelta.textContent = fmtUSD(res.netDelta);
      if (res.isLiquidated) {
        UI2.kpiDelta.className = "text-2xl font-bold font-mono text-rose-400";
        UI2.kpiDeltaTag.textContent = "100% NAKED LONG";
        UI2.kpiDeltaTag.className = "text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono animate-subtle";
      } else {
        UI2.kpiDelta.className = "text-2xl font-bold font-mono text-cyan-400";
        UI2.kpiDeltaTag.textContent = "NEUTRAL (\u0394=0)";
        UI2.kpiDeltaTag.className = "text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono";
      }
    }
    if (UI2.liqBanner && UI2.alertLiqTrigger) {
      if (res.isLiquidated) {
        UI2.liqBanner.classList.remove("hidden");
        UI2.alertLiqTrigger.textContent = fmtPct(res.rLiq * 100);
      } else {
        UI2.liqBanner.classList.add("hidden");
      }
    }
    if (UI2.breakdownSpotVal) UI2.breakdownSpotVal.textContent = fmtUSD(res.spotVal);
    if (UI2.breakdownSpotPnl) UI2.breakdownSpotPnl.textContent = `PnL: ${res.spotPnL >= 0 ? "+" : ""}${fmtUSD(res.spotPnL)}`;
    if (UI2.labelShortCollat && UI2.breakdownShortVal && UI2.breakdownShortPnl) {
      if (state2.mode === "unified") {
        UI2.labelShortCollat.textContent = "Short Perp Equity / Loss";
      } else {
        UI2.labelShortCollat.textContent = "Short Perp Margin & PnL";
      }
      UI2.breakdownShortVal.textContent = fmtUSD(res.perpMarginVal);
      UI2.breakdownShortPnl.textContent = `PnL: ${res.perpPnL >= 0 ? "+" : ""}${fmtUSD(res.perpPnL)}`;
    }
    if (UI2.breakdownFunding) UI2.breakdownFunding.textContent = (res.fundingYieldTotal >= 0 ? "+" : "") + fmtUSD(res.fundingYieldTotal);
    if (UI2.breakdownFundingRate) UI2.breakdownFundingRate.textContent = `Rate: ${fmtPct(state2.fundingAPR)} APR`;
    if (UI2.breakdownStaking) UI2.breakdownStaking.textContent = `+${fmtUSD(res.stakingYieldTotal)}`;
    if (UI2.breakdownStakingRate) UI2.breakdownStakingRate.textContent = `Rate: ${state2.stakingAPY.toFixed(1)}% APY`;
    if (UI2.breakdownDepeg) UI2.breakdownDepeg.textContent = `-${fmtUSD(res.depegLoss)}`;
    if (UI2.breakdownDepegPct) UI2.breakdownDepegPct.textContent = `Discount: ${state2.depegPct.toFixed(1)}%`;
    if (UI2.breakdownNetPnl) {
      UI2.breakdownNetPnl.textContent = (res.netPnL >= 0 ? "+" : "") + fmtUSD(res.netPnL);
      UI2.breakdownNetPnl.className = `text-sm font-bold font-mono mt-0.5 ${res.netPnL >= 0 ? "text-emerald-400" : "text-rose-400"}`;
    }
    if (UI2.breakdownNetRoi) {
      UI2.breakdownNetRoi.textContent = `ROI: ${fmtPct(res.roiPct)}`;
      UI2.breakdownNetRoi.className = `text-[10px] font-mono mt-0.5 ${res.roiPct >= 0 ? "text-emerald-300" : "text-rose-300"}`;
    }
    if (UI2.stateBadge) {
      if (res.isLiquidated) {
        UI2.stateBadge.textContent = "UNHEDGED SPOT LONG";
        UI2.stateBadge.className = "px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono";
      } else if (state2.mode === "unified") {
        UI2.stateBadge.textContent = "CROSS-COLLATERALIZED HEDGE";
        UI2.stateBadge.className = "px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold font-mono";
      } else {
        UI2.stateBadge.textContent = "ISOLATED DELTA NEUTRAL";
        UI2.stateBadge.className = "px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold font-mono";
      }
    }
    const inst = getInstrumentDetails(state2);
    if (UI2.instPairBadge) UI2.instPairBadge.textContent = inst.pairBadge;
    if (UI2.chartInstrumentsBadge) UI2.chartInstrumentsBadge.textContent = "PAIR: " + inst.pairBadge;
    if (UI2.instSpotSymbol) UI2.instSpotSymbol.textContent = inst.spotSymbol;
    if (UI2.instSpotDesc) UI2.instSpotDesc.textContent = inst.spotName;
    if (UI2.instSpotTag) UI2.instSpotTag.textContent = inst.spotTag;
    if (UI2.instSpotYield) UI2.instSpotYield.textContent = state2.stakingAPY > 0 ? `+${state2.stakingAPY.toFixed(1)}% APY` : "0.0% APY";
    if (UI2.instSpotAmount) UI2.instSpotAmount.textContent = fmtUSD(res.S0) + (state2.mode === "isolated" ? ` (${state2.splitSpot}%)` : " (100%)");
    if (UI2.instPerpSymbol) UI2.instPerpSymbol.textContent = inst.perpSymbol;
    if (UI2.instPerpDesc) UI2.instPerpDesc.textContent = inst.perpName;
    if (UI2.instPerpTag) UI2.instPerpTag.textContent = inst.perpTag;
    if (UI2.instPerpRate) {
      UI2.instPerpRate.textContent = `${fmtPct(state2.fundingAPR)} APR`;
      UI2.instPerpRate.className = `text-[11px] font-bold ${state2.fundingAPR >= 0 ? "text-emerald-400" : "text-rose-400"}`;
    }
    if (UI2.instPerpAmount) UI2.instPerpAmount.textContent = "-" + fmtUSD(res.N0) + (state2.mode === "isolated" ? ` (-${state2.splitSpot}%)` : " (-1.00x)");
    if (UI2.instMarginDesc) {
      if (state2.mode === "isolated") {
        UI2.instMarginDesc.textContent = `USDC Cash Margin (${fmtUSD(res.M0)} in Isolated Derivatives Account)`;
      } else {
        UI2.instMarginDesc.textContent = inst.marginDesc;
      }
    }
    const activeAsset = state2.tradedAsset || "ETH";
    ["assetBtnEth", "assetBtnBtc", "assetBtnSol"].forEach((btnKey) => {
      if (!UI2[btnKey]) return;
      const assetName = btnKey.replace("assetBtn", "").toUpperCase();
      if (assetName === activeAsset) {
        UI2[btnKey].className = "px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition";
      } else {
        UI2[btnKey].className = "px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition";
      }
    });
    if (UI2.labelSpotCollat) {
      UI2.labelSpotCollat.innerHTML = `Spot Long (${inst.spotSymbol}) <span class="text-[9px] px-1 rounded bg-slate-800 text-cyan-300 font-semibold">SPOT</span>`;
    }
    if (UI2.labelShortCollat) {
      if (state2.mode === "unified") {
        UI2.labelShortCollat.innerHTML = `Short Perp (${inst.perpSymbol}) <span class="text-[9px] px-1 rounded bg-slate-800 text-rose-300 font-semibold">DERIVATIVE</span>`;
      } else {
        UI2.labelShortCollat.innerHTML = `Short Perp & USDC Margin <span class="text-[9px] px-1 rounded bg-slate-800 text-rose-300 font-semibold">ISOLATED</span>`;
      }
    }
    if (UI2.kpiDeltaSub) {
      UI2.kpiDeltaSub.textContent = `Long ${inst.spotSymbol} \u0394 minus Short ${inst.perpSymbol} \u0394`;
    }
    if (UI2.boxIsolatedBtcLst) {
      if (state2.mode === "isolated" && state2.tradedAsset === "BTC") {
        UI2.boxIsolatedBtcLst.classList.remove("hidden");
      } else {
        UI2.boxIsolatedBtcLst.classList.add("hidden");
      }
    }
    if (UI2.labelBtcLstMode) {
      const v = state2.btcVariant || "lbtc";
      if (v === "lbtc") {
        UI2.labelBtcLstMode.textContent = "LBTC (Babylon LST, +3.2%)";
        if (UI2.btnBtcLbtc) UI2.btnBtcLbtc.className = "py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate";
        if (UI2.btnBtcSolvbtc) UI2.btnBtcSolvbtc.className = "py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate";
        if (UI2.btnBtcNative) UI2.btnBtcNative.className = "py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate";
      } else if (v === "solvbtc") {
        UI2.labelBtcLstMode.textContent = "SolvBTC.BBN (Babylon LST, +3.5%)";
        if (UI2.btnBtcSolvbtc) UI2.btnBtcSolvbtc.className = "py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate";
        if (UI2.btnBtcLbtc) UI2.btnBtcLbtc.className = "py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate";
        if (UI2.btnBtcNative) UI2.btnBtcNative.className = "py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate";
      } else {
        UI2.labelBtcLstMode.textContent = "Native BTC (Pure Spot, 0%)";
        if (UI2.btnBtcNative) UI2.btnBtcNative.className = "py-1 px-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold transition text-center truncate";
        if (UI2.btnBtcLbtc) UI2.btnBtcLbtc.className = "py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate";
        if (UI2.btnBtcSolvbtc) UI2.btnBtcSolvbtc.className = "py-1 px-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center truncate";
      }
    }
    ["isoBtnEth", "isoBtnBtc", "isoBtnSol"].forEach((btnKey) => {
      if (!UI2[btnKey]) return;
      const a = btnKey.replace("isoBtn", "").toUpperCase();
      if (a === state2.tradedAsset) {
        UI2[btnKey].className = "px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold transition";
      } else {
        UI2[btnKey].className = "px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white transition";
      }
    });
    if (UI2.instCollateralNoteText && inst.note) {
      UI2.instCollateralNoteText.textContent = inst.note;
    }
  }
  function bindInputListeners(UI2, state2, onUpdate) {
    if (UI2.inputPriceMove) {
      UI2.inputPriceMove.addEventListener("input", (e) => {
        state2.priceMove = parseFloat(e.target.value);
        if (UI2.valPriceMove) UI2.valPriceMove.textContent = fmtPct(state2.priceMove);
        onUpdate();
      });
    }
    if (UI2.inputCapital) {
      UI2.inputCapital.addEventListener("input", (e) => {
        const val = Math.max(100, parseFloat(e.target.value) || 1e3);
        state2.capital = val;
        if (UI2.valCapital) UI2.valCapital.textContent = fmtUSD(val);
        onUpdate();
      });
    }
    if (UI2.inputDays) {
      UI2.inputDays.addEventListener("input", (e) => {
        state2.days = parseInt(e.target.value);
        if (UI2.valDays) UI2.valDays.textContent = `${state2.days} Day${state2.days === 1 ? "" : "s"}`;
        onUpdate();
      });
    }
    if (UI2.inputFunding) {
      UI2.inputFunding.addEventListener("input", (e) => {
        state2.fundingAPR = parseFloat(e.target.value);
        if (UI2.valFunding) {
          UI2.valFunding.textContent = fmtPct(state2.fundingAPR) + " APR";
          UI2.valFunding.className = `font-mono font-bold ${state2.fundingAPR >= 0 ? "text-emerald-400" : "text-rose-400"}`;
        }
        onUpdate();
      });
    }
    if (UI2.inputStaking) {
      UI2.inputStaking.addEventListener("input", (e) => {
        state2.stakingAPY = parseFloat(e.target.value);
        if (UI2.valStaking) UI2.valStaking.textContent = state2.stakingAPY.toFixed(1) + "% APY";
        onUpdate();
      });
    }
    if (UI2.inputDepeg) {
      UI2.inputDepeg.addEventListener("input", (e) => {
        state2.depegPct = parseFloat(e.target.value);
        if (UI2.valDepeg) UI2.valDepeg.textContent = state2.depegPct.toFixed(1) + "% Discount";
        onUpdate();
      });
    }
    if (UI2.inputSplit) {
      UI2.inputSplit.addEventListener("input", (e) => {
        const spotPct = parseInt(e.target.value);
        state2.splitSpot = spotPct;
        const marginPct = 100 - spotPct;
        if (UI2.valSplit) UI2.valSplit.textContent = `${spotPct}% Spot / ${marginPct}% Margin`;
        const lev = spotPct / marginPct;
        const rLiq = (marginPct / spotPct - state2.mmr) / (1 + state2.mmr) * 100;
        if (UI2.splitHelperText) {
          UI2.splitHelperText.textContent = `Effective Short Leverage: ${lev.toFixed(2)}x (Liquidation buffer: +${rLiq.toFixed(1)}%)`;
        }
        onUpdate();
      });
    }
  }

  // src/ui/chart.js
  function drawChart(canvas, state2, currentRes) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
      const pMove = -100 + 200 * i / stepCount;
      const outcome = calculateOutcome(pMove, state2);
      pnlPoints.push({ x: pMove, y: outcome.totalPortfolioVal, isLiq: outcome.isLiquidated });
      const unhedged = state2.capital * (1 + pMove / 100);
      spotPoints.push({ x: pMove, y: unhedged });
      minVal = Math.min(minVal, outcome.totalPortfolioVal, unhedged);
      maxVal = Math.max(maxVal, outcome.totalPortfolioVal, unhedged);
    }
    const yMin = Math.max(0, Math.floor(minVal * 0.85 / 1e3) * 1e3);
    const yMax = Math.ceil(maxVal * 1.15 / 1e3) * 1e3;
    function toCanvasX(pMove) {
      return pad.left + (pMove - -100) / 200 * plotW;
    }
    function toCanvasY(val) {
      return pad.top + plotH - (val - yMin) / (yMax - yMin) * plotH;
    }
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#080d1a";
    ctx.fillRect(pad.left, pad.top, plotW, plotH);
    const yTicks = 5;
    ctx.strokeStyle = "#162238";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#64748b";
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= yTicks; i++) {
      const v = yMin + i / yTicks * (yMax - yMin);
      const y = toCanvasY(v);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + plotW, y);
      ctx.stroke();
      ctx.fillText("$" + Math.round(v).toLocaleString(), pad.left - 8, y);
    }
    const xTicks = [-100, -50, 0, 50, 100];
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (const xt of xTicks) {
      const x = toCanvasX(xt);
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + plotH);
      ctx.strokeStyle = xt === 0 ? "#2a3b5c" : "#141d30";
      ctx.stroke();
      ctx.fillStyle = xt === 0 ? "#38bdf8" : "#64748b";
      ctx.fillText((xt > 0 ? "+" : "") + xt + "%", x, pad.top + plotH + 8);
    }
    const yBase = toCanvasY(state2.capital);
    ctx.strokeStyle = "#334155";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, yBase);
    ctx.lineTo(pad.left + plotW, yBase);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "left";
    ctx.fillText("ENTRY BASE: $" + state2.capital.toLocaleString(), pad.left + 8, yBase - 8);
    const rLiqPct = currentRes.rLiq * 100;
    if (rLiqPct <= 100 && rLiqPct > -100) {
      const liqX = toCanvasX(rLiqPct);
      ctx.fillStyle = "rgba(244, 63, 94, 0.08)";
      ctx.fillRect(liqX, pad.top, pad.left + plotW - liqX, plotH);
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(liqX, pad.top);
      ctx.lineTo(liqX, pad.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#fb7185";
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("LIQ CLIFF (" + fmtPct(rLiqPct) + ")", liqX, pad.top + 14);
    }
    ctx.strokeStyle = "#475569";
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
    const areaGradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    areaGradient.addColorStop(0, "rgba(6, 182, 212, 0.22)");
    areaGradient.addColorStop(1, "rgba(6, 182, 212, 0.0)");
    ctx.fillStyle = areaGradient;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(-100), pad.top + plotH);
    for (let i = 0; i < pnlPoints.length; i++) {
      ctx.lineTo(toCanvasX(pnlPoints[i].x), toCanvasY(pnlPoints[i].y));
    }
    ctx.lineTo(toCanvasX(100), pad.top + plotH);
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < pnlPoints.length - 1; i++) {
      const pt1 = pnlPoints[i];
      const pt2 = pnlPoints[i + 1];
      ctx.beginPath();
      ctx.moveTo(toCanvasX(pt1.x), toCanvasY(pt1.y));
      ctx.lineTo(toCanvasX(pt2.x), toCanvasY(pt2.y));
      ctx.lineWidth = 2.5;
      if (pt1.isLiq || pt2.isLiq) {
        ctx.strokeStyle = "#f43f5e";
      } else {
        ctx.strokeStyle = "#06b6d4";
      }
      ctx.stroke();
    }
    const curX = toCanvasX(state2.priceMove);
    const curY = toCanvasY(currentRes.totalPortfolioVal);
    ctx.strokeStyle = currentRes.isLiquidated ? "rgba(244, 63, 94, 0.7)" : "rgba(6, 182, 212, 0.7)";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(curX, pad.top);
    ctx.lineTo(curX, pad.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowColor = currentRes.isLiquidated ? "#f43f5e" : "#06b6d4";
    ctx.shadowBlur = 12;
    ctx.fillStyle = currentRes.isLiquidated ? "#f43f5e" : "#22d3ee";
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    const badgeText = fmtUSD(currentRes.totalPortfolioVal);
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    const badgeW = ctx.measureText(badgeText).width + 12;
    const badgeH = 20;
    const badgeY = Math.max(pad.top + 8, curY - 26);
    const badgeX = Math.min(Math.max(pad.left + badgeW / 2, curX), pad.left + plotW - badgeW / 2);
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = currentRes.isLiquidated ? "#f43f5e" : "#06b6d4";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(badgeX - badgeW / 2, badgeY, badgeW, badgeH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = currentRes.isLiquidated ? "#fb7185" : "#38bdf8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, badgeX, badgeY + badgeH / 2);
  }
  function setupChartInteractions(canvas, tooltipEls, getState) {
    if (!canvas || !tooltipEls.tooltip) return;
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const pad = { top: 25, right: 30, bottom: 45, left: 65 };
      const plotW = rect.width - pad.left - pad.right;
      if (mouseX < pad.left || mouseX > pad.left + plotW || mouseY < pad.top || mouseY > rect.height - pad.bottom) {
        tooltipEls.tooltip.classList.add("hidden");
        return;
      }
      const hoverPriceMove = -100 + (mouseX - pad.left) / plotW * 200;
      const currentState = getState();
      const res = calculateOutcome(hoverPriceMove, currentState);
      tooltipEls.tooltip.classList.remove("hidden");
      tooltipEls.tooltip.style.left = `${Math.min(mouseX + 15, rect.width - 180)}px`;
      tooltipEls.tooltip.style.top = `${Math.max(mouseY - 75, 10)}px`;
      tooltipEls.ttPrice.textContent = `Price Move: ${fmtPct(hoverPriceMove)}`;
      tooltipEls.ttVal.textContent = `Portfolio: ${fmtUSD(res.totalPortfolioVal)}`;
      tooltipEls.ttRoi.textContent = `ROI: ${fmtPct(res.roiPct)}`;
      tooltipEls.ttStatus.textContent = res.isLiquidated ? "Status: 100% Unhedged Long" : currentState.mode === "unified" ? "Status: Cross-Margin Protected" : "Status: Isolated Hedged";
      tooltipEls.ttStatus.className = res.isLiquidated ? "text-[10px] text-rose-400 font-bold" : "text-[10px] text-cyan-400";
    });
    canvas.addEventListener("mouseleave", () => {
      tooltipEls.tooltip.classList.add("hidden");
    });
  }

  // src/app.js
  var state = {
    mode: "unified",
    // 'unified' | 'isolated'
    capital: 1e4,
    priceMove: 0,
    // % (-100 to +100)
    days: 90,
    fundingAPR: 10,
    // %
    stakingAPY: 3.2,
    // %
    depegPct: 0,
    // %
    mmr: 5e-3,
    // 0.5% exchange maintenance margin requirement
    // Traded Instrument selection
    tradedAsset: "ETH",
    // 'ETH' | 'BTC' | 'SOL'
    btcVariant: "lbtc",
    // 'native' | 'lbtc' | 'solvbtc' (Available in Isolated Mode)
    // Unified Mode specific
    activePreset: "wsteth_90",
    collateralRatio: 0.9,
    // 0.90 = 10% haircut
    solYieldType: "real",
    // 'nominal' (7.2%) | 'real' (1.8%) - default is real yield
    // Isolated Mode specific
    splitSpot: 50
    // % (Spot fraction; remainder is margin)
  };
  var UI = {};
  function updateApp() {
    const res = calculateOutcome(state.priceMove, state);
    renderUI(UI, state, res);
    drawChart(UI.canvas, state, res);
  }
  function setAccountMode(mode) {
    state.mode = mode;
    if (mode === "unified") {
      if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = "px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow";
      if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = "px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
      if (UI.panelUnifiedPresets) UI.panelUnifiedPresets.classList.remove("hidden");
      if (UI.panelIsolatedSplit) UI.panelIsolatedSplit.classList.add("hidden");
      if (UI.chartSubCaption) UI.chartSubCaption.textContent = "Cross-collateralized: Spot collateral appreciation cushions perp losses";
      if (state.tradedAsset === "BTC") {
        state.stakingAPY = 0;
        if (UI.inputStaking) UI.inputStaking.value = 0;
        if (UI.valStaking) UI.valStaking.textContent = "0.0% APY";
      }
      applyCollateralPreset(state.activePreset || "wsteth_90");
    } else {
      if (UI.modeIsolatedBtn) UI.modeIsolatedBtn.className = "px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 bg-cyan-500 text-black shadow";
      if (UI.modeUnifiedBtn) UI.modeUnifiedBtn.className = "px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
      if (UI.panelUnifiedPresets) UI.panelUnifiedPresets.classList.add("hidden");
      if (UI.panelIsolatedSplit) UI.panelIsolatedSplit.classList.remove("hidden");
      if (UI.chartSubCaption) UI.chartSubCaption.textContent = "Isolated cash margin: Sharp rallies can deplete collateral and trigger liquidation";
      if (state.tradedAsset === "BTC") {
        const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
        state.stakingAPY = btcMeta.stakingAPY;
        if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
        if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + "% APY";
      } else if (state.tradedAsset === "SOL") {
        state.stakingAPY = state.solYieldType === "nominal" ? 7.2 : 1.8;
        if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
        if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + "% APY";
      }
    }
    updateApp();
  }
  function setTradedAsset(asset) {
    state.tradedAsset = asset;
    if (state.mode === "unified") {
      if (asset === "SOL") {
        applyCollateralPreset("sol_lrt_85");
        return;
      } else if (asset === "BTC") {
        state.stakingAPY = 0;
        if (UI.inputStaking) UI.inputStaking.value = 0;
        if (UI.valStaking) UI.valStaking.textContent = "0.0% APY";
        if (state.activePreset === "wsteth_90" || state.activePreset === "sol_lrt_85") {
          applyCollateralPreset("btc_eth_95");
          return;
        }
      } else if (asset === "ETH") {
        if (state.activePreset === "sol_lrt_85") {
          applyCollateralPreset("wsteth_90");
          return;
        }
      }
    } else {
      if (asset === "BTC") {
        const btcMeta = BTC_LST_VARIANTS[state.btcVariant] || BTC_LST_VARIANTS.lbtc;
        state.stakingAPY = btcMeta.stakingAPY;
      } else if (asset === "ETH") {
        state.stakingAPY = 3.2;
      } else if (asset === "SOL") {
        state.stakingAPY = state.solYieldType === "nominal" ? 7.2 : 1.8;
      }
      if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
      if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + "% APY";
    }
    updateApp();
  }
  function setBtcVariant(variant) {
    state.btcVariant = variant;
    const btcMeta = BTC_LST_VARIANTS[variant] || BTC_LST_VARIANTS.lbtc;
    state.stakingAPY = btcMeta.stakingAPY;
    if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
    if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + "% APY";
    updateApp();
  }
  function applyCollateralPreset(presetKey) {
    state.activePreset = presetKey;
    ["btn-preset-100", "btn-preset-95", "btn-preset-90", "btn-preset-85"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.className = "preset-choice p-2 rounded-lg bg-brand-dark hover:bg-slate-800 border border-brand-border text-left transition";
      const title = el.querySelector(".font-bold");
      if (title) title.className = "font-bold text-white";
    });
    const activeBtnId = {
      "inverse_100": "btn-preset-100",
      "btc_eth_95": "btn-preset-95",
      "wsteth_90": "btn-preset-90",
      "sol_lrt_85": "btn-preset-85"
    }[presetKey];
    if (activeBtnId) {
      const btn = document.getElementById(activeBtnId);
      if (btn) {
        btn.className = "preset-choice p-2 rounded-lg bg-cyan-950/80 border border-cyan-500 text-left transition";
        const title = btn.querySelector(".font-bold");
        if (title) title.className = "font-bold text-cyan-300";
      }
    }
    if (UI.jitosolToggleBox) {
      if (presetKey === "sol_lrt_85") {
        UI.jitosolToggleBox.classList.remove("hidden");
      } else {
        UI.jitosolToggleBox.classList.add("hidden");
      }
    }
    const presetConfig = COLLATERAL_PRESETS[presetKey];
    if (presetConfig) {
      state.collateralRatio = presetConfig.collateralRatio;
      if (presetKey === "sol_lrt_85") {
        state.stakingAPY = state.solYieldType === "nominal" ? 7.2 : 1.8;
        state.tradedAsset = "SOL";
        if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
        if (UI.collateralRatioExplainer) UI.collateralRatioExplainer.textContent = presetConfig.getExplainer(state.solYieldType);
      } else if (presetKey === "wsteth_90") {
        state.stakingAPY = presetConfig.stakingAPY;
        state.tradedAsset = "ETH";
        if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
        if (UI.collateralRatioExplainer) UI.collateralRatioExplainer.textContent = presetConfig.explainer;
      } else {
        state.stakingAPY = presetConfig.stakingAPY;
        if (state.tradedAsset !== "BTC" && state.tradedAsset !== "ETH") state.tradedAsset = "BTC";
        if (UI.valCollateralRatio) UI.valCollateralRatio.textContent = presetConfig.badgeLabel;
        if (UI.collateralRatioExplainer) UI.collateralRatioExplainer.textContent = presetConfig.explainer;
      }
    }
    if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
    if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + "% APY";
    updateApp();
  }
  function setSolYieldType(type) {
    state.solYieldType = type;
    if (type === "nominal") {
      state.stakingAPY = 7.2;
      if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = "Nominal (+7.2%)";
      if (UI.btnSolNominal) UI.btnSolNominal.className = "py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold";
      if (UI.btnSolReal) UI.btnSolReal.className = "py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    } else {
      state.stakingAPY = 1.8;
      if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = "Real (+1.8%)";
      if (UI.btnSolReal) UI.btnSolReal.className = "py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold";
      if (UI.btnSolNominal) UI.btnSolNominal.className = "py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    }
    const subtext85 = document.getElementById("subtext-preset-85");
    if (subtext85) {
      subtext85.textContent = type === "nominal" ? "15% Haircut | 7.2% Stake" : "15% Haircut | 1.8% Real Stake";
    }
    if (state.activePreset === "sol_lrt_85" && UI.collateralRatioExplainer) {
      UI.collateralRatioExplainer.textContent = type === "nominal" ? "Solana / Liquid Restaking (Nominal 7.2%). Stacks high base yield with a +545% price surge liquidation buffer." : "Solana / Liquid Restaking (Real Yield 1.8%). Stacks inflation-adjusted real yield with a +545% price surge liquidation buffer.";
    }
    if (UI.inputStaking) UI.inputStaking.value = state.stakingAPY;
    if (UI.valStaking) UI.valStaking.textContent = state.stakingAPY.toFixed(1) + "% APY";
    updateApp();
  }
  function setPriceChange(pct) {
    state.priceMove = pct;
    if (UI.inputPriceMove) UI.inputPriceMove.value = pct;
    if (UI.valPriceMove) UI.valPriceMove.textContent = fmtPct(pct);
    updateApp();
  }
  function setDays(d) {
    state.days = d;
    if (UI.inputDays) UI.inputDays.value = d;
    if (UI.valDays) UI.valDays.textContent = `${d} Day${d === 1 ? "" : "s"}`;
    updateApp();
  }
  function setSplit(spotPct) {
    state.splitSpot = spotPct;
    if (UI.inputSplit) UI.inputSplit.value = spotPct;
    const marginPct = 100 - spotPct;
    if (UI.valSplit) UI.valSplit.textContent = `${spotPct}% Spot / ${marginPct}% Margin`;
    const lev = spotPct / marginPct;
    const rLiq = (marginPct / spotPct - state.mmr) / (1 + state.mmr) * 100;
    if (UI.splitHelperText) {
      UI.splitHelperText.textContent = `Effective Short Leverage: ${lev.toFixed(2)}x (Liquidation buffer: +${rLiq.toFixed(1)}%)`;
    }
    updateApp();
  }
  function resetDefaults() {
    state.tradedAsset = "ETH";
    state.btcVariant = "lbtc";
    state.solYieldType = "real";
    if (UI.labelSolYieldMode) UI.labelSolYieldMode.textContent = "Real (+1.8%)";
    if (UI.btnSolReal) UI.btnSolReal.className = "py-1 px-2 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold";
    if (UI.btnSolNominal) UI.btnSolNominal.className = "py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    const subtext85 = document.getElementById("subtext-preset-85");
    if (subtext85) subtext85.textContent = "15% Haircut | 1.8% Real Stake";
    setAccountMode("unified");
    applyCollateralPreset("wsteth_90");
    setPriceChange(0);
    setDays(90);
    state.capital = 1e4;
    if (UI.inputCapital) UI.inputCapital.value = 1e4;
    if (UI.valCapital) UI.valCapital.textContent = "$10,000";
    state.fundingAPR = 10;
    if (UI.inputFunding) UI.inputFunding.value = 10;
    if (UI.valFunding) UI.valFunding.textContent = "+10.00% APR";
    state.depegPct = 0;
    if (UI.inputDepeg) UI.inputDepeg.value = 0;
    if (UI.valDepeg) UI.valDepeg.textContent = "0.0% Discount";
    setSplit(50);
    updateApp();
  }
  window.setAccountMode = setAccountMode;
  window.setTradedAsset = setTradedAsset;
  window.setBtcVariant = setBtcVariant;
  window.applyCollateralPreset = applyCollateralPreset;
  window.setSolYieldType = setSolYieldType;
  window.setPriceChange = setPriceChange;
  window.setDays = setDays;
  window.setSplit = setSplit;
  window.resetDefaults = resetDefaults;
  function init() {
    UI = getUIElements();
    bindInputListeners(UI, state, updateApp);
    setupChartInteractions(UI.canvas, UI, () => state);
    if (UI.canvas && UI.canvas.parentElement) {
      const ro = new ResizeObserver(() => {
        updateApp();
      });
      ro.observe(UI.canvas.parentElement);
    }
    applyCollateralPreset("wsteth_90");
    setSplit(50);
    updateApp();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
