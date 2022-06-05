import React, { useRef } from "react";
import Dialog from "./Dialog";
import {
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
//import playlist action creators
import {
  createPlaylist,
  createPlaylistSuccess,
  createPlaylistFail,
  removePlaylist,
  removePlaylistSuccess,
  removePlaylistFail,
} from "../../store/actions/playlist/playlist.action";

import { connect } from "react-redux";
import {
  CREATE_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
  CONFORMATION,
} from "../../constants/dialogTypes";
import { userConfirm } from "../../store/actions/user/user.actions";
import { closeDialog } from "./../../store/actions/dialog/dialog.actions";

export const DialogContainer = ({
  open,
  dialogType,
  closeDialog,
  createPlaylistAction,
  conformation,
}) => {
  const playlistNameRef = useRef(null);
  if (dialogType === CREATE_PLAYLIST) {
    return (
      <Dialog open={open} closeDialog={closeDialog}>
        <DialogTitle>
          <Typography component={"h2"}>Create Playlist</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField inputRef={playlistNameRef} placeholder="playlist name" />
          <Button
            onClick={() => {
              createPlaylistAction({ name: playlistNameRef.current.value });
            }}
            type="success"
            sx={{ width: "100%", color: "typography.secondary" }}>
            <Typography sx={{ color: "typography.secondary" }}>
              Create
            </Typography>
          </Button>
        </DialogContent>
      </Dialog>
    );
  } else if (dialogType === ADD_SONG_TO_PLAYLIST) {
    return (
      <Dialog open={open} closeDialog={closeDialog}>
        <DialogTitle>
          <Typography component={"h2"}>ADD song to playlist</Typography>
        </DialogTitle>
      </Dialog>
    );
  } else if (dialogType === CONFORMATION) {
    return (
      <Dialog open={open} closeDialog={closeDialog}>
        <DialogTitle>
          <Typography component={"h2"}>Are You Shoure</Typography>
        </DialogTitle>
        <Button
          type="success"
          onClick={() => {
            conformation();
            closeDialog();
          }}>
          Ok
        </Button>
        <Button type="error" onClick={closeDialog}>
          Cancel
        </Button>
      </Dialog>
    );
  }
};

const mapStateToProps = (state) => ({
  open: state.dialog.open,
  dialogType: state.dialog.dialogType,
});

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => {
    dispatch(closeDialog());
  },
  createPlaylistAction: (playlist) => {
    dispatch(createPlaylist(playlist));
  },
  conformation: () => {
    dispatch(userConfirm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogContainer);
