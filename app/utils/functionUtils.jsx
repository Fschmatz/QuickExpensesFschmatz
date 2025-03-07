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
  if (value === undefined || value === null || value === "") {
    return "0,00";
  }

  const num = Number(value);

  return !isNaN(num)
    ? num.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
    : "0,00";
};

export const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

//YYYY-MM-DD format
export const getFirstDayOfMonth = (dateString) => {
  const [year, month, _] = dateString.split('-').map(num => parseInt(num));

  return `${year}-${month.toString().padStart(2, "0")}-01`;
}

//YYYY-MM-DD format
export const getLastDayOfMonth = (dateString) => {
  const [year, month, _] = dateString.split('-').map(num => parseInt(num));
  const lastDay = new Date(year, month, 0).getDate();

  return `${year}-${month.toString().padStart(2, "0")}-${lastDay}`;
}

export default {
  formatDate,
  darkenColor,
  equalsZero,
  greaterThanZero,
  lessThanZero,
  formatMoney,
  showToast,
  getFirstDayOfMonth,
  getLastDayOfMonth,
};
