import React from 'react'

function Message({ message, currentUser }) {
  const senderId =
  typeof message.sender === "object"
    ? message.sender._id
    : message.sender;

const own = senderId === currentUser._id;
  return (
   <div
  className={`flex ${
    own ? "justify-end" : "justify-start"
  }`}
>
  <div
    className={`max-w-md px-5 py-3 rounded-2xl shadow ${
      own
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-800"
    }`}
  >
    <p>{message.message}</p>

    <p
      className={`text-xs mt-2 ${
        own ? "text-blue-100" : "text-gray-400"
      }`}
    >
      {new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
</div>
  );
}

export default Message;
