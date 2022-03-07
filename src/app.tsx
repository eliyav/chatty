import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Room } from "../types/types";
import { Sidebar } from "./components/side-bar";

export const App: React.VFC = () => {
  const socket = useRef(io(`ws://${window.location.host}`));

  useEffect(() => {
    socket.current.on("rooms-list", (rooms: string) => {
      const room: Room[] = JSON.parse(rooms);
      console.log(room);
    });
  }, []);

  return (
    <div className="app">
      <Sidebar
        items={[
          {
            text: "Friends List",
            onClick: () => {},
          },
          {
            text: "Create Room",
            onClick: () =>
              socket.current.emit(
                "create-room",
                socket.current.id,
                Math.random()
              ),
          },
          {
            text: "Refresh Rooms",
            onClick: () => socket.current.emit("request-rooms"),
          },
        ]}
      />
      <div className="chat-content">Example Chat</div>
    </div>
  );
};

// console.log(rooms);
// for (const [key, room] of rooms) {
//   console.log(key, room);
// }
// roomsList.forEach((friend, idx) => {
//   const child = document.createElement("div");
//   child.innerText = friend;
//   idx % 2
//     ? child.classList.add("friend-dark")
//     : child.classList.add("friend-light");
//   friends.appendChild(child);
// });

// socket.on("connectedMessage", (message) => {
//   console.log(message);
//   socket.emit("chat-info-request", "Winx");
// });

// socket.on("chat-info", (info: { friendsList: string[]; isOnline: boolean }) => {
//   console.log(info);
//   info.friendsList.forEach((friend, idx) => {
//     const child = document.createElement("div");
//     child.innerText = friend;
//     idx % 2
//       ? child.classList.add("friend-dark")
//       : child.classList.add("friend-light");
//     friends.appendChild(child);
//   });
// });
