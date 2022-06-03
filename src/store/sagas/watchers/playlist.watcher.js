import { all, takeLatest, take, takeEvery, call } from "redux-saga/effects";
import {
  GET_PLAYLISTS,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
} from "../../actions/playlist/playlist.action";
import mapArrayToObject from "../../../utils/mappers/mapArrayToObject.mapper";
import { getAll } from "../../../services/api/api";
import { put } from "redux-saga/effects";
export default function* playlistSaga() {
  yield takeLatest("GET_PLAYLISTS", getPlaylistsRequest);
  // yield all([takeLatest("GET_PLAYLISTS", getPlaylistsRequest)]);
}
export function* getPlaylistsRequest() {
  console.log("getPlaylists watcher");
  try {
    const playlists = yield call(getAll, "getAllPlaylists");
    yield put({
      type: GET_PLAYLIST_SUCCESS,
      payload: { playlists: mapArrayToObject([...playlists], "name") },
    });
  } catch (e) {
    yield put({ type: GET_PLAYLIST_FAIL, payload: { error: e } });
  }
}
