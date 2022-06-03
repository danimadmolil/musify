import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  PlayArrowOutlined,
  PlayArrowRounded,
  PlayCircleRounded,
  PauseCircleRounded,
  PlayArrowSharp,
  Favorite,
} from "@mui/icons-material";
import defaultImg from "../../assets/images/5.jpg";
import {
  pause,
  playNow,
  resume,
  getActiveSongMetadata,
} from "../../utils/amplitudejs/amplitude.utils";
import PlayButtonProgressContainer from "../player/PlayButtonProgress/PlayButtonProgressContainer";
import FavoriteButtonContainer from "../FavoriteButton/FavoriteButtonContainer";

const Backdrop = styled.div`
  &:hover {
    background-color: #000000ba;
    transition: 0.3s background;
  }
  &:hover .play_button_rounded {
    opacity: 1;
  }
  &:hover .song_favorite_button {
    opacity: 1;
    transform: scale(1) translate(-100%, -100%);
  }
  &:hover .pause_container {
    opacity: 1;
    transform: scale(1) translate(50%, 30%);
  }
  &:hover .pause_button_container {
    opacity: 1;
    transform: scale(1) translate(50%, 30%);
  }
  top: 0px;
  left: 0px;
  font-size: 120px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
`;
export default React.memo(
  function SongCard({ song, playButton = false, title, subtitle, style = {} }) {
    console.log("songCard render", song);

    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <Card
        style={{
          marginRight: 8,
          marginLeft: 8,
          position: "relative",
          ...style,
        }}
        sx={{ backgroundColor: (theme) => theme.palette.card.default }}>
        <CardActionArea sx={{ padding: 1 }}>
          <CardMedia
            height="169"
            component="img"
            image={song.cover_art_url ? song.cover_art_url : defaultImg}
            style={{ borderRadius: "4px" }}
            sx={{}}
          />
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                fontSize: 16,
                color: (theme) => theme.palette.typography.light,
              }}
              component="div">
              {song.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 11,
                color: (theme) => theme.palette.typography.light,
              }}>
              {song.artist}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Backdrop>
          <PlayButtonProgressContainer song={song} />
          <FavoriteButtonContainer like={song.like} songId={song.id} />
        </Backdrop>
      </Card>
    );
  },
  (prev, next) => {
    if (prev.song.id === next.song.id && prev.song.like === next.song.like) {
      return true;
    }
    return false;
  }
);
