/**
 * @file fundingApi.ts
 * @description REST API client and parsers for Binance Futures & Hyperliquid Perpetual Funding Rates.
 */

import { type VenueRateInfo, FALLBACK_MARKET_DATA } from './types.js';

export async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = 6000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(init?.headers || {})
      }
    });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

export function parseBinanceFunding(data: any): {
  apr: number;
  rate8h: number;
  markPrice: number;
  indexPrice: number;
  nextFundingTime: number;
} {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid Binance funding payload');
  }
  const rate8h = parseFloat(data.lastFundingRate);
  if (isNaN(rate8h)) throw new Error('Invalid lastFundingRate');

  const apr = parseFloat((rate8h * 3 * 365 * 100).toFixed(2));
  const markPrice = parseFloat(data.markPrice) || 0;
  const indexPrice = parseFloat(data.indexPrice) || markPrice;
  const nextFundingTime = parseInt(data.nextFundingTime, 10) || 0;

  return { apr, rate8h, markPrice, indexPrice, nextFundingTime };
}

export function parseHyperliquidFunding(
  data: any,
  symbol: 'ETH' | 'BTC' | 'SOL'
): {
  apr: number;
  rate1h: number;
  markPrice: number;
} {
  if (!Array.isArray(data) || data.length < 2 || !data[0]?.universe || !Array.isArray(data[1])) {
    throw new Error('Invalid Hyperliquid market payload');
  }
  const idx = data[0].universe.findIndex((u: any) => u.name === symbol);
  if (idx < 0) throw new Error(`Symbol ${symbol} not found on Hyperliquid`);

  const ctx = data[1][idx];
  const rate1h = parseFloat(ctx?.funding);
  if (isNaN(rate1h)) throw new Error('Invalid Hyperliquid funding');

  const apr = parseFloat((rate1h * 24 * 365 * 100).toFixed(2));
  const markPrice = parseFloat(ctx?.markPx) || 0;

  return { apr, rate1h, markPrice };
}

export async function fetchBinanceRates(symbol: 'ETH' | 'BTC' | 'SOL'): Promise<VenueRateInfo> {
  const pair = `${symbol}USDT`;
  try {
    const res = await fetchWithTimeout(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${pair}`, undefined, 5000);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const parsed = parseBinanceFunding(data);
    return {
      apr: parsed.apr,
      rateInterval: parsed.rate8h,
      markPrice: parsed.markPrice,
      nextFundingTime: parsed.nextFundingTime,
      status: 'live',
      venueName: `Binance (${pair})`
    };
  } catch {
    const fb = FALLBACK_MARKET_DATA[symbol].venues.binance;
    return { ...fb, status: 'fallback' };
  }
}

export async function fetchHyperliquidRates(symbol: 'ETH' | 'BTC' | 'SOL', cachedHlData?: any): Promise<VenueRateInfo> {
  try {
    let data = cachedHlData;
    if (!data) {
      const res = await fetchWithTimeout('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      }, 5000);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    }
    const parsed = parseHyperliquidFunding(data, symbol);
    return {
      apr: parsed.apr,
      rateInterval: parsed.rate1h,
      markPrice: parsed.markPrice,
      nextFundingTime: Date.now() + 3600000,
      status: 'live',
      venueName: `Hyperliquid (${symbol}-PERP)`
    };
  } catch {
    const fb = FALLBACK_MARKET_DATA[symbol].venues.hyperliquid;
    return { ...fb, status: 'fallback' };
  }
}
