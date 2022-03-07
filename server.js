const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHMR = require("webpack-hot-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

const port = process.env.PORT || 3000;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler));
app.use(webpackHMR(compiler));

const database = new Map();
database.set("Eliya", {
  isOnline: false,
  friendsList: ["Winx", "Random User 1"],
});
database.set("Winx", {
  isOnline: false,
  friendsList: ["Eliya", "Random User 2"],
});

// Serve the files on port 3000.
const server = app.listen(port, function () {
  console.log("Example app listening on port 3000!\n");
});

const io = require("socket.io")(server);
const rooms = new Map();

io.on("connection", (socket) => {
  socket.emit("connectedMessage", "socket is connected");

  socket.on("chat-info-request", (name) => {
    socket.emit("chat-info", database.get(name));
  });
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.on("create-room", (socketId, name) => {
    const roomKey = createRoom();
    rooms.set(roomKey, { key: roomKey, members: { [name]: socketId } });
    socket.emit("room-key", roomKey);
  });

  socket.on("request-rooms", () => {
    const roomsList = Array.from(rooms.values());
    socket.emit("rooms-list", JSON.stringify(roomsList));
  });
});

function createRoom() {
  const key = generateKey();
  return !rooms.has(key) ? key : createRoom();
}

function generateKey() {
  let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let key = [];
  for (i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * 10);
    let char = chars[num];
    key[i] = char;
  }
  return key.join("");
}
