import { getDatabase, tables } from "../db/database";

class LoanDAO {
  async insert(name, value, note, createdDate) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.LOANS} (name, value, note, createdDate) VALUES (?, ?, ?, ?);`,
      [name, value, note, createdDate]
    );
  }

  async fetchAll() {
    const db = await getDatabase();
    return await db.getAllAsync(`SELECT * FROM ${tables.LOANS} ORDER BY createdDate DESC;`);
  }

  async deleteById(loan) {
    const db = await getDatabase();
    await db.runAsync("BEGIN TRANSACTION");

    try {
      await db.runAsync(`DELETE FROM ${tables.LOANS} WHERE id = ?;`, [loan.id]);
      await db.runAsync("COMMIT");
    } catch (error) {
      await db.runAsync("ROLLBACK");
    }
  }

  async deleteAll() {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.LOANS};`);
  }

  async update(loan) {
    const db = await getDatabase();
    await db.runAsync(
      `UPDATE ${tables.LOANS}
       SET name = ?, value = ?, note = ?, createdDate = ?
       WHERE id = ?;`,
      [loan.name, loan.value, loan.note, loan.createdDate, loan.id]
    );
  }

  async importFromBackup(loans) {
    const db = await getDatabase();

    try {
      await db.execAsync("BEGIN TRANSACTION;");

      await db.runAsync(`DELETE FROM ${tables.LOANS};`);

      const insertQuery = `INSERT INTO ${tables.LOANS} (id, name, value, note, createdDate) VALUES (?, ?, ?, ?, ?);`;

      for (const loan of loans) {
        await db.runAsync(insertQuery, [
          loan.id,
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
