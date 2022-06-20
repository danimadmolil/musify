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
import SideBarMenuContainer from "../../components/SideBarMenu/SideBarMenuContainer";
import HeaderContainer from "../../components/Header/HeaderContainer";
export default function Index() {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      sx={{ width: "100vw", height: "100vh", margin: 0 }}>
      {/** sidebar */}

      <SideBarMenuContainer />

      {/**content right side */}
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
          transition: "padding 0.3s ease-in-out",
          willChange: "padding",

          paddingLeft: "20vw",
          backgroundColor: (theme) => theme.palette.backgrounds.default,
          height: "100%",
          overflow: "hidden !important",
          [theme.breakpoints.up("md")]: {
            flexBasis: "100% !important",
            maxWidth: "100%",
          },
          [theme.breakpoints.down("md")]: {
            flexBasis: "100%",
            maxWidth: "100%",
            paddingLeft: 0,
          },
        }}>
        <HeaderContainer />
        {/*  Content */}
        <Grid
          className="main__content"
          sx={{
            width: "100%",
            height: "calc(100%  - 70px)",
            maxWidth: "100%",
            paddingBottom: "80px",
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
          sx={{
            width: "100%",
            height: "80px",
            zIndex: 50,
            position: "fixed",
            left: 0,
            bottom: 0,
            paddingLeft: 0,
            [theme.breakpoints.up("md")]: {
              paddingLeft: "20vw",
            },
          }}
          item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}
