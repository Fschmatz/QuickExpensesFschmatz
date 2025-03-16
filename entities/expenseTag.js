export class ExpenseTag {
  constructor(expenseId, tagId) {
    this.expenseId = expenseId;
    this.tagId = tagId;
  }
}

export const createExpenseTag = (
  expenseId,
  tagId
) => ({
  expenseId,
  tagId,
});

export default { ExpenseTag, createExpenseTag };