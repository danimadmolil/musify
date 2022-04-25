import { GET_ALLALBUMS_SUCCESS } from "../../actions/albums/albums.actions";
export default function albumReducer(state = [], action) {
  if (action.type === GET_ALLALBUMS_SUCCESS) {
    const albums = action.payload.albums;
    return albums;
  }
  return state;
}
