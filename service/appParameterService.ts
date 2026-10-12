import AppParameterDAO from "../dao/appParameterDAO";

class AppParameterService {
  async get<T = any>(key: string): Promise<T | null> {
    return await AppParameterDAO.get<T>(key);
  }

  async getAll(): Promise<Record<string, any>> {
    return await AppParameterDAO.getAll();
  }

  async insert(key: string, value: any): Promise<boolean> {
    return await AppParameterDAO.set(key, value);
  }

  async update(key: string, value: any): Promise<boolean> {
    return await AppParameterDAO.set(key, value);
  }

  async remove(key: string): Promise<boolean> {
    return await AppParameterDAO.delete(key);
  }
}

export default new AppParameterService();
