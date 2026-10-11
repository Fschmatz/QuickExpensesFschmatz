import { initializeTables, runDatabaseUpdates } from "./database";

export class DatabaseInit {
  static async initialize(): Promise<void> {
    await initializeTables();
    await runDatabaseUpdates();
  }
}

export default DatabaseInit;
