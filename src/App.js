import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Index from "./pages/Index/Index";
import { useDispatch } from "react-redux";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import "swiper/css";
import { initAmplitude } from "./utils/amplitudejs/amplitude.utils";
import { GET_ALLALBUMS_REQUEST } from "./store/actions/albums/albums.actions";
import {
  INIT_SONGS,
  GET_SONGS_REQUEST,
} from "./store/actions/songs/songs.actions";
import { userCheckAuthRequest } from "./store/actions/user/user.actions";
import themeCreator from "./utils/ThemeCreator/ThemeCreator";
const App = React.memo(
  function App({ themeMode }) {
    const dispatch = useDispatch();
    console.log("app theme mode", themeMode);
    useEffect(() => {
      dispatch(userCheckAuthRequest());
      initAmplitude();
    }, []);
    const themeCustom = themeCreator(themeMode, theme);
    console.log("theme", themeCustom);
    return (
      <div
        className="App"
        style={{ width: "100vw", height: "100vh", margin: 0 }}>
        <ThemeProvider theme={themeCustom}>
          <Router>
            <Switch>
              <Route path={"/"} exact component={Index} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.themeMode === nextProps.themeMode) {
      return true;
    }
    return false;
  }
);
const mapStateToProps = (state, ownProps) => ({
  themeMode: state.theme.themeMode,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(App);
