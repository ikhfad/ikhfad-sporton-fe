const priceFormatter = (price: number) => {
  const newFormat = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return newFormat;
};

export const formatDashboardCurrencyString = (value: string): string => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return value;
  if (numValue >= 1000000) {
    return `Rp ${(numValue / 1000000).toFixed(1)} JT`;
  } else if (numValue >= 1000) {
    return `Rp ${(numValue / 1000).toFixed(0)}K`;
  }
  return `Rp ${numValue}`;
};

export const formatDashboardCurrencyNumber = (value: number): string => {
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)} JT`;
  } else if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(0)}K`;
  }
  return `Rp ${value}`;
};

export const toIDRDisplay = (val: number | string) => {
  if (!val) return "";
  const numeric =
    typeof val === "string" ? parseInt(val.replace(/\D/g, "")) : val;
  if (isNaN(numeric)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numeric);
};

export const toNumeric = (displayVal: string) => {
  return parseInt(displayVal.replace(/\D/g, "")) || 0;
};

export default priceFormatter;
