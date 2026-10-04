import { call, put, takeLatest } from "redux-saga/effects";
import TagService from "../../service/tagService";
import {
  fetchTagsSuccess,
  fetchTagsFailure,
  deleteTagSuccess,
  deleteTagFailure,
  addTagSuccess,
  addTagFailure,
  fetchTags,
  updateTagSuccess,
  updateTagFailure,
  FETCH_TAGS,
  DELETE_TAG,
  ADD_TAG,
  UPDATE_TAG,
  deleteTag,
  addTag,
  updateTag,
} from "@tagDuck";

function* handleFetchTags(): Generator<any, void, any> {
  try {
    const data = yield call(() => TagService.fetchAll());
    yield put(fetchTagsSuccess(data));
  } catch (error: any) {
    yield put(fetchTagsFailure(error?.message ?? String(error)));
  }
}

function* handleDeleteTag(
  action: ReturnType<typeof deleteTag>
): Generator<any, void, any> {
  try {
    yield call(() => TagService.deleteById(action.payload));
    yield put(deleteTagSuccess());
    yield put(fetchTags());
  } catch (error: any) {
    yield put(deleteTagFailure(error?.message ?? String(error)));
  }
}

function* handleAddTag(
  action: ReturnType<typeof addTag>
): Generator<any, void, any> {
  try {
    yield call(() => TagService.insert(action.payload));
    yield put(fetchTags());
    yield put(addTagSuccess());    
  } catch (error: any) {
    yield put(addTagFailure(error?.toString() ?? String(error)));
  }
}

function* handleUpdateTag(
  action: ReturnType<typeof updateTag>
): Generator<any, void, any> {
  try {
    yield call(() => TagService.update(action.payload));
    yield put(fetchTags());
    yield put(updateTagSuccess());    
  } catch (error: any) {
    yield put(updateTagFailure(error?.message ?? String(error)));
  }
}

export default function* tagSaga() {
  yield takeLatest(FETCH_TAGS, handleFetchTags);
  yield takeLatest(DELETE_TAG, handleDeleteTag);
  yield takeLatest(ADD_TAG, handleAddTag);
  yield takeLatest(UPDATE_TAG, handleUpdateTag);  
}
