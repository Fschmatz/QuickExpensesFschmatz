export class Expense {
  constructor(id, createdDate, value, tags = [], name = null) {
    this.id = id;
    this.createdDate = createdDate;
    this.value = value;
    this.tags = tags;
    this.name = name;
  }
}

export const createExpense = (
  id,
  createdDate,
  value,
  tags = [],
  name = null
) => ({
  id,
  createdDate,
  value,
  tags,
  name,
});

export default { Expense, createExpense };