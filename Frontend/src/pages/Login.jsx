import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmedUsername = username.trim();

  if (!trimmedUsername) return;

  try {
    const response = await api.post("/users/login", {
      username: trimmedUsername,
    });

    console.log(response.data);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    navigate("/chat");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-700 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Join the Chat
        </h1>

        <p className="text-gray-500 mb-6">
          Enter your username to start chatting.
        </p>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default Login;
    

