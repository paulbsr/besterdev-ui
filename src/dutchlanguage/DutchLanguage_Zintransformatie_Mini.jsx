import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "./DutchLanguageHomePage.css";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_Zintransformatie_Mini() {
  const [sentence, setSentence] = useState("");
  const [mode, setMode] = useState("Present Tense");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnter = (e) => {
    if (e.key === "Enter") performConversion();
  };

  const performConversion = async () => {
    if (!sentence.trim()) return;

    setLoading(true);
    setOutput("");

    const payload = {
      question: `Convert the following Dutch sentence into the selected form.
Sentence: "${sentence}"
Transformation: "${mode}"
Return ONLY the converted sentence as plain text.`
    };

    try {
      const res = await axios.post(API_URL, payload);
      let text = res.data.answer || "";

      // Remove potential markdown
      text = text.replace(/```/g, "").trim();

      setOutput(text);
    } catch (err) {
      console.error("<DutchLanguage_Zinverguiging/> API error:", err);
      setOutput("⚠️ Error processing request.");
    }

    setLoading(false);
  };

  return (
    <div
      className="Font-Segoe-Large-Howto"
      style={{
        fontFamily: "Segoe UI",
        fontSize: "10px",
        marginBottom: "16px",
        marginTop: "16px",
      }}
    >

      {/* Input Field */}
      <div style={{ marginBottom: "10px" }}>
        <input
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Transform a sentence in Nederlands to Present, Past, Future, Singular or Plural"
          style={{
            padding: "8px",
            width: "690px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "12px",
            height: "16.5px",
          }}
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: "8px",
            width: "120px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "12px",
            marginLeft: "12px",
            color: "#a0a0a0",
          }}
        >
          <option>Past Tense</option>
          <option>Present Tense</option>
          <option>Future Tense</option>
          <option>Singular</option>
          <option>Plural</option>
        </select>

        <button
          onClick={performConversion}
          style={{
            height: "33.5px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            // padding: "8px 8px",
            fontSize: "12px",
            cursor: "pointer",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            marginLeft: "12px",
            color: "#a0a0a0",

          }}
        >
          Conversie Zin
        </button>
      </div>

      {/* Dropdown */}
      <div style={{ marginBottom: "12px" }}>

      </div>

      {/* Convert Button */}


      {/* Loading Spinner */}
      {!loading && output && (
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "10px",
            whitespace: "pre-wrap",
            position: "relative",
          }}
        >
          <strong>Omgezette zin:</strong>

          {/* Clear Icon */}
          <span
            title="clear"
            onClick={() => {
              setOutput("");
              setSentence("");   // CLEAR INPUT FIELD
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "#28a745",
              fontSize: "20px",
            }}
          >
            <FaTimes
              title="Clear"
              style={{
                marginTop: "12px",
                fontFamily: "Segoe UI",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#000000",
                marginBottom: "8px",
                whiteSpace: "pre-wrap",
              }}
            />
          </span>

          <p style={{ marginTop: "8px" }}>{output}</p>
        </div>
      )}

    </div>
  );
}
