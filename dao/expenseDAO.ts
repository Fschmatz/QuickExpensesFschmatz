import { getDatabase, tables } from "../db/database";
import { getFirstDayOfMonth, getLastDayOfMonth } from "@utils";
import { ExpenseItem } from "../entities/expense";
import { MonthlyExpenseItem } from "../entities/monthlyExpense";

export interface ExpenseWithTagRow {
  expense_id: number;
  createdDate: string;
  value: number;
  name: string | null;
  tag_id: number | null;
  tag_name: string | null;
  tag_color: string | null;
  tag_icon: string | null;
}

class ExpenseDAO {
  async insert(
    date: string,
    value: number,
    name?: string | null
  ): Promise<number> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.EXPENSES} (createdDate, value, name) VALUES (?, ?, ?);`,
      [date, value, name || null]
    );

    const result = await db.runAsync(
      `SELECT last_insert_rowid() as lastInsertRowId;`
    );

    return result.lastInsertRowId;
  }

  async fetchAll(): Promise<ExpenseItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<ExpenseItem>(
      `SELECT * FROM ${tables.EXPENSES};`
    );
  }

  async fetchMonthly(): Promise<MonthlyExpenseItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<MonthlyExpenseItem>(
      `SELECT substr(createdDate, 1, 7) || '-01' AS date, 
       SUM(value) AS value
       FROM ${tables.EXPENSES}
       GROUP BY substr(createdDate, 1, 7)
       ORDER BY createdDate DESC;`
    );
  }

  async deleteById(id: number): Promise<void> {
    const db = await getDatabase();

    await db.runAsync("BEGIN TRANSACTION");

    try {
      await db.runAsync(
        `DELETE FROM ${tables.EXPENSES_TAGS} WHERE expense_id = ?;`,
        [id]
      );

      await db.runAsync(`DELETE FROM ${tables.EXPENSES} WHERE id = ?;`, [id]);

      await db.runAsync("COMMIT");
    } catch (error) {
      await db.runAsync("ROLLBACK");
    }
  }

  async deleteAll(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.EXPENSES};`);
  }

  async update(expense: ExpenseItem): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `UPDATE ${tables.EXPENSES} 
       SET value = ?, name = ?
       WHERE id = ?;`,
      [expense.value, expense.name || null, expense.id]
    );
  }

  async getExpensesByMonthYear(date: string): Promise<ExpenseItem[]> {
    const db = await getDatabase();
    const firstDayMonth = getFirstDayOfMonth(date);
    const lastDayMonth = getLastDayOfMonth(date);
    const query = `
    SELECT * FROM ${tables.EXPENSES}
    WHERE DATE(createdDate) >= DATE(?) AND DATE(createdDate) <= DATE(?)
    ORDER BY DATE(createdDate) ASC
  `;

    return await db.getAllAsync<ExpenseItem>(query, [
      firstDayMonth,
      lastDayMonth,
    ]);
  }

  async getExpensesByMonthYearWithTags(
    date: string
  ): Promise<ExpenseWithTagRow[]> {
    const db = await getDatabase();
    const firstDayMonth = getFirstDayOfMonth(date);
    const lastDayMonth = getLastDayOfMonth(date);

    const query = `
    SELECT expe.id AS expense_id, 
    expe.createdDate AS createdDate, 
    expe.value AS value,
    expe.name AS name,
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

    return await db.getAllAsync<ExpenseWithTagRow>(query, [
      firstDayMonth,
      lastDayMonth,
    ]);
  }

  async importFromBackup(expenses: ExpenseItem[]): Promise<void> {
    const db = await getDatabase();

    try {
      await db.execAsync("BEGIN TRANSACTION;");

      await db.runAsync(`DELETE FROM ${tables.EXPENSES};`);

      const insertQuery = `INSERT INTO ${tables.EXPENSES} (id, createdDate, value, name) VALUES (?, ?, ?, ?);`;

      for (const expense of expenses) {
        await db.runAsync(insertQuery, [
          expense.id ?? null,
          expense.createdDate,
          expense.value,
          expense.name || null,
        ]);
      }

      await db.execAsync("COMMIT;");
    } catch (error) {
      await db.execAsync("ROLLBACK;");
    }
  }

  async fetchTotalExpensesCurrentMonth(): Promise<{ value: number } | null> {
    const db = await getDatabase();
    const currentDate = new Date();
    const currentYearMonth = currentDate.toISOString().slice(0, 7);

    const query = `SELECT SUM(value) AS value
       FROM ${tables.EXPENSES}
       WHERE substr(createdDate, 1, 7) = ?`;

    return await db.getFirstAsync<{ value: number }>(query, [currentYearMonth]);
  }
}

export default new ExpenseDAO();
