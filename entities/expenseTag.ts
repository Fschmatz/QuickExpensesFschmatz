export interface ExpenseTagItem {
  expenseId: number;
  tagId: number;
}

export class ExpenseTag {
  expenseId: number;
  tagId: number;

  constructor(expenseId: number, tagId: number) {
    this.expenseId = expenseId;
    this.tagId = tagId;
  }
}

export const createExpenseTag = (
  expenseId: number,
  tagId: number
): ExpenseTagItem => ({
  expenseId,
  tagId,
});

export default { ExpenseTag, createExpenseTag };
