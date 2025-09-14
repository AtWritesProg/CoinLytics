import React from 'react';
import CryptoSelector from './CryptoSelector';
import PriceChart from './PriceChart';

const MainChart = () => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <CryptoSelector />
      <PriceChart />
    </div>
  );
};

export default MainChart;
