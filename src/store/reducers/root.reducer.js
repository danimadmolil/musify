import { combineReducers } from "redux";
import albumReducer from "./albums/albums.reducer";
import songsReducer from "./songs/songs.reducer";
import userReducer from "./user/user.reducer";
import playingSong from "./playingSong/playingSong.reducer";
import themReducer from "./theme/theme.reducer";
import playlistReducer from "./playlist/playlist.reducer";
import notistackReducer from "./notistack/notistack.reducer";
export default function rootReducer() {
  return combineReducers({
    playlists: playlistReducer,
    albums: albumReducer,
    songs: songsReducer,
    user: userReducer,
    playingSong: playingSong,
    theme: themReducer,
    app: notistackReducer,
  });
}
