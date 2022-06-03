import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPlaylists as getPlaylistsAction } from "../../store/actions/playlist/playlist.action";
import {
  List,
  ListItemButton,
  ListItemIcon,
  IconButton,
  ListItemText,
  styled,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
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
  onClick,
}) {
  useEffect(() => {
    getPlaylists();
  }, [user]);
  return (
    <List component="div" disablePadding>
      {playlists &&
        Object.keys(playlists).map((playlistName) => (
          <ListItemButton sx={{ pl: 4 }} onClick={onClick}>
            <ListItemTextWithTheme primary={playlistName} />
            {playButton ? (
              <ButtonIconWithTheme>
                <PlayArrow />
              </ButtonIconWithTheme>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
