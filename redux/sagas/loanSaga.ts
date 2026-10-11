import { call, put, takeLatest } from "redux-saga/effects";
import LoanService from "../../service/loanService";
import {
  fetchLoans,
  fetchLoansSuccess,
  fetchLoansFailure,
  deleteLoan,
  deleteLoanSuccess,
  deleteLoanFailure,
  addLoan,
  addLoanSuccess,
  addLoanFailure,
  updateLoan,
  updateLoanSuccess,
  updateLoanFailure,
} from "@loanDuck";

function* handleFetchLoans(): Generator<any, void, any> {
  try {
    const data = yield call(() => LoanService.fetchAll());
    yield put(fetchLoansSuccess(data));
  } catch (error: any) {
    yield put(fetchLoansFailure(error?.message ?? String(error)));
  }
}

function* handleDeleteLoan(
  action: ReturnType<typeof deleteLoan>
): Generator<any, void, any> {
  try {
    yield call(() => LoanService.deleteById(action.payload));
    yield put(deleteLoanSuccess());
    yield put(fetchLoans());
  } catch (error: any) {
    yield put(deleteLoanFailure(error?.message ?? String(error)));
  }
}

function* handleAddLoan(
  action: ReturnType<typeof addLoan>
): Generator<any, void, any> {
  try {
    yield call(() => LoanService.insert(action.payload));
    yield put(fetchLoans());
    yield put(addLoanSuccess());
  } catch (error: any) {
    yield put(addLoanFailure(error?.toString() ?? String(error)));
  }
}

function* handleUpdateLoan(
  action: ReturnType<typeof updateLoan>
): Generator<any, void, any> {
  try {
    yield call(() => LoanService.update(action.payload));
    yield put(fetchLoans());
    yield put(updateLoanSuccess());
  } catch (error: any) {
    yield put(updateLoanFailure(error?.message ?? String(error)));
  }
}

export default function* loanSaga() {
  yield takeLatest(fetchLoans.type, handleFetchLoans);
  yield takeLatest(deleteLoan.type, handleDeleteLoan);
  yield takeLatest(addLoan.type, handleAddLoan);
  yield takeLatest(updateLoan.type, handleUpdateLoan);
}
