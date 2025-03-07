import ExpenseDAO from "../dao/expenseDAO";

class ExpenseService {
  async insert(value) {
    const today = new Date().toISOString().split("T")[0];
    return await ExpenseDAO.insert(today, value);
  }

  async fetchAll() {
    return await ExpenseDAO.fetchAll();
  }

  async fetchMonthly() {
    return await ExpenseDAO.fetchMonthly();
  }

  async deleteById(expense) {
    await ExpenseDAO.deleteById(expense);
  }

  async deleteAll() {
    await ExpenseDAO.deleteAll();
  }

  async update(expense) {
    await ExpenseDAO.update(expense);
  }

  async fetchByMonthYear(date) {
    return await ExpenseDAO.getExpensesByMonthYear(date);
  }
}

export default new ExpenseService();
