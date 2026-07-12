const http = require("http");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const app = require("./app");
const connectDB = require("../src/config/db.js");
const initializeSocket = require("../src/socket/socket.js");

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Initialize socket events
initializeSocket(io);

// Connect DB and Start Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});