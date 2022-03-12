import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Sidebar } from "./components/side-bar";
import { Routes, Route } from "react-router-dom";
import { FriendsList } from "./components/friends-list";
import { HomePage } from "./components/home-page";
import { Friend } from "./components/friend";
import { useDispatch, useSelector } from "react-redux";
import { load } from "./store/slices/friends-slice";

export const App: React.VFC = () => {
  const socket = useRef(io(`ws://${window.location.host}`));
  const dispatch = useDispatch();
  const friends = useSelector(
    (state: { friends: { list: [] } }) => state.friends.list
  ) as { name: string; isOnline: boolean }[];
  console.log(friends);

  useEffect(() => {
    socket.current.on("friends-list-res", (friendsList) => {
      console.log(friendsList);
      dispatch(load(friendsList));
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
            text: "Login in as Winx",
            path: "",
            onClick: () => {
              socket.current.emit("login", "Winx");
            },
          },
          {
            text: "Login as RU2",
            path: "",
            onClick: () => {
              socket.current.emit("login", "RU2");
            },
          },
        ]}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/friends-list" element={<FriendsList friends={friends} />}>
          {/* <Route path="/friends-list/:id" element={<Friend />} /> */}
        </Route>
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
