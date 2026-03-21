import { initializeTables, runDatabaseUpdates } from "./database";

class DatabaseInit {
  static async initialize() {
    await initializeTables();
    await runDatabaseUpdates();
  }
}

export default DatabaseInit;
