import React, { useRef } from "react";
import { Message } from "../../types/types";

interface ChatProps {
  history: Message[];
  message: (message: string) => void;
}

export const Chat: React.VFC<ChatProps> = ({ message, history }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="chat">
      <div className="chat-messages">
        {history &&
          history.map((message, idx) => (
            <div className="chat-item" key={idx}>
              <p className="chat-user">By: {message.by}</p>
              <p className="chat-message">{message.message}</p>
              <p className="chat-time">{message.time}</p>
            </div>
          ))}
      </div>
      <textarea
        ref={textRef}
        rows={4}
        cols={100}
        className="chat-input"
      ></textarea>
      <div
        className="chat-send"
        onClick={() => {
          if (textRef.current?.value) {
            message(textRef.current?.value);
            textRef.current.value = "";
          }
        }}
      >
        Send
      </div>
    </div>
  );
};
