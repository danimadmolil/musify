import React from "react";
import { Grid, useTheme, Box, Slider } from "@mui/material";
import Home from "./Home/Home";
import Footer from "../../components/Footer/Footer";
export default function Index() {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      sx={{ width: "100vw", height: "100vh", margin: 0 }}>
      {/** sidebar */}
      <Grid
        item
        className="side_bar"
        sm={0}
        md={3}
        lg={3}
        xl={2}
        sx={{
          background: "tomato",
          height: "100%",
          [theme.breakpoints.up("md")]: {
            flexBasis: "20% !important",
            maxWidth: "100%",
          },
          [theme.breakpoints.between("sm", "md")]: {
            flexBasis: "90",
            maxWidth: "100%",
          },
        }}></Grid>
      {/** main content */}
      <Grid
        item
        container
        direction="column"
        className="main"
        sm={12}
        md={9}
        lg={9}
        xl={10}
        sx={{
          height: "100%",
          overflow: "hidden !important",
          [theme.breakpoints.up("md")]: {
            flexBasis: "80% !important",
            maxWidth: "100%",
          },
          [theme.breakpoints.between("sm", "md")]: {
            flexBasis: "90",
            maxWidth: "100%",
          },
        }}>
        <Grid
          className="main__content"
          sx={{
            width: "100%",
            height: "calc(100% - 80px)",
            maxWidth: "100%",
            background: "#090909",
          }}>
          <Home />
        </Grid>
        <Grid
          className="footer"
          sx={{ width: "100%", height: "80px", background: "orange" }}
          item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}
