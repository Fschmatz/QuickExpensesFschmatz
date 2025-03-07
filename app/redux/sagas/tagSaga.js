import { call, put, takeLatest } from 'redux-saga/effects';
import TagService from '../../service/tagService';
import {
  fetchTagsSuccess,
  fetchTagsFailure,
  deleteTagSuccess,
  deleteTagFailure,
  addTagSuccess,
  addTagFailure,
  fetchTags,
} from '../ducks/tagDuck';

function* handleFetchTags() {
  try {
    const data = yield call(TagService.fetchAll);
    yield put(fetchTagsSuccess(data));
  } catch (error) {
    yield put(fetchTagsFailure(error.message));
  }
}

function* handleDeleteTag(action) {
  try {
    yield call(TagService.deleteById, action.payload);
    yield put(deleteTagSuccess());
    yield put(fetchTags());
  } catch (error) {
    yield put(deleteTagFailure(error.message));
  }
}

function* handleAddTag(action) {
  try {
    yield call([TagService, 'insert'], action.payload);
    yield put(addTagSuccess());
    yield put(fetchTags());
  } catch (error) {
    yield put(addTagFailure(error.toString()));
  }
}

export default function* tagSaga() {
  yield takeLatest('tag/fetchTags', handleFetchTags);
  yield takeLatest('tag/deleteTag', handleDeleteTag);
  yield takeLatest('tag/addTag', handleAddTag);
}