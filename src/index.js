import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/es/map";
import "core-js/es/set";
import "raf/polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/reduxStore";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="musify-auth-service.eu.auth0.com"
      clientId="wo1ZaafEhnz7SFbUbOnIaMO0L1ixXRD6"
      redirectUri={window.location.origin}
      audience="musflix-auth-express-api"
      scope="openid profile email">
      <App />
    </Auth0Provider>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
