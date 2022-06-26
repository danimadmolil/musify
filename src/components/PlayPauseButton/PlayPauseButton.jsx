import React from "react";
import { Box, IconButton } from "@mui/material";
import { PlayCircleRounded, PauseCircleRounded } from "@mui/icons-material";
import {
  playSong as playSongAction,
  pauseSong as pauseSongAction,
} from "../../store/actions/songs/songs.actions";
import {
  pause,
  resume,
  getAmplitude,
} from "../../utils/amplitudejs/amplitude.utils";
import CircularProgress from "@mui/material/CircularProgress";

const amplitude = getAmplitude();
export default function PlayPauseButton({
  playingSong,
  playSong,
  pauseSong,
  ...rest
}) {
  return (
    <Box style={{ position: "relative", ...rest.style }}>
      {playingSong.loading ? (
        <CircularProgress
          sx={{ position: "absolute", left: "4.9px", top: "0.5px" }}
        />
      ) : null}
      {playingSong.isPlaying ? (
        <span
          className="amplitude-pause"
          onClick={() => {
            pause();
            pauseSong(pauseSongAction());
          }}>
          <IconButton variant="accent" sx={{ ...rest.sx }}>
            <PauseCircleRounded style={{ width: "100%", height: "100%" }} />
          </IconButton>
        </span>
      ) : (
        <span
          className="amplitude-play"
          onClick={() => {
            playSong({ type: "RESUME_SONG" });
          }}>
          <IconButton variant="accent" sx={{ ...rest.sx }}>
            <PlayCircleRounded style={{ width: "100%", height: "100%" }} />
          </IconButton>
        </span>
      )}
    </Box>
  );
}
