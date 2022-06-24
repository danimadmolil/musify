import React, { useRef } from "react";
import Dialog from "./Dialog";
import Playlists from "../Playlists/Playlists";
import {
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
//import playlist action creators
import {
  ADD_TO_PLAYLIST,
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
import { useAuth0 } from "@auth0/auth0-react";

export const DialogContainer = ({
  open,
  dialogType,
  closeDialog,
  createPlaylistAction,
  conformation,
  addSongToPlaylist,
}) => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
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
            onClick={async () => {
              const jwt = await getAccessTokenSilently();
              createPlaylistAction(
                { name: playlistNameRef.current.value },
                { jwt }
              );
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
        <DialogContent>
          <Playlists
            deleteButton={false}
            playButton={false}
            clickHandler={(playlist) => {
              getAccessTokenSilently().then((jwt) => {
                addSongToPlaylist({ playlist, jwt });
              });
            }}
          />
        </DialogContent>
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
          onClick={async () => {
            const jwt = await getAccessTokenSilently();
            conformation({ jwt });
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
  createPlaylistAction: (playlist, payload) => {
    dispatch(createPlaylist(playlist, payload));
  },
  conformation: (payload) => {
    dispatch(userConfirm(payload));
  },
  addSongToPlaylist: (payload) => dispatch({ type: ADD_TO_PLAYLIST, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogContainer);
