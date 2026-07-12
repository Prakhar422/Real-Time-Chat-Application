import { useEffect, useRef } from "react";
import React from 'react'

import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatWindow({
  selectedUser,
  messages,
  currentUser,
  sendMessage,
  typing,
}) {
  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-100">
        <h2 className="text-2xl text-gray-400">
          Select a user to start chatting
        </h2>
      </div>
    );

    const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-slate-100">

      {/* Header */}

      <div className="bg-white px-8 py-5 shadow flex justify-between items-center">

        <div>

          <h2 className="font-bold text-xl">
            {selectedUser.username}
          </h2>

          <p className="text-green-500 text-sm">
            {selectedUser.isOnline ? "Online" : "Offline"}
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.map((message) => (

          <Message
            key={message._id}
            message={message}
            currentUser={currentUser}
          />

        ))}

        <div ref={messagesEndRef}></div>

      </div>
      {typing && (
  <div className="px-6 pb-2 text-sm italic text-gray-500">
    {selectedUser.username} is typing...
  </div>
)}

      <MessageInput sendMessage={sendMessage}
      currentUser={currentUser}
       selectedUser={selectedUser} />
      

    </div>
  );
}

export default ChatWindow;