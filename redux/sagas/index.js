import { all } from "redux-saga/effects";
import expensesSaga from "./expenseSaga";
import tagsSaga from "./tagSaga";
import expenseTagSaga from "./expenseTagSaga";
import loanSaga from "./loanSaga";

export default function* rootSaga() {
  yield all([expensesSaga(), tagsSaga(), expenseTagSaga(), loanSaga()]);
}
