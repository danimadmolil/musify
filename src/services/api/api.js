export const API_URL = "http://127.0.0.1:4001";
export function getAll(resource) {
  return fetch(`${API_URL}/${resource}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
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
  return fetch(`${API_URL}${path}`, {
    method: "post",
    body: userLoginIfo,
    credentials: "include",
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
  return fetch(`${API_URL}/${path}`, {
    method: "post",
    body: userSingUpInfo,
    credentials: "include",
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
  return fetch(`${API_URL}/toggleFavoriteSong`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 401) {
      throw { status: 401, message: "unauthenticated" };
    }
    throw Error("ERROR");
  });
}
export function createRequest(path, data = {}, options = {}) {
  path = path.startsWith("/") ? path : `/${path}`;
  return fetch(`${API_URL}${path}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
    ...options,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 401) {
      throw { status: 401, message: "unauthenticated" };
    }
    throw { message: res.json() };
  });
}
export function createGetRequest(path, options = {}) {
  path = path.startsWith("/") ? path : `/${path}`;
  return fetch(`${API_URL}${path}`, { method: "get", ...options }).then(
    (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw { error: `failed to get request on ${API_URL}${path}` };
      }
    }
  );
}
