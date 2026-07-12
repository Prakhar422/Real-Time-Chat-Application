import React from "react";
import { AuroraText } from "./components/AuroraText";
import {Routes, Route} from "react-router-dom";
import Login from "../src/pages/Login.jsx";
import Chat from "../src/pages/Chat.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
