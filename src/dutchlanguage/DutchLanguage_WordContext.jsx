
import React, { useState } from "react";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_WordContext() {
  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");

  const fetchExplanation = async () => {
    if (!word.trim()) {
      setExplanation("⚠️ Please type a word first.");
      return;
    }

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

      // Clean up if wrapped in "Optional[...]"
      output = output.replace(/^Optional\[/i, "").replace(/\]$/, "").trim();

      setExplanation(output);
    } catch (err) {
      console.error(err);
      setExplanation("❌ Error fetching explanation.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission refresh
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
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          marginBottom: "16px",
          marginTop: "1px",
        }}
      >
        Nederlandse Woordkonteks
      </h2>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Explain when the following word is used:{" "}
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a Dutch word"
          style={{
            marginTop: "10px",
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
        <button
          type="button"
          onClick={fetchExplanation}
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
          Determine
        </button>

        <button
          type="button"
          onClick={handleClear}
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
    </div>
  );
}
