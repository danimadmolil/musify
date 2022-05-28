import React from "react";
import { connect } from "react-redux";
import PlayPauseButton from "./PlayPauseButton";
export const PlayPauseButtonContainer = (props) => {
  return <PlayPauseButton {...props} />;
};

const mapStateToProps = (state) => ({
  playingSong: state.playingSong,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  playSong: (action) => dispatch(action),
  pauseSong: (action) => dispatch(action),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseButtonContainer);
