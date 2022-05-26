import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  
  root: {
    backgroundColor: "black",
  },
  mixins: {
    Header: {
      width: "100%",
      height: "40px",
      backgroundColor: "gray",
      display: "flex",
    },
    Link: {
      color: "yellowgreen",
      textDecoration: "none",
    },
    stickToTop: {
      top: 0,
    },
    fixed: {
      position: "fixed",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#1ed75f",
      900: "#007900",
      800: "#009913",
      700: "#00ab24",
      600: "#00be32",
      500: "#00ce3c",
      300: "#60e07e",
      200: "#96e8a5",
      100: "#c1f1c9",
      50: "#e5fae9",
    },
    secondary: {
      main: "#ffc200",
      900: "#ffc200",
      800: "#ffc200",
      700: "#ffc200",
      600: "#ffc200",
      500: "#ffc200",
      200: "#ffc200",
      300: "#ffc200",
      400: "#ffc200",
      100: "#ffc200",
      50: "#ffc200",
    },
    success: {
      main: "#34e904",
    },
    light: { main: "#ffffff" },
  },
});

export default theme;
