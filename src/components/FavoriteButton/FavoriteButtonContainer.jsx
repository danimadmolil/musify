import React from "react";
import { connect } from "react-redux";
import FavoriteButton from "./FavoriteButton";
function FavoriteButtonContainer(props) {
  return <FavoriteButton {...props} />;
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  userNotAuthenticated: (error) => {
    dispatch({ type: "USER_NOT_AUTHENTICATED", payload: { error } });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButtonContainer);
