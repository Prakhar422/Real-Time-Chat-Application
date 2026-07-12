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

          // Update status
          newMessage.status = "delivered";
          await newMessage.save();
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
