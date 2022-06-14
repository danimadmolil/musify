/**
 * @param {T} mapObject - an object that it's keys need to be mapped
 * @param {(Object)} mapKeys - an object that it keys is the old keys of mapObject and its values is tha new keys of mapObject
 * @return {Object} return a mapped song object
 */

export default function objectMapper(mapObject = {}, mapKeys = {}) {
  const song = {};
  mapObject = { ...mapObject };
  Object.keys(mapKeys).forEach((key) => {
    song[mapKeys[key]] = mapObject[key];
    delete mapObject[key];
  });
  return { ...mapObject, ...song };
}
