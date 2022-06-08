import {
  all,
  takeLatest,
  take,
  takeEvery,
  call,
  put,
} from "redux-saga/effects";
import { addPlaylist } from "../../../utils/amplitudejs/amplitude.utils";
import {
  GET_PLAYLISTS,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  ADD_SONG_TO_PLAYLIST_SUCCESS,
} from "../../actions/playlist/playlist.action";
import { userConfirm, USER_CONFIRM } from "../../actions/user/user.actions";
import {
  CONFORMATION,
  ADD_SONG_TO_PLAYLIST,
} from "../../../constants/dialogTypes";
import {
  openDialog,
  closeDialog,
  OPEN_DIALOG,
} from "../../actions/dialog/dialog.actions";
import mapArrayToObject from "../../../utils/mappers/mapArrayToObject.mapper";
import objectMapper from "../../../utils/mappers/object.maper";
import { createRequest, getAll } from "../../../services/api/api";

import {
  enqueueSnackbar,
  closeSnackbar,
} from "../../actions/notistack/notistack.actions";
//import playlist.actions and action creators from "../../actions/playlist/playlist.action";
import {
  CREATE_PLAYLIST,
  REMOVE_PLAYLIST,
  createPlaylist,
  createPlaylistSuccess,
  createPlaylistFail,
  removePlaylist,
  removePlaylistSuccess,
  removePlaylistFail,
} from "../../actions/playlist/playlist.action";
import { Button } from "@mui/material";
export default function* playlistSaga() {
  yield all([
    takeLatest("GET_PLAYLISTS", getPlaylistsRequest),
    takeLatest(CREATE_PLAYLIST, createPlaylistRequest),
    takeLatest(REMOVE_PLAYLIST, removePlaylistRequest),
    takeEvery(OPEN_DIALOG, addSongToPlaylistHandler),
  ]);
}
function* addSongToPlaylistHandler(action) {
  const { song } = action.payload;
  console.log("song", song);
  let {
    payload: { playlist },
  } = yield take("ADD_TO_PLAYLIST");
  console.log("after take");
  try {
    let result = yield call(createRequest, "/addSongToPlaylist", {
      songId: song.id,
      playlistId: playlist.id,
    });
    console.log("playlist before put", playlist);
    yield put({
      type: "ADD_SONG_TO_PLAYLIST_SUCCESS",
      payload: { song, playlist },
    });
    console.log("playlist after put", playlist);

    yield put(closeDialog());
  } catch (e) {
    console.log("error playlist watcher", e);
  }
}
// create and delete playlist saga handlers
function* createPlaylistRequest(action) {
  try {
    const response = yield call(
      createRequest,
      "createPlaylist",
      action.payload.playlist
    );
    yield put(createPlaylistSuccess({...response,songs:[]}));
    addPlaylist({ ...action.payload.playlist });
    yield put(
      enqueueSnackbar({
        message: "playlist created",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(createPlaylistFail(error));
    yield put(
      enqueueSnackbar({
        message: "failed to create playlist",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
        },
      })
    );
  }
}
function* removePlaylistRequest(action) {
  yield put(openDialog(CONFORMATION));
  yield take(USER_CONFIRM);
  try {
    const response = yield call(
      createRequest,
      "deletePlaylist",
      action.payload
    );
    yield put(removePlaylistSuccess(mapArrayToObject(response, "name")));
    yield put(
      enqueueSnackbar({
        message: "playlist removed",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(removePlaylistFail(error));
    yield put(
      enqueueSnackbar({
        message: "Failed to remove playlist",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
        },
      })
    );
  }
}

export function* getPlaylistsRequest() {
  try {
    let playlists = yield call(getAll, "getAllPlaylists");
    playlists = playlists.map((playlist) => {
      return {
        ...playlist,
        activeIndex: 1,
        songs: playlist.songs.map((song) =>
          objectMapper(song, { file: "url" })
        ),
      };
    });
    playlists = mapArrayToObject([...playlists], "name");
    yield put({
      type: GET_PLAYLIST_SUCCESS,
      payload: { playlists },
    });
  } catch (e) {
    yield put({ type: GET_PLAYLIST_FAIL, payload: { error: e } });
  }
}
