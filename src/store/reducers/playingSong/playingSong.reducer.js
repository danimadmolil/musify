import {
  PLAY_SONG,
  PAUSE_SONG,
  SONG_ENDED,
} from "../../actions/songs/songs.actions";
const nameInitialState = {};
export default function PlayingSong(state = nameInitialState, action) {
  if (action.type === PLAY_SONG) {
    return { isPlaying: true,playState:'playing', ended: false, ...action.payload.music };
  } else if (action.type === PAUSE_SONG) {
    return { ...state, isPlaying: false,playState:'paused', ended: false };
  } else if (action.type === SONG_ENDED) {
    return { ...state, isPlaying: false,playState:'ended', ended: true };
  }
  return state;
}
