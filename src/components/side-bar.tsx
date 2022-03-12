import React from "react";
import { Navigation } from "./navigation";
import { ActiveRooms } from "./active-rooms";

interface SidebarProps {
  navItems: {
    text: string;
    path: string;
    onClick?: () => void;
  }[];
}

export const Sidebar: React.VFC<SidebarProps> = ({ navItems }) => {
  return (
    <div className="side-bar">
      <Navigation items={navItems} />
      {/* <ActiveRooms rooms={context.activeRooms} displayRoom={displayRoom} /> */}
    </div>
  );
};
