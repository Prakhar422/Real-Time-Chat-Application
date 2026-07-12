const express = require("express");
const cors = require("cors");

const userRoutes = require("../src/routes/user.routes.js");
const messageRoutes = require("../src/routes/message.routes.js");

const errorMiddleware = require("../src/middlewares/error.middleware.js");
const notFoundMiddleware = require("../src/middlewares/notFound.middleware.js");

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://real-time-chat-application-chi-ecru.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Chat API is running..."
    });
});

// Error Middlewares (Always keep these last)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;