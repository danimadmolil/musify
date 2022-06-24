const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const {
  getUserByJwt,
  getUserFromDb,
  getUserPlaylists,
  mapArrayToObject,
  getUerFavoriteSongs,
} = require("./utils");
const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://musify-auth-service.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "musflix-auth-express-api",
  issuer: "https://musify-auth-service.eu.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/", "/albums", "/allSongs2"] });
//middle wares
app.db = router.db;
app.use(middlewares);
app.use(verifyJwt);
app.use(cors());
app.use(jsonServer.bodyParser);
app.use(async (req, res, next) => {
  if (req.auth) {
    const user = await getUserByJwt(req);
    if (user) {
      req.headers.user = user;
      const { db } = req.app;
      const isUserInDb = db
        .get("users")
        .find({ name: user.name, email: user.email })
        .value();
      if (isUserInDb === undefined) {
        db.get("users")
          .insert({ ...user })
          .write();
      }
      console.log(isUserInDb);
      next();
    } else {
      req.headers.user = undefined;
      next();
    }
  } else {
    req.headers.user = undefined;
    next();
  }
});

//routes
app.post("/userFavoriteSongs", (req, res) => {
  let { db } = req.app;
  const user = req.headers.user && getUserFromDb(req.headers.user, db);
  if (user) {
    const { id: userId } = user;
    let favoriteSongs = db
      .get("favoriteSongs")
      .filter((favSong) => favSong.userId === userId)
      .map((favSong) => ({
        ...db.get("songs").find({ id: favSong.songId }).value(),
        like: true,
      }))
      .value();
    res.jsonp({ favoriteSongs });
  } else {
    res.jsonp([]);
  }
});
app.post("/addSongToPlaylist", (req, res) => {
  const { db } = req.app;
  const { songId, playlistId } = req.body;
  console.log("songId playlistId", `${songId}  ${playlistId}`);
  let songAlreadyExistOnPlaylist = false;
  const user = getUserFromDb(req.headers.user, db);
  let playlists = getUserPlaylists(user.id, db);
  playlists = mapArrayToObject(playlists, "id");
  playlists[playlistId]["songs"]["forEach"]((song) => {
    if (song.id === songId) {
      songAlreadyExistOnPlaylist = true;
    }
  });
  if (!songAlreadyExistOnPlaylist) {
    db.get("playlist_song").insert({ playlistId, songId }).write();
    res.statusCode = 200;
    res.jsonp({ message: "successfull add song to playlist" });
  } else {
    res.statusCode = 400;
    res.jsonp({ error: "song is already in playlist" });
  }
});
app.get("/getAllPlaylists", async (req, res) => {
  const { db } = req.app;
  try {
    var { id: userId } = getUserFromDb(req.headers.user, db);
    console.log("useriD", userId);
    if (userId) {
      res.jsonp(getUserPlaylists(userId, db));
    } else {
      res.send("you are not fucking authorized");
    }
  } catch (e) {
    res.statusCode = 500;
    console.log("errrror", e);
    res.jsonp(e);
    res.send();
  }
});
app.post("/createPlaylist", async (req, res) => {
  const { db } = req.app;
  const user = getUserFromDb(req.headers.user, db);
  console.log("user", req.body);
  if (user) {
    const { name } = req.body;
    let canCreatePlaylist = true;
    const userOwnedPlaylists = getUserPlaylists(user.id, db);
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
    }
    res.statusCode = 400;
    res.jsonp({ error: "playlist already exist" });
  }
  res.statusCode = 401;
  res.jsonp({ error: "you should be authentiacated to create playlist" });
});
app.get("/allSongs", (req, res) => {
  const { db } = req.app;
  const user = req.headers.user && getUserFromDb(req.headers.user, db);
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
  } else {
    res.jsonp(db.get("songs").value());
  }
});
app.get("/allSongs2", (req, res) => {
  const { db } = req.app;
  res.jsonp(db.get("songs").value());
});
app.post("/toggleFavoriteSong", (req, res) => {
  let { db } = req.app;
  let { songId } = req.body;
  try {
    const { id: userId } = getUserFromDb(req.headers.user, db);
    if (userId) {
      const existedSong = db
        .get("favoriteSongs")
        .find({ userId, songId })
        .value();
      if (existedSong) {
        db.get("favoriteSongs").remove({ userId, songId }).write();
        res.json({ message: "droped from favorite songs" });
      } else {
        const fsongs = db.get("favoriteSongs").push({ userId, songId }).write();
        res.statusCode = 200;
        res.jsonp({ message: "added song to favorites, successfull" });
      }
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 401;
    res.jsonp({ message: "You are unauthenticated" });
  }
});
app.get("/", (req, res) => {
  return res.jsonp({ message: "this is a public route" });
});
app.get("/albums", (req, res) => {
  const { db } = req.app;
  res.jsonp(db.get("albums"));
});
app.get("/protected2", async (req, res) => {
  const user = req.headers.user;

  if (user) {
    res.send(JSON.stringify(user));
  } else {
    res.status = 402;
    res.send({ data: { error: "can't get user information" } });
  }
});
app.listen(4001, () => console.log("server is running on port 4001"));
