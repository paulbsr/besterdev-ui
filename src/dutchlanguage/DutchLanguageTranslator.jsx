import React, { useState } from "react";
// import DutchAfrikaansSentence from "./DutchAfrikaansSentence";

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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "1100px",
        marginBottom: "16px"
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px" }}>Vertaal Tussen Talen</h2>

      {/* Input and buttons on the same line */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{
            height: "33.5px",
            border: "0.75px solid #777777",
            borderRadius: "4px",
            padding: 0,
            paddingLeft: "10px",
            width: "760px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
          placeholder="Afrikaans <-> Dutch"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <button
            style={{
              marginLeft: "5px",
              height: "35.5px",
              width: "55px",
              border: "1px solid #FF4F00",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              color: "#FF4F00",
              cursor: "pointer",
              fontFamily: "Segoe UI",
              fontSize: "16px",

            }}
            onClick={() => handleTranslate("ZA->NL")}
            disabled={loading}
          >
            NL
          </button>

          <button
            style={{
              marginLeft: "5px",
              height: "35.5px",
              width: "55px",
              border: "1px solid #007749",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              color: "#007749",
              cursor: "pointer",
              fontFamily: "Segoe UI",
              fontSize: "16px",

            }}
            onClick={() => handleTranslate("NL->ZA")}
            disabled={loading}
          >
            ZA
          </button>

          <button
            style={{
              marginLeft: "5px",
              height: "35.5px",
              width: "55px",
              border: "1px solid #777777",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              color: "#777777",
              cursor: "pointer",
              fontFamily: "Segoe UI",
              fontSize: "16px",

            }}
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>

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
    </div>
  );
}
