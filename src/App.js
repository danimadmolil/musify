import React from "react";
import { useEffect } from "react";
import Index from "./pages/Index/Index";
import { useDispatch } from "react-redux";
import "swiper/css";
import { GET_ALLALBUMS_REQUEST } from "./store/actions/albums/albums.actions";
import {
  INIT_SONGS,
  GET_SONGS_REQUEST,
} from "./store/actions/songs/songs.actions";
export default React.memo(function App() {
  console.log("APP rendered");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALLALBUMS_REQUEST });
    dispatch({ type: GET_SONGS_REQUEST });
    console.log('APP DID MOUNT')
  }, []);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Index />
    </div>
  );
});
