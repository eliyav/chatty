import React, { useContext } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MyContext } from "../app";
import { ChatRoom } from "./chat-room";
import { ChatRooms } from "./chat-rooms";

interface ContentProps {
  roomKey: string;
  display: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export const Content: React.VFC<ContentProps> = ({
  display,
  socket,
  roomKey: roomKey,
}) => {
  const content = useContext(MyContext);
  let displayedContent;

  switch (display) {
    case "Chat Rooms":
      displayedContent = (
        <ChatRooms
          data={content.rooms!}
          joinRoom={(roomKey) => {
            socket.emit("join-chat-room", roomKey, socket.id, Math.random());
          }}
        />
      );
      break;
    case "Chat Room":
      displayedContent = (
        <ChatRoom
          messages={content.activeRooms[roomKey].messages}
          members={content.activeRooms[roomKey].members}
          name={content.activeRooms[roomKey].name}
        />
      );
      break;
    default: {
      displayedContent = <div className="chat-content">Example Chat</div>;
    }
  }
  return <div className="content">{displayedContent}</div>;
};
