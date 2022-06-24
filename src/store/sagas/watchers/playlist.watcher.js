import {
  all,
  takeLatest,
  take,
  takeEvery,
  call,
  put,
} from "redux-saga/effects";
import {
  addPlaylist,
  setRepeatPlaylist,
  setRepeat,
} from "../../../utils/amplitudejs/amplitude.utils";
import {
  GET_PLAYLISTS,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  ADD_SONG_TO_PLAYLIST_SUCCESS,
  PLAY_PLAYLIST,
  TOGGLE_PLAYLIST_REPEAT,
  TOGGLE_PLAYLIST_REPEAT_SUCCESS,
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
import { SnowboardingSharp } from "@mui/icons-material";
export default function* playlistSaga() {
  yield all([
    takeLatest("GET_PLAYLISTS", getPlaylistsRequest),
    takeLatest(CREATE_PLAYLIST, createPlaylistRequest),
    takeLatest(REMOVE_PLAYLIST, removePlaylistRequest),
    takeLatest([OPEN_DIALOG, "PLAY_SONG"], addSongToPlaylistHandler),
    takeLatest(TOGGLE_PLAYLIST_REPEAT, playlistRepeatHandler),
    takeLatest(PLAY_PLAYLIST, playlistPlayHandler),
  ]);
}
function* playlistPlayHandler(action) {
  console.log("action play", action);
  setRepeat(action.payload.playlist.repeat);
}
function* playlistRepeatHandler({ payload: { playlist } }) {
  setRepeat(!playlist.repeat);
  setRepeatPlaylist(playlist.name, !playlist.repeat);
  yield put({
    type: TOGGLE_PLAYLIST_REPEAT_SUCCESS,
    payload: { repeat: !playlist.repeat },
  });
}
function* addSongToPlaylistHandler(action) {
  const song = action.payload.song || action.payload.music;
  console.log("song", song);
  while (true) {
    let {
      payload: { playlist, jwt },
    } = yield take("ADD_TO_PLAYLIST");
    try {
      console.log("before request", song);
      let result = yield call(
        createRequest,
        "/addSongToPlaylist",
        {
          songId: song.id,
          playlistId: playlist.id,
        },
        { headers: { authorization: `Bearer ${jwt}` } }
      );
      console.log("playlist before put", playlist);
      yield put({
        type: "ADD_SONG_TO_PLAYLIST_SUCCESS",
        payload: { song, playlist },
      });
      console.log("playlist after put", playlist);

      yield put(closeDialog());
      yield put(
        enqueueSnackbar({
          message: "song added to playlist",
          options: {
            key: new Date().getTime() + Math.random() * 10,
            variant: "success",
          },
        })
      );
    } catch (e) {
      yield put(
        enqueueSnackbar({
          message:
            "adding song to playlist failed!(song already is in playlist or network is broken)",
          options: {
            key: new Date().getTime() + Math.random() * 10,
            variant: "error",
          },
        })
      );
    }
  }
}
// create and delete playlist saga handlers
function* createPlaylistRequest(action) {
  try {
    const response = yield call(
      createRequest,
      "createPlaylist",
      action.payload.playlist,
      { headers: { authorization: `Bearer ${action.payload.jwt}` } }
    );
    yield put(createPlaylistSuccess({ name: response.data.name, songs: [] }));
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
  const {
    payload: { jwt },
  } = yield take(USER_CONFIRM);
  try {
    const response = yield call(
      createRequest,
      "deletePlaylist",
      action.payload,
      { headers: { authorization: `Bearer ${jwt}` } }
    );
    yield put(removePlaylistSuccess(mapArrayToObject(response.data, "name")));
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

export function* getPlaylistsRequest(action) {
  try {
    let playlists = yield call(getAll, "getAllPlaylists", {
      headers: { authorization: `Bearer ${action.payload.jwt}` },
    });
    playlists = playlists.map((playlist) => {
      return {
        ...playlist,
        activeIndex: 1,
        songs: playlist.songs.map((song) =>
          objectMapper(song, { file: "url", poster: "cover_art_url" })
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
