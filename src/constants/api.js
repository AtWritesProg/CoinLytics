export const API_ENDPOINTS = {
  CRYPTO_LIST: '/coins/markets',
  CHART_DATA: '/coins/{id}/market_chart',
  COIN_DETAILS: '/coins/{id}',
  TRENDING: '/search/trending',
  SEARCH: '/search'
};

export const TIMEFRAMES = {
  '1': '24H',
  '7': '7D',
  '30': '30D',
  '90': '90D',
  '365': '1Y'
};

export const CHART_TYPES = {
  LINE: 'line',
  AREA: 'area',
  CANDLESTICK: 'candlestick',
  BAR: 'bar',
  VOLUME: 'volume',
  PIE: 'pie',
  PORTFOLIO: 'portfolio'
};

export const API_RATE_LIMITS = {
  FREE: 50, // requests per minute
  DEMO: 500, // requests per minute
  PRO: 10000 // requests per minute
};
