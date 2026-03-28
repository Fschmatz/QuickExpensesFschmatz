import { ToastAndroid } from "react-native";

export const formatDate = (dateString, format) => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  switch (format) {
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    case "mm/yyyy":
      return `${month}/${year}`;
    default:
      throw new Error("Unsupported date format");
  }
};

export const darkenColor = (color, percent) => {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    r = (num >> 16) - amt,
    g = ((num >> 8) & 0x00ff) - amt,
    b = (num & 0x0000ff) - amt;

  return `rgb(${Math.max(r, 0)}, ${Math.max(g, 0)}, ${Math.max(b, 0)})`;
};

export const brightenColor = (color, percent) => {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    r = (num >> 16) + amt,
    g = ((num >> 8) & 0x00ff) + amt,
    b = (num & 0x0000ff) + amt;

  return `rgb(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)})`;
};

export const equalsZero = (value) => {
  return parseFloat(value) === 0;
};

export const greaterThanZero = (value) => {
  return parseFloat(value) > 0;
};

export const lessThanZero = (value) => {
  return parseFloat(value) < 0;
};

export const formatMoney = (value) => {
  return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};

export const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

//YYYY-MM-DD format
export const getFirstDayOfMonth = (dateString) => {
  const [year, month, _] = dateString.split("-").map((num) => parseInt(num));

  return `${year}-${month.toString().padStart(2, "0")}-01`;
};

//YYYY-MM-DD format
export const getLastDayOfMonth = (dateString) => {
  const [year, month, _] = dateString.split("-").map((num) => parseInt(num));
  const lastDay = new Date(year, month, 0).getDate();

  return `${year}-${month.toString().padStart(2, "0")}-${lastDay}`;
};

export const formatCurrencyInput = (text, maxLength = 8) => {
  if (text === "," || text === ".") {
    return "0,";
  }

  let cleaned = text.replace(/\./g, ",").replace(/[^0-9,]/g, "");

  if (cleaned.startsWith("0") && cleaned.length > 1 && cleaned[1] !== ",") {
    cleaned = cleaned.replace(/^0+/, "");
  }

  if (cleaned === "") {
    cleaned = "0";
  }

  const commaIndex = cleaned.indexOf(",");
  if (commaIndex !== -1) {
    const beforeComma = cleaned.substring(0, commaIndex);
    let afterComma = cleaned.substring(commaIndex + 1).replace(/,/g, "");
    afterComma = afterComma.substring(0, 2);
    cleaned = beforeComma + "," + afterComma;
  }

  if (cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength);
  }

  return cleaned;
};

export const completeCurrencyZeros = (text) => {
  if (!text || text === "0" || text === "0,") return "0,00";

  const normalized = text.replace(/\./g, ",");
  const commaIndex = normalized.indexOf(",");

  if (commaIndex === -1) {
    return normalized + ",00";
  }

  const parts = normalized.split(",");
  const beforeComma = parts[0] || "0";
  let afterComma = parts[1] || "";

  if (afterComma.length === 0) {
    afterComma = "00";
  } else if (afterComma.length === 1) {
    afterComma += "0";
  }

  return beforeComma + "," + afterComma;
};

export const isEmpty = (array) => !array || array.length === 0;

export default {
  formatDate,
  darkenColor,
  brightenColor,
  equalsZero,
  greaterThanZero,
  lessThanZero,
  formatMoney,
  showToast,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isEmpty,
  formatCurrencyInput,
  completeCurrencyZeros,
};
