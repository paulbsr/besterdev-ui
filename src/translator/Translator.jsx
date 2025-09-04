import React, { useState } from "react";

export default function Translator() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (direction) => {
    setLoading(true);
    setTranslation("");

    // Pick correct translation question
    const question =
      direction === "ZA->NL"
        ? `Translate from Afrikaans to Dutch but return the word or phrase only. Remove the word 'Optional' in your response and drop any square brackets: ${text}`
        : `Translate from Dutch to Afrikaans but return the word or phrase only. Remove the word 'Optional' in your response and drop any square brackets: ${text}`;

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
      setTranslation(data.answer || "No translation returned");
    } catch (err) {
      setTranslation("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Input and buttons on the same line */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{
            height: "25.5px",
            border: "0.75px solid #336791",
            borderRadius: "4px",
            padding: 0,
            paddingLeft: "10px",
            width: "900px",
            fontFamily: "Segoe UI",
            fontSize: "18px",
          }}
          placeholder="Enter text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <button
            style={{
              marginLeft: "10px",
              height: "25.5px",
              border: "1px solid #336791",
              borderRadius: "8px",
              backgroundColor: "#336791",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
            onClick={() => handleTranslate("ZA->NL")}
            disabled={loading}
          >
            to NL
          </button>
          <button
            style={{
              marginLeft: "10px",
              height: "25.5px",
              border: "1px solid #336791",
              borderRadius: "8px",
              backgroundColor: "#336791",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
            onClick={() => handleTranslate("NL->ZA")}
            disabled={loading}
          >
            to ZA
          </button>
        </div>
      </div>

      {/* Translation result BELOW the input/buttons */}
      {loading && (
        <p
          style={{
            fontFamily: "Segoe UI",
            fontStyle: "italic",
            fontSize: "14px",
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
            fontSize: "14px",
          }}
        >
          {translation}
        </div>
      )}

      <div>...</div>
    </div>
  );
}
