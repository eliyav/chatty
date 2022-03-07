import React from "react";

interface SidebarProps {
  text: string;
  onClick: () => void;
}

export const Sidebar: React.VFC<{ items: SidebarProps[] }> = ({ items }) => {
  return (
    <div className="side-bar">
      {items.map((item, idx) => (
        <button key={idx} onClick={item.onClick}>
          {item.text}
        </button>
      ))}
    </div>
  );
};
