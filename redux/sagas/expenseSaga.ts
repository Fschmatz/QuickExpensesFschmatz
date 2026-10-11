import { call, put, takeLatest } from "redux-saga/effects";
import ExpenseService from "../../service/expenseService";
import {
  fetchExpenses,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  fetchMonthlyExpenses,
  fetchMonthlyExpensesSuccess,
  fetchMonthlyExpensesFailure,
  addExpense,
  addExpenseSuccess,
  addExpenseFailure,
  updateExpense,
  updateExpenseSuccess,
  updateExpenseFailure,
  deleteExpense,
  deleteExpenseSuccess,
  deleteExpenseFailure,
  deleteAllExpenses,
  deleteAllExpensesSuccess,
  deleteAllExpensesFailure,
  fetchByMonthYear,
  fetchByMonthYearSuccess,
  fetchByMonthYearFailure,
  clearExpensesByMonthYear,
  clearExpensesByMonthYearSuccess,
  clearExpensesByMonthYearFailure,
  fetchTotalExpensesCurrentMonth,
  fetchTotalExpensesCurrentMonthSuccess,
  fetchTotalExpensesCurrentMonthFailure,
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
  yield takeLatest(fetchExpenses.type, handleFetchExpenses);
  yield takeLatest(fetchMonthlyExpenses.type, handleFetchMonthlyExpenses);
  yield takeLatest(addExpense.type, handleAddExpense);
  yield takeLatest(deleteExpense.type, handleDeleteExpense);
  yield takeLatest(deleteAllExpenses.type, handleDeleteAllExpenses);
  yield takeLatest(fetchByMonthYear.type, handleFetchByMonthYear);
  yield takeLatest(clearExpensesByMonthYear.type, handleClearExpenses);
  yield takeLatest(fetchTotalExpensesCurrentMonth.type, handleFetchTotalExpensesCurrentMonth);
  yield takeLatest(updateExpense.type, handleUpdateExpense);
}
