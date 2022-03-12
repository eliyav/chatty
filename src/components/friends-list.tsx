import React from "react";
import { Friend } from "./friend";

interface Props {
  friends: { name: string; isOnline: boolean }[];
}

export const FriendsList: React.VFC<Props> = ({ friends }) => {
  return (
    <div className="friends-list">
      {friends.map((friend, idx) => {
        return <Friend data={friend} key={idx} />;
      })}
    </div>
  );
};
