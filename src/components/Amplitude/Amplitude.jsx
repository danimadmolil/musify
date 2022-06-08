// create functional component to initialize amplitudejs
import React, { useState, useEffect } from "react";
import {
  initAmplitude,
  addPlaylist,
  addSongToPlaylist,
} from "../../utils/amplitudejs/amplitude.utils";
import { connect } from "react-redux";
function Amplitude({ playlists }) {
  console.log("amplitude render ==========", playlists);
  useEffect(() => {
    initAmplitude();
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
