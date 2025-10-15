import React, { useState } from "react";

export default function AskAI() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResponse("");

    const question = `Answer the following in a maximum of three sentences: ${text}`;

    try {
      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        }
      );

      const data = await res.json();

      const cleaned = (data.answer || "")
        .replace(/optional/i, "")
        .replace(/[\[\]]/g, "")
        .trim();

      setResponse(cleaned || "No response returned");
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResponse("");
  };

  const styles = {
    container: {
      maxWidth: "950px",
      padding: "10px",
      fontFamily: "Segoe UI",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      flex: "1 1 300px",
      height: "40px",
      border: "2px solid #336791",
      borderRadius: "6px",
      padding: "0 12px",
      fontSize: "16px",
    },
    button: {
      height: "40px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#336791",
      color: "#fff",
      cursor: "pointer",
      padding: "0 16px",
      flex: "0 0 auto",
      fontFamily: "Segoe UI",
      fontSize: "16px"
    },
    responseCard: {
      backgroundColor: "#f0f4f8",
      borderLeft: "5px solid #336791",
      borderRadius: "6px",
      padding: "12px",
      fontSize: "16px",
      lineHeight: "1.5",
      wordBreak: "break-word",
      transition: "all 0.3s ease",
    },
    loadingText: {
      fontStyle: "italic",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleAsk} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Ask OpenAI anything..."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Thinking..." : "Ask OpenAI"}
        </button>
        <button type="button" style={styles.button} onClick={handleClear} disabled={loading}>
          Clear
        </button>
      </form>

      {response && <div style={styles.responseCard}>{response}</div>}
    </div>
  );
}
