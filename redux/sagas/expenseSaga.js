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
  clearExpensesByMonthYearSuccess,
  clearExpensesByMonthYearFailure,
} from "@expenseDuck";
import { addExpenseTag } from "@expenseTagDuck";

function* handleFetchExpenses() {
  try {
    const expenses = yield call([ExpenseService, "fetchAll"]);
    yield put(fetchExpensesSuccess(expenses));
  } catch (error) {
    yield put(fetchExpensesFailure(error.toString()));
  }
}

function* handleFetchMonthlyExpenses() {
  try {
    const monthlyExpenses = yield call([ExpenseService, "fetchMonthly"]);
    yield put(fetchMonthlyExpensesSuccess(monthlyExpenses));
  } catch (error) {
    yield put(fetchMonthlyExpensesFailure(error.toString()));
  }
}

function* handleAddExpense(action) {
  try {
    const { value, tagId } = action.payload;
    const newExpenseId = yield call([ExpenseService, "insert"], value);

    if (newExpenseId && tagId) {
      yield put(
        addExpenseTag({
          expenseId: newExpenseId,
          tagId: tagId,
        })
      );
    }

    yield put(addExpenseSuccess());
    //yield put(fetchExpenses());
    yield put(fetchMonthlyExpenses());
  } catch (error) {
    yield put(addExpenseFailure(error.toString()));
  }
}

function* handleDeleteExpense(action) {
  try {
    const { expenseId, date } = action.payload;

    yield call([ExpenseService, "deleteById"], expenseId);
    yield put(fetchMonthlyExpenses());
    yield put(fetchByMonthYear(date));
    yield put(deleteExpenseSuccess());
  } catch (error) {
    yield put(deleteExpenseFailure(error.toString()));
  }
}

function* handleDeleteAllExpenses() {
  try {
    yield call([ExpenseService, "deleteAll"]);
    yield put(deleteAllExpensesSuccess());
    yield put(fetchExpenses());
    yield put(fetchMonthlyExpenses());
  } catch (error) {
    yield put(deleteAllExpensesFailure(error.toString()));
  }
}

function* handleFetchByMonthYear(action) {
  try {
    const monthlyExpenses = yield call(
      [ExpenseService, "fetchByMonthYear"],
      action.payload
    );
    yield put(fetchByMonthYearSuccess(monthlyExpenses));
  } catch (error) {
    yield put(fetchByMonthYearFailure(error.toString()));
  }
}

function* handleClearExpenses() {
  try {  
    yield put(clearExpensesByMonthYearSuccess());
  } catch (error) {
    yield put(clearExpensesByMonthYearFailure(error.toString()));
  }
}

export default function* expenseSaga() {
  yield takeLatest("expense/fetchExpenses", handleFetchExpenses);
  yield takeLatest("expense/fetchMonthlyExpenses", handleFetchMonthlyExpenses);
  yield takeLatest("expense/addExpense", handleAddExpense);
  yield takeLatest("expense/deleteExpense", handleDeleteExpense);
  yield takeLatest("expense/deleteAllExpenses", handleDeleteAllExpenses);
  yield takeLatest("expense/fetchByMonthYear", handleFetchByMonthYear);
  yield takeLatest("expense/clearExpensesByMonthYear", handleClearExpenses);
}
