import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import {
  PlayArrowOutlined,
  PlayArrowRounded,
  PlayCircleRounded,
  PauseCircleRounded,
  PlayArrowSharp,
  Favorite,
  PlaylistAdd,
} from "@mui/icons-material";
import { ADD_SONG_TO_PLAYLIST } from "../../constants/dialogTypes";
import { openDialog } from "../../store/actions/dialog/dialog.actions";
import { useDispatch } from "react-redux";
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
  &:hover .song_favorite_button {
    opacity: 1;
    transform: scale(1) translate(-100%, -100%);
  }
  .play_button_progress {
    opacity: 0;
    position: absolute;
    top: 40%;
    left: 52%;
    transition: all 0.3s;
    transform: translate(0%, 8%) scale(0);
  }
  &:hover .play_button_progress {
    opacity: 1;
    transform: translate(50%, 30%) scale(1);
  }
  &:hover .playlist_add_icon {
    opacity: 1;
    transform: scale(1);
    top: 54%;
    left: 60%;
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
    const dispatch = useDispatch();
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
          <PlayButtonProgressContainer
            song={song}
            style={{ width: 50, height: 50 }}
            className={"play_button_progress"}
          />
          <FavoriteButtonContainer like={song.like} songId={song.id} />
          <IconButton
            onClick={() => dispatch(openDialog(ADD_SONG_TO_PLAYLIST, { song }))}
            classes={{ root: "playlist_add_icon" }}
            sx={{
              opacity: 0,
              transition: "all 0.3s",
              color: "white",
              position: "relative",
              top: "58%",
              left: "65%",
              transform: "translate(-0%,-0%) scale(0.3)",
            }}>
            <PlaylistAdd />
          </IconButton>
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
