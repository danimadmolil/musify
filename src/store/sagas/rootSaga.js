import { all } from "redux-saga/effects";
import { getAllAlbumsWatcher } from "./watchers/albumWatcher";

export default function* rootSaga() {
  yield all([getAllAlbumsWatcher()]);
}
