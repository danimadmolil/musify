import {
  Container,
  Stack,
  Typography,
  useTheme,
  Grid,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { MenuOpen, MenuOpenOutlined, MenuRounded } from "@mui/icons-material";
import React, { useEffect } from "react";
import AuthContainer from "../Auth/AuthContainer";
import ThemeToggleSwitch from "../ThemeToggleSwith/ThemeToggleSitch";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Header({ openSidebar, closeSidebar, sidebarState }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const notMobile = useMediaQuery((theme) => theme.breakpoints.up("md"));
  console.log("mobile", mobile);
  let path = location.pathname;
  path = path.startsWith("/") && path.slice(1);
  let paths = path.split("/");
  let route = "";
  useEffect(() => {
    if (mobile) {
      // dispatch(closeSidebar());
    } else if (notMobile) {
      // dispatch(openSidebar());
    }
  }, [mobile, notMobile]);
  return (
    <Container
      sx={{
        ...theme.mixins.Header,
        backgroundColor: "transparent",
        alignItems: "center",
      }}>
      <ThemeToggleSwitch />
      {/** BreadCrumb navigation*/}
      <Stack direction="row" alignItems={"center"} sx={{ height: 10 }}>
        {location.pathname !== "/" && (
          <Button size="small">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "accent.default" }}>Home</Typography>
            </Link>
          </Button>
        )}
        {paths.length >= 2 &&
          paths.map((path, i) => {
            route = route + "/" + path;
            return (
              <>
                <Typography sx={{ color: "accent.default" }}>/</Typography>
                <Button size="small">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={
                      route === location.pathname
                        ? { pathname: path, state: location.state }
                        : `${route}`
                    }>
                    <Typography sx={{ color: "accent.default" }}>
                      {path}
                    </Typography>
                  </Link>
                </Button>
              </>
            );
          })}
      </Stack>
      <Grid container sx={{ width: "100%" }} justifyContent="flex-end">
        <Grid item justifySelf={"flex-end"}>
          <AuthContainer />
        </Grid>
        {mobile === true ? (
          sidebarState === "open" ? null : (
            <IconButton onClick={() => openSidebar()}>
              <MenuRounded sx={{ color: "typography.light" }} />
            </IconButton>
          )
        ) : null}
      </Grid>
    </Container>
  );
}
