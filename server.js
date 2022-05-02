const jsonServer = require("json-server");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
var auth = require("@danimadmolil/json-server-auth");
const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  // Other rules
});
server.use(cookieParser());
// console.log("expressRouter", express().router());
server.db = router.db;
// console.log(
//   "route defenition",
//   router.get("fd", (req, res) => {})
// );
server.use(rules);
server.use(middlewares);
// console.log("auth", typeof auth);
// console.log(Object.keys(auth["0"]));
// console.log("stack before", Object.keys(auth["0"]["stack"]));
// const newUserAuth = { ...auth["0"] };
// newUserAuth.stack = { ...auth["0"]["stack"] };
// console.log("newUerStack", newUserAuth.stack);
// auth = { 0: auth["0"], 1: auth["1"] };
// console.log("stack after", Object.keys(auth["0"]["stack"]));
// console.log("methods", auth["0"]["stack"]["2"]);

// auth["0"]["get"]("myus", (req, res) => {
//   res.jsonp({ customGet: [{ name: "erfan" }] });
// });
server.use(auth);

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
server.listen(4001, () => {});
