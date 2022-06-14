import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import SmoothScroll from "../../../components/SmoothScroll/SmoothScroll";
import SongCard from "../../../components/SongCard/SongCard";
import { createGetRequest, createRequest } from "../../../services/api/api";
import objectMapper from "../../../utils/mappers/object.maper";
import ListViewContainer from "../../../components/ListView/ListViewContainer";
export default function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState(null);
  useEffect(() => {
    createRequest("/userFavoriteSongs").then((data) =>
      setFavoriteSongs(
        data.favoriteSongs.map((song) =>
          objectMapper(song, { poster: "cover_art_url", file: "url" })
        )
      )
    );
  }, []);
  console.log("favoritesongs", favoriteSongs);
  return (
    <SmoothScroll>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateRows: 300,
          gap: 5,
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          paddingBottom: 18,
        }}>
        {!!favoriteSongs &&
          favoriteSongs.map((song) => <SongCard song={song} />)}
      </div>
    </SmoothScroll>
  );
}
