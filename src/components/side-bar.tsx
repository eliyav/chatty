import React, { useContext } from "react";
import { MyContext } from "../app";
import { ActiveRooms } from "./active-rooms";
import { Navigation } from "./navigation";

interface SidebarProps {
  navItems: {
    text: string;
    onClick: () => void;
  }[];
  displayRoom: (roomKey: string) => void;
}

export const Sidebar: React.VFC<SidebarProps> = ({ navItems, displayRoom }) => {
  const context = useContext(MyContext);
  return (
    <div className="side-bar">
      <Navigation items={navItems} />
      <ActiveRooms rooms={context.activeRooms} displayRoom={displayRoom} />
    </div>
  );
};
