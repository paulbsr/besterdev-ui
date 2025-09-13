import React, { useState } from "react";
import DutchAfrikaansSentence from "./DutchAfrikaansSentence";

export default function DutchLanguageTranslator() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (direction) => {
    setLoading(true);
    setTranslation("");

    const question =
      direction === "ZA->NL"
        ? `Translate from Afrikaans to Dutch but return the word or phrase only. if a single word then produce a short sentence with that single word: ${text}`
        : `Translate from Dutch to Afrikaans but return the word or phrase only. if a single word then produce a short sentence with that single word: ${text}`;

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

      // Clean the response
      let cleaned = (data.answer || "")
        .replace(/optional/i, "")
        .replace(/[\[\]]/g, "")
        .trim();

      setTranslation(cleaned || "No translation returned");
    } catch (err) {
      setTranslation("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setTranslation("");
  };

  return (
    <div>
      {/* Input and buttons on the same line */}      
      <div style={{ height: "20px" }}></div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{
            height: "25.5px",
            border: "0.75px solid #FF4F00",
            borderRadius: "4px",
            padding: 0,
            paddingLeft: "10px",
            width: "760px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
          placeholder="Translate Afrikaans <-> Dutch"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />&nbsp;
        <div>
          <button
            style={{
              marginLeft: "1px",
              height: "25.5px",
              border: "1px solid #FF4F00",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              color: "#FF4F00",
              cursor: "pointer",
            }}
            onClick={() => handleTranslate("ZA->NL")}
            disabled={loading}
          >
            NL
          </button>


          <button
            style={{
              marginLeft: "1px",
              height: "25.5px",
              border: "1px solid #007749",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              color: "#007749",
              cursor: "pointer",
            }}
            onClick={() => handleTranslate("NL->ZA")}
            disabled={loading}
          >
            ZA
          </button>

          
          <button
            style={{
              marginLeft: "1px",
              height: "25.5px",
              border: "1px solid #777777",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              // color: "#D3D3D3",
              color: "#777777",
              cursor: "pointer",
            }}
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>
        <DutchAfrikaansSentence />
      {/* Translation result BELOW the input/buttons */}
      {loading && (
        <p
          style={{
            fontFamily: "Segoe UI",
            fontStyle: "italic",
            fontSize: "16px",
            marginTop: "8px",
          }}
        >
          Translating...
        </p>
      )}

      {translation && (
        <div
          style={{
            marginTop: "8px",
            fontFamily: "Segoe UI",
            fontStyle: "italic",
            fontSize: "16px",
            color: "#FF4F00",
          }}
        >
          {translation}
        </div>
      )}

      <div>&nbsp;&nbsp;</div>
    </div>
  );
}
