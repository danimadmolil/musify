import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, useTheme, Box, Slider } from "@mui/material";
import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import Home from "./Home/Home";
import Footer from "../../components/Footer/Footer";
import RecentSongPage from "../../pages/Index/RecentSongs/RecentSong.page";
import AlbumsPage from "./Albums/Albums.page";
import Header from "../../components/Header/Header";
import Favorites from "./Favorites/Favorites.page";
import AlbumPage from "./Albums/Album.page";
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
          overflow: "hidden !important",
          background: (theme) => theme.palette.backgrounds["900"],
          height: "100%",
          [theme.breakpoints.up("md")]: {
            flexBasis: "20% !important",
            maxWidth: "100%",
          },
          [theme.breakpoints.down("md")]: {
            flexBasis: "0%",
            maxWidth: "100%",
          },
        }}>
        <SideBarMenu />
      </Grid>

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
          backgroundColor: (theme) => theme.palette.backgrounds.default,
          height: "100%",
          overflow: "hidden !important",
          [theme.breakpoints.up("md")]: {
            flexBasis: "80% !important",
            maxWidth: "100%",
          },
          [theme.breakpoints.down("md")]: {
            flexBasis: "100%",
            maxWidth: "100%",
          },
        }}>
        <Header />
        {/*  Content */}
        <Grid
          className="main__content"
          sx={{
            width: "100%",
            height: "calc(100% - 80px - 70px)",
            maxWidth: "100%",
            background: (theme) => theme.palette.backgrounds.default,
          }}>
          <Switch>
            <Route exact path="/recentSongs" component={RecentSongPage} />
            <Route exact path="/albums" component={AlbumsPage} />
            <Route path="/albums/:albumName">
              <AlbumPage />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route index component={Home} />
          </Switch>
        </Grid>
        {/*  Footer */}
        <Grid
          className="footer"
          sx={{ width: "100%", height: "80px", zIndex: 50 }}
          item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}
