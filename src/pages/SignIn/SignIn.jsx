import * as React from "react";
import { connect } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../store/actions/user/user.actions";
import { useHistory } from "react-router-dom";
function SignIn({ user = {} }) {
  const history = useHistory();
  if (user.email && user.name) {
    console.log("useEffect push to history");
    history.push("/");
  }
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const userLoginData = new FormData(event.currentTarget);
    const userCredentials = {
      email: userLoginData.get("email"),
      password: userLoginData.get("password"),
    };
    dispatch(userLoginRequest(userCredentials));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Button startIcon={<KeyIcon />}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Button>
              <Button startIcon={<HomeIcon />}>
                <Link to="/" variant="body2">
                  {"go to home"}
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(SignIn);
