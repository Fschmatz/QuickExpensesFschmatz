export class MonthlyExpense {
  constructor(date, value) {
    this.date = date;
    this.value = value;
  }
}

export const createMonthlyExpense = (
  date,
  value
) => ({
  date,
  value,
});

export default { MonthlyExpense, createMonthlyExpense };