import {
  Box,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Tooltip,
  Link as MuiLink,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { LoginSharp, AppRegistrationRounded } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../assets/images/4.jpg";
import { useDispatch } from "react-redux";
import { userLogoutRequest } from "../../store/actions/user/user.actions";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function AuthButtons({ user = {}, profile = defaultProfile }) {
  console.log("user rerendered ", user);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }
  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }
  const theme = useTheme();
  return user.isLoading === false && !!user.name === false ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem key={"signin"}>
          <Link
            to="/signin"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 100,
            }}></Link>
          <Typography textAlign="center">Sign In</Typography>
        </MenuItem>
        <MenuItem key={"signup"}>
          <Link
            to={"/signup"}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 100,
            }}></Link>
          <Typography textAlign="center">Sign Up</Typography>
        </MenuItem>
      </Menu>
    </Box>
  ) : user.isLoading === true ? (
    <CircularProgress />
  ) : (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={profile} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => {
              if (setting === "Logout") {
                dispatch(userLogoutRequest());
              }
              handleCloseUserMenu();
            }}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
