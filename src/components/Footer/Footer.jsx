import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CREATE_PLAYLIST } from "../../constants/dialogTypes";
import { openDialog } from "../../store/actions/dialog/dialog.actions";
import {
  Box,
  Slider,
  Stack,
  Grid,
  MenuItem,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import img from "./../../assets/images/5.jpg";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import {
  VolumeUp,
  VolumeDown,
  List as ListIcon,
  Fullscreen,
} from "@mui/icons-material";
import { bindElements } from "./../../utils/amplitudejs/amplitude.utils";
import PlayPauseButtonContainer from "../PlayPauseButton/PlayPauseButtonContainer";
import Playlists from "../Playlists/Playlists";
import ControlButtonsContainer from "../player/ControlButtons/ControlButtonsContainer";
import IconButtonWithTheme from "../IconButtonWithTheme/IconButtonWithTheme";
export default function Footer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let sliderRef = useRef(null);
  let volumeSlider = useRef(null);
  let volumeMuiSlider = useRef(null);
  const isMobile = useMediaQuery("@media only screen and (max-width:600px)");
  let [volume, setVolume] = useState(100);
  let slider = useRef(null);
  let [value, setValue] = useState(0);
  useEffect(() => {
    bindElements();
    slider.current.oninput = function (v) {
      setValue(v);
    };
    slider.current.onchange = function (v) {
      setValue(v);
    };
  }, []);
  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }
  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }
  function handleVolumeChange(e, newVolume) {
    volumeSlider.current.value = newVolume;
    setVolume(newVolume);
    if ("createEvent" in document) {
      var evt1 = document.createEvent("HTMLEvents");
      var evt2 = document.createEvent("HTMLEvents");
      evt1.initEvent("change", false, true);
      evt2.initEvent("input", false, true);
      volumeSlider.current.dispatchEvent(evt1);
      volumeSlider.current.dispatchEvent(evt2);
    } else {
      volumeSlider.current.fireEvent("input");
      volumeSlider.current.fireEvent("change");
    }
  }
  function handleChange(e, newValue) {
    slider.current.value = newValue;
    setValue(newValue);
    if ("createEvent" in document) {
      var evt1 = document.createEvent("HTMLEvents");
      var evt2 = document.createEvent("HTMLEvents");
      evt1.initEvent("change", false, true);
      evt2.initEvent("input", false, true);
      slider.current.dispatchEvent(evt1);
      slider.current.dispatchEvent(evt2);
    } else {
      slider.current.fireEvent("input");
      slider.current.fireEvent("change");
    }
  }
  return (
    <Grid
      lg={12}
      container
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: (theme) => theme.palette.backgrounds.secondary,
      }}>
      {/*song poster */}
      <Grid
        style={{
          height: "80px",
          padding: 0,
          margin: 0,
        }}
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
        sm={0}
        md={2}
        lg={2}
        xl={2}
        container
        item>
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}>
          <img
            data-amplitude-song-info="cover_art_url"
            style={{
              width: 70,
              height: "85%",
              margin: 0,
              borderRadius: 8,
            }}
            src={img}></img>
          <span style={{ color: "white" }}>hello</span>
        </div>
      </Grid>
      {/* slider and controls*/}
      <Grid
        className="song-slider"
        style={{ height: "100%", background: "transparent" }}
        item
        container
        xs={7}
        sm={8}
        md={7}
        lg={6}
        xl={8}
        alignItems={"center"}>
        {/*  controls*/}
        <Grid
          style={{ background: "transparent", height: 40 }}
          item
          container
          md={4}
          sm={12}
          justifyContent="center">
          <ControlButtonsContainer />
        </Grid>
        {/* slider */}
        <Grid
          sx={{ height: 40, background: "transparent" }}
          item
          container
          md={8}
          sm={12}
          lg={8}
          alignItems="center"
          justifyContent="center">
          <Box sx={{ width: 300, mt: 1 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center">
              <input
                style={{ display: "none" }}
                ref={slider}
                type="range"
                className="amplitude-song-slider"
                step=".1"
              />
              <span
                style={{ color: "white" }}
                className="amplitude-current-time"></span>
              <Slider
                onChange={handleChange}
                value={value}
                ref={sliderRef}
                aria-label="Temperature"
                defaultValue={0}
                sx={{ color: (theme) => theme.palette.accent.default }}
              />
              <span
                style={{ color: "white" }}
                className="amplitude-duration-time"></span>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* volume */}
      <Grid
        sx={{ mt: "12px" }}
        justifyContent="center"
        alignItems="center"
        xs={5}
        sm={4}
        md={3}
        lg={4}
        xl={2}
        item
        container>
        <Box style={{ width: "100%", background: "transparent" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1 }}
            alignItems="center"
            justifyContent="space-between">
            <Stack
              sx={{ width: 180 }}
              alignItems="center"
              direction={isMobile ? "column" : "row"}>
              <VolumeDown
                sx={{
                  color: (theme) => theme.palette.accent["700"],
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                }}
              />
              <input
                ref={volumeSlider}
                style={{ display: "none" }}
                value={volume}
                className="amplitude-volume-slider"
                type="range"
                step="0.1"
              />
              <Slider
                onChange={handleVolumeChange}
                value={volume}
                orientation={isMobile ? "horizontal" : "horizontal"}
                sx={{
                  color: (theme) => theme.palette.accent.default,
                }}
                size="small"
              />
              <VolumeUp
                sx={{
                  color: (theme) => theme.palette.accent["700"],
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                }}
              />
            </Stack>

            <Tooltip title="Open settings">
              <IconButtonWithTheme
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                }}>
                <ListIcon
                  sx={{
                    width: 30,
                    height: 30,
                    color: (theme) => theme.palette.accent.default,
                  }}
                />
              </IconButtonWithTheme>
            </Tooltip>
            <Menu
              id="menu-playlists"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <Playlists
                playButton={false}
                deleteButton={false}
                clickHandler={(playlist) =>
                  dispatch({
                    type: "ADD_TO_PLAYLIST",
                    payload: { playlist },
                  })
                }
              />
              <MenuItem onClick={() => dispatch(openDialog(CREATE_PLAYLIST))}>
                <Typography textAlign="center">Create New playlist</Typography>
              </MenuItem>
            </Menu>

            <IconButtonWithTheme>
              <Fullscreen
                sx={{
                  color: (theme) => theme.palette.accent.default,
                }}
              />
            </IconButtonWithTheme>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
