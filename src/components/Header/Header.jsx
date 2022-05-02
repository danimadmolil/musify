import { Container, useTheme } from "@mui/material";
import React from "react";
import AuthContainer from "../Auth/AuthContainer";
import { Grid } from "@mui/material";
export default function Header() {
  const theme = useTheme();
  return (
    <Container
      sx={{
        ...theme.mixins.Header,
      }}>
      <Grid container sx={{ width: "100%" }} justifyContent="end">
        <Grid item justifySelf={"flex-end"}>
          <AuthContainer />
        </Grid>
      </Grid>
    </Container>
  );
}
