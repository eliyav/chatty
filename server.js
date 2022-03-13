const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHMR = require("webpack-hot-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

const port = process.env.PORT || 3000;

app.use(webpackDevMiddleware(compiler));
app.use(webpackHMR(compiler));

const users = new Map();
const rooms = new Map();
users.set("Eliya", {
  name: "Eliya",
  isOnline: false,
  friendsList: ["Winx", "RU1"],
});
users.set("Winx", {
  name: "Winx",
  isOnline: false,
  friendsList: ["Eliya", "RU2"],
});
users.set("RU2", {
  name: "RU2",
  isOnline: false,
  friendsList: ["Winx"],
});

const server = app.listen(port, function () {
  console.log("App listening on port 3000!\n");
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("login", (userName) => {
    socket.join(userName);
    users.get(userName).isOnline = true;
    sendFriendsList(userName);
    socket.on("disconnect", () => {
      users.get(userName).isOnline = false;
    });
  });

  socket.on("send-message", (recepient, sender, message) => {
    socket.to(recepient).emit("received-message", sender, message);
  });

  // socket.on("chat-info-request", (name) => {
  //   socket.emit("chat-info", database.get(name));
  // });
  // socket.on("create-room", (socketId, name) => {
  //   const roomKey = createRoom();
  //   rooms.set(roomKey, {
  //     key: roomKey,
  //     name: roomKey,
  //     members: [{ [name]: socketId }],
  //     messages: [],
  //   });
  //   const room = rooms.get(roomKey);
  //   socket.join(roomKey);
  //   socket.emit("created-room", room);
  // });
  // socket.on("request-rooms", () => {
  //   const roomsList = Array.from(rooms.values());
  //   socket.emit("rooms-list", JSON.stringify(roomsList));
  // });
  // socket.on("join-chat-room", (roomKey, socketId, name) => {
  //   const members = rooms.get(roomKey).members;
  //   const memberExists = members.find((member) => {
  //     return Object.values(member) == socketId;
  //   });
  //   if (!memberExists) {
  //     socket.join(roomKey);
  //     rooms.get(roomKey).members.push({ [name]: socketId });
  //     const room = rooms.get(roomKey);
  //     socket.emit("joined-room", room);
  //   }
  // });
  // socket.on("message-room", (message, roomKey) => {
  //   socket.to(roomKey).emit("room-message", message);
  // });
  function sendFriendsList(userName) {
    const friendsList = users.get(userName).friendsList;
    const friendsData = friendsList.map((friend) => {
      return {
        name: users.get(friend).name,
        isOnline: users.get(friend).isOnline,
      };
    });
    socket.emit("friends-list-res", friendsData);
  }
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
