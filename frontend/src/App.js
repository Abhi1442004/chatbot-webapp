import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/chat" element={<ChatBox />} />
    </Routes>
  );
}

export default App;
