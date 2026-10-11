import { call, put, takeLatest } from "redux-saga/effects";
import ExpenseTagService from "../../service/expenseTagService";
import {
  addExpenseTag,
  addExpenseTagFailure,
  addExpenseTagSuccess,
} from "@expenseTagDuck";

function* handleAddExpenseTag(
  action: ReturnType<typeof addExpenseTag>
): Generator<any, void, any> {
  try {
    const { expenseId, tagId } = action.payload;
    yield call([ExpenseTagService, "insert"], expenseId, tagId);
    yield put(addExpenseTagSuccess());
  } catch (error: any) {
    yield put(addExpenseTagFailure(error?.toString() ?? String(error)));
  }
}

export default function* expenseTagSaga() {
  yield takeLatest(addExpenseTag.type, handleAddExpenseTag);
}
