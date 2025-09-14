import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageChallengeWordCheck() {
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
        setFeedback(`❌ Incorrect. Suggested spelling: "${suggestion}"`);
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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",    // ✅ space inside border
        fontFamily: "Segoe UI",
        fontSize: "16px",
        maxWidth: "1100px",
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px" }}>Dutch Word Spelling Check</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Dutch Language Word Checker"
          style={{
            height: "35.5px",
            border: "0.75px solid #FF4F00",
            borderRadius: "4px",
            paddingLeft: "10px",
            width: "300px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "5px",
            height: "35.5px",
            border: "1px solid #FF4F00",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#FF4F00",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
        >
          Check
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            marginLeft: "5px",
            height: "35.5px",
            border: "1px solid #777777",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#777777",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
        >
          Clear
        </button>
      </form>

      {feedback && (
        <div style={{ marginTop: "16px", fontWeight: "500" }}>{feedback}</div>
      )}
    </div>
  );
}
