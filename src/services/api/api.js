import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_DEVELOPMENT_API;
export function getAll(resource, options = {}) {
  return axios(`${API_URL}/${resource}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
/**
 *
 * @param {*} userLoginIfo
 * @param {"String"} path - login api path, default to "/auth/login"
 * @returns
 */
export function login(userLoginIfo, path = "/auth/login") {
  path = path.startsWith("/") ? path : `/${path}`;
  return axios(`${API_URL}${path}`, {
    method: "post",
    body: userLoginIfo,

    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log("Response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
}
/**
 * @param {*} userRegisterInfo
 * @param {"String"} path - register api path, default to "/auth/register"
 * @returns
 * @memberof API
 * @example
 * */
export function singUp(userSingUpInfo, path = "/auth/register") {
  path = path.startsWith("/") ? path : `/${path}`;
  return axios(`${API_URL}/${path}`, {
    method: "post",
    body: userSingUpInfo,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log("Response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
}
export function toggleFavoriteRequest(songId) {
  return axios(`${API_URL}/toggleFavoriteSong`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
  }).then((res) => {
    return res.data;
  });
}
export function createRequest(path, data = {}, options = {}) {
  path = path.startsWith("/") ? path : `/${path}`;
  if (options.method === "get") {
    return axios(`${API_URL}${path}`, {
      method: options.method || "post",
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } else {
    return axios(`${API_URL}${path}`, {
      method: options.method || "post",
      headers: { "Content-Type": "application/json", ...options.headers },
      data: { ...data },
    });
  }
}
export function createGetRequest(path, options = {}) {
  path = path.startsWith("/") ? path : `/${path}`;
  return axios(`${API_URL}${path}`, { method: "get", ...options })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      throw { error: `failed to get request on ${API_URL}${path}` };
    });
}
