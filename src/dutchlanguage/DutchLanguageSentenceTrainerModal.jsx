import React, { useState, useEffect } from "react";

function DutchLanguageSentenceTrainerModal() {
  const [word, setWord] = useState("Laden...");
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("politiek"); // NEW: default topic

  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/^Optional\[/, "")
      .replace(/\]$/, "")
      .replace(/\[|\]/g, "")
      .trim();
  };

  // Fetch a random Dutch word for a given topic
  const fetchWord = async (customTopic = topic) => {
    try {
      setWord("Laden...");

      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `Geef mij één willekeurig Nederlands woord over onderwerp ${customTopic}, zonder uitleg of zinnen. Alleen het woord.`,
          }),
        }
      );

      const data = await res.json();
      const newWord =
        formatText(data.answer || data.response || "") || "onbekend woord";

      setWord(newWord);
    } catch (err) {
      console.error("Error fetching word:", err);
      setWord("Fout bij laden");
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            question: `You are a Dutch high school teacher. A student wrote the following sentence using the word "${word}": "${sentence}". 
            Check if the sentence is grammatically correct and natural. 
            If correct, start with "correct" and give praise. 
            If incorrect, start with "incorrect" and explain the mistake(s). 
            Suggest a corrected version of the sentence in Dutch.`,
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

  const handleNewWord = async () => {
    setSentence("");
    setFeedback("");
    setOpen(false);
    await fetchWord(); // uses topic state
  };

  return (
    <div
      style={{
        marginTop: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "10px",
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
        Nederlandse Zinnen Trainer
      </h2>

      {/* NEW: Input for topic */}


      {/* Display word instruction */}
      <input
        type="text"
        value={`Maak een correcte zin met het woord: ${word}`}
        readOnly
        style={{
          height: "35.5px",
          border: "0.75px solid #777777",
          borderRadius: "4px",
          paddingLeft: "10px",
          width: "400px",
          fontFamily: "Segoe UI",
          fontSize: "16px",
          marginBottom: "10px",
          color: "#777777",
        }}
      />

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Voer een onderwerp in (bv. politiek, sport, muziek)"
        style={{
          height: "35.5px",
          border: "0.75px solid #777777",
          borderRadius: "4px",
          paddingLeft: "10px",
          width: "170px",
          fontFamily: "Segoe UI",
          fontSize: "16px",
          marginBottom: "10px",
          color: "#000000",
          marginLeft: "8px",
        }}
      />

      {/* <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}> */}
      <button
        onClick={() => setOpen(true)}
        style={{
          height: "38.5px",
          border: "1px solid #777777",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          cursor: "pointer",
          fontFamily: "Segoe UI",
          fontSize: "16px",
          marginLeft: "8px",
        }}
      >
        Oefen
      </button>

      <button
        onClick={handleNewWord}
        style={{
          height: "38.5px",
          border: "1px solid #777777",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          cursor: "pointer",
          fontFamily: "Segoe UI",
          fontSize: "16px",
          marginLeft: "8px",
        }}
      >
        Nieuw woord
      </button>
      {/* </div> */}

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "600px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              fontFamily: "Segoe UI",
            }}
          >
            <h3 style={{ color: "#000000" }}>
              Gebruik het woord: <span style={{ fontWeight: "bold" }}>{word}</span>
            </h3>
            <form onSubmit={handleSubmit} style={{ marginTop: "12px" }}>
              <input
                type="text"
                placeholder="Schrijf jouw zin hier..."
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  disabled={loading || !sentence.trim()}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    background: "#f3f4f6",
                    marginLeft: "8px",
                  }}
                >
                  {loading ? "Bezig..." : "Controleer"}
                </button>


                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    background: "#f3f4f6",
                    marginLeft: "8px",
                  }}
                >
                  Sluiten
                </button>
              </div>
            </form>

            {feedback && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "#f9fafb",
                  fontSize: "14px",
                  color: feedback.toLowerCase().startsWith("correct")
                    ? "green"
                    : "red",
                }}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DutchLanguageSentenceTrainerModal;

