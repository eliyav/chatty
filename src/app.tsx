import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Room } from "../types/types";
import { Content } from "./components/content";
import { Sidebar } from "./components/side-bar";

export const MyContext = React.createContext<{
  rooms: any[];
  activeRooms: {
    [room: string]: {
      key: string;
      name: string;
      members: { [member: string]: string }[];
      messages: string[];
    };
  };
}>({ rooms: [], activeRooms: {} });

export const App: React.VFC = () => {
  const socket = useRef(io(`ws://${window.location.host}`));
  const [state, setState] = useState<{
    rooms: any[];
    activeRooms: {
      [room: string]: {
        key: string;
        name: string;
        members: { [member: string]: string }[];
        messages: string[];
      };
    };
  }>({ rooms: [], activeRooms: {} });
  const [display, setDisplay] = useState<string>("");
  const [messages, setRoomKey] = useState<string>("");

  useEffect(() => {
    socket.current.on("rooms-list", (rooms: string) => {
      const roomsList: Room[] = JSON.parse(rooms);
      setState((prevState) => ({ ...prevState, rooms: roomsList }));
    });

    socket.current.on("created-room", (room: Room) => {
      setState((prevState) => ({
        ...prevState,
        activeRooms: { ...prevState.activeRooms, [room.key]: room },
      }));
    });

    socket.current.on("joined-room", (room: Room) => {
      setState((prevState) => ({
        ...prevState,
        activeRooms: { ...prevState.activeRooms, [room.key]: room },
      }));
    });

    socket.current.on("room-message", (message, roomKey) => {});
  }, []);

  return (
    <div className="app">
      <MyContext.Provider value={state}>
        <Sidebar
          navItems={[
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
              text: "Chat Rooms",
              onClick: () => {
                setDisplay("Chat Rooms");
                socket.current.emit("request-rooms");
              },
            },
          ]}
          displayRoom={(roomKey: string) => {
            setRoomKey(roomKey);
            setDisplay("Chat Room");
          }}
        />
        <Content roomKey={messages} display={display} socket={socket.current} />
      </MyContext.Provider>
    </div>
  );
};
