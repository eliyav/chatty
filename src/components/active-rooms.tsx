import React from "react";

interface ActiveRoomsProps {
  rooms: {
    [room: string]: {
      key: string;
      name: string;
      members: { [member: string]: string }[];
      messages: string[];
    };
  };
  displayRoom: (roomKey: string) => void;
}

export const ActiveRooms: React.VFC<ActiveRoomsProps> = ({
  rooms,
  displayRoom,
}) => {
  const roomsArray = [];
  for (const [key, room] of Object.entries(rooms)) {
    roomsArray.push({ key: key, name: room.name });
  }
  return (
    <>
      <p className="side-bar label">Active Rooms</p>
      <div className="rooms-shortcut">
        {roomsArray.length > 0 &&
          roomsArray.map((room, idx) => (
            <img
              key={idx}
              className="room-shortcut-image"
              onClick={() => {
                displayRoom(room.key);
              }}
            ></img>
          ))}
      </div>
    </>
  );
};
