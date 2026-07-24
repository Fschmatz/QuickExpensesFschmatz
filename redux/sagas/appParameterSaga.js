import { call, put, takeLatest } from "redux-saga/effects";
import AppParameterService from "../../service/appParameterService";
import {
  fetchAppParametersSuccess,
  fetchAppParametersFailure,
  setAppParameterSuccess,
  setAppParameterFailure,
  fetchAppParameters,
} from "../ducks/appParameterDuck";
import { appParameters } from "@constants";

function* handleFetchAppParameters() {
  try {
    const data = yield call(AppParameterService.getAll);
    yield put(fetchAppParametersSuccess(data));
  } catch (error) {
    yield put(fetchAppParametersFailure(error.message));
  }
}

function* handleSetAppParameter(action) {
  try {
    const { key, value } = action.payload;
    yield call(AppParameterService.update, key, value);
    yield put(setAppParameterSuccess());
    yield put(fetchAppParameters());
  } catch (error) {
    yield put(setAppParameterFailure(error.message));
  }
}

function* handleUpdateLastBackupDate() {
  try {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    yield call(AppParameterService.update, appParameters.lastBackupDateParameter, formattedDate);
    yield put(setAppParameterSuccess());
    yield put(fetchAppParameters());
  } catch (error) {
    yield put(setAppParameterFailure(error.message));
  }
}

export default function* appParameterSaga() {
  yield takeLatest("appParameter/fetchAppParameters", handleFetchAppParameters);
  yield takeLatest("appParameter/setAppParameter", handleSetAppParameter);
  yield takeLatest("appParameter/updateLastBackupDate", handleUpdateLastBackupDate);
}
