import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getPlaylists as getPlaylistsAction,
  removePlaylist as removePlaylistAction,
} from "../../store/actions/playlist/playlist.action";
import {
  addPlaylist,
  playPlaylistSongAtIndex,
} from "../../utils/amplitudejs/amplitude.utils";
import {
  List,
  ListItemButton,
  ListItemIcon,
  IconButton,
  ListItemText,
  styled,
} from "@mui/material";
import { PlayArrow, Delete } from "@mui/icons-material";
const ListItemIconWithTheme = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
const ButtonIconWithTheme = styled(IconButton)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
const ListItemTextWithTheme = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
function Playlists({
  playlists,
  user,
  getPlaylists,
  playButton = true,
  deleteButton = true,
  onClick,
  removePlaylist,
}) {
  useEffect(() => {
    getPlaylists();
  }, [user]);
  useEffect(() => {
    if (playlists) {
      Object.keys(playlists).forEach((playlistKey) => {
        addPlaylist(playlists[playlistKey]);
      });
    }
  }, [playlists]);
  return (
    <List component="div" disablePadding>
      {playlists &&
        Object.keys(playlists).map((playlistName) => (
          <ListItemButton sx={{ pl: 4 }} onClick={onClick}>
            <ListItemTextWithTheme primary={playlistName} />
            {deleteButton && (
              <ButtonIconWithTheme
                onClick={() => {
                  removePlaylist(playlists[playlistName].id);
                }}
                aria-label="upload picture"
                component="span">
                <Delete />
              </ButtonIconWithTheme>
            )}
            {playButton ? (
              <span
                onClick={() => {
                  playPlaylistSongAtIndex(0, playlistName);
                }}
                className="amplitude-play"
                data-amplitude-playlist={playlistName}>
                <ButtonIconWithTheme>
                  <PlayArrow />
                </ButtonIconWithTheme>
              </span>
            ) : undefined}
          </ListItemButton>
        ))}
    </List>
  );
}
const mapStateToProps = (state, ownProps) => ({
  playlists: state.playlists.data,
  user: state.user,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getPlaylists: () => dispatch(getPlaylistsAction()),
  removePlaylist: (playlistId) => dispatch(removePlaylistAction(playlistId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
