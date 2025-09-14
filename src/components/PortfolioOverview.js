import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Eye, EyeOff, Minus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useCrypto } from '../context/CryptoContext';
import { formatCurrency } from '../utils/formatters';

const PortfolioOverview = () => {
  const {
    portfolio,
    showPortfolio,
    setShowPortfolio,
    removeFromPortfolio,
    getPortfolioValue,
    getPortfolioChange
  } = usePortfolio();
  
  const { priceData } = useCrypto();
  
  const portfolioValue = getPortfolioValue();
  const portfolioChange = getPortfolioChange();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Portfolio
        </h3>
        <button
          onClick={() => setShowPortfolio(!showPortfolio)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {showPortfolio ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {showPortfolio && (
        <>
          <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(portfolioValue)}
              </p>
              <div className={`flex items-center justify-center mt-1 ${
                portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {portfolioChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(portfolioChange).toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {portfolio.map((holding) => {
              const crypto = priceData[holding.id];
              const currentValue = crypto ? crypto.price * holding.amount : 0;
              const profit = currentValue - (holding.avgPrice * holding.amount);
              const profitPercent = ((currentValue - (holding.avgPrice * holding.amount)) / (holding.avgPrice * holding.amount)) * 100;

              return (
                <div key={holding.id} className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-semibold text-white">{holding.symbol}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        {holding.amount}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromPortfolio(holding.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {formatCurrency(currentValue)}
                    </p>
                    <p className={`text-sm ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {profit >= 0 ? '+' : ''}{formatCurrency(profit)} ({profitPercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioOverview;
