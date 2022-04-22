import { put, takeLatest, call, takeEvery, take } from "redux-saga/effects";
import { getAll } from "../../../services/api/api";
import {
  GET_ALLALBUMS_FAILURE,
  GET_ALLALBUMS_REQUEST,
  GET_ALLALBUMS_SUCCESS,
} from "../../actions/albums/albums.actions";

export function* getAllAlbumsWatcher() {
  yield takeLatest(GET_ALLALBUMS_REQUEST, getAllAlbums);
}
function* getAllAlbums() {
  try {
    const albums = yield call(getAll, "albums");
    yield put({
      type: GET_ALLALBUMS_SUCCESS,
      payload: { albums },
    });
  } catch (error) {
    yield put({
      type: GET_ALLALBUMS_FAILURE,
      payload: { error },
    });
  }
}
