const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
//todo add custom routes here
//customize route to update albums
// server.get("/updateAlbums", (req, res) => {
//   // res.jsonp({ id: 1 });
//   let db = router.db.update("albums", (value) => {
//     return value.filter((song) => song.id > 5);
//   });
//   //db.write(jsonObject) write to database temporary and on server restart it back to default db.json values
//   let write = router.db.write(db);
//   //with fs.writeFileSync we write to db.json file directly and the result change to db is Perpetual.
//   fs.writeFileSync("./db.json", JSON.stringify(write));
//   res.jsonp({ write });
// });

server.use(jsonServer.bodyParser);
//main entry middleware
server.use((req, res, next) => {
  next();
});
server.use(router);
server.listen(4001, () => {
});
