import React from "react";

interface ActiveRoomProps {
  rooms: string[];
}

export const ActiveRooms: React.VFC<ActiveRoomProps> = ({ rooms }) => {
  return (
    <div>
      <p className="side-bar label">Active Rooms</p>
      {rooms.map((room, idx) => (
        <div key={idx}>{room}</div>
      ))}
    </div>
  );
};
