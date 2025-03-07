export interface MonthlyExpense {
  date: string;
  value: number;
}

export const createMonthlyExpense = (
  date: string,
  value: number
): MonthlyExpense => ({
  date,
  value,
});


export default { createMonthlyExpense };