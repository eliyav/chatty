import React from "react";
import { ActiveRooms } from "./active-rooms";
import { Navigation } from "./navigation";

interface SidebarProps {
  navItems: {
    text: string;
    onClick: () => void;
  }[];
  active: string[];
}

export const Sidebar: React.VFC<SidebarProps> = ({ navItems, active }) => {
  return (
    <div className="side-bar">
      <Navigation items={navItems} />
      <ActiveRooms rooms={active} />
    </div>
  );
};
