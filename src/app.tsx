import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Room } from "../types/types";
import { Content } from "./components/content";
import { Sidebar } from "./components/side-bar";

export const App: React.VFC = () => {
  const socket = useRef(io(`ws://${window.location.host}`));
  const [content, setContent] = useState<{ type: string; content: any[] }>({
    type: "",
    content: [],
  });
  const [activeRooms, setActiveRooms] = useState<string[]>([]);

  useEffect(() => {
    socket.current.on("rooms-list", (rooms: string) => {
      const roomsList: Room[] = JSON.parse(rooms);
      setContent({ type: "Chat Rooms", content: roomsList });
    });

    socket.current.on("room-key", (roomKey) => {
      setActiveRooms((prevState) => [...prevState, roomKey]);
    });
  }, []);

  return (
    <div className="app">
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
            onClick: () => socket.current.emit("request-rooms"),
          },
        ]}
        active={activeRooms}
      />
      <Content data={content} socket={socket.current} />
    </div>
  );
};
