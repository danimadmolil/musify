import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 600,
      laptop: 900,
      desktop: 1200,
      tv: 1700,
    },
  },
  root: {
    backgroundColor: "black",
  },
  mixins: {},
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
  },
});

export default theme;
