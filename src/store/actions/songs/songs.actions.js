export const GET_SONGS_REQUEST = "GET_SONGS_REQUEST";
export const SONG_REQUEST_SUCCESS = "SONG_REQUEST_SUCCESS";
export const SONG_REQUEST_FAILURE = "SONG_REQUEST_FAILURE";
export const INIT_SONGS = "INIT_SONGS";

//play state actions
export const PLAY_SONG = "PLAY_SONG";
export const SONG_ENDED = "SONG_ENDED";
export const PAUSE_SONG = "PAUSE_SONG";
//action creators
export function playSong(song) {
  return { type: PLAY_SONG, payload: { song: song } };
}
export function pauseSong(song) {
  return { type: PAUSE_SONG };
}
export function songEnded() {
  return { type: SONG_ENDED };
}
