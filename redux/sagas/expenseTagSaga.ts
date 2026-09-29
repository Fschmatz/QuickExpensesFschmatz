import { call, put, takeLatest } from "redux-saga/effects";
import ExpenseTagService from "../../service/expenseTagService";
import {
  addExpenseTagFailure,
  addExpenseTagSuccess,
  ADD_EXPENSE_TAG,
} from "@expenseTagDuck";

function* handleAddExpenseTag(action: any): Generator<any, void, any> {
  try {
    const { expenseId, tagId } = action.payload;
    yield call([ExpenseTagService, "insert"], expenseId, tagId);
    yield put(addExpenseTagSuccess());
  } catch (error: any) {
    yield put(addExpenseTagFailure(error?.toString() ?? String(error)));
  }
}

export default function* expenseTagSaga() {
  yield takeLatest(ADD_EXPENSE_TAG, handleAddExpenseTag);
}
