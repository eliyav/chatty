import React from "react";

interface Props {
  data: { name: string; isOnline: boolean };
}

export const Friend: React.VFC<Props> = ({ data }) => {
  return (
    <div className="friend">
      <span>{data.name}</span>
      <span>{data.isOnline ? "Online" : "Offline"}</span>
    </div>
  );
};
