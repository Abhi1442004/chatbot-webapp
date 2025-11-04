import React from "react";

function Message({ text, sender }) {
  return (
    <div className={`message ${sender === "user" ? "user" : "ai"}`}>
      {text}
    </div>
  );
}

export default Message;
