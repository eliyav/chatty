import React, { useRef } from "react";

interface ChatProps {
  history: string[];
  message: (message: string) => void;
}

export const Chat: React.VFC<ChatProps> = ({ message, history }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="chat">
      <div className="chat-messages">
        {history && history.map((h, idx) => <p key={idx}>{h}</p>)}
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
