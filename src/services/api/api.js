export const API_URL = "http://127.0.0.1:4001";
export function getAll(resource) {
  return fetch(`${API_URL}/${resource}`)
    .then((response) => response.json())
    .then((albums) => {
      return albums;
    });
}
