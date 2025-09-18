import React, { useState, useEffect, useRef } from "react";

function DutchLanguageSentenceTrainer({ width = 200, minHeight = 75 }) {
  const [flipped, setFlipped] = useState(false);
  const [word, setWord] = useState("Laden...");
  const [instruction, setInstruction] = useState("Maak een correcte zin met dit woord.");
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [cardHeight, setCardHeight] = useState(minHeight);

  const backRef = useRef(null);
  const frontRef = useRef(null);

  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/\[|\]/g, "").trim();
  };

  // Fetch a random Dutch word
  const fetchWord = async () => {
    try {
      setWord("Laden...");
      setInstruction("Maak een correcte zin met dit woord.");

      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dutchlanguage/random"
      );
      const data = await res.json();
      const newWord = data.dutchWord || "onbekend woord";
      setWord(newWord);
    } catch (err) {
      console.error("Error fetching word:", err);
      setWord("Fout bij laden");
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    const frontHeight = frontRef.current?.getBoundingClientRect().height || minHeight;
    const backHeight = backRef.current?.getBoundingClientRect().height || minHeight;
    setCardHeight(Math.max(frontHeight, backHeight, minHeight));
  }, [word, instruction, feedback, flipped]);

  const renderFeedback = (text) => {
    if (!text) return null;

    if (/^correct/i.test(text)) {
      return (
        <span style={{ color: "green", fontWeight: "bold" }}>
          ✅ {text.replace(/^correct/i, "").trim()}
        </span>
      );
    }

    if (/^incorrect/i.test(text)) {
      return (
        <span style={{ color: "red", fontWeight: "bold" }}>
          ❌ {text.replace(/^incorrect/i, "").trim()}
        </span>
      );
    }

    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!sentence.trim()) return;

    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `You are a Dutch high school language teacher. A student wrote the following sentence using the word "${word}": "${sentence}". 
            Check if the sentence is grammatically correct and natural. 
            If correct, start with "correct" and give short praise. 
            If incorrect, start with "incorrect" and explain the mistake(s). 
            Suggest a better version of the sentence in Dutch. 
            Keep the feedback clear, educational, and encouraging.`,
          }),
        }
      );

      const data = await res.json();
      const rawFeedback = data.answer || data.response || "Geen feedback beschikbaar";
      setFeedback(formatText(rawFeedback));
    } catch (err) {
      console.error("Error checking sentence:", err);
      setFeedback("Fout bij controleren van de zin");
    } finally {
      setLoading(false);
    }
  };

  const handleNewWord = async (e) => {
    e.stopPropagation();
    setSentence("");
    setFeedback("");
    setFlipped(false);
    await fetchWord();
  };

  const containerStyle = {
    perspective: "1000px",
    width,
    height: cardHeight,
    margin: "50px auto",
    transition: "height 0.3s ease",
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s ease",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    cursor: "pointer",
  };

  const faceBase = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    backfaceVisibility: "hidden",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  };

  const frontStyle = {
    ...faceBase,
    background: "#ffffff",
    color: "#1d4ed8",
    fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: "bold",
  };

  const backStyle = {
    ...faceBase,
    background: "#ffffff",
    color: "#111827",
    transform: "rotateY(180deg)",
    fontFamily: "Segoe UI",
    fontSize: 16,
    lineHeight: 1.4,
    padding: "10px",
    gap: "10px",
  };

  return (
    <div style={containerStyle} onClick={() => setFlipped(!flipped)}>
      <div style={innerStyle}>
        <div style={frontStyle} ref={frontRef}>
          {word}
        </div>
        <div style={backStyle} ref={backRef}>
          <div style={{ color: "#1d4ed8", fontStyle: "italic", marginBottom: "8px" }}>
            {instruction}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Schrijf jouw zin hier..."
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              style={{
                fontFamily: "Segoe UI",
                fontSize: 16,
                borderColor: "#1d4ed8",
                marginTop: "8px",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "95%",
              }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "8px", alignItems: "center" }}>
              <button
                type="submit"
                disabled={loading || !sentence.trim()}
                style={{
                  fontFamily: "Segoe UI",
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#f3f4f6",
                  cursor: "pointer",
                }}
              >
                {loading ? "Bezig..." : "Controleer"}
              </button>

              <button
                type="button"
                onClick={handleNewWord}
                style={{
                  fontFamily: "Segoe UI",
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#f3f4f6",
                  cursor: "pointer",
                }}
              >
                Nieuw woord
              </button>
            </div>
          </form>

          {feedback && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "14px",
                fontFamily: "Segoe UI",
                color: "#111827",
                textAlign: "left",
                width: "90%",
              }}
            >
              {renderFeedback(feedback)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DutchLanguageSentenceTrainer;
