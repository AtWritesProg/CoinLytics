import React from 'react';
import PortfolioOverview from './PortfolioOverview';
import CryptoList from './CryptoList';

const Sidebar = () => {
  return (
    <div className="space-y-6">
      <PortfolioOverview />
      <CryptoList />
    </div>
  );
};

export default Sidebar;
