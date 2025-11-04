import React, { useState, useEffect, useRef } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadChats();
  }, []);

  // ✅ Load list of chats
  const loadChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setChats(data.chats);
    } catch (err) {
      console.error("Failed to fetch chats:", err);
    }
  };

  // ✅ Load one chat's messages (and reset)
  const openChat = async (chatId) => {
    try {
      const token = localStorage.getItem("token");
      setMessages([]); // clear previous chat before loading new
      setActiveChat(chatId);
      const res = await fetch(`http://127.0.0.1:8000/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  // ✅ Send message (text or image)
  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim() && !selectedFile) return;

    const userMsg = {
      sender: "You",
      text: query || "[Image Uploaded]",
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      let res;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("prompt", query || "Describe this image.");
        formData.append("chat_id", activeChat);

        res = await fetch("http://127.0.0.1:8000/analyze-image", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        res = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query, chat_id: activeChat }),
        });
      }

      const data = await res.json();
      const botMsg = { sender: "Bot", text: data.response };
      setMessages((prev) => [...prev, botMsg]);
      setQuery("");
      setSelectedFile(null);
      loadChats();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/new-chat", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setChats((prev) => [data, ...prev]);
    setActiveChat(data._id);
    setMessages([]);
  };

  const deleteChat = async (chatId) => {
    const token = localStorage.getItem("token");
    await fetch(`http://127.0.0.1:8000/chat/${chatId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setChats((prev) => prev.filter((c) => c._id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
      setMessages([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={createNewChat}
            style={{
              padding: "10px",
              backgroundColor: "#4F46E5",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + New Chat
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px",
              backgroundColor: "#ef4444",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Chat list */}
        <div style={{ flex: 1, overflowY: "auto", marginTop: "10px" }}>
          {chats.map((c) => (
            <div
              key={c._id}
              style={{
                padding: "10px",
                backgroundColor: activeChat === c._id ? "#374151" : "transparent",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => openChat(c._id)}
            >
              <span
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.title || "Untitled Chat"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(c._id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#f87171",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "You" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: msg.sender === "You" ? "#4F46E5" : "#e5e7eb",
                  color: msg.sender === "You" ? "#fff" : "#000",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="uploaded"
                    style={{
                      maxWidth: "300px",
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                )}
                {msg.text}
              </div>

              {/* Copy button for Bot */}
              {msg.sender === "Bot" && (
                <button
                  onClick={() => navigator.clipboard.writeText(msg.text)}
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#2563eb",
                  }}
                  title="Copy"
                >
                  📋 Copy
                </button>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Upload */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              htmlFor="image-upload"
              style={{
                backgroundColor: "#4F46E5",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              📎 Upload Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            {selectedFile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
                <span style={{ fontSize: "13px" }}>{selectedFile.name}</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a message or describe the image..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 20px",
                backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
