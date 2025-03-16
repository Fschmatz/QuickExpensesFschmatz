import { all } from "redux-saga/effects";
import expensesSaga from "./expenseSaga";
import tagsSaga from "./tagSaga";
import expenseTagSaga from "./expenseTagSaga";

export default function* rootSaga() {
  yield all([expensesSaga(), tagsSaga(), expenseTagSaga()]);
}
