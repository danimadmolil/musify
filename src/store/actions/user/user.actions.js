//constants
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

//actoin creators
/**
 *
 * @param {{emali:String,password:String}}  userLoginInfo - an Object contains user credentials to login {name,emlail,password}
 * @returns {Object} - action object
 */
export function userLoginRequest(userLoginInfo) {
  return {
    type: USER_LOGIN_REQUEST,
    payload: { userLoginInfo: JSON.stringify(userLoginInfo) },
  };
}
export function userLoginSuccess(user) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: { user },
  };
}
export function userLoginFailure(error) {
  return {
    type: USER_LOGIN_FAILURE,
    payload: { error },
  };
}

export function userSignupRequest(userSignupInfo) {
  return {
    type: USER_SIGNUP_REQUEST,
    payload: { userSignupInfo: JSON.stringify(userSignupInfo) },
  };
}
export function userSignupSuccess(user) {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: { user },
  };
}
export function userSignupFailure(error) {
  return {
    type: USER_SIGNUP_FAILURE,
    payload: { error },
  };
}
