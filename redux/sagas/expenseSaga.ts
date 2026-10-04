import { call, put, takeLatest } from "redux-saga/effects";
import ExpenseService from "../../service/expenseService";
import {
  fetchExpensesSuccess,
  fetchExpensesFailure,
  fetchMonthlyExpensesSuccess,
  fetchMonthlyExpensesFailure,
  addExpenseSuccess,
  addExpenseFailure,
  deleteExpenseSuccess,
  deleteExpenseFailure,
  deleteAllExpensesSuccess,
  deleteAllExpensesFailure,
  fetchByMonthYearSuccess,
  fetchByMonthYearFailure,
  fetchExpenses,
  fetchMonthlyExpenses,
  fetchByMonthYear,
  fetchTotalExpensesCurrentMonthSuccess,
  fetchTotalExpensesCurrentMonthFailure,
  updateExpenseSuccess,
  updateExpenseFailure,
  clearExpensesByMonthYearSuccess,
  clearExpensesByMonthYearFailure,
  FETCH_EXPENSES,
  FETCH_MONTHLY_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  DELETE_ALL_EXPENSES,
  FETCH_BY_MONTH_YEAR,
  CLEAR_EXPENSES_BY_MONTH_YEAR,
  FETCH_TOTAL_EXPENSES_CURRENT_MONTH,
  UPDATE_EXPENSE,
  fetchTotalExpensesCurrentMonth,
  addExpense,
  updateExpense,
  deleteExpense,
} from "@expenseDuck";
import { addExpenseTag } from "@expenseTagDuck";
import ExpenseTagService from "../../service/expenseTagService";

function* handleFetchExpenses(): Generator<any, void, any> {
  try {
    const expenses = yield call(() => ExpenseService.fetchAll());
    yield put(fetchExpensesSuccess(expenses));
  } catch (error: any) {
    yield put(fetchExpensesFailure(error?.toString() ?? String(error)));
  }
}

function* handleFetchMonthlyExpenses(): Generator<any, void, any> {
  try {
    const monthlyExpenses = yield call(() => ExpenseService.fetchMonthly());
    yield put(fetchMonthlyExpensesSuccess(monthlyExpenses));
  } catch (error: any) {
    yield put(fetchMonthlyExpensesFailure(error?.toString() ?? String(error)));
  }
}

function* handleAddExpense(
  action: ReturnType<typeof addExpense>
): Generator<any, void, any> {
  try {
    const { value, tagId, name } = action.payload;
    const newExpenseId = yield call(() => ExpenseService.insert(value, name));

    if (newExpenseId && tagId) {
      yield put(
        addExpenseTag({
          expenseId: newExpenseId,
          tagId: tagId,
        }),
      );
    }

    yield put(addExpenseSuccess());
    yield put(fetchMonthlyExpenses());
    yield put(fetchTotalExpensesCurrentMonth());
  } catch (error: any) {
    yield put(addExpenseFailure(error?.toString() ?? String(error)));
  }
}

function* handleUpdateExpense(
  action: ReturnType<typeof updateExpense>
): Generator<any, void, any> {
  try {
    const { id, value, tagId, name, date } = action.payload;
    yield call(() => ExpenseService.update({ id, value, name: name ?? null }));

    yield call(() => ExpenseTagService.deleteByExpenseId(id));

    if (tagId) {
      yield put(
        addExpenseTag({
          expenseId: id,
          tagId: tagId,
        }),
      );
    }

    yield put(updateExpenseSuccess());
    yield put(fetchMonthlyExpenses());
    yield put(fetchTotalExpensesCurrentMonth());
    if (date) {
      yield put(fetchByMonthYear(date));
    }
  } catch (error: any) {
    yield put(updateExpenseFailure(error?.toString() ?? String(error)));
  }
}

function* handleDeleteExpense(
  action: ReturnType<typeof deleteExpense>
): Generator<any, void, any> {
  try {
    const payload = action.payload;
    const expenseId = typeof payload === "number" ? payload : payload.expenseId;
    const date = typeof payload === "number" ? undefined : payload.date;

    yield call(() => ExpenseService.deleteById(expenseId));
    yield put(fetchMonthlyExpenses());
    yield put(fetchTotalExpensesCurrentMonth());
    if (date) {
      yield put(fetchByMonthYear(date));
    }
    yield put(deleteExpenseSuccess());
  } catch (error: any) {
    yield put(deleteExpenseFailure(error?.toString() ?? String(error)));
  }
}

function* handleDeleteAllExpenses(): Generator<any, void, any> {
  try {
    yield call(() => ExpenseService.deleteAll());
    yield put(deleteAllExpensesSuccess());
    yield put(fetchExpenses());
    yield put(fetchMonthlyExpenses());
  } catch (error: any) {
    yield put(deleteAllExpensesFailure(error?.toString() ?? String(error)));
  }
}

function* handleFetchByMonthYear(
  action: ReturnType<typeof fetchByMonthYear>
): Generator<any, void, any> {
  try {
    const monthlyExpenses = yield call(
      () => ExpenseService.fetchByMonthYear(action.payload),
    );
    yield put(fetchByMonthYearSuccess(monthlyExpenses));
  } catch (error: any) {
    yield put(fetchByMonthYearFailure(error?.toString() ?? String(error)));
  }
}

function* handleClearExpenses(): Generator<any, void, any> {
  try {
    yield put(clearExpensesByMonthYearSuccess());
  } catch (error: any) {
    yield put(clearExpensesByMonthYearFailure(error?.toString() ?? String(error)));
  }
}

function* handleFetchTotalExpensesCurrentMonth(): Generator<any, void, any> {
  try {
    const totalExpensesCurrentMonth = yield call([
      ExpenseService,
      "fetchTotalExpensesCurrentMonth",
    ]);
    yield put(fetchTotalExpensesCurrentMonthSuccess(totalExpensesCurrentMonth));
  } catch (error: any) {
    yield put(fetchTotalExpensesCurrentMonthFailure(error?.toString() ?? String(error)));
  }
}

export default function* expenseSaga() {
  yield takeLatest(FETCH_EXPENSES, handleFetchExpenses);
  yield takeLatest(FETCH_MONTHLY_EXPENSES, handleFetchMonthlyExpenses);
  yield takeLatest(ADD_EXPENSE, handleAddExpense);
  yield takeLatest(DELETE_EXPENSE, handleDeleteExpense);
  yield takeLatest(DELETE_ALL_EXPENSES, handleDeleteAllExpenses);
  yield takeLatest(FETCH_BY_MONTH_YEAR, handleFetchByMonthYear);
  yield takeLatest(CLEAR_EXPENSES_BY_MONTH_YEAR, handleClearExpenses);
  yield takeLatest(
    FETCH_TOTAL_EXPENSES_CURRENT_MONTH,
    handleFetchTotalExpensesCurrentMonth,
  );
  yield takeLatest(UPDATE_EXPENSE, handleUpdateExpense);
}
