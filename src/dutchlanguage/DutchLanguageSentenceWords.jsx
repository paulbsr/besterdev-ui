import React, { useState, useEffect } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageSentenceWords({
  subject = "dagelijks leven",
}) {
  const [challenge, setChallenge] = useState(""); // sentence with blanks
  const [missingWords, setMissingWords] = useState([]); // correct answers
  const [userInputs, setUserInputs] = useState([]); // user's guesses
  const [feedback, setFeedback] = useState("");
  const [subjectInput, setSubjectInput] = useState(subject);
  const [loading, setLoading] = useState(false);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      setFeedback("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Maak één lange, complexe Nederlandse zin over ${subjectInput}.
          Laat drie of vier willekeurige woorden weg en vervang ze door [BLANK].
          Schrijf de zin eerst. 
          Daarna op een nieuwe regel: "MISSING:" gevolgd door een komma-gescheiden lijst van de ontbrekende woorden in de juiste volgorde.`,
        }),
      });

      const data = await res.json();
      const output = data.answer || "";

      const parts = output.split("MISSING:");
      const sentenceWithBlanks = parts[0]?.trim() || "";
      const words = parts[1]
        ? parts[1].split(",").map((w) => w.trim())
        : [];

      setChallenge(sentenceWithBlanks);
      setMissingWords(words);
      setUserInputs(new Array(words.length).fill(""));
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error fetching challenge.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, value) => {
    const updated = [...userInputs];
    updated[index] = value;
    setUserInputs(updated);
  };

  const checkAnswers = async () => {
    try {
      setLoading(true);
      setFeedback("Validating...");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Beoordeel of de gebruiker de juiste Nederlandse woorden heeft ingevuld.
          Zin: "${challenge}"
          Juiste woorden: ${JSON.stringify(missingWords)}
          Antwoorden gebruiker: ${JSON.stringify(userInputs)}
          Geef duidelijke feedback in het Nederlands: zeg per woord of het correct is, en geef indien nodig de juiste vorm.`,
        }),
      });

      const data = await res.json();
      setFeedback(data.answer || "⚠️ No evaluation received.");
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error validating answers.");
    } finally {
      setLoading(false);
    }
  };

  const renderSentence = () => {
    const parts = challenge.split("[BLANK]");
    const result = [];

    parts.forEach((part, i) => {
      result.push(
        <span key={`text-${i}`} style={{ marginRight: "4px" }}>
          {part}
        </span>
      );
      if (i < missingWords.length) {
        result.push(
          <input
            key={`input-${i}`}
            type="text"
            value={userInputs[i] || ""}
            onChange={(e) => handleInputChange(i, e.target.value)}
            style={{
              width: "120px",
              margin: "0 6px",
              border: "1px solid #777",
              borderRadius: "4px",
              padding: "4px",
              fontSize: "16px",
            }}
          />
        );
      }
    });

    return result;
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        maxWidth: "1100px",
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
        Nederlands Zin Oefening (Meerdere Woorden)
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label style={{ fontWeight: "600", whiteSpace: "nowrap" }}>
          Specificeer een onderwerp:
        </label>
        <input
          type="text"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          placeholder="Bijv. gezondheid, werk, familie..."
          style={{
            color: "#777777",
            fontSize: "16px",
            width: "300px",
            height: "35.5px",
            border: "1px solid #777",
            borderRadius: "4px",
            paddingLeft: "10px",
          }}
        />
        <button
          onClick={fetchChallenge}
          style={{
            height: "39.5px",
            border: "1px solid #777",
            borderRadius: "4px",
            backgroundColor: loading ? "#ddd" : "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          Nieuwe Zin
        </button>
      </div>

      {challenge && (
        <form
          style={{ marginTop: "16px" }}
          onSubmit={(e) => {
            e.preventDefault();
            checkAnswers();
          }}
        >
          <blockquote
            className="whitespace-pre-line bg-gray-100 rounded"
            style={{
              padding: "12px",
              fontFamily: "Segoe UI",
              fontSize: "18px",
              fontStyle: "italic",
              color: "#FF4F00",
            }}
          >
            {renderSentence()}
          </blockquote>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "12px",
              height: "36.5px",
              border: "1px solid #777",
              borderRadius: "4px",
              backgroundColor: loading ? "#ddd" : "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "Bezig met valideren..." : "Controleer Antwoorden"}
          </button>
        </form>
      )}

      {feedback && (
        <div style={{ marginTop: "16px" }}>
          <strong>Feedback:</strong> {feedback}
        </div>
      )}
    </div>
  );
}
