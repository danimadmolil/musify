import { combineReducers } from "redux";
import albumReducer from "./albums/albums.reducer";
import songsReducer from "./songs/songs.reducer";
import userReducer from "./user/user.reducer";
export default function rootReducer() {
  return combineReducers({
    albums: albumReducer,
    songs: songsReducer,
    user: userReducer,
  });
}
