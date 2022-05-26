import React from "react";
import { useEffect } from "react";
import Index from "./pages/Index/Index";
import { useDispatch } from "react-redux";
import "swiper/css";
import { initAmplitude } from "./utils/amplitudejs/amplitude.utils";
import { GET_ALLALBUMS_REQUEST } from "./store/actions/albums/albums.actions";
import {
  INIT_SONGS,
  GET_SONGS_REQUEST,
} from "./store/actions/songs/songs.actions";
import { userCheckAuthRequest } from "./store/actions/user/user.actions";
export default React.memo(function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userCheckAuthRequest());
    dispatch({ type: GET_ALLALBUMS_REQUEST });
    dispatch({ type: GET_SONGS_REQUEST });
    initAmplitude();
  }, []);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Index />
    </div>
  );
});
