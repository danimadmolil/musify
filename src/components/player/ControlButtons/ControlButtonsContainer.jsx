import React from "react";
import { connect } from "react-redux";
import ControlButtons from "./ControlButtons";
export const ControlButtonsContainer = ({ playingPlaylist }) => {
  return (
    <ControlButtons
      prevButton={
        playingPlaylist
          ? playingPlaylist.active_index !== 0
            ? "enable"
            : "disable"
          : "disable" //default state for prevButton
      }
      nextButton={
        playingPlaylist
          ? playingPlaylist.songs.length - 1 > playingPlaylist.active_index
            ? "enable"
            : "disable"
          : "disable" //default state for nextButton
      }
      playingPlaylist={playingPlaylist}
      repeatButton={playingPlaylist && playingPlaylist.repeat}
    />
  );
};
const mapStateToProps = (state) => ({
  playingPlaylist: state.playlists && state.playlists.playingPlaylist,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlButtonsContainer);
