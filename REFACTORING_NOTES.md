# Crypto Dashboard - Refactoring Notes

## File Structure

The original monolithic `App.js` file has been refactored into a well-organized structure:

```
src/
├── components/           # React components
│   ├── Header.js
│   ├── MainChart.js
│   ├── CryptoSelector.js
│   ├── PriceChart.js
│   ├── Sidebar.js
│   ├── PortfolioOverview.js
│   ├── CryptoList.js
│   └── ErrorBoundary.js
├── context/             # React contexts
│   ├── CryptoContext.js
│   └── PortfolioContext.js
├── services/            # API services
│   └── cryptoAPI.js
├── utils/               # Utility functions
│   └── formatters.js
├── hooks/               # Custom hooks
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── constants/           # Constants and configuration
│   └── api.js
├── styles/              # Global styles
│   └── global.css
└── App.js              # Main application component
```

## Changes Made

1. **Extracted Contexts**: Moved `CryptoContext` and `PortfolioContext` to separate files
2. **Extracted Components**: Split all components into individual files
3. **Extracted Services**: Moved API service logic to `services/cryptoAPI.js`
4. **Extracted Utils**: Moved utility functions to `utils/formatters.js`
5. **Extracted Hooks**: Moved custom hooks to `hooks/` directory
6. **Extracted Constants**: Moved API constants to `constants/api.js`
7. **Extracted Styles**: Moved global CSS to `styles/global.css`
8. **Updated Imports**: Fixed all import statements in the main App.js

## Dependencies Added

- `recharts`: For chart components
- `lucide-react`: For icons

## Benefits

- **Maintainability**: Each component is in its own file
- **Reusability**: Components can be easily imported and reused
- **Organization**: Clear separation of concerns
- **Scalability**: Easy to add new components and features
- **Testing**: Individual components can be tested in isolation

## Environment Variables

Create a `.env` file with the following variables:

```
REACT_APP_COINGECKO_API_KEY=your_api_key_here
REACT_APP_API_BASE_URL=https://api.coingecko.com/api/v3
REACT_APP_ENABLE_PORTFOLIO=true
REACT_APP_ENABLE_ALERTS=false
REACT_APP_ENABLE_TRADING=false
REACT_APP_PRICE_UPDATE_INTERVAL=30000
REACT_APP_CHART_UPDATE_INTERVAL=60000
```
