import React from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  items: {
    text: string;
    path: string;
    onClick?: () => void;
  }[];
}

export const Navigation: React.VFC<NavigationProps> = ({ items }) => {
  return (
    <>
      {items.map((item, idx) => (
        <Link to={item.path} className="nav-item" key={idx}>
          <button onClick={item.onClick}>{item.text}</button>
        </Link>
      ))}
    </>
  );
};
