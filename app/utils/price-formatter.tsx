const priceFormatter = (price: number) => {
  const newFormat = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return newFormat;
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
