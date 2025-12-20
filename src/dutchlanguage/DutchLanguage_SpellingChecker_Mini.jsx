import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

/* ---------------- Styles ---------------- */

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    width: "300px",
    height: "27px",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    marginTop: "10px"
  },
  button: {
    height: "27px",
    padding: "0 10px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: "#a0a0a0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },
  buttonDisabled: {
    cursor: "default",
    opacity: 0.8,
  },
  spinner: {
    width: "12px",
    height: "12px",
    border: "2px solid #ccc",
    borderTop: "2px solid #FF4F00",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  result: {
    marginTop: "12px",
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontStyle: "italic",
    whiteSpace: "pre-wrap",
    color: "#000",
  },
};

/* ---------------- Component ---------------- */

export default function DutchLanguage_SpellingChecker_Mini() {
  const [word, setWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------- Logic -------- */

  const checkSpelling = async () => {
    if (!word.trim()) {
      setFeedback("⚠️ Please type a word first.");
      return;
    }

    try {
      setLoading(true);
      setFeedback("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Check if the following Dutch word is spelled correctly: "${word}". Answer only with "Correct" or "Incorrect: [correct spelling]".`,
        }),
      });

      const data = await res.json();
      let output =
        data.answer
          ?.replace(/^Optional\[/i, "")
          .replace(/\]$/, "")
          .trim() || "";

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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) checkSpelling();
  };

  const handleClear = () => {
    if (loading) return;
    setWord("");
    setFeedback("");
  };

  /* -------- Render -------- */

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Spel check Nederlandse woord"
          style={styles.input}
        />

        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner} />
              Bezig…
            </>
          ) : (
            "Clear"
          )}
        </button>
      </form>

      {!loading && feedback && (
        <div style={styles.result}>{feedback}</div>
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
