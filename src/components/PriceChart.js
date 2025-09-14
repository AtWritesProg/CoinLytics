import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { RefreshCw } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { usePortfolio } from '../context/PortfolioContext';
import { formatCurrency, formatNumber } from '../utils/formatters';

const PriceChart = () => {
  const { chartData, chartType, isLoading, priceData } = useCrypto();
  const { portfolio } = usePortfolio();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-white font-semibold">
            Price: {formatCurrency(payload[0].value)}
          </p>
          {payload[1] && (
            <p className="text-gray-400 text-sm">
              Volume: ${formatNumber(payload[1].value)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Prepare data for pie chart (top 5 cryptocurrencies by market cap)
  const pieData = chartData.slice(0, 5).map((item, index) => ({
    name: `Day ${index + 1}`,
    value: item.price,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index]
  }));

  // Prepare data for portfolio comparison chart
  const portfolioChartData = portfolio.map((holding, index) => {
    const crypto = priceData[holding.id];
    const currentValue = crypto ? crypto.price * holding.amount : 0;
    const costBasis = holding.avgPrice * holding.amount;
    const profit = currentValue - costBasis;
    const profitPercent = costBasis > 0 ? (profit / costBasis) * 100 : 0;
    
    return {
      symbol: holding.symbol,
      currentValue,
      costBasis,
      profit,
      profitPercent,
      amount: holding.amount,
      color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#8B5CF6'][index % 6]
    };
  });

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="price" fill="#3B82F6" />
          </BarChart>
        );

      case 'volume':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
                      <p className="text-gray-300 text-sm">{label}</p>
                      <p className="text-white font-semibold">
                        Volume: ${formatNumber(payload[0].value)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="volume" fill="#10B981" />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
                      <p className="text-white font-semibold">
                        Price: {formatCurrency(payload[0].value)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        );

      case 'candlestick':
        // For candlestick, we'll use a composed chart with bars to simulate candlesticks
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="price" fill="#3B82F6" />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            {/* Portfolio Value Comparison */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Portfolio Value Comparison</h4>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <BarChart 
                    data={portfolioChartData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="symbol" 
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
                              <p className="text-gray-300 text-sm font-semibold">{label}</p>
                              <p className="text-white font-semibold">
                                Current Value: {formatCurrency(data.currentValue)}
                              </p>
                              <p className="text-gray-400 text-sm">
                                Amount: {data.amount}
                              </p>
                              <p className={`text-sm ${data.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                Profit: {formatCurrency(data.profit)} ({data.profitPercent.toFixed(2)}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="currentValue" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Portfolio Profit/Loss Comparison */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Profit/Loss Comparison</h4>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <ComposedChart 
                    data={portfolioChartData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="symbol" 
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
                              <p className="text-gray-300 text-sm font-semibold">{label}</p>
                              <p className={`text-white font-semibold ${data.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {data.profit >= 0 ? '+' : ''}{formatCurrency(data.profit)}
                              </p>
                              <p className={`text-sm ${data.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {data.profitPercent.toFixed(2)}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="profit" fill="#10B981" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      default: // line chart
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Price Chart</h3>
        {isLoading && (
          <div className="flex items-center text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            Loading...
          </div>
        )}
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;