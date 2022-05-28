import {
  PLAY_SONG,
  PAUSE_SONG,
  SONG_ENDED,
  RESUME_SONG,
} from "../../actions/songs/songs.actions";
const nameInitialState = {};
export default function PlayingSong(state = nameInitialState, action) {
  if (action.type === PLAY_SONG) {
    return {
      isPlaying: true,
      playState: "playing",
      ended: false,
      ...action.payload.music,
    };
  } else if (action.type === PAUSE_SONG) {
    return { ...state, isPlaying: false, playState: "paused", ended: false };
  } else if (action.type === SONG_ENDED) {
    return { isPlaying: false, playState: "ended", ended: true };
  } else if (action.type === RESUME_SONG) {
    return { ...state, isPlaying: true, ended: false };
  }
  return state;
}
