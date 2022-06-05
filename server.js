const jsonServer = require("json-server");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const constants = require("@danimadmolil/json-server-auth/dist/constants");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
var auth = require("@danimadmolil/json-server-auth");
const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  favoriteSongs: 600,
  // Other rules
});
server.use(jsonServer.bodyParser);
server.use(cookieParser());
server.use((req, res, next) => {
  if (req.cookies.authorization) {
    let [scheme, token] = req.cookies.authorization.split(" ");
    req.headers.authorization = "Bearer " + token;
  }
  res.set({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
  });
  next();
});
server.get("/allSongs", (req, res) => {
  const { db } = req.app;
  const user = getUserByCookie(req);
  let songsWithFavoriteFlag;
  if (user) {
    const userFavSongs = getUerFavoriteSongs(db, user);
    const favoriteSongIdexs = {};
    userFavSongs.forEach((song) => (favoriteSongIdexs[song.id] = true));
    const allSongs = db.get("songs").value();
    songsWithFavoriteFlag = allSongs.map((song) => ({
      ...song,
      favorite: favoriteSongIdexs[song.id] ? true : false,
    }));
    res.jsonp(songsWithFavoriteFlag);
    res.send();
  } else {
    res.jsonp(db.get("songs").value());
    res.send();
  }
});

server.db = router.db;
server.use(rules);
server.use(middlewares);
server.use(auth);
server.post("/createPlaylist", (req, res) => {
  const { db } = req.app;
  const user = getUserByCookie(req);
  console.log("user", user);
  if (user) {
    const { name } = req.body;
    let canCreatePlaylist = true;
    const userOwnedPlaylists = getUserPlaylists(db, user.id);
    userOwnedPlaylists.forEach((playlist) => {
      console.log(playlist.name === name);
      if (playlist.name === name) {
        canCreatePlaylist = false;
      }
    });
    if (canCreatePlaylist) {
      const playlist = db.get("playlists").insert({ name }).write();
      const userPlaylist = db
        .get("user_playlist")
        .insert({ userId: user.id, playlistId: playlist.id })
        .write();
      res.statusCode = 201;
      res.jsonp(playlist);
      res.send();
    }
    res.statusCode = 400;
    res.jsonp({ error: "playlist already exist" });
    res.send();
  }
  res.statusCode = 401;
  res.jsonp({ error: "you should be authentiacated to create playlist" });
  res.send();
});
server.post("/deletePlaylist", (req, res) => {
  const { db } = req.app;
  const user = getUserByCookie(req);
  if (user) {
    const { playlistId } = req.body;
    const { id: userId } = user;
    let isPlaylistDeletable = false;
    const userPlaylists = getUserPlaylists(db, user.id);
    userPlaylists.forEach((up) => {
      if (up.id === playlistId) {
        isPlaylistDeletable = true;
      }
    });
    if (isPlaylistDeletable) {
      const playlist = db.get("playlists").remove({ id: playlistId }).write();
      //delete pallist_songs
      const playlistSongs = db
        .get("playlist_song")
        .remove({ playlistId })
        .write();
      //delete user_palylists
      const userPlaylist = db
        .get("user_playlist")
        .remove({ playlistId, userId })
        .write();

      res.statusCode = 200;
      res.jsonp(getUserPlaylists(db, userId));
      res.send();
    } else {
      res.statusCode = 403;
      res.send();
    }
  }
});

server.post("/userFavoriteSongs", (req, res) => {
  let { db } = req.app;
  const user = getUserByCookie(req);
  const { id: userId } = user;
  let favoriteSongs = db
    .get("favoriteSongs")
    .filter((favSong) => favSong.userId === userId)
    .map((favSong) => ({
      ...db.get("songs").find({ id: favSong.songId }).value(),
    }))
    .value();
  res.jsonp({ favoriteSongs });
});
server.post("/toggleFavoriteSong", (req, res) => {
  let { db } = req.app;
  let { songId } = req.body;
  try {
    const { id: userId } = getUserByCookie(req);
    if (userId) {
      const existedSong = db
        .get("favoriteSongs")
        .find({ userId, songId })
        .value();
      if (existedSong) {
        db.get("favoriteSongs").remove({ userId, songId }).write();
        res.json({ message: "droped from favorite songs" });
        res.send();
      } else {
        const fsongs = db.get("favoriteSongs").push({ userId, songId }).write();
        res.statusCode = 200;
        res.jsonp({ message: "added song to favorites, successfull" });
        res.send();
      }
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 401;
    res.jsonp({ message: "You are unauthenticated" });
    res.send();
  }
});
server.get("/getAllPlaylists", (req, res) => {
  let { db } = req.app;
  try {
    var { id: userId } = getUserByCookie(req);
    console.log("useriD", userId);
    if (userId) {
      return res.send(getUserPlaylists(db, userId));
    } else {
      return res.send("you are not fucking authorized");
    }
  } catch (e) {
    res.statusCode = 200;
    return res.send("error");
  }
});
//main entry middleware
server.use((req, res, next) => {
  next();
});
server.use(router);
server.listen(4001, () => {});

//utils
function getUserByCookie(req) {
  let { db } = req.app;
  const [schema, token] = req.cookies.authorization
    ? req.cookies.authorization.split(" ")
    : [undefined, undefined];
  if (token && schema) {
    const { email } = jwt.verify(token, constants.JWT_SECRET_KEY);
    const user = db.get("users").find({ email }).value();
    return user;
  }
  return undefined;
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
function getUserPlaylists(db, userId) {
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
