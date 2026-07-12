import { useEffect, useState } from "react";
import socket from "../socket/socket";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function Chat() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [selectedUserId, setselectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  

  const selectedUser = users.find(
  (user) => user._id === selectedUserId
);

  //Join User to Socket.io Server
  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("join", currentUser._id);
    }
  }, []);

  //Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");

        const otherUsers = response.data.users.filter(
          (u) => u._id !== currentUser._id,
        );

        setUsers(otherUsers);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser?._id) {
      fetchUsers();
    }
  }, [currentUser]);

  //fetch chat history when selectedUserId changes
  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMessages = async () => {
      try {
        const response = await api.get(
          `/messages/${currentUser._id}/${selectedUser._id}`,
        );

        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  //send message
  const sendMessage = (text) => {
    if (!selectedUserId || !text.trim()) return;

    socket.emit("send_message", {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message: text,
    });
  };

  useEffect(() => {
  const handleReceiveMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  socket.on("receive_message", handleReceiveMessage);

  return () => {
    socket.off("receive_message", handleReceiveMessage);
  };
}, []);

  useEffect(() => {
  const handleMessageSent = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  socket.on("message_sent", handleMessageSent);

  return () => {
    socket.off("message_sent", handleMessageSent);
  };
}, []);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        users={users}
        currentUser={currentUser}
        selectedUserId={selectedUserId}
        setselectedUserId={setselectedUserId}
      />

      <ChatWindow
        currentUser={currentUser}
        selectedUser={selectedUser}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Chat;
