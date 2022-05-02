import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_CHECK_AUTH_SUCCESS,
  USER_CHECK_AUTH_FAILURE,
  USER_CHECK_AUTH_REQUEST,
} from "../../actions/user/user.actions";
const userReducerInitialState = {};
export default function userReducer(state = userReducerInitialState, action) {
  if (action.type === USER_LOGIN_REQUEST) {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      error: null,
      accessToken: action.payload.user.accessToken,
      ...action.payload.user.user,
    };
  }
  if (action.type === USER_LOGIN_FAILURE) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
    };
  }
  if (action.type === USER_SIGNUP_REQUEST) {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }
  if (action.type === USER_SIGNUP_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  }
  if (action.type === USER_SIGNUP_FAILURE) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
    };
  }
  if (action.type === USER_CHECK_AUTH_REQUEST) {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }
  if (action.type === USER_CHECK_AUTH_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      error: null,
      ...action.payload.user.user,
    };
  } else if (action.type === USER_CHECK_AUTH_FAILURE) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
    };
  } else if (action.type === USER_LOGOUT_REQUEST) {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  } else if (action.type === USER_LOGOUT_SUCCESS) {
    return {
      isLoading: false,
      error: null,
    };
  } else if (action.type === USER_LOGOUT_FAILURE) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
    };
  }

  return state;
}
