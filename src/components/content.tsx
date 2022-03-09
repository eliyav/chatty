import React from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ChatRooms } from "./chat-rooms";

interface ContentProps {
  data: { type: string; content: any[] };
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export const Content: React.VFC<ContentProps> = ({
  data: { type, content },
  socket,
}) => {
  console.log(content);
  console.log(socket);
  let display;
  switch (type) {
    case "Chat Rooms":
      display = (
        <ChatRooms
          data={content}
          joinRoom={(roomKey) => {
            socket.emit("join-chat-room", roomKey, socket.id, Math.random());
          }}
        />
      );
      break;
    default: {
      display = <div className="chat-content">Example Chat</div>;
    }
  }
  return <div className="content">{display}</div>;
};
