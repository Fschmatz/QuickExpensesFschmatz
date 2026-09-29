import { all } from "redux-saga/effects";
import expensesSaga from "./expenseSaga";
import tagsSaga from "./tagSaga";
import expenseTagSaga from "./expenseTagSaga";
import loanSaga from "./loanSaga";
import appParameterSaga from "./appParameterSaga";

export default function* rootSaga() {
  yield all([
    expensesSaga(),
    tagsSaga(),
    expenseTagSaga(),
    loanSaga(),
    appParameterSaga()
  ]);
}
