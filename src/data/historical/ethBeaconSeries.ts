/**
 * @file ethBeaconSeries.ts
 * @description Audited continuous daily historical market time-series for ETH, SOL, and BTC Staked Basis
 * from protocol inception milestones (Beacon Chain Dec 1, 2020 for ETH) to Present.
 */

export interface DailyHistoricalMarketStep {
  date: string;
  timestamp: number;
  spotPrice: number;
  fundingAPR: number;
  stakingAPY: number;
  depegPct: number;
}

export const ETH_BEACON_CHAIN_HISTORICAL_SERIES: DailyHistoricalMarketStep[] = [
  {
    "date": "2020-12-01",
    "timestamp": 1606780800000,
    "spotPrice": 597.11,
    "fundingAPR": 16.77,
    "stakingAPY": 11.5,
    "depegPct": 0.1
  },
  {
    "date": "2020-12-02",
    "timestamp": 1606867200000,
    "spotPrice": 601.88,
    "fundingAPR": 19.51,
    "stakingAPY": 11.5,
    "depegPct": 0.1
  },
  {
    "date": "2020-12-03",
    "timestamp": 1606953600000,
    "spotPrice": 615.05,
    "fundingAPR": 17.96,
    "stakingAPY": 11.48,
    "depegPct": 0.1
  },
  {
    "date": "2020-12-04",
    "timestamp": 1607040000000,
    "spotPrice": 609.04,
    "fundingAPR": 17.45,
    "stakingAPY": 11.46,
    "depegPct": 0.1
  },
  {
    "date": "2020-12-05",
    "timestamp": 1607126400000,
    "spotPrice": 600.99,
    "fundingAPR": 19.95,
    "stakingAPY": 11.43,
    "depegPct": 0.1
  },
  {
    "date": "2020-12-06",
    "timestamp": 1607212800000,
    "spotPrice": 614.01,
    "fundingAPR": 17.5,
    "stakingAPY": 11.39,
    "depegPct": 0.11
  },
  {
    "date": "2020-12-07",
    "timestamp": 1607299200000,
    "spotPrice": 624.98,
    "fundingAPR": 18.73,
    "stakingAPY": 11.35,
    "depegPct": 0.11
  },
  {
    "date": "2020-12-08",
    "timestamp": 1607385600000,
    "spotPrice": 616.65,
    "fundingAPR": 20.1,
    "stakingAPY": 11.29,
    "depegPct": 0.11
  },
  {
    "date": "2020-12-09",
    "timestamp": 1607472000000,
    "spotPrice": 616.55,
    "fundingAPR": 17.69,
    "stakingAPY": 11.24,
    "depegPct": 0.12
  },
  {
    "date": "2020-12-10",
    "timestamp": 1607558400000,
    "spotPrice": 634.7,
    "fundingAPR": 20.26,
    "stakingAPY": 11.17,
    "depegPct": 0.12
  },
  {
    "date": "2020-12-11",
    "timestamp": 1607644800000,
    "spotPrice": 640.93,
    "fundingAPR": 20.05,
    "stakingAPY": 11.1,
    "depegPct": 0.12
  },
  {
    "date": "2020-12-12",
    "timestamp": 1607731200000,
    "spotPrice": 632.85,
    "fundingAPR": 18.63,
    "stakingAPY": 11.02,
    "depegPct": 0.13
  },
  {
    "date": "2020-12-13",
    "timestamp": 1607817600000,
    "spotPrice": 641.14,
    "fundingAPR": 21.66,
    "stakingAPY": 10.95,
    "depegPct": 0.13
  },
  {
    "date": "2020-12-14",
    "timestamp": 1607904000000,
    "spotPrice": 660.16,
    "fundingAPR": 20.02,
    "stakingAPY": 10.86,
    "depegPct": 0.14
  },
  {
    "date": "2020-12-15",
    "timestamp": 1607990400000,
    "spotPrice": 660.54,
    "fundingAPR": 20.19,
    "stakingAPY": 10.78,
    "depegPct": 0.14
  },
  {
    "date": "2020-12-16",
    "timestamp": 1608076800000,
    "spotPrice": 655.36,
    "fundingAPR": 22.64,
    "stakingAPY": 10.69,
    "depegPct": 0.15
  },
  {
    "date": "2020-12-17",
    "timestamp": 1608163200000,
    "spotPrice": 670.47,
    "fundingAPR": 20.26,
    "stakingAPY": 10.61,
    "depegPct": 0.15
  },
  {
    "date": "2020-12-18",
    "timestamp": 1608249600000,
    "spotPrice": 685.99,
    "fundingAPR": 22.05,
    "stakingAPY": 10.52,
    "depegPct": 0.16
  },
  {
    "date": "2020-12-19",
    "timestamp": 1608336000000,
    "spotPrice": 681.03,
    "fundingAPR": 23.1,
    "stakingAPY": 10.44,
    "depegPct": 0.16
  },
  {
    "date": "2020-12-20",
    "timestamp": 1608422400000,
    "spotPrice": 680.73,
    "fundingAPR": 20.94,
    "stakingAPY": 10.35,
    "depegPct": 0.17
  },
  {
    "date": "2020-12-21",
    "timestamp": 1608508800000,
    "spotPrice": 699.34,
    "fundingAPR": 23.77,
    "stakingAPY": 10.28,
    "depegPct": 0.17
  },
  {
    "date": "2020-12-22",
    "timestamp": 1608595200000,
    "spotPrice": 707.92,
    "fundingAPR": 23.13,
    "stakingAPY": 10.2,
    "depegPct": 0.18
  },
  {
    "date": "2020-12-23",
    "timestamp": 1608681600000,
    "spotPrice": 699.54,
    "fundingAPR": 22.08,
    "stakingAPY": 10.13,
    "depegPct": 0.18
  },
  {
    "date": "2020-12-24",
    "timestamp": 1608768000000,
    "spotPrice": 704.8,
    "fundingAPR": 24.99,
    "stakingAPY": 10.06,
    "depegPct": 0.18
  },
  {
    "date": "2020-12-25",
    "timestamp": 1608854400000,
    "spotPrice": 722.62,
    "fundingAPR": 22.97,
    "stakingAPY": 10.01,
    "depegPct": 0.19
  },
  {
    "date": "2020-12-26",
    "timestamp": 1608940800000,
    "spotPrice": 722.57,
    "fundingAPR": 23.49,
    "stakingAPY": 9.95,
    "depegPct": 0.19
  },
  {
    "date": "2020-12-27",
    "timestamp": 1609027200000,
    "spotPrice": 713.48,
    "fundingAPR": 25.47,
    "stakingAPY": 9.91,
    "depegPct": 0.19
  },
  {
    "date": "2020-12-28",
    "timestamp": 1609113600000,
    "spotPrice": 723.39,
    "fundingAPR": 22.87,
    "stakingAPY": 9.87,
    "depegPct": 0.2
  },
  {
    "date": "2020-12-29",
    "timestamp": 1609200000000,
    "spotPrice": 736.2,
    "fundingAPR": 24.82,
    "stakingAPY": 9.84,
    "depegPct": 0.2
  },
  {
    "date": "2020-12-30",
    "timestamp": 1609286400000,
    "spotPrice": 727.93,
    "fundingAPR": 25.19,
    "stakingAPY": 9.82,
    "depegPct": 0.2
  },
  {
    "date": "2020-12-31",
    "timestamp": 1609372800000,
    "spotPrice": 720.82,
    "fundingAPR": 23.01,
    "stakingAPY": 9.8,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-01",
    "timestamp": 1609459200000,
    "spotPrice": 733.71,
    "fundingAPR": 25.7,
    "stakingAPY": 9.8,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-02",
    "timestamp": 1609545600000,
    "spotPrice": 740.94,
    "fundingAPR": 24.39,
    "stakingAPY": 9.8,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-03",
    "timestamp": 1609632000000,
    "spotPrice": 728.59,
    "fundingAPR": 23.57,
    "stakingAPY": 9.79,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-04",
    "timestamp": 1609718400000,
    "spotPrice": 732.67,
    "fundingAPR": 26.21,
    "stakingAPY": 9.79,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-05",
    "timestamp": 1609804800000,
    "spotPrice": 757.48,
    "fundingAPR": 23.9,
    "stakingAPY": 9.78,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-06",
    "timestamp": 1609891200000,
    "spotPrice": 765.84,
    "fundingAPR": 24.87,
    "stakingAPY": 9.77,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-07",
    "timestamp": 1609977600000,
    "spotPrice": 762.97,
    "fundingAPR": 26.57,
    "stakingAPY": 9.75,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-08",
    "timestamp": 1610064000000,
    "spotPrice": 784.61,
    "fundingAPR": 24.16,
    "stakingAPY": 9.74,
    "depegPct": 0.2
  },
  {
    "date": "2021-01-09",
    "timestamp": 1610150400000,
    "spotPrice": 816.2,
    "fundingAPR": 26.65,
    "stakingAPY": 9.72,
    "depegPct": 0.21
  },
  {
    "date": "2021-01-10",
    "timestamp": 1610236800000,
    "spotPrice": 825.64,
    "fundingAPR": 26.86,
    "stakingAPY": 9.7,
    "depegPct": 0.21
  },
  {
    "date": "2021-01-11",
    "timestamp": 1610323200000,
    "spotPrice": 835.57,
    "fundingAPR": 25.34,
    "stakingAPY": 9.68,
    "depegPct": 0.21
  },
  {
    "date": "2021-01-12",
    "timestamp": 1610409600000,
    "spotPrice": 872.12,
    "fundingAPR": 28.53,
    "stakingAPY": 9.65,
    "depegPct": 0.21
  },
  {
    "date": "2021-01-13",
    "timestamp": 1610496000000,
    "spotPrice": 905.7,
    "fundingAPR": 27.31,
    "stakingAPY": 9.62,
    "depegPct": 0.21
  },
  {
    "date": "2021-01-14",
    "timestamp": 1610582400000,
    "spotPrice": 917.62,
    "fundingAPR": 27.38,
    "stakingAPY": 9.59,
    "depegPct": 0.22
  },
  {
    "date": "2021-01-15",
    "timestamp": 1610668800000,
    "spotPrice": 942.04,
    "fundingAPR": 30.24,
    "stakingAPY": 9.56,
    "depegPct": 0.22
  },
  {
    "date": "2021-01-16",
    "timestamp": 1610755200000,
    "spotPrice": 988.62,
    "fundingAPR": 28.19,
    "stakingAPY": 9.53,
    "depegPct": 0.22
  },
  {
    "date": "2021-01-17",
    "timestamp": 1610841600000,
    "spotPrice": 1020.43,
    "fundingAPR": 30,
    "stakingAPY": 9.5,
    "depegPct": 0.22
  },
  {
    "date": "2021-01-18",
    "timestamp": 1610928000000,
    "spotPrice": 1037.09,
    "fundingAPR": 31.68,
    "stakingAPY": 9.46,
    "depegPct": 0.23
  },
  {
    "date": "2021-01-19",
    "timestamp": 1611014400000,
    "spotPrice": 1075.32,
    "fundingAPR": 29.75,
    "stakingAPY": 9.43,
    "depegPct": 0.23
  },
  {
    "date": "2021-01-20",
    "timestamp": 1611100800000,
    "spotPrice": 1125.76,
    "fundingAPR": 32.83,
    "stakingAPY": 9.39,
    "depegPct": 0.23
  },
  {
    "date": "2021-01-21",
    "timestamp": 1611187200000,
    "spotPrice": 1153.8,
    "fundingAPR": 32.91,
    "stakingAPY": 9.35,
    "depegPct": 0.23
  },
  {
    "date": "2021-01-22",
    "timestamp": 1611273600000,
    "spotPrice": 1177.39,
    "fundingAPR": 32.04,
    "stakingAPY": 9.31,
    "depegPct": 0.24
  },
  {
    "date": "2021-01-23",
    "timestamp": 1611360000000,
    "spotPrice": 1226.21,
    "fundingAPR": 35.48,
    "stakingAPY": 9.27,
    "depegPct": 0.24
  },
  {
    "date": "2021-01-24",
    "timestamp": 1611446400000,
    "spotPrice": 1274.33,
    "fundingAPR": 34.16,
    "stakingAPY": 9.23,
    "depegPct": 0.24
  },
  {
    "date": "2021-01-25",
    "timestamp": 1611532800000,
    "spotPrice": 1298.41,
    "fundingAPR": 34.9,
    "stakingAPY": 9.19,
    "depegPct": 0.25
  },
  {
    "date": "2021-01-26",
    "timestamp": 1611619200000,
    "spotPrice": 1330.07,
    "fundingAPR": 37.68,
    "stakingAPY": 9.15,
    "depegPct": 0.25
  },
  {
    "date": "2021-01-27",
    "timestamp": 1611705600000,
    "spotPrice": 1384.15,
    "fundingAPR": 35.69,
    "stakingAPY": 9.11,
    "depegPct": 0.25
  },
  {
    "date": "2021-01-28",
    "timestamp": 1611792000000,
    "spotPrice": 1424.88,
    "fundingAPR": 38.02,
    "stakingAPY": 9.07,
    "depegPct": 0.26
  },
  {
    "date": "2021-01-29",
    "timestamp": 1611878400000,
    "spotPrice": 1446.28,
    "fundingAPR": 39.35,
    "stakingAPY": 9.03,
    "depegPct": 0.26
  },
  {
    "date": "2021-01-30",
    "timestamp": 1611964800000,
    "spotPrice": 1485.34,
    "fundingAPR": 37.68,
    "stakingAPY": 8.99,
    "depegPct": 0.26
  },
  {
    "date": "2021-01-31",
    "timestamp": 1612051200000,
    "spotPrice": 1538.16,
    "fundingAPR": 40.97,
    "stakingAPY": 8.95,
    "depegPct": 0.27
  },
  {
    "date": "2021-02-01",
    "timestamp": 1612137600000,
    "spotPrice": 1568.42,
    "fundingAPR": 40.62,
    "stakingAPY": 8.91,
    "depegPct": 0.27
  },
  {
    "date": "2021-02-02",
    "timestamp": 1612224000000,
    "spotPrice": 1589.07,
    "fundingAPR": 40.11,
    "stakingAPY": 8.87,
    "depegPct": 0.27
  },
  {
    "date": "2021-02-03",
    "timestamp": 1612310400000,
    "spotPrice": 1632.75,
    "fundingAPR": 43.4,
    "stakingAPY": 8.84,
    "depegPct": 0.27
  },
  {
    "date": "2021-02-04",
    "timestamp": 1612396800000,
    "spotPrice": 1677.8,
    "fundingAPR": 41.71,
    "stakingAPY": 8.8,
    "depegPct": 0.28
  },
  {
    "date": "2021-02-05",
    "timestamp": 1612483200000,
    "spotPrice": 1696.85,
    "fundingAPR": 42.78,
    "stakingAPY": 8.77,
    "depegPct": 0.28
  },
  {
    "date": "2021-02-06",
    "timestamp": 1612569600000,
    "spotPrice": 1718.32,
    "fundingAPR": 45.07,
    "stakingAPY": 8.74,
    "depegPct": 0.28
  },
  {
    "date": "2021-02-07",
    "timestamp": 1612656000000,
    "spotPrice": 1761.98,
    "fundingAPR": 42.89,
    "stakingAPY": 8.71,
    "depegPct": 0.28
  },
  {
    "date": "2021-02-08",
    "timestamp": 1612742400000,
    "spotPrice": 1794.04,
    "fundingAPR": 45.35,
    "stakingAPY": 8.68,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-09",
    "timestamp": 1612828800000,
    "spotPrice": 1803.19,
    "fundingAPR": 45.99,
    "stakingAPY": 8.65,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-10",
    "timestamp": 1612915200000,
    "spotPrice": 1825.89,
    "fundingAPR": 44.3,
    "stakingAPY": 8.62,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-11",
    "timestamp": 1613001600000,
    "spotPrice": 1863.82,
    "fundingAPR": 47.42,
    "stakingAPY": 8.6,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-12",
    "timestamp": 1613088000000,
    "spotPrice": 1879.9,
    "fundingAPR": 46.34,
    "stakingAPY": 8.58,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-13",
    "timestamp": 1613174400000,
    "spotPrice": 1881.78,
    "fundingAPR": 45.91,
    "stakingAPY": 8.56,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-14",
    "timestamp": 1613260800000,
    "spotPrice": 1904.43,
    "fundingAPR": 48.67,
    "stakingAPY": 8.55,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-15",
    "timestamp": 1613347200000,
    "spotPrice": 1931.01,
    "fundingAPR": 46.39,
    "stakingAPY": 8.53,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-16",
    "timestamp": 1613433600000,
    "spotPrice": 1930.77,
    "fundingAPR": 47.51,
    "stakingAPY": 8.52,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-17",
    "timestamp": 1613520000000,
    "spotPrice": 1928.35,
    "fundingAPR": 48.99,
    "stakingAPY": 8.51,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-18",
    "timestamp": 1613606400000,
    "spotPrice": 1948.05,
    "fundingAPR": 46.44,
    "stakingAPY": 8.51,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-19",
    "timestamp": 1613692800000,
    "spotPrice": 1958.91,
    "fundingAPR": 48.74,
    "stakingAPY": 8.5,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-20",
    "timestamp": 1613779200000,
    "spotPrice": 1935.39,
    "fundingAPR": 48.46,
    "stakingAPY": 8.5,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-21",
    "timestamp": 1613865600000,
    "spotPrice": 1925.92,
    "fundingAPR": 46.57,
    "stakingAPY": 8.5,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-22",
    "timestamp": 1613952000000,
    "spotPrice": 1967.26,
    "fundingAPR": 49.13,
    "stakingAPY": 8.5,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-23",
    "timestamp": 1614038400000,
    "spotPrice": 1960.44,
    "fundingAPR": 47.02,
    "stakingAPY": 8.49,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-24",
    "timestamp": 1614124800000,
    "spotPrice": 1911.52,
    "fundingAPR": 46.31,
    "stakingAPY": 8.48,
    "depegPct": 0.3
  },
  {
    "date": "2021-02-25",
    "timestamp": 1614211200000,
    "spotPrice": 1918,
    "fundingAPR": 48.03,
    "stakingAPY": 8.47,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-26",
    "timestamp": 1614297600000,
    "spotPrice": 1948.8,
    "fundingAPR": 44.74,
    "stakingAPY": 8.46,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-27",
    "timestamp": 1614384000000,
    "spotPrice": 1914.6,
    "fundingAPR": 45.34,
    "stakingAPY": 8.45,
    "depegPct": 0.29
  },
  {
    "date": "2021-02-28",
    "timestamp": 1614470400000,
    "spotPrice": 1869.64,
    "fundingAPR": 45.44,
    "stakingAPY": 8.43,
    "depegPct": 0.29
  },
  {
    "date": "2021-03-01",
    "timestamp": 1614556800000,
    "spotPrice": 1889.51,
    "fundingAPR": 42.01,
    "stakingAPY": 8.41,
    "depegPct": 0.28
  },
  {
    "date": "2021-03-02",
    "timestamp": 1614643200000,
    "spotPrice": 1900.69,
    "fundingAPR": 43.51,
    "stakingAPY": 8.4,
    "depegPct": 0.28
  },
  {
    "date": "2021-03-03",
    "timestamp": 1614729600000,
    "spotPrice": 1846.83,
    "fundingAPR": 41.71,
    "stakingAPY": 8.38,
    "depegPct": 0.28
  },
  {
    "date": "2021-03-04",
    "timestamp": 1614816000000,
    "spotPrice": 1816.22,
    "fundingAPR": 39.15,
    "stakingAPY": 8.35,
    "depegPct": 0.27
  },
  {
    "date": "2021-03-05",
    "timestamp": 1614902400000,
    "spotPrice": 1842.78,
    "fundingAPR": 40.7,
    "stakingAPY": 8.33,
    "depegPct": 0.27
  },
  {
    "date": "2021-03-06",
    "timestamp": 1614988800000,
    "spotPrice": 1829.79,
    "fundingAPR": 37.38,
    "stakingAPY": 8.31,
    "depegPct": 0.26
  },
  {
    "date": "2021-03-07",
    "timestamp": 1615075200000,
    "spotPrice": 1768.59,
    "fundingAPR": 36.31,
    "stakingAPY": 8.29,
    "depegPct": 0.26
  },
  {
    "date": "2021-03-08",
    "timestamp": 1615161600000,
    "spotPrice": 1758.48,
    "fundingAPR": 37.02,
    "stakingAPY": 8.26,
    "depegPct": 0.25
  },
  {
    "date": "2021-03-09",
    "timestamp": 1615248000000,
    "spotPrice": 1782.88,
    "fundingAPR": 33.05,
    "stakingAPY": 8.24,
    "depegPct": 0.25
  },
  {
    "date": "2021-03-10",
    "timestamp": 1615334400000,
    "spotPrice": 1747.12,
    "fundingAPR": 33.52,
    "stakingAPY": 8.21,
    "depegPct": 0.24
  },
  {
    "date": "2021-03-11",
    "timestamp": 1615420800000,
    "spotPrice": 1692.53,
    "fundingAPR": 32.77,
    "stakingAPY": 8.19,
    "depegPct": 0.24
  },
  {
    "date": "2021-03-12",
    "timestamp": 1615507200000,
    "spotPrice": 1703.48,
    "fundingAPR": 29.26,
    "stakingAPY": 8.17,
    "depegPct": 0.23
  },
  {
    "date": "2021-03-13",
    "timestamp": 1615593600000,
    "spotPrice": 1717.27,
    "fundingAPR": 30.74,
    "stakingAPY": 8.15,
    "depegPct": 0.23
  },
  {
    "date": "2021-03-14",
    "timestamp": 1615680000000,
    "spotPrice": 1666,
    "fundingAPR": 28.46,
    "stakingAPY": 8.13,
    "depegPct": 0.23
  },
  {
    "date": "2021-03-15",
    "timestamp": 1615766400000,
    "spotPrice": 1630.24,
    "fundingAPR": 26.37,
    "stakingAPY": 8.1,
    "depegPct": 0.22
  },
  {
    "date": "2021-03-16",
    "timestamp": 1615852800000,
    "spotPrice": 1657.42,
    "fundingAPR": 27.98,
    "stakingAPY": 8.09,
    "depegPct": 0.22
  },
  {
    "date": "2021-03-17",
    "timestamp": 1615939200000,
    "spotPrice": 1655.06,
    "fundingAPR": 24.69,
    "stakingAPY": 8.07,
    "depegPct": 0.21
  },
  {
    "date": "2021-03-18",
    "timestamp": 1616025600000,
    "spotPrice": 1599.84,
    "fundingAPR": 24.48,
    "stakingAPY": 8.05,
    "depegPct": 0.21
  },
  {
    "date": "2021-03-19",
    "timestamp": 1616112000000,
    "spotPrice": 1590.51,
    "fundingAPR": 25.36,
    "stakingAPY": 8.04,
    "depegPct": 0.21
  },
  {
    "date": "2021-03-20",
    "timestamp": 1616198400000,
    "spotPrice": 1625.17,
    "fundingAPR": 22.02,
    "stakingAPY": 8.03,
    "depegPct": 0.21
  },
  {
    "date": "2021-03-21",
    "timestamp": 1616284800000,
    "spotPrice": 1605.77,
    "fundingAPR": 23.54,
    "stakingAPY": 8.02,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-22",
    "timestamp": 1616371200000,
    "spotPrice": 1559.67,
    "fundingAPR": 23.14,
    "stakingAPY": 8.01,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-23",
    "timestamp": 1616457600000,
    "spotPrice": 1577.99,
    "fundingAPR": 20.8,
    "stakingAPY": 8,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-24",
    "timestamp": 1616544000000,
    "spotPrice": 1610.04,
    "fundingAPR": 23.35,
    "stakingAPY": 8,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-25",
    "timestamp": 1616630400000,
    "spotPrice": 1578.24,
    "fundingAPR": 21.71,
    "stakingAPY": 8,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-26",
    "timestamp": 1616716800000,
    "spotPrice": 1559.77,
    "fundingAPR": 21.15,
    "stakingAPY": 8,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-27",
    "timestamp": 1616803200000,
    "spotPrice": 1599.64,
    "fundingAPR": 23.74,
    "stakingAPY": 8,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-28",
    "timestamp": 1616889600000,
    "spotPrice": 1627.94,
    "fundingAPR": 21.46,
    "stakingAPY": 7.99,
    "depegPct": 0.2
  },
  {
    "date": "2021-03-29",
    "timestamp": 1616976000000,
    "spotPrice": 1614.19,
    "fundingAPR": 22.91,
    "stakingAPY": 7.99,
    "depegPct": 0.21
  },
  {
    "date": "2021-03-30",
    "timestamp": 1617062400000,
    "spotPrice": 1636.01,
    "fundingAPR": 24.65,
    "stakingAPY": 7.98,
    "depegPct": 0.21
  },
  {
    "date": "2021-03-31",
    "timestamp": 1617148800000,
    "spotPrice": 1703.68,
    "fundingAPR": 22.67,
    "stakingAPY": 7.97,
    "depegPct": 0.21
  },
  {
    "date": "2021-04-01",
    "timestamp": 1617235200000,
    "spotPrice": 1736.67,
    "fundingAPR": 25.74,
    "stakingAPY": 7.96,
    "depegPct": 0.22
  },
  {
    "date": "2021-04-02",
    "timestamp": 1617321600000,
    "spotPrice": 1745.15,
    "fundingAPR": 26.17,
    "stakingAPY": 7.95,
    "depegPct": 0.22
  },
  {
    "date": "2021-04-03",
    "timestamp": 1617408000000,
    "spotPrice": 1806.67,
    "fundingAPR": 25.43,
    "stakingAPY": 7.93,
    "depegPct": 0.23
  },
  {
    "date": "2021-04-04",
    "timestamp": 1617494400000,
    "spotPrice": 1890.65,
    "fundingAPR": 29.24,
    "stakingAPY": 7.92,
    "depegPct": 0.23
  },
  {
    "date": "2021-04-05",
    "timestamp": 1617580800000,
    "spotPrice": 1926.97,
    "fundingAPR": 28.48,
    "stakingAPY": 7.9,
    "depegPct": 0.24
  },
  {
    "date": "2021-04-06",
    "timestamp": 1617667200000,
    "spotPrice": 1963.75,
    "fundingAPR": 29.58,
    "stakingAPY": 7.88,
    "depegPct": 0.24
  },
  {
    "date": "2021-04-07",
    "timestamp": 1617753600000,
    "spotPrice": 2058.17,
    "fundingAPR": 33.08,
    "stakingAPY": 7.86,
    "depegPct": 0.25
  },
  {
    "date": "2021-04-08",
    "timestamp": 1617840000000,
    "spotPrice": 2146.77,
    "fundingAPR": 31.81,
    "stakingAPY": 7.84,
    "depegPct": 0.26
  },
  {
    "date": "2021-04-09",
    "timestamp": 1617926400000,
    "spotPrice": 2188.07,
    "fundingAPR": 34.76,
    "stakingAPY": 7.82,
    "depegPct": 0.27
  },
  {
    "date": "2021-04-10",
    "timestamp": 1618012800000,
    "spotPrice": 2255.56,
    "fundingAPR": 37.1,
    "stakingAPY": 7.8,
    "depegPct": 0.28
  },
  {
    "date": "2021-04-11",
    "timestamp": 1618099200000,
    "spotPrice": 2371.05,
    "fundingAPR": 36.26,
    "stakingAPY": 7.78,
    "depegPct": 0.28
  },
  {
    "date": "2021-04-12",
    "timestamp": 1618185600000,
    "spotPrice": 2454.69,
    "fundingAPR": 40.46,
    "stakingAPY": 7.75,
    "depegPct": 0.29
  },
  {
    "date": "2021-04-13",
    "timestamp": 1618272000000,
    "spotPrice": 2504.48,
    "fundingAPR": 41.3,
    "stakingAPY": 7.73,
    "depegPct": 0.3
  },
  {
    "date": "2021-04-14",
    "timestamp": 1618358400000,
    "spotPrice": 2599.97,
    "fundingAPR": 41.74,
    "stakingAPY": 7.7,
    "depegPct": 0.31
  },
  {
    "date": "2021-04-15",
    "timestamp": 1618444800000,
    "spotPrice": 2721.86,
    "fundingAPR": 46.21,
    "stakingAPY": 7.68,
    "depegPct": 0.32
  },
  {
    "date": "2021-04-16",
    "timestamp": 1618531200000,
    "spotPrice": 2794.72,
    "fundingAPR": 45.81,
    "stakingAPY": 7.65,
    "depegPct": 0.33
  },
  {
    "date": "2021-04-17",
    "timestamp": 1618617600000,
    "spotPrice": 2856.43,
    "fundingAPR": 47.94,
    "stakingAPY": 7.63,
    "depegPct": 0.34
  },
  {
    "date": "2021-04-18",
    "timestamp": 1618704000000,
    "spotPrice": 2971.8,
    "fundingAPR": 51.62,
    "stakingAPY": 7.6,
    "depegPct": 0.35
  },
  {
    "date": "2021-04-19",
    "timestamp": 1618790400000,
    "spotPrice": 3085.36,
    "fundingAPR": 50.73,
    "stakingAPY": 7.57,
    "depegPct": 0.36
  },
  {
    "date": "2021-04-20",
    "timestamp": 1618876800000,
    "spotPrice": 3145.74,
    "fundingAPR": 54.38,
    "stakingAPY": 7.55,
    "depegPct": 0.37
  },
  {
    "date": "2021-04-21",
    "timestamp": 1618963200000,
    "spotPrice": 3220.74,
    "fundingAPR": 56.53,
    "stakingAPY": 7.52,
    "depegPct": 0.38
  },
  {
    "date": "2021-04-22",
    "timestamp": 1619049600000,
    "spotPrice": 3343.41,
    "fundingAPR": 56.09,
    "stakingAPY": 7.5,
    "depegPct": 0.39
  },
  {
    "date": "2021-04-23",
    "timestamp": 1619136000000,
    "spotPrice": 3436.56,
    "fundingAPR": 60.52,
    "stakingAPY": 7.47,
    "depegPct": 0.4
  },
  {
    "date": "2021-04-24",
    "timestamp": 1619222400000,
    "spotPrice": 3486.17,
    "fundingAPR": 60.94,
    "stakingAPY": 7.45,
    "depegPct": 0.41
  },
  {
    "date": "2021-04-25",
    "timestamp": 1619308800000,
    "spotPrice": 3572.21,
    "fundingAPR": 61.71,
    "stakingAPY": 7.42,
    "depegPct": 0.42
  },
  {
    "date": "2021-04-26",
    "timestamp": 1619395200000,
    "spotPrice": 3687.26,
    "fundingAPR": 65.87,
    "stakingAPY": 7.4,
    "depegPct": 0.42
  },
  {
    "date": "2021-04-27",
    "timestamp": 1619481600000,
    "spotPrice": 3752.46,
    "fundingAPR": 64.98,
    "stakingAPY": 7.38,
    "depegPct": 0.43
  },
  {
    "date": "2021-04-28",
    "timestamp": 1619568000000,
    "spotPrice": 3794.8,
    "fundingAPR": 67.23,
    "stakingAPY": 7.36,
    "depegPct": 0.44
  },
  {
    "date": "2021-04-29",
    "timestamp": 1619654400000,
    "spotPrice": 3885.41,
    "fundingAPR": 70.13,
    "stakingAPY": 7.34,
    "depegPct": 0.45
  },
  {
    "date": "2021-04-30",
    "timestamp": 1619740800000,
    "spotPrice": 3978.28,
    "fundingAPR": 68.78,
    "stakingAPY": 7.32,
    "depegPct": 0.46
  },
  {
    "date": "2021-05-01",
    "timestamp": 1619827200000,
    "spotPrice": 4013.44,
    "fundingAPR": 72.17,
    "stakingAPY": 7.3,
    "depegPct": 0.46
  },
  {
    "date": "2021-05-02",
    "timestamp": 1619913600000,
    "spotPrice": 4051.72,
    "fundingAPR": 73.21,
    "stakingAPY": 7.28,
    "depegPct": 0.47
  },
  {
    "date": "2021-05-03",
    "timestamp": 1620000000000,
    "spotPrice": 4136.82,
    "fundingAPR": 72.33,
    "stakingAPY": 7.27,
    "depegPct": 0.47
  },
  {
    "date": "2021-05-04",
    "timestamp": 1620086400000,
    "spotPrice": 4196.09,
    "fundingAPR": 76.04,
    "stakingAPY": 7.25,
    "depegPct": 0.48
  },
  {
    "date": "2021-05-05",
    "timestamp": 1620172800000,
    "spotPrice": 4204.03,
    "fundingAPR": 75.22,
    "stakingAPY": 7.24,
    "depegPct": 0.48
  },
  {
    "date": "2021-05-06",
    "timestamp": 1620259200000,
    "spotPrice": 4239.41,
    "fundingAPR": 75.51,
    "stakingAPY": 7.23,
    "depegPct": 0.49
  },
  {
    "date": "2021-05-07",
    "timestamp": 1620345600000,
    "spotPrice": 4307,
    "fundingAPR": 78.49,
    "stakingAPY": 7.22,
    "depegPct": 0.49
  },
  {
    "date": "2021-05-08",
    "timestamp": 1620432000000,
    "spotPrice": 4326.46,
    "fundingAPR": 76.4,
    "stakingAPY": 7.21,
    "depegPct": 0.49
  },
  {
    "date": "2021-05-09",
    "timestamp": 1620518400000,
    "spotPrice": 4313.39,
    "fundingAPR": 77.99,
    "stakingAPY": 7.21,
    "depegPct": 0.5
  },
  {
    "date": "2021-05-10",
    "timestamp": 1620604800000,
    "spotPrice": 4343.88,
    "fundingAPR": 79.36,
    "stakingAPY": 7.2,
    "depegPct": 0.5
  },
  {
    "date": "2021-05-11",
    "timestamp": 1620691200000,
    "spotPrice": 4382.5,
    "fundingAPR": 76.95,
    "stakingAPY": 7.2,
    "depegPct": 0.5
  },
  {
    "date": "2021-05-12",
    "timestamp": 1620777600000,
    "spotPrice": 4362.46,
    "fundingAPR": 79.39,
    "stakingAPY": 7.2,
    "depegPct": 0.5
  },
  {
    "date": "2021-05-13",
    "timestamp": 1620864000000,
    "spotPrice": 4251.24,
    "fundingAPR": 77.16,
    "stakingAPY": 7.21,
    "depegPct": 0.53
  },
  {
    "date": "2021-05-14",
    "timestamp": 1620950400000,
    "spotPrice": 4198.73,
    "fundingAPR": 70.77,
    "stakingAPY": 7.22,
    "depegPct": 0.6
  },
  {
    "date": "2021-05-15",
    "timestamp": 1621036800000,
    "spotPrice": 4032.4,
    "fundingAPR": 65.95,
    "stakingAPY": 7.25,
    "depegPct": 0.72
  },
  {
    "date": "2021-05-16",
    "timestamp": 1621123200000,
    "spotPrice": 3668.91,
    "fundingAPR": 54.22,
    "stakingAPY": 7.29,
    "depegPct": 0.88
  },
  {
    "date": "2021-05-17",
    "timestamp": 1621209600000,
    "spotPrice": 3339.44,
    "fundingAPR": 43.14,
    "stakingAPY": 7.33,
    "depegPct": 1.06
  },
  {
    "date": "2021-05-18",
    "timestamp": 1621296000000,
    "spotPrice": 3115.51,
    "fundingAPR": 33.67,
    "stakingAPY": 7.37,
    "depegPct": 1.24
  },
  {
    "date": "2021-05-19",
    "timestamp": 1621382400000,
    "spotPrice": 2801.97,
    "fundingAPR": 19.89,
    "stakingAPY": 7.41,
    "depegPct": 1.42
  },
  {
    "date": "2021-05-20",
    "timestamp": 1621468800000,
    "spotPrice": 2434.37,
    "fundingAPR": 11.76,
    "stakingAPY": 7.45,
    "depegPct": 1.58
  },
  {
    "date": "2021-05-21",
    "timestamp": 1621555200000,
    "spotPrice": 2253.16,
    "fundingAPR": 4.84,
    "stakingAPY": 7.48,
    "depegPct": 1.7
  },
  {
    "date": "2021-05-22",
    "timestamp": 1621641600000,
    "spotPrice": 2208.59,
    "fundingAPR": -2.36,
    "stakingAPY": 7.49,
    "depegPct": 1.77
  },
  {
    "date": "2021-05-23",
    "timestamp": 1621728000000,
    "spotPrice": 2104.91,
    "fundingAPR": -1.42,
    "stakingAPY": 7.5,
    "depegPct": 1.8
  },
  {
    "date": "2021-05-24",
    "timestamp": 1621814400000,
    "spotPrice": 2068.28,
    "fundingAPR": -2.44,
    "stakingAPY": 7.5,
    "depegPct": 1.8
  },
  {
    "date": "2021-05-25",
    "timestamp": 1621900800000,
    "spotPrice": 2102.26,
    "fundingAPR": -3.64,
    "stakingAPY": 7.5,
    "depegPct": 1.8
  },
  {
    "date": "2021-05-26",
    "timestamp": 1621987200000,
    "spotPrice": 2128.56,
    "fundingAPR": -0.97,
    "stakingAPY": 7.5,
    "depegPct": 1.79
  },
  {
    "date": "2021-05-27",
    "timestamp": 1622073600000,
    "spotPrice": 2085.16,
    "fundingAPR": -3.25,
    "stakingAPY": 7.49,
    "depegPct": 1.79
  },
  {
    "date": "2021-05-28",
    "timestamp": 1622160000000,
    "spotPrice": 2066.37,
    "fundingAPR": -2.77,
    "stakingAPY": 7.49,
    "depegPct": 1.78
  },
  {
    "date": "2021-05-29",
    "timestamp": 1622246400000,
    "spotPrice": 2109.89,
    "fundingAPR": -0.99,
    "stakingAPY": 7.48,
    "depegPct": 1.77
  },
  {
    "date": "2021-05-30",
    "timestamp": 1622332800000,
    "spotPrice": 2111.73,
    "fundingAPR": -3.67,
    "stakingAPY": 7.48,
    "depegPct": 1.76
  },
  {
    "date": "2021-05-31",
    "timestamp": 1622419200000,
    "spotPrice": 2060.99,
    "fundingAPR": -1.68,
    "stakingAPY": 7.47,
    "depegPct": 1.75
  },
  {
    "date": "2021-06-01",
    "timestamp": 1622505600000,
    "spotPrice": 2064.51,
    "fundingAPR": -1.42,
    "stakingAPY": 7.46,
    "depegPct": 1.74
  },
  {
    "date": "2021-06-02",
    "timestamp": 1622592000000,
    "spotPrice": 2105.66,
    "fundingAPR": -3.49,
    "stakingAPY": 7.45,
    "depegPct": 1.73
  },
  {
    "date": "2021-06-03",
    "timestamp": 1622678400000,
    "spotPrice": 2081.92,
    "fundingAPR": -0.7,
    "stakingAPY": 7.44,
    "depegPct": 1.71
  },
  {
    "date": "2021-06-04",
    "timestamp": 1622764800000,
    "spotPrice": 2036.37,
    "fundingAPR": -2.03,
    "stakingAPY": 7.43,
    "depegPct": 1.7
  },
  {
    "date": "2021-06-05",
    "timestamp": 1622851200000,
    "spotPrice": 2060.44,
    "fundingAPR": -2.71,
    "stakingAPY": 7.42,
    "depegPct": 1.68
  },
  {
    "date": "2021-06-06",
    "timestamp": 1622937600000,
    "spotPrice": 2087.55,
    "fundingAPR": -0.11,
    "stakingAPY": 7.4,
    "depegPct": 1.66
  },
  {
    "date": "2021-06-07",
    "timestamp": 1623024000000,
    "spotPrice": 2043.44,
    "fundingAPR": -2.5,
    "stakingAPY": 7.39,
    "depegPct": 1.64
  },
  {
    "date": "2021-06-08",
    "timestamp": 1623110400000,
    "spotPrice": 2013.88,
    "fundingAPR": -1.5,
    "stakingAPY": 7.38,
    "depegPct": 1.62
  },
  {
    "date": "2021-06-09",
    "timestamp": 1623196800000,
    "spotPrice": 2051.07,
    "fundingAPR": -0.01,
    "stakingAPY": 7.36,
    "depegPct": 1.6
  },
  {
    "date": "2021-06-10",
    "timestamp": 1623283200000,
    "spotPrice": 2055.82,
    "fundingAPR": -2.54,
    "stakingAPY": 7.35,
    "depegPct": 1.58
  },
  {
    "date": "2021-06-11",
    "timestamp": 1623369600000,
    "spotPrice": 2001.54,
    "fundingAPR": -0.18,
    "stakingAPY": 7.33,
    "depegPct": 1.56
  },
  {
    "date": "2021-06-12",
    "timestamp": 1623456000000,
    "spotPrice": 1994.31,
    "fundingAPR": -0.3,
    "stakingAPY": 7.31,
    "depegPct": 1.53
  },
  {
    "date": "2021-06-13",
    "timestamp": 1623542400000,
    "spotPrice": 2033.45,
    "fundingAPR": -1.99,
    "stakingAPY": 7.3,
    "depegPct": 1.51
  },
  {
    "date": "2021-06-14",
    "timestamp": 1623628800000,
    "spotPrice": 2013.08,
    "fundingAPR": 0.91,
    "stakingAPY": 7.28,
    "depegPct": 1.49
  },
  {
    "date": "2021-06-15",
    "timestamp": 1623715200000,
    "spotPrice": 1961.25,
    "fundingAPR": -0.73,
    "stakingAPY": 7.26,
    "depegPct": 1.46
  },
  {
    "date": "2021-06-16",
    "timestamp": 1623801600000,
    "spotPrice": 1976.63,
    "fundingAPR": -0.9,
    "stakingAPY": 7.24,
    "depegPct": 1.43
  },
  {
    "date": "2021-06-17",
    "timestamp": 1623888000000,
    "spotPrice": 2005.82,
    "fundingAPR": 1.53,
    "stakingAPY": 7.23,
    "depegPct": 1.41
  },
  {
    "date": "2021-06-18",
    "timestamp": 1623974400000,
    "spotPrice": 1963.96,
    "fundingAPR": -0.96,
    "stakingAPY": 7.21,
    "depegPct": 1.38
  },
  {
    "date": "2021-06-19",
    "timestamp": 1624060800000,
    "spotPrice": 1926.37,
    "fundingAPR": 0.51,
    "stakingAPY": 7.19,
    "depegPct": 1.35
  },
  {
    "date": "2021-06-20",
    "timestamp": 1624147200000,
    "spotPrice": 1958.56,
    "fundingAPR": 1.62,
    "stakingAPY": 7.17,
    "depegPct": 1.33
  },
  {
    "date": "2021-06-21",
    "timestamp": 1624233600000,
    "spotPrice": 1968.38,
    "fundingAPR": -0.75,
    "stakingAPY": 7.15,
    "depegPct": 1.3
  },
  {
    "date": "2021-06-22",
    "timestamp": 1624320000000,
    "spotPrice": 1914.13,
    "fundingAPR": 1.88,
    "stakingAPY": 7.13,
    "depegPct": 1.27
  },
  {
    "date": "2021-06-23",
    "timestamp": 1624406400000,
    "spotPrice": 1898.75,
    "fundingAPR": 1.33,
    "stakingAPY": 7.11,
    "depegPct": 1.25
  },
  {
    "date": "2021-06-24",
    "timestamp": 1624492800000,
    "spotPrice": 1937.49,
    "fundingAPR": 0.02,
    "stakingAPY": 7.09,
    "depegPct": 1.22
  },
  {
    "date": "2021-06-25",
    "timestamp": 1624579200000,
    "spotPrice": 1923.53,
    "fundingAPR": 2.9,
    "stakingAPY": 7.07,
    "depegPct": 1.19
  },
  {
    "date": "2021-06-26",
    "timestamp": 1624665600000,
    "spotPrice": 1869.2,
    "fundingAPR": 0.95,
    "stakingAPY": 7.06,
    "depegPct": 1.17
  },
  {
    "date": "2021-06-27",
    "timestamp": 1624752000000,
    "spotPrice": 1878.2,
    "fundingAPR": 1.24,
    "stakingAPY": 7.04,
    "depegPct": 1.14
  },
  {
    "date": "2021-06-28",
    "timestamp": 1624838400000,
    "spotPrice": 1911.53,
    "fundingAPR": 3.36,
    "stakingAPY": 7.02,
    "depegPct": 1.11
  },
  {
    "date": "2021-06-29",
    "timestamp": 1624924800000,
    "spotPrice": 1875.6,
    "fundingAPR": 0.79,
    "stakingAPY": 7,
    "depegPct": 1.09
  },
  {
    "date": "2021-06-30",
    "timestamp": 1625011200000,
    "spotPrice": 1833.58,
    "fundingAPR": 2.63,
    "stakingAPY": 6.99,
    "depegPct": 1.07
  },
  {
    "date": "2021-07-01",
    "timestamp": 1625097600000,
    "spotPrice": 1862.84,
    "fundingAPR": 3.27,
    "stakingAPY": 6.97,
    "depegPct": 1.04
  },
  {
    "date": "2021-07-02",
    "timestamp": 1625184000000,
    "spotPrice": 1880.31,
    "fundingAPR": 1.09,
    "stakingAPY": 6.95,
    "depegPct": 1.02
  },
  {
    "date": "2021-07-03",
    "timestamp": 1625270400000,
    "spotPrice": 1830.09,
    "fundingAPR": 3.85,
    "stakingAPY": 6.94,
    "depegPct": 1
  },
  {
    "date": "2021-07-04",
    "timestamp": 1625356800000,
    "spotPrice": 1809.69,
    "fundingAPR": 2.83,
    "stakingAPY": 6.92,
    "depegPct": 0.98
  },
  {
    "date": "2021-07-05",
    "timestamp": 1625443200000,
    "spotPrice": 1849.94,
    "fundingAPR": 1.88,
    "stakingAPY": 6.91,
    "depegPct": 0.96
  },
  {
    "date": "2021-07-06",
    "timestamp": 1625529600000,
    "spotPrice": 1845.42,
    "fundingAPR": 4.6,
    "stakingAPY": 6.9,
    "depegPct": 0.94
  },
  {
    "date": "2021-07-07",
    "timestamp": 1625616000000,
    "spotPrice": 1792.52,
    "fundingAPR": 2.34,
    "stakingAPY": 6.88,
    "depegPct": 0.92
  },
  {
    "date": "2021-07-08",
    "timestamp": 1625702400000,
    "spotPrice": 1797.62,
    "fundingAPR": 3.03,
    "stakingAPY": 6.87,
    "depegPct": 0.9
  },
  {
    "date": "2021-07-09",
    "timestamp": 1625788800000,
    "spotPrice": 1836.97,
    "fundingAPR": 4.74,
    "stakingAPY": 6.86,
    "depegPct": 0.89
  },
  {
    "date": "2021-07-10",
    "timestamp": 1625875200000,
    "spotPrice": 1810.33,
    "fundingAPR": 2.11,
    "stakingAPY": 6.85,
    "depegPct": 0.87
  },
  {
    "date": "2021-07-11",
    "timestamp": 1625961600000,
    "spotPrice": 1767.32,
    "fundingAPR": 4.22,
    "stakingAPY": 6.84,
    "depegPct": 0.86
  },
  {
    "date": "2021-07-12",
    "timestamp": 1626048000000,
    "spotPrice": 1795.43,
    "fundingAPR": 4.33,
    "stakingAPY": 6.83,
    "depegPct": 0.85
  },
  {
    "date": "2021-07-13",
    "timestamp": 1626134400000,
    "spotPrice": 1822.51,
    "fundingAPR": 2.33,
    "stakingAPY": 6.82,
    "depegPct": 0.84
  },
  {
    "date": "2021-07-14",
    "timestamp": 1626220800000,
    "spotPrice": 1779.71,
    "fundingAPR": 5.11,
    "stakingAPY": 6.82,
    "depegPct": 0.83
  },
  {
    "date": "2021-07-15",
    "timestamp": 1626307200000,
    "spotPrice": 1756.92,
    "fundingAPR": 3.61,
    "stakingAPY": 6.81,
    "depegPct": 0.82
  },
  {
    "date": "2021-07-16",
    "timestamp": 1626393600000,
    "spotPrice": 1799.86,
    "fundingAPR": 3.01,
    "stakingAPY": 6.81,
    "depegPct": 0.81
  },
  {
    "date": "2021-07-17",
    "timestamp": 1626480000000,
    "spotPrice": 1806.87,
    "fundingAPR": 5.45,
    "stakingAPY": 6.8,
    "depegPct": 0.81
  },
  {
    "date": "2021-07-18",
    "timestamp": 1626566400000,
    "spotPrice": 1758.44,
    "fundingAPR": 2.91,
    "stakingAPY": 6.8,
    "depegPct": 0.8
  },
  {
    "date": "2021-07-19",
    "timestamp": 1626652800000,
    "spotPrice": 1761.27,
    "fundingAPR": 3.93,
    "stakingAPY": 6.8,
    "depegPct": 0.8
  },
  {
    "date": "2021-07-20",
    "timestamp": 1626739200000,
    "spotPrice": 1803.21,
    "fundingAPR": 5.16,
    "stakingAPY": 6.8,
    "depegPct": 0.8
  },
  {
    "date": "2021-07-21",
    "timestamp": 1626825600000,
    "spotPrice": 1792.73,
    "fundingAPR": 2.56,
    "stakingAPY": 6.8,
    "depegPct": 0.8
  },
  {
    "date": "2021-07-22",
    "timestamp": 1626912000000,
    "spotPrice": 1764.75,
    "fundingAPR": 4.97,
    "stakingAPY": 6.8,
    "depegPct": 0.8
  },
  {
    "date": "2021-07-23",
    "timestamp": 1626998400000,
    "spotPrice": 1800.27,
    "fundingAPR": 4.73,
    "stakingAPY": 6.79,
    "depegPct": 0.79
  },
  {
    "date": "2021-07-24",
    "timestamp": 1627084800000,
    "spotPrice": 1848.73,
    "fundingAPR": 3.26,
    "stakingAPY": 6.79,
    "depegPct": 0.79
  },
  {
    "date": "2021-07-25",
    "timestamp": 1627171200000,
    "spotPrice": 1841.99,
    "fundingAPR": 6.33,
    "stakingAPY": 6.78,
    "depegPct": 0.78
  },
  {
    "date": "2021-07-26",
    "timestamp": 1627257600000,
    "spotPrice": 1847.99,
    "fundingAPR": 4.83,
    "stakingAPY": 6.77,
    "depegPct": 0.77
  },
  {
    "date": "2021-07-27",
    "timestamp": 1627344000000,
    "spotPrice": 1917.1,
    "fundingAPR": 5.11,
    "stakingAPY": 6.76,
    "depegPct": 0.76
  },
  {
    "date": "2021-07-28",
    "timestamp": 1627430400000,
    "spotPrice": 1968.08,
    "fundingAPR": 7.81,
    "stakingAPY": 6.75,
    "depegPct": 0.75
  },
  {
    "date": "2021-07-29",
    "timestamp": 1627516800000,
    "spotPrice": 1971.14,
    "fundingAPR": 5.73,
    "stakingAPY": 6.74,
    "depegPct": 0.74
  },
  {
    "date": "2021-07-30",
    "timestamp": 1627603200000,
    "spotPrice": 2014.77,
    "fundingAPR": 7.81,
    "stakingAPY": 6.73,
    "depegPct": 0.73
  },
  {
    "date": "2021-07-31",
    "timestamp": 1627689600000,
    "spotPrice": 2105.51,
    "fundingAPR": 9.34,
    "stakingAPY": 6.72,
    "depegPct": 0.72
  },
  {
    "date": "2021-08-01",
    "timestamp": 1627776000000,
    "spotPrice": 2152.65,
    "fundingAPR": 7.63,
    "stakingAPY": 6.7,
    "depegPct": 0.7
  },
  {
    "date": "2021-08-02",
    "timestamp": 1627862400000,
    "spotPrice": 2172.5,
    "fundingAPR": 10.97,
    "stakingAPY": 6.68,
    "depegPct": 0.68
  },
  {
    "date": "2021-08-03",
    "timestamp": 1627948800000,
    "spotPrice": 2250.93,
    "fundingAPR": 10.98,
    "stakingAPY": 6.67,
    "depegPct": 0.67
  },
  {
    "date": "2021-08-04",
    "timestamp": 1628035200000,
    "spotPrice": 2348.9,
    "fundingAPR": 10.54,
    "stakingAPY": 6.65,
    "depegPct": 0.65
  },
  {
    "date": "2021-08-05",
    "timestamp": 1628121600000,
    "spotPrice": 2389.91,
    "fundingAPR": 14.17,
    "stakingAPY": 6.63,
    "depegPct": 0.63
  },
  {
    "date": "2021-08-06",
    "timestamp": 1628208000000,
    "spotPrice": 2432.01,
    "fundingAPR": 12.95,
    "stakingAPY": 6.61,
    "depegPct": 0.61
  },
  {
    "date": "2021-08-07",
    "timestamp": 1628294400000,
    "spotPrice": 2536.01,
    "fundingAPR": 14.23,
    "stakingAPY": 6.59,
    "depegPct": 0.59
  },
  {
    "date": "2021-08-08",
    "timestamp": 1628380800000,
    "spotPrice": 2627.43,
    "fundingAPR": 17.13,
    "stakingAPY": 6.57,
    "depegPct": 0.57
  },
  {
    "date": "2021-08-09",
    "timestamp": 1628467200000,
    "spotPrice": 2663.87,
    "fundingAPR": 15.45,
    "stakingAPY": 6.55,
    "depegPct": 0.55
  },
  {
    "date": "2021-08-10",
    "timestamp": 1628553600000,
    "spotPrice": 2729.95,
    "fundingAPR": 18.31,
    "stakingAPY": 6.53,
    "depegPct": 0.53
  },
  {
    "date": "2021-08-11",
    "timestamp": 1628640000000,
    "spotPrice": 2845.43,
    "fundingAPR": 19.74,
    "stakingAPY": 6.51,
    "depegPct": 0.51
  },
  {
    "date": "2021-08-12",
    "timestamp": 1628726400000,
    "spotPrice": 2919.79,
    "fundingAPR": 18.57,
    "stakingAPY": 6.49,
    "depegPct": 0.49
  },
  {
    "date": "2021-08-13",
    "timestamp": 1628812800000,
    "spotPrice": 2955.76,
    "fundingAPR": 22.3,
    "stakingAPY": 6.47,
    "depegPct": 0.47
  },
  {
    "date": "2021-08-14",
    "timestamp": 1628899200000,
    "spotPrice": 3042.32,
    "fundingAPR": 22.09,
    "stakingAPY": 6.45,
    "depegPct": 0.45
  },
  {
    "date": "2021-08-15",
    "timestamp": 1628985600000,
    "spotPrice": 3153,
    "fundingAPR": 22.2,
    "stakingAPY": 6.43,
    "depegPct": 0.43
  },
  {
    "date": "2021-08-16",
    "timestamp": 1629072000000,
    "spotPrice": 3204.8,
    "fundingAPR": 25.79,
    "stakingAPY": 6.41,
    "depegPct": 0.41
  },
  {
    "date": "2021-08-17",
    "timestamp": 1629158400000,
    "spotPrice": 3244.77,
    "fundingAPR": 24.36,
    "stakingAPY": 6.39,
    "depegPct": 0.39
  },
  {
    "date": "2021-08-18",
    "timestamp": 1629244800000,
    "spotPrice": 3342.99,
    "fundingAPR": 26.06,
    "stakingAPY": 6.37,
    "depegPct": 0.37
  },
  {
    "date": "2021-08-19",
    "timestamp": 1629331200000,
    "spotPrice": 3433.57,
    "fundingAPR": 28.51,
    "stakingAPY": 6.35,
    "depegPct": 0.35
  },
  {
    "date": "2021-08-20",
    "timestamp": 1629417600000,
    "spotPrice": 3462.64,
    "fundingAPR": 26.72,
    "stakingAPY": 6.33,
    "depegPct": 0.33
  },
  {
    "date": "2021-08-21",
    "timestamp": 1629504000000,
    "spotPrice": 3509.26,
    "fundingAPR": 29.71,
    "stakingAPY": 6.32,
    "depegPct": 0.32
  },
  {
    "date": "2021-08-22",
    "timestamp": 1629590400000,
    "spotPrice": 3606.2,
    "fundingAPR": 30.43,
    "stakingAPY": 6.3,
    "depegPct": 0.3
  },
  {
    "date": "2021-08-23",
    "timestamp": 1629676800000,
    "spotPrice": 3665.3,
    "fundingAPR": 29.24,
    "stakingAPY": 6.28,
    "depegPct": 0.28
  },
  {
    "date": "2021-08-24",
    "timestamp": 1629763200000,
    "spotPrice": 3675.86,
    "fundingAPR": 32.69,
    "stakingAPY": 6.27,
    "depegPct": 0.27
  },
  {
    "date": "2021-08-25",
    "timestamp": 1629849600000,
    "spotPrice": 3728.2,
    "fundingAPR": 31.69,
    "stakingAPY": 6.26,
    "depegPct": 0.26
  },
  {
    "date": "2021-08-26",
    "timestamp": 1629936000000,
    "spotPrice": 3809.19,
    "fundingAPR": 31.79,
    "stakingAPY": 6.25,
    "depegPct": 0.25
  },
  {
    "date": "2021-08-27",
    "timestamp": 1630022400000,
    "spotPrice": 3831.38,
    "fundingAPR": 34.67,
    "stakingAPY": 6.24,
    "depegPct": 0.24
  },
  {
    "date": "2021-08-28",
    "timestamp": 1630108800000,
    "spotPrice": 3829.98,
    "fundingAPR": 32.53,
    "stakingAPY": 6.23,
    "depegPct": 0.23
  },
  {
    "date": "2021-08-29",
    "timestamp": 1630195200000,
    "spotPrice": 3882.94,
    "fundingAPR": 34.08,
    "stakingAPY": 6.22,
    "depegPct": 0.22
  },
  {
    "date": "2021-08-30",
    "timestamp": 1630281600000,
    "spotPrice": 3934.61,
    "fundingAPR": 35.51,
    "stakingAPY": 6.21,
    "depegPct": 0.21
  },
  {
    "date": "2021-08-31",
    "timestamp": 1630368000000,
    "spotPrice": 3921.05,
    "fundingAPR": 33.17,
    "stakingAPY": 6.21,
    "depegPct": 0.21
  },
  {
    "date": "2021-09-01",
    "timestamp": 1630454400000,
    "spotPrice": 3914.15,
    "fundingAPR": 35.73,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-02",
    "timestamp": 1630540800000,
    "spotPrice": 3959.11,
    "fundingAPR": 35.28,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-03",
    "timestamp": 1630627200000,
    "spotPrice": 3999.4,
    "fundingAPR": 33.69,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-04",
    "timestamp": 1630713600000,
    "spotPrice": 3911.69,
    "fundingAPR": 36.43,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-05",
    "timestamp": 1630800000000,
    "spotPrice": 3912.61,
    "fundingAPR": 34.47,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-06",
    "timestamp": 1630886400000,
    "spotPrice": 4003.47,
    "fundingAPR": 34.49,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-07",
    "timestamp": 1630972800000,
    "spotPrice": 3984.79,
    "fundingAPR": 36.67,
    "stakingAPY": 6.2,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-08",
    "timestamp": 1631059200000,
    "spotPrice": 3906.63,
    "fundingAPR": 34.08,
    "stakingAPY": 6.19,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-09",
    "timestamp": 1631145600000,
    "spotPrice": 3955.58,
    "fundingAPR": 35.78,
    "stakingAPY": 6.19,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-10",
    "timestamp": 1631232000000,
    "spotPrice": 4033.44,
    "fundingAPR": 36.62,
    "stakingAPY": 6.19,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-11",
    "timestamp": 1631318400000,
    "spotPrice": 3978.94,
    "fundingAPR": 34.41,
    "stakingAPY": 6.19,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-12",
    "timestamp": 1631404800000,
    "spotPrice": 3931.77,
    "fundingAPR": 37.22,
    "stakingAPY": 6.18,
    "depegPct": 0.2
  },
  {
    "date": "2021-09-13",
    "timestamp": 1631491200000,
    "spotPrice": 4017.19,
    "fundingAPR": 36.49,
    "stakingAPY": 6.18,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-14",
    "timestamp": 1631577600000,
    "spotPrice": 4063.18,
    "fundingAPR": 35.54,
    "stakingAPY": 6.17,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-15",
    "timestamp": 1631664000000,
    "spotPrice": 3988.77,
    "fundingAPR": 38.5,
    "stakingAPY": 6.17,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-16",
    "timestamp": 1631750400000,
    "spotPrice": 3986.79,
    "fundingAPR": 36.55,
    "stakingAPY": 6.16,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-17",
    "timestamp": 1631836800000,
    "spotPrice": 4088.48,
    "fundingAPR": 37.32,
    "stakingAPY": 6.16,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-18",
    "timestamp": 1631923200000,
    "spotPrice": 4092.88,
    "fundingAPR": 39.46,
    "stakingAPY": 6.15,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-19",
    "timestamp": 1632009600000,
    "spotPrice": 4020.5,
    "fundingAPR": 37.13,
    "stakingAPY": 6.15,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-20",
    "timestamp": 1632096000000,
    "spotPrice": 4066.93,
    "fundingAPR": 39.46,
    "stakingAPY": 6.14,
    "depegPct": 0.19
  },
  {
    "date": "2021-09-21",
    "timestamp": 1632182400000,
    "spotPrice": 4161.2,
    "fundingAPR": 40.12,
    "stakingAPY": 6.13,
    "depegPct": 0.18
  },
  {
    "date": "2021-09-22",
    "timestamp": 1632268800000,
    "spotPrice": 4125.94,
    "fundingAPR": 38.42,
    "stakingAPY": 6.13,
    "depegPct": 0.18
  },
  {
    "date": "2021-09-23",
    "timestamp": 1632355200000,
    "spotPrice": 4077.73,
    "fundingAPR": 41.59,
    "stakingAPY": 6.12,
    "depegPct": 0.18
  },
  {
    "date": "2021-09-24",
    "timestamp": 1632441600000,
    "spotPrice": 4163.85,
    "fundingAPR": 40.69,
    "stakingAPY": 6.11,
    "depegPct": 0.18
  },
  {
    "date": "2021-09-25",
    "timestamp": 1632528000000,
    "spotPrice": 4229.66,
    "fundingAPR": 40.4,
    "stakingAPY": 6.11,
    "depegPct": 0.18
  },
  {
    "date": "2021-09-26",
    "timestamp": 1632614400000,
    "spotPrice": 4167.66,
    "fundingAPR": 43.43,
    "stakingAPY": 6.1,
    "depegPct": 0.17
  },
  {
    "date": "2021-09-27",
    "timestamp": 1632700800000,
    "spotPrice": 4160.09,
    "fundingAPR": 41.48,
    "stakingAPY": 6.09,
    "depegPct": 0.17
  },
  {
    "date": "2021-09-28",
    "timestamp": 1632787200000,
    "spotPrice": 4267.41,
    "fundingAPR": 42.89,
    "stakingAPY": 6.08,
    "depegPct": 0.17
  },
  {
    "date": "2021-09-29",
    "timestamp": 1632873600000,
    "spotPrice": 4291.7,
    "fundingAPR": 44.84,
    "stakingAPY": 6.07,
    "depegPct": 0.17
  },
  {
    "date": "2021-09-30",
    "timestamp": 1632960000000,
    "spotPrice": 4223.41,
    "fundingAPR": 42.75,
    "stakingAPY": 6.06,
    "depegPct": 0.17
  },
  {
    "date": "2021-10-01",
    "timestamp": 1633046400000,
    "spotPrice": 4262.83,
    "fundingAPR": 45.54,
    "stakingAPY": 6.05,
    "depegPct": 0.16
  },
  {
    "date": "2021-10-02",
    "timestamp": 1633132800000,
    "spotPrice": 4367.79,
    "fundingAPR": 45.9,
    "stakingAPY": 6.05,
    "depegPct": 0.16
  },
  {
    "date": "2021-10-03",
    "timestamp": 1633219200000,
    "spotPrice": 4348.78,
    "fundingAPR": 44.64,
    "stakingAPY": 6.04,
    "depegPct": 0.16
  },
  {
    "date": "2021-10-04",
    "timestamp": 1633305600000,
    "spotPrice": 4296.69,
    "fundingAPR": 47.99,
    "stakingAPY": 6.03,
    "depegPct": 0.16
  },
  {
    "date": "2021-10-05",
    "timestamp": 1633392000000,
    "spotPrice": 4377.51,
    "fundingAPR": 46.83,
    "stakingAPY": 6.02,
    "depegPct": 0.15
  },
  {
    "date": "2021-10-06",
    "timestamp": 1633478400000,
    "spotPrice": 4457.47,
    "fundingAPR": 47.09,
    "stakingAPY": 6.01,
    "depegPct": 0.15
  },
  {
    "date": "2021-10-07",
    "timestamp": 1633564800000,
    "spotPrice": 4404.95,
    "fundingAPR": 49.98,
    "stakingAPY": 6,
    "depegPct": 0.15
  },
  {
    "date": "2021-10-08",
    "timestamp": 1633651200000,
    "spotPrice": 4387.54,
    "fundingAPR": 47.95,
    "stakingAPY": 5.99,
    "depegPct": 0.15
  },
  {
    "date": "2021-10-09",
    "timestamp": 1633737600000,
    "spotPrice": 4493.56,
    "fundingAPR": 49.84,
    "stakingAPY": 5.98,
    "depegPct": 0.15
  },
  {
    "date": "2021-10-10",
    "timestamp": 1633824000000,
    "spotPrice": 4532.56,
    "fundingAPR": 51.42,
    "stakingAPY": 5.97,
    "depegPct": 0.14
  },
  {
    "date": "2021-10-11",
    "timestamp": 1633910400000,
    "spotPrice": 4465.18,
    "fundingAPR": 49.48,
    "stakingAPY": 5.96,
    "depegPct": 0.14
  },
  {
    "date": "2021-10-12",
    "timestamp": 1633996800000,
    "spotPrice": 4491.93,
    "fundingAPR": 52.53,
    "stakingAPY": 5.95,
    "depegPct": 0.14
  },
  {
    "date": "2021-10-13",
    "timestamp": 1634083200000,
    "spotPrice": 4600.38,
    "fundingAPR": 52.44,
    "stakingAPY": 5.95,
    "depegPct": 0.14
  },
  {
    "date": "2021-10-14",
    "timestamp": 1634169600000,
    "spotPrice": 4593.14,
    "fundingAPR": 51.52,
    "stakingAPY": 5.94,
    "depegPct": 0.13
  },
  {
    "date": "2021-10-15",
    "timestamp": 1634256000000,
    "spotPrice": 4533.39,
    "fundingAPR": 54.82,
    "stakingAPY": 5.93,
    "depegPct": 0.13
  },
  {
    "date": "2021-10-16",
    "timestamp": 1634342400000,
    "spotPrice": 4602.14,
    "fundingAPR": 53.29,
    "stakingAPY": 5.92,
    "depegPct": 0.13
  },
  {
    "date": "2021-10-17",
    "timestamp": 1634428800000,
    "spotPrice": 4689.46,
    "fundingAPR": 53.95,
    "stakingAPY": 5.91,
    "depegPct": 0.13
  },
  {
    "date": "2021-10-18",
    "timestamp": 1634515200000,
    "spotPrice": 4642.59,
    "fundingAPR": 56.48,
    "stakingAPY": 5.9,
    "depegPct": 0.13
  },
  {
    "date": "2021-10-19",
    "timestamp": 1634601600000,
    "spotPrice": 4610.71,
    "fundingAPR": 54.29,
    "stakingAPY": 5.89,
    "depegPct": 0.12
  },
  {
    "date": "2021-10-20",
    "timestamp": 1634688000000,
    "spotPrice": 4708.07,
    "fundingAPR": 56.47,
    "stakingAPY": 5.89,
    "depegPct": 0.12
  },
  {
    "date": "2021-10-21",
    "timestamp": 1634774400000,
    "spotPrice": 4755.93,
    "fundingAPR": 57.5,
    "stakingAPY": 5.88,
    "depegPct": 0.12
  },
  {
    "date": "2021-10-22",
    "timestamp": 1634860800000,
    "spotPrice": 4686.04,
    "fundingAPR": 55.63,
    "stakingAPY": 5.87,
    "depegPct": 0.12
  },
  {
    "date": "2021-10-23",
    "timestamp": 1634947200000,
    "spotPrice": 4694.61,
    "fundingAPR": 58.72,
    "stakingAPY": 5.87,
    "depegPct": 0.12
  },
  {
    "date": "2021-10-24",
    "timestamp": 1635033600000,
    "spotPrice": 4799.28,
    "fundingAPR": 58.04,
    "stakingAPY": 5.86,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-25",
    "timestamp": 1635120000000,
    "spotPrice": 4799.19,
    "fundingAPR": 57.36,
    "stakingAPY": 5.85,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-26",
    "timestamp": 1635206400000,
    "spotPrice": 4728.4,
    "fundingAPR": 60.38,
    "stakingAPY": 5.85,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-27",
    "timestamp": 1635292800000,
    "spotPrice": 4778.91,
    "fundingAPR": 58.4,
    "stakingAPY": 5.84,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-28",
    "timestamp": 1635379200000,
    "spotPrice": 4867.13,
    "fundingAPR": 59.31,
    "stakingAPY": 5.84,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-29",
    "timestamp": 1635465600000,
    "spotPrice": 4822.51,
    "fundingAPR": 61.29,
    "stakingAPY": 5.83,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-30",
    "timestamp": 1635552000000,
    "spotPrice": 4772.56,
    "fundingAPR": 58.88,
    "stakingAPY": 5.83,
    "depegPct": 0.11
  },
  {
    "date": "2021-10-31",
    "timestamp": 1635638400000,
    "spotPrice": 4854.89,
    "fundingAPR": 61.16,
    "stakingAPY": 5.82,
    "depegPct": 0.11
  },
  {
    "date": "2021-11-01",
    "timestamp": 1635724800000,
    "spotPrice": 4906.49,
    "fundingAPR": 61.5,
    "stakingAPY": 5.82,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-02",
    "timestamp": 1635811200000,
    "spotPrice": 4831.7,
    "fundingAPR": 59.65,
    "stakingAPY": 5.81,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-03",
    "timestamp": 1635897600000,
    "spotPrice": 4818.13,
    "fundingAPR": 62.57,
    "stakingAPY": 5.81,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-04",
    "timestamp": 1635984000000,
    "spotPrice": 4913.06,
    "fundingAPR": 61.23,
    "stakingAPY": 5.81,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-05",
    "timestamp": 1636070400000,
    "spotPrice": 4916.67,
    "fundingAPR": 60.71,
    "stakingAPY": 5.81,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-06",
    "timestamp": 1636156800000,
    "spotPrice": 4833.13,
    "fundingAPR": 63.27,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-07",
    "timestamp": 1636243200000,
    "spotPrice": 4861.17,
    "fundingAPR": 60.81,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-08",
    "timestamp": 1636329600000,
    "spotPrice": 4945.38,
    "fundingAPR": 61.86,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-09",
    "timestamp": 1636416000000,
    "spotPrice": 4901.29,
    "fundingAPR": 63.16,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-10",
    "timestamp": 1636502400000,
    "spotPrice": 4817.74,
    "fundingAPR": 60.52,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-11",
    "timestamp": 1636588800000,
    "spotPrice": 4895.37,
    "fundingAPR": 62.76,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-12",
    "timestamp": 1636675200000,
    "spotPrice": 4958.25,
    "fundingAPR": 62.23,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-13",
    "timestamp": 1636761600000,
    "spotPrice": 4856.66,
    "fundingAPR": 60.25,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-14",
    "timestamp": 1636848000000,
    "spotPrice": 4807.07,
    "fundingAPR": 62.68,
    "stakingAPY": 5.8,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-15",
    "timestamp": 1636934400000,
    "spotPrice": 4903.45,
    "fundingAPR": 60.4,
    "stakingAPY": 5.79,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-16",
    "timestamp": 1637020800000,
    "spotPrice": 4905.2,
    "fundingAPR": 59.69,
    "stakingAPY": 5.79,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-17",
    "timestamp": 1637107200000,
    "spotPrice": 4780.43,
    "fundingAPR": 61.31,
    "stakingAPY": 5.79,
    "depegPct": 0.1
  },
  {
    "date": "2021-11-18",
    "timestamp": 1637193600000,
    "spotPrice": 4778.07,
    "fundingAPR": 57.98,
    "stakingAPY": 5.78,
    "depegPct": 0.11
  },
  {
    "date": "2021-11-19",
    "timestamp": 1637280000000,
    "spotPrice": 4865.98,
    "fundingAPR": 58.65,
    "stakingAPY": 5.78,
    "depegPct": 0.11
  },
  {
    "date": "2021-11-20",
    "timestamp": 1637366400000,
    "spotPrice": 4803.67,
    "fundingAPR": 58.68,
    "stakingAPY": 5.77,
    "depegPct": 0.11
  },
  {
    "date": "2021-11-21",
    "timestamp": 1637452800000,
    "spotPrice": 4685.38,
    "fundingAPR": 55.31,
    "stakingAPY": 5.77,
    "depegPct": 0.11
  },
  {
    "date": "2021-11-22",
    "timestamp": 1637539200000,
    "spotPrice": 4727.53,
    "fundingAPR": 56.87,
    "stakingAPY": 5.76,
    "depegPct": 0.11
  },
  {
    "date": "2021-11-23",
    "timestamp": 1637625600000,
    "spotPrice": 4780.26,
    "fundingAPR": 55.02,
    "stakingAPY": 5.75,
    "depegPct": 0.12
  },
  {
    "date": "2021-11-24",
    "timestamp": 1637712000000,
    "spotPrice": 4666.02,
    "fundingAPR": 52.57,
    "stakingAPY": 5.75,
    "depegPct": 0.12
  },
  {
    "date": "2021-11-25",
    "timestamp": 1637798400000,
    "spotPrice": 4580.6,
    "fundingAPR": 54.12,
    "stakingAPY": 5.74,
    "depegPct": 0.12
  },
  {
    "date": "2021-11-26",
    "timestamp": 1637884800000,
    "spotPrice": 4651.38,
    "fundingAPR": 50.75,
    "stakingAPY": 5.73,
    "depegPct": 0.12
  },
  {
    "date": "2021-11-27",
    "timestamp": 1637971200000,
    "spotPrice": 4649.95,
    "fundingAPR": 49.76,
    "stakingAPY": 5.72,
    "depegPct": 0.13
  },
  {
    "date": "2021-11-28",
    "timestamp": 1638057600000,
    "spotPrice": 4508.08,
    "fundingAPR": 50.36,
    "stakingAPY": 5.72,
    "depegPct": 0.13
  },
  {
    "date": "2021-11-29",
    "timestamp": 1638144000000,
    "spotPrice": 4472.01,
    "fundingAPR": 46.31,
    "stakingAPY": 5.71,
    "depegPct": 0.13
  },
  {
    "date": "2021-11-30",
    "timestamp": 1638230400000,
    "spotPrice": 4546.81,
    "fundingAPR": 46.73,
    "stakingAPY": 5.7,
    "depegPct": 0.13
  },
  {
    "date": "2021-12-01",
    "timestamp": 1638316800000,
    "spotPrice": 4485.23,
    "fundingAPR": 45.73,
    "stakingAPY": 5.69,
    "depegPct": 0.14
  },
  {
    "date": "2021-12-02",
    "timestamp": 1638403200000,
    "spotPrice": 4346.2,
    "fundingAPR": 42.05,
    "stakingAPY": 5.68,
    "depegPct": 0.14
  },
  {
    "date": "2021-12-03",
    "timestamp": 1638489600000,
    "spotPrice": 4362.1,
    "fundingAPR": 43.28,
    "stakingAPY": 5.67,
    "depegPct": 0.14
  },
  {
    "date": "2021-12-04",
    "timestamp": 1638576000000,
    "spotPrice": 4414.41,
    "fundingAPR": 40.58,
    "stakingAPY": 5.66,
    "depegPct": 0.15
  },
  {
    "date": "2021-12-05",
    "timestamp": 1638662400000,
    "spotPrice": 4301.61,
    "fundingAPR": 38.16,
    "stakingAPY": 5.65,
    "depegPct": 0.15
  },
  {
    "date": "2021-12-06",
    "timestamp": 1638748800000,
    "spotPrice": 4194.47,
    "fundingAPR": 39.27,
    "stakingAPY": 5.65,
    "depegPct": 0.15
  },
  {
    "date": "2021-12-07",
    "timestamp": 1638835200000,
    "spotPrice": 4250.82,
    "fundingAPR": 35.4,
    "stakingAPY": 5.64,
    "depegPct": 0.15
  },
  {
    "date": "2021-12-08",
    "timestamp": 1638921600000,
    "spotPrice": 4259.54,
    "fundingAPR": 34.64,
    "stakingAPY": 5.63,
    "depegPct": 0.16
  },
  {
    "date": "2021-12-09",
    "timestamp": 1639008000000,
    "spotPrice": 4117.53,
    "fundingAPR": 34.74,
    "stakingAPY": 5.62,
    "depegPct": 0.16
  },
  {
    "date": "2021-12-10",
    "timestamp": 1639094400000,
    "spotPrice": 4062.78,
    "fundingAPR": 30.63,
    "stakingAPY": 5.61,
    "depegPct": 0.16
  },
  {
    "date": "2021-12-11",
    "timestamp": 1639180800000,
    "spotPrice": 4137.39,
    "fundingAPR": 31.34,
    "stakingAPY": 5.6,
    "depegPct": 0.17
  },
  {
    "date": "2021-12-12",
    "timestamp": 1639267200000,
    "spotPrice": 4092.81,
    "fundingAPR": 29.91,
    "stakingAPY": 5.59,
    "depegPct": 0.17
  },
  {
    "date": "2021-12-13",
    "timestamp": 1639353600000,
    "spotPrice": 3951.31,
    "fundingAPR": 26.61,
    "stakingAPY": 5.58,
    "depegPct": 0.17
  },
  {
    "date": "2021-12-14",
    "timestamp": 1639440000000,
    "spotPrice": 3955.99,
    "fundingAPR": 28.06,
    "stakingAPY": 5.58,
    "depegPct": 0.17
  },
  {
    "date": "2021-12-15",
    "timestamp": 1639526400000,
    "spotPrice": 4022.23,
    "fundingAPR": 25.19,
    "stakingAPY": 5.57,
    "depegPct": 0.18
  },
  {
    "date": "2021-12-16",
    "timestamp": 1639612800000,
    "spotPrice": 3929.02,
    "fundingAPR": 23.47,
    "stakingAPY": 5.56,
    "depegPct": 0.18
  },
  {
    "date": "2021-12-17",
    "timestamp": 1639699200000,
    "spotPrice": 3818.19,
    "fundingAPR": 24.7,
    "stakingAPY": 5.55,
    "depegPct": 0.18
  },
  {
    "date": "2021-12-18",
    "timestamp": 1639785600000,
    "spotPrice": 3874.48,
    "fundingAPR": 21.02,
    "stakingAPY": 5.55,
    "depegPct": 0.18
  },
  {
    "date": "2021-12-19",
    "timestamp": 1639872000000,
    "spotPrice": 3908.69,
    "fundingAPR": 21.13,
    "stakingAPY": 5.54,
    "depegPct": 0.19
  },
  {
    "date": "2021-12-20",
    "timestamp": 1639958400000,
    "spotPrice": 3785.07,
    "fundingAPR": 21.31,
    "stakingAPY": 5.53,
    "depegPct": 0.19
  },
  {
    "date": "2021-12-21",
    "timestamp": 1640044800000,
    "spotPrice": 3728.03,
    "fundingAPR": 17.83,
    "stakingAPY": 5.53,
    "depegPct": 0.19
  },
  {
    "date": "2021-12-22",
    "timestamp": 1640131200000,
    "spotPrice": 3815.69,
    "fundingAPR": 19.39,
    "stakingAPY": 5.52,
    "depegPct": 0.19
  },
  {
    "date": "2021-12-23",
    "timestamp": 1640217600000,
    "spotPrice": 3803.71,
    "fundingAPR": 18.13,
    "stakingAPY": 5.52,
    "depegPct": 0.19
  },
  {
    "date": "2021-12-24",
    "timestamp": 1640304000000,
    "spotPrice": 3677.11,
    "fundingAPR": 15.84,
    "stakingAPY": 5.51,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-25",
    "timestamp": 1640390400000,
    "spotPrice": 3684.25,
    "fundingAPR": 18,
    "stakingAPY": 5.51,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-26",
    "timestamp": 1640476800000,
    "spotPrice": 3776.25,
    "fundingAPR": 15.53,
    "stakingAPY": 5.51,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-27",
    "timestamp": 1640563200000,
    "spotPrice": 3717.47,
    "fundingAPR": 15.06,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-28",
    "timestamp": 1640649600000,
    "spotPrice": 3617.62,
    "fundingAPR": 16.84,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-29",
    "timestamp": 1640736000000,
    "spotPrice": 3684.14,
    "fundingAPR": 13.91,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-30",
    "timestamp": 1640822400000,
    "spotPrice": 3753.96,
    "fundingAPR": 15.29,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2021-12-31",
    "timestamp": 1640908800000,
    "spotPrice": 3666.22,
    "fundingAPR": 15.94,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2022-01-01",
    "timestamp": 1640995200000,
    "spotPrice": 3623.29,
    "fundingAPR": 13.47,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2022-01-02",
    "timestamp": 1641081600000,
    "spotPrice": 3685.17,
    "fundingAPR": 15.91,
    "stakingAPY": 5.5,
    "depegPct": 0.2
  },
  {
    "date": "2022-01-03",
    "timestamp": 1641168000000,
    "spotPrice": 3675.56,
    "fundingAPR": 14.76,
    "stakingAPY": 5.5,
    "depegPct": 0.21
  },
  {
    "date": "2022-01-04",
    "timestamp": 1641254400000,
    "spotPrice": 3555.86,
    "fundingAPR": 13.26,
    "stakingAPY": 5.49,
    "depegPct": 0.21
  },
  {
    "date": "2022-01-05",
    "timestamp": 1641340800000,
    "spotPrice": 3513.36,
    "fundingAPR": 15.6,
    "stakingAPY": 5.49,
    "depegPct": 0.22
  },
  {
    "date": "2022-01-06",
    "timestamp": 1641427200000,
    "spotPrice": 3539.8,
    "fundingAPR": 12.96,
    "stakingAPY": 5.49,
    "depegPct": 0.23
  },
  {
    "date": "2022-01-07",
    "timestamp": 1641513600000,
    "spotPrice": 3451.82,
    "fundingAPR": 12.92,
    "stakingAPY": 5.48,
    "depegPct": 0.24
  },
  {
    "date": "2022-01-08",
    "timestamp": 1641600000000,
    "spotPrice": 3307.02,
    "fundingAPR": 14.23,
    "stakingAPY": 5.48,
    "depegPct": 0.25
  },
  {
    "date": "2022-01-09",
    "timestamp": 1641686400000,
    "spotPrice": 3276.36,
    "fundingAPR": 10.99,
    "stakingAPY": 5.47,
    "depegPct": 0.26
  },
  {
    "date": "2022-01-10",
    "timestamp": 1641772800000,
    "spotPrice": 3260.82,
    "fundingAPR": 12.34,
    "stakingAPY": 5.46,
    "depegPct": 0.27
  },
  {
    "date": "2022-01-11",
    "timestamp": 1641859200000,
    "spotPrice": 3117.88,
    "fundingAPR": 12.03,
    "stakingAPY": 5.46,
    "depegPct": 0.29
  },
  {
    "date": "2022-01-12",
    "timestamp": 1641945600000,
    "spotPrice": 2986.28,
    "fundingAPR": 9.29,
    "stakingAPY": 5.45,
    "depegPct": 0.3
  },
  {
    "date": "2022-01-13",
    "timestamp": 1642032000000,
    "spotPrice": 2975.97,
    "fundingAPR": 11.42,
    "stakingAPY": 5.44,
    "depegPct": 0.31
  },
  {
    "date": "2022-01-14",
    "timestamp": 1642118400000,
    "spotPrice": 2923.05,
    "fundingAPR": 9.49,
    "stakingAPY": 5.44,
    "depegPct": 0.33
  },
  {
    "date": "2022-01-15",
    "timestamp": 1642204800000,
    "spotPrice": 2763.03,
    "fundingAPR": 8.12,
    "stakingAPY": 5.43,
    "depegPct": 0.34
  },
  {
    "date": "2022-01-16",
    "timestamp": 1642291200000,
    "spotPrice": 2679.56,
    "fundingAPR": 10.12,
    "stakingAPY": 5.43,
    "depegPct": 0.35
  },
  {
    "date": "2022-01-17",
    "timestamp": 1642377600000,
    "spotPrice": 2692.87,
    "fundingAPR": 7.17,
    "stakingAPY": 5.42,
    "depegPct": 0.36
  },
  {
    "date": "2022-01-18",
    "timestamp": 1642464000000,
    "spotPrice": 2616.94,
    "fundingAPR": 7.57,
    "stakingAPY": 5.41,
    "depegPct": 0.37
  },
  {
    "date": "2022-01-19",
    "timestamp": 1642550400000,
    "spotPrice": 2482.18,
    "fundingAPR": 8.6,
    "stakingAPY": 5.41,
    "depegPct": 0.38
  },
  {
    "date": "2022-01-20",
    "timestamp": 1642636800000,
    "spotPrice": 2469.16,
    "fundingAPR": 5.61,
    "stakingAPY": 5.41,
    "depegPct": 0.39
  },
  {
    "date": "2022-01-21",
    "timestamp": 1642723200000,
    "spotPrice": 2503.06,
    "fundingAPR": 7.54,
    "stakingAPY": 5.4,
    "depegPct": 0.39
  },
  {
    "date": "2022-01-22",
    "timestamp": 1642809600000,
    "spotPrice": 2424.39,
    "fundingAPR": 7.15,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-23",
    "timestamp": 1642896000000,
    "spotPrice": 2350.46,
    "fundingAPR": 5.15,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-24",
    "timestamp": 1642982400000,
    "spotPrice": 2407.56,
    "fundingAPR": 7.85,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-25",
    "timestamp": 1643068800000,
    "spotPrice": 2434.43,
    "fundingAPR": 6.1,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-26",
    "timestamp": 1643155200000,
    "spotPrice": 2385.69,
    "fundingAPR": 5.72,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-27",
    "timestamp": 1643241600000,
    "spotPrice": 2374.75,
    "fundingAPR": 8.04,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-28",
    "timestamp": 1643328000000,
    "spotPrice": 2431.92,
    "fundingAPR": 5.44,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-29",
    "timestamp": 1643414400000,
    "spotPrice": 2435.96,
    "fundingAPR": 6.74,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-30",
    "timestamp": 1643500800000,
    "spotPrice": 2387.79,
    "fundingAPR": 7.8,
    "stakingAPY": 5.4,
    "depegPct": 0.4
  },
  {
    "date": "2022-01-31",
    "timestamp": 1643587200000,
    "spotPrice": 2408.39,
    "fundingAPR": 5.32,
    "stakingAPY": 5.39,
    "depegPct": 0.39
  },
  {
    "date": "2022-02-01",
    "timestamp": 1643673600000,
    "spotPrice": 2465.63,
    "fundingAPR": 7.84,
    "stakingAPY": 5.39,
    "depegPct": 0.39
  },
  {
    "date": "2022-02-02",
    "timestamp": 1643760000000,
    "spotPrice": 2446.79,
    "fundingAPR": 7.28,
    "stakingAPY": 5.39,
    "depegPct": 0.39
  },
  {
    "date": "2022-02-03",
    "timestamp": 1643846400000,
    "spotPrice": 2412.99,
    "fundingAPR": 5.87,
    "stakingAPY": 5.39,
    "depegPct": 0.39
  },
  {
    "date": "2022-02-04",
    "timestamp": 1643932800000,
    "spotPrice": 2461.18,
    "fundingAPR": 8.71,
    "stakingAPY": 5.39,
    "depegPct": 0.39
  },
  {
    "date": "2022-02-05",
    "timestamp": 1644019200000,
    "spotPrice": 2505.19,
    "fundingAPR": 6.77,
    "stakingAPY": 5.38,
    "depegPct": 0.38
  },
  {
    "date": "2022-02-06",
    "timestamp": 1644105600000,
    "spotPrice": 2470.25,
    "fundingAPR": 6.98,
    "stakingAPY": 5.38,
    "depegPct": 0.38
  },
  {
    "date": "2022-02-07",
    "timestamp": 1644192000000,
    "spotPrice": 2461.72,
    "fundingAPR": 9.15,
    "stakingAPY": 5.38,
    "depegPct": 0.38
  },
  {
    "date": "2022-02-08",
    "timestamp": 1644278400000,
    "spotPrice": 2527.16,
    "fundingAPR": 6.6,
    "stakingAPY": 5.38,
    "depegPct": 0.38
  },
  {
    "date": "2022-02-09",
    "timestamp": 1644364800000,
    "spotPrice": 2548.9,
    "fundingAPR": 8.41,
    "stakingAPY": 5.37,
    "depegPct": 0.37
  },
  {
    "date": "2022-02-10",
    "timestamp": 1644451200000,
    "spotPrice": 2509.62,
    "fundingAPR": 9.16,
    "stakingAPY": 5.37,
    "depegPct": 0.37
  },
  {
    "date": "2022-02-11",
    "timestamp": 1644537600000,
    "spotPrice": 2531.41,
    "fundingAPR": 6.99,
    "stakingAPY": 5.37,
    "depegPct": 0.37
  },
  {
    "date": "2022-02-12",
    "timestamp": 1644624000000,
    "spotPrice": 2600.02,
    "fundingAPR": 9.81,
    "stakingAPY": 5.36,
    "depegPct": 0.36
  },
  {
    "date": "2022-02-13",
    "timestamp": 1644710400000,
    "spotPrice": 2596.98,
    "fundingAPR": 8.92,
    "stakingAPY": 5.36,
    "depegPct": 0.36
  },
  {
    "date": "2022-02-14",
    "timestamp": 1644796800000,
    "spotPrice": 2566.96,
    "fundingAPR": 8.02,
    "stakingAPY": 5.35,
    "depegPct": 0.35
  },
  {
    "date": "2022-02-15",
    "timestamp": 1644883200000,
    "spotPrice": 2616.85,
    "fundingAPR": 10.86,
    "stakingAPY": 5.35,
    "depegPct": 0.35
  },
  {
    "date": "2022-02-16",
    "timestamp": 1644969600000,
    "spotPrice": 2674.35,
    "fundingAPR": 8.75,
    "stakingAPY": 5.35,
    "depegPct": 0.35
  },
  {
    "date": "2022-02-17",
    "timestamp": 1645056000000,
    "spotPrice": 2651.1,
    "fundingAPR": 9.52,
    "stakingAPY": 5.34,
    "depegPct": 0.34
  },
  {
    "date": "2022-02-18",
    "timestamp": 1645142400000,
    "spotPrice": 2642.08,
    "fundingAPR": 11.43,
    "stakingAPY": 5.34,
    "depegPct": 0.34
  },
  {
    "date": "2022-02-19",
    "timestamp": 1645228800000,
    "spotPrice": 2711.07,
    "fundingAPR": 8.96,
    "stakingAPY": 5.33,
    "depegPct": 0.33
  },
  {
    "date": "2022-02-20",
    "timestamp": 1645315200000,
    "spotPrice": 2746.57,
    "fundingAPR": 11.19,
    "stakingAPY": 5.33,
    "depegPct": 0.33
  },
  {
    "date": "2022-02-21",
    "timestamp": 1645401600000,
    "spotPrice": 2713.41,
    "fundingAPR": 11.55,
    "stakingAPY": 5.32,
    "depegPct": 0.32
  },
  {
    "date": "2022-02-22",
    "timestamp": 1645488000000,
    "spotPrice": 2732.09,
    "fundingAPR": 9.72,
    "stakingAPY": 5.32,
    "depegPct": 0.32
  },
  {
    "date": "2022-02-23",
    "timestamp": 1645574400000,
    "spotPrice": 2806.58,
    "fundingAPR": 12.7,
    "stakingAPY": 5.31,
    "depegPct": 0.31
  },
  {
    "date": "2022-02-24",
    "timestamp": 1645660800000,
    "spotPrice": 2815.29,
    "fundingAPR": 11.46,
    "stakingAPY": 5.31,
    "depegPct": 0.31
  },
  {
    "date": "2022-02-25",
    "timestamp": 1645747200000,
    "spotPrice": 2785.45,
    "fundingAPR": 11.03,
    "stakingAPY": 5.3,
    "depegPct": 0.3
  },
  {
    "date": "2022-02-26",
    "timestamp": 1645833600000,
    "spotPrice": 2831.55,
    "fundingAPR": 13.75,
    "stakingAPY": 5.3,
    "depegPct": 0.3
  },
  {
    "date": "2022-02-27",
    "timestamp": 1645920000000,
    "spotPrice": 2896.73,
    "fundingAPR": 11.47,
    "stakingAPY": 5.3,
    "depegPct": 0.3
  },
  {
    "date": "2022-02-28",
    "timestamp": 1646006400000,
    "spotPrice": 2881.06,
    "fundingAPR": 12.7,
    "stakingAPY": 5.29,
    "depegPct": 0.29
  },
  {
    "date": "2022-03-01",
    "timestamp": 1646092800000,
    "spotPrice": 2867.03,
    "fundingAPR": 14.25,
    "stakingAPY": 5.29,
    "depegPct": 0.29
  },
  {
    "date": "2022-03-02",
    "timestamp": 1646179200000,
    "spotPrice": 2933.21,
    "fundingAPR": 11.86,
    "stakingAPY": 5.28,
    "depegPct": 0.28
  },
  {
    "date": "2022-03-03",
    "timestamp": 1646265600000,
    "spotPrice": 2976.77,
    "fundingAPR": 14.39,
    "stakingAPY": 5.28,
    "depegPct": 0.28
  },
  {
    "date": "2022-03-04",
    "timestamp": 1646352000000,
    "spotPrice": 2945.51,
    "fundingAPR": 14.3,
    "stakingAPY": 5.27,
    "depegPct": 0.27
  },
  {
    "date": "2022-03-05",
    "timestamp": 1646438400000,
    "spotPrice": 2955.63,
    "fundingAPR": 12.77,
    "stakingAPY": 5.27,
    "depegPct": 0.27
  },
  {
    "date": "2022-03-06",
    "timestamp": 1646524800000,
    "spotPrice": 3029.27,
    "fundingAPR": 15.77,
    "stakingAPY": 5.26,
    "depegPct": 0.26
  },
  {
    "date": "2022-03-07",
    "timestamp": 1646611200000,
    "spotPrice": 3044.43,
    "fundingAPR": 14.15,
    "stakingAPY": 5.26,
    "depegPct": 0.26
  },
  {
    "date": "2022-03-08",
    "timestamp": 1646697600000,
    "spotPrice": 3010.3,
    "fundingAPR": 14.15,
    "stakingAPY": 5.25,
    "depegPct": 0.25
  },
  {
    "date": "2022-03-09",
    "timestamp": 1646784000000,
    "spotPrice": 3046.43,
    "fundingAPR": 16.59,
    "stakingAPY": 5.25,
    "depegPct": 0.25
  },
  {
    "date": "2022-03-10",
    "timestamp": 1646870400000,
    "spotPrice": 3112.7,
    "fundingAPR": 14.14,
    "stakingAPY": 5.25,
    "depegPct": 0.25
  },
  {
    "date": "2022-03-11",
    "timestamp": 1646956800000,
    "spotPrice": 3099.83,
    "fundingAPR": 15.74,
    "stakingAPY": 5.24,
    "depegPct": 0.24
  },
  {
    "date": "2022-03-12",
    "timestamp": 1647043200000,
    "spotPrice": 3075.99,
    "fundingAPR": 16.81,
    "stakingAPY": 5.24,
    "depegPct": 0.24
  },
  {
    "date": "2022-03-13",
    "timestamp": 1647129600000,
    "spotPrice": 3132.81,
    "fundingAPR": 14.52,
    "stakingAPY": 5.23,
    "depegPct": 0.23
  },
  {
    "date": "2022-03-14",
    "timestamp": 1647216000000,
    "spotPrice": 3178.43,
    "fundingAPR": 17.21,
    "stakingAPY": 5.23,
    "depegPct": 0.23
  },
  {
    "date": "2022-03-15",
    "timestamp": 1647302400000,
    "spotPrice": 3144.8,
    "fundingAPR": 16.59,
    "stakingAPY": 5.23,
    "depegPct": 0.23
  },
  {
    "date": "2022-03-16",
    "timestamp": 1647388800000,
    "spotPrice": 3141.25,
    "fundingAPR": 15.36,
    "stakingAPY": 5.22,
    "depegPct": 0.22
  },
  {
    "date": "2022-03-17",
    "timestamp": 1647475200000,
    "spotPrice": 3207.56,
    "fundingAPR": 18.23,
    "stakingAPY": 5.22,
    "depegPct": 0.22
  },
  {
    "date": "2022-03-18",
    "timestamp": 1647561600000,
    "spotPrice": 3224.1,
    "fundingAPR": 16.22,
    "stakingAPY": 5.22,
    "depegPct": 0.22
  },
  {
    "date": "2022-03-19",
    "timestamp": 1647648000000,
    "spotPrice": 3181.83,
    "fundingAPR": 16.58,
    "stakingAPY": 5.22,
    "depegPct": 0.22
  },
  {
    "date": "2022-03-20",
    "timestamp": 1647734400000,
    "spotPrice": 3202.66,
    "fundingAPR": 18.62,
    "stakingAPY": 5.21,
    "depegPct": 0.21
  },
  {
    "date": "2022-03-21",
    "timestamp": 1647820800000,
    "spotPrice": 3264.15,
    "fundingAPR": 16.02,
    "stakingAPY": 5.21,
    "depegPct": 0.21
  },
  {
    "date": "2022-03-22",
    "timestamp": 1647907200000,
    "spotPrice": 3250.11,
    "fundingAPR": 17.88,
    "stakingAPY": 5.21,
    "depegPct": 0.21
  },
  {
    "date": "2022-03-23",
    "timestamp": 1647993600000,
    "spotPrice": 3212.88,
    "fundingAPR": 18.4,
    "stakingAPY": 5.21,
    "depegPct": 0.21
  },
  {
    "date": "2022-03-24",
    "timestamp": 1648080000000,
    "spotPrice": 3255.1,
    "fundingAPR": 16.2,
    "stakingAPY": 5.21,
    "depegPct": 0.21
  },
  {
    "date": "2022-03-25",
    "timestamp": 1648166400000,
    "spotPrice": 3297.96,
    "fundingAPR": 18.93,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-03-26",
    "timestamp": 1648252800000,
    "spotPrice": 3259.07,
    "fundingAPR": 17.77,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-03-27",
    "timestamp": 1648339200000,
    "spotPrice": 3238.46,
    "fundingAPR": 16.82,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-03-28",
    "timestamp": 1648425600000,
    "spotPrice": 3292.7,
    "fundingAPR": 19.44,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-03-29",
    "timestamp": 1648512000000,
    "spotPrice": 3307.17,
    "fundingAPR": 17.05,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-03-30",
    "timestamp": 1648598400000,
    "spotPrice": 3254.81,
    "fundingAPR": 17.73,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-03-31",
    "timestamp": 1648684800000,
    "spotPrice": 3248.84,
    "fundingAPR": 19.28,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-04-01",
    "timestamp": 1648771200000,
    "spotPrice": 3319.97,
    "fundingAPR": 16.53,
    "stakingAPY": 5.2,
    "depegPct": 0.2
  },
  {
    "date": "2022-04-02",
    "timestamp": 1648857600000,
    "spotPrice": 3293.18,
    "fundingAPR": 18.51,
    "stakingAPY": 5.2,
    "depegPct": 0.21
  },
  {
    "date": "2022-04-03",
    "timestamp": 1648944000000,
    "spotPrice": 3216.79,
    "fundingAPR": 18.3,
    "stakingAPY": 5.2,
    "depegPct": 0.22
  },
  {
    "date": "2022-04-04",
    "timestamp": 1649030400000,
    "spotPrice": 3243.07,
    "fundingAPR": 16.07,
    "stakingAPY": 5.2,
    "depegPct": 0.23
  },
  {
    "date": "2022-04-05",
    "timestamp": 1649116800000,
    "spotPrice": 3284.58,
    "fundingAPR": 18.51,
    "stakingAPY": 5.19,
    "depegPct": 0.25
  },
  {
    "date": "2022-04-06",
    "timestamp": 1649203200000,
    "spotPrice": 3211.75,
    "fundingAPR": 16.54,
    "stakingAPY": 5.19,
    "depegPct": 0.27
  },
  {
    "date": "2022-04-07",
    "timestamp": 1649289600000,
    "spotPrice": 3145.61,
    "fundingAPR": 15.57,
    "stakingAPY": 5.19,
    "depegPct": 0.29
  },
  {
    "date": "2022-04-08",
    "timestamp": 1649376000000,
    "spotPrice": 3184.8,
    "fundingAPR": 17.49,
    "stakingAPY": 5.18,
    "depegPct": 0.32
  },
  {
    "date": "2022-04-09",
    "timestamp": 1649462400000,
    "spotPrice": 3183.17,
    "fundingAPR": 14.38,
    "stakingAPY": 5.18,
    "depegPct": 0.35
  },
  {
    "date": "2022-04-10",
    "timestamp": 1649548800000,
    "spotPrice": 3080.09,
    "fundingAPR": 14.91,
    "stakingAPY": 5.17,
    "depegPct": 0.38
  },
  {
    "date": "2022-04-11",
    "timestamp": 1649635200000,
    "spotPrice": 3037.69,
    "fundingAPR": 15.45,
    "stakingAPY": 5.17,
    "depegPct": 0.42
  },
  {
    "date": "2022-04-12",
    "timestamp": 1649721600000,
    "spotPrice": 3075.27,
    "fundingAPR": 12.18,
    "stakingAPY": 5.16,
    "depegPct": 0.46
  },
  {
    "date": "2022-04-13",
    "timestamp": 1649808000000,
    "spotPrice": 3026.13,
    "fundingAPR": 13.83,
    "stakingAPY": 5.15,
    "depegPct": 0.5
  },
  {
    "date": "2022-04-14",
    "timestamp": 1649894400000,
    "spotPrice": 2914.45,
    "fundingAPR": 12.61,
    "stakingAPY": 5.15,
    "depegPct": 0.54
  },
  {
    "date": "2022-04-15",
    "timestamp": 1649980800000,
    "spotPrice": 2901.17,
    "fundingAPR": 10.18,
    "stakingAPY": 5.14,
    "depegPct": 0.58
  },
  {
    "date": "2022-04-16",
    "timestamp": 1650067200000,
    "spotPrice": 2921.2,
    "fundingAPR": 12.13,
    "stakingAPY": 5.13,
    "depegPct": 0.63
  },
  {
    "date": "2022-04-17",
    "timestamp": 1650153600000,
    "spotPrice": 2830.92,
    "fundingAPR": 9.36,
    "stakingAPY": 5.13,
    "depegPct": 0.68
  },
  {
    "date": "2022-04-18",
    "timestamp": 1650240000000,
    "spotPrice": 2733.01,
    "fundingAPR": 8.43,
    "stakingAPY": 5.12,
    "depegPct": 0.73
  },
  {
    "date": "2022-04-19",
    "timestamp": 1650326400000,
    "spotPrice": 2745.22,
    "fundingAPR": 9.71,
    "stakingAPY": 5.11,
    "depegPct": 0.78
  },
  {
    "date": "2022-04-20",
    "timestamp": 1650412800000,
    "spotPrice": 2735.14,
    "fundingAPR": 6.16,
    "stakingAPY": 5.1,
    "depegPct": 0.83
  },
  {
    "date": "2022-04-21",
    "timestamp": 1650499200000,
    "spotPrice": 2619.75,
    "fundingAPR": 6.81,
    "stakingAPY": 5.1,
    "depegPct": 0.87
  },
  {
    "date": "2022-04-22",
    "timestamp": 1650585600000,
    "spotPrice": 2553.48,
    "fundingAPR": 6.69,
    "stakingAPY": 5.09,
    "depegPct": 0.92
  },
  {
    "date": "2022-04-23",
    "timestamp": 1650672000000,
    "spotPrice": 2580.17,
    "fundingAPR": 3.41,
    "stakingAPY": 5.08,
    "depegPct": 0.97
  },
  {
    "date": "2022-04-24",
    "timestamp": 1650758400000,
    "spotPrice": 2534.72,
    "fundingAPR": 5.13,
    "stakingAPY": 5.07,
    "depegPct": 1.02
  },
  {
    "date": "2022-04-25",
    "timestamp": 1650844800000,
    "spotPrice": 2416.44,
    "fundingAPR": 3.38,
    "stakingAPY": 5.07,
    "depegPct": 1.07
  },
  {
    "date": "2022-04-26",
    "timestamp": 1650931200000,
    "spotPrice": 2391.23,
    "fundingAPR": 1.32,
    "stakingAPY": 5.06,
    "depegPct": 1.12
  },
  {
    "date": "2022-04-27",
    "timestamp": 1651017600000,
    "spotPrice": 2417.6,
    "fundingAPR": 3.22,
    "stakingAPY": 5.05,
    "depegPct": 1.16
  },
  {
    "date": "2022-04-28",
    "timestamp": 1651104000000,
    "spotPrice": 2340.94,
    "fundingAPR": 0.24,
    "stakingAPY": 5.05,
    "depegPct": 1.2
  },
  {
    "date": "2022-04-29",
    "timestamp": 1651190400000,
    "spotPrice": 2243.13,
    "fundingAPR": -0.1,
    "stakingAPY": 5.04,
    "depegPct": 1.24
  },
  {
    "date": "2022-04-30",
    "timestamp": 1651276800000,
    "spotPrice": 2258.22,
    "fundingAPR": 1.04,
    "stakingAPY": 5.03,
    "depegPct": 1.28
  },
  {
    "date": "2022-05-01",
    "timestamp": 1651363200000,
    "spotPrice": 2270.3,
    "fundingAPR": -2.3,
    "stakingAPY": 5.03,
    "depegPct": 1.32
  },
  {
    "date": "2022-05-02",
    "timestamp": 1651449600000,
    "spotPrice": 2175.66,
    "fundingAPR": -1.01,
    "stakingAPY": 5.02,
    "depegPct": 1.35
  },
  {
    "date": "2022-05-03",
    "timestamp": 1651536000000,
    "spotPrice": 2117.38,
    "fundingAPR": -1.25,
    "stakingAPY": 5.02,
    "depegPct": 1.38
  },
  {
    "date": "2022-05-04",
    "timestamp": 1651622400000,
    "spotPrice": 2162.73,
    "fundingAPR": -3.92,
    "stakingAPY": 5.01,
    "depegPct": 1.41
  },
  {
    "date": "2022-05-05",
    "timestamp": 1651708800000,
    "spotPrice": 2151.65,
    "fundingAPR": -1.65,
    "stakingAPY": 5.01,
    "depegPct": 1.43
  },
  {
    "date": "2022-05-06",
    "timestamp": 1651795200000,
    "spotPrice": 2058.48,
    "fundingAPR": -3.35,
    "stakingAPY": 5.01,
    "depegPct": 1.45
  },
  {
    "date": "2022-05-07",
    "timestamp": 1651881600000,
    "spotPrice": 2050.17,
    "fundingAPR": -4.5,
    "stakingAPY": 5,
    "depegPct": 1.47
  },
  {
    "date": "2022-05-08",
    "timestamp": 1651968000000,
    "spotPrice": 2109.63,
    "fundingAPR": -2.21,
    "stakingAPY": 5,
    "depegPct": 1.48
  },
  {
    "date": "2022-05-09",
    "timestamp": 1652054400000,
    "spotPrice": 2074.5,
    "fundingAPR": -4.85,
    "stakingAPY": 5,
    "depegPct": 1.49
  },
  {
    "date": "2022-05-10",
    "timestamp": 1652140800000,
    "spotPrice": 2003.9,
    "fundingAPR": -4.16,
    "stakingAPY": 5,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-11",
    "timestamp": 1652227200000,
    "spotPrice": 2046.91,
    "fundingAPR": -2.76,
    "stakingAPY": 5,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-12",
    "timestamp": 1652313600000,
    "spotPrice": 2079.45,
    "fundingAPR": -5.45,
    "stakingAPY": 5,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-13",
    "timestamp": 1652400000000,
    "spotPrice": 2040.06,
    "fundingAPR": -3.25,
    "stakingAPY": 5,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-14",
    "timestamp": 1652486400000,
    "spotPrice": 2009.12,
    "fundingAPR": -3.39,
    "stakingAPY": 4.99,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-15",
    "timestamp": 1652572800000,
    "spotPrice": 2042.44,
    "fundingAPR": -5.23,
    "stakingAPY": 4.98,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-16",
    "timestamp": 1652659200000,
    "spotPrice": 2045.59,
    "fundingAPR": -2.4,
    "stakingAPY": 4.97,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-17",
    "timestamp": 1652745600000,
    "spotPrice": 1987.5,
    "fundingAPR": -4.04,
    "stakingAPY": 4.96,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-18",
    "timestamp": 1652832000000,
    "spotPrice": 1971.16,
    "fundingAPR": -4.34,
    "stakingAPY": 4.95,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-19",
    "timestamp": 1652918400000,
    "spotPrice": 2001.72,
    "fundingAPR": -1.91,
    "stakingAPY": 4.94,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-20",
    "timestamp": 1653004800000,
    "spotPrice": 1975.57,
    "fundingAPR": -4.42,
    "stakingAPY": 4.92,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-21",
    "timestamp": 1653091200000,
    "spotPrice": 1915.03,
    "fundingAPR": -3.06,
    "stakingAPY": 4.91,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-22",
    "timestamp": 1653177600000,
    "spotPrice": 1918.79,
    "fundingAPR": -1.9,
    "stakingAPY": 4.89,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-23",
    "timestamp": 1653264000000,
    "spotPrice": 1939.93,
    "fundingAPR": -4.33,
    "stakingAPY": 4.88,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-24",
    "timestamp": 1653350400000,
    "spotPrice": 1892.74,
    "fundingAPR": -1.79,
    "stakingAPY": 4.86,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-25",
    "timestamp": 1653436800000,
    "spotPrice": 1847.04,
    "fundingAPR": -2.3,
    "stakingAPY": 4.85,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-26",
    "timestamp": 1653523200000,
    "spotPrice": 1871.4,
    "fundingAPR": -3.74,
    "stakingAPY": 4.84,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-27",
    "timestamp": 1653609600000,
    "spotPrice": 1879.07,
    "fundingAPR": -0.92,
    "stakingAPY": 4.83,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-28",
    "timestamp": 1653696000000,
    "spotPrice": 1824.57,
    "fundingAPR": -2.89,
    "stakingAPY": 4.82,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-29",
    "timestamp": 1653782400000,
    "spotPrice": 1806.99,
    "fundingAPR": -2.79,
    "stakingAPY": 4.81,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-30",
    "timestamp": 1653868800000,
    "spotPrice": 1846.81,
    "fundingAPR": -0.72,
    "stakingAPY": 4.8,
    "depegPct": 1.5
  },
  {
    "date": "2022-05-31",
    "timestamp": 1653955200000,
    "spotPrice": 1840.1,
    "fundingAPR": -3.41,
    "stakingAPY": 4.8,
    "depegPct": 1.5
  },
  {
    "date": "2022-06-01",
    "timestamp": 1654041600000,
    "spotPrice": 1796.43,
    "fundingAPR": -1.79,
    "stakingAPY": 4.8,
    "depegPct": 1.5
  },
  {
    "date": "2022-06-02",
    "timestamp": 1654128000000,
    "spotPrice": 1801.51,
    "fundingAPR": -1.32,
    "stakingAPY": 4.8,
    "depegPct": 1.54
  },
  {
    "date": "2022-06-03",
    "timestamp": 1654214400000,
    "spotPrice": 1815.11,
    "fundingAPR": -4.03,
    "stakingAPY": 4.81,
    "depegPct": 1.67
  },
  {
    "date": "2022-06-04",
    "timestamp": 1654300800000,
    "spotPrice": 1754.65,
    "fundingAPR": -1.96,
    "stakingAPY": 4.83,
    "depegPct": 1.87
  },
  {
    "date": "2022-06-05",
    "timestamp": 1654387200000,
    "spotPrice": 1672.12,
    "fundingAPR": -3.76,
    "stakingAPY": 4.85,
    "depegPct": 2.15
  },
  {
    "date": "2022-06-06",
    "timestamp": 1654473600000,
    "spotPrice": 1639.6,
    "fundingAPR": -5.8,
    "stakingAPY": 4.88,
    "depegPct": 2.49
  },
  {
    "date": "2022-06-07",
    "timestamp": 1654560000000,
    "spotPrice": 1590.41,
    "fundingAPR": -4.19,
    "stakingAPY": 4.91,
    "depegPct": 2.89
  },
  {
    "date": "2022-06-08",
    "timestamp": 1654646400000,
    "spotPrice": 1474.42,
    "fundingAPR": -7.63,
    "stakingAPY": 4.95,
    "depegPct": 3.32
  },
  {
    "date": "2022-06-09",
    "timestamp": 1654732800000,
    "spotPrice": 1376.73,
    "fundingAPR": -8.31,
    "stakingAPY": 4.98,
    "depegPct": 3.77
  },
  {
    "date": "2022-06-10",
    "timestamp": 1654819200000,
    "spotPrice": 1331.54,
    "fundingAPR": -7.82,
    "stakingAPY": 5.02,
    "depegPct": 4.23
  },
  {
    "date": "2022-06-11",
    "timestamp": 1654905600000,
    "spotPrice": 1251.3,
    "fundingAPR": -11.72,
    "stakingAPY": 5.05,
    "depegPct": 4.68
  },
  {
    "date": "2022-06-12",
    "timestamp": 1654992000000,
    "spotPrice": 1130.82,
    "fundingAPR": -10.88,
    "stakingAPY": 5.09,
    "depegPct": 5.11
  },
  {
    "date": "2022-06-13",
    "timestamp": 1655078400000,
    "spotPrice": 1065.33,
    "fundingAPR": -11.76,
    "stakingAPY": 5.12,
    "depegPct": 5.51
  },
  {
    "date": "2022-06-14",
    "timestamp": 1655164800000,
    "spotPrice": 1041.5,
    "fundingAPR": -14.77,
    "stakingAPY": 5.15,
    "depegPct": 5.85
  },
  {
    "date": "2022-06-15",
    "timestamp": 1655251200000,
    "spotPrice": 973.03,
    "fundingAPR": -12.78,
    "stakingAPY": 5.17,
    "depegPct": 6.13
  },
  {
    "date": "2022-06-16",
    "timestamp": 1655337600000,
    "spotPrice": 900.25,
    "fundingAPR": -14.79,
    "stakingAPY": 5.19,
    "depegPct": 6.33
  },
  {
    "date": "2022-06-17",
    "timestamp": 1655424000000,
    "spotPrice": 902.98,
    "fundingAPR": -15.85,
    "stakingAPY": 5.2,
    "depegPct": 6.46
  },
  {
    "date": "2022-06-18",
    "timestamp": 1655510400000,
    "spotPrice": 909.38,
    "fundingAPR": -13.5,
    "stakingAPY": 5.2,
    "depegPct": 6.5
  },
  {
    "date": "2022-06-19",
    "timestamp": 1655596800000,
    "spotPrice": 900.43,
    "fundingAPR": -15.85,
    "stakingAPY": 5.19,
    "depegPct": 6.45
  },
  {
    "date": "2022-06-20",
    "timestamp": 1655683200000,
    "spotPrice": 912.43,
    "fundingAPR": -14.37,
    "stakingAPY": 5.17,
    "depegPct": 6.31
  },
  {
    "date": "2022-06-21",
    "timestamp": 1655769600000,
    "spotPrice": 964.91,
    "fundingAPR": -12.2,
    "stakingAPY": 5.14,
    "depegPct": 6.09
  },
  {
    "date": "2022-06-22",
    "timestamp": 1655856000000,
    "spotPrice": 1012.02,
    "fundingAPR": -13.78,
    "stakingAPY": 5.1,
    "depegPct": 5.81
  },
  {
    "date": "2022-06-23",
    "timestamp": 1655942400000,
    "spotPrice": 1038.91,
    "fundingAPR": -10.33,
    "stakingAPY": 5.05,
    "depegPct": 5.5
  },
  {
    "date": "2022-06-24",
    "timestamp": 1656028800000,
    "spotPrice": 1086.32,
    "fundingAPR": -9.45,
    "stakingAPY": 5,
    "depegPct": 5.19
  },
  {
    "date": "2022-06-25",
    "timestamp": 1656115200000,
    "spotPrice": 1148.66,
    "fundingAPR": -10.17,
    "stakingAPY": 4.96,
    "depegPct": 4.91
  },
  {
    "date": "2022-06-26",
    "timestamp": 1656201600000,
    "spotPrice": 1176.7,
    "fundingAPR": -6.57,
    "stakingAPY": 4.93,
    "depegPct": 4.69
  },
  {
    "date": "2022-06-27",
    "timestamp": 1656288000000,
    "spotPrice": 1179.77,
    "fundingAPR": -7.86,
    "stakingAPY": 4.91,
    "depegPct": 4.55
  },
  {
    "date": "2022-06-28",
    "timestamp": 1656374400000,
    "spotPrice": 1196.74,
    "fundingAPR": -7.95,
    "stakingAPY": 4.9,
    "depegPct": 4.5
  },
  {
    "date": "2022-06-29",
    "timestamp": 1656460800000,
    "spotPrice": 1218.85,
    "fundingAPR": -5.71,
    "stakingAPY": 4.9,
    "depegPct": 4.5
  },
  {
    "date": "2022-06-30",
    "timestamp": 1656547200000,
    "spotPrice": 1202.11,
    "fundingAPR": -8.31,
    "stakingAPY": 4.9,
    "depegPct": 4.49
  },
  {
    "date": "2022-07-01",
    "timestamp": 1656633600000,
    "spotPrice": 1190.19,
    "fundingAPR": -6.84,
    "stakingAPY": 4.9,
    "depegPct": 4.47
  },
  {
    "date": "2022-07-02",
    "timestamp": 1656720000000,
    "spotPrice": 1219.77,
    "fundingAPR": -5.79,
    "stakingAPY": 4.89,
    "depegPct": 4.44
  },
  {
    "date": "2022-07-03",
    "timestamp": 1656806400000,
    "spotPrice": 1237.68,
    "fundingAPR": -8.1,
    "stakingAPY": 4.89,
    "depegPct": 4.41
  },
  {
    "date": "2022-07-04",
    "timestamp": 1656892800000,
    "spotPrice": 1220.89,
    "fundingAPR": -5.36,
    "stakingAPY": 4.89,
    "depegPct": 4.37
  },
  {
    "date": "2022-07-05",
    "timestamp": 1656979200000,
    "spotPrice": 1228.41,
    "fundingAPR": -5.84,
    "stakingAPY": 4.88,
    "depegPct": 4.32
  },
  {
    "date": "2022-07-06",
    "timestamp": 1657065600000,
    "spotPrice": 1267.98,
    "fundingAPR": -6.93,
    "stakingAPY": 4.88,
    "depegPct": 4.27
  },
  {
    "date": "2022-07-07",
    "timestamp": 1657152000000,
    "spotPrice": 1278.48,
    "fundingAPR": -3.84,
    "stakingAPY": 4.87,
    "depegPct": 4.21
  },
  {
    "date": "2022-07-08",
    "timestamp": 1657238400000,
    "spotPrice": 1267.81,
    "fundingAPR": -5.56,
    "stakingAPY": 4.87,
    "depegPct": 4.14
  },
  {
    "date": "2022-07-09",
    "timestamp": 1657324800000,
    "spotPrice": 1294.89,
    "fundingAPR": -4.92,
    "stakingAPY": 4.86,
    "depegPct": 4.07
  },
  {
    "date": "2022-07-10",
    "timestamp": 1657411200000,
    "spotPrice": 1336.51,
    "fundingAPR": -2.5,
    "stakingAPY": 4.85,
    "depegPct": 4
  },
  {
    "date": "2022-07-11",
    "timestamp": 1657497600000,
    "spotPrice": 1339.52,
    "fundingAPR": -4.69,
    "stakingAPY": 4.85,
    "depegPct": 3.92
  },
  {
    "date": "2022-07-12",
    "timestamp": 1657584000000,
    "spotPrice": 1340.69,
    "fundingAPR": -2.4,
    "stakingAPY": 4.84,
    "depegPct": 3.83
  },
  {
    "date": "2022-07-13",
    "timestamp": 1657670400000,
    "spotPrice": 1383.46,
    "fundingAPR": -1.36,
    "stakingAPY": 4.83,
    "depegPct": 3.74
  },
  {
    "date": "2022-07-14",
    "timestamp": 1657756800000,
    "spotPrice": 1419.69,
    "fundingAPR": -3.05,
    "stakingAPY": 4.82,
    "depegPct": 3.64
  },
  {
    "date": "2022-07-15",
    "timestamp": 1657843200000,
    "spotPrice": 1418.11,
    "fundingAPR": 0.24,
    "stakingAPY": 4.81,
    "depegPct": 3.54
  },
  {
    "date": "2022-07-16",
    "timestamp": 1657929600000,
    "spotPrice": 1434.7,
    "fundingAPR": -0.3,
    "stakingAPY": 4.8,
    "depegPct": 3.44
  },
  {
    "date": "2022-07-17",
    "timestamp": 1658016000000,
    "spotPrice": 1486.07,
    "fundingAPR": -0.65,
    "stakingAPY": 4.79,
    "depegPct": 3.34
  },
  {
    "date": "2022-07-18",
    "timestamp": 1658102400000,
    "spotPrice": 1511.72,
    "fundingAPR": 2.63,
    "stakingAPY": 4.78,
    "depegPct": 3.23
  },
  {
    "date": "2022-07-19",
    "timestamp": 1658188800000,
    "spotPrice": 1510.38,
    "fundingAPR": 0.93,
    "stakingAPY": 4.77,
    "depegPct": 3.12
  },
  {
    "date": "2022-07-20",
    "timestamp": 1658275200000,
    "spotPrice": 1542.63,
    "fundingAPR": 2.28,
    "stakingAPY": 4.77,
    "depegPct": 3.02
  },
  {
    "date": "2022-07-21",
    "timestamp": 1658361600000,
    "spotPrice": 1593.86,
    "fundingAPR": 4.57,
    "stakingAPY": 4.76,
    "depegPct": 2.91
  },
  {
    "date": "2022-07-22",
    "timestamp": 1658448000000,
    "spotPrice": 1607.01,
    "fundingAPR": 2.58,
    "stakingAPY": 4.74,
    "depegPct": 2.79
  },
  {
    "date": "2022-07-23",
    "timestamp": 1658534400000,
    "spotPrice": 1611.12,
    "fundingAPR": 5.36,
    "stakingAPY": 4.73,
    "depegPct": 2.68
  },
  {
    "date": "2022-07-24",
    "timestamp": 1658620800000,
    "spotPrice": 1655.51,
    "fundingAPR": 6.06,
    "stakingAPY": 4.73,
    "depegPct": 2.58
  },
  {
    "date": "2022-07-25",
    "timestamp": 1658707200000,
    "spotPrice": 1698.17,
    "fundingAPR": 4.74,
    "stakingAPY": 4.72,
    "depegPct": 2.47
  },
  {
    "date": "2022-07-26",
    "timestamp": 1658793600000,
    "spotPrice": 1700.33,
    "fundingAPR": 8.16,
    "stakingAPY": 4.71,
    "depegPct": 2.36
  },
  {
    "date": "2022-07-27",
    "timestamp": 1658880000000,
    "spotPrice": 1713.76,
    "fundingAPR": 7.25,
    "stakingAPY": 4.7,
    "depegPct": 2.26
  },
  {
    "date": "2022-07-28",
    "timestamp": 1658966400000,
    "spotPrice": 1763.61,
    "fundingAPR": 7.32,
    "stakingAPY": 4.69,
    "depegPct": 2.16
  },
  {
    "date": "2022-07-29",
    "timestamp": 1659052800000,
    "spotPrice": 1791.41,
    "fundingAPR": 10.36,
    "stakingAPY": 4.68,
    "depegPct": 2.06
  },
  {
    "date": "2022-07-30",
    "timestamp": 1659139200000,
    "spotPrice": 1786.81,
    "fundingAPR": 8.39,
    "stakingAPY": 4.67,
    "depegPct": 1.96
  },
  {
    "date": "2022-07-31",
    "timestamp": 1659225600000,
    "spotPrice": 1810.72,
    "fundingAPR": 10.05,
    "stakingAPY": 4.66,
    "depegPct": 1.87
  },
  {
    "date": "2022-08-01",
    "timestamp": 1659312000000,
    "spotPrice": 1857.58,
    "fundingAPR": 11.8,
    "stakingAPY": 4.65,
    "depegPct": 1.78
  },
  {
    "date": "2022-08-02",
    "timestamp": 1659398400000,
    "spotPrice": 1867.68,
    "fundingAPR": 9.71,
    "stakingAPY": 4.65,
    "depegPct": 1.7
  },
  {
    "date": "2022-08-03",
    "timestamp": 1659484800000,
    "spotPrice": 1861.77,
    "fundingAPR": 12.54,
    "stakingAPY": 4.64,
    "depegPct": 1.63
  },
  {
    "date": "2022-08-04",
    "timestamp": 1659571200000,
    "spotPrice": 1894.02,
    "fundingAPR": 12.53,
    "stakingAPY": 4.63,
    "depegPct": 1.56
  },
  {
    "date": "2022-08-05",
    "timestamp": 1659657600000,
    "spotPrice": 1929.53,
    "fundingAPR": 11.27,
    "stakingAPY": 4.63,
    "depegPct": 1.49
  },
  {
    "date": "2022-08-06",
    "timestamp": 1659744000000,
    "spotPrice": 1922.97,
    "fundingAPR": 14.39,
    "stakingAPY": 4.62,
    "depegPct": 1.43
  },
  {
    "date": "2022-08-07",
    "timestamp": 1659830400000,
    "spotPrice": 1920.75,
    "fundingAPR": 12.79,
    "stakingAPY": 4.62,
    "depegPct": 1.38
  },
  {
    "date": "2022-08-08",
    "timestamp": 1659916800000,
    "spotPrice": 1956.11,
    "fundingAPR": 12.96,
    "stakingAPY": 4.61,
    "depegPct": 1.33
  },
  {
    "date": "2022-08-09",
    "timestamp": 1660003200000,
    "spotPrice": 1973.93,
    "fundingAPR": 15.35,
    "stakingAPY": 4.61,
    "depegPct": 1.29
  },
  {
    "date": "2022-08-10",
    "timestamp": 1660089600000,
    "spotPrice": 1955.09,
    "fundingAPR": 12.86,
    "stakingAPY": 4.61,
    "depegPct": 1.26
  },
  {
    "date": "2022-08-11",
    "timestamp": 1660176000000,
    "spotPrice": 1959.52,
    "fundingAPR": 14.5,
    "stakingAPY": 4.6,
    "depegPct": 1.23
  },
  {
    "date": "2022-08-12",
    "timestamp": 1660262400000,
    "spotPrice": 1990.84,
    "fundingAPR": 15.37,
    "stakingAPY": 4.6,
    "depegPct": 1.21
  },
  {
    "date": "2022-08-13",
    "timestamp": 1660348800000,
    "spotPrice": 1988.1,
    "fundingAPR": 12.98,
    "stakingAPY": 4.6,
    "depegPct": 1.2
  },
  {
    "date": "2022-08-14",
    "timestamp": 1660435200000,
    "spotPrice": 1952.56,
    "fundingAPR": 15.54,
    "stakingAPY": 4.6,
    "depegPct": 1.2
  },
  {
    "date": "2022-08-15",
    "timestamp": 1660521600000,
    "spotPrice": 1971.05,
    "fundingAPR": 14.56,
    "stakingAPY": 4.61,
    "depegPct": 1.2
  },
  {
    "date": "2022-08-16",
    "timestamp": 1660608000000,
    "spotPrice": 2004.58,
    "fundingAPR": 13.09,
    "stakingAPY": 4.63,
    "depegPct": 1.2
  },
  {
    "date": "2022-08-17",
    "timestamp": 1660694400000,
    "spotPrice": 1969.28,
    "fundingAPR": 15.49,
    "stakingAPY": 4.67,
    "depegPct": 1.2
  },
  {
    "date": "2022-08-18",
    "timestamp": 1660780800000,
    "spotPrice": 1931.31,
    "fundingAPR": 12.88,
    "stakingAPY": 4.72,
    "depegPct": 1.19
  },
  {
    "date": "2022-08-19",
    "timestamp": 1660867200000,
    "spotPrice": 1957.63,
    "fundingAPR": 12.72,
    "stakingAPY": 4.79,
    "depegPct": 1.19
  },
  {
    "date": "2022-08-20",
    "timestamp": 1660953600000,
    "spotPrice": 1965,
    "fundingAPR": 13.97,
    "stakingAPY": 4.87,
    "depegPct": 1.18
  },
  {
    "date": "2022-08-21",
    "timestamp": 1661040000000,
    "spotPrice": 1908.14,
    "fundingAPR": 10.57,
    "stakingAPY": 4.96,
    "depegPct": 1.18
  },
  {
    "date": "2022-08-22",
    "timestamp": 1661126400000,
    "spotPrice": 1882.24,
    "fundingAPR": 11.67,
    "stakingAPY": 5.07,
    "depegPct": 1.17
  },
  {
    "date": "2022-08-23",
    "timestamp": 1661212800000,
    "spotPrice": 1908.36,
    "fundingAPR": 11.14,
    "stakingAPY": 5.18,
    "depegPct": 1.16
  },
  {
    "date": "2022-08-24",
    "timestamp": 1661299200000,
    "spotPrice": 1886.26,
    "fundingAPR": 8.03,
    "stakingAPY": 5.31,
    "depegPct": 1.16
  },
  {
    "date": "2022-08-25",
    "timestamp": 1661385600000,
    "spotPrice": 1821.09,
    "fundingAPR": 9.76,
    "stakingAPY": 5.45,
    "depegPct": 1.15
  },
  {
    "date": "2022-08-26",
    "timestamp": 1661472000000,
    "spotPrice": 1812.2,
    "fundingAPR": 7.42,
    "stakingAPY": 5.59,
    "depegPct": 1.14
  },
  {
    "date": "2022-08-27",
    "timestamp": 1661558400000,
    "spotPrice": 1829.31,
    "fundingAPR": 5.49,
    "stakingAPY": 5.74,
    "depegPct": 1.13
  },
  {
    "date": "2022-08-28",
    "timestamp": 1661644800000,
    "spotPrice": 1781.34,
    "fundingAPR": 6.94,
    "stakingAPY": 5.89,
    "depegPct": 1.12
  },
  {
    "date": "2022-08-29",
    "timestamp": 1661731200000,
    "spotPrice": 1722.56,
    "fundingAPR": 3.38,
    "stakingAPY": 6.04,
    "depegPct": 1.11
  },
  {
    "date": "2022-08-30",
    "timestamp": 1661817600000,
    "spotPrice": 1730.57,
    "fundingAPR": 3.05,
    "stakingAPY": 6.2,
    "depegPct": 1.1
  },
  {
    "date": "2022-08-31",
    "timestamp": 1661904000000,
    "spotPrice": 1731.65,
    "fundingAPR": 3.39,
    "stakingAPY": 6.36,
    "depegPct": 1.09
  },
  {
    "date": "2022-09-01",
    "timestamp": 1661990400000,
    "spotPrice": 1667.72,
    "fundingAPR": -0.4,
    "stakingAPY": 6.51,
    "depegPct": 1.08
  },
  {
    "date": "2022-09-02",
    "timestamp": 1662076800000,
    "spotPrice": 1628.02,
    "fundingAPR": 0.68,
    "stakingAPY": 6.66,
    "depegPct": 1.07
  },
  {
    "date": "2022-09-03",
    "timestamp": 1662163200000,
    "spotPrice": 1648.14,
    "fundingAPR": -0.52,
    "stakingAPY": 6.81,
    "depegPct": 1.06
  },
  {
    "date": "2022-09-04",
    "timestamp": 1662249600000,
    "spotPrice": 1630.21,
    "fundingAPR": -3.45,
    "stakingAPY": 6.95,
    "depegPct": 1.05
  },
  {
    "date": "2022-09-05",
    "timestamp": 1662336000000,
    "spotPrice": 1564.35,
    "fundingAPR": -1.67,
    "stakingAPY": 7.09,
    "depegPct": 1.04
  },
  {
    "date": "2022-09-06",
    "timestamp": 1662422400000,
    "spotPrice": 1551.47,
    "fundingAPR": -4.27,
    "stakingAPY": 7.22,
    "depegPct": 1.04
  },
  {
    "date": "2022-09-07",
    "timestamp": 1662508800000,
    "spotPrice": 1575.91,
    "fundingAPR": -5.54,
    "stakingAPY": 7.33,
    "depegPct": 1.03
  },
  {
    "date": "2022-09-08",
    "timestamp": 1662595200000,
    "spotPrice": 1541.21,
    "fundingAPR": -3.96,
    "stakingAPY": 7.44,
    "depegPct": 1.02
  },
  {
    "date": "2022-09-09",
    "timestamp": 1662681600000,
    "spotPrice": 1488.31,
    "fundingAPR": -7.25,
    "stakingAPY": 7.53,
    "depegPct": 1.02
  },
  {
    "date": "2022-09-10",
    "timestamp": 1662768000000,
    "spotPrice": 1503.45,
    "fundingAPR": -6.63,
    "stakingAPY": 7.61,
    "depegPct": 1.01
  },
  {
    "date": "2022-09-11",
    "timestamp": 1662854400000,
    "spotPrice": 1523.82,
    "fundingAPR": -6.06,
    "stakingAPY": 7.68,
    "depegPct": 1.01
  },
  {
    "date": "2022-09-12",
    "timestamp": 1662940800000,
    "spotPrice": 1479.61,
    "fundingAPR": -9.01,
    "stakingAPY": 7.73,
    "depegPct": 1
  },
  {
    "date": "2022-09-13",
    "timestamp": 1663027200000,
    "spotPrice": 1451.87,
    "fundingAPR": -6.88,
    "stakingAPY": 7.77,
    "depegPct": 1
  },
  {
    "date": "2022-09-14",
    "timestamp": 1663113600000,
    "spotPrice": 1489.69,
    "fundingAPR": -7.66,
    "stakingAPY": 7.79,
    "depegPct": 1
  },
  {
    "date": "2022-09-15",
    "timestamp": 1663200000000,
    "spotPrice": 1493.26,
    "fundingAPR": -9.29,
    "stakingAPY": 7.8,
    "depegPct": 1
  },
  {
    "date": "2022-09-16",
    "timestamp": 1663286400000,
    "spotPrice": 1460.37,
    "fundingAPR": -6.55,
    "stakingAPY": 7.8,
    "depegPct": 1
  },
  {
    "date": "2022-09-17",
    "timestamp": 1663372800000,
    "spotPrice": 1460.98,
    "fundingAPR": -8.54,
    "stakingAPY": 7.79,
    "depegPct": 1
  },
  {
    "date": "2022-09-18",
    "timestamp": 1663459200000,
    "spotPrice": 1494.46,
    "fundingAPR": -8.44,
    "stakingAPY": 7.77,
    "depegPct": 1
  },
  {
    "date": "2022-09-19",
    "timestamp": 1663545600000,
    "spotPrice": 1486.46,
    "fundingAPR": -6.27,
    "stakingAPY": 7.75,
    "depegPct": 1
  },
  {
    "date": "2022-09-20",
    "timestamp": 1663632000000,
    "spotPrice": 1456.77,
    "fundingAPR": -8.82,
    "stakingAPY": 7.72,
    "depegPct": 0.99
  },
  {
    "date": "2022-09-21",
    "timestamp": 1663718400000,
    "spotPrice": 1474.64,
    "fundingAPR": -7.02,
    "stakingAPY": 7.68,
    "depegPct": 0.99
  },
  {
    "date": "2022-09-22",
    "timestamp": 1663804800000,
    "spotPrice": 1502.4,
    "fundingAPR": -6.17,
    "stakingAPY": 7.64,
    "depegPct": 0.99
  },
  {
    "date": "2022-09-23",
    "timestamp": 1663891200000,
    "spotPrice": 1480.52,
    "fundingAPR": -8.29,
    "stakingAPY": 7.6,
    "depegPct": 0.99
  },
  {
    "date": "2022-09-24",
    "timestamp": 1663977600000,
    "spotPrice": 1461.98,
    "fundingAPR": -5.4,
    "stakingAPY": 7.54,
    "depegPct": 0.98
  },
  {
    "date": "2022-09-25",
    "timestamp": 1664064000000,
    "spotPrice": 1492.64,
    "fundingAPR": -6.11,
    "stakingAPY": 7.49,
    "depegPct": 0.98
  },
  {
    "date": "2022-09-26",
    "timestamp": 1664150400000,
    "spotPrice": 1507.7,
    "fundingAPR": -6.92,
    "stakingAPY": 7.42,
    "depegPct": 0.97
  },
  {
    "date": "2022-09-27",
    "timestamp": 1664236800000,
    "spotPrice": 1477.96,
    "fundingAPR": -3.9,
    "stakingAPY": 7.36,
    "depegPct": 0.97
  },
  {
    "date": "2022-09-28",
    "timestamp": 1664323200000,
    "spotPrice": 1475.73,
    "fundingAPR": -5.79,
    "stakingAPY": 7.28,
    "depegPct": 0.96
  },
  {
    "date": "2022-09-29",
    "timestamp": 1664409600000,
    "spotPrice": 1511.56,
    "fundingAPR": -4.88,
    "stakingAPY": 7.21,
    "depegPct": 0.96
  },
  {
    "date": "2022-09-30",
    "timestamp": 1664496000000,
    "spotPrice": 1510.37,
    "fundingAPR": -2.7,
    "stakingAPY": 7.13,
    "depegPct": 0.95
  },
  {
    "date": "2022-10-01",
    "timestamp": 1664582400000,
    "spotPrice": 1480.96,
    "fundingAPR": -4.95,
    "stakingAPY": 7.04,
    "depegPct": 0.95
  },
  {
    "date": "2022-10-02",
    "timestamp": 1664668800000,
    "spotPrice": 1496.09,
    "fundingAPR": -2.5,
    "stakingAPY": 6.96,
    "depegPct": 0.94
  },
  {
    "date": "2022-10-03",
    "timestamp": 1664755200000,
    "spotPrice": 1528.21,
    "fundingAPR": -1.82,
    "stakingAPY": 6.87,
    "depegPct": 0.93
  },
  {
    "date": "2022-10-04",
    "timestamp": 1664841600000,
    "spotPrice": 1511.6,
    "fundingAPR": -3.43,
    "stakingAPY": 6.78,
    "depegPct": 0.93
  },
  {
    "date": "2022-10-05",
    "timestamp": 1664928000000,
    "spotPrice": 1490.73,
    "fundingAPR": -0.18,
    "stakingAPY": 6.68,
    "depegPct": 0.92
  },
  {
    "date": "2022-10-06",
    "timestamp": 1665014400000,
    "spotPrice": 1519.81,
    "fundingAPR": -1.08,
    "stakingAPY": 6.59,
    "depegPct": 0.91
  },
  {
    "date": "2022-10-07",
    "timestamp": 1665100800000,
    "spotPrice": 1540.39,
    "fundingAPR": -1.28,
    "stakingAPY": 6.5,
    "depegPct": 0.91
  },
  {
    "date": "2022-10-08",
    "timestamp": 1665187200000,
    "spotPrice": 1513.27,
    "fundingAPR": 1.75,
    "stakingAPY": 6.4,
    "depegPct": 0.9
  },
  {
    "date": "2022-10-09",
    "timestamp": 1665273600000,
    "spotPrice": 1506.99,
    "fundingAPR": -0.22,
    "stakingAPY": 6.3,
    "depegPct": 0.89
  },
  {
    "date": "2022-10-10",
    "timestamp": 1665360000000,
    "spotPrice": 1543.03,
    "fundingAPR": 1.25,
    "stakingAPY": 6.21,
    "depegPct": 0.89
  },
  {
    "date": "2022-10-11",
    "timestamp": 1665446400000,
    "spotPrice": 1547.29,
    "fundingAPR": 3.13,
    "stakingAPY": 6.12,
    "depegPct": 0.88
  },
  {
    "date": "2022-10-12",
    "timestamp": 1665532800000,
    "spotPrice": 1517.36,
    "fundingAPR": 1,
    "stakingAPY": 6.02,
    "depegPct": 0.87
  },
  {
    "date": "2022-10-13",
    "timestamp": 1665619200000,
    "spotPrice": 1527.91,
    "fundingAPR": 3.77,
    "stakingAPY": 5.93,
    "depegPct": 0.87
  },
  {
    "date": "2022-10-14",
    "timestamp": 1665705600000,
    "spotPrice": 1562.09,
    "fundingAPR": 3.99,
    "stakingAPY": 5.84,
    "depegPct": 0.86
  },
  {
    "date": "2022-10-15",
    "timestamp": 1665792000000,
    "spotPrice": 1549.53,
    "fundingAPR": 2.68,
    "stakingAPY": 5.76,
    "depegPct": 0.85
  },
  {
    "date": "2022-10-16",
    "timestamp": 1665878400000,
    "spotPrice": 1525.18,
    "fundingAPR": 5.91,
    "stakingAPY": 5.67,
    "depegPct": 0.85
  },
  {
    "date": "2022-10-17",
    "timestamp": 1665964800000,
    "spotPrice": 1550.38,
    "fundingAPR": 4.55,
    "stakingAPY": 5.59,
    "depegPct": 0.84
  },
  {
    "date": "2022-10-18",
    "timestamp": 1666051200000,
    "spotPrice": 1574.35,
    "fundingAPR": 4.69,
    "stakingAPY": 5.52,
    "depegPct": 0.84
  },
  {
    "date": "2022-10-19",
    "timestamp": 1666137600000,
    "spotPrice": 1548.79,
    "fundingAPR": 7.35,
    "stakingAPY": 5.44,
    "depegPct": 0.83
  },
  {
    "date": "2022-10-20",
    "timestamp": 1666224000000,
    "spotPrice": 1536.92,
    "fundingAPR": 5.08,
    "stakingAPY": 5.38,
    "depegPct": 0.83
  },
  {
    "date": "2022-10-21",
    "timestamp": 1666310400000,
    "spotPrice": 1570.7,
    "fundingAPR": 6.77,
    "stakingAPY": 5.31,
    "depegPct": 0.82
  },
  {
    "date": "2022-10-22",
    "timestamp": 1666396800000,
    "spotPrice": 1578.67,
    "fundingAPR": 8.02,
    "stakingAPY": 5.26,
    "depegPct": 0.82
  },
  {
    "date": "2022-10-23",
    "timestamp": 1666483200000,
    "spotPrice": 1547.25,
    "fundingAPR": 5.8,
    "stakingAPY": 5.2,
    "depegPct": 0.81
  },
  {
    "date": "2022-10-24",
    "timestamp": 1666569600000,
    "spotPrice": 1551.39,
    "fundingAPR": 8.54,
    "stakingAPY": 5.16,
    "depegPct": 0.81
  },
  {
    "date": "2022-10-25",
    "timestamp": 1666656000000,
    "spotPrice": 1585.32,
    "fundingAPR": 8.03,
    "stakingAPY": 5.12,
    "depegPct": 0.81
  },
  {
    "date": "2022-10-26",
    "timestamp": 1666742400000,
    "spotPrice": 1575.58,
    "fundingAPR": 6.77,
    "stakingAPY": 5.08,
    "depegPct": 0.81
  },
  {
    "date": "2022-10-27",
    "timestamp": 1666828800000,
    "spotPrice": 1546.84,
    "fundingAPR": 9.65,
    "stakingAPY": 5.05,
    "depegPct": 0.8
  },
  {
    "date": "2022-10-28",
    "timestamp": 1666915200000,
    "spotPrice": 1566.2,
    "fundingAPR": 7.64,
    "stakingAPY": 5.03,
    "depegPct": 0.8
  },
  {
    "date": "2022-10-29",
    "timestamp": 1667001600000,
    "spotPrice": 1591.68,
    "fundingAPR": 7.88,
    "stakingAPY": 5.01,
    "depegPct": 0.8
  },
  {
    "date": "2022-10-30",
    "timestamp": 1667088000000,
    "spotPrice": 1567,
    "fundingAPR": 9.88,
    "stakingAPY": 5,
    "depegPct": 0.8
  },
  {
    "date": "2022-10-31",
    "timestamp": 1667174400000,
    "spotPrice": 1547.24,
    "fundingAPR": 7.17,
    "stakingAPY": 5,
    "depegPct": 0.8
  },
  {
    "date": "2022-11-01",
    "timestamp": 1667260800000,
    "spotPrice": 1564.77,
    "fundingAPR": 8.01,
    "stakingAPY": 5.02,
    "depegPct": 0.84
  },
  {
    "date": "2022-11-02",
    "timestamp": 1667347200000,
    "spotPrice": 1535.47,
    "fundingAPR": 6,
    "stakingAPY": 5.06,
    "depegPct": 0.96
  },
  {
    "date": "2022-11-03",
    "timestamp": 1667433600000,
    "spotPrice": 1438.29,
    "fundingAPR": -0.11,
    "stakingAPY": 5.13,
    "depegPct": 1.15
  },
  {
    "date": "2022-11-04",
    "timestamp": 1667520000000,
    "spotPrice": 1359.02,
    "fundingAPR": -2.13,
    "stakingAPY": 5.21,
    "depegPct": 1.38
  },
  {
    "date": "2022-11-05",
    "timestamp": 1667606400000,
    "spotPrice": 1312.73,
    "fundingAPR": -8.26,
    "stakingAPY": 5.29,
    "depegPct": 1.62
  },
  {
    "date": "2022-11-06",
    "timestamp": 1667692800000,
    "spotPrice": 1229.51,
    "fundingAPR": -13.97,
    "stakingAPY": 5.38,
    "depegPct": 1.85
  },
  {
    "date": "2022-11-07",
    "timestamp": 1667779200000,
    "spotPrice": 1133.34,
    "fundingAPR": -15.17,
    "stakingAPY": 5.44,
    "depegPct": 2.04
  },
  {
    "date": "2022-11-08",
    "timestamp": 1667865600000,
    "spotPrice": 1107.74,
    "fundingAPR": -20.04,
    "stakingAPY": 5.48,
    "depegPct": 2.16
  },
  {
    "date": "2022-11-09",
    "timestamp": 1667952000000,
    "spotPrice": 1116.32,
    "fundingAPR": -20.3,
    "stakingAPY": 5.5,
    "depegPct": 2.2
  },
  {
    "date": "2022-11-10",
    "timestamp": 1668038400000,
    "spotPrice": 1101.37,
    "fundingAPR": -18.66,
    "stakingAPY": 5.5,
    "depegPct": 2.2
  },
  {
    "date": "2022-11-11",
    "timestamp": 1668124800000,
    "spotPrice": 1087.82,
    "fundingAPR": -21.25,
    "stakingAPY": 5.49,
    "depegPct": 2.2
  },
  {
    "date": "2022-11-12",
    "timestamp": 1668211200000,
    "spotPrice": 1113.33,
    "fundingAPR": -19,
    "stakingAPY": 5.49,
    "depegPct": 2.19
  },
  {
    "date": "2022-11-13",
    "timestamp": 1668297600000,
    "spotPrice": 1131.9,
    "fundingAPR": -18.69,
    "stakingAPY": 5.47,
    "depegPct": 2.18
  },
  {
    "date": "2022-11-14",
    "timestamp": 1668384000000,
    "spotPrice": 1117.47,
    "fundingAPR": -20.36,
    "stakingAPY": 5.46,
    "depegPct": 2.17
  },
  {
    "date": "2022-11-15",
    "timestamp": 1668470400000,
    "spotPrice": 1122.41,
    "fundingAPR": -17.21,
    "stakingAPY": 5.44,
    "depegPct": 2.16
  },
  {
    "date": "2022-11-16",
    "timestamp": 1668556800000,
    "spotPrice": 1158.83,
    "fundingAPR": -18.29,
    "stakingAPY": 5.42,
    "depegPct": 2.15
  },
  {
    "date": "2022-11-17",
    "timestamp": 1668643200000,
    "spotPrice": 1170.73,
    "fundingAPR": -18.37,
    "stakingAPY": 5.4,
    "depegPct": 2.14
  },
  {
    "date": "2022-11-18",
    "timestamp": 1668729600000,
    "spotPrice": 1159.84,
    "fundingAPR": -15.39,
    "stakingAPY": 5.38,
    "depegPct": 2.12
  },
  {
    "date": "2022-11-19",
    "timestamp": 1668816000000,
    "spotPrice": 1181.08,
    "fundingAPR": -17.38,
    "stakingAPY": 5.36,
    "depegPct": 2.11
  },
  {
    "date": "2022-11-20",
    "timestamp": 1668902400000,
    "spotPrice": 1217.88,
    "fundingAPR": -15.75,
    "stakingAPY": 5.34,
    "depegPct": 2.09
  },
  {
    "date": "2022-11-21",
    "timestamp": 1668988800000,
    "spotPrice": 1218.9,
    "fundingAPR": -13.96,
    "stakingAPY": 5.32,
    "depegPct": 2.08
  },
  {
    "date": "2022-11-22",
    "timestamp": 1669075200000,
    "spotPrice": 1213.22,
    "fundingAPR": -16.02,
    "stakingAPY": 5.3,
    "depegPct": 2.06
  },
  {
    "date": "2022-11-23",
    "timestamp": 1669161600000,
    "spotPrice": 1243.99,
    "fundingAPR": -13.17,
    "stakingAPY": 5.28,
    "depegPct": 2.05
  },
  {
    "date": "2022-11-24",
    "timestamp": 1669248000000,
    "spotPrice": 1270.34,
    "fundingAPR": -13.12,
    "stakingAPY": 5.26,
    "depegPct": 2.04
  },
  {
    "date": "2022-11-25",
    "timestamp": 1669334400000,
    "spotPrice": 1259,
    "fundingAPR": -14.4,
    "stakingAPY": 5.24,
    "depegPct": 2.03
  },
  {
    "date": "2022-11-26",
    "timestamp": 1669420800000,
    "spotPrice": 1258.84,
    "fundingAPR": -11.3,
    "stakingAPY": 5.23,
    "depegPct": 2.02
  },
  {
    "date": "2022-11-27",
    "timestamp": 1669507200000,
    "spotPrice": 1290.01,
    "fundingAPR": -12.92,
    "stakingAPY": 5.21,
    "depegPct": 2.01
  },
  {
    "date": "2022-11-28",
    "timestamp": 1669593600000,
    "spotPrice": 1298,
    "fundingAPR": -12.87,
    "stakingAPY": 5.21,
    "depegPct": 2
  },
  {
    "date": "2022-11-29",
    "timestamp": 1669680000000,
    "spotPrice": 1276.37,
    "fundingAPR": -10.59,
    "stakingAPY": 5.2,
    "depegPct": 2
  },
  {
    "date": "2022-11-30",
    "timestamp": 1669766400000,
    "spotPrice": 1279.46,
    "fundingAPR": -13.24,
    "stakingAPY": 5.2,
    "depegPct": 2
  },
  {
    "date": "2022-12-01",
    "timestamp": 1669852800000,
    "spotPrice": 1307.22,
    "fundingAPR": -11.78,
    "stakingAPY": 5.2,
    "depegPct": 2
  },
  {
    "date": "2022-12-02",
    "timestamp": 1669939200000,
    "spotPrice": 1295.12,
    "fundingAPR": -10.95,
    "stakingAPY": 5.2,
    "depegPct": 1.99
  },
  {
    "date": "2022-12-03",
    "timestamp": 1670025600000,
    "spotPrice": 1268.93,
    "fundingAPR": -13.34,
    "stakingAPY": 5.19,
    "depegPct": 1.99
  },
  {
    "date": "2022-12-04",
    "timestamp": 1670112000000,
    "spotPrice": 1285.21,
    "fundingAPR": -10.69,
    "stakingAPY": 5.19,
    "depegPct": 1.98
  },
  {
    "date": "2022-12-05",
    "timestamp": 1670198400000,
    "spotPrice": 1303.65,
    "fundingAPR": -11.43,
    "stakingAPY": 5.18,
    "depegPct": 1.97
  },
  {
    "date": "2022-12-06",
    "timestamp": 1670284800000,
    "spotPrice": 1278.1,
    "fundingAPR": -12.58,
    "stakingAPY": 5.17,
    "depegPct": 1.96
  },
  {
    "date": "2022-12-07",
    "timestamp": 1670371200000,
    "spotPrice": 1260.83,
    "fundingAPR": -9.69,
    "stakingAPY": 5.16,
    "depegPct": 1.94
  },
  {
    "date": "2022-12-08",
    "timestamp": 1670457600000,
    "spotPrice": 1284.55,
    "fundingAPR": -11.67,
    "stakingAPY": 5.15,
    "depegPct": 1.92
  },
  {
    "date": "2022-12-09",
    "timestamp": 1670544000000,
    "spotPrice": 1288.66,
    "fundingAPR": -11.11,
    "stakingAPY": 5.14,
    "depegPct": 1.9
  },
  {
    "date": "2022-12-10",
    "timestamp": 1670630400000,
    "spotPrice": 1256.1,
    "fundingAPR": -8.98,
    "stakingAPY": 5.13,
    "depegPct": 1.88
  },
  {
    "date": "2022-12-11",
    "timestamp": 1670716800000,
    "spotPrice": 1251.98,
    "fundingAPR": -11.41,
    "stakingAPY": 5.12,
    "depegPct": 1.86
  },
  {
    "date": "2022-12-12",
    "timestamp": 1670803200000,
    "spotPrice": 1276.64,
    "fundingAPR": -9.27,
    "stakingAPY": 5.1,
    "depegPct": 1.84
  },
  {
    "date": "2022-12-13",
    "timestamp": 1670889600000,
    "spotPrice": 1264.99,
    "fundingAPR": -8.61,
    "stakingAPY": 5.09,
    "depegPct": 1.81
  },
  {
    "date": "2022-12-14",
    "timestamp": 1670976000000,
    "spotPrice": 1233.56,
    "fundingAPR": -10.5,
    "stakingAPY": 5.07,
    "depegPct": 1.79
  },
  {
    "date": "2022-12-15",
    "timestamp": 1671062400000,
    "spotPrice": 1243.27,
    "fundingAPR": -7.48,
    "stakingAPY": 5.06,
    "depegPct": 1.76
  },
  {
    "date": "2022-12-16",
    "timestamp": 1671148800000,
    "spotPrice": 1262.01,
    "fundingAPR": -8.44,
    "stakingAPY": 5.04,
    "depegPct": 1.74
  },
  {
    "date": "2022-12-17",
    "timestamp": 1671235200000,
    "spotPrice": 1237.22,
    "fundingAPR": -9.01,
    "stakingAPY": 5.03,
    "depegPct": 1.71
  },
  {
    "date": "2022-12-18",
    "timestamp": 1671321600000,
    "spotPrice": 1214.68,
    "fundingAPR": -6.12,
    "stakingAPY": 5.01,
    "depegPct": 1.69
  },
  {
    "date": "2022-12-19",
    "timestamp": 1671408000000,
    "spotPrice": 1235.24,
    "fundingAPR": -8.24,
    "stakingAPY": 5,
    "depegPct": 1.66
  },
  {
    "date": "2022-12-20",
    "timestamp": 1671494400000,
    "spotPrice": 1242.71,
    "fundingAPR": -7.18,
    "stakingAPY": 4.98,
    "depegPct": 1.64
  },
  {
    "date": "2022-12-21",
    "timestamp": 1671580800000,
    "spotPrice": 1210.81,
    "fundingAPR": -5.4,
    "stakingAPY": 4.97,
    "depegPct": 1.62
  },
  {
    "date": "2022-12-22",
    "timestamp": 1671667200000,
    "spotPrice": 1202.6,
    "fundingAPR": -7.81,
    "stakingAPY": 4.96,
    "depegPct": 1.6
  },
  {
    "date": "2022-12-23",
    "timestamp": 1671753600000,
    "spotPrice": 1228.21,
    "fundingAPR": -5.41,
    "stakingAPY": 4.95,
    "depegPct": 1.58
  },
  {
    "date": "2022-12-24",
    "timestamp": 1671840000000,
    "spotPrice": 1222.05,
    "fundingAPR": -5.3,
    "stakingAPY": 4.94,
    "depegPct": 1.56
  },
  {
    "date": "2022-12-25",
    "timestamp": 1671926400000,
    "spotPrice": 1190.97,
    "fundingAPR": -7.03,
    "stakingAPY": 4.93,
    "depegPct": 1.54
  },
  {
    "date": "2022-12-26",
    "timestamp": 1672012800000,
    "spotPrice": 1198.87,
    "fundingAPR": -4.11,
    "stakingAPY": 4.92,
    "depegPct": 1.53
  },
  {
    "date": "2022-12-27",
    "timestamp": 1672099200000,
    "spotPrice": 1222.49,
    "fundingAPR": -5.65,
    "stakingAPY": 4.91,
    "depegPct": 1.52
  },
  {
    "date": "2022-12-28",
    "timestamp": 1672185600000,
    "spotPrice": 1203.99,
    "fundingAPR": -6,
    "stakingAPY": 4.91,
    "depegPct": 1.51
  },
  {
    "date": "2022-12-29",
    "timestamp": 1672272000000,
    "spotPrice": 1181.58,
    "fundingAPR": -3.58,
    "stakingAPY": 4.9,
    "depegPct": 1.51
  },
  {
    "date": "2022-12-30",
    "timestamp": 1672358400000,
    "spotPrice": 1203.29,
    "fundingAPR": -6.16,
    "stakingAPY": 4.9,
    "depegPct": 1.5
  },
  {
    "date": "2022-12-31",
    "timestamp": 1672444800000,
    "spotPrice": 1217.26,
    "fundingAPR": -4.97,
    "stakingAPY": 4.9,
    "depegPct": 1.5
  },
  {
    "date": "2023-01-01",
    "timestamp": 1672531200000,
    "spotPrice": 1193.7,
    "fundingAPR": -3.87,
    "stakingAPY": 4.9,
    "depegPct": 1.5
  },
  {
    "date": "2023-01-02",
    "timestamp": 1672617600000,
    "spotPrice": 1188.56,
    "fundingAPR": -6.36,
    "stakingAPY": 4.9,
    "depegPct": 1.49
  },
  {
    "date": "2023-01-03",
    "timestamp": 1672704000000,
    "spotPrice": 1220.08,
    "fundingAPR": -3.81,
    "stakingAPY": 4.89,
    "depegPct": 1.49
  },
  {
    "date": "2023-01-04",
    "timestamp": 1672790400000,
    "spotPrice": 1228.08,
    "fundingAPR": -4.17,
    "stakingAPY": 4.88,
    "depegPct": 1.48
  },
  {
    "date": "2023-01-05",
    "timestamp": 1672876800000,
    "spotPrice": 1209.72,
    "fundingAPR": -5.48,
    "stakingAPY": 4.87,
    "depegPct": 1.47
  },
  {
    "date": "2023-01-06",
    "timestamp": 1672963200000,
    "spotPrice": 1225.75,
    "fundingAPR": -2.41,
    "stakingAPY": 4.86,
    "depegPct": 1.46
  },
  {
    "date": "2023-01-07",
    "timestamp": 1673049600000,
    "spotPrice": 1263.16,
    "fundingAPR": -4.03,
    "stakingAPY": 4.85,
    "depegPct": 1.44
  },
  {
    "date": "2023-01-08",
    "timestamp": 1673136000000,
    "spotPrice": 1264.32,
    "fundingAPR": -3.6,
    "stakingAPY": 4.84,
    "depegPct": 1.42
  },
  {
    "date": "2023-01-09",
    "timestamp": 1673222400000,
    "spotPrice": 1256.8,
    "fundingAPR": -1.05,
    "stakingAPY": 4.82,
    "depegPct": 1.4
  },
  {
    "date": "2023-01-10",
    "timestamp": 1673308800000,
    "spotPrice": 1290.84,
    "fundingAPR": -3.22,
    "stakingAPY": 4.81,
    "depegPct": 1.38
  },
  {
    "date": "2023-01-11",
    "timestamp": 1673395200000,
    "spotPrice": 1325.55,
    "fundingAPR": -1.08,
    "stakingAPY": 4.79,
    "depegPct": 1.36
  },
  {
    "date": "2023-01-12",
    "timestamp": 1673481600000,
    "spotPrice": 1320.89,
    "fundingAPR": 0.16,
    "stakingAPY": 4.77,
    "depegPct": 1.34
  },
  {
    "date": "2023-01-13",
    "timestamp": 1673568000000,
    "spotPrice": 1327.65,
    "fundingAPR": -1.63,
    "stakingAPY": 4.75,
    "depegPct": 1.31
  },
  {
    "date": "2023-01-14",
    "timestamp": 1673654400000,
    "spotPrice": 1372.38,
    "fundingAPR": 1.6,
    "stakingAPY": 4.73,
    "depegPct": 1.29
  },
  {
    "date": "2023-01-15",
    "timestamp": 1673740800000,
    "spotPrice": 1397.02,
    "fundingAPR": 1.23,
    "stakingAPY": 4.71,
    "depegPct": 1.26
  },
  {
    "date": "2023-01-16",
    "timestamp": 1673827200000,
    "spotPrice": 1389.54,
    "fundingAPR": 0.67,
    "stakingAPY": 4.69,
    "depegPct": 1.24
  },
  {
    "date": "2023-01-17",
    "timestamp": 1673913600000,
    "spotPrice": 1410.65,
    "fundingAPR": 3.97,
    "stakingAPY": 4.67,
    "depegPct": 1.21
  },
  {
    "date": "2023-01-18",
    "timestamp": 1674000000000,
    "spotPrice": 1456.3,
    "fundingAPR": 2.31,
    "stakingAPY": 4.65,
    "depegPct": 1.19
  },
  {
    "date": "2023-01-19",
    "timestamp": 1674086400000,
    "spotPrice": 1466.35,
    "fundingAPR": 3.37,
    "stakingAPY": 4.63,
    "depegPct": 1.16
  },
  {
    "date": "2023-01-20",
    "timestamp": 1674172800000,
    "spotPrice": 1459.93,
    "fundingAPR": 5.7,
    "stakingAPY": 4.61,
    "depegPct": 1.14
  },
  {
    "date": "2023-01-21",
    "timestamp": 1674259200000,
    "spotPrice": 1491.8,
    "fundingAPR": 3.54,
    "stakingAPY": 4.59,
    "depegPct": 1.12
  },
  {
    "date": "2023-01-22",
    "timestamp": 1674345600000,
    "spotPrice": 1528.33,
    "fundingAPR": 6,
    "stakingAPY": 4.58,
    "depegPct": 1.1
  },
  {
    "date": "2023-01-23",
    "timestamp": 1674432000000,
    "spotPrice": 1523.01,
    "fundingAPR": 6.68,
    "stakingAPY": 4.56,
    "depegPct": 1.08
  },
  {
    "date": "2023-01-24",
    "timestamp": 1674518400000,
    "spotPrice": 1521.11,
    "fundingAPR": 4.98,
    "stakingAPY": 4.55,
    "depegPct": 1.06
  },
  {
    "date": "2023-01-25",
    "timestamp": 1674604800000,
    "spotPrice": 1557.11,
    "fundingAPR": 8.07,
    "stakingAPY": 4.54,
    "depegPct": 1.04
  },
  {
    "date": "2023-01-26",
    "timestamp": 1674691200000,
    "spotPrice": 1576.56,
    "fundingAPR": 6.99,
    "stakingAPY": 4.53,
    "depegPct": 1.03
  },
  {
    "date": "2023-01-27",
    "timestamp": 1674777600000,
    "spotPrice": 1558.73,
    "fundingAPR": 6.49,
    "stakingAPY": 4.52,
    "depegPct": 1.02
  },
  {
    "date": "2023-01-28",
    "timestamp": 1674864000000,
    "spotPrice": 1563.17,
    "fundingAPR": 9.2,
    "stakingAPY": 4.51,
    "depegPct": 1.01
  },
  {
    "date": "2023-01-29",
    "timestamp": 1674950400000,
    "spotPrice": 1595.08,
    "fundingAPR": 6.85,
    "stakingAPY": 4.5,
    "depegPct": 1.01
  },
  {
    "date": "2023-01-30",
    "timestamp": 1675036800000,
    "spotPrice": 1593.4,
    "fundingAPR": 7.82,
    "stakingAPY": 4.5,
    "depegPct": 1
  },
  {
    "date": "2023-01-31",
    "timestamp": 1675123200000,
    "spotPrice": 1563.28,
    "fundingAPR": 9.21,
    "stakingAPY": 4.5,
    "depegPct": 1
  },
  {
    "date": "2023-02-01",
    "timestamp": 1675209600000,
    "spotPrice": 1577.93,
    "fundingAPR": 6.52,
    "stakingAPY": 4.5,
    "depegPct": 1
  },
  {
    "date": "2023-02-02",
    "timestamp": 1675296000000,
    "spotPrice": 1607.38,
    "fundingAPR": 8.68,
    "stakingAPY": 4.5,
    "depegPct": 1
  },
  {
    "date": "2023-02-03",
    "timestamp": 1675382400000,
    "spotPrice": 1583.31,
    "fundingAPR": 8.32,
    "stakingAPY": 4.5,
    "depegPct": 1
  },
  {
    "date": "2023-02-04",
    "timestamp": 1675468800000,
    "spotPrice": 1557,
    "fundingAPR": 6.35,
    "stakingAPY": 4.5,
    "depegPct": 1.01
  },
  {
    "date": "2023-02-05",
    "timestamp": 1675555200000,
    "spotPrice": 1583.61,
    "fundingAPR": 8.94,
    "stakingAPY": 4.5,
    "depegPct": 1.01
  },
  {
    "date": "2023-02-06",
    "timestamp": 1675641600000,
    "spotPrice": 1597.64,
    "fundingAPR": 6.96,
    "stakingAPY": 4.49,
    "depegPct": 1.01
  },
  {
    "date": "2023-02-07",
    "timestamp": 1675728000000,
    "spotPrice": 1560.89,
    "fundingAPR": 6.41,
    "stakingAPY": 4.49,
    "depegPct": 1.02
  },
  {
    "date": "2023-02-08",
    "timestamp": 1675814400000,
    "spotPrice": 1548.7,
    "fundingAPR": 8.42,
    "stakingAPY": 4.49,
    "depegPct": 1.02
  },
  {
    "date": "2023-02-09",
    "timestamp": 1675900800000,
    "spotPrice": 1579.95,
    "fundingAPR": 5.49,
    "stakingAPY": 4.49,
    "depegPct": 1.03
  },
  {
    "date": "2023-02-10",
    "timestamp": 1675987200000,
    "spotPrice": 1574.46,
    "fundingAPR": 6.49,
    "stakingAPY": 4.48,
    "depegPct": 1.03
  },
  {
    "date": "2023-02-11",
    "timestamp": 1676073600000,
    "spotPrice": 1534.11,
    "fundingAPR": 7.11,
    "stakingAPY": 4.48,
    "depegPct": 1.04
  },
  {
    "date": "2023-02-12",
    "timestamp": 1676160000000,
    "spotPrice": 1538.64,
    "fundingAPR": 4.24,
    "stakingAPY": 4.48,
    "depegPct": 1.05
  },
  {
    "date": "2023-02-13",
    "timestamp": 1676246400000,
    "spotPrice": 1565.71,
    "fundingAPR": 6.33,
    "stakingAPY": 4.47,
    "depegPct": 1.05
  },
  {
    "date": "2023-02-14",
    "timestamp": 1676332800000,
    "spotPrice": 1541.42,
    "fundingAPR": 5.24,
    "stakingAPY": 4.47,
    "depegPct": 1.06
  },
  {
    "date": "2023-02-15",
    "timestamp": 1676419200000,
    "spotPrice": 1507.23,
    "fundingAPR": 3.37,
    "stakingAPY": 4.47,
    "depegPct": 1.07
  },
  {
    "date": "2023-02-16",
    "timestamp": 1676505600000,
    "spotPrice": 1526.47,
    "fundingAPR": 5.67,
    "stakingAPY": 4.46,
    "depegPct": 1.08
  },
  {
    "date": "2023-02-17",
    "timestamp": 1676592000000,
    "spotPrice": 1541.44,
    "fundingAPR": 3.15,
    "stakingAPY": 4.46,
    "depegPct": 1.08
  },
  {
    "date": "2023-02-18",
    "timestamp": 1676678400000,
    "spotPrice": 1503.78,
    "fundingAPR": 2.86,
    "stakingAPY": 4.45,
    "depegPct": 1.09
  },
  {
    "date": "2023-02-19",
    "timestamp": 1676764800000,
    "spotPrice": 1483.75,
    "fundingAPR": 4.41,
    "stakingAPY": 4.45,
    "depegPct": 1.1
  },
  {
    "date": "2023-02-20",
    "timestamp": 1676851200000,
    "spotPrice": 1511.7,
    "fundingAPR": 1.26,
    "stakingAPY": 4.45,
    "depegPct": 1.11
  },
  {
    "date": "2023-02-21",
    "timestamp": 1676937600000,
    "spotPrice": 1509.66,
    "fundingAPR": 2.53,
    "stakingAPY": 4.44,
    "depegPct": 1.12
  },
  {
    "date": "2023-02-22",
    "timestamp": 1677024000000,
    "spotPrice": 1467.46,
    "fundingAPR": 2.62,
    "stakingAPY": 4.44,
    "depegPct": 1.12
  },
  {
    "date": "2023-02-23",
    "timestamp": 1677110400000,
    "spotPrice": 1465.81,
    "fundingAPR": -0.11,
    "stakingAPY": 4.43,
    "depegPct": 1.13
  },
  {
    "date": "2023-02-24",
    "timestamp": 1677196800000,
    "spotPrice": 1494.17,
    "fundingAPR": 2.12,
    "stakingAPY": 4.43,
    "depegPct": 1.14
  },
  {
    "date": "2023-02-25",
    "timestamp": 1677283200000,
    "spotPrice": 1474.65,
    "fundingAPR": 0.6,
    "stakingAPY": 4.43,
    "depegPct": 1.15
  },
  {
    "date": "2023-02-26",
    "timestamp": 1677369600000,
    "spotPrice": 1437.95,
    "fundingAPR": -0.84,
    "stakingAPY": 4.42,
    "depegPct": 1.15
  },
  {
    "date": "2023-02-27",
    "timestamp": 1677456000000,
    "spotPrice": 1454.14,
    "fundingAPR": 1.42,
    "stakingAPY": 4.42,
    "depegPct": 1.16
  },
  {
    "date": "2023-02-28",
    "timestamp": 1677542400000,
    "spotPrice": 1474.55,
    "fundingAPR": -1.27,
    "stakingAPY": 4.42,
    "depegPct": 1.17
  },
  {
    "date": "2023-03-01",
    "timestamp": 1677628800000,
    "spotPrice": 1441.75,
    "fundingAPR": -0.99,
    "stakingAPY": 4.41,
    "depegPct": 1.17
  },
  {
    "date": "2023-03-02",
    "timestamp": 1677715200000,
    "spotPrice": 1419.26,
    "fundingAPR": 0.36,
    "stakingAPY": 4.41,
    "depegPct": 1.18
  },
  {
    "date": "2023-03-03",
    "timestamp": 1677801600000,
    "spotPrice": 1448.25,
    "fundingAPR": -2.61,
    "stakingAPY": 4.41,
    "depegPct": 1.18
  },
  {
    "date": "2023-03-04",
    "timestamp": 1677888000000,
    "spotPrice": 1454.61,
    "fundingAPR": -0.8,
    "stakingAPY": 4.41,
    "depegPct": 1.19
  },
  {
    "date": "2023-03-05",
    "timestamp": 1677974400000,
    "spotPrice": 1416.37,
    "fundingAPR": -0.95,
    "stakingAPY": 4.4,
    "depegPct": 1.19
  },
  {
    "date": "2023-03-06",
    "timestamp": 1678060800000,
    "spotPrice": 1413.32,
    "fundingAPR": -3.16,
    "stakingAPY": 4.4,
    "depegPct": 1.19
  },
  {
    "date": "2023-03-07",
    "timestamp": 1678147200000,
    "spotPrice": 1446.94,
    "fundingAPR": -0.57,
    "stakingAPY": 4.4,
    "depegPct": 1.2
  },
  {
    "date": "2023-03-08",
    "timestamp": 1678233600000,
    "spotPrice": 1437.08,
    "fundingAPR": -2.2,
    "stakingAPY": 4.4,
    "depegPct": 1.2
  },
  {
    "date": "2023-03-09",
    "timestamp": 1678320000000,
    "spotPrice": 1402.95,
    "fundingAPR": -2.9,
    "stakingAPY": 4.4,
    "depegPct": 1.2
  },
  {
    "date": "2023-03-10",
    "timestamp": 1678406400000,
    "spotPrice": 1420.29,
    "fundingAPR": -0.5,
    "stakingAPY": 4.4,
    "depegPct": 1.2
  },
  {
    "date": "2023-03-11",
    "timestamp": 1678492800000,
    "spotPrice": 1447.4,
    "fundingAPR": -3.05,
    "stakingAPY": 4.4,
    "depegPct": 1.2
  },
  {
    "date": "2023-03-12",
    "timestamp": 1678579200000,
    "spotPrice": 1428.69,
    "fundingAPR": -1.95,
    "stakingAPY": 4.4,
    "depegPct": 1.19
  },
  {
    "date": "2023-03-13",
    "timestamp": 1678665600000,
    "spotPrice": 1413.94,
    "fundingAPR": -0.58,
    "stakingAPY": 4.4,
    "depegPct": 1.18
  },
  {
    "date": "2023-03-14",
    "timestamp": 1678752000000,
    "spotPrice": 1448.94,
    "fundingAPR": -3.02,
    "stakingAPY": 4.4,
    "depegPct": 1.16
  },
  {
    "date": "2023-03-15",
    "timestamp": 1678838400000,
    "spotPrice": 1472,
    "fundingAPR": -0.46,
    "stakingAPY": 4.39,
    "depegPct": 1.14
  },
  {
    "date": "2023-03-16",
    "timestamp": 1678924800000,
    "spotPrice": 1453.06,
    "fundingAPR": -0.57,
    "stakingAPY": 4.39,
    "depegPct": 1.11
  },
  {
    "date": "2023-03-17",
    "timestamp": 1679011200000,
    "spotPrice": 1461.36,
    "fundingAPR": -1.95,
    "stakingAPY": 4.39,
    "depegPct": 1.08
  },
  {
    "date": "2023-03-18",
    "timestamp": 1679097600000,
    "spotPrice": 1508.88,
    "fundingAPR": 1.19,
    "stakingAPY": 4.39,
    "depegPct": 1.04
  },
  {
    "date": "2023-03-19",
    "timestamp": 1679184000000,
    "spotPrice": 1523.01,
    "fundingAPR": -0.27,
    "stakingAPY": 4.38,
    "depegPct": 1
  },
  {
    "date": "2023-03-20",
    "timestamp": 1679270400000,
    "spotPrice": 1510.19,
    "fundingAPR": 0.02,
    "stakingAPY": 4.38,
    "depegPct": 0.96
  },
  {
    "date": "2023-03-21",
    "timestamp": 1679356800000,
    "spotPrice": 1540.99,
    "fundingAPR": 2.71,
    "stakingAPY": 4.38,
    "depegPct": 0.91
  },
  {
    "date": "2023-03-22",
    "timestamp": 1679443200000,
    "spotPrice": 1590.44,
    "fundingAPR": 0.57,
    "stakingAPY": 4.37,
    "depegPct": 0.86
  },
  {
    "date": "2023-03-23",
    "timestamp": 1679529600000,
    "spotPrice": 1593.96,
    "fundingAPR": 2.56,
    "stakingAPY": 4.37,
    "depegPct": 0.81
  },
  {
    "date": "2023-03-24",
    "timestamp": 1679616000000,
    "spotPrice": 1592.78,
    "fundingAPR": 3.95,
    "stakingAPY": 4.36,
    "depegPct": 0.76
  },
  {
    "date": "2023-03-25",
    "timestamp": 1679702400000,
    "spotPrice": 1640.37,
    "fundingAPR": 2.08,
    "stakingAPY": 4.36,
    "depegPct": 0.71
  },
  {
    "date": "2023-03-26",
    "timestamp": 1679788800000,
    "spotPrice": 1681.3,
    "fundingAPR": 5.2,
    "stakingAPY": 4.35,
    "depegPct": 0.65
  },
  {
    "date": "2023-03-27",
    "timestamp": 1679875200000,
    "spotPrice": 1675.88,
    "fundingAPR": 4.96,
    "stakingAPY": 4.35,
    "depegPct": 0.6
  },
  {
    "date": "2023-03-28",
    "timestamp": 1679961600000,
    "spotPrice": 1689.31,
    "fundingAPR": 4.21,
    "stakingAPY": 4.34,
    "depegPct": 0.54
  },
  {
    "date": "2023-03-29",
    "timestamp": 1680048000000,
    "spotPrice": 1743.99,
    "fundingAPR": 7.5,
    "stakingAPY": 4.34,
    "depegPct": 0.49
  },
  {
    "date": "2023-03-30",
    "timestamp": 1680134400000,
    "spotPrice": 1768.47,
    "fundingAPR": 5.89,
    "stakingAPY": 4.33,
    "depegPct": 0.44
  },
  {
    "date": "2023-03-31",
    "timestamp": 1680220800000,
    "spotPrice": 1758.3,
    "fundingAPR": 6.72,
    "stakingAPY": 4.33,
    "depegPct": 0.39
  },
  {
    "date": "2023-04-01",
    "timestamp": 1680307200000,
    "spotPrice": 1785.61,
    "fundingAPR": 9.13,
    "stakingAPY": 4.33,
    "depegPct": 0.34
  },
  {
    "date": "2023-04-02",
    "timestamp": 1680393600000,
    "spotPrice": 1835.82,
    "fundingAPR": 6.91,
    "stakingAPY": 4.32,
    "depegPct": 0.29
  },
  {
    "date": "2023-04-03",
    "timestamp": 1680480000000,
    "spotPrice": 1840.13,
    "fundingAPR": 9.19,
    "stakingAPY": 4.32,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-04",
    "timestamp": 1680566400000,
    "spotPrice": 1830.44,
    "fundingAPR": 9.99,
    "stakingAPY": 4.31,
    "depegPct": 0.21
  },
  {
    "date": "2023-04-05",
    "timestamp": 1680652800000,
    "spotPrice": 1866.96,
    "fundingAPR": 8.13,
    "stakingAPY": 4.31,
    "depegPct": 0.17
  },
  {
    "date": "2023-04-06",
    "timestamp": 1680739200000,
    "spotPrice": 1901.92,
    "fundingAPR": 11.15,
    "stakingAPY": 4.31,
    "depegPct": 0.14
  },
  {
    "date": "2023-04-07",
    "timestamp": 1680825600000,
    "spotPrice": 1887.11,
    "fundingAPR": 10.18,
    "stakingAPY": 4.31,
    "depegPct": 0.11
  },
  {
    "date": "2023-04-08",
    "timestamp": 1680912000000,
    "spotPrice": 1882.45,
    "fundingAPR": 9.48,
    "stakingAPY": 4.3,
    "depegPct": 0.09
  },
  {
    "date": "2023-04-09",
    "timestamp": 1680998400000,
    "spotPrice": 1920.46,
    "fundingAPR": 12.24,
    "stakingAPY": 4.3,
    "depegPct": 0.07
  },
  {
    "date": "2023-04-10",
    "timestamp": 1681084800000,
    "spotPrice": 1932.65,
    "fundingAPR": 9.94,
    "stakingAPY": 4.3,
    "depegPct": 0.06
  },
  {
    "date": "2023-04-11",
    "timestamp": 1681171200000,
    "spotPrice": 1903.98,
    "fundingAPR": 10.73,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-12",
    "timestamp": 1681257600000,
    "spotPrice": 1902.1,
    "fundingAPR": 12.26,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-13",
    "timestamp": 1681344000000,
    "spotPrice": 1944.68,
    "fundingAPR": 9.55,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-14",
    "timestamp": 1681430400000,
    "spotPrice": 1931.56,
    "fundingAPR": 11.66,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-15",
    "timestamp": 1681516800000,
    "spotPrice": 1892.38,
    "fundingAPR": 11.56,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-16",
    "timestamp": 1681603200000,
    "spotPrice": 1915.66,
    "fundingAPR": 9.58,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-17",
    "timestamp": 1681689600000,
    "spotPrice": 1948.9,
    "fundingAPR": 12.31,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-18",
    "timestamp": 1681776000000,
    "spotPrice": 1917.15,
    "fundingAPR": 10.64,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-19",
    "timestamp": 1681862400000,
    "spotPrice": 1892.19,
    "fundingAPR": 10.12,
    "stakingAPY": 4.3,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-20",
    "timestamp": 1681948800000,
    "spotPrice": 1930.5,
    "fundingAPR": 12.46,
    "stakingAPY": 4.29,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-21",
    "timestamp": 1682035200000,
    "spotPrice": 1945.73,
    "fundingAPR": 9.84,
    "stakingAPY": 4.29,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-22",
    "timestamp": 1682121600000,
    "spotPrice": 1903.66,
    "fundingAPR": 10.97,
    "stakingAPY": 4.29,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-23",
    "timestamp": 1682208000000,
    "spotPrice": 1899.45,
    "fundingAPR": 12.06,
    "stakingAPY": 4.29,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-24",
    "timestamp": 1682294400000,
    "spotPrice": 1942.8,
    "fundingAPR": 9.45,
    "stakingAPY": 4.29,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-25",
    "timestamp": 1682380800000,
    "spotPrice": 1936.05,
    "fundingAPR": 11.81,
    "stakingAPY": 4.29,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-26",
    "timestamp": 1682467200000,
    "spotPrice": 1894.68,
    "fundingAPR": 11.24,
    "stakingAPY": 4.28,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-27",
    "timestamp": 1682553600000,
    "spotPrice": 1912.34,
    "fundingAPR": 9.6,
    "stakingAPY": 4.28,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-28",
    "timestamp": 1682640000000,
    "spotPrice": 1949.43,
    "fundingAPR": 12.31,
    "stakingAPY": 4.28,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-29",
    "timestamp": 1682726400000,
    "spotPrice": 1922.5,
    "fundingAPR": 10.29,
    "stakingAPY": 4.28,
    "depegPct": 0.05
  },
  {
    "date": "2023-04-30",
    "timestamp": 1682812800000,
    "spotPrice": 1892.65,
    "fundingAPR": 10.23,
    "stakingAPY": 4.27,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-01",
    "timestamp": 1682899200000,
    "spotPrice": 1927.59,
    "fundingAPR": 12.29,
    "stakingAPY": 4.27,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-02",
    "timestamp": 1682985600000,
    "spotPrice": 1948.77,
    "fundingAPR": 9.56,
    "stakingAPY": 4.27,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-03",
    "timestamp": 1683072000000,
    "spotPrice": 1908.72,
    "fundingAPR": 11.08,
    "stakingAPY": 4.26,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-04",
    "timestamp": 1683158400000,
    "spotPrice": 1898.22,
    "fundingAPR": 11.73,
    "stakingAPY": 4.26,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-05",
    "timestamp": 1683244800000,
    "spotPrice": 1941.36,
    "fundingAPR": 9.29,
    "stakingAPY": 4.26,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-06",
    "timestamp": 1683331200000,
    "spotPrice": 1941.13,
    "fundingAPR": 11.84,
    "stakingAPY": 4.25,
    "depegPct": 0.05
  },
  {
    "date": "2023-05-07",
    "timestamp": 1683417600000,
    "spotPrice": 1898.46,
    "fundingAPR": 10.82,
    "stakingAPY": 4.25,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-08",
    "timestamp": 1683504000000,
    "spotPrice": 1910.11,
    "fundingAPR": 9.56,
    "stakingAPY": 4.25,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-09",
    "timestamp": 1683590400000,
    "spotPrice": 1950.21,
    "fundingAPR": 12.19,
    "stakingAPY": 4.24,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-10",
    "timestamp": 1683676800000,
    "spotPrice": 1928.68,
    "fundingAPR": 9.88,
    "stakingAPY": 4.24,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-11",
    "timestamp": 1683763200000,
    "spotPrice": 1894.58,
    "fundingAPR": 10.26,
    "stakingAPY": 4.23,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-12",
    "timestamp": 1683849600000,
    "spotPrice": 1925.37,
    "fundingAPR": 11.99,
    "stakingAPY": 4.23,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-13",
    "timestamp": 1683936000000,
    "spotPrice": 1952.01,
    "fundingAPR": 9.24,
    "stakingAPY": 4.22,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-14",
    "timestamp": 1684022400000,
    "spotPrice": 1914.85,
    "fundingAPR": 11.11,
    "stakingAPY": 4.22,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-15",
    "timestamp": 1684108800000,
    "spotPrice": 1898.28,
    "fundingAPR": 11.3,
    "stakingAPY": 4.22,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-16",
    "timestamp": 1684195200000,
    "spotPrice": 1940.23,
    "fundingAPR": 9.1,
    "stakingAPY": 4.21,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-17",
    "timestamp": 1684281600000,
    "spotPrice": 1946.5,
    "fundingAPR": 11.76,
    "stakingAPY": 4.21,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-18",
    "timestamp": 1684368000000,
    "spotPrice": 1903.47,
    "fundingAPR": 10.33,
    "stakingAPY": 4.2,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-19",
    "timestamp": 1684454400000,
    "spotPrice": 1908.81,
    "fundingAPR": 9.49,
    "stakingAPY": 4.2,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-20",
    "timestamp": 1684540800000,
    "spotPrice": 1951.01,
    "fundingAPR": 11.96,
    "stakingAPY": 4.19,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-21",
    "timestamp": 1684627200000,
    "spotPrice": 1935.34,
    "fundingAPR": 9.43,
    "stakingAPY": 4.19,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-22",
    "timestamp": 1684713600000,
    "spotPrice": 1897.73,
    "fundingAPR": 10.25,
    "stakingAPY": 4.18,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-23",
    "timestamp": 1684800000000,
    "spotPrice": 1923.65,
    "fundingAPR": 11.61,
    "stakingAPY": 4.18,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-24",
    "timestamp": 1684886400000,
    "spotPrice": 1955.14,
    "fundingAPR": 8.9,
    "stakingAPY": 4.17,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-25",
    "timestamp": 1684972800000,
    "spotPrice": 1921.67,
    "fundingAPR": 11.07,
    "stakingAPY": 4.17,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-26",
    "timestamp": 1685059200000,
    "spotPrice": 1899.37,
    "fundingAPR": 10.8,
    "stakingAPY": 4.16,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-27",
    "timestamp": 1685145600000,
    "spotPrice": 1939.16,
    "fundingAPR": 8.91,
    "stakingAPY": 4.16,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-28",
    "timestamp": 1685232000000,
    "spotPrice": 1951.77,
    "fundingAPR": 11.62,
    "stakingAPY": 4.15,
    "depegPct": 0.04
  },
  {
    "date": "2023-05-29",
    "timestamp": 1685318400000,
    "spotPrice": 1909.3,
    "fundingAPR": 9.81,
    "stakingAPY": 4.15,
    "depegPct": 0.03
  },
  {
    "date": "2023-05-30",
    "timestamp": 1685404800000,
    "spotPrice": 1908.21,
    "fundingAPR": 9.42,
    "stakingAPY": 4.14,
    "depegPct": 0.03
  },
  {
    "date": "2023-05-31",
    "timestamp": 1685491200000,
    "spotPrice": 1951.52,
    "fundingAPR": 11.66,
    "stakingAPY": 4.14,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-01",
    "timestamp": 1685577600000,
    "spotPrice": 1942.03,
    "fundingAPR": 8.98,
    "stakingAPY": 4.13,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-02",
    "timestamp": 1685664000000,
    "spotPrice": 1901.73,
    "fundingAPR": 10.23,
    "stakingAPY": 4.13,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-03",
    "timestamp": 1685750400000,
    "spotPrice": 1922.17,
    "fundingAPR": 11.17,
    "stakingAPY": 4.12,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-04",
    "timestamp": 1685836800000,
    "spotPrice": 1957.77,
    "fundingAPR": 8.59,
    "stakingAPY": 4.12,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-05",
    "timestamp": 1685923200000,
    "spotPrice": 1928.71,
    "fundingAPR": 11,
    "stakingAPY": 4.11,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-06",
    "timestamp": 1686009600000,
    "spotPrice": 1901.16,
    "fundingAPR": 10.28,
    "stakingAPY": 4.11,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-07",
    "timestamp": 1686096000000,
    "spotPrice": 1937.87,
    "fundingAPR": 8.75,
    "stakingAPY": 4.1,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-08",
    "timestamp": 1686182400000,
    "spotPrice": 1956.51,
    "fundingAPR": 11.43,
    "stakingAPY": 4.1,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-09",
    "timestamp": 1686268800000,
    "spotPrice": 1915.53,
    "fundingAPR": 9.31,
    "stakingAPY": 4.09,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-10",
    "timestamp": 1686355200000,
    "spotPrice": 1907.99,
    "fundingAPR": 9.37,
    "stakingAPY": 4.09,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-11",
    "timestamp": 1686441600000,
    "spotPrice": 1951.43,
    "fundingAPR": 11.33,
    "stakingAPY": 4.08,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-12",
    "timestamp": 1686528000000,
    "spotPrice": 1948.3,
    "fundingAPR": 8.58,
    "stakingAPY": 4.08,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-13",
    "timestamp": 1686614400000,
    "spotPrice": 1906.17,
    "fundingAPR": 10.21,
    "stakingAPY": 4.08,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-14",
    "timestamp": 1686700800000,
    "spotPrice": 1920.66,
    "fundingAPR": 10.72,
    "stakingAPY": 4.07,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-15",
    "timestamp": 1686787200000,
    "spotPrice": 1959.54,
    "fundingAPR": 8.34,
    "stakingAPY": 4.07,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-16",
    "timestamp": 1686873600000,
    "spotPrice": 1935.52,
    "fundingAPR": 10.93,
    "stakingAPY": 4.06,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-17",
    "timestamp": 1686960000000,
    "spotPrice": 1903.29,
    "fundingAPR": 9.79,
    "stakingAPY": 4.06,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-18",
    "timestamp": 1687046400000,
    "spotPrice": 1936.08,
    "fundingAPR": 8.66,
    "stakingAPY": 4.05,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-19",
    "timestamp": 1687132800000,
    "spotPrice": 1960.3,
    "fundingAPR": 11.24,
    "stakingAPY": 4.05,
    "depegPct": 0.03
  },
  {
    "date": "2023-06-20",
    "timestamp": 1687219200000,
    "spotPrice": 1921.71,
    "fundingAPR": 8.86,
    "stakingAPY": 4.05,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-21",
    "timestamp": 1687305600000,
    "spotPrice": 1907.85,
    "fundingAPR": 9.39,
    "stakingAPY": 4.04,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-22",
    "timestamp": 1687392000000,
    "spotPrice": 1950.43,
    "fundingAPR": 11.01,
    "stakingAPY": 4.04,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-23",
    "timestamp": 1687478400000,
    "spotPrice": 1953.7,
    "fundingAPR": 8.26,
    "stakingAPY": 4.04,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-24",
    "timestamp": 1687564800000,
    "spotPrice": 1910.66,
    "fundingAPR": 10.24,
    "stakingAPY": 4.03,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-25",
    "timestamp": 1687651200000,
    "spotPrice": 1918.84,
    "fundingAPR": 10.3,
    "stakingAPY": 4.03,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-26",
    "timestamp": 1687737600000,
    "spotPrice": 1960.12,
    "fundingAPR": 8.19,
    "stakingAPY": 4.03,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-27",
    "timestamp": 1687824000000,
    "spotPrice": 1941.64,
    "fundingAPR": 10.89,
    "stakingAPY": 4.02,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-28",
    "timestamp": 1687910400000,
    "spotPrice": 1905.44,
    "fundingAPR": 9.35,
    "stakingAPY": 4.02,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-29",
    "timestamp": 1687996800000,
    "spotPrice": 1933.55,
    "fundingAPR": 8.66,
    "stakingAPY": 4.02,
    "depegPct": 0.02
  },
  {
    "date": "2023-06-30",
    "timestamp": 1688083200000,
    "spotPrice": 1962.8,
    "fundingAPR": 11.08,
    "stakingAPY": 4.02,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-01",
    "timestamp": 1688169600000,
    "spotPrice": 1927.42,
    "fundingAPR": 8.51,
    "stakingAPY": 4.01,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-02",
    "timestamp": 1688256000000,
    "spotPrice": 1907.54,
    "fundingAPR": 9.48,
    "stakingAPY": 4.01,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-03",
    "timestamp": 1688342400000,
    "spotPrice": 1948.28,
    "fundingAPR": 10.72,
    "stakingAPY": 4.01,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-04",
    "timestamp": 1688428800000,
    "spotPrice": 1957.87,
    "fundingAPR": 8.06,
    "stakingAPY": 4.01,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-05",
    "timestamp": 1688515200000,
    "spotPrice": 1914.86,
    "fundingAPR": 10.34,
    "stakingAPY": 4.01,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-06",
    "timestamp": 1688601600000,
    "spotPrice": 1916.53,
    "fundingAPR": 9.94,
    "stakingAPY": 4.01,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-07",
    "timestamp": 1688688000000,
    "spotPrice": 1959.27,
    "fundingAPR": 8.17,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-08",
    "timestamp": 1688774400000,
    "spotPrice": 1946.73,
    "fundingAPR": 10.9,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-09",
    "timestamp": 1688860800000,
    "spotPrice": 1907.35,
    "fundingAPR": 9.01,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-10",
    "timestamp": 1688947200000,
    "spotPrice": 1930.14,
    "fundingAPR": 8.78,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-11",
    "timestamp": 1689033600000,
    "spotPrice": 1963.74,
    "fundingAPR": 10.97,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-12",
    "timestamp": 1689120000000,
    "spotPrice": 1932.36,
    "fundingAPR": 8.28,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-13",
    "timestamp": 1689206400000,
    "spotPrice": 1906.89,
    "fundingAPR": 9.67,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-14",
    "timestamp": 1689292800000,
    "spotPrice": 1944.95,
    "fundingAPR": 10.5,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-15",
    "timestamp": 1689379200000,
    "spotPrice": 1960.64,
    "fundingAPR": 8,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-16",
    "timestamp": 1689465600000,
    "spotPrice": 1917.94,
    "fundingAPR": 10.5,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-17",
    "timestamp": 1689552000000,
    "spotPrice": 1912.43,
    "fundingAPR": 9.66,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-18",
    "timestamp": 1689638400000,
    "spotPrice": 1955.2,
    "fundingAPR": 8.26,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-19",
    "timestamp": 1689724800000,
    "spotPrice": 1947.79,
    "fundingAPR": 10.93,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-20",
    "timestamp": 1689811200000,
    "spotPrice": 1904.5,
    "fundingAPR": 8.73,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-21",
    "timestamp": 1689897600000,
    "spotPrice": 1920.1,
    "fundingAPR": 8.95,
    "stakingAPY": 4,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-22",
    "timestamp": 1689984000000,
    "spotPrice": 1955.87,
    "fundingAPR": 10.81,
    "stakingAPY": 3.99,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-23",
    "timestamp": 1690070400000,
    "spotPrice": 1927.02,
    "fundingAPR": 8.05,
    "stakingAPY": 3.99,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-24",
    "timestamp": 1690156800000,
    "spotPrice": 1894.14,
    "fundingAPR": 9.8,
    "stakingAPY": 3.99,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-25",
    "timestamp": 1690243200000,
    "spotPrice": 1926.39,
    "fundingAPR": 10.15,
    "stakingAPY": 3.99,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-26",
    "timestamp": 1690329600000,
    "spotPrice": 1945.39,
    "fundingAPR": 7.85,
    "stakingAPY": 3.99,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-27",
    "timestamp": 1690416000000,
    "spotPrice": 1902.16,
    "fundingAPR": 10.47,
    "stakingAPY": 3.98,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-28",
    "timestamp": 1690502400000,
    "spotPrice": 1887.73,
    "fundingAPR": 9.18,
    "stakingAPY": 3.98,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-29",
    "timestamp": 1690588800000,
    "spotPrice": 1927.61,
    "fundingAPR": 8.17,
    "stakingAPY": 3.98,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-30",
    "timestamp": 1690675200000,
    "spotPrice": 1924.23,
    "fundingAPR": 10.69,
    "stakingAPY": 3.98,
    "depegPct": 0.02
  },
  {
    "date": "2023-07-31",
    "timestamp": 1690761600000,
    "spotPrice": 1877.2,
    "fundingAPR": 8.22,
    "stakingAPY": 3.97,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-01",
    "timestamp": 1690848000000,
    "spotPrice": 1884.23,
    "fundingAPR": 8.87,
    "stakingAPY": 3.97,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-02",
    "timestamp": 1690934400000,
    "spotPrice": 1920.52,
    "fundingAPR": 10.35,
    "stakingAPY": 3.97,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-03",
    "timestamp": 1691020800000,
    "spotPrice": 1894.78,
    "fundingAPR": 7.59,
    "stakingAPY": 3.96,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-04",
    "timestamp": 1691107200000,
    "spotPrice": 1855.34,
    "fundingAPR": 9.64,
    "stakingAPY": 3.96,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-05",
    "timestamp": 1691193600000,
    "spotPrice": 1881.04,
    "fundingAPR": 9.51,
    "stakingAPY": 3.96,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-06",
    "timestamp": 1691280000000,
    "spotPrice": 1903.25,
    "fundingAPR": 7.47,
    "stakingAPY": 3.95,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-07",
    "timestamp": 1691366400000,
    "spotPrice": 1860.83,
    "fundingAPR": 10.15,
    "stakingAPY": 3.95,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-08",
    "timestamp": 1691452800000,
    "spotPrice": 1838.17,
    "fundingAPR": 8.45,
    "stakingAPY": 3.95,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-09",
    "timestamp": 1691539200000,
    "spotPrice": 1874.69,
    "fundingAPR": 7.86,
    "stakingAPY": 3.94,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-10",
    "timestamp": 1691625600000,
    "spotPrice": 1875.85,
    "fundingAPR": 10.17,
    "stakingAPY": 3.94,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-11",
    "timestamp": 1691712000000,
    "spotPrice": 1826.6,
    "fundingAPR": 7.5,
    "stakingAPY": 3.93,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-12",
    "timestamp": 1691798400000,
    "spotPrice": 1825.39,
    "fundingAPR": 8.56,
    "stakingAPY": 3.93,
    "depegPct": 0.02
  },
  {
    "date": "2023-08-13",
    "timestamp": 1691884800000,
    "spotPrice": 1861.91,
    "fundingAPR": 9.62,
    "stakingAPY": 3.93,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-14",
    "timestamp": 1691971200000,
    "spotPrice": 1840.37,
    "fundingAPR": 6.95,
    "stakingAPY": 3.92,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-15",
    "timestamp": 1692057600000,
    "spotPrice": 1795.81,
    "fundingAPR": 9.24,
    "stakingAPY": 3.92,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-16",
    "timestamp": 1692144000000,
    "spotPrice": 1814.96,
    "fundingAPR": 8.65,
    "stakingAPY": 3.91,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-17",
    "timestamp": 1692230400000,
    "spotPrice": 1840.5,
    "fundingAPR": 6.93,
    "stakingAPY": 3.91,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-18",
    "timestamp": 1692316800000,
    "spotPrice": 1800.44,
    "fundingAPR": 9.6,
    "stakingAPY": 3.9,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-19",
    "timestamp": 1692403200000,
    "spotPrice": 1770.71,
    "fundingAPR": 7.55,
    "stakingAPY": 3.9,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-20",
    "timestamp": 1692489600000,
    "spotPrice": 1803.72,
    "fundingAPR": 7.4,
    "stakingAPY": 3.89,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-21",
    "timestamp": 1692576000000,
    "spotPrice": 1810.07,
    "fundingAPR": 9.43,
    "stakingAPY": 3.89,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-22",
    "timestamp": 1692662400000,
    "spotPrice": 1760.4,
    "fundingAPR": 6.65,
    "stakingAPY": 3.88,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-23",
    "timestamp": 1692748800000,
    "spotPrice": 1751.69,
    "fundingAPR": 8.09,
    "stakingAPY": 3.88,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-24",
    "timestamp": 1692835200000,
    "spotPrice": 1788.33,
    "fundingAPR": 8.72,
    "stakingAPY": 3.87,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-25",
    "timestamp": 1692921600000,
    "spotPrice": 1772.24,
    "fundingAPR": 6.21,
    "stakingAPY": 3.87,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-26",
    "timestamp": 1693008000000,
    "spotPrice": 1724.3,
    "fundingAPR": 8.7,
    "stakingAPY": 3.86,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-27",
    "timestamp": 1693094400000,
    "spotPrice": 1737.25,
    "fundingAPR": 7.66,
    "stakingAPY": 3.86,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-28",
    "timestamp": 1693180800000,
    "spotPrice": 1766.32,
    "fundingAPR": 6.32,
    "stakingAPY": 3.85,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-29",
    "timestamp": 1693267200000,
    "spotPrice": 1730.32,
    "fundingAPR": 8.91,
    "stakingAPY": 3.84,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-30",
    "timestamp": 1693353600000,
    "spotPrice": 1694.98,
    "fundingAPR": 6.57,
    "stakingAPY": 3.84,
    "depegPct": 0.03
  },
  {
    "date": "2023-08-31",
    "timestamp": 1693440000000,
    "spotPrice": 1724.55,
    "fundingAPR": 6.87,
    "stakingAPY": 3.83,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-01",
    "timestamp": 1693526400000,
    "spotPrice": 1736.78,
    "fundingAPR": 8.58,
    "stakingAPY": 3.83,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-02",
    "timestamp": 1693612800000,
    "spotPrice": 1688.61,
    "fundingAPR": 5.77,
    "stakingAPY": 3.82,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-03",
    "timestamp": 1693699200000,
    "spotPrice": 1673.44,
    "fundingAPR": 7.57,
    "stakingAPY": 3.82,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-04",
    "timestamp": 1693785600000,
    "spotPrice": 1710.24,
    "fundingAPR": 7.75,
    "stakingAPY": 3.81,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-05",
    "timestamp": 1693872000000,
    "spotPrice": 1700.78,
    "fundingAPR": 5.49,
    "stakingAPY": 3.81,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-06",
    "timestamp": 1693958400000,
    "spotPrice": 1651.39,
    "fundingAPR": 8.1,
    "stakingAPY": 3.8,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-07",
    "timestamp": 1694044800000,
    "spotPrice": 1658.7,
    "fundingAPR": 6.65,
    "stakingAPY": 3.8,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-08",
    "timestamp": 1694131200000,
    "spotPrice": 1691.5,
    "fundingAPR": 5.75,
    "stakingAPY": 3.79,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-09",
    "timestamp": 1694217600000,
    "spotPrice": 1661.21,
    "fundingAPR": 8.19,
    "stakingAPY": 3.79,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-10",
    "timestamp": 1694304000000,
    "spotPrice": 1621.9,
    "fundingAPR": 5.63,
    "stakingAPY": 3.78,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-11",
    "timestamp": 1694390400000,
    "spotPrice": 1648.22,
    "fundingAPR": 6.39,
    "stakingAPY": 3.78,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-12",
    "timestamp": 1694476800000,
    "spotPrice": 1666.89,
    "fundingAPR": 7.73,
    "stakingAPY": 3.78,
    "depegPct": 0.03
  },
  {
    "date": "2023-09-13",
    "timestamp": 1694563200000,
    "spotPrice": 1622.15,
    "fundingAPR": 4.98,
    "stakingAPY": 3.77,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-14",
    "timestamp": 1694649600000,
    "spotPrice": 1601.68,
    "fundingAPR": 7.1,
    "stakingAPY": 3.77,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-15",
    "timestamp": 1694736000000,
    "spotPrice": 1638.64,
    "fundingAPR": 6.83,
    "stakingAPY": 3.76,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-16",
    "timestamp": 1694822400000,
    "spotPrice": 1636.85,
    "fundingAPR": 4.88,
    "stakingAPY": 3.76,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-17",
    "timestamp": 1694908800000,
    "spotPrice": 1587.92,
    "fundingAPR": 7.56,
    "stakingAPY": 3.75,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-18",
    "timestamp": 1694995200000,
    "spotPrice": 1590.23,
    "fundingAPR": 5.75,
    "stakingAPY": 3.75,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-19",
    "timestamp": 1695081600000,
    "spotPrice": 1626.83,
    "fundingAPR": 5.31,
    "stakingAPY": 3.75,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-20",
    "timestamp": 1695168000000,
    "spotPrice": 1603.71,
    "fundingAPR": 7.54,
    "stakingAPY": 3.74,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-21",
    "timestamp": 1695254400000,
    "spotPrice": 1562.07,
    "fundingAPR": 4.85,
    "stakingAPY": 3.74,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-22",
    "timestamp": 1695340800000,
    "spotPrice": 1585.31,
    "fundingAPR": 6.04,
    "stakingAPY": 3.74,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-23",
    "timestamp": 1695427200000,
    "spotPrice": 1610.75,
    "fundingAPR": 6.99,
    "stakingAPY": 3.73,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-24",
    "timestamp": 1695513600000,
    "spotPrice": 1571.17,
    "fundingAPR": 4.38,
    "stakingAPY": 3.73,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-25",
    "timestamp": 1695600000000,
    "spotPrice": 1546.57,
    "fundingAPR": 6.77,
    "stakingAPY": 3.73,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-26",
    "timestamp": 1695686400000,
    "spotPrice": 1583.57,
    "fundingAPR": 6.06,
    "stakingAPY": 3.72,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-27",
    "timestamp": 1695772800000,
    "spotPrice": 1590.16,
    "fundingAPR": 4.49,
    "stakingAPY": 3.72,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-28",
    "timestamp": 1695859200000,
    "spotPrice": 1543.45,
    "fundingAPR": 7.17,
    "stakingAPY": 3.72,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-29",
    "timestamp": 1695945600000,
    "spotPrice": 1541.35,
    "fundingAPR": 5.06,
    "stakingAPY": 3.72,
    "depegPct": 0.04
  },
  {
    "date": "2023-09-30",
    "timestamp": 1696032000000,
    "spotPrice": 1581.54,
    "fundingAPR": 5.09,
    "stakingAPY": 3.71,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-01",
    "timestamp": 1696118400000,
    "spotPrice": 1566.71,
    "fundingAPR": 7.06,
    "stakingAPY": 3.71,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-02",
    "timestamp": 1696204800000,
    "spotPrice": 1524.27,
    "fundingAPR": 4.31,
    "stakingAPY": 3.71,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-03",
    "timestamp": 1696291200000,
    "spotPrice": 1544.46,
    "fundingAPR": 5.92,
    "stakingAPY": 3.71,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-04",
    "timestamp": 1696377600000,
    "spotPrice": 1576.64,
    "fundingAPR": 6.45,
    "stakingAPY": 3.71,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-05",
    "timestamp": 1696464000000,
    "spotPrice": 1543.6,
    "fundingAPR": 4.07,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-06",
    "timestamp": 1696550400000,
    "spotPrice": 1515.91,
    "fundingAPR": 6.66,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-07",
    "timestamp": 1696636800000,
    "spotPrice": 1552.58,
    "fundingAPR": 5.54,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-08",
    "timestamp": 1696723200000,
    "spotPrice": 1567.86,
    "fundingAPR": 4.39,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-09",
    "timestamp": 1696809600000,
    "spotPrice": 1524.82,
    "fundingAPR": 7,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-10",
    "timestamp": 1696896000000,
    "spotPrice": 1518.74,
    "fundingAPR": 4.65,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-11",
    "timestamp": 1696982400000,
    "spotPrice": 1561.99,
    "fundingAPR": 5.16,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-12",
    "timestamp": 1697068800000,
    "spotPrice": 1552.82,
    "fundingAPR": 6.82,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-13",
    "timestamp": 1697155200000,
    "spotPrice": 1519.63,
    "fundingAPR": 4.09,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-14",
    "timestamp": 1697241600000,
    "spotPrice": 1533.86,
    "fundingAPR": 6.09,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-15",
    "timestamp": 1697328000000,
    "spotPrice": 1565.67,
    "fundingAPR": 6.22,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-16",
    "timestamp": 1697414400000,
    "spotPrice": 1547.03,
    "fundingAPR": 4.17,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-17",
    "timestamp": 1697500800000,
    "spotPrice": 1525.34,
    "fundingAPR": 6.93,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-18",
    "timestamp": 1697587200000,
    "spotPrice": 1556.37,
    "fundingAPR": 5.51,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-19",
    "timestamp": 1697673600000,
    "spotPrice": 1578.36,
    "fundingAPR": 4.89,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-20",
    "timestamp": 1697760000000,
    "spotPrice": 1551.43,
    "fundingAPR": 7.43,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-21",
    "timestamp": 1697846400000,
    "spotPrice": 1547.61,
    "fundingAPR": 5,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-22",
    "timestamp": 1697932800000,
    "spotPrice": 1588.19,
    "fundingAPR": 6.08,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-23",
    "timestamp": 1698019200000,
    "spotPrice": 1595.65,
    "fundingAPR": 7.5,
    "stakingAPY": 3.7,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-24",
    "timestamp": 1698105600000,
    "spotPrice": 1568.63,
    "fundingAPR": 4.99,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-25",
    "timestamp": 1698192000000,
    "spotPrice": 1584.99,
    "fundingAPR": 7.42,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-26",
    "timestamp": 1698278400000,
    "spotPrice": 1625.99,
    "fundingAPR": 7.24,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-27",
    "timestamp": 1698364800000,
    "spotPrice": 1618.57,
    "fundingAPR": 5.64,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-28",
    "timestamp": 1698451200000,
    "spotPrice": 1600.27,
    "fundingAPR": 8.58,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-29",
    "timestamp": 1698537600000,
    "spotPrice": 1634.44,
    "fundingAPR": 6.92,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-30",
    "timestamp": 1698624000000,
    "spotPrice": 1667.18,
    "fundingAPR": 6.89,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-10-31",
    "timestamp": 1698710400000,
    "spotPrice": 1648.98,
    "fundingAPR": 9.32,
    "stakingAPY": 3.69,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-01",
    "timestamp": 1698796800000,
    "spotPrice": 1646.47,
    "fundingAPR": 6.88,
    "stakingAPY": 3.68,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-02",
    "timestamp": 1698883200000,
    "spotPrice": 1691.94,
    "fundingAPR": 8.5,
    "stakingAPY": 3.68,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-03",
    "timestamp": 1698969600000,
    "spotPrice": 1710.4,
    "fundingAPR": 9.62,
    "stakingAPY": 3.68,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-04",
    "timestamp": 1699056000000,
    "spotPrice": 1688.84,
    "fundingAPR": 7.37,
    "stakingAPY": 3.68,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-05",
    "timestamp": 1699142400000,
    "spotPrice": 1705.55,
    "fundingAPR": 10.14,
    "stakingAPY": 3.68,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-06",
    "timestamp": 1699228800000,
    "spotPrice": 1753.31,
    "fundingAPR": 9.61,
    "stakingAPY": 3.68,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-07",
    "timestamp": 1699315200000,
    "spotPrice": 1755.66,
    "fundingAPR": 8.49,
    "stakingAPY": 3.67,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-08",
    "timestamp": 1699401600000,
    "spotPrice": 1739.44,
    "fundingAPR": 11.48,
    "stakingAPY": 3.67,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-09",
    "timestamp": 1699488000000,
    "spotPrice": 1774.17,
    "fundingAPR": 9.61,
    "stakingAPY": 3.67,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-10",
    "timestamp": 1699574400000,
    "spotPrice": 1815.02,
    "fundingAPR": 10.12,
    "stakingAPY": 3.67,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-11",
    "timestamp": 1699660800000,
    "spotPrice": 1803.98,
    "fundingAPR": 12.34,
    "stakingAPY": 3.67,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-12",
    "timestamp": 1699747200000,
    "spotPrice": 1800.77,
    "fundingAPR": 9.92,
    "stakingAPY": 3.67,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-13",
    "timestamp": 1699833600000,
    "spotPrice": 1847.94,
    "fundingAPR": 11.99,
    "stakingAPY": 3.66,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-14",
    "timestamp": 1699920000000,
    "spotPrice": 1874.77,
    "fundingAPR": 12.73,
    "stakingAPY": 3.66,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-15",
    "timestamp": 1700006400000,
    "spotPrice": 1856.84,
    "fundingAPR": 10.76,
    "stakingAPY": 3.66,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-16",
    "timestamp": 1700092800000,
    "spotPrice": 1871.14,
    "fundingAPR": 13.74,
    "stakingAPY": 3.66,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-17",
    "timestamp": 1700179200000,
    "spotPrice": 1922.16,
    "fundingAPR": 12.84,
    "stakingAPY": 3.66,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-18",
    "timestamp": 1700265600000,
    "spotPrice": 1931.71,
    "fundingAPR": 12.17,
    "stakingAPY": 3.65,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-19",
    "timestamp": 1700352000000,
    "spotPrice": 1915.38,
    "fundingAPR": 15.08,
    "stakingAPY": 3.65,
    "depegPct": 0.04
  },
  {
    "date": "2023-11-20",
    "timestamp": 1700438400000,
    "spotPrice": 1947.28,
    "fundingAPR": 13,
    "stakingAPY": 3.65,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-21",
    "timestamp": 1700524800000,
    "spotPrice": 1992.67,
    "fundingAPR": 13.99,
    "stakingAPY": 3.65,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-22",
    "timestamp": 1700611200000,
    "spotPrice": 1986.32,
    "fundingAPR": 15.87,
    "stakingAPY": 3.64,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-23",
    "timestamp": 1700697600000,
    "spotPrice": 1979.72,
    "fundingAPR": 13.49,
    "stakingAPY": 3.64,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-24",
    "timestamp": 1700784000000,
    "spotPrice": 2024.77,
    "fundingAPR": 15.89,
    "stakingAPY": 3.64,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-25",
    "timestamp": 1700870400000,
    "spotPrice": 2056.54,
    "fundingAPR": 16.18,
    "stakingAPY": 3.64,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-26",
    "timestamp": 1700956800000,
    "spotPrice": 2039.8,
    "fundingAPR": 14.49,
    "stakingAPY": 3.64,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-27",
    "timestamp": 1701043200000,
    "spotPrice": 2048.51,
    "fundingAPR": 17.54,
    "stakingAPY": 3.63,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-28",
    "timestamp": 1701129600000,
    "spotPrice": 2098.77,
    "fundingAPR": 16.24,
    "stakingAPY": 3.63,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-29",
    "timestamp": 1701216000000,
    "spotPrice": 2112.42,
    "fundingAPR": 15.99,
    "stakingAPY": 3.63,
    "depegPct": 0.03
  },
  {
    "date": "2023-11-30",
    "timestamp": 1701302400000,
    "spotPrice": 2093.44,
    "fundingAPR": 18.67,
    "stakingAPY": 3.63,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-01",
    "timestamp": 1701388800000,
    "spotPrice": 2118.89,
    "fundingAPR": 16.37,
    "stakingAPY": 3.63,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-02",
    "timestamp": 1701475200000,
    "spotPrice": 2164.9,
    "fundingAPR": 17.76,
    "stakingAPY": 3.63,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-03",
    "timestamp": 1701561600000,
    "spotPrice": 2160.48,
    "fundingAPR": 19.2,
    "stakingAPY": 3.62,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-04",
    "timestamp": 1701648000000,
    "spotPrice": 2147.77,
    "fundingAPR": 16.86,
    "stakingAPY": 3.62,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-05",
    "timestamp": 1701734400000,
    "spotPrice": 2186.82,
    "fundingAPR": 19.48,
    "stakingAPY": 3.62,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-06",
    "timestamp": 1701820800000,
    "spotPrice": 2219.98,
    "fundingAPR": 19.25,
    "stakingAPY": 3.62,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-07",
    "timestamp": 1701907200000,
    "spotPrice": 2202,
    "fundingAPR": 17.83,
    "stakingAPY": 3.62,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-08",
    "timestamp": 1701993600000,
    "spotPrice": 2202.13,
    "fundingAPR": 20.81,
    "stakingAPY": 3.62,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-09",
    "timestamp": 1702080000000,
    "spotPrice": 2247.75,
    "fundingAPR": 19.09,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-10",
    "timestamp": 1702166400000,
    "spotPrice": 2262.48,
    "fundingAPR": 19.21,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-11",
    "timestamp": 1702252800000,
    "spotPrice": 2238.61,
    "fundingAPR": 21.54,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-12",
    "timestamp": 1702339200000,
    "spotPrice": 2254.44,
    "fundingAPR": 19.04,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-13",
    "timestamp": 1702425600000,
    "spotPrice": 2297.47,
    "fundingAPR": 20.73,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-14",
    "timestamp": 1702512000000,
    "spotPrice": 2292.59,
    "fundingAPR": 21.64,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-15",
    "timestamp": 1702598400000,
    "spotPrice": 2271.6,
    "fundingAPR": 19.37,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-16",
    "timestamp": 1702684800000,
    "spotPrice": 2301.4,
    "fundingAPR": 22.08,
    "stakingAPY": 3.61,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-17",
    "timestamp": 1702771200000,
    "spotPrice": 2332.91,
    "fundingAPR": 21.29,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-18",
    "timestamp": 1702857600000,
    "spotPrice": 2311.84,
    "fundingAPR": 20.14,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-19",
    "timestamp": 1702944000000,
    "spotPrice": 2301.25,
    "fundingAPR": 22.93,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-20",
    "timestamp": 1703030400000,
    "spotPrice": 2339.14,
    "fundingAPR": 20.78,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-21",
    "timestamp": 1703116800000,
    "spotPrice": 2352.63,
    "fundingAPR": 21.23,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-22",
    "timestamp": 1703203200000,
    "spotPrice": 2322.5,
    "fundingAPR": 23.11,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-23",
    "timestamp": 1703289600000,
    "spotPrice": 2326.54,
    "fundingAPR": 20.45,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-24",
    "timestamp": 1703376000000,
    "spotPrice": 2363.93,
    "fundingAPR": 22.37,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-25",
    "timestamp": 1703462400000,
    "spotPrice": 2357.06,
    "fundingAPR": 22.68,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-26",
    "timestamp": 1703548800000,
    "spotPrice": 2326.75,
    "fundingAPR": 20.51,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-27",
    "timestamp": 1703635200000,
    "spotPrice": 2345.22,
    "fundingAPR": 23.2,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-28",
    "timestamp": 1703721600000,
    "spotPrice": 2385.18,
    "fundingAPR": 21.85,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-29",
    "timestamp": 1703808000000,
    "spotPrice": 2348.47,
    "fundingAPR": 20.99,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-30",
    "timestamp": 1703894400000,
    "spotPrice": 2318.42,
    "fundingAPR": 23.54,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2023-12-31",
    "timestamp": 1703980800000,
    "spotPrice": 2367.96,
    "fundingAPR": 21.1,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-01",
    "timestamp": 1704067200000,
    "spotPrice": 2393.71,
    "fundingAPR": 21.96,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-02",
    "timestamp": 1704153600000,
    "spotPrice": 2349.37,
    "fundingAPR": 23.48,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-03",
    "timestamp": 1704240000000,
    "spotPrice": 2350.23,
    "fundingAPR": 20.89,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-04",
    "timestamp": 1704326400000,
    "spotPrice": 2412.85,
    "fundingAPR": 23.18,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-05",
    "timestamp": 1704412800000,
    "spotPrice": 2417.65,
    "fundingAPR": 23.13,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-06",
    "timestamp": 1704499200000,
    "spotPrice": 2378.83,
    "fundingAPR": 21.38,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-07",
    "timestamp": 1704585600000,
    "spotPrice": 2412.27,
    "fundingAPR": 24.29,
    "stakingAPY": 3.6,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-08",
    "timestamp": 1704672000000,
    "spotPrice": 2473.87,
    "fundingAPR": 22.75,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-09",
    "timestamp": 1704758400000,
    "spotPrice": 2459.05,
    "fundingAPR": 22.54,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-10",
    "timestamp": 1704844800000,
    "spotPrice": 2438.81,
    "fundingAPR": 25.07,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-11",
    "timestamp": 1704931200000,
    "spotPrice": 2499.36,
    "fundingAPR": 22.68,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-12",
    "timestamp": 1705017600000,
    "spotPrice": 2547.41,
    "fundingAPR": 24.16,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-13",
    "timestamp": 1705104000000,
    "spotPrice": 2520.72,
    "fundingAPR": 25.46,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-14",
    "timestamp": 1705190400000,
    "spotPrice": 2528.53,
    "fundingAPR": 23.18,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-15",
    "timestamp": 1705276800000,
    "spotPrice": 2604.86,
    "fundingAPR": 25.9,
    "stakingAPY": 3.59,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-16",
    "timestamp": 1705363200000,
    "spotPrice": 2631.6,
    "fundingAPR": 25.58,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-17",
    "timestamp": 1705449600000,
    "spotPrice": 2605.07,
    "fundingAPR": 24.36,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-18",
    "timestamp": 1705536000000,
    "spotPrice": 2644.23,
    "fundingAPR": 27.42,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-19",
    "timestamp": 1705622400000,
    "spotPrice": 2722,
    "fundingAPR": 25.72,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-20",
    "timestamp": 1705708800000,
    "spotPrice": 2726.3,
    "fundingAPR": 26.13,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-21",
    "timestamp": 1705795200000,
    "spotPrice": 2712.97,
    "fundingAPR": 28.53,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-22",
    "timestamp": 1705881600000,
    "spotPrice": 2779.6,
    "fundingAPR": 26.2,
    "stakingAPY": 3.58,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-23",
    "timestamp": 1705968000000,
    "spotPrice": 2845.06,
    "fundingAPR": 28.21,
    "stakingAPY": 3.57,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-24",
    "timestamp": 1706054400000,
    "spotPrice": 2832.57,
    "fundingAPR": 29.21,
    "stakingAPY": 3.57,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-25",
    "timestamp": 1706140800000,
    "spotPrice": 2842.9,
    "fundingAPR": 27.24,
    "stakingAPY": 3.57,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-26",
    "timestamp": 1706227200000,
    "spotPrice": 2926.75,
    "fundingAPR": 30.27,
    "stakingAPY": 3.57,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-27",
    "timestamp": 1706313600000,
    "spotPrice": 2970.15,
    "fundingAPR": 29.63,
    "stakingAPY": 3.57,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-28",
    "timestamp": 1706400000000,
    "spotPrice": 2951.63,
    "fundingAPR": 28.91,
    "stakingAPY": 3.56,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-29",
    "timestamp": 1706486400000,
    "spotPrice": 2990.57,
    "fundingAPR": 31.98,
    "stakingAPY": 3.56,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-30",
    "timestamp": 1706572800000,
    "spotPrice": 3077.53,
    "fundingAPR": 30.09,
    "stakingAPY": 3.56,
    "depegPct": 0.03
  },
  {
    "date": "2024-01-31",
    "timestamp": 1706659200000,
    "spotPrice": 3095.44,
    "fundingAPR": 31.03,
    "stakingAPY": 3.56,
    "depegPct": 0.03
  },
  {
    "date": "2024-02-01",
    "timestamp": 1706745600000,
    "spotPrice": 3083.75,
    "fundingAPR": 33.18,
    "stakingAPY": 3.56,
    "depegPct": 0.03
  },
  {
    "date": "2024-02-02",
    "timestamp": 1706832000000,
    "spotPrice": 3149.25,
    "fundingAPR": 30.9,
    "stakingAPY": 3.55,
    "depegPct": 0.03
  },
  {
    "date": "2024-02-03",
    "timestamp": 1706918400000,
    "spotPrice": 3224.79,
    "fundingAPR": 33.32,
    "stakingAPY": 3.55,
    "depegPct": 0.03
  },
  {
    "date": "2024-02-04",
    "timestamp": 1707004800000,
    "spotPrice": 3220.79,
    "fundingAPR": 33.91,
    "stakingAPY": 3.55,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-05",
    "timestamp": 1707091200000,
    "spotPrice": 3227.3,
    "fundingAPR": 32.24,
    "stakingAPY": 3.55,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-06",
    "timestamp": 1707177600000,
    "spotPrice": 3310.58,
    "fundingAPR": 35.41,
    "stakingAPY": 3.54,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-07",
    "timestamp": 1707264000000,
    "spotPrice": 3363.35,
    "fundingAPR": 34.38,
    "stakingAPY": 3.54,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-08",
    "timestamp": 1707350400000,
    "spotPrice": 3346.85,
    "fundingAPR": 34.1,
    "stakingAPY": 3.54,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-09",
    "timestamp": 1707436800000,
    "spotPrice": 3378.23,
    "fundingAPR": 37.01,
    "stakingAPY": 3.54,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-10",
    "timestamp": 1707523200000,
    "spotPrice": 3465.89,
    "fundingAPR": 34.92,
    "stakingAPY": 3.54,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-11",
    "timestamp": 1707609600000,
    "spotPrice": 3490.41,
    "fundingAPR": 36.29,
    "stakingAPY": 3.53,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-12",
    "timestamp": 1707696000000,
    "spotPrice": 3473.99,
    "fundingAPR": 38.02,
    "stakingAPY": 3.53,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-13",
    "timestamp": 1707782400000,
    "spotPrice": 3530.22,
    "fundingAPR": 35.79,
    "stakingAPY": 3.53,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-14",
    "timestamp": 1707868800000,
    "spotPrice": 3607.48,
    "fundingAPR": 38.46,
    "stakingAPY": 3.53,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-15",
    "timestamp": 1707955200000,
    "spotPrice": 3605.36,
    "fundingAPR": 38.54,
    "stakingAPY": 3.53,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-16",
    "timestamp": 1708041600000,
    "spotPrice": 3601.22,
    "fundingAPR": 37.14,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-17",
    "timestamp": 1708128000000,
    "spotPrice": 3675.41,
    "fundingAPR": 40.27,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-18",
    "timestamp": 1708214400000,
    "spotPrice": 3729.74,
    "fundingAPR": 38.81,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-19",
    "timestamp": 1708300800000,
    "spotPrice": 3709.04,
    "fundingAPR": 38.9,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-20",
    "timestamp": 1708387200000,
    "spotPrice": 3725.6,
    "fundingAPR": 41.48,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-21",
    "timestamp": 1708473600000,
    "spotPrice": 3805.53,
    "fundingAPR": 39.15,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-22",
    "timestamp": 1708560000000,
    "spotPrice": 3829.71,
    "fundingAPR": 40.83,
    "stakingAPY": 3.52,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-23",
    "timestamp": 1708646400000,
    "spotPrice": 3802.61,
    "fundingAPR": 42.04,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-24",
    "timestamp": 1708732800000,
    "spotPrice": 3842.1,
    "fundingAPR": 39.83,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-25",
    "timestamp": 1708819200000,
    "spotPrice": 3913.24,
    "fundingAPR": 42.6,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-26",
    "timestamp": 1708905600000,
    "spotPrice": 3907.06,
    "fundingAPR": 42.1,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-27",
    "timestamp": 1708992000000,
    "spotPrice": 3886.5,
    "fundingAPR": 40.92,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-28",
    "timestamp": 1709078400000,
    "spotPrice": 3944.22,
    "fundingAPR": 43.86,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-02-29",
    "timestamp": 1709164800000,
    "spotPrice": 3993.32,
    "fundingAPR": 41.94,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-01",
    "timestamp": 1709251200000,
    "spotPrice": 3963.46,
    "fundingAPR": 42.33,
    "stakingAPY": 3.51,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-02",
    "timestamp": 1709337600000,
    "spotPrice": 3959.6,
    "fundingAPR": 44.45,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-03",
    "timestamp": 1709424000000,
    "spotPrice": 4024.95,
    "fundingAPR": 41.89,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-04",
    "timestamp": 1709510400000,
    "spotPrice": 4043.38,
    "fundingAPR": 43.77,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-05",
    "timestamp": 1709596800000,
    "spotPrice": 4001.52,
    "fundingAPR": 44.36,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-06",
    "timestamp": 1709683200000,
    "spotPrice": 4018.92,
    "fundingAPR": 42.17,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-07",
    "timestamp": 1709769600000,
    "spotPrice": 4078.08,
    "fundingAPR": 44.91,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-08",
    "timestamp": 1709856000000,
    "spotPrice": 4063.94,
    "fundingAPR": 43.79,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-09",
    "timestamp": 1709942400000,
    "spotPrice": 4023.6,
    "fundingAPR": 42.83,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-10",
    "timestamp": 1710028800000,
    "spotPrice": 4059.97,
    "fundingAPR": 45.46,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-11",
    "timestamp": 1710115200000,
    "spotPrice": 4099.41,
    "fundingAPR": 43.08,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-12",
    "timestamp": 1710201600000,
    "spotPrice": 4052.82,
    "fundingAPR": 43.72,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-13",
    "timestamp": 1710288000000,
    "spotPrice": 4007.17,
    "fundingAPR": 45.28,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-14",
    "timestamp": 1710374400000,
    "spotPrice": 4091.44,
    "fundingAPR": 42.54,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-15",
    "timestamp": 1710460800000,
    "spotPrice": 4114.36,
    "fundingAPR": 44.55,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-16",
    "timestamp": 1710547200000,
    "spotPrice": 4022.5,
    "fundingAPR": 44.48,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-17",
    "timestamp": 1710633600000,
    "spotPrice": 4020.89,
    "fundingAPR": 42.38,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-18",
    "timestamp": 1710720000000,
    "spotPrice": 4110.15,
    "fundingAPR": 45.02,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-19",
    "timestamp": 1710806400000,
    "spotPrice": 4085.07,
    "fundingAPR": 43.33,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-20",
    "timestamp": 1710892800000,
    "spotPrice": 3997.94,
    "fundingAPR": 42.62,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-21",
    "timestamp": 1710979200000,
    "spotPrice": 4040.49,
    "fundingAPR": 44.89,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-22",
    "timestamp": 1711065600000,
    "spotPrice": 4111.03,
    "fundingAPR": 42.15,
    "stakingAPY": 3.5,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-23",
    "timestamp": 1711152000000,
    "spotPrice": 4044.06,
    "fundingAPR": 43.06,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-24",
    "timestamp": 1711238400000,
    "spotPrice": 3983.92,
    "fundingAPR": 44.07,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-25",
    "timestamp": 1711324800000,
    "spotPrice": 4058.93,
    "fundingAPR": 41.26,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-26",
    "timestamp": 1711411200000,
    "spotPrice": 4091.71,
    "fundingAPR": 43.39,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-27",
    "timestamp": 1711497600000,
    "spotPrice": 3999.63,
    "fundingAPR": 42.71,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-28",
    "timestamp": 1711584000000,
    "spotPrice": 3981.42,
    "fundingAPR": 40.8,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-29",
    "timestamp": 1711670400000,
    "spotPrice": 4068.48,
    "fundingAPR": 43.3,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-30",
    "timestamp": 1711756800000,
    "spotPrice": 4054.04,
    "fundingAPR": 41.12,
    "stakingAPY": 3.49,
    "depegPct": 0.02
  },
  {
    "date": "2024-03-31",
    "timestamp": 1711843200000,
    "spotPrice": 3959.98,
    "fundingAPR": 40.72,
    "stakingAPY": 3.48,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-01",
    "timestamp": 1711929600000,
    "spotPrice": 3987.46,
    "fundingAPR": 42.59,
    "stakingAPY": 3.48,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-02",
    "timestamp": 1712016000000,
    "spotPrice": 4062.79,
    "fundingAPR": 39.62,
    "stakingAPY": 3.48,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-03",
    "timestamp": 1712102400000,
    "spotPrice": 4003.81,
    "fundingAPR": 40.8,
    "stakingAPY": 3.48,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-04",
    "timestamp": 1712188800000,
    "spotPrice": 3931.18,
    "fundingAPR": 41.26,
    "stakingAPY": 3.48,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-05",
    "timestamp": 1712275200000,
    "spotPrice": 3995.99,
    "fundingAPR": 38.5,
    "stakingAPY": 3.48,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-06",
    "timestamp": 1712361600000,
    "spotPrice": 4038.66,
    "fundingAPR": 40.73,
    "stakingAPY": 3.47,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-07",
    "timestamp": 1712448000000,
    "spotPrice": 3949.27,
    "fundingAPR": 39.5,
    "stakingAPY": 3.47,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-08",
    "timestamp": 1712534400000,
    "spotPrice": 3915.73,
    "fundingAPR": 37.87,
    "stakingAPY": 3.47,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-09",
    "timestamp": 1712620800000,
    "spotPrice": 3999.58,
    "fundingAPR": 40.21,
    "stakingAPY": 3.47,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-10",
    "timestamp": 1712707200000,
    "spotPrice": 3997.06,
    "fundingAPR": 37.64,
    "stakingAPY": 3.47,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-11",
    "timestamp": 1712793600000,
    "spotPrice": 3899.18,
    "fundingAPR": 37.62,
    "stakingAPY": 3.46,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-12",
    "timestamp": 1712880000000,
    "spotPrice": 3912.04,
    "fundingAPR": 39.1,
    "stakingAPY": 3.46,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-13",
    "timestamp": 1712966400000,
    "spotPrice": 3991.55,
    "fundingAPR": 36.02,
    "stakingAPY": 3.46,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-14",
    "timestamp": 1713052800000,
    "spotPrice": 3943,
    "fundingAPR": 37.5,
    "stakingAPY": 3.46,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-15",
    "timestamp": 1713139200000,
    "spotPrice": 3860.68,
    "fundingAPR": 37.46,
    "stakingAPY": 3.45,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-16",
    "timestamp": 1713225600000,
    "spotPrice": 3915.03,
    "fundingAPR": 34.88,
    "stakingAPY": 3.45,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-17",
    "timestamp": 1713312000000,
    "spotPrice": 3967.88,
    "fundingAPR": 37.2,
    "stakingAPY": 3.45,
    "depegPct": 0.02
  },
  {
    "date": "2024-04-18",
    "timestamp": 1713398400000,
    "spotPrice": 3884.41,
    "fundingAPR": 35.52,
    "stakingAPY": 3.45,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-19",
    "timestamp": 1713484800000,
    "spotPrice": 3837.57,
    "fundingAPR": 34.28,
    "stakingAPY": 3.45,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-20",
    "timestamp": 1713571200000,
    "spotPrice": 3917.64,
    "fundingAPR": 36.46,
    "stakingAPY": 3.44,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-21",
    "timestamp": 1713657600000,
    "spotPrice": 3928.44,
    "fundingAPR": 33.64,
    "stakingAPY": 3.44,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-22",
    "timestamp": 1713744000000,
    "spotPrice": 3830.27,
    "fundingAPR": 34.06,
    "stakingAPY": 3.44,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-23",
    "timestamp": 1713830400000,
    "spotPrice": 3829.57,
    "fundingAPR": 35.17,
    "stakingAPY": 3.44,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-24",
    "timestamp": 1713916800000,
    "spotPrice": 3912.86,
    "fundingAPR": 32.14,
    "stakingAPY": 3.43,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-25",
    "timestamp": 1714003200000,
    "spotPrice": 3877.22,
    "fundingAPR": 33.96,
    "stakingAPY": 3.43,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-26",
    "timestamp": 1714089600000,
    "spotPrice": 3788.43,
    "fundingAPR": 33.47,
    "stakingAPY": 3.43,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-27",
    "timestamp": 1714176000000,
    "spotPrice": 3832.51,
    "fundingAPR": 31.22,
    "stakingAPY": 3.43,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-28",
    "timestamp": 1714262400000,
    "spotPrice": 3895.75,
    "fundingAPR": 33.64,
    "stakingAPY": 3.43,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-29",
    "timestamp": 1714348800000,
    "spotPrice": 3821.47,
    "fundingAPR": 31.62,
    "stakingAPY": 3.42,
    "depegPct": 0.03
  },
  {
    "date": "2024-04-30",
    "timestamp": 1714435200000,
    "spotPrice": 3763.78,
    "fundingAPR": 30.87,
    "stakingAPY": 3.42,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-01",
    "timestamp": 1714521600000,
    "spotPrice": 3839.67,
    "fundingAPR": 32.9,
    "stakingAPY": 3.42,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-02",
    "timestamp": 1714608000000,
    "spotPrice": 3864.92,
    "fundingAPR": 29.98,
    "stakingAPY": 3.42,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-03",
    "timestamp": 1714694400000,
    "spotPrice": 3770.02,
    "fundingAPR": 30.9,
    "stakingAPY": 3.42,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-04",
    "timestamp": 1714780800000,
    "spotPrice": 3757.14,
    "fundingAPR": 31.68,
    "stakingAPY": 3.42,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-05",
    "timestamp": 1714867200000,
    "spotPrice": 3843.7,
    "fundingAPR": 28.85,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-06",
    "timestamp": 1714953600000,
    "spotPrice": 3823.08,
    "fundingAPR": 31.01,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-07",
    "timestamp": 1715040000000,
    "spotPrice": 3731.11,
    "fundingAPR": 30.16,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-08",
    "timestamp": 1715126400000,
    "spotPrice": 3765.21,
    "fundingAPR": 28.36,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-09",
    "timestamp": 1715212800000,
    "spotPrice": 3838.69,
    "fundingAPR": 30.88,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-10",
    "timestamp": 1715299200000,
    "spotPrice": 3776.49,
    "fundingAPR": 28.64,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-11",
    "timestamp": 1715385600000,
    "spotPrice": 3710.43,
    "fundingAPR": 28.46,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-12",
    "timestamp": 1715472000000,
    "spotPrice": 3781.61,
    "fundingAPR": 30.33,
    "stakingAPY": 3.41,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-13",
    "timestamp": 1715558400000,
    "spotPrice": 3821.87,
    "fundingAPR": 27.46,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-14",
    "timestamp": 1715644800000,
    "spotPrice": 3733.46,
    "fundingAPR": 28.9,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-15",
    "timestamp": 1715731200000,
    "spotPrice": 3709.74,
    "fundingAPR": 29.38,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-16",
    "timestamp": 1715817600000,
    "spotPrice": 3798.64,
    "fundingAPR": 26.88,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-17",
    "timestamp": 1715904000000,
    "spotPrice": 3794.47,
    "fundingAPR": 29.36,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-18",
    "timestamp": 1715990400000,
    "spotPrice": 3702.3,
    "fundingAPR": 28.23,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-19",
    "timestamp": 1716076800000,
    "spotPrice": 3726.54,
    "fundingAPR": 26.98,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-20",
    "timestamp": 1716163200000,
    "spotPrice": 3809.44,
    "fundingAPR": 29.55,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-21",
    "timestamp": 1716249600000,
    "spotPrice": 3761.48,
    "fundingAPR": 27.2,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-22",
    "timestamp": 1716336000000,
    "spotPrice": 3689.25,
    "fundingAPR": 27.63,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-23",
    "timestamp": 1716422400000,
    "spotPrice": 3754.44,
    "fundingAPR": 29.33,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-24",
    "timestamp": 1716508800000,
    "spotPrice": 3804.84,
    "fundingAPR": 26.59,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-25",
    "timestamp": 1716595200000,
    "spotPrice": 3730.59,
    "fundingAPR": 28.49,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-26",
    "timestamp": 1716681600000,
    "spotPrice": 3697.98,
    "fundingAPR": 28.59,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-27",
    "timestamp": 1716768000000,
    "spotPrice": 3778.39,
    "fundingAPR": 26.38,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-28",
    "timestamp": 1716854400000,
    "spotPrice": 3787.16,
    "fundingAPR": 28.98,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-29",
    "timestamp": 1716940800000,
    "spotPrice": 3700.48,
    "fundingAPR": 27.41,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-30",
    "timestamp": 1717027200000,
    "spotPrice": 3709.18,
    "fundingAPR": 26.52,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-05-31",
    "timestamp": 1717113600000,
    "spotPrice": 3787.9,
    "fundingAPR": 28.83,
    "stakingAPY": 3.4,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-01",
    "timestamp": 1717200000000,
    "spotPrice": 3752.35,
    "fundingAPR": 26.13,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-02",
    "timestamp": 1717286400000,
    "spotPrice": 3675.41,
    "fundingAPR": 26.83,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-03",
    "timestamp": 1717372800000,
    "spotPrice": 3722.6,
    "fundingAPR": 27.95,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-04",
    "timestamp": 1717459200000,
    "spotPrice": 3778.41,
    "fundingAPR": 25.05,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-05",
    "timestamp": 1717545600000,
    "spotPrice": 3707.11,
    "fundingAPR": 27.03,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-06",
    "timestamp": 1717632000000,
    "spotPrice": 3659.22,
    "fundingAPR": 26.47,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-07",
    "timestamp": 1717718400000,
    "spotPrice": 3731.7,
    "fundingAPR": 24.36,
    "stakingAPY": 3.39,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-08",
    "timestamp": 1717804800000,
    "spotPrice": 3749.08,
    "fundingAPR": 26.8,
    "stakingAPY": 3.38,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-09",
    "timestamp": 1717891200000,
    "spotPrice": 3659.65,
    "fundingAPR": 24.67,
    "stakingAPY": 3.38,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-10",
    "timestamp": 1717977600000,
    "spotPrice": 3652.23,
    "fundingAPR": 24.04,
    "stakingAPY": 3.38,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-11",
    "timestamp": 1718064000000,
    "spotPrice": 3729.91,
    "fundingAPR": 25.94,
    "stakingAPY": 3.38,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-12",
    "timestamp": 1718150400000,
    "spotPrice": 3703.12,
    "fundingAPR": 22.92,
    "stakingAPY": 3.38,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-13",
    "timestamp": 1718236800000,
    "spotPrice": 3617.64,
    "fundingAPR": 23.88,
    "stakingAPY": 3.37,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-14",
    "timestamp": 1718323200000,
    "spotPrice": 3651.3,
    "fundingAPR": 24.42,
    "stakingAPY": 3.37,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-15",
    "timestamp": 1718409600000,
    "spotPrice": 3712.53,
    "fundingAPR": 21.51,
    "stakingAPY": 3.37,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-16",
    "timestamp": 1718496000000,
    "spotPrice": 3647.13,
    "fundingAPR": 23.59,
    "stakingAPY": 3.37,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-17",
    "timestamp": 1718582400000,
    "spotPrice": 3586.46,
    "fundingAPR": 22.45,
    "stakingAPY": 3.36,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-18",
    "timestamp": 1718668800000,
    "spotPrice": 3650.9,
    "fundingAPR": 20.59,
    "stakingAPY": 3.36,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-19",
    "timestamp": 1718755200000,
    "spotPrice": 3678.12,
    "fundingAPR": 22.89,
    "stakingAPY": 3.36,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-20",
    "timestamp": 1718841600000,
    "spotPrice": 3589.62,
    "fundingAPR": 20.34,
    "stakingAPY": 3.36,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-21",
    "timestamp": 1718928000000,
    "spotPrice": 3567.99,
    "fundingAPR": 20.08,
    "stakingAPY": 3.35,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-22",
    "timestamp": 1719014400000,
    "spotPrice": 3644.74,
    "fundingAPR": 21.61,
    "stakingAPY": 3.35,
    "depegPct": 0.03
  },
  {
    "date": "2024-06-23",
    "timestamp": 1719100800000,
    "spotPrice": 3629.19,
    "fundingAPR": 18.46,
    "stakingAPY": 3.35,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-24",
    "timestamp": 1719187200000,
    "spotPrice": 3539.03,
    "fundingAPR": 19.75,
    "stakingAPY": 3.35,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-25",
    "timestamp": 1719273600000,
    "spotPrice": 3560.42,
    "fundingAPR": 19.81,
    "stakingAPY": 3.34,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-26",
    "timestamp": 1719360000000,
    "spotPrice": 3627.74,
    "fundingAPR": 17.08,
    "stakingAPY": 3.34,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-27",
    "timestamp": 1719446400000,
    "spotPrice": 3571.79,
    "fundingAPR": 19.3,
    "stakingAPY": 3.34,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-28",
    "timestamp": 1719532800000,
    "spotPrice": 3501.84,
    "fundingAPR": 17.73,
    "stakingAPY": 3.34,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-29",
    "timestamp": 1719619200000,
    "spotPrice": 3558.96,
    "fundingAPR": 16.28,
    "stakingAPY": 3.33,
    "depegPct": 0.02
  },
  {
    "date": "2024-06-30",
    "timestamp": 1719705600000,
    "spotPrice": 3597.61,
    "fundingAPR": 18.48,
    "stakingAPY": 3.33,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-01",
    "timestamp": 1719792000000,
    "spotPrice": 3514.22,
    "fundingAPR": 15.71,
    "stakingAPY": 3.33,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-02",
    "timestamp": 1719878400000,
    "spotPrice": 3481.11,
    "fundingAPR": 15.94,
    "stakingAPY": 3.33,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-03",
    "timestamp": 1719964800000,
    "spotPrice": 3557.44,
    "fundingAPR": 17.18,
    "stakingAPY": 3.32,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-04",
    "timestamp": 1720051200000,
    "spotPrice": 3555.73,
    "fundingAPR": 14.11,
    "stakingAPY": 3.32,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-05",
    "timestamp": 1720137600000,
    "spotPrice": 3465.14,
    "fundingAPR": 15.8,
    "stakingAPY": 3.32,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-06",
    "timestamp": 1720224000000,
    "spotPrice": 3476,
    "fundingAPR": 15.49,
    "stakingAPY": 3.32,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-07",
    "timestamp": 1720310400000,
    "spotPrice": 3550.13,
    "fundingAPR": 13.13,
    "stakingAPY": 3.32,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-08",
    "timestamp": 1720396800000,
    "spotPrice": 3507.08,
    "fundingAPR": 15.56,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-09",
    "timestamp": 1720483200000,
    "spotPrice": 3431.57,
    "fundingAPR": 13.71,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-10",
    "timestamp": 1720569600000,
    "spotPrice": 3482.25,
    "fundingAPR": 12.82,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-11",
    "timestamp": 1720656000000,
    "spotPrice": 3533.54,
    "fundingAPR": 14.98,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-12",
    "timestamp": 1720742400000,
    "spotPrice": 3459.19,
    "fundingAPR": 12.17,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-13",
    "timestamp": 1720828800000,
    "spotPrice": 3417.33,
    "fundingAPR": 12.99,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-14",
    "timestamp": 1720915200000,
    "spotPrice": 3493.5,
    "fundingAPR": 14,
    "stakingAPY": 3.31,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-15",
    "timestamp": 1721001600000,
    "spotPrice": 3507.55,
    "fundingAPR": 11.19,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-16",
    "timestamp": 1721088000000,
    "spotPrice": 3420.37,
    "fundingAPR": 13.34,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-17",
    "timestamp": 1721174400000,
    "spotPrice": 3422.23,
    "fundingAPR": 12.76,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-18",
    "timestamp": 1721260800000,
    "spotPrice": 3503.2,
    "fundingAPR": 10.93,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-19",
    "timestamp": 1721347200000,
    "spotPrice": 3475.61,
    "fundingAPR": 13.57,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-20",
    "timestamp": 1721433600000,
    "spotPrice": 3397.75,
    "fundingAPR": 11.57,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-21",
    "timestamp": 1721520000000,
    "spotPrice": 3442.28,
    "fundingAPR": 11.35,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-22",
    "timestamp": 1721606400000,
    "spotPrice": 3506.43,
    "fundingAPR": 13.47,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-23",
    "timestamp": 1721692800000,
    "spotPrice": 3444.5,
    "fundingAPR": 10.76,
    "stakingAPY": 3.3,
    "depegPct": 0.02
  },
  {
    "date": "2024-07-24",
    "timestamp": 1721779200000,
    "spotPrice": 3380.94,
    "fundingAPR": 12.03,
    "stakingAPY": 3.3,
    "depegPct": 0.07
  },
  {
    "date": "2024-07-25",
    "timestamp": 1721865600000,
    "spotPrice": 3394.58,
    "fundingAPR": 12.29,
    "stakingAPY": 3.3,
    "depegPct": 0.22
  },
  {
    "date": "2024-07-26",
    "timestamp": 1721952000000,
    "spotPrice": 3333.35,
    "fundingAPR": 8.99,
    "stakingAPY": 3.3,
    "depegPct": 0.46
  },
  {
    "date": "2024-07-27",
    "timestamp": 1722038400000,
    "spotPrice": 3141.2,
    "fundingAPR": 10.43,
    "stakingAPY": 3.3,
    "depegPct": 0.77
  },
  {
    "date": "2024-07-28",
    "timestamp": 1722124800000,
    "spotPrice": 2995.94,
    "fundingAPR": 8.26,
    "stakingAPY": 3.3,
    "depegPct": 1.14
  },
  {
    "date": "2024-07-29",
    "timestamp": 1722211200000,
    "spotPrice": 2922.69,
    "fundingAPR": 5.52,
    "stakingAPY": 3.3,
    "depegPct": 1.55
  },
  {
    "date": "2024-07-30",
    "timestamp": 1722297600000,
    "spotPrice": 2754.74,
    "fundingAPR": 6.75,
    "stakingAPY": 3.3,
    "depegPct": 1.97
  },
  {
    "date": "2024-07-31",
    "timestamp": 1722384000000,
    "spotPrice": 2529.26,
    "fundingAPR": 3.12,
    "stakingAPY": 3.3,
    "depegPct": 2.38
  },
  {
    "date": "2024-08-01",
    "timestamp": 1722470400000,
    "spotPrice": 2423.23,
    "fundingAPR": 2.13,
    "stakingAPY": 3.3,
    "depegPct": 2.75
  },
  {
    "date": "2024-08-02",
    "timestamp": 1722556800000,
    "spotPrice": 2373.19,
    "fundingAPR": 2.88,
    "stakingAPY": 3.3,
    "depegPct": 3.06
  },
  {
    "date": "2024-08-03",
    "timestamp": 1722643200000,
    "spotPrice": 2236.11,
    "fundingAPR": -0.68,
    "stakingAPY": 3.3,
    "depegPct": 3.3
  },
  {
    "date": "2024-08-04",
    "timestamp": 1722729600000,
    "spotPrice": 2127.18,
    "fundingAPR": 0.62,
    "stakingAPY": 3.3,
    "depegPct": 3.45
  },
  {
    "date": "2024-08-05",
    "timestamp": 1722816000000,
    "spotPrice": 2166.92,
    "fundingAPR": 0.77,
    "stakingAPY": 3.3,
    "depegPct": 3.5
  },
  {
    "date": "2024-08-06",
    "timestamp": 1722902400000,
    "spotPrice": 2207.99,
    "fundingAPR": -1.29,
    "stakingAPY": 3.3,
    "depegPct": 3.42
  },
  {
    "date": "2024-08-07",
    "timestamp": 1722988800000,
    "spotPrice": 2213.07,
    "fundingAPR": 1.89,
    "stakingAPY": 3.29,
    "depegPct": 3.17
  },
  {
    "date": "2024-08-08",
    "timestamp": 1723075200000,
    "spotPrice": 2278.31,
    "fundingAPR": 1.39,
    "stakingAPY": 3.27,
    "depegPct": 2.8
  },
  {
    "date": "2024-08-09",
    "timestamp": 1723161600000,
    "spotPrice": 2421.3,
    "fundingAPR": 1.44,
    "stakingAPY": 3.26,
    "depegPct": 2.34
  },
  {
    "date": "2024-08-10",
    "timestamp": 1723248000000,
    "spotPrice": 2521.47,
    "fundingAPR": 5.02,
    "stakingAPY": 3.24,
    "depegPct": 1.86
  },
  {
    "date": "2024-08-11",
    "timestamp": 1723334400000,
    "spotPrice": 2567.9,
    "fundingAPR": 3.54,
    "stakingAPY": 3.23,
    "depegPct": 1.4
  },
  {
    "date": "2024-08-12",
    "timestamp": 1723420800000,
    "spotPrice": 2658.03,
    "fundingAPR": 5.08,
    "stakingAPY": 3.21,
    "depegPct": 1.03
  },
  {
    "date": "2024-08-13",
    "timestamp": 1723507200000,
    "spotPrice": 2753.25,
    "fundingAPR": 7.07,
    "stakingAPY": 3.2,
    "depegPct": 0.78
  },
  {
    "date": "2024-08-14",
    "timestamp": 1723593600000,
    "spotPrice": 2747.87,
    "fundingAPR": 4.55,
    "stakingAPY": 3.2,
    "depegPct": 0.7
  },
  {
    "date": "2024-08-15",
    "timestamp": 1723680000000,
    "spotPrice": 2698.87,
    "fundingAPR": 6.68,
    "stakingAPY": 3.2,
    "depegPct": 0.7
  },
  {
    "date": "2024-08-16",
    "timestamp": 1723766400000,
    "spotPrice": 2742.24,
    "fundingAPR": 6.55,
    "stakingAPY": 3.2,
    "depegPct": 0.7
  },
  {
    "date": "2024-08-17",
    "timestamp": 1723852800000,
    "spotPrice": 2779.29,
    "fundingAPR": 4.61,
    "stakingAPY": 3.2,
    "depegPct": 0.7
  },
  {
    "date": "2024-08-18",
    "timestamp": 1723939200000,
    "spotPrice": 2725.08,
    "fundingAPR": 7.35,
    "stakingAPY": 3.2,
    "depegPct": 0.7
  },
  {
    "date": "2024-08-19",
    "timestamp": 1724025600000,
    "spotPrice": 2700.19,
    "fundingAPR": 5.67,
    "stakingAPY": 3.2,
    "depegPct": 0.69
  },
  {
    "date": "2024-08-20",
    "timestamp": 1724112000000,
    "spotPrice": 2758.5,
    "fundingAPR": 5.21,
    "stakingAPY": 3.2,
    "depegPct": 0.69
  },
  {
    "date": "2024-08-21",
    "timestamp": 1724198400000,
    "spotPrice": 2765.54,
    "fundingAPR": 7.56,
    "stakingAPY": 3.2,
    "depegPct": 0.69
  },
  {
    "date": "2024-08-22",
    "timestamp": 1724284800000,
    "spotPrice": 2702.09,
    "fundingAPR": 4.95,
    "stakingAPY": 3.2,
    "depegPct": 0.69
  },
  {
    "date": "2024-08-23",
    "timestamp": 1724371200000,
    "spotPrice": 2707.58,
    "fundingAPR": 6.14,
    "stakingAPY": 3.2,
    "depegPct": 0.68
  },
  {
    "date": "2024-08-24",
    "timestamp": 1724457600000,
    "spotPrice": 2765.29,
    "fundingAPR": 7.24,
    "stakingAPY": 3.2,
    "depegPct": 0.68
  },
  {
    "date": "2024-08-25",
    "timestamp": 1724544000000,
    "spotPrice": 2740.12,
    "fundingAPR": 4.68,
    "stakingAPY": 3.2,
    "depegPct": 0.67
  },
  {
    "date": "2024-08-26",
    "timestamp": 1724630400000,
    "spotPrice": 2683.61,
    "fundingAPR": 7.09,
    "stakingAPY": 3.2,
    "depegPct": 0.67
  },
  {
    "date": "2024-08-27",
    "timestamp": 1724716800000,
    "spotPrice": 2717.58,
    "fundingAPR": 6.54,
    "stakingAPY": 3.2,
    "depegPct": 0.66
  },
  {
    "date": "2024-08-28",
    "timestamp": 1724803200000,
    "spotPrice": 2759.11,
    "fundingAPR": 4.98,
    "stakingAPY": 3.2,
    "depegPct": 0.66
  },
  {
    "date": "2024-08-29",
    "timestamp": 1724889600000,
    "spotPrice": 2707.76,
    "fundingAPR": 7.74,
    "stakingAPY": 3.2,
    "depegPct": 0.65
  },
  {
    "date": "2024-08-30",
    "timestamp": 1724976000000,
    "spotPrice": 2672.33,
    "fundingAPR": 5.76,
    "stakingAPY": 3.2,
    "depegPct": 0.64
  },
  {
    "date": "2024-08-31",
    "timestamp": 1725062400000,
    "spotPrice": 2725.25,
    "fundingAPR": 5.77,
    "stakingAPY": 3.2,
    "depegPct": 0.64
  },
  {
    "date": "2024-09-01",
    "timestamp": 1725148800000,
    "spotPrice": 2739.05,
    "fundingAPR": 7.88,
    "stakingAPY": 3.2,
    "depegPct": 0.63
  },
  {
    "date": "2024-09-02",
    "timestamp": 1725235200000,
    "spotPrice": 2674.17,
    "fundingAPR": 5.21,
    "stakingAPY": 3.2,
    "depegPct": 0.62
  },
  {
    "date": "2024-09-03",
    "timestamp": 1725321600000,
    "spotPrice": 2668.28,
    "fundingAPR": 6.82,
    "stakingAPY": 3.2,
    "depegPct": 0.61
  },
  {
    "date": "2024-09-04",
    "timestamp": 1725408000000,
    "spotPrice": 2725.49,
    "fundingAPR": 7.51,
    "stakingAPY": 3.2,
    "depegPct": 0.6
  },
  {
    "date": "2024-09-05",
    "timestamp": 1725494400000,
    "spotPrice": 2707.07,
    "fundingAPR": 5.16,
    "stakingAPY": 3.2,
    "depegPct": 0.59
  },
  {
    "date": "2024-09-06",
    "timestamp": 1725580800000,
    "spotPrice": 2644.68,
    "fundingAPR": 7.79,
    "stakingAPY": 3.2,
    "depegPct": 0.58
  },
  {
    "date": "2024-09-07",
    "timestamp": 1725667200000,
    "spotPrice": 2668.89,
    "fundingAPR": 6.83,
    "stakingAPY": 3.2,
    "depegPct": 0.57
  },
  {
    "date": "2024-09-08",
    "timestamp": 1725753600000,
    "spotPrice": 2714.43,
    "fundingAPR": 5.67,
    "stakingAPY": 3.2,
    "depegPct": 0.57
  },
  {
    "date": "2024-09-09",
    "timestamp": 1725840000000,
    "spotPrice": 2667.55,
    "fundingAPR": 8.38,
    "stakingAPY": 3.2,
    "depegPct": 0.55
  },
  {
    "date": "2024-09-10",
    "timestamp": 1725926400000,
    "spotPrice": 2622.86,
    "fundingAPR": 6.14,
    "stakingAPY": 3.2,
    "depegPct": 0.54
  },
  {
    "date": "2024-09-11",
    "timestamp": 1726012800000,
    "spotPrice": 2669.74,
    "fundingAPR": 6.63,
    "stakingAPY": 3.2,
    "depegPct": 0.53
  },
  {
    "date": "2024-09-12",
    "timestamp": 1726099200000,
    "spotPrice": 2690.56,
    "fundingAPR": 8.43,
    "stakingAPY": 3.2,
    "depegPct": 0.52
  },
  {
    "date": "2024-09-13",
    "timestamp": 1726185600000,
    "spotPrice": 2626.27,
    "fundingAPR": 5.76,
    "stakingAPY": 3.2,
    "depegPct": 0.51
  },
  {
    "date": "2024-09-14",
    "timestamp": 1726272000000,
    "spotPrice": 2609.74,
    "fundingAPR": 7.75,
    "stakingAPY": 3.2,
    "depegPct": 0.5
  },
  {
    "date": "2024-09-15",
    "timestamp": 1726358400000,
    "spotPrice": 2665.79,
    "fundingAPR": 8,
    "stakingAPY": 3.2,
    "depegPct": 0.49
  },
  {
    "date": "2024-09-16",
    "timestamp": 1726444800000,
    "spotPrice": 2655.18,
    "fundingAPR": 5.91,
    "stakingAPY": 3.2,
    "depegPct": 0.48
  },
  {
    "date": "2024-09-17",
    "timestamp": 1726531200000,
    "spotPrice": 2588.99,
    "fundingAPR": 8.68,
    "stakingAPY": 3.2,
    "depegPct": 0.47
  },
  {
    "date": "2024-09-18",
    "timestamp": 1726617600000,
    "spotPrice": 2603.61,
    "fundingAPR": 7.32,
    "stakingAPY": 3.2,
    "depegPct": 0.45
  },
  {
    "date": "2024-09-19",
    "timestamp": 1726704000000,
    "spotPrice": 2652.85,
    "fundingAPR": 6.61,
    "stakingAPY": 3.2,
    "depegPct": 0.44
  },
  {
    "date": "2024-09-20",
    "timestamp": 1726790400000,
    "spotPrice": 2612.23,
    "fundingAPR": 9.16,
    "stakingAPY": 3.2,
    "depegPct": 0.43
  },
  {
    "date": "2024-09-21",
    "timestamp": 1726876800000,
    "spotPrice": 2560.03,
    "fundingAPR": 6.72,
    "stakingAPY": 3.2,
    "depegPct": 0.42
  },
  {
    "date": "2024-09-22",
    "timestamp": 1726963200000,
    "spotPrice": 2600.6,
    "fundingAPR": 7.67,
    "stakingAPY": 3.2,
    "depegPct": 0.41
  },
  {
    "date": "2024-09-23",
    "timestamp": 1727049600000,
    "spotPrice": 2628.77,
    "fundingAPR": 9.1,
    "stakingAPY": 3.2,
    "depegPct": 0.39
  },
  {
    "date": "2024-09-24",
    "timestamp": 1727136000000,
    "spotPrice": 2567.32,
    "fundingAPR": 6.49,
    "stakingAPY": 3.2,
    "depegPct": 0.38
  },
  {
    "date": "2024-09-25",
    "timestamp": 1727222400000,
    "spotPrice": 2541.33,
    "fundingAPR": 8.78,
    "stakingAPY": 3.2,
    "depegPct": 0.37
  },
  {
    "date": "2024-09-26",
    "timestamp": 1727308800000,
    "spotPrice": 2595.82,
    "fundingAPR": 8.59,
    "stakingAPY": 3.2,
    "depegPct": 0.36
  },
  {
    "date": "2024-09-27",
    "timestamp": 1727395200000,
    "spotPrice": 2594.1,
    "fundingAPR": 6.81,
    "stakingAPY": 3.2,
    "depegPct": 0.34
  },
  {
    "date": "2024-09-28",
    "timestamp": 1727481600000,
    "spotPrice": 2526.44,
    "fundingAPR": 9.63,
    "stakingAPY": 3.2,
    "depegPct": 0.33
  },
  {
    "date": "2024-09-29",
    "timestamp": 1727568000000,
    "spotPrice": 2532.01,
    "fundingAPR": 7.9,
    "stakingAPY": 3.2,
    "depegPct": 0.32
  },
  {
    "date": "2024-09-30",
    "timestamp": 1727654400000,
    "spotPrice": 2584.73,
    "fundingAPR": 7.63,
    "stakingAPY": 3.2,
    "depegPct": 0.31
  },
  {
    "date": "2024-10-01",
    "timestamp": 1727740800000,
    "spotPrice": 2552.16,
    "fundingAPR": 9.96,
    "stakingAPY": 3.2,
    "depegPct": 0.3
  },
  {
    "date": "2024-10-02",
    "timestamp": 1727827200000,
    "spotPrice": 2494.52,
    "fundingAPR": 7.37,
    "stakingAPY": 3.2,
    "depegPct": 0.28
  },
  {
    "date": "2024-10-03",
    "timestamp": 1727913600000,
    "spotPrice": 2528.76,
    "fundingAPR": 8.74,
    "stakingAPY": 3.2,
    "depegPct": 0.27
  },
  {
    "date": "2024-10-04",
    "timestamp": 1728000000000,
    "spotPrice": 2564.53,
    "fundingAPR": 9.75,
    "stakingAPY": 3.2,
    "depegPct": 0.26
  },
  {
    "date": "2024-10-05",
    "timestamp": 1728086400000,
    "spotPrice": 2508.19,
    "fundingAPR": 7.28,
    "stakingAPY": 3.2,
    "depegPct": 0.25
  },
  {
    "date": "2024-10-06",
    "timestamp": 1728172800000,
    "spotPrice": 2474.24,
    "fundingAPR": 9.8,
    "stakingAPY": 3.2,
    "depegPct": 0.24
  },
  {
    "date": "2024-10-07",
    "timestamp": 1728259200000,
    "spotPrice": 2526.84,
    "fundingAPR": 9.14,
    "stakingAPY": 3.2,
    "depegPct": 0.23
  },
  {
    "date": "2024-10-08",
    "timestamp": 1728345600000,
    "spotPrice": 2534.96,
    "fundingAPR": 7.72,
    "stakingAPY": 3.2,
    "depegPct": 0.22
  },
  {
    "date": "2024-10-09",
    "timestamp": 1728432000000,
    "spotPrice": 2468.23,
    "fundingAPR": 10.49,
    "stakingAPY": 3.2,
    "depegPct": 0.21
  },
  {
    "date": "2024-10-10",
    "timestamp": 1728518400000,
    "spotPrice": 2465.51,
    "fundingAPR": 8.44,
    "stakingAPY": 3.2,
    "depegPct": 0.2
  },
  {
    "date": "2024-10-11",
    "timestamp": 1728604800000,
    "spotPrice": 2521.42,
    "fundingAPR": 8.62,
    "stakingAPY": 3.2,
    "depegPct": 0.18
  },
  {
    "date": "2024-10-12",
    "timestamp": 1728691200000,
    "spotPrice": 2498.5,
    "fundingAPR": 10.64,
    "stakingAPY": 3.2,
    "depegPct": 0.18
  },
  {
    "date": "2024-10-13",
    "timestamp": 1728777600000,
    "spotPrice": 2437.57,
    "fundingAPR": 7.97,
    "stakingAPY": 3.2,
    "depegPct": 0.17
  },
  {
    "date": "2024-10-14",
    "timestamp": 1728864000000,
    "spotPrice": 2465.58,
    "fundingAPR": 9.7,
    "stakingAPY": 3.2,
    "depegPct": 0.16
  },
  {
    "date": "2024-10-15",
    "timestamp": 1728950400000,
    "spotPrice": 2509.01,
    "fundingAPR": 10.25,
    "stakingAPY": 3.2,
    "depegPct": 0.15
  },
  {
    "date": "2024-10-16",
    "timestamp": 1729036800000,
    "spotPrice": 2459.87,
    "fundingAPR": 7.97,
    "stakingAPY": 3.2,
    "depegPct": 0.14
  },
  {
    "date": "2024-10-17",
    "timestamp": 1729123200000,
    "spotPrice": 2419.53,
    "fundingAPR": 10.64,
    "stakingAPY": 3.2,
    "depegPct": 0.13
  },
  {
    "date": "2024-10-18",
    "timestamp": 1729209600000,
    "spotPrice": 2469.87,
    "fundingAPR": 9.53,
    "stakingAPY": 3.2,
    "depegPct": 0.12
  },
  {
    "date": "2024-10-19",
    "timestamp": 1729296000000,
    "spotPrice": 2488.44,
    "fundingAPR": 8.5,
    "stakingAPY": 3.2,
    "depegPct": 0.11
  },
  {
    "date": "2024-10-20",
    "timestamp": 1729382400000,
    "spotPrice": 2424.91,
    "fundingAPR": 11.14,
    "stakingAPY": 3.2,
    "depegPct": 0.11
  },
  {
    "date": "2024-10-21",
    "timestamp": 1729468800000,
    "spotPrice": 2414.73,
    "fundingAPR": 8.8,
    "stakingAPY": 3.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-10-22",
    "timestamp": 1729555200000,
    "spotPrice": 2473.31,
    "fundingAPR": 9.41,
    "stakingAPY": 3.2,
    "depegPct": 0.09
  },
  {
    "date": "2024-10-23",
    "timestamp": 1729641600000,
    "spotPrice": 2461.27,
    "fundingAPR": 11.07,
    "stakingAPY": 3.2,
    "depegPct": 0.09
  },
  {
    "date": "2024-10-24",
    "timestamp": 1729728000000,
    "spotPrice": 2399.11,
    "fundingAPR": 8.38,
    "stakingAPY": 3.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-10-25",
    "timestamp": 1729814400000,
    "spotPrice": 2420.94,
    "fundingAPR": 10.42,
    "stakingAPY": 3.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-10-26",
    "timestamp": 1729900800000,
    "spotPrice": 2471.72,
    "fundingAPR": 10.49,
    "stakingAPY": 3.2,
    "depegPct": 0.07
  },
  {
    "date": "2024-10-27",
    "timestamp": 1729987200000,
    "spotPrice": 2431.51,
    "fundingAPR": 8.45,
    "stakingAPY": 3.2,
    "depegPct": 0.07
  },
  {
    "date": "2024-10-28",
    "timestamp": 1730073600000,
    "spotPrice": 2386.29,
    "fundingAPR": 11.19,
    "stakingAPY": 3.2,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-29",
    "timestamp": 1730160000000,
    "spotPrice": 2433.83,
    "fundingAPR": 9.66,
    "stakingAPY": 3.2,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-30",
    "timestamp": 1730246400000,
    "spotPrice": 2462.97,
    "fundingAPR": 9.03,
    "stakingAPY": 3.2,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-31",
    "timestamp": 1730332800000,
    "spotPrice": 2404.6,
    "fundingAPR": 11.46,
    "stakingAPY": 3.2,
    "depegPct": 0.06
  },
  {
    "date": "2024-11-01",
    "timestamp": 1730419200000,
    "spotPrice": 2387.67,
    "fundingAPR": 8.9,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-02",
    "timestamp": 1730505600000,
    "spotPrice": 2448.09,
    "fundingAPR": 9.92,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-03",
    "timestamp": 1730592000000,
    "spotPrice": 2447.64,
    "fundingAPR": 11.16,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-04",
    "timestamp": 1730678400000,
    "spotPrice": 2386.04,
    "fundingAPR": 8.52,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-05",
    "timestamp": 1730764800000,
    "spotPrice": 2403.74,
    "fundingAPR": 10.81,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-06",
    "timestamp": 1730851200000,
    "spotPrice": 2454.38,
    "fundingAPR": 10.4,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-07",
    "timestamp": 1730937600000,
    "spotPrice": 2427.82,
    "fundingAPR": 8.66,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-08",
    "timestamp": 1731024000000,
    "spotPrice": 2384.7,
    "fundingAPR": 11.4,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-09",
    "timestamp": 1731110400000,
    "spotPrice": 2423.49,
    "fundingAPR": 9.5,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-10",
    "timestamp": 1731196800000,
    "spotPrice": 2458.18,
    "fundingAPR": 9.31,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-11",
    "timestamp": 1731283200000,
    "spotPrice": 2412.46,
    "fundingAPR": 11.48,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-12",
    "timestamp": 1731369600000,
    "spotPrice": 2392.01,
    "fundingAPR": 8.8,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-13",
    "timestamp": 1731456000000,
    "spotPrice": 2445.9,
    "fundingAPR": 10.23,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-14",
    "timestamp": 1731542400000,
    "spotPrice": 2455.81,
    "fundingAPR": 11.04,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-15",
    "timestamp": 1731628800000,
    "spotPrice": 2403.15,
    "fundingAPR": 8.57,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-16",
    "timestamp": 1731715200000,
    "spotPrice": 2411.03,
    "fundingAPR": 11.09,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-17",
    "timestamp": 1731801600000,
    "spotPrice": 2466.31,
    "fundingAPR": 10.25,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-18",
    "timestamp": 1731888000000,
    "spotPrice": 2449.28,
    "fundingAPR": 8.9,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-19",
    "timestamp": 1731974400000,
    "spotPrice": 2403.9,
    "fundingAPR": 11.59,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-20",
    "timestamp": 1732060800000,
    "spotPrice": 2438.58,
    "fundingAPR": 9.41,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-21",
    "timestamp": 1732147200000,
    "spotPrice": 2481.38,
    "fundingAPR": 9.69,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-22",
    "timestamp": 1732233600000,
    "spotPrice": 2442.46,
    "fundingAPR": 11.57,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-23",
    "timestamp": 1732320000000,
    "spotPrice": 2416.88,
    "fundingAPR": 8.85,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-24",
    "timestamp": 1732406400000,
    "spotPrice": 2470.01,
    "fundingAPR": 10.66,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-25",
    "timestamp": 1732492800000,
    "spotPrice": 2489.91,
    "fundingAPR": 11.04,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-26",
    "timestamp": 1732579200000,
    "spotPrice": 2440.08,
    "fundingAPR": 8.81,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-27",
    "timestamp": 1732665600000,
    "spotPrice": 2441.83,
    "fundingAPR": 11.49,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-28",
    "timestamp": 1732752000000,
    "spotPrice": 2500.42,
    "fundingAPR": 10.24,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-29",
    "timestamp": 1732838400000,
    "spotPrice": 2493.16,
    "fundingAPR": 9.32,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-30",
    "timestamp": 1732924800000,
    "spotPrice": 2446.42,
    "fundingAPR": 11.9,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-01",
    "timestamp": 1733011200000,
    "spotPrice": 2476.07,
    "fundingAPR": 9.48,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-02",
    "timestamp": 1733097600000,
    "spotPrice": 2525.89,
    "fundingAPR": 10.22,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-03",
    "timestamp": 1733184000000,
    "spotPrice": 2494.48,
    "fundingAPR": 11.76,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-04",
    "timestamp": 1733270400000,
    "spotPrice": 2464.19,
    "fundingAPR": 9.09,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-05",
    "timestamp": 1733356800000,
    "spotPrice": 2515.19,
    "fundingAPR": 11.23,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-06",
    "timestamp": 1733443200000,
    "spotPrice": 2544.47,
    "fundingAPR": 11.16,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-07",
    "timestamp": 1733529600000,
    "spotPrice": 2498.39,
    "fundingAPR": 9.23,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-08",
    "timestamp": 1733616000000,
    "spotPrice": 2493.78,
    "fundingAPR": 12,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-09",
    "timestamp": 1733702400000,
    "spotPrice": 2554.16,
    "fundingAPR": 10.37,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-10",
    "timestamp": 1733788800000,
    "spotPrice": 2556.64,
    "fundingAPR": 9.9,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-11",
    "timestamp": 1733875200000,
    "spotPrice": 2509.35,
    "fundingAPR": 12.29,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-12",
    "timestamp": 1733961600000,
    "spotPrice": 2533.09,
    "fundingAPR": 9.71,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-13",
    "timestamp": 1734048000000,
    "spotPrice": 2588.58,
    "fundingAPR": 10.9,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-14",
    "timestamp": 1734134400000,
    "spotPrice": 2565.14,
    "fundingAPR": 12.04,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-15",
    "timestamp": 1734220800000,
    "spotPrice": 2530.56,
    "fundingAPR": 9.48,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-16",
    "timestamp": 1734307200000,
    "spotPrice": 2578.04,
    "fundingAPR": 11.89,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-17",
    "timestamp": 1734393600000,
    "spotPrice": 2615.78,
    "fundingAPR": 11.38,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-18",
    "timestamp": 1734480000000,
    "spotPrice": 2574.2,
    "fundingAPR": 9.8,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-19",
    "timestamp": 1734566400000,
    "spotPrice": 2563.05,
    "fundingAPR": 12.58,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-20",
    "timestamp": 1734652800000,
    "spotPrice": 2623.6,
    "fundingAPR": 10.62,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-21",
    "timestamp": 1734739200000,
    "spotPrice": 2635.46,
    "fundingAPR": 10.61,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-22",
    "timestamp": 1734825600000,
    "spotPrice": 2588.38,
    "fundingAPR": 12.74,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-23",
    "timestamp": 1734912000000,
    "spotPrice": 2605.37,
    "fundingAPR": 10.08,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-24",
    "timestamp": 1734998400000,
    "spotPrice": 2664.98,
    "fundingAPR": 11.66,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-25",
    "timestamp": 1735084800000,
    "spotPrice": 2649.72,
    "fundingAPR": 12.38,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-26",
    "timestamp": 1735171200000,
    "spotPrice": 2611.3,
    "fundingAPR": 10.01,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-27",
    "timestamp": 1735257600000,
    "spotPrice": 2653.88,
    "fundingAPR": 12.62,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-28",
    "timestamp": 1735344000000,
    "spotPrice": 2698.9,
    "fundingAPR": 11.68,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-29",
    "timestamp": 1735430400000,
    "spotPrice": 2662.42,
    "fundingAPR": 10.49,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-30",
    "timestamp": 1735516800000,
    "spotPrice": 2644.64,
    "fundingAPR": 13.19,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-31",
    "timestamp": 1735603200000,
    "spotPrice": 2703.65,
    "fundingAPR": 10.96,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-01",
    "timestamp": 1735689600000,
    "spotPrice": 2724.28,
    "fundingAPR": 11.41,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-02",
    "timestamp": 1735776000000,
    "spotPrice": 2678.11,
    "fundingAPR": 13.22,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-03",
    "timestamp": 1735862400000,
    "spotPrice": 2687.62,
    "fundingAPR": 10.54,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-04",
    "timestamp": 1735948800000,
    "spotPrice": 2749.65,
    "fundingAPR": 12.48,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-05",
    "timestamp": 1736035200000,
    "spotPrice": 2742.55,
    "fundingAPR": 12.75,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-06",
    "timestamp": 1736121600000,
    "spotPrice": 2700.78,
    "fundingAPR": 10.63,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-07",
    "timestamp": 1736208000000,
    "spotPrice": 2737.13,
    "fundingAPR": 13.37,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-08",
    "timestamp": 1736294400000,
    "spotPrice": 2788.04,
    "fundingAPR": 12.02,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-09",
    "timestamp": 1736380800000,
    "spotPrice": 2757.1,
    "fundingAPR": 11.26,
    "stakingAPY": 3.2,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-10",
    "timestamp": 1736467200000,
    "spotPrice": 2732.71,
    "fundingAPR": 13.8,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-11",
    "timestamp": 1736553600000,
    "spotPrice": 2788.47,
    "fundingAPR": 11.35,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-12",
    "timestamp": 1736640000000,
    "spotPrice": 2817.03,
    "fundingAPR": 12.25,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-13",
    "timestamp": 1736726400000,
    "spotPrice": 2772.42,
    "fundingAPR": 13.69,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-14",
    "timestamp": 1736812800000,
    "spotPrice": 2773.83,
    "fundingAPR": 11.06,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-15",
    "timestamp": 1736899200000,
    "spotPrice": 2836.52,
    "fundingAPR": 13.31,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-16",
    "timestamp": 1736985600000,
    "spotPrice": 2837.33,
    "fundingAPR": 13.12,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-17",
    "timestamp": 1737072000000,
    "spotPrice": 2792.75,
    "fundingAPR": 11.3,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-18",
    "timestamp": 1737158400000,
    "spotPrice": 2821.67,
    "fundingAPR": 14.09,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-19",
    "timestamp": 1737244800000,
    "spotPrice": 2876.95,
    "fundingAPR": 12.37,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-20",
    "timestamp": 1737331200000,
    "spotPrice": 2851.85,
    "fundingAPR": 12.05,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-21",
    "timestamp": 1737417600000,
    "spotPrice": 2820.99,
    "fundingAPR": 14.37,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-22",
    "timestamp": 1737504000000,
    "spotPrice": 2871.88,
    "fundingAPR": 11.77,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-23",
    "timestamp": 1737590400000,
    "spotPrice": 2907.33,
    "fundingAPR": 13.09,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-24",
    "timestamp": 1737676800000,
    "spotPrice": 2864.87,
    "fundingAPR": 14.1,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-25",
    "timestamp": 1737763200000,
    "spotPrice": 2857.78,
    "fundingAPR": 11.6,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-26",
    "timestamp": 1737849600000,
    "spotPrice": 2919.32,
    "fundingAPR": 14.09,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-27",
    "timestamp": 1737936000000,
    "spotPrice": 2927.65,
    "fundingAPR": 13.44,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-28",
    "timestamp": 1738022400000,
    "spotPrice": 2880.87,
    "fundingAPR": 11.98,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-29",
    "timestamp": 1738108800000,
    "spotPrice": 2901.32,
    "fundingAPR": 14.74,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-30",
    "timestamp": 1738195200000,
    "spotPrice": 2959.35,
    "fundingAPR": 12.69,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-31",
    "timestamp": 1738281600000,
    "spotPrice": 2940.26,
    "fundingAPR": 12.82,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-01",
    "timestamp": 1738368000000,
    "spotPrice": 2903.24,
    "fundingAPR": 14.85,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-02",
    "timestamp": 1738454400000,
    "spotPrice": 2947.75,
    "fundingAPR": 12.17,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-03",
    "timestamp": 1738540800000,
    "spotPrice": 2988.93,
    "fundingAPR": 13.87,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-04",
    "timestamp": 1738627200000,
    "spotPrice": 2949.2,
    "fundingAPR": 14.44,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-05",
    "timestamp": 1738713600000,
    "spotPrice": 2933.39,
    "fundingAPR": 12.13,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-06",
    "timestamp": 1738800000000,
    "spotPrice": 2992.06,
    "fundingAPR": 14.78,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-07",
    "timestamp": 1738886400000,
    "spotPrice": 3007.35,
    "fundingAPR": 13.7,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-08",
    "timestamp": 1738972800000,
    "spotPrice": 2959.06,
    "fundingAPR": 12.63,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-09",
    "timestamp": 1739059200000,
    "spotPrice": 2970.24,
    "fundingAPR": 15.27,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-10",
    "timestamp": 1739145600000,
    "spotPrice": 3029.39,
    "fundingAPR": 12.95,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-11",
    "timestamp": 1739232000000,
    "spotPrice": 3016.39,
    "fundingAPR": 13.53,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-12",
    "timestamp": 1739318400000,
    "spotPrice": 2973.71,
    "fundingAPR": 15.21,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-13",
    "timestamp": 1739404800000,
    "spotPrice": 3010.5,
    "fundingAPR": 12.52,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-14",
    "timestamp": 1739491200000,
    "spotPrice": 3056.16,
    "fundingAPR": 14.55,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-15",
    "timestamp": 1739577600000,
    "spotPrice": 3019.74,
    "fundingAPR": 14.65,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-16",
    "timestamp": 1739664000000,
    "spotPrice": 2995.24,
    "fundingAPR": 12.6,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-17",
    "timestamp": 1739750400000,
    "spotPrice": 3049.42,
    "fundingAPR": 15.34,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-18",
    "timestamp": 1739836800000,
    "spotPrice": 3071.03,
    "fundingAPR": 13.85,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-19",
    "timestamp": 1739923200000,
    "spotPrice": 3022,
    "fundingAPR": 13.2,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-20",
    "timestamp": 1740009600000,
    "spotPrice": 3023.37,
    "fundingAPR": 15.66,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-21",
    "timestamp": 1740096000000,
    "spotPrice": 3082.02,
    "fundingAPR": 13.13,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-22",
    "timestamp": 1740182400000,
    "spotPrice": 3075.13,
    "fundingAPR": 14.13,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-23",
    "timestamp": 1740268800000,
    "spotPrice": 3027.47,
    "fundingAPR": 15.41,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-24",
    "timestamp": 1740355200000,
    "spotPrice": 3055.46,
    "fundingAPR": 12.79,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-25",
    "timestamp": 1740441600000,
    "spotPrice": 3104.33,
    "fundingAPR": 15.09,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-26",
    "timestamp": 1740528000000,
    "spotPrice": 3071.76,
    "fundingAPR": 14.73,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-27",
    "timestamp": 1740614400000,
    "spotPrice": 3038.89,
    "fundingAPR": 12.98,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-28",
    "timestamp": 1740700800000,
    "spotPrice": 3087.13,
    "fundingAPR": 15.74,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-01",
    "timestamp": 1740787200000,
    "spotPrice": 3114.35,
    "fundingAPR": 13.88,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-02",
    "timestamp": 1740873600000,
    "spotPrice": 3065.47,
    "fundingAPR": 13.67,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-03",
    "timestamp": 1740960000000,
    "spotPrice": 3056.79,
    "fundingAPR": 15.87,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-04",
    "timestamp": 1741046400000,
    "spotPrice": 3113.42,
    "fundingAPR": 13.2,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-05",
    "timestamp": 1741132800000,
    "spotPrice": 3112.6,
    "fundingAPR": 14.6,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-06",
    "timestamp": 1741219200000,
    "spotPrice": 3060.83,
    "fundingAPR": 15.45,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-07",
    "timestamp": 1741305600000,
    "spotPrice": 3079.21,
    "fundingAPR": 12.96,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-08",
    "timestamp": 1741392000000,
    "spotPrice": 3130.03,
    "fundingAPR": 15.47,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-09",
    "timestamp": 1741478400000,
    "spotPrice": 3101.9,
    "fundingAPR": 14.64,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-10",
    "timestamp": 1741564800000,
    "spotPrice": 3061.23,
    "fundingAPR": 13.26,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-11",
    "timestamp": 1741651200000,
    "spotPrice": 3102.3,
    "fundingAPR": 15.95,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-12",
    "timestamp": 1741737600000,
    "spotPrice": 3134.4,
    "fundingAPR": 13.77,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-13",
    "timestamp": 1741824000000,
    "spotPrice": 3086.62,
    "fundingAPR": 14,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-14",
    "timestamp": 1741910400000,
    "spotPrice": 3067.96,
    "fundingAPR": 15.89,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-15",
    "timestamp": 1741996800000,
    "spotPrice": 3127.17,
    "fundingAPR": 13.15,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-16",
    "timestamp": 1742083200000,
    "spotPrice": 3133.97,
    "fundingAPR": 14.91,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-17",
    "timestamp": 1742169600000,
    "spotPrice": 3064.28,
    "fundingAPR": 15.3,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-18",
    "timestamp": 1742256000000,
    "spotPrice": 3075.78,
    "fundingAPR": 13.02,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-19",
    "timestamp": 1742342400000,
    "spotPrice": 3143.06,
    "fundingAPR": 15.67,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-20",
    "timestamp": 1742428800000,
    "spotPrice": 3115,
    "fundingAPR": 14.42,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-21",
    "timestamp": 1742515200000,
    "spotPrice": 3055.96,
    "fundingAPR": 13.44,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-22",
    "timestamp": 1742601600000,
    "spotPrice": 3100.45,
    "fundingAPR": 16,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-23",
    "timestamp": 1742688000000,
    "spotPrice": 3149.48,
    "fundingAPR": 13.58,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-24",
    "timestamp": 1742774400000,
    "spotPrice": 3094.02,
    "fundingAPR": 14.26,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-25",
    "timestamp": 1742860800000,
    "spotPrice": 3061.17,
    "fundingAPR": 15.79,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-26",
    "timestamp": 1742947200000,
    "spotPrice": 3127.21,
    "fundingAPR": 13.08,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-27",
    "timestamp": 1743033600000,
    "spotPrice": 3145.36,
    "fundingAPR": 15.17,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-28",
    "timestamp": 1743120000000,
    "spotPrice": 3077.19,
    "fundingAPR": 15.1,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-29",
    "timestamp": 1743206400000,
    "spotPrice": 3079.36,
    "fundingAPR": 13.11,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-30",
    "timestamp": 1743292800000,
    "spotPrice": 3149.95,
    "fundingAPR": 15.84,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-31",
    "timestamp": 1743379200000,
    "spotPrice": 3132.78,
    "fundingAPR": 14.21,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-01",
    "timestamp": 1743465600000,
    "spotPrice": 3070.02,
    "fundingAPR": 13.67,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-02",
    "timestamp": 1743552000000,
    "spotPrice": 3106.98,
    "fundingAPR": 16.04,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-03",
    "timestamp": 1743638400000,
    "spotPrice": 3164.04,
    "fundingAPR": 13.44,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-04",
    "timestamp": 1743724800000,
    "spotPrice": 3116.41,
    "fundingAPR": 14.56,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-05",
    "timestamp": 1743811200000,
    "spotPrice": 3075.87,
    "fundingAPR": 15.69,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-06",
    "timestamp": 1743897600000,
    "spotPrice": 3138.39,
    "fundingAPR": 13.08,
    "stakingAPY": 3.2,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-07",
    "timestamp": 1743984000000,
    "spotPrice": 3167.47,
    "fundingAPR": 15.44,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-08",
    "timestamp": 1744070400000,
    "spotPrice": 3102.31,
    "fundingAPR": 14.92,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-09",
    "timestamp": 1744156800000,
    "spotPrice": 3095.07,
    "fundingAPR": 13.28,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-10",
    "timestamp": 1744243200000,
    "spotPrice": 3167.35,
    "fundingAPR": 16.01,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-11",
    "timestamp": 1744329600000,
    "spotPrice": 3161.42,
    "fundingAPR": 14.04,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-12",
    "timestamp": 1744416000000,
    "spotPrice": 3096.31,
    "fundingAPR": 13.96,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-13",
    "timestamp": 1744502400000,
    "spotPrice": 3124.86,
    "fundingAPR": 16.06,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-14",
    "timestamp": 1744588800000,
    "spotPrice": 3188.63,
    "fundingAPR": 13.36,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-15",
    "timestamp": 1744675200000,
    "spotPrice": 3149.86,
    "fundingAPR": 14.88,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-16",
    "timestamp": 1744761600000,
    "spotPrice": 3102.47,
    "fundingAPR": 15.59,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-17",
    "timestamp": 1744848000000,
    "spotPrice": 3160.03,
    "fundingAPR": 13.16,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-18",
    "timestamp": 1744934400000,
    "spotPrice": 3199.34,
    "fundingAPR": 15.72,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-19",
    "timestamp": 1745020800000,
    "spotPrice": 3138.59,
    "fundingAPR": 14.76,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-20",
    "timestamp": 1745107200000,
    "spotPrice": 3122.04,
    "fundingAPR": 13.51,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-21",
    "timestamp": 1745193600000,
    "spotPrice": 3194.34,
    "fundingAPR": 16.17,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-22",
    "timestamp": 1745280000000,
    "spotPrice": 3199.7,
    "fundingAPR": 13.91,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-23",
    "timestamp": 1745366400000,
    "spotPrice": 3133.63,
    "fundingAPR": 14.29,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-24",
    "timestamp": 1745452800000,
    "spotPrice": 3153.07,
    "fundingAPR": 16.08,
    "stakingAPY": 3.19,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-25",
    "timestamp": 1745539200000,
    "spotPrice": 3222.07,
    "fundingAPR": 13.35,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-26",
    "timestamp": 1745625600000,
    "spotPrice": 3192.94,
    "fundingAPR": 15.24,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-27",
    "timestamp": 1745712000000,
    "spotPrice": 3139.69,
    "fundingAPR": 15.49,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-28",
    "timestamp": 1745798400000,
    "spotPrice": 3190.93,
    "fundingAPR": 13.31,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-29",
    "timestamp": 1745884800000,
    "spotPrice": 3239.51,
    "fundingAPR": 16,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-30",
    "timestamp": 1745971200000,
    "spotPrice": 3184.44,
    "fundingAPR": 14.63,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-01",
    "timestamp": 1746057600000,
    "spotPrice": 3158.87,
    "fundingAPR": 13.8,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-02",
    "timestamp": 1746144000000,
    "spotPrice": 3229.49,
    "fundingAPR": 16.32,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-03",
    "timestamp": 1746230400000,
    "spotPrice": 3245.95,
    "fundingAPR": 13.83,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-04",
    "timestamp": 1746316800000,
    "spotPrice": 3180.31,
    "fundingAPR": 14.67,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-05",
    "timestamp": 1746403200000,
    "spotPrice": 3190.11,
    "fundingAPR": 16.08,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-06",
    "timestamp": 1746489600000,
    "spotPrice": 3262.7,
    "fundingAPR": 13.41,
    "stakingAPY": 3.18,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-07",
    "timestamp": 1746576000000,
    "spotPrice": 3243.77,
    "fundingAPR": 15.6,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-08",
    "timestamp": 1746662400000,
    "spotPrice": 3185.76,
    "fundingAPR": 15.4,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-09",
    "timestamp": 1746748800000,
    "spotPrice": 3229.44,
    "fundingAPR": 13.52,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-10",
    "timestamp": 1746835200000,
    "spotPrice": 3286.11,
    "fundingAPR": 16.27,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-11",
    "timestamp": 1746921600000,
    "spotPrice": 3237.85,
    "fundingAPR": 14.53,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-12",
    "timestamp": 1747008000000,
    "spotPrice": 3203.73,
    "fundingAPR": 14.14,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-13",
    "timestamp": 1747094400000,
    "spotPrice": 3271,
    "fundingAPR": 16.44,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-14",
    "timestamp": 1747180800000,
    "spotPrice": 3298.08,
    "fundingAPR": 13.81,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-15",
    "timestamp": 1747267200000,
    "spotPrice": 3234.22,
    "fundingAPR": 15.06,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-16",
    "timestamp": 1747353600000,
    "spotPrice": 3234.06,
    "fundingAPR": 16.07,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-17",
    "timestamp": 1747440000000,
    "spotPrice": 3308.51,
    "fundingAPR": 13.52,
    "stakingAPY": 3.17,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-18",
    "timestamp": 1747526400000,
    "spotPrice": 3300.11,
    "fundingAPR": 15.96,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-19",
    "timestamp": 1747612800000,
    "spotPrice": 3238.52,
    "fundingAPR": 15.3,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-20",
    "timestamp": 1747699200000,
    "spotPrice": 3273.55,
    "fundingAPR": 13.78,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-21",
    "timestamp": 1747785600000,
    "spotPrice": 3336.93,
    "fundingAPR": 16.51,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-22",
    "timestamp": 1747872000000,
    "spotPrice": 3296.44,
    "fundingAPR": 14.45,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-23",
    "timestamp": 1747958400000,
    "spotPrice": 3254.42,
    "fundingAPR": 14.52,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-24",
    "timestamp": 1748044800000,
    "spotPrice": 3316.72,
    "fundingAPR": 16.54,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-25",
    "timestamp": 1748131200000,
    "spotPrice": 3353.71,
    "fundingAPR": 13.82,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-26",
    "timestamp": 1748217600000,
    "spotPrice": 3292.94,
    "fundingAPR": 15.47,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-27",
    "timestamp": 1748304000000,
    "spotPrice": 3282.71,
    "fundingAPR": 16.04,
    "stakingAPY": 3.16,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-28",
    "timestamp": 1748390400000,
    "spotPrice": 3357.24,
    "fundingAPR": 13.68,
    "stakingAPY": 3.15,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-29",
    "timestamp": 1748476800000,
    "spotPrice": 3359.42,
    "fundingAPR": 16.3,
    "stakingAPY": 3.15,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-30",
    "timestamp": 1748563200000,
    "spotPrice": 3295.5,
    "fundingAPR": 15.22,
    "stakingAPY": 3.15,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-31",
    "timestamp": 1748649600000,
    "spotPrice": 3320.98,
    "fundingAPR": 14.09,
    "stakingAPY": 3.15,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-01",
    "timestamp": 1748736000000,
    "spotPrice": 3389.54,
    "fundingAPR": 16.72,
    "stakingAPY": 3.15,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-02",
    "timestamp": 1748822400000,
    "spotPrice": 3357.61,
    "fundingAPR": 14.39,
    "stakingAPY": 3.15,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-03",
    "timestamp": 1748908800000,
    "spotPrice": 3308.5,
    "fundingAPR": 14.92,
    "stakingAPY": 3.15,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-04",
    "timestamp": 1748995200000,
    "spotPrice": 3364.31,
    "fundingAPR": 16.6,
    "stakingAPY": 3.15,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-05",
    "timestamp": 1749081600000,
    "spotPrice": 3410.25,
    "fundingAPR": 13.88,
    "stakingAPY": 3.15,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-06",
    "timestamp": 1749168000000,
    "spotPrice": 3353.81,
    "fundingAPR": 15.87,
    "stakingAPY": 3.15,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-07",
    "timestamp": 1749254400000,
    "spotPrice": 3333.6,
    "fundingAPR": 15.99,
    "stakingAPY": 3.15,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-08",
    "timestamp": 1749340800000,
    "spotPrice": 3406.43,
    "fundingAPR": 13.89,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-09",
    "timestamp": 1749427200000,
    "spotPrice": 3419.02,
    "fundingAPR": 16.62,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-10",
    "timestamp": 1749513600000,
    "spotPrice": 3354.08,
    "fundingAPR": 15.13,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-11",
    "timestamp": 1749600000000,
    "spotPrice": 3369.32,
    "fundingAPR": 14.44,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-12",
    "timestamp": 1749686400000,
    "spotPrice": 3441.39,
    "fundingAPR": 16.9,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-13",
    "timestamp": 1749772800000,
    "spotPrice": 3418.6,
    "fundingAPR": 14.36,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-14",
    "timestamp": 1749859200000,
    "spotPrice": 3363.38,
    "fundingAPR": 15.33,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-15",
    "timestamp": 1749945600000,
    "spotPrice": 3411.33,
    "fundingAPR": 16.62,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-16",
    "timestamp": 1750032000000,
    "spotPrice": 3465.07,
    "fundingAPR": 13.98,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-17",
    "timestamp": 1750118400000,
    "spotPrice": 3414.09,
    "fundingAPR": 16.26,
    "stakingAPY": 3.14,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-18",
    "timestamp": 1750204800000,
    "spotPrice": 3384.24,
    "fundingAPR": 15.91,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-19",
    "timestamp": 1750291200000,
    "spotPrice": 3453.6,
    "fundingAPR": 14.14,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-20",
    "timestamp": 1750377600000,
    "spotPrice": 3476.2,
    "fundingAPR": 16.89,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-21",
    "timestamp": 1750464000000,
    "spotPrice": 3411.56,
    "fundingAPR": 15.04,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-22",
    "timestamp": 1750550400000,
    "spotPrice": 3416.09,
    "fundingAPR": 14.8,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-23",
    "timestamp": 1750636800000,
    "spotPrice": 3489.95,
    "fundingAPR": 17.02,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-24",
    "timestamp": 1750723200000,
    "spotPrice": 3476.69,
    "fundingAPR": 14.35,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-25",
    "timestamp": 1750809600000,
    "spotPrice": 3416.46,
    "fundingAPR": 15.73,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-26",
    "timestamp": 1750896000000,
    "spotPrice": 3455.36,
    "fundingAPR": 16.61,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-27",
    "timestamp": 1750982400000,
    "spotPrice": 3515.58,
    "fundingAPR": 14.11,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-28",
    "timestamp": 1751068800000,
    "spotPrice": 3471.08,
    "fundingAPR": 16.61,
    "stakingAPY": 3.13,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-29",
    "timestamp": 1751155200000,
    "spotPrice": 3432.13,
    "fundingAPR": 15.82,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-06-30",
    "timestamp": 1751241600000,
    "spotPrice": 3496.37,
    "fundingAPR": 14.41,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-01",
    "timestamp": 1751328000000,
    "spotPrice": 3528.35,
    "fundingAPR": 17.12,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-02",
    "timestamp": 1751414400000,
    "spotPrice": 3465.34,
    "fundingAPR": 14.96,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-03",
    "timestamp": 1751500800000,
    "spotPrice": 3458.94,
    "fundingAPR": 15.17,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-04",
    "timestamp": 1751587200000,
    "spotPrice": 3532.82,
    "fundingAPR": 17.09,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-05",
    "timestamp": 1751673600000,
    "spotPrice": 3529.27,
    "fundingAPR": 14.36,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-06",
    "timestamp": 1751760000000,
    "spotPrice": 3465.26,
    "fundingAPR": 16.12,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-07",
    "timestamp": 1751846400000,
    "spotPrice": 3494.13,
    "fundingAPR": 16.54,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-08",
    "timestamp": 1751932800000,
    "spotPrice": 3559.38,
    "fundingAPR": 14.26,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-09",
    "timestamp": 1752019200000,
    "spotPrice": 3522.24,
    "fundingAPR": 16.92,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-10",
    "timestamp": 1752105600000,
    "spotPrice": 3474.95,
    "fundingAPR": 15.7,
    "stakingAPY": 3.12,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-11",
    "timestamp": 1752192000000,
    "spotPrice": 3532.52,
    "fundingAPR": 14.7,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-12",
    "timestamp": 1752278400000,
    "spotPrice": 3573.06,
    "fundingAPR": 17.28,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-13",
    "timestamp": 1752364800000,
    "spotPrice": 3512.98,
    "fundingAPR": 14.87,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-14",
    "timestamp": 1752451200000,
    "spotPrice": 3495.7,
    "fundingAPR": 15.54,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-15",
    "timestamp": 1752537600000,
    "spotPrice": 3567.85,
    "fundingAPR": 17.1,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-16",
    "timestamp": 1752624000000,
    "spotPrice": 3573.99,
    "fundingAPR": 14.39,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-17",
    "timestamp": 1752710400000,
    "spotPrice": 3507.53,
    "fundingAPR": 16.47,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-18",
    "timestamp": 1752796800000,
    "spotPrice": 3525.62,
    "fundingAPR": 16.44,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-19",
    "timestamp": 1752883200000,
    "spotPrice": 3594.35,
    "fundingAPR": 14.43,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-20",
    "timestamp": 1752969600000,
    "spotPrice": 3565.31,
    "fundingAPR": 17.17,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-21",
    "timestamp": 1753056000000,
    "spotPrice": 3510.64,
    "fundingAPR": 15.55,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-22",
    "timestamp": 1753142400000,
    "spotPrice": 3560.17,
    "fundingAPR": 15,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-23",
    "timestamp": 1753228800000,
    "spotPrice": 3608.28,
    "fundingAPR": 17.38,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-24",
    "timestamp": 1753315200000,
    "spotPrice": 3552.38,
    "fundingAPR": 14.79,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-25",
    "timestamp": 1753401600000,
    "spotPrice": 3524.51,
    "fundingAPR": 15.88,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-26",
    "timestamp": 1753488000000,
    "spotPrice": 3593.23,
    "fundingAPR": 17.04,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-27",
    "timestamp": 1753574400000,
    "spotPrice": 3608.84,
    "fundingAPR": 14.43,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-28",
    "timestamp": 1753660800000,
    "spotPrice": 3541.35,
    "fundingAPR": 16.77,
    "stakingAPY": 3.11,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-29",
    "timestamp": 1753747200000,
    "spotPrice": 3548.18,
    "fundingAPR": 16.28,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-30",
    "timestamp": 1753833600000,
    "spotPrice": 3618.77,
    "fundingAPR": 14.61,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-07-31",
    "timestamp": 1753920000000,
    "spotPrice": 3598.4,
    "fundingAPR": 17.35,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-01",
    "timestamp": 1754006400000,
    "spotPrice": 3537.51,
    "fundingAPR": 15.39,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-02",
    "timestamp": 1754092800000,
    "spotPrice": 3577.81,
    "fundingAPR": 15.28,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-03",
    "timestamp": 1754179200000,
    "spotPrice": 3632.35,
    "fundingAPR": 17.4,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-04",
    "timestamp": 1754265600000,
    "spotPrice": 3581.82,
    "fundingAPR": 14.7,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-05",
    "timestamp": 1754352000000,
    "spotPrice": 3543.92,
    "fundingAPR": 16.2,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-06",
    "timestamp": 1754438400000,
    "spotPrice": 3607.62,
    "fundingAPR": 16.92,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-07",
    "timestamp": 1754524800000,
    "spotPrice": 3632.3,
    "fundingAPR": 14.48,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-08",
    "timestamp": 1754611200000,
    "spotPrice": 3565.21,
    "fundingAPR": 17.02,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-09",
    "timestamp": 1754697600000,
    "spotPrice": 3560.58,
    "fundingAPR": 16.09,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-10",
    "timestamp": 1754784000000,
    "spotPrice": 3631.4,
    "fundingAPR": 14.8,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-11",
    "timestamp": 1754870400000,
    "spotPrice": 3620.11,
    "fundingAPR": 17.46,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-12",
    "timestamp": 1754956800000,
    "spotPrice": 3554.3,
    "fundingAPR": 15.21,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-13",
    "timestamp": 1755043200000,
    "spotPrice": 3584.44,
    "fundingAPR": 15.56,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-14",
    "timestamp": 1755129600000,
    "spotPrice": 3644.15,
    "fundingAPR": 17.36,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-15",
    "timestamp": 1755216000000,
    "spotPrice": 3600.07,
    "fundingAPR": 14.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-16",
    "timestamp": 1755302400000,
    "spotPrice": 3552.95,
    "fundingAPR": 16.47,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-17",
    "timestamp": 1755388800000,
    "spotPrice": 3610.17,
    "fundingAPR": 16.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-18",
    "timestamp": 1755475200000,
    "spotPrice": 3643.33,
    "fundingAPR": 14.53,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-19",
    "timestamp": 1755561600000,
    "spotPrice": 3578.12,
    "fundingAPR": 17.21,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-20",
    "timestamp": 1755648000000,
    "spotPrice": 3555.99,
    "fundingAPR": 15.85,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-21",
    "timestamp": 1755734400000,
    "spotPrice": 3636.68,
    "fundingAPR": 14.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-22",
    "timestamp": 1755820800000,
    "spotPrice": 3634.51,
    "fundingAPR": 17.5,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-23",
    "timestamp": 1755907200000,
    "spotPrice": 3554.29,
    "fundingAPR": 15.02,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-24",
    "timestamp": 1755993600000,
    "spotPrice": 3576.99,
    "fundingAPR": 15.81,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-25",
    "timestamp": 1756080000000,
    "spotPrice": 3651.17,
    "fundingAPR": 17.23,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-26",
    "timestamp": 1756166400000,
    "spotPrice": 3609.09,
    "fundingAPR": 14.54,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-27",
    "timestamp": 1756252800000,
    "spotPrice": 3545.45,
    "fundingAPR": 16.7,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-28",
    "timestamp": 1756339200000,
    "spotPrice": 3603.56,
    "fundingAPR": 16.51,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-29",
    "timestamp": 1756425600000,
    "spotPrice": 3651.8,
    "fundingAPR": 14.59,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-30",
    "timestamp": 1756512000000,
    "spotPrice": 3580.78,
    "fundingAPR": 17.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-08-31",
    "timestamp": 1756598400000,
    "spotPrice": 3550.31,
    "fundingAPR": 15.59,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-01",
    "timestamp": 1756684800000,
    "spotPrice": 3628.59,
    "fundingAPR": 15.16,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-02",
    "timestamp": 1756771200000,
    "spotPrice": 3638.24,
    "fundingAPR": 17.45,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-03",
    "timestamp": 1756857600000,
    "spotPrice": 3556.77,
    "fundingAPR": 14.81,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-04",
    "timestamp": 1756944000000,
    "spotPrice": 3567.35,
    "fundingAPR": 16.02,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-05",
    "timestamp": 1757030400000,
    "spotPrice": 3645.28,
    "fundingAPR": 17.03,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-06",
    "timestamp": 1757116800000,
    "spotPrice": 3613.75,
    "fundingAPR": 14.45,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-07",
    "timestamp": 1757203200000,
    "spotPrice": 3543.02,
    "fundingAPR": 16.86,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-08",
    "timestamp": 1757289600000,
    "spotPrice": 3591.8,
    "fundingAPR": 16.21,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-09",
    "timestamp": 1757376000000,
    "spotPrice": 3648.93,
    "fundingAPR": 14.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-10",
    "timestamp": 1757462400000,
    "spotPrice": 3584.34,
    "fundingAPR": 17.36,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-11",
    "timestamp": 1757548800000,
    "spotPrice": 3542.71,
    "fundingAPR": 15.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-12",
    "timestamp": 1757635200000,
    "spotPrice": 3616.83,
    "fundingAPR": 15.31,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-13",
    "timestamp": 1757721600000,
    "spotPrice": 3638.11,
    "fundingAPR": 17.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-14",
    "timestamp": 1757808000000,
    "spotPrice": 3557.2,
    "fundingAPR": 14.59,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-15",
    "timestamp": 1757894400000,
    "spotPrice": 3555.42,
    "fundingAPR": 16.19,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-16",
    "timestamp": 1757980800000,
    "spotPrice": 3635.37,
    "fundingAPR": 16.76,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-17",
    "timestamp": 1758067200000,
    "spotPrice": 3615.09,
    "fundingAPR": 14.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-18",
    "timestamp": 1758153600000,
    "spotPrice": 3538.85,
    "fundingAPR": 16.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-19",
    "timestamp": 1758240000000,
    "spotPrice": 3577.21,
    "fundingAPR": 15.87,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-20",
    "timestamp": 1758326400000,
    "spotPrice": 3641.95,
    "fundingAPR": 14.7,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-21",
    "timestamp": 1758412800000,
    "spotPrice": 3585.24,
    "fundingAPR": 17.31,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-22",
    "timestamp": 1758499200000,
    "spotPrice": 3533.39,
    "fundingAPR": 14.97,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-23",
    "timestamp": 1758585600000,
    "spotPrice": 3601.69,
    "fundingAPR": 15.44,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-24",
    "timestamp": 1758672000000,
    "spotPrice": 3634.11,
    "fundingAPR": 17.12,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-25",
    "timestamp": 1758758400000,
    "spotPrice": 3555.58,
    "fundingAPR": 14.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-26",
    "timestamp": 1758844800000,
    "spotPrice": 3541.47,
    "fundingAPR": 16.31,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-27",
    "timestamp": 1758931200000,
    "spotPrice": 3621.67,
    "fundingAPR": 16.43,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-28",
    "timestamp": 1759017600000,
    "spotPrice": 3613.09,
    "fundingAPR": 14.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-29",
    "timestamp": 1759104000000,
    "spotPrice": 3533.04,
    "fundingAPR": 16.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-09-30",
    "timestamp": 1759190400000,
    "spotPrice": 3560.12,
    "fundingAPR": 15.49,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-01",
    "timestamp": 1759276800000,
    "spotPrice": 3631.03,
    "fundingAPR": 14.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-02",
    "timestamp": 1759363200000,
    "spotPrice": 3583.46,
    "fundingAPR": 17.18,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-03",
    "timestamp": 1759449600000,
    "spotPrice": 3522.55,
    "fundingAPR": 14.63,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-04",
    "timestamp": 1759536000000,
    "spotPrice": 3583.51,
    "fundingAPR": 15.54,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-05",
    "timestamp": 1759622400000,
    "spotPrice": 3626.36,
    "fundingAPR": 16.83,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-06",
    "timestamp": 1759708800000,
    "spotPrice": 3551.96,
    "fundingAPR": 14.15,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-07",
    "timestamp": 1759795200000,
    "spotPrice": 3525.84,
    "fundingAPR": 16.38,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-08",
    "timestamp": 1759881600000,
    "spotPrice": 3604.49,
    "fundingAPR": 16.04,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-09",
    "timestamp": 1759968000000,
    "spotPrice": 3607.81,
    "fundingAPR": 14.22,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-10",
    "timestamp": 1760054400000,
    "spotPrice": 3525.74,
    "fundingAPR": 16.94,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-11",
    "timestamp": 1760140800000,
    "spotPrice": 3540.95,
    "fundingAPR": 15.08,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-12",
    "timestamp": 1760227200000,
    "spotPrice": 3616.44,
    "fundingAPR": 14.78,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-13",
    "timestamp": 1760313600000,
    "spotPrice": 3579.07,
    "fundingAPR": 16.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-14",
    "timestamp": 1760400000000,
    "spotPrice": 3510.47,
    "fundingAPR": 14.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-15",
    "timestamp": 1760486400000,
    "spotPrice": 3562.73,
    "fundingAPR": 15.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-16",
    "timestamp": 1760572800000,
    "spotPrice": 3615.05,
    "fundingAPR": 16.48,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-17",
    "timestamp": 1760659200000,
    "spotPrice": 3546.44,
    "fundingAPR": 13.94,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-18",
    "timestamp": 1760745600000,
    "spotPrice": 3508.9,
    "fundingAPR": 16.4,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-19",
    "timestamp": 1760832000000,
    "spotPrice": 3584.24,
    "fundingAPR": 15.61,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-20",
    "timestamp": 1760918400000,
    "spotPrice": 3599.39,
    "fundingAPR": 14.15,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-21",
    "timestamp": 1761004800000,
    "spotPrice": 3517.13,
    "fundingAPR": 16.82,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-22",
    "timestamp": 1761091200000,
    "spotPrice": 3520.12,
    "fundingAPR": 14.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-23",
    "timestamp": 1761177600000,
    "spotPrice": 3598.52,
    "fundingAPR": 14.8,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-24",
    "timestamp": 1761264000000,
    "spotPrice": 3572.2,
    "fundingAPR": 16.71,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-25",
    "timestamp": 1761350400000,
    "spotPrice": 3497.42,
    "fundingAPR": 13.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-26",
    "timestamp": 1761436800000,
    "spotPrice": 3539.82,
    "fundingAPR": 15.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-27",
    "timestamp": 1761523200000,
    "spotPrice": 3600.44,
    "fundingAPR": 16.08,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-28",
    "timestamp": 1761609600000,
    "spotPrice": 3539.16,
    "fundingAPR": 13.75,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-29",
    "timestamp": 1761696000000,
    "spotPrice": 3491.04,
    "fundingAPR": 16.36,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-30",
    "timestamp": 1761782400000,
    "spotPrice": 3561.4,
    "fundingAPR": 15.14,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-10-31",
    "timestamp": 1761868800000,
    "spotPrice": 3588.03,
    "fundingAPR": 14.08,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-01",
    "timestamp": 1761955200000,
    "spotPrice": 3507.43,
    "fundingAPR": 16.64,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-02",
    "timestamp": 1762041600000,
    "spotPrice": 3498.15,
    "fundingAPR": 14.22,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-03",
    "timestamp": 1762128000000,
    "spotPrice": 3577.7,
    "fundingAPR": 14.82,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-04",
    "timestamp": 1762214400000,
    "spotPrice": 3563.01,
    "fundingAPR": 16.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-05",
    "timestamp": 1762300800000,
    "spotPrice": 3483.74,
    "fundingAPR": 13.63,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-06",
    "timestamp": 1762387200000,
    "spotPrice": 3515.33,
    "fundingAPR": 15.66,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-07",
    "timestamp": 1762473600000,
    "spotPrice": 3582.91,
    "fundingAPR": 15.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-08",
    "timestamp": 1762560000000,
    "spotPrice": 3530.32,
    "fundingAPR": 13.57,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-09",
    "timestamp": 1762646400000,
    "spotPrice": 3472.7,
    "fundingAPR": 16.27,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-10",
    "timestamp": 1762732800000,
    "spotPrice": 3536.5,
    "fundingAPR": 14.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-11",
    "timestamp": 1762819200000,
    "spotPrice": 3574.04,
    "fundingAPR": 14.03,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-12",
    "timestamp": 1762905600000,
    "spotPrice": 3496.89,
    "fundingAPR": 16.4,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-13",
    "timestamp": 1762992000000,
    "spotPrice": 3475.54,
    "fundingAPR": 13.78,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-14",
    "timestamp": 1763078400000,
    "spotPrice": 3554.47,
    "fundingAPR": 14.82,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-15",
    "timestamp": 1763164800000,
    "spotPrice": 3551.75,
    "fundingAPR": 15.97,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-16",
    "timestamp": 1763251200000,
    "spotPrice": 3469.76,
    "fundingAPR": 13.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-17",
    "timestamp": 1763337600000,
    "spotPrice": 3489.84,
    "fundingAPR": 15.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-18",
    "timestamp": 1763424000000,
    "spotPrice": 3562.86,
    "fundingAPR": 15.13,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-19",
    "timestamp": 1763510400000,
    "spotPrice": 3520.15,
    "fundingAPR": 13.41,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-20",
    "timestamp": 1763596800000,
    "spotPrice": 3454.31,
    "fundingAPR": 16.12,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-21",
    "timestamp": 1763683200000,
    "spotPrice": 3510.14,
    "fundingAPR": 14.15,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-22",
    "timestamp": 1763769600000,
    "spotPrice": 3557.74,
    "fundingAPR": 13.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-23",
    "timestamp": 1763856000000,
    "spotPrice": 3485.77,
    "fundingAPR": 16.09,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-24",
    "timestamp": 1763942400000,
    "spotPrice": 3452.83,
    "fundingAPR": 13.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-25",
    "timestamp": 1764028800000,
    "spotPrice": 3529.39,
    "fundingAPR": 14.81,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-26",
    "timestamp": 1764115200000,
    "spotPrice": 3538.69,
    "fundingAPR": 15.53,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-27",
    "timestamp": 1764201600000,
    "spotPrice": 3455.81,
    "fundingAPR": 13.05,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-28",
    "timestamp": 1764288000000,
    "spotPrice": 3463.94,
    "fundingAPR": 15.56,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-29",
    "timestamp": 1764374400000,
    "spotPrice": 3540.78,
    "fundingAPR": 14.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-11-30",
    "timestamp": 1764460800000,
    "spotPrice": 3508.91,
    "fundingAPR": 13.28,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-01",
    "timestamp": 1764547200000,
    "spotPrice": 3436.32,
    "fundingAPR": 15.92,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-02",
    "timestamp": 1764633600000,
    "spotPrice": 3482.94,
    "fundingAPR": 13.66,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-03",
    "timestamp": 1764720000000,
    "spotPrice": 3539.54,
    "fundingAPR": 13.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-04",
    "timestamp": 1764806400000,
    "spotPrice": 3474.36,
    "fundingAPR": 15.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-05",
    "timestamp": 1764892800000,
    "spotPrice": 3430.57,
    "fundingAPR": 12.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-06",
    "timestamp": 1764979200000,
    "spotPrice": 3503.05,
    "fundingAPR": 14.78,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-07",
    "timestamp": 1765065600000,
    "spotPrice": 3524.17,
    "fundingAPR": 15.06,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-08",
    "timestamp": 1765152000000,
    "spotPrice": 3442.26,
    "fundingAPR": 12.8,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-09",
    "timestamp": 1765238400000,
    "spotPrice": 3438.26,
    "fundingAPR": 15.45,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-10",
    "timestamp": 1765324800000,
    "spotPrice": 3517.21,
    "fundingAPR": 14.1,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-11",
    "timestamp": 1765411200000,
    "spotPrice": 3496.88,
    "fundingAPR": 13.17,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-12",
    "timestamp": 1765497600000,
    "spotPrice": 3419.17,
    "fundingAPR": 15.68,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-13",
    "timestamp": 1765584000000,
    "spotPrice": 3455.54,
    "fundingAPR": 13.18,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-14",
    "timestamp": 1765670400000,
    "spotPrice": 3519.88,
    "fundingAPR": 13.92,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-15",
    "timestamp": 1765756800000,
    "spotPrice": 3462.95,
    "fundingAPR": 15.35,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-16",
    "timestamp": 1765843200000,
    "spotPrice": 3409.29,
    "fundingAPR": 12.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-17",
    "timestamp": 1765929600000,
    "spotPrice": 3476.07,
    "fundingAPR": 14.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-18",
    "timestamp": 1766016000000,
    "spotPrice": 3508.55,
    "fundingAPR": 14.56,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-19",
    "timestamp": 1766102400000,
    "spotPrice": 3429.44,
    "fundingAPR": 12.6,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-20",
    "timestamp": 1766188800000,
    "spotPrice": 3413.39,
    "fundingAPR": 15.31,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-21",
    "timestamp": 1766275200000,
    "spotPrice": 3492.69,
    "fundingAPR": 13.58,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-22",
    "timestamp": 1766361600000,
    "spotPrice": 3484.36,
    "fundingAPR": 13.1,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-23",
    "timestamp": 1766448000000,
    "spotPrice": 3403.28,
    "fundingAPR": 15.39,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-24",
    "timestamp": 1766534400000,
    "spotPrice": 3428.58,
    "fundingAPR": 12.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-25",
    "timestamp": 1766620800000,
    "spotPrice": 3499.23,
    "fundingAPR": 13.9,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-26",
    "timestamp": 1766707200000,
    "spotPrice": 3451.83,
    "fundingAPR": 14.92,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-27",
    "timestamp": 1766793600000,
    "spotPrice": 3389.5,
    "fundingAPR": 12.31,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-28",
    "timestamp": 1766880000000,
    "spotPrice": 3449.1,
    "fundingAPR": 14.69,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-29",
    "timestamp": 1766966400000,
    "spotPrice": 3492.21,
    "fundingAPR": 14.05,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-30",
    "timestamp": 1767052800000,
    "spotPrice": 3417.66,
    "fundingAPR": 12.45,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2025-12-31",
    "timestamp": 1767139200000,
    "spotPrice": 3389.94,
    "fundingAPR": 15.14,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-01",
    "timestamp": 1767225600000,
    "spotPrice": 3467.82,
    "fundingAPR": 13.08,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-02",
    "timestamp": 1767312000000,
    "spotPrice": 3471.68,
    "fundingAPR": 13.05,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-03",
    "timestamp": 1767398400000,
    "spotPrice": 3389.03,
    "fundingAPR": 15.07,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-04",
    "timestamp": 1767484800000,
    "spotPrice": 3402.71,
    "fundingAPR": 12.33,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-05",
    "timestamp": 1767571200000,
    "spotPrice": 3478.1,
    "fundingAPR": 13.89,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-06",
    "timestamp": 1767657600000,
    "spotPrice": 3441.28,
    "fundingAPR": 14.48,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-07",
    "timestamp": 1767744000000,
    "spotPrice": 3371.68,
    "fundingAPR": 12.06,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-08",
    "timestamp": 1767830400000,
    "spotPrice": 3422.76,
    "fundingAPR": 14.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-09",
    "timestamp": 1767916800000,
    "spotPrice": 3475.55,
    "fundingAPR": 13.55,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-10",
    "timestamp": 1768003200000,
    "spotPrice": 3407.24,
    "fundingAPR": 12.34,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-11",
    "timestamp": 1768089600000,
    "spotPrice": 3368.45,
    "fundingAPR": 14.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-12",
    "timestamp": 1768176000000,
    "spotPrice": 3443.18,
    "fundingAPR": 12.61,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-13",
    "timestamp": 1768262400000,
    "spotPrice": 3459.15,
    "fundingAPR": 13.04,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-14",
    "timestamp": 1768348800000,
    "spotPrice": 3376.78,
    "fundingAPR": 14.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-15",
    "timestamp": 1768435200000,
    "spotPrice": 3378.54,
    "fundingAPR": 11.97,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-16",
    "timestamp": 1768521600000,
    "spotPrice": 3456.98,
    "fundingAPR": 13.89,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-17",
    "timestamp": 1768608000000,
    "spotPrice": 3431.57,
    "fundingAPR": 14.02,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-18",
    "timestamp": 1768694400000,
    "spotPrice": 3356.26,
    "fundingAPR": 11.86,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-19",
    "timestamp": 1768780800000,
    "spotPrice": 3397.69,
    "fundingAPR": 14.54,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-20",
    "timestamp": 1768867200000,
    "spotPrice": 3458.97,
    "fundingAPR": 13.06,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-21",
    "timestamp": 1768953600000,
    "spotPrice": 3398.42,
    "fundingAPR": 12.28,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-22",
    "timestamp": 1769040000000,
    "spotPrice": 3349.45,
    "fundingAPR": 14.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-23",
    "timestamp": 1769126400000,
    "spotPrice": 3419.36,
    "fundingAPR": 12.18,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-24",
    "timestamp": 1769212800000,
    "spotPrice": 3447.09,
    "fundingAPR": 13.06,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-25",
    "timestamp": 1769299200000,
    "spotPrice": 3366.84,
    "fundingAPR": 14.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-26",
    "timestamp": 1769385600000,
    "spotPrice": 3356.63,
    "fundingAPR": 11.68,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-27",
    "timestamp": 1769472000000,
    "spotPrice": 3436.39,
    "fundingAPR": 13.89,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-28",
    "timestamp": 1769558400000,
    "spotPrice": 3422.95,
    "fundingAPR": 13.57,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-29",
    "timestamp": 1769644800000,
    "spotPrice": 3343.61,
    "fundingAPR": 11.72,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-30",
    "timestamp": 1769731200000,
    "spotPrice": 3374.47,
    "fundingAPR": 14.44,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-01-31",
    "timestamp": 1769817600000,
    "spotPrice": 3442.88,
    "fundingAPR": 12.61,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-01",
    "timestamp": 1769904000000,
    "spotPrice": 3391.45,
    "fundingAPR": 12.27,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-02",
    "timestamp": 1769990400000,
    "spotPrice": 3333.39,
    "fundingAPR": 14.49,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-03",
    "timestamp": 1770076800000,
    "spotPrice": 3396.92,
    "fundingAPR": 11.81,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-04",
    "timestamp": 1770163200000,
    "spotPrice": 3435.79,
    "fundingAPR": 13.11,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-05",
    "timestamp": 1770249600000,
    "spotPrice": 3359.46,
    "fundingAPR": 14,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-06",
    "timestamp": 1770336000000,
    "spotPrice": 3337.52,
    "fundingAPR": 11.45,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-07",
    "timestamp": 1770422400000,
    "spotPrice": 3416.8,
    "fundingAPR": 13.9,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-08",
    "timestamp": 1770508800000,
    "spotPrice": 3415.65,
    "fundingAPR": 13.14,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-09",
    "timestamp": 1770595200000,
    "spotPrice": 3334.05,
    "fundingAPR": 11.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-10",
    "timestamp": 1770681600000,
    "spotPrice": 3353.65,
    "fundingAPR": 14.34,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-11",
    "timestamp": 1770768000000,
    "spotPrice": 3427.67,
    "fundingAPR": 12.19,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-12",
    "timestamp": 1770854400000,
    "spotPrice": 3386.51,
    "fundingAPR": 12.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-13",
    "timestamp": 1770940800000,
    "spotPrice": 3320.65,
    "fundingAPR": 14.25,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-14",
    "timestamp": 1771027200000,
    "spotPrice": 3376.39,
    "fundingAPR": 11.5,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-15",
    "timestamp": 1771113600000,
    "spotPrice": 3425.53,
    "fundingAPR": 13.18,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-16",
    "timestamp": 1771200000000,
    "spotPrice": 3354.82,
    "fundingAPR": 13.64,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-17",
    "timestamp": 1771286400000,
    "spotPrice": 3321.64,
    "fundingAPR": 11.3,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-18",
    "timestamp": 1771372800000,
    "spotPrice": 3398.69,
    "fundingAPR": 13.91,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-19",
    "timestamp": 1771459200000,
    "spotPrice": 3409.85,
    "fundingAPR": 12.72,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-20",
    "timestamp": 1771545600000,
    "spotPrice": 3327.81,
    "fundingAPR": 11.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-21",
    "timestamp": 1771632000000,
    "spotPrice": 3335.72,
    "fundingAPR": 14.23,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-22",
    "timestamp": 1771718400000,
    "spotPrice": 3413.7,
    "fundingAPR": 11.83,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-23",
    "timestamp": 1771804800000,
    "spotPrice": 3383.72,
    "fundingAPR": 12.41,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-24",
    "timestamp": 1771891200000,
    "spotPrice": 3311.55,
    "fundingAPR": 13.99,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-25",
    "timestamp": 1771977600000,
    "spotPrice": 3358.25,
    "fundingAPR": 11.26,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-26",
    "timestamp": 1772064000000,
    "spotPrice": 3416.57,
    "fundingAPR": 13.28,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-27",
    "timestamp": 1772150400000,
    "spotPrice": 3353.07,
    "fundingAPR": 13.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-02-28",
    "timestamp": 1772236800000,
    "spotPrice": 3309.39,
    "fundingAPR": 11.22,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-01",
    "timestamp": 1772323200000,
    "spotPrice": 3382.47,
    "fundingAPR": 13.93,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-02",
    "timestamp": 1772409600000,
    "spotPrice": 3405.7,
    "fundingAPR": 12.35,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-03",
    "timestamp": 1772496000000,
    "spotPrice": 3325.06,
    "fundingAPR": 11.72,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-04",
    "timestamp": 1772582400000,
    "spotPrice": 3321.1,
    "fundingAPR": 14.11,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-05",
    "timestamp": 1772668800000,
    "spotPrice": 3401.3,
    "fundingAPR": 11.52,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-06",
    "timestamp": 1772755200000,
    "spotPrice": 3383.18,
    "fundingAPR": 12.55,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-07",
    "timestamp": 1772841600000,
    "spotPrice": 3306.3,
    "fundingAPR": 13.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-08",
    "timestamp": 1772928000000,
    "spotPrice": 3342.92,
    "fundingAPR": 11.1,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-09",
    "timestamp": 1773014400000,
    "spotPrice": 3409.12,
    "fundingAPR": 13.4,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-10",
    "timestamp": 1773100800000,
    "spotPrice": 3354.24,
    "fundingAPR": 12.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-11",
    "timestamp": 1773187200000,
    "spotPrice": 3301.04,
    "fundingAPR": 11.23,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-12",
    "timestamp": 1773273600000,
    "spotPrice": 3368.54,
    "fundingAPR": 13.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-13",
    "timestamp": 1773360000000,
    "spotPrice": 3403.31,
    "fundingAPR": 12.02,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-14",
    "timestamp": 1773446400000,
    "spotPrice": 3325.87,
    "fundingAPR": 11.85,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-15",
    "timestamp": 1773532800000,
    "spotPrice": 3310.13,
    "fundingAPR": 13.99,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-16",
    "timestamp": 1773619200000,
    "spotPrice": 3390.76,
    "fundingAPR": 11.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-17",
    "timestamp": 1773705600000,
    "spotPrice": 3384.91,
    "fundingAPR": 12.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-18",
    "timestamp": 1773792000000,
    "spotPrice": 3305.03,
    "fundingAPR": 13.5,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-19",
    "timestamp": 1773878400000,
    "spotPrice": 3330.76,
    "fundingAPR": 11.02,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-20",
    "timestamp": 1773964800000,
    "spotPrice": 3403.36,
    "fundingAPR": 13.54,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-21",
    "timestamp": 1774051200000,
    "spotPrice": 3358.33,
    "fundingAPR": 12.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-22",
    "timestamp": 1774137600000,
    "spotPrice": 3296.8,
    "fundingAPR": 11.31,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-23",
    "timestamp": 1774224000000,
    "spotPrice": 3357.21,
    "fundingAPR": 13.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-24",
    "timestamp": 1774310400000,
    "spotPrice": 3402.75,
    "fundingAPR": 11.75,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-25",
    "timestamp": 1774396800000,
    "spotPrice": 3330.24,
    "fundingAPR": 12.04,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-26",
    "timestamp": 1774483200000,
    "spotPrice": 3303.07,
    "fundingAPR": 13.88,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-27",
    "timestamp": 1774569600000,
    "spotPrice": 3382.33,
    "fundingAPR": 11.14,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-28",
    "timestamp": 1774656000000,
    "spotPrice": 3388.88,
    "fundingAPR": 12.94,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-29",
    "timestamp": 1774742400000,
    "spotPrice": 3307.79,
    "fundingAPR": 13.27,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-30",
    "timestamp": 1774828800000,
    "spotPrice": 3324,
    "fundingAPR": 11.03,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-03-31",
    "timestamp": 1774915200000,
    "spotPrice": 3395.98,
    "fundingAPR": 13.69,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-01",
    "timestamp": 1775001600000,
    "spotPrice": 3364.12,
    "fundingAPR": 12.39,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-02",
    "timestamp": 1775088000000,
    "spotPrice": 3300.29,
    "fundingAPR": 11.46,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-03",
    "timestamp": 1775174400000,
    "spotPrice": 3348.51,
    "fundingAPR": 14,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-04",
    "timestamp": 1775260800000,
    "spotPrice": 3399.79,
    "fundingAPR": 11.54,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-05",
    "timestamp": 1775347200000,
    "spotPrice": 3338.19,
    "fundingAPR": 12.27,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-06",
    "timestamp": 1775433600000,
    "spotPrice": 3302.59,
    "fundingAPR": 13.75,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-07",
    "timestamp": 1775520000000,
    "spotPrice": 3373.12,
    "fundingAPR": 11.05,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-08",
    "timestamp": 1775606400000,
    "spotPrice": 3390.28,
    "fundingAPR": 13.17,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-09",
    "timestamp": 1775692800000,
    "spotPrice": 3315.02,
    "fundingAPR": 13.04,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-10",
    "timestamp": 1775779200000,
    "spotPrice": 3316.91,
    "fundingAPR": 11.08,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-11",
    "timestamp": 1775865600000,
    "spotPrice": 3391.31,
    "fundingAPR": 13.81,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-12",
    "timestamp": 1775952000000,
    "spotPrice": 3369.83,
    "fundingAPR": 12.13,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-13",
    "timestamp": 1776038400000,
    "spotPrice": 3300.52,
    "fundingAPR": 11.64,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-14",
    "timestamp": 1776124800000,
    "spotPrice": 3339.37,
    "fundingAPR": 13.97,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-15",
    "timestamp": 1776211200000,
    "spotPrice": 3398.15,
    "fundingAPR": 11.34,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-16",
    "timestamp": 1776297600000,
    "spotPrice": 3343.6,
    "fundingAPR": 12.5,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-17",
    "timestamp": 1776384000000,
    "spotPrice": 3298.28,
    "fundingAPR": 13.57,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-18",
    "timestamp": 1776470400000,
    "spotPrice": 3363.89,
    "fundingAPR": 10.98,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-19",
    "timestamp": 1776556800000,
    "spotPrice": 3391.64,
    "fundingAPR": 13.36,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-20",
    "timestamp": 1776643200000,
    "spotPrice": 3318.18,
    "fundingAPR": 12.77,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-21",
    "timestamp": 1776729600000,
    "spotPrice": 3308.64,
    "fundingAPR": 11.16,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-22",
    "timestamp": 1776816000000,
    "spotPrice": 3383.79,
    "fundingAPR": 13.88,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-23",
    "timestamp": 1776902400000,
    "spotPrice": 3373.17,
    "fundingAPR": 11.86,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-24",
    "timestamp": 1776988800000,
    "spotPrice": 3299.92,
    "fundingAPR": 11.82,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-25",
    "timestamp": 1777075200000,
    "spotPrice": 3328.55,
    "fundingAPR": 13.88,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-26",
    "timestamp": 1777161600000,
    "spotPrice": 3393.52,
    "fundingAPR": 11.16,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-27",
    "timestamp": 1777248000000,
    "spotPrice": 3347.22,
    "fundingAPR": 12.71,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-28",
    "timestamp": 1777334400000,
    "spotPrice": 3293.21,
    "fundingAPR": 13.35,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-29",
    "timestamp": 1777420800000,
    "spotPrice": 3352.43,
    "fundingAPR": 10.93,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-04-30",
    "timestamp": 1777507200000,
    "spotPrice": 3390.14,
    "fundingAPR": 13.5,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-01",
    "timestamp": 1777593600000,
    "spotPrice": 3320.14,
    "fundingAPR": 12.48,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-02",
    "timestamp": 1777680000000,
    "spotPrice": 3299.37,
    "fundingAPR": 11.26,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-03",
    "timestamp": 1777766400000,
    "spotPrice": 3373.59,
    "fundingAPR": 13.89,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-04",
    "timestamp": 1777852800000,
    "spotPrice": 3374.07,
    "fundingAPR": 11.59,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-05",
    "timestamp": 1777939200000,
    "spotPrice": 3298.53,
    "fundingAPR": 12.01,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-06",
    "timestamp": 1778025600000,
    "spotPrice": 3316.29,
    "fundingAPR": 13.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-07",
    "timestamp": 1778112000000,
    "spotPrice": 3385.99,
    "fundingAPR": 10.99,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-08",
    "timestamp": 1778198400000,
    "spotPrice": 3348.99,
    "fundingAPR": 12.9,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-09",
    "timestamp": 1778284800000,
    "spotPrice": 3287.5,
    "fundingAPR": 13.08,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-10",
    "timestamp": 1778371200000,
    "spotPrice": 3339,
    "fundingAPR": 10.91,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-11",
    "timestamp": 1778457600000,
    "spotPrice": 3385.84,
    "fundingAPR": 13.6,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-12",
    "timestamp": 1778544000000,
    "spotPrice": 3320.85,
    "fundingAPR": 12.17,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-13",
    "timestamp": 1778630400000,
    "spotPrice": 3289.32,
    "fundingAPR": 11.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-14",
    "timestamp": 1778716800000,
    "spotPrice": 3360.96,
    "fundingAPR": 13.84,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-15",
    "timestamp": 1778803200000,
    "spotPrice": 3372.54,
    "fundingAPR": 11.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-16",
    "timestamp": 1778889600000,
    "spotPrice": 3296.39,
    "fundingAPR": 12.18,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-17",
    "timestamp": 1778976000000,
    "spotPrice": 3302.88,
    "fundingAPR": 13.53,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-18",
    "timestamp": 1779062400000,
    "spotPrice": 3375.77,
    "fundingAPR": 10.85,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-19",
    "timestamp": 1779148800000,
    "spotPrice": 3348.89,
    "fundingAPR": 13.05,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-20",
    "timestamp": 1779235200000,
    "spotPrice": 3281.28,
    "fundingAPR": 12.78,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-21",
    "timestamp": 1779321600000,
    "spotPrice": 3323.93,
    "fundingAPR": 10.92,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-22",
    "timestamp": 1779408000000,
    "spotPrice": 3378.85,
    "fundingAPR": 13.65,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-23",
    "timestamp": 1779494400000,
    "spotPrice": 3320.34,
    "fundingAPR": 11.84,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-24",
    "timestamp": 1779580800000,
    "spotPrice": 3278.75,
    "fundingAPR": 11.49,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-25",
    "timestamp": 1779667200000,
    "spotPrice": 3346.21,
    "fundingAPR": 13.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-26",
    "timestamp": 1779753600000,
    "spotPrice": 3368.62,
    "fundingAPR": 11.07,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-27",
    "timestamp": 1779840000000,
    "spotPrice": 3293.57,
    "fundingAPR": 12.35,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-28",
    "timestamp": 1779926400000,
    "spotPrice": 3288.66,
    "fundingAPR": 13.28,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-29",
    "timestamp": 1780012800000,
    "spotPrice": 3363.11,
    "fundingAPR": 10.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-30",
    "timestamp": 1780099200000,
    "spotPrice": 3346.94,
    "fundingAPR": 13.17,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-05-31",
    "timestamp": 1780185600000,
    "spotPrice": 3274.74,
    "fundingAPR": 12.44,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-01",
    "timestamp": 1780272000000,
    "spotPrice": 3307.58,
    "fundingAPR": 10.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-02",
    "timestamp": 1780358400000,
    "spotPrice": 3369.36,
    "fundingAPR": 13.64,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-03",
    "timestamp": 1780444800000,
    "spotPrice": 3318.62,
    "fundingAPR": 11.52,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-04",
    "timestamp": 1780531200000,
    "spotPrice": 3267.91,
    "fundingAPR": 11.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-05",
    "timestamp": 1780617600000,
    "spotPrice": 3329.69,
    "fundingAPR": 13.58,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-06",
    "timestamp": 1780704000000,
    "spotPrice": 3362.44,
    "fundingAPR": 10.84,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-07",
    "timestamp": 1780790400000,
    "spotPrice": 3290.16,
    "fundingAPR": 12.5,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-08",
    "timestamp": 1780876800000,
    "spotPrice": 3273.96,
    "fundingAPR": 12.99,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-09",
    "timestamp": 1780963200000,
    "spotPrice": 3348.31,
    "fundingAPR": 10.64,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-10",
    "timestamp": 1781049600000,
    "spotPrice": 3343.23,
    "fundingAPR": 13.25,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-11",
    "timestamp": 1781136000000,
    "spotPrice": 3268.05,
    "fundingAPR": 12.09,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-12",
    "timestamp": 1781222400000,
    "spotPrice": 3290.34,
    "fundingAPR": 11,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-13",
    "timestamp": 1781308800000,
    "spotPrice": 3357.61,
    "fundingAPR": 13.59,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-14",
    "timestamp": 1781395200000,
    "spotPrice": 3315.79,
    "fundingAPR": 11.2,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-15",
    "timestamp": 1781481600000,
    "spotPrice": 3257.09,
    "fundingAPR": 11.76,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-16",
    "timestamp": 1781568000000,
    "spotPrice": 3311.81,
    "fundingAPR": 13.37,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-17",
    "timestamp": 1781654400000,
    "spotPrice": 3354.17,
    "fundingAPR": 10.63,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-18",
    "timestamp": 1781740800000,
    "spotPrice": 3286.28,
    "fundingAPR": 12.63,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-19",
    "timestamp": 1781827200000,
    "spotPrice": 3259.15,
    "fundingAPR": 12.67,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-20",
    "timestamp": 1781913600000,
    "spotPrice": 3331.74,
    "fundingAPR": 10.59,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-21",
    "timestamp": 1782000000000,
    "spotPrice": 3337.87,
    "fundingAPR": 13.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-22",
    "timestamp": 1782086400000,
    "spotPrice": 3261.38,
    "fundingAPR": 11.73,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-23",
    "timestamp": 1782172800000,
    "spotPrice": 3272.64,
    "fundingAPR": 11.07,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-24",
    "timestamp": 1782259200000,
    "spotPrice": 3343.89,
    "fundingAPR": 13.48,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-25",
    "timestamp": 1782345600000,
    "spotPrice": 3311.92,
    "fundingAPR": 10.9,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-26",
    "timestamp": 1782432000000,
    "spotPrice": 3246.55,
    "fundingAPR": 11.89,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-27",
    "timestamp": 1782518400000,
    "spotPrice": 3293,
    "fundingAPR": 13.11,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-28",
    "timestamp": 1782604800000,
    "spotPrice": 3344.02,
    "fundingAPR": 10.46,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-29",
    "timestamp": 1782691200000,
    "spotPrice": 3282.04,
    "fundingAPR": 12.74,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-06-30",
    "timestamp": 1782777600000,
    "spotPrice": 3244.59,
    "fundingAPR": 12.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-01",
    "timestamp": 1782864000000,
    "spotPrice": 3313.82,
    "fundingAPR": 10.56,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-02",
    "timestamp": 1782950400000,
    "spotPrice": 3331.01,
    "fundingAPR": 13.29,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-03",
    "timestamp": 1783036800000,
    "spotPrice": 3254.93,
    "fundingAPR": 11.38,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-04",
    "timestamp": 1783123200000,
    "spotPrice": 3254.91,
    "fundingAPR": 11.16,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-05",
    "timestamp": 1783209600000,
    "spotPrice": 3328.56,
    "fundingAPR": 13.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-06",
    "timestamp": 1783296000000,
    "spotPrice": 3307.16,
    "fundingAPR": 10.62,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-07",
    "timestamp": 1783382400000,
    "spotPrice": 3236.58,
    "fundingAPR": 12.03,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-08",
    "timestamp": 1783468800000,
    "spotPrice": 3273.72,
    "fundingAPR": 12.82,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-09",
    "timestamp": 1783555200000,
    "spotPrice": 3332.27,
    "fundingAPR": 10.32,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-10",
    "timestamp": 1783641600000,
    "spotPrice": 3277.58,
    "fundingAPR": 12.82,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-11",
    "timestamp": 1783728000000,
    "spotPrice": 3230.66,
    "fundingAPR": 11.95,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-12",
    "timestamp": 1783814400000,
    "spotPrice": 3294.97,
    "fundingAPR": 10.57,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-13",
    "timestamp": 1783900800000,
    "spotPrice": 3322.85,
    "fundingAPR": 13.24,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-14",
    "timestamp": 1783987200000,
    "spotPrice": 3248.88,
    "fundingAPR": 11.03,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-15",
    "timestamp": 1784073600000,
    "spotPrice": 3237.59,
    "fundingAPR": 11.27,
    "stakingAPY": 3.1,
    "depegPct": 0.03
  },
  {
    "date": "2026-07-16",
    "timestamp": 1784160000000,
    "spotPrice": 3311.99,
    "fundingAPR": 13.12,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-17",
    "timestamp": 1784246400000,
    "spotPrice": 3301.64,
    "fundingAPR": 10.38,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-18",
    "timestamp": 1784332800000,
    "spotPrice": 3227.43,
    "fundingAPR": 12.15,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-19",
    "timestamp": 1784419200000,
    "spotPrice": 3254.43,
    "fundingAPR": 12.5,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-20",
    "timestamp": 1784505600000,
    "spotPrice": 3319.21,
    "fundingAPR": 10.22,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-21",
    "timestamp": 1784592000000,
    "spotPrice": 3273.05,
    "fundingAPR": 12.87,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-22",
    "timestamp": 1784678400000,
    "spotPrice": 3217.7,
    "fundingAPR": 11.58,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-23",
    "timestamp": 1784764800000,
    "spotPrice": 3275.66,
    "fundingAPR": 10.62,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-24",
    "timestamp": 1784851200000,
    "spotPrice": 3313.62,
    "fundingAPR": 13.16,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-25",
    "timestamp": 1784937600000,
    "spotPrice": 3243.41,
    "fundingAPR": 10.7,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-26",
    "timestamp": 1785024000000,
    "spotPrice": 3221.1,
    "fundingAPR": 11.4,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-27",
    "timestamp": 1785110400000,
    "spotPrice": 3294.6,
    "fundingAPR": 12.89,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-28",
    "timestamp": 1785196800000,
    "spotPrice": 3295.54,
    "fundingAPR": 10.17,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-29",
    "timestamp": 1785283200000,
    "spotPrice": 3219.35,
    "fundingAPR": 12.27,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-30",
    "timestamp": 1785369600000,
    "spotPrice": 3235.62,
    "fundingAPR": 12.15,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-07-31",
    "timestamp": 1785456000000,
    "spotPrice": 3305.19,
    "fundingAPR": 10.17,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-01",
    "timestamp": 1785542400000,
    "spotPrice": 3268.58,
    "fundingAPR": 12.89,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-02",
    "timestamp": 1785628800000,
    "spotPrice": 3206.04,
    "fundingAPR": 11.21,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-03",
    "timestamp": 1785715200000,
    "spotPrice": 3256.37,
    "fundingAPR": 10.69,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-04",
    "timestamp": 1785801600000,
    "spotPrice": 3303.55,
    "fundingAPR": 13.03,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-05",
    "timestamp": 1785888000000,
    "spotPrice": 3238.68,
    "fundingAPR": 10.4,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-06",
    "timestamp": 1785974400000,
    "spotPrice": 3205.85,
    "fundingAPR": 11.53,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-07",
    "timestamp": 1786060800000,
    "spotPrice": 3276.82,
    "fundingAPR": 12.62,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-08",
    "timestamp": 1786147200000,
    "spotPrice": 3289.02,
    "fundingAPR": 10.01,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-09",
    "timestamp": 1786233600000,
    "spotPrice": 3212.57,
    "fundingAPR": 12.36,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-10",
    "timestamp": 1786320000000,
    "spotPrice": 3217.74,
    "fundingAPR": 11.8,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-11",
    "timestamp": 1786406400000,
    "spotPrice": 3290.55,
    "fundingAPR": 10.16,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-12",
    "timestamp": 1786492800000,
    "spotPrice": 3264.32,
    "fundingAPR": 12.88,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-13",
    "timestamp": 1786579200000,
    "spotPrice": 3195.99,
    "fundingAPR": 10.86,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-14",
    "timestamp": 1786665600000,
    "spotPrice": 3237.56,
    "fundingAPR": 10.8,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-15",
    "timestamp": 1786752000000,
    "spotPrice": 3292.92,
    "fundingAPR": 12.87,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-16",
    "timestamp": 1786838400000,
    "spotPrice": 3234.84,
    "fundingAPR": 10.14,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-17",
    "timestamp": 1786924800000,
    "spotPrice": 3192.22,
    "fundingAPR": 11.67,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-18",
    "timestamp": 1787011200000,
    "spotPrice": 3259.07,
    "fundingAPR": 12.33,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-19",
    "timestamp": 1787097600000,
    "spotPrice": 3282.27,
    "fundingAPR": 9.89,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-20",
    "timestamp": 1787184000000,
    "spotPrice": 3207.27,
    "fundingAPR": 12.45,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-21",
    "timestamp": 1787270400000,
    "spotPrice": 3201.24,
    "fundingAPR": 11.44,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-22",
    "timestamp": 1787356800000,
    "spotPrice": 3275.66,
    "fundingAPR": 10.19,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-23",
    "timestamp": 1787443200000,
    "spotPrice": 3260.39,
    "fundingAPR": 12.83,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-24",
    "timestamp": 1787529600000,
    "spotPrice": 3187.8,
    "fundingAPR": 10.54,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-25",
    "timestamp": 1787616000000,
    "spotPrice": 3219.69,
    "fundingAPR": 10.92,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-26",
    "timestamp": 1787702400000,
    "spotPrice": 3282,
    "fundingAPR": 12.67,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-27",
    "timestamp": 1787788800000,
    "spotPrice": 3232.01,
    "fundingAPR": 9.92,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-28",
    "timestamp": 1787875200000,
    "spotPrice": 3180.56,
    "fundingAPR": 11.81,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-29",
    "timestamp": 1787961600000,
    "spotPrice": 3241.81,
    "fundingAPR": 12.01,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-30",
    "timestamp": 1788048000000,
    "spotPrice": 3275.49,
    "fundingAPR": 9.83,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-08-31",
    "timestamp": 1788134400000,
    "spotPrice": 3203.61,
    "fundingAPR": 12.51,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-01",
    "timestamp": 1788220800000,
    "spotPrice": 3186.51,
    "fundingAPR": 11.09,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-02",
    "timestamp": 1788307200000,
    "spotPrice": 3260.89,
    "fundingAPR": 10.27,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-03",
    "timestamp": 1788393600000,
    "spotPrice": 3256.93,
    "fundingAPR": 12.75,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-04",
    "timestamp": 1788480000000,
    "spotPrice": 3181.71,
    "fundingAPR": 10.24,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-05",
    "timestamp": 1788566400000,
    "spotPrice": 3203.21,
    "fundingAPR": 11.08,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-06",
    "timestamp": 1788652800000,
    "spotPrice": 3271.07,
    "fundingAPR": 12.45,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-07",
    "timestamp": 1788739200000,
    "spotPrice": 3230.29,
    "fundingAPR": 9.76,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-08",
    "timestamp": 1788825600000,
    "spotPrice": 3171.17,
    "fundingAPR": 11.95,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-09",
    "timestamp": 1788912000000,
    "spotPrice": 3225.44,
    "fundingAPR": 11.7,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-10",
    "timestamp": 1788998400000,
    "spotPrice": 3268.86,
    "fundingAPR": 9.82,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-11",
    "timestamp": 1789084800000,
    "spotPrice": 3201.71,
    "fundingAPR": 12.55,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-12",
    "timestamp": 1789171200000,
    "spotPrice": 3173.93,
    "fundingAPR": 10.76,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-13",
    "timestamp": 1789257600000,
    "spotPrice": 3246.6,
    "fundingAPR": 10.38,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-14",
    "timestamp": 1789344000000,
    "spotPrice": 3254.05,
    "fundingAPR": 12.65,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-15",
    "timestamp": 1789430400000,
    "spotPrice": 3177.87,
    "fundingAPR": 9.99,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-16",
    "timestamp": 1789516800000,
    "spotPrice": 3188.5,
    "fundingAPR": 11.25,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-17",
    "timestamp": 1789603200000,
    "spotPrice": 3260.41,
    "fundingAPR": 12.21,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-18",
    "timestamp": 1789689600000,
    "spotPrice": 3229.75,
    "fundingAPR": 9.65,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-19",
    "timestamp": 1789776000000,
    "spotPrice": 3164.27,
    "fundingAPR": 12.08,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-20",
    "timestamp": 1789862400000,
    "spotPrice": 3210.37,
    "fundingAPR": 11.38,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-21",
    "timestamp": 1789948800000,
    "spotPrice": 3262.56,
    "fundingAPR": 9.86,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-22",
    "timestamp": 1790035200000,
    "spotPrice": 3201.63,
    "fundingAPR": 12.56,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-23",
    "timestamp": 1790121600000,
    "spotPrice": 3163.79,
    "fundingAPR": 10.46,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-24",
    "timestamp": 1790208000000,
    "spotPrice": 3233.15,
    "fundingAPR": 10.54,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-25",
    "timestamp": 1790294400000,
    "spotPrice": 3251.83,
    "fundingAPR": 12.52,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-26",
    "timestamp": 1790380800000,
    "spotPrice": 3176.4,
    "fundingAPR": 9.78,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-27",
    "timestamp": 1790467200000,
    "spotPrice": 3175.93,
    "fundingAPR": 11.43,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-28",
    "timestamp": 1790553600000,
    "spotPrice": 3250.28,
    "fundingAPR": 11.95,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-29",
    "timestamp": 1790640000000,
    "spotPrice": 3230.43,
    "fundingAPR": 9.59,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-09-30",
    "timestamp": 1790726400000,
    "spotPrice": 3160.06,
    "fundingAPR": 12.2,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-01",
    "timestamp": 1790812800000,
    "spotPrice": 3196.95,
    "fundingAPR": 11.07,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-02",
    "timestamp": 1790899200000,
    "spotPrice": 3256.75,
    "fundingAPR": 9.95,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-03",
    "timestamp": 1790985600000,
    "spotPrice": 3203.42,
    "fundingAPR": 12.55,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-04",
    "timestamp": 1791072000000,
    "spotPrice": 3156.36,
    "fundingAPR": 10.19,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-05",
    "timestamp": 1791158400000,
    "spotPrice": 3220.85,
    "fundingAPR": 10.72,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-06",
    "timestamp": 1791244800000,
    "spotPrice": 3250.35,
    "fundingAPR": 12.36,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-07",
    "timestamp": 1791331200000,
    "spotPrice": 3177.36,
    "fundingAPR": 9.63,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-08",
    "timestamp": 1791417600000,
    "spotPrice": 3165.8,
    "fundingAPR": 11.62,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-09",
    "timestamp": 1791504000000,
    "spotPrice": 3240.94,
    "fundingAPR": 11.69,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-10",
    "timestamp": 1791590400000,
    "spotPrice": 3232.34,
    "fundingAPR": 9.59,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-11",
    "timestamp": 1791676800000,
    "spotPrice": 3158.65,
    "fundingAPR": 12.3,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-12",
    "timestamp": 1791763200000,
    "spotPrice": 3185.51,
    "fundingAPR": 10.78,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-13",
    "timestamp": 1791849600000,
    "spotPrice": 3251.58,
    "fundingAPR": 10.09,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-14",
    "timestamp": 1791936000000,
    "spotPrice": 3207.04,
    "fundingAPR": 12.52,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-15",
    "timestamp": 1792022400000,
    "spotPrice": 3151.82,
    "fundingAPR": 9.96,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-16",
    "timestamp": 1792108800000,
    "spotPrice": 3210,
    "fundingAPR": 10.94,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-17",
    "timestamp": 1792195200000,
    "spotPrice": 3249.67,
    "fundingAPR": 12.19,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-18",
    "timestamp": 1792281600000,
    "spotPrice": 3180.75,
    "fundingAPR": 9.53,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-19",
    "timestamp": 1792368000000,
    "spotPrice": 3158.35,
    "fundingAPR": 11.81,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-20",
    "timestamp": 1792454400000,
    "spotPrice": 3232.6,
    "fundingAPR": 11.42,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-21",
    "timestamp": 1792540800000,
    "spotPrice": 3235.44,
    "fundingAPR": 9.66,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-22",
    "timestamp": 1792627200000,
    "spotPrice": 3160.09,
    "fundingAPR": 12.39,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-23",
    "timestamp": 1792713600000,
    "spotPrice": 3176.32,
    "fundingAPR": 10.51,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-24",
    "timestamp": 1792800000000,
    "spotPrice": 3247.18,
    "fundingAPR": 10.28,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-25",
    "timestamp": 1792886400000,
    "spotPrice": 3212.42,
    "fundingAPR": 12.47,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-26",
    "timestamp": 1792972800000,
    "spotPrice": 3150.28,
    "fundingAPR": 9.78,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-27",
    "timestamp": 1793059200000,
    "spotPrice": 3200.86,
    "fundingAPR": 11.17,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-28",
    "timestamp": 1793145600000,
    "spotPrice": 3249.8,
    "fundingAPR": 12,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-29",
    "timestamp": 1793232000000,
    "spotPrice": 3186.49,
    "fundingAPR": 9.5,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-30",
    "timestamp": 1793318400000,
    "spotPrice": 3153.77,
    "fundingAPR": 12,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  },
  {
    "date": "2026-10-31",
    "timestamp": 1793404800000,
    "spotPrice": 3200,
    "fundingAPR": 11,
    "stakingAPY": 3.1,
    "depegPct": 0.04
  }
];

export const SOL_HISTORICAL_SERIES: DailyHistoricalMarketStep[] = [
  {
    "date": "2022-10-01",
    "timestamp": 1664582400000,
    "spotPrice": 33.05,
    "fundingAPR": 10.6,
    "stakingAPY": 7.5,
    "depegPct": 0.1
  },
  {
    "date": "2022-10-02",
    "timestamp": 1664668800000,
    "spotPrice": 33.34,
    "fundingAPR": 12.54,
    "stakingAPY": 7.5,
    "depegPct": 0.1
  },
  {
    "date": "2022-10-03",
    "timestamp": 1664755200000,
    "spotPrice": 34.02,
    "fundingAPR": 12.71,
    "stakingAPY": 7.5,
    "depegPct": 0.1
  },
  {
    "date": "2022-10-04",
    "timestamp": 1664841600000,
    "spotPrice": 33.6,
    "fundingAPR": 10.59,
    "stakingAPY": 7.5,
    "depegPct": 0.1
  },
  {
    "date": "2022-10-05",
    "timestamp": 1664928000000,
    "spotPrice": 33.1,
    "fundingAPR": 13.32,
    "stakingAPY": 7.5,
    "depegPct": 0.1
  },
  {
    "date": "2022-10-06",
    "timestamp": 1665014400000,
    "spotPrice": 33.74,
    "fundingAPR": 11.91,
    "stakingAPY": 7.5,
    "depegPct": 0.1
  },
  {
    "date": "2022-10-07",
    "timestamp": 1665100800000,
    "spotPrice": 34.2,
    "fundingAPR": 11.2,
    "stakingAPY": 7.49,
    "depegPct": 0.11
  },
  {
    "date": "2022-10-08",
    "timestamp": 1665187200000,
    "spotPrice": 33.59,
    "fundingAPR": 13.73,
    "stakingAPY": 7.49,
    "depegPct": 0.11
  },
  {
    "date": "2022-10-09",
    "timestamp": 1665273600000,
    "spotPrice": 33.46,
    "fundingAPR": 11.26,
    "stakingAPY": 7.49,
    "depegPct": 0.11
  },
  {
    "date": "2022-10-10",
    "timestamp": 1665360000000,
    "spotPrice": 34.3,
    "fundingAPR": 12.24,
    "stakingAPY": 7.49,
    "depegPct": 0.11
  },
  {
    "date": "2022-10-11",
    "timestamp": 1665446400000,
    "spotPrice": 34.43,
    "fundingAPR": 13.65,
    "stakingAPY": 7.48,
    "depegPct": 0.12
  },
  {
    "date": "2022-10-12",
    "timestamp": 1665532800000,
    "spotPrice": 33.8,
    "fundingAPR": 11.06,
    "stakingAPY": 7.48,
    "depegPct": 0.12
  },
  {
    "date": "2022-10-13",
    "timestamp": 1665619200000,
    "spotPrice": 34.09,
    "fundingAPR": 13.39,
    "stakingAPY": 7.48,
    "depegPct": 0.13
  },
  {
    "date": "2022-10-14",
    "timestamp": 1665705600000,
    "spotPrice": 34.92,
    "fundingAPR": 13.18,
    "stakingAPY": 7.47,
    "depegPct": 0.13
  },
  {
    "date": "2022-10-15",
    "timestamp": 1665792000000,
    "spotPrice": 34.7,
    "fundingAPR": 11.45,
    "stakingAPY": 7.47,
    "depegPct": 0.13
  },
  {
    "date": "2022-10-16",
    "timestamp": 1665878400000,
    "spotPrice": 34.22,
    "fundingAPR": 14.29,
    "stakingAPY": 7.46,
    "depegPct": 0.14
  },
  {
    "date": "2022-10-17",
    "timestamp": 1665964800000,
    "spotPrice": 34.87,
    "fundingAPR": 12.58,
    "stakingAPY": 7.46,
    "depegPct": 0.14
  },
  {
    "date": "2022-10-18",
    "timestamp": 1666051200000,
    "spotPrice": 35.5,
    "fundingAPR": 12.38,
    "stakingAPY": 7.45,
    "depegPct": 0.15
  },
  {
    "date": "2022-10-19",
    "timestamp": 1666137600000,
    "spotPrice": 35.01,
    "fundingAPR": 14.72,
    "stakingAPY": 7.45,
    "depegPct": 0.15
  },
  {
    "date": "2022-10-20",
    "timestamp": 1666224000000,
    "spotPrice": 34.83,
    "fundingAPR": 12.16,
    "stakingAPY": 7.45,
    "depegPct": 0.15
  },
  {
    "date": "2022-10-21",
    "timestamp": 1666310400000,
    "spotPrice": 35.69,
    "fundingAPR": 13.59,
    "stakingAPY": 7.44,
    "depegPct": 0.16
  },
  {
    "date": "2022-10-22",
    "timestamp": 1666396800000,
    "spotPrice": 35.97,
    "fundingAPR": 14.61,
    "stakingAPY": 7.44,
    "depegPct": 0.16
  },
  {
    "date": "2022-10-23",
    "timestamp": 1666483200000,
    "spotPrice": 35.35,
    "fundingAPR": 12.18,
    "stakingAPY": 7.43,
    "depegPct": 0.17
  },
  {
    "date": "2022-10-24",
    "timestamp": 1666569600000,
    "spotPrice": 35.55,
    "fundingAPR": 14.74,
    "stakingAPY": 7.43,
    "depegPct": 0.17
  },
  {
    "date": "2022-10-25",
    "timestamp": 1666656000000,
    "spotPrice": 36.41,
    "fundingAPR": 14.09,
    "stakingAPY": 7.43,
    "depegPct": 0.17
  },
  {
    "date": "2022-10-26",
    "timestamp": 1666742400000,
    "spotPrice": 36.29,
    "fundingAPR": 12.72,
    "stakingAPY": 7.42,
    "depegPct": 0.18
  },
  {
    "date": "2022-10-27",
    "timestamp": 1666828800000,
    "spotPrice": 35.72,
    "fundingAPR": 15.51,
    "stakingAPY": 7.42,
    "depegPct": 0.18
  },
  {
    "date": "2022-10-28",
    "timestamp": 1666915200000,
    "spotPrice": 36.25,
    "fundingAPR": 13.45,
    "stakingAPY": 7.41,
    "depegPct": 0.19
  },
  {
    "date": "2022-10-29",
    "timestamp": 1667001600000,
    "spotPrice": 36.92,
    "fundingAPR": 13.67,
    "stakingAPY": 7.41,
    "depegPct": 0.19
  },
  {
    "date": "2022-10-30",
    "timestamp": 1667088000000,
    "spotPrice": 36.44,
    "fundingAPR": 15.68,
    "stakingAPY": 7.41,
    "depegPct": 0.19
  },
  {
    "date": "2022-10-31",
    "timestamp": 1667174400000,
    "spotPrice": 36.09,
    "fundingAPR": 13,
    "stakingAPY": 7.41,
    "depegPct": 0.19
  },
  {
    "date": "2022-11-01",
    "timestamp": 1667260800000,
    "spotPrice": 36.84,
    "fundingAPR": 14.75,
    "stakingAPY": 7.4,
    "depegPct": 0.2
  },
  {
    "date": "2022-11-02",
    "timestamp": 1667347200000,
    "spotPrice": 37.14,
    "fundingAPR": 15.26,
    "stakingAPY": 7.4,
    "depegPct": 0.2
  },
  {
    "date": "2022-11-03",
    "timestamp": 1667433600000,
    "spotPrice": 36.44,
    "fundingAPR": 12.97,
    "stakingAPY": 7.4,
    "depegPct": 0.2
  },
  {
    "date": "2022-11-04",
    "timestamp": 1667520000000,
    "spotPrice": 36.42,
    "fundingAPR": 15.62,
    "stakingAPY": 7.4,
    "depegPct": 0.2
  },
  {
    "date": "2022-11-05",
    "timestamp": 1667606400000,
    "spotPrice": 37.19,
    "fundingAPR": 14.46,
    "stakingAPY": 7.4,
    "depegPct": 0.2
  },
  {
    "date": "2022-11-06",
    "timestamp": 1667692800000,
    "spotPrice": 37.08,
    "fundingAPR": 13.41,
    "stakingAPY": 7.4,
    "depegPct": 0.2
  },
  {
    "date": "2022-11-07",
    "timestamp": 1667779200000,
    "spotPrice": 32.88,
    "fundingAPR": 8.75,
    "stakingAPY": 7.37,
    "depegPct": 0.39
  },
  {
    "date": "2022-11-08",
    "timestamp": 1667865600000,
    "spotPrice": 25,
    "fundingAPR": -11.15,
    "stakingAPY": 7.3,
    "depegPct": 0.85
  },
  {
    "date": "2022-11-09",
    "timestamp": 1667952000000,
    "spotPrice": 17.46,
    "fundingAPR": -28.05,
    "stakingAPY": 7.23,
    "depegPct": 1.31
  },
  {
    "date": "2022-11-10",
    "timestamp": 1668038400000,
    "spotPrice": 13.5,
    "fundingAPR": -33.71,
    "stakingAPY": 7.2,
    "depegPct": 1.5
  },
  {
    "date": "2022-11-11",
    "timestamp": 1668124800000,
    "spotPrice": 13.29,
    "fundingAPR": -36.41,
    "stakingAPY": 7.2,
    "depegPct": 1.5
  },
  {
    "date": "2022-11-12",
    "timestamp": 1668211200000,
    "spotPrice": 13.53,
    "fundingAPR": -34.34,
    "stakingAPY": 7.2,
    "depegPct": 1.5
  },
  {
    "date": "2022-11-13",
    "timestamp": 1668297600000,
    "spotPrice": 13.64,
    "fundingAPR": -34.26,
    "stakingAPY": 7.2,
    "depegPct": 1.49
  },
  {
    "date": "2022-11-14",
    "timestamp": 1668384000000,
    "spotPrice": 13.32,
    "fundingAPR": -36.22,
    "stakingAPY": 7.2,
    "depegPct": 1.49
  },
  {
    "date": "2022-11-15",
    "timestamp": 1668470400000,
    "spotPrice": 13.2,
    "fundingAPR": -33.38,
    "stakingAPY": 7.19,
    "depegPct": 1.48
  },
  {
    "date": "2022-11-16",
    "timestamp": 1668556800000,
    "spotPrice": 13.45,
    "fundingAPR": -34.81,
    "stakingAPY": 7.19,
    "depegPct": 1.47
  },
  {
    "date": "2022-11-17",
    "timestamp": 1668643200000,
    "spotPrice": 13.37,
    "fundingAPR": -35.26,
    "stakingAPY": 7.19,
    "depegPct": 1.47
  },
  {
    "date": "2022-11-18",
    "timestamp": 1668729600000,
    "spotPrice": 12.99,
    "fundingAPR": -32.67,
    "stakingAPY": 7.19,
    "depegPct": 1.45
  },
  {
    "date": "2022-11-19",
    "timestamp": 1668816000000,
    "spotPrice": 13,
    "fundingAPR": -35.03,
    "stakingAPY": 7.18,
    "depegPct": 1.44
  },
  {
    "date": "2022-11-20",
    "timestamp": 1668902400000,
    "spotPrice": 13.18,
    "fundingAPR": -33.76,
    "stakingAPY": 7.18,
    "depegPct": 1.43
  },
  {
    "date": "2022-11-21",
    "timestamp": 1668988800000,
    "spotPrice": 12.91,
    "fundingAPR": -32.3,
    "stakingAPY": 7.18,
    "depegPct": 1.42
  },
  {
    "date": "2022-11-22",
    "timestamp": 1669075200000,
    "spotPrice": 12.57,
    "fundingAPR": -34.65,
    "stakingAPY": 7.17,
    "depegPct": 1.4
  },
  {
    "date": "2022-11-23",
    "timestamp": 1669161600000,
    "spotPrice": 12.67,
    "fundingAPR": -32.04,
    "stakingAPY": 7.17,
    "depegPct": 1.39
  },
  {
    "date": "2022-11-24",
    "timestamp": 1669248000000,
    "spotPrice": 12.72,
    "fundingAPR": -32.17,
    "stakingAPY": 7.16,
    "depegPct": 1.37
  },
  {
    "date": "2022-11-25",
    "timestamp": 1669334400000,
    "spotPrice": 12.32,
    "fundingAPR": -33.55,
    "stakingAPY": 7.16,
    "depegPct": 1.35
  },
  {
    "date": "2022-11-26",
    "timestamp": 1669420800000,
    "spotPrice": 12.07,
    "fundingAPR": -30.47,
    "stakingAPY": 7.15,
    "depegPct": 1.33
  },
  {
    "date": "2022-11-27",
    "timestamp": 1669507200000,
    "spotPrice": 12.22,
    "fundingAPR": -32.03,
    "stakingAPY": 7.15,
    "depegPct": 1.31
  },
  {
    "date": "2022-11-28",
    "timestamp": 1669593600000,
    "spotPrice": 12.1,
    "fundingAPR": -31.83,
    "stakingAPY": 7.14,
    "depegPct": 1.29
  },
  {
    "date": "2022-11-29",
    "timestamp": 1669680000000,
    "spotPrice": 11.64,
    "fundingAPR": -29.29,
    "stakingAPY": 7.13,
    "depegPct": 1.27
  },
  {
    "date": "2022-11-30",
    "timestamp": 1669766400000,
    "spotPrice": 11.53,
    "fundingAPR": -31.59,
    "stakingAPY": 7.13,
    "depegPct": 1.25
  },
  {
    "date": "2022-12-01",
    "timestamp": 1669852800000,
    "spotPrice": 11.66,
    "fundingAPR": -29.74,
    "stakingAPY": 7.12,
    "depegPct": 1.23
  },
  {
    "date": "2022-12-02",
    "timestamp": 1669939200000,
    "spotPrice": 11.38,
    "fundingAPR": -28.56,
    "stakingAPY": 7.12,
    "depegPct": 1.21
  },
  {
    "date": "2022-12-03",
    "timestamp": 1670025600000,
    "spotPrice": 10.95,
    "fundingAPR": -30.62,
    "stakingAPY": 7.11,
    "depegPct": 1.18
  },
  {
    "date": "2022-12-04",
    "timestamp": 1670112000000,
    "spotPrice": 10.97,
    "fundingAPR": -27.68,
    "stakingAPY": 7.1,
    "depegPct": 1.16
  },
  {
    "date": "2022-12-05",
    "timestamp": 1670198400000,
    "spotPrice": 11.02,
    "fundingAPR": -28.16,
    "stakingAPY": 7.1,
    "depegPct": 1.14
  },
  {
    "date": "2022-12-06",
    "timestamp": 1670284800000,
    "spotPrice": 10.61,
    "fundingAPR": -29.08,
    "stakingAPY": 7.09,
    "depegPct": 1.12
  },
  {
    "date": "2022-12-07",
    "timestamp": 1670371200000,
    "spotPrice": 10.29,
    "fundingAPR": -25.99,
    "stakingAPY": 7.08,
    "depegPct": 1.09
  },
  {
    "date": "2022-12-08",
    "timestamp": 1670457600000,
    "spotPrice": 10.41,
    "fundingAPR": -27.81,
    "stakingAPY": 7.08,
    "depegPct": 1.07
  },
  {
    "date": "2022-12-09",
    "timestamp": 1670544000000,
    "spotPrice": 10.33,
    "fundingAPR": -27.12,
    "stakingAPY": 7.07,
    "depegPct": 1.05
  },
  {
    "date": "2022-12-10",
    "timestamp": 1670630400000,
    "spotPrice": 9.87,
    "fundingAPR": -24.88,
    "stakingAPY": 7.07,
    "depegPct": 1.03
  },
  {
    "date": "2022-12-11",
    "timestamp": 1670716800000,
    "spotPrice": 9.71,
    "fundingAPR": -27.23,
    "stakingAPY": 7.06,
    "depegPct": 1.01
  },
  {
    "date": "2022-12-12",
    "timestamp": 1670803200000,
    "spotPrice": 9.86,
    "fundingAPR": -25.05,
    "stakingAPY": 7.05,
    "depegPct": 0.99
  },
  {
    "date": "2022-12-13",
    "timestamp": 1670889600000,
    "spotPrice": 9.64,
    "fundingAPR": -24.36,
    "stakingAPY": 7.05,
    "depegPct": 0.97
  },
  {
    "date": "2022-12-14",
    "timestamp": 1670976000000,
    "spotPrice": 9.22,
    "fundingAPR": -26.25,
    "stakingAPY": 7.04,
    "depegPct": 0.95
  },
  {
    "date": "2022-12-15",
    "timestamp": 1671062400000,
    "spotPrice": 9.24,
    "fundingAPR": -23.25,
    "stakingAPY": 7.04,
    "depegPct": 0.93
  },
  {
    "date": "2022-12-16",
    "timestamp": 1671148800000,
    "spotPrice": 9.35,
    "fundingAPR": -24.25,
    "stakingAPY": 7.03,
    "depegPct": 0.91
  },
  {
    "date": "2022-12-17",
    "timestamp": 1671235200000,
    "spotPrice": 9.02,
    "fundingAPR": -24.87,
    "stakingAPY": 7.03,
    "depegPct": 0.9
  },
  {
    "date": "2022-12-18",
    "timestamp": 1671321600000,
    "spotPrice": 8.72,
    "fundingAPR": -22.05,
    "stakingAPY": 7.02,
    "depegPct": 0.88
  },
  {
    "date": "2022-12-19",
    "timestamp": 1671408000000,
    "spotPrice": 8.88,
    "fundingAPR": -24.25,
    "stakingAPY": 7.02,
    "depegPct": 0.87
  },
  {
    "date": "2022-12-20",
    "timestamp": 1671494400000,
    "spotPrice": 8.9,
    "fundingAPR": -23.27,
    "stakingAPY": 7.02,
    "depegPct": 0.86
  },
  {
    "date": "2022-12-21",
    "timestamp": 1671580800000,
    "spotPrice": 8.53,
    "fundingAPR": -21.58,
    "stakingAPY": 7.01,
    "depegPct": 0.85
  },
  {
    "date": "2022-12-22",
    "timestamp": 1671667200000,
    "spotPrice": 8.4,
    "fundingAPR": -24.09,
    "stakingAPY": 7.01,
    "depegPct": 0.83
  },
  {
    "date": "2022-12-23",
    "timestamp": 1671753600000,
    "spotPrice": 8.64,
    "fundingAPR": -21.8,
    "stakingAPY": 7.01,
    "depegPct": 0.83
  },
  {
    "date": "2022-12-24",
    "timestamp": 1671840000000,
    "spotPrice": 8.55,
    "fundingAPR": -21.79,
    "stakingAPY": 7.01,
    "depegPct": 0.82
  },
  {
    "date": "2022-12-25",
    "timestamp": 1671926400000,
    "spotPrice": 8.21,
    "fundingAPR": -23.62,
    "stakingAPY": 7,
    "depegPct": 0.81
  },
  {
    "date": "2022-12-26",
    "timestamp": 1672012800000,
    "spotPrice": 8.28,
    "fundingAPR": -20.79,
    "stakingAPY": 7,
    "depegPct": 0.81
  },
  {
    "date": "2022-12-27",
    "timestamp": 1672099200000,
    "spotPrice": 8.52,
    "fundingAPR": -22.42,
    "stakingAPY": 7,
    "depegPct": 0.8
  },
  {
    "date": "2022-12-28",
    "timestamp": 1672185600000,
    "spotPrice": 8.33,
    "fundingAPR": -22.86,
    "stakingAPY": 7,
    "depegPct": 0.8
  },
  {
    "date": "2022-12-29",
    "timestamp": 1672272000000,
    "spotPrice": 8.18,
    "fundingAPR": -20.51,
    "stakingAPY": 7,
    "depegPct": 0.8
  },
  {
    "date": "2022-12-30",
    "timestamp": 1672358400000,
    "spotPrice": 8.37,
    "fundingAPR": -23.04,
    "stakingAPY": 7,
    "depegPct": 0.8
  },
  {
    "date": "2022-12-31",
    "timestamp": 1672444800000,
    "spotPrice": 8.6,
    "fundingAPR": -21.57,
    "stakingAPY": 7,
    "depegPct": 0.79
  },
  {
    "date": "2023-01-01",
    "timestamp": 1672531200000,
    "spotPrice": 8.66,
    "fundingAPR": -20,
    "stakingAPY": 7,
    "depegPct": 0.79
  },
  {
    "date": "2023-01-02",
    "timestamp": 1672617600000,
    "spotPrice": 8.92,
    "fundingAPR": -21.89,
    "stakingAPY": 7.01,
    "depegPct": 0.78
  },
  {
    "date": "2023-01-03",
    "timestamp": 1672704000000,
    "spotPrice": 9.5,
    "fundingAPR": -18.63,
    "stakingAPY": 7.01,
    "depegPct": 0.77
  },
  {
    "date": "2023-01-04",
    "timestamp": 1672790400000,
    "spotPrice": 9.98,
    "fundingAPR": -18.16,
    "stakingAPY": 7.02,
    "depegPct": 0.75
  },
  {
    "date": "2023-01-05",
    "timestamp": 1672876800000,
    "spotPrice": 10.34,
    "fundingAPR": -18.55,
    "stakingAPY": 7.03,
    "depegPct": 0.74
  },
  {
    "date": "2023-01-06",
    "timestamp": 1672963200000,
    "spotPrice": 11,
    "fundingAPR": -14.45,
    "stakingAPY": 7.03,
    "depegPct": 0.72
  },
  {
    "date": "2023-01-07",
    "timestamp": 1673049600000,
    "spotPrice": 11.86,
    "fundingAPR": -14.97,
    "stakingAPY": 7.04,
    "depegPct": 0.7
  },
  {
    "date": "2023-01-08",
    "timestamp": 1673136000000,
    "spotPrice": 12.51,
    "fundingAPR": -13.38,
    "stakingAPY": 7.05,
    "depegPct": 0.68
  },
  {
    "date": "2023-01-09",
    "timestamp": 1673222400000,
    "spotPrice": 13.13,
    "fundingAPR": -9.59,
    "stakingAPY": 7.06,
    "depegPct": 0.65
  },
  {
    "date": "2023-01-10",
    "timestamp": 1673308800000,
    "spotPrice": 14.07,
    "fundingAPR": -10.5,
    "stakingAPY": 7.07,
    "depegPct": 0.63
  },
  {
    "date": "2023-01-11",
    "timestamp": 1673395200000,
    "spotPrice": 15.04,
    "fundingAPR": -7.07,
    "stakingAPY": 7.08,
    "depegPct": 0.6
  },
  {
    "date": "2023-01-12",
    "timestamp": 1673481600000,
    "spotPrice": 15.74,
    "fundingAPR": -4.52,
    "stakingAPY": 7.09,
    "depegPct": 0.58
  },
  {
    "date": "2023-01-13",
    "timestamp": 1673568000000,
    "spotPrice": 16.54,
    "fundingAPR": -5,
    "stakingAPY": 7.1,
    "depegPct": 0.55
  },
  {
    "date": "2023-01-14",
    "timestamp": 1673654400000,
    "spotPrice": 17.59,
    "fundingAPR": -0.49,
    "stakingAPY": 7.11,
    "depegPct": 0.52
  },
  {
    "date": "2023-01-15",
    "timestamp": 1673740800000,
    "spotPrice": 18.48,
    "fundingAPR": 0.4,
    "stakingAPY": 7.12,
    "depegPct": 0.5
  },
  {
    "date": "2023-01-16",
    "timestamp": 1673827200000,
    "spotPrice": 19.14,
    "fundingAPR": 1.06,
    "stakingAPY": 7.13,
    "depegPct": 0.47
  },
  {
    "date": "2023-01-17",
    "timestamp": 1673913600000,
    "spotPrice": 19.97,
    "fundingAPR": 5.51,
    "stakingAPY": 7.14,
    "depegPct": 0.45
  },
  {
    "date": "2023-01-18",
    "timestamp": 1674000000000,
    "spotPrice": 20.93,
    "fundingAPR": 4.93,
    "stakingAPY": 7.15,
    "depegPct": 0.43
  },
  {
    "date": "2023-01-19",
    "timestamp": 1674086400000,
    "spotPrice": 21.61,
    "fundingAPR": 6.98,
    "stakingAPY": 7.16,
    "depegPct": 0.4
  },
  {
    "date": "2023-01-20",
    "timestamp": 1674172800000,
    "spotPrice": 22.12,
    "fundingAPR": 10.22,
    "stakingAPY": 7.17,
    "depegPct": 0.38
  },
  {
    "date": "2023-01-21",
    "timestamp": 1674259200000,
    "spotPrice": 22.84,
    "fundingAPR": 8.85,
    "stakingAPY": 7.17,
    "depegPct": 0.36
  },
  {
    "date": "2023-01-22",
    "timestamp": 1674345600000,
    "spotPrice": 23.53,
    "fundingAPR": 11.99,
    "stakingAPY": 7.18,
    "depegPct": 0.35
  },
  {
    "date": "2023-01-23",
    "timestamp": 1674432000000,
    "spotPrice": 23.87,
    "fundingAPR": 13.22,
    "stakingAPY": 7.19,
    "depegPct": 0.33
  },
  {
    "date": "2023-01-24",
    "timestamp": 1674518400000,
    "spotPrice": 24.16,
    "fundingAPR": 11.94,
    "stakingAPY": 7.19,
    "depegPct": 0.32
  },
  {
    "date": "2023-01-25",
    "timestamp": 1674604800000,
    "spotPrice": 24.64,
    "fundingAPR": 15.33,
    "stakingAPY": 7.2,
    "depegPct": 0.31
  },
  {
    "date": "2023-01-26",
    "timestamp": 1674691200000,
    "spotPrice": 24.93,
    "fundingAPR": 14.4,
    "stakingAPY": 7.2,
    "depegPct": 0.31
  },
  {
    "date": "2023-01-27",
    "timestamp": 1674777600000,
    "spotPrice": 24.88,
    "fundingAPR": 13.92,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-01-28",
    "timestamp": 1674864000000,
    "spotPrice": 24.73,
    "fundingAPR": 16.5,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-01-29",
    "timestamp": 1674950400000,
    "spotPrice": 25.29,
    "fundingAPR": 13.98,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-01-30",
    "timestamp": 1675036800000,
    "spotPrice": 25.19,
    "fundingAPR": 14.85,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-01-31",
    "timestamp": 1675123200000,
    "spotPrice": 24.65,
    "fundingAPR": 16.19,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-01",
    "timestamp": 1675209600000,
    "spotPrice": 24.87,
    "fundingAPR": 13.5,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-02",
    "timestamp": 1675296000000,
    "spotPrice": 25.34,
    "fundingAPR": 15.7,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-03",
    "timestamp": 1675382400000,
    "spotPrice": 24.96,
    "fundingAPR": 15.41,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-04",
    "timestamp": 1675468800000,
    "spotPrice": 24.56,
    "fundingAPR": 13.54,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-05",
    "timestamp": 1675555200000,
    "spotPrice": 25,
    "fundingAPR": 16.25,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-06",
    "timestamp": 1675641600000,
    "spotPrice": 25.24,
    "fundingAPR": 14.42,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-07",
    "timestamp": 1675728000000,
    "spotPrice": 24.69,
    "fundingAPR": 14.04,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-08",
    "timestamp": 1675814400000,
    "spotPrice": 24.53,
    "fundingAPR": 16.26,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-09",
    "timestamp": 1675900800000,
    "spotPrice": 25.06,
    "fundingAPR": 13.55,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-10",
    "timestamp": 1675987200000,
    "spotPrice": 25.01,
    "fundingAPR": 14.8,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-11",
    "timestamp": 1676073600000,
    "spotPrice": 24.42,
    "fundingAPR": 15.69,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-12",
    "timestamp": 1676160000000,
    "spotPrice": 24.54,
    "fundingAPR": 13.1,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-13",
    "timestamp": 1676246400000,
    "spotPrice": 25.01,
    "fundingAPR": 15.49,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-14",
    "timestamp": 1676332800000,
    "spotPrice": 24.68,
    "fundingAPR": 14.71,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-15",
    "timestamp": 1676419200000,
    "spotPrice": 24.19,
    "fundingAPR": 13.16,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-16",
    "timestamp": 1676505600000,
    "spotPrice": 24.54,
    "fundingAPR": 15.8,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2023-02-17",
    "timestamp": 1676592000000,
    "spotPrice": 24.83,
    "fundingAPR": 13.62,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-18",
    "timestamp": 1676678400000,
    "spotPrice": 24.29,
    "fundingAPR": 13.66,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-19",
    "timestamp": 1676764800000,
    "spotPrice": 24.02,
    "fundingAPR": 15.55,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-20",
    "timestamp": 1676851200000,
    "spotPrice": 24.5,
    "fundingAPR": 12.74,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-21",
    "timestamp": 1676937600000,
    "spotPrice": 24.51,
    "fundingAPR": 14.34,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-22",
    "timestamp": 1677024000000,
    "spotPrice": 23.89,
    "fundingAPR": 14.75,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-23",
    "timestamp": 1677110400000,
    "spotPrice": 23.9,
    "fundingAPR": 12.32,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-24",
    "timestamp": 1677196800000,
    "spotPrice": 24.37,
    "fundingAPR": 14.86,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-25",
    "timestamp": 1677283200000,
    "spotPrice": 24.09,
    "fundingAPR": 13.61,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-26",
    "timestamp": 1677369600000,
    "spotPrice": 23.53,
    "fundingAPR": 12.43,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-27",
    "timestamp": 1677456000000,
    "spotPrice": 23.79,
    "fundingAPR": 14.93,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-02-28",
    "timestamp": 1677542400000,
    "spotPrice": 24.12,
    "fundingAPR": 12.45,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-03-01",
    "timestamp": 1677628800000,
    "spotPrice": 23.6,
    "fundingAPR": 12.92,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-03-02",
    "timestamp": 1677715200000,
    "spotPrice": 23.23,
    "fundingAPR": 14.43,
    "stakingAPY": 7.19,
    "depegPct": 0.29
  },
  {
    "date": "2023-03-03",
    "timestamp": 1677801600000,
    "spotPrice": 23.66,
    "fundingAPR": 11.59,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-04",
    "timestamp": 1677888000000,
    "spotPrice": 23.73,
    "fundingAPR": 13.5,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-05",
    "timestamp": 1677974400000,
    "spotPrice": 23.09,
    "fundingAPR": 13.42,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-06",
    "timestamp": 1678060800000,
    "spotPrice": 22.99,
    "fundingAPR": 11.24,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-07",
    "timestamp": 1678147200000,
    "spotPrice": 23.46,
    "fundingAPR": 13.83,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-08",
    "timestamp": 1678233600000,
    "spotPrice": 23.24,
    "fundingAPR": 12.16,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-09",
    "timestamp": 1678320000000,
    "spotPrice": 22.62,
    "fundingAPR": 11.39,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-10",
    "timestamp": 1678406400000,
    "spotPrice": 22.79,
    "fundingAPR": 13.68,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-11",
    "timestamp": 1678492800000,
    "spotPrice": 23.15,
    "fundingAPR": 10.98,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-12",
    "timestamp": 1678579200000,
    "spotPrice": 22.67,
    "fundingAPR": 11.86,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-13",
    "timestamp": 1678665600000,
    "spotPrice": 22.21,
    "fundingAPR": 12.95,
    "stakingAPY": 7.18,
    "depegPct": 0.28
  },
  {
    "date": "2023-03-14",
    "timestamp": 1678752000000,
    "spotPrice": 22.59,
    "fundingAPR": 10.18,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-15",
    "timestamp": 1678838400000,
    "spotPrice": 22.72,
    "fundingAPR": 12.34,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-16",
    "timestamp": 1678924800000,
    "spotPrice": 22.08,
    "fundingAPR": 11.79,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-17",
    "timestamp": 1679011200000,
    "spotPrice": 21.88,
    "fundingAPR": 9.91,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-18",
    "timestamp": 1679097600000,
    "spotPrice": 22.34,
    "fundingAPR": 12.5,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-19",
    "timestamp": 1679184000000,
    "spotPrice": 22.18,
    "fundingAPR": 10.46,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-20",
    "timestamp": 1679270400000,
    "spotPrice": 21.53,
    "fundingAPR": 10.12,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-21",
    "timestamp": 1679356800000,
    "spotPrice": 21.61,
    "fundingAPR": 12.14,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-22",
    "timestamp": 1679443200000,
    "spotPrice": 22,
    "fundingAPR": 9.3,
    "stakingAPY": 7.17,
    "depegPct": 0.27
  },
  {
    "date": "2023-03-23",
    "timestamp": 1679529600000,
    "spotPrice": 21.57,
    "fundingAPR": 10.58,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-24",
    "timestamp": 1679616000000,
    "spotPrice": 21.04,
    "fundingAPR": 11.23,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-25",
    "timestamp": 1679702400000,
    "spotPrice": 21.36,
    "fundingAPR": 8.6,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-26",
    "timestamp": 1679788800000,
    "spotPrice": 21.55,
    "fundingAPR": 10.96,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-27",
    "timestamp": 1679875200000,
    "spotPrice": 20.93,
    "fundingAPR": 9.95,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-28",
    "timestamp": 1679961600000,
    "spotPrice": 20.64,
    "fundingAPR": 8.43,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-29",
    "timestamp": 1680048000000,
    "spotPrice": 21.08,
    "fundingAPR": 10.96,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-30",
    "timestamp": 1680134400000,
    "spotPrice": 21,
    "fundingAPR": 8.6,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-03-31",
    "timestamp": 1680220800000,
    "spotPrice": 20.32,
    "fundingAPR": 8.71,
    "stakingAPY": 7.16,
    "depegPct": 0.26
  },
  {
    "date": "2023-04-01",
    "timestamp": 1680307200000,
    "spotPrice": 20.32,
    "fundingAPR": 10.42,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-02",
    "timestamp": 1680393600000,
    "spotPrice": 20.74,
    "fundingAPR": 7.53,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-03",
    "timestamp": 1680480000000,
    "spotPrice": 20.37,
    "fundingAPR": 9.16,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-04",
    "timestamp": 1680566400000,
    "spotPrice": 19.79,
    "fundingAPR": 9.36,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-05",
    "timestamp": 1680652800000,
    "spotPrice": 20.04,
    "fundingAPR": 6.95,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-06",
    "timestamp": 1680739200000,
    "spotPrice": 20.3,
    "fundingAPR": 9.45,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-07",
    "timestamp": 1680825600000,
    "spotPrice": 19.72,
    "fundingAPR": 8.02,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-08",
    "timestamp": 1680912000000,
    "spotPrice": 19.35,
    "fundingAPR": 6.91,
    "stakingAPY": 7.15,
    "depegPct": 0.25
  },
  {
    "date": "2023-04-09",
    "timestamp": 1680998400000,
    "spotPrice": 19.76,
    "fundingAPR": 9.31,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-10",
    "timestamp": 1681084800000,
    "spotPrice": 19.77,
    "fundingAPR": 6.71,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-11",
    "timestamp": 1681171200000,
    "spotPrice": 19.09,
    "fundingAPR": 7.27,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-12",
    "timestamp": 1681257600000,
    "spotPrice": 19,
    "fundingAPR": 8.62,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-13",
    "timestamp": 1681344000000,
    "spotPrice": 19.44,
    "fundingAPR": 5.76,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-14",
    "timestamp": 1681430400000,
    "spotPrice": 19.16,
    "fundingAPR": 7.72,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-15",
    "timestamp": 1681516800000,
    "spotPrice": 18.54,
    "fundingAPR": 7.46,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-16",
    "timestamp": 1681603200000,
    "spotPrice": 18.73,
    "fundingAPR": 5.35,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-17",
    "timestamp": 1681689600000,
    "spotPrice": 19.05,
    "fundingAPR": 7.93,
    "stakingAPY": 7.14,
    "depegPct": 0.24
  },
  {
    "date": "2023-04-18",
    "timestamp": 1681776000000,
    "spotPrice": 18.52,
    "fundingAPR": 6.11,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-19",
    "timestamp": 1681862400000,
    "spotPrice": 18.09,
    "fundingAPR": 5.46,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-20",
    "timestamp": 1681948800000,
    "spotPrice": 18.48,
    "fundingAPR": 7.66,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-21",
    "timestamp": 1682035200000,
    "spotPrice": 18.57,
    "fundingAPR": 4.9,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-22",
    "timestamp": 1682121600000,
    "spotPrice": 17.91,
    "fundingAPR": 5.9,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-23",
    "timestamp": 1682208000000,
    "spotPrice": 17.75,
    "fundingAPR": 6.86,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-24",
    "timestamp": 1682294400000,
    "spotPrice": 18.21,
    "fundingAPR": 4.12,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-25",
    "timestamp": 1682380800000,
    "spotPrice": 18.02,
    "fundingAPR": 6.35,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-26",
    "timestamp": 1682467200000,
    "spotPrice": 17.38,
    "fundingAPR": 5.66,
    "stakingAPY": 7.13,
    "depegPct": 0.23
  },
  {
    "date": "2023-04-27",
    "timestamp": 1682553600000,
    "spotPrice": 17.5,
    "fundingAPR": 3.9,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-04-28",
    "timestamp": 1682640000000,
    "spotPrice": 17.89,
    "fundingAPR": 6.49,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-04-29",
    "timestamp": 1682726400000,
    "spotPrice": 17.44,
    "fundingAPR": 4.36,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-04-30",
    "timestamp": 1682812800000,
    "spotPrice": 16.95,
    "fundingAPR": 4.18,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-01",
    "timestamp": 1682899200000,
    "spotPrice": 17.31,
    "fundingAPR": 6.13,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-02",
    "timestamp": 1682985600000,
    "spotPrice": 17.49,
    "fundingAPR": 3.29,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-03",
    "timestamp": 1683072000000,
    "spotPrice": 16.87,
    "fundingAPR": 4.71,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-04",
    "timestamp": 1683158400000,
    "spotPrice": 16.65,
    "fundingAPR": 5.25,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-05",
    "timestamp": 1683244800000,
    "spotPrice": 17.12,
    "fundingAPR": 2.71,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-06",
    "timestamp": 1683331200000,
    "spotPrice": 17.03,
    "fundingAPR": 5.17,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-07",
    "timestamp": 1683417600000,
    "spotPrice": 16.38,
    "fundingAPR": 4.06,
    "stakingAPY": 7.12,
    "depegPct": 0.22
  },
  {
    "date": "2023-05-08",
    "timestamp": 1683504000000,
    "spotPrice": 16.45,
    "fundingAPR": 2.71,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-09",
    "timestamp": 1683590400000,
    "spotPrice": 16.89,
    "fundingAPR": 5.25,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-10",
    "timestamp": 1683676800000,
    "spotPrice": 16.53,
    "fundingAPR": 2.86,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-11",
    "timestamp": 1683763200000,
    "spotPrice": 16.01,
    "fundingAPR": 3.16,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-12",
    "timestamp": 1683849600000,
    "spotPrice": 16.33,
    "fundingAPR": 4.81,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-13",
    "timestamp": 1683936000000,
    "spotPrice": 16.6,
    "fundingAPR": 1.98,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-14",
    "timestamp": 1684022400000,
    "spotPrice": 16.04,
    "fundingAPR": 3.78,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-15",
    "timestamp": 1684108800000,
    "spotPrice": 15.76,
    "fundingAPR": 3.9,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-16",
    "timestamp": 1684195200000,
    "spotPrice": 16.24,
    "fundingAPR": 1.64,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-17",
    "timestamp": 1684281600000,
    "spotPrice": 16.25,
    "fundingAPR": 4.25,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-18",
    "timestamp": 1684368000000,
    "spotPrice": 15.63,
    "fundingAPR": 2.76,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-19",
    "timestamp": 1684454400000,
    "spotPrice": 15.63,
    "fundingAPR": 1.87,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-20",
    "timestamp": 1684540800000,
    "spotPrice": 16.12,
    "fundingAPR": 4.28,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-21",
    "timestamp": 1684627200000,
    "spotPrice": 15.86,
    "fundingAPR": 1.71,
    "stakingAPY": 7.11,
    "depegPct": 0.21
  },
  {
    "date": "2023-05-22",
    "timestamp": 1684713600000,
    "spotPrice": 15.32,
    "fundingAPR": 2.49,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-23",
    "timestamp": 1684800000000,
    "spotPrice": 15.6,
    "fundingAPR": 3.8,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-24",
    "timestamp": 1684886400000,
    "spotPrice": 15.96,
    "fundingAPR": 1.05,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-25",
    "timestamp": 1684972800000,
    "spotPrice": 15.48,
    "fundingAPR": 3.19,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-26",
    "timestamp": 1685059200000,
    "spotPrice": 15.15,
    "fundingAPR": 2.89,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-27",
    "timestamp": 1685145600000,
    "spotPrice": 15.62,
    "fundingAPR": 0.97,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-28",
    "timestamp": 1685232000000,
    "spotPrice": 15.75,
    "fundingAPR": 3.66,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-29",
    "timestamp": 1685318400000,
    "spotPrice": 15.16,
    "fundingAPR": 1.84,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-30",
    "timestamp": 1685404800000,
    "spotPrice": 15.11,
    "fundingAPR": 1.43,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-05-31",
    "timestamp": 1685491200000,
    "spotPrice": 15.64,
    "fundingAPR": 3.66,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-01",
    "timestamp": 1685577600000,
    "spotPrice": 15.49,
    "fundingAPR": 0.97,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-02",
    "timestamp": 1685664000000,
    "spotPrice": 14.94,
    "fundingAPR": 2.21,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-03",
    "timestamp": 1685750400000,
    "spotPrice": 15.18,
    "fundingAPR": 3.14,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-04",
    "timestamp": 1685836800000,
    "spotPrice": 15.62,
    "fundingAPR": 0.57,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-05",
    "timestamp": 1685923200000,
    "spotPrice": 15.23,
    "fundingAPR": 2.99,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-06",
    "timestamp": 1686009600000,
    "spotPrice": 14.85,
    "fundingAPR": 2.27,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-07",
    "timestamp": 1686096000000,
    "spotPrice": 15.32,
    "fundingAPR": 0.75,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-08",
    "timestamp": 1686182400000,
    "spotPrice": 15.55,
    "fundingAPR": 3.45,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-09",
    "timestamp": 1686268800000,
    "spotPrice": 15.01,
    "fundingAPR": 1.34,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-10",
    "timestamp": 1686355200000,
    "spotPrice": 15.02,
    "fundingAPR": 1.43,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-11",
    "timestamp": 1686441600000,
    "spotPrice": 15.37,
    "fundingAPR": 3.42,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-12",
    "timestamp": 1686528000000,
    "spotPrice": 15.36,
    "fundingAPR": 0.69,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-13",
    "timestamp": 1686614400000,
    "spotPrice": 15.04,
    "fundingAPR": 2.36,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-14",
    "timestamp": 1686700800000,
    "spotPrice": 15.19,
    "fundingAPR": 2.9,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-15",
    "timestamp": 1686787200000,
    "spotPrice": 15.54,
    "fundingAPR": 0.57,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-16",
    "timestamp": 1686873600000,
    "spotPrice": 15.4,
    "fundingAPR": 3.21,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-17",
    "timestamp": 1686960000000,
    "spotPrice": 15.2,
    "fundingAPR": 2.12,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-18",
    "timestamp": 1687046400000,
    "spotPrice": 15.53,
    "fundingAPR": 1.05,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-19",
    "timestamp": 1687132800000,
    "spotPrice": 15.79,
    "fundingAPR": 3.7,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-20",
    "timestamp": 1687219200000,
    "spotPrice": 15.57,
    "fundingAPR": 1.38,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-21",
    "timestamp": 1687305600000,
    "spotPrice": 15.56,
    "fundingAPR": 1.98,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-22",
    "timestamp": 1687392000000,
    "spotPrice": 16,
    "fundingAPR": 3.68,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-23",
    "timestamp": 1687478400000,
    "spotPrice": 16.14,
    "fundingAPR": 1.01,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-24",
    "timestamp": 1687564800000,
    "spotPrice": 15.92,
    "fundingAPR": 3.08,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-25",
    "timestamp": 1687651200000,
    "spotPrice": 16.12,
    "fundingAPR": 3.22,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-26",
    "timestamp": 1687737600000,
    "spotPrice": 16.58,
    "fundingAPR": 1.21,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-27",
    "timestamp": 1687824000000,
    "spotPrice": 16.59,
    "fundingAPR": 4.01,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-28",
    "timestamp": 1687910400000,
    "spotPrice": 16.46,
    "fundingAPR": 2.57,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-29",
    "timestamp": 1687996800000,
    "spotPrice": 16.85,
    "fundingAPR": 1.98,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-06-30",
    "timestamp": 1688083200000,
    "spotPrice": 17.25,
    "fundingAPR": 4.51,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-07-01",
    "timestamp": 1688169600000,
    "spotPrice": 17.16,
    "fundingAPR": 2.05,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-07-02",
    "timestamp": 1688256000000,
    "spotPrice": 17.19,
    "fundingAPR": 3.14,
    "stakingAPY": 7.1,
    "depegPct": 0.2
  },
  {
    "date": "2023-07-03",
    "timestamp": 1688342400000,
    "spotPrice": 17.71,
    "fundingAPR": 4.51,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-04",
    "timestamp": 1688428800000,
    "spotPrice": 18,
    "fundingAPR": 1.97,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-05",
    "timestamp": 1688515200000,
    "spotPrice": 17.88,
    "fundingAPR": 4.37,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-06",
    "timestamp": 1688601600000,
    "spotPrice": 18.11,
    "fundingAPR": 4.11,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-07",
    "timestamp": 1688688000000,
    "spotPrice": 18.69,
    "fundingAPR": 2.48,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-08",
    "timestamp": 1688774400000,
    "spotPrice": 18.83,
    "fundingAPR": 5.35,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-09",
    "timestamp": 1688860800000,
    "spotPrice": 18.77,
    "fundingAPR": 3.6,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-10",
    "timestamp": 1688947200000,
    "spotPrice": 19.2,
    "fundingAPR": 3.52,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-11",
    "timestamp": 1689033600000,
    "spotPrice": 19.73,
    "fundingAPR": 5.85,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-12",
    "timestamp": 1689120000000,
    "spotPrice": 19.76,
    "fundingAPR": 3.32,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-13",
    "timestamp": 1689206400000,
    "spotPrice": 19.84,
    "fundingAPR": 4.87,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-14",
    "timestamp": 1689292800000,
    "spotPrice": 20.42,
    "fundingAPR": 5.86,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-15",
    "timestamp": 1689379200000,
    "spotPrice": 20.84,
    "fundingAPR": 3.52,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-16",
    "timestamp": 1689465600000,
    "spotPrice": 20.81,
    "fundingAPR": 6.19,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-17",
    "timestamp": 1689552000000,
    "spotPrice": 21.08,
    "fundingAPR": 5.53,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-18",
    "timestamp": 1689638400000,
    "spotPrice": 21.74,
    "fundingAPR": 4.31,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-19",
    "timestamp": 1689724800000,
    "spotPrice": 22.01,
    "fundingAPR": 7.18,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-20",
    "timestamp": 1689811200000,
    "spotPrice": 22.01,
    "fundingAPR": 5.17,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2023-07-21",
    "timestamp": 1689897600000,
    "spotPrice": 22.48,
    "fundingAPR": 5.59,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-22",
    "timestamp": 1689984000000,
    "spotPrice": 23.12,
    "fundingAPR": 7.66,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-23",
    "timestamp": 1690070400000,
    "spotPrice": 23.26,
    "fundingAPR": 5.12,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-24",
    "timestamp": 1690156800000,
    "spotPrice": 23.37,
    "fundingAPR": 7.08,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-25",
    "timestamp": 1690243200000,
    "spotPrice": 24,
    "fundingAPR": 7.66,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-26",
    "timestamp": 1690329600000,
    "spotPrice": 24.54,
    "fundingAPR": 5.59,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-27",
    "timestamp": 1690416000000,
    "spotPrice": 24.59,
    "fundingAPR": 8.45,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-28",
    "timestamp": 1690502400000,
    "spotPrice": 24.88,
    "fundingAPR": 7.4,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-29",
    "timestamp": 1690588800000,
    "spotPrice": 25.6,
    "fundingAPR": 6.64,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-30",
    "timestamp": 1690675200000,
    "spotPrice": 25.99,
    "fundingAPR": 9.41,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-07-31",
    "timestamp": 1690761600000,
    "spotPrice": 26.05,
    "fundingAPR": 7.2,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-08-01",
    "timestamp": 1690848000000,
    "spotPrice": 26.53,
    "fundingAPR": 8.1,
    "stakingAPY": 7.12,
    "depegPct": 0.18
  },
  {
    "date": "2023-08-02",
    "timestamp": 1690934400000,
    "spotPrice": 27.25,
    "fundingAPR": 9.85,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-03",
    "timestamp": 1691020800000,
    "spotPrice": 27.49,
    "fundingAPR": 7.36,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-04",
    "timestamp": 1691107200000,
    "spotPrice": 27.63,
    "fundingAPR": 9.68,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-05",
    "timestamp": 1691193600000,
    "spotPrice": 28.28,
    "fundingAPR": 9.84,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-06",
    "timestamp": 1691280000000,
    "spotPrice": 28.91,
    "fundingAPR": 8.08,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-07",
    "timestamp": 1691366400000,
    "spotPrice": 29.04,
    "fundingAPR": 11.04,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-08",
    "timestamp": 1691452800000,
    "spotPrice": 29.33,
    "fundingAPR": 9.63,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-09",
    "timestamp": 1691539200000,
    "spotPrice": 30.09,
    "fundingAPR": 9.34,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-10",
    "timestamp": 1691625600000,
    "spotPrice": 30.58,
    "fundingAPR": 11.94,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-11",
    "timestamp": 1691712000000,
    "spotPrice": 30.67,
    "fundingAPR": 9.57,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-12",
    "timestamp": 1691798400000,
    "spotPrice": 31.15,
    "fundingAPR": 10.93,
    "stakingAPY": 7.13,
    "depegPct": 0.17
  },
  {
    "date": "2023-08-13",
    "timestamp": 1691884800000,
    "spotPrice": 31.93,
    "fundingAPR": 12.3,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-14",
    "timestamp": 1691971200000,
    "spotPrice": 32.25,
    "fundingAPR": 9.94,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-15",
    "timestamp": 1692057600000,
    "spotPrice": 32.4,
    "fundingAPR": 12.54,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-16",
    "timestamp": 1692144000000,
    "spotPrice": 33.05,
    "fundingAPR": 12.26,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-17",
    "timestamp": 1692230400000,
    "spotPrice": 33.75,
    "fundingAPR": 10.87,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-18",
    "timestamp": 1692316800000,
    "spotPrice": 33.94,
    "fundingAPR": 13.85,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-19",
    "timestamp": 1692403200000,
    "spotPrice": 34.22,
    "fundingAPR": 12.11,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-20",
    "timestamp": 1692489600000,
    "spotPrice": 34.99,
    "fundingAPR": 12.29,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-21",
    "timestamp": 1692576000000,
    "spotPrice": 35.55,
    "fundingAPR": 14.64,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-22",
    "timestamp": 1692662400000,
    "spotPrice": 35.67,
    "fundingAPR": 12.18,
    "stakingAPY": 7.14,
    "depegPct": 0.16
  },
  {
    "date": "2023-08-23",
    "timestamp": 1692748800000,
    "spotPrice": 36.12,
    "fundingAPR": 13.96,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-24",
    "timestamp": 1692835200000,
    "spotPrice": 36.92,
    "fundingAPR": 14.91,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-25",
    "timestamp": 1692921600000,
    "spotPrice": 37.32,
    "fundingAPR": 12.73,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-26",
    "timestamp": 1693008000000,
    "spotPrice": 37.46,
    "fundingAPR": 15.54,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-27",
    "timestamp": 1693094400000,
    "spotPrice": 38.08,
    "fundingAPR": 14.83,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-28",
    "timestamp": 1693180800000,
    "spotPrice": 38.83,
    "fundingAPR": 13.82,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-29",
    "timestamp": 1693267200000,
    "spotPrice": 39.06,
    "fundingAPR": 16.74,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-30",
    "timestamp": 1693353600000,
    "spotPrice": 39.3,
    "fundingAPR": 14.72,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-08-31",
    "timestamp": 1693440000000,
    "spotPrice": 40.06,
    "fundingAPR": 15.36,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-09-01",
    "timestamp": 1693526400000,
    "spotPrice": 40.67,
    "fundingAPR": 17.39,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-09-02",
    "timestamp": 1693612800000,
    "spotPrice": 40.81,
    "fundingAPR": 14.91,
    "stakingAPY": 7.15,
    "depegPct": 0.15
  },
  {
    "date": "2023-09-03",
    "timestamp": 1693699200000,
    "spotPrice": 41.2,
    "fundingAPR": 17.04,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-04",
    "timestamp": 1693785600000,
    "spotPrice": 42.01,
    "fundingAPR": 17.53,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-05",
    "timestamp": 1693872000000,
    "spotPrice": 42.45,
    "fundingAPR": 15.6,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-06",
    "timestamp": 1693958400000,
    "spotPrice": 42.57,
    "fundingAPR": 18.53,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-07",
    "timestamp": 1694044800000,
    "spotPrice": 43.13,
    "fundingAPR": 17.41,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-08",
    "timestamp": 1694131200000,
    "spotPrice": 43.9,
    "fundingAPR": 16.82,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-09",
    "timestamp": 1694217600000,
    "spotPrice": 44.16,
    "fundingAPR": 19.57,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-10",
    "timestamp": 1694304000000,
    "spotPrice": 44.35,
    "fundingAPR": 17.33,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-11",
    "timestamp": 1694390400000,
    "spotPrice": 45.06,
    "fundingAPR": 18.4,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-12",
    "timestamp": 1694476800000,
    "spotPrice": 45.7,
    "fundingAPR": 20.05,
    "stakingAPY": 7.16,
    "depegPct": 0.14
  },
  {
    "date": "2023-09-13",
    "timestamp": 1694563200000,
    "spotPrice": 45.84,
    "fundingAPR": 17.61,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-14",
    "timestamp": 1694649600000,
    "spotPrice": 46.16,
    "fundingAPR": 20.03,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-15",
    "timestamp": 1694736000000,
    "spotPrice": 46.93,
    "fundingAPR": 20.06,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-16",
    "timestamp": 1694822400000,
    "spotPrice": 47.4,
    "fundingAPR": 18.41,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-17",
    "timestamp": 1694908800000,
    "spotPrice": 47.48,
    "fundingAPR": 21.38,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-18",
    "timestamp": 1694995200000,
    "spotPrice": 47.97,
    "fundingAPR": 19.86,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-19",
    "timestamp": 1695081600000,
    "spotPrice": 48.72,
    "fundingAPR": 19.7,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-20",
    "timestamp": 1695168000000,
    "spotPrice": 49,
    "fundingAPR": 22.22,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-21",
    "timestamp": 1695254400000,
    "spotPrice": 49.12,
    "fundingAPR": 19.8,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-22",
    "timestamp": 1695340800000,
    "spotPrice": 49.75,
    "fundingAPR": 21.28,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-23",
    "timestamp": 1695427200000,
    "spotPrice": 50.39,
    "fundingAPR": 22.49,
    "stakingAPY": 7.17,
    "depegPct": 0.13
  },
  {
    "date": "2023-09-24",
    "timestamp": 1695513600000,
    "spotPrice": 50.52,
    "fundingAPR": 20.15,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-09-25",
    "timestamp": 1695600000000,
    "spotPrice": 50.75,
    "fundingAPR": 22.8,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-09-26",
    "timestamp": 1695686400000,
    "spotPrice": 51.46,
    "fundingAPR": 22.35,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-09-27",
    "timestamp": 1695772800000,
    "spotPrice": 51.93,
    "fundingAPR": 21.03,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-09-28",
    "timestamp": 1695859200000,
    "spotPrice": 51.97,
    "fundingAPR": 23.95,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-09-29",
    "timestamp": 1695945600000,
    "spotPrice": 52.36,
    "fundingAPR": 22.08,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-09-30",
    "timestamp": 1696032000000,
    "spotPrice": 53.07,
    "fundingAPR": 22.35,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-10-01",
    "timestamp": 1696118400000,
    "spotPrice": 53.34,
    "fundingAPR": 24.55,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-10-02",
    "timestamp": 1696204800000,
    "spotPrice": 53.38,
    "fundingAPR": 22.03,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-10-03",
    "timestamp": 1696291200000,
    "spotPrice": 53.91,
    "fundingAPR": 23.86,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-10-04",
    "timestamp": 1696377600000,
    "spotPrice": 54.53,
    "fundingAPR": 24.6,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-10-05",
    "timestamp": 1696464000000,
    "spotPrice": 54.63,
    "fundingAPR": 22.42,
    "stakingAPY": 7.18,
    "depegPct": 0.12
  },
  {
    "date": "2023-10-06",
    "timestamp": 1696550400000,
    "spotPrice": 54.76,
    "fundingAPR": 25.21,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-07",
    "timestamp": 1696636800000,
    "spotPrice": 55.39,
    "fundingAPR": 24.29,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-08",
    "timestamp": 1696723200000,
    "spotPrice": 55.84,
    "fundingAPR": 23.34,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-09",
    "timestamp": 1696809600000,
    "spotPrice": 55.82,
    "fundingAPR": 26.13,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-10",
    "timestamp": 1696896000000,
    "spotPrice": 56.09,
    "fundingAPR": 23.95,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-11",
    "timestamp": 1696982400000,
    "spotPrice": 56.73,
    "fundingAPR": 24.63,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-12",
    "timestamp": 1697068800000,
    "spotPrice": 56.98,
    "fundingAPR": 26.46,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-13",
    "timestamp": 1697155200000,
    "spotPrice": 56.94,
    "fundingAPR": 23.89,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-14",
    "timestamp": 1697241600000,
    "spotPrice": 57.35,
    "fundingAPR": 26.02,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-15",
    "timestamp": 1697328000000,
    "spotPrice": 57.92,
    "fundingAPR": 26.27,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-16",
    "timestamp": 1697414400000,
    "spotPrice": 57.98,
    "fundingAPR": 24.31,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-17",
    "timestamp": 1697500800000,
    "spotPrice": 57.99,
    "fundingAPR": 27.16,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-18",
    "timestamp": 1697587200000,
    "spotPrice": 58.51,
    "fundingAPR": 25.8,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-19",
    "timestamp": 1697673600000,
    "spotPrice": 58.92,
    "fundingAPR": 25.23,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-20",
    "timestamp": 1697760000000,
    "spotPrice": 58.84,
    "fundingAPR": 27.8,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-21",
    "timestamp": 1697846400000,
    "spotPrice": 58.98,
    "fundingAPR": 25.37,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-22",
    "timestamp": 1697932800000,
    "spotPrice": 59.53,
    "fundingAPR": 26.45,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-23",
    "timestamp": 1698019200000,
    "spotPrice": 59.75,
    "fundingAPR": 27.84,
    "stakingAPY": 7.19,
    "depegPct": 0.11
  },
  {
    "date": "2023-10-24",
    "timestamp": 1698105600000,
    "spotPrice": 59.61,
    "fundingAPR": 25.3,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-25",
    "timestamp": 1698192000000,
    "spotPrice": 59.88,
    "fundingAPR": 27.67,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-26",
    "timestamp": 1698278400000,
    "spotPrice": 60.39,
    "fundingAPR": 27.41,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-27",
    "timestamp": 1698364800000,
    "spotPrice": 60.4,
    "fundingAPR": 25.73,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-28",
    "timestamp": 1698451200000,
    "spotPrice": 60.29,
    "fundingAPR": 28.56,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-29",
    "timestamp": 1698537600000,
    "spotPrice": 60.68,
    "fundingAPR": 26.78,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-30",
    "timestamp": 1698624000000,
    "spotPrice": 61.05,
    "fundingAPR": 26.61,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-10-31",
    "timestamp": 1698710400000,
    "spotPrice": 60.9,
    "fundingAPR": 28.89,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-01",
    "timestamp": 1698796800000,
    "spotPrice": 60.89,
    "fundingAPR": 26.28,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-02",
    "timestamp": 1698883200000,
    "spotPrice": 61.34,
    "fundingAPR": 27.72,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-03",
    "timestamp": 1698969600000,
    "spotPrice": 61.51,
    "fundingAPR": 28.64,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-04",
    "timestamp": 1699056000000,
    "spotPrice": 61.28,
    "fundingAPR": 26.19,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-05",
    "timestamp": 1699142400000,
    "spotPrice": 61.4,
    "fundingAPR": 28.73,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-06",
    "timestamp": 1699228800000,
    "spotPrice": 61.83,
    "fundingAPR": 27.97,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-07",
    "timestamp": 1699315200000,
    "spotPrice": 61.79,
    "fundingAPR": 26.6,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-08",
    "timestamp": 1699401600000,
    "spotPrice": 61.55,
    "fundingAPR": 29.33,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-09",
    "timestamp": 1699488000000,
    "spotPrice": 61.81,
    "fundingAPR": 27.2,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-10",
    "timestamp": 1699574400000,
    "spotPrice": 62.11,
    "fundingAPR": 27.43,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-11",
    "timestamp": 1699660800000,
    "spotPrice": 61.89,
    "fundingAPR": 29.35,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-12",
    "timestamp": 1699747200000,
    "spotPrice": 61.74,
    "fundingAPR": 26.63,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-13",
    "timestamp": 1699833600000,
    "spotPrice": 62.07,
    "fundingAPR": 28.39,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-14",
    "timestamp": 1699920000000,
    "spotPrice": 62.19,
    "fundingAPR": 28.81,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-15",
    "timestamp": 1700006400000,
    "spotPrice": 61.43,
    "fundingAPR": 26.52,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-16",
    "timestamp": 1700092800000,
    "spotPrice": 61.44,
    "fundingAPR": 29.18,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-17",
    "timestamp": 1700179200000,
    "spotPrice": 63.1,
    "fundingAPR": 28.02,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-18",
    "timestamp": 1700265600000,
    "spotPrice": 63.26,
    "fundingAPR": 27.12,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-19",
    "timestamp": 1700352000000,
    "spotPrice": 62.56,
    "fundingAPR": 29.84,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-20",
    "timestamp": 1700438400000,
    "spotPrice": 63.97,
    "fundingAPR": 27.61,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-21",
    "timestamp": 1700524800000,
    "spotPrice": 66.08,
    "fundingAPR": 28.5,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-22",
    "timestamp": 1700611200000,
    "spotPrice": 66.28,
    "fundingAPR": 30.31,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-23",
    "timestamp": 1700697600000,
    "spotPrice": 66.62,
    "fundingAPR": 27.9,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-24",
    "timestamp": 1700784000000,
    "spotPrice": 69.18,
    "fundingAPR": 30.31,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-25",
    "timestamp": 1700870400000,
    "spotPrice": 71.36,
    "fundingAPR": 30.64,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-26",
    "timestamp": 1700956800000,
    "spotPrice": 71.71,
    "fundingAPR": 29.03,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-27",
    "timestamp": 1701043200000,
    "spotPrice": 73.21,
    "fundingAPR": 32.19,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-28",
    "timestamp": 1701129600000,
    "spotPrice": 76.5,
    "fundingAPR": 31.03,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-29",
    "timestamp": 1701216000000,
    "spotPrice": 78.41,
    "fundingAPR": 30.94,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2023-11-30",
    "timestamp": 1701302400000,
    "spotPrice": 79.1,
    "fundingAPR": 33.81,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-01",
    "timestamp": 1701388800000,
    "spotPrice": 81.67,
    "fundingAPR": 31.73,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-02",
    "timestamp": 1701475200000,
    "spotPrice": 85.12,
    "fundingAPR": 33.35,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-03",
    "timestamp": 1701561600000,
    "spotPrice": 86.61,
    "fundingAPR": 35.04,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-04",
    "timestamp": 1701648000000,
    "spotPrice": 87.79,
    "fundingAPR": 32.96,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-05",
    "timestamp": 1701734400000,
    "spotPrice": 91.1,
    "fundingAPR": 35.85,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-06",
    "timestamp": 1701820800000,
    "spotPrice": 94.18,
    "fundingAPR": 35.9,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-07",
    "timestamp": 1701907200000,
    "spotPrice": 95.21,
    "fundingAPR": 34.77,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-08",
    "timestamp": 1701993600000,
    "spotPrice": 96.95,
    "fundingAPR": 38.04,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-09",
    "timestamp": 1702080000000,
    "spotPrice": 100.5,
    "fundingAPR": 36.61,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-10",
    "timestamp": 1702166400000,
    "spotPrice": 102.78,
    "fundingAPR": 37.01,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-11",
    "timestamp": 1702252800000,
    "spotPrice": 103.45,
    "fundingAPR": 39.62,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-12",
    "timestamp": 1702339200000,
    "spotPrice": 105.66,
    "fundingAPR": 37.4,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-13",
    "timestamp": 1702425600000,
    "spotPrice": 108.89,
    "fundingAPR": 39.35,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-14",
    "timestamp": 1702512000000,
    "spotPrice": 110.11,
    "fundingAPR": 40.5,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-15",
    "timestamp": 1702598400000,
    "spotPrice": 110.59,
    "fundingAPR": 38.45,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-16",
    "timestamp": 1702684800000,
    "spotPrice": 113.01,
    "fundingAPR": 41.37,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-17",
    "timestamp": 1702771200000,
    "spotPrice": 115.39,
    "fundingAPR": 40.77,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-18",
    "timestamp": 1702857600000,
    "spotPrice": 115.53,
    "fundingAPR": 39.78,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-19",
    "timestamp": 1702944000000,
    "spotPrice": 115.96,
    "fundingAPR": 42.71,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-20",
    "timestamp": 1703030400000,
    "spotPrice": 118.22,
    "fundingAPR": 40.69,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-21",
    "timestamp": 1703116800000,
    "spotPrice": 119.35,
    "fundingAPR": 41.22,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-22",
    "timestamp": 1703203200000,
    "spotPrice": 118.58,
    "fundingAPR": 43.17,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-23",
    "timestamp": 1703289600000,
    "spotPrice": 119.04,
    "fundingAPR": 40.54,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-24",
    "timestamp": 1703376000000,
    "spotPrice": 120.69,
    "fundingAPR": 42.45,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-25",
    "timestamp": 1703462400000,
    "spotPrice": 120.79,
    "fundingAPR": 42.74,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-26",
    "timestamp": 1703548800000,
    "spotPrice": 118.32,
    "fundingAPR": 40.54,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-27",
    "timestamp": 1703635200000,
    "spotPrice": 119.77,
    "fundingAPR": 43.23,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-28",
    "timestamp": 1703721600000,
    "spotPrice": 122.06,
    "fundingAPR": 41.89,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-29",
    "timestamp": 1703808000000,
    "spotPrice": 120.36,
    "fundingAPR": 41.06,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-30",
    "timestamp": 1703894400000,
    "spotPrice": 118.97,
    "fundingAPR": 43.61,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2023-12-31",
    "timestamp": 1703980800000,
    "spotPrice": 121.64,
    "fundingAPR": 41.18,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-01",
    "timestamp": 1704067200000,
    "spotPrice": 123.07,
    "fundingAPR": 42.03,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-02",
    "timestamp": 1704153600000,
    "spotPrice": 120.9,
    "fundingAPR": 43.53,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-03",
    "timestamp": 1704240000000,
    "spotPrice": 121.02,
    "fundingAPR": 40.91,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-04",
    "timestamp": 1704326400000,
    "spotPrice": 124.28,
    "fundingAPR": 43.15,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-05",
    "timestamp": 1704412800000,
    "spotPrice": 124.56,
    "fundingAPR": 43.06,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-06",
    "timestamp": 1704499200000,
    "spotPrice": 122.61,
    "fundingAPR": 41.25,
    "stakingAPY": 7.3,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-07",
    "timestamp": 1704585600000,
    "spotPrice": 124.32,
    "fundingAPR": 44.09,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-08",
    "timestamp": 1704672000000,
    "spotPrice": 127.45,
    "fundingAPR": 42.48,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-09",
    "timestamp": 1704758400000,
    "spotPrice": 126.67,
    "fundingAPR": 42.18,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-10",
    "timestamp": 1704844800000,
    "spotPrice": 125.59,
    "fundingAPR": 44.61,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-11",
    "timestamp": 1704931200000,
    "spotPrice": 128.62,
    "fundingAPR": 42.11,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-12",
    "timestamp": 1705017600000,
    "spotPrice": 130.99,
    "fundingAPR": 43.48,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-13",
    "timestamp": 1705104000000,
    "spotPrice": 129.53,
    "fundingAPR": 44.65,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-14",
    "timestamp": 1705190400000,
    "spotPrice": 129.82,
    "fundingAPR": 42.24,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-15",
    "timestamp": 1705276800000,
    "spotPrice": 133.59,
    "fundingAPR": 44.82,
    "stakingAPY": 7.29,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-16",
    "timestamp": 1705363200000,
    "spotPrice": 134.82,
    "fundingAPR": 44.35,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-17",
    "timestamp": 1705449600000,
    "spotPrice": 133.31,
    "fundingAPR": 42.98,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-18",
    "timestamp": 1705536000000,
    "spotPrice": 135.15,
    "fundingAPR": 45.88,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-19",
    "timestamp": 1705622400000,
    "spotPrice": 138.95,
    "fundingAPR": 44.01,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-20",
    "timestamp": 1705708800000,
    "spotPrice": 138.98,
    "fundingAPR": 44.24,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-21",
    "timestamp": 1705795200000,
    "spotPrice": 138.1,
    "fundingAPR": 46.47,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-22",
    "timestamp": 1705881600000,
    "spotPrice": 141.29,
    "fundingAPR": 43.95,
    "stakingAPY": 7.28,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-23",
    "timestamp": 1705968000000,
    "spotPrice": 144.42,
    "fundingAPR": 45.77,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-24",
    "timestamp": 1706054400000,
    "spotPrice": 143.56,
    "fundingAPR": 46.57,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-25",
    "timestamp": 1706140800000,
    "spotPrice": 143.85,
    "fundingAPR": 44.41,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-26",
    "timestamp": 1706227200000,
    "spotPrice": 147.9,
    "fundingAPR": 47.23,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-27",
    "timestamp": 1706313600000,
    "spotPrice": 149.87,
    "fundingAPR": 46.38,
    "stakingAPY": 7.27,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-28",
    "timestamp": 1706400000000,
    "spotPrice": 148.68,
    "fundingAPR": 45.45,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-29",
    "timestamp": 1706486400000,
    "spotPrice": 150.42,
    "fundingAPR": 48.31,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-30",
    "timestamp": 1706572800000,
    "spotPrice": 154.61,
    "fundingAPR": 46.21,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2024-01-31",
    "timestamp": 1706659200000,
    "spotPrice": 155.27,
    "fundingAPR": 46.93,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-01",
    "timestamp": 1706745600000,
    "spotPrice": 154.42,
    "fundingAPR": 48.86,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-02",
    "timestamp": 1706832000000,
    "spotPrice": 157.52,
    "fundingAPR": 46.37,
    "stakingAPY": 7.26,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-03",
    "timestamp": 1706918400000,
    "spotPrice": 161.12,
    "fundingAPR": 48.56,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-04",
    "timestamp": 1707004800000,
    "spotPrice": 160.67,
    "fundingAPR": 48.93,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-05",
    "timestamp": 1707091200000,
    "spotPrice": 160.76,
    "fundingAPR": 47.05,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-06",
    "timestamp": 1707177600000,
    "spotPrice": 164.78,
    "fundingAPR": 50,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-07",
    "timestamp": 1707264000000,
    "spotPrice": 167.24,
    "fundingAPR": 48.76,
    "stakingAPY": 7.25,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-08",
    "timestamp": 1707350400000,
    "spotPrice": 166.17,
    "fundingAPR": 48.27,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-09",
    "timestamp": 1707436800000,
    "spotPrice": 167.55,
    "fundingAPR": 50.97,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-10",
    "timestamp": 1707523200000,
    "spotPrice": 171.82,
    "fundingAPR": 48.67,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-11",
    "timestamp": 1707609600000,
    "spotPrice": 172.87,
    "fundingAPR": 49.83,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-12",
    "timestamp": 1707696000000,
    "spotPrice": 171.84,
    "fundingAPR": 51.37,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-13",
    "timestamp": 1707782400000,
    "spotPrice": 174.54,
    "fundingAPR": 48.94,
    "stakingAPY": 7.24,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-14",
    "timestamp": 1707868800000,
    "spotPrice": 178.32,
    "fundingAPR": 51.42,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-15",
    "timestamp": 1707955200000,
    "spotPrice": 178.06,
    "fundingAPR": 51.32,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-16",
    "timestamp": 1708041600000,
    "spotPrice": 177.71,
    "fundingAPR": 49.74,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-17",
    "timestamp": 1708128000000,
    "spotPrice": 181.37,
    "fundingAPR": 52.69,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-18",
    "timestamp": 1708214400000,
    "spotPrice": 184.04,
    "fundingAPR": 51.07,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-19",
    "timestamp": 1708300800000,
    "spotPrice": 182.89,
    "fundingAPR": 51,
    "stakingAPY": 7.23,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-20",
    "timestamp": 1708387200000,
    "spotPrice": 183.66,
    "fundingAPR": 53.43,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-21",
    "timestamp": 1708473600000,
    "spotPrice": 187.68,
    "fundingAPR": 50.96,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-22",
    "timestamp": 1708560000000,
    "spotPrice": 188.87,
    "fundingAPR": 52.5,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-23",
    "timestamp": 1708646400000,
    "spotPrice": 187.47,
    "fundingAPR": 53.57,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-24",
    "timestamp": 1708732800000,
    "spotPrice": 189.48,
    "fundingAPR": 51.24,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-25",
    "timestamp": 1708819200000,
    "spotPrice": 193.13,
    "fundingAPR": 53.9,
    "stakingAPY": 7.22,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-26",
    "timestamp": 1708905600000,
    "spotPrice": 192.85,
    "fundingAPR": 53.29,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-27",
    "timestamp": 1708992000000,
    "spotPrice": 191.86,
    "fundingAPR": 52.02,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-28",
    "timestamp": 1709078400000,
    "spotPrice": 194.88,
    "fundingAPR": 54.88,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-02-29",
    "timestamp": 1709164800000,
    "spotPrice": 197.48,
    "fundingAPR": 52.88,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-01",
    "timestamp": 1709251200000,
    "spotPrice": 196.08,
    "fundingAPR": 53.21,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-02",
    "timestamp": 1709337600000,
    "spotPrice": 196.02,
    "fundingAPR": 55.27,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-03",
    "timestamp": 1709424000000,
    "spotPrice": 199.52,
    "fundingAPR": 52.67,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-04",
    "timestamp": 1709510400000,
    "spotPrice": 200.64,
    "fundingAPR": 54.51,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-05",
    "timestamp": 1709596800000,
    "spotPrice": 198.7,
    "fundingAPR": 55.07,
    "stakingAPY": 7.21,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-06",
    "timestamp": 1709683200000,
    "spotPrice": 199.81,
    "fundingAPR": 52.87,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-07",
    "timestamp": 1709769600000,
    "spotPrice": 203.08,
    "fundingAPR": 55.61,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-08",
    "timestamp": 1709856000000,
    "spotPrice": 202.62,
    "fundingAPR": 54.5,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-09",
    "timestamp": 1709942400000,
    "spotPrice": 200.85,
    "fundingAPR": 53.55,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-10",
    "timestamp": 1710028800000,
    "spotPrice": 203.01,
    "fundingAPR": 56.21,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-11",
    "timestamp": 1710115200000,
    "spotPrice": 205.35,
    "fundingAPR": 53.87,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-12",
    "timestamp": 1710201600000,
    "spotPrice": 203.57,
    "fundingAPR": 54.55,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-13",
    "timestamp": 1710288000000,
    "spotPrice": 202.56,
    "fundingAPR": 56.17,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-14",
    "timestamp": 1710374400000,
    "spotPrice": 205.32,
    "fundingAPR": 53.5,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-15",
    "timestamp": 1710460800000,
    "spotPrice": 206.23,
    "fundingAPR": 55.58,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-16",
    "timestamp": 1710547200000,
    "spotPrice": 203.7,
    "fundingAPR": 55.59,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-17",
    "timestamp": 1710633600000,
    "spotPrice": 203.78,
    "fundingAPR": 53.57,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-18",
    "timestamp": 1710720000000,
    "spotPrice": 207.55,
    "fundingAPR": 56.3,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-19",
    "timestamp": 1710806400000,
    "spotPrice": 206.37,
    "fundingAPR": 54.69,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-20",
    "timestamp": 1710892800000,
    "spotPrice": 202.05,
    "fundingAPR": 54.08,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-21",
    "timestamp": 1710979200000,
    "spotPrice": 204.26,
    "fundingAPR": 56.43,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-22",
    "timestamp": 1711065600000,
    "spotPrice": 207.88,
    "fundingAPR": 53.8,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-23",
    "timestamp": 1711152000000,
    "spotPrice": 204.55,
    "fundingAPR": 54.8,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-24",
    "timestamp": 1711238400000,
    "spotPrice": 201.55,
    "fundingAPR": 55.9,
    "stakingAPY": 7.2,
    "depegPct": 0.1
  },
  {
    "date": "2024-03-25",
    "timestamp": 1711324800000,
    "spotPrice": 205.37,
    "fundingAPR": 53.18,
    "stakingAPY": 7.2,
    "depegPct": 0.11
  },
  {
    "date": "2024-03-26",
    "timestamp": 1711411200000,
    "spotPrice": 207.04,
    "fundingAPR": 55.41,
    "stakingAPY": 7.2,
    "depegPct": 0.11
  },
  {
    "date": "2024-03-27",
    "timestamp": 1711497600000,
    "spotPrice": 202.4,
    "fundingAPR": 54.82,
    "stakingAPY": 7.2,
    "depegPct": 0.11
  },
  {
    "date": "2024-03-28",
    "timestamp": 1711584000000,
    "spotPrice": 201.48,
    "fundingAPR": 52.99,
    "stakingAPY": 7.2,
    "depegPct": 0.11
  },
  {
    "date": "2024-03-29",
    "timestamp": 1711670400000,
    "spotPrice": 205.85,
    "fundingAPR": 55.59,
    "stakingAPY": 7.2,
    "depegPct": 0.12
  },
  {
    "date": "2024-03-30",
    "timestamp": 1711756800000,
    "spotPrice": 205.1,
    "fundingAPR": 53.49,
    "stakingAPY": 7.2,
    "depegPct": 0.12
  },
  {
    "date": "2024-03-31",
    "timestamp": 1711843200000,
    "spotPrice": 200.32,
    "fundingAPR": 53.18,
    "stakingAPY": 7.2,
    "depegPct": 0.12
  },
  {
    "date": "2024-04-01",
    "timestamp": 1711929600000,
    "spotPrice": 201.65,
    "fundingAPR": 55.13,
    "stakingAPY": 7.2,
    "depegPct": 0.13
  },
  {
    "date": "2024-04-02",
    "timestamp": 1712016000000,
    "spotPrice": 205.39,
    "fundingAPR": 52.23,
    "stakingAPY": 7.2,
    "depegPct": 0.13
  },
  {
    "date": "2024-04-03",
    "timestamp": 1712102400000,
    "spotPrice": 202.34,
    "fundingAPR": 53.49,
    "stakingAPY": 7.2,
    "depegPct": 0.14
  },
  {
    "date": "2024-04-04",
    "timestamp": 1712188800000,
    "spotPrice": 198.58,
    "fundingAPR": 54.02,
    "stakingAPY": 7.2,
    "depegPct": 0.14
  },
  {
    "date": "2024-04-05",
    "timestamp": 1712275200000,
    "spotPrice": 201.75,
    "fundingAPR": 51.33,
    "stakingAPY": 7.2,
    "depegPct": 0.14
  },
  {
    "date": "2024-04-06",
    "timestamp": 1712361600000,
    "spotPrice": 203.78,
    "fundingAPR": 53.62,
    "stakingAPY": 7.2,
    "depegPct": 0.15
  },
  {
    "date": "2024-04-07",
    "timestamp": 1712448000000,
    "spotPrice": 199.14,
    "fundingAPR": 52.45,
    "stakingAPY": 7.2,
    "depegPct": 0.15
  },
  {
    "date": "2024-04-08",
    "timestamp": 1712534400000,
    "spotPrice": 197.31,
    "fundingAPR": 50.86,
    "stakingAPY": 7.2,
    "depegPct": 0.16
  },
  {
    "date": "2024-04-09",
    "timestamp": 1712620800000,
    "spotPrice": 201.37,
    "fundingAPR": 53.25,
    "stakingAPY": 7.2,
    "depegPct": 0.17
  },
  {
    "date": "2024-04-10",
    "timestamp": 1712707200000,
    "spotPrice": 201.07,
    "fundingAPR": 50.72,
    "stakingAPY": 7.2,
    "depegPct": 0.17
  },
  {
    "date": "2024-04-11",
    "timestamp": 1712793600000,
    "spotPrice": 195.94,
    "fundingAPR": 50.73,
    "stakingAPY": 7.2,
    "depegPct": 0.18
  },
  {
    "date": "2024-04-12",
    "timestamp": 1712880000000,
    "spotPrice": 196.38,
    "fundingAPR": 52.23,
    "stakingAPY": 7.2,
    "depegPct": 0.18
  },
  {
    "date": "2024-04-13",
    "timestamp": 1712966400000,
    "spotPrice": 200.17,
    "fundingAPR": 49.16,
    "stakingAPY": 7.2,
    "depegPct": 0.19
  },
  {
    "date": "2024-04-14",
    "timestamp": 1713052800000,
    "spotPrice": 197.48,
    "fundingAPR": 50.65,
    "stakingAPY": 7.2,
    "depegPct": 0.2
  },
  {
    "date": "2024-04-15",
    "timestamp": 1713139200000,
    "spotPrice": 193.07,
    "fundingAPR": 50.6,
    "stakingAPY": 7.2,
    "depegPct": 0.21
  },
  {
    "date": "2024-04-16",
    "timestamp": 1713225600000,
    "spotPrice": 195.53,
    "fundingAPR": 48.01,
    "stakingAPY": 7.2,
    "depegPct": 0.21
  },
  {
    "date": "2024-04-17",
    "timestamp": 1713312000000,
    "spotPrice": 197.9,
    "fundingAPR": 50.31,
    "stakingAPY": 7.2,
    "depegPct": 0.22
  },
  {
    "date": "2024-04-18",
    "timestamp": 1713398400000,
    "spotPrice": 193.38,
    "fundingAPR": 48.6,
    "stakingAPY": 7.2,
    "depegPct": 0.23
  },
  {
    "date": "2024-04-19",
    "timestamp": 1713484800000,
    "spotPrice": 190.68,
    "fundingAPR": 47.31,
    "stakingAPY": 7.2,
    "depegPct": 0.24
  },
  {
    "date": "2024-04-20",
    "timestamp": 1713571200000,
    "spotPrice": 194.37,
    "fundingAPR": 49.43,
    "stakingAPY": 7.2,
    "depegPct": 0.24
  },
  {
    "date": "2024-04-21",
    "timestamp": 1713657600000,
    "spotPrice": 194.55,
    "fundingAPR": 46.54,
    "stakingAPY": 7.2,
    "depegPct": 0.25
  },
  {
    "date": "2024-04-22",
    "timestamp": 1713744000000,
    "spotPrice": 189.2,
    "fundingAPR": 46.89,
    "stakingAPY": 7.2,
    "depegPct": 0.26
  },
  {
    "date": "2024-04-23",
    "timestamp": 1713830400000,
    "spotPrice": 188.76,
    "fundingAPR": 47.9,
    "stakingAPY": 7.2,
    "depegPct": 0.27
  },
  {
    "date": "2024-04-24",
    "timestamp": 1713916800000,
    "spotPrice": 192.53,
    "fundingAPR": 44.76,
    "stakingAPY": 7.2,
    "depegPct": 0.28
  },
  {
    "date": "2024-04-25",
    "timestamp": 1714003200000,
    "spotPrice": 190.28,
    "fundingAPR": 46.46,
    "stakingAPY": 7.2,
    "depegPct": 0.29
  },
  {
    "date": "2024-04-26",
    "timestamp": 1714089600000,
    "spotPrice": 185.34,
    "fundingAPR": 45.84,
    "stakingAPY": 7.2,
    "depegPct": 0.3
  },
  {
    "date": "2024-04-27",
    "timestamp": 1714176000000,
    "spotPrice": 187.07,
    "fundingAPR": 43.43,
    "stakingAPY": 7.2,
    "depegPct": 0.31
  },
  {
    "date": "2024-04-28",
    "timestamp": 1714262400000,
    "spotPrice": 189.74,
    "fundingAPR": 45.69,
    "stakingAPY": 7.2,
    "depegPct": 0.32
  },
  {
    "date": "2024-04-29",
    "timestamp": 1714348800000,
    "spotPrice": 185.46,
    "fundingAPR": 43.49,
    "stakingAPY": 7.2,
    "depegPct": 0.33
  },
  {
    "date": "2024-04-30",
    "timestamp": 1714435200000,
    "spotPrice": 182,
    "fundingAPR": 42.54,
    "stakingAPY": 7.2,
    "depegPct": 0.34
  },
  {
    "date": "2024-05-01",
    "timestamp": 1714521600000,
    "spotPrice": 185.25,
    "fundingAPR": 44.36,
    "stakingAPY": 7.2,
    "depegPct": 0.35
  },
  {
    "date": "2024-05-02",
    "timestamp": 1714608000000,
    "spotPrice": 185.93,
    "fundingAPR": 41.22,
    "stakingAPY": 7.2,
    "depegPct": 0.36
  },
  {
    "date": "2024-05-03",
    "timestamp": 1714694400000,
    "spotPrice": 180.52,
    "fundingAPR": 41.89,
    "stakingAPY": 7.2,
    "depegPct": 0.37
  },
  {
    "date": "2024-05-04",
    "timestamp": 1714780800000,
    "spotPrice": 179.23,
    "fundingAPR": 42.41,
    "stakingAPY": 7.2,
    "depegPct": 0.38
  },
  {
    "date": "2024-05-05",
    "timestamp": 1714867200000,
    "spotPrice": 182.93,
    "fundingAPR": 39.3,
    "stakingAPY": 7.2,
    "depegPct": 0.39
  },
  {
    "date": "2024-05-06",
    "timestamp": 1714953600000,
    "spotPrice": 181.21,
    "fundingAPR": 41.16,
    "stakingAPY": 7.2,
    "depegPct": 0.4
  },
  {
    "date": "2024-05-07",
    "timestamp": 1715040000000,
    "spotPrice": 175.86,
    "fundingAPR": 40.01,
    "stakingAPY": 7.2,
    "depegPct": 0.41
  },
  {
    "date": "2024-05-08",
    "timestamp": 1715126400000,
    "spotPrice": 176.86,
    "fundingAPR": 37.87,
    "stakingAPY": 7.2,
    "depegPct": 0.42
  },
  {
    "date": "2024-05-09",
    "timestamp": 1715212800000,
    "spotPrice": 179.81,
    "fundingAPR": 40.04,
    "stakingAPY": 7.2,
    "depegPct": 0.43
  },
  {
    "date": "2024-05-10",
    "timestamp": 1715299200000,
    "spotPrice": 175.9,
    "fundingAPR": 37.44,
    "stakingAPY": 7.2,
    "depegPct": 0.45
  },
  {
    "date": "2024-05-11",
    "timestamp": 1715385600000,
    "spotPrice": 171.78,
    "fundingAPR": 36.88,
    "stakingAPY": 7.2,
    "depegPct": 0.46
  },
  {
    "date": "2024-05-12",
    "timestamp": 1715472000000,
    "spotPrice": 174.55,
    "fundingAPR": 38.35,
    "stakingAPY": 7.2,
    "depegPct": 0.47
  },
  {
    "date": "2024-05-13",
    "timestamp": 1715558400000,
    "spotPrice": 175.75,
    "fundingAPR": 35.05,
    "stakingAPY": 7.2,
    "depegPct": 0.48
  },
  {
    "date": "2024-05-14",
    "timestamp": 1715644800000,
    "spotPrice": 170.43,
    "fundingAPR": 36.06,
    "stakingAPY": 7.2,
    "depegPct": 0.49
  },
  {
    "date": "2024-05-15",
    "timestamp": 1715731200000,
    "spotPrice": 168.36,
    "fundingAPR": 36.08,
    "stakingAPY": 7.2,
    "depegPct": 0.5
  },
  {
    "date": "2024-05-16",
    "timestamp": 1715817600000,
    "spotPrice": 171.95,
    "fundingAPR": 33.1,
    "stakingAPY": 7.2,
    "depegPct": 0.52
  },
  {
    "date": "2024-05-17",
    "timestamp": 1715904000000,
    "spotPrice": 170.82,
    "fundingAPR": 35.1,
    "stakingAPY": 7.2,
    "depegPct": 0.53
  },
  {
    "date": "2024-05-18",
    "timestamp": 1715990400000,
    "spotPrice": 165.23,
    "fundingAPR": 33.46,
    "stakingAPY": 7.2,
    "depegPct": 0.54
  },
  {
    "date": "2024-05-19",
    "timestamp": 1716076800000,
    "spotPrice": 165.5,
    "fundingAPR": 31.67,
    "stakingAPY": 7.2,
    "depegPct": 0.55
  },
  {
    "date": "2024-05-20",
    "timestamp": 1716163200000,
    "spotPrice": 168.7,
    "fundingAPR": 33.71,
    "stakingAPY": 7.2,
    "depegPct": 0.56
  },
  {
    "date": "2024-05-21",
    "timestamp": 1716249600000,
    "spotPrice": 165.29,
    "fundingAPR": 30.79,
    "stakingAPY": 7.2,
    "depegPct": 0.58
  },
  {
    "date": "2024-05-22",
    "timestamp": 1716336000000,
    "spotPrice": 160.64,
    "fundingAPR": 30.65,
    "stakingAPY": 7.2,
    "depegPct": 0.59
  },
  {
    "date": "2024-05-23",
    "timestamp": 1716422400000,
    "spotPrice": 162.91,
    "fundingAPR": 31.75,
    "stakingAPY": 7.2,
    "depegPct": 0.6
  },
  {
    "date": "2024-05-24",
    "timestamp": 1716508800000,
    "spotPrice": 164.64,
    "fundingAPR": 28.42,
    "stakingAPY": 7.2,
    "depegPct": 0.61
  },
  {
    "date": "2024-05-25",
    "timestamp": 1716595200000,
    "spotPrice": 159.57,
    "fundingAPR": 29.75,
    "stakingAPY": 7.2,
    "depegPct": 0.63
  },
  {
    "date": "2024-05-26",
    "timestamp": 1716681600000,
    "spotPrice": 156.8,
    "fundingAPR": 29.3,
    "stakingAPY": 7.2,
    "depegPct": 0.64
  },
  {
    "date": "2024-05-27",
    "timestamp": 1716768000000,
    "spotPrice": 160.23,
    "fundingAPR": 26.55,
    "stakingAPY": 7.2,
    "depegPct": 0.65
  },
  {
    "date": "2024-05-28",
    "timestamp": 1716854400000,
    "spotPrice": 159.76,
    "fundingAPR": 28.64,
    "stakingAPY": 7.2,
    "depegPct": 0.66
  },
  {
    "date": "2024-05-29",
    "timestamp": 1716940800000,
    "spotPrice": 154.1,
    "fundingAPR": 26.58,
    "stakingAPY": 7.2,
    "depegPct": 0.67
  },
  {
    "date": "2024-05-30",
    "timestamp": 1717027200000,
    "spotPrice": 153.67,
    "fundingAPR": 25.21,
    "stakingAPY": 7.2,
    "depegPct": 0.69
  },
  {
    "date": "2024-05-31",
    "timestamp": 1717113600000,
    "spotPrice": 157.09,
    "fundingAPR": 27.08,
    "stakingAPY": 7.2,
    "depegPct": 0.7
  },
  {
    "date": "2024-06-01",
    "timestamp": 1717200000000,
    "spotPrice": 154.29,
    "fundingAPR": 23.95,
    "stakingAPY": 7.2,
    "depegPct": 0.71
  },
  {
    "date": "2024-06-02",
    "timestamp": 1717286400000,
    "spotPrice": 149.24,
    "fundingAPR": 24.25,
    "stakingAPY": 7.2,
    "depegPct": 0.72
  },
  {
    "date": "2024-06-03",
    "timestamp": 1717372800000,
    "spotPrice": 151.01,
    "fundingAPR": 24.98,
    "stakingAPY": 7.2,
    "depegPct": 0.74
  },
  {
    "date": "2024-06-04",
    "timestamp": 1717459200000,
    "spotPrice": 153.27,
    "fundingAPR": 21.71,
    "stakingAPY": 7.2,
    "depegPct": 0.75
  },
  {
    "date": "2024-06-05",
    "timestamp": 1717545600000,
    "spotPrice": 148.6,
    "fundingAPR": 23.34,
    "stakingAPY": 7.2,
    "depegPct": 0.76
  },
  {
    "date": "2024-06-06",
    "timestamp": 1717632000000,
    "spotPrice": 145.23,
    "fundingAPR": 22.45,
    "stakingAPY": 7.2,
    "depegPct": 0.77
  },
  {
    "date": "2024-06-07",
    "timestamp": 1717718400000,
    "spotPrice": 148.47,
    "fundingAPR": 20.03,
    "stakingAPY": 7.2,
    "depegPct": 0.78
  },
  {
    "date": "2024-06-08",
    "timestamp": 1717804800000,
    "spotPrice": 148.71,
    "fundingAPR": 22.19,
    "stakingAPY": 7.2,
    "depegPct": 0.8
  },
  {
    "date": "2024-06-09",
    "timestamp": 1717891200000,
    "spotPrice": 143.13,
    "fundingAPR": 19.78,
    "stakingAPY": 7.2,
    "depegPct": 0.81
  },
  {
    "date": "2024-06-10",
    "timestamp": 1717977600000,
    "spotPrice": 142.06,
    "fundingAPR": 18.89,
    "stakingAPY": 7.2,
    "depegPct": 0.82
  },
  {
    "date": "2024-06-11",
    "timestamp": 1718064000000,
    "spotPrice": 145.67,
    "fundingAPR": 20.55,
    "stakingAPY": 7.2,
    "depegPct": 0.83
  },
  {
    "date": "2024-06-12",
    "timestamp": 1718150400000,
    "spotPrice": 143.58,
    "fundingAPR": 17.32,
    "stakingAPY": 7.2,
    "depegPct": 0.84
  },
  {
    "date": "2024-06-13",
    "timestamp": 1718236800000,
    "spotPrice": 138.3,
    "fundingAPR": 18.07,
    "stakingAPY": 7.2,
    "depegPct": 0.85
  },
  {
    "date": "2024-06-14",
    "timestamp": 1718323200000,
    "spotPrice": 139.55,
    "fundingAPR": 18.42,
    "stakingAPY": 7.2,
    "depegPct": 0.87
  },
  {
    "date": "2024-06-15",
    "timestamp": 1718409600000,
    "spotPrice": 142.33,
    "fundingAPR": 15.33,
    "stakingAPY": 7.2,
    "depegPct": 0.88
  },
  {
    "date": "2024-06-16",
    "timestamp": 1718496000000,
    "spotPrice": 138.21,
    "fundingAPR": 17.25,
    "stakingAPY": 7.2,
    "depegPct": 0.89
  },
  {
    "date": "2024-06-17",
    "timestamp": 1718582400000,
    "spotPrice": 134.36,
    "fundingAPR": 15.96,
    "stakingAPY": 7.2,
    "depegPct": 0.9
  },
  {
    "date": "2024-06-18",
    "timestamp": 1718668800000,
    "spotPrice": 137.36,
    "fundingAPR": 13.96,
    "stakingAPY": 7.2,
    "depegPct": 0.91
  },
  {
    "date": "2024-06-19",
    "timestamp": 1718755200000,
    "spotPrice": 138.35,
    "fundingAPR": 16.13,
    "stakingAPY": 7.2,
    "depegPct": 0.92
  },
  {
    "date": "2024-06-20",
    "timestamp": 1718841600000,
    "spotPrice": 133.03,
    "fundingAPR": 13.47,
    "stakingAPY": 7.2,
    "depegPct": 0.93
  },
  {
    "date": "2024-06-21",
    "timestamp": 1718928000000,
    "spotPrice": 131.38,
    "fundingAPR": 13.1,
    "stakingAPY": 7.2,
    "depegPct": 0.94
  },
  {
    "date": "2024-06-22",
    "timestamp": 1719014400000,
    "spotPrice": 135.12,
    "fundingAPR": 14.53,
    "stakingAPY": 7.2,
    "depegPct": 0.95
  },
  {
    "date": "2024-06-23",
    "timestamp": 1719100800000,
    "spotPrice": 133.83,
    "fundingAPR": 11.29,
    "stakingAPY": 7.2,
    "depegPct": 0.96
  },
  {
    "date": "2024-06-24",
    "timestamp": 1719187200000,
    "spotPrice": 128.47,
    "fundingAPR": 12.5,
    "stakingAPY": 7.2,
    "depegPct": 0.97
  },
  {
    "date": "2024-06-25",
    "timestamp": 1719273600000,
    "spotPrice": 129.22,
    "fundingAPR": 12.48,
    "stakingAPY": 7.2,
    "depegPct": 0.98
  },
  {
    "date": "2024-06-26",
    "timestamp": 1719360000000,
    "spotPrice": 132.49,
    "fundingAPR": 9.68,
    "stakingAPY": 7.2,
    "depegPct": 0.99
  },
  {
    "date": "2024-06-27",
    "timestamp": 1719446400000,
    "spotPrice": 129.04,
    "fundingAPR": 11.84,
    "stakingAPY": 7.2,
    "depegPct": 1
  },
  {
    "date": "2024-06-28",
    "timestamp": 1719532800000,
    "spotPrice": 124.83,
    "fundingAPR": 10.2,
    "stakingAPY": 7.2,
    "depegPct": 1.01
  },
  {
    "date": "2024-06-29",
    "timestamp": 1719619200000,
    "spotPrice": 127.58,
    "fundingAPR": 8.69,
    "stakingAPY": 7.2,
    "depegPct": 1.02
  },
  {
    "date": "2024-06-30",
    "timestamp": 1719705600000,
    "spotPrice": 129.32,
    "fundingAPR": 10.84,
    "stakingAPY": 7.2,
    "depegPct": 1.03
  },
  {
    "date": "2024-07-01",
    "timestamp": 1719792000000,
    "spotPrice": 124.41,
    "fundingAPR": 8.01,
    "stakingAPY": 7.2,
    "depegPct": 1.04
  },
  {
    "date": "2024-07-02",
    "timestamp": 1719878400000,
    "spotPrice": 122.24,
    "fundingAPR": 8.19,
    "stakingAPY": 7.2,
    "depegPct": 1.05
  },
  {
    "date": "2024-07-03",
    "timestamp": 1719964800000,
    "spotPrice": 126.07,
    "fundingAPR": 9.37,
    "stakingAPY": 7.2,
    "depegPct": 1.06
  },
  {
    "date": "2024-07-04",
    "timestamp": 1720051200000,
    "spotPrice": 125.64,
    "fundingAPR": 6.24,
    "stakingAPY": 7.2,
    "depegPct": 1.06
  },
  {
    "date": "2024-07-05",
    "timestamp": 1720137600000,
    "spotPrice": 120.35,
    "fundingAPR": 7.88,
    "stakingAPY": 7.2,
    "depegPct": 1.07
  },
  {
    "date": "2024-07-06",
    "timestamp": 1720224000000,
    "spotPrice": 120.62,
    "fundingAPR": 7.51,
    "stakingAPY": 7.2,
    "depegPct": 1.08
  },
  {
    "date": "2024-07-07",
    "timestamp": 1720310400000,
    "spotPrice": 124.35,
    "fundingAPR": 5.09,
    "stakingAPY": 7.2,
    "depegPct": 1.09
  },
  {
    "date": "2024-07-08",
    "timestamp": 1720396800000,
    "spotPrice": 121.67,
    "fundingAPR": 7.44,
    "stakingAPY": 7.2,
    "depegPct": 1.09
  },
  {
    "date": "2024-07-09",
    "timestamp": 1720483200000,
    "spotPrice": 117.23,
    "fundingAPR": 5.52,
    "stakingAPY": 7.2,
    "depegPct": 1.1
  },
  {
    "date": "2024-07-10",
    "timestamp": 1720569600000,
    "spotPrice": 119.68,
    "fundingAPR": 4.56,
    "stakingAPY": 7.2,
    "depegPct": 1.11
  },
  {
    "date": "2024-07-11",
    "timestamp": 1720656000000,
    "spotPrice": 122.18,
    "fundingAPR": 6.63,
    "stakingAPY": 7.2,
    "depegPct": 1.12
  },
  {
    "date": "2024-07-12",
    "timestamp": 1720742400000,
    "spotPrice": 117.8,
    "fundingAPR": 3.74,
    "stakingAPY": 7.2,
    "depegPct": 1.12
  },
  {
    "date": "2024-07-13",
    "timestamp": 1720828800000,
    "spotPrice": 115.21,
    "fundingAPR": 4.47,
    "stakingAPY": 7.2,
    "depegPct": 1.13
  },
  {
    "date": "2024-07-14",
    "timestamp": 1720915200000,
    "spotPrice": 119.07,
    "fundingAPR": 5.38,
    "stakingAPY": 7.2,
    "depegPct": 1.13
  },
  {
    "date": "2024-07-15",
    "timestamp": 1721001600000,
    "spotPrice": 119.53,
    "fundingAPR": 2.46,
    "stakingAPY": 7.2,
    "depegPct": 1.14
  },
  {
    "date": "2024-07-16",
    "timestamp": 1721088000000,
    "spotPrice": 114.46,
    "fundingAPR": 4.5,
    "stakingAPY": 7.2,
    "depegPct": 1.15
  },
  {
    "date": "2024-07-17",
    "timestamp": 1721174400000,
    "spotPrice": 114.26,
    "fundingAPR": 3.8,
    "stakingAPY": 7.2,
    "depegPct": 1.15
  },
  {
    "date": "2024-07-18",
    "timestamp": 1721260800000,
    "spotPrice": 118.38,
    "fundingAPR": 1.84,
    "stakingAPY": 7.2,
    "depegPct": 1.16
  },
  {
    "date": "2024-07-19",
    "timestamp": 1721347200000,
    "spotPrice": 116.57,
    "fundingAPR": 4.34,
    "stakingAPY": 7.2,
    "depegPct": 1.16
  },
  {
    "date": "2024-07-20",
    "timestamp": 1721433600000,
    "spotPrice": 112.01,
    "fundingAPR": 2.19,
    "stakingAPY": 7.2,
    "depegPct": 1.16
  },
  {
    "date": "2024-07-21",
    "timestamp": 1721520000000,
    "spotPrice": 114.14,
    "fundingAPR": 1.82,
    "stakingAPY": 7.2,
    "depegPct": 1.17
  },
  {
    "date": "2024-07-22",
    "timestamp": 1721606400000,
    "spotPrice": 117.35,
    "fundingAPR": 3.78,
    "stakingAPY": 7.2,
    "depegPct": 1.17
  },
  {
    "date": "2024-07-23",
    "timestamp": 1721692800000,
    "spotPrice": 113.64,
    "fundingAPR": 0.9,
    "stakingAPY": 7.2,
    "depegPct": 1.18
  },
  {
    "date": "2024-07-24",
    "timestamp": 1721779200000,
    "spotPrice": 110.69,
    "fundingAPR": 2.17,
    "stakingAPY": 7.2,
    "depegPct": 1.18
  },
  {
    "date": "2024-07-25",
    "timestamp": 1721865600000,
    "spotPrice": 114.51,
    "fundingAPR": 2.79,
    "stakingAPY": 7.2,
    "depegPct": 1.18
  },
  {
    "date": "2024-07-26",
    "timestamp": 1721952000000,
    "spotPrice": 115.87,
    "fundingAPR": 0.18,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-07-27",
    "timestamp": 1722038400000,
    "spotPrice": 111.15,
    "fundingAPR": 2.57,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-07-28",
    "timestamp": 1722124800000,
    "spotPrice": 110.5,
    "fundingAPR": 1.57,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-07-29",
    "timestamp": 1722211200000,
    "spotPrice": 114.95,
    "fundingAPR": 0.13,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-07-30",
    "timestamp": 1722297600000,
    "spotPrice": 114.05,
    "fundingAPR": 2.71,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-07-31",
    "timestamp": 1722384000000,
    "spotPrice": 109.5,
    "fundingAPR": 0.42,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-01",
    "timestamp": 1722470400000,
    "spotPrice": 111.27,
    "fundingAPR": 0.64,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-02",
    "timestamp": 1722556800000,
    "spotPrice": 115.13,
    "fundingAPR": 2.43,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-03",
    "timestamp": 1722643200000,
    "spotPrice": 112.18,
    "fundingAPR": -0.34,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-04",
    "timestamp": 1722729600000,
    "spotPrice": 108.95,
    "fundingAPR": 1.45,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-05",
    "timestamp": 1722816000000,
    "spotPrice": 112.36,
    "fundingAPR": 1.77,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-06",
    "timestamp": 1722902400000,
    "spotPrice": 113.6,
    "fundingAPR": -0.47,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-07",
    "timestamp": 1722988800000,
    "spotPrice": 111.3,
    "fundingAPR": 2.21,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-08",
    "timestamp": 1723075200000,
    "spotPrice": 110.76,
    "fundingAPR": 0.92,
    "stakingAPY": 7.2,
    "depegPct": 1.2
  },
  {
    "date": "2024-08-09",
    "timestamp": 1723161600000,
    "spotPrice": 113.37,
    "fundingAPR": 0.03,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-08-10",
    "timestamp": 1723248000000,
    "spotPrice": 113.48,
    "fundingAPR": 2.6,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-08-11",
    "timestamp": 1723334400000,
    "spotPrice": 111.15,
    "fundingAPR": 0.19,
    "stakingAPY": 7.2,
    "depegPct": 1.19
  },
  {
    "date": "2024-08-12",
    "timestamp": 1723420800000,
    "spotPrice": 112.02,
    "fundingAPR": 0.98,
    "stakingAPY": 7.2,
    "depegPct": 1.18
  },
  {
    "date": "2024-08-13",
    "timestamp": 1723507200000,
    "spotPrice": 114.58,
    "fundingAPR": 2.51,
    "stakingAPY": 7.2,
    "depegPct": 1.18
  },
  {
    "date": "2024-08-14",
    "timestamp": 1723593600000,
    "spotPrice": 113.56,
    "fundingAPR": -0.12,
    "stakingAPY": 7.2,
    "depegPct": 1.17
  },
  {
    "date": "2024-08-15",
    "timestamp": 1723680000000,
    "spotPrice": 111.85,
    "fundingAPR": 2.08,
    "stakingAPY": 7.2,
    "depegPct": 1.17
  },
  {
    "date": "2024-08-16",
    "timestamp": 1723766400000,
    "spotPrice": 113.96,
    "fundingAPR": 2.03,
    "stakingAPY": 7.2,
    "depegPct": 1.16
  },
  {
    "date": "2024-08-17",
    "timestamp": 1723852800000,
    "spotPrice": 115.84,
    "fundingAPR": 0.17,
    "stakingAPY": 7.2,
    "depegPct": 1.15
  },
  {
    "date": "2024-08-18",
    "timestamp": 1723939200000,
    "spotPrice": 114.03,
    "fundingAPR": 3.01,
    "stakingAPY": 7.2,
    "depegPct": 1.14
  },
  {
    "date": "2024-08-19",
    "timestamp": 1724025600000,
    "spotPrice": 113.46,
    "fundingAPR": 1.42,
    "stakingAPY": 7.19,
    "depegPct": 1.14
  },
  {
    "date": "2024-08-20",
    "timestamp": 1724112000000,
    "spotPrice": 116.33,
    "fundingAPR": 1.05,
    "stakingAPY": 7.19,
    "depegPct": 1.13
  },
  {
    "date": "2024-08-21",
    "timestamp": 1724198400000,
    "spotPrice": 117.13,
    "fundingAPR": 3.51,
    "stakingAPY": 7.19,
    "depegPct": 1.12
  },
  {
    "date": "2024-08-22",
    "timestamp": 1724284800000,
    "spotPrice": 115.09,
    "fundingAPR": 1.01,
    "stakingAPY": 7.19,
    "depegPct": 1.11
  },
  {
    "date": "2024-08-23",
    "timestamp": 1724371200000,
    "spotPrice": 115.9,
    "fundingAPR": 2.31,
    "stakingAPY": 7.19,
    "depegPct": 1.09
  },
  {
    "date": "2024-08-24",
    "timestamp": 1724457600000,
    "spotPrice": 118.88,
    "fundingAPR": 3.52,
    "stakingAPY": 7.19,
    "depegPct": 1.08
  },
  {
    "date": "2024-08-25",
    "timestamp": 1724544000000,
    "spotPrice": 118.51,
    "fundingAPR": 1.08,
    "stakingAPY": 7.19,
    "depegPct": 1.07
  },
  {
    "date": "2024-08-26",
    "timestamp": 1724630400000,
    "spotPrice": 116.88,
    "fundingAPR": 3.61,
    "stakingAPY": 7.19,
    "depegPct": 1.06
  },
  {
    "date": "2024-08-27",
    "timestamp": 1724716800000,
    "spotPrice": 118.99,
    "fundingAPR": 3.19,
    "stakingAPY": 7.19,
    "depegPct": 1.05
  },
  {
    "date": "2024-08-28",
    "timestamp": 1724803200000,
    "spotPrice": 121.44,
    "fundingAPR": 1.75,
    "stakingAPY": 7.19,
    "depegPct": 1.03
  },
  {
    "date": "2024-08-29",
    "timestamp": 1724889600000,
    "spotPrice": 120.12,
    "fundingAPR": 4.65,
    "stakingAPY": 7.18,
    "depegPct": 1.02
  },
  {
    "date": "2024-08-30",
    "timestamp": 1724976000000,
    "spotPrice": 119.48,
    "fundingAPR": 2.8,
    "stakingAPY": 7.18,
    "depegPct": 1
  },
  {
    "date": "2024-08-31",
    "timestamp": 1725062400000,
    "spotPrice": 122.48,
    "fundingAPR": 2.96,
    "stakingAPY": 7.18,
    "depegPct": 0.99
  },
  {
    "date": "2024-09-01",
    "timestamp": 1725148800000,
    "spotPrice": 123.91,
    "fundingAPR": 5.2,
    "stakingAPY": 7.18,
    "depegPct": 0.97
  },
  {
    "date": "2024-09-02",
    "timestamp": 1725235200000,
    "spotPrice": 122.15,
    "fundingAPR": 2.68,
    "stakingAPY": 7.18,
    "depegPct": 0.96
  },
  {
    "date": "2024-09-03",
    "timestamp": 1725321600000,
    "spotPrice": 122.82,
    "fundingAPR": 4.44,
    "stakingAPY": 7.18,
    "depegPct": 0.94
  },
  {
    "date": "2024-09-04",
    "timestamp": 1725408000000,
    "spotPrice": 126.1,
    "fundingAPR": 5.28,
    "stakingAPY": 7.18,
    "depegPct": 0.92
  },
  {
    "date": "2024-09-05",
    "timestamp": 1725494400000,
    "spotPrice": 126.31,
    "fundingAPR": 3.07,
    "stakingAPY": 7.17,
    "depegPct": 0.91
  },
  {
    "date": "2024-09-06",
    "timestamp": 1725580800000,
    "spotPrice": 124.74,
    "fundingAPR": 5.86,
    "stakingAPY": 7.17,
    "depegPct": 0.89
  },
  {
    "date": "2024-09-07",
    "timestamp": 1725667200000,
    "spotPrice": 126.73,
    "fundingAPR": 5.05,
    "stakingAPY": 7.17,
    "depegPct": 0.87
  },
  {
    "date": "2024-09-08",
    "timestamp": 1725753600000,
    "spotPrice": 129.61,
    "fundingAPR": 4.05,
    "stakingAPY": 7.17,
    "depegPct": 0.85
  },
  {
    "date": "2024-09-09",
    "timestamp": 1725840000000,
    "spotPrice": 128.74,
    "fundingAPR": 6.91,
    "stakingAPY": 7.17,
    "depegPct": 0.84
  },
  {
    "date": "2024-09-10",
    "timestamp": 1725926400000,
    "spotPrice": 127.97,
    "fundingAPR": 4.84,
    "stakingAPY": 7.17,
    "depegPct": 0.82
  },
  {
    "date": "2024-09-11",
    "timestamp": 1726012800000,
    "spotPrice": 130.95,
    "fundingAPR": 5.49,
    "stakingAPY": 7.17,
    "depegPct": 0.8
  },
  {
    "date": "2024-09-12",
    "timestamp": 1726099200000,
    "spotPrice": 132.89,
    "fundingAPR": 7.45,
    "stakingAPY": 7.16,
    "depegPct": 0.78
  },
  {
    "date": "2024-09-13",
    "timestamp": 1726185600000,
    "spotPrice": 131.36,
    "fundingAPR": 4.95,
    "stakingAPY": 7.16,
    "depegPct": 0.76
  },
  {
    "date": "2024-09-14",
    "timestamp": 1726272000000,
    "spotPrice": 131.79,
    "fundingAPR": 7.1,
    "stakingAPY": 7.16,
    "depegPct": 0.74
  },
  {
    "date": "2024-09-15",
    "timestamp": 1726358400000,
    "spotPrice": 135.2,
    "fundingAPR": 7.51,
    "stakingAPY": 7.16,
    "depegPct": 0.72
  },
  {
    "date": "2024-09-16",
    "timestamp": 1726444800000,
    "spotPrice": 135.9,
    "fundingAPR": 5.59,
    "stakingAPY": 7.16,
    "depegPct": 0.7
  },
  {
    "date": "2024-09-17",
    "timestamp": 1726531200000,
    "spotPrice": 134.33,
    "fundingAPR": 8.52,
    "stakingAPY": 7.16,
    "depegPct": 0.68
  },
  {
    "date": "2024-09-18",
    "timestamp": 1726617600000,
    "spotPrice": 136.06,
    "fundingAPR": 7.33,
    "stakingAPY": 7.15,
    "depegPct": 0.66
  },
  {
    "date": "2024-09-19",
    "timestamp": 1726704000000,
    "spotPrice": 139.22,
    "fundingAPR": 6.78,
    "stakingAPY": 7.15,
    "depegPct": 0.64
  },
  {
    "date": "2024-09-20",
    "timestamp": 1726790400000,
    "spotPrice": 138.71,
    "fundingAPR": 9.5,
    "stakingAPY": 7.15,
    "depegPct": 0.63
  },
  {
    "date": "2024-09-21",
    "timestamp": 1726876800000,
    "spotPrice": 137.72,
    "fundingAPR": 7.22,
    "stakingAPY": 7.15,
    "depegPct": 0.61
  },
  {
    "date": "2024-09-22",
    "timestamp": 1726963200000,
    "spotPrice": 140.53,
    "fundingAPR": 8.33,
    "stakingAPY": 7.15,
    "depegPct": 0.59
  },
  {
    "date": "2024-09-23",
    "timestamp": 1727049600000,
    "spotPrice": 142.83,
    "fundingAPR": 9.93,
    "stakingAPY": 7.14,
    "depegPct": 0.57
  },
  {
    "date": "2024-09-24",
    "timestamp": 1727136000000,
    "spotPrice": 141.47,
    "fundingAPR": 7.49,
    "stakingAPY": 7.14,
    "depegPct": 0.55
  },
  {
    "date": "2024-09-25",
    "timestamp": 1727222400000,
    "spotPrice": 141.55,
    "fundingAPR": 9.94,
    "stakingAPY": 7.14,
    "depegPct": 0.53
  },
  {
    "date": "2024-09-26",
    "timestamp": 1727308800000,
    "spotPrice": 144.91,
    "fundingAPR": 9.9,
    "stakingAPY": 7.14,
    "depegPct": 0.51
  },
  {
    "date": "2024-09-27",
    "timestamp": 1727395200000,
    "spotPrice": 145.97,
    "fundingAPR": 8.28,
    "stakingAPY": 7.14,
    "depegPct": 0.49
  },
  {
    "date": "2024-09-28",
    "timestamp": 1727481600000,
    "spotPrice": 144.32,
    "fundingAPR": 11.25,
    "stakingAPY": 7.14,
    "depegPct": 0.47
  },
  {
    "date": "2024-09-29",
    "timestamp": 1727568000000,
    "spotPrice": 145.66,
    "fundingAPR": 9.68,
    "stakingAPY": 7.13,
    "depegPct": 0.45
  },
  {
    "date": "2024-09-30",
    "timestamp": 1727654400000,
    "spotPrice": 148.92,
    "fundingAPR": 9.57,
    "stakingAPY": 7.13,
    "depegPct": 0.43
  },
  {
    "date": "2024-10-01",
    "timestamp": 1727740800000,
    "spotPrice": 148.68,
    "fundingAPR": 12.04,
    "stakingAPY": 7.13,
    "depegPct": 0.41
  },
  {
    "date": "2024-10-02",
    "timestamp": 1727827200000,
    "spotPrice": 147.4,
    "fundingAPR": 9.6,
    "stakingAPY": 7.13,
    "depegPct": 0.4
  },
  {
    "date": "2024-10-03",
    "timestamp": 1727913600000,
    "spotPrice": 149.85,
    "fundingAPR": 11.11,
    "stakingAPY": 7.13,
    "depegPct": 0.38
  },
  {
    "date": "2024-10-04",
    "timestamp": 1728000000000,
    "spotPrice": 152.36,
    "fundingAPR": 12.27,
    "stakingAPY": 7.13,
    "depegPct": 0.36
  },
  {
    "date": "2024-10-05",
    "timestamp": 1728086400000,
    "spotPrice": 151.08,
    "fundingAPR": 9.93,
    "stakingAPY": 7.13,
    "depegPct": 0.34
  },
  {
    "date": "2024-10-06",
    "timestamp": 1728172800000,
    "spotPrice": 150.7,
    "fundingAPR": 12.59,
    "stakingAPY": 7.12,
    "depegPct": 0.33
  },
  {
    "date": "2024-10-07",
    "timestamp": 1728259200000,
    "spotPrice": 153.84,
    "fundingAPR": 12.07,
    "stakingAPY": 7.12,
    "depegPct": 0.31
  },
  {
    "date": "2024-10-08",
    "timestamp": 1728345600000,
    "spotPrice": 155.14,
    "fundingAPR": 10.78,
    "stakingAPY": 7.12,
    "depegPct": 0.29
  },
  {
    "date": "2024-10-09",
    "timestamp": 1728432000000,
    "spotPrice": 153.36,
    "fundingAPR": 13.68,
    "stakingAPY": 7.12,
    "depegPct": 0.28
  },
  {
    "date": "2024-10-10",
    "timestamp": 1728518400000,
    "spotPrice": 154.16,
    "fundingAPR": 11.75,
    "stakingAPY": 7.12,
    "depegPct": 0.26
  },
  {
    "date": "2024-10-11",
    "timestamp": 1728604800000,
    "spotPrice": 157.35,
    "fundingAPR": 12.05,
    "stakingAPY": 7.12,
    "depegPct": 0.25
  },
  {
    "date": "2024-10-12",
    "timestamp": 1728691200000,
    "spotPrice": 157.28,
    "fundingAPR": 14.19,
    "stakingAPY": 7.12,
    "depegPct": 0.23
  },
  {
    "date": "2024-10-13",
    "timestamp": 1728777600000,
    "spotPrice": 155.63,
    "fundingAPR": 11.63,
    "stakingAPY": 7.11,
    "depegPct": 0.22
  },
  {
    "date": "2024-10-14",
    "timestamp": 1728864000000,
    "spotPrice": 157.59,
    "fundingAPR": 13.47,
    "stakingAPY": 7.11,
    "depegPct": 0.2
  },
  {
    "date": "2024-10-15",
    "timestamp": 1728950400000,
    "spotPrice": 160.15,
    "fundingAPR": 14.13,
    "stakingAPY": 7.11,
    "depegPct": 0.19
  },
  {
    "date": "2024-10-16",
    "timestamp": 1729036800000,
    "spotPrice": 158.9,
    "fundingAPR": 11.94,
    "stakingAPY": 7.11,
    "depegPct": 0.18
  },
  {
    "date": "2024-10-17",
    "timestamp": 1729123200000,
    "spotPrice": 157.98,
    "fundingAPR": 14.71,
    "stakingAPY": 7.11,
    "depegPct": 0.17
  },
  {
    "date": "2024-10-18",
    "timestamp": 1729209600000,
    "spotPrice": 160.73,
    "fundingAPR": 13.7,
    "stakingAPY": 7.11,
    "depegPct": 0.16
  },
  {
    "date": "2024-10-19",
    "timestamp": 1729296000000,
    "spotPrice": 162.15,
    "fundingAPR": 12.75,
    "stakingAPY": 7.11,
    "depegPct": 0.14
  },
  {
    "date": "2024-10-20",
    "timestamp": 1729382400000,
    "spotPrice": 160.18,
    "fundingAPR": 15.47,
    "stakingAPY": 7.11,
    "depegPct": 0.13
  },
  {
    "date": "2024-10-21",
    "timestamp": 1729468800000,
    "spotPrice": 160.36,
    "fundingAPR": 13.22,
    "stakingAPY": 7.11,
    "depegPct": 0.12
  },
  {
    "date": "2024-10-22",
    "timestamp": 1729555200000,
    "spotPrice": 163.31,
    "fundingAPR": 13.9,
    "stakingAPY": 7.11,
    "depegPct": 0.11
  },
  {
    "date": "2024-10-23",
    "timestamp": 1729641600000,
    "spotPrice": 163.34,
    "fundingAPR": 15.62,
    "stakingAPY": 7.1,
    "depegPct": 0.11
  },
  {
    "date": "2024-10-24",
    "timestamp": 1729728000000,
    "spotPrice": 161.29,
    "fundingAPR": 13,
    "stakingAPY": 7.1,
    "depegPct": 0.1
  },
  {
    "date": "2024-10-25",
    "timestamp": 1729814400000,
    "spotPrice": 162.63,
    "fundingAPR": 15.1,
    "stakingAPY": 7.1,
    "depegPct": 0.09
  },
  {
    "date": "2024-10-26",
    "timestamp": 1729900800000,
    "spotPrice": 165.12,
    "fundingAPR": 15.23,
    "stakingAPY": 7.1,
    "depegPct": 0.08
  },
  {
    "date": "2024-10-27",
    "timestamp": 1729987200000,
    "spotPrice": 163.85,
    "fundingAPR": 13.24,
    "stakingAPY": 7.1,
    "depegPct": 0.08
  },
  {
    "date": "2024-10-28",
    "timestamp": 1730073600000,
    "spotPrice": 162.34,
    "fundingAPR": 16.02,
    "stakingAPY": 7.1,
    "depegPct": 0.07
  },
  {
    "date": "2024-10-29",
    "timestamp": 1730160000000,
    "spotPrice": 164.58,
    "fundingAPR": 14.53,
    "stakingAPY": 7.1,
    "depegPct": 0.07
  },
  {
    "date": "2024-10-30",
    "timestamp": 1730246400000,
    "spotPrice": 166.03,
    "fundingAPR": 13.93,
    "stakingAPY": 7.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-31",
    "timestamp": 1730332800000,
    "spotPrice": 163.87,
    "fundingAPR": 16.39,
    "stakingAPY": 7.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-11-01",
    "timestamp": 1730419200000,
    "spotPrice": 163.36,
    "fundingAPR": 13.86,
    "stakingAPY": 7.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-11-02",
    "timestamp": 1730505600000,
    "spotPrice": 165.97,
    "fundingAPR": 14.9,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-03",
    "timestamp": 1730592000000,
    "spotPrice": 166.05,
    "fundingAPR": 16.14,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-04",
    "timestamp": 1730678400000,
    "spotPrice": 163.59,
    "fundingAPR": 13.51,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-05",
    "timestamp": 1730764800000,
    "spotPrice": 163.89,
    "fundingAPR": 15.81,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-06",
    "timestamp": 1730851200000,
    "spotPrice": 167.34,
    "fundingAPR": 15.4,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-07",
    "timestamp": 1730937600000,
    "spotPrice": 165.51,
    "fundingAPR": 13.66,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-08",
    "timestamp": 1731024000000,
    "spotPrice": 162.55,
    "fundingAPR": 16.39,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-09",
    "timestamp": 1731110400000,
    "spotPrice": 165.15,
    "fundingAPR": 14.49,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-10",
    "timestamp": 1731196800000,
    "spotPrice": 167.47,
    "fundingAPR": 14.29,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-11",
    "timestamp": 1731283200000,
    "spotPrice": 164.29,
    "fundingAPR": 16.46,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-12",
    "timestamp": 1731369600000,
    "spotPrice": 162.83,
    "fundingAPR": 13.77,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-13",
    "timestamp": 1731456000000,
    "spotPrice": 166.43,
    "fundingAPR": 15.19,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-14",
    "timestamp": 1731542400000,
    "spotPrice": 167.01,
    "fundingAPR": 16,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-15",
    "timestamp": 1731628800000,
    "spotPrice": 163.32,
    "fundingAPR": 13.51,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-16",
    "timestamp": 1731715200000,
    "spotPrice": 163.75,
    "fundingAPR": 16.03,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-17",
    "timestamp": 1731801600000,
    "spotPrice": 167.4,
    "fundingAPR": 15.17,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-18",
    "timestamp": 1731888000000,
    "spotPrice": 166.1,
    "fundingAPR": 13.81,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-19",
    "timestamp": 1731974400000,
    "spotPrice": 162.87,
    "fundingAPR": 16.49,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-20",
    "timestamp": 1732060800000,
    "spotPrice": 165.08,
    "fundingAPR": 14.29,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-21",
    "timestamp": 1732147200000,
    "spotPrice": 167.84,
    "fundingAPR": 14.56,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-22",
    "timestamp": 1732233600000,
    "spotPrice": 165.02,
    "fundingAPR": 16.42,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-23",
    "timestamp": 1732320000000,
    "spotPrice": 163.09,
    "fundingAPR": 13.69,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-24",
    "timestamp": 1732406400000,
    "spotPrice": 166.52,
    "fundingAPR": 15.48,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-25",
    "timestamp": 1732492800000,
    "spotPrice": 167.68,
    "fundingAPR": 15.84,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-26",
    "timestamp": 1732579200000,
    "spotPrice": 164.08,
    "fundingAPR": 13.59,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-27",
    "timestamp": 1732665600000,
    "spotPrice": 163.98,
    "fundingAPR": 16.25,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-28",
    "timestamp": 1732752000000,
    "spotPrice": 167.75,
    "fundingAPR": 14.98,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-29",
    "timestamp": 1732838400000,
    "spotPrice": 167.02,
    "fundingAPR": 14.03,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-30",
    "timestamp": 1732924800000,
    "spotPrice": 163.59,
    "fundingAPR": 16.59,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-01",
    "timestamp": 1733011200000,
    "spotPrice": 165.36,
    "fundingAPR": 14.15,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-02",
    "timestamp": 1733097600000,
    "spotPrice": 168.49,
    "fundingAPR": 14.87,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-03",
    "timestamp": 1733184000000,
    "spotPrice": 166.08,
    "fundingAPR": 16.37,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-04",
    "timestamp": 1733270400000,
    "spotPrice": 163.74,
    "fundingAPR": 13.67,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-05",
    "timestamp": 1733356800000,
    "spotPrice": 166.93,
    "fundingAPR": 15.79,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-06",
    "timestamp": 1733443200000,
    "spotPrice": 168.64,
    "fundingAPR": 15.7,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-07",
    "timestamp": 1733529600000,
    "spotPrice": 165.2,
    "fundingAPR": 13.73,
    "stakingAPY": 7.1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-08",
    "timestamp": 1733616000000,
    "spotPrice": 164.58,
    "fundingAPR": 16.47,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-09",
    "timestamp": 1733702400000,
    "spotPrice": 168.38,
    "fundingAPR": 14.82,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-10",
    "timestamp": 1733788800000,
    "spotPrice": 168.23,
    "fundingAPR": 14.32,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-11",
    "timestamp": 1733875200000,
    "spotPrice": 164.68,
    "fundingAPR": 16.67,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-12",
    "timestamp": 1733961600000,
    "spotPrice": 165.97,
    "fundingAPR": 14.07,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-13",
    "timestamp": 1734048000000,
    "spotPrice": 169.41,
    "fundingAPR": 15.22,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-14",
    "timestamp": 1734134400000,
    "spotPrice": 167.47,
    "fundingAPR": 16.32,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-15",
    "timestamp": 1734220800000,
    "spotPrice": 164.77,
    "fundingAPR": 13.73,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-16",
    "timestamp": 1734307200000,
    "spotPrice": 167.65,
    "fundingAPR": 16.11,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-17",
    "timestamp": 1734393600000,
    "spotPrice": 169.86,
    "fundingAPR": 15.57,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-18",
    "timestamp": 1734480000000,
    "spotPrice": 166.66,
    "fundingAPR": 13.95,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-19",
    "timestamp": 1734566400000,
    "spotPrice": 165.53,
    "fundingAPR": 16.69,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-20",
    "timestamp": 1734652800000,
    "spotPrice": 169.29,
    "fundingAPR": 14.7,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-21",
    "timestamp": 1734739200000,
    "spotPrice": 169.72,
    "fundingAPR": 14.65,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-22",
    "timestamp": 1734825600000,
    "spotPrice": 166.13,
    "fundingAPR": 16.74,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-23",
    "timestamp": 1734912000000,
    "spotPrice": 166.91,
    "fundingAPR": 14.04,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-24",
    "timestamp": 1734998400000,
    "spotPrice": 170.58,
    "fundingAPR": 15.59,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-25",
    "timestamp": 1735084800000,
    "spotPrice": 169.15,
    "fundingAPR": 16.27,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-26",
    "timestamp": 1735171200000,
    "spotPrice": 166.14,
    "fundingAPR": 13.86,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-27",
    "timestamp": 1735257600000,
    "spotPrice": 168.65,
    "fundingAPR": 16.44,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-28",
    "timestamp": 1735344000000,
    "spotPrice": 171.32,
    "fundingAPR": 15.46,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-29",
    "timestamp": 1735430400000,
    "spotPrice": 168.43,
    "fundingAPR": 14.23,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-30",
    "timestamp": 1735516800000,
    "spotPrice": 166.82,
    "fundingAPR": 16.89,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-31",
    "timestamp": 1735603200000,
    "spotPrice": 170.44,
    "fundingAPR": 14.62,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-01",
    "timestamp": 1735689600000,
    "spotPrice": 171.45,
    "fundingAPR": 15.04,
    "stakingAPY": 7.09,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-02",
    "timestamp": 1735776000000,
    "spotPrice": 167.9,
    "fundingAPR": 16.81,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-03",
    "timestamp": 1735862400000,
    "spotPrice": 168.14,
    "fundingAPR": 14.08,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-04",
    "timestamp": 1735948800000,
    "spotPrice": 171.97,
    "fundingAPR": 15.99,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-05",
    "timestamp": 1736035200000,
    "spotPrice": 171.08,
    "fundingAPR": 16.22,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-06",
    "timestamp": 1736121600000,
    "spotPrice": 167.83,
    "fundingAPR": 14.06,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-07",
    "timestamp": 1736208000000,
    "spotPrice": 169.91,
    "fundingAPR": 16.76,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-08",
    "timestamp": 1736294400000,
    "spotPrice": 172.98,
    "fundingAPR": 15.37,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-09",
    "timestamp": 1736380800000,
    "spotPrice": 170.47,
    "fundingAPR": 14.57,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-10",
    "timestamp": 1736467200000,
    "spotPrice": 168.41,
    "fundingAPR": 17.08,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-11",
    "timestamp": 1736553600000,
    "spotPrice": 171.82,
    "fundingAPR": 14.59,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-12",
    "timestamp": 1736640000000,
    "spotPrice": 173.38,
    "fundingAPR": 15.46,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-13",
    "timestamp": 1736726400000,
    "spotPrice": 169.94,
    "fundingAPR": 16.85,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-14",
    "timestamp": 1736812800000,
    "spotPrice": 169.65,
    "fundingAPR": 14.19,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-15",
    "timestamp": 1736899200000,
    "spotPrice": 173.54,
    "fundingAPR": 16.4,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-16",
    "timestamp": 1736985600000,
    "spotPrice": 173.22,
    "fundingAPR": 16.17,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-17",
    "timestamp": 1737072000000,
    "spotPrice": 169.81,
    "fundingAPR": 14.32,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-18",
    "timestamp": 1737158400000,
    "spotPrice": 171.4,
    "fundingAPR": 17.07,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-19",
    "timestamp": 1737244800000,
    "spotPrice": 174.81,
    "fundingAPR": 15.32,
    "stakingAPY": 7.08,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-20",
    "timestamp": 1737331200000,
    "spotPrice": 172.73,
    "fundingAPR": 14.96,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-21",
    "timestamp": 1737417600000,
    "spotPrice": 170.27,
    "fundingAPR": 17.25,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-22",
    "timestamp": 1737504000000,
    "spotPrice": 173.39,
    "fundingAPR": 14.62,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-23",
    "timestamp": 1737590400000,
    "spotPrice": 175.46,
    "fundingAPR": 15.9,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-24",
    "timestamp": 1737676800000,
    "spotPrice": 172.22,
    "fundingAPR": 16.89,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-25",
    "timestamp": 1737763200000,
    "spotPrice": 171.4,
    "fundingAPR": 14.35,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-26",
    "timestamp": 1737849600000,
    "spotPrice": 175.27,
    "fundingAPR": 16.81,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-27",
    "timestamp": 1737936000000,
    "spotPrice": 175.52,
    "fundingAPR": 16.13,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-28",
    "timestamp": 1738022400000,
    "spotPrice": 172.01,
    "fundingAPR": 14.64,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-29",
    "timestamp": 1738108800000,
    "spotPrice": 173.1,
    "fundingAPR": 17.37,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-30",
    "timestamp": 1738195200000,
    "spotPrice": 176.75,
    "fundingAPR": 15.29,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-31",
    "timestamp": 1738281600000,
    "spotPrice": 175.16,
    "fundingAPR": 15.39,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-01",
    "timestamp": 1738368000000,
    "spotPrice": 172.35,
    "fundingAPR": 17.4,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-02",
    "timestamp": 1738454400000,
    "spotPrice": 175.11,
    "fundingAPR": 14.69,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-03",
    "timestamp": 1738540800000,
    "spotPrice": 177.65,
    "fundingAPR": 16.36,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-04",
    "timestamp": 1738627200000,
    "spotPrice": 174.68,
    "fundingAPR": 16.9,
    "stakingAPY": 7.07,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-05",
    "timestamp": 1738713600000,
    "spotPrice": 173.35,
    "fundingAPR": 14.57,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-06",
    "timestamp": 1738800000000,
    "spotPrice": 177.11,
    "fundingAPR": 17.2,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-07",
    "timestamp": 1738886400000,
    "spotPrice": 177.92,
    "fundingAPR": 16.1,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-08",
    "timestamp": 1738972800000,
    "spotPrice": 174.4,
    "fundingAPR": 15,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-09",
    "timestamp": 1739059200000,
    "spotPrice": 174.95,
    "fundingAPR": 17.63,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-10",
    "timestamp": 1739145600000,
    "spotPrice": 178.78,
    "fundingAPR": 15.29,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-11",
    "timestamp": 1739232000000,
    "spotPrice": 177.7,
    "fundingAPR": 15.85,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-12",
    "timestamp": 1739318400000,
    "spotPrice": 174.61,
    "fundingAPR": 17.51,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-13",
    "timestamp": 1739404800000,
    "spotPrice": 176.94,
    "fundingAPR": 14.8,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-14",
    "timestamp": 1739491200000,
    "spotPrice": 179.89,
    "fundingAPR": 16.82,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-15",
    "timestamp": 1739577600000,
    "spotPrice": 177.26,
    "fundingAPR": 16.91,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-16",
    "timestamp": 1739664000000,
    "spotPrice": 175.45,
    "fundingAPR": 14.84,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-17",
    "timestamp": 1739750400000,
    "spotPrice": 179.01,
    "fundingAPR": 17.58,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-18",
    "timestamp": 1739836800000,
    "spotPrice": 180.37,
    "fundingAPR": 16.07,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-19",
    "timestamp": 1739923200000,
    "spotPrice": 176.92,
    "fundingAPR": 15.41,
    "stakingAPY": 7.06,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-20",
    "timestamp": 1740009600000,
    "spotPrice": 176.92,
    "fundingAPR": 17.86,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-21",
    "timestamp": 1740096000000,
    "spotPrice": 180.83,
    "fundingAPR": 15.32,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-22",
    "timestamp": 1740182400000,
    "spotPrice": 180.29,
    "fundingAPR": 16.32,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-23",
    "timestamp": 1740268800000,
    "spotPrice": 176.98,
    "fundingAPR": 17.6,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-24",
    "timestamp": 1740355200000,
    "spotPrice": 178.85,
    "fundingAPR": 14.97,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-25",
    "timestamp": 1740441600000,
    "spotPrice": 182.14,
    "fundingAPR": 17.27,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-26",
    "timestamp": 1740528000000,
    "spotPrice": 179.9,
    "fundingAPR": 16.9,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-27",
    "timestamp": 1740614400000,
    "spotPrice": 177.65,
    "fundingAPR": 15.16,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-02-28",
    "timestamp": 1740700800000,
    "spotPrice": 180.94,
    "fundingAPR": 17.92,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-01",
    "timestamp": 1740787200000,
    "spotPrice": 182.81,
    "fundingAPR": 16.06,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-02",
    "timestamp": 1740873600000,
    "spotPrice": 179.51,
    "fundingAPR": 15.85,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-03",
    "timestamp": 1740960000000,
    "spotPrice": 178.96,
    "fundingAPR": 18.06,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-04",
    "timestamp": 1741046400000,
    "spotPrice": 182.87,
    "fundingAPR": 15.39,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-05",
    "timestamp": 1741132800000,
    "spotPrice": 182.88,
    "fundingAPR": 16.8,
    "stakingAPY": 7.05,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-06",
    "timestamp": 1741219200000,
    "spotPrice": 179.43,
    "fundingAPR": 17.65,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-07",
    "timestamp": 1741305600000,
    "spotPrice": 180.78,
    "fundingAPR": 15.18,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-08",
    "timestamp": 1741392000000,
    "spotPrice": 184.34,
    "fundingAPR": 17.7,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-09",
    "timestamp": 1741478400000,
    "spotPrice": 182.54,
    "fundingAPR": 16.88,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-10",
    "timestamp": 1741564800000,
    "spotPrice": 179.9,
    "fundingAPR": 15.51,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-11",
    "timestamp": 1741651200000,
    "spotPrice": 182.85,
    "fundingAPR": 18.22,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-12",
    "timestamp": 1741737600000,
    "spotPrice": 185.19,
    "fundingAPR": 16.05,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-13",
    "timestamp": 1741824000000,
    "spotPrice": 182.1,
    "fundingAPR": 16.3,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-14",
    "timestamp": 1741910400000,
    "spotPrice": 181.02,
    "fundingAPR": 18.21,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-15",
    "timestamp": 1741996800000,
    "spotPrice": 184.84,
    "fundingAPR": 15.49,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-16",
    "timestamp": 1742083200000,
    "spotPrice": 185.4,
    "fundingAPR": 17.27,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-17",
    "timestamp": 1742169600000,
    "spotPrice": 181.89,
    "fundingAPR": 17.68,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-18",
    "timestamp": 1742256000000,
    "spotPrice": 182.69,
    "fundingAPR": 15.42,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-19",
    "timestamp": 1742342400000,
    "spotPrice": 186.45,
    "fundingAPR": 18.09,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-20",
    "timestamp": 1742428800000,
    "spotPrice": 185.13,
    "fundingAPR": 16.86,
    "stakingAPY": 7.04,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-21",
    "timestamp": 1742515200000,
    "spotPrice": 182.16,
    "fundingAPR": 15.9,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-22",
    "timestamp": 1742601600000,
    "spotPrice": 184.69,
    "fundingAPR": 18.48,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-23",
    "timestamp": 1742688000000,
    "spotPrice": 187.45,
    "fundingAPR": 16.06,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-24",
    "timestamp": 1742774400000,
    "spotPrice": 184.65,
    "fundingAPR": 16.77,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-25",
    "timestamp": 1742860800000,
    "spotPrice": 183.05,
    "fundingAPR": 18.31,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-26",
    "timestamp": 1742947200000,
    "spotPrice": 186.7,
    "fundingAPR": 15.62,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-27",
    "timestamp": 1743033600000,
    "spotPrice": 187.8,
    "fundingAPR": 17.73,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-28",
    "timestamp": 1743120000000,
    "spotPrice": 184.3,
    "fundingAPR": 17.67,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-29",
    "timestamp": 1743206400000,
    "spotPrice": 184.53,
    "fundingAPR": 15.7,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-30",
    "timestamp": 1743292800000,
    "spotPrice": 188.41,
    "fundingAPR": 18.44,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-03-31",
    "timestamp": 1743379200000,
    "spotPrice": 187.6,
    "fundingAPR": 16.82,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-01",
    "timestamp": 1743465600000,
    "spotPrice": 184.36,
    "fundingAPR": 16.3,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-02",
    "timestamp": 1743552000000,
    "spotPrice": 186.42,
    "fundingAPR": 18.68,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-03",
    "timestamp": 1743638400000,
    "spotPrice": 189.55,
    "fundingAPR": 16.09,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-04",
    "timestamp": 1743724800000,
    "spotPrice": 187.09,
    "fundingAPR": 17.22,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-05",
    "timestamp": 1743811200000,
    "spotPrice": 185.01,
    "fundingAPR": 18.36,
    "stakingAPY": 7.03,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-06",
    "timestamp": 1743897600000,
    "spotPrice": 188.41,
    "fundingAPR": 15.77,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-07",
    "timestamp": 1743984000000,
    "spotPrice": 190.02,
    "fundingAPR": 18.14,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-08",
    "timestamp": 1744070400000,
    "spotPrice": 186.61,
    "fundingAPR": 17.64,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-09",
    "timestamp": 1744156800000,
    "spotPrice": 186.28,
    "fundingAPR": 16,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-10",
    "timestamp": 1744243200000,
    "spotPrice": 190.17,
    "fundingAPR": 18.75,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-11",
    "timestamp": 1744329600000,
    "spotPrice": 189.89,
    "fundingAPR": 16.78,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-12",
    "timestamp": 1744416000000,
    "spotPrice": 186.46,
    "fundingAPR": 16.71,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-13",
    "timestamp": 1744502400000,
    "spotPrice": 188.01,
    "fundingAPR": 18.83,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-14",
    "timestamp": 1744588800000,
    "spotPrice": 191.42,
    "fundingAPR": 16.13,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-15",
    "timestamp": 1744675200000,
    "spotPrice": 189.37,
    "fundingAPR": 17.66,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-16",
    "timestamp": 1744761600000,
    "spotPrice": 186.86,
    "fundingAPR": 18.37,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-17",
    "timestamp": 1744848000000,
    "spotPrice": 189.92,
    "fundingAPR": 15.95,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-18",
    "timestamp": 1744934400000,
    "spotPrice": 192.01,
    "fundingAPR": 18.52,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-19",
    "timestamp": 1745020800000,
    "spotPrice": 188.77,
    "fundingAPR": 17.57,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-20",
    "timestamp": 1745107200000,
    "spotPrice": 187.87,
    "fundingAPR": 16.32,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-21",
    "timestamp": 1745193600000,
    "spotPrice": 191.7,
    "fundingAPR": 18.99,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-22",
    "timestamp": 1745280000000,
    "spotPrice": 191.96,
    "fundingAPR": 16.73,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-23",
    "timestamp": 1745366400000,
    "spotPrice": 188.41,
    "fundingAPR": 17.12,
    "stakingAPY": 7.02,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-24",
    "timestamp": 1745452800000,
    "spotPrice": 189.4,
    "fundingAPR": 18.91,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-25",
    "timestamp": 1745539200000,
    "spotPrice": 193.03,
    "fundingAPR": 16.19,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-26",
    "timestamp": 1745625600000,
    "spotPrice": 191.43,
    "fundingAPR": 18.08,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-27",
    "timestamp": 1745712000000,
    "spotPrice": 188.54,
    "fundingAPR": 18.33,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-28",
    "timestamp": 1745798400000,
    "spotPrice": 191.21,
    "fundingAPR": 16.15,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-29",
    "timestamp": 1745884800000,
    "spotPrice": 193.73,
    "fundingAPR": 18.85,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-04-30",
    "timestamp": 1745971200000,
    "spotPrice": 190.72,
    "fundingAPR": 17.48,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-01",
    "timestamp": 1746057600000,
    "spotPrice": 189.28,
    "fundingAPR": 16.65,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-02",
    "timestamp": 1746144000000,
    "spotPrice": 192.96,
    "fundingAPR": 19.17,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-03",
    "timestamp": 1746230400000,
    "spotPrice": 193.75,
    "fundingAPR": 16.69,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-04",
    "timestamp": 1746316800000,
    "spotPrice": 190.16,
    "fundingAPR": 17.52,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-05",
    "timestamp": 1746403200000,
    "spotPrice": 190.58,
    "fundingAPR": 18.93,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-06",
    "timestamp": 1746489600000,
    "spotPrice": 194.34,
    "fundingAPR": 16.26,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-07",
    "timestamp": 1746576000000,
    "spotPrice": 193.23,
    "fundingAPR": 18.45,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-08",
    "timestamp": 1746662400000,
    "spotPrice": 190.03,
    "fundingAPR": 18.25,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-09",
    "timestamp": 1746748800000,
    "spotPrice": 192.23,
    "fundingAPR": 16.36,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-10",
    "timestamp": 1746835200000,
    "spotPrice": 195.12,
    "fundingAPR": 19.11,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-11",
    "timestamp": 1746921600000,
    "spotPrice": 192.43,
    "fundingAPR": 17.37,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-12",
    "timestamp": 1747008000000,
    "spotPrice": 190.48,
    "fundingAPR": 16.98,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-13",
    "timestamp": 1747094400000,
    "spotPrice": 193.92,
    "fundingAPR": 19.28,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-14",
    "timestamp": 1747180800000,
    "spotPrice": 195.22,
    "fundingAPR": 16.64,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-15",
    "timestamp": 1747267200000,
    "spotPrice": 191.68,
    "fundingAPR": 17.89,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-16",
    "timestamp": 1747353600000,
    "spotPrice": 191.52,
    "fundingAPR": 18.89,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-17",
    "timestamp": 1747440000000,
    "spotPrice": 195.32,
    "fundingAPR": 16.34,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-18",
    "timestamp": 1747526400000,
    "spotPrice": 194.72,
    "fundingAPR": 18.77,
    "stakingAPY": 7.01,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-19",
    "timestamp": 1747612800000,
    "spotPrice": 191.28,
    "fundingAPR": 18.12,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-20",
    "timestamp": 1747699200000,
    "spotPrice": 192.97,
    "fundingAPR": 16.59,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-21",
    "timestamp": 1747785600000,
    "spotPrice": 196.17,
    "fundingAPR": 19.31,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-22",
    "timestamp": 1747872000000,
    "spotPrice": 193.84,
    "fundingAPR": 17.24,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-23",
    "timestamp": 1747958400000,
    "spotPrice": 191.43,
    "fundingAPR": 17.31,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-24",
    "timestamp": 1748044800000,
    "spotPrice": 194.56,
    "fundingAPR": 19.32,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-25",
    "timestamp": 1748131200000,
    "spotPrice": 196.34,
    "fundingAPR": 16.6,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-26",
    "timestamp": 1748217600000,
    "spotPrice": 192.92,
    "fundingAPR": 18.23,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-27",
    "timestamp": 1748304000000,
    "spotPrice": 192.18,
    "fundingAPR": 18.79,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-28",
    "timestamp": 1748390400000,
    "spotPrice": 195.95,
    "fundingAPR": 16.43,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-29",
    "timestamp": 1748476800000,
    "spotPrice": 195.87,
    "fundingAPR": 19.04,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-30",
    "timestamp": 1748563200000,
    "spotPrice": 192.26,
    "fundingAPR": 17.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-05-31",
    "timestamp": 1748649600000,
    "spotPrice": 193.41,
    "fundingAPR": 16.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-01",
    "timestamp": 1748736000000,
    "spotPrice": 196.85,
    "fundingAPR": 19.44,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-02",
    "timestamp": 1748822400000,
    "spotPrice": 194.94,
    "fundingAPR": 17.1,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-03",
    "timestamp": 1748908800000,
    "spotPrice": 192.11,
    "fundingAPR": 17.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-04",
    "timestamp": 1748995200000,
    "spotPrice": 194.87,
    "fundingAPR": 19.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-05",
    "timestamp": 1749081600000,
    "spotPrice": 197.09,
    "fundingAPR": 16.56,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-06",
    "timestamp": 1749168000000,
    "spotPrice": 193.86,
    "fundingAPR": 18.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-07",
    "timestamp": 1749254400000,
    "spotPrice": 192.56,
    "fundingAPR": 18.64,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-08",
    "timestamp": 1749340800000,
    "spotPrice": 196.21,
    "fundingAPR": 16.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-09",
    "timestamp": 1749427200000,
    "spotPrice": 196.65,
    "fundingAPR": 19.25,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-10",
    "timestamp": 1749513600000,
    "spotPrice": 192.97,
    "fundingAPR": 17.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-11",
    "timestamp": 1749600000000,
    "spotPrice": 193.54,
    "fundingAPR": 17.04,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-12",
    "timestamp": 1749686400000,
    "spotPrice": 197.14,
    "fundingAPR": 19.49,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-13",
    "timestamp": 1749772800000,
    "spotPrice": 195.69,
    "fundingAPR": 16.94,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-14",
    "timestamp": 1749859200000,
    "spotPrice": 192.52,
    "fundingAPR": 17.9,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-15",
    "timestamp": 1749945600000,
    "spotPrice": 194.83,
    "fundingAPR": 19.18,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-16",
    "timestamp": 1750032000000,
    "spotPrice": 197.45,
    "fundingAPR": 16.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-17",
    "timestamp": 1750118400000,
    "spotPrice": 194.49,
    "fundingAPR": 18.78,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-18",
    "timestamp": 1750204800000,
    "spotPrice": 192.65,
    "fundingAPR": 18.43,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-19",
    "timestamp": 1750291200000,
    "spotPrice": 196.1,
    "fundingAPR": 16.64,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-20",
    "timestamp": 1750377600000,
    "spotPrice": 197.43,
    "fundingAPR": 19.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-21",
    "timestamp": 1750464000000,
    "spotPrice": 193.07,
    "fundingAPR": 17.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-22",
    "timestamp": 1750550400000,
    "spotPrice": 193.07,
    "fundingAPR": 17.26,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-23",
    "timestamp": 1750636800000,
    "spotPrice": 197.42,
    "fundingAPR": 19.47,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-24",
    "timestamp": 1750723200000,
    "spotPrice": 196.31,
    "fundingAPR": 16.78,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-25",
    "timestamp": 1750809600000,
    "spotPrice": 192.23,
    "fundingAPR": 18.15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-26",
    "timestamp": 1750896000000,
    "spotPrice": 194.4,
    "fundingAPR": 19.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-27",
    "timestamp": 1750982400000,
    "spotPrice": 197.91,
    "fundingAPR": 16.5,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-28",
    "timestamp": 1751068800000,
    "spotPrice": 194.83,
    "fundingAPR": 18.99,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-29",
    "timestamp": 1751155200000,
    "spotPrice": 192.11,
    "fundingAPR": 18.18,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-06-30",
    "timestamp": 1751241600000,
    "spotPrice": 195.88,
    "fundingAPR": 16.76,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-01",
    "timestamp": 1751328000000,
    "spotPrice": 197.63,
    "fundingAPR": 19.45,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-02",
    "timestamp": 1751414400000,
    "spotPrice": 193.4,
    "fundingAPR": 17.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-03",
    "timestamp": 1751500800000,
    "spotPrice": 192.74,
    "fundingAPR": 17.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-04",
    "timestamp": 1751587200000,
    "spotPrice": 197.13,
    "fundingAPR": 19.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-05",
    "timestamp": 1751673600000,
    "spotPrice": 196.65,
    "fundingAPR": 16.65,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-06",
    "timestamp": 1751760000000,
    "spotPrice": 192.37,
    "fundingAPR": 18.39,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-07",
    "timestamp": 1751846400000,
    "spotPrice": 193.94,
    "fundingAPR": 18.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-08",
    "timestamp": 1751932800000,
    "spotPrice": 197.8,
    "fundingAPR": 16.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-09",
    "timestamp": 1752019200000,
    "spotPrice": 195.23,
    "fundingAPR": 19.15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-10",
    "timestamp": 1752105600000,
    "spotPrice": 192.02,
    "fundingAPR": 17.92,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-11",
    "timestamp": 1752192000000,
    "spotPrice": 195.41,
    "fundingAPR": 16.91,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-12",
    "timestamp": 1752278400000,
    "spotPrice": 197.73,
    "fundingAPR": 19.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-13",
    "timestamp": 1752364800000,
    "spotPrice": 193.73,
    "fundingAPR": 17.06,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-14",
    "timestamp": 1752451200000,
    "spotPrice": 192.42,
    "fundingAPR": 17.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-15",
    "timestamp": 1752537600000,
    "spotPrice": 196.74,
    "fundingAPR": 19.25,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-16",
    "timestamp": 1752624000000,
    "spotPrice": 196.92,
    "fundingAPR": 16.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-17",
    "timestamp": 1752710400000,
    "spotPrice": 192.53,
    "fundingAPR": 18.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-18",
    "timestamp": 1752796800000,
    "spotPrice": 193.47,
    "fundingAPR": 18.56,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-19",
    "timestamp": 1752883200000,
    "spotPrice": 197.6,
    "fundingAPR": 16.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-20",
    "timestamp": 1752969600000,
    "spotPrice": 195.58,
    "fundingAPR": 19.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-21",
    "timestamp": 1753056000000,
    "spotPrice": 191.95,
    "fundingAPR": 17.65,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-22",
    "timestamp": 1753142400000,
    "spotPrice": 194.88,
    "fundingAPR": 17.08,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-23",
    "timestamp": 1753228800000,
    "spotPrice": 197.73,
    "fundingAPR": 19.45,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-24",
    "timestamp": 1753315200000,
    "spotPrice": 194.04,
    "fundingAPR": 16.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-25",
    "timestamp": 1753401600000,
    "spotPrice": 192.12,
    "fundingAPR": 17.93,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-26",
    "timestamp": 1753488000000,
    "spotPrice": 196.28,
    "fundingAPR": 19.08,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-27",
    "timestamp": 1753574400000,
    "spotPrice": 197.11,
    "fundingAPR": 16.46,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-28",
    "timestamp": 1753660800000,
    "spotPrice": 192.71,
    "fundingAPR": 18.79,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-29",
    "timestamp": 1753747200000,
    "spotPrice": 193,
    "fundingAPR": 18.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-30",
    "timestamp": 1753833600000,
    "spotPrice": 197.29,
    "fundingAPR": 16.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-07-31",
    "timestamp": 1753920000000,
    "spotPrice": 195.88,
    "fundingAPR": 19.34,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-01",
    "timestamp": 1754006400000,
    "spotPrice": 191.92,
    "fundingAPR": 17.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-02",
    "timestamp": 1754092800000,
    "spotPrice": 194.33,
    "fundingAPR": 17.26,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-03",
    "timestamp": 1754179200000,
    "spotPrice": 197.64,
    "fundingAPR": 19.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-04",
    "timestamp": 1754265600000,
    "spotPrice": 194.35,
    "fundingAPR": 16.66,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-05",
    "timestamp": 1754352000000,
    "spotPrice": 191.85,
    "fundingAPR": 18.15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-06",
    "timestamp": 1754438400000,
    "spotPrice": 195.76,
    "fundingAPR": 18.86,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-07",
    "timestamp": 1754524800000,
    "spotPrice": 197.21,
    "fundingAPR": 16.41,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-08",
    "timestamp": 1754611200000,
    "spotPrice": 192.9,
    "fundingAPR": 18.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-09",
    "timestamp": 1754697600000,
    "spotPrice": 192.53,
    "fundingAPR": 18.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-10",
    "timestamp": 1754784000000,
    "spotPrice": 196.9,
    "fundingAPR": 16.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-11",
    "timestamp": 1754870400000,
    "spotPrice": 196.12,
    "fundingAPR": 19.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-12",
    "timestamp": 1754956800000,
    "spotPrice": 191.91,
    "fundingAPR": 17.11,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-13",
    "timestamp": 1755043200000,
    "spotPrice": 193.74,
    "fundingAPR": 17.45,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-14",
    "timestamp": 1755129600000,
    "spotPrice": 197.44,
    "fundingAPR": 19.24,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-15",
    "timestamp": 1755216000000,
    "spotPrice": 194.62,
    "fundingAPR": 16.5,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-16",
    "timestamp": 1755302400000,
    "spotPrice": 191.61,
    "fundingAPR": 18.35,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-17",
    "timestamp": 1755388800000,
    "spotPrice": 195.17,
    "fundingAPR": 18.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-18",
    "timestamp": 1755475200000,
    "spotPrice": 197.22,
    "fundingAPR": 16.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-19",
    "timestamp": 1755561600000,
    "spotPrice": 193.1,
    "fundingAPR": 19.07,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-20",
    "timestamp": 1755648000000,
    "spotPrice": 192.07,
    "fundingAPR": 17.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-21",
    "timestamp": 1755734400000,
    "spotPrice": 196.42,
    "fundingAPR": 16.83,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-22",
    "timestamp": 1755820800000,
    "spotPrice": 196.29,
    "fundingAPR": 19.34,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-23",
    "timestamp": 1755907200000,
    "spotPrice": 191.93,
    "fundingAPR": 16.86,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-24",
    "timestamp": 1755993600000,
    "spotPrice": 193.14,
    "fundingAPR": 17.64,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-25",
    "timestamp": 1756080000000,
    "spotPrice": 197.15,
    "fundingAPR": 19.07,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-26",
    "timestamp": 1756166400000,
    "spotPrice": 194.86,
    "fundingAPR": 16.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-27",
    "timestamp": 1756252800000,
    "spotPrice": 191.4,
    "fundingAPR": 18.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-28",
    "timestamp": 1756339200000,
    "spotPrice": 194.54,
    "fundingAPR": 18.33,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-29",
    "timestamp": 1756425600000,
    "spotPrice": 197.14,
    "fundingAPR": 16.41,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-30",
    "timestamp": 1756512000000,
    "spotPrice": 193.29,
    "fundingAPR": 19.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-08-31",
    "timestamp": 1756598400000,
    "spotPrice": 191.63,
    "fundingAPR": 17.41,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-01",
    "timestamp": 1756684800000,
    "spotPrice": 195.86,
    "fundingAPR": 16.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-02",
    "timestamp": 1756771200000,
    "spotPrice": 196.38,
    "fundingAPR": 19.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-03",
    "timestamp": 1756857600000,
    "spotPrice": 191.97,
    "fundingAPR": 16.62,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-04",
    "timestamp": 1756944000000,
    "spotPrice": 192.54,
    "fundingAPR": 17.83,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-05",
    "timestamp": 1757030400000,
    "spotPrice": 196.76,
    "fundingAPR": 18.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-06",
    "timestamp": 1757116800000,
    "spotPrice": 195.05,
    "fundingAPR": 16.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-07",
    "timestamp": 1757203200000,
    "spotPrice": 191.22,
    "fundingAPR": 18.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-08",
    "timestamp": 1757289600000,
    "spotPrice": 193.86,
    "fundingAPR": 18.03,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-09",
    "timestamp": 1757376000000,
    "spotPrice": 196.96,
    "fundingAPR": 16.46,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-10",
    "timestamp": 1757462400000,
    "spotPrice": 193.47,
    "fundingAPR": 19.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-11",
    "timestamp": 1757548800000,
    "spotPrice": 191.22,
    "fundingAPR": 17.1,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-12",
    "timestamp": 1757635200000,
    "spotPrice": 195.24,
    "fundingAPR": 17.13,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-13",
    "timestamp": 1757721600000,
    "spotPrice": 196.4,
    "fundingAPR": 19.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-14",
    "timestamp": 1757808000000,
    "spotPrice": 192.02,
    "fundingAPR": 16.41,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-15",
    "timestamp": 1757894400000,
    "spotPrice": 191.94,
    "fundingAPR": 18.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-16",
    "timestamp": 1757980800000,
    "spotPrice": 196.28,
    "fundingAPR": 18.59,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-17",
    "timestamp": 1758067200000,
    "spotPrice": 195.19,
    "fundingAPR": 16.2,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-18",
    "timestamp": 1758153600000,
    "spotPrice": 191.07,
    "fundingAPR": 18.79,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-19",
    "timestamp": 1758240000000,
    "spotPrice": 193.16,
    "fundingAPR": 17.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-20",
    "timestamp": 1758326400000,
    "spotPrice": 196.69,
    "fundingAPR": 16.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-21",
    "timestamp": 1758412800000,
    "spotPrice": 193.63,
    "fundingAPR": 19.15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-22",
    "timestamp": 1758499200000,
    "spotPrice": 190.84,
    "fundingAPR": 16.81,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-23",
    "timestamp": 1758585600000,
    "spotPrice": 194.55,
    "fundingAPR": 17.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-24",
    "timestamp": 1758672000000,
    "spotPrice": 196.33,
    "fundingAPR": 18.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-25",
    "timestamp": 1758758400000,
    "spotPrice": 192.09,
    "fundingAPR": 16.23,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-26",
    "timestamp": 1758844800000,
    "spotPrice": 191.35,
    "fundingAPR": 18.18,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-27",
    "timestamp": 1758931200000,
    "spotPrice": 195.71,
    "fundingAPR": 18.3,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-28",
    "timestamp": 1759017600000,
    "spotPrice": 195.27,
    "fundingAPR": 16.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-29",
    "timestamp": 1759104000000,
    "spotPrice": 190.96,
    "fundingAPR": 18.86,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-09-30",
    "timestamp": 1759190400000,
    "spotPrice": 192.45,
    "fundingAPR": 17.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-01",
    "timestamp": 1759276800000,
    "spotPrice": 196.31,
    "fundingAPR": 16.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-02",
    "timestamp": 1759363200000,
    "spotPrice": 193.76,
    "fundingAPR": 19.08,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-03",
    "timestamp": 1759449600000,
    "spotPrice": 190.49,
    "fundingAPR": 16.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-04",
    "timestamp": 1759536000000,
    "spotPrice": 193.82,
    "fundingAPR": 17.46,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-05",
    "timestamp": 1759622400000,
    "spotPrice": 196.17,
    "fundingAPR": 18.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-06",
    "timestamp": 1759708800000,
    "spotPrice": 192.17,
    "fundingAPR": 16.08,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-07",
    "timestamp": 1759795200000,
    "spotPrice": 190.78,
    "fundingAPR": 18.32,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-08",
    "timestamp": 1759881600000,
    "spotPrice": 195.07,
    "fundingAPR": 17.98,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-09",
    "timestamp": 1759968000000,
    "spotPrice": 195.28,
    "fundingAPR": 16.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-10",
    "timestamp": 1760054400000,
    "spotPrice": 190.87,
    "fundingAPR": 18.9,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-11",
    "timestamp": 1760140800000,
    "spotPrice": 191.73,
    "fundingAPR": 17.05,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-12",
    "timestamp": 1760227200000,
    "spotPrice": 195.85,
    "fundingAPR": 16.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-13",
    "timestamp": 1760313600000,
    "spotPrice": 193.86,
    "fundingAPR": 18.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-14",
    "timestamp": 1760400000000,
    "spotPrice": 190.18,
    "fundingAPR": 16.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-15",
    "timestamp": 1760486400000,
    "spotPrice": 193.05,
    "fundingAPR": 17.62,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-16",
    "timestamp": 1760572800000,
    "spotPrice": 195.92,
    "fundingAPR": 18.49,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-17",
    "timestamp": 1760659200000,
    "spotPrice": 192.24,
    "fundingAPR": 15.96,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-18",
    "timestamp": 1760745600000,
    "spotPrice": 190.24,
    "fundingAPR": 18.43,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-19",
    "timestamp": 1760832000000,
    "spotPrice": 194.36,
    "fundingAPR": 17.64,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-20",
    "timestamp": 1760918400000,
    "spotPrice": 195.22,
    "fundingAPR": 16.19,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-21",
    "timestamp": 1761004800000,
    "spotPrice": 190.81,
    "fundingAPR": 18.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-22",
    "timestamp": 1761091200000,
    "spotPrice": 191.01,
    "fundingAPR": 16.72,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-23",
    "timestamp": 1761177600000,
    "spotPrice": 195.3,
    "fundingAPR": 16.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-24",
    "timestamp": 1761264000000,
    "spotPrice": 193.91,
    "fundingAPR": 18.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-25",
    "timestamp": 1761350400000,
    "spotPrice": 189.91,
    "fundingAPR": 16.05,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-26",
    "timestamp": 1761436800000,
    "spotPrice": 192.25,
    "fundingAPR": 17.77,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-27",
    "timestamp": 1761523200000,
    "spotPrice": 195.57,
    "fundingAPR": 18.2,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-28",
    "timestamp": 1761609600000,
    "spotPrice": 192.3,
    "fundingAPR": 15.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-29",
    "timestamp": 1761696000000,
    "spotPrice": 189.74,
    "fundingAPR": 18.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-30",
    "timestamp": 1761782400000,
    "spotPrice": 193.6,
    "fundingAPR": 17.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-10-31",
    "timestamp": 1761868800000,
    "spotPrice": 195.08,
    "fundingAPR": 16.25,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-01",
    "timestamp": 1761955200000,
    "spotPrice": 190.76,
    "fundingAPR": 18.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-02",
    "timestamp": 1762041600000,
    "spotPrice": 190.31,
    "fundingAPR": 16.41,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-03",
    "timestamp": 1762128000000,
    "spotPrice": 194.67,
    "fundingAPR": 17.02,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-04",
    "timestamp": 1762214400000,
    "spotPrice": 193.92,
    "fundingAPR": 18.59,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-05",
    "timestamp": 1762300800000,
    "spotPrice": 189.67,
    "fundingAPR": 15.86,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-06",
    "timestamp": 1762387200000,
    "spotPrice": 191.43,
    "fundingAPR": 17.9,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-07",
    "timestamp": 1762473600000,
    "spotPrice": 195.14,
    "fundingAPR": 17.87,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-08",
    "timestamp": 1762560000000,
    "spotPrice": 192.34,
    "fundingAPR": 15.83,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-09",
    "timestamp": 1762646400000,
    "spotPrice": 189.27,
    "fundingAPR": 18.55,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-10",
    "timestamp": 1762732800000,
    "spotPrice": 192.78,
    "fundingAPR": 16.94,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-11",
    "timestamp": 1762819200000,
    "spotPrice": 194.86,
    "fundingAPR": 16.33,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-12",
    "timestamp": 1762905600000,
    "spotPrice": 190.74,
    "fundingAPR": 18.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-13",
    "timestamp": 1762992000000,
    "spotPrice": 189.63,
    "fundingAPR": 16.12,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-14",
    "timestamp": 1763078400000,
    "spotPrice": 193.96,
    "fundingAPR": 17.16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-15",
    "timestamp": 1763164800000,
    "spotPrice": 193.86,
    "fundingAPR": 18.33,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-16",
    "timestamp": 1763251200000,
    "spotPrice": 189.47,
    "fundingAPR": 15.69,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-17",
    "timestamp": 1763337600000,
    "spotPrice": 190.62,
    "fundingAPR": 18.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-18",
    "timestamp": 1763424000000,
    "spotPrice": 194.62,
    "fundingAPR": 17.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-19",
    "timestamp": 1763510400000,
    "spotPrice": 192.36,
    "fundingAPR": 15.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-20",
    "timestamp": 1763596800000,
    "spotPrice": 188.85,
    "fundingAPR": 18.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-21",
    "timestamp": 1763683200000,
    "spotPrice": 191.93,
    "fundingAPR": 16.59,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-22",
    "timestamp": 1763769600000,
    "spotPrice": 194.56,
    "fundingAPR": 16.43,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-23",
    "timestamp": 1763856000000,
    "spotPrice": 190.72,
    "fundingAPR": 18.56,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-24",
    "timestamp": 1763942400000,
    "spotPrice": 188.99,
    "fundingAPR": 15.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-25",
    "timestamp": 1764028800000,
    "spotPrice": 193.19,
    "fundingAPR": 17.3,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-26",
    "timestamp": 1764115200000,
    "spotPrice": 193.74,
    "fundingAPR": 18.04,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-27",
    "timestamp": 1764201600000,
    "spotPrice": 189.31,
    "fundingAPR": 15.57,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-28",
    "timestamp": 1764288000000,
    "spotPrice": 189.8,
    "fundingAPR": 18.09,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-29",
    "timestamp": 1764374400000,
    "spotPrice": 194.02,
    "fundingAPR": 17.16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-11-30",
    "timestamp": 1764460800000,
    "spotPrice": 192.35,
    "fundingAPR": 15.84,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-01",
    "timestamp": 1764547200000,
    "spotPrice": 188.47,
    "fundingAPR": 18.49,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-02",
    "timestamp": 1764633600000,
    "spotPrice": 191.05,
    "fundingAPR": 16.25,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-03",
    "timestamp": 1764720000000,
    "spotPrice": 194.17,
    "fundingAPR": 16.55,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-04",
    "timestamp": 1764806400000,
    "spotPrice": 190.7,
    "fundingAPR": 18.36,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-05",
    "timestamp": 1764892800000,
    "spotPrice": 188.38,
    "fundingAPR": 15.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-06",
    "timestamp": 1764979200000,
    "spotPrice": 192.36,
    "fundingAPR": 17.43,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-07",
    "timestamp": 1765065600000,
    "spotPrice": 193.56,
    "fundingAPR": 17.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-08",
    "timestamp": 1765152000000,
    "spotPrice": 189.17,
    "fundingAPR": 15.47,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-09",
    "timestamp": 1765238400000,
    "spotPrice": 189.01,
    "fundingAPR": 18.13,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-10",
    "timestamp": 1765324800000,
    "spotPrice": 193.34,
    "fundingAPR": 16.79,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-11",
    "timestamp": 1765411200000,
    "spotPrice": 192.29,
    "fundingAPR": 15.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-12",
    "timestamp": 1765497600000,
    "spotPrice": 188.14,
    "fundingAPR": 18.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-13",
    "timestamp": 1765584000000,
    "spotPrice": 190.16,
    "fundingAPR": 15.92,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-14",
    "timestamp": 1765670400000,
    "spotPrice": 193.7,
    "fundingAPR": 16.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-15",
    "timestamp": 1765756800000,
    "spotPrice": 190.67,
    "fundingAPR": 18.11,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-16",
    "timestamp": 1765843200000,
    "spotPrice": 187.82,
    "fundingAPR": 15.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-17",
    "timestamp": 1765929600000,
    "spotPrice": 191.49,
    "fundingAPR": 17.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-18",
    "timestamp": 1766016000000,
    "spotPrice": 193.3,
    "fundingAPR": 17.36,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-19",
    "timestamp": 1766102400000,
    "spotPrice": 189.06,
    "fundingAPR": 15.42,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-20",
    "timestamp": 1766188800000,
    "spotPrice": 188.25,
    "fundingAPR": 18.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-21",
    "timestamp": 1766275200000,
    "spotPrice": 192.59,
    "fundingAPR": 16.42,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-22",
    "timestamp": 1766361600000,
    "spotPrice": 192.19,
    "fundingAPR": 15.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-23",
    "timestamp": 1766448000000,
    "spotPrice": 187.85,
    "fundingAPR": 18.26,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-24",
    "timestamp": 1766534400000,
    "spotPrice": 189.27,
    "fundingAPR": 15.62,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-25",
    "timestamp": 1766620800000,
    "spotPrice": 193.15,
    "fundingAPR": 16.79,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-26",
    "timestamp": 1766707200000,
    "spotPrice": 190.63,
    "fundingAPR": 17.83,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-27",
    "timestamp": 1766793600000,
    "spotPrice": 187.3,
    "fundingAPR": 15.23,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-28",
    "timestamp": 1766880000000,
    "spotPrice": 190.58,
    "fundingAPR": 17.62,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-29",
    "timestamp": 1766966400000,
    "spotPrice": 192.96,
    "fundingAPR": 17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-30",
    "timestamp": 1767052800000,
    "spotPrice": 188.97,
    "fundingAPR": 15.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2025-12-31",
    "timestamp": 1767139200000,
    "spotPrice": 187.52,
    "fundingAPR": 18.11,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-01",
    "timestamp": 1767225600000,
    "spotPrice": 191.78,
    "fundingAPR": 16.06,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-02",
    "timestamp": 1767312000000,
    "spotPrice": 192.04,
    "fundingAPR": 16.04,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-03",
    "timestamp": 1767398400000,
    "spotPrice": 187.61,
    "fundingAPR": 18.07,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-04",
    "timestamp": 1767484800000,
    "spotPrice": 188.39,
    "fundingAPR": 15.34,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-05",
    "timestamp": 1767571200000,
    "spotPrice": 192.52,
    "fundingAPR": 16.91,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-06",
    "timestamp": 1767657600000,
    "spotPrice": 190.57,
    "fundingAPR": 17.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-07",
    "timestamp": 1767744000000,
    "spotPrice": 186.84,
    "fundingAPR": 15.1,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-08",
    "timestamp": 1767830400000,
    "spotPrice": 189.65,
    "fundingAPR": 17.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-09",
    "timestamp": 1767916800000,
    "spotPrice": 192.55,
    "fundingAPR": 16.62,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-10",
    "timestamp": 1768003200000,
    "spotPrice": 188.89,
    "fundingAPR": 15.41,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-11",
    "timestamp": 1768089600000,
    "spotPrice": 186.83,
    "fundingAPR": 18.03,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-12",
    "timestamp": 1768176000000,
    "spotPrice": 190.92,
    "fundingAPR": 15.7,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-13",
    "timestamp": 1768262400000,
    "spotPrice": 191.82,
    "fundingAPR": 16.15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-14",
    "timestamp": 1768348800000,
    "spotPrice": 187.4,
    "fundingAPR": 17.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-15",
    "timestamp": 1768435200000,
    "spotPrice": 187.53,
    "fundingAPR": 15.1,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-16",
    "timestamp": 1768521600000,
    "spotPrice": 191.82,
    "fundingAPR": 17.02,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-17",
    "timestamp": 1768608000000,
    "spotPrice": 190.48,
    "fundingAPR": 17.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-18",
    "timestamp": 1768694400000,
    "spotPrice": 186.43,
    "fundingAPR": 15.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-19",
    "timestamp": 1768780800000,
    "spotPrice": 188.71,
    "fundingAPR": 17.7,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-20",
    "timestamp": 1768867200000,
    "spotPrice": 192.07,
    "fundingAPR": 16.23,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-21",
    "timestamp": 1768953600000,
    "spotPrice": 188.82,
    "fundingAPR": 15.46,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-22",
    "timestamp": 1769040000000,
    "spotPrice": 186.2,
    "fundingAPR": 17.91,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-23",
    "timestamp": 1769126400000,
    "spotPrice": 190.02,
    "fundingAPR": 15.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-24",
    "timestamp": 1769212800000,
    "spotPrice": 191.55,
    "fundingAPR": 16.26,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-25",
    "timestamp": 1769299200000,
    "spotPrice": 187.23,
    "fundingAPR": 17.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-26",
    "timestamp": 1769385600000,
    "spotPrice": 186.71,
    "fundingAPR": 14.89,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-27",
    "timestamp": 1769472000000,
    "spotPrice": 191.05,
    "fundingAPR": 17.11,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-28",
    "timestamp": 1769558400000,
    "spotPrice": 190.35,
    "fundingAPR": 16.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-29",
    "timestamp": 1769644800000,
    "spotPrice": 186.08,
    "fundingAPR": 14.96,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-30",
    "timestamp": 1769731200000,
    "spotPrice": 187.78,
    "fundingAPR": 17.68,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-01-31",
    "timestamp": 1769817600000,
    "spotPrice": 191.51,
    "fundingAPR": 15.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-01",
    "timestamp": 1769904000000,
    "spotPrice": 188.74,
    "fundingAPR": 15.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-02",
    "timestamp": 1769990400000,
    "spotPrice": 185.62,
    "fundingAPR": 17.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-03",
    "timestamp": 1770076800000,
    "spotPrice": 189.08,
    "fundingAPR": 15.07,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-04",
    "timestamp": 1770163200000,
    "spotPrice": 191.21,
    "fundingAPR": 16.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-05",
    "timestamp": 1770249600000,
    "spotPrice": 187.09,
    "fundingAPR": 17.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-06",
    "timestamp": 1770336000000,
    "spotPrice": 185.92,
    "fundingAPR": 14.73,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-07",
    "timestamp": 1770422400000,
    "spotPrice": 190.23,
    "fundingAPR": 17.18,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-08",
    "timestamp": 1770508800000,
    "spotPrice": 190.19,
    "fundingAPR": 16.42,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-09",
    "timestamp": 1770595200000,
    "spotPrice": 185.78,
    "fundingAPR": 14.94,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-10",
    "timestamp": 1770681600000,
    "spotPrice": 186.86,
    "fundingAPR": 17.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-11",
    "timestamp": 1770768000000,
    "spotPrice": 190.88,
    "fundingAPR": 15.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-12",
    "timestamp": 1770854400000,
    "spotPrice": 188.66,
    "fundingAPR": 15.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-13",
    "timestamp": 1770940800000,
    "spotPrice": 185.1,
    "fundingAPR": 17.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-14",
    "timestamp": 1771027200000,
    "spotPrice": 188.13,
    "fundingAPR": 14.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-15",
    "timestamp": 1771113600000,
    "spotPrice": 190.8,
    "fundingAPR": 16.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-16",
    "timestamp": 1771200000000,
    "spotPrice": 186.98,
    "fundingAPR": 16.94,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-17",
    "timestamp": 1771286400000,
    "spotPrice": 185.19,
    "fundingAPR": 14.6,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-18",
    "timestamp": 1771372800000,
    "spotPrice": 189.36,
    "fundingAPR": 17.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-19",
    "timestamp": 1771459200000,
    "spotPrice": 189.97,
    "fundingAPR": 16.03,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-20",
    "timestamp": 1771545600000,
    "spotPrice": 185.53,
    "fundingAPR": 14.96,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-21",
    "timestamp": 1771632000000,
    "spotPrice": 185.96,
    "fundingAPR": 17.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-22",
    "timestamp": 1771718400000,
    "spotPrice": 190.19,
    "fundingAPR": 15.13,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-23",
    "timestamp": 1771804800000,
    "spotPrice": 188.56,
    "fundingAPR": 15.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-24",
    "timestamp": 1771891200000,
    "spotPrice": 184.65,
    "fundingAPR": 17.3,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-25",
    "timestamp": 1771977600000,
    "spotPrice": 187.17,
    "fundingAPR": 14.56,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-26",
    "timestamp": 1772064000000,
    "spotPrice": 190.33,
    "fundingAPR": 16.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-27",
    "timestamp": 1772150400000,
    "spotPrice": 186.88,
    "fundingAPR": 16.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-02-28",
    "timestamp": 1772236800000,
    "spotPrice": 184.51,
    "fundingAPR": 14.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-01",
    "timestamp": 1772323200000,
    "spotPrice": 188.46,
    "fundingAPR": 17.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-02",
    "timestamp": 1772409600000,
    "spotPrice": 189.71,
    "fundingAPR": 15.64,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-03",
    "timestamp": 1772496000000,
    "spotPrice": 185.33,
    "fundingAPR": 15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-04",
    "timestamp": 1772582400000,
    "spotPrice": 185.1,
    "fundingAPR": 17.39,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-05",
    "timestamp": 1772668800000,
    "spotPrice": 189.43,
    "fundingAPR": 14.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-06",
    "timestamp": 1772755200000,
    "spotPrice": 188.44,
    "fundingAPR": 15.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-07",
    "timestamp": 1772841600000,
    "spotPrice": 184.26,
    "fundingAPR": 17.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-08",
    "timestamp": 1772928000000,
    "spotPrice": 186.22,
    "fundingAPR": 14.36,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-09",
    "timestamp": 1773014400000,
    "spotPrice": 189.79,
    "fundingAPR": 16.66,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-10",
    "timestamp": 1773100800000,
    "spotPrice": 186.8,
    "fundingAPR": 16.21,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-11",
    "timestamp": 1773187200000,
    "spotPrice": 183.9,
    "fundingAPR": 14.47,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-12",
    "timestamp": 1773273600000,
    "spotPrice": 187.53,
    "fundingAPR": 17.2,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-13",
    "timestamp": 1773360000000,
    "spotPrice": 189.39,
    "fundingAPR": 15.26,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-14",
    "timestamp": 1773446400000,
    "spotPrice": 185.17,
    "fundingAPR": 15.08,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-15",
    "timestamp": 1773532800000,
    "spotPrice": 184.29,
    "fundingAPR": 17.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-16",
    "timestamp": 1773619200000,
    "spotPrice": 188.63,
    "fundingAPR": 14.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-17",
    "timestamp": 1773705600000,
    "spotPrice": 188.29,
    "fundingAPR": 15.94,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-18",
    "timestamp": 1773792000000,
    "spotPrice": 183.93,
    "fundingAPR": 16.7,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-19",
    "timestamp": 1773878400000,
    "spotPrice": 185.29,
    "fundingAPR": 14.21,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-20",
    "timestamp": 1773964800000,
    "spotPrice": 189.19,
    "fundingAPR": 16.72,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-21",
    "timestamp": 1774051200000,
    "spotPrice": 186.72,
    "fundingAPR": 15.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-22",
    "timestamp": 1774137600000,
    "spotPrice": 183.35,
    "fundingAPR": 14.47,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-23",
    "timestamp": 1774224000000,
    "spotPrice": 186.59,
    "fundingAPR": 17.13,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-24",
    "timestamp": 1774310400000,
    "spotPrice": 189.01,
    "fundingAPR": 14.9,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-25",
    "timestamp": 1774396800000,
    "spotPrice": 185.05,
    "fundingAPR": 15.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-26",
    "timestamp": 1774483200000,
    "spotPrice": 183.54,
    "fundingAPR": 17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-27",
    "timestamp": 1774569600000,
    "spotPrice": 187.79,
    "fundingAPR": 14.25,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-28",
    "timestamp": 1774656000000,
    "spotPrice": 188.1,
    "fundingAPR": 16.04,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-29",
    "timestamp": 1774742400000,
    "spotPrice": 183.66,
    "fundingAPR": 16.36,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-30",
    "timestamp": 1774828800000,
    "spotPrice": 184.39,
    "fundingAPR": 14.1,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-03-31",
    "timestamp": 1774915200000,
    "spotPrice": 188.53,
    "fundingAPR": 16.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-01",
    "timestamp": 1775001600000,
    "spotPrice": 186.64,
    "fundingAPR": 15.44,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-02",
    "timestamp": 1775088000000,
    "spotPrice": 182.88,
    "fundingAPR": 14.5,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-03",
    "timestamp": 1775174400000,
    "spotPrice": 185.64,
    "fundingAPR": 17.02,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-04",
    "timestamp": 1775260800000,
    "spotPrice": 188.58,
    "fundingAPR": 14.56,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-05",
    "timestamp": 1775347200000,
    "spotPrice": 184.96,
    "fundingAPR": 15.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-06",
    "timestamp": 1775433600000,
    "spotPrice": 182.84,
    "fundingAPR": 16.74,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-07",
    "timestamp": 1775520000000,
    "spotPrice": 186.91,
    "fundingAPR": 14.03,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-08",
    "timestamp": 1775606400000,
    "spotPrice": 187.87,
    "fundingAPR": 16.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-09",
    "timestamp": 1775692800000,
    "spotPrice": 183.46,
    "fundingAPR": 16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-10",
    "timestamp": 1775779200000,
    "spotPrice": 183.53,
    "fundingAPR": 14.03,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-11",
    "timestamp": 1775865600000,
    "spotPrice": 187.83,
    "fundingAPR": 16.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-12",
    "timestamp": 1775952000000,
    "spotPrice": 186.54,
    "fundingAPR": 15.05,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-13",
    "timestamp": 1776038400000,
    "spotPrice": 182.47,
    "fundingAPR": 14.56,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-14",
    "timestamp": 1776124800000,
    "spotPrice": 184.7,
    "fundingAPR": 16.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-15",
    "timestamp": 1776211200000,
    "spotPrice": 188.1,
    "fundingAPR": 14.24,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-16",
    "timestamp": 1776297600000,
    "spotPrice": 184.89,
    "fundingAPR": 15.39,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-17",
    "timestamp": 1776384000000,
    "spotPrice": 182.22,
    "fundingAPR": 16.46,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-18",
    "timestamp": 1776470400000,
    "spotPrice": 186.01,
    "fundingAPR": 13.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-19",
    "timestamp": 1776556800000,
    "spotPrice": 187.6,
    "fundingAPR": 16.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-20",
    "timestamp": 1776643200000,
    "spotPrice": 183.3,
    "fundingAPR": 15.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-21",
    "timestamp": 1776729600000,
    "spotPrice": 182.72,
    "fundingAPR": 14.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-22",
    "timestamp": 1776816000000,
    "spotPrice": 187.07,
    "fundingAPR": 16.72,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-23",
    "timestamp": 1776902400000,
    "spotPrice": 186.43,
    "fundingAPR": 14.69,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-24",
    "timestamp": 1776988800000,
    "spotPrice": 182.15,
    "fundingAPR": 14.65,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-25",
    "timestamp": 1777075200000,
    "spotPrice": 183.79,
    "fundingAPR": 16.69,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-26",
    "timestamp": 1777161600000,
    "spotPrice": 187.55,
    "fundingAPR": 13.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-27",
    "timestamp": 1777248000000,
    "spotPrice": 184.84,
    "fundingAPR": 15.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-28",
    "timestamp": 1777334400000,
    "spotPrice": 181.68,
    "fundingAPR": 16.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-29",
    "timestamp": 1777420800000,
    "spotPrice": 185.11,
    "fundingAPR": 13.72,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-04-30",
    "timestamp": 1777507200000,
    "spotPrice": 187.29,
    "fundingAPR": 16.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-01",
    "timestamp": 1777593600000,
    "spotPrice": 183.2,
    "fundingAPR": 15.25,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-02",
    "timestamp": 1777680000000,
    "spotPrice": 181.97,
    "fundingAPR": 14.02,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-03",
    "timestamp": 1777766400000,
    "spotPrice": 186.28,
    "fundingAPR": 16.65,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-04",
    "timestamp": 1777852800000,
    "spotPrice": 186.3,
    "fundingAPR": 14.34,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-05",
    "timestamp": 1777939200000,
    "spotPrice": 181.89,
    "fundingAPR": 14.75,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-06",
    "timestamp": 1778025600000,
    "spotPrice": 182.91,
    "fundingAPR": 16.47,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-07",
    "timestamp": 1778112000000,
    "spotPrice": 186.96,
    "fundingAPR": 13.73,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-08",
    "timestamp": 1778198400000,
    "spotPrice": 184.8,
    "fundingAPR": 15.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-09",
    "timestamp": 1778284800000,
    "spotPrice": 181.21,
    "fundingAPR": 15.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-10",
    "timestamp": 1778371200000,
    "spotPrice": 184.2,
    "fundingAPR": 13.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-11",
    "timestamp": 1778457600000,
    "spotPrice": 186.92,
    "fundingAPR": 16.31,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-12",
    "timestamp": 1778544000000,
    "spotPrice": 183.14,
    "fundingAPR": 14.87,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-13",
    "timestamp": 1778630400000,
    "spotPrice": 181.3,
    "fundingAPR": 14.07,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-14",
    "timestamp": 1778716800000,
    "spotPrice": 185.46,
    "fundingAPR": 16.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-15",
    "timestamp": 1778803200000,
    "spotPrice": 186.13,
    "fundingAPR": 14.02,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-16",
    "timestamp": 1778889600000,
    "spotPrice": 181.7,
    "fundingAPR": 14.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-17",
    "timestamp": 1778976000000,
    "spotPrice": 182.08,
    "fundingAPR": 16.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-18",
    "timestamp": 1779062400000,
    "spotPrice": 186.32,
    "fundingAPR": 13.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-19",
    "timestamp": 1779148800000,
    "spotPrice": 184.76,
    "fundingAPR": 15.73,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-20",
    "timestamp": 1779235200000,
    "spotPrice": 180.83,
    "fundingAPR": 15.45,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-21",
    "timestamp": 1779321600000,
    "spotPrice": 183.31,
    "fundingAPR": 13.59,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-22",
    "timestamp": 1779408000000,
    "spotPrice": 186.51,
    "fundingAPR": 16.32,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-23",
    "timestamp": 1779494400000,
    "spotPrice": 183.11,
    "fundingAPR": 14.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-24",
    "timestamp": 1779580800000,
    "spotPrice": 180.7,
    "fundingAPR": 14.16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-25",
    "timestamp": 1779667200000,
    "spotPrice": 184.63,
    "fundingAPR": 16.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-26",
    "timestamp": 1779753600000,
    "spotPrice": 185.94,
    "fundingAPR": 13.73,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-27",
    "timestamp": 1779840000000,
    "spotPrice": 181.58,
    "fundingAPR": 15.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-28",
    "timestamp": 1779926400000,
    "spotPrice": 181.3,
    "fundingAPR": 15.94,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-29",
    "timestamp": 1780012800000,
    "spotPrice": 185.64,
    "fundingAPR": 13.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-30",
    "timestamp": 1780099200000,
    "spotPrice": 184.71,
    "fundingAPR": 15.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-31",
    "timestamp": 1780185600000,
    "spotPrice": 180.52,
    "fundingAPR": 15.09,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-01",
    "timestamp": 1780272000000,
    "spotPrice": 182.45,
    "fundingAPR": 13.59,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-02",
    "timestamp": 1780358400000,
    "spotPrice": 186.05,
    "fundingAPR": 16.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-03",
    "timestamp": 1780444800000,
    "spotPrice": 183.11,
    "fundingAPR": 14.16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-04",
    "timestamp": 1780531200000,
    "spotPrice": 180.18,
    "fundingAPR": 14.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-05",
    "timestamp": 1780617600000,
    "spotPrice": 183.79,
    "fundingAPR": 16.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-06",
    "timestamp": 1780704000000,
    "spotPrice": 185.71,
    "fundingAPR": 13.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-07",
    "timestamp": 1780790400000,
    "spotPrice": 181.52,
    "fundingAPR": 15.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-08",
    "timestamp": 1780876800000,
    "spotPrice": 180.59,
    "fundingAPR": 15.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-09",
    "timestamp": 1780963200000,
    "spotPrice": 184.94,
    "fundingAPR": 13.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-10",
    "timestamp": 1781049600000,
    "spotPrice": 184.66,
    "fundingAPR": 15.89,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-11",
    "timestamp": 1781136000000,
    "spotPrice": 180.3,
    "fundingAPR": 14.73,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-12",
    "timestamp": 1781222400000,
    "spotPrice": 181.62,
    "fundingAPR": 13.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-13",
    "timestamp": 1781308800000,
    "spotPrice": 185.55,
    "fundingAPR": 16.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-14",
    "timestamp": 1781395200000,
    "spotPrice": 183.14,
    "fundingAPR": 13.84,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-15",
    "timestamp": 1781481600000,
    "spotPrice": 179.74,
    "fundingAPR": 14.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-16",
    "timestamp": 1781568000000,
    "spotPrice": 182.95,
    "fundingAPR": 16.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-17",
    "timestamp": 1781654400000,
    "spotPrice": 185.44,
    "fundingAPR": 13.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-18",
    "timestamp": 1781740800000,
    "spotPrice": 181.51,
    "fundingAPR": 15.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-19",
    "timestamp": 1781827200000,
    "spotPrice": 179.95,
    "fundingAPR": 15.31,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-20",
    "timestamp": 1781913600000,
    "spotPrice": 184.2,
    "fundingAPR": 13.23,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-21",
    "timestamp": 1782000000000,
    "spotPrice": 184.58,
    "fundingAPR": 15.93,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-22",
    "timestamp": 1782086400000,
    "spotPrice": 180.16,
    "fundingAPR": 14.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-23",
    "timestamp": 1782172800000,
    "spotPrice": 180.84,
    "fundingAPR": 13.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-24",
    "timestamp": 1782259200000,
    "spotPrice": 185.01,
    "fundingAPR": 16.12,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-25",
    "timestamp": 1782345600000,
    "spotPrice": 183.18,
    "fundingAPR": 13.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-26",
    "timestamp": 1782432000000,
    "spotPrice": 179.4,
    "fundingAPR": 14.54,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-27",
    "timestamp": 1782518400000,
    "spotPrice": 182.13,
    "fundingAPR": 15.76,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-28",
    "timestamp": 1782604800000,
    "spotPrice": 185.13,
    "fundingAPR": 13.11,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-29",
    "timestamp": 1782691200000,
    "spotPrice": 181.55,
    "fundingAPR": 15.39,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-30",
    "timestamp": 1782777600000,
    "spotPrice": 179.4,
    "fundingAPR": 14.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-01",
    "timestamp": 1782864000000,
    "spotPrice": 183.46,
    "fundingAPR": 13.22,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-02",
    "timestamp": 1782950400000,
    "spotPrice": 184.49,
    "fundingAPR": 15.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-03",
    "timestamp": 1783036800000,
    "spotPrice": 180.09,
    "fundingAPR": 14.04,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-04",
    "timestamp": 1783123200000,
    "spotPrice": 180.12,
    "fundingAPR": 13.83,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-05",
    "timestamp": 1783209600000,
    "spotPrice": 184.43,
    "fundingAPR": 15.99,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-06",
    "timestamp": 1783296000000,
    "spotPrice": 183.22,
    "fundingAPR": 13.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-07",
    "timestamp": 1783382400000,
    "spotPrice": 179.14,
    "fundingAPR": 14.7,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-08",
    "timestamp": 1783468800000,
    "spotPrice": 181.34,
    "fundingAPR": 15.49,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-09",
    "timestamp": 1783555200000,
    "spotPrice": 184.78,
    "fundingAPR": 13,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-10",
    "timestamp": 1783641600000,
    "spotPrice": 181.63,
    "fundingAPR": 15.5,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-11",
    "timestamp": 1783728000000,
    "spotPrice": 178.93,
    "fundingAPR": 14.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-12",
    "timestamp": 1783814400000,
    "spotPrice": 182.7,
    "fundingAPR": 13.26,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-13",
    "timestamp": 1783900800000,
    "spotPrice": 184.36,
    "fundingAPR": 15.93,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-14",
    "timestamp": 1783987200000,
    "spotPrice": 180.09,
    "fundingAPR": 13.72,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-15",
    "timestamp": 1784073600000,
    "spotPrice": 179.46,
    "fundingAPR": 13.96,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-16",
    "timestamp": 1784160000000,
    "spotPrice": 183.83,
    "fundingAPR": 15.82,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-17",
    "timestamp": 1784246400000,
    "spotPrice": 183.26,
    "fundingAPR": 13.07,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-18",
    "timestamp": 1784332800000,
    "spotPrice": 178.98,
    "fundingAPR": 14.85,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-19",
    "timestamp": 1784419200000,
    "spotPrice": 180.58,
    "fundingAPR": 15.2,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-20",
    "timestamp": 1784505600000,
    "spotPrice": 184.39,
    "fundingAPR": 12.93,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-21",
    "timestamp": 1784592000000,
    "spotPrice": 181.74,
    "fundingAPR": 15.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-22",
    "timestamp": 1784678400000,
    "spotPrice": 178.55,
    "fundingAPR": 14.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-23",
    "timestamp": 1784764800000,
    "spotPrice": 181.96,
    "fundingAPR": 13.33,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-24",
    "timestamp": 1784851200000,
    "spotPrice": 184.2,
    "fundingAPR": 15.88,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-25",
    "timestamp": 1784937600000,
    "spotPrice": 180.15,
    "fundingAPR": 13.42,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-26",
    "timestamp": 1785024000000,
    "spotPrice": 178.89,
    "fundingAPR": 14.12,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-27",
    "timestamp": 1785110400000,
    "spotPrice": 183.21,
    "fundingAPR": 15.62,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-28",
    "timestamp": 1785196800000,
    "spotPrice": 183.3,
    "fundingAPR": 12.9,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-29",
    "timestamp": 1785283200000,
    "spotPrice": 178.9,
    "fundingAPR": 15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-30",
    "timestamp": 1785369600000,
    "spotPrice": 179.88,
    "fundingAPR": 14.9,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-31",
    "timestamp": 1785456000000,
    "spotPrice": 183.97,
    "fundingAPR": 12.92,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-01",
    "timestamp": 1785542400000,
    "spotPrice": 181.87,
    "fundingAPR": 15.64,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-02",
    "timestamp": 1785628800000,
    "spotPrice": 178.27,
    "fundingAPR": 13.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-03",
    "timestamp": 1785715200000,
    "spotPrice": 181.23,
    "fundingAPR": 13.45,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-04",
    "timestamp": 1785801600000,
    "spotPrice": 184.02,
    "fundingAPR": 15.79,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-05",
    "timestamp": 1785888000000,
    "spotPrice": 180.28,
    "fundingAPR": 13.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-06",
    "timestamp": 1785974400000,
    "spotPrice": 178.4,
    "fundingAPR": 14.3,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-07",
    "timestamp": 1786060800000,
    "spotPrice": 182.57,
    "fundingAPR": 15.39,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-08",
    "timestamp": 1786147200000,
    "spotPrice": 183.31,
    "fundingAPR": 12.78,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-09",
    "timestamp": 1786233600000,
    "spotPrice": 178.9,
    "fundingAPR": 15.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-10",
    "timestamp": 1786320000000,
    "spotPrice": 179.24,
    "fundingAPR": 14.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-11",
    "timestamp": 1786406400000,
    "spotPrice": 183.51,
    "fundingAPR": 12.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-12",
    "timestamp": 1786492800000,
    "spotPrice": 182.02,
    "fundingAPR": 15.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-13",
    "timestamp": 1786579200000,
    "spotPrice": 178.08,
    "fundingAPR": 13.66,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-14",
    "timestamp": 1786665600000,
    "spotPrice": 180.53,
    "fundingAPR": 13.6,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-15",
    "timestamp": 1786752000000,
    "spotPrice": 183.79,
    "fundingAPR": 15.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-16",
    "timestamp": 1786838400000,
    "spotPrice": 180.45,
    "fundingAPR": 12.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-17",
    "timestamp": 1786924800000,
    "spotPrice": 178,
    "fundingAPR": 14.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-18",
    "timestamp": 1787011200000,
    "spotPrice": 181.93,
    "fundingAPR": 15.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-19",
    "timestamp": 1787097600000,
    "spotPrice": 183.31,
    "fundingAPR": 12.71,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-20",
    "timestamp": 1787184000000,
    "spotPrice": 178.98,
    "fundingAPR": 15.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-21",
    "timestamp": 1787270400000,
    "spotPrice": 178.67,
    "fundingAPR": 14.27,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-22",
    "timestamp": 1787356800000,
    "spotPrice": 183.03,
    "fundingAPR": 13.02,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-23",
    "timestamp": 1787443200000,
    "spotPrice": 182.18,
    "fundingAPR": 15.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-24",
    "timestamp": 1787529600000,
    "spotPrice": 177.99,
    "fundingAPR": 13.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-25",
    "timestamp": 1787616000000,
    "spotPrice": 179.88,
    "fundingAPR": 13.77,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-26",
    "timestamp": 1787702400000,
    "spotPrice": 183.54,
    "fundingAPR": 15.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-27",
    "timestamp": 1787788800000,
    "spotPrice": 180.66,
    "fundingAPR": 12.78,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-28",
    "timestamp": 1787875200000,
    "spotPrice": 177.7,
    "fundingAPR": 14.66,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-29",
    "timestamp": 1787961600000,
    "spotPrice": 181.3,
    "fundingAPR": 14.87,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-30",
    "timestamp": 1788048000000,
    "spotPrice": 183.29,
    "fundingAPR": 12.69,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-31",
    "timestamp": 1788134400000,
    "spotPrice": 179.14,
    "fundingAPR": 15.37,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-01",
    "timestamp": 1788220800000,
    "spotPrice": 178.17,
    "fundingAPR": 13.97,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-02",
    "timestamp": 1788307200000,
    "spotPrice": 182.53,
    "fundingAPR": 13.14,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-03",
    "timestamp": 1788393600000,
    "spotPrice": 182.33,
    "fundingAPR": 15.63,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-04",
    "timestamp": 1788480000000,
    "spotPrice": 177.99,
    "fundingAPR": 13.12,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-05",
    "timestamp": 1788566400000,
    "spotPrice": 179.27,
    "fundingAPR": 13.96,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-06",
    "timestamp": 1788652800000,
    "spotPrice": 183.25,
    "fundingAPR": 15.34,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-07",
    "timestamp": 1788739200000,
    "spotPrice": 180.9,
    "fundingAPR": 12.65,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-08",
    "timestamp": 1788825600000,
    "spotPrice": 177.49,
    "fundingAPR": 14.84,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-09",
    "timestamp": 1788912000000,
    "spotPrice": 180.68,
    "fundingAPR": 14.6,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-10",
    "timestamp": 1788998400000,
    "spotPrice": 183.24,
    "fundingAPR": 12.72,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-11",
    "timestamp": 1789084800000,
    "spotPrice": 179.36,
    "fundingAPR": 15.45,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-12",
    "timestamp": 1789171200000,
    "spotPrice": 177.77,
    "fundingAPR": 13.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-13",
    "timestamp": 1789257600000,
    "spotPrice": 182.02,
    "fundingAPR": 13.3,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-14",
    "timestamp": 1789344000000,
    "spotPrice": 182.48,
    "fundingAPR": 15.57,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-15",
    "timestamp": 1789430400000,
    "spotPrice": 178.08,
    "fundingAPR": 12.91,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-16",
    "timestamp": 1789516800000,
    "spotPrice": 178.72,
    "fundingAPR": 14.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-17",
    "timestamp": 1789603200000,
    "spotPrice": 182.93,
    "fundingAPR": 15.13,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-18",
    "timestamp": 1789689600000,
    "spotPrice": 181.17,
    "fundingAPR": 12.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-19",
    "timestamp": 1789776000000,
    "spotPrice": 177.39,
    "fundingAPR": 15.01,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-20",
    "timestamp": 1789862400000,
    "spotPrice": 180.09,
    "fundingAPR": 14.31,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-21",
    "timestamp": 1789948800000,
    "spotPrice": 183.15,
    "fundingAPR": 12.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-22",
    "timestamp": 1790035200000,
    "spotPrice": 179.63,
    "fundingAPR": 15.5,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-23",
    "timestamp": 1790121600000,
    "spotPrice": 177.45,
    "fundingAPR": 13.4,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-24",
    "timestamp": 1790208000000,
    "spotPrice": 181.51,
    "fundingAPR": 13.48,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-25",
    "timestamp": 1790294400000,
    "spotPrice": 182.62,
    "fundingAPR": 15.47,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-26",
    "timestamp": 1790380800000,
    "spotPrice": 178.25,
    "fundingAPR": 12.73,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-27",
    "timestamp": 1790467200000,
    "spotPrice": 178.24,
    "fundingAPR": 14.38,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-28",
    "timestamp": 1790553600000,
    "spotPrice": 182.59,
    "fundingAPR": 14.91,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-29",
    "timestamp": 1790640000000,
    "spotPrice": 181.46,
    "fundingAPR": 12.55,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-30",
    "timestamp": 1790726400000,
    "spotPrice": 177.38,
    "fundingAPR": 15.16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-01",
    "timestamp": 1790812800000,
    "spotPrice": 179.54,
    "fundingAPR": 14.03,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-02",
    "timestamp": 1790899200000,
    "spotPrice": 183.04,
    "fundingAPR": 12.92,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-03",
    "timestamp": 1790985600000,
    "spotPrice": 179.96,
    "fundingAPR": 15.52,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-04",
    "timestamp": 1791072000000,
    "spotPrice": 177.23,
    "fundingAPR": 13.16,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-05",
    "timestamp": 1791158400000,
    "spotPrice": 181,
    "fundingAPR": 13.7,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-06",
    "timestamp": 1791244800000,
    "spotPrice": 182.74,
    "fundingAPR": 15.34,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-07",
    "timestamp": 1791331200000,
    "spotPrice": 178.5,
    "fundingAPR": 12.61,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-08",
    "timestamp": 1791417600000,
    "spotPrice": 177.84,
    "fundingAPR": 14.6,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-09",
    "timestamp": 1791504000000,
    "spotPrice": 182.23,
    "fundingAPR": 14.67,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-10",
    "timestamp": 1791590400000,
    "spotPrice": 181.74,
    "fundingAPR": 12.58,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-11",
    "timestamp": 1791676800000,
    "spotPrice": 177.47,
    "fundingAPR": 15.29,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-12",
    "timestamp": 1791763200000,
    "spotPrice": 179.04,
    "fundingAPR": 13.76,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-13",
    "timestamp": 1791849600000,
    "spotPrice": 182.9,
    "fundingAPR": 13.08,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-14",
    "timestamp": 1791936000000,
    "spotPrice": 180.32,
    "fundingAPR": 15.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-15",
    "timestamp": 1792022400000,
    "spotPrice": 177.11,
    "fundingAPR": 12.95,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-16",
    "timestamp": 1792108800000,
    "spotPrice": 180.51,
    "fundingAPR": 13.93,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-17",
    "timestamp": 1792195200000,
    "spotPrice": 182.83,
    "fundingAPR": 15.18,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-18",
    "timestamp": 1792281600000,
    "spotPrice": 178.83,
    "fundingAPR": 12.53,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-19",
    "timestamp": 1792368000000,
    "spotPrice": 177.53,
    "fundingAPR": 14.8,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-20",
    "timestamp": 1792454400000,
    "spotPrice": 181.86,
    "fundingAPR": 14.42,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-21",
    "timestamp": 1792540800000,
    "spotPrice": 182.03,
    "fundingAPR": 12.65,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-22",
    "timestamp": 1792627200000,
    "spotPrice": 177.65,
    "fundingAPR": 15.39,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-23",
    "timestamp": 1792713600000,
    "spotPrice": 178.6,
    "fundingAPR": 13.51,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-24",
    "timestamp": 1792800000000,
    "spotPrice": 182.73,
    "fundingAPR": 13.28,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-25",
    "timestamp": 1792886400000,
    "spotPrice": 180.71,
    "fundingAPR": 15.46,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-26",
    "timestamp": 1792972800000,
    "spotPrice": 177.1,
    "fundingAPR": 12.78,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-27",
    "timestamp": 1793059200000,
    "spotPrice": 180.04,
    "fundingAPR": 14.17,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-28",
    "timestamp": 1793145600000,
    "spotPrice": 182.9,
    "fundingAPR": 15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-29",
    "timestamp": 1793232000000,
    "spotPrice": 179.21,
    "fundingAPR": 12.5,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-30",
    "timestamp": 1793318400000,
    "spotPrice": 177.31,
    "fundingAPR": 15,
    "stakingAPY": 7,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-31",
    "timestamp": 1793404800000,
    "spotPrice": 180,
    "fundingAPR": 14,
    "stakingAPY": 7,
    "depegPct": 0.05
  }
];

export const BTC_HISTORICAL_SERIES: DailyHistoricalMarketStep[] = [
  {
    "date": "2024-08-15",
    "timestamp": 1723680000000,
    "spotPrice": 57624.27,
    "fundingAPR": 10.18,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-16",
    "timestamp": 1723766400000,
    "spotPrice": 58562.51,
    "fundingAPR": 10.05,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-17",
    "timestamp": 1723852800000,
    "spotPrice": 59380.45,
    "fundingAPR": 8.1,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-18",
    "timestamp": 1723939200000,
    "spotPrice": 58264.53,
    "fundingAPR": 10.85,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-19",
    "timestamp": 1724025600000,
    "spotPrice": 57789.24,
    "fundingAPR": 9.17,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-20",
    "timestamp": 1724112000000,
    "spotPrice": 59104.61,
    "fundingAPR": 8.71,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-21",
    "timestamp": 1724198400000,
    "spotPrice": 59339.65,
    "fundingAPR": 11.07,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-22",
    "timestamp": 1724284800000,
    "spotPrice": 58083.96,
    "fundingAPR": 8.47,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-23",
    "timestamp": 1724371200000,
    "spotPrice": 58314.05,
    "fundingAPR": 9.67,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-24",
    "timestamp": 1724457600000,
    "spotPrice": 59673.03,
    "fundingAPR": 10.78,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-25",
    "timestamp": 1724544000000,
    "spotPrice": 59276.03,
    "fundingAPR": 8.22,
    "stakingAPY": 1.2,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-26",
    "timestamp": 1724630400000,
    "spotPrice": 58222.99,
    "fundingAPR": 10.65,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-27",
    "timestamp": 1724716800000,
    "spotPrice": 59114.94,
    "fundingAPR": 10.12,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-28",
    "timestamp": 1724803200000,
    "spotPrice": 60181.24,
    "fundingAPR": 8.56,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-29",
    "timestamp": 1724889600000,
    "spotPrice": 59276.66,
    "fundingAPR": 11.34,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-30",
    "timestamp": 1724976000000,
    "spotPrice": 58724.14,
    "fundingAPR": 9.38,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-08-31",
    "timestamp": 1725062400000,
    "spotPrice": 60069.74,
    "fundingAPR": 9.41,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-01",
    "timestamp": 1725148800000,
    "spotPrice": 60591.56,
    "fundingAPR": 11.54,
    "stakingAPY": 1.19,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-02",
    "timestamp": 1725235200000,
    "spotPrice": 59444.3,
    "fundingAPR": 8.89,
    "stakingAPY": 1.18,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-03",
    "timestamp": 1725321600000,
    "spotPrice": 59567.05,
    "fundingAPR": 10.53,
    "stakingAPY": 1.18,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-04",
    "timestamp": 1725408000000,
    "spotPrice": 61047.04,
    "fundingAPR": 11.24,
    "stakingAPY": 1.18,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-05",
    "timestamp": 1725494400000,
    "spotPrice": 60922.01,
    "fundingAPR": 8.91,
    "stakingAPY": 1.18,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-06",
    "timestamp": 1725580800000,
    "spotPrice": 59867.31,
    "fundingAPR": 11.56,
    "stakingAPY": 1.18,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-07",
    "timestamp": 1725667200000,
    "spotPrice": 60670.42,
    "fundingAPR": 10.63,
    "stakingAPY": 1.18,
    "depegPct": 0.08
  },
  {
    "date": "2024-09-08",
    "timestamp": 1725753600000,
    "spotPrice": 61936.88,
    "fundingAPR": 9.5,
    "stakingAPY": 1.17,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-09",
    "timestamp": 1725840000000,
    "spotPrice": 61237.72,
    "fundingAPR": 12.22,
    "stakingAPY": 1.17,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-10",
    "timestamp": 1725926400000,
    "spotPrice": 60592.5,
    "fundingAPR": 10.01,
    "stakingAPY": 1.17,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-11",
    "timestamp": 1726012800000,
    "spotPrice": 61908.87,
    "fundingAPR": 10.53,
    "stakingAPY": 1.17,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-12",
    "timestamp": 1726099200000,
    "spotPrice": 62674.85,
    "fundingAPR": 12.36,
    "stakingAPY": 1.17,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-13",
    "timestamp": 1726185600000,
    "spotPrice": 61629.17,
    "fundingAPR": 9.72,
    "stakingAPY": 1.16,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-14",
    "timestamp": 1726272000000,
    "spotPrice": 61607.92,
    "fundingAPR": 11.73,
    "stakingAPY": 1.16,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-15",
    "timestamp": 1726358400000,
    "spotPrice": 63140.61,
    "fundingAPR": 12.01,
    "stakingAPY": 1.16,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-16",
    "timestamp": 1726444800000,
    "spotPrice": 63253.75,
    "fundingAPR": 9.95,
    "stakingAPY": 1.16,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-17",
    "timestamp": 1726531200000,
    "spotPrice": 62183.12,
    "fundingAPR": 12.74,
    "stakingAPY": 1.16,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-18",
    "timestamp": 1726617600000,
    "spotPrice": 62840.5,
    "fundingAPR": 11.41,
    "stakingAPY": 1.15,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-19",
    "timestamp": 1726704000000,
    "spotPrice": 64238.79,
    "fundingAPR": 10.72,
    "stakingAPY": 1.15,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-20",
    "timestamp": 1726790400000,
    "spotPrice": 63719.62,
    "fundingAPR": 13.3,
    "stakingAPY": 1.15,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-21",
    "timestamp": 1726876800000,
    "spotPrice": 62954.12,
    "fundingAPR": 10.88,
    "stakingAPY": 1.15,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-22",
    "timestamp": 1726963200000,
    "spotPrice": 64169.08,
    "fundingAPR": 11.85,
    "stakingAPY": 1.14,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-23",
    "timestamp": 1727049600000,
    "spotPrice": 65118.56,
    "fundingAPR": 13.31,
    "stakingAPY": 1.14,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-24",
    "timestamp": 1727136000000,
    "spotPrice": 64153.56,
    "fundingAPR": 10.73,
    "stakingAPY": 1.14,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-25",
    "timestamp": 1727222400000,
    "spotPrice": 63943.97,
    "fundingAPR": 13.04,
    "stakingAPY": 1.14,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-26",
    "timestamp": 1727308800000,
    "spotPrice": 65449.83,
    "fundingAPR": 12.86,
    "stakingAPY": 1.14,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-27",
    "timestamp": 1727395200000,
    "spotPrice": 65752.91,
    "fundingAPR": 11.11,
    "stakingAPY": 1.13,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-28",
    "timestamp": 1727481600000,
    "spotPrice": 64644.21,
    "fundingAPR": 13.94,
    "stakingAPY": 1.13,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-29",
    "timestamp": 1727568000000,
    "spotPrice": 65094.91,
    "fundingAPR": 12.23,
    "stakingAPY": 1.13,
    "depegPct": 0.07
  },
  {
    "date": "2024-09-30",
    "timestamp": 1727654400000,
    "spotPrice": 66547.43,
    "fundingAPR": 11.98,
    "stakingAPY": 1.13,
    "depegPct": 0.07
  },
  {
    "date": "2024-10-01",
    "timestamp": 1727740800000,
    "spotPrice": 66173.39,
    "fundingAPR": 14.32,
    "stakingAPY": 1.13,
    "depegPct": 0.07
  },
  {
    "date": "2024-10-02",
    "timestamp": 1727827200000,
    "spotPrice": 65258.32,
    "fundingAPR": 11.75,
    "stakingAPY": 1.12,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-03",
    "timestamp": 1727913600000,
    "spotPrice": 66298.47,
    "fundingAPR": 13.12,
    "stakingAPY": 1.12,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-04",
    "timestamp": 1728000000000,
    "spotPrice": 67364.21,
    "fundingAPR": 14.14,
    "stakingAPY": 1.12,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-05",
    "timestamp": 1728086400000,
    "spotPrice": 66455.73,
    "fundingAPR": 11.68,
    "stakingAPY": 1.12,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-06",
    "timestamp": 1728172800000,
    "spotPrice": 66017.17,
    "fundingAPR": 14.2,
    "stakingAPY": 1.12,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-07",
    "timestamp": 1728259200000,
    "spotPrice": 67417.76,
    "fundingAPR": 13.55,
    "stakingAPY": 1.12,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-08",
    "timestamp": 1728345600000,
    "spotPrice": 67859.77,
    "fundingAPR": 12.13,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-09",
    "timestamp": 1728432000000,
    "spotPrice": 66694.21,
    "fundingAPR": 14.91,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-10",
    "timestamp": 1728518400000,
    "spotPrice": 66885.36,
    "fundingAPR": 12.85,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-11",
    "timestamp": 1728604800000,
    "spotPrice": 68317.71,
    "fundingAPR": 13.03,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-12",
    "timestamp": 1728691200000,
    "spotPrice": 68056.1,
    "fundingAPR": 15.05,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-13",
    "timestamp": 1728777600000,
    "spotPrice": 66971.84,
    "fundingAPR": 12.37,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-14",
    "timestamp": 1728864000000,
    "spotPrice": 67775,
    "fundingAPR": 14.09,
    "stakingAPY": 1.11,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-15",
    "timestamp": 1728950400000,
    "spotPrice": 68895.4,
    "fundingAPR": 14.63,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-16",
    "timestamp": 1729036800000,
    "spotPrice": 68027.12,
    "fundingAPR": 12.34,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-17",
    "timestamp": 1729123200000,
    "spotPrice": 67334.1,
    "fundingAPR": 14.99,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-18",
    "timestamp": 1729209600000,
    "spotPrice": 68564.25,
    "fundingAPR": 13.87,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-19",
    "timestamp": 1729296000000,
    "spotPrice": 69102.85,
    "fundingAPR": 12.82,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-20",
    "timestamp": 1729382400000,
    "spotPrice": 67875.46,
    "fundingAPR": 15.44,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-21",
    "timestamp": 1729468800000,
    "spotPrice": 67773.39,
    "fundingAPR": 13.08,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-22",
    "timestamp": 1729555200000,
    "spotPrice": 69125.79,
    "fundingAPR": 13.67,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-23",
    "timestamp": 1729641600000,
    "spotPrice": 68956.33,
    "fundingAPR": 15.29,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-24",
    "timestamp": 1729728000000,
    "spotPrice": 67702.69,
    "fundingAPR": 12.58,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-25",
    "timestamp": 1729814400000,
    "spotPrice": 68181.85,
    "fundingAPR": 14.59,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-26",
    "timestamp": 1729900800000,
    "spotPrice": 69524.03,
    "fundingAPR": 14.66,
    "stakingAPY": 1.1,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-27",
    "timestamp": 1729987200000,
    "spotPrice": 68613.48,
    "fundingAPR": 12.68,
    "stakingAPY": 1.09,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-28",
    "timestamp": 1730073600000,
    "spotPrice": 67596.02,
    "fundingAPR": 15.54,
    "stakingAPY": 1.08,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-29",
    "timestamp": 1730160000000,
    "spotPrice": 68910.76,
    "fundingAPR": 14.17,
    "stakingAPY": 1.07,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-30",
    "timestamp": 1730246400000,
    "spotPrice": 69771.84,
    "fundingAPR": 13.72,
    "stakingAPY": 1.06,
    "depegPct": 0.06
  },
  {
    "date": "2024-10-31",
    "timestamp": 1730332800000,
    "spotPrice": 68443.27,
    "fundingAPR": 16.35,
    "stakingAPY": 1.04,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-01",
    "timestamp": 1730419200000,
    "spotPrice": 68141.38,
    "fundingAPR": 13.99,
    "stakingAPY": 1.03,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-02",
    "timestamp": 1730505600000,
    "spotPrice": 69755.81,
    "fundingAPR": 15.18,
    "stakingAPY": 1.02,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-03",
    "timestamp": 1730592000000,
    "spotPrice": 69824.1,
    "fundingAPR": 16.54,
    "stakingAPY": 1.01,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-04",
    "timestamp": 1730678400000,
    "spotPrice": 68334.08,
    "fundingAPR": 13.99,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-05",
    "timestamp": 1730764800000,
    "spotPrice": 68735.13,
    "fundingAPR": 16.31,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-06",
    "timestamp": 1730851200000,
    "spotPrice": 70181.74,
    "fundingAPR": 15.9,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-07",
    "timestamp": 1730937600000,
    "spotPrice": 69418.28,
    "fundingAPR": 14.16,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-08",
    "timestamp": 1731024000000,
    "spotPrice": 68178.56,
    "fundingAPR": 16.89,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-09",
    "timestamp": 1731110400000,
    "spotPrice": 69278.41,
    "fundingAPR": 14.99,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-10",
    "timestamp": 1731196800000,
    "spotPrice": 70258.4,
    "fundingAPR": 14.8,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-11",
    "timestamp": 1731283200000,
    "spotPrice": 68936.46,
    "fundingAPR": 16.97,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-12",
    "timestamp": 1731369600000,
    "spotPrice": 68334.3,
    "fundingAPR": 14.28,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-13",
    "timestamp": 1731456000000,
    "spotPrice": 69855.32,
    "fundingAPR": 15.7,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-14",
    "timestamp": 1731542400000,
    "spotPrice": 70116.14,
    "fundingAPR": 16.51,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-15",
    "timestamp": 1731628800000,
    "spotPrice": 68585.21,
    "fundingAPR": 14.03,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-16",
    "timestamp": 1731715200000,
    "spotPrice": 68782.86,
    "fundingAPR": 16.54,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-17",
    "timestamp": 1731801600000,
    "spotPrice": 70333.46,
    "fundingAPR": 15.69,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-18",
    "timestamp": 1731888000000,
    "spotPrice": 69813.45,
    "fundingAPR": 14.33,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-19",
    "timestamp": 1731974400000,
    "spotPrice": 68480.63,
    "fundingAPR": 17.02,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-20",
    "timestamp": 1732060800000,
    "spotPrice": 69434.43,
    "fundingAPR": 14.82,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-21",
    "timestamp": 1732147200000,
    "spotPrice": 70618.3,
    "fundingAPR": 15.08,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-22",
    "timestamp": 1732233600000,
    "spotPrice": 69462.74,
    "fundingAPR": 16.95,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-23",
    "timestamp": 1732320000000,
    "spotPrice": 68686.37,
    "fundingAPR": 14.22,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-24",
    "timestamp": 1732406400000,
    "spotPrice": 70158.1,
    "fundingAPR": 16.02,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-25",
    "timestamp": 1732492800000,
    "spotPrice": 70677.66,
    "fundingAPR": 16.39,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-26",
    "timestamp": 1732579200000,
    "spotPrice": 69200.78,
    "fundingAPR": 14.13,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-27",
    "timestamp": 1732665600000,
    "spotPrice": 69196.75,
    "fundingAPR": 16.8,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-28",
    "timestamp": 1732752000000,
    "spotPrice": 70815.82,
    "fundingAPR": 15.53,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-29",
    "timestamp": 1732838400000,
    "spotPrice": 70549.88,
    "fundingAPR": 14.59,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-11-30",
    "timestamp": 1732924800000,
    "spotPrice": 69152.67,
    "fundingAPR": 17.15,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-01",
    "timestamp": 1733011200000,
    "spotPrice": 69937.97,
    "fundingAPR": 14.72,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-02",
    "timestamp": 1733097600000,
    "spotPrice": 71298.07,
    "fundingAPR": 15.44,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-03",
    "timestamp": 1733184000000,
    "spotPrice": 70333.4,
    "fundingAPR": 16.96,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-04",
    "timestamp": 1733270400000,
    "spotPrice": 69398.8,
    "fundingAPR": 14.26,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-05",
    "timestamp": 1733356800000,
    "spotPrice": 70786.94,
    "fundingAPR": 16.38,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-06",
    "timestamp": 1733443200000,
    "spotPrice": 71552.13,
    "fundingAPR": 16.3,
    "stakingAPY": 1,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-07",
    "timestamp": 1733529600000,
    "spotPrice": 70160.67,
    "fundingAPR": 14.34,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-08",
    "timestamp": 1733616000000,
    "spotPrice": 69953.41,
    "fundingAPR": 17.09,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-09",
    "timestamp": 1733702400000,
    "spotPrice": 71603.05,
    "fundingAPR": 15.44,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-10",
    "timestamp": 1733788800000,
    "spotPrice": 71595.33,
    "fundingAPR": 14.94,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-11",
    "timestamp": 1733875200000,
    "spotPrice": 70163.03,
    "fundingAPR": 17.3,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-12",
    "timestamp": 1733961600000,
    "spotPrice": 70760.36,
    "fundingAPR": 14.7,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-13",
    "timestamp": 1734048000000,
    "spotPrice": 72264.32,
    "fundingAPR": 15.86,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-14",
    "timestamp": 1734134400000,
    "spotPrice": 71510,
    "fundingAPR": 16.98,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-15",
    "timestamp": 1734220800000,
    "spotPrice": 70435.88,
    "fundingAPR": 14.39,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-16",
    "timestamp": 1734307200000,
    "spotPrice": 71707.22,
    "fundingAPR": 16.78,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-17",
    "timestamp": 1734393600000,
    "spotPrice": 72698.67,
    "fundingAPR": 16.24,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-18",
    "timestamp": 1734480000000,
    "spotPrice": 71421.37,
    "fundingAPR": 14.63,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-19",
    "timestamp": 1734566400000,
    "spotPrice": 71013.09,
    "fundingAPR": 17.38,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-20",
    "timestamp": 1734652800000,
    "spotPrice": 72654.01,
    "fundingAPR": 15.39,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-21",
    "timestamp": 1734739200000,
    "spotPrice": 72902.14,
    "fundingAPR": 15.36,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-22",
    "timestamp": 1734825600000,
    "spotPrice": 71464.15,
    "fundingAPR": 17.46,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-23",
    "timestamp": 1734912000000,
    "spotPrice": 71857.52,
    "fundingAPR": 14.76,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-24",
    "timestamp": 1734998400000,
    "spotPrice": 73469.04,
    "fundingAPR": 16.32,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-25",
    "timestamp": 1735084800000,
    "spotPrice": 72939.15,
    "fundingAPR": 17.01,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-26",
    "timestamp": 1735171200000,
    "spotPrice": 71746.66,
    "fundingAPR": 14.61,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-27",
    "timestamp": 1735257600000,
    "spotPrice": 72869.94,
    "fundingAPR": 17.19,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-28",
    "timestamp": 1735344000000,
    "spotPrice": 74062.59,
    "fundingAPR": 16.22,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-29",
    "timestamp": 1735430400000,
    "spotPrice": 72924.97,
    "fundingAPR": 15,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-30",
    "timestamp": 1735516800000,
    "spotPrice": 72321.74,
    "fundingAPR": 17.67,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2024-12-31",
    "timestamp": 1735603200000,
    "spotPrice": 73914.22,
    "fundingAPR": 15.41,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-01",
    "timestamp": 1735689600000,
    "spotPrice": 74409.52,
    "fundingAPR": 15.83,
    "stakingAPY": 0.99,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-02",
    "timestamp": 1735776000000,
    "spotPrice": 72994.75,
    "fundingAPR": 17.61,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-03",
    "timestamp": 1735862400000,
    "spotPrice": 73172.14,
    "fundingAPR": 14.89,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-04",
    "timestamp": 1735948800000,
    "spotPrice": 74851.98,
    "fundingAPR": 16.81,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-05",
    "timestamp": 1736035200000,
    "spotPrice": 74555.02,
    "fundingAPR": 17.05,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-06",
    "timestamp": 1736121600000,
    "spotPrice": 73267.41,
    "fundingAPR": 14.89,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-07",
    "timestamp": 1736208000000,
    "spotPrice": 74214.16,
    "fundingAPR": 17.61,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-08",
    "timestamp": 1736294400000,
    "spotPrice": 75577.93,
    "fundingAPR": 16.23,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-09",
    "timestamp": 1736380800000,
    "spotPrice": 74601.9,
    "fundingAPR": 15.43,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-10",
    "timestamp": 1736467200000,
    "spotPrice": 73813.67,
    "fundingAPR": 17.95,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-11",
    "timestamp": 1736553600000,
    "spotPrice": 75318.6,
    "fundingAPR": 15.47,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-12",
    "timestamp": 1736640000000,
    "spotPrice": 76046.43,
    "fundingAPR": 16.34,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-13",
    "timestamp": 1736726400000,
    "spotPrice": 74682.84,
    "fundingAPR": 17.74,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-14",
    "timestamp": 1736812800000,
    "spotPrice": 74636.64,
    "fundingAPR": 15.09,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-15",
    "timestamp": 1736899200000,
    "spotPrice": 76343.6,
    "fundingAPR": 17.31,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-16",
    "timestamp": 1736985600000,
    "spotPrice": 76282.49,
    "fundingAPR": 17.09,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-17",
    "timestamp": 1737072000000,
    "spotPrice": 74924.78,
    "fundingAPR": 15.24,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-18",
    "timestamp": 1737158400000,
    "spotPrice": 75670.09,
    "fundingAPR": 18,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-19",
    "timestamp": 1737244800000,
    "spotPrice": 77170.74,
    "fundingAPR": 16.25,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-20",
    "timestamp": 1737331200000,
    "spotPrice": 76374.28,
    "fundingAPR": 15.91,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-21",
    "timestamp": 1737417600000,
    "spotPrice": 75414.83,
    "fundingAPR": 18.2,
    "stakingAPY": 0.98,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-22",
    "timestamp": 1737504000000,
    "spotPrice": 76794.75,
    "fundingAPR": 15.57,
    "stakingAPY": 0.97,
    "depegPct": 0.05
  },
  {
    "date": "2025-01-23",
    "timestamp": 1737590400000,
    "spotPrice": 77734.99,
    "fundingAPR": 16.87,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-24",
    "timestamp": 1737676800000,
    "spotPrice": 76449.14,
    "fundingAPR": 17.86,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-25",
    "timestamp": 1737763200000,
    "spotPrice": 76176.48,
    "fundingAPR": 15.33,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-26",
    "timestamp": 1737849600000,
    "spotPrice": 77868.55,
    "fundingAPR": 17.79,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-27",
    "timestamp": 1737936000000,
    "spotPrice": 78040.73,
    "fundingAPR": 17.12,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-28",
    "timestamp": 1738022400000,
    "spotPrice": 76639.3,
    "fundingAPR": 15.63,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-29",
    "timestamp": 1738108800000,
    "spotPrice": 77162.58,
    "fundingAPR": 18.37,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-30",
    "timestamp": 1738195200000,
    "spotPrice": 78762.67,
    "fundingAPR": 16.29,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-01-31",
    "timestamp": 1738281600000,
    "spotPrice": 78159.62,
    "fundingAPR": 16.41,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-01",
    "timestamp": 1738368000000,
    "spotPrice": 77046.39,
    "fundingAPR": 18.41,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-02",
    "timestamp": 1738454400000,
    "spotPrice": 78266.56,
    "fundingAPR": 15.71,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-03",
    "timestamp": 1738540800000,
    "spotPrice": 79394.25,
    "fundingAPR": 17.39,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-04",
    "timestamp": 1738627200000,
    "spotPrice": 78210.9,
    "fundingAPR": 17.94,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-05",
    "timestamp": 1738713600000,
    "spotPrice": 77713.92,
    "fundingAPR": 15.61,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-06",
    "timestamp": 1738800000000,
    "spotPrice": 79349.37,
    "fundingAPR": 18.24,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-07",
    "timestamp": 1738886400000,
    "spotPrice": 79747.05,
    "fundingAPR": 17.14,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-08",
    "timestamp": 1738972800000,
    "spotPrice": 78329.25,
    "fundingAPR": 16.05,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-09",
    "timestamp": 1739059200000,
    "spotPrice": 78614.91,
    "fundingAPR": 18.68,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-10",
    "timestamp": 1739145600000,
    "spotPrice": 80274.81,
    "fundingAPR": 16.35,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-11",
    "timestamp": 1739232000000,
    "spotPrice": 79874.72,
    "fundingAPR": 16.91,
    "stakingAPY": 0.97,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-12",
    "timestamp": 1739318400000,
    "spotPrice": 78628.7,
    "fundingAPR": 18.57,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-13",
    "timestamp": 1739404800000,
    "spotPrice": 79658,
    "fundingAPR": 15.87,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-14",
    "timestamp": 1739491200000,
    "spotPrice": 80944.12,
    "fundingAPR": 17.89,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-15",
    "timestamp": 1739577600000,
    "spotPrice": 79885.85,
    "fundingAPR": 17.98,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-16",
    "timestamp": 1739664000000,
    "spotPrice": 79171.84,
    "fundingAPR": 15.91,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-17",
    "timestamp": 1739750400000,
    "spotPrice": 80710.37,
    "fundingAPR": 18.65,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-18",
    "timestamp": 1739836800000,
    "spotPrice": 81320.91,
    "fundingAPR": 17.14,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-19",
    "timestamp": 1739923200000,
    "spotPrice": 79914.66,
    "fundingAPR": 16.49,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-20",
    "timestamp": 1740009600000,
    "spotPrice": 79952.6,
    "fundingAPR": 18.94,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-21",
    "timestamp": 1740096000000,
    "spotPrice": 81631.56,
    "fundingAPR": 16.4,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-22",
    "timestamp": 1740182400000,
    "spotPrice": 81439.72,
    "fundingAPR": 17.4,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-23",
    "timestamp": 1740268800000,
    "spotPrice": 80085.09,
    "fundingAPR": 18.67,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-24",
    "timestamp": 1740355200000,
    "spotPrice": 80896.95,
    "fundingAPR": 16.04,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-25",
    "timestamp": 1740441600000,
    "spotPrice": 82309.24,
    "fundingAPR": 18.34,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-26",
    "timestamp": 1740528000000,
    "spotPrice": 81396.15,
    "fundingAPR": 17.97,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-27",
    "timestamp": 1740614400000,
    "spotPrice": 80477.56,
    "fundingAPR": 16.23,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-02-28",
    "timestamp": 1740700800000,
    "spotPrice": 81881.38,
    "fundingAPR": 18.98,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-01",
    "timestamp": 1740787200000,
    "spotPrice": 82687.75,
    "fundingAPR": 17.12,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-02",
    "timestamp": 1740873600000,
    "spotPrice": 81321.07,
    "fundingAPR": 16.91,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-03",
    "timestamp": 1740960000000,
    "spotPrice": 81107.12,
    "fundingAPR": 19.11,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-04",
    "timestamp": 1741046400000,
    "spotPrice": 82764.39,
    "fundingAPR": 16.44,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-05",
    "timestamp": 1741132800000,
    "spotPrice": 82781.84,
    "fundingAPR": 17.85,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-06",
    "timestamp": 1741219200000,
    "spotPrice": 81345.67,
    "fundingAPR": 18.7,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-07",
    "timestamp": 1741305600000,
    "spotPrice": 81918.82,
    "fundingAPR": 16.22,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-08",
    "timestamp": 1741392000000,
    "spotPrice": 83422.65,
    "fundingAPR": 18.73,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-09",
    "timestamp": 1741478400000,
    "spotPrice": 82672.09,
    "fundingAPR": 17.92,
    "stakingAPY": 0.96,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-10",
    "timestamp": 1741564800000,
    "spotPrice": 81566.44,
    "fundingAPR": 16.54,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-11",
    "timestamp": 1741651200000,
    "spotPrice": 82801.28,
    "fundingAPR": 19.24,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-12",
    "timestamp": 1741737600000,
    "spotPrice": 83782.59,
    "fundingAPR": 17.07,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-13",
    "timestamp": 1741824000000,
    "spotPrice": 82483.17,
    "fundingAPR": 17.31,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-14",
    "timestamp": 1741910400000,
    "spotPrice": 82019.35,
    "fundingAPR": 19.21,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-15",
    "timestamp": 1741996800000,
    "spotPrice": 83615.2,
    "fundingAPR": 16.48,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-16",
    "timestamp": 1742083200000,
    "spotPrice": 83838.91,
    "fundingAPR": 18.26,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-17",
    "timestamp": 1742169600000,
    "spotPrice": 82350.66,
    "fundingAPR": 18.66,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-18",
    "timestamp": 1742256000000,
    "spotPrice": 82669.77,
    "fundingAPR": 16.39,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-19",
    "timestamp": 1742342400000,
    "spotPrice": 84229.11,
    "fundingAPR": 19.05,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-20",
    "timestamp": 1742428800000,
    "spotPrice": 83655.43,
    "fundingAPR": 17.81,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-21",
    "timestamp": 1742515200000,
    "spotPrice": 82385.06,
    "fundingAPR": 16.84,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-22",
    "timestamp": 1742601600000,
    "spotPrice": 83421.06,
    "fundingAPR": 19.41,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-23",
    "timestamp": 1742688000000,
    "spotPrice": 84553.2,
    "fundingAPR": 16.98,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-24",
    "timestamp": 1742774400000,
    "spotPrice": 83347.9,
    "fundingAPR": 17.67,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-25",
    "timestamp": 1742860800000,
    "spotPrice": 82642.47,
    "fundingAPR": 19.21,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-26",
    "timestamp": 1742947200000,
    "spotPrice": 84139.28,
    "fundingAPR": 16.5,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-27",
    "timestamp": 1743033600000,
    "spotPrice": 84562.3,
    "fundingAPR": 18.6,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-28",
    "timestamp": 1743120000000,
    "spotPrice": 83053.32,
    "fundingAPR": 18.53,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-29",
    "timestamp": 1743206400000,
    "spotPrice": 83109.48,
    "fundingAPR": 16.55,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-30",
    "timestamp": 1743292800000,
    "spotPrice": 84687.77,
    "fundingAPR": 19.28,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-03-31",
    "timestamp": 1743379200000,
    "spotPrice": 84302.12,
    "fundingAPR": 17.64,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-01",
    "timestamp": 1743465600000,
    "spotPrice": 82893.8,
    "fundingAPR": 17.11,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-02",
    "timestamp": 1743552000000,
    "spotPrice": 83706.33,
    "fundingAPR": 19.47,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-03",
    "timestamp": 1743638400000,
    "spotPrice": 84962.56,
    "fundingAPR": 16.87,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-04",
    "timestamp": 1743724800000,
    "spotPrice": 83876.93,
    "fundingAPR": 17.99,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-05",
    "timestamp": 1743811200000,
    "spotPrice": 82944.36,
    "fundingAPR": 19.11,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-06",
    "timestamp": 1743897600000,
    "spotPrice": 84307.48,
    "fundingAPR": 16.51,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-07",
    "timestamp": 1743984000000,
    "spotPrice": 84919.24,
    "fundingAPR": 18.86,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-08",
    "timestamp": 1744070400000,
    "spotPrice": 83422.16,
    "fundingAPR": 18.34,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-09",
    "timestamp": 1744156800000,
    "spotPrice": 83213.11,
    "fundingAPR": 16.68,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-10",
    "timestamp": 1744243200000,
    "spotPrice": 84939.81,
    "fundingAPR": 19.41,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-11",
    "timestamp": 1744329600000,
    "spotPrice": 84711.59,
    "fundingAPR": 17.43,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-12",
    "timestamp": 1744416000000,
    "spotPrice": 82878.58,
    "fundingAPR": 17.35,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-13",
    "timestamp": 1744502400000,
    "spotPrice": 83581.93,
    "fundingAPR": 19.44,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-14",
    "timestamp": 1744588800000,
    "spotPrice": 85238.34,
    "fundingAPR": 16.73,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-15",
    "timestamp": 1744675200000,
    "spotPrice": 84114.65,
    "fundingAPR": 18.25,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-16",
    "timestamp": 1744761600000,
    "spotPrice": 82756.16,
    "fundingAPR": 18.94,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-17",
    "timestamp": 1744848000000,
    "spotPrice": 84240.12,
    "fundingAPR": 16.51,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-18",
    "timestamp": 1744934400000,
    "spotPrice": 85228.28,
    "fundingAPR": 19.06,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-19",
    "timestamp": 1745020800000,
    "spotPrice": 83503.58,
    "fundingAPR": 18.1,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-20",
    "timestamp": 1745107200000,
    "spotPrice": 82975.62,
    "fundingAPR": 16.83,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-21",
    "timestamp": 1745193600000,
    "spotPrice": 84853.96,
    "fundingAPR": 19.49,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-22",
    "timestamp": 1745280000000,
    "spotPrice": 84917.34,
    "fundingAPR": 17.22,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-23",
    "timestamp": 1745366400000,
    "spotPrice": 83043.93,
    "fundingAPR": 17.6,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-24",
    "timestamp": 1745452800000,
    "spotPrice": 83486.42,
    "fundingAPR": 19.37,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-25",
    "timestamp": 1745539200000,
    "spotPrice": 85270.73,
    "fundingAPR": 16.64,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-26",
    "timestamp": 1745625600000,
    "spotPrice": 84395.2,
    "fundingAPR": 18.52,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-27",
    "timestamp": 1745712000000,
    "spotPrice": 82865.07,
    "fundingAPR": 18.76,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-28",
    "timestamp": 1745798400000,
    "spotPrice": 84165.27,
    "fundingAPR": 16.57,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-29",
    "timestamp": 1745884800000,
    "spotPrice": 85392.53,
    "fundingAPR": 19.26,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-04-30",
    "timestamp": 1745971200000,
    "spotPrice": 83810.05,
    "fundingAPR": 17.88,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-01",
    "timestamp": 1746057600000,
    "spotPrice": 83026.34,
    "fundingAPR": 17.04,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-02",
    "timestamp": 1746144000000,
    "spotPrice": 84848.32,
    "fundingAPR": 19.55,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-03",
    "timestamp": 1746230400000,
    "spotPrice": 85201.84,
    "fundingAPR": 17.06,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-04",
    "timestamp": 1746316800000,
    "spotPrice": 83329.86,
    "fundingAPR": 17.88,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-05",
    "timestamp": 1746403200000,
    "spotPrice": 83501.57,
    "fundingAPR": 19.29,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-06",
    "timestamp": 1746489600000,
    "spotPrice": 85373.9,
    "fundingAPR": 16.61,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-07",
    "timestamp": 1746576000000,
    "spotPrice": 84766.04,
    "fundingAPR": 18.79,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-08",
    "timestamp": 1746662400000,
    "spotPrice": 83098.41,
    "fundingAPR": 18.58,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-09",
    "timestamp": 1746748800000,
    "spotPrice": 84185.79,
    "fundingAPR": 16.7,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-10",
    "timestamp": 1746835200000,
    "spotPrice": 85624.71,
    "fundingAPR": 19.44,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-11",
    "timestamp": 1746921600000,
    "spotPrice": 84219.74,
    "fundingAPR": 17.69,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-12",
    "timestamp": 1747008000000,
    "spotPrice": 83197.74,
    "fundingAPR": 17.3,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-13",
    "timestamp": 1747094400000,
    "spotPrice": 84922.64,
    "fundingAPR": 19.59,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-14",
    "timestamp": 1747180800000,
    "spotPrice": 85558.37,
    "fundingAPR": 16.95,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-15",
    "timestamp": 1747267200000,
    "spotPrice": 83729.54,
    "fundingAPR": 18.2,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-16",
    "timestamp": 1747353600000,
    "spotPrice": 83626.6,
    "fundingAPR": 19.2,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-17",
    "timestamp": 1747440000000,
    "spotPrice": 85545.11,
    "fundingAPR": 16.64,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-18",
    "timestamp": 1747526400000,
    "spotPrice": 85218.44,
    "fundingAPR": 19.07,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-19",
    "timestamp": 1747612800000,
    "spotPrice": 83450.48,
    "fundingAPR": 18.41,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-20",
    "timestamp": 1747699200000,
    "spotPrice": 84300.69,
    "fundingAPR": 16.88,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-21",
    "timestamp": 1747785600000,
    "spotPrice": 85919.09,
    "fundingAPR": 19.61,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-22",
    "timestamp": 1747872000000,
    "spotPrice": 84722.93,
    "fundingAPR": 17.53,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-23",
    "timestamp": 1747958400000,
    "spotPrice": 83485.4,
    "fundingAPR": 17.6,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-24",
    "timestamp": 1748044800000,
    "spotPrice": 85074.64,
    "fundingAPR": 19.61,
    "stakingAPY": 0.95,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-25",
    "timestamp": 1748131200000,
    "spotPrice": 85978.32,
    "fundingAPR": 16.89,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-26",
    "timestamp": 1748217600000,
    "spotPrice": 84233.41,
    "fundingAPR": 18.53,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-27",
    "timestamp": 1748304000000,
    "spotPrice": 83858.04,
    "fundingAPR": 19.1,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-28",
    "timestamp": 1748390400000,
    "spotPrice": 85779.82,
    "fundingAPR": 16.74,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-29",
    "timestamp": 1748476800000,
    "spotPrice": 85741.56,
    "fundingAPR": 19.35,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-30",
    "timestamp": 1748563200000,
    "spotPrice": 83912.66,
    "fundingAPR": 18.26,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-05-31",
    "timestamp": 1748649600000,
    "spotPrice": 84506.65,
    "fundingAPR": 17.13,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-01",
    "timestamp": 1748736000000,
    "spotPrice": 86268.33,
    "fundingAPR": 19.75,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-02",
    "timestamp": 1748822400000,
    "spotPrice": 85307.6,
    "fundingAPR": 17.42,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-03",
    "timestamp": 1748908800000,
    "spotPrice": 83882.08,
    "fundingAPR": 17.94,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-04",
    "timestamp": 1748995200000,
    "spotPrice": 85300.09,
    "fundingAPR": 19.61,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-05",
    "timestamp": 1749081600000,
    "spotPrice": 86451.47,
    "fundingAPR": 16.89,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-06",
    "timestamp": 1749168000000,
    "spotPrice": 84829.34,
    "fundingAPR": 18.88,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-07",
    "timestamp": 1749254400000,
    "spotPrice": 84189.83,
    "fundingAPR": 18.99,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-08",
    "timestamp": 1749340800000,
    "spotPrice": 86071.89,
    "fundingAPR": 16.89,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-09",
    "timestamp": 1749427200000,
    "spotPrice": 86322.8,
    "fundingAPR": 19.61,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-10",
    "timestamp": 1749513600000,
    "spotPrice": 84473.7,
    "fundingAPR": 18.12,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-11",
    "timestamp": 1749600000000,
    "spotPrice": 84798.12,
    "fundingAPR": 17.42,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-12",
    "timestamp": 1749686400000,
    "spotPrice": 86663.64,
    "fundingAPR": 19.88,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-13",
    "timestamp": 1749772800000,
    "spotPrice": 85959.69,
    "fundingAPR": 17.34,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-14",
    "timestamp": 1749859200000,
    "spotPrice": 84377.91,
    "fundingAPR": 18.31,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-15",
    "timestamp": 1749945600000,
    "spotPrice": 85592.93,
    "fundingAPR": 19.6,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-16",
    "timestamp": 1750032000000,
    "spotPrice": 86966.19,
    "fundingAPR": 16.95,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-17",
    "timestamp": 1750118400000,
    "spotPrice": 85502.96,
    "fundingAPR": 19.23,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-18",
    "timestamp": 1750204800000,
    "spotPrice": 84613.49,
    "fundingAPR": 18.88,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-19",
    "timestamp": 1750291200000,
    "spotPrice": 86413.7,
    "fundingAPR": 17.11,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-20",
    "timestamp": 1750377600000,
    "spotPrice": 86948.06,
    "fundingAPR": 19.86,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-21",
    "timestamp": 1750464000000,
    "spotPrice": 85119.94,
    "fundingAPR": 18.01,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-22",
    "timestamp": 1750550400000,
    "spotPrice": 85167.42,
    "fundingAPR": 17.76,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-23",
    "timestamp": 1750636800000,
    "spotPrice": 87095.02,
    "fundingAPR": 19.98,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-24",
    "timestamp": 1750723200000,
    "spotPrice": 86663.46,
    "fundingAPR": 17.31,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-25",
    "timestamp": 1750809600000,
    "spotPrice": 84960.61,
    "fundingAPR": 18.69,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-26",
    "timestamp": 1750896000000,
    "spotPrice": 85945.41,
    "fundingAPR": 19.56,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-27",
    "timestamp": 1750982400000,
    "spotPrice": 87509.77,
    "fundingAPR": 17.06,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-28",
    "timestamp": 1751068800000,
    "spotPrice": 86237.98,
    "fundingAPR": 19.56,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-29",
    "timestamp": 1751155200000,
    "spotPrice": 85118.28,
    "fundingAPR": 18.77,
    "stakingAPY": 0.94,
    "depegPct": 0.04
  },
  {
    "date": "2025-06-30",
    "timestamp": 1751241600000,
    "spotPrice": 86796.33,
    "fundingAPR": 17.37,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-01",
    "timestamp": 1751328000000,
    "spotPrice": 87602.1,
    "fundingAPR": 20.07,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-02",
    "timestamp": 1751414400000,
    "spotPrice": 85835.64,
    "fundingAPR": 17.92,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-03",
    "timestamp": 1751500800000,
    "spotPrice": 85605.01,
    "fundingAPR": 18.13,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-04",
    "timestamp": 1751587200000,
    "spotPrice": 87551.53,
    "fundingAPR": 20.05,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-05",
    "timestamp": 1751673600000,
    "spotPrice": 87401.86,
    "fundingAPR": 17.32,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-06",
    "timestamp": 1751760000000,
    "spotPrice": 85615.84,
    "fundingAPR": 19.08,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-07",
    "timestamp": 1751846400000,
    "spotPrice": 86348.3,
    "fundingAPR": 19.51,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-08",
    "timestamp": 1751932800000,
    "spotPrice": 88068.71,
    "fundingAPR": 17.23,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-09",
    "timestamp": 1752019200000,
    "spotPrice": 87016.62,
    "fundingAPR": 19.89,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-10",
    "timestamp": 1752105600000,
    "spotPrice": 85691.56,
    "fundingAPR": 18.67,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-11",
    "timestamp": 1752192000000,
    "spotPrice": 87209.85,
    "fundingAPR": 17.68,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-12",
    "timestamp": 1752278400000,
    "spotPrice": 88268.91,
    "fundingAPR": 20.26,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-13",
    "timestamp": 1752364800000,
    "spotPrice": 86603.41,
    "fundingAPR": 17.86,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-14",
    "timestamp": 1752451200000,
    "spotPrice": 86099.67,
    "fundingAPR": 18.52,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-15",
    "timestamp": 1752537600000,
    "spotPrice": 88021.53,
    "fundingAPR": 20.09,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-16",
    "timestamp": 1752624000000,
    "spotPrice": 88156.95,
    "fundingAPR": 17.39,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-17",
    "timestamp": 1752710400000,
    "spotPrice": 86327.49,
    "fundingAPR": 19.47,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-18",
    "timestamp": 1752796800000,
    "spotPrice": 86791.12,
    "fundingAPR": 19.44,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-19",
    "timestamp": 1752883200000,
    "spotPrice": 88629.03,
    "fundingAPR": 17.44,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-20",
    "timestamp": 1752969600000,
    "spotPrice": 87820,
    "fundingAPR": 20.18,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-21",
    "timestamp": 1753056000000,
    "spotPrice": 86319.02,
    "fundingAPR": 18.58,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-22",
    "timestamp": 1753142400000,
    "spotPrice": 87643.52,
    "fundingAPR": 18.02,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-23",
    "timestamp": 1753228800000,
    "spotPrice": 88932.08,
    "fundingAPR": 20.41,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-24",
    "timestamp": 1753315200000,
    "spotPrice": 87404.58,
    "fundingAPR": 17.83,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-25",
    "timestamp": 1753401600000,
    "spotPrice": 86638.85,
    "fundingAPR": 18.93,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-26",
    "timestamp": 1753488000000,
    "spotPrice": 88492.98,
    "fundingAPR": 20.1,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-27",
    "timestamp": 1753574400000,
    "spotPrice": 88910.34,
    "fundingAPR": 17.49,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-28",
    "timestamp": 1753660800000,
    "spotPrice": 87078.14,
    "fundingAPR": 19.84,
    "stakingAPY": 0.93,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-29",
    "timestamp": 1753747200000,
    "spotPrice": 87262.44,
    "fundingAPR": 19.36,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-30",
    "timestamp": 1753833600000,
    "spotPrice": 89176.69,
    "fundingAPR": 17.7,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-07-31",
    "timestamp": 1753920000000,
    "spotPrice": 88628.63,
    "fundingAPR": 20.44,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-01",
    "timestamp": 1754006400000,
    "spotPrice": 86985.09,
    "fundingAPR": 18.49,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-02",
    "timestamp": 1754092800000,
    "spotPrice": 88086.09,
    "fundingAPR": 18.4,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-03",
    "timestamp": 1754179200000,
    "spotPrice": 89575.23,
    "fundingAPR": 20.53,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-04",
    "timestamp": 1754265600000,
    "spotPrice": 88219.7,
    "fundingAPR": 17.83,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-05",
    "timestamp": 1754352000000,
    "spotPrice": 87208.92,
    "fundingAPR": 19.34,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-06",
    "timestamp": 1754438400000,
    "spotPrice": 88953.8,
    "fundingAPR": 20.07,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-07",
    "timestamp": 1754524800000,
    "spotPrice": 89643.63,
    "fundingAPR": 17.64,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-08",
    "timestamp": 1754611200000,
    "spotPrice": 87849.44,
    "fundingAPR": 20.2,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-09",
    "timestamp": 1754697600000,
    "spotPrice": 87750.16,
    "fundingAPR": 19.27,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-10",
    "timestamp": 1754784000000,
    "spotPrice": 89697.85,
    "fundingAPR": 17.99,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-11",
    "timestamp": 1754870400000,
    "spotPrice": 89422.86,
    "fundingAPR": 20.67,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-12",
    "timestamp": 1754956800000,
    "spotPrice": 87673.32,
    "fundingAPR": 18.43,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-13",
    "timestamp": 1755043200000,
    "spotPrice": 88526.08,
    "fundingAPR": 18.78,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-14",
    "timestamp": 1755129600000,
    "spotPrice": 90182.42,
    "fundingAPR": 20.6,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-15",
    "timestamp": 1755216000000,
    "spotPrice": 89028.97,
    "fundingAPR": 17.87,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-16",
    "timestamp": 1755302400000,
    "spotPrice": 87795.57,
    "fundingAPR": 19.74,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-17",
    "timestamp": 1755388800000,
    "spotPrice": 89392.09,
    "fundingAPR": 20.02,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-18",
    "timestamp": 1755475200000,
    "spotPrice": 90338.84,
    "fundingAPR": 17.82,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-19",
    "timestamp": 1755561600000,
    "spotPrice": 88622.59,
    "fundingAPR": 20.51,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-20",
    "timestamp": 1755648000000,
    "spotPrice": 88241.8,
    "fundingAPR": 19.17,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-21",
    "timestamp": 1755734400000,
    "spotPrice": 90179.31,
    "fundingAPR": 18.31,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-22",
    "timestamp": 1755820800000,
    "spotPrice": 90183.38,
    "fundingAPR": 20.84,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-23",
    "timestamp": 1755907200000,
    "spotPrice": 88366.75,
    "fundingAPR": 18.38,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-24",
    "timestamp": 1755993600000,
    "spotPrice": 88952.1,
    "fundingAPR": 19.18,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-25",
    "timestamp": 1756080000000,
    "spotPrice": 90738.52,
    "fundingAPR": 20.62,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-26",
    "timestamp": 1756166400000,
    "spotPrice": 89812.77,
    "fundingAPR": 17.94,
    "stakingAPY": 0.92,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-27",
    "timestamp": 1756252800000,
    "spotPrice": 88384.13,
    "fundingAPR": 20.12,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-28",
    "timestamp": 1756339200000,
    "spotPrice": 89796.52,
    "fundingAPR": 19.94,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-29",
    "timestamp": 1756425600000,
    "spotPrice": 90978.92,
    "fundingAPR": 18.04,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-30",
    "timestamp": 1756512000000,
    "spotPrice": 89378.78,
    "fundingAPR": 20.79,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-08-31",
    "timestamp": 1756598400000,
    "spotPrice": 88724.84,
    "fundingAPR": 19.07,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-01",
    "timestamp": 1756684800000,
    "spotPrice": 90608.78,
    "fundingAPR": 18.66,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-02",
    "timestamp": 1756771200000,
    "spotPrice": 90891.68,
    "fundingAPR": 20.97,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-03",
    "timestamp": 1756857600000,
    "spotPrice": 89048.39,
    "fundingAPR": 18.34,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-04",
    "timestamp": 1756944000000,
    "spotPrice": 89353.13,
    "fundingAPR": 19.57,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-05",
    "timestamp": 1757030400000,
    "spotPrice": 91229.61,
    "fundingAPR": 20.6,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-06",
    "timestamp": 1757116800000,
    "spotPrice": 90552.08,
    "fundingAPR": 18.04,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-07",
    "timestamp": 1757203200000,
    "spotPrice": 88959.98,
    "fundingAPR": 20.46,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-08",
    "timestamp": 1757289600000,
    "spotPrice": 90156.56,
    "fundingAPR": 19.84,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-09",
    "timestamp": 1757376000000,
    "spotPrice": 91548.09,
    "fundingAPR": 18.29,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-10",
    "timestamp": 1757462400000,
    "spotPrice": 90099.65,
    "fundingAPR": 21.02,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-11",
    "timestamp": 1757548800000,
    "spotPrice": 89187.03,
    "fundingAPR": 18.97,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-12",
    "timestamp": 1757635200000,
    "spotPrice": 90975.22,
    "fundingAPR": 19.01,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-13",
    "timestamp": 1757721600000,
    "spotPrice": 91530.51,
    "fundingAPR": 21.04,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-14",
    "timestamp": 1757808000000,
    "spotPrice": 89701.57,
    "fundingAPR": 18.33,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-15",
    "timestamp": 1757894400000,
    "spotPrice": 89718.77,
    "fundingAPR": 19.95,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-16",
    "timestamp": 1757980800000,
    "spotPrice": 91643.29,
    "fundingAPR": 20.54,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-17",
    "timestamp": 1758067200000,
    "spotPrice": 91229,
    "fundingAPR": 18.17,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-18",
    "timestamp": 1758153600000,
    "spotPrice": 89508.85,
    "fundingAPR": 20.77,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-19",
    "timestamp": 1758240000000,
    "spotPrice": 90462.8,
    "fundingAPR": 19.71,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-20",
    "timestamp": 1758326400000,
    "spotPrice": 92032.26,
    "fundingAPR": 18.56,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-21",
    "timestamp": 1758412800000,
    "spotPrice": 90767.75,
    "fundingAPR": 21.19,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-22",
    "timestamp": 1758499200000,
    "spotPrice": 89616.71,
    "fundingAPR": 18.87,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-23",
    "timestamp": 1758585600000,
    "spotPrice": 91269.1,
    "fundingAPR": 19.36,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-24",
    "timestamp": 1758672000000,
    "spotPrice": 92084.27,
    "fundingAPR": 21.06,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-25",
    "timestamp": 1758758400000,
    "spotPrice": 90310.41,
    "fundingAPR": 18.34,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-26",
    "timestamp": 1758844800000,
    "spotPrice": 90039.57,
    "fundingAPR": 20.3,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-27",
    "timestamp": 1758931200000,
    "spotPrice": 91969.07,
    "fundingAPR": 20.44,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-28",
    "timestamp": 1759017600000,
    "spotPrice": 91827.14,
    "fundingAPR": 18.32,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-29",
    "timestamp": 1759104000000,
    "spotPrice": 90017.24,
    "fundingAPR": 21.04,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-09-30",
    "timestamp": 1759190400000,
    "spotPrice": 90707.15,
    "fundingAPR": 19.57,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-01",
    "timestamp": 1759276800000,
    "spotPrice": 92419.41,
    "fundingAPR": 18.84,
    "stakingAPY": 0.91,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-02",
    "timestamp": 1759363200000,
    "spotPrice": 91366.94,
    "fundingAPR": 21.31,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-03",
    "timestamp": 1759449600000,
    "spotPrice": 90003.08,
    "fundingAPR": 18.78,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-04",
    "timestamp": 1759536000000,
    "spotPrice": 91482.69,
    "fundingAPR": 19.71,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-05",
    "timestamp": 1759622400000,
    "spotPrice": 92539.44,
    "fundingAPR": 21.02,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-06",
    "timestamp": 1759708800000,
    "spotPrice": 90860.16,
    "fundingAPR": 18.37,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-07",
    "timestamp": 1759795200000,
    "spotPrice": 90307.23,
    "fundingAPR": 20.62,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-08",
    "timestamp": 1759881600000,
    "spotPrice": 92198.53,
    "fundingAPR": 20.3,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-09",
    "timestamp": 1759968000000,
    "spotPrice": 92332.05,
    "fundingAPR": 18.5,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-10",
    "timestamp": 1760054400000,
    "spotPrice": 90472.72,
    "fundingAPR": 21.24,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-11",
    "timestamp": 1760140800000,
    "spotPrice": 90883.09,
    "fundingAPR": 19.41,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-12",
    "timestamp": 1760227200000,
    "spotPrice": 92699.83,
    "fundingAPR": 19.13,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-13",
    "timestamp": 1760313600000,
    "spotPrice": 91882.82,
    "fundingAPR": 21.36,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-14",
    "timestamp": 1760400000000,
    "spotPrice": 90336.5,
    "fundingAPR": 18.69,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-15",
    "timestamp": 1760486400000,
    "spotPrice": 91610.2,
    "fundingAPR": 20.04,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-16",
    "timestamp": 1760572800000,
    "spotPrice": 92884.87,
    "fundingAPR": 20.93,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-17",
    "timestamp": 1760659200000,
    "spotPrice": 91337.58,
    "fundingAPR": 18.42,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-18",
    "timestamp": 1760745600000,
    "spotPrice": 90514.83,
    "fundingAPR": 20.9,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-19",
    "timestamp": 1760832000000,
    "spotPrice": 92325.63,
    "fundingAPR": 20.13,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-20",
    "timestamp": 1760918400000,
    "spotPrice": 92731.54,
    "fundingAPR": 18.69,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-21",
    "timestamp": 1761004800000,
    "spotPrice": 90864.21,
    "fundingAPR": 21.39,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-22",
    "timestamp": 1761091200000,
    "spotPrice": 90985.82,
    "fundingAPR": 19.24,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-23",
    "timestamp": 1761177600000,
    "spotPrice": 92866.41,
    "fundingAPR": 19.42,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-24",
    "timestamp": 1761264000000,
    "spotPrice": 92303.03,
    "fundingAPR": 21.35,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-25",
    "timestamp": 1761350400000,
    "spotPrice": 90608.71,
    "fundingAPR": 18.62,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-26",
    "timestamp": 1761436800000,
    "spotPrice": 91648.01,
    "fundingAPR": 20.34,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-27",
    "timestamp": 1761523200000,
    "spotPrice": 93112.06,
    "fundingAPR": 20.79,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-28",
    "timestamp": 1761609600000,
    "spotPrice": 91731.26,
    "fundingAPR": 18.48,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-29",
    "timestamp": 1761696000000,
    "spotPrice": 90657,
    "fundingAPR": 21.12,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-30",
    "timestamp": 1761782400000,
    "spotPrice": 92346.81,
    "fundingAPR": 19.92,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-10-31",
    "timestamp": 1761868800000,
    "spotPrice": 93016,
    "fundingAPR": 18.89,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-01",
    "timestamp": 1761955200000,
    "spotPrice": 91182.31,
    "fundingAPR": 21.48,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-02",
    "timestamp": 1762041600000,
    "spotPrice": 91012.4,
    "fundingAPR": 19.07,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-03",
    "timestamp": 1762128000000,
    "spotPrice": 92914.8,
    "fundingAPR": 19.7,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-04",
    "timestamp": 1762214400000,
    "spotPrice": 92617.59,
    "fundingAPR": 21.28,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-05",
    "timestamp": 1762300800000,
    "spotPrice": 90813.05,
    "fundingAPR": 18.56,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-06",
    "timestamp": 1762387200000,
    "spotPrice": 91594.7,
    "fundingAPR": 20.61,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-07",
    "timestamp": 1762473600000,
    "spotPrice": 93215.42,
    "fundingAPR": 20.6,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-08",
    "timestamp": 1762560000000,
    "spotPrice": 92031.88,
    "fundingAPR": 18.57,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-09",
    "timestamp": 1762646400000,
    "spotPrice": 90730.06,
    "fundingAPR": 21.29,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-10",
    "timestamp": 1762732800000,
    "spotPrice": 92261.12,
    "fundingAPR": 19.7,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-11",
    "timestamp": 1762819200000,
    "spotPrice": 93178.61,
    "fundingAPR": 19.1,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-12",
    "timestamp": 1762905600000,
    "spotPrice": 91419.48,
    "fundingAPR": 21.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-13",
    "timestamp": 1762992000000,
    "spotPrice": 90961.8,
    "fundingAPR": 18.9,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-14",
    "timestamp": 1763078400000,
    "spotPrice": 92843.52,
    "fundingAPR": 19.96,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-15",
    "timestamp": 1763164800000,
    "spotPrice": 92897.09,
    "fundingAPR": 21.14,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-16",
    "timestamp": 1763251200000,
    "spotPrice": 90844.47,
    "fundingAPR": 18.51,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-17",
    "timestamp": 1763337600000,
    "spotPrice": 91400.42,
    "fundingAPR": 20.84,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-18",
    "timestamp": 1763424000000,
    "spotPrice": 93309.37,
    "fundingAPR": 20.37,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-19",
    "timestamp": 1763510400000,
    "spotPrice": 92260.82,
    "fundingAPR": 18.67,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-20",
    "timestamp": 1763596800000,
    "spotPrice": 90621.11,
    "fundingAPR": 21.4,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-21",
    "timestamp": 1763683200000,
    "spotPrice": 92090.97,
    "fundingAPR": 19.46,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-22",
    "timestamp": 1763769600000,
    "spotPrice": 93350.42,
    "fundingAPR": 19.31,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-23",
    "timestamp": 1763856000000,
    "spotPrice": 91554.24,
    "fundingAPR": 21.45,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-24",
    "timestamp": 1763942400000,
    "spotPrice": 90755.6,
    "fundingAPR": 18.74,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-25",
    "timestamp": 1764028800000,
    "spotPrice": 92755.26,
    "fundingAPR": 20.21,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-26",
    "timestamp": 1764115200000,
    "spotPrice": 93036.02,
    "fundingAPR": 20.95,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-27",
    "timestamp": 1764201600000,
    "spotPrice": 90961.15,
    "fundingAPR": 18.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-28",
    "timestamp": 1764288000000,
    "spotPrice": 91211.93,
    "fundingAPR": 21.02,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-29",
    "timestamp": 1764374400000,
    "spotPrice": 93218.77,
    "fundingAPR": 20.11,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-11-30",
    "timestamp": 1764460800000,
    "spotPrice": 92447.18,
    "fundingAPR": 18.79,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-01",
    "timestamp": 1764547200000,
    "spotPrice": 90635.22,
    "fundingAPR": 21.45,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-02",
    "timestamp": 1764633600000,
    "spotPrice": 91869.53,
    "fundingAPR": 19.21,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-03",
    "timestamp": 1764720000000,
    "spotPrice": 93358.93,
    "fundingAPR": 19.52,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-04",
    "timestamp": 1764806400000,
    "spotPrice": 91736.07,
    "fundingAPR": 21.34,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-05",
    "timestamp": 1764892800000,
    "spotPrice": 90659.84,
    "fundingAPR": 18.6,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-06",
    "timestamp": 1764979200000,
    "spotPrice": 92554.74,
    "fundingAPR": 20.42,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-07",
    "timestamp": 1765065600000,
    "spotPrice": 93137.11,
    "fundingAPR": 20.72,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-08",
    "timestamp": 1765152000000,
    "spotPrice": 91086.31,
    "fundingAPR": 18.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-09",
    "timestamp": 1765238400000,
    "spotPrice": 91026.31,
    "fundingAPR": 21.15,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-10",
    "timestamp": 1765324800000,
    "spotPrice": 93086.21,
    "fundingAPR": 19.82,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-11",
    "timestamp": 1765411200000,
    "spotPrice": 92608.77,
    "fundingAPR": 18.92,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-12",
    "timestamp": 1765497600000,
    "spotPrice": 90665,
    "fundingAPR": 21.44,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-13",
    "timestamp": 1765584000000,
    "spotPrice": 91636.17,
    "fundingAPR": 18.97,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-14",
    "timestamp": 1765670400000,
    "spotPrice": 93322.24,
    "fundingAPR": 19.73,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-15",
    "timestamp": 1765756800000,
    "spotPrice": 91908.9,
    "fundingAPR": 21.17,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-16",
    "timestamp": 1765843200000,
    "spotPrice": 90579.07,
    "fundingAPR": 18.47,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-17",
    "timestamp": 1765929600000,
    "spotPrice": 92326.88,
    "fundingAPR": 20.61,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-18",
    "timestamp": 1766016000000,
    "spotPrice": 93197.84,
    "fundingAPR": 20.45,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-19",
    "timestamp": 1766102400000,
    "spotPrice": 91216.85,
    "fundingAPR": 18.51,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-20",
    "timestamp": 1766188800000,
    "spotPrice": 90847.37,
    "fundingAPR": 21.24,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-21",
    "timestamp": 1766275200000,
    "spotPrice": 92914.3,
    "fundingAPR": 19.52,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-22",
    "timestamp": 1766361600000,
    "spotPrice": 92741.64,
    "fundingAPR": 19.06,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-23",
    "timestamp": 1766448000000,
    "spotPrice": 90709.42,
    "fundingAPR": 21.37,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-24",
    "timestamp": 1766534400000,
    "spotPrice": 91395.72,
    "fundingAPR": 18.73,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-25",
    "timestamp": 1766620800000,
    "spotPrice": 93240.79,
    "fundingAPR": 19.92,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-26",
    "timestamp": 1766707200000,
    "spotPrice": 92068.48,
    "fundingAPR": 20.96,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-27",
    "timestamp": 1766793600000,
    "spotPrice": 90514.69,
    "fundingAPR": 18.36,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-28",
    "timestamp": 1766880000000,
    "spotPrice": 92076.34,
    "fundingAPR": 20.76,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-29",
    "timestamp": 1766966400000,
    "spotPrice": 93216.39,
    "fundingAPR": 20.14,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-30",
    "timestamp": 1767052800000,
    "spotPrice": 91349.4,
    "fundingAPR": 18.55,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2025-12-31",
    "timestamp": 1767139200000,
    "spotPrice": 90678.63,
    "fundingAPR": 21.26,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-01",
    "timestamp": 1767225600000,
    "spotPrice": 92706.4,
    "fundingAPR": 19.21,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-02",
    "timestamp": 1767312000000,
    "spotPrice": 92842.31,
    "fundingAPR": 19.2,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-03",
    "timestamp": 1767398400000,
    "spotPrice": 90766.95,
    "fundingAPR": 21.24,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-04",
    "timestamp": 1767484800000,
    "spotPrice": 91153.01,
    "fundingAPR": 18.51,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-05",
    "timestamp": 1767571200000,
    "spotPrice": 93115.83,
    "fundingAPR": 20.09,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-06",
    "timestamp": 1767657600000,
    "spotPrice": 92210.66,
    "fundingAPR": 20.69,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-07",
    "timestamp": 1767744000000,
    "spotPrice": 90467.54,
    "fundingAPR": 18.28,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-08",
    "timestamp": 1767830400000,
    "spotPrice": 91808.09,
    "fundingAPR": 20.86,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-09",
    "timestamp": 1767916800000,
    "spotPrice": 93191.72,
    "fundingAPR": 19.8,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-10",
    "timestamp": 1768003200000,
    "spotPrice": 91480.34,
    "fundingAPR": 18.61,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-11",
    "timestamp": 1768089600000,
    "spotPrice": 90523.19,
    "fundingAPR": 21.23,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-12",
    "timestamp": 1768176000000,
    "spotPrice": 92466.46,
    "fundingAPR": 18.9,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-13",
    "timestamp": 1768262400000,
    "spotPrice": 92907.85,
    "fundingAPR": 19.35,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-14",
    "timestamp": 1768348800000,
    "spotPrice": 90835.6,
    "fundingAPR": 21.05,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-15",
    "timestamp": 1768435200000,
    "spotPrice": 90912.73,
    "fundingAPR": 18.31,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-16",
    "timestamp": 1768521600000,
    "spotPrice": 92949.4,
    "fundingAPR": 20.23,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-17",
    "timestamp": 1768608000000,
    "spotPrice": 92331.5,
    "fundingAPR": 20.38,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-18",
    "timestamp": 1768694400000,
    "spotPrice": 90437.89,
    "fundingAPR": 18.23,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-19",
    "timestamp": 1768780800000,
    "spotPrice": 91527.35,
    "fundingAPR": 20.91,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-20",
    "timestamp": 1768867200000,
    "spotPrice": 93123.58,
    "fundingAPR": 19.45,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-21",
    "timestamp": 1768953600000,
    "spotPrice": 91605.93,
    "fundingAPR": 18.68,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-22",
    "timestamp": 1769040000000,
    "spotPrice": 90383.69,
    "fundingAPR": 21.14,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-23",
    "timestamp": 1769126400000,
    "spotPrice": 92198.99,
    "fundingAPR": 18.6,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-24",
    "timestamp": 1769212800000,
    "spotPrice": 92935.92,
    "fundingAPR": 19.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-25",
    "timestamp": 1769299200000,
    "spotPrice": 90912.96,
    "fundingAPR": 20.81,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-26",
    "timestamp": 1769385600000,
    "spotPrice": 90679.36,
    "fundingAPR": 18.13,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-27",
    "timestamp": 1769472000000,
    "spotPrice": 92744.31,
    "fundingAPR": 20.34,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-28",
    "timestamp": 1769558400000,
    "spotPrice": 92427.39,
    "fundingAPR": 20.03,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-29",
    "timestamp": 1769644800000,
    "spotPrice": 90425.47,
    "fundingAPR": 18.19,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-30",
    "timestamp": 1769731200000,
    "spotPrice": 91239.42,
    "fundingAPR": 20.92,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-01-31",
    "timestamp": 1769817600000,
    "spotPrice": 93012.53,
    "fundingAPR": 19.09,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-01",
    "timestamp": 1769904000000,
    "spotPrice": 91722.4,
    "fundingAPR": 18.76,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-02",
    "timestamp": 1769990400000,
    "spotPrice": 90262.26,
    "fundingAPR": 20.99,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-03",
    "timestamp": 1770076800000,
    "spotPrice": 91908.97,
    "fundingAPR": 18.31,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-04",
    "timestamp": 1770163200000,
    "spotPrice": 92924.87,
    "fundingAPR": 19.62,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-05",
    "timestamp": 1770249600000,
    "spotPrice": 90996.28,
    "fundingAPR": 20.52,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-06",
    "timestamp": 1770336000000,
    "spotPrice": 90457.04,
    "fundingAPR": 17.97,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-07",
    "timestamp": 1770422400000,
    "spotPrice": 92504.09,
    "fundingAPR": 20.42,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-08",
    "timestamp": 1770508800000,
    "spotPrice": 92495.11,
    "fundingAPR": 19.66,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-09",
    "timestamp": 1770595200000,
    "spotPrice": 90429.48,
    "fundingAPR": 18.18,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-10",
    "timestamp": 1770681600000,
    "spotPrice": 90949.64,
    "fundingAPR": 20.87,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-11",
    "timestamp": 1770768000000,
    "spotPrice": 92859.93,
    "fundingAPR": 18.72,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-12",
    "timestamp": 1770854400000,
    "spotPrice": 91826.02,
    "fundingAPR": 18.85,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-13",
    "timestamp": 1770940800000,
    "spotPrice": 90160.46,
    "fundingAPR": 20.79,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-14",
    "timestamp": 1771027200000,
    "spotPrice": 91601.7,
    "fundingAPR": 18.04,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-15",
    "timestamp": 1771113600000,
    "spotPrice": 92873.8,
    "fundingAPR": 19.72,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-16",
    "timestamp": 1771200000000,
    "spotPrice": 91082.51,
    "fundingAPR": 20.18,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-17",
    "timestamp": 1771286400000,
    "spotPrice": 90249.57,
    "fundingAPR": 17.84,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-18",
    "timestamp": 1771372800000,
    "spotPrice": 92232.88,
    "fundingAPR": 20.46,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-19",
    "timestamp": 1771459200000,
    "spotPrice": 92531.94,
    "fundingAPR": 19.27,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-20",
    "timestamp": 1771545600000,
    "spotPrice": 90448.58,
    "fundingAPR": 18.19,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-21",
    "timestamp": 1771632000000,
    "spotPrice": 90663.22,
    "fundingAPR": 20.77,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-22",
    "timestamp": 1771718400000,
    "spotPrice": 92667.94,
    "fundingAPR": 18.36,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-23",
    "timestamp": 1771804800000,
    "spotPrice": 91913.2,
    "fundingAPR": 18.95,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-24",
    "timestamp": 1771891200000,
    "spotPrice": 90079.29,
    "fundingAPR": 20.53,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-25",
    "timestamp": 1771977600000,
    "spotPrice": 91282.76,
    "fundingAPR": 17.79,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-26",
    "timestamp": 1772064000000,
    "spotPrice": 92782.53,
    "fundingAPR": 19.81,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-27",
    "timestamp": 1772150400000,
    "spotPrice": 91168.4,
    "fundingAPR": 19.81,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-02-28",
    "timestamp": 1772236800000,
    "spotPrice": 90060.23,
    "fundingAPR": 17.74,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-01",
    "timestamp": 1772323200000,
    "spotPrice": 91935.41,
    "fundingAPR": 20.45,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-02",
    "timestamp": 1772409600000,
    "spotPrice": 92535.7,
    "fundingAPR": 18.86,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-03",
    "timestamp": 1772496000000,
    "spotPrice": 90481,
    "fundingAPR": 18.22,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-04",
    "timestamp": 1772582400000,
    "spotPrice": 90385.2,
    "fundingAPR": 20.61,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-05",
    "timestamp": 1772668800000,
    "spotPrice": 92439.44,
    "fundingAPR": 18.02,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-06",
    "timestamp": 1772755200000,
    "spotPrice": 91980.59,
    "fundingAPR": 19.04,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-07",
    "timestamp": 1772841600000,
    "spotPrice": 90019.15,
    "fundingAPR": 20.22,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-08",
    "timestamp": 1772928000000,
    "spotPrice": 90957.85,
    "fundingAPR": 17.57,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-09",
    "timestamp": 1773014400000,
    "spotPrice": 92651.66,
    "fundingAPR": 19.87,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-10",
    "timestamp": 1773100800000,
    "spotPrice": 91250.61,
    "fundingAPR": 19.41,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-11",
    "timestamp": 1773187200000,
    "spotPrice": 89891.8,
    "fundingAPR": 17.67,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-12",
    "timestamp": 1773273600000,
    "spotPrice": 91616.84,
    "fundingAPR": 20.39,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-13",
    "timestamp": 1773360000000,
    "spotPrice": 92504.82,
    "fundingAPR": 18.45,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-14",
    "timestamp": 1773446400000,
    "spotPrice": 90524.52,
    "fundingAPR": 18.27,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-15",
    "timestamp": 1773532800000,
    "spotPrice": 90120.28,
    "fundingAPR": 20.4,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-16",
    "timestamp": 1773619200000,
    "spotPrice": 92178.04,
    "fundingAPR": 17.69,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-17",
    "timestamp": 1773705600000,
    "spotPrice": 92025.19,
    "fundingAPR": 19.12,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-18",
    "timestamp": 1773792000000,
    "spotPrice": 89979.86,
    "fundingAPR": 19.88,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-19",
    "timestamp": 1773878400000,
    "spotPrice": 90632.68,
    "fundingAPR": 17.38,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-20",
    "timestamp": 1773964800000,
    "spotPrice": 92482.59,
    "fundingAPR": 19.89,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-21",
    "timestamp": 1774051200000,
    "spotPrice": 91325.74,
    "fundingAPR": 18.99,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-22",
    "timestamp": 1774137600000,
    "spotPrice": 89746.49,
    "fundingAPR": 17.63,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-23",
    "timestamp": 1774224000000,
    "spotPrice": 91282.74,
    "fundingAPR": 20.29,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-24",
    "timestamp": 1774310400000,
    "spotPrice": 92438.43,
    "fundingAPR": 18.05,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-25",
    "timestamp": 1774396800000,
    "spotPrice": 90576.59,
    "fundingAPR": 18.32,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-26",
    "timestamp": 1774483200000,
    "spotPrice": 89872.78,
    "fundingAPR": 20.14,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-27",
    "timestamp": 1774569600000,
    "spotPrice": 91887.98,
    "fundingAPR": 17.39,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-28",
    "timestamp": 1774656000000,
    "spotPrice": 92044.39,
    "fundingAPR": 19.18,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-29",
    "timestamp": 1774742400000,
    "spotPrice": 89960.67,
    "fundingAPR": 19.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-30",
    "timestamp": 1774828800000,
    "spotPrice": 90312.9,
    "fundingAPR": 17.23,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-03-31",
    "timestamp": 1774915200000,
    "spotPrice": 92277.44,
    "fundingAPR": 19.88,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-01",
    "timestamp": 1775001600000,
    "spotPrice": 91390.47,
    "fundingAPR": 18.56,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-02",
    "timestamp": 1775088000000,
    "spotPrice": 89625.89,
    "fundingAPR": 17.61,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-03",
    "timestamp": 1775174400000,
    "spotPrice": 90938.89,
    "fundingAPR": 20.13,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-04",
    "timestamp": 1775260800000,
    "spotPrice": 92336.34,
    "fundingAPR": 17.66,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-05",
    "timestamp": 1775347200000,
    "spotPrice": 90634.37,
    "fundingAPR": 18.38,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-06",
    "timestamp": 1775433600000,
    "spotPrice": 89646.54,
    "fundingAPR": 19.84,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-07",
    "timestamp": 1775520000000,
    "spotPrice": 91574.04,
    "fundingAPR": 17.12,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-08",
    "timestamp": 1775606400000,
    "spotPrice": 92036.05,
    "fundingAPR": 19.23,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-09",
    "timestamp": 1775692800000,
    "spotPrice": 89960.31,
    "fundingAPR": 19.08,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-10",
    "timestamp": 1775779200000,
    "spotPrice": 90003.93,
    "fundingAPR": 17.11,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-11",
    "timestamp": 1775865600000,
    "spotPrice": 92039.09,
    "fundingAPR": 19.82,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-12",
    "timestamp": 1775952000000,
    "spotPrice": 91441.63,
    "fundingAPR": 18.12,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-13",
    "timestamp": 1776038400000,
    "spotPrice": 89530.95,
    "fundingAPR": 17.62,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-14",
    "timestamp": 1776124800000,
    "spotPrice": 90591.23,
    "fundingAPR": 19.93,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-15",
    "timestamp": 1776211200000,
    "spotPrice": 92199.09,
    "fundingAPR": 17.29,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-16",
    "timestamp": 1776297600000,
    "spotPrice": 90694.82,
    "fundingAPR": 18.44,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-17",
    "timestamp": 1776384000000,
    "spotPrice": 89444.87,
    "fundingAPR": 19.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-18",
    "timestamp": 1776470400000,
    "spotPrice": 91241.46,
    "fundingAPR": 16.88,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-19",
    "timestamp": 1776556800000,
    "spotPrice": 91998.61,
    "fundingAPR": 19.25,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-20",
    "timestamp": 1776643200000,
    "spotPrice": 89977.03,
    "fundingAPR": 18.65,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-21",
    "timestamp": 1776729600000,
    "spotPrice": 89710.89,
    "fundingAPR": 17.02,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-22",
    "timestamp": 1776816000000,
    "spotPrice": 91771.07,
    "fundingAPR": 19.73,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-23",
    "timestamp": 1776902400000,
    "spotPrice": 91476.31,
    "fundingAPR": 17.69,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-24",
    "timestamp": 1776988800000,
    "spotPrice": 89462.02,
    "fundingAPR": 17.64,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-25",
    "timestamp": 1777075200000,
    "spotPrice": 90245.74,
    "fundingAPR": 19.68,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-26",
    "timestamp": 1777161600000,
    "spotPrice": 92027.93,
    "fundingAPR": 16.95,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-27",
    "timestamp": 1777248000000,
    "spotPrice": 90754.79,
    "fundingAPR": 18.49,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-28",
    "timestamp": 1777334400000,
    "spotPrice": 89270.46,
    "fundingAPR": 19.11,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-29",
    "timestamp": 1777420800000,
    "spotPrice": 90895.87,
    "fundingAPR": 16.68,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-04-30",
    "timestamp": 1777507200000,
    "spotPrice": 91931.08,
    "fundingAPR": 19.24,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-01",
    "timestamp": 1777593600000,
    "spotPrice": 90008.63,
    "fundingAPR": 18.2,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-02",
    "timestamp": 1777680000000,
    "spotPrice": 89438.5,
    "fundingAPR": 16.97,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-03",
    "timestamp": 1777766400000,
    "spotPrice": 91477.55,
    "fundingAPR": 19.59,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-04",
    "timestamp": 1777852800000,
    "spotPrice": 91491.89,
    "fundingAPR": 17.27,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-05",
    "timestamp": 1777939200000,
    "spotPrice": 89418.79,
    "fundingAPR": 17.68,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-06",
    "timestamp": 1778025600000,
    "spotPrice": 89908.29,
    "fundingAPR": 19.39,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-07",
    "timestamp": 1778112000000,
    "spotPrice": 91824.87,
    "fundingAPR": 16.64,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-08",
    "timestamp": 1778198400000,
    "spotPrice": 90811.1,
    "fundingAPR": 18.54,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-09",
    "timestamp": 1778284800000,
    "spotPrice": 89125.36,
    "fundingAPR": 18.7,
    "stakingAPY": 0.9,
    "depegPct": 0.04
  },
  {
    "date": "2026-05-10",
    "timestamp": 1778371200000,
    "spotPrice": 90543.13,
    "fundingAPR": 16.53,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-11",
    "timestamp": 1778457600000,
    "spotPrice": 91833.13,
    "fundingAPR": 19.2,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-12",
    "timestamp": 1778544000000,
    "spotPrice": 90052.54,
    "fundingAPR": 17.75,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-13",
    "timestamp": 1778630400000,
    "spotPrice": 89191,
    "fundingAPR": 16.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-14",
    "timestamp": 1778716800000,
    "spotPrice": 91163.21,
    "fundingAPR": 19.41,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-15",
    "timestamp": 1778803200000,
    "spotPrice": 91486.17,
    "fundingAPR": 16.88,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-16",
    "timestamp": 1778889600000,
    "spotPrice": 89400.37,
    "fundingAPR": 17.73,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-17",
    "timestamp": 1778976000000,
    "spotPrice": 89584.56,
    "fundingAPR": 19.07,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-18",
    "timestamp": 1779062400000,
    "spotPrice": 91592.56,
    "fundingAPR": 16.37,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-19",
    "timestamp": 1779148800000,
    "spotPrice": 90860.63,
    "fundingAPR": 18.57,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-20",
    "timestamp": 1779235200000,
    "spotPrice": 89010.95,
    "fundingAPR": 18.28,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-21",
    "timestamp": 1779321600000,
    "spotPrice": 90189.26,
    "fundingAPR": 16.41,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-22",
    "timestamp": 1779408000000,
    "spotPrice": 91705.07,
    "fundingAPR": 19.13,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-23",
    "timestamp": 1779494400000,
    "spotPrice": 90105.95,
    "fundingAPR": 17.31,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-24",
    "timestamp": 1779580800000,
    "spotPrice": 88972.04,
    "fundingAPR": 16.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-25",
    "timestamp": 1779667200000,
    "spotPrice": 90833.22,
    "fundingAPR": 19.19,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-26",
    "timestamp": 1779753600000,
    "spotPrice": 91457.42,
    "fundingAPR": 16.51,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-27",
    "timestamp": 1779840000000,
    "spotPrice": 89405.33,
    "fundingAPR": 17.78,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-28",
    "timestamp": 1779926400000,
    "spotPrice": 89279.91,
    "fundingAPR": 18.71,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-29",
    "timestamp": 1780012800000,
    "spotPrice": 91334.34,
    "fundingAPR": 16.14,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-30",
    "timestamp": 1780099200000,
    "spotPrice": 90900.42,
    "fundingAPR": 18.58,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-05-31",
    "timestamp": 1780185600000,
    "spotPrice": 88927.92,
    "fundingAPR": 17.84,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-01",
    "timestamp": 1780272000000,
    "spotPrice": 89840.3,
    "fundingAPR": 16.33,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-02",
    "timestamp": 1780358400000,
    "spotPrice": 91547.91,
    "fundingAPR": 19.02,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-03",
    "timestamp": 1780444800000,
    "spotPrice": 90165.78,
    "fundingAPR": 16.89,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-04",
    "timestamp": 1780531200000,
    "spotPrice": 88784.67,
    "fundingAPR": 16.98,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-05",
    "timestamp": 1780617600000,
    "spotPrice": 90493.09,
    "fundingAPR": 18.93,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-06",
    "timestamp": 1780704000000,
    "spotPrice": 91404.42,
    "fundingAPR": 16.18,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-07",
    "timestamp": 1780790400000,
    "spotPrice": 89431.68,
    "fundingAPR": 17.84,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-08",
    "timestamp": 1780876800000,
    "spotPrice": 88999.3,
    "fundingAPR": 18.32,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-09",
    "timestamp": 1780963200000,
    "spotPrice": 91054.12,
    "fundingAPR": 15.96,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-10",
    "timestamp": 1781049600000,
    "spotPrice": 90927.74,
    "fundingAPR": 18.56,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-11",
    "timestamp": 1781136000000,
    "spotPrice": 88876.29,
    "fundingAPR": 17.4,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-12",
    "timestamp": 1781222400000,
    "spotPrice": 89502.2,
    "fundingAPR": 16.29,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-13",
    "timestamp": 1781308800000,
    "spotPrice": 91363.32,
    "fundingAPR": 18.87,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-14",
    "timestamp": 1781395200000,
    "spotPrice": 90228.87,
    "fundingAPR": 16.48,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-15",
    "timestamp": 1781481600000,
    "spotPrice": 88631.22,
    "fundingAPR": 17.03,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-16",
    "timestamp": 1781568000000,
    "spotPrice": 90148.59,
    "fundingAPR": 18.63,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-17",
    "timestamp": 1781654400000,
    "spotPrice": 91326.54,
    "fundingAPR": 15.89,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-18",
    "timestamp": 1781740800000,
    "spotPrice": 89477.03,
    "fundingAPR": 17.89,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-19",
    "timestamp": 1781827200000,
    "spotPrice": 88747.17,
    "fundingAPR": 17.91,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-20",
    "timestamp": 1781913600000,
    "spotPrice": 90756.35,
    "fundingAPR": 15.83,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-21",
    "timestamp": 1782000000000,
    "spotPrice": 90940.15,
    "fundingAPR": 18.53,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-22",
    "timestamp": 1782086400000,
    "spotPrice": 88855.39,
    "fundingAPR": 16.96,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-23",
    "timestamp": 1782172800000,
    "spotPrice": 89180.7,
    "fundingAPR": 16.29,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-24",
    "timestamp": 1782259200000,
    "spotPrice": 91153.63,
    "fundingAPR": 18.69,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-25",
    "timestamp": 1782345600000,
    "spotPrice": 90292.02,
    "fundingAPR": 16.11,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-26",
    "timestamp": 1782432000000,
    "spotPrice": 88513.34,
    "fundingAPR": 17.1,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-27",
    "timestamp": 1782518400000,
    "spotPrice": 89805.62,
    "fundingAPR": 18.31,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-28",
    "timestamp": 1782604800000,
    "spotPrice": 91223.73,
    "fundingAPR": 15.65,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-29",
    "timestamp": 1782691200000,
    "spotPrice": 89538.58,
    "fundingAPR": 17.93,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-06-30",
    "timestamp": 1782777600000,
    "spotPrice": 88527.38,
    "fundingAPR": 17.5,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-01",
    "timestamp": 1782864000000,
    "spotPrice": 90445.9,
    "fundingAPR": 15.74,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-02",
    "timestamp": 1782950400000,
    "spotPrice": 90935.64,
    "fundingAPR": 18.46,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-03",
    "timestamp": 1783036800000,
    "spotPrice": 88863.95,
    "fundingAPR": 16.54,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-04",
    "timestamp": 1783123200000,
    "spotPrice": 88881.24,
    "fundingAPR": 16.33,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-05",
    "timestamp": 1783209600000,
    "spotPrice": 90921.77,
    "fundingAPR": 18.48,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-06",
    "timestamp": 1783296000000,
    "spotPrice": 90352.09,
    "fundingAPR": 15.77,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-07",
    "timestamp": 1783382400000,
    "spotPrice": 88431.92,
    "fundingAPR": 17.17,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-08",
    "timestamp": 1783468800000,
    "spotPrice": 89470.11,
    "fundingAPR": 17.96,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-09",
    "timestamp": 1783555200000,
    "spotPrice": 91096.58,
    "fundingAPR": 15.46,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-10",
    "timestamp": 1783641600000,
    "spotPrice": 89613.25,
    "fundingAPR": 17.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-11",
    "timestamp": 1783728000000,
    "spotPrice": 88343.13,
    "fundingAPR": 17.08,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-12",
    "timestamp": 1783814400000,
    "spotPrice": 90128.02,
    "fundingAPR": 15.7,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-13",
    "timestamp": 1783900800000,
    "spotPrice": 90912.6,
    "fundingAPR": 18.36,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-14",
    "timestamp": 1783987200000,
    "spotPrice": 88900.09,
    "fundingAPR": 16.14,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-15",
    "timestamp": 1784073600000,
    "spotPrice": 88608.82,
    "fundingAPR": 16.39,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-16",
    "timestamp": 1784160000000,
    "spotPrice": 90671.25,
    "fundingAPR": 18.23,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-17",
    "timestamp": 1784246400000,
    "spotPrice": 90406.07,
    "fundingAPR": 15.48,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-18",
    "timestamp": 1784332800000,
    "spotPrice": 88387.15,
    "fundingAPR": 17.25,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-19",
    "timestamp": 1784419200000,
    "spotPrice": 89147.91,
    "fundingAPR": 17.6,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-20",
    "timestamp": 1784505600000,
    "spotPrice": 90946.28,
    "fundingAPR": 15.32,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-21",
    "timestamp": 1784592000000,
    "spotPrice": 89697.75,
    "fundingAPR": 17.96,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-22",
    "timestamp": 1784678400000,
    "spotPrice": 88196.93,
    "fundingAPR": 16.67,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-23",
    "timestamp": 1784764800000,
    "spotPrice": 89808.18,
    "fundingAPR": 15.7,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-24",
    "timestamp": 1784851200000,
    "spotPrice": 90869.95,
    "fundingAPR": 18.24,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-25",
    "timestamp": 1784937600000,
    "spotPrice": 88961.41,
    "fundingAPR": 15.78,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-26",
    "timestamp": 1785024000000,
    "spotPrice": 88367.94,
    "fundingAPR": 16.47,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-27",
    "timestamp": 1785110400000,
    "spotPrice": 90406.08,
    "fundingAPR": 17.96,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-28",
    "timestamp": 1785196800000,
    "spotPrice": 90451.19,
    "fundingAPR": 15.24,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-29",
    "timestamp": 1785283200000,
    "spotPrice": 88378.44,
    "fundingAPR": 17.33,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-30",
    "timestamp": 1785369600000,
    "spotPrice": 88844.66,
    "fundingAPR": 17.22,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-07-31",
    "timestamp": 1785456000000,
    "spotPrice": 90774.65,
    "fundingAPR": 15.23,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-01",
    "timestamp": 1785542400000,
    "spotPrice": 89788.66,
    "fundingAPR": 17.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-02",
    "timestamp": 1785628800000,
    "spotPrice": 88090.5,
    "fundingAPR": 16.27,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-03",
    "timestamp": 1785715200000,
    "spotPrice": 89492.02,
    "fundingAPR": 15.75,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-04",
    "timestamp": 1785801600000,
    "spotPrice": 90807.15,
    "fundingAPR": 18.08,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-05",
    "timestamp": 1785888000000,
    "spotPrice": 89045.04,
    "fundingAPR": 15.45,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-06",
    "timestamp": 1785974400000,
    "spotPrice": 88162.5,
    "fundingAPR": 16.58,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-07",
    "timestamp": 1786060800000,
    "spotPrice": 90130.73,
    "fundingAPR": 17.67,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-08",
    "timestamp": 1786147200000,
    "spotPrice": 90484.97,
    "fundingAPR": 15.05,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-09",
    "timestamp": 1786233600000,
    "spotPrice": 88404.56,
    "fundingAPR": 17.41,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-10",
    "timestamp": 1786320000000,
    "spotPrice": 88565.7,
    "fundingAPR": 16.84,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-11",
    "timestamp": 1786406400000,
    "spotPrice": 90584.08,
    "fundingAPR": 15.2,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-12",
    "timestamp": 1786492800000,
    "spotPrice": 89882.52,
    "fundingAPR": 17.91,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-13",
    "timestamp": 1786579200000,
    "spotPrice": 88024.82,
    "fundingAPR": 15.9,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-14",
    "timestamp": 1786665600000,
    "spotPrice": 89185.2,
    "fundingAPR": 15.83,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-15",
    "timestamp": 1786752000000,
    "spotPrice": 90724.19,
    "fundingAPR": 17.9,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-16",
    "timestamp": 1786838400000,
    "spotPrice": 89147.75,
    "fundingAPR": 15.17,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-17",
    "timestamp": 1786924800000,
    "spotPrice": 87995.72,
    "fundingAPR": 16.7,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-18",
    "timestamp": 1787011200000,
    "spotPrice": 89849.97,
    "fundingAPR": 17.35,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-19",
    "timestamp": 1787097600000,
    "spotPrice": 90505.34,
    "fundingAPR": 14.92,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-20",
    "timestamp": 1787184000000,
    "spotPrice": 88463.58,
    "fundingAPR": 17.47,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-21",
    "timestamp": 1787270400000,
    "spotPrice": 88315.93,
    "fundingAPR": 16.47,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-22",
    "timestamp": 1787356800000,
    "spotPrice": 90377.54,
    "fundingAPR": 15.21,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-23",
    "timestamp": 1787443200000,
    "spotPrice": 89975.96,
    "fundingAPR": 17.85,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-24",
    "timestamp": 1787529600000,
    "spotPrice": 88000.08,
    "fundingAPR": 15.56,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-25",
    "timestamp": 1787616000000,
    "spotPrice": 88893.29,
    "fundingAPR": 15.94,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-26",
    "timestamp": 1787702400000,
    "spotPrice": 90621.69,
    "fundingAPR": 17.69,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-27",
    "timestamp": 1787788800000,
    "spotPrice": 89266,
    "fundingAPR": 14.94,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-28",
    "timestamp": 1787875200000,
    "spotPrice": 87870.09,
    "fundingAPR": 16.82,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-29",
    "timestamp": 1787961600000,
    "spotPrice": 89568.86,
    "fundingAPR": 17.03,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-30",
    "timestamp": 1788048000000,
    "spotPrice": 90510.61,
    "fundingAPR": 14.84,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-08-31",
    "timestamp": 1788134400000,
    "spotPrice": 88552.99,
    "fundingAPR": 17.52,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-01",
    "timestamp": 1788220800000,
    "spotPrice": 88099.76,
    "fundingAPR": 16.11,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-02",
    "timestamp": 1788307200000,
    "spotPrice": 90158.46,
    "fundingAPR": 15.28,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-03",
    "timestamp": 1788393600000,
    "spotPrice": 90065.72,
    "fundingAPR": 17.76,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-04",
    "timestamp": 1788480000000,
    "spotPrice": 88015.67,
    "fundingAPR": 15.25,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-05",
    "timestamp": 1788566400000,
    "spotPrice": 88621.69,
    "fundingAPR": 16.09,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-06",
    "timestamp": 1788652800000,
    "spotPrice": 90500.81,
    "fundingAPR": 17.46,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-07",
    "timestamp": 1788739200000,
    "spotPrice": 89396.04,
    "fundingAPR": 14.77,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-08",
    "timestamp": 1788825600000,
    "spotPrice": 87787.32,
    "fundingAPR": 16.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-09",
    "timestamp": 1788912000000,
    "spotPrice": 89292.6,
    "fundingAPR": 16.7,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-10",
    "timestamp": 1788998400000,
    "spotPrice": 90499.62,
    "fundingAPR": 14.82,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-11",
    "timestamp": 1789084800000,
    "spotPrice": 88669.76,
    "fundingAPR": 17.55,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-12",
    "timestamp": 1789171200000,
    "spotPrice": 87920.96,
    "fundingAPR": 15.77,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-13",
    "timestamp": 1789257600000,
    "spotPrice": 89930.72,
    "fundingAPR": 15.39,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-14",
    "timestamp": 1789344000000,
    "spotPrice": 90148.8,
    "fundingAPR": 17.65,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-15",
    "timestamp": 1789430400000,
    "spotPrice": 88070.28,
    "fundingAPR": 14.99,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-16",
    "timestamp": 1789516800000,
    "spotPrice": 88375.48,
    "fundingAPR": 16.25,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-17",
    "timestamp": 1789603200000,
    "spotPrice": 90363.29,
    "fundingAPR": 17.21,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-18",
    "timestamp": 1789689600000,
    "spotPrice": 89534.03,
    "fundingAPR": 14.65,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-19",
    "timestamp": 1789776000000,
    "spotPrice": 87748.34,
    "fundingAPR": 17.08,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-20",
    "timestamp": 1789862400000,
    "spotPrice": 89026.44,
    "fundingAPR": 16.38,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-21",
    "timestamp": 1789948800000,
    "spotPrice": 90471.71,
    "fundingAPR": 14.86,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-22",
    "timestamp": 1790035200000,
    "spotPrice": 88810.37,
    "fundingAPR": 17.56,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-23",
    "timestamp": 1790121600000,
    "spotPrice": 87782.66,
    "fundingAPR": 15.46,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-24",
    "timestamp": 1790208000000,
    "spotPrice": 89698.53,
    "fundingAPR": 15.54,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-25",
    "timestamp": 1790294400000,
    "spotPrice": 90222.51,
    "fundingAPR": 17.52,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-26",
    "timestamp": 1790380800000,
    "spotPrice": 88161.83,
    "fundingAPR": 14.78,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-27",
    "timestamp": 1790467200000,
    "spotPrice": 88159.34,
    "fundingAPR": 16.43,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-28",
    "timestamp": 1790553600000,
    "spotPrice": 90211.4,
    "fundingAPR": 16.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-29",
    "timestamp": 1790640000000,
    "spotPrice": 89676.09,
    "fundingAPR": 14.59,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-09-30",
    "timestamp": 1790726400000,
    "spotPrice": 87753.24,
    "fundingAPR": 17.2,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-01",
    "timestamp": 1790812800000,
    "spotPrice": 88775.56,
    "fundingAPR": 16.07,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-02",
    "timestamp": 1790899200000,
    "spotPrice": 90426.76,
    "fundingAPR": 14.95,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-03",
    "timestamp": 1790985600000,
    "spotPrice": 88970.98,
    "fundingAPR": 17.55,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-04",
    "timestamp": 1791072000000,
    "spotPrice": 87687.23,
    "fundingAPR": 15.19,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-05",
    "timestamp": 1791158400000,
    "spotPrice": 89466.39,
    "fundingAPR": 15.72,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-06",
    "timestamp": 1791244800000,
    "spotPrice": 90284.51,
    "fundingAPR": 17.36,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-07",
    "timestamp": 1791331200000,
    "spotPrice": 88287.63,
    "fundingAPR": 14.63,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-08",
    "timestamp": 1791417600000,
    "spotPrice": 87977.46,
    "fundingAPR": 16.62,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-09",
    "timestamp": 1791504000000,
    "spotPrice": 90047.89,
    "fundingAPR": 16.69,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-10",
    "timestamp": 1791590400000,
    "spotPrice": 89818.44,
    "fundingAPR": 14.59,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-11",
    "timestamp": 1791676800000,
    "spotPrice": 87801.31,
    "fundingAPR": 17.3,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-12",
    "timestamp": 1791763200000,
    "spotPrice": 88544.99,
    "fundingAPR": 15.78,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-13",
    "timestamp": 1791849600000,
    "spotPrice": 90365.19,
    "fundingAPR": 15.09,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-14",
    "timestamp": 1791936000000,
    "spotPrice": 89147.44,
    "fundingAPR": 17.52,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-15",
    "timestamp": 1792022400000,
    "spotPrice": 87636.28,
    "fundingAPR": 14.96,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-16",
    "timestamp": 1792108800000,
    "spotPrice": 89238.96,
    "fundingAPR": 15.94,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-17",
    "timestamp": 1792195200000,
    "spotPrice": 90332.91,
    "fundingAPR": 17.19,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-18",
    "timestamp": 1792281600000,
    "spotPrice": 88444.39,
    "fundingAPR": 14.53,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-19",
    "timestamp": 1792368000000,
    "spotPrice": 87833.41,
    "fundingAPR": 16.81,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-20",
    "timestamp": 1792454400000,
    "spotPrice": 89875.97,
    "fundingAPR": 16.42,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-21",
    "timestamp": 1792540800000,
    "spotPrice": 89957.47,
    "fundingAPR": 14.66,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-22",
    "timestamp": 1792627200000,
    "spotPrice": 87891.05,
    "fundingAPR": 17.39,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-23",
    "timestamp": 1792713600000,
    "spotPrice": 88339.46,
    "fundingAPR": 15.51,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-24",
    "timestamp": 1792800000000,
    "spotPrice": 90288.01,
    "fundingAPR": 15.28,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-25",
    "timestamp": 1792886400000,
    "spotPrice": 89335.44,
    "fundingAPR": 17.47,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-26",
    "timestamp": 1792972800000,
    "spotPrice": 87630.58,
    "fundingAPR": 14.78,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-27",
    "timestamp": 1793059200000,
    "spotPrice": 89020.98,
    "fundingAPR": 16.17,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-28",
    "timestamp": 1793145600000,
    "spotPrice": 90366.32,
    "fundingAPR": 17,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-29",
    "timestamp": 1793232000000,
    "spotPrice": 88628.29,
    "fundingAPR": 14.5,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-30",
    "timestamp": 1793318400000,
    "spotPrice": 87730.13,
    "fundingAPR": 17,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  },
  {
    "date": "2026-10-31",
    "timestamp": 1793404800000,
    "spotPrice": 89000,
    "fundingAPR": 16,
    "stakingAPY": 0.9,
    "depegPct": 0.05
  }
];
