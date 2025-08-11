import { call, put, takeLatest } from "redux-saga/effects";
import LoanService from "../../service/loanService";
import {
  fetchLoansSuccess,
  fetchLoansFailure,
  deleteLoanSuccess,
  deleteLoanFailure,
  addLoanSuccess,
  addLoanFailure,
  fetchLoans,
  updateLoanSuccess,
  updateLoanFailure,
} from "@loanDuck";

function* handleFetchLoans() {
  try {
    const data = yield call(LoanService.fetchAll);
    yield put(fetchLoansSuccess(data));
  } catch (error) {
    yield put(fetchLoansFailure(error.message));
  }
}

function* handleDeleteLoan(action) {
  try {
    yield call(LoanService.deleteById, action.payload);
    yield put(deleteLoanSuccess());
    yield put(fetchLoans());
  } catch (error) {
    yield put(deleteLoanFailure(error.message));
  }
}

function* handleAddLoan(action) {
  try {
    yield call([LoanService, "insert"], action.payload);
    yield put(fetchLoans());
    yield put(addLoanSuccess());
  } catch (error) {
    yield put(addLoanFailure(error.toString()));
  }
}

function* handleUpdateLoan(action) {
  try {
    yield call(LoanService.update, action.payload);
    yield put(fetchLoans());
    yield put(updateLoanSuccess());
  } catch (error) {
    yield put(updateLoanFailure(error.message));
  }
}

export default function* loanSaga() {
  yield takeLatest("loan/fetchLoans", handleFetchLoans);
  yield takeLatest("loan/deleteLoan", handleDeleteLoan);
  yield takeLatest("loan/addLoan", handleAddLoan);
  yield takeLatest("loan/updateLoan", handleUpdateLoan);
}
