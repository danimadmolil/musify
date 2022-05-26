import React from "react";
import { connect } from "react-redux";
import PlayButtonProgress from "./PlayButtonProgress";
export const PlayButtonProgressContainer = (props) => {
  return <PlayButtonProgress {...props} />;
};

const mapStateToProps = (state, ownProps) => ({
  playingSong: state.playingSong,
  isPlaying:
    ownProps.song.url === state.playingSong.url
      ? state.playingSong.isPlaying
      : false,
  isEnded: state.playingSong.ended,
  playState: state.playingSong.playState,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayButtonProgressContainer);
