import {
  Box,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../assets/images/1.jpg";
import { useDispatch } from "react-redux";
import { userLogoutRequest } from "../../store/actions/user/user.actions";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function AuthButtons({ user = {}, profile = defaultProfile }) {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }
  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }
  const theme = useTheme();
  return user.isLoading === false && user.email === undefined ? (
    <Grid container style={{ width: 300 }}>
      <Grid item sm="6" md="6" lg="6" xl="6">
        <Button component="a">
          <Link style={theme.mixins.Link} to="signin">
            SignIn
          </Link>
        </Button>
      </Grid>
      <Grid>
        <Button color="success" sm="6" md="6" lg="6" xl="6">
          <Link style={theme.mixins.Link} to="signup">
            SignUp
          </Link>
        </Button>
      </Grid>
    </Grid>
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
