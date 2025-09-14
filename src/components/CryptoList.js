import React from 'react';
import { Plus } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { usePortfolio } from '../context/PortfolioContext';
import { formatCurrency } from '../utils/formatters';

const CryptoList = () => {
  const { cryptoList, selectedCrypto, setSelectedCrypto } = useCrypto();
  const { addToPortfolio } = usePortfolio();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Top Cryptocurrencies</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {cryptoList.slice(0, 20).map((crypto) => (
          <div
            key={crypto.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCrypto === crypto.id
                ? 'bg-blue-600/30 border border-blue-500'
                : 'bg-gray-700/30 hover:bg-gray-700/50'
            }`}
            onClick={() => setSelectedCrypto(crypto.id)}
          >
            <div className="flex items-center">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-6 h-6 rounded-full mr-3"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <p className="text-white font-medium">{crypto.symbol.toUpperCase()}</p>
                <p className="text-gray-400 text-sm">{crypto.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">
                {formatCurrency(crypto.current_price)}
              </p>
              <div className={`text-sm ${
                crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                {crypto.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToPortfolio(crypto.id);
              }}
              className="ml-2 p-1 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
