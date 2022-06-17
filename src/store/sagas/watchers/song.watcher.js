import { takeLatest, call, put, all } from "redux-saga/effects";
import { getAll } from "../../../services/api/api";
import {
  addSong,
  setRepeat,
  setRepeatSong,
} from "../../../utils/amplitudejs/amplitude.utils";
import objectMapper from "../../../utils/mappers/object.maper";
import {
  INIT_SONGS,
  GET_SONGS_REQUEST,
  SONG_REQUEST_SUCCESS,
  SONG_REQUEST_FAILURE,
  PLAY_SONG,
  TOGGLE_SONG_REPEAT,
} from "../../actions/songs/songs.actions";
//watchers
export function* initSongRequestWatcher() {
  yield all([
    takeLatest(GET_SONGS_REQUEST, initSongRequestHandler),
    takeLatest(PLAY_SONG, playSongHandler),
    takeLatest(TOGGLE_SONG_REPEAT, repeatSongHandler),
  ]);
}
//handlers
function* repeatSongHandler(action) {
  setRepeat(!action.payload.song.repeat);
}
function* playSongHandler(action) {
  console.log("playsongHandler", action);
  addSong(action.payload.music);
  setRepeat(false);
  // setRepeatSong(true);
}
function* initSongRequestHandler() {
  try {
    const songs = yield call(getAll, "allSongs");
    const mappedSongs = songs.map((song) =>
      objectMapper(song, {
        id: "id",
        name: "name",
        file: "url",
        favorite: "like",
        artist: "artist",
        duration: "duration",
        poster: "cover_art_url",
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
