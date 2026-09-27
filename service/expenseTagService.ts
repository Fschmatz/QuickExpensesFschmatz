import ExpenseTagDAO from "../dao/expenseTagDAO";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";
import { ExpenseTagItem } from "../entities/expenseTag";

class ExpenseTagService {
  async insert(expenseId: number, tagId: number): Promise<void> {
    await ExpenseTagDAO.insert(expenseId, tagId);
  }

  async fetchAll(): Promise<ExpenseTagItem[]> {
    return await ExpenseTagDAO.fetchAll();
  }

  async getTagsForExpense(expense: { id?: number }): Promise<TagItem[]> {
    return await ExpenseTagDAO.getTagsForExpense(expense);
  }

  async getExpensesForTag(tag: { id?: number }): Promise<ExpenseItem[]> {
    return await ExpenseTagDAO.getExpensesForTag(tag);
  }

  async deleteByExpenseId(expenseId: number): Promise<void> {
    await ExpenseTagDAO.deleteByExpenseId(expenseId);
  }

  async deleteAll(): Promise<void> {
    await ExpenseTagDAO.deleteAll?.();
  }

  async importFromBackup(
    expensesTags: Array<{ expense_id: number; tag_id: number }>
  ): Promise<void> {
    await ExpenseTagDAO.importFromBackup(expensesTags);
  }
}

export default new ExpenseTagService();
