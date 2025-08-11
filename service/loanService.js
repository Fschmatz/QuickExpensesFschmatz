import LoanDAO from "../dao/loanDAO";

class LoanService {
  async insert(loan) {
    const today = new Date().toISOString().split("T")[0];
    await LoanDAO.insert(loan.name, loan.value, loan.note, today);
  }

  async fetchAll() {
    return await LoanDAO.fetchAll();
  }

  async deleteById(loan) {
    await LoanDAO.deleteById(loan);
  }

  async deleteAll() {
    await LoanDAO.deleteAll();
  }

  async update(loan) {
    await LoanDAO.update(loan);
  }

  async importFromBackup(loans) {
    await LoanDAO.importFromBackup(loans);
  }
}

export default new LoanService();
