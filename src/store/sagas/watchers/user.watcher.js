import { takeLatest, call, put, all } from "redux-saga/effects";
import { login, singUp } from "../../../services/api/api";
import {
  userLoginFailure,
  userLoginSuccess,
  userSignupFailure,
  userSignupSuccess,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
} from "../../actions/user/user.actions";

export function* userSaga() {
  yield all([
    takeLatest(USER_LOGIN_REQUEST, userLoginRequest),
    takeLatest(USER_SIGNUP_REQUEST, userSingUpHandler),
  ]);
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
function* userSingUpHandler(action) {
  try {
    const { userSignupInfo } = action.payload;
    const user = yield call(singUp, userSignupInfo, "signup");
    yield put(userSignupSuccess(user));
  } catch (error) {
    yield put(userSignupFailure(error));
  }
}
