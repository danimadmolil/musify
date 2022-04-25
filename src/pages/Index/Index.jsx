import React from "react";
import { Grid, useTheme } from "@mui/material";
import Home from "./Home/Home";
export default function Index() {
  const theme = useTheme();
  const options = {
    seeked: true,
    drag: true,
    mode: "dark",
    autoPlay: true,
    showPlay: true,
  };
  return (
    <Grid
      container
      direction="row"
      sx={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Grid
        item
        className="side_bar"
        mobile={0}
        tablet={3}
        laptop={3}
        desktop={2}
        sx={{
          background: "tomato",
          height: "100%",
          [theme.breakpoints.up("tv")]: {
            flexBasis: "20% !important",
            maxWidth: "100%",
          },
        }}></Grid>
      <Grid
        item
        container
        direction="column"
        className="main"
        mobile={12}
        tablet={9}
        laptop={9}
        desktop={10}
        sx={{
          height: "100%",
          overflow: "hidden !important",
          [theme.breakpoints.up("tv")]: {
            flexBasis: "80% !important",
            maxWidth: "100%",
          },
        }}>
        <Grid
          className="main__content"
          sx={{
            width: "100%",
            height: "calc(100% - 80px)",
            maxWidth: "100%",
            background: "yellowgreen",
          }}>
          <Home />
        </Grid>
        <Grid
          className="footer"
          sx={{ width: "100%", height: "80px", background: "orange" }}
          item></Grid>
      </Grid>
    </Grid>
  );
}
