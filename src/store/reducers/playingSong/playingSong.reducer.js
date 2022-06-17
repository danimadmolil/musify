import {
  PLAY_SONG,
  PAUSE_SONG,
  SONG_ENDED,
  RESUME_SONG,
  TOGGLE_SONG_REPEAT,
} from "../../actions/songs/songs.actions";
import { PLAY_PLAYLIST } from "../../actions/playlist/playlist.action";
const nameInitialState = { repeat: false };
export default function PlayingSong(state = nameInitialState, action) {
  if (action.type === TOGGLE_SONG_REPEAT) {
    console.log("reducer", !state.repeat);
    return { ...state, repeat: !state.repeat };
  }
  if (action.type === PLAY_SONG) {
    return {
      isPlaying: true,
      playState: "playing",
      ended: false,
      repeat: false,
      ...action.payload.music,
    };
  } else if (action.type === PAUSE_SONG) {
    return { ...state, isPlaying: false, playState: "paused", ended: false };
  } else if (action.type === SONG_ENDED) {
    return { ...state, isPlaying: false, playState: "ended", ended: true };
  } else if (action.type === RESUME_SONG) {
    return { ...state, isPlaying: true, ended: false };
  }
  return state;
}
