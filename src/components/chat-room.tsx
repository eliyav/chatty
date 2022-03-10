import React from "react";

interface Props {
  messages: string[];
  members: { [member: string]: string }[];
  name: string;
}

export const ChatRoom: React.VFC<Props> = ({ ...props }) => {
  console.log(props);
  return <div className="chat-room-window">rawr</div>;
};
