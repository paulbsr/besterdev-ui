import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_WordExplain_Mini() {
  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const explainWord = async () => {
    if (!word.trim()) {
      setExplanation("⚠️ Please type a word first.");
      return;
    }

    try {
      setLoading(true);
      setExplanation("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Explain the following Dutch word in a single sentence (its grammar role), and then give exactly ONE example sentence showing correct usage: "${word}".`,
        }),
      });

      const data = await res.json();
      let output = data.answer?.trim() || "";

      // Clean Optional[...] wrapper
      output = output.replace(/^Optional\[/i, "").replace(/\]$/, "").trim();

      setExplanation(output);
    } catch (err) {
      console.error(err);
      setExplanation("❌ Error retrieving explanation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    explainWord();
  };

  const handleClear = () => {
    setWord("");
    setExplanation("");
    setLoading(false);
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Nederlandse Woord Verduideliking"
          style={{
            padding: "8px",
            width: "690px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "12px",
            height: "16.5px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            height: "33.5px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            marginLeft: "12px",
            color: "#a0a0a0",
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
              Bezig...
            </div>
          ) : (
            "Verduidelijk"
          )}
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={{
            height: "33.5px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            marginLeft: "12px",
            color: "#a0a0a0",
          }}
        >
          Clear
        </button>
      </form>

      {!loading && explanation && (
        <div
          style={{
            marginTop: "12px",
            fontFamily: "Segoe UI",
            fontSize: "12px",
            fontStyle: "italic",
            color: "#000000",
            marginBottom: "8px",
            whiteSpace: "pre-wrap",
          }}
        >
          {explanation}
        </div>
      )}

      {/* Spinner animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
