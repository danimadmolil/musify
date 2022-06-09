import React from "react";
import { IconButton } from "@mui/material";
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
const amplitude = getAmplitude();
export default function PlayPauseButton({
  playingSong,
  playSong,
  pauseSong,
  ...rest
}) {
  return amplitude.getPlayerState() === "playing" ? (
    <span
      className="amplitude-pause"
      onClick={() => {
        pause();
        pauseSong(pauseSongAction());
      }}>
      <IconButton variant="accent" {...rest}>
        <PauseCircleRounded style={{ width: "100%", height: "100%" }} />
      </IconButton>
    </span>
  ) : (
    <span
      className="amplitude-play"
      onClick={() => {
        playSong({ type: "RESUME_SONG" });
      }}>
      <IconButton variant="accent" {...rest}>
        <PlayCircleRounded style={{ width: "100%", height: "100%" }} />
      </IconButton>
    </span>
  );
}
