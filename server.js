const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
//todo add custom routes here

// server.get("/custom-route", (req, res) => {
//   res.jsonp({ id: 1 });
// });

server.use(jsonServer.bodyParser);
//main entry middleware
server.use((req, res, next) => {
  next();
});
server.use(router);
server.listen(4001, () => {
  console.log("json server is listening on port 4001");
});
