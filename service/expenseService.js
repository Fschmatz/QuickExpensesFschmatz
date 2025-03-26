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

  async deleteById(id) {
    await ExpenseDAO.deleteById(id);
  }

  async deleteAll() {
    await ExpenseDAO.deleteAll();
  }

  async update(expense) {
    await ExpenseDAO.update(expense);
  }

  async fetchByMonthYear(date) {
    const data = await ExpenseDAO.getExpensesByMonthYearWithTags(date);
    const expenseMap = new Map();

    data.forEach(
      ({
        expense_id,
        createdDate,
        value,
        tag_id,
        tag_name,
        tag_color,
        tag_icon,
      }) => {
        if (!expenseMap.has(expense_id)) {
          expenseMap.set(expense_id, {
            id: expense_id,
            createdDate,
            value,
            tags: [],
          });
        }

        if (tag_id) {
          expenseMap.get(expense_id).tags.push({
            id: tag_id,
            name: tag_name,
            color: tag_color,
            icon: tag_icon,
          });
        }
      }
    );

    return Array.from(expenseMap.values());
  }

  async importFromBackup(expenses) {
    await ExpenseDAO.importFromBackup(expenses);
  }

  async fetchTotalExpensesCurrentMonth() {
    const totalExpensesCurrentMonth =
      await ExpenseDAO.fetchTotalExpensesCurrentMonth();
    return totalExpensesCurrentMonth?.value || 0;
  }
}

export default new ExpenseService();

/* async fetchByMonthYearXX(date) {
  return await ExpenseDAO.getExpensesByMonthYear(date);
} */
