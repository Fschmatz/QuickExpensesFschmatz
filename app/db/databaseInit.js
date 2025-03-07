import { initializeTables } from "./database";

class DatabaseInit {
  static async initialize() {
    await initializeTables();
  }
}

export default DatabaseInit;
