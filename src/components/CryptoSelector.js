import React from 'react';
import { BarChart3, PieChart, TrendingUp, TrendingDown, LineChart, AreaChart, BarChart, Volume2, Square, Wallet } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { formatCurrency, formatNumber } from '../utils/formatters';

const CryptoSelector = () => {
  const {
    cryptoList,
    selectedCrypto,
    setSelectedCrypto,
    timeframe,
    setTimeframe,
    chartType,
    setChartType,
    priceData
  } = useCrypto();

  const currentCrypto = priceData[selectedCrypto];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex-1 min-w-48">
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Cryptocurrency
          </label>
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cryptoList.slice(0, 50).map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">24H</option>
            <option value="7">7D</option>
            <option value="30">30D</option>
            <option value="90">90D</option>
            <option value="365">1Y</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Chart Type
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'line'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Line Chart"
            >
              <LineChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'area'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Area Chart"
            >
              <AreaChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Candlestick Chart"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Bar Chart"
            >
              <BarChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('volume')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'volume'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Volume Chart"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'pie'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Pie Chart"
            >
              <PieChart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('portfolio')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Portfolio Comparison"
            >
              <Wallet className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Current Price Info */}
      {currentCrypto && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Price</p>
            <p className="text-xl font-bold text-white">
              {formatCurrency(currentCrypto.price)}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">24h Change</p>
            <div className={`flex items-center text-lg font-semibold ${
              currentCrypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {currentCrypto.change24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(currentCrypto.change24h).toFixed(2)}%
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Volume 24h</p>
            <p className="text-lg font-semibold text-white">
              ${formatNumber(currentCrypto.volume)}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="text-lg font-semibold text-white">
              ${formatNumber(currentCrypto.marketCap)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoSelector;
