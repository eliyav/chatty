import React from "react";

interface NavigationProps {
  items: {
    text: string;
    onClick: () => void;
  }[];
}

export const Navigation: React.VFC<NavigationProps> = ({ items }) => {
  return (
    <>
      {items.map((item, idx) => (
        <button key={idx} onClick={item.onClick}>
          {item.text}
        </button>
      ))}
    </>
  );
};
