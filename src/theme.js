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
  palette: {
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
      main: "#606060",
      900: "#3c3c3c",
      800: "#606060",
      700: "#818181",
      600: "#979797",
      500: "#c2c2c2",
      200: "#f5f5f5",
      300: "#f0f0f0",
      400: "#dedede",
      100: "#fafafa",
      50: "#fafafa",
    },
  },
});

export default theme;
