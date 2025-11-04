import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ onSelectChat }) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    API.get("/history").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="sidebar">
      <h3>History</h3>
      {history.map((chat) => (
        <div
          key={chat._id}
          className="chat-item"
          onClick={() => onSelectChat(chat)}
        >
          {chat.query.slice(0, 20)}...
        </div>
      ))}
      <button onClick={() => navigate("/saved")}>⭐ Saved Answers</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
