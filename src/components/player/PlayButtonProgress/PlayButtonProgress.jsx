import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PauseCircleRounded } from "@mui/icons-material";
import { CircularProgress, Box } from "@mui/material";
import styled from "styled-components";
import { PlayCircleRounded } from "@mui/icons-material";
import {
  getSongPlayedPercentage,
  resume,
  pause,
  playNow,
  getActiveSongMetadata,
  getAmplitude,
} from "../../../utils/amplitudejs/amplitude.utils";
const PauseButton = styled(PauseCircleRounded).attrs({
  classes: { root: "song_pause_button" },
})`
  opacity: 1;
  font-size: 50px;
  color: #00ff3ed4;
  transition: all 0.3s;
  will-change: all;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const PlayButton = styled(PlayCircleRounded).attrs((props) => ({
  onClick: props.onClick,
  classes: { root: "play_button_rounded" },
}))`
  width: 100%;
  height: 100%;
  opacity: 0;
  font-size: 50px;
  color: #00ff3ed4;
  transition: all 0.3s;
  will-change: all;
  position: absolute;
  transform-origin: center center;
  cursor: pointer;
`;
const PauseContainer = styled(Box).attrs((props) => ({
  onClick: props.onClick,
  classes: { root: "pause_button_container" },
}))`
  width: 50px;
  height: 50px;
  opacity: 0;
  font-size: 50px;
  color: #00ff3ed4;
  transition: all 0.3s;
  will-change: all;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: scale(0.5) translate(50%, 30%);
  transform-origin: center center;
  cursor: pointer;
`;
const Amplitude = getAmplitude();
export default React.memo(
  function PlayButtonProgress({
    song,
    isPlaying,
    isEnded,
    playState,
    playingSong,
    ...rest
  }) {
    if (process.env.NODE_ENV === "development") {
      console.log("Rerender============================");
      console.log("Rerender song", song.id);
      console.log("=============================Rerender");
    }
    const dispatch = useDispatch();
    let [progress, setProgress] = useState(0);
    useEffect(() => {
      setInterval(() => {
        let activeSong = getActiveSongMetadata();
        if (activeSong.id === song.id && activeSong.name === song.name) {
          setProgress(getSongPlayedPercentage());
        }
      }, 1000);
    }, []);
    useEffect(() => {
      if (song.id !== playingSong.id) {
        setProgress(0);
      }
    }, [playingSong]);
    useEffect(() => {
      let activeSong = getActiveSongMetadata();

      if (activeSong.id !== song.id && activeSong.name !== song.name) {
        if (playState === "ended") {
          setProgress(0);
        }
      }
    }, [isPlaying]);
    return (
      <PauseContainer className={"pause_container"} {...rest}>
        {getActiveSongMetadata().id === song.id && isPlaying ? (
          <span
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 999999999,
            }}
            className="amplitude-play"
            onClick={() => {
              let activeSong = getActiveSongMetadata();

              if (activeSong.id === song.id && activeSong.name === song.name) {
                pause();
                dispatch({ type: "PAUSE_SONG" });
              }
            }}>
            <PauseButton
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "-1",
              }}
            />
          </span>
        ) : (
          <span
            className="amplitude-pause"
            style={{ zIndex: 99999999 }}
            onClick={() => {
              let activeSong = getActiveSongMetadata();
              let playerState = Amplitude.getPlayerState();
              if (
                playerState === "stopped" ||
                (activeSong.id !== song.id && activeSong.name !== song.name)
              ) {
                playNow(song);
                // dispatch({ type: "SONG_ENDED" });
                dispatch({ type: "PLAY_SONG", payload: { music: song } });
                Amplitude.getConfig().callbacks.ended = () => {
                  dispatch({ type: "SONG_ENDED", payload: { music: song } });
                  setProgress(0);
                };
                Amplitude.getConfig().callbacks.stop = () => {
                  dispatch({ type: "SONG_ENDED", payload: { music: song } });
                  setProgress(0);
                };
              }
              if (activeSong.id === song.id && activeSong.name === song.name) {
                resume();
                dispatch({ type: "RESUME_SONG" });
              }
            }}>
            <PlayCircleRounded
              style={{ width: "100%", height: "100%", zIndex: "-1" }}
            />
          </span>
        )}

        <CircularProgress
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: "-1",
          }}
          variant="determinate"
          value={
            getActiveSongMetadata().id === song.id
              ? playState === "playing" || playState === "paused"
                ? progress
                : 0
              : 0
          }></CircularProgress>
      </PauseContainer>
    );
  },
  (prevProps, nextProps) => {
    const song = prevProps.song;
    const { id, name, url, isPlaying, ended } = prevProps.playingSong;
    const {
      id: pId,
      name: pName,
      url: pUrl,
      isPlaying: pIsPlaying,
      ended: pEnded,
    } = nextProps.playingSong;

    if (song.id === pId && song.name === pName) {
      return false;
    } else if (song.id === id) {
      return false;
    } else {
      return true;
    }
  }
);
