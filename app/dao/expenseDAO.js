import { getDatabase, tables } from "../db/database";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/functionUtils";

class ExpenseDAO {
  async insert(date, value) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.EXPENSES} (date, value) VALUES (?, ?);`,
      [date, value]
    );

    const result = await db.runAsync(
      `SELECT last_insert_rowid() as lastInsertRowId;`
    );
        
    return result.lastInsertRowId;
  }

  async fetchAll() {
    const db = await getDatabase();
    return await db.getAllAsync(`SELECT * FROM ${tables.EXPENSES};`);
  }

  async fetchMonthly() {
    const db = await getDatabase();
    return await db.getAllAsync(
      `SELECT substr(date, 1, 7) || '-01' AS date, 
       SUM(value) AS value
       FROM ${tables.EXPENSES}
       GROUP BY substr(date, 1, 7)
       ORDER BY date DESC;`
    );
  }

  async deleteById(expense) {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.EXPENSES} WHERE id = ?;`, [
      expense.id,
    ]);
  }

  async deleteAll() {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.EXPENSES};`);
  }

  async update(expense) {
    const db = await getDatabase();
    await db.execAsync(
      `UPDATE ${tables.EXPENSES} 
       SET date = ?, value = ?
       WHERE id = ?;`,
      [expense.date, expense.value, expense.id]
    );
  }

  async getExpensesByMonthYear(date) {
    const db = await getDatabase();
    const firstDayMonth = getFirstDayOfMonth(date);    
    const lastDayMonth = getLastDayOfMonth(date);    
    const query = `
    SELECT * FROM ${tables.EXPENSES}
    WHERE DATE(date) >= DATE(?) AND DATE(date) <= DATE(?)
    ORDER BY date ASC
  `;

    return await db.getAllAsync(query, [firstDayMonth, lastDayMonth]);
  }
}

export default new ExpenseDAO();

/* 
`SELECT strftime('%Y-%m-01', date) AS date
,      SUM(value) AS value
FROM ${tables.EXPENSES}
GROUP BY strftime('%Y-%m', date)
ORDER BY date DESC;` 
*/
