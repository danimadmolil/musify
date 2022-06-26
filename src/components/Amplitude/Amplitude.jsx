// create functional component to initialize amplitudejs
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  initAmplitude,
  addPlaylist,
  addSongToPlaylist,
  getAmplitude,
} from "../../utils/amplitudejs/amplitude.utils";
import { playPlaylist } from "../../store/actions/playlist/playlist.action";
import { connect } from "react-redux";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
function Amplitude({ playlists }) {
  console.log("amplitude render ==========", playlists);
  const dispatch = useDispatch();
  useEffect(() => {
    initAmplitude();
    getAmplitude().getConfig().callbacks["prev"] = function () {
      const amp = getAmplitude();
      if (!!getAmplitude().getActivePlaylist()) {
        setTimeout(() => {
          const activePlaylist =
            amp.getConfig().playlists[amp.getActivePlaylist()];
          console.log("active playlist", activePlaylist);
          dispatch(playPlaylist(activePlaylist));
        }, 200);
      }
    };
    getAmplitude().getConfig().callbacks["next"] = function () {
      const amp = getAmplitude();
      if (!!getAmplitude().getActivePlaylist()) {
        setTimeout(() => {
          const activePlaylist =
            amp.getConfig().playlists[amp.getActivePlaylist()];
          console.log("active playlist", activePlaylist);
          dispatch(playPlaylist(activePlaylist));
        }, 200);
      }
    };
    getAmplitude().getConfig().callbacks["playlist_changed"] =
      function playlistChange(e) {
        const amp = getAmplitude();
        setTimeout(() => {
          const activePlaylist =
            amp.getConfig().playlists[amp.getActivePlaylist()];
          console.log("active playlist", activePlaylist);
          dispatch(playPlaylist(activePlaylist));
        }, 200);
      };
    getAmplitude().getConfig().callbacks["canplay"] = function () {
      dispatch({ type: "CAN_PLAY_SONG" });
    };
  }, []);
  useEffect(() => {
    console.log("add to playlists");
    if (playlists) {
      Object.keys(playlists).forEach((playlistKey) => {
        console.log("Amplitude playlist");
        playlists[playlistKey].songs.forEach((song) => {
          addSongToPlaylist(song, playlistKey);
        });
      });
    }
  }, [playlists]);
  return <></>;
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Amplitude);
