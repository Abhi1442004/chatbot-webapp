import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../api"; // backend functions

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await login({ email, password });

        // ✅ extract token safely
        const token =
          res.token || res.access_token || res.data?.token || res.data?.access_token;

        if (!token) throw new Error("No token received from server");

        localStorage.setItem("token", token);
        alert("✅ Logged in successfully!");
        navigate("/chat");
      } else {
        await signup({ email, password });
        alert("✅ Signup successful! Please login.");
        setIsLogin(true);
      }

      setError("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login/Signup error:", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={styles.toggleLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #1c1f26, #2a2f3a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "40px 30px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    width: "320px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#222",
    fontSize: "24px",
    fontWeight: "600",
  },
  form: { display: "flex", flexDirection: "column" },
  input: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#4F46E5",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: { color: "red", marginTop: "10px", fontSize: "14px" },
  toggleText: { marginTop: "15px", fontSize: "14px", color: "#444" },
  toggleLink: { color: "#4F46E5", fontWeight: "600", cursor: "pointer" },
};

export default LoginSignup;
