import { takeLatest, call, put } from "redux-saga/effects";
import { getAll } from "../../../services/api/api";
import objectMapper from "../../../utils/mappers/object.maper";
import {
  INIT_SONGS,
  GET_SONGS_REQUEST,
  SONG_REQUEST_SUCCESS,
  SONG_REQUEST_FAILURE,
} from "../../actions/songs/songs.actions";
//watchers
export function* initSongRequestWatcher() {
  yield takeLatest(GET_SONGS_REQUEST, initSongRequestHandler);
}
//handlers
function* initSongRequestHandler() {
  try {
    const songs = yield call(getAll, "tracks-of-the-week");
    const mappedSongs = songs.data.map((song) =>
      objectMapper(song, {
        id: "id",
        name: "name",
        url: "url",
        cover_art_url: "cover_url",
        favorite: "like",
      })
    );
    yield put({
      type: SONG_REQUEST_SUCCESS,
      payload: { songs: mappedSongs },
    });
  } catch (error) {
    yield put({ type: SONG_REQUEST_FAILURE, payload: { error } });
  }
}
