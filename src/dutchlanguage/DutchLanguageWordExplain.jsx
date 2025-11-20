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
    <div
      style={{
        marginTop: "16px",
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
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
        Nederlandse Woord Uitleg
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Nederlandse Woordverduideliking"
          style={{
            height: "35.5px",
            border: "0.75px solid #777777",
            borderRadius: "4px",
            paddingLeft: "10px",
            width: "350px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginBottom: "16px",
            marginLeft: "2px",
          }}
        />

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            type="submit"
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
      </form>

      {/* Explanation */}
      {!loading && explanation && (
        <div
          style={{
            marginTop: "12px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
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
