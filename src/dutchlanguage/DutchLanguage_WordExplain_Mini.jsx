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
    height: "40px",
    padding: "6px 8px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    marginTop: "10px"
  },
  button: {
    height: "40px",
    padding: "0 10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: "#a0a0a0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    marginTop: "10px"
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
    fontSize: "16px",
    fontStyle: "italic",
    whiteSpace: "pre-wrap",
    color: "#000",
  },
};

/* ---------------- Component ---------------- */

export default function DutchLanguage_WordExplain_Mini() {
  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------- Logic -------- */

  const fetchExplanation = async () => {
    if (!word.trim()) {
      setExplanation("⚠️ Please type a word first.");
      return;
    }

    try {
      setLoading(true);
      setExplanation("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Explain the following Dutch word in a single sentence (its grammar role), and then give exactly ONE example sentence showing correct usage: "${word}".`,
        }),
      });

      const data = await response.json();
      const cleaned =
        data.answer
          ?.replace(/^Optional\[/i, "")
          .replace(/\]$/, "")
          .trim() || "";

      setExplanation(cleaned);
    } catch (err) {
      console.error(err);
      setExplanation("❌ Error retrieving explanation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) fetchExplanation();
  };

  const handleClear = () => {
    if (loading) return;
    setWord("");
    setExplanation("");
  };

  /* -------- Render -------- */

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Verduidelijk Nederlandse woord"
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

      {!loading && explanation && (
        <div style={styles.result}>{explanation}</div>
      )}

      {/* Spinner keyframes */}
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
