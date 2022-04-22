import { useState, useEffect, useRef } from "react";
import ListView from "./components/ListView/ListView";
import AlbumCard from "./components/AlbumCard/AlbumCard";
import SongCard from "./components/SongCard/SongCard";
import Index from "./pages/Index";
import { Button, Link, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css";
import ListViewContainer from "./components/ListView/ListViewContainer";
import { useDispatch } from "react-redux";
import { GET_ALLALBUMS_REQUEST } from "./store/actions/albums/albums.actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALLALBUMS_REQUEST });
  }, []);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Index/>
    </div>
  );
}

export default App;
const listViewStyle = {
  root: { paddingTop: "80px" },
  scrollContent: {
    width: "100%",
    height: "269px",
    marginBottom: "88px",
  },
  header: { position: "relative" },
  title: {
    fontSize: "22px",
    marginLeft: "16px",
    position: "relative",
    top: "10px",
  },
  subTitle: { color: "gray", marginLeft: "16px" },
  action: {
    minWidth: "80px",
    width: "max-content",
    position: "absolute",
    top: "100%",
    left: "100%",
    transform: "translate(-120%,-50%)",
    paddingRight: "22px",
    whiteSpace: "no-wrap",
  },
};
