import React, { createContext, useContext, useState } from 'react';
import { useCrypto } from './CryptoContext';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([
    { id: 'bitcoin', symbol: 'BTC', amount: 0.5, avgPrice: 45000 },
    { id: 'ethereum', symbol: 'ETH', amount: 2.3, avgPrice: 3200 },
    { id: 'cardano', symbol: 'ADA', amount: 1000, avgPrice: 1.20 }
  ]);
  const [showPortfolio, setShowPortfolio] = useState(true);
  
  const { priceData } = useCrypto();

  const addToPortfolio = (cryptoId) => {
    const crypto = priceData[cryptoId];
    if (crypto) {
      const existing = portfolio.find(p => p.id === cryptoId);
      if (existing) {
        setPortfolio(portfolio.map(p => 
          p.id === cryptoId 
            ? { ...p, amount: p.amount + 0.1 }
            : p
        ));
      } else {
        setPortfolio([...portfolio, {
          id: cryptoId,
          symbol: crypto.symbol.toUpperCase(),
          amount: 0.1,
          avgPrice: crypto.price
        }]);
      }
    }
  };

  const removeFromPortfolio = (cryptoId) => {
    setPortfolio(portfolio.filter(p => p.id !== cryptoId));
  };

  const updatePortfolioItem = (cryptoId, updates) => {
    setPortfolio(portfolio.map(p => 
      p.id === cryptoId ? { ...p, ...updates } : p
    ));
  };

  const getPortfolioValue = () => {
    return portfolio.reduce((total, holding) => {
      const crypto = priceData[holding.id];
      return total + (crypto ? crypto.price * holding.amount : 0);
    }, 0);
  };

  const getPortfolioChange = () => {
    const portfolioValue = getPortfolioValue();
    const costBasis = portfolio.reduce((total, holding) => {
      return total + (holding.avgPrice * holding.amount);
    }, 0);
    if (costBasis === 0) return 0;
    return ((portfolioValue - costBasis) / costBasis) * 100;
  };

  const value = {
    portfolio,
    showPortfolio,
    setShowPortfolio,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolioItem,
    getPortfolioValue,
    getPortfolioChange
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
