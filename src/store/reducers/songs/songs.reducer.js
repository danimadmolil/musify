import {
  SONG_REQUEST_FAILURE,
  SONG_REQUEST_SUCCESS,
} from "../../actions/songs/songs.actions";
export default (state = [], action) => {
  if (action.type === SONG_REQUEST_SUCCESS) {
    return action.payload.songs;
  }
  if (action.type === SONG_REQUEST_FAILURE) {
    return [];
  }
  return state;
};
