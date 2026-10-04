import { call, put, takeLatest } from "redux-saga/effects";
import AppParameterService from "../../service/appParameterService";
import {
  fetchAppParametersSuccess,
  fetchAppParametersFailure,
  setAppParameterSuccess,
  setAppParameterFailure,
  fetchAppParameters,
  SET_APP_PARAMETER,
  FETCH_APP_PARAMETERS,
  UPDATE_LAST_BACKUP_DATE,
  setAppParameter,
} from "../ducks/appParameterDuck";
import { appParameters } from "@constants";

function* handleFetchAppParameters(): Generator<any, void, any> {
  try {
    const data = yield call(AppParameterService.getAll);
    yield put(fetchAppParametersSuccess(data));
  } catch (error: any) {
    yield put(fetchAppParametersFailure(error?.message ?? String(error)));
  }
}

function* handleSetAppParameter(
  action: ReturnType<typeof setAppParameter>
): Generator<any, void, any> {
  try {
    const { key, value } = action.payload;
    yield call(AppParameterService.update, key, value);
    yield put(setAppParameterSuccess());
    yield put(fetchAppParameters());
  } catch (error: any) {
    yield put(setAppParameterFailure(error?.message ?? String(error)));
  }
}

function* handleUpdateLastBackupDate(): Generator<any, void, any> {
  try {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    yield call(AppParameterService.update, appParameters.lastBackupDateParameter, formattedDate);
    yield put(setAppParameterSuccess());
    yield put(fetchAppParameters());
  } catch (error: any) {
    yield put(setAppParameterFailure(error?.message ?? String(error)));
  }
}

export default function* appParameterSaga() {
  yield takeLatest(FETCH_APP_PARAMETERS, handleFetchAppParameters);
  yield takeLatest(SET_APP_PARAMETER, handleSetAppParameter);
  yield takeLatest(UPDATE_LAST_BACKUP_DATE, handleUpdateLastBackupDate);
}
