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
const ListItemIconWithTheme = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
const ButtonIconWithTheme = styled(IconButton)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
const ListItemTextWithTheme = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.typography.secondary,
}));
function NestedList() {
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
          {open ? (
            <ExpandLess
              sx={{ color: (theme) => theme.palette.typography.secondary }}
            />
          ) : (
            <ExpandMore
              sx={{ color: (theme) => theme.palette.typography.secondary }}
            />
          )}
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
      <NestedList />
    </div>
  );
}
