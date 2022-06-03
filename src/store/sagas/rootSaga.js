import { all } from "redux-saga/effects";
import { getAllAlbumsWatcher } from "./watchers/albumWatcher";
import { initSongRequestWatcher } from "./watchers/song.watcher";
import { userSaga } from "./watchers/user.watcher";
import playlistSaga from "./watchers/playlist.watcher";
export default function* rootSaga() {
  yield all([
    userSaga(),
    getAllAlbumsWatcher(),
    initSongRequestWatcher(),
    playlistSaga(),
  ]);
}
