import {
  getAppParameter,
  getAllAppParameters,
  setAppParameter,
  deleteAppParameter,
} from "../dao/appParameterDAO";

export const appParameterService = {
  get: async <T = any>(key: string): Promise<T | null> =>
    await getAppParameter<T>(key),
  getAll: async (): Promise<Record<string, any>> =>
    await getAllAppParameters(),
  insert: async (key: string, value: any): Promise<boolean> =>
    await setAppParameter(key, value),
  update: async (key: string, value: any): Promise<boolean> =>
    await setAppParameter(key, value), // uses INSERT OR REPLACE
  remove: async (key: string): Promise<boolean> =>
    await deleteAppParameter(key),
};

export default appParameterService;
