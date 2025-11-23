import React, { useState } from "react";
import { RiFileWord2Line } from "react-icons/ri";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_WordContext() {
  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    if (!word.trim()) {
      setExplanation("⚠️ Please type a word first.");
      return;
    }

    setLoading(true);
    setExplanation("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Explain in English when the Dutch word "${word}" is used, and provide a short example sentence in Dutch with its English translation.`,
        }),
      });

      const data = await res.json();
      let output = data.answer?.trim() || "";

      // Clean up Optional[...] wrapping if present
      output = output.replace(/^Optional\[/i, "").replace(/\]$/, "").trim();

      setExplanation(output);
    } catch (err) {
      console.error(err);
      setExplanation("❌ Error fetching explanation.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchExplanation();
    }
  };

  const handleClear = () => {
    setWord("");
    setExplanation("");
  };

  return (
    <div
      style={{
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginTop: "1px", }}      >
        <RiFileWord2Line
          style={{
            color: "#FF4F00",
            fontSize: "28px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        Nederlandse Woordkonteks
      </h2>

      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Uitleg wanneer je dit woord gebruikt"
          style={{
            marginTop: "1px",
            height: "35.5px",
            border: "0.75px solid #777777",
            borderRadius: "4px",
            paddingLeft: "10px",
            width: "350px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginLeft: "5px",
            color: "#000000",
          }}
        />
      </label>

      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        {/* DETERMINE BUTTON WITH SPINNER */}
        <button
          type="button"
          onClick={fetchExplanation}
          disabled={loading}
          style={{
            height: "35.5px",
            border: "1px solid #777777",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid #ccc",
                  borderTop: "2px solid #FF4F00",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              Thinking...
            </div>
          ) : (
            "Bepalen"
          )}
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={{
            marginLeft: "2px",
            height: "35.5px",
            border: "1px solid #777777",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
        >
          Clear
        </button>
      </div>

      {explanation && (
        <div
          style={{
            marginTop: "16px",
            fontWeight: "500",
            whiteSpace: "pre-wrap",
          }}
        >
          {explanation}
        </div>
      )}

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
