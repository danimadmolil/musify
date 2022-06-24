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
  Badge,
} from "@mui/material";
import { PlayArrow, Delete } from "@mui/icons-material";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { useAuth0 } from "@auth0/auth0-react";
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
  getPlaylists,
  playButton = true,
  deleteButton = true,
  clickHandler,
  removePlaylist,
  countBadge = false,
  addToPlaylist,
}) {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const jwt = await getAccessTokenSilently();
        getPlaylists({ jwt });
      }
      console.log('user',user)
    })();
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
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              typeof clickHandler === "function" &&
                clickHandler(playlists[playlistName]);
            }}>
            <ListItemTextWithTheme primary={playlistName} />
            {countBadge === true && (
              <Badge
                color="secondary"
                badgeContent={playlists[playlistName].songs.length}>
                <LibraryMusicRoundedIcon
                  sx={{ color: "typography.secondary" }}
                />
              </Badge>
            )}

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
  getPlaylists: async (payload) => {
    dispatch(getPlaylistsAction(payload));
  },
  removePlaylist: (playlistId) => dispatch(removePlaylistAction(playlistId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
