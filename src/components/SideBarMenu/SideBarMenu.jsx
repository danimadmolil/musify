import React, { useEffect, useState, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/material";
const ListItemIconWithTheme = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.backgrounds.light.main,
}));
const ButtonIconWithTheme = styled(IconButton)(({ theme }) => ({
  color: theme.palette.backgrounds.light.main,
}));
const ListItemTextWithTheme = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.backgrounds.light.main,
}));
function NestedList() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: (theme) => theme.palette.backgrounds.light["700"],
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Musify
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
          <ExpandLess sx={{ color: "white" }} />
        ) : (
          <ExpandMore sx={{ color: "white" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemTextWithTheme primary="playlist 1" />
            <ButtonIconWithTheme>
              <PlayArrowIcon />
            </ButtonIconWithTheme>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
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
      <NestedList />;
    </div>
  );
}
