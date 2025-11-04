// src/pages/SavedAnswers.js
import React, { useEffect, useState } from "react";
import { getSavedAnswers } from "../api";

function SavedAnswers() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const data = await getSavedAnswers();
        setAnswers(data.answers || []);
      } catch (error) {
        console.error("Error fetching saved answers:", error);
      }
    };
    fetchAnswers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Saved Answers</h2>
        {answers.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No saved answers yet.</p>
        ) : (
          answers.map((ans, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#e5e5ea",
                padding: "10px 15px",
                borderRadius: "12px",
                marginBottom: "10px",
                wordBreak: "break-word",
              }}
            >
              {ans}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedAnswers;
