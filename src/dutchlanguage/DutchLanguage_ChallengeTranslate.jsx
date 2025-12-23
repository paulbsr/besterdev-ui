import React, { useState } from "react";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguage_ChallengeTranslate({ subject = "daily life" }) {
  const [prompt, setPrompt] = useState("");
  const [correctDutch, setCorrectDutch] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchSentence = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Generate one grammatically complex Dutch sentence (max 15 words) about ${subject}, followed by its Afrikaans translation. Do not add introductions, just output the Dutch sentence on one line and the Afrikaans translation on the next.`
        }),
      });

      const data = await res.json();
      const output = data.answer || "";

      // Expecting two lines: Dutch and Afrikaans
      const lines = output.split("\n").map(l => l.trim()).filter(Boolean);

      if (lines.length >= 2) {
        setCorrectDutch(lines[0]);
        setPrompt(lines[1]); // Show Afrikaans as challenge
        setFeedback("");
        setUserInput("");
      } else {
        setFeedback("⚠️ API did not return both lines.");
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error fetching sentence");
    }
  };

  const checkAnswer = () => {
    if (!userInput.trim()) {
      setFeedback("⚠️ Please enter your translation.");
      return;
    }

    const normalizedUser = userInput.trim().toLowerCase();
    const normalizedCorrect = correctDutch.trim().toLowerCase();

    if (normalizedUser === normalizedCorrect) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Not quite. Correct answer: "${correctDutch}"`);
    }
  };

  return (
    <div
      className="Font-Segoe-Large-Howto" style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
      }}
    >


      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px" }}>Dutch Translation Challenge</h2>

      <button
        onClick={fetchSentence}
        style={{
          height: "35.5px",
          border: "1px solid #777777",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          cursor: "pointer",
          fontFamily: "Segoe UI",
          fontSize: "16px",
        }}
      >
        New Challenge
      </button>

      {prompt && (
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            Translate this Afrikaans sentence into Dutch:
          </p>
          <blockquote
            style={{
              fontStyle: "italic",
              padding: "8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontFamily: "Segoe UI",
              fontSize: "16px",
            }}
          >
            {prompt}
          </blockquote>
        </div>
      )}

      {prompt && (
        <div style={{ marginTop: "12px" }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your Dutch translation"
            style={{
              height: "35.5px",
              border: "0.75px solid #FF4F00",
              borderRadius: "4px",
              paddingLeft: "10px",
              width: "600px",
              fontFamily: "Segoe UI",
              fontSize: "16px",
            }}
          />
          <button
            onClick={checkAnswer}
            style={{
              marginLeft: "8px",
              border: "1px solid #007749",
              borderRadius: "4px",
              backgroundColor: "#007749",
              color: "#FFFFFF",
              padding: "6px 12px",
              cursor: "pointer",
              fontFamily: "Segoe UI",
              fontSize: "14px",
            }}
          >
            Check Answer
          </button>
        </div>
      )}

      {feedback && (
        <div
          style={{
            marginTop: "16px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
