import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { TbTransform } from "react-icons/tb";
import "./DutchLanguage_HomePage.css";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_Zintransformatie() {
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
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
        marginTop: "16px",
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
        <TbTransform
          style={{
            color: "#FF4F00",
            fontSize: "35px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />Zintransformatie
      </h2>

      {/* Input Field */}
      <div style={{ marginBottom: "10px" }}>
        <input
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Enter a Dutch sentence..."
          style={{
            padding: "8px",
            width: "550px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: "8px",
            width: "200px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px",
            marginLeft: "12px",
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
            border: "1px solid #FF4F00",
            borderRadius: "4px",
            padding: "8px 8px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            marginLeft: "12px",

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
      fontSize: "16px",
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
            style={{ color: "#ccc", cursor: "pointer", position: "absolute", top: "10px", right: "1px" }}
          />
</span>

    <p style={{ marginTop: "8px" }}>{output}</p>
  </div>
)}

    </div>
  );
}
