import LoanDAO from "../dao/loanDAO";
import { LoanItem } from "../entities/loan";

class LoanService {
  async insert(loan: LoanItem): Promise<void> {
    const today = new Date().toISOString().split("T")[0];
    await LoanDAO.insert(loan.name, loan.value, loan.note, today);
  }

  async fetchAll(): Promise<LoanItem[]> {
    return await LoanDAO.fetchAll();
  }

  async deleteById(loan: { id?: number } | number): Promise<void> {
    await LoanDAO.deleteById(loan);
  }

  async deleteAll(): Promise<void> {
    await LoanDAO.deleteAll();
  }

  async update(loan: LoanItem): Promise<void> {
    await LoanDAO.update(loan);
  }

  async importFromBackup(loans: LoanItem[]): Promise<void> {
    await LoanDAO.importFromBackup(loans);
  }
}

export default new LoanService();
