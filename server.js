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
server.get("/allSongs", (req, res) => {
  res.set({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
  });
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
  }

  res.jsonp(db.get("songs"));
  res.send();
});
server.use("/favoriteSongs", (req, res, next) => {
  if (req.cookies.authorization) {
    let [scheme, token] = req.cookies.authorization.split(" ");
    req.headers.authorization = "Bearer " + token;
  }
  console.log("headers", req.headers.authorization);
  next();
});
server.db = router.db;
server.use(rules);
server.use(middlewares);
server.use(auth);

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
  } catch {
    res.statusCode = 401;
    res.jsonp({ message: "You are not Authorize" });
    res.send();
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
