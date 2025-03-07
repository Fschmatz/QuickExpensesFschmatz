export interface ExpenseTag {
  expenseId: number;
  tagId: number;
}

export const createExpenseTag = (
  expenseId: number,
  tagId: number
): ExpenseTag => ({
  expenseId,
  tagId,
});

export default { createExpenseTag };