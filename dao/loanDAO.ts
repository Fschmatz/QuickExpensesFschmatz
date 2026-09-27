import { getDatabase, tables } from "../db/database";
import { LoanItem } from "../entities/loan";

class LoanDAO {
  async insert(
    name: string,
    value: number,
    note: string | null,
    createdDate: string
  ): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.LOANS} (name, value, note, createdDate) VALUES (?, ?, ?, ?);`,
      [name, value, note, createdDate]
    );
  }

  async fetchAll(): Promise<LoanItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<LoanItem>(
      `SELECT * FROM ${tables.LOANS} ORDER BY createdDate DESC;`
    );
  }

  async deleteById(loan: { id?: number }): Promise<void> {
    const db = await getDatabase();
    await db.runAsync("BEGIN TRANSACTION");

    try {
      await db.runAsync(`DELETE FROM ${tables.LOANS} WHERE id = ?;`, [
        loan.id ?? 0,
      ]);
      await db.runAsync("COMMIT");
    } catch (error) {
      await db.runAsync("ROLLBACK");
    }
  }

  async deleteAll(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.LOANS};`);
  }

  async update(loan: LoanItem): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `UPDATE ${tables.LOANS}
       SET name = ?, value = ?, note = ?, createdDate = ?
       WHERE id = ?;`,
      [loan.name, loan.value, loan.note, loan.createdDate, loan.id ?? 0]
    );
  }

  async importFromBackup(loans: LoanItem[]): Promise<void> {
    const db = await getDatabase();

    try {
      await db.execAsync("BEGIN TRANSACTION;");

      await db.runAsync(`DELETE FROM ${tables.LOANS};`);

      const insertQuery = `INSERT INTO ${tables.LOANS} (id, name, value, note, createdDate) VALUES (?, ?, ?, ?, ?);`;

      for (const loan of loans) {
        await db.runAsync(insertQuery, [
          loan.id ?? null,
          loan.name,
          loan.value,
          loan.note,
          loan.createdDate,
        ]);
      }

      await db.execAsync("COMMIT;");
    } catch (error) {
      await db.execAsync("ROLLBACK;");
    }
  }
}

export default new LoanDAO();
