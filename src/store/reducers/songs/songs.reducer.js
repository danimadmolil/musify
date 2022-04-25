import {
  SONG_REQUEST_FAILURE,
  SONG_REQUEST_SUCCESS,
} from "../../actions/songs/songs.actions";
export default (state = [], action) => {
  console.log("song reducer", action);
  if (action.type === SONG_REQUEST_SUCCESS) {
    return action.payload.songs;
  }
  if (action.type === SONG_REQUEST_FAILURE) {
    console.log("SONG_REQUEST_FAILURE", action.payload.error);
    return [];
  }
  return state;
};
