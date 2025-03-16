import { call, put, takeLatest } from "redux-saga/effects";
import ExpenseTagService from "../../service/expenseTagService";
import {
  addExpenseTagFailure,
  addExpenseTagSuccess,
} from "@expenseTagDuck";

function* handleAddExpenseTag(action) {
  try {
    const { expenseId, tagId } = action.payload;
    yield call([ExpenseTagService, "insert"], expenseId, tagId);
    yield put(addExpenseTagSuccess());
  } catch (error) {
    yield put(addExpenseTagFailure(error.toString()));
  }
}

export default function* expenseTagSaga() {
  yield takeLatest("expenseTag/addExpenseTag", handleAddExpenseTag);
}
