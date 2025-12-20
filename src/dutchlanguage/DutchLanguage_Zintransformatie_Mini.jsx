import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

/* ---------------- Styles ---------------- */
const styles = {
  container: {
    fontFamily: "Segoe UI",
    fontSize: "10px",
    // marginBottom: "16px",
    // marginTop: "16px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  input: {
    width: "555px",
    height: "27px",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  select: {
    padding: "6px 8px",
    width: "120px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#a0a0a0",
  },
  button: {
    height: "31px",
    padding: "0 10px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: "#a0a0a0",
    cursor: "pointer",
  },
  result: {
    background: "#fafafa",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "10px",
    whiteSpace: "pre-wrap",
    position: "relative",
  },
  clearIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    color: "#28a745",
    fontSize: "20px",
  },
  outputText: {
    marginTop: "8px",
  },
};

export default function DutchLanguage_Zintransformatie_Mini() {
  const [sentence, setSentence] = useState("");
  const [mode, setMode] = useState("Present Tense");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------- Logic -------- */

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performConversion();
    }
  };

  const performConversion = async () => {
    if (!sentence.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const payload = {
        question: `Convert the following Dutch sentence into the selected form.
Sentence: "${sentence}"
Transformation: "${mode}"
Return ONLY the converted sentence as plain text.`,
      };

      const res = await axios.post(API_URL, payload);
      let text = res.data.answer || "";

      text = text.replace(/```/g, "").trim();
      setOutput(text);
    } catch (err) {
      console.error("API error:", err);
      setOutput("⚠️ Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (loading) return;
    setSentence("");
    setOutput("");
  };

  /* -------- Render -------- */

  return (
    <div style={styles.container}>
      {/* Input + Mode + Button */}
      <div style={styles.form}>
        <input
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Transformeer een zin in het Nederlands"
          style={styles.input}
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={styles.select}
        >
          <option>Past Tense</option>
          <option>Present Tense</option>
          <option>Future Tense</option>
          <option>Singular</option>
          <option>Plural</option>
        </select>

        <button
          onClick={performConversion}
          disabled={loading}
          style={styles.button}
        >
          Conversie Zin
        </button>
      </div>

      {/* Output */}
      {output && (
        <div style={styles.result}>
          <strong>Omgezette zin:</strong>

          {/* Clear Icon */}
          <span style={styles.clearIcon} onClick={handleClear}>
            <FaTimes />
          </span>

          <p style={styles.outputText}>{output}</p>
        </div>
      )}
    </div>
  );
}
