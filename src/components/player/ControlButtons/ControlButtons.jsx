import React from "react";
import {
  VolumeUp,
  VolumeDown,
  List as ListIcon,
  PlayCircleRounded,
  PauseCircleRounded,
  SkipPreviousRounded,
  SkipNextRounded,
  Fullscreen,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import IconButtonWithTheme from "../../IconButtonWithTheme/IconButtonWithTheme";
import PlayPauseButtonContainer from "../../PlayPauseButton/PlayPauseButtonContainer";
import { setRepeatPlaylist } from "../../../utils/amplitudejs/amplitude.utils";
import { useDispatch } from "react-redux";
import { toggleSongRepeat } from "../../../store/actions/songs/songs.actions";
import { togglePlaylistRepeat } from "../../../store/actions/playlist/playlist.action";
export default function ControlButtons({
  prevButton = "disable",
  nextButton = "disable",
  repeatButton,
  playingPlaylist,
  playingSong,
}) {
  const dispatch = useDispatch();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent={"center"}>
      <IconButtonWithTheme>
        <ShuffleIcon
          sx={{ color: (theme) => theme.palette.typography.disables }}
          fontSize="medium"
          color="light"
        />
      </IconButtonWithTheme>
      <span className={"amplitude-prev"}>
        <IconButtonWithTheme variant="IconButton-accent">
          <SkipPreviousRounded
            sx={{
              color: (theme) =>
                prevButton === "enable"
                  ? theme.palette.accent["800"]
                  : theme.palette.typography.disable,
            }}
            fontSize="medium"
          />
        </IconButtonWithTheme>
      </span>

      <PlayPauseButtonContainer
        style={{
          width: 50,
          height: 40,
          margin: 0,
          padding: 0,
          display: "block",
        }}
        sx={{
          top: "-5px",
          position: "relative",
          color: (theme) => theme.palette.accent.default,
        }}
      />

      <div className={"amplitude-next"}>
        <IconButtonWithTheme>
          <SkipNextRounded
            sx={{
              color: (theme) =>
                nextButton === "enable"
                  ? theme.palette.accent["800"]
                  : theme.palette.typography.disable,
            }}
            fontSize="medium"
          />
        </IconButtonWithTheme>
      </div>
      <IconButtonWithTheme
        onClick={() => {
          if (!!playingPlaylist) {
            dispatch(togglePlaylistRepeat(playingPlaylist));
          } else {
            dispatch(toggleSongRepeat(playingSong));
          }
        }}>
        <span
          className={`${
            playingPlaylist
              ? playingPlaylist.repeat
                ? "amplitude-repeat-on"
                : playingSong
                ? playingSong.repeat
                  ? "amplitude-repeat-on"
                  : "amplitude-repeat-off"
                : "amplitude-repeat-off"
              : "amplitude-repeat-off"
          }`}
          style={{
            display: "none",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 11000,
          }}></span>
        <RepeatIcon
          sx={{
            color: (theme) =>
              repeatButton === true
                ? theme.palette.accent["800"]
                : theme.palette.typography.disable,
          }}
          fontSize="medium"
        />
      </IconButtonWithTheme>
    </Stack>
  );
}
