// App.js - Main Application Component
import React from 'react';
import Header from './components/Header';
import MainChart from './components/MainChart';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { CryptoProvider } from './context/CryptoContext';
import { PortfolioProvider } from './context/PortfolioContext';
import './styles/global.css';

const App = () => {
  return (
    <ErrorBoundary>
      <CryptoProvider>
        <PortfolioProvider>
          <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
              <Header />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <MainChart />
                <Sidebar />
              </div>

              <div className="mt-8 text-center text-gray-500 text-sm">
                Powered by{' '}
                <a 
                  href="https://www.coingecko.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  CoinGecko API
                </a>
              </div>
            </div>
          </div>
        </PortfolioProvider>
      </CryptoProvider>
    </ErrorBoundary>
  );
};

export default App;