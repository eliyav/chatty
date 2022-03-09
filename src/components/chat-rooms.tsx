import React from "react";

interface ChatRooms {
  data: { key: string; members: { [name: string]: string } }[];
  joinRoom: (roomKey: string) => void;
}

export const ChatRooms: React.VFC<ChatRooms> = ({ data, joinRoom }) => {
  return (
    <>
      {data.map((item, idx) => (
        <div
          className={`chat-room ${idx % 2 === 0 ? "primary" : "secondary"}`}
          key={idx}
        >
          <p>Room Key: {item.key}</p>
          <p>Members: {item.members.length}</p>
          <button onClick={() => joinRoom(item.key)}>Join Room</button>
        </div>
      ))}
    </>
  );
};
