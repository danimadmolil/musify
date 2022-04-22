import { GET_ALLALBUMS_SUCCESS } from "../../actions/albums/albums.actions";
export default function albumReducer(state = [], action) {
  console.log("album reducer", action);
  if (action.type === GET_ALLALBUMS_SUCCESS) {
    console.log("action", action);
    const albums = action.payload.albums;
    return albums;
  }
  return state;
}
