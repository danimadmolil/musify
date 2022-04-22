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
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./store/reduxStore";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
