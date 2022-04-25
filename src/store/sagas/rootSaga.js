import { all } from "redux-saga/effects";
import { getAllAlbumsWatcher } from "./watchers/albumWatcher";
import { initSongRequestWatcher } from "./watchers/song.watcher";

export default function* rootSaga() {
  yield all([getAllAlbumsWatcher(), initSongRequestWatcher()]);
}
