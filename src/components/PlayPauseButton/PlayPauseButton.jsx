import React from "react";
import { IconButton } from "@mui/material";
import { PlayCircleRounded, PauseCircleRounded } from "@mui/icons-material";
import {
  playSong as playSongAction,
  pauseSong as pauseSongAction,
} from "../../store/actions/songs/songs.actions";
import { pause, resume } from "../../utils/amplitudejs/amplitude.utils";
export default function PlayPauseButton({
  playingSong,
  playSong,
  pauseSong,
  ...rest
}) {
  return playingSong.isPlaying && playingSong.url ? (
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
