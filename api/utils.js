const axios = require("axios");
async function getUserByJwt(req) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const response = await axios.get(
      "https://musify-auth-service.eu.auth0.com/userinfo",
      { headers: { authorization: `Bearer ${token}` } }
    );
    const userInfo = response.data;
    return userInfo;
  } catch (e) {
    return null;
  }
}
function getUserFromDb(user, db) {
  return db.get("users").find({ email: user.email, name: user.name }).value();
}
function getUserPlaylists(userId, db) {
  return db
    .get("user_playlist")
    .value()
    .filter((up) => up.userId === userId)
    .map((up) => db.get("playlists").find({ id: up.playlistId }).value())
    .map((playlist) => ({
      ...playlist,
      songs: db
        .get("playlist_song")
        .value()
        .filter((ps) => ps.playlistId === playlist.id)
        .map((ps) =>
          db
            .get("songs")
            .value()
            .filter((song) => ps.songId === song.id)
            .flat()
        )
        .flat(),
    }));
}
function getUerFavoriteSongs(db, user) {
  const { id: userId } = user;
  let favoriteSongs = db
    .get("favoriteSongs")
    .filter((favSong) => favSong.userId === userId)
    .map((favSong) => ({
      ...db.get("songs").find({ id: favSong.songId }).value(),
    }))
    .value();
  return favoriteSongs;
}
function mapArrayToObject(arr, key) {
  return arr.reduce((ac, next) => {
    if (typeof next === "object") {
      ac[next[key]] = next;
      return ac;
    } else {
      throw Error(
        `each item of array that you want map to object should be an object with key of ${key} on it`
      );
    }
  }, {});
}

module.exports = {
  getUserByJwt,
  getUserFromDb,
  getUserPlaylists,
  mapArrayToObject,
  getUerFavoriteSongs,
};
