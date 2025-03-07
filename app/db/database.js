import * as SQLite from "expo-sqlite";

let db = null;

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("QuickExpensesFschmatz.db");
  }
  return db;
};

export const tables = {
  EXPENSES: "expenses",
  TAGS: "tags",
  EXPENSES_TAGS: "expenses_tags",
};

export const initializeTables = async () => {
  const db = await getDatabase();

  const checkTableExists = await db.getFirstAsync(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='${tables.TAGS}';`
  );

  // Se as tabelas existem, não continua
  if (checkTableExists) {   
    return;
  }

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${tables.EXPENSES} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      value REAL NOT NULL
    );`
  );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${tables.TAGS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      icon TEXT NOT NULL
    );`
  );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${tables.EXPENSES_TAGS} (
      expense_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      PRIMARY KEY (expense_id, tag_id),
      FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );`
  );

  await db.runAsync(
    `INSERT INTO ${tables.TAGS} (name, color, icon) VALUES (?, ?, ?);`,
    ["Mercado", "#36A348", "cart-outline"]
  );
};

export const dropAllTables = async () => {
  const db = await getDatabase();
  
  await db.execAsync(`DROP TABLE IF EXISTS ${tables.EXPENSES_TAGS};`);
  await db.execAsync(`DROP TABLE IF EXISTS ${tables.EXPENSES};`);
  await db.execAsync(`DROP TABLE IF EXISTS ${tables.TAGS};`);
};

export default { getDatabase, initializeTables, dropAllTables };
