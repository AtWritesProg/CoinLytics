const API_BASE = 'https://api.coingecko.com/api/v3';

// Get API key from environment variables
const API_KEY = process.env.REACT_APP_COINGECKO_API_KEY || '';

// Helper function to build API URLs with optional API key
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE}${endpoint}`);
  
  // Add API key if available
  if (API_KEY) {
    params.x_cg_demo_api_key = API_KEY;
  }
  
  // Add other parameters
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  return url.toString();
};

// API request helper with error handling
const apiRequest = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

export const cryptoAPI = {
  // Get list of cryptocurrencies with market data
  getCryptoList: async (page = 1, perPage = 100) => {
    const url = buildUrl('/coins/markets', {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: page,
      sparkline: false,
      price_change_percentage: '24h'
    });
    
    return await apiRequest(url);
  },

  // Get historical market data for a specific coin
  getChartData: async (coinId, days = 7) => {
    const url = buildUrl(`/coins/${coinId}/market_chart`, {
      vs_currency: 'usd',
      days: days,
      interval: days <= 1 ? 'hourly' : 'daily'
    });
    
    return await apiRequest(url);
  },

  // Get detailed coin information
  getCoinDetails: async (coinId) => {
    const url = buildUrl(`/coins/${coinId}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false
    });
    
    return await apiRequest(url);
  },

  // Get trending cryptocurrencies
  getTrending: async () => {
    const url = buildUrl('/search/trending');
    return await apiRequest(url);
  },

  // Search for cryptocurrencies
  searchCoins: async (query) => {
    const url = buildUrl('/search', { query });
    return await apiRequest(url);
  }
};
