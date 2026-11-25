import React, { useState } from "react";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export async function askAI(text) {
  const question = `Answer the following in a maximum of three sentences: ${text}`;
  const res = await OAuth2APIClient.post(
    "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
    { question }
  );

  const cleaned = (res.data.answer || "")
    .replace(/optional/i, "")
    .replace(/[\[\]]/g, "")
    .trim();

  return cleaned || "No response returned";
}

export default function AskAI() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      setResponse(await askAI(text));
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
      padding: "2px",
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
      margin: "10px"
    },
    loadingText: {
      fontStyle: "italic",
      color: "#555",
    },
  };

  return (
    <div className="home-ask-ai">
      <form className="home-ask-ai-form" onSubmit={handleAsk} style={styles.form}>
        <input
          className="home-ask-ai-input"
          style={styles.input}
          placeholder="Ask OpenAI anything..."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="home-ask-ai-submit" type="submit" style={styles.button} disabled={loading}>
          {loading ? "Thinking..." : "Ask OpenAI"}
        </button>
        <button className="home-ask-ai-clear" type="button" style={styles.button} onClick={handleClear} disabled={loading}>
          Clear
        </button>
      </form>

      {response && <div className="home-ask-ai-response" style={styles.responseCard}>{response}</div>}
    </div>
  );
}
