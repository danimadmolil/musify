const theme = {
  root: {
    backgroundColor: "black",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "rounded-button" },
          style: {
            borderRadius: 48,
            minWidth: 100,
          },
        },
      ],
      styleOverrides: {
        root: (props) => ({
          backgroundColor: props.background,
          ":hover": {
            backgroundColor: props.hoverColor,
          },
        }),
      },
    },
    
    MuiLink: {
      styleOverrides: {
        root: (props) => ({
          color: props.color,
        }),
      },
    },
  },
  mixins: {
    Header: {
      width: "100%",
      height: "40px",
      backgroundColor: "gray",
      display: "flex",
    },
    Link: {
      color: "white",
      textDecoration: "none",
    },
    stickToTop: {
      top: 0,
    },
    fixed: {
      position: "fixed",
    },
  },
};

export default theme;
