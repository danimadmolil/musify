import React, { useEffect, useState, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import Playlists from "../Playlists/Playlists";
import {
  Grid,
  Collapse,
  ListItemText,
  Box,
  List,
  ListItemIcon,
  IconButton,
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import { InboxIcon, SendIcon, LibraryMusicIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LyricsIcon from "@mui/icons-material/Lyrics";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import StarBorder from "@mui/icons-material/StarBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { openDialog } from "../../store/actions/dialog/dialog.actions";
import { CREATE_PLAYLIST } from "../../constants/dialogTypes";
import { Link } from "react-router-dom";
const ListItemIconWithTheme = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
const ButtonIconWithTheme = styled(IconButton)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
const ListItemTextWithTheme = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
function NestedList({ dispatch }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: (theme) => theme.palette.backgrounds["800"],
            }}
            component="div"
            id="nested-list-subheader">
            <Grid container item alignItems="center">
              <ListItemIconWithTheme>
                <LyricsIcon
                  sx={{ color: (theme) => theme.palette.typography.secondary }}
                />
              </ListItemIconWithTheme>
              <Typography
                sx={{
                  color: (theme) => theme.palette.typography.secondary,
                  textAlign: "center",
                }}
                variant="h4">
                Musify
              </Typography>
            </Grid>
          </ListSubheader>
        }>
        <ListItemButton>
          <ListItemIconWithTheme>
            <HomeIcon />
          </ListItemIconWithTheme>
          <ListItemTextWithTheme primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIconWithTheme>
            <PodcastsIcon />
          </ListItemIconWithTheme>
          <ListItemTextWithTheme primary="Podcast" />
        </ListItemButton>
        <ListItemButton>
          <Link
            to="/favorites"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              position: "absolute",
            }}></Link>
          <ListItemIconWithTheme>
            <FavoriteIcon />
          </ListItemIconWithTheme>
          <ListItemTextWithTheme primary="Favorites" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIconWithTheme>
            <FeaturedPlayListIcon />
          </ListItemIconWithTheme>
          <ListItemTextWithTheme primary="Playlists" />
          <>
            {open ? (
              <ExpandLess
                sx={{ color: (theme) => theme.palette.typography.secondary }}
              />
            ) : (
              <ExpandMore
                sx={{ color: (theme) => theme.palette.typography.secondary }}
              />
            )}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openDialog(CREATE_PLAYLIST));
              }}>
              <AddIcon sx={{ color: "typography.secondary" }} />
            </IconButton>
          </>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Playlists countBadge={true} />
        </Collapse>
      </List>
    </Box>
  );
}

export default function SideBarMenu() {
  const scrollContainer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    Scrollbar.init(scrollContainer.current, {
      alwaysShowTracks: true,
      clip: true,
    });
  }, []);
  return (
    <div
      ref={scrollContainer}
      style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      <NestedList dispatch={dispatch} />
    </div>
  );
}
