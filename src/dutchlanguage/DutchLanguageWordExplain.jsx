import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageWordExplain() {
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
      setExplanation(""); // clear old output while loading

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Explain the following Dutch word in a single sentence (its grammar role), 
          and then give exactly ONE example sentence showing correct usage: "${word}".`,
        }),
      });

      const data = await res.json();
      let output = data.answer?.trim() || "";

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
          placeholder="Nederlandse Woord Uitleg"
          style={{
            height: "35.5px",
            border: "0.75px solid #777777",
            borderRadius: "4px",
            paddingLeft: "10px",
            width: "420px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginBottom: "16px",
            marginLeft: "10px", // 🔑 ensures no space to the left
          }}
        />

        <button
          type="submit"
          style={{
            height: "37.5px",
            border: "1px solid #777777",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginLeft: "5px",
          }}
        >
          Verduidelijk
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={{
            height: "37.5px",
            border: "1px solid #777777",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginLeft: "5px",
          }}
        >
          Clear
        </button>
      </form>

      {/* Show Loading state */}
      {loading && (
        <div
          style={{
            marginTop: "8px",
            fontFamily: "Segoe UI",
            fontStyle: "italic",
            fontSize: "16px",
            marginBottom: "16px",
            color: "#555",

          }}
        >
          Retrieving...
        </div>
      )}

      {!loading && explanation && (
        <div
          style={{
            marginTop: "8px",
            fontFamily: "Segoe UI",
            fontStyle: "italic",
            fontSize: "16px",
            color: "#000000",
                        marginBottom: "8px",
          }}
        >
          {explanation}
        </div>
      )}
    </div>
  );
}
