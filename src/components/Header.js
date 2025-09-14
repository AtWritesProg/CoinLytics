import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

const Header = () => {
  const { refreshData, isLoading, lastUpdate } = useCrypto();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
        Coinlytics
        </h1>
        <p className="text-gray-400">
          Real-time cryptocurrency analytics
        </p>
        {lastUpdate && (
          <p className="text-gray-500 text-sm mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </div>
      <button
        onClick={refreshData}
        disabled={isLoading}
        className={`p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 ${
          isLoading ? 'animate-spin cursor-not-allowed' : 'hover:scale-105'
        }`}
      >
        <RefreshCw className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Header;
