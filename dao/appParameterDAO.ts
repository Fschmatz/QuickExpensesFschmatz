import { getDatabase, tables } from "../db/database";

class AppParameterDAO {
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const db = await getDatabase();
      const result = await db.getFirstAsync<{ value: string }>(
        `SELECT value FROM ${tables.APP_PARAMETERS} WHERE key = ?;`,
        [key],
      );

      if (result) {
        return JSON.parse(result.value);
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar parâmetro: ", error);

      throw error;
    }
  }

  async getAll(): Promise<Record<string, any>> {
    try {
      const db = await getDatabase();
      const result = await db.getAllAsync<{ key: string; value: string }>(
        `SELECT * FROM ${tables.APP_PARAMETERS};`,
      );

      const params: Record<string, any> = {};

      if (result) {
        result.forEach((row) => {
          params[row.key] = JSON.parse(row.value);
        });
      }

      return params;
    } catch (error) {
      console.error("Erro ao buscar todos os parâmetros: ", error);

      throw error;
    }
  }

  async set(key: string, value: any): Promise<boolean> {
    try {
      const db = await getDatabase();
      const jsonStr = JSON.stringify(value);
      const result = await db.runAsync(
        `INSERT OR REPLACE INTO ${tables.APP_PARAMETERS} (key, value) VALUES (?, ?);`,
        [key, jsonStr],
      );

      return result.changes > 0;
    } catch (error) {
      console.error("Erro ao salvar parâmetro: ", error);

      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const db = await getDatabase();
      const result = await db.runAsync(
        `DELETE FROM ${tables.APP_PARAMETERS} WHERE key = ?;`,
        [key],
      );
      
      return result.changes > 0;
    } catch (error) {
      console.error("Erro ao deletar parâmetro: ", error);
      throw error;
    }
  }
}

export default new AppParameterDAO();
