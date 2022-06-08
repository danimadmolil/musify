export const GET_PLAYLISTS = "GET_PLAYLISTS";
export const GET_PLAYLIST_SUCCESS = "GET_PLAYLIST_SUCCESS";
export const GET_PLAYLIST_FAIL = "GET_PLAYLIST_FAIL";
export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const ADD_SONG_TO_PLAYLIST_SUCCESS = "ADD_SONG_TO_PLAYLIST_SUCCESS";

// create and remove action constatns and action creators
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS";
export const CREATE_PLAYLIST_FAIL = "CREATE_PLAYLIST_FAIL";
export const REMOVE_PLAYLIST = "REMOVE_PLAYLIST";
export const REMOVE_PLAYLIST_SUCCESS = "REMOVE_PLAYLIST_SUCCESS";
export const REMOVE_PLAYLIST_FAIL = "REMOVE_PLAYLIST_FAIL";

// create action creators
export const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  payload: { playlist },
});
export const createPlaylistSuccess = (playlist) => ({
  type: CREATE_PLAYLIST_SUCCESS,
  payload: { playlist },
});
export const createPlaylistFail = (error) => ({
  type: CREATE_PLAYLIST_FAIL,
  payload: { error },
});

export const removePlaylist = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  payload: { playlistId },
});
export const removePlaylistSuccess = (playlists) => ({
  type: REMOVE_PLAYLIST_SUCCESS,
  payload: { playlists },
});
export const removePlaylistFail = (error) => ({
  type: REMOVE_PLAYLIST_FAIL,
  payload: error,
});

export const getPlaylists = () => ({
  type: GET_PLAYLISTS,
});
