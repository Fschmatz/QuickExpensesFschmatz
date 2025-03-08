import { getDatabase, tables } from "../db/database";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/functionUtils";

class ExpenseDAO {
  async insert(date, value) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.EXPENSES} (createdDate, value) VALUES (?, ?);`,
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
      `SELECT substr(createdDate, 1, 7) || '-01' AS date, 
       SUM(value) AS value
       FROM ${tables.EXPENSES}
       GROUP BY substr(createdDate, 1, 7)
       ORDER BY createdDate DESC;`
    );
  }

  async deleteById(id) {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.EXPENSES} WHERE id = ?;`, [
      id,
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
       SET createdDate = ?, value = ?
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
    WHERE DATE(createdDate) >= DATE(?) AND DATE(createdDate) <= DATE(?)
    ORDER BY DATE(createdDate) ASC
  `;

    return await db.getAllAsync(query, [firstDayMonth, lastDayMonth]);
  }

  async getExpensesByMonthYearWithTags(date) {
    const db = await getDatabase();
    const firstDayMonth = getFirstDayOfMonth(date);
    const lastDayMonth = getLastDayOfMonth(date);

    const query = `
    SELECT expe.id AS expense_id, 
    expe.createdDate AS createdDate, 
    expe.value AS value,
    tags.id AS tag_id, 
    tags.name AS tag_name, 
    tags.color AS tag_color, 
    tags.icon AS tag_icon
    FROM ${tables.EXPENSES} expe
    LEFT JOIN ${tables.EXPENSES_TAGS} exta ON exta.expense_id = expe.id
    LEFT JOIN ${tables.TAGS} tags ON exta.tag_id = tags.id
    WHERE DATE(expe.createdDate) BETWEEN DATE(?) AND DATE(?)
    ORDER BY DATE(expe.createdDate) ASC;
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
