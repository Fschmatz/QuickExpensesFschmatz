export interface MonthlyExpenseItem {
  date: string;
  value: number;
}

export class MonthlyExpense {
  date: string;
  value: number;

  constructor(date: string = "", value: number = 0) {
    this.date = date;
    this.value = value;
  }
}

export const createMonthlyExpense = (
  date: string = "",
  value: number = 0
): MonthlyExpenseItem => ({
  date,
  value,
});

export default { MonthlyExpense, createMonthlyExpense };
