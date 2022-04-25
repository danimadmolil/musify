export const API_URL = "http://127.0.0.1:4001";
export function getAll(resource) {
  return fetch(`${API_URL}/${resource}`, {
    method: "get",
    headers: { ContentType: "text/json" },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}
