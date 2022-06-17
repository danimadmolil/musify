import {
  Grid,
  ListItemButton,
  List,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PlayButtonProgressContainer from "../../../components/player/PlayButtonProgress/PlayButtonProgressContainer";
import SmoothScroll from "../../../components/SmoothScroll/SmoothScroll";
import { createRequest } from "../../../services/api/api";
import ObjectMapper from "../../../utils/mappers/object.maper";
export default function AlbumPage() {
  const [albumDetail, setAlbumDetail] = useState({});
  const location = useLocation();
  const params = useParams();
  console.log("params", params);
  const album = location.state && location.state.album;
  useEffect(() => {
    createRequest("/albumDetail", { albumId: Number(params.albumName) }).then(
      (res) => setAlbumDetail(res)
    );
  }, []);
  return (
    <SmoothScroll>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Grid lg={12} md={12} sx={{ height: 400 }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={!!album ? album.cover : albumDetail.cover}></img>
        </Grid>
      </Grid>
      <Typography
        sx={{
          color: "accent.default",
          fontSize: 90,
          position: "absolute",
          left: "50%",
          top: 390,
          transform: "translate(-50%,-50%)",
        }}>
        {!!album ? album.name : albumDetail.name}
      </Typography>
      <Link to={`${location.pathname}/fsdfsdf`}>fsjdlfkjsdf</Link>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!albumDetail.songs &&
            albumDetail.songs
              .map((song) =>
                ObjectMapper(song, { file: "url", poster: "cover_art_url" })
              )
              .map((song) => (
                <TableRow>
                  <TableCell>
                    <img
                      style={{ width: 50, height: 50, borderRadius: 5 }}
                      src={song.cover_art_url}
                    />
                  </TableCell>
                  <TableCell>{song.name}</TableCell>
                  <TableCell>{song.duration}</TableCell>
                  <TableCell>
                    <PlayButtonProgressContainer song={song} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </SmoothScroll>
  );
}