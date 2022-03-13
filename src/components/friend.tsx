import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data: { name: string; isOnline: boolean };
}

export const Friend: React.VFC<Props> = ({ data }) => {
  return (
    <div className="friend">
      <span>{data.name}</span>
      <span>{data.isOnline ? "Online" : "Offline"}</span>
      <Link to={`/chat/${data.name}`}>Message</Link>
    </div>
  );
};
