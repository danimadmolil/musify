import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  enqueueSnackbar,
  closeSnackbar,
} from "../../actions/notistack/notistack.actions";
import { login, singUp } from "../../../services/api/api";
import { Button } from "@mui/material";
import {
  userCheckAuthFailure,
  userCheckAuthSuccess,
  userLoginFailure,
  userLoginSuccess,
  userLogoutFailure,
  userLogoutSuccess,
  userSignupFailure,
  userSignupSuccess,
  USER_CHECK_AUTH_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_SIGNUP_REQUEST,
} from "../../actions/user/user.actions";

export function* userSaga() {
  yield all([
    takeLatest(USER_LOGIN_REQUEST, userLoginRequest),
    takeLatest(USER_SIGNUP_REQUEST, userSingUpRequest),
    takeLatest(USER_CHECK_AUTH_REQUEST, userCheckAuthRequest),
    takeLatest(USER_LOGOUT_REQUEST, userLogoutRequestHandler),
  ]);
}
function* userLogoutRequestHandler(action) {
  try {
    const user = yield call(login, "", "signout");
    yield put(userLogoutSuccess({}));
    yield put(
      enqueueSnackbar({
        message: "SuccessFull logout",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(userLogoutFailure(error));
    yield put(
      enqueueSnackbar({
        message: "Failed to Logout, connection to server is lost",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
        },
      })
    );
  }
}
function* userCheckAuthRequest(action) {
  // try {
  //   const responseUser = yield call(login, "", "auth");
  //   console.log("##response", responseUser);
  //   const { email, name, lastName } = responseUser.user;
  //   const user = { email, name, lastName };
  //   console.log("##response before success", user);
  //   yield put(userCheckAuthSuccess({ user: user }));
  //   console.log("##response after success", user);
  // } catch (error) {
  //   console.log("##response error", error);
  //   yield put(userCheckAuthFailure(error));
  //   yield put(
  //     enqueueSnackbar({
  //       message: "You are not Authenticated",
  //       options: {
  //         key: new Date().getTime() + Math.random(),
  //         variant: "warning",
  //       },
  //     })
  //   );
  // }
}
function* userLoginRequest(action) {
  try {
    const { userLoginInfo } = action.payload;
    const user = yield call(login, userLoginInfo, "signin");
    yield put(userLoginSuccess(user));
    yield put(
      enqueueSnackbar({
        message: "Login SuccessFull",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(userLoginFailure(error));
    yield put(
      enqueueSnackbar({
        message: "Failed to Login",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
        },
      })
    );
  }
}
function* userSingUpRequest(action) {
  try {
    const { userSignupInfo } = action.payload;
    const user = yield call(singUp, userSignupInfo, "signup");
    yield put(userSignupSuccess(user));
  } catch (error) {
    yield put(userSignupFailure(error));
  }
}
