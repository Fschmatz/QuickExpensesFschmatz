import { ToastAndroid } from "react-native";

export const formatDate = (
  dateString?: string | null,
  format?: "dd/mm/yyyy" | "mm/yyyy" | string
): string => {
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

export const formatDateForBackup = (): string => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${dd}_${mm}_${yyyy}_${hh}${min}${ss}`;
};

export const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const r = (num >> 16) - amt;
  const g = ((num >> 8) & 0x00ff) - amt;
  const b = (num & 0x0000ff) - amt;

  return `rgb(${Math.max(r, 0)}, ${Math.max(g, 0)}, ${Math.max(b, 0)})`;
};

export const brightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const r = (num >> 16) + amt;
  const g = ((num >> 8) & 0x00ff) + amt;
  const b = (num & 0x0000ff) + amt;

  return `rgb(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)})`;
};

export const equalsZero = (value: number | string): boolean => {
  return parseFloat(String(value)) === 0;
};

export const greaterThanZero = (value: number | string): boolean => {
  return parseFloat(String(value)) > 0;
};

export const lessThanZero = (value: number | string): boolean => {
  return parseFloat(String(value)) < 0;
};

export const formatMoney = (value: number | string): string => {
  return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};

export const showToast = (message: string): void => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

// YYYY-MM-DD format
export const getFirstDayOfMonth = (dateString: string): string => {
  const [year, month] = dateString.split("-").map((num) => parseInt(num, 10));

  return `${year}-${month.toString().padStart(2, "0")}-01`;
};

// YYYY-MM-DD format
export const getLastDayOfMonth = (dateString: string): string => {
  const [year, month] = dateString.split("-").map((num) => parseInt(num, 10));
  const lastDay = new Date(year, month, 0).getDate();

  return `${year}-${month.toString().padStart(2, "0")}-${lastDay}`;
};

export const formatCurrencyInput = (text: string, maxLength: number = 8): string => {
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

export const completeCurrencyZeros = (text?: string | null): string => {
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

export const isEmpty = <T>(array?: T[] | null): boolean => !array || array.length === 0;

export const getMonthName = (monthStr?: string | null): string => {
  if (!monthStr) return "";

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [, month] = monthStr.split("-");

  return `${months[parseInt(month, 10) - 1]}`;
};

export const isLastBackupDateMoreThan30Days = (
  lastBackupDate?: string | null
): boolean => {
  if (!lastBackupDate) return true; // Nunca fez backup

  try {
    const [datePart, timePart] = lastBackupDate.split(" ");
    const [day, month, year] = datePart.split("/");
    const backupDate = new Date(
      `${year}-${month}-${day}T${timePart || "00:00"}:00`
    );

    const diffTime = new Date().getTime() - backupDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 30;
  } catch (e) {
    return false;
  }
};

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
  getMonthName,
  isLastBackupDateMoreThan30Days,
};
