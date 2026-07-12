import React from 'react'
import { useState, useRef } from "react";
import socket from "../socket/socket.js";
import { SendHorizontal } from "lucide-react";

function MessageInput({ sendMessage, currentUser, selectedUser, }) {

    const typingTimeout = useRef(null);
    const [text, setText] = useState("");
    const handleSend = () => {
  if (!text.trim()) return;

  sendMessage(text);

  setText("");
};
  return (
    <div className="bg-white border-t px-6 py-5">

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-full border px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => {
  setText(e.target.value);

  if (!currentUser || !selectedUser) return;

  
  socket.emit("typing", {
    sender: currentUser._id,
    receiver: selectedUser._id,
  });

  clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {
    socket.emit("stop_typing", {
      sender: currentUser._id,
      receiver: selectedUser._id,
    });
  }, 1000);
}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
        />

        <button
        onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center transition"
        >
          <SendHorizontal size={22} />
        </button>

      </div>

    </div>
  );
}

export default MessageInput;