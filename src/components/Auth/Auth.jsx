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
    <Grid container style={{ width: 228 }}>
      <Grid
        item
        xs="6"
        sm="6"
        md="6"
        lg="6"
        xl="6"
        justifyContent="space-between"
        container
        item>
        <Button
          size="small"
          hoverColor="primary"
          variant="outlined"
          color="primary"
          component="a"
          endIcon={<LoginSharp sx={{ color: "white" }} />}>
          <Link style={theme.mixins.Link} to="signin">
            SignIn
          </Link>
        </Button>
      </Grid>
      <Grid>
        <Button
          size="small"
          background="blue"
          variant="rounded-button"
          hoverColor="#8686ff"
          endIcon={<AppRegistrationRounded sx={{ color: "white" }} />}
          color="success"
          xs="6"
          sm="6"
          md="6"
          lg="6"
          xl="6">
          <Link style={theme.mixins.Link} sx={{ color: "#6f223d" }} to="signup">
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
