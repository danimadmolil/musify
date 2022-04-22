import { combineReducers } from "redux";
import albumReducer from "./albums/albums.reducer";
export default function rootReducer() {
  return combineReducers({
    albums: albumReducer,
  });
}
