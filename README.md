# 📈 Crypto Currency Charting App

A modern, real-time cryptocurrency dashboard built with React and the CoinGecko API. Track prices, analyze charts, and manage your portfolio with advanced analytics.

## ✨ Features

- 🔴 **Real-time price tracking** for 100+ cryptocurrencies
- 📊 **Interactive charts** with multiple timeframes (24H, 7D, 30D, 90D, 1Y)
- 💼 **Portfolio management** with profit/loss tracking
- 📱 **Responsive design** for all devices
- 🌙 **Dark theme** with modern glass morphism UI
- ⚡ **Auto-refresh** every 30 seconds
- 🔍 **Search and filter** cryptocurrencies

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- React 18+
- CoinGecko API key (optional, free tier available)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd crypto-charting-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Create .env file
REACT_APP_COINGECKO_API_KEY=your_api_key_here
REACT_APP_ENABLE_PORTFOLIO=true
```

4. **Start the development server**
```bash
npm start
# or
yarn start
```

## 📦 Dependencies

```json
{
  "react": "^18.0.0",
  "recharts": "^2.8.0",
  "lucide-react": "^0.263.1"
}
```


## 🔧 Configuration

### API Rate Limits

- **Free tier**: 50 requests/minute
- **With API key**: 500+ requests/minute

## 🎯 Usage

1. **Select cryptocurrency** from the dropdown
2. **Choose timeframe** (24H, 7D, 30D, 90D, 1Y)
3. **Switch chart types** (Line, Area)
4. **Add to portfolio** by clicking the + button
5. **Track performance** in the portfolio sidebar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for the cryptocurrency API
- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide React](https://lucide.dev/) for modern icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

---