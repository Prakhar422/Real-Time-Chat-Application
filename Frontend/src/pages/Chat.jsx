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
  const [typing, setTyping] = useState(false);

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

  useEffect(() => {
  if (!selectedUser) return;

  socket.emit("read_messages", {
    sender: selectedUser._id,
    receiver: currentUser._id,
  });
}, [selectedUser, currentUser]);

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
    console.log(message);
    setMessages((prev) => [...prev, message]);

    if (
      selectedUser &&
      (message.sender === selectedUser._id ||
        message.sender?._id === selectedUser._id)
    ) {
      socket.emit("read_messages", {
        sender: selectedUser._id,
        receiver: currentUser._id,
      });
    }
  };

  socket.on("receive_message", handleReceiveMessage);

  return () => {
    socket.off("receive_message", handleReceiveMessage);
  };
}, [selectedUser, currentUser]);

  useEffect(() => {
  const handleMessageSent = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  socket.on("message_sent", handleMessageSent);

  return () => {
    socket.off("message_sent", handleMessageSent);
  };
}, []);

useEffect(() => {
  const handleTyping = ({ sender }) => {
    if (selectedUser && sender === selectedUser._id) {
      setTyping(true);
    }
  };

  const handleStopTyping = ({ sender }) => {
    if (selectedUser && sender === selectedUser._id) {
      setTyping(false);
    }
  };

  socket.on("typing", handleTyping);
  socket.on("stop_typing", handleStopTyping);

  return () => {
    socket.off("typing", handleTyping);
    socket.off("stop_typing", handleStopTyping);
  };
}, [selectedUser]);

useEffect(() => {
  const handleMessageStatus = ({ messageId, status }) => {
    
    setMessages((prev) =>
      prev.map((message) =>
        message._id === messageId
          ? { ...message, status }
          : message
      )
    );
  };

  socket.on("message_status", handleMessageStatus);

  return () => {
    socket.off("message_status", handleMessageStatus);
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
        typing={typing}
      />
    </div>
  );
}

export default Chat;
