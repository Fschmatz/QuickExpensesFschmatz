import ExpenseDAO from "../dao/expenseDAO";
import { ExpenseItem } from "../entities/expense";
import { MonthlyExpenseItem } from "../entities/monthlyExpense";

class ExpenseService {
  async insert(value: number, name?: string | null): Promise<number> {
    const today = new Date().toISOString().split("T")[0];
    return await ExpenseDAO.insert(today, value, name);
  }

  async fetchAll(): Promise<ExpenseItem[]> {
    return await ExpenseDAO.fetchAll();
  }

  async fetchMonthly(): Promise<MonthlyExpenseItem[]> {
    return await ExpenseDAO.fetchMonthly();
  }

  async deleteById(id: number): Promise<void> {
    await ExpenseDAO.deleteById(id);
  }

  async deleteAll(): Promise<void> {
    await ExpenseDAO.deleteAll();
  }

  async update(expense: ExpenseItem): Promise<void> {
    await ExpenseDAO.update(expense);
  }

  async fetchByMonthYear(date: string): Promise<ExpenseItem[]> {
    const data = await ExpenseDAO.getExpensesByMonthYearWithTags(date);
    const expenseMap = new Map<number, ExpenseItem>();

    data.forEach(
      ({
        expense_id,
        createdDate,
        value,
        name,
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
            name,
            tags: [],
          });
        }

        if (tag_id && tag_name && tag_color && tag_icon) {
          expenseMap.get(expense_id)!.tags.push({
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

  async importFromBackup(expenses: ExpenseItem[]): Promise<void> {
    await ExpenseDAO.importFromBackup(expenses);
  }

  async fetchTotalExpensesCurrentMonth(): Promise<number> {
    const totalExpensesCurrentMonth =
      await ExpenseDAO.fetchTotalExpensesCurrentMonth();
    return totalExpensesCurrentMonth?.value || 0;
  }
}

export default new ExpenseService();
