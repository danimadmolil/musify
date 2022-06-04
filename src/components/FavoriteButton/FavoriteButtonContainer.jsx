import React from "react";
import { connect } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import {
  enqueueSnackbar,
  closeSnackbar,
} from "../../store/actions/notistack/notistack.actions";
import { Button } from "@mui/material";
function FavoriteButtonContainer(props) {
  return <FavoriteButton {...props} />;
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  userNotAuthenticated: (error) => {
    dispatch({ type: "USER_NOT_AUTHENTICATED", payload: { error } });
    dispatch(
      enqueueSnackbar({
        message: "You Should Authenticated to this action. please singIn",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
          ),
        },
      })
    );
  },
  networkError: (error) => {
    dispatch(
      enqueueSnackbar({
        message: "Network connection is lost",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
          ),
        },
      })
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButtonContainer);
