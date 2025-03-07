import ExpenseTagDAO from "../dao/expenseTagDAO";

class ExpenseTagService {
  async insert(expenseId, tagId) {
    console.log(expenseId + "  " + tagId);

    await ExpenseTagDAO.insert(expenseId, tagId);
  }

  async fetchAll() {
    return await ExpenseTagDAO.fetchAll();
  }

  async getTagsForExpense(expense) {
    return await ExpenseTagDAO.getTagsForExpense(expense);
  }

  async getExpensesForTag(tag) {
    return await ExpenseTagDAO.getExpensesForTag(tag);
  }

  async deleteAll() {
    await ExpenseTagDAO.deleteAll();
  }

  async delete(expense) {}
}

export default new ExpenseTagService();
