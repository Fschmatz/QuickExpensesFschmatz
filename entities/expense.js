export class Expense {
  constructor(id, createdDate, value, tags = []) {
    this.id = id;
    this.createdDate = createdDate;
    this.value = value;
    this.tags = tags;
  }
}

export const createExpense = (
  id,
  createdDate,
  value,
  tags = []
) => ({
  id,
  createdDate,
  value,
  tags,
});

export default { Expense, createExpense };