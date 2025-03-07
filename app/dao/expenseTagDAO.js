import { getDatabase, tables } from "../db/database";

class ExpenseTagDAO {
  async insert(expenseId, tagId) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.EXPENSES_TAGS} (expense_id, tag_id) VALUES (?, ?);`,
      [expenseId, tagId]
    );
  }

  async getTagsForExpense(expense) {
    const db = await getDatabase();
    return await db.getAllAsync(
      `SELECT t.* 
       FROM ${tables.TAGS} t
       INNER JOIN ${tables.EXPENSES_TAGS} et ON et.tag_id = t.id
       WHERE et.expense_id = ?;`,
      [expense.id]
    );
  }

  async getExpensesForTag(tag) {
    const db = await getDatabase();
    return await db.getAllAsync(
      `SELECT e.* 
       FROM ${tables.EXPENSES} e
       INNER JOIN ${tables.EXPENSES_TAGS} et ON et.expense_id = e.id
       WHERE et.tag_id = ?;`,
      [tag.id]
    );
  }

  async fetchAll() {
    const db = await getDatabase();
    return await db.getAllAsync(`SELECT * FROM ${tables.EXPENSES_TAGS};`);
  }

  async deleteAll() {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.EXPENSES_TAGS};`);
  }

}

export default new ExpenseTagDAO();


/* async unlink(expenseId, tagId) {
  const db = await getDatabase();
  await db.runAsync(
    `DELETE FROM ${tables.EXPENSES_TAGS} WHERE expense_id = ? AND tag_id = ?;`,
    [expenseId, tagId]
  );
} */