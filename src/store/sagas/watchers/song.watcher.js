import { takeLatest, call, put } from "redux-saga/effects";
import { getAll } from "../../../services/api/api";
import {
  INIT_SONGS,
  GET_SONGS_REQUEST,
  SONG_REQUEST_SUCCESS,
  SONG_REQUEST_FAILURE,
} from "../../actions/songs/songs.actions";
//watchers
export function* initSongRequestWatcher() {
  console.log("song saga before");
  yield takeLatest(GET_SONGS_REQUEST, initSongRequestHandler);
  console.log("song saga after");
}
//handlers
function* initSongRequestHandler() {
  try {
    const songs = yield call(getAll, "songs");
    yield put({
      type: SONG_REQUEST_SUCCESS,
      payload: { songs },
    });
  } catch (error) {
    yield put({ type: SONG_REQUEST_FAILURE, payload: { error } });
  }
}
