const User = require("../models/user.model");
const Message = require("../models/message.model.js");

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Join event
    socket.on("join", async (userId) => {
      try {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
          isOnline: true,
        });

        const pendingMessages = await Message.find({
          receiver: userId,
          status: "sent",
        });

        await Message.updateMany(
          {
            receiver: userId,
            status: "sent",
          },
          {
            status: "delivered",
          },
        );

        for (const message of pendingMessages) {
          const senderUser = await User.findById(message.sender);

          if (senderUser?.socketId) {
            io.to(senderUser.socketId).emit("message_status", {
              messageId: message._id.toString(),
              status: "delivered",
            });
          }
        }

        console.log(`${userId} joined`);
      } catch (error) {
        console.log(error);
      }
    });

    //Send Message event
    socket.on("send_message", async (data) => {
      try {
        const { sender, receiver, message } = data;

        // Save message to MongoDB
        const newMessage = await Message.create({
          sender,
          receiver,
          message,
          status: "sent",
        });

        // Find receiver
        const receiverUser = await User.findById(receiver);

        // If receiver is online, send instantly
        if (receiverUser && receiverUser.socketId) {
          io.to(receiverUser.socketId).emit("receive_message", newMessage);

          newMessage.status = "delivered";
          await newMessage.save();
          

          // Notify sender that message is delivered
          socket.emit("message_status", {
            messageId: newMessage._id,
            status: "delivered",
          });
        }

        // Send confirmation back to sender
        socket.emit("message_sent", newMessage);
      } catch (error) {
        console.log(error);
      }
    });

    //Typing event
    socket.on("typing", async ({ sender, receiver }) => {
      const receiverUser = await User.findById(receiver);

      if (receiverUser?.socketId) {
        io.to(receiverUser.socketId).emit("typing", {
          sender,
        });
      }
    });

    //Stop Typing event
    socket.on("stop_typing", async ({ sender, receiver }) => {
      const receiverUser = await User.findById(receiver);

      if (receiverUser?.socketId) {
        io.to(receiverUser.socketId).emit("stop_typing", {
          sender,
        });
      }
    });

    // Read Messages event
socket.on("read_messages", async ({ sender, receiver }) => {
  try {
    // Get all delivered messages
    const messages = await Message.find({
      sender,
      receiver,
      status: "delivered",
    });

    // Update them to read
    await Message.updateMany(
      {
        sender,
        receiver,
        status: "delivered",
      },
      {
        status: "read",
      }
    );

    // Notify sender
    const senderUser = await User.findById(sender);

    if (senderUser?.socketId) {
      for (const message of messages) {
        io.to(senderUser.socketId).emit("message_status", {
          messageId: message._id.toString(),
          status: "read",
        });
      }
    }

    
  } catch (error) {
    console.log(error);
  }
});

    // Disconnect event
    socket.on("disconnect", async () => {
      try {
        await User.findOneAndUpdate(
          { socketId: socket.id },
          {
            socketId: "",
            isOnline: false,
          },
        );

        console.log("User Disconnected:", socket.id);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

module.exports = initializeSocket;
