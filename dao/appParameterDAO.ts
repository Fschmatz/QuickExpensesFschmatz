import { getDatabase, tables } from "../db/database";

export const getAppParameter = async <T = any>(key: string): Promise<T | null> => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync<{ value: string }>(
      `SELECT value FROM ${tables.APP_PARAMETERS} WHERE key = ?;`,
      [key]
    );
    if (result) {
      return JSON.parse(result.value);
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar parâmetro: ", error);
    throw error;
  }
};

export const getAllAppParameters = async (): Promise<Record<string, any>> => {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync<{ key: string; value: string }>(
      `SELECT * FROM ${tables.APP_PARAMETERS};`
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
};

export const setAppParameter = async (key: string, value: any): Promise<boolean> => {
  try {
    const db = await getDatabase();
    const jsonStr = JSON.stringify(value);
    const result = await db.runAsync(
      `INSERT OR REPLACE INTO ${tables.APP_PARAMETERS} (key, value) VALUES (?, ?);`,
      [key, jsonStr]
    );
    return result.changes > 0;
  } catch (error) {
    console.error("Erro ao salvar parâmetro: ", error);
    throw error;
  }
};

export const deleteAppParameter = async (key: string): Promise<boolean> => {
  try {
    const db = await getDatabase();
    const result = await db.runAsync(
      `DELETE FROM ${tables.APP_PARAMETERS} WHERE key = ?;`,
      [key]
    );
    return result.changes > 0;
  } catch (error) {
    console.error("Erro ao deletar parâmetro: ", error);
    throw error;
  }
};

export default {
  getAppParameter,
  getAllAppParameters,
  setAppParameter,
  deleteAppParameter,
};
