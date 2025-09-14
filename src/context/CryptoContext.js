import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cryptoAPI } from '../services/cryptoAPI';

const CryptoContext = createContext();

const initialState = {
  cryptoList: [],
  selectedCrypto: 'bitcoin',
  priceData: {},
  chartData: [],
  timeframe: '7',
  chartType: 'line',
  isLoading: false,
  error: null,
  lastUpdate: null
};

const cryptoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_CRYPTO_LIST':
      return { 
        ...state, 
        cryptoList: action.payload.list,
        priceData: action.payload.priceData,
        error: null 
      };
    case 'SET_CHART_DATA':
      return { ...state, chartData: action.payload, isLoading: false };
    case 'SET_SELECTED_CRYPTO':
      return { ...state, selectedCrypto: action.payload };
    case 'SET_TIMEFRAME':
      return { ...state, timeframe: action.payload };
    case 'SET_CHART_TYPE':
      return { ...state, chartType: action.payload };
    case 'SET_LAST_UPDATE':
      return { ...state, lastUpdate: action.payload };
    default:
      return state;
  }
};

export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);

  const fetchCryptoList = async () => {
    try {
      const data = await cryptoAPI.getCryptoList();
      const priceData = {};
      data.forEach(coin => {
        priceData[coin.id] = {
          ...coin,
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h,
          volume: coin.total_volume,
          marketCap: coin.market_cap
        };
      });
      
      dispatch({ 
        type: 'SET_CRYPTO_LIST', 
        payload: { list: data, priceData } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch cryptocurrency data' });
    }
  };

  const fetchChartData = async (coinId, days) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await cryptoAPI.getChartData(coinId, days);
      
      const chartData = data.prices.map((price, index) => ({
        timestamp: price[0],
        time: new Date(price[0]).toLocaleDateString(),
        price: price[1],
        volume: data.total_volumes[index] ? data.total_volumes[index][1] : 0
      }));
      
      dispatch({ type: 'SET_CHART_DATA', payload: chartData });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch chart data' });
    }
  };

  const refreshData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await Promise.all([
      fetchCryptoList(),
      fetchChartData(state.selectedCrypto, state.timeframe)
    ]);
    dispatch({ type: 'SET_LAST_UPDATE', payload: new Date() });
  };

  // Initial load
  useEffect(() => {
    fetchCryptoList();
  }, []);

  // Fetch chart data when crypto or timeframe changes
  useEffect(() => {
    if (state.selectedCrypto) {
      fetchChartData(state.selectedCrypto, state.timeframe);
    }
  }, [state.selectedCrypto, state.timeframe]);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCryptoList();
      dispatch({ type: 'SET_LAST_UPDATE', payload: new Date() });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    ...state,
    dispatch,
    fetchCryptoList,
    fetchChartData,
    refreshData,
    setSelectedCrypto: (crypto) => dispatch({ type: 'SET_SELECTED_CRYPTO', payload: crypto }),
    setTimeframe: (timeframe) => dispatch({ type: 'SET_TIMEFRAME', payload: timeframe }),
    setChartType: (type) => dispatch({ type: 'SET_CHART_TYPE', payload: type })
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
