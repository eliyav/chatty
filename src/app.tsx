import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Sidebar } from "./components/side-bar";
import { Routes, Route, useMatch } from "react-router-dom";
import { FriendsList } from "./components/friends-list";
import { HomePage } from "./components/home-page";
import { Friend } from "./components/friend";
import { useDispatch, useSelector } from "react-redux";
import { load } from "./store/slices/friends-slice";
import { Chat } from "./components/chat";
import {
  saveReceivedMessage,
  saveSentMessage,
} from "./store/slices/chat-slice";
import { Message } from "../types/types";

export const App: React.VFC = () => {
  const [userName, setUserName] = useState<string>("");
  const socket = useRef(io(`ws://${window.location.host}`));
  const dispatch = useDispatch();
  const chatMatch = useMatch("/chat/:id");
  const friends = useSelector(
    (state: { friends: { list: [] } }) => state.friends.list
  ) as { name: string; isOnline: boolean }[];
  const chatHistory = useSelector(
    (state: { chat: { history: {} } }) => state.chat.history
  ) as { [user: string]: Message[] }[];

  useEffect(() => {
    socket.current.on("friends-list-res", (friendsList) => {
      dispatch(load(friendsList));
    });

    socket.current.on("received-message", (sender, message) => {
      dispatch(saveReceivedMessage([sender, message]));
    });
  }, []);

  return (
    <div className="app">
      <Sidebar
        navItems={[
          {
            text: "Friends",
            path: "/friends-list",
            onClick: () => {},
          },
          {
            text: "Login as Winx",
            path: "",
            onClick: () => {
              socket.current.emit("login", "Winx");
              setUserName("Winx");
            },
          },
          {
            text: "Login as RU2",
            path: "",
            onClick: () => {
              socket.current.emit("login", "RU2");
              setUserName("RU2");
            },
          },
        ]}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/friends-list" element={<FriendsList friends={friends} />}>
          {/* <Route path="/friends-list/:id" element={<Friend />} /> */}
        </Route>
        <Route
          path="/chat/:id"
          element={
            <Chat
              history={chatHistory[chatMatch?.params.id!]}
              message={(message: string) => {
                socket.current.emit(
                  "send-message",
                  chatMatch?.params.id,
                  userName,
                  message
                );
                dispatch(
                  saveSentMessage([userName, chatMatch?.params.id, message])
                );
              }}
            />
          }
        />
      </Routes>
    </div>
  );
};

// export const MyContext = React.createContext<{
//   rooms: any[];
//   activeRooms: {
//     [room: string]: {
//       key: string;
//       name: string;
//       members: { [member: string]: string }[];
//       messages: string[];
//     };
//   };
// }>({ rooms: [], activeRooms: {} });

// const [state, setState] = useState<{
//   rooms: any[];
//   activeRooms: {
//     [room: string]: {
//       key: string;
//       name: string;
//       members: { [member: string]: string }[];
//       messages: string[];
//     };
//   };
// }>({ rooms: [], activeRooms: {} });
// const [messages, setRoomKey] = useState<string>("");

// socket.current.on("rooms-list", (rooms: string) => {
//   const roomsList: Room[] = JSON.parse(rooms);
//   setState((prevState) => ({ ...prevState, rooms: roomsList }));
// });
// socket.current.on("created-room", (room: Room) => {
//   setState((prevState) => ({
//     ...prevState,
//     activeRooms: { ...prevState.activeRooms, [room.key]: room },
//   }));
// });
// socket.current.on("joined-room", (room: Room) => {
//   setState((prevState) => ({
//     ...prevState,
//     activeRooms: { ...prevState.activeRooms, [room.key]: room },
//   }));
// });
// socket.current.on("room-message", (message, roomKey) => {});
