import { combineReducers } from "redux";
import albumReducer from "./albums/albums.reducer";
import songsReducer from "./songs/songs.reducer";
export default function rootReducer() {
  return combineReducers({
    albums: albumReducer,
    songs:songsReducer
  });

}
