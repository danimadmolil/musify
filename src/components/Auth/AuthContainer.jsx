import React from "react";
import { connect } from "react-redux";
import Auth from "./Auth";
import { useHistory } from "react-router-dom";
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
