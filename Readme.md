# 💬 Real-Time Chat Application

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-3FA037?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.IO-RealTime-010101?style=for-the-badge&logo=socketdotio&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
</p>

<p align="center">
A modern real-time chat application built using the MERN Stack and Socket.IO with features like instant messaging, online status, typing indicator, message delivery/read receipts, and persistent chat history.
</p>

---

# 🚀 Live Demo

🌐 **Frontend:** https://real-time-chat-application-chi-ecru.vercel.app/

⚙️ **Backend:** https://real-time-chat-application-backend-hkic.onrender.com/

---

# ✨ Features

## 👤 Authentication

- Username based login
- Automatic user creation
- Persistent session using Local Storage

---

## 💬 Real-Time Messaging

- Instant messaging using Socket.IO
- Real-time communication
- Chat history stored in MongoDB
- Automatic message synchronization

---

## 🟢 Online / Offline Status

- Live online users
- Offline detection
- Real-time status updates

---

## ⌨️ Typing Indicator

- Shows when another user is typing
- Automatically disappears after inactivity

---

## 📩 Message Status

✔ Sent

✔✔ Delivered

✔✔ Read (Blue Tick)

---

## 📜 Chat History

- Complete conversation history
- Messages sorted by timestamp
- Stored securely in MongoDB

---

## 🎨 Modern UI

- Responsive Design
- Clean Sidebar
- Beautiful Chat Window
- Auto Scroll
- Mobile Friendly Layout

---

# 🛠 Tech Stack

## Frontend

- ⚛ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 Axios
- 🔌 Socket.IO Client
- 🧭 React Router DOM

---

## Backend

- 🟢 Node.js
- 🚀 Express.js
- 🔌 Socket.IO
- 🍃 MongoDB
- 📦 Mongoose

---

# 📂 Project Structure

```
Real-Time-Chat-Application

│
├── Frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── socket
│   │   └── App.jsx
│   │
│   └── package.json
│
├── Backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── socket
│   │   ├── config
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Prakhar422/Real-Time-Chat-Application.git
```

```
cd Real-Time-Chat-Application
```

---

## Backend Setup

```
cd Backend
npm install
```

Create a `.env`

```
MONGO_URI=your_mongodb_uri
PORT=5000
```

Run Backend

```
npm run dev
```

---

## Frontend Setup

```
cd Frontend
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Run Frontend

```
npm run dev
```

---

# 🔌 Socket Events

| Event | Description |
|--------|-------------|
| join | User joins the chat |
| send_message | Send a message |
| receive_message | Receive a message |
| typing | User typing |
| stop_typing | User stopped typing |
| read_messages | Mark messages as read |
| message_status | Update message status |

---

# 🗄 Database

## User

```
{
    username,
    socketId,
    isOnline
}
```

## Message

```
{
    sender,
    receiver,
    message,
    status,
    createdAt,
    updatedAt
}
```

---

# 🚀 Future Enhancements

- 📷 Image Sharing
- 📁 File Sharing
- 😊 Emoji Support
- 🎙 Voice Messages
- 📞 Audio Calling
- 🎥 Video Calling
- 🔔 Push Notifications
- 🔍 User Search
- 👥 Group Chats
- 🌙 Dark Mode

---

# 📈 Learning Outcomes

During this project I learned:

- MERN Stack Development
- Socket.IO Real-Time Communication
- MongoDB Data Modeling
- React State Management
- REST API Development
- Event Driven Programming
- Message Delivery Mechanism
- Read Receipts
- Typing Indicators
- Deployment on Vercel & Render

---

# 👨‍💻 Author

## Prakhar Garg

🎓 B.Tech Graduate (Information Technology)

💼 MERN Stack Developer

📧 Email: gargprakhar422@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/prakhar-garg-60a7a8256/

🐙 GitHub: https://github.com/Prakhar422

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!