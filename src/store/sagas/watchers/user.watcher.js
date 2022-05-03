import { takeLatest, call, put, all } from "redux-saga/effects";
import { login, singUp } from "../../../services/api/api";
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
  } catch (error) {
    yield put(userLogoutFailure(error));
  }
}
function* userCheckAuthRequest(action) {
  try {
    const responseUser = yield call(login, "", "auth");
    console.log("response", responseUser);
    const { email, name, lastName } = responseUser.user;
    const user = { email, name, lastName };
    yield put(userCheckAuthSuccess({ user: user }));
  } catch (error) {
    yield put(userCheckAuthFailure(error));
  }
}
function* userLoginRequest(action) {
  try {
    const { userLoginInfo } = action.payload;
    const user = yield call(login, userLoginInfo, "signin");
    yield put(userLoginSuccess(user));
  } catch (error) {
    yield put(userLoginFailure(error));
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
