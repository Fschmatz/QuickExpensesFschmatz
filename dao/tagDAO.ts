import { getDatabase, tables } from "../db/database";
import { TagItem } from "../entities/tag";

class TagDAO {
  async insert(name: string, color: string, icon: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.TAGS} (name, color, icon) VALUES (?, ?, ?);`,
      [name, color, icon]
    );
  }

  async fetchAll(): Promise<TagItem[]> {
    const db = await getDatabase();
    return await db.getAllAsync<TagItem>(
      `SELECT * FROM ${tables.TAGS} order by name;`
    );
  }

  async deleteById(tag: { id?: number } | number): Promise<void> {
    const db = await getDatabase();
    const tagId = typeof tag === "number" ? tag : (tag?.id ?? 0);

    await db.runAsync("BEGIN TRANSACTION");

    try {
      await db.runAsync(
        `DELETE FROM ${tables.EXPENSES_TAGS} WHERE tag_id = ?;`,
        [tagId]
      );

      await db.runAsync(`DELETE FROM ${tables.TAGS} WHERE id = ?;`, [tagId]);

      await db.runAsync("COMMIT");
    } catch (error) {
      await db.runAsync("ROLLBACK");
    }
  }

  async deleteAll(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.TAGS};`);
  }

  async update(tag: TagItem): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `UPDATE ${tables.TAGS} 
       SET name = ?, color = ?, icon = ?
       WHERE id = ?;`,
      [tag.name, tag.color, tag.icon, tag.id ?? 0]
    );
  }

  async importFromBackup(tags: TagItem[]): Promise<void> {
    const db = await getDatabase();

    try {
      await db.execAsync("BEGIN TRANSACTION;");

      await db.runAsync(`DELETE FROM ${tables.TAGS};`);

      const insertQuery = `INSERT INTO ${tables.TAGS} (id, name, color, icon) VALUES (?, ?, ?, ?);`;

      for (const tag of tags) {
        await db.runAsync(insertQuery, [
          tag.id ?? null,
          tag.name,
          tag.color,
          tag.icon,
        ]);
      }

      await db.execAsync("COMMIT;");
    } catch (error) {
      await db.execAsync("ROLLBACK;");
    }
  }
}

export default new TagDAO();
