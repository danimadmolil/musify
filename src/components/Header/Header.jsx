import { Container, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import AuthContainer from "../Auth/AuthContainer";
import { Grid, Button } from "@mui/material";
import ThemeToggleSwitch from "../ThemeToggleSwith/ThemeToggleSitch";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  console.log("location", location);
  const theme = useTheme();
  let path = location.pathname;
  path = path.startsWith("/") && path.slice(1);
  let paths = path.split("/");
  let route = "";
  return (
    <Container
      sx={{
        ...theme.mixins.Header,
        backgroundColor: "transparent",
        paddingTop: "1rem",
        alignItems: "center",
        paddingBottom: 2,
      }}>
      <ThemeToggleSwitch />
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
      <Grid container sx={{ width: "100%" }} justifyContent="end">
        <Grid item justifySelf={"flex-end"}>
          <AuthContainer />
        </Grid>
      </Grid>
    </Container>
  );
}
