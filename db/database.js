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
  LOANS: "loans",
};

export const initializeTables = async () => {
  const db = await getDatabase();

  return new Promise(async (resolve, reject) => {
    try {
      const checkTableExists = await db.getFirstAsync(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${tables.TAGS}';`
      );

      // Se as tabelas existem, não continua
      if (checkTableExists) {        
        return resolve();
      }

      console.log("Criando tabelas...");

      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS ${tables.EXPENSES} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          createdDate TEXT NOT NULL,
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
          FOREIGN KEY (expense_id) REFERENCES expenses(id),
          FOREIGN KEY (tag_id) REFERENCES tags(id)
        );`
      );

      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS ${tables.LOANS} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          value REAL NOT NULL,
          note TEXT NOT NULL,
          createdDate TEXT NOT NULL
        );`
      );

      console.log("Tabelas criadas com sucesso!");
      console.log("Inserindo valores padrão...");

      await db.runAsync(
        `INSERT INTO ${tables.TAGS} (name, color, icon) VALUES 
          (?, ?, ?), 
          (?, ?, ?), 
          (?, ?, ?), 
          (?, ?, ?), 
          (?, ?, ?), 
          (?, ?, ?);`,
        [
          "Alimentação",
          "#f0fd62",
          "restaurant-outline",
          "Compras",
          "#6ddab6",
          "bag-outline",
          "Contas",
          "#f75380",
          "document-text-outline",
          "Gasolina",
          "#6d94da",
          "water-outline",
          "Lazer",
          "#b277cb",
          "balloon-outline",
          "Mercado",
          "#36A348",
          "cart-outline",
        ]
      );
      
      resolve();
    } catch (error) {
      console.error("Erro de inicialização do banco de dados: ", error);
      reject(error);
    }
  });
};

export const dropAllTables = async () => {
  const db = await getDatabase();

  await db.execAsync(`DROP TABLE IF EXISTS ${tables.EXPENSES_TAGS};`);
  await db.execAsync(`DROP TABLE IF EXISTS ${tables.EXPENSES};`);
  await db.execAsync(`DROP TABLE IF EXISTS ${tables.TAGS};`);
  await db.execAsync(`DROP TABLE IF EXISTS ${tables.LOANS};`);
};

export default { getDatabase, initializeTables, dropAllTables };
