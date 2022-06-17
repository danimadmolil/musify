import React from "react";
import { connect } from "react-redux";
import ControlButtons from "./ControlButtons";
export const ControlButtonsContainer = ({ playingPlaylist, playingSong }) => {
  console.log("controlButtonContainer", playingPlaylist);
  console.log("controlButtonContainer", playingSong);
  function getRepeat() {
    if (playingPlaylist && playingPlaylist.repeat === true) {
      return true;
    } else if (playingPlaylist && playingPlaylist.repeat === false) {
      return false;
    }
    if (playingSong.repeat === true) {
      return true;
    } else {
      return false;
    }
  }
  console.log("controlButtonContainer", getRepeat());
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
      playingSong={playingSong}
      repeatButton={getRepeat()}
    />
  );
};
const mapStateToProps = (state) => ({
  playingPlaylist: state.playlists && state.playlists.playingPlaylist,
  playingSong: state.playingSong,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlButtonsContainer);
