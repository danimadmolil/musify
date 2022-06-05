import {
  GET_PLAYLISTS,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  REMOVE_PLAYLIST,
  REMOVE_PLAYLIST_SUCCESS,
  REMOVE_PLAYLIST_FAIL,
} from "../../actions/playlist/playlist.action";
import { USER_LOGOUT_SUCCESS } from "../../actions/user/user.actions";
const playListInitialState = {};
const playListReducer = (state = playListInitialState, action) => {
  //clear playlist when user logout
  if (action.type === "USER_NOT_AUTHENTICATED") {
    return { ...state, data: {} };
  } else if (action.type === USER_LOGOUT_SUCCESS) {
    return {};
  }
  if (action.type === GET_PLAYLISTS) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === GET_PLAYLIST_SUCCESS) {
    return {
      loading: false,
      data: action.payload.playlists,
    };
  } else if (action.type === GET_PLAYLIST_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  }
  // create and delete playlists
  if (action.type === CREATE_PLAYLIST) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === CREATE_PLAYLIST_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        [action.payload.playlist.name]: action.payload.playlist,
      },
    };
  } else if (action.type === CREATE_PLAYLIST_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  }
  if (action.type === REMOVE_PLAYLIST) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === REMOVE_PLAYLIST_SUCCESS) {
    return {
      data: action.payload.playlists,
      loading: false,
    };
  } else if (action.type === REMOVE_PLAYLIST_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};
export default playListReducer;
