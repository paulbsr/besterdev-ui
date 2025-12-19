import React, { useState } from "react";
import { FaSpellCheck } from "react-icons/fa";
import { ImSpellCheck } from "react-icons/im";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_SpellingChecker_Mini() {
  const [word, setWord] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkWord = async () => {
    if (!word.trim()) {
      setFeedback("⚠️ Please type a word first.");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Check if the following Dutch word is spelled correctly: "${word}". 
          Answer only with "Correct" or "Incorrect: [correct spelling]".`,
        }),
      });

      const data = await res.json();
      let output = data.answer?.trim() || "";

      // Clean up weird formatting like "Optional[Incorrect: verwordt]"
      output = output.replace(/^Optional\[/i, "").replace(/\]$/, "").trim();

      if (output.toLowerCase().startsWith("correct")) {
        setFeedback(`✅ "${word}" is spelled correctly!`);
      } else if (output.toLowerCase().startsWith("incorrect")) {
        const suggestion = output.replace(/incorrect[:]?/i, "").trim();
        setFeedback(`❌ Verkeerd! Correcte spelling is "${suggestion}"`);
      } else {
        setFeedback(`⚠️ Unexpected response: ${output}`);
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error checking word spelling.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkWord();
  };

  const handleClear = () => {
    setWord("");
    setFeedback("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Nederlandse Woord Spelling Checker"
          style={{
            marginTop: "16px",
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
        >Check
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

      {feedback && (
        <div style={{
          marginTop: "12px",
          fontFamily: "Segoe UI",
          fontSize: "12px",
          fontStyle: "italic",
          color: "#000000",
          marginBottom: "8px",
          whiteSpace: "pre-wrap",
        }}>{feedback}</div>
      )}
    </div>
  );
}
