export const formatCurrency = (value) => {
  if (!value && value !== 0) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 1 ? 2 : 6
  }).format(value);
};

export const formatNumber = (value) => {
  if (!value && value !== 0) return '0';
  if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
  if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
  if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
  if (value >= 1e3) return (value / 1e3).toFixed(2) + 'K';
  return value.toFixed(2);
};

export const formatPercent = (value) => {
  if (!value && value !== 0) return '0%';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};
