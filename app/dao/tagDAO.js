import { getDatabase, tables } from "../db/database";

class TagDAO {
  async insert(name, color, icon) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO ${tables.TAGS} (name, color, icon) VALUES (?, ?, ?);`,
      [name, color, icon]
    );
  }

  async fetchAll() {
    const db = await getDatabase();
    return await db.getAllAsync(`SELECT * FROM ${tables.TAGS} order by name;`);
  }

  async deleteById(tag) {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.TAGS} WHERE id = ?;`, [tag.id]);
  }

  async deleteAll() {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM ${tables.TAGS};`);
  }

  async update(tag) {
    const db = await getDatabase();
    await db.execAsync(
      `UPDATE ${tables.TAGS} 
       SET name = ?, color = ?, icon = ?
       WHERE id = ?;`,
      [tag.name, tag.color, tag.icon, tag.id]
    );
  }
}

export default new TagDAO();
