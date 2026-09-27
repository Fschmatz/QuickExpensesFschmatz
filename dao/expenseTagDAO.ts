import { getDatabase, tables } from "../db/database";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";
import { ExpenseTagItem } from "../entities/expenseTag";

class ExpenseTagDAO {
  async insert(expenseId: number, tagId: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.EXPENSES_TAGS} (expense_id, tag_id) VALUES (?, ?);`,
      [expenseId, tagId]
    );
  }

  async getTagsForExpense(expense: { id?: number }): Promise<TagItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<TagItem>(
      `SELECT t.* 
       FROM ${tables.TAGS} t
       INNER JOIN ${tables.EXPENSES_TAGS} et ON et.tag_id = t.id
       WHERE et.expense_id = ?;`,
      [expense.id ?? 0]
    );
  }

  async getExpensesForTag(tag: { id?: number }): Promise<ExpenseItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<ExpenseItem>(
      `SELECT e.* 
       FROM ${tables.EXPENSES} e
       INNER JOIN ${tables.EXPENSES_TAGS} et ON et.expense_id = e.id
       WHERE et.tag_id = ?;`,
      [tag.id ?? 0]
    );
  }

  async fetchAll(): Promise<ExpenseTagItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<ExpenseTagItem>(
      `SELECT expense_id as expenseId, tag_id as tagId FROM ${tables.EXPENSES_TAGS};`
    );
  }

  async deleteByExpenseId(expenseId: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `DELETE FROM ${tables.EXPENSES_TAGS} WHERE expense_id = ?;`,
      [expenseId]
    );
  }

  async importFromBackup(
    expensesTags: Array<{ expense_id: number; tag_id: number }>
  ): Promise<void> {
    const db = await getDatabase();

    try {
      await db.execAsync("BEGIN TRANSACTION;");

      await db.runAsync(`DELETE FROM ${tables.EXPENSES_TAGS};`);

      const insertQuery = `INSERT INTO ${tables.EXPENSES_TAGS} (expense_id, tag_id) VALUES (?, ?);`;

      for (const expenseTag of expensesTags) {
        await db.runAsync(insertQuery, [
          expenseTag.expense_id,
          expenseTag.tag_id,
        ]);
      }

      await db.execAsync("COMMIT;");
    } catch (error) {
      await db.execAsync("ROLLBACK;");
    }
  }
}

export default new ExpenseTagDAO();
