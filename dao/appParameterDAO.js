import { getDatabase, tables } from "../db/database";

export const getAppParameter = async (key) => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync(
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

export const getAllAppParameters = async () => {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync(
      `SELECT * FROM ${tables.APP_PARAMETERS};`
    );
    const params = {};
    if (result) {
      result.forEach(row => {
        params[row.key] = JSON.parse(row.value);
      });
    }
    return params;
  } catch (error) {
    console.error("Erro ao buscar todos os parâmetros: ", error);
    throw error;
  }
};

export const setAppParameter = async (key, value) => {
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

export const deleteAppParameter = async (key) => {
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
